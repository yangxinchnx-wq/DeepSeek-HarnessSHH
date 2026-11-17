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
  String.raw`[data-dsh-harness-tabs-anchor]{flex:1 1 auto;min-width:0;display:flex;overflow:hidden;height:100%}`,
  String.raw`.wSkVaW_titleRow{display:flex!important;align-items:center!important}`,
  // Hide the top-right session name (conversation header crumbs) — the tabs
  // already name every conversation.
  String.raw`.wSkVaW_crumbs{display:none!important}`,
  // The header preset label (标准模式…) moves down to the composer status row;
  // hide the header original, the dock portal mirrors it live.
  String.raw`.wSkVaW_headerActions [data-slot="conversation.session.header.actions"]{display:none!important}`,
  String.raw`[data-dsh-harness-portal="preset-seat-dock"]{display:inline-flex!important;align-items:center!important;height:100%!important;flex:0 0 auto!important;margin-right:8px}`,
  // FIX 3 (revised): the native dsh layout already places 更多操作 / 打开侧边栏
  // adjacent at the top-right, clearing the Windows caption buttons (~138px).
  // But .wSkVaW_titleRow has overflow:hidden and dsh's headerCorner carried a
  // -16px right margin that pushed the sidebar button past the clip edge, so its
  // right half was clipped and clicks landed on the header instead of the button.
  // Neutralise that negative margin (and any prior override) to zero: both buttons
  // then sit inside the clip at x≈1196..1268, stay adjacent, and remain clickable.
  String.raw`.wSkVaW_headerUtilities{margin-right:0!important}`,
  String.raw`.wSkVaW_headerCorner{margin-right:0!important}`,
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
  return { activePanelId: active };
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
  var wsId = (opts && opts.workspaceId) || (helpers.workspaces[0] && helpers.workspaces[0].workspaceId);
  var tabStore = getDshBrowserTabsStore();
  var optKey = "__opt_tab_" + ++tabStore.seq;
  tabStore.optimisticTabs.set(optKey, {
    roomId: opts && opts.roomId,
    title: opts && opts.title,
    knownIds: new Set(helpers.list.ids || []),
  });
  if (opts && opts.title) tabStore.customTitles.set(optKey, opts.title);
  if (opts && opts.roomId) tabStore.noTabsHomeMode = false;
  tabStore.emit(true);
  // Mirror the rc.1 flow: create a REAL session (not a draft) so it appears in
  // the sessions list; then bind the room and open it once the id surfaces.
  var uw = svc.uiWorkspace || {};
  var prevIds = new Set(helpers.list.ids || []);
  var prevSel = "";
  try { prevSel = uw.selection.getSnapshot().sessionId || ""; } catch (_e) {}
  var created = null;
  try {
    created = uw.startSession(wsId, {});
  } catch (e) {
    harnessLog("createNewTab.startSession", e);
  }
  var resolved = false;
  var unsubSess = null;
  var unsubSel = null;
  var timer = null;
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
      if (!newId && selId && selId !== prevSel) newId = selId;
      if (newId) {
        resolved = true;
        cleanupResolve();
        tabStore.resolveOptimisticTab(newId, optKey);
        if (opts && opts.title) tabStore.setCustomTitle(newId, opts.title);
        globalThis.__dshSelectMainPanel(null);
        try { uw.openSession(newId); } catch (_e) {}
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
      if (tryResolveNewTab() || attempts > 80) {
        cleanupResolve();
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
var activePortals = [];
function portalMount(options) {
  var host = null;
  var reactRoot = null;
  function tryMount() {
    if (host && host.isConnected && host.parentElement && host.parentElement.isConnected) return true;
    var anchor = options.findAnchor();
    if (!anchor) return false;
    if (host && host.isConnected && host.parentElement === anchor) return true;
    unmount();
    host = document.createElement(options.hostTag || "div");
    host.setAttribute("data-dsh-harness-portal", options.name);
    if (options.anchorIndex === "append") anchor.appendChild(host);
    else if (typeof options.anchorIndex === "number") {
      var ref = anchor.children[Math.min(options.anchorIndex, anchor.children.length)];
      anchor.insertBefore(host, ref || null);
    } else anchor.appendChild(host);
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
  var store = getDshGroupHubStore();
  portalMount({
    name: "sidebar-groups",
    hostTag: "div",
    render: function () {
      var helpers = resolveWorkspaceHelpers(ctx);
      var list = getSessionListSnapshot();
      var byId = (list && list.byId) || {};
      helpers.list = { byId: byId };
      return react.createElement(DshWorkspaceGroupsAndScheduleSection, {
        usePanelInfo: usePanelInfo,
        workspaces: helpers.workspaces,
        startSession: helpers.startSession,
        open: helpers.open,
        list: helpers.list,
      });
    },
    findAnchor: function () {
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
      try {
        var st = ref();
        if (st && typeof st.subscribe === "function") return st.subscribe(cb);
      } catch (_e) {}
      return function () {};
    };
  };
  var useSessions = serviceHook(function () {
    try {
      var st = sessStoreRef();
      var snap = st && st.getSnapshot();
      return snap || { byId: {}, ids: [] };
    } catch (_e) { return { byId: {}, ids: [] }; }
  }, storeSubscribe(sessStoreRef));
  var useWorkspaces = serviceHook(function () {
    try {
      var st = wsStoreRef();
      var snap = st && st.getSnapshot();
      return snap || { items: [], archivedSessionIds: [] };
    } catch (_e) { return { items: [], archivedSessionIds: [] }; }
  }, storeSubscribe(wsStoreRef));
  portalMount({
    name: "tabs-bar",
    hostTag: "div",
    render: function () {
      var list = getSessionListSnapshot();
      // Services arrive asynchronously after mount — resolve lazily per render
      // so open/create never operate on the empty mount-time snapshot.
      var liveHelpers = resolveWorkspaceHelpers(ctx);
      var openById = function (sessionId) {
        try {
          var uw = svc.uiWorkspace || {};
          // Upstream switches the main conversation via uiWorkspace.openSession
          // (replaceMain → reveal). selection.set is a replace-mode store write
          // and does not drive the conversation panel — tabs must mirror the sidebar.
          if (typeof uw.openSession === "function") return uw.openSession(sessionId);
          var sel = uw.selection;
          if (sel && typeof sel.set === "function") return sel.set({ sessionId: sessionId });
          if (sel && typeof sel.update === "function") return sel.update(function () { return { sessionId: sessionId }; });
        } catch (e) {
          harnessLog("open session", e);
        }
      };
      return react.createElement(BrowserTaskTabsBar, {
        sessionId: globalThis.__dshActiveSessionId || void 0,
        useSessions: useSessions,
        useWorkspaces: useWorkspaces,
        open: openById,
        createNewTab: function (opt, opts) {
          liveHelpers.startSession((opts && opts.workspaceId) || liveHelpers.workspaces[0] && liveHelpers.workspaces[0].workspaceId, {});
        },
        closeTab: function (id, currentTabIds, activeSessionId) {
          var tabStore = getDshBrowserTabsStore();
          var liveHelpers = resolveWorkspaceHelpers(svc.ctx || {});
          tabStore.closedIds.add(id);
          var oi = tabStore.order.indexOf(id);
          if (oi !== -1) tabStore.order.splice(oi, 1);
          var list = Array.isArray(currentTabIds) ? currentTabIds.slice() : tabStore.order.slice();
          var remaining = list.filter(function (t) {
            return t !== id && !tabStore.closedIds.has(t) && String(t).indexOf("__opt_tab_") !== 0;
          });
          var isActive = id === (activeSessionId || tabStore.activeSessionId || "");
          if (isActive) {
            if (remaining.length > 0) {
              // Browser-like: hand focus to the nearest surviving tab.
              var closedIdx = list.indexOf(id);
              var pick = remaining[Math.max(0, Math.min(closedIdx === -1 ? remaining.length - 1 : closedIdx, remaining.length - 1))];
              try { liveHelpers.open(pick); } catch (e) { harnessLog("closeTab.open", e); }
            } else {
              // Closed the last tab: open a fresh draft session (new-tab page).
              try {
                liveHelpers.startSession(liveHelpers.workspaces[0] && liveHelpers.workspaces[0].workspaceId, {});
              } catch (e) { harnessLog("closeTab.startSession", e); }
            }
          }
          tabStore.emit(true);
        },
        renameTab: function (id, title) {
          getDshBrowserTabsStore().setCustomTitle(id, title);
        },
        tWorkspace: function (k) {
          return k;
        },
      });
    },
    findAnchor: function () {
      var cls = ConversationRoot_module_css_default;
      var titleRow = document.querySelector('.' + cls.titleRow.split(' ')[0]);
      if (!titleRow) return null;
      var existing = titleRow.querySelector(':scope > [data-dsh-harness-portal="tabs-bar"]');
      if (existing) return existing.parentElement;
      var wrapper = document.createElement('div');
      wrapper.setAttribute('data-dsh-harness-tabs-anchor', '1');
      titleRow.insertBefore(wrapper, titleRow.firstChild);
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
  var gStore = globalThis.__dshGroupHubStore;
  var gRev = react.useSyncExternalStore(
    function (cb) { try { return gStore.subscribe(cb); } catch (_e) { return function () {}; } },
    function () { try { return gStore.getSnapshot(); } catch (_e) { return 0; } }
  );
  var tabStore = globalThis.__dshBrowserTabsStore;
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
    var lastL = -1, lastW = -1, lastT = -1, lastVisible = false;
    barHost.style.position = 'fixed';
    barHost.style.zIndex = '35';
    drawerHost.style.position = 'fixed';
    drawerHost.style.zIndex = '60';
    var syncLoop = function () {
      try {
        var sb = document.querySelector('[data-conversation-scroll], [class*="wSkVaW_scrollBody"]');
        if (sb) {
          var r = sb.getBoundingClientRect();
          var nl = Math.round(r.left);
          var nw = Math.round(r.width);
          var nt = Math.round(r.top);
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
          var targetPad = barH > 0 ? barH + 'px' : '';
          if (sb.style.paddingTop !== targetPad) sb.style.paddingTop = targetPad;
        } else if (lastVisible) {
          barHost.style.display = 'none';
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
              if (id && tabsStore.activeSessionId !== id) {
                // One conversation = one tab: re-opening a conversation from the
                // sidebar restores its tab even if the tab was closed earlier.
                if (tabsStore.closedIds.has(id)) tabsStore.closedIds.delete(id);
                tabsStore.activeSessionId = id;
                tabsStore.emit(true);
              }
            } catch (_e2) {}
          };
          var sel = host.uiWorkspace && host.uiWorkspace.selection;
          if (sel && typeof sel.subscribe === "function" && !tabsStore.__selectionBound) {
            tabsStore.__selectionBound = true;
            syncActiveSession();
            sel.subscribe(function (snap) {
              var id = "";
              try { id = (snap && snap.sessionId) || ""; } catch (_e1) {}
              if (id && tabsStore.activeSessionId !== id) {
                if (tabsStore.closedIds.has(id)) tabsStore.closedIds.delete(id);
                tabsStore.activeSessionId = id;
                tabsStore.emit(true);
              }
            });
          }
          if (!tabsStore.__activePoll) {
            tabsStore.__activePoll = setInterval(syncActiveSession, 800);
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
  if (FLAGS.insets === true) try {
    mountConversationInsets(ctx);
  } catch (e) {
    harnessLog("conversation-insets", e);
  }
}
exports.apply = apply;
exports.inject = inject;
return module.exports;
}});
