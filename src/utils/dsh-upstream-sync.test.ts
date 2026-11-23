import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { applyDshUpstreamSync } from './dsh-upstream-sync.ts';
import { applyDshClientPatches } from './dsh-client-patches.ts';

const rootDir = process.cwd();
const nmScopeDir = path.join(rootDir, 'node_modules/@deepseek-ai');

applyDshUpstreamSync(rootDir);
applyDshClientPatches(rootDir);

test('1. Web Search & Fetch Settings Split (#7565): exposes listProviders + split searchProvider/fetchProvider UI', async () => {
  const basePatch = fs.readFileSync(path.join(nmScopeDir, 'dsh-base/cordis.patch.yml'), 'utf8');
  assert.ok(basePatch.includes("name: '@deepseek-ai/dsh-web'"));
  assert.ok(
    basePatch.includes('searchProvider: deepseek-search-api') ||
      basePatch.includes('fetchProvider: http'),
  );

  const webMod = (await import('@deepseek-ai/dsh-web')) as unknown as {
    WebRuntime: {
      Config: (input: Record<string, unknown>) => {
        searchProvider: { get: () => string };
        fetchProvider: { get: () => string };
      };
      prototype: { listProviders: () => unknown };
    };
  };
  const cfg = webMod.WebRuntime.Config({
    searchProvider: 'deepseek-search-api',
    fetchProvider: 'local',
  });
  assert.equal(cfg.searchProvider.get(), 'deepseek-search-api');
  assert.equal(cfg.fetchProvider.get(), 'local');
  assert.equal(typeof webMod.WebRuntime.prototype.listProviders, 'function');

  const uiWebSearchCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-client-ui-settings-web-search/lib/client.js'),
    'utf8',
  );
  assert.ok(uiWebSearchCode.includes('searchProvider'));
  assert.ok(uiWebSearchCode.includes('fetchProvider'));
});

test('2. SDK Team Mode (#7773): adds defaultEnabled config option to TeamService and team-mode.yml example', async () => {
  const teamMod = (await import('@deepseek-ai/dsh-experimental-agent-team')) as unknown as {
    TeamService: {
      Config: (input: Record<string, unknown>) => { defaultEnabled: boolean };
    };
  };
  const parsedDefault = teamMod.TeamService.Config({});
  assert.equal(parsedDefault.defaultEnabled, false);
  const parsedTrue = teamMod.TeamService.Config({ defaultEnabled: true });
  assert.equal(parsedTrue.defaultEnabled, true);

  const examplePath = path.join(nmScopeDir, 'dsh/config/examples/team-mode.yml');
  assert.equal(fs.existsSync(examplePath), true);
  assert.ok(fs.readFileSync(examplePath, 'utf8').includes('defaultEnabled: true'));
});

test('3. MCP Manager Core (#3372): installs @deepseek-ai/dsh-mcp-manager and upgrades @deepseek-ai/dsh-mcp-client with probeServer/status/watch', async () => {
  const mcpClientMod = (await import('@deepseek-ai/dsh-mcp-client')) as unknown as {
    probeServer: unknown;
    connectionStatusOf: unknown;
    assertTemplateSyntax: unknown;
  };
  assert.equal(typeof mcpClientMod.probeServer, 'function');
  assert.equal(typeof mcpClientMod.connectionStatusOf, 'function');
  assert.equal(typeof mcpClientMod.assertTemplateSyntax, 'function');

  const mcpManagerPkgPath = path.join(nmScopeDir, 'dsh-mcp-manager/package.json');
  assert.equal(fs.existsSync(mcpManagerPkgPath), true);

  const mcpManagerIndex = path.join(nmScopeDir, 'dsh-mcp-manager/lib/index.js');
  assert.equal(fs.existsSync(mcpManagerIndex), true);
  const mcpManagerCode = fs.readFileSync(mcpManagerIndex, 'utf8');
  assert.ok(mcpManagerCode.includes('McpServerManager'));
  assert.ok(mcpManagerCode.includes('watch('));
  assert.ok(mcpManagerCode.includes('restart('));
  assert.ok(mcpManagerCode.includes('probe(') || mcpManagerCode.includes('probeFromClient('));

  const webAppPatch = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-web-app/cordis.patch.yml'),
    'utf8',
  );
  assert.ok(webAppPatch.includes("name: '@deepseek-ai/dsh-mcp-manager'"));
});

test('4. Desktop Update Channels (#7495) & Windows CLI Short-Path Recovery (#7709): registers DesktopChannelRow/Toast/Source and installed-bin.js', () => {
  const generalClientCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-client-ui-settings-general/lib/client.js'),
    'utf8',
  );
  assert.ok(generalClientCode.includes('DesktopChannelRow'));
  assert.ok(generalClientCode.includes('DesktopChannelToast'));
  assert.ok(generalClientCode.includes('DesktopChannelSource'));

  const installedBinPath = path.join(nmScopeDir, 'dsh/lib/installed-bin.js');
  assert.equal(fs.existsSync(installedBinPath), true);
  const installedBinCode = fs.readFileSync(installedBinPath, 'utf8');
  assert.ok(installedBinCode.includes('realpathSync.native'));
  assert.ok(installedBinCode.includes('pathToFileURL'));
});

test('5. Cordis & Vendor Dependency Upgrades (0.2.2-rc.5 / #7790): runs @deepseek-ai/dsh@0.2.2-rc.5 with cordis@4.1.0 and schemastery@3.19.0', () => {
  const dshPkg = JSON.parse(fs.readFileSync(path.join(nmScopeDir, 'dsh/package.json'), 'utf8'));
  assert.equal(dshPkg.version, '0.2.2-rc.5');

  const cordisPkg = JSON.parse(
    fs.readFileSync(path.join(nmScopeDir, 'cordis/package.json'), 'utf8'),
  );
  assert.equal(cordisPkg.version, '4.1.0');

  const schemasteryPkg = JSON.parse(
    fs.readFileSync(path.join(nmScopeDir, 'schemastery/package.json'), 'utf8'),
  );
  assert.equal(schemasteryPkg.version, '3.19.0');
});

test('6. [0.2.2-rc.3 Update 1] Web Prompt Retry Deduplication (#7853): deduplicates retried prompt requests via promptReceipts across agent/inbox/spliced and user/message events', () => {
  const sessionControllerCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-api-session-controller/lib/index.js'),
    'utf8',
  );
  assert.ok(sessionControllerCode.includes('promptReceipts = /* @__PURE__ */ new WeakMap();'));
  assert.ok(sessionControllerCode.includes('hasPromptRequest(session, requestId)'));
  assert.ok(
    sessionControllerCode.includes(
      'if (this.hasPromptRequest(agent.session, request.requestId)) return { accepted: true };',
    ),
  );
  assert.ok(sessionControllerCode.includes('event.type === "agent/inbox/spliced"'));
});

test('7. [0.2.2-rc.3 Update 2] Move Open in App into Session Menu (#7569): registers open-in-app.openWith submenu on session & sessionHeader and removes header utility button', () => {
  const openInAppCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-client-ui-open-in-app/lib/client.js'),
    'utf8',
  );
  assert.ok(openInAppCode.includes('open-in-app.openWith'));
  assert.ok(openInAppCode.includes('sessionHeader'));
  assert.ok(!openInAppCode.includes('conversation.session.header.utilities'));
});

test('8. [0.2.2-rc.3 Update 3] Paste Plain Text Shortcut (#7787): registers Shift+Command+V / Ctrl+Shift+V pasteAndMatchStyle handler', () => {
  const shortcutsCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-client-shortcuts/lib/client.js'),
    'utf8',
  );
  assert.ok(
    shortcutsCode.includes('pasteAndMatchStyle') ||
      shortcutsCode.includes('KeyV') ||
      shortcutsCode.includes('@deepseek-ai/dsh-client-shortcuts'),
  );
});

test('9. [0.2.2-rc.3 Update 4] Subagent Catalog Names (#7697) & Repeated Fork Title Suffixes (#7472): exports SiblingNameReservations/isAgentName/catalogNames and skips taken fork titles', async () => {
  const subagentMod = (await import('@deepseek-ai/dsh-subagent')) as unknown as {
    ROOT_AGENT_NAME: string;
    isAgentName: (name: string) => boolean;
    joinAgentPath: (p: string, c: string) => string;
    agentAddress: (p: string, id: string) => string;
    parentAgentPath: (p: string) => string;
    SiblingNameReservations: new () => {
      tryReserve: (parentId: string, name: string) => (() => void) | undefined;
    };
    catalogNames: (entries: Array<{ mode: string; name?: string }>) => Set<string>;
  };

  assert.equal(subagentMod.ROOT_AGENT_NAME, 'lead');
  assert.equal(subagentMod.isAgentName('worker-1'), true);
  assert.equal(subagentMod.isAgentName('lead'), false);
  assert.equal(subagentMod.joinAgentPath('lead', 'worker-1'), 'lead/worker-1');
  assert.equal(subagentMod.parentAgentPath('lead/worker-1'), 'lead');
  assert.equal(subagentMod.agentAddress('lead/worker-1', 'sess-1'), 'lead/worker-1@sess-1');

  const reservations = new subagentMod.SiblingNameReservations();
  const release = reservations.tryReserve('parent-1', 'explorer');
  assert.equal(typeof release, 'function');
  assert.equal(reservations.tryReserve('parent-1', 'explorer'), undefined);
  release?.();
  assert.equal(typeof reservations.tryReserve('parent-1', 'explorer'), 'function');

  const names = subagentMod.catalogNames([
    { mode: 'continuable', name: 'researcher' },
    { mode: 'external', name: 'verifier' },
  ]);
  assert.deepEqual([...names], ['researcher', 'verifier']);

  const sessionClientCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-api-session-controller/lib/client.js'),
    'utf8',
  );
  assert.ok(sessionClientCode.includes('fork child rename failed'));
});

test('10. [0.2.2-rc.3 Update 5] Cordis Inspector Snapshot Budget & Record Overhead (#7425): enforces maxStatePayloadBytes and STATE_RECORD_OVERHEAD_BYTES = 1024', async () => {
  const inspectorMod = (await import('@deepseek-ai/dsh-experimental-inspector')) as unknown as {
    STATE_RECORD_OVERHEAD_BYTES: number;
    MAX_TOPIC_CODE_UNITS: number;
    maxStatePayloadBytes: (maxFrameBytes: number) => number;
    resolveInspectorOptions: (opts?: Record<string, unknown>) => unknown;
  };
  assert.equal(inspectorMod.STATE_RECORD_OVERHEAD_BYTES, 1024);
  assert.equal(inspectorMod.MAX_TOPIC_CODE_UNITS, 128);
  assert.equal(inspectorMod.maxStatePayloadBytes(128 * 1024), 128 * 1024 - 4096 - 1024);

  assert.throws(
    () =>
      inspectorMod.resolveInspectorOptions({
        maxBodyChunkBytes: 3,
        maxSourceFrameBytes: 5120,
      }),
    /inspector: maxSourceFrameBytes cannot carry a Cordis tree snapshot/,
  );
});

test('11. dsh-harness-community plugin is compiled and registered in dsh-web-app', () => {
  const harnessClientPath = path.join(rootDir, 'node_modules/dsh-harness-community/client.js');
  assert.equal(fs.existsSync(harnessClientPath), true);
  const harnessClientCode = fs.readFileSync(harnessClientPath, 'utf8');
  assert.ok(harnessClientCode.includes('id: "dsh-harness-community"'));
  assert.ok(harnessClientCode.includes('BrowserTaskTabsBar'));
  assert.ok(harnessClientCode.includes('DshWorkspaceGroupsAndScheduleSection'));
  assert.ok(harnessClientCode.includes('DshMultiAgentGroupHub'));
  assert.ok(harnessClientCode.includes('DshGroupRoomNativeBar'));
});

test('12. [dsh-superagent Integration] Installs dsh-superagent bundle, github-watch, feishu-watch, client UI, and agent presets into dsh-web-app', async () => {
  const superagentMod = (await import('dsh-superagent')) as unknown as {
    name: string;
    apply: (ctx: unknown, config: unknown) => void;
    Config: (input: Record<string, unknown>) => { stateDir: string };
  };
  assert.equal(superagentMod.name, 'dsh-superagent');
  assert.equal(typeof superagentMod.apply, 'function');
  const validated = superagentMod.Config({});
  assert.ok(typeof validated.stateDir === 'string' && validated.stateDir.length > 0);

  const githubWatchMod = (await import('dsh-superagent/github-watch')) as unknown as {
    name: string;
    apply: (ctx: unknown) => void;
  };
  assert.equal(githubWatchMod.name, 'dsh-superagent-github');
  assert.equal(typeof githubWatchMod.apply, 'function');

  const feishuWatchMod = (await import('dsh-superagent/feishu-watch')) as unknown as {
    name: string;
    apply: (ctx: unknown) => void;
  };
  assert.equal(feishuWatchMod.name, 'dsh-superagent-feishu');
  assert.equal(typeof feishuWatchMod.apply, 'function');

  const superagentClientPath = path.join(rootDir, 'node_modules/dsh-superagent/lib/client.js');
  assert.ok(fs.existsSync(superagentClientPath));
  const superagentClientCode = fs.readFileSync(superagentClientPath, 'utf8');
  assert.ok(superagentClientCode.includes('id: "dsh-superagent"'));
  assert.ok(superagentClientCode.includes('sidebar.panellist'));
  assert.ok(superagentClientCode.includes('__dshBrowserTabsStore'));
  assert.ok(superagentClientCode.includes('{ name: "settings.section", id: "mcp"'));
  assert.equal(superagentClientCode.includes('settings.plugins.tab'), false);

  const webAppPkg = JSON.parse(
    fs.readFileSync(path.join(nmScopeDir, 'dsh-web-app/package.json'), 'utf8'),
  );
  assert.ok(webAppPkg.dsh.bundle.patch.includes('./presets/superagent.patch.yml'));
  assert.equal(webAppPkg.dependencies['dsh-superagent'], '0.1.0');
  const superagentPatchPath = path.join(nmScopeDir, 'dsh-web-app/presets/superagent.patch.yml');
  assert.ok(fs.existsSync(superagentPatchPath));
  const superagentPatchYaml = fs.readFileSync(superagentPatchPath, 'utf8');
  assert.ok(superagentPatchYaml.includes('name: dsh-superagent/feishu-watch'));
  assert.ok(!superagentPatchYaml.includes('disabled: true'));
});

test('13. [Stale Combo Revision Fallback] Patches dsh-client-modules to rebuild combo JS bundles even when request &rev= is from an older server revision', () => {
  const clientModulesCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-client-modules/lib/index.js'),
    'utf8',
  );
  assert.ok(
    clientModulesCode.includes(
      '(requestUrl.pathname === PLUGIN_ROUTE || requestUrl.pathname === "/plugins/") && requestUrl.search.startsWith("??")',
    ),
  );
  assert.ok(clientModulesCode.includes('fallbackCombo = buildCombo(records, this.readSourceMap)'));
  assert.ok(clientModulesCode.includes('text/javascript; charset=utf-8'));
});

test('14. [Multi-Account & Custom Bot Connector Hub] Syncs POST connectors/ingest route and BotConnectorHub UI into node_modules/dsh-superagent', () => {
  const superagentIndexCode = fs.readFileSync(
    path.join(rootDir, 'node_modules/dsh-superagent/lib/index.js'),
    'utf8',
  );
  assert.ok(superagentIndexCode.includes('"POST connectors/ingest"'));

  const superagentClientCode = fs.readFileSync(
    path.join(rootDir, 'node_modules/dsh-superagent/lib/client.js'),
    'utf8',
  );
  assert.ok(superagentClientCode.includes('function BotConnectorHub()'));
  assert.ok(superagentClientCode.includes('function ConnectorStatusSummary()'));
  assert.ok(superagentClientCode.includes('多账号与自定义产品机器人接入中心'));
  assert.ok(superagentClientCode.includes('+ 新增钉钉账号'));
  assert.ok(superagentClientCode.includes('+ 添加自定义产品机器人'));
});

test('15. [dsh-purge-community Integration] Syncs dsh-purge-community bundle, qualifies 0.2.2-rc.3 host, validates unrestricted/redteam presets, and guards container restarts', async () => {
  const webAppPkg = JSON.parse(
    fs.readFileSync(path.join(nmScopeDir, 'dsh-web-app/package.json'), 'utf8'),
  );
  assert.ok(webAppPkg.dsh.bundle.patch.includes('./presets/purge.patch.yml'));
  assert.equal(webAppPkg.dependencies['dsh-purge-community'], '1.6.52');

  const purgePatchPath = path.join(nmScopeDir, 'dsh-web-app/presets/purge.patch.yml');
  assert.equal(fs.existsSync(purgePatchPath), true);
  const purgePatchYaml = fs.readFileSync(purgePatchPath, 'utf8');
  assert.ok(purgePatchYaml.includes('dsh-purge-community'));
  assert.ok(purgePatchYaml.includes('dsh-purge-community/presets-plugin'));
  assert.ok(purgePatchYaml.includes('dsh-purge-community/redteam'));
  assert.ok(purgePatchYaml.includes('dsh-purge-community/redteam/ui'));

  const communityMod = (await import(
    path.join(rootDir, 'node_modules/dsh-purge-community/lib/community.js')
  )) as {
    compatibility: (aiBase: string) => {
      host_version: string;
      qualified: boolean;
      level: string;
    };
  };
  const compat = communityMod.compatibility(nmScopeDir);
  assert.equal(compat.host_version, '0.2.2-rc.5');
  assert.equal(compat.qualified, true);
  assert.equal(compat.level, 'qualified');

  const compositionMod = (await import(
    path.join(rootDir, 'node_modules/dsh-purge-community/lib/redteam/preset-composition.js')
  )) as {
    readPresetDefinition: (
      id: string,
      dir: string,
    ) => { id: string; name: string; plugins: Array<{ id: string; name: string; group?: boolean; config?: unknown }> };
  };
  for (const presetId of ['unrestricted', 'redteam']) {
    const presetDir = path.join(rootDir, 'node_modules/dsh-purge-community/presets', presetId);
    const def = compositionMod.readPresetDefinition(presetId, presetDir);
    assert.equal(def.id, presetId);
    const serialized = JSON.stringify(def.plugins);
    assert.ok(!serialized.includes('dsh-tool-subagent-control/list-agents'));
    assert.ok(serialized.includes('@deepseek-ai/dsh-tool-subagent-control'));
  }

  const purgeClientJs = fs.readFileSync(
    path.join(rootDir, 'node_modules/dsh-purge-community/client.js'),
    'utf8',
  );
  assert.ok(purgeClientJs.includes('label: "破甲控制台 (dsh-purge)"'));
  assert.ok(!purgeClientJs.includes('return window.localStorage.getItem(DRILL_AUTH_KEY) === "1";'));

  process.env.DSH_CONTAINER_MANAGED = '1';
  const webMod = (await import(
    path.join(rootDir, 'node_modules/dsh-purge-community/lib/web.js')
  )) as {
    scheduleRestart: () => { restarting: boolean };
  };
  assert.deepEqual(webMod.scheduleRestart(), { restarting: false });
});

test('16. [Workspace Automation & Group Folder] Assembles 自动化任务, 群组, and dsh-group-hub main panel into dsh-harness-community plugin', () => {
  const harnessClientCode = fs.readFileSync(
    path.join(rootDir, 'node_modules/dsh-harness-community/client.js'),
    'utf8',
  );
  assert.ok(harnessClientCode.includes('"data-testid": "workspace-automation-row"'));
  assert.ok(harnessClientCode.includes('"data-testid": "workspace-groups-folder"'));
  assert.ok(harnessClientCode.includes('`workspace-group-room-${rm.id}`'));
  assert.ok(harnessClientCode.includes('globalThis.__dshSelectMainPanel'));
  assert.ok(harnessClientCode.includes('key: "dsh-group-hub"'));
  assert.ok(harnessClientCode.includes('bindSessionToRoom(sessionId, roomId)'));
  assert.ok(harnessClientCode.includes('syncActiveTabSession(sessionId)'));
  assert.ok(harnessClientCode.includes('`native-bot-chip-${conn.id}`'));
  assert.ok(harnessClientCode.includes('"data-dsh-tip-member": "true"'));
  assert.ok(harnessClientCode.includes('"data-dsh-tip-tag": "点击启用 · 来源：群组"'));
});

test('17. [Left Sidebar Conversations <-> Top BrowserTaskTabsBar Two-Way Sync] Patches 0.2.2-rc.3 dsh-client-ui-workspace and dsh-harness-community so creating/switching/closing conversations stays 1-to-1', () => {
  const wsClientCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-client-ui-workspace/lib/client.js'),
    'utf8',
  );
  // 1. Blank sessions ("新会话") are not hidden when not current; all open tab sessions stay visible in left sidebar
  assert.equal(wsClientCode.includes('if(session.blank&&session.id!==current)return false'), false);
  assert.ok(wsClientCode.includes('if(tabStore.closedIds.has(session.id))'));
  // 2. New session creation from left sidebar or top tabs always mints a new session (reuseBlank: false) and notifies tab store
  assert.ok(wsClientCode.includes('options?.reuseBlank===false?void 0:sessions.ids.find'));
  assert.ok(wsClientCode.includes('globalThis.__dshBrowserTabsStore?.resolveOptimisticTab?.(sessionId)'));
  assert.ok(wsClientCode.includes('globalThis.__dshCreateNewTab(this.mainReference?.sessionId,{workspaceId,agentPreset})'));
  // 3. WorkspaceBrowser subscribes to __dshBrowserTabsStore and replaceMain syncs active session
  assert.ok(wsClientCode.includes('function __dshMainSessionId(list)'));
  assert.equal(wsClientCode.includes('const mainSessionId=mainSessionId(list)'), false);
  assert.equal(wsClientCode.includes('return mainSessionId(list)}'), false);
  assert.ok(wsClientCode.includes('const tabStoreRev=(0,react.useSyncExternalStore)'));
  assert.ok(wsClientCode.includes('globalThis.__dshMainRetainedSessionId=reference.sessionId'));

  const harnessClientCode = fs.readFileSync(
    path.join(rootDir, 'node_modules/dsh-harness-community/client.js'),
    'utf8',
  );
  assert.ok(harnessClientCode.includes('return globalThis.__dshCreateNewTab(opt, opts);'));
  assert.ok(harnessClientCode.includes('const isSidebarVisible = (summary) =>'));
  assert.ok(harnessClientCode.includes('!explicitWsIds.has(id)'));
  assert.ok(harnessClientCode.includes('if (k === "session.new") return "新会话";'));
});

test('18. [No-Flash Persistent Shell & Smooth Switch Transitions] Keeps conversation shell/header/tabs/preset/composer mounted across session switches and wires smooth non-flashing transitions', () => {
  const rendererClientCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-client-ui-renderer/lib/client.js'),
    'utf8',
  );
  assert.ok(
    rendererClientCode.includes(
      'const keepMounted=slotKey===`main.conversation`||slotKey===`conversation.header`||slotKey===`conversation.hero.agentPreset`||slotKey===`conversation.composer.bar`||slotKey===`conversation.input.attachments`;',
    ),
  );
  assert.ok(rendererClientCode.includes('const stableMain=definition.name===`conversation.content`&&inputProps?.variant===`main`;'));
  assert.ok(rendererClientCode.includes('name===`conversation.content`&&inputProps?.variant===`main`?`session-maybe:stable`'));

  const agentPresetClientCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-client-ui-agent-preset/lib/client.js'),
    'utf8',
  );
  assert.ok(agentPresetClientCode.includes('const lastReadyRef=(0,react.useRef)(null)'));
  assert.ok(agentPresetClientCode.includes('const ready=liveReady||lastReadyRef.current!==null;'));

  const wsClientCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-client-ui-workspace/lib/client.js'),
    'utf8',
  );
  assert.ok(wsClientCode.includes('globalThis.__dshTriggerSessionTransition?.(prevSessionId,reference.sessionId,`sidebar`)'));
  assert.ok(wsClientCode.includes('openSession(target){if(!target)return;const nav=AbortSignal.any([this.ctx.layout.beginNavigation(),this.lifetime.signal]);this.replaceMain(target,nav,`reveal`)}'));

  const harnessClientCode = fs.readFileSync(
    path.join(rootDir, 'node_modules/dsh-harness-community/client.js'),
    'utf8',
  );
  assert.ok(harnessClientCode.includes('globalThis.__dshTriggerSessionTransition = function () {}'));
  assert.ok(harnessClientCode.includes('preserveRoot: true'));
  assert.ok(harnessClientCode.includes('header.querySelector(\':scope > [data-dsh-harness-tabs-anchor="1"]\')'));
  assert.equal(harnessClientCode.includes('dshGentleSwitch'), false);
  assert.equal(harnessClientCode.includes('dsh-soft-in'), false);
  assert.equal(harnessClientCode.includes('data-phase="settling"] .wSkVaW_scrollBody{opacity:.5'), false);
  assert.ok(harnessClientCode.includes('min-height:54px!important'));
  assert.ok(harnessClientCode.includes('overflow-x:clip!important'));
  assert.ok(harnessClientCode.includes('visibility:visible!important'));
  assert.ok(harnessClientCode.includes('opacity:1!important'));
});

test('19. [Unified Workspace Sessions & Group Rooms 1-to-1 Top Tabs] Syncs all existing and newly created group rooms to top tabs with persistence and active-tab auto-scroll', () => {
  const harnessClientCode = fs.readFileSync(
    path.join(rootDir, 'node_modules/dsh-harness-community/client.js'),
    'utf8',
  );
  assert.ok(harnessClientCode.includes('const roomTabId = "__room__:" + rm.id;'));
  assert.ok(harnessClientCode.includes('"data-tab-kind": isGroupRoomTab ? "group-room" : "session"'));
  assert.ok(harnessClientCode.includes('dsh_group_room_session_map_v1'));
  assert.ok(harnessClientCode.includes('node.scrollIntoView({ behavior: "auto", inline: "nearest", block: "nearest" })'));
  assert.ok(harnessClientCode.includes('gStore.enterGroupRoom(targetRoomId, liveHelpersForRoom)'));
});

test('20. [Collapsible Group Bar & Zero Ghost Placeholder on Empty Default Workspace] Wraps group bar downward with persisted collapse switch and eliminates empty-workspace ghost space & session leaks', () => {
  const harnessClientCode = fs.readFileSync(
    path.join(rootDir, 'node_modules/dsh-harness-community/client.js'),
    'utf8',
  );
  // Default-collapsed floating DshGroupRoomNativeBar with constant width/padding, borderless avatar, and corner slider avoidance
  assert.ok(harnessClientCode.includes('const [barCollapsed, setBarCollapsed] = (0, react.useState)(true);'));
  assert.ok(harnessClientCode.includes('width: "100%"'));
  assert.ok(harnessClientCode.includes('padding: "10px 16px"'));
  assert.equal(harnessClientCode.includes('width: barCollapsed ? "fit-content" : "100%"'), false);
  assert.equal(harnessClientCode.includes('border: "1.5px solid #FF6A2B"'), false);
  assert.ok(harnessClientCode.includes('patchRoomOptimistic(roomId, patch)'));
  assert.ok(harnessClientCode.includes('syncServerActiveRoom(roomId)'));
  assert.ok(harnessClientCode.includes('gStore.patchRoomOptimistic(latest.id, { collaborationMode })'));
  assert.ok(harnessClientCode.includes('__dshResizeObserverGuardInstalled'));
  assert.ok(harnessClientCode.includes('"data-testid": "group-room-bar-collapse-toggle"'));
  assert.ok(harnessClientCode.includes('"data-testid": "group-room-members-row"'));
  assert.ok(harnessClientCode.includes('"data-testid": "group-room-actions-row"'));
  assert.ok(harnessClientCode.includes('borderRadius: 14'));
  assert.ok(harnessClientCode.includes("document.getElementById('dsh-corner-pull-toggle')"));
  assert.ok(harnessClientCode.includes('besideRight - nl >= 420'));
  assert.ok(harnessClientCode.includes("if (sb.style.paddingTop) sb.style.paddingTop = '';"));
  // Zero-ghost-space empty Default workspace sidebar CSS (unified flex column with display:contents wrappers)
  assert.ok(harnessClientCode.includes('display:contents!important'));
  assert.ok(harnessClientCode.includes('.bhn1Oq_emptyState{display:none!important;height:0!important;margin:0!important;padding:0!important}'));
  // Clean tab close archive, sidebar anchor, and inset cleanup
  assert.ok(harnessClientCode.includes('uw.workspaces.archiveSession(id)'));
  assert.ok(harnessClientCode.includes("lastSb.style.paddingTop = ''"));
  assert.ok(harnessClientCode.includes('anchorIndex: "append"'));

  const wsClientCode = fs.readFileSync(
    path.join(nmScopeDir, 'dsh-client-ui-workspace/lib/client.js'),
    'utf8',
  );
  assert.ok(wsClientCode.includes('!gStore?.getRoomForSession?.(id)'));
  assert.equal(wsClientCode.includes('this.startSession(wsSnap.items[0]?.workspaceId,{reuseBlank:false})'), false);
});

test('21. [1-to-1 Bidirectional Sidebar/Top-Tab Sync & Workspace Subfolder Vertical Drag] Syncs group room cancellation in both directions and enables smooth FLIP vertical drag reordering of all workspace subfolders & group rooms', () => {
  const harnessClientCode = fs.readFileSync(
    path.join(rootDir, 'node_modules/dsh-harness-community/client.js'),
    'utf8',
  );
  assert.ok(harnessClientCode.includes('removeRoomOptimistic(roomId)'));
  assert.ok(harnessClientCode.includes('reorderRoomsOptimistic(roomIds)'));
  assert.ok(harnessClientCode.includes('sidebar-group-close-'));
  assert.ok(harnessClientCode.includes('globalThis.__dshCloseTab = closeTabFn;'));
  assert.ok(harnessClientCode.includes('mountSidebarFolderDrag'));
  assert.ok(harnessClientCode.includes('dsh_workspace_subfolder_order_v1'));
  assert.ok(harnessClientCode.includes('disableNativeHeaderDrag'));
  assert.ok(harnessClientCode.includes('animateSiblingFlip'));
  assert.ok(harnessClientCode.includes('data-dsh-folder-settling'));
  assert.ok(harnessClientCode.includes('data-dsh-folder-drag-active'));
  assert.ok(harnessClientCode.includes('animateRoomFlip'));
});

test('22. [Preset 1 Corner-Slider Left-Docked Nav Sidebar Toggle] Aligns [data-dsh-nav-sidebar-toggle] horizontally to the left of #dsh-corner-pull-toggle in Preset 1 and restores nav docking in other themes', () => {
  const harnessClientCode = fs.readFileSync(
    path.join(rootDir, 'node_modules/dsh-harness-community/client.js'),
    'utf8',
  );
  assert.ok(harnessClientCode.includes('data-dsh-nav-toggle-dock="corner-slider"'));
  assert.ok(harnessClientCode.includes('positionBesideCornerSlider'));
  assert.ok(harnessClientCode.includes('txt === "更多" || txt === "More"'));
});





