import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export type ConnectorPlatform = 'dingtalk' | 'github' | 'feishu' | 'wecom' | 'qq' | 'custom';

export type ListenMode = 'mentions' | 'all' | 'direct';

export interface BotConnectorStats {
  receivedCount: number;
  lastReceivedAt: string;
  lastStatus: 'ready' | 'paused' | 'error';
  lastError?: string;
}

export interface BotConnectorInstance {
  id: string;
  platform: ConnectorPlatform;
  productName: string;
  name: string;
  enabled: boolean;
  listenMode: ListenMode;
  credentials: Record<string, string>;
  allowedChats: string;
  allowedUsers: string;
  wrapperScriptPath?: string;
  stats: BotConnectorStats;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectorFieldSpec {
  key: string;
  label: { zh: string; en: string };
  placeholder: string;
  type?: 'text' | 'password' | 'select';
  options?: Array<{ value: string; label: { zh: string; en: string } }>;
  hint?: { zh: string; en: string };
}

export interface ConnectorPlatformTemplate {
  platform: ConnectorPlatform;
  title: { zh: string; en: string };
  badge: string;
  summary: { zh: string; en: string };
  defaultListenMode: ListenMode;
  defaultCredentials: Record<string, string>;
  fields: ConnectorFieldSpec[];
}

export const CONNECTOR_PLATFORM_TEMPLATES: ConnectorPlatformTemplate[] = [
  {
    platform: 'dingtalk',
    title: { zh: '钉钉机器人 (DingTalk)', en: 'DingTalk Bot' },
    badge: 'DingTalk',
    summary: {
      zh: '支持多个钉钉企业内部应用机器人或群自定义 Webhook 机器人并行接入（免写脚本，支持 Stream / Webhook 双模式）。',
      en: 'Connect multiple DingTalk bots simultaneously via Stream or Outgoing/Custom Webhook without shell scripts.',
    },
    defaultListenMode: 'mentions',
    defaultCredentials: {
      connectionMode: 'stream',
      clientId: '',
      clientSecret: '',
      robotCode: '',
      outboundWebhook: '',
      signSecret: '',
    },
    fields: [
      {
        key: 'connectionMode',
        type: 'select',
        label: { zh: '接入模式', en: 'Connection Mode' },
        placeholder: 'stream',
        options: [
          { value: 'stream', label: { zh: 'Stream 长连接模式（推荐 · 无需公网域名）', en: 'Stream Mode (No public URL needed)' } },
          { value: 'webhook', label: { zh: 'HTTP Outgoing / 群自定义 Webhook 模式', en: 'HTTP Outgoing / Custom Webhook' } },
        ],
      },
      {
        key: 'clientId',
        label: { zh: 'AppKey / Client ID', en: 'AppKey / Client ID' },
        placeholder: 'dingxxxxxxxxxxxxxxxx',
        hint: { zh: '钉钉开放平台应用凭证中的 Client ID (原 AppKey)', en: 'Client ID (AppKey) from DingTalk Open Platform' },
      },
      {
        key: 'clientSecret',
        type: 'password',
        label: { zh: 'AppSecret / Client Secret', en: 'AppSecret / Client Secret' },
        placeholder: '••••••••••••••••••••••••',
        hint: { zh: '钉钉开放平台应用凭证中的 Client Secret', en: 'Client Secret from DingTalk Open Platform' },
      },
      {
        key: 'robotCode',
        label: { zh: 'RobotCode / 机器人编码（选填）', en: 'RobotCode (Optional)' },
        placeholder: 'dingxxxxxxxxxxxxxxxx',
      },
      {
        key: 'outboundWebhook',
        label: { zh: '群消息回复 Webhook 地址（选填）', en: 'Outbound Reply Webhook URL (Optional)' },
        placeholder: 'https://oapi.dingtalk.com/robot/send?access_token=...',
      },
      {
        key: 'signSecret',
        type: 'password',
        label: { zh: '加签密钥 SEC...（选填）', en: 'Sign Secret SEC... (Optional)' },
        placeholder: 'SECxxxxxxxxxxxxxxxxxxxxxxxx',
      },
    ],
  },
  {
    platform: 'github',
    title: { zh: 'GitHub 仓库与账号', en: 'GitHub Repository & Account' },
    badge: 'GitHub',
    summary: {
      zh: '填入仓库名与 Personal Access Token 即可自动生成底层隔离 CLI 包装器并监听 Issue / PR / 评论 / CI，支持多仓库多账号。',
      en: 'Enter repository and PAT token to auto-generate isolated CLI wrappers and watch Issues, PRs, comments, and CI.',
    },
    defaultListenMode: 'mentions',
    defaultCredentials: {
      repository: '',
      token: '',
      botUsername: '',
      events: 'issues,pulls,comments,ci',
      webhookSecret: '',
    },
    fields: [
      {
        key: 'repository',
        label: { zh: '监听仓库 (owner/name)', en: 'Repository (owner/name)' },
        placeholder: 'deepseek-ai/dsh-superagent-prototype',
      },
      {
        key: 'token',
        type: 'password',
        label: { zh: 'GitHub Token (PAT / Fine-grained Token)', en: 'GitHub Personal Access Token' },
        placeholder: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        hint: { zh: '保存后系统将自动为您生成免配置的 gh 隔离包装脚本', en: 'Automatically generates an isolated gh CLI wrapper upon save' },
      },
      {
        key: 'botUsername',
        label: { zh: '机器人 GitHub 账号名 (@login)', en: 'Bot GitHub Login (@username)' },
        placeholder: 'my-agent-bot',
      },
      {
        key: 'events',
        label: { zh: '监听事件范围', en: 'Watched Events' },
        placeholder: 'issues,pulls,comments,ci',
      },
    ],
  },
  {
    platform: 'feishu',
    title: { zh: '飞书 / Lark 机器人', en: 'Feishu / Lark Bot' },
    badge: 'Feishu',
    summary: {
      zh: '直接填写飞书 App ID 与 App Secret，系统自动生成底层 lark-cli 严格模式配置，支持同时挂载多个飞书机器人实例。',
      en: 'Directly enter Feishu App ID and App Secret; automatically provisions strict-mode lark-cli wrappers and supports multiple bots.',
    },
    defaultListenMode: 'mentions',
    defaultCredentials: {
      brand: 'feishu',
      appId: '',
      appSecret: '',
      verificationToken: '',
      encryptKey: '',
    },
    fields: [
      {
        key: 'brand',
        type: 'select',
        label: { zh: '平台版本', en: 'Platform Brand' },
        placeholder: 'feishu',
        options: [
          { value: 'feishu', label: { zh: '飞书 (feishu.cn)', en: 'Feishu (feishu.cn)' } },
          { value: 'lark', label: { zh: 'Lark 国际版 (larksuite.com)', en: 'Lark (larksuite.com)' } },
        ],
      },
      {
        key: 'appId',
        label: { zh: 'App ID', en: 'App ID' },
        placeholder: 'cli_a1b2c3d4e5f6g7h8',
      },
      {
        key: 'appSecret',
        type: 'password',
        label: { zh: 'App Secret', en: 'App Secret' },
        placeholder: '••••••••••••••••••••••••',
      },
      {
        key: 'verificationToken',
        label: { zh: 'Verification Token（Webhook 选填）', en: 'Verification Token (Optional)' },
        placeholder: 'v_xxxxxxxxxxxxxxxx',
      },
    ],
  },
  {
    platform: 'wecom',
    title: { zh: '企业微信机器人 (WeCom)', en: 'WeCom Bot' },
    badge: 'WeCom',
    summary: {
      zh: '支持企业微信智能机器人回调与群 Webhook 推送，支持多部门多账号隔离接入。',
      en: 'Connect WeCom enterprise bots and group webhooks with multi-account isolation.',
    },
    defaultListenMode: 'mentions',
    defaultCredentials: {
      corpId: '',
      agentId: '',
      secret: '',
      webhookUrl: '',
      token: '',
      encodingAesKey: '',
    },
    fields: [
      {
        key: 'corpId',
        label: { zh: '企业 ID (CorpID)', en: 'CorpID' },
        placeholder: 'wwxxxxxxxxxxxxxxxx',
      },
      {
        key: 'agentId',
        label: { zh: '应用 AgentId / 机器人 Key', en: 'AgentId / Webhook Key' },
        placeholder: '1000002',
      },
      {
        key: 'secret',
        type: 'password',
        label: { zh: '应用 Secret', en: 'App Secret' },
        placeholder: '••••••••••••••••••••••••',
      },
      {
        key: 'webhookUrl',
        label: { zh: '群机器人回复 Webhook URL（选填）', en: 'Group Webhook URL (Optional)' },
        placeholder: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=...',
      },
    ],
  },
  {
    platform: 'qq',
    title: { zh: 'QQ 群机器人 (OneBot v11 / 官方 Bot)', en: 'QQ Bot (OneBot v11 / Official)' },
    badge: 'QQ Bot',
    summary: {
      zh: '同时支持 OneBot v11 协议（NapCat / LLOneBot / Lagrange 正反向 HTTP/WS）与 QQ 开放平台官方机器人 AppID 接入，支持多 QQ 群协同。',
      en: 'Connect QQ Group & Guild bots via OneBot v11 (NapCat / Lagrange) or QQ Open Platform Official Bot.',
    },
    defaultListenMode: 'mentions',
    defaultCredentials: {
      protocolMode: 'onebot_v11',
      onebotHttpUrl: 'http://127.0.0.1:3000',
      onebotAccessToken: '',
      targetGroupId: '',
      appId: '',
      clientSecret: '',
      token: '',
      sandbox: 'false',
    },
    fields: [
      {
        key: 'protocolMode',
        type: 'select',
        label: { zh: 'QQ 接入协议', en: 'QQ Protocol Mode' },
        placeholder: 'onebot_v11',
        options: [
          { value: 'onebot_v11', label: { zh: 'OneBot v11 协议 (NapCat / Lagrange / LLOneBot · 推荐)', en: 'OneBot v11 (NapCat / Lagrange / LLOneBot)' } },
          { value: 'official', label: { zh: 'QQ 开放平台官方机器人 (AppID + AppSecret)', en: 'QQ Official Open Platform Bot' } },
        ],
      },
      {
        key: 'onebotHttpUrl',
        label: { zh: 'OneBot HTTP API 地址 (选填，用于主动推送群消息)', en: 'OneBot HTTP API URL (Optional)' },
        placeholder: 'http://127.0.0.1:3001 (调用 /send_group_msg)',
      },
      {
        key: 'onebotAccessToken',
        type: 'password',
        label: { zh: 'OneBot Access Token (选填)', en: 'OneBot Access Token (Optional)' },
        placeholder: '••••••••••••••••••••••••',
      },
      {
        key: 'targetGroupId',
        label: { zh: '绑定 QQ 群号 / Group OpenID', en: 'Target QQ Group ID / OpenID' },
        placeholder: '例如 748291032 或 GROUP_OPENID',
      },
      {
        key: 'appId',
        label: { zh: '官方机器人 AppID (官方模式必填)', en: 'Official Bot AppID' },
        placeholder: '1020xxxxxxxx',
      },
      {
        key: 'clientSecret',
        type: 'password',
        label: { zh: '官方 AppSecret (Client Secret)', en: 'Official AppSecret' },
        placeholder: '••••••••••••••••••••••••',
      },
      {
        key: 'token',
        type: 'password',
        label: { zh: 'Bot Token', en: 'Bot Token' },
        placeholder: '••••••••••••••••••••••••',
      },
    ],
  },
  {
    platform: 'custom',
    title: { zh: '自定义产品机器人 (通用 Webhook / API)', en: 'Custom Product Bot (Universal Webhook / API)' },
    badge: 'Custom',
    summary: {
      zh: '面向未来任意新产品（内部工单系统、Jira、Linear、Slack、Mattermost、自研 IM 等）的通用双向协议适配器。',
      en: 'Universal bidirectional adapter for any internal or third-party product via Webhook or HTTP polling.',
    },
    defaultListenMode: 'all',
    defaultCredentials: {
      inboundMode: 'webhook',
      webhookSecret: '',
      pollUrl: '',
      outboundUrl: '',
      outboundAuthHeader: '',
      outboundTemplate: '{"threadId":"{{threadId}}","reply":"{{text}}","ticketId":"{{ticketId}}"}',
      textPath: 'text',
      senderPath: 'sender',
      threadPath: 'threadId',
    },
    fields: [
      {
        key: 'inboundMode',
        type: 'select',
        label: { zh: '消息接入方式', en: 'Inbound Mode' },
        placeholder: 'webhook',
        options: [
          { value: 'webhook', label: { zh: 'HTTP Webhook 推送接入（自动生成专属接入地址）', en: 'Inbound HTTP Webhook' } },
          { value: 'poll', label: { zh: 'HTTP 主动轮询拉取 (REST API Polling)', en: 'Active HTTP Polling' } },
        ],
      },
      {
        key: 'webhookSecret',
        type: 'password',
        label: { zh: '接入鉴权密钥 / Bearer Token（选填）', en: 'Inbound Secret / Bearer Token (Optional)' },
        placeholder: '留空则不校验签名头',
      },
      {
        key: 'textPath',
        label: { zh: '消息正文 JSON 字段路径', en: 'Message Text JSON Path' },
        placeholder: 'text（支持点号路径如 data.message.content，留空自动识别）',
      },
      {
        key: 'senderPath',
        label: { zh: '发送者 JSON 字段路径', en: 'Sender ID/Name JSON Path' },
        placeholder: 'sender（如 user.name 或 author.id）',
      },
      {
        key: 'threadPath',
        label: { zh: '会话/群/工单 ID 字段路径', en: 'Thread/Chat ID JSON Path' },
        placeholder: 'threadId（如 chat_id 或 issue.key）',
      },
      {
        key: 'outboundUrl',
        label: { zh: '结果回传 Webhook URL（选填）', en: 'Outbound Reply Webhook URL (Optional)' },
        placeholder: 'https://your-product.internal/api/bot/reply',
      },
      {
        key: 'outboundAuthHeader',
        type: 'password',
        label: { zh: '回传请求 Authorization 头（选填）', en: 'Outbound Authorization Header (Optional)' },
        placeholder: 'Bearer xxxxx',
      },
      {
        key: 'outboundTemplate',
        label: { zh: '回传 JSON 模板', en: 'Outbound JSON Body Template' },
        placeholder: '{"threadId":"{{threadId}}","reply":"{{text}}"}',
        hint: { zh: '可用占位符：{{text}}、{{threadId}}、{{senderId}}、{{messageId}}、{{ticketId}}', en: 'Placeholders: {{text}}, {{threadId}}, {{senderId}}, {{messageId}}, {{ticketId}}' },
      },
    ],
  },
];

export function getPlatformTemplate(platform: ConnectorPlatform): ConnectorPlatformTemplate {
  return (
    CONNECTOR_PLATFORM_TEMPLATES.find((t) => t.platform === platform) ??
    CONNECTOR_PLATFORM_TEMPLATES[CONNECTOR_PLATFORM_TEMPLATES.length - 1]
  );
}

/**
 * Extracts a nested value from a JSON object using dot-separated path (e.g. "event.message.text"),
 * falling back to candidate keys if the path is empty or not found.
 */
export function extractByPath(
  obj: unknown,
  dotPath: string,
  fallbackPaths: string[] = [],
): string {
  const resolveSingle = (target: unknown, pathStr: string): unknown => {
    if (!pathStr || !target || typeof target !== 'object') return undefined;
    const segments = pathStr.split('.').map((s) => s.trim()).filter(Boolean);
    let current: unknown = target;
    for (const seg of segments) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return undefined;
      }
      current = (current as Record<string, unknown>)[seg];
    }
    return current;
  };

  for (const candidate of [dotPath, ...fallbackPaths]) {
    if (!candidate) continue;
    const val = resolveSingle(obj, candidate);
    if (typeof val === 'string' && val.trim().length > 0) {
      return val.trim();
    }
    if (typeof val === 'number' || typeof val === 'boolean') {
      return String(val);
    }
  }
  return '';
}

/**
 * Interpolates {{variable}} placeholders in a JSON or text template string.
 */
export function renderOutboundTemplate(
  template: string,
  variables: Record<string, string>,
): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_match, key: string) => {
    const raw = variables[key] ?? '';
    return raw.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  });
}

export interface NormalizedTriggerResult {
  challenge?: string;
  trigger: {
    id: string;
    source: string;
    threads: Array<{ source: string; id: string }>;
    actor: { source: string; id: string };
    human: boolean;
    addressed?: 'direct' | 'mention';
    at: string;
    text: string;
    channel: {
      source: string;
      thread: string;
      address: Record<string, string>;
    };
    meta: Record<string, unknown>;
  };
  threadMeta: {
    label: { zh: string; en: string };
    facts: Record<string, { label?: { zh: string; en: string }; value: string | { zh: string; en: string } }>;
  };
}

/**
 * Normalizes any incoming webhook or test event payload from DingTalk, Feishu, GitHub, WeCom, QQ, or Custom Product
 * into a standard dsh-superagent Trigger + Thread description metadata.
 */
export function normalizeConnectorWebhookPayload(
  instance: BotConnectorInstance,
  payload: Record<string, unknown>,
  nowIso = new Date().toISOString(),
): NormalizedTriggerResult {
  // Handle Feishu / Custom URL verification handshake
  if (typeof payload.challenge === 'string' && payload.challenge.length > 0) {
    const dummyId = crypto.createHash('sha256').update(`${instance.id}:challenge:${nowIso}`).digest('hex').slice(0, 32);
    return {
      challenge: payload.challenge,
      trigger: {
        id: dummyId,
        source: instance.id,
        threads: [{ source: instance.id, id: 'handshake' }],
        actor: { source: instance.id, id: 'system' },
        human: false,
        at: nowIso,
        text: 'URL Verification Handshake',
        channel: { source: instance.id, thread: `${instance.id}:handshake`, address: {} },
        meta: { connectorId: instance.id },
      },
      threadMeta: { label: { zh: instance.name, en: instance.name }, facts: {} },
    };
  }

  let text = '';
  let senderId = '';
  let threadId = '';
  let messageId = '';
  let direct = false;
  let mentioned = true;

  if (instance.platform === 'dingtalk') {
    // DingTalk Outgoing Webhook / Stream Callback structure
    text =
      extractByPath(payload, 'text.content', ['content.text', 'text', 'content', 'msg']) ||
      '';
    senderId =
      extractByPath(payload, 'senderNick', ['senderStaffId', 'senderId', 'sender', 'user']) ||
      'dingtalk-user';
    threadId =
      extractByPath(payload, 'conversationId', ['openConversationId', 'chatId', 'threadId']) ||
      'dingtalk-default-chat';
    messageId =
      extractByPath(payload, 'msgId', ['messageId', 'id']) ||
      `dt_${Date.now()}`;
    const convType = extractByPath(payload, 'conversationType', []);
    direct = convType === '1' || payload.direct === true;
    mentioned = payload.isInAtList !== false;
  } else if (instance.platform === 'feishu') {
    // Feishu v2 event or simplified payload
    const rawContent = extractByPath(payload, 'event.message.content', ['content', 'text']);
    if (rawContent.startsWith('{')) {
      try {
        const parsedContent = JSON.parse(rawContent) as Record<string, unknown>;
        text = String(parsedContent.text ?? rawContent);
      } catch {
        text = rawContent;
      }
    } else {
      text = rawContent;
    }
    senderId =
      extractByPath(payload, 'event.sender.sender_id.open_id', ['sender_id', 'sender', 'user']) ||
      'feishu-user';
    threadId =
      extractByPath(payload, 'event.message.chat_id', ['chat_id', 'chatId', 'threadId']) ||
      'oc_default_chat';
    messageId =
      extractByPath(payload, 'event.message.message_id', ['message_id', 'messageId', 'id']) ||
      `om_${Date.now()}`;
    const chatType = extractByPath(payload, 'event.message.chat_type', ['chat_type']);
    direct = chatType === 'p2p' || payload.direct === true;
  } else if (instance.platform === 'github') {
    const issueNum = extractByPath(payload, 'issue.number', ['pull_request.number', 'number', 'threadId']) || '1';
    const title = extractByPath(payload, 'issue.title', ['pull_request.title', 'title']);
    const body = extractByPath(payload, 'comment.body', ['issue.body', 'pull_request.body', 'text', 'content']);
    text = [title, body].filter(Boolean).join('\n\n') || 'GitHub Issue / PR event';
    senderId = extractByPath(payload, 'sender.login', ['user.login', 'sender']) || 'github-user';
    threadId = `${instance.credentials.repository || 'repo'}#${issueNum}`;
    messageId = extractByPath(payload, 'comment.id', ['issue.id', 'pull_request.id', 'id']) || `gh_${Date.now()}`;
  } else if (instance.platform === 'wecom') {
    text = extractByPath(payload, 'text.content', ['Content', 'text', 'content']) || '';
    senderId = extractByPath(payload, 'from.userid', ['FromUserName', 'sender', 'user']) || 'wecom-user';
    threadId = extractByPath(payload, 'chatid', ['ChatId', 'FromUserName', 'threadId']) || 'wecom-chat';
    messageId = extractByPath(payload, 'msgid', ['MsgId', 'id']) || `wx_${Date.now()}`;
    direct = extractByPath(payload, 'chattype', []) === 'single';
  } else if (instance.platform === 'qq') {
    // Supports both OneBot v11 (raw_message / message / sender.nickname / group_id) and QQ Official Bot (d.content / d.group_openid)
    text =
      extractByPath(payload, 'raw_message', ['message', 'd.content', 'content', 'text']) ||
      '';
    // Strip CQ codes like [CQ:at,qq=123456] into readable @mentions or clean text
    text = text.replace(/\[CQ:at,qq=([^,\]]+)(?:,name=([^\]]+))?\]/g, (_m, qq, name) => `@${name || qq} `).trim();
    senderId =
      extractByPath(payload, 'sender.card', [
        'sender.nickname',
        'd.author.username',
        'user_id',
        'd.author.id',
        'sender',
        'user',
      ]) || 'qq-user';
    threadId =
      extractByPath(payload, 'group_id', [
        'd.group_openid',
        'd.channel_id',
        'threadId',
      ]) ||
      instance.credentials.targetGroupId ||
      'qq-group';
    messageId =
      extractByPath(payload, 'message_id', ['d.id', 'id', 'messageId']) ||
      `qq_${Date.now()}`;
    direct = extractByPath(payload, 'message_type', []) === 'private';
  } else {
    // Universal Custom Product Bot
    text = extractByPath(payload, instance.credentials.textPath || 'text', [
      'text',
      'content',
      'message.text',
      'message.content',
      'message',
      'body',
      'data.text',
      'data.content',
      'prompt',
    ]);
    senderId =
      extractByPath(payload, instance.credentials.senderPath || 'sender', [
        'sender.name',
        'sender.id',
        'sender',
        'user.name',
        'user.id',
        'user',
        'author',
        'from',
      ]) || 'custom-user';
    threadId =
      extractByPath(payload, instance.credentials.threadPath || 'threadId', [
        'threadId',
        'thread_id',
        'chatId',
        'chat_id',
        'channelId',
        'issue.key',
        'ticketId',
        'sessionId',
      ]) || 'default-thread';
    messageId =
      extractByPath(payload, 'messageId', ['message_id', 'id', 'eventId']) ||
      `custom_${Date.now()}`;
  }

  if (!text) {
    text = JSON.stringify(payload);
  }

  const triggerId = crypto
    .createHash('sha256')
    .update(JSON.stringify([instance.id, threadId, messageId, text]))
    .digest('hex')
    .slice(0, 32);

  const sourceKey = instance.id;

  return {
    trigger: {
      id: triggerId,
      source: sourceKey,
      threads: [{ source: sourceKey, id: threadId }],
      actor: { source: sourceKey, id: senderId },
      human: true,
      ...(direct ? { addressed: 'direct' } : mentioned ? { addressed: 'mention' } : {}),
      at: nowIso,
      text,
      channel: {
        source: sourceKey,
        thread: `${sourceKey}:${threadId}`,
        address: {
          connectorId: instance.id,
          platform: instance.platform,
          threadId,
          messageId,
          senderId,
        },
      },
      meta: {
        connectorId: instance.id,
        connectorName: instance.name,
        platform: instance.platform,
        productName: instance.productName,
        chatId: threadId,
        messageId,
        senderId,
        direct,
        mentioned,
      },
    },
    threadMeta: {
      label: {
        zh: `${instance.name} · ${threadId}`,
        en: `${instance.name} · ${threadId}`,
      },
      facts: {
        connector: {
          label: { zh: '接入机器人实例', en: 'Bot Instance' },
          value: instance.name,
        },
        platform: {
          label: { zh: '所属产品/平台', en: 'Platform' },
          value: instance.productName,
        },
        sender: {
          label: { zh: '发送人', en: 'Sender' },
          value: senderId,
        },
      },
    },
  };
}

/**
 * Generates an executable CLI wrapper script for GitHub (`gh`) or Feishu (`lark-cli`)
 * so users never have to write bash scripts manually.
 */
export function buildConnectorWrapperScript(instance: BotConnectorInstance): {
  filename: string;
  content: string;
} | null {
  const safeId = instance.id.replace(/[^a-zA-Z0-9_-]/g, '-');
  if (instance.platform === 'github') {
    const token = (instance.credentials.token || '').trim();
    const repo = (instance.credentials.repository || '').trim();
    return {
      filename: `gh-${safeId}.sh`,
      content: [
        '#!/usr/bin/env bash',
        '# Auto-generated by Superagent Multi-Bot Connector Hub',
        'set -e',
        token ? `export GH_TOKEN=${JSON.stringify(token)}` : '# GH_TOKEN not set; using ambient gh auth',
        repo ? `export GH_REPO=${JSON.stringify(repo)}` : '',
        'exec gh "$@"',
        '',
      ]
        .filter((line) => line !== '')
        .join('\n'),
    };
  }
  if (instance.platform === 'feishu') {
    const appId = (instance.credentials.appId || '').trim();
    const appSecret = (instance.credentials.appSecret || '').trim();
    const brand = (instance.credentials.brand || 'feishu').trim();
    return {
      filename: `lark-${safeId}.sh`,
      content: [
        '#!/usr/bin/env bash',
        '# Auto-generated by Superagent Multi-Bot Connector Hub',
        'set -e',
        appId ? `export LARK_APP_ID=${JSON.stringify(appId)}` : '',
        appSecret ? `export LARK_APP_SECRET=${JSON.stringify(appSecret)}` : '',
        `export LARK_BRAND=${JSON.stringify(brand)}`,
        'exec lark-cli "$@"',
        '',
      ]
        .filter((line) => line !== '')
        .join('\n'),
    };
  }
  return null;
}

/**
 * Computes the next sequential account name and slug ID when adding multiple accounts
 * of the same platform (e.g. "钉钉机器人 · 账号 2", "钉钉机器人 · 账号 3").
 */
export function createNextConnectorInstance(
  existing: BotConnectorInstance[],
  input: {
    platform: ConnectorPlatform;
    name?: string;
    productName?: string;
    listenMode?: ListenMode;
    credentials?: Record<string, string>;
    allowedChats?: string;
    allowedUsers?: string;
  },
  nowIso = new Date().toISOString(),
): BotConnectorInstance {
  const template = getPlatformTemplate(input.platform);
  const samePlatform = existing.filter((item) => item.platform === input.platform);
  const nextIndex = samePlatform.length + 1;

  let baseSlug: string = input.platform;
  if (input.platform === 'custom' && input.productName) {
    const ascii = input.productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    if (ascii) baseSlug = `custom-${ascii}`;
  }

  let candidateId = nextIndex === 1 ? `${baseSlug}-default` : `${baseSlug}-${nextIndex}`;
  let suffix = nextIndex;
  while (existing.some((item) => item.id === candidateId)) {
    suffix += 1;
    candidateId = `${baseSlug}-${suffix}`;
  }

  const productName =
    input.productName?.trim() ||
    (input.platform === 'custom' ? '自定义产品 (Custom)' : template.title.zh);

  const defaultName =
    input.platform === 'custom'
      ? `${productName} · 机器人 #${nextIndex}`
      : `${template.title.zh.split(' ')[0]} · 账号 ${nextIndex}`;

  return {
    id: candidateId,
    platform: input.platform,
    productName,
    name: input.name?.trim() || defaultName,
    enabled: true,
    listenMode: input.listenMode ?? template.defaultListenMode,
    credentials: {
      ...template.defaultCredentials,
      ...(input.credentials ?? {}),
    },
    allowedChats: input.allowedChats?.trim() ?? '',
    allowedUsers: input.allowedUsers?.trim() || '*',
    stats: {
      receivedCount: 0,
      lastReceivedAt: '',
      lastStatus: 'ready',
    },
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}

export function createDefaultSeedConnectors(nowIso = new Date().toISOString()): BotConnectorInstance[] {
  const dingtalk1 = createNextConnectorInstance(
    [],
    {
      platform: 'dingtalk',
      name: '钉钉机器人 · 账号 1 (默认)',
      productName: '钉钉 (DingTalk)',
      listenMode: 'mentions',
      credentials: {
        connectionMode: 'stream',
        clientId: '',
        clientSecret: '',
        robotCode: '',
        outboundWebhook: '',
        signSecret: '',
      },
    },
    nowIso,
  );

  const github1 = createNextConnectorInstance(
    [dingtalk1],
    {
      platform: 'github',
      name: 'GitHub · 仓库账号 1 (默认)',
      productName: 'GitHub',
      listenMode: 'mentions',
      credentials: {
        repository: 'deepseek-ai/dsh-superagent-prototype',
        token: '',
        botUsername: 'dsh-agent',
        events: 'issues,pulls,comments,ci',
        webhookSecret: '',
      },
    },
    nowIso,
  );

  return [dingtalk1, github1];
}

export class SuperagentConnectorStore {
  private readonly filePath: string;
  private readonly binDir: string;
  private instances: BotConnectorInstance[] = [];

  constructor(stateDir: string) {
    fs.mkdirSync(stateDir, { recursive: true });
    this.filePath = path.join(stateDir, 'connectors.json');
    this.binDir = path.join(stateDir, 'connectors-bin');
    fs.mkdirSync(this.binDir, { recursive: true });
    this.load();
  }

  private load(): void {
    if (fs.existsSync(this.filePath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        if (Array.isArray(raw) && raw.length > 0) {
          this.instances = raw as BotConnectorInstance[];
          this.syncAllWrapperScripts();
          return;
        }
      } catch {
        // Fall through to seed defaults
      }
    }
    this.instances = createDefaultSeedConnectors();
    this.save();
  }

  private save(): void {
    this.syncAllWrapperScripts();
    fs.writeFileSync(this.filePath, JSON.stringify(this.instances, null, 2) + '\n', 'utf8');
  }

  private syncAllWrapperScripts(): void {
    for (const inst of this.instances) {
      const script = buildConnectorWrapperScript(inst);
      if (script) {
        const scriptPath = path.join(this.binDir, script.filename);
        try {
          fs.writeFileSync(scriptPath, script.content, { encoding: 'utf8', mode: 0o755 });
          fs.chmodSync(scriptPath, 0o755);
          inst.wrapperScriptPath = scriptPath;
        } catch {
          // Ignore chmod errors on restricted filesystems
        }
      }
    }
  }

  public list(): BotConnectorInstance[] {
    return [...this.instances];
  }

  public get(id: string): BotConnectorInstance | undefined {
    return this.instances.find((item) => item.id === id);
  }

  public add(input: {
    platform: ConnectorPlatform;
    name?: string;
    productName?: string;
    listenMode?: ListenMode;
    credentials?: Record<string, string>;
    allowedChats?: string;
    allowedUsers?: string;
  }): BotConnectorInstance {
    const created = createNextConnectorInstance(this.instances, input);
    this.instances.push(created);
    this.save();
    return created;
  }

  public duplicate(sourceId: string): BotConnectorInstance | undefined {
    const source = this.get(sourceId);
    if (!source) return undefined;
    const samePlatformCount = this.instances.filter((i) => i.platform === source.platform).length + 1;
    const baseTitle = source.name.replace(/\s*[·#]\s*(?:账号|机器人|#)?\s*\d+.*$/, '').trim() || source.productName;
    const created = createNextConnectorInstance(this.instances, {
      platform: source.platform,
      productName: source.productName,
      name: `${baseTitle} · 账号 ${samePlatformCount}`,
      listenMode: source.listenMode,
      credentials: { ...source.credentials },
      allowedChats: source.allowedChats,
      allowedUsers: source.allowedUsers,
    });
    this.instances.push(created);
    this.save();
    return created;
  }

  public update(
    id: string,
    patch: Partial<
      Pick<
        BotConnectorInstance,
        'name' | 'productName' | 'enabled' | 'listenMode' | 'credentials' | 'allowedChats' | 'allowedUsers'
      >
    >,
  ): BotConnectorInstance | undefined {
    const target = this.get(id);
    if (!target) return undefined;
    if (typeof patch.name === 'string' && patch.name.trim()) {
      target.name = patch.name.trim();
    }
    if (typeof patch.productName === 'string' && patch.productName.trim()) {
      target.productName = patch.productName.trim();
    }
    if (typeof patch.enabled === 'boolean') {
      target.enabled = patch.enabled;
      target.stats.lastStatus = patch.enabled ? 'ready' : 'paused';
    }
    if (patch.listenMode && ['mentions', 'all', 'direct'].includes(patch.listenMode)) {
      target.listenMode = patch.listenMode;
    }
    if (patch.credentials && typeof patch.credentials === 'object') {
      target.credentials = {
        ...target.credentials,
        ...Object.fromEntries(
          Object.entries(patch.credentials).map(([k, v]) => [k, String(v ?? '')]),
        ),
      };
    }
    if (typeof patch.allowedChats === 'string') {
      target.allowedChats = patch.allowedChats.trim();
    }
    if (typeof patch.allowedUsers === 'string') {
      target.allowedUsers = patch.allowedUsers.trim();
    }
    target.updatedAt = new Date().toISOString();
    this.save();
    return target;
  }

  public remove(id: string): boolean {
    const before = this.instances.length;
    this.instances = this.instances.filter((item) => item.id !== id);
    if (this.instances.length !== before) {
      this.save();
      return true;
    }
    return false;
  }

  public recordEvent(id: string, error?: string): void {
    const target = this.get(id);
    if (!target) return;
    if (error) {
      target.stats.lastStatus = 'error';
      target.stats.lastError = error;
    } else {
      target.stats.receivedCount += 1;
      target.stats.lastReceivedAt = new Date().toISOString();
      target.stats.lastStatus = target.enabled ? 'ready' : 'paused';
      delete target.stats.lastError;
    }
    this.save();
  }
}

function readJsonBody(req: http.IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? (JSON.parse(raw) as Record<string, unknown>) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function sendJson(res: http.ServerResponse, statusCode: number, payload: unknown): void {
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

export async function handleSuperagentConnectorApiRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  store: SuperagentConnectorStore,
  ingestToDsh: (payload: NormalizedTriggerResult) => Promise<{ ok: boolean; outcome?: string; error?: string }>,
): Promise<boolean> {
  const rawUrl = req.url || '/';
  if (!rawUrl.startsWith('/api/superagent-connectors')) {
    return false;
  }

  const parsedUrl = new URL(rawUrl, 'http://127.0.0.1');
  const pathname = parsedUrl.pathname;

  // GET /api/superagent-connectors
  if (req.method === 'GET' && pathname === '/api/superagent-connectors') {
    sendJson(res, 200, {
      ok: true,
      connectors: store.list(),
      templates: CONNECTOR_PLATFORM_TEMPLATES,
    });
    return true;
  }

  // POST /api/superagent-connectors
  if (req.method === 'POST' && pathname === '/api/superagent-connectors') {
    const body = await readJsonBody(req);
    const platform = (String(body.platform || 'dingtalk') as ConnectorPlatform);
    const created = store.add({
      platform,
      name: typeof body.name === 'string' ? body.name : undefined,
      productName: typeof body.productName === 'string' ? body.productName : undefined,
      listenMode: (body.listenMode as ListenMode) || undefined,
      credentials:
        body.credentials && typeof body.credentials === 'object'
          ? (body.credentials as Record<string, string>)
          : undefined,
      allowedChats: typeof body.allowedChats === 'string' ? body.allowedChats : undefined,
      allowedUsers: typeof body.allowedUsers === 'string' ? body.allowedUsers : undefined,
    });
    sendJson(res, 200, { ok: true, connector: created, connectors: store.list() });
    return true;
  }

  // Match /api/superagent-connectors/:id or /api/superagent-connectors/:id/:action
  const match = /^\/api\/superagent-connectors\/([^/]+)(?:\/([^/]+))?$/.exec(pathname);
  if (!match) {
    sendJson(res, 404, { ok: false, error: 'Unknown connector endpoint' });
    return true;
  }

  const connectorId = decodeURIComponent(match[1]);
  const action = match[2] ? decodeURIComponent(match[2]) : undefined;

  // PUT /api/superagent-connectors/:id
  if (req.method === 'PUT' && !action) {
    const body = await readJsonBody(req);
    const updated = store.update(connectorId, {
      name: typeof body.name === 'string' ? body.name : undefined,
      productName: typeof body.productName === 'string' ? body.productName : undefined,
      enabled: typeof body.enabled === 'boolean' ? body.enabled : undefined,
      listenMode: (body.listenMode as ListenMode) || undefined,
      credentials:
        body.credentials && typeof body.credentials === 'object'
          ? (body.credentials as Record<string, string>)
          : undefined,
      allowedChats: typeof body.allowedChats === 'string' ? body.allowedChats : undefined,
      allowedUsers: typeof body.allowedUsers === 'string' ? body.allowedUsers : undefined,
    });
    if (!updated) {
      sendJson(res, 404, { ok: false, error: 'Connector instance not found' });
      return true;
    }
    sendJson(res, 200, { ok: true, connector: updated, connectors: store.list() });
    return true;
  }

  // DELETE /api/superagent-connectors/:id
  if (req.method === 'DELETE' && !action) {
    const removed = store.remove(connectorId);
    if (!removed) {
      sendJson(res, 404, { ok: false, error: 'Connector instance not found' });
      return true;
    }
    sendJson(res, 200, { ok: true, connectors: store.list() });
    return true;
  }

  // POST /api/superagent-connectors/:id/duplicate
  if (req.method === 'POST' && action === 'duplicate') {
    const duplicated = store.duplicate(connectorId);
    if (!duplicated) {
      sendJson(res, 404, { ok: false, error: 'Connector instance not found' });
      return true;
    }
    sendJson(res, 200, { ok: true, connector: duplicated, connectors: store.list() });
    return true;
  }

  // POST /api/superagent-connectors/:id/test
  if (req.method === 'POST' && action === 'test') {
    const instance = store.get(connectorId);
    if (!instance) {
      sendJson(res, 404, { ok: false, error: 'Connector instance not found' });
      return true;
    }
    const body = await readJsonBody(req);
    const customText =
      typeof body.text === 'string' && body.text.trim()
        ? body.text.trim()
        : `[连通性测试] 来自「${instance.name}」(${instance.productName}) 的测试任务请求：请检查当前仓库状态并汇报。`;
    const samplePayload: Record<string, unknown> = {
      text: customText,
      content: customText,
      sender: typeof body.sender === 'string' && body.sender.trim() ? body.sender.trim() : 'admin-tester',
      senderNick: '测试管理员',
      threadId: `chat-${instance.id}`,
      conversationId: `chat-${instance.id}`,
      msgId: `test_${Date.now()}`,
    };
    const normalized = normalizeConnectorWebhookPayload(instance, samplePayload);
    const ingested = await ingestToDsh(normalized);
    store.recordEvent(instance.id, ingested.ok ? undefined : ingested.error);
    sendJson(res, 200, {
      ok: ingested.ok,
      outcome: ingested.outcome ?? 'stored',
      triggerId: normalized.trigger.id,
      threadKey: `${normalized.trigger.threads[0].source}:${normalized.trigger.threads[0].id}`,
      connector: store.get(connectorId),
      connectors: store.list(),
      ...(ingested.error ? { error: ingested.error } : {}),
    });
    return true;
  }

  // POST /api/superagent-connectors/:id/webhook
  if (req.method === 'POST' && action === 'webhook') {
    const instance = store.get(connectorId);
    if (!instance) {
      sendJson(res, 404, { ok: false, error: 'Connector instance not found' });
      return true;
    }
    if (!instance.enabled) {
      sendJson(res, 403, { ok: false, error: 'Connector instance is currently disabled' });
      return true;
    }

    const expectedSecret = (instance.credentials.webhookSecret || '').trim();
    if (expectedSecret) {
      const authHeader = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
      const tokenHeader = String(req.headers['x-webhook-token'] || req.headers['x-connector-secret'] || '').trim();
      if (authHeader !== expectedSecret && tokenHeader !== expectedSecret) {
        sendJson(res, 401, { ok: false, error: 'Invalid webhook secret or authorization token' });
        return true;
      }
    }

    const body = await readJsonBody(req);
    const normalized = normalizeConnectorWebhookPayload(instance, body);
    if (normalized.challenge) {
      sendJson(res, 200, { challenge: normalized.challenge });
      return true;
    }

    const ingested = await ingestToDsh(normalized);
    store.recordEvent(instance.id, ingested.ok ? undefined : ingested.error);
    sendJson(res, 200, {
      ok: ingested.ok,
      outcome: ingested.outcome ?? 'stored',
      triggerId: normalized.trigger.id,
      threadKey: `${normalized.trigger.threads[0].source}:${normalized.trigger.threads[0].id}`,
    });
    return true;
  }

  sendJson(res, 404, { ok: false, error: 'Unsupported connector operation' });
  return true;
}
