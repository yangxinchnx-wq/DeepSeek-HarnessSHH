import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SuperagentGroupHubStore,
  extractAgentMentions,
  resolveRespondingAgents,
  formatGroupRelayForMainChat,
} from './superagent-group-hub.ts';
import {
  SuperagentConnectorStore,
  normalizeConnectorWebhookPayload,
} from './superagent-connectors.ts';

test('1. SuperagentGroupHubStore seeds default multi-account DeepSeek Agents, Group Rooms, and QQ/Feishu connectors', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'group-hub-seed-'));
  try {
    const connectorStore = new SuperagentConnectorStore(tmpDir);
    const groupStore = new SuperagentGroupHubStore(tmpDir, connectorStore);

    const agents = groupStore.listAgents();
    assert.equal(agents.length, 3);
    assert.equal(agents[0].handle, 'arch');
    assert.ok(agents[0].accountLabel.includes('DeepSeek 账号 A'));
    assert.equal(agents[1].handle, 'sec');
    assert.equal(agents[1].preset, 'redteam');
    assert.equal(agents[2].handle, 'ops');

    const rooms = groupStore.listRooms();
    assert.equal(rooms.length, 2);
    assert.equal(rooms[0].id, 'room-core-collab');
    assert.equal(rooms[0].messages.length, 3);

    // Verify QQ (OneBot v11 / Official) and Feishu connectors were ensured
    const connectors = connectorStore.list();
    assert.ok(connectors.some((c) => c.platform === 'qq'));
    assert.ok(connectors.some((c) => c.platform === 'feishu'));
    assert.ok(connectors.some((c) => c.platform === 'dingtalk'));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('2. extractAgentMentions and resolveRespondingAgents respect @mentions, auto_relay, and maxRelayHops Loop Guard', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'group-hub-routing-'));
  try {
    const groupStore = new SuperagentGroupHubStore(tmpDir);
    const agents = groupStore.listAgents();
    const room = groupStore.getRoom('room-core-collab')!;

    const mentions = extractAgentMentions('请 @arch 和 @安全审计 Agent 联合评估该方案', agents);
    assert.deepEqual(mentions, ['arch', 'sec']);

    // Hop 0 with explicit @sec mention -> only sec responds
    const hop0Targets = resolveRespondingAgents(room, agents, {
      senderType: 'human',
      senderId: 'user-1',
      text: '@sec 请检查 SQL 注入风险',
      relayHop: 0,
    });
    assert.equal(hop0Targets.length, 1);
    assert.equal(hop0Targets[0].handle, 'sec');

    // Hop equal to maxRelayHops -> Loop Guard blocks further relay
    const blockedTargets = resolveRespondingAgents(room, agents, {
      senderType: 'agent',
      senderId: 'agent-arch-a',
      text: '@sec 继续检查',
      relayHop: room.maxRelayHops,
    });
    assert.equal(blockedTargets.length, 0);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('3. postMessageAndRunRelay executes multi-agent sequential relay, broadcasts to bound QQ/DingTalk/Feishu bots, and deduplicates originMsgId echoes', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'group-hub-relay-'));
  try {
    const connectorStore = new SuperagentConnectorStore(tmpDir);
    const groupStore = new SuperagentGroupHubStore(tmpDir, connectorStore);

    const outcome = await groupStore.postMessageAndRunRelay({
      roomId: 'room-core-collab',
      senderType: 'external_bot',
      senderId: 'qq-default',
      senderName: 'QQ 群 · @测试员',
      senderBadge: 'QQ 群 (OneBot v11)',
      platform: 'qq',
      text: '@arch 请设计高可用网关并交给 @sec 审计',
      originMsgId: 'onebot-msg-998877',
      connectorStore,
      generateReply: async ({ agent }) => {
        if (agent.handle === 'arch') {
          return {
            thinkingText: '架构师思考中...',
            responseText: '架构方案已完成，请 @sec 进行红蓝安全审计。',
          };
        }
        return {
          thinkingText: '安全审计思考中...',
          responseText: '安全审计通过，无高危风险。',
        };
      },
    });

    assert.equal(outcome.ok, true);
    assert.equal(outcome.agentReplies.length, 2);
    assert.equal(outcome.agentReplies[0].senderName, '架构师 Agent');
    assert.equal(outcome.agentReplies[0].relayHop, 1);
    assert.equal(outcome.agentReplies[1].senderName, '安全审计 Agent');
    assert.equal(outcome.agentReplies[1].relayHop, 2);
    assert.ok(outcome.agentReplies[0].broadcastReceipts.length >= 2);

    // Sending the exact same originMsgId again is blocked by Layer 1 Loop Guard
    const duplicateOutcome = await groupStore.postMessageAndRunRelay({
      roomId: 'room-core-collab',
      senderType: 'external_bot',
      senderId: 'qq-default',
      senderName: 'QQ 群 · @测试员',
      platform: 'qq',
      text: '@arch 请设计高可用网关并交给 @sec 审计',
      originMsgId: 'onebot-msg-998877',
      connectorStore,
      generateReply: async () => ({ thinkingText: '', responseText: 'should not run' }),
    });
    assert.equal(duplicateOutcome.ok, true);
    assert.equal(duplicateOutcome.deduplicated, true);
    assert.equal(duplicateOutcome.agentReplies.length, 0);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('4. QQ OneBot v11 payload with CQ:at code normalizes cleanly and routes into bound Group Rooms', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'group-hub-onebot-'));
  try {
    const connectorStore = new SuperagentConnectorStore(tmpDir);
    const groupStore = new SuperagentGroupHubStore(tmpDir, connectorStore);
    const qqBot = connectorStore.list().find((c) => c.platform === 'qq')!;
    assert.ok(qqBot);

    const normalized = normalizeConnectorWebhookPayload(qqBot, {
      post_type: 'message',
      message_type: 'group',
      group_id: 748291032,
      user_id: 10086,
      message_id: 556677,
      raw_message: '[CQ:at,qq=99999,name=arch] 请检查集群负载',
      sender: {
        nickname: '小王',
        card: '运维-小王',
      },
    });

    assert.equal(normalized.trigger.actor.id, '运维-小王');
    assert.equal(normalized.trigger.threads[0].id, '748291032');
    assert.equal(normalized.trigger.text, '@arch  请检查集群负载');
    assert.ok(groupStore.listRooms()[0].connectorIds.includes(qqBot.id));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('5. setActiveRoom, formatGroupRelayForMainChat, and joinRoomViaFederation support native main chat and cross-instance federation', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'group-hub-fed-'));
  try {
    const connectorStore = new SuperagentConnectorStore(tmpDir);
    const groupStore = new SuperagentGroupHubStore(tmpDir, connectorStore);

    const active = groupStore.setActiveRoom('room-core-collab', 'session-123');
    assert.equal(active?.id, 'room-core-collab');
    assert.equal(groupStore.getActiveRoom()?.id, 'room-core-collab');

    const fedJoin = groupStore.joinRoomViaFederation({
      inviteCode: 'DSH-HUB-9021',
      agentName: '远端安全实验室 Agent',
      handle: 'peersec',
      accountLabel: '远端联邦账号 E',
      remoteBridgeUrl: 'https://peer-dsh.example.com',
    });
    assert.equal(fedJoin.ok, true);
    assert.equal(fedJoin.agent?.handle, 'peersec');
    assert.ok(fedJoin.room?.agentIds.includes(fedJoin.agent!.id));

    const outcome = await groupStore.postMessageAndRunRelay({
      roomId: 'room-core-collab',
      senderType: 'human',
      senderId: 'human-lead',
      senderName: '当前登录账户',
      text: '@arch 架构评估',
      connectorStore,
      generateReply: async ({ agent }) => ({
        thinkingText: `${agent.name} 思考完成`,
        responseText: `${agent.name} 已输出结论`,
      }),
    });

    const formatted = formatGroupRelayForMainChat(outcome.room!, outcome.agentReplies);
    assert.ok(formatted.thinkingText.includes('思考完成'));
    assert.ok(formatted.responseText.includes('### 架构师 Agent'));
    assert.ok(formatted.responseText.includes('外部群机器人同步回执'));

    groupStore.setActiveRoom(null);
    assert.equal(groupStore.getActiveRoom(), undefined);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
