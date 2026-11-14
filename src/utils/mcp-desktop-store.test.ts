import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { McpDesktopStore, WINDOWS_MCP_GUI_TOOLS } from './mcp-desktop-store.ts';

test('McpDesktopStore seeds default Windows-MCP server and dual-layer GUI policy', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mcp-desktop-test-'));
  const wsDir = path.join(tmpDir, 'workspace');
  const store = new McpDesktopStore(tmpDir, wsDir);

  const state = store.getState();
  assert.equal(state.policy.defaultGuiEngine, 'windows-mcp');
  assert.equal(state.policy.autoFallbackPwshUia, true);
  assert.equal(state.policy.preferNativeSandboxShell, true);
  assert.equal(state.policy.visionSetOfMarks, true);

  assert.equal(state.servers.length, 1);
  const winMcp = state.servers[0];
  assert.equal(winMcp.id, 'windows_mcp');
  assert.equal(winMcp.enabled, true);
  assert.equal(winMcp.transport, 'stdio');
  assert.equal(winMcp.command, 'uvx');
  assert.deepEqual(winMcp.args, ['windows-mcp']);
  assert.deepEqual(winMcp.exposedTools, WINDOWS_MCP_GUI_TOOLS);
  assert.deepEqual(winMcp.blockedTools, ['Powershell-Tool']);

  const skillPath = path.join(wsDir, '.agents', 'skills', 'windows-desktop-gui', 'SKILL.md');
  assert.equal(fs.existsSync(skillPath), true);
  const skillContent = fs.readFileSync(skillPath, 'utf8');
  assert.match(skillContent, /mcp__windows_mcp__State-Tool/);
  assert.match(skillContent, /NEVER.*Powershell-Tool/);
  assert.match(skillContent, /UIAutomationClient/);
});

test('McpDesktopStore updates policy, adds custom servers, and probes servers', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mcp-desktop-test2-'));
  const wsDir = path.join(tmpDir, 'workspace');
  const store = new McpDesktopStore(tmpDir, wsDir);

  const updatedState = store.updatePolicy({
    defaultGuiEngine: 'pwsh-uia',
    preferNativeSandboxShell: false,
  });
  assert.equal(updatedState.policy.defaultGuiEngine, 'pwsh-uia');
  assert.equal(updatedState.policy.preferNativeSandboxShell, false);
  assert.deepEqual(updatedState.servers[0].blockedTools, []);

  const customServer = store.upsertServer({
    id: 'playwright_mcp_1',
    name: 'Playwright MCP #1',
    templateId: 'playwright-mcp',
    transport: 'stdio',
    command: 'node',
    args: ['--version'],
    enabled: true,
  });
  assert.equal(customServer.id, 'playwright_mcp_1');
  assert.equal(store.getState().servers.length, 2);

  const probed = await store.probeServer('playwright_mcp_1');
  assert.ok(probed);
  assert.equal(probed.status.state, 'ready');

  assert.equal(store.deleteServer('windows_mcp'), false);
  assert.equal(store.deleteServer('playwright_mcp_1'), true);
  assert.equal(store.getState().servers.length, 1);
});
