import type { IncomingHttpHeaders } from 'node:http';

/**
 * Extracts the one-time launch token URL printed by `dsh web` on startup.
 * Example stdout line:
 *   "dsh web: http://127.0.0.1:3080/?token=eyJ..."
 */
export function extractLaunchTokenUrl(stdoutText: string): string | null {
  const match = stdoutText.match(/dsh web:\s*(http:\/\/127\.0\.0\.1:\d+\/\?token=[^\s]+)/);
  return match ? match[1] : null;
}

/**
 * Extracts the `dsh-auth-<hash>=<value>` cookie pair from Set-Cookie header(s).
 */
export function extractSessionCookieFromHeaders(
  setCookieHeaders: string | string[] | undefined,
): string {
  if (!setCookieHeaders) return '';
  const list = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
  const pairs: string[] = [];
  for (const header of list) {
    const firstPart = header.split(';')[0]?.trim();
    if (firstPart && firstPart.startsWith('dsh-auth-')) {
      pairs.push(firstPart);
    }
  }
  return pairs.join('; ');
}

/**
 * Rewrites incoming HTTP / WebSocket upgrade headers so that the loopback
 * `dsh web` Cordis server trusts requests forwarded from the AI Studio preview iframe.
 */
export function rewriteProxyHeaders(
  incomingHeaders: IncomingHttpHeaders,
  targetHost: string,
  sessionCookie: string,
): Record<string, string | string[]> {
  const headers: Record<string, string | string[]> = {};
  for (const [key, value] of Object.entries(incomingHeaders)) {
    if (value !== undefined) {
      headers[key.toLowerCase()] = value;
    }
  }

  headers['host'] = targetHost;
  headers['origin'] = `http://${targetHost}`;
  headers['referer'] = `http://${targetHost}/`;
  headers['sec-fetch-site'] = 'same-origin';

  if (sessionCookie) {
    const existingCookie =
      typeof headers['cookie'] === 'string'
        ? headers['cookie']
        : Array.isArray(headers['cookie'])
          ? headers['cookie'].join('; ')
          : '';

    const cookieName = sessionCookie.split('=')[0];
    if (!existingCookie.includes(`${cookieName}=`)) {
      headers['cookie'] = existingCookie ? `${existingCookie}; ${sessionCookie}` : sessionCookie;
    }
  }

  return headers;
}

/**
 * Generates the Cordis profile patch YAML (`cordis.patch.yml`) so that:
 * 1. `workspace-controller` has a valid `documentsDirectory` inside Linux containers.
 * 2. `llm-deepseek` routes Anthropic Messages requests through the local gateway.
 * 3. `ui-settings-general` records the preview notice version.
 */
export function buildCordisPatchYaml(
  documentsDirectory: string,
  gatewayBaseUrl: string,
  welcomeNoticeVersion = '2026-09-28.1',
  superagentStateDir = `${documentsDirectory}/.dsh-superagent`,
): string {
  return [
    '- id: workspace-controller',
    '  config:',
    `    documentsDirectory: ${documentsDirectory}`,
    '- id: llm-deepseek',
    '  config:',
    `    baseURL: ${gatewayBaseUrl}`,
    '- id: ui-settings-general',
    '  config:',
    `    welcomeNoticeVersion: ${welcomeNoticeVersion}`,
    '- id: permission',
    '  config:',
    '    defaultPreset: danger-full-access',
    '    presets:',
    '      read-only:',
    '        sandbox: read-only',
    '        approval: ask',
    '      workspace-write:',
    '        sandbox: workspace-write',
    '        approval: ask',
    '      danger-full-access:',
    '        sandbox: danger-full-access',
    '        approval: never',
    '- id: dsh-superagent',
    '  config:',
    `    stateDir: ${superagentStateDir}`,
    '',
  ].join('\n');
}

/**
 * Strips internal `<system-reminder>...</system-reminder>` blocks injected by
 * DeepSeek Harness context plugins from user message text.
 */
export function stripSystemReminders(text: string): string {
  return text
    .replace(/<system-reminder>[\s\S]*?<\/system-reminder>/gi, '')
    .replace(/Current working directory:[\s\S]*?Elapsed since the preceding model-visible message:[^\n]*\n?/gi, '')
    .replace(/Time sampled while preparing turn[\s\S]*?Elapsed since the preceding model-visible message:[^\n]*\n?/gi, '')
    .trim();
}

export interface AnthropicMessagesRequestInfo {
  model: string;
  systemPrompt: string;
  userPrompt: string;
  stream: boolean;
  isTitleRequest: boolean;
}

/**
 * Extracts the model, system prompt, cleaned user prompt, and whether the call is
 * an automatic session-title generation request from `@deepseek-ai/dsh-plugin-llm-deepseek`.
 */
export function extractPromptFromAnthropicRequest(body: unknown): AnthropicMessagesRequestInfo {
  const payload = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const model = typeof payload.model === 'string' && payload.model ? payload.model : 'deepseek-flash';
  const stream = payload.stream !== false;

  let systemPrompt = '';
  if (typeof payload.system === 'string') {
    systemPrompt = payload.system;
  } else if (Array.isArray(payload.system)) {
    systemPrompt = payload.system
      .map((part) => (part && typeof part === 'object' && 'text' in part ? String(part.text) : ''))
      .filter(Boolean)
      .join('\n');
  }

  let userPrompt = '';
  if (Array.isArray(payload.messages)) {
    const userBlocks: string[] = [];
    for (const msg of payload.messages) {
      if (!msg || typeof msg !== 'object') continue;
      const role = (msg as Record<string, unknown>).role;
      if (role !== 'user') continue;
      const content = (msg as Record<string, unknown>).content;
      if (typeof content === 'string') {
        const cleaned = stripSystemReminders(content);
        if (cleaned) userBlocks.push(cleaned);
      } else if (Array.isArray(content)) {
        for (const block of content) {
          if (!block || typeof block !== 'object') continue;
          const b = block as Record<string, unknown>;
          if (b.type === 'text' && typeof b.text === 'string') {
            const cleaned = stripSystemReminders(b.text);
            if (cleaned) userBlocks.push(cleaned);
          }
        }
      }
    }
    userPrompt = userBlocks.at(-1) || '';
  }

  const combinedLower = `${systemPrompt}\n${userPrompt}`.toLowerCase();
  const isTitleRequest =
    combinedLower.includes('concise title') ||
    combinedLower.includes('short title') ||
    combinedLower.includes('session title') ||
    combinedLower.includes('conversation title') ||
    (Array.isArray(payload.tools) && payload.tools.length === 0 && combinedLower.includes('title'));

  return { model, systemPrompt, userPrompt, stream, isTitleRequest };
}

export interface FormatAnthropicSseParams {
  messageId: string;
  model: string;
  thinkingText?: string;
  responseText: string;
  inputTokens?: number;
  outputTokens?: number;
}

/**
 * Formats a sequence of Anthropic Messages SSE frames compatible with
 * `@deepseek-ai/dsh-plugin-llm-deepseek` streaming parser.
 */
export function formatAnthropicSseEvents(params: FormatAnthropicSseParams): string[] {
  const {
    messageId,
    model,
    thinkingText,
    responseText,
    inputTokens = 64,
    outputTokens = 128,
  } = params;

  const events: string[] = [];
  const pushEvent = (event: string, data: unknown) => {
    events.push(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  pushEvent('message_start', {
    type: 'message_start',
    message: {
      id: messageId,
      type: 'message',
      role: 'assistant',
      model,
      content: [],
      stop_reason: null,
      stop_sequence: null,
      usage: {
        input_tokens: inputTokens,
        output_tokens: 1,
      },
    },
  });

  let blockIndex = 0;

  if (thinkingText && thinkingText.trim().length > 0) {
    pushEvent('content_block_start', {
      type: 'content_block_start',
      index: blockIndex,
      content_block: {
        type: 'thinking',
        thinking: '',
      },
    });

    pushEvent('content_block_delta', {
      type: 'content_block_delta',
      index: blockIndex,
      delta: {
        type: 'thinking_delta',
        thinking: thinkingText,
      },
    });

    pushEvent('content_block_stop', {
      type: 'content_block_stop',
      index: blockIndex,
    });

    blockIndex += 1;
  }

  pushEvent('content_block_start', {
    type: 'content_block_start',
    index: blockIndex,
    content_block: {
      type: 'text',
      text: '',
    },
  });

  pushEvent('content_block_delta', {
    type: 'content_block_delta',
    index: blockIndex,
    delta: {
      type: 'text_delta',
      text: responseText,
    },
  });

  pushEvent('content_block_stop', {
    type: 'content_block_stop',
    index: blockIndex,
  });

  pushEvent('message_delta', {
    type: 'message_delta',
    delta: {
      stop_reason: 'end_turn',
      stop_sequence: null,
    },
    usage: {
      output_tokens: outputTokens,
    },
  });

  pushEvent('message_stop', {
    type: 'message_stop',
  });

  return events;
}

export interface SessionSummaryLite {
  id: string;
  origin?: string;
  blank?: boolean;
  title?: string;
  displayTitle?: string;
}

/**
 * Reconciles the ordered list of browser task tab IDs with live workspace and session state.
 * Preserves existing tab creation order and appends newly created sessions at the end
 * (immediately before the trailing '+' button).
 */
export function reconcileBrowserTabIds(params: {
  previousOrder: string[];
  workspaceSessionIds: string[];
  allSessionIds: string[];
  summariesById: Record<string, SessionSummaryLite | undefined>;
  archivedSessionIds: string[];
}): string[] {
  const {
    previousOrder,
    workspaceSessionIds,
    allSessionIds,
    summariesById,
    archivedSessionIds,
  } = params;

  const archivedSet = new Set(archivedSessionIds);
  const validCandidates: string[] = [];
  const validSet = new Set<string>();

  for (const id of [...workspaceSessionIds, ...allSessionIds]) {
    if (!id || validSet.has(id) || archivedSet.has(id)) continue;
    const summary = summariesById[id];
    if (!summary || summary.origin === 'subagent') continue;
    validSet.add(id);
    validCandidates.push(id);
  }

  const nextOrder: string[] = [];
  const included = new Set<string>();

  for (const id of previousOrder) {
    if (validSet.has(id) && !included.has(id)) {
      nextOrder.push(id);
      included.add(id);
    }
  }

  for (const id of validCandidates) {
    if (!included.has(id)) {
      nextOrder.push(id);
      included.add(id);
    }
  }

  return nextOrder;
}

