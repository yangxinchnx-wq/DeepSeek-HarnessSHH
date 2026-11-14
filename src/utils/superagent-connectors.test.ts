import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SuperagentConnectorStore,
  extractByPath,
  renderOutboundTemplate,
  normalizeConnectorWebhookPayload,
  buildConnectorWrapperScript,
  createDefaultSeedConnectors,
} from './superagent-connectors.ts';

test('1. Default seed connectors initialize with DingTalk Account #1 and GitHub Account #1', () => {
  const seeds = createDefaultSeedConnectors('2026-11-07T00:00:00.000Z');
  assert.equal(seeds.length, 2);
  assert.equal(seeds[0].id, 'dingtalk-default');
  assert.equal(seeds[0].platform, 'dingtalk');
  assert.ok(seeds[0].name.includes('钉钉机器人'));
  assert.equal(seeds[1].id, 'github-default');
  assert.equal(seeds[1].platform, 'github');
  assert.ok(seeds[1].name.includes('GitHub'));
});

test('2. SuperagentConnectorStore supports multiple DingTalk accounts (Account #1, Account #2, Account #3) with isolated credentials', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'superagent-connectors-test-'));
  try {
    const store = new SuperagentConnectorStore(tmpDir);
    const initial = store.list();
    assert.equal(initial.length, 2);

    // Update DingTalk Account #1 credentials
    store.update('dingtalk-default', {
      name: '钉钉机器人 · 研发群一号账号',
      credentials: {
        clientId: 'ding_appkey_account_1',
        clientSecret: 'secret_account_1',
      },
    });

    // Duplicate DingTalk Account #1 to create DingTalk Account #2
    const dingtalk2 = store.duplicate('dingtalk-default');
    assert.ok(dingtalk2);
    assert.equal(dingtalk2.id, 'dingtalk-2');
    assert.equal(dingtalk2.platform, 'dingtalk');
    assert.ok(dingtalk2.name.includes('账号 2'));

    // Update DingTalk Account #2 with completely independent credentials
    store.update('dingtalk-2', {
      name: '钉钉机器人 · 客服群二号账号',
      credentials: {
        clientId: 'ding_appkey_account_2',
        clientSecret: 'secret_account_2',
      },
    });

    const d1 = store.get('dingtalk-default')!;
    const d2 = store.get('dingtalk-2')!;
    assert.equal(d1.credentials.clientId, 'ding_appkey_account_1');
    assert.equal(d2.credentials.clientId, 'ding_appkey_account_2');
    assert.notEqual(d1.id, d2.id);

    // Reload from disk to verify persistence
    const reloaded = new SuperagentConnectorStore(tmpDir);
    assert.equal(reloaded.list().length, 3);
    assert.equal(reloaded.get('dingtalk-2')?.name, '钉钉机器人 · 客服群二号账号');
    assert.equal(reloaded.get('dingtalk-2')?.credentials.clientId, 'ding_appkey_account_2');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('3. Custom Product Bot supports arbitrary third-party / internal products with dot-path JSON extraction and outbound templates', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'superagent-custom-bot-'));
  try {
    const store = new SuperagentConnectorStore(tmpDir);
    const customBot = store.add({
      platform: 'custom',
      productName: 'Jira 工单平台',
      name: 'Jira · 核心故障工单机器人',
      credentials: {
        inboundMode: 'webhook',
        webhookSecret: 'sec_jira_123',
        textPath: 'issue.fields.summary',
        senderPath: 'user.displayName',
        threadPath: 'issue.key',
        outboundUrl: 'https://jira.internal/api/comment',
        outboundTemplate: '{"issue":"{{threadId}}","body":"{{text}}"}',
      },
    });

    assert.ok(customBot.id.startsWith('custom'));
    assert.equal(customBot.productName, 'Jira 工单平台');

    const incomingWebhook = {
      issue: {
        key: 'PROJ-402',
        fields: {
          summary: '修复登录接口在高并发下的超时问题',
        },
      },
      user: {
        displayName: 'zhangsan',
      },
    };

    const normalized = normalizeConnectorWebhookPayload(
      customBot,
      incomingWebhook,
      '2026-11-07T06:00:00.000Z',
    );
    assert.equal(normalized.trigger.source, customBot.id);
    assert.equal(normalized.trigger.text, '修复登录接口在高并发下的超时问题');
    assert.equal(normalized.trigger.actor.id, 'zhangsan');
    assert.equal(normalized.trigger.threads[0].id, 'PROJ-402');
    assert.equal(normalized.threadMeta.facts.connector.value, 'Jira · 核心故障工单机器人');
    assert.equal(normalized.threadMeta.facts.platform.value, 'Jira 工单平台');

    const outboundBody = renderOutboundTemplate(customBot.credentials.outboundTemplate, {
      threadId: 'PROJ-402',
      text: '已定位连接池泄漏并提交 PR #88',
    });
    assert.equal(outboundBody, '{"issue":"PROJ-402","body":"已定位连接池泄漏并提交 PR #88"}');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('4. Auto-generates zero-script CLI wrappers for GitHub and Feishu instances and handles Feishu challenge handshake', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'superagent-wrappers-'));
  try {
    const store = new SuperagentConnectorStore(tmpDir);
    store.update('github-default', {
      credentials: {
        repository: 'deepseek-ai/dsh-superagent-prototype',
        token: 'ghp_test_token_999',
      },
    });
    const ghInst = store.get('github-default')!;
    const ghScript = buildConnectorWrapperScript(ghInst);
    assert.ok(ghScript);
    assert.ok(ghScript.content.includes('export GH_TOKEN="ghp_test_token_999"'));
    assert.ok(ghInst.wrapperScriptPath && fs.existsSync(ghInst.wrapperScriptPath));

    const feishuInst = store.add({
      platform: 'feishu',
      name: '飞书 · 研发群机器人',
      credentials: {
        brand: 'feishu',
        appId: 'cli_a1b2c3d4',
        appSecret: 'sec_feishu_987',
      },
    });
    const feishuScript = buildConnectorWrapperScript(feishuInst);
    assert.ok(feishuScript);
    assert.ok(feishuScript.content.includes('export LARK_APP_ID="cli_a1b2c3d4"'));
    assert.ok(feishuScript.content.includes('export LARK_APP_SECRET="sec_feishu_987"'));

    // Verify Feishu url_verification challenge response
    const challengeNormalized = normalizeConnectorWebhookPayload(feishuInst, {
      challenge: 'challenge_token_xyz',
      type: 'url_verification',
    });
    assert.equal(challengeNormalized.challenge, 'challenge_token_xyz');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('5. extractByPath resolves nested dot paths and falls back cleanly', () => {
  const sample = { a: { b: { c: 'hello world' } }, flat: 42 };
  assert.equal(extractByPath(sample, 'a.b.c'), 'hello world');
  assert.equal(extractByPath(sample, 'missing.path', ['a.b.c']), 'hello world');
  assert.equal(extractByPath(sample, 'flat'), '42');
});
