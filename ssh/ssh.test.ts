import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { SshCredentialVault } from './crypto-vault.ts';
import {
  SshSessionManager,
  computeTabBadgeState,
  formatHeroConnectedText,
} from './ssh-manager.ts';

test('SshCredentialVault encrypts credentials with AES-256-GCM and leaves zero plaintext on disk', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-ssh-vault-test-'));
  try {
    const vault = new SshCredentialVault(tmpDir);
    vault.saveCredentials({
      sessionId: 'sess-alpha-1',
      host: 'gpu-node-secret.internal',
      username: 'admin_root_user',
      password: 'UltraSecretPassword!2026',
    });

    const vaultPath = vault.getVaultPath();
    assert.equal(fs.existsSync(vaultPath), true);

    const rawDiskContent = fs.readFileSync(vaultPath, 'utf8');
    const decodedOuter = Buffer.from(rawDiskContent, 'base64').toString('utf8');

    // Neither raw file nor base64-decoded JSON envelope may contain plaintext host, username, or password
    assert.equal(rawDiskContent.includes('UltraSecretPassword!2026'), false);
    assert.equal(rawDiskContent.includes('gpu-node-secret.internal'), false);
    assert.equal(rawDiskContent.includes('admin_root_user'), false);
    assert.equal(decodedOuter.includes('UltraSecretPassword!2026'), false);
    assert.equal(decodedOuter.includes('gpu-node-secret.internal'), false);
    assert.equal(decodedOuter.includes('admin_root_user'), false);
    assert.equal(decodedOuter.includes('sess-alpha-1'), false);

    // Decrypting via the vault restores the exact credentials
    const loaded = vault.loadCredentials('sess-alpha-1');
    assert.deepEqual(loaded, {
      sessionId: 'sess-alpha-1',
      host: 'gpu-node-secret.internal',
      username: 'admin_root_user',
      password: 'UltraSecretPassword!2026',
    });
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('SshSessionManager enforces unique hostnames across sessions and tracks green/red tab ssh states', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-ssh-mgr-test-'));
  try {
    const vault = new SshCredentialVault(tmpDir);
    const manager = new SshSessionManager(vault);

    // 1. Initial failed connection on session-1 -> tabBadgeState must be 'none' (no ssh suffix)
    const failInitial = await manager.connectSession({
      sessionId: 'session-1',
      host: 'fail-node-01',
      username: 'root',
      password: 'wrong',
    });
    assert.equal(failInitial.ok, false);
    assert.equal(failInitial.state.everConnected, false);
    assert.equal(failInitial.state.tabBadgeState, 'none');
    assert.equal(failInitial.state.heroMessage, '');

    // 2. Successful connection on session-1 -> tabBadgeState is 'connected' (green ssh) & heroMessage is formatted
    const okConn = await manager.connectSession({
      sessionId: 'session-1',
      host: 'cloud-gpu-01',
      username: 'ubuntu',
      password: 'ValidPassword123',
    });
    assert.equal(okConn.ok, true);
    assert.equal(okConn.state.status, 'connected');
    assert.equal(okConn.state.everConnected, true);
    assert.equal(okConn.state.tabBadgeState, 'connected');
    assert.equal(okConn.state.heroMessage, 'cloud-gpu-01已成功连接');
    assert.ok(okConn.state.metrics);
    assert.equal(typeof okConn.state.metrics.cpuUsagePercent, 'number');
    assert.equal(typeof okConn.state.metrics.gpuUsagePercent, 'number');
    assert.equal(typeof okConn.state.metrics.memoryUsagePercent, 'number');
    assert.equal(typeof okConn.state.metrics.diskUsagePercent, 'number');
    assert.equal(typeof okConn.state.metrics.diskReadSpeedMbps, 'number');
    assert.equal(typeof okConn.state.metrics.diskWriteSpeedMbps, 'number');

    // 3. Duplicate hostname on session-2 -> rejected ("主机名称不能重复") and session-2 has no ssh suffix
    const dupConn = await manager.connectSession({
      sessionId: 'session-2',
      host: 'cloud-gpu-01',
      username: 'ubuntu',
      password: 'ValidPassword123',
    });
    assert.equal(dupConn.ok, false);
    assert.equal(dupConn.state.everConnected, false);
    assert.equal(dupConn.state.tabBadgeState, 'none');
    assert.ok(dupConn.error?.includes('主机名称不能重复'));

    // 4. Subsequent failed connection on session-1 (which previously connected) -> tabBadgeState becomes 'failed_after_success' (red ssh)
    const failAfterSuccess = await manager.connectSession({
      sessionId: 'session-1',
      host: 'cloud-gpu-01',
      username: 'ubuntu',
      password: 'fail',
    });
    assert.equal(failAfterSuccess.ok, false);
    assert.equal(failAfterSuccess.state.everConnected, true);
    assert.equal(failAfterSuccess.state.tabBadgeState, 'failed_after_success');

    // 5. Unconnected session-3 returns null (strict per-session isolation)
    assert.equal(manager.getSessionState('session-3'), null);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('computeTabBadgeState and formatHeroConnectedText follow exact specification', () => {
  assert.equal(computeTabBadgeState('idle', false), 'none');
  assert.equal(computeTabBadgeState('error', false), 'none');
  assert.equal(computeTabBadgeState('connected', true), 'connected');
  assert.equal(computeTabBadgeState('error', true), 'failed_after_success');
  assert.equal(formatHeroConnectedText('node-a100'), 'node-a100已成功连接');
});
