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
function harnessLog(kind, err) {
  try {
    globalThis.__dshHarnessLog.push(kind + ": " + (err && err.stack ? String(err.stack).split("\n").slice(0, 3).join(" | ") : String(err)));
  } catch (_e) {}
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
  });
  if (opts && opts.title) tabStore.customTitles.set(optKey, opts.title);
  if (!tabStore.order.includes(optKey)) tabStore.order.push(optKey);
  if (opts && opts.roomId) tabStore.noTabsHomeMode = false;
  tabStore.emit(true);
  var created = helpers.startSession(wsId, { draft: true });
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
  if (typeof document === "undefined" || !document.body) return;
  var styleId = "dsh-harness-luminex-css";
  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
    style.textContent = LUMINEX_CSS;
    document.head.appendChild(style);
  }
  var saved = "preset-1";
  try {
    saved = window.localStorage.getItem(THEME_STORAGE_KEY) || "preset-1";
  } catch (_e) {}
  try {
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
    }, 1200);
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
  var helpers2 = resolveWorkspaceHelpers(ctx);
  var sessStore = helpers2.sessStore;
  var wsStore = helpers2.wsStore;
  var sessionsStoreSubscribe = function (cb) {
    try {
      if (sessStore && typeof sessStore.subscribe === 'function') return sessStore.subscribe(cb);
    } catch (_e) {}
    return function () {};
  };
  var wsSubscribe = function (cb) {
    try {
      if (wsStore && typeof wsStore.subscribe === 'function') return wsStore.subscribe(cb);
    } catch (_e) {}
    return function () {};
  };
  var useSessions = serviceHook(function () {
    try {
      var snap = sessStore && sessStore.getSnapshot();
      return snap || { byId: {}, ids: [] };
    } catch (_e) { return { byId: {}, ids: [] }; }
  }, sessionsStoreSubscribe);
  var useWorkspaces = serviceHook(function () {
    try {
      var snap = wsStore && wsStore.getSnapshot();
      return snap || { items: [], archivedSessionIds: [] };
    } catch (_e) { return { items: [], archivedSessionIds: [] }; }
  }, wsSubscribe);
  portalMount({
    name: "tabs-bar",
    hostTag: "div",
    render: function () {
      var list = getSessionListSnapshot();
      return react.createElement(BrowserTaskTabsBar, {
        sessionId: globalThis.__dshActiveSessionId || void 0,
        useSessions: useSessions,
        useWorkspaces: useWorkspaces,
        open: helpers.open,
        createNewTab: function (opt, opts) {
          helpers.startSession((opts && opts.workspaceId) || helpers.workspaces[0] && helpers.workspaces[0].workspaceId, {});
        },
        closeTab: function (id) {
          var tabStore = getDshBrowserTabsStore();
          tabStore.closedIds.add(id);
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
      var headerEl = document.querySelector("." + cls.header.split(" ")[0] + ", ." + cls.titleRow.split(" ")[0]);
      if (!headerEl) return null;
      var parent = headerEl.parentElement;
      if (!parent) return null;
      // Directly above the header row inside its parent container.
      var existing = parent.querySelector('[data-dsh-harness-portal="tabs-bar"]');
      if (existing) return existing.parentElement;
      var wrapper = document.createElement("div");
      wrapper.setAttribute("data-dsh-harness-tabs-anchor", "1");
      parent.insertBefore(wrapper, headerEl);
      return wrapper;
    },
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
// apply(ctx) — module entry. ctx carries the declared client injects
// (slots/locale/connection/runtime); runtime services are pulled via
// ctx.inject exactly like dsh-purge-community does.
// ---------------------------------------------------------------------------
var inject = ["slots", "locale"];
function apply(ctx) {
  try {
    svc.slots = ctx.slots;
    svc.locale = ctx.locale;
  } catch (_e) {}
  captureServices(ctx);

  try {
    ctx.inject(
      ["sessions", "uiWorkspace", "uiConversation", "layout"],
      function (host) {
        svc.sessions = host.sessions;
        svc.uiWorkspace = host.uiWorkspace;
        svc.uiConversation = host.uiConversation;
        svc.layout = host.layout;
        captureServices(ctx);
        // (Re)mount service-dependent portals once faces are available.
        if (FLAGS.sidebar !== false) try {
          mountSidebarGroups(ctx);
        } catch (e) {
          harnessLog("[dsh-harness] kind", e); console.error("[dsh-harness] sidebar groups:", e);
        }
        if (FLAGS.tabs !== false) try {
          mountTabsBar(ctx);
        } catch (e) {
          harnessLog("[dsh-harness] kind", e); console.error("[dsh-harness] tabs bar:", e);
        }
      },
    );
  } catch (e) {
    harnessLog("[dsh-harness] kind", e); console.error("[dsh-harness] service inject failed:", e);
  }

  if (FLAGS.theme !== false) try {
    mountLuminexTheme();
  } catch (e) {
    harnessLog("[dsh-harness] kind", e); console.error("[dsh-harness] theme:", e);
  }
  if (FLAGS.hub !== false) try {
    registerGroupHubPanel(ctx);
  } catch (e) {
    harnessLog("[dsh-harness] kind", e); console.error("[dsh-harness] hub panel:", e);
  }
}
exports.apply = apply;
exports.inject = inject;
return module.exports;
}});
