// dsh-harness-community — official client module glue.
// Assembled at boot by dsh-upstream-sync (placeholders replaced):
//   __BLOCK_TABS__ / __BLOCK_GROUPS__ / __BLOCK_HUB__ / __BLOCK_THEME_RUNTIME__
//   __LUMINEX_CSS__ / __CLASS_MAPS__
// All UI/logic blocks are ported verbatim from the legacy string-patch layer
// (single source of truth stays src/utils/*); this glue only wires them into
// the official client-module API so upgrades cannot silently break them.
window.__ModuleLoader__.load({ id: "dsh-harness-community", factory: (require) => {
var module = { exports: {} };
var exports = module.exports;
var react = require("react");
var react_dom = require("react-dom");
var react_jsx_runtime = require("react/jsx-runtime");
var _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var workspaceDisplayTitle = function (title, localizedDefault) {
  return title === "default-workspace" ? (localizedDefault || "Default workspace") : title;
};
if (typeof window !== "undefined" && !window.__dshResizeObserverGuardInstalled) {
  window.__dshResizeObserverGuardInstalled = true;
  if (typeof window.ResizeObserver === "function") {
    var NativeResizeObserver = window.ResizeObserver;
    var SafeResizeObserver = function (callback) {
      var rafId = 0;
      var latestEntries = null;
      var disconnected = false;
      var observer = new NativeResizeObserver(function (entries, obs) {
        if (disconnected) return;
        latestEntries = entries;
        if (rafId) return;
        rafId = window.requestAnimationFrame(function () {
          rafId = 0;
          if (disconnected || !latestEntries) return;
          var batch = latestEntries;
          latestEntries = null;
          callback(batch, obs);
        });
      });
      var origObserve = observer.observe.bind(observer);
      observer.observe = function () {
        disconnected = false;
        return origObserve.apply(observer, arguments);
      };
      var origDisconnect = observer.disconnect.bind(observer);
      observer.disconnect = function () {
        disconnected = true;
        latestEntries = null;
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
        return origDisconnect();
      };
      return observer;
    };
    SafeResizeObserver.prototype = NativeResizeObserver.prototype;
    try { window.ResizeObserver = SafeResizeObserver; } catch (_e) {}
  }
  window.addEventListener("error", function (event) {
    var msg = event && typeof event.message === "string" ? event.message : "";
    if (msg.indexOf("ResizeObserver loop") !== -1) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);
}

var clsx = function () {
  var out = [];
  for (var i = 0; i < arguments.length; i++) {
    var a = arguments[i];
    if (!a) continue;
    if (Array.isArray(a)) out.push(clsx.apply(null, a));
    else out.push(String(a));
  }
  return out.filter(Boolean).join(" ");
};

/*__CLASS_MAPS__*/

/*__BLOCK_SSH_RUNTIME__*/

/*__BLOCK_TABS__*/

/*__BLOCK_GROUPS__*/

/*__BLOCK_HUB__*/

/*__BLOCK_GROUP_BAR__*/

var CSS_EXTRA = [
  String.raw`.wSkVaW_header{display:grid!important;grid-template-columns:auto minmax(0,1fr) auto!important;column-gap:8px!important}`,
  String.raw`.wSkVaW_headerLeading{grid-column:1!important;grid-row:1!important}`,
  String.raw`.wSkVaW_header>[data-dsh-harness-tabs-anchor]{grid-column:2!important;grid-row:1!important;flex:1 1 auto;min-width:0;display:flex;align-items:center;overflow:hidden;height:34px;align-self:center}`,
  String.raw`[data-dsh-harness-tabs-anchor]>[data-dsh-harness-portal="tabs-bar"]{display:flex;align-items:center;flex:1 1 auto;min-width:0;height:100%}`,
  String.raw`.wSkVaW_header .wSkVaW_titleRow{grid-column:3!important;grid-row:1!important;flex:none!important;justify-content:flex-end!important;padding-inline-start:0!important;display:flex!important;align-items:center!important}`,
  String.raw`.wSkVaW_header .wSkVaW_titleCluster{display:none!important}`,
  String.raw`.wSkVaW_header .wSkVaW_viewTabs{grid-column:2 / -1!important;grid-row:2!important}`,
  // Hide the top-right session name (conversation header crumbs) — the tabs
  // already name every conversation.
  String.raw`.wSkVaW_crumbs{display:none!important}`,
  // The header preset label (标准模式…) moves down to the composer status row;
  // hide the header original, the dock portal mirrors it live.
  String.raw`.wSkVaW_headerActions [data-slot="conversation.session.header.actions"]{display:none!important}`,
  String.raw`[data-dsh-harness-portal="preset-seat-dock"]{display:inline-flex!important;align-items:center!important;height:100%!important;flex:0 0 auto!important;margin-right:8px}`,
  // Keep right-side header utility controls cleanly inside the clip edge.
  String.raw`.wSkVaW_headerUtilities{margin-right:0!important}`,
  String.raw`.wSkVaW_headerCorner{margin-right:0!important}`,
  // Lock header vertical geometry across blank (hero) and active sessions so switching never jumps the whole page up/down.
  String.raw`.wSkVaW_header,.wSkVaW_header.wSkVaW_headerBlank,.wSkVaW_header:where(:not(:has(.wSkVaW_tabs))){min-height:54px!important;padding-top:10px!important;padding-bottom:10px!important;border-bottom-width:.5px!important;border-bottom-style:solid!important;transition:border-bottom-color .24s ease}`,
  String.raw`.wSkVaW_header.wSkVaW_headerBlank{border-bottom-color:transparent!important}`,
  // Prevent horizontal scrollbar flicker / jitter during session transitions.
  String.raw`.wSkVaW_scrollBody{overflow-x:clip!important}`,
  // Smooth, calm transitions for top tabs, left sidebar rows, preset seat, and composer stack.
  String.raw`.wSkVaW_browserTab{transition:background-color .24s cubic-bezier(.22,1,.36,1),border-color .24s cubic-bezier(.22,1,.36,1),color .2s ease,box-shadow .24s cubic-bezier(.22,1,.36,1)!important}`,
  String.raw`.wSkVaW_browserTab:active:not(.wSkVaW_browserTabDragging){transform:none!important}`,
  String.raw`.YDXeBa_sessionRow{transition:background-color .24s cubic-bezier(.22,1,.36,1),border-color .24s cubic-bezier(.22,1,.36,1),color .2s ease,box-shadow .24s cubic-bezier(.22,1,.36,1)!important}`,
  String.raw`.cubgiG_seat{transition:background-color .22s cubic-bezier(.22,1,.36,1),color .2s cubic-bezier(.22,1,.36,1),opacity .22s cubic-bezier(.22,1,.36,1),box-shadow .22s cubic-bezier(.22,1,.36,1)!important}`,
  String.raw`.cubgiG_seatLabel{transition:opacity .2s ease,color .2s ease}`,
  String.raw`.wSkVaW_heroWorkspaceRow button{transition:background-color .22s cubic-bezier(.22,1,.36,1),border-color .22s cubic-bezier(.22,1,.36,1),color .2s cubic-bezier(.22,1,.36,1),opacity .22s cubic-bezier(.22,1,.36,1)}`,
  String.raw`.uV2eYG_card{transition:box-shadow .26s cubic-bezier(.22,1,.36,1),border-color .26s cubic-bezier(.22,1,.36,1),background-color .26s cubic-bezier(.22,1,.36,1),opacity .26s cubic-bezier(.22,1,.36,1)}`,
  // Instant, zero-jitter session switches (no slide/fade/opacity dip on the main stage).
  String.raw`.wSkVaW_root[data-phase="settling"] .wSkVaW_composerSeat,.wSkVaW_embeddedBody[data-content-phase="settling"] .wSkVaW_composerSeat{visibility:visible!important;opacity:1!important;margin-top:auto;position:sticky;bottom:0;transition:none!important}`,
  String.raw`.wSkVaW_root[data-phase="settling"] .wSkVaW_scrollBody,.wSkVaW_root[data-phase="settling"] .wSkVaW_scrollBody .wSkVaW_viewArea,.wSkVaW_root[data-phase="active"] .wSkVaW_scrollBody{opacity:1!important;transition:none!important}`,
  // FIX 2b: solid top strip filled by the Electron shell with the native caption
  // colour, so the title bar and the page merge seamlessly (no colour block under
  // min/max/close). MUST use a NEGATIVE z-index: at z-index:0 this fixed strip
  // painted over the header utility buttons (更多操作 / 打开侧边栏) and hid them.
  // At -1 it sits above the body background but below all app content + buttons.
  String.raw`#dsh-titlebar-fill{position:fixed;top:0;left:0;right:0;height:52px;background:var(--dsh-caption-color,transparent);pointer-events:none;z-index:-1}`,
  // FIX 1: Settings dialog is portalled to <body>; make sure Electron's frameless
  // drag region never swallows clicks on its controls (close X in particular).
  String.raw`[data-shortcut-modal="settings"],.VOzbGW_overlay,.VOzbGW_panel,.VOzbGW_panel *{-webkit-app-region:no-drag!important}`,
  // FIX 4: tooltip shortcut-key badge shipped by dsh is dark-on-dark in light
  // themes ("打开侧边栏 Ctrl+Shift+B"). Give it a readable light chip everywhere
  // except the genuinely dark liquid-glass/gray-dark presets.
  String.raw`[role="tooltip"] [class*="_keys_"],[class*="_tooltip_"][class*="_joined_"]{background:rgba(15,23,42,.08)!important;color:#1f2430!important;border:1px solid rgba(15,23,42,.12)!important}`,
  String.raw`body[data-ds-dark-theme]:not([data-dsh-theme-id="preset-1"]):not([data-dsh-theme-id="preset-2"]) [role="tooltip"] [class*="_keys_"],body[data-ds-dark-theme]:not([data-dsh-theme-id="preset-1"]):not([data-dsh-theme-id="preset-2"]) [class*="_tooltip_"][class*="_joined_"]{background:rgba(255,255,255,.14)!important;color:#f1f5f9!important;border-color:rgba(255,255,255,.18)!important}`,
  String.raw`body[data-dsh-theme-id="preset-1"]:not([data-dsh-preset1-mode="light"]) [role="tooltip"] [class*="_keys_"],body[data-dsh-theme-id="preset-1"]:not([data-dsh-preset1-mode="light"]) [class*="_tooltip_"][class*="_joined_"]{background:rgba(255,255,255,.14)!important;color:#f8fafc!important;border-color:rgba(255,255,255,.18)!important}`,
  // Global-nav sidebar toggle: the native expand/collapse control lives in the
  // conversation header corner, which the opened right panel itself can cover —
  // once that happens there is no visible way to close the panel. A permanent
  // icon button sits right after the nav's 更多 button instead (user request).
  String.raw`[data-dsh-nav-sidebar-toggle]{display:inline-flex!important;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;border:none;background:transparent;color:var(--dsw-alias-label-secondary,#6E7180);cursor:pointer;flex:0 0 auto;padding:0;margin-left:2px;transition:background .12s ease,color .12s ease}`,
  String.raw`[data-dsh-nav-sidebar-toggle]:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.06))!important;color:var(--dsw-alias-label-primary,#2B2D38)}`,
  String.raw`[data-dsh-nav-sidebar-toggle="open"]{background:var(--dsw-alias-state-business-tertiary,rgba(255,106,43,.14))!important;color:var(--dsw-alias-state-business-primary,#FF6A2B)}`
].join(String.fromCharCode(10));
var LUMINEX_CSS = __LUMINEX_CSS__;
var luminexRuntime = {
  /*__BLOCK_THEME_RUNTIME__*/
};

// ---------------------------------------------------------------------------
// Error boundary so one failing feature can never blank the whole app.
// ---------------------------------------------------------------------------
class HarnessErrorBoundary extends react.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    harnessLog("boundary:" + (this.props.name || "component"), err); console.error("[dsh-harness] " + (this.props.name || "component") + " failed:", err);
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

// ---------------------------------------------------------------------------
// Service-face shims. Faces are introspected at first boot (see __dshSvcInfo).
// ---------------------------------------------------------------------------
var FLAGS = (function () {
  try {
    return JSON.parse(window.localStorage.getItem("dsh_harness_flags") || "{}");
  } catch (_e) {
    return {};
  }
})();
var svc = {};
var svcInfo = {};
function captureServices(ctx) {
  svc.ctx = ctx;
  try {
    svcInfo.slots = ctx.slots ? Object.keys(ctx.slots) : null;
    svcInfo.sessions = svc.sessions ? Object.keys(svc.sessions) : null;
    svcInfo.uiWorkspace = svc.uiWorkspace ? Object.keys(svc.uiWorkspace) : null;
    svcInfo.layout = svc.layout ? Object.keys(svc.layout) : null;
    globalThis.__dshSvcInfo = svcInfo;
    globalThis.__dshSvcFaces = svc;
  } catch (_e) {}
}
globalThis.__dshHarnessLog = [];
window.addEventListener("error", function (e) {
  try { globalThis.__dshHarnessLog.push("window-error: " + String(e.message).slice(0, 200) + " @ " + String(e.filename||"").slice(-40) + ":" + (e.lineno||0)); } catch (_e) {}
});
window.addEventListener("unhandledrejection", function (e) {
  try { globalThis.__dshHarnessLog.push("unhandled-rejection: " + String(e.reason && e.reason.message || e.reason).slice(0, 200)); } catch (_e) {}
});
function harnessLog(kind, err) {
  try {
    var entry = kind + ': ' + (err && err.stack ? String(err.stack).split(String.fromCharCode(10)).slice(0, 3).join(' | ') : String(err));
    globalThis.__dshHarnessLog.push(entry);
    try {
      var stored = [];
      try { stored = JSON.parse(sessionStorage.getItem('dsh_harness_log') || '[]'); } catch (_e2) {}
      stored.push(entry);
      if (stored.length > 24) stored = stored.slice(-24);
      sessionStorage.setItem('dsh_harness_log', JSON.stringify(stored));
    } catch (_e3) {}
  } catch (_e4) {}
}

function getSessionListSnapshot() {
  try {
    var list = svc.sessions && (svc.sessions.list || (svc.sessions.sessions && svc.sessions.sessions.list));
    return list && typeof list.getSnapshot === "function" ? list.getSnapshot() : null;
  } catch (_e) {
    return null;
  }
}

function serviceHook(getSnapshot, subscribe) {
  return function useServiceStore(selector, isEqual) {
    var getSel = function () {
      var snap = getSnapshot();
      return selector ? selector(snap) : snap;
    };
    var getServer = function () {
      try {
        return getSel();
      } catch (_e) {
        return void 0;
      }
    };
    return (0, react.useSyncExternalStore)(
      subscribe || function (cb) {
        return function () {};
      },
      getSel,
      getServer,
    );
  };
}

// Stable-ish panel info shim: the sidebar section only reads activePanelId,
// which we track through globalThis.__dshSelectMainPanel side effects.
var panelInfoStore = { listeners: new Set(), activePanelId: null };
function setPanelInfoActive(panelId) {
  if (panelInfoStore.activePanelId === panelId) return;
  panelInfoStore.activePanelId = panelId;
  for (var l of panelInfoStore.listeners) {
    try {
      l();
    } catch (_e) {}
  }
}
function usePanelInfo(selector) {
  var subscribe = function (cb) {
    panelInfoStore.listeners.add(cb);
    return function () {
      return panelInfoStore.listeners.delete(cb);
    };
  };
  var getSnapshot = function () {
    return panelInfoStore.activePanelId;
  };
  var active = (0, react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
  var info = { activePanelId: active };
  return typeof selector === "function" ? selector(info) : info;
}

// Legacy globals the ported blocks rely on.
globalThis.__dshSelectMainPanel = function (panelId) {
  setPanelInfoActive(panelId);
  try {
    if (svc.layout && typeof svc.layout.selectPanel === "function") svc.layout.selectPanel(panelId);
    if (svc.uiWorkspace && typeof svc.uiWorkspace.selectPanel === "function") svc.uiWorkspace.selectPanel(panelId);
  } catch (_e) {}
};
globalThis.__dshCreateNewTab = function (_opt, opts) {
  var helpers = resolveWorkspaceHelpers(svc.ctx || {});
  var requestedWsId = opts && opts.workspaceId;
  var matchedWs = requestedWsId && helpers.workspaces.find(function (w) { return w && w.workspaceId === requestedWsId; });
  var liveFirstWs = helpers.workspaces.find(function (w) { return w && w.workspaceId && w.workspaceId !== "default-workspace"; });
  var wsId = (matchedWs && matchedWs.workspaceId) || (liveFirstWs && liveFirstWs.workspaceId) || requestedWsId || void 0;
  var tabStore = getDshBrowserTabsStore();
  var gStore = globalThis.__dshGroupHubStore;
  if (!(opts && opts.roomId) && gStore && typeof gStore.leaveGroupRoom === "function") {
    gStore.leaveGroupRoom();
  }
  var archivedSet = new Set((helpers.wsStore && helpers.wsStore.getSnapshot && (helpers.wsStore.getSnapshot().archivedSessionIds || [])) || []);
  for (var wi = 0; wi < helpers.workspaces.length; wi++) {
    var w = helpers.workspaces[wi];
    var sids = Array.isArray(w && w.sessionIds) ? w.sessionIds.slice().reverse() : [];
    for (var si = 0; si < sids.length; si++) {
      var sid = sids[si];
      if (sid && !archivedSet.has(sid) && !tabStore.closedIds.has(sid) && !tabStore.order.includes(sid)) {
        tabStore.order.push(sid);
      }
    }
  }
  tabStore.noTabsHomeMode = false;
  tabStore.homeStandbySessionId = void 0;
  tabStore.awaitingStandbySession = false;
  var optKey = "__opt_tab_" + ++tabStore.seq;
  var prevIds = new Set(helpers.list.ids || []);
  tabStore.optimisticTabs.set(optKey, {
    id: optKey,
    workspaceId: wsId,
    roomId: opts && opts.roomId,
    title: (opts && opts.title) || "新会话",
    knownIds: prevIds,
  });
  if (opts && opts.title) tabStore.customTitles.set(optKey, opts.title);
  if (opts && opts.roomId) {
    var roomTabId = "__room__:" + opts.roomId;
    tabStore.closedIds.delete(roomTabId);
    if (!tabStore.order.includes(roomTabId)) tabStore.order.push(roomTabId);
    if (gStore && typeof gStore.bindSessionToRoom === "function") {
      gStore.bindSessionToRoom(optKey, opts.roomId);
    }
  } else {
    if (!tabStore.order.includes(optKey)) tabStore.order.push(optKey);
  }
  tabStore.optimisticActiveId = optKey;
  tabStore.emit(true);
  globalThis.__dshSelectMainPanel(null);
  var uw = svc.uiWorkspace || {};
  var created = null;
  try {
    created = uw.startSession(wsId, {
      ...(opts && opts.agentPreset ? { agentPreset: opts.agentPreset } : {}),
      reuseBlank: false,
      __fromCreateNewTab: true,
    });
  } catch (e) {
    harnessLog("createNewTab.startSession", e);
  }
  var resolved = false;
  var unsubSess = null;
  var unsubSel = null;
  var timer = null;
  function cleanupOptKey() {
    if (tabStore.optimisticTabs.has(optKey)) tabStore.optimisticTabs.delete(optKey);
    var oi = tabStore.order.indexOf(optKey);
    if (oi !== -1) tabStore.order.splice(oi, 1);
    if (tabStore.optimisticActiveId === optKey) tabStore.optimisticActiveId = void 0;
  }
  function cleanupResolve() {
    if (timer) { clearInterval(timer); timer = null; }
    try { if (typeof unsubSess === "function") unsubSess(); } catch (_e) {}
    try { if (typeof unsubSel === "function") unsubSel(); } catch (_e) {}
    unsubSess = null;
    unsubSel = null;
  }
  function tryResolveNewTab() {
    if (resolved) return true;
    try {
      var snap = uw.sessions && uw.sessions.list && uw.sessions.list.getSnapshot();
      var ids = (snap && snap.ids) || [];
      var newId = ids.find(function (id) { return !prevIds.has(id); }) || null;
      var selId = "";
      try { selId = uw.selection.getSnapshot().sessionId || ""; } catch (_e) {}
      if (!newId && selId && !prevIds.has(selId)) newId = selId;
      if (newId) {
        resolved = true;
        cleanupResolve();
        if (opts && opts.roomId && tabStore.closedIds.has("__room__:" + opts.roomId)) {
          cleanupOptKey();
          tabStore.closedIds.add(newId);
          try {
            if (uw.workspaces && typeof uw.workspaces.archiveSession === "function") {
              uw.workspaces.archiveSession(newId).catch(function () {});
            }
          } catch (_e) {}
          tabStore.emit(true);
          return true;
        }
        var userStillAwaiting = tabStore.optimisticActiveId === optKey;
        if (opts && opts.roomId && gStore && typeof gStore.bindSessionToRoom === "function") {
          gStore.bindSessionToRoom(newId, opts.roomId);
        }
        tabStore.resolveOptimisticTab(newId, optKey);
        if (opts && opts.roomId) {
          var rawIdx = tabStore.order.indexOf(newId);
          if (rawIdx !== -1) tabStore.order.splice(rawIdx, 1);
        }
        if (opts && opts.title) tabStore.setCustomTitle(newId, opts.title);
        if (userStillAwaiting) {
          tabStore.activeSessionId = newId;
          globalThis.__dshActiveSessionId = newId;
          globalThis.__dshMainRetainedSessionId = newId;
          globalThis.__dshSelectMainPanel(null);
          if (selId !== newId) {
            try { uw.openSession(newId); } catch (_e) {}
          }
        }
        tabStore.emit(true);
        return true;
      }
    } catch (_e) {}
    return false;
  }
  if (!tryResolveNewTab()) {
    try {
      if (uw.sessions && uw.sessions.list && typeof uw.sessions.list.subscribe === "function") {
        unsubSess = uw.sessions.list.subscribe(tryResolveNewTab);
      }
      if (uw.selection && typeof uw.selection.subscribe === "function") {
        unsubSel = uw.selection.subscribe(tryResolveNewTab);
      }
    } catch (_e) {}
    var attempts = 0;
    timer = setInterval(function () {
      attempts += 1;
      if (tryResolveNewTab()) return;
      if (attempts > 80) {
        cleanupResolve();
        cleanupOptKey();
        tabStore.emit(true);
      }
    }, 40);
  }
  return created;
};

function resolveWorkspaceHelpers(ctx) {
  var uw = svc.uiWorkspace || {};
  var wsStore = uw.workspaces && uw.workspaces.list;
  var sessStore = uw.sessions && uw.sessions.list;
  var wsSnap = wsStore && typeof wsStore.getSnapshot === "function" ? wsStore.getSnapshot() : null;
  var workspaces = (wsSnap && Array.isArray(wsSnap.items) && wsSnap.items.length)
    ? wsSnap.items
    : [{ workspaceId: "default-workspace" }];
  var byId = {};
  var ids = [];
  var sessSnap = sessStore && typeof sessStore.getSnapshot === "function" ? sessStore.getSnapshot() : null;
  if (sessSnap) {
    byId = sessSnap.byId || {};
    ids = sessSnap.ids || [];
  }
  var startSession = function (workspaceId, options) {
    try {
      if (typeof uw.startSession === "function") return uw.startSession(workspaceId, options);
    } catch (e) {
      harnessLog("startSession", e);
    }
  };
  var open = function (sessionId) {
    try {
      // Upstream switches the main conversation via uiWorkspace.openSession
      // (replaceMain → reveal). selection.set is a replace-mode store write and
      // does not drive the conversation panel — tabs must mirror the sidebar.
      if (typeof uw.openSession === "function") return uw.openSession(sessionId);
      var sel = uw.selection;
      if (sel && typeof sel.set === "function") return sel.set({ sessionId: sessionId });
      if (sel && typeof sel.update === "function") return sel.update(function () { return { sessionId: sessionId }; });
    } catch (e) {
      harnessLog("open session", e);
    }
  };
  return {
    workspaces: workspaces,
    startSession: startSession,
    open: open,
    list: { byId: byId, ids: ids },
    wsStore: wsStore,
    sessStore: sessStore,
  };
}

// ---------------------------------------------------------------------------
// Theme: CSS + runtime (tooltips, submode tokens, corner widget).
// ---------------------------------------------------------------------------
var THEME_STORAGE_KEY = "dsh_harness_theme_id";
function mountLuminexTheme() {
  globalThis.__dshHarnessCornerWidget = true;
  if (typeof document === "undefined" || !document.body) return;
  var styleId = "dsh-harness-luminex-css";
  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
    style.textContent = LUMINEX_CSS + CSS_EXTRA;
    document.head.appendChild(style);
  }
  var saved = "preset-1";
  try {
    var choiceRaw = window.localStorage.getItem("dsh_harness_theme_choice");
    if (choiceRaw) {
      var choice = JSON.parse(choiceRaw);
      if (choice && choice.mode === "stock") saved = "";
      else if (choice && choice.id) saved = choice.id;
    }
  } catch (_e) {}
  if (saved) try {
    luminexRuntime.syncDshLuminexBackground(saved);
  } catch (e) {
    harnessLog("[dsh-harness] kind", e); console.error("[dsh-harness] luminex runtime:", e);
  }
  // Keep the saved theme in sync when the submode widget commits.
  var prev = globalThis.__dshCommitPreset1Submode;
  if (typeof prev === "function") {
    globalThis.__dshCommitPreset1Submode = function (mode) {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, "preset-1");
      } catch (_e) {}
      return prev(mode);
    };
  }
}

// ---------------------------------------------------------------------------
// Generic MutationObserver portal: mounts a React node once the anchor shows
// up in the DOM, re-mounts if it gets detached by re-renders.
// ---------------------------------------------------------------------------
// Direct, instant session switching — keep hook signature as a zero-reflow no-op.
globalThis.__dshTriggerSessionTransition = function () {};

var activePortals = [];
function portalMount(options) {
  var host = null;
  var reactRoot = null;
  function insertHost(anchor, el) {
    if (options.anchorIndex === "append") anchor.appendChild(el);
    else if (typeof options.anchorIndex === "number") {
      var ref = anchor.children[Math.min(options.anchorIndex, anchor.children.length)];
      anchor.insertBefore(el, ref || null);
    } else anchor.appendChild(el);
  }
  function tryMount() {
    if (host && host.isConnected && host.parentElement && host.parentElement.isConnected) return true;
    var anchor = options.findAnchor();
    if (!anchor) return false;
    if (host && host.isConnected && host.parentElement === anchor) return true;
    if (options.preserveRoot && host && reactRoot) {
      insertHost(anchor, host);
      return true;
    }
    unmount();
    host = document.createElement(options.hostTag || "div");
    host.setAttribute("data-dsh-harness-portal", options.name);
    insertHost(anchor, host);
    reactRoot = react_dom.createRoot(host);
    reactRoot.render(
      react.createElement(HarnessErrorBoundary, { name: options.name }, options.render()),
    );
    return true;
  }
  function unmount() {
    try {
      if (reactRoot) reactRoot.unmount();
    } catch (_e) {}
    try {
      if (host && host.isConnected) host.remove();
    } catch (_e) {}
    reactRoot = null;
    host = null;
  }
  var scheduled = false;
  var observer = new MutationObserver(function () {
    if (host && host.isConnected && host.parentElement && host.parentElement.isConnected) return;
    // Debounce to the next frame; re-render storms must not thrash portals.
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      tryMount();
    });
  });
  function start() {
    setInterval(function () {
      try {
        if (!host || !host.isConnected) tryMount();
      } catch (_e) {}
    }, 100);
    if (document.body) {
      tryMount();
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        tryMount();
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
    activePortals.push({ stop: unmount, name: options.name });
  }
  start();
}

// ---------------------------------------------------------------------------
// Sidebar groups section portal.
// ---------------------------------------------------------------------------
function mountSidebarGroups(ctx) {
  var ROWS = Rows_module_css_default;
  getDshGroupHubStore();
  function SidebarGroupsHost() {
    var helpers = resolveWorkspaceHelpers(ctx);
    var liveList = {
      get byId() {
        var snap = getSessionListSnapshot();
        return (snap && snap.byId) || resolveWorkspaceHelpers(ctx).list.byId || {};
      },
    };
    return react.createElement(DshWorkspaceGroupsAndScheduleSection, {
      usePanelInfo: usePanelInfo,
      workspaces: helpers.workspaces,
      startSession: function (wsId, options) { return resolveWorkspaceHelpers(ctx).startSession(wsId, options); },
      open: function (sid) { return resolveWorkspaceHelpers(ctx).open(sid); },
      list: liveList,
    });
  }
  portalMount({
    name: "sidebar-groups",
    hostTag: "div",
    anchorIndex: "append",
    render: function () {
      return react.createElement(SidebarGroupsHost);
    },
    findAnchor: function () {
      var listArea = document.querySelector('[class*="_listArea"]');
      if (listArea) return listArea;
      var treeBody = document.querySelector('[class*="_treeBody"]');
      if (treeBody) return treeBody;
      var rows = document.querySelectorAll("." + ROWS.projectRow + ", ." + (ROWS.sessionRow || ""));
      if (!rows.length) return null;
      var el = rows[rows.length - 1];
      return el.closest(String('[class*="_listArea"]')) || el.closest(String('[class*="_treeBody"]')) || null;
    },
  });
}

// ---------------------------------------------------------------------------
// Browser task tabs bar portal (above the conversation header).
// ---------------------------------------------------------------------------
function mountTabsBar(ctx) {
  if (!globalThis.__dshBrowserTabsStore) getDshBrowserTabsStore();
  var helpers = resolveWorkspaceHelpers(ctx);
  var sessStoreRef = function () {
    var uw = svc.uiWorkspace || {};
    return (uw.sessions && uw.sessions.list) || null;
  };
  var wsStoreRef = function () {
    var uw = svc.uiWorkspace || {};
    return (uw.workspaces && uw.workspaces.list) || null;
  };
  var storeSubscribe = function (ref) {
    return function (cb) {
      var unsub = null;
      var poll = null;
      var attach = function () {
        try {
          var st = ref();
          if (st && typeof st.subscribe === "function") {
            if (poll) { clearInterval(poll); poll = null; }
            unsub = st.subscribe(cb);
            cb();
            return true;
          }
        } catch (_e) {}
        return false;
      };
      if (!attach()) {
        poll = setInterval(attach, 50);
      }
      return function () {
        if (poll) { clearInterval(poll); poll = null; }
        try { if (typeof unsub === "function") unsub(); } catch (_e) {}
      };
    };
  };
  var EMPTY_SESSIONS = { byId: {}, ids: [] };
  var EMPTY_WORKSPACES = { items: [], archivedSessionIds: [] };
  var useSessions = serviceHook(function () {
    try {
      var st = sessStoreRef();
      var snap = st && st.getSnapshot();
      return snap || EMPTY_SESSIONS;
    } catch (_e) { return EMPTY_SESSIONS; }
  }, storeSubscribe(sessStoreRef));
  var useWorkspaces = serviceHook(function () {
    try {
      var st = wsStoreRef();
      var snap = st && st.getSnapshot();
      return snap || EMPTY_WORKSPACES;
    } catch (_e) { return EMPTY_WORKSPACES; }
  }, storeSubscribe(wsStoreRef));
  portalMount({
    name: "tabs-bar",
    hostTag: "div",
    preserveRoot: true,
    render: function () {
      var openById = function (sessionId) {
        try {
          if (!sessionId) return;
          var tabStore = getDshBrowserTabsStore();
          var gStore = globalThis.__dshGroupHubStore || (typeof getDshGroupHubStore === "function" ? getDshGroupHubStore() : null);
          if (typeof sessionId === "string" && sessionId.indexOf("__room__:") === 0) {
            var targetRoomId = sessionId.slice("__room__:".length);
            if (targetRoomId && gStore && typeof gStore.enterGroupRoom === "function") {
              var liveHelpersForRoom = resolveWorkspaceHelpers(ctx);
              gStore.enterGroupRoom(targetRoomId, liveHelpersForRoom);
            }
            return;
          }
          var uw = svc.uiWorkspace || {};
          var sessSnap = uw.sessions && uw.sessions.list && uw.sessions.list.getSnapshot && uw.sessions.list.getSnapshot();
          if (sessSnap && sessSnap.byId && !sessSnap.byId[sessionId]) {
            var staleIdx = tabStore.order.indexOf(sessionId);
            if (staleIdx !== -1) tabStore.order.splice(staleIdx, 1);
            tabStore.emit(true);
            return;
          }
          var currentSel = uw.selection && uw.selection.getSnapshot && uw.selection.getSnapshot();
          var prevId = (currentSel && currentSel.sessionId) || tabStore.activeSessionId || globalThis.__dshActiveSessionId;
          tabStore.noTabsHomeMode = false;
          tabStore.optimisticActiveId = void 0;
          tabStore.closedIds.delete(sessionId);
          tabStore.activeSessionId = sessionId;
          globalThis.__dshActiveSessionId = sessionId;
          globalThis.__dshMainRetainedSessionId = sessionId;
          if (prevId && prevId !== sessionId && typeof globalThis.__dshTriggerSessionTransition === "function") {
            globalThis.__dshTriggerSessionTransition(prevId, sessionId, "tabs");
          }
          tabStore.emit(true);
          if (gStore && typeof gStore.syncActiveTabSession === "function") {
            gStore.syncActiveTabSession(sessionId);
          }
          if (typeof globalThis.__dshSelectMainPanel === "function") {
            globalThis.__dshSelectMainPanel(null);
          }
          if (typeof uw.openSession === "function") return uw.openSession(sessionId);
          var sel = uw.selection;
          if (sel && typeof sel.set === "function") return sel.set({ sessionId: sessionId });
          if (sel && typeof sel.update === "function") return sel.update(function () { return { sessionId: sessionId }; });
        } catch (e) {
          harnessLog("open session", e);
        }
      };
      return react.createElement(BrowserTaskTabsBar, {
        sessionId: void 0,
        useSessions: useSessions,
        useWorkspaces: useWorkspaces,
        open: openById,
        createNewTab: function (opt, opts) {
          return globalThis.__dshCreateNewTab(opt, opts);
        },
        closeTab: function (id, currentTabIds, activeSessionId) {
          var tabStore = getDshBrowserTabsStore();
          var gStore = globalThis.__dshGroupHubStore;
          var uw = svc.uiWorkspace || {};
          var isRoomTab = typeof id === "string" && id.indexOf("__room__:") === 0;
          var roomId = isRoomTab ? id.slice("__room__:".length) : null;
          var isOptTab = typeof id === "string" && id.indexOf("__opt_tab_") === 0;
          tabStore.closedIds.add(id);
          if (isRoomTab && roomId) {
            tabStore.optimisticTabs.forEach(function (meta, optKey) {
              if (meta && meta.roomId === roomId) {
                tabStore.optimisticTabs.delete(optKey);
                if (tabStore.optimisticActiveId === optKey) tabStore.optimisticActiveId = void 0;
              }
            });
            if (gStore) {
              var boundSid = gStore.roomSessionMap && gStore.roomSessionMap[roomId];
              if (boundSid) {
                tabStore.closedIds.add(boundSid);
                if (typeof gStore.unbindSession === "function") gStore.unbindSession(boundSid);
                if (String(boundSid).indexOf("__opt_tab_") !== 0) {
                  try {
                    if (uw.workspaces && typeof uw.workspaces.archiveSession === "function") {
                      uw.workspaces.archiveSession(boundSid).catch(function () {});
                    }
                  } catch (_e) {}
                }
              }
            }
          } else {
            if (gStore && typeof gStore.unbindSession === "function") {
              gStore.unbindSession(id);
            }
            if (!isOptTab && id) {
              try {
                if (uw.workspaces && typeof uw.workspaces.archiveSession === "function") {
                  uw.workspaces.archiveSession(id).catch(function () {});
                }
              } catch (_e) {}
            }
          }
          if (tabStore.optimisticTabs.has(id)) {
            tabStore.optimisticTabs.delete(id);
            if (tabStore.optimisticActiveId === id) tabStore.optimisticActiveId = void 0;
          }
          var oi = tabStore.order.indexOf(id);
          if (oi !== -1) tabStore.order.splice(oi, 1);
          var list = Array.isArray(currentTabIds) ? currentTabIds.slice() : tabStore.order.slice();
          var remaining = list.filter(function (t) {
            return t !== id && !tabStore.closedIds.has(t) && String(t).indexOf("__opt_tab_") !== 0;
          });
          var isActive = isRoomTab
            ? Boolean((gStore && gStore.activeRoomMode && gStore.activeRoomId === roomId) || id === activeSessionId)
            : id === (activeSessionId || tabStore.activeSessionId || globalThis.__dshMainRetainedSessionId || "");
          if (isActive) {
            if (isRoomTab && gStore && typeof gStore.leaveGroupRoom === "function") {
              gStore.leaveGroupRoom();
            }
            if (remaining.length > 0) {
              var closedIdx = list.indexOf(id);
              var pick = remaining[Math.max(0, Math.min(closedIdx === -1 ? remaining.length - 1 : closedIdx, remaining.length - 1))];
              try { openById(pick); } catch (e) { harnessLog("closeTab.open", e); }
            } else {
              tabStore.noTabsHomeMode = true;
              tabStore.activeSessionId = "";
              tabStore.optimisticActiveId = void 0;
              globalThis.__dshActiveSessionId = void 0;
              globalThis.__dshMainRetainedSessionId = void 0;
              try {
                if (typeof uw.clearMain === "function") uw.clearMain();
              } catch (e) { harnessLog("closeTab.clearMain", e); }
            }
          }
          tabStore.emit(true);
        },
        renameTab: function (id, title) {
          var trimmed = (title || "").trim();
          if (!trimmed) return;
          var tabStore = getDshBrowserTabsStore();
          tabStore.setCustomTitle(id, trimmed);
          if (tabStore.optimisticTabs.has(id)) return;
          try {
            var sess = (svc.uiWorkspace && svc.uiWorkspace.sessions) || svc.sessions;
            if (sess && typeof sess.using === "function") {
              sess.using(id, { source: "workspaceOperation" }, function (reference) {
                return reference.binding.session.rename(trimmed);
              }).catch(function () {});
            }
          } catch (_e) {}
        },
        tWorkspace: function (k) {
          try {
            if (svc.locale && typeof svc.locale.bind === "function") {
              var v = svc.locale.bind("workspace")(k);
              if (v && v !== k) return v;
            }
          } catch (_e) {}
          if (k === "session.new") return "新会话";
          if (k === "workspace.defaultName") return "默认工作区";
          return k;
        },
      });
    },
    findAnchor: function () {
      var cls = ConversationRoot_module_css_default;
      var headerCls = (cls.header || "wSkVaW_header").split(" ")[0];
      var header = document.querySelector("header." + headerCls);
      if (!header) return null;
      var wrapper = header.querySelector(':scope > [data-dsh-harness-tabs-anchor="1"]');
      if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.setAttribute("data-dsh-harness-tabs-anchor", "1");
        var leadingCls = (cls.headerLeading || "wSkVaW_headerLeading").split(" ")[0];
        var leading = header.querySelector(":scope > ." + leadingCls);
        if (leading && leading.nextSibling) header.insertBefore(wrapper, leading.nextSibling);
        else header.appendChild(wrapper);
      }
      return wrapper;
    },
  });
}

// ---------------------------------------------------------------------------
// Preset seat dock: mirror the conversation header's Agent preset label
// (标准模式 …) into the composer status row (轮数 / 缓存命中 / 上下文), same
// line, vertically aligned. The header original is hidden via CSS; this
// mirror reads it live so preset switches still update the dock copy.
// ---------------------------------------------------------------------------
function readPresetSeatSource() {
  var label = document.querySelector('.wSkVaW_headerActions .SVAs4q_label')
    || document.querySelector('[data-slot="conversation.session.header.actions"] span[title]');
  if (!label || !label.textContent || !label.textContent.trim()) return null;
  return {
    cls: label.className,
    text: label.textContent.trim(),
    title: label.getAttribute("title") || "",
    html: label.innerHTML,
  };
}

function PresetSeatMirror() {
  var state = react.useState(function () { return readPresetSeatSource(); });
  var current = state[0];
  var setSnapshot = state[1];
  react.useEffect(function () {
    var lastText = current ? current.text : null;
    var lastTitle = current ? current.title : null;
    var had = !!current;
    var timer = setInterval(function () {
      var snap = readPresetSeatSource();
      if (!snap) {
        if (had) {
          had = false;
          setSnapshot(null);
        }
        return;
      }
      if (snap.text !== lastText || snap.title !== lastTitle) {
        lastText = snap.text;
        lastTitle = snap.title;
        had = true;
        setSnapshot(snap);
      }
    }, 500);
    return function () { clearInterval(timer); };
  }, []);
  if (!current) return null;
  return react.createElement("span", {
    "data-dsh-preset-seat-mirror": "1",
    style: { display: "inline-flex", alignItems: "center", height: "100%", whiteSpace: "nowrap", flex: "0 0 auto" },
  }, react.createElement("span", {
    className: current.cls,
    title: current.title,
    dangerouslySetInnerHTML: { __html: current.html },
  }));
}

function mountPresetSeatDock() {
  portalMount({
    name: "preset-seat-dock",
    hostTag: "span",
    preserveRoot: true,
    render: function () {
      return react.createElement(PresetSeatMirror);
    },
    findAnchor: function () {
      var dock = document.querySelector('.uV2eYG_dock');
      if (!dock || !readPresetSeatSource()) return null;
      return dock;
    },
    anchorIndex: 0,
  });
}

// ---------------------------------------------------------------------------
// Group hub panel via the official main slot.
// ---------------------------------------------------------------------------
function registerGroupHubPanel(ctx) {
  if (typeof ctx.slots.inject !== "function") return;
  ctx.slots.inject("main", function () {
    return ctx.slots.register(
      {
        name: "main",
        key: "dsh-group-hub",
        inject: function () { return {}; },
      },
      DshMultiAgentGroupHub,
    );
  });
}

// ---------------------------------------------------------------------------
// Conversation insets: group room bar (above the scroll body) + SSH telemetry
// drawer (below it) — the rc.1 mount points inside ConversationContent.
// ---------------------------------------------------------------------------
function useActiveSessionId() {
  var uw = svc.uiWorkspace || {};
  var sel = uw.selection;
  var subscribe = function (cb) {
    try { if (sel && typeof sel.subscribe === "function") return sel.subscribe(cb); } catch (_e) {}
    return function () {};
  };
  var getSnapshot = function () {
    try {
      var s = sel && sel.getSnapshot();
      return (s && s.sessionId) || "";
    } catch (_e) { return ""; }
  };
  return (0, react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
}

function GroupRoomBarHost() {
  var sessionId = useActiveSessionId();
  var gStore = typeof getDshGroupHubStore === "function" ? getDshGroupHubStore() : globalThis.__dshGroupHubStore;
  var gRev = react.useSyncExternalStore(
    function (cb) { try { return gStore.subscribe(cb); } catch (_e) { return function () {}; } },
    function () { try { return gStore.getSnapshot(); } catch (_e) { return 0; } }
  );
  var tabStore = typeof getDshBrowserTabsStore === "function" ? getDshBrowserTabsStore() : globalThis.__dshBrowserTabsStore;
  var tRev = react.useSyncExternalStore(
    function (cb) { try { return tabStore.subscribe(cb); } catch (_e) { return function () {}; } },
    function () { try { return tabStore.getSnapshot(); } catch (_e) { return 0; } }
  );
  void gRev;
  void tRev;
  return react.createElement(DshGroupRoomNativeBar, { sessionId: sessionId || void 0 });
}

function SshDrawerHost() {
  var sessionId = useActiveSessionId();
  return react.createElement(SshServerTelemetryDrawer, { sessionId: sessionId || void 0 });
}

function mountConversationInsets(ctx) {
  // Overlay strategy: the hosts live on <body> (never inside the React tree —
  // foreign DOM nodes in React-managed containers crash reconciliation on
  // session switches). A rAF loop pins their geometry to the conversation
  // scroll body, and scroll-body padding reserves the bar's layout space.
  var barHost = document.createElement('div');
  barHost.setAttribute('data-dsh-harness-portal', 'group-room-bar');
  var drawerHost = document.createElement('div');
  drawerHost.setAttribute('data-dsh-harness-portal', 'ssh-drawer');
  var started = false;

  function ensureStarted() {
    if (started || typeof document === 'undefined' || !document.body) return;
    started = true;
    document.body.appendChild(barHost);
    document.body.appendChild(drawerHost);
    var barRoot = react_dom.createRoot(barHost);
    var drawerRoot = react_dom.createRoot(drawerHost);
    var renderHosts = function () {
      barRoot.render(
        react.createElement(HarnessErrorBoundary, { name: 'group-room-bar' }, react.createElement(GroupRoomBarHost)),
      );
      drawerRoot.render(
        react.createElement(HarnessErrorBoundary, { name: 'ssh-drawer' }, react.createElement(SshDrawerHost)),
      );
    };
    renderHosts();
    var lastL = -1, lastW = -1, lastT = -1, lastVisible = false, lastSb = null;
    barHost.style.position = 'fixed';
    barHost.style.zIndex = '15';
    barHost.style.pointerEvents = 'none';
    barHost.style.visibility = 'hidden';
    drawerHost.style.position = 'fixed';
    drawerHost.style.zIndex = '60';
    var syncLoop = function () {
      try {
        var sb = document.querySelector('[data-conversation-scroll], [class*="wSkVaW_scrollBody"]');
        if (lastSb && lastSb !== sb) {
          if (lastSb.style && lastSb.style.paddingTop) lastSb.style.paddingTop = '';
          lastSb = null;
        }
        if (sb) {
          lastSb = sb;
          var r = sb.getBoundingClientRect();
          var leftInset = 16;
          var rightInset = 16;
          var topInset = 14;
          var nl = Math.round(r.left) + leftInset;
          var maxRight = Math.round(r.right) - rightInset;
          var nt = Math.round(r.top) + topInset;
          if (document.body && document.body.getAttribute('data-dsh-theme-id') === 'preset-1') {
            var toggleEl = document.getElementById('dsh-corner-pull-toggle');
            if (toggleEl) {
              var tr = toggleEl.getBoundingClientRect();
              if (tr.width > 0 && tr.height > 0) {
                var besideRight = Math.floor(tr.left) - 12;
                if (besideRight - nl >= 420) {
                  maxRight = Math.min(maxRight, besideRight);
                } else {
                  nt = Math.max(nt, Math.ceil(tr.bottom) + 8);
                }
              }
            }
          }
          var nw = Math.max(240, maxRight - nl);
          if (!lastVisible) {
            barHost.style.display = 'block';
            drawerHost.style.display = 'block';
            lastVisible = true;
          }
          if (nl !== lastL || nw !== lastW || nt !== lastT) {
            lastL = nl;
            lastW = nw;
            lastT = nt;
            barHost.style.left = nl + 'px';
            barHost.style.width = nw + 'px';
            barHost.style.top = nt + 'px';
          }
          var barH = barHost.firstElementChild ? barHost.offsetHeight : 0;
          barHost.style.visibility = barH > 0 ? 'visible' : 'hidden';
          barHost.style.pointerEvents = 'none';
          if (sb.style.paddingTop) sb.style.paddingTop = '';
        } else if (lastVisible) {
          barHost.style.display = 'none';
          barHost.style.visibility = 'hidden';
          barHost.style.pointerEvents = 'none';
          drawerHost.style.display = 'none';
          lastVisible = false;
        }
      } catch (_e) {}
      requestAnimationFrame(syncLoop);
    };
    requestAnimationFrame(syncLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureStarted);
  } else {
    ensureStarted();
  }
}

// ---------------------------------------------------------------------------
// Stock theme bridge: rc.3's theme picker applies colorScheme/tokens but never
// publishes body[data-dsh-theme-id], which all Luminex CSS is keyed on.
// Subscribe to theme/change and publish the attribute for our presets.
// ---------------------------------------------------------------------------
function syncThemeAttrs(snapshot) {
  var explicit = !!snapshot;
  var pref = "";
  try {
    if (snapshot && snapshot.preference) pref = snapshot.preference;
    else if (svc.theme && typeof svc.theme.getTheme === "function") {
      pref = svc.theme.getTheme().preference || "";
    }
  } catch (_e) {}
  var isPreset = pref === "preset-1" || pref === "preset-2" || pref === "preset-3";
  if (explicit) {
    // Only an actual user pick in the settings records the choice.
    try {
      if (isPreset) {
        window.localStorage.setItem("dsh_harness_theme_choice", JSON.stringify({ mode: "preset", id: pref }));
        window.localStorage.setItem("dsh_appearance_preset", pref);
      } else if (pref) {
        window.localStorage.setItem("dsh_harness_theme_choice", JSON.stringify({ mode: "stock", id: pref }));
        window.localStorage.removeItem("dsh_appearance_preset");
      }
    } catch (_e) {}
  }
  if (!explicit) {
    // Boot/inject-time sync: honor the recorded choice, default Luminex.
    var mode = "";
    try {
      var raw = window.localStorage.getItem("dsh_harness_theme_choice");
      if (raw) mode = (JSON.parse(raw) || {}).mode || "";
    } catch (_e) {}
    if (mode === "stock") {
      if (document.body) {
        document.body.removeAttribute("data-dsh-theme-id");
        document.body.removeAttribute("data-dsh-preset1-mode");
      }
      return;
    }
    pref = mode === "preset" ? "" : "preset-1";
    if (mode === "preset") {
      try {
        var rec = JSON.parse(window.localStorage.getItem("dsh_harness_theme_choice") || "{}");
        pref = rec.id || "preset-1";
      } catch (_e) { pref = "preset-1"; }
    }
  }
  if ((isPreset || !explicit) && document.body) {
    try {
      luminexRuntime.syncDshLuminexBackground(pref || "preset-1");
    } catch (_e) {}
  } else if (pref && document.body) {
    document.body.removeAttribute("data-dsh-theme-id");
    document.body.removeAttribute("data-dsh-preset1-mode");
    var scheme = (snapshot && snapshot.theme && snapshot.theme.colorScheme) || (pref === "dark" ? "dark" : "light");
    var isDark = scheme === "dark";
    document.body.toggleAttribute("data-ds-dark-theme", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }
}

// ---------------------------------------------------------------------------
// apply(ctx) — module entry. ctx carries the declared client injects
// (slots/locale/connection/runtime); runtime services are pulled via
// ctx.inject exactly like dsh-purge-community does. Portals are created
// directly in apply (never inside ctx.inject callbacks — service registration
// timing must not gate the UI), and every portal reads services lazily.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Global-nav sidebar toggle: mounts an icon button right after the nav's 更多
// button and keeps it in sync with the right panel's expanded state.
//
// Opening/closing goes straight through the panel's own React actions
// (actions.setExpanded) read off the panel root's fiber — the native chrome
// buttons are unreliable here: the collapse control can be visually covered
// in the 开始 home state and clicking it is a no-op in some docked states,
// which left the panel impossible to close. The panel root carries
// data-sidebar-right-open="true" only while expanded, which is the one
// reliable open-state signal (the collapse button stays mounted after close).
// ---------------------------------------------------------------------------
var NAV_TOGGLE_SVG = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="currentColor" stroke-width="1.3"/><rect x="9.5" y="2.5" width="5" height="11" rx="1.4" fill="currentColor" opacity=".28"/></svg>';
function mountNavSidebarToggle() {
  var btn = null;
  function findMoreButton(nav) {
    if (!nav) return null;
    var buttons = Array.from(nav.querySelectorAll("button"));
    return buttons.find(function (b) {
      return (b.textContent || "").trim() === "更多";
    }) || null;
  }
  function findNav() {
    return Array.from(document.querySelectorAll("nav")).find(function (n) {
      return findMoreButton(n);
    }) || null;
  }
  function rightPanelOpen() {
    var root = document.querySelector("[data-sidebar-right-panel]");
    return !!root && root.getAttribute("data-sidebar-right-open") === "true";
  }
  function panelActions() {
    var root = document.querySelector("[data-sidebar-right-panel]");
    var host = root ||
      document.querySelector("[data-sidebar-right-toggle]") ||
      document.querySelector("[data-sidebar-right-expand]");
    if (!host) return null;
    var fid = Object.keys(host).find(function (k) { return k.indexOf("__reactFiber$") === 0; });
    if (!fid) return null;
    for (var f = host[fid]; f; f = f.return) {
      var p = f.memoizedProps || {};
      if (p.actions && typeof p.actions.setExpanded === "function") {
        var sid = (root && root.getAttribute("data-sidebar-right-session")) ||
          (p.sessionId || "") ||
          (getDshBrowserTabsStore().activeSessionId || "");
        if (sid) return { actions: p.actions, sessionId: sid };
      }
    }
    return null;
  }
  function applyExpanded(open) {
    var via = panelActions();
    if (via) {
      try {
        via.actions.setExpanded(via.sessionId, open);
        return true;
      } catch (_e) {}
    }
    var native = open
      ? document.querySelector("[data-sidebar-right-expand]")
      : document.querySelector("[data-sidebar-right-toggle]");
    if (native) { native.click(); return true; }
    return false;
  }
  function sync() {
    if (!btn || !btn.isConnected) return;
    var open = rightPanelOpen();
    btn.setAttribute("data-dsh-nav-sidebar-toggle", open ? "open" : "closed");
    btn.setAttribute("aria-label", open ? "收起侧边栏" : "打开右侧边栏");
    btn.title = open ? "收起侧边栏" : "打开右侧边栏";
  }
  function ensure() {
    var nav = findNav();
    var more = findMoreButton(nav);
    if (!more) return;
    if (btn && btn.isConnected && btn.parentElement === more.parentElement) {
      // Keep it immediately after 更多 even if dsh reorders the nav.
      if (more.nextElementSibling !== btn) more.parentElement.insertBefore(btn, more.nextElementSibling);
      sync();
      return;
    }
    if (btn && btn.isConnected) { try { btn.remove(); } catch (_e) {} }
    btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-dsh-nav-sidebar-toggle", "closed");
    btn.innerHTML = NAV_TOGGLE_SVG;
    btn.addEventListener("click", function () {
      try { applyExpanded(!rightPanelOpen()); } catch (_e) {}
      setTimeout(sync, 350);
    });
    if (more.nextElementSibling) more.parentElement.insertBefore(btn, more.nextElementSibling);
    else more.parentElement.appendChild(btn);
    sync();
  }
  setInterval(function () {
    try { ensure(); } catch (_e) {}
  }, 600);
  if (document.body) ensure();
  else document.addEventListener("DOMContentLoaded", function () { ensure(); });
}

var inject = ["slots", "locale"];
function apply(ctx) {
  try {
    svc.slots = ctx.slots;
    svc.locale = ctx.locale;
  } catch (_e) {}
  captureServices(ctx);

  try {
    ctx.inject(["theme"], function (host) {
      svc.theme = host.theme;
      syncThemeAttrs(null);
    });
  } catch (e) {
    harnessLog("theme-inject", e);
  }
  try {
    ctx.on("theme/change", function (snapshot) {
      syncThemeAttrs(snapshot);
    });
  } catch (e) {
    harnessLog("theme-change-subscribe", e);
  }

  try {
    ctx.inject(
      ["sessions", "uiWorkspace", "uiConversation", "layout"],
      function (host) {
        svc.sessions = host.sessions;
        svc.uiWorkspace = host.uiWorkspace;
        svc.uiConversation = host.uiConversation;
        svc.layout = host.layout;
        captureServices(ctx);
        // Track the active conversation so the tabs bar highlights (and stays
        // connected to) whatever the sidebar/main panel is showing. The
        // selection store's subscribe does not fire on every conversation
        // switch path, so a cheap poll backs it up.
        try {
          var tabsStore = getDshBrowserTabsStore();
          var syncActiveSession = function () {
            try {
              var uwNow = svc.uiWorkspace || {};
              var snap = uwNow.selection && uwNow.selection.getSnapshot && uwNow.selection.getSnapshot();
              var id = (snap && snap.sessionId) || "";
              if (id && (tabsStore.activeSessionId !== id || globalThis.__dshMainRetainedSessionId !== id || tabsStore.optimisticActiveId !== void 0)) {
                var gStoreNow = globalThis.__dshGroupHubStore;
                var boundRoomNow = gStoreNow && typeof gStoreNow.getRoomForSession === "function" ? gStoreNow.getRoomForSession(id) : null;
                var orderKeyNow = boundRoomNow ? ("__room__:" + boundRoomNow) : id;
                if (tabsStore.closedIds.has(orderKeyNow)) tabsStore.closedIds.delete(orderKeyNow);
                if (!boundRoomNow && tabsStore.closedIds.has(id)) tabsStore.closedIds.delete(id);
                if (!tabsStore.order.includes(orderKeyNow)) tabsStore.order.push(orderKeyNow);
                tabsStore.optimisticActiveId = void 0;
                tabsStore.activeSessionId = id;
                globalThis.__dshActiveSessionId = id;
                globalThis.__dshMainRetainedSessionId = id;
                tabsStore.emit(true);
              }
            } catch (_e2) {}
          };
          var sel = host.uiWorkspace && host.uiWorkspace.selection;
          if (sel && typeof sel.subscribe === "function" && !tabsStore.__selectionBound) {
            tabsStore.__selectionBound = true;
            syncActiveSession();
            sel.subscribe(function () {
              syncActiveSession();
            });
          }
          var sessList = host.uiWorkspace && host.uiWorkspace.sessions && host.uiWorkspace.sessions.list;
          if (sessList && typeof sessList.subscribe === "function" && !tabsStore.__sessListBound) {
            tabsStore.__sessListBound = true;
            sessList.subscribe(function () {
              tabsStore.emit();
            });
          }
          var wsList = host.uiWorkspace && host.uiWorkspace.workspaces && host.uiWorkspace.workspaces.list;
          if (wsList && typeof wsList.subscribe === "function" && !tabsStore.__wsListBound) {
            tabsStore.__wsListBound = true;
            wsList.subscribe(function () {
              tabsStore.emit();
            });
          }
          if (!tabsStore.__activePoll) {
            tabsStore.__activePoll = setInterval(syncActiveSession, 400);
          }
        } catch (e) {
          harnessLog("tabs-active-sync", e);
        }
      },
    );
  } catch (e) {
    harnessLog("service-inject", e);
  }

  if (FLAGS.theme !== false) try {
    mountLuminexTheme();
  } catch (e) {
    harnessLog("theme", e);
  }
  if (FLAGS.hub !== false) try {
    registerGroupHubPanel(ctx);
  } catch (e) {
    harnessLog("hub-panel", e);
  }
  if (FLAGS.sidebar !== false) try {
    mountSidebarGroups(ctx);
  } catch (e) {
    harnessLog("sidebar-groups", e);
  }
  if (FLAGS.tabs !== false) try {
    mountTabsBar(ctx);
  } catch (e) {
    harnessLog("tabs-bar", e);
  }
  if (FLAGS.seatdock !== false) try {
    mountPresetSeatDock();
  } catch (e) {
    harnessLog("preset-seat-dock", e);
  }
  if (FLAGS.navToggle !== false) try {
    mountNavSidebarToggle();
  } catch (e) {
    harnessLog("nav-sidebar-toggle", e);
  }
  if (FLAGS.insets !== false) try {
    mountConversationInsets(ctx);
  } catch (e) {
    harnessLog("conversation-insets", e);
  }
}
exports.apply = apply;
exports.inject = inject;
return module.exports;
}});
