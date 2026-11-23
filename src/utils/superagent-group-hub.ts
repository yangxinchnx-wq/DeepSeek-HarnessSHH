import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type {
  BotConnectorInstance,
  ConnectorPlatform,
  SuperagentConnectorStore,
} from './superagent-connectors.ts';

export type AgentPresetMode = 'standard' | 'unrestricted' | 'redteam';

export type GroupCollaborationMode = 'smart_mention' | 'auto_relay' | 'all_broadcast';

export interface GroupAgentProfile {
  id: string;
  name: string;
  handle: string;
  accountLabel: string;
  roleTitle: string;
  preset: AgentPresetMode;
  model: string;
  systemPrompt: string;
  apiKey: string;
  remoteBridgeUrl: string;
  avatarColor: string;
  enabled: boolean;
  createdAt: string;
}

export interface GroupBroadcastReceipt {
  connectorId: string;
  connectorName: string;
  platform: ConnectorPlatform;
  status: 'delivered' | 'simulated' | 'failed';
  detail?: string;
}

export interface GroupMessage {
  id: string;
  roomId: string;
  senderType: 'human' | 'agent' | 'external_bot' | 'schedule';
  senderId: string;
  senderName: string;
  senderBadge: string;
  platform: 'dsh' | ConnectorPlatform | 'schedule';
  text: string;
  thinkingText?: string;
  mentions: string[];
  relayHop: number;
  originMsgId?: string;
  broadcastReceipts: GroupBroadcastReceipt[];
  createdAt: string;
}

export interface GroupRoom {
  id: string;
  name: string;
  avatarUrl?: string;
  description: string;
  inviteCode: string;
  collaborationMode: GroupCollaborationMode;
  maxRelayHops: number;
  cooldownMs: number;
  agentIds: string[];
  connectorIds: string[];
  scheduleBinding: string;
  messages: GroupMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface GroupHubState {
  agents: GroupAgentProfile[];
  rooms: GroupRoom[];
}

export type AgentReplyGenerator = (params: {
  agent: GroupAgentProfile;
  room: GroupRoom;
  systemPrompt: string;
  userPrompt: string;
  model: string;
}) => Promise<{ thinkingText: string; responseText: string }>;

export function createDefaultGroupAgents(nowIso = new Date().toISOString()): GroupAgentProfile[] {
  return [
    {
      id: 'agent-arch-a',
      name: '架构师 Agent',
      handle: 'arch',
      accountLabel: 'DeepSeek 账号 A (主研发账户)',
      roleTitle: '首席系统架构与代码拆解',
      preset: 'unrestricted',
      model: 'deepseek-reasoner',
      systemPrompt:
        '你是群组中的「架构师 Agent」（绑定 DeepSeek 账号 A）。负责解答核心架构设计、模块拆解与接口契约。若涉及安全边界或部署上线，请在回答末尾通过 @sec 或 @ops 邀请对应 Agent 接力协同。保持回答凝练专业。',
      apiKey: '',
      remoteBridgeUrl: '',
      avatarColor: '#3b82f6',
      enabled: true,
      createdAt: nowIso,
    },
    {
      id: 'agent-sec-b',
      name: '安全审计 Agent',
      handle: 'sec',
      accountLabel: 'DeepSeek 账号 B (红蓝实验室账户)',
      roleTitle: '红蓝对抗与安全合规审计',
      preset: 'redteam',
      model: 'deepseek-reasoner',
      systemPrompt:
        '你是群组中的「安全审计 Agent」（绑定 DeepSeek 账号 B，运行于红队/无限制评测预设）。负责对群内提出的架构方案、外部机器人上报的告警或代码变更进行漏洞排查与防环路加固建议。',
      apiKey: '',
      remoteBridgeUrl: '',
      avatarColor: '#ef4444',
      enabled: true,
      createdAt: nowIso,
    },
    {
      id: 'agent-ops-c',
      name: '运维与协调 Agent',
      handle: 'ops',
      accountLabel: 'DeepSeek 账号 C (SRE 自动化账户)',
      roleTitle: '跨平台通报与自动化任务编排',
      preset: 'standard',
      model: 'deepseek-chat',
      systemPrompt:
        '你是群组中的「运维与协调 Agent」（绑定 DeepSeek 账号 C）。负责汇总架构师与安全审计的结论，生成面向 QQ 群、钉钉群、飞书群的值班通报摘要与自动化任务执行清单。',
      apiKey: '',
      remoteBridgeUrl: '',
      avatarColor: '#10b981',
      enabled: true,
      createdAt: nowIso,
    },
  ];
}

export function createDefaultGroupRooms(
  connectorIds: string[] = ['dingtalk-default', 'qq-default', 'feishu-default'],
  nowIso = new Date().toISOString(),
): GroupRoom[] {
  return [
    {
      id: 'room-core-collab',
      name: '跨账户 Agent 与全平台机器人协同总群',
      description:
        '汇聚多个 DeepSeek 登录账户的专属 Agent 与 QQ 群 (OneBot v11 / 官方)、钉钉、飞书机器人，支持 @点名、多 Agent 自动接力与自动化任务巡检广播。',
      inviteCode: 'DSH-HUB-9021',
      collaborationMode: 'auto_relay',
      maxRelayHops: 2,
      cooldownMs: 1000,
      agentIds: ['agent-arch-a', 'agent-sec-b', 'agent-ops-c'],
      connectorIds,
      scheduleBinding: '每小时整点 · 跨平台状态同步与未决工单巡检',
      messages: [
        {
          id: 'msg-seed-1',
          roomId: 'room-core-collab',
          senderType: 'external_bot',
          senderId: 'qq-default',
          senderName: 'QQ 研发群 · @林工 (748291032)',
          senderBadge: 'QQ 群 (OneBot v11)',
          platform: 'qq',
          text: '@arch @sec 我们在生产网关准备开启跨实例 WebSocket 联邦桥接，请评估架构方案与鉴权签名风控要点，并同步给钉钉和飞书值班群。',
          mentions: ['arch', 'sec'],
          relayHop: 0,
          originMsgId: 'seed-qq-1001',
          broadcastReceipts: [],
          createdAt: nowIso,
        },
        {
          id: 'msg-seed-2',
          roomId: 'room-core-collab',
          senderType: 'agent',
          senderId: 'agent-arch-a',
          senderName: '架构师 Agent',
          senderBadge: 'DeepSeek 账号 A · 首席系统架构与代码拆解',
          platform: 'dsh',
          text: '收到 QQ 群 @林工 的请求。架构侧建议采用「Hub-and-Spoke 房间联邦总线」：\n1. 每个协同房间生成独立的 `inviteCode` 与 HMAC-SHA256 签名令牌；\n2. 跨账户 Agent 通过 `/api/superagent/groups/:roomId/messages` 投递标准 Envelope，并携带 `originMsgId` 与 `relayHop` 跳数；\n3. 请 @sec 继续补充重放攻击防护与速率限制细则。',
          thinkingText: '分析跨实例联邦桥接的拓扑结构、消息去重与跳数熔断机制，并交接给安全审计 Agent。',
          mentions: ['sec'],
          relayHop: 1,
          broadcastReceipts: [
            {
              connectorId: 'qq-default',
              connectorName: 'QQ 群机器人 · 账号 1',
              platform: 'qq',
              status: 'simulated',
              detail: 'OneBot v11 /send_group_msg 已就绪',
            },
            {
              connectorId: 'dingtalk-default',
              connectorName: '钉钉机器人 · 账号 1',
              platform: 'dingtalk',
              status: 'simulated',
              detail: 'DingTalk Stream/Webhook 通道已同步',
            },
          ],
          createdAt: nowIso,
        },
        {
          id: 'msg-seed-3',
          roomId: 'room-core-collab',
          senderType: 'agent',
          senderId: 'agent-sec-b',
          senderName: '安全审计 Agent',
          senderBadge: 'DeepSeek 账号 B · 红蓝对抗与安全合规审计',
          platform: 'dsh',
          text: '安全审计已复核 @arch 的方案，补充三道防线（Loop Guard）：\n- **防回声去重**：对 QQ / 钉钉 / 飞书回传的 `originMsgId` 建立滑动窗口去重表，拒绝自触发回声；\n- **跳数硬熔断**：`maxRelayHops` 默认限制为 2~3 跳，超过跳数强制终止自动接力；\n- **跨账号密钥隔离**：各 DeepSeek 账户 API Key 仅在所属 Agent 沙箱内签名调用，不向外部群明文暴露。',
          thinkingText: '针对跨平台群聊机器人的死循环风险与多账户凭据隔离进行红蓝安全审查。',
          mentions: [],
          relayHop: 2,
          broadcastReceipts: [
            {
              connectorId: 'qq-default',
              connectorName: 'QQ 群机器人 · 账号 1',
              platform: 'qq',
              status: 'simulated',
              detail: 'OneBot v11 /send_group_msg 已就绪',
            },
            {
              connectorId: 'feishu-default',
              connectorName: '飞书机器人 · 账号 1',
              platform: 'feishu',
              status: 'simulated',
              detail: 'Feishu Webhook 通道已同步',
            },
          ],
          createdAt: nowIso,
        },
      ],
      createdAt: nowIso,
      updatedAt: nowIso,
    },
    {
      id: 'room-sec-drill',
      name: '红蓝安全演练与应急响应群',
      description:
        '专为安全演练与线上故障应急打造的协同群，绑定红队破甲预设 Agent 与安全告警机器人。',
      inviteCode: 'DSH-RED-4096',
      collaborationMode: 'smart_mention',
      maxRelayHops: 3,
      cooldownMs: 1000,
      agentIds: ['agent-sec-b', 'agent-ops-c'],
      connectorIds,
      scheduleBinding: '每日 03:00 · 自动化基线扫描与异常汇总',
      messages: [],
      createdAt: nowIso,
      updatedAt: nowIso,
    },
  ];
}

/**
 * Extracts @mentions from message text by matching @handle or @name of known agents.
 */
export function extractAgentMentions(text: string, agents: GroupAgentProfile[]): string[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  const matchedHandles: string[] = [];
  for (const agent of agents) {
    if (!agent.enabled) continue;
    const handleNeedle = `@${agent.handle.toLowerCase()}`;
    const nameNeedle = `@${agent.name.toLowerCase()}`;
    if (lower.includes(handleNeedle) || lower.includes(nameNeedle)) {
      if (!matchedHandles.includes(agent.handle)) {
        matchedHandles.push(agent.handle);
      }
    }
  }
  return matchedHandles;
}

/**
 * Resolves which Agent(s) in a room should respond to an incoming message,
 * enforcing the 3-Layer Loop Guard (maxRelayHops, self-echo exclusion, and collaborationMode).
 */
export function resolveRespondingAgents(
  room: GroupRoom,
  allAgents: GroupAgentProfile[],
  incomingMessage: Pick<GroupMessage, 'senderType' | 'senderId' | 'text' | 'relayHop'>,
): GroupAgentProfile[] {
  if (incomingMessage.relayHop >= room.maxRelayHops) {
    return [];
  }

  const roomAgents = room.agentIds
    .map((id) => allAgents.find((a) => a.id === id))
    .filter((a): a is GroupAgentProfile => Boolean(a && a.enabled));

  if (roomAgents.length === 0) return [];

  const mentionedHandles = extractAgentMentions(incomingMessage.text, roomAgents);
  if (mentionedHandles.length > 0) {
    return roomAgents.filter(
      (a) => mentionedHandles.includes(a.handle) && a.id !== incomingMessage.senderId,
    );
  }

  // If incoming message is already from an agent (hop >= 1) and didn't explicitly @mention another agent:
  if (incomingMessage.senderType === 'agent') {
    if (room.collaborationMode === 'auto_relay') {
      const currentIndex = roomAgents.findIndex((a) => a.id === incomingMessage.senderId);
      if (currentIndex >= 0 && currentIndex + 1 < roomAgents.length) {
        return [roomAgents[currentIndex + 1]];
      }
    }
    return [];
  }

  // Initial message (hop 0) from human, external_bot, or schedule without explicit @mention:
  if (room.collaborationMode === 'all_broadcast') {
    return roomAgents;
  }

  // Default for smart_mention and auto_relay on hop 0: first active lead agent in the room
  return [roomAgents[0]];
}

export function formatGroupRelayForMainChat(
  room: GroupRoom,
  agentReplies: GroupMessage[],
): { thinkingText: string; responseText: string } {
  const thinkingParts = agentReplies
    .map((m) => (m.thinkingText ? `• [${m.senderName} · ${m.senderBadge}] ${m.thinkingText}` : ''))
    .filter(Boolean);

  const thinkingText =
    thinkingParts.join('\n') ||
    `[群组协同 · ${room.name}] 已调度 ${agentReplies.length} 位跨账户 Agent 完成协同推理与外部机器人广播...`;

  const sections = agentReplies.map((m) => {
    const hopTag = m.relayHop > 1 ? ` · 协同接力 #${m.relayHop}` : '';
    const receiptLine =
      Array.isArray(m.broadcastReceipts) && m.broadcastReceipts.length > 0
        ? `\n\n> **外部群机器人同步回执**：${m.broadcastReceipts
            .map((r) => `\`${r.connectorName}\` (${r.detail || r.status})`)
            .join(' · ')}`
        : '';
    return `### ${m.senderName} \`${m.senderBadge}${hopTag}\`\n\n${m.text}${receiptLine}`;
  });

  const responseText =
    sections.length > 0
      ? sections.join('\n\n---\n\n')
      : `**[${room.name}]** 消息已同步至群组及绑定的外部机器人。`;

  return { thinkingText, responseText };
}

export class SuperagentGroupHubStore {
  private readonly filePath: string;
  private state: GroupHubState;
  private readonly seenOriginIds = new Set<string>();
  private activeRoomId: string | null = null;
  private readonly sessionRoomMap = new Map<string, string>();

  constructor(stateDir: string, connectorStore?: SuperagentConnectorStore) {
    fs.mkdirSync(stateDir, { recursive: true });
    this.filePath = path.join(stateDir, 'group-hub.json');
    if (connectorStore) {
      this.ensureDefaultMultiPlatformConnectors(connectorStore);
    }
    this.state = this.load(connectorStore);
    for (const room of this.state.rooms) {
      for (const msg of room.messages) {
        if (msg.originMsgId) {
          this.seenOriginIds.add(`${room.id}:${msg.originMsgId}`);
        }
      }
    }
  }

  /**
   * Ensures QQ Bot (OneBot v11 / Official) and Feishu Bot instances exist in connectorStore
   * when running in the full server so the Group Hub has QQ, DingTalk, Feishu, and GitHub ready out-of-the-box.
   */
  public ensureDefaultMultiPlatformConnectors(connectorStore: SuperagentConnectorStore): void {
    const existing = connectorStore.list();
    if (!existing.some((c) => c.platform === 'qq')) {
      connectorStore.add({
        platform: 'qq',
        name: 'QQ 群机器人 · 账号 1 (OneBot v11 / 官方)',
        productName: 'QQ 群机器人 (OneBot v11 / Official)',
        listenMode: 'mentions',
        credentials: {
          protocolMode: 'onebot_v11',
          onebotHttpUrl: '',
          onebotAccessToken: '',
          targetGroupId: '748291032',
          appId: '',
          clientSecret: '',
          token: '',
          sandbox: 'false',
        },
      });
    }
    if (!existing.some((c) => c.platform === 'feishu')) {
      connectorStore.add({
        platform: 'feishu',
        name: '飞书机器人 · 账号 1 (默认)',
        productName: '飞书 (Feishu)',
        listenMode: 'mentions',
        credentials: {
          brand: 'feishu',
          appId: '',
          appSecret: '',
          verificationToken: '',
          encryptKey: '',
        },
      });
    }
  }

  private load(connectorStore?: SuperagentConnectorStore): GroupHubState {
    if (fs.existsSync(this.filePath)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(this.filePath, 'utf8')) as GroupHubState;
        if (parsed && Array.isArray(parsed.agents) && Array.isArray(parsed.rooms)) {
          return parsed;
        }
      } catch {
        // Fall through to default seed
      }
    }
    const connectorIds = connectorStore
      ? connectorStore
          .list()
          .filter((c) => ['dingtalk', 'qq', 'feishu', 'wecom', 'custom'].includes(c.platform))
          .map((c) => c.id)
      : ['dingtalk-default', 'qq-default', 'feishu-default'];
    const seeded: GroupHubState = {
      agents: createDefaultGroupAgents(),
      rooms: createDefaultGroupRooms(connectorIds),
    };
    this.saveState(seeded);
    return seeded;
  }

  private saveState(state = this.state): void {
    fs.writeFileSync(this.filePath, JSON.stringify(state, null, 2) + '\n', 'utf8');
  }

  public getState(): GroupHubState {
    return {
      agents: [...this.state.agents],
      rooms: this.state.rooms.map((r) => ({
        ...r,
        messages: [...r.messages],
      })),
    };
  }

  public listAgents(): GroupAgentProfile[] {
    return [...this.state.agents];
  }

  public listRooms(): GroupRoom[] {
    return this.state.rooms.map((r) => ({ ...r, messages: [...r.messages] }));
  }

  public getRoom(roomId: string): GroupRoom | undefined {
    return this.state.rooms.find((r) => r.id === roomId);
  }

  public setActiveRoom(roomId: string | null, sessionId?: string): GroupRoom | undefined {
    if (roomId && this.getRoom(roomId)) {
      this.activeRoomId = roomId;
      if (sessionId) {
        this.sessionRoomMap.set(sessionId, roomId);
      }
      return this.getRoom(roomId);
    }
    this.activeRoomId = null;
    if (sessionId) {
      this.sessionRoomMap.delete(sessionId);
    }
    return undefined;
  }

  public getActiveRoom(): GroupRoom | undefined {
    if (!this.activeRoomId) return undefined;
    return this.getRoom(this.activeRoomId);
  }

  public findRoomByInviteCode(inviteCode: string): GroupRoom | undefined {
    const clean = inviteCode.trim().toUpperCase();
    if (!clean) return undefined;
    return this.state.rooms.find((r) => r.inviteCode.toUpperCase() === clean);
  }

  public joinRoomViaFederation(input: {
    inviteCode: string;
    agentName: string;
    handle?: string;
    accountLabel?: string;
    roleTitle?: string;
    remoteBridgeUrl?: string;
    preset?: AgentPresetMode;
  }): { ok: boolean; room?: GroupRoom; agent?: GroupAgentProfile; error?: string } {
    const room = this.findRoomByInviteCode(input.inviteCode);
    if (!room) {
      return { ok: false, error: `未找到邀请码为 ${input.inviteCode} 的协同群组房间` };
    }
    const created = this.addAgent({
      name: input.agentName || '远端联邦 Agent',
      handle: input.handle,
      accountLabel: input.accountLabel || '跨实例联邦节点账户',
      roleTitle: input.roleTitle || '跨实例远端协同 Agent',
      preset: input.preset || 'standard',
      remoteBridgeUrl: input.remoteBridgeUrl || '',
    });
    if (!room.agentIds.includes(created.id)) {
      room.agentIds.push(created.id);
    }
    room.messages.push({
      id: `msg_${Date.now()}_fed`,
      roomId: room.id,
      senderType: 'agent',
      senderId: created.id,
      senderName: created.name,
      senderBadge: `${created.accountLabel} · 跨实例联邦接入`,
      platform: 'dsh',
      text: `已通过联邦邀请码 \`${room.inviteCode}\` 接入本协同群（远端节点：\`${created.remoteBridgeUrl || '直连回调'}\`），可随时通过 \`@${created.handle}\` 点名协同。`,
      mentions: [],
      relayHop: 0,
      broadcastReceipts: [],
      createdAt: new Date().toISOString(),
    });
    room.updatedAt = new Date().toISOString();
    this.saveState();
    return { ok: true, room, agent: created };
  }

  public addAgent(input: {
    name: string;
    handle?: string;
    accountLabel?: string;
    roleTitle?: string;
    preset?: AgentPresetMode;
    model?: string;
    systemPrompt?: string;
    apiKey?: string;
    remoteBridgeUrl?: string;
    avatarColor?: string;
  }): GroupAgentProfile {
    const nowIso = new Date().toISOString();
    const index = this.state.agents.length + 1;
    const rawHandle = (input.handle || input.name || `agent${index}`)
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '')
      .slice(0, 18) || `agent${index}`;
    let handle = rawHandle;
    let suffix = 2;
    while (this.state.agents.some((a) => a.handle === handle)) {
      handle = `${rawHandle}${suffix}`;
      suffix += 1;
    }

    const palette = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    const created: GroupAgentProfile = {
      id: `agent-${handle}-${Date.now().toString(36).slice(-4)}`,
      name: input.name.trim() || `协同 Agent #${index}`,
      handle,
      accountLabel: input.accountLabel?.trim() || `DeepSeek 账号 #${index}`,
      roleTitle: input.roleTitle?.trim() || '专项领域协同专家',
      preset: input.preset && ['standard', 'unrestricted', 'redteam'].includes(input.preset)
        ? input.preset
        : 'standard',
      model: input.model?.trim() || 'deepseek-reasoner',
      systemPrompt:
        input.systemPrompt?.trim() ||
        `你是群组中的「${input.name.trim() || `协同 Agent #${index}`}」，负责与群内其他 DeepSeek 账户 Agent 及 QQ/钉钉/飞书群成员协作解决任务。`,
      apiKey: input.apiKey?.trim() || '',
      remoteBridgeUrl: input.remoteBridgeUrl?.trim() || '',
      avatarColor: input.avatarColor?.trim() || palette[(index - 1) % palette.length],
      enabled: true,
      createdAt: nowIso,
    };

    this.state.agents.push(created);
    // Automatically add the new agent into the primary group room if one exists
    if (this.state.rooms[0] && !this.state.rooms[0].agentIds.includes(created.id)) {
      this.state.rooms[0].agentIds.push(created.id);
    }
    this.saveState();
    return created;
  }

  public updateAgent(
    agentId: string,
    patch: Partial<
      Pick<
        GroupAgentProfile,
        | 'name'
        | 'handle'
        | 'accountLabel'
        | 'roleTitle'
        | 'preset'
        | 'model'
        | 'systemPrompt'
        | 'apiKey'
        | 'remoteBridgeUrl'
        | 'enabled'
      >
    >,
  ): GroupAgentProfile | undefined {
    const agent = this.state.agents.find((a) => a.id === agentId);
    if (!agent) return undefined;
    if (typeof patch.name === 'string' && patch.name.trim()) agent.name = patch.name.trim();
    if (typeof patch.handle === 'string' && patch.handle.trim()) {
      agent.handle = patch.handle.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '');
    }
    if (typeof patch.accountLabel === 'string' && patch.accountLabel.trim()) {
      agent.accountLabel = patch.accountLabel.trim();
    }
    if (typeof patch.roleTitle === 'string') agent.roleTitle = patch.roleTitle.trim();
    if (patch.preset && ['standard', 'unrestricted', 'redteam'].includes(patch.preset)) {
      agent.preset = patch.preset;
    }
    if (typeof patch.model === 'string' && patch.model.trim()) agent.model = patch.model.trim();
    if (typeof patch.systemPrompt === 'string') agent.systemPrompt = patch.systemPrompt.trim();
    if (typeof patch.apiKey === 'string') agent.apiKey = patch.apiKey.trim();
    if (typeof patch.remoteBridgeUrl === 'string') {
      agent.remoteBridgeUrl = patch.remoteBridgeUrl.trim();
    }
    if (typeof patch.enabled === 'boolean') agent.enabled = patch.enabled;
    this.saveState();
    return agent;
  }

  public removeAgent(agentId: string): boolean {
    const before = this.state.agents.length;
    this.state.agents = this.state.agents.filter((a) => a.id !== agentId);
    if (this.state.agents.length === before) return false;
    for (const room of this.state.rooms) {
      room.agentIds = room.agentIds.filter((id) => id !== agentId);
    }
    this.saveState();
    return true;
  }

  public createRoom(input: {
    name: string;
    description?: string;
    collaborationMode?: GroupCollaborationMode;
    maxRelayHops?: number;
    agentIds?: string[];
    connectorIds?: string[];
    scheduleBinding?: string;
  }): GroupRoom {
    const nowIso = new Date().toISOString();
    const code = `DSH-GRP-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
    const room: GroupRoom = {
      id: `room-${Date.now().toString(36)}`,
      name: input.name.trim() || '新建多智能体协同群',
      description:
        input.description?.trim() ||
        '跨 DeepSeek 账户 Agent 与外部 IM 机器人（QQ / 钉钉 / 飞书）实时联动房间。',
      inviteCode: code,
      collaborationMode:
        input.collaborationMode &&
        ['smart_mention', 'auto_relay', 'all_broadcast'].includes(input.collaborationMode)
          ? input.collaborationMode
          : 'auto_relay',
      maxRelayHops: Math.max(1, Math.min(5, Number(input.maxRelayHops) || 2)),
      cooldownMs: 1000,
      agentIds:
        Array.isArray(input.agentIds) && input.agentIds.length > 0
          ? input.agentIds
          : this.state.agents.map((a) => a.id),
      connectorIds: Array.isArray(input.connectorIds) ? input.connectorIds : [],
      scheduleBinding: input.scheduleBinding?.trim() || '按需触发 / 定时巡检广播',
      messages: [],
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    this.state.rooms.push(room);
    this.saveState();
    return room;
  }

  public updateRoom(
    roomId: string,
    patch: Partial<
      Pick<
        GroupRoom,
        | 'name'
        | 'avatarUrl'
        | 'description'
        | 'collaborationMode'
        | 'maxRelayHops'
        | 'agentIds'
        | 'connectorIds'
        | 'scheduleBinding'
      >
    >,
  ): GroupRoom | undefined {
    const room = this.getRoom(roomId);
    if (!room) return undefined;
    if (typeof patch.name === 'string' && patch.name.trim()) room.name = patch.name.trim();
    if (typeof patch.avatarUrl === 'string') room.avatarUrl = patch.avatarUrl.trim();
    if (typeof patch.description === 'string') room.description = patch.description.trim();
    if (
      patch.collaborationMode &&
      ['smart_mention', 'auto_relay', 'all_broadcast'].includes(patch.collaborationMode)
    ) {
      room.collaborationMode = patch.collaborationMode;
    }
    if (typeof patch.maxRelayHops === 'number') {
      room.maxRelayHops = Math.max(1, Math.min(5, patch.maxRelayHops));
    }
    if (Array.isArray(patch.agentIds)) {
      room.agentIds = patch.agentIds;
    }
    if (Array.isArray(patch.connectorIds)) {
      room.connectorIds = patch.connectorIds;
    }
    if (typeof patch.scheduleBinding === 'string') {
      room.scheduleBinding = patch.scheduleBinding.trim();
    }
    room.updatedAt = new Date().toISOString();
    this.saveState();
    return room;
  }

  public clearRoomMessages(roomId: string): GroupRoom | undefined {
    const room = this.getRoom(roomId);
    if (!room) return undefined;
    room.messages = [];
    room.updatedAt = new Date().toISOString();
    this.saveState();
    return room;
  }

  public removeRoom(roomId: string): boolean {
    const before = this.state.rooms.length;
    this.state.rooms = this.state.rooms.filter((r) => r.id !== roomId);
    if (this.state.rooms.length === before) return false;
    if (this.activeRoomId === roomId) {
      this.activeRoomId = null;
    }
    for (const [sid, rid] of this.sessionRoomMap.entries()) {
      if (rid === roomId) {
        this.sessionRoomMap.delete(sid);
      }
    }
    this.saveState();
    return true;
  }

  public reorderRooms(roomIds: string[]): GroupRoom[] {
    if (!Array.isArray(roomIds) || roomIds.length === 0) {
      return this.listRooms();
    }
    const byId = new Map(this.state.rooms.map((r) => [r.id, r]));
    const next: GroupRoom[] = [];
    const seen = new Set<string>();
    for (const id of roomIds) {
      const room = byId.get(id);
      if (room && !seen.has(id)) {
        next.push(room);
        seen.add(id);
      }
    }
    for (const room of this.state.rooms) {
      if (!seen.has(room.id)) {
        next.push(room);
      }
    }
    this.state.rooms = next;
    this.saveState();
    return this.listRooms();
  }

  /**
   * Dispatches an outbound group message to all bound external bot connectors (QQ OneBot v11, DingTalk, Feishu, WeCom, Custom).
   */
  private async broadcastToRoomConnectors(
    room: GroupRoom,
    senderLabel: string,
    text: string,
    connectorStore?: SuperagentConnectorStore,
  ): Promise<GroupBroadcastReceipt[]> {
    if (!connectorStore || room.connectorIds.length === 0) return [];
    const receipts: GroupBroadcastReceipt[] = [];
    const formattedText = `[${room.name} · ${senderLabel}]\n${text}`;

    for (const cid of room.connectorIds) {
      const conn = connectorStore.get(cid);
      if (!conn || !conn.enabled) continue;

      const outboundUrl =
        conn.credentials.onebotHttpUrl?.trim() ||
        conn.credentials.outboundWebhook?.trim() ||
        conn.credentials.webhookUrl?.trim() ||
        conn.credentials.outboundUrl?.trim() ||
        '';

      if (!outboundUrl) {
        receipts.push({
          connectorId: conn.id,
          connectorName: conn.name,
          platform: conn.platform,
          status: 'simulated',
          detail:
            conn.platform === 'qq'
              ? `已生成 OneBot v11 / 官方群消息载荷 (目标群: ${conn.credentials.targetGroupId || '默认群'})`
              : `${conn.productName} 消息桥接已就绪`,
        });
        continue;
      }

      try {
        let targetEndpoint = outboundUrl;
        let bodyPayload: Record<string, unknown> = {
          msgtype: 'text',
          text: { content: formattedText },
        };
        const headers: Record<string, string> = {
          'content-type': 'application/json; charset=utf-8',
        };

        if (conn.platform === 'qq' && conn.credentials.protocolMode !== 'official') {
          targetEndpoint = outboundUrl.replace(/\/+$/, '') + '/send_group_msg';
          bodyPayload = {
            group_id: Number(conn.credentials.targetGroupId) || conn.credentials.targetGroupId || 748291032,
            message: formattedText,
          };
          if (conn.credentials.onebotAccessToken) {
            headers.authorization = `Bearer ${conn.credentials.onebotAccessToken}`;
          }
        } else if (conn.platform === 'feishu') {
          bodyPayload = {
            msg_type: 'text',
            content: { text: formattedText },
          };
        }

        const resp = await fetch(targetEndpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify(bodyPayload),
        });
        receipts.push({
          connectorId: conn.id,
          connectorName: conn.name,
          platform: conn.platform,
          status: resp.ok ? 'delivered' : 'failed',
          detail: resp.ok ? `HTTP ${resp.status} 已送达` : `HTTP ${resp.status}`,
        });
      } catch (err) {
        receipts.push({
          connectorId: conn.id,
          connectorName: conn.name,
          platform: conn.platform,
          status: 'simulated',
          detail: `本地沙箱模拟投递 (${err instanceof Error ? err.message : 'offline'})`,
        });
      }
    }

    return receipts;
  }

  /**
   * Posts a message into a Group Room from a human user, external bot (QQ/DingTalk/Feishu), or automated schedule,
   * and executes the multi-account Agent collaboration & relay loop up to room.maxRelayHops.
   */
  public async postMessageAndRunRelay(params: {
    roomId: string;
    senderType: 'human' | 'external_bot' | 'schedule' | 'agent';
    senderId: string;
    senderName: string;
    senderBadge?: string;
    platform?: 'dsh' | ConnectorPlatform | 'schedule';
    text: string;
    originMsgId?: string;
    connectorStore?: SuperagentConnectorStore;
    generateReply: AgentReplyGenerator;
  }): Promise<{
    ok: boolean;
    deduplicated?: boolean;
    initialMessage?: GroupMessage;
    agentReplies: GroupMessage[];
    room?: GroupRoom;
    error?: string;
  }> {
    const room = this.getRoom(params.roomId);
    if (!room) {
      return { ok: false, agentReplies: [], error: 'Group room not found' };
    }

    const cleanText = params.text.trim();
    if (!cleanText) {
      return { ok: false, agentReplies: [], error: 'Message text cannot be empty' };
    }

    // Layer 1 Loop Guard: Deduplicate external webhook echo by originMsgId
    if (params.originMsgId) {
      const dedupKey = `${room.id}:${params.originMsgId}`;
      if (this.seenOriginIds.has(dedupKey)) {
        return { ok: true, deduplicated: true, agentReplies: [], room };
      }
      this.seenOriginIds.add(dedupKey);
    }

    const nowIso = new Date().toISOString();
    const initialMentions = extractAgentMentions(cleanText, this.state.agents);
    const initialReceipts = await this.broadcastToRoomConnectors(
      room,
      params.senderName,
      cleanText,
      params.connectorStore,
    );

    const initialMessage: GroupMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      roomId: room.id,
      senderType: params.senderType,
      senderId: params.senderId,
      senderName: params.senderName,
      senderBadge:
        params.senderBadge ||
        (params.senderType === 'human'
          ? '当前登录账户 · 群主'
          : params.senderType === 'schedule'
            ? '自动化任务调度器'
            : '外部平台机器人'),
      platform: params.platform || 'dsh',
      text: cleanText,
      mentions: initialMentions,
      relayHop: 0,
      ...(params.originMsgId ? { originMsgId: params.originMsgId } : {}),
      broadcastReceipts: initialReceipts,
      createdAt: nowIso,
    };

    room.messages.push(initialMessage);
    if (room.messages.length > 120) {
      room.messages = room.messages.slice(-120);
    }
    room.updatedAt = nowIso;
    this.saveState();

    const agentReplies: GroupMessage[] = [];
    let currentTriggerMsg: GroupMessage = initialMessage;
    const visitedAgentIdsInTurn = new Set<string>();
    let hopCounter = 0;

    // Layer 2 Loop Guard: Relay hop cap (1 .. room.maxRelayHops)
    while (hopCounter < room.maxRelayHops) {
      const nextAgents = resolveRespondingAgents(room, this.state.agents, currentTriggerMsg).filter(
        (a) => !visitedAgentIdsInTurn.has(a.id),
      );
      if (nextAgents.length === 0) {
        break;
      }

      const isBroadcastWave = room.collaborationMode === 'all_broadcast' && hopCounter === 0;
      if (isBroadcastWave) {
        hopCounter = 1;
      }

      let lastAgentMsg: GroupMessage | undefined;

      for (const agent of nextAgents) {
        if (!isBroadcastWave && hopCounter >= room.maxRelayHops) break;
        visitedAgentIdsInTurn.add(agent.id);
        if (!isBroadcastWave) {
          hopCounter += 1;
        }
        const nextHop = hopCounter;

        // Build recent group conversation context so the Agent collaborates with full awareness
        const recentHistory = room.messages
          .slice(-6)
          .map((m) => `[${m.senderName} (${m.senderBadge})]: ${m.text}`)
          .join('\n\n');

        const otherRoomAgents = room.agentIds
          .map((id) => this.state.agents.find((a) => a.id === id))
          .filter((a): a is GroupAgentProfile => Boolean(a && a.id !== agent.id && a.enabled));

        const peerHint =
          otherRoomAgents.length > 0
            ? `群内其他可协同的 DeepSeek 账户 Agent：${otherRoomAgents
                .map((a) => `${a.name} (@${a.handle} · ${a.accountLabel})`)
                .join('、')}。`
            : '';

        const presetBadge =
          agent.preset === 'redteam'
            ? '[预设模式: 红队安全演练 Redteam]'
            : agent.preset === 'unrestricted'
              ? '[预设模式: 无限制破甲 Unrestricted]'
              : '[预设模式: 标准协同 Standard]';

        const composedSystemPrompt = [
          agent.systemPrompt,
          presetBadge,
          `你当前所在的协同群组：「${room.name}」（协作策略：${room.collaborationMode}，当前接力跳数：${nextHop}/${room.maxRelayHops}）。`,
          peerHint,
          '请直接针对群内最新消息给出你的专业回复，不要重复别人的话。',
        ]
          .filter(Boolean)
          .join('\n');

        const composedUserPrompt = [
          '=== 群组最近上下文 ===',
          recentHistory,
          '=== 请以你的身份直接回复群组 ===',
          `当前身份：${agent.name} (${agent.accountLabel} · ${agent.roleTitle})`,
        ].join('\n\n');

        const generated = await params.generateReply({
          agent,
          room,
          systemPrompt: composedSystemPrompt,
          userPrompt: composedUserPrompt,
          model: agent.model || 'deepseek-reasoner',
        });

        const replyMentions = extractAgentMentions(generated.responseText, this.state.agents);
        const replyReceipts = await this.broadcastToRoomConnectors(
          room,
          `${agent.name} (${agent.accountLabel})`,
          generated.responseText,
          params.connectorStore,
        );

        const replyMsg: GroupMessage = {
          id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          roomId: room.id,
          senderType: 'agent',
          senderId: agent.id,
          senderName: agent.name,
          senderBadge: `${agent.accountLabel} · ${agent.roleTitle}`,
          platform: 'dsh',
          text: generated.responseText,
          thinkingText: generated.thinkingText,
          mentions: replyMentions,
          relayHop: nextHop,
          broadcastReceipts: replyReceipts,
          createdAt: new Date().toISOString(),
        };

        room.messages.push(replyMsg);
        agentReplies.push(replyMsg);
        lastAgentMsg = replyMsg;
        room.updatedAt = replyMsg.createdAt;
        this.saveState();
      }

      if (!lastAgentMsg) break;
      currentTriggerMsg = lastAgentMsg;
    }

    return {
      ok: true,
      initialMessage,
      agentReplies,
      room,
    };
  }

  /**
   * Routes an inbound webhook event from a bound external bot (QQ / DingTalk / Feishu / WeCom / Custom)
   * into all Group Rooms that have bound `connector.id`.
   */
  public async routeConnectorEventToGroups(params: {
    connector: BotConnectorInstance;
    senderName: string;
    text: string;
    originMsgId: string;
    connectorStore: SuperagentConnectorStore;
    generateReply: AgentReplyGenerator;
  }): Promise<number> {
    const matchingRooms = this.state.rooms.filter((r) =>
      r.connectorIds.includes(params.connector.id),
    );
    let routedCount = 0;
    for (const room of matchingRooms) {
      const res = await this.postMessageAndRunRelay({
        roomId: room.id,
        senderType: 'external_bot',
        senderId: params.connector.id,
        senderName: `${params.connector.name} · @${params.senderName}`,
        senderBadge: `${params.connector.productName}`,
        platform: params.connector.platform,
        text: params.text,
        originMsgId: params.originMsgId,
        connectorStore: params.connectorStore,
        generateReply: params.generateReply,
      });
      if (res.ok && !res.deduplicated) {
        routedCount += 1;
      }
    }
    return routedCount;
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

export async function handleSuperagentGroupHubApiRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  groupStore: SuperagentGroupHubStore,
  connectorStore: SuperagentConnectorStore,
  generateReply: AgentReplyGenerator,
): Promise<boolean> {
  const rawUrl = req.url || '/';
  if (!rawUrl.startsWith('/api/superagent-groups')) {
    return false;
  }

  const parsedUrl = new URL(rawUrl, 'http://127.0.0.1');
  const pathname = parsedUrl.pathname;

  // GET /api/superagent-groups
  if (req.method === 'GET' && pathname === '/api/superagent-groups') {
    const state = groupStore.getState();
    sendJson(res, 200, {
      ok: true,
      activeRoomId: groupStore.getActiveRoom()?.id || null,
      agents: state.agents,
      rooms: state.rooms,
      connectors: connectorStore.list(),
    });
    return true;
  }

  // POST /api/superagent-groups/active-room
  if (req.method === 'POST' && pathname === '/api/superagent-groups/active-room') {
    const body = await readJsonBody(req);
    const roomId = typeof body.roomId === 'string' && body.roomId.trim() ? body.roomId.trim() : null;
    const sessionId = typeof body.sessionId === 'string' && body.sessionId.trim() ? body.sessionId.trim() : undefined;
    const active = groupStore.setActiveRoom(roomId, sessionId);
    sendJson(res, 200, {
      ok: true,
      activeRoomId: active?.id || null,
      room: active || null,
    });
    return true;
  }

  // POST /api/superagent-groups/federation/join
  if (req.method === 'POST' && pathname === '/api/superagent-groups/federation/join') {
    const body = await readJsonBody(req);
    const inviteCode = String(body.inviteCode || '').trim();
    const agentName = String(body.agentName || body.name || '远端联邦 Agent').trim();
    const outcome = groupStore.joinRoomViaFederation({
      inviteCode,
      agentName,
      handle: typeof body.handle === 'string' ? body.handle : undefined,
      accountLabel: typeof body.accountLabel === 'string' ? body.accountLabel : undefined,
      roleTitle: typeof body.roleTitle === 'string' ? body.roleTitle : undefined,
      remoteBridgeUrl: typeof body.remoteBridgeUrl === 'string' ? body.remoteBridgeUrl : undefined,
      preset: (body.preset as AgentPresetMode) || undefined,
    });
    if (!outcome.ok) {
      sendJson(res, 404, outcome);
      return true;
    }
    const state = groupStore.getState();
    sendJson(res, 200, {
      ok: true,
      room: outcome.room,
      agent: outcome.agent,
      agents: state.agents,
      rooms: state.rooms,
    });
    return true;
  }

  // POST /api/superagent-groups/federation/invoke
  if (req.method === 'POST' && pathname === '/api/superagent-groups/federation/invoke') {
    const body = await readJsonBody(req);
    const inviteCode = String(body.inviteCode || '').trim();
    const room =
      (inviteCode ? groupStore.findRoomByInviteCode(inviteCode) : undefined) ||
      groupStore.listRooms()[0];
    if (!room) {
      sendJson(res, 404, { ok: false, error: 'Target room not found for federated invoke' });
      return true;
    }
    const agentHandle = String(body.agentHandle || '').trim().toLowerCase();
    const agent =
      groupStore.listAgents().find((a) => a.handle === agentHandle) ||
      groupStore.listAgents()[0];
    if (!agent) {
      sendJson(res, 404, { ok: false, error: 'No local agent available for federated invoke' });
      return true;
    }
    const generated = await generateReply({
      agent,
      room,
      systemPrompt: String(body.systemPrompt || agent.systemPrompt),
      userPrompt: String(body.userPrompt || ''),
      model: String(body.model || agent.model || 'deepseek-reasoner'),
    });
    sendJson(res, 200, {
      ok: true,
      agentId: agent.id,
      agentName: agent.name,
      accountLabel: agent.accountLabel,
      thinkingText: generated.thinkingText,
      responseText: generated.responseText,
    });
    return true;
  }

  // POST /api/superagent-groups/agents
  if (req.method === 'POST' && pathname === '/api/superagent-groups/agents') {
    const body = await readJsonBody(req);
    const created = groupStore.addAgent({
      name: String(body.name || '新建协同 Agent'),
      handle: typeof body.handle === 'string' ? body.handle : undefined,
      accountLabel: typeof body.accountLabel === 'string' ? body.accountLabel : undefined,
      roleTitle: typeof body.roleTitle === 'string' ? body.roleTitle : undefined,
      preset: (body.preset as AgentPresetMode) || undefined,
      model: typeof body.model === 'string' ? body.model : undefined,
      systemPrompt: typeof body.systemPrompt === 'string' ? body.systemPrompt : undefined,
      apiKey: typeof body.apiKey === 'string' ? body.apiKey : undefined,
      remoteBridgeUrl: typeof body.remoteBridgeUrl === 'string' ? body.remoteBridgeUrl : undefined,
    });
    const state = groupStore.getState();
    sendJson(res, 200, {
      ok: true,
      agent: created,
      agents: state.agents,
      rooms: state.rooms,
    });
    return true;
  }

  // PUT / DELETE /api/superagent-groups/agents/:id
  const agentMatch = /^\/api\/superagent-groups\/agents\/([^/]+)$/.exec(pathname);
  if (agentMatch) {
    const agentId = decodeURIComponent(agentMatch[1]);
    if (req.method === 'PUT') {
      const body = await readJsonBody(req);
      const updated = groupStore.updateAgent(agentId, {
        name: typeof body.name === 'string' ? body.name : undefined,
        handle: typeof body.handle === 'string' ? body.handle : undefined,
        accountLabel: typeof body.accountLabel === 'string' ? body.accountLabel : undefined,
        roleTitle: typeof body.roleTitle === 'string' ? body.roleTitle : undefined,
        preset: (body.preset as AgentPresetMode) || undefined,
        model: typeof body.model === 'string' ? body.model : undefined,
        systemPrompt: typeof body.systemPrompt === 'string' ? body.systemPrompt : undefined,
        apiKey: typeof body.apiKey === 'string' ? body.apiKey : undefined,
        remoteBridgeUrl: typeof body.remoteBridgeUrl === 'string' ? body.remoteBridgeUrl : undefined,
        enabled: typeof body.enabled === 'boolean' ? body.enabled : undefined,
      });
      if (!updated) {
        sendJson(res, 404, { ok: false, error: 'Agent profile not found' });
        return true;
      }
      const state = groupStore.getState();
      sendJson(res, 200, { ok: true, agent: updated, agents: state.agents, rooms: state.rooms });
      return true;
    }
    if (req.method === 'DELETE') {
      const removed = groupStore.removeAgent(agentId);
      if (!removed) {
        sendJson(res, 404, { ok: false, error: 'Agent profile not found' });
        return true;
      }
      const state = groupStore.getState();
      sendJson(res, 200, { ok: true, agents: state.agents, rooms: state.rooms });
      return true;
    }
  }

  // POST /api/superagent-groups/rooms
  if (req.method === 'POST' && pathname === '/api/superagent-groups/rooms') {
    const body = await readJsonBody(req);
    const room = groupStore.createRoom({
      name: String(body.name || '新建多账户协同群'),
      description: typeof body.description === 'string' ? body.description : undefined,
      collaborationMode: (body.collaborationMode as GroupCollaborationMode) || undefined,
      maxRelayHops: typeof body.maxRelayHops === 'number' ? body.maxRelayHops : undefined,
      agentIds: Array.isArray(body.agentIds) ? (body.agentIds as string[]) : undefined,
      connectorIds: Array.isArray(body.connectorIds) ? (body.connectorIds as string[]) : undefined,
      scheduleBinding: typeof body.scheduleBinding === 'string' ? body.scheduleBinding : undefined,
    });
    const state = groupStore.getState();
    sendJson(res, 200, { ok: true, room, rooms: state.rooms });
    return true;
  }

  // PUT /api/superagent-groups/rooms/reorder
  if (req.method === 'PUT' && pathname === '/api/superagent-groups/rooms/reorder') {
    const body = await readJsonBody(req);
    const roomIds = Array.isArray(body.roomIds)
      ? body.roomIds.filter((id): id is string => typeof id === 'string')
      : [];
    const rooms = groupStore.reorderRooms(roomIds);
    sendJson(res, 200, { ok: true, rooms });
    return true;
  }

  // Match /api/superagent-groups/rooms/:roomId or /api/superagent-groups/rooms/:roomId/:action
  const roomMatch = /^\/api\/superagent-groups\/rooms\/([^/]+)(?:\/([^/]+))?$/.exec(pathname);
  if (roomMatch) {
    const roomId = decodeURIComponent(roomMatch[1]);
    const action = roomMatch[2] ? decodeURIComponent(roomMatch[2]) : undefined;

    if (req.method === 'DELETE' && !action) {
      const removed = groupStore.removeRoom(roomId);
      if (!removed) {
        sendJson(res, 404, { ok: false, error: 'Room not found' });
        return true;
      }
      const state = groupStore.getState();
      sendJson(res, 200, { ok: true, rooms: state.rooms, activeRoomId: groupStore.getActiveRoom()?.id ?? null });
      return true;
    }

    if (req.method === 'PUT' && !action) {
      const body = await readJsonBody(req);
      const updated = groupStore.updateRoom(roomId, {
        name: typeof body.name === 'string' ? body.name : undefined,
        avatarUrl: typeof body.avatarUrl === 'string' ? body.avatarUrl : undefined,
        description: typeof body.description === 'string' ? body.description : undefined,
        collaborationMode: (body.collaborationMode as GroupCollaborationMode) || undefined,
        maxRelayHops: typeof body.maxRelayHops === 'number' ? body.maxRelayHops : undefined,
        agentIds: Array.isArray(body.agentIds) ? (body.agentIds as string[]) : undefined,
        connectorIds: Array.isArray(body.connectorIds)
          ? (body.connectorIds as string[])
          : undefined,
        scheduleBinding:
          typeof body.scheduleBinding === 'string' ? body.scheduleBinding : undefined,
      });
      if (!updated) {
        sendJson(res, 404, { ok: false, error: 'Room not found' });
        return true;
      }
      const state = groupStore.getState();
      sendJson(res, 200, { ok: true, room: updated, rooms: state.rooms });
      return true;
    }

    if (req.method === 'POST' && action === 'clear') {
      const cleared = groupStore.clearRoomMessages(roomId);
      if (!cleared) {
        sendJson(res, 404, { ok: false, error: 'Room not found' });
        return true;
      }
      const state = groupStore.getState();
      sendJson(res, 200, { ok: true, room: cleared, rooms: state.rooms });
      return true;
    }

    if (req.method === 'POST' && action === 'messages') {
      const body = await readJsonBody(req);
      const senderType =
        body.senderType === 'external_bot' || body.senderType === 'schedule'
          ? body.senderType
          : 'human';
      const senderId = typeof body.senderId === 'string' && body.senderId ? body.senderId : 'human-lead';
      const senderName =
        typeof body.senderName === 'string' && body.senderName.trim()
          ? body.senderName.trim()
          : '当前用户 (主控台)';
      const senderBadge =
        typeof body.senderBadge === 'string' && body.senderBadge.trim()
          ? body.senderBadge.trim()
          : undefined;
      const platform = (body.platform as 'dsh' | ConnectorPlatform | 'schedule') || 'dsh';
      const text = typeof body.text === 'string' ? body.text : '';
      const originMsgId = typeof body.originMsgId === 'string' ? body.originMsgId : undefined;

      const outcome = await groupStore.postMessageAndRunRelay({
        roomId,
        senderType,
        senderId,
        senderName,
        senderBadge,
        platform,
        text,
        originMsgId,
        connectorStore,
        generateReply,
      });

      if (!outcome.ok) {
        sendJson(res, 400, outcome);
        return true;
      }

      const state = groupStore.getState();
      sendJson(res, 200, {
        ok: true,
        deduplicated: outcome.deduplicated,
        initialMessage: outcome.initialMessage,
        agentReplies: outcome.agentReplies,
        room: outcome.room,
        rooms: state.rooms,
      });
      return true;
    }
  }

  sendJson(res, 404, { ok: false, error: 'Unsupported group hub endpoint' });
  return true;
}
