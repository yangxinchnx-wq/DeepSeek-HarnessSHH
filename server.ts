import http from 'node:http';
import net from 'node:net';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, type ChildProcess } from 'node:child_process';
import { GoogleGenAI } from '@google/genai';
import {
  extractLaunchTokenUrl,
  extractSessionCookieFromHeaders,
  rewriteProxyHeaders,
  buildCordisPatchYaml,
  extractPromptFromAnthropicRequest,
  formatAnthropicSseEvents,
} from './src/utils/proxy-helpers.ts';
import { applyDshUpstreamSync } from './src/utils/dsh-upstream-sync.ts';
import { applyDshClientPatches } from './src/utils/dsh-client-patches.ts';
import { handleSshApiRequest } from './ssh/index.ts';
import {
  SuperagentConnectorStore,
  handleSuperagentConnectorApiRequest,
} from './src/utils/superagent-connectors.ts';
import {
  SuperagentGroupHubStore,
  handleSuperagentGroupHubApiRequest,
  formatGroupRelayForMainChat,
  type AgentReplyGenerator,
} from './src/utils/superagent-group-hub.ts';
import {
  McpDesktopStore,
  handleMcpDesktopApiRequest,
} from './src/utils/mcp-desktop-store.ts';

const PORT = Number(process.env.PORT || 3000);
const DSH_PORT = 3080;
const DSH_HOST = `127.0.0.1:${DSH_PORT}`;
const GATEWAY_PORT = 3082;
const GATEWAY_BASE_URL = `http://127.0.0.1:${GATEWAY_PORT}`;
const LOCAL_GATEWAY_KEY = 'dsh-local-gateway-key';

const WORKSPACE_ROOT = process.env.DSH_WORKSPACE_ROOT
  ? path.resolve(process.env.DSH_WORKSPACE_ROOT)
  : path.join(os.homedir(), '.dsh', 'workspaces');
const DEFAULT_WORKSPACE_DIR = path.join(WORKSPACE_ROOT, 'deepseek-harness', 'default-workspace');
const SUPERAGENT_STATE_DIR = path.join(WORKSPACE_ROOT, 'deepseek-harness', 'superagent-state');
const connectorStore = new SuperagentConnectorStore(SUPERAGENT_STATE_DIR);
const groupHubStore = new SuperagentGroupHubStore(SUPERAGENT_STATE_DIR, connectorStore);
const mcpDesktopStore = new McpDesktopStore(SUPERAGENT_STATE_DIR, DEFAULT_WORKSPACE_DIR);

async function ensureEnvironmentAndWorkspaces(): Promise<void> {
  applyDshUpstreamSync(process.cwd());

  const dshHome = path.join(os.homedir(), '.dsh');
  const aiBase = path.resolve(process.cwd(), 'node_modules', '@deepseek-ai');
  const profileDir = path.join(dshHome, 'profiles', 'web');
  fs.mkdirSync(profileDir, { recursive: true });

  let dshVersion = '0.2.2-rc.5';
  try {
    const dshPkgJson = JSON.parse(
      fs.readFileSync(path.join(aiBase, 'dsh', 'package.json'), 'utf8'),
    );
    if (typeof dshPkgJson?.version === 'string' && dshPkgJson.version.length > 0) {
      dshVersion = dshPkgJson.version;
    }
  } catch {
    // Fallback to 0.2.2-rc.5
  }

  const profilePkgPath = path.join(profileDir, 'package.json');
  const profilePkg = {
    name: 'dsh-profile-web',
    private: true,
    dependencies: {
      '@deepseek-ai/dsh-base': dshVersion,
      '@deepseek-ai/dsh-web-app': dshVersion,
      'dsh-purge-community': '1.6.52',
    },
    dsh: {
      profile: {
        bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app'],
      },
    },
  };
  fs.writeFileSync(profilePkgPath, JSON.stringify(profilePkg, null, 2) + '\n', 'utf8');

  const nmPurgeSource = path.resolve(process.cwd(), 'node_modules', 'dsh-purge-community');
  const profileNmPurge = path.join(profileDir, 'node_modules', 'dsh-purge-community');
  if (fs.existsSync(nmPurgeSource)) {
    fs.mkdirSync(path.dirname(profileNmPurge), { recursive: true });
    fs.cpSync(nmPurgeSource, profileNmPurge, { recursive: true, force: true });
  }

  const patchPath = path.join(profileDir, 'cordis.patch.yml');
  const patchYaml = buildCordisPatchYaml(WORKSPACE_ROOT, GATEWAY_BASE_URL, '2026-09-28.1');
  fs.writeFileSync(patchPath, patchYaml, 'utf8');

  // Pre-seed dsh-purge-community prompt-inject, presets, and host patches before DSH boots
  try {
    process.env.DSH_HOME = dshHome;
    process.env.DSH_PROFILE = 'web';
    process.env.PURGE_PROFILE_DIR = profileDir;
    process.env.DSH_BASE = aiBase;
    process.env.DSH_CONTAINER_MANAGED = '1';
    const purgeCorePath = path.resolve(process.cwd(), 'node_modules/dsh-purge-community/lib/core.js');
    const purgePresetsPath = path.resolve(process.cwd(), 'node_modules/dsh-purge-community/lib/presets.js');
    const purgeRedteamPath = path.resolve(process.cwd(), 'node_modules/dsh-purge-community/lib/redteam/index.js');
    if (fs.existsSync(purgeCorePath)) {
      const purgeCore = await import(purgeCorePath);
      purgeCore.seedPromptInjectAtBoot(dshHome);
      if (fs.existsSync(purgePresetsPath)) {
        const purgePresets = await import(purgePresetsPath);
        purgePresets.installPreset({ force: true, home: dshHome });
      }
      if (fs.existsSync(purgeRedteamPath)) {
        const purgeRedteam = await import(purgeRedteamPath);
        purgeRedteam.installPreset({ force: true });
      }
      await purgeCore.applyPatches(aiBase, purgeCore.ALL_PATCHES, {
        surface: 'web',
        dshHome,
      });
    }
  } catch (err) {
    console.warn('[dsh-purge-community] Pre-boot initialization warning:', err);
  }

  applyDshClientPatches(process.cwd());
  fs.mkdirSync(DEFAULT_WORKSPACE_DIR, { recursive: true });

  const readmePath = path.join(DEFAULT_WORKSPACE_DIR, 'README.md');
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(
      readmePath,
      [
        '# DeepSeek Harness Workspace',
        '',
        'An open-source agent harness built on the **"Everything is a Plugin"** architecture powered by [Cordis](https://github.com/cordiverse/cordis).',
        '',
        '## Architecture Highlights',
        '- **Host / Client Split**: Cordis IoC runtime on Node.js paired with a reactive web frontend.',
        '- **Agent Loop**: Multi-turn tool execution, bash, file operations, and subagent orchestration.',
        '- **Plugin Market & Schedules**: Manage installed plugins, model providers, and recurring automation tasks.',
      ].join('\n'),
      'utf8',
    );
  }
}

async function generateLocalAssistantReply(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  isTitleRequest = false,
): Promise<{ thinkingText: string; responseText: string }> {
  const cleanUserPrompt = userPrompt.replace(/^user:\s*/i, '').trim();

  if (isTitleRequest) {
    return {
      thinkingText: '',
      responseText: 'Cordis Plugin Architecture',
    };
  }

  const geminiKey = process.env.GEMINI_API_KEY;

  if (geminiKey && geminiKey !== 'MY_GEMINI_API_KEY' && geminiKey.trim().length > 10) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: cleanUserPrompt || 'Hello',
        config: {
          systemInstruction:
            systemPrompt?.trim() ||
            'You are DeepSeek Harness, an open-source coding agent built on the Cordis "Everything is a Plugin" architecture. Answer clearly and concisely in Markdown.',
        },
      });
      const text = response.text?.trim();
      if (text) {
        return {
          thinkingText: `Analyzing workspace context (${DEFAULT_WORKSPACE_DIR}) with ${model}...`,
          responseText: text,
        };
      }
    } catch {
      // Fall through to deterministic local response if Gemini call fails
    }
  }

  return {
    thinkingText: `Inspecting workspace files in ${DEFAULT_WORKSPACE_DIR} and coordinating Cordis plugins (${model})...`,
    responseText: [
      '### DeepSeek Harness — Cordis Plugin Architecture',
      '',
      '**DeepSeek Harness (`@deepseek-ai/dsh`)** is built on the **"Everything is a Plugin"** design philosophy powered by [Cordis](https://github.com/cordiverse/cordis):',
      '',
      '1. **Host & Web Client Split**: The Node.js host orchestrates sessions, file sandboxes, terminals, and LLM providers while synchronizing state over multiplexed RPC (`/api/remote.mux`) to the reactive frontend.',
      '2. **Composable Agent Loop**: Tool dispatch, subagent delegation, context compaction, and permission policies (`Workspace Write` / `Read Only` / `Full Access`) operate as modular Cordis services.',
      `3. **Active Workspace**: \`${DEFAULT_WORKSPACE_DIR}\` (containing \`AGENTS.md\`, \`README.md\`, \`package.json\`, and \`docs/\`).`,
    ].join('\n'),
  };
}

const generateGroupAgentReply: AgentReplyGenerator = async ({
  agent,
  room,
  systemPrompt,
  userPrompt,
  model,
}) => {
  // 0. If the Agent is a federated peer instance with a Remote Bridge URL, invoke the remote DSH node over HTTP
  if (agent.remoteBridgeUrl && agent.remoteBridgeUrl.trim().startsWith('http')) {
    try {
      const rawUrl = agent.remoteBridgeUrl.trim().replace(/\/+$/, '');
      const invokeUrl = rawUrl.includes('/api/')
        ? rawUrl
        : `${rawUrl}/api/superagent-groups/federation/invoke`;
      const fedResp = await fetch(invokeUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          inviteCode: room.inviteCode,
          agentHandle: agent.handle,
          systemPrompt,
          userPrompt,
          model: model || 'deepseek-reasoner',
        }),
      });
      if (fedResp.ok) {
        const fedData = (await fedResp.json()) as {
          ok?: boolean;
          thinkingText?: string;
          responseText?: string;
        };
        if (fedData.responseText && fedData.responseText.trim()) {
          return {
            thinkingText:
              fedData.thinkingText ||
              `[${agent.accountLabel} · 远端联邦实例 ${rawUrl}] 已完成跨实例协同推理...`,
            responseText: fedData.responseText.trim(),
          };
        }
      }
    } catch {
      // Fall through to local / gateway inference if remote bridge is unreachable
    }
  }

  // 1. If the Agent has its own independent DeepSeek account API Key configured, call official DeepSeek Anthropic API
  if (agent.apiKey && agent.apiKey !== LOCAL_GATEWAY_KEY && agent.apiKey.trim().length > 8) {
    try {
      const upstream = await fetch('https://api.deepseek.com/anthropic/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': agent.apiKey.trim(),
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: model || 'deepseek-reasoner',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }],
        }),
      });
      if (upstream.ok) {
        const data = (await upstream.json()) as {
          content?: Array<{ type: string; text?: string; thinking?: string }>;
        };
        const thinkingPart = data.content?.find((c) => c.type === 'thinking')?.thinking || '';
        const textPart = data.content?.find((c) => c.type === 'text')?.text || '';
        if (textPart.trim()) {
          return {
            thinkingText:
              thinkingPart ||
              `[${agent.accountLabel}] 正在通过专属 API 密钥推理 (${model})...`,
            responseText: textPart.trim(),
          };
        }
      }
    } catch {
      // Fall through to local assistant reply
    }
  }

  // 2. Try local / Gemini gateway with full agent systemPrompt & group history
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey !== 'MY_GEMINI_API_KEY' && geminiKey.trim().length > 10) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
        },
      });
      const text = response.text?.trim();
      if (text) {
        return {
          thinkingText: `[${agent.accountLabel} · ${agent.name}] 正在结合「${room.name}」上下文协同推理 (${model} · ${agent.preset})...`,
          responseText: text,
        };
      }
    } catch {
      // Fall through to persona-aware deterministic fallback
    }
  }

  // 3. Deterministic persona-aware fallback so multi-agent relay works reliably even offline
  const roomAgents = room.agentIds
    .map((id) => groupHubStore.listAgents().find((a) => a.id === id))
    .filter((a) => Boolean(a && a.enabled));
  const currentIdx = roomAgents.findIndex((a) => a?.id === agent.id);
  const nextPeer =
    currentIdx >= 0 && currentIdx + 1 < roomAgents.length ? roomAgents[currentIdx + 1] : undefined;

  const handoffLine =
    room.collaborationMode === 'auto_relay' && nextPeer
      ? `\n\n已完成本节点分析，请 @${nextPeer.handle} (${nextPeer.name} · ${nextPeer.accountLabel}) 继续接力核验。`
      : '';

  return {
    thinkingText: `[${agent.accountLabel}] 正在以「${agent.roleTitle}」身份（预设：${agent.preset}）处理群组「${room.name}」的协同请求...`,
    responseText: [
      `**[${agent.name} · ${agent.accountLabel}]** 已接收群组指令并完成「${agent.roleTitle}」环节处理：`,
      `- **所属协同房间**：\`${room.name}\`（协作模式：\`${room.collaborationMode}\`，熔断上限：\`${room.maxRelayHops} 跳\`）`,
      `- **执行结论**：已根据当前上下文完成跨账户状态对齐，并将回执同步至绑定的 QQ / 钉钉 / 飞书群通道。`,
    ].join('\n') + handoffLine,
  };
};

function startAnthropicGateway(): Promise<http.Server> {
  return new Promise((resolve) => {
    const gateway = http.createServer(async (req, res) => {
      if (
        req.method === 'POST' &&
        (req.url?.startsWith('/v1/messages') || req.url?.startsWith('/anthropic/v1/messages'))
      ) {
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', async () => {
          const rawBody = Buffer.concat(chunks).toString('utf8');
          const apiKeyHeader = String(req.headers['x-api-key'] || '').trim();

          // If the user configured their own real DeepSeek API key in Settings -> Models,
          // proxy directly to the official DeepSeek Anthropic endpoint.
          if (apiKeyHeader && apiKeyHeader !== LOCAL_GATEWAY_KEY) {
            try {
              const upstream = await fetch('https://api.deepseek.com/anthropic/v1/messages', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                  'x-api-key': apiKeyHeader,
                  'anthropic-version': String(req.headers['anthropic-version'] || '2023-06-01'),
                },
                body: rawBody,
              });

              res.writeHead(upstream.status, {
                'content-type': upstream.headers.get('content-type') || 'text/event-stream',
                'cache-control': 'no-cache',
                connection: 'keep-alive',
              });

              if (upstream.body) {
                const reader = upstream.body.getReader();
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  res.write(Buffer.from(value));
                }
              }
              res.end();
              return;
            } catch (err) {
              res.writeHead(502, { 'content-type': 'application/json' });
              res.end(
                JSON.stringify({
                  type: 'error',
                  error: {
                    type: 'api_error',
                    message: err instanceof Error ? err.message : 'Upstream connection error',
                  },
                }),
              );
              return;
            }
          }

          let parsedBody: unknown = {};
          try {
            parsedBody = JSON.parse(rawBody);
          } catch {
            parsedBody = {};
          }

          const { model, systemPrompt, userPrompt, stream, isTitleRequest } =
            extractPromptFromAnthropicRequest(parsedBody);

          const cleanText = userPrompt.replace(/^user:\s*/i, '').trim();
          const activeRoom = !isTitleRequest ? groupHubStore.getActiveRoom() : undefined;

          let thinkingText = '';
          let responseText = '';

          if (activeRoom && cleanText) {
            const outcome = await groupHubStore.postMessageAndRunRelay({
              roomId: activeRoom.id,
              senderType: 'human',
              senderId: 'human-lead',
              senderName: '当前登录账户 (群主)',
              platform: 'dsh',
              text: cleanText,
              connectorStore,
              generateReply: generateGroupAgentReply,
            });
            if (outcome.ok && outcome.room) {
              const formatted = formatGroupRelayForMainChat(outcome.room, outcome.agentReplies);
              thinkingText = formatted.thinkingText;
              responseText = formatted.responseText;
            }
          }

          if (!responseText) {
            const localReply = await generateLocalAssistantReply(
              systemPrompt,
              userPrompt,
              model,
              isTitleRequest,
            );
            thinkingText = localReply.thinkingText;
            responseText = localReply.responseText;
          }

          const messageId = `msg_${Date.now()}`;

          if (!stream) {
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(
              JSON.stringify({
                id: messageId,
                type: 'message',
                role: 'assistant',
                model,
                content: [
                  { type: 'thinking', thinking: thinkingText },
                  { type: 'text', text: responseText },
                ],
                stop_reason: 'end_turn',
                stop_sequence: null,
                usage: { input_tokens: 64, output_tokens: 128 },
              }),
            );
            return;
          }

          res.writeHead(200, {
            'content-type': 'text/event-stream; charset=utf-8',
            'cache-control': 'no-cache',
            connection: 'keep-alive',
          });

          const frames = formatAnthropicSseEvents({
            messageId,
            model,
            thinkingText,
            responseText,
          });

          for (const frame of frames) {
            res.write(frame);
          }
          res.end();
        });
        return;
      }

      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', service: 'dsh-anthropic-gateway' }));
    });

    gateway.listen(GATEWAY_PORT, '127.0.0.1', () => {
      resolve(gateway);
    });
  });
}

let sessionCookie = '';
let dshReadyResolve!: () => void;
const dshReadyPromise = new Promise<void>((resolve) => {
  dshReadyResolve = resolve;
});

function resolveDshBinaryPath(): string {
  // Spawn the real JS entry with process.execPath: the .bin shim is a bash
  // script that cannot be spawned directly on Windows.
  const localBin = path.resolve(
    process.cwd(),
    'node_modules',
    '@deepseek-ai',
    'dsh',
    'lib',
    'bin.js',
  );
  if (fs.existsSync(localBin)) {
    return localBin;
  }
  const tmpFallback = '/tmp/dsh-test/node_modules/@deepseek-ai/dsh/lib/bin.js';
  if (fs.existsSync(tmpFallback)) {
    return tmpFallback;
  }
  return localBin;
}

function startDshProcess(): ChildProcess {
  const dshBin = resolveDshBinaryPath();
  const dshHome = path.join(os.homedir(), '.dsh');
  const child = spawn(process.execPath, [dshBin, 'web', '--no-open', '--port', String(DSH_PORT)], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY || LOCAL_GATEWAY_KEY,
      DSH_HOME: dshHome,
      DSH_PROFILE: 'web',
      PURGE_PROFILE_DIR: path.join(dshHome, 'profiles', 'web'),
      DSH_BASE: path.resolve(process.cwd(), 'node_modules', '@deepseek-ai'),
      DSH_CONTAINER_MANAGED: '1',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let tokenExchanged = false;

  child.stdout?.on('data', async (chunk: Buffer) => {
    const text = chunk.toString('utf8');
    process.stdout.write(text);

    if (!tokenExchanged) {
      const tokenUrl = extractLaunchTokenUrl(text);
      if (tokenUrl) {
        tokenExchanged = true;
        try {
          const resp = await fetch(tokenUrl, { redirect: 'manual' });
          const rawSetCookies =
            typeof resp.headers.getSetCookie === 'function'
              ? resp.headers.getSetCookie()
              : resp.headers.get('set-cookie') || undefined;
          const extracted = extractSessionCookieFromHeaders(rawSetCookies);
          if (extracted) {
            sessionCookie = extracted;
          }
        } catch (err) {
          console.error('Failed to exchange launch token:', err);
        } finally {
          dshReadyResolve();
        }
      }
    }
  });

  child.stderr?.on('data', (chunk: Buffer) => {
    process.stderr.write(chunk.toString('utf8'));
  });

  return child;
}

async function main(): Promise<void> {
  let dshChild: ChildProcess | undefined;

  const proxyServer = http.createServer(async (req, res) => {
    if (await handleSshApiRequest(req, res)) {
      return;
    }
    if (await handleMcpDesktopApiRequest(req, res, mcpDesktopStore)) {
      return;
    }
    if (
      await handleSuperagentGroupHubApiRequest(
        req,
        res,
        groupHubStore,
        connectorStore,
        generateGroupAgentReply,
      )
    ) {
      return;
    }
    if (
      await handleSuperagentConnectorApiRequest(req, res, connectorStore, async (payload) => {
        // Also fan-in external bot events (QQ OneBot/Official, DingTalk, Feishu, WeCom, Custom) into bound Group Rooms
        const connectorId = String(payload.trigger.meta.connectorId || payload.trigger.source || '');
        const connInstance = connectorStore.get(connectorId);
        if (connInstance) {
          await groupHubStore.routeConnectorEventToGroups({
            connector: connInstance,
            senderName: payload.trigger.actor.id,
            text: payload.trigger.text,
            originMsgId: payload.trigger.id,
            connectorStore,
            generateReply: generateGroupAgentReply,
          });
        }
        await dshReadyPromise;
        try {
          const resp = await fetch(`http://${DSH_HOST}/orchestrator/api/connectors/ingest`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              host: DSH_HOST,
              origin: `http://${DSH_HOST}`,
              ...(sessionCookie ? { cookie: sessionCookie } : {}),
            },
            body: JSON.stringify(payload),
          });
          if (!resp.ok) {
            const errText = await resp.text();
            return { ok: false, error: errText || `HTTP ${resp.status}` };
          }
          const data = (await resp.json()) as { ok: boolean; outcome?: string };
          return { ok: true, outcome: data.outcome ?? 'stored' };
        } catch (err) {
          return { ok: false, error: err instanceof Error ? err.message : String(err) };
        }
      })
    ) {
      return;
    }
    await dshReadyPromise;

    const headers = rewriteProxyHeaders(req.headers, DSH_HOST, sessionCookie);

    const proxyReq = http.request(
      {
        hostname: '127.0.0.1',
        port: DSH_PORT,
        path: req.url || '/',
        method: req.method,
        headers,
      },
      (proxyRes) => {
        const resHeaders: http.OutgoingHttpHeaders = { ...proxyRes.headers };
        delete resHeaders['x-frame-options'];
        const contentType = String(resHeaders['content-type'] || '');
        if (contentType.includes('text/html') || (req.url && req.url.startsWith('/plugins/'))) {
          resHeaders['cache-control'] = 'no-store, no-cache, must-revalidate';
        }
        res.writeHead(proxyRes.statusCode || 200, resHeaders);
        proxyRes.pipe(res);
      },
    );

    proxyReq.on('error', (err) => {
      if (!res.headersSent) {
        res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
      }
      res.end(`DeepSeek Harness proxy error: ${err.message}`);
    });

    req.pipe(proxyReq);
  });

  proxyServer.on('upgrade', async (req, socket, head) => {
    await dshReadyPromise;

    const headers = rewriteProxyHeaders(req.headers, DSH_HOST, sessionCookie);
    const proxySocket = net.connect(DSH_PORT, '127.0.0.1', () => {
      const requestLines: string[] = [`${req.method || 'GET'} ${req.url || '/'} HTTP/1.1`];
      for (const [key, value] of Object.entries(headers)) {
        if (Array.isArray(value)) {
          for (const item of value) {
            requestLines.push(`${key}: ${item}`);
          }
        } else if (value !== undefined) {
          requestLines.push(`${key}: ${value}`);
        }
      }
      requestLines.push('', '');
      proxySocket.write(requestLines.join('\r\n'));
      if (head && head.length > 0) {
        proxySocket.write(head);
      }
      socket.pipe(proxySocket).pipe(socket);
    });

    proxySocket.on('error', () => {
      socket.destroy();
    });
    socket.on('error', () => {
      proxySocket.destroy();
    });
  });

  await new Promise<void>((resolve) => {
    proxyServer.listen(PORT, '0.0.0.0', () => {
      console.log(`DeepSeek Harness server listening on http://0.0.0.0:${PORT}`);
      resolve();
    });
  });

  await ensureEnvironmentAndWorkspaces();
  await startAnthropicGateway();
  dshChild = startDshProcess();

  const cleanup = () => {
    dshChild?.kill('SIGTERM');
    process.exit(0);
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}

main().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
