import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  extractLaunchTokenUrl,
  extractSessionCookieFromHeaders,
  rewriteProxyHeaders,
  buildCordisPatchYaml,
  extractPromptFromAnthropicRequest,
  formatAnthropicSseEvents,
  stripSystemReminders,
  reconcileBrowserTabIds,
} from './proxy-helpers.ts';
import { applyDshUpstreamSync } from './dsh-upstream-sync.ts';

describe('proxy-helpers', () => {
  it('extracts launch token URL from dsh web stdout', () => {
    const stdout = [
      '2026-10-29 02:18:35 [I] app cordis version 4.14.3',
      'dsh web: http://127.0.0.1:3080/?token=abc123_def-456',
    ].join('\n');

    assert.equal(
      extractLaunchTokenUrl(stdout),
      'http://127.0.0.1:3080/?token=abc123_def-456',
    );
    assert.equal(extractLaunchTokenUrl('unrelated log line'), null);
  });

  it('extracts dsh-auth session cookie from Set-Cookie headers', () => {
    const rawHeaders = [
      'other=123; Path=/',
      'dsh-auth-deadbeef=v1.token.sig; Path=/; HttpOnly; SameSite=Strict',
    ];
    assert.equal(
      extractSessionCookieFromHeaders(rawHeaders),
      'dsh-auth-deadbeef=v1.token.sig',
    );
    assert.equal(extractSessionCookieFromHeaders(undefined), '');
  });

  it('rewrites proxy headers for same-origin loopback trust and injects session cookie', () => {
    const rewritten = rewriteProxyHeaders(
      {
        host: 'example.aistudio.google.com',
        origin: 'https://example.aistudio.google.com',
        referer: 'https://example.aistudio.google.com/',
        'sec-fetch-site': 'cross-site',
        cookie: 'theme=dark',
      },
      '127.0.0.1:3080',
      'dsh-auth-123=secret',
    );

    assert.equal(rewritten['host'], '127.0.0.1:3080');
    assert.equal(rewritten['origin'], 'http://127.0.0.1:3080');
    assert.equal(rewritten['referer'], 'http://127.0.0.1:3080/');
    assert.equal(rewritten['sec-fetch-site'], 'same-origin');
    assert.equal(rewritten['cookie'], 'theme=dark; dsh-auth-123=secret');
  });

  it('does not duplicate dsh-auth cookie if already present', () => {
    const rewritten = rewriteProxyHeaders(
      {
        cookie: 'dsh-auth-123=secret',
      },
      '127.0.0.1:3080',
      'dsh-auth-123=secret',
    );
    assert.equal(rewritten['cookie'], 'dsh-auth-123=secret');
  });

  it('builds valid cordis.patch.yml content', () => {
    const yaml = buildCordisPatchYaml('/app/applet/workspaces', 'http://127.0.0.1:3082');
    assert.ok(yaml.includes('documentsDirectory: /app/applet/workspaces'));
    assert.ok(yaml.includes('baseURL: http://127.0.0.1:3082'));
    assert.ok(yaml.includes('welcomeNoticeVersion: 2026-09-28.1'));
  });

  it('strips <system-reminder> blocks and extracts clean user prompt', () => {
    const cleaned = stripSystemReminders(
      '<system-reminder>Current working directory: "/app"</system-reminder>\nExplain the Cordis plugin architecture.',
    );
    assert.equal(cleaned, 'Explain the Cordis plugin architecture.');

    const parsed = extractPromptFromAnthropicRequest({
      model: 'deepseek-flash',
      system: [{ type: 'text', text: 'You are DeepSeek Harness.' }],
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: '<system-reminder>Internal context</system-reminder>' },
            { type: 'text', text: 'Explain the Cordis plugin architecture.' },
          ],
        },
      ],
      stream: true,
    });

    assert.equal(parsed.model, 'deepseek-flash');
    assert.equal(parsed.systemPrompt, 'You are DeepSeek Harness.');
    assert.equal(parsed.userPrompt, 'Explain the Cordis plugin architecture.');
    assert.equal(parsed.isTitleRequest, false);
  });

  it('detects automatic session title generation requests', () => {
    const parsed = extractPromptFromAnthropicRequest({
      model: 'deepseek-flash',
      system: 'Generate a concise title for this session.',
      messages: [{ role: 'user', content: 'Summarize the architecture of DeepSeek Harness' }],
    });
    assert.equal(parsed.isTitleRequest, true);
  });

  it('formats valid Anthropic SSE stream frames with thinking and text blocks', () => {
    const frames = formatAnthropicSseEvents({
      messageId: 'msg_01',
      model: 'deepseek-flash',
      thinkingText: 'Analyzing workspace plugins...',
      responseText: 'DeepSeek Harness is built on Cordis.',
    });

    assert.ok(frames.some((f) => f.startsWith('event: message_start\n')));
    assert.ok(frames.some((f) => f.includes('"thinking_delta"')));
    assert.ok(frames.some((f) => f.includes('DeepSeek Harness is built on Cordis.')));
    assert.ok(frames.at(-1)?.startsWith('event: message_stop\n'));
  });

  it('reconciles browser task tab order while excluding archived and subagent sessions', () => {
    const tabs = reconcileBrowserTabIds({
      previousOrder: ['sess_1', 'sess_2'],
      workspaceSessionIds: ['sess_1', 'sess_2', 'sess_3', 'sess_sub', 'sess_arch'],
      allSessionIds: ['sess_1', 'sess_2', 'sess_3', 'sess_sub', 'sess_arch'],
      summariesById: {
        sess_1: { id: 'sess_1', blank: true },
        sess_2: { id: 'sess_2', blank: true },
        sess_3: { id: 'sess_3', blank: true },
        sess_sub: { id: 'sess_sub', origin: 'subagent' },
        sess_arch: { id: 'sess_arch', blank: false },
      },
      archivedSessionIds: ['sess_arch'],
    });
    assert.deepEqual(tabs, ['sess_1', 'sess_2', 'sess_3']);
  });

  it('applies 0.2.2-rc.3 client runtime resilience guards idempotently', () => {
    applyDshUpstreamSync(process.cwd());
    applyDshUpstreamSync(process.cwd());

    const nmScope = path.join(process.cwd(), 'node_modules/@deepseek-ai');
    const sessCtrl = fs.readFileSync(
      path.join(nmScope, 'dsh-api-session-controller/lib/client.js'),
      'utf8',
    );
    assert.ok(
      sessCtrl.includes('String(error.message||error).includes("signal is aborted")'),
      'session-controller client should guard control stream abort errors',
    );
    assert.ok(
      sessCtrl.includes('if(this.record===void 0&&this.releaseReference===void 0)return;'),
      'ClientSessionReference.release() should be idempotent',
    );

    const cordisRunner = fs.readFileSync(
      path.join(nmScope, 'dsh-cordis-client-runner/lib/client.js'),
      'utf8',
    );
    assert.ok(
      cordisRunner.includes('let rem;try{rem=ctx.remote}catch{return}const fn=rem?.dynamicCordisRunner?.syncInspectManifest;if(typeof fn!=="function")return;'),
      'cordis-client-runner should guard missing syncInspectManifest function and inactive context',
    );

    const sidebarRight = fs.readFileSync(
      path.join(nmScope, 'dsh-client-ui-sidebar-right/lib/client.js'),
      'utf8',
    );
    assert.ok(
      sidebarRight.includes('if(this.retired||this.disposed||String(error?.message??error).includes("is released")'),
      'sidebar-right should ignore disposed/released session reference errors',
    );
  });
});

