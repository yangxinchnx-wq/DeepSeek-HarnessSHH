window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-settings-general",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/index.ts
var index_exports = {};
__export(index_exports, {
  SettingsDocumentStore: () => SettingsDocumentStore,
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_dsh_client_ui_slots = require("@deepseek-ai/dsh-client-ui-slots");
var import_dsh_client_ui_primitives8 = require("@deepseek-ai/dsh-client-ui-primitives");

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/shell-store.ts
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");
function createSettingsShellStore() {
  return (0, import_dsh_client_store.defineStore)({
    init: () => ({ open: false, activeId: void 0 }),
    actions: {
      open: (d) => {
        d.open = true;
      },
      close: (d) => {
        d.open = false;
        d.activeId = void 0;
      },
      select: (d, id) => {
        d.activeId = id;
      },
      openSection: (d, id) => {
        d.activeId = id;
        d.open = true;
      }
    }
  });
}

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/SettingsRoot.tsx
var import_react = require("react");
var import_react_dom = require("react-dom");

// clsx-inline:clsx
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/SettingsRoot.tsx
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/SettingsRoot.module.css
var css = ".VOzbGW_triggerRow {\n  position: relative;\n  flex: none;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  margin: 4px 0;\n}\n\n.VOzbGW_triggerRow.VOzbGW_railRow {\n  width: 36px;\n  margin: 8px 0 10px;\n}\n\n.VOzbGW_trigger {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: var(--dsh-sidebar-label-gap);\n  width: auto;\n  height: 42px;\n  margin: 0;\n  padding: 0 calc(var(--dsh-sidebar-row-padding) - var(--dsh-sidebar-paint-inset));\n  box-sizing: border-box;\n  border: none;\n  border-radius: var(--dsw-radius-md);\n  background: transparent;\n  border-inline: var(--dsh-sidebar-paint-inset) solid transparent;\n  background-clip: padding-box;\n  cursor: pointer;\n  overflow: hidden;\n  color: var(--dsw-alias-label-primary);\n  font-family: inherit;\n  font-size: 14px;\n  line-height: 22px;\n}\n\n@media (hover: hover) {\n  .VOzbGW_trigger:hover {\n    background-color: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n/* Rail trigger: the same 36x36 box and 12px rounding as the other rail\n   controls. */\n.VOzbGW_trigger.VOzbGW_rail {\n  flex: none;\n  width: 36px;\n  height: 36px;\n  margin: 0;\n  justify-content: center;\n  gap: 0;\n  padding: 0;\n  border-inline: 0;\n  background-clip: border-box;\n}\n\n.VOzbGW_triggerLabel {\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n/* Full-viewport layer (figma Mask 501:29946 #000@24%): mask tokens match the\n   Modal primitive (--dsw-alias-bg-mask-1 + --dsw-mask-blur). */\n.VOzbGW_overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/* The full-viewport overlay blocks background clicks above the painted mask too. */\n.VOzbGW_mask {\n  position: absolute;\n  inset: var(--dsh-frame-chrome-top, 0px) 0 0;\n  background: var(--dsw-alias-bg-mask-1);\n  backdrop-filter: var(--dsw-mask-blur);\n}\n\n/* Settings uses a shared 800\xD7800 panel; longer sections scroll\n   inside the options column; the navigation scrolls independently. One height for\n   every section, taken from the viewport rather than the content, because a\n   content-sized panel would resize under the pointer on every nav click.\n   The viewport height leaves 24px of air above and below, widened to the\n   frame's published overlay inset on both sides, so the panel sits centered\n   and clear of the strip.\n   The four shell seats are direct children placed by area: the rail's title\n   and the content header share the first row, the rail's cells and the active\n   section the second. Narrow browser windows use a full-viewport panel and\n   rearrange these areas into a horizontal layout. */\n.VOzbGW_panel {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 188px minmax(0, 1fr);\n  grid-template-rows: auto minmax(0, 1fr);\n  grid-template-areas:\n    'title header'\n    'nav options';\n  width: 800px;\n  height: min(800px, calc(100vh - 2 * max(24px, var(--dsh-frame-overlay-top, 24px))));\n  max-width: calc(100vw - 48px);\n  border-radius: var(--dsw-radius-panel);\n  overflow: hidden;\n  background: var(--dsw-alias-bg-layer-2);\n  box-shadow: var(--dsw-elevation-prominent);\n  /* Elevated surface: the scrollbar thumb takes the l2 elevation tokens.\n     Declared on the panel rather than the scrolling `.VOzbGW_options` child so the\n     elevation choice sits with the surface; the custom properties inherit\n     down to whichever descendant scrolls (see ui-theme\n     styles/scrollbar.VOzbGW_css for the rebinding contract). */\n  --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);\n  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);\n}\n\n.VOzbGW_panel:focus {\n  outline: none;\n}\n\n/* Nav rail (figma .VOzbGW_Setting-nav 501:29958): the 188px track's cells, pad\n   (12,0), no own fill \u2014 the panel white shows through. */\n.VOzbGW_nav {\n  grid-area: nav;\n  min-width: 0;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  padding: 10px 12px 0;\n  box-sizing: border-box;\n}\n\n/* Title row (figma 501:29959): 16/500 lh24, at the rail's 24px text inset.\n   Its 54px row aligns with the content header; the nav adds the remaining\n   10px before the first cell. */\n.VOzbGW_navTitle {\n  grid-area: title;\n  padding: 22px 12px 8px 24px;\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 500;\n  color: var(--dsw-alias-label-primary);\n}\n\n/* Cell stack (figma 501:29961): gap 4. */\n.VOzbGW_navList {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-height: 0;\n  overflow-y: auto;\n}\n\n/* Nav cell (figma .VOzbGW_Setting-nav-cell 501:29962): 164x40, r12, pad\n   (12,9,16,9), gap 8; label 14/400 lh22; selected fill #EBEEF2. */\n.VOzbGW_navCell {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 40px;\n  padding: 9px 16px 9px 12px;\n  box-sizing: border-box;\n  border: none;\n  border-radius: var(--dsw-radius-md);\n  background: transparent;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 14px;\n  line-height: 22px;\n  font-weight: 400;\n  color: var(--dsw-alias-label-primary);\n  text-align: left;\n}\n\n@media (hover: hover) {\n  .VOzbGW_navCell:hover {\n    background-color: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n.VOzbGW_navCell.VOzbGW_active {\n  background: var(--dsw-specific-sidebar-nav-item-active);\n}\n\n.VOzbGW_navIcon {\n  display: flex;\n  flex: none;\n}\n\n.VOzbGW_navLabel {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n/* Header (figma .VOzbGW_Header 501:29981): h54, pad (10,20,14,8), close right. */\n.VOzbGW_header {\n  grid-area: header;\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n  height: 54px;\n  padding: 20px 14px 8px 10px;\n  box-sizing: border-box;\n}\n\n.VOzbGW_actions {\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-left: auto;\n}\n\n/* Compact close control. */\n.VOzbGW_close {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: none;\n  border-radius: var(--dsw-radius-sm);\n  background: transparent;\n  cursor: pointer;\n  color: var(--dsw-alias-label-primary);\n}\n\n@media (hover: hover) {\n  .VOzbGW_close:hover {\n    background-color: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n/* Options area (figma Options 501:29983): pad (24,0,24,24), scrolls. */\n.VOzbGW_options {\n  grid-area: options;\n  min-width: 0;\n  min-height: 0;\n  padding: 0 24px 24px;\n  overflow-y: auto;\n}\n\n/* Browsers below 768px use the full-viewport panel and horizontal navigation.\n   Windows custom captions and macOS native titlebars retain the desktop rail;\n   their independent root markers exclude both window-chrome layouts. Linux\n   follows the browser layout. The selected cell receives initial focus and\n   scrolls into view when the panel opens. */\n@media (max-width: 767px) {\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .VOzbGW_overlay {\n    position: absolute;\n    height: 100%;\n    background: var(--dsw-alias-bg-layer-2);\n  }\n\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .VOzbGW_panel {\n    grid-template-columns: minmax(0, 1fr) auto;\n    grid-template-rows: auto auto minmax(0, 1fr);\n    grid-template-areas:\n      'title header'\n      'nav nav'\n      'options options';\n    width: 100%;\n    max-width: none;\n    height: 100%;\n    border-radius: 0;\n  }\n\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .VOzbGW_navTitle {\n    padding: 22px 0 0 16px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n  }\n\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .VOzbGW_header {\n    height: auto;\n    padding: 20px 16px 0 10px;\n  }\n\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .VOzbGW_nav {\n    padding: 0;\n  }\n\n  /* The strip runs edge to edge and pads its own ends, so the first cell lines\n     up with the title and the last one stays clear of the panel edge. */\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .VOzbGW_navList {\n    flex-direction: row;\n    gap: 4px;\n    padding: 12px 16px 14px;\n    overflow-x: auto;\n    overflow-y: hidden;\n    overscroll-behavior: none;\n    scrollbar-width: none;\n  }\n\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .VOzbGW_navList::-webkit-scrollbar {\n    display: none;\n  }\n\n  /* Cells grow into spare width and hold a 108px floor. The four shipped\n     sections already measure more than a 390px viewport, so the next cell shows\n     past the edge and the strip reads as scrollable. */\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .VOzbGW_navCell {\n    flex: 1 0 auto;\n    justify-content: center;\n    min-width: 108px;\n    padding: 0 14px;\n  }\n\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .VOzbGW_navLabel {\n    flex: none;\n  }\n\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .VOzbGW_options {\n    padding: 0 16px 24px;\n  }\n}\n\n/* Visually-hidden text seat (close button accessible name from slot content). */\n.VOzbGW_hiddenLabel {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n}\n\n/* No app-region rule here: the overlay portals beside #root (SettingsRoot), so\n   ui-web base.VOzbGW_css's `body > :not(#root)` subtraction covers it wherever it\n   overlaps a chrome row's drag \u2014 including above every column, which an in-root\n   overlay could not promise once a chrome row declares drag itself. */\n";
var tagId = "@deepseek-ai/dsh-client-ui-settings-general/SettingsRoot.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-general";
  tag.dataset.pluginCss = tagId;
  tag.textContent = css;
  document.head.appendChild(tag);
}
var SettingsRoot_default = { "triggerRow": "VOzbGW_triggerRow", "railRow": "VOzbGW_railRow", "trigger": "VOzbGW_trigger", "rail": "VOzbGW_rail", "triggerLabel": "VOzbGW_triggerLabel", "overlay": "VOzbGW_overlay", "mask": "VOzbGW_mask", "panel": "VOzbGW_panel", "options": "VOzbGW_options", "css": "VOzbGW_css", "Setting-nav": "VOzbGW_Setting-nav", "nav": "VOzbGW_nav", "navTitle": "VOzbGW_navTitle", "navList": "VOzbGW_navList", "Setting-nav-cell": "VOzbGW_Setting-nav-cell", "navCell": "VOzbGW_navCell", "active": "VOzbGW_active", "navIcon": "VOzbGW_navIcon", "navLabel": "VOzbGW_navLabel", "Header": "VOzbGW_Header", "header": "VOzbGW_header", "actions": "VOzbGW_actions", "close": "VOzbGW_close", "hiddenLabel": "VOzbGW_hiddenLabel" };

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/DesktopUpdateIndicator.tsx
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/DesktopUpdateIndicator.module.css
var css2 = '.DOUpOa_indicator {\n  display: inline-grid;\n  grid-template-columns: 14px max-content;\n  align-items: center;\n  column-gap: 4px;\n  flex: none;\n  height: 28px;\n  padding: 0 8px;\n  box-sizing: border-box;\n  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary-new-colorprimary-new-color) 20%, transparent);\n  border-radius: var(--dsw-radius-sm);\n  color: var(--dsw-alias-brand-primary-new-colorprimary-new-color);\n  background: color-mix(in srgb, var(--dsw-alias-brand-primary-new-colorprimary-new-color) 8%, transparent);\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 18px;\n  text-align: left;\n  white-space: nowrap;\n  cursor: pointer;\n}\n\n.DOUpOa_icon {\n  display: grid;\n  place-items: center;\n  width: 14px;\n  height: 14px;\n}\n\n.DOUpOa_badge {\n  position: absolute;\n  inset-inline-end: 2px;\n  top: 2px;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  corner-shape: round;\n  background: var(--dsw-alias-brand-primary-new-colorprimary-new-color);\n}\n\n.DOUpOa_errorDot { background: currentColor; width: 6px; height: 6px; border-radius: 50%; corner-shape: round; }\n.DOUpOa_spinner { animation: spin 1s linear infinite; }\n@keyframes spin { to { transform: rotate(360deg); } }\n@media (prefers-reduced-motion: reduce) { .DOUpOa_spinner { animation: none; } }\n\n.DOUpOa_indicator[aria-disabled="true"] {\n  cursor: default;\n}\n';
var tagId2 = "@deepseek-ai/dsh-client-ui-settings-general/DesktopUpdateIndicator.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId2) + "]") === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-general";
  tag.dataset.pluginCss = tagId2;
  tag.textContent = css2;
  document.head.appendChild(tag);
}
var DesktopUpdateIndicator_default = { "indicator": "DOUpOa_indicator", "icon": "DOUpOa_icon", "badge": "DOUpOa_badge", "errorDot": "DOUpOa_errorDot", "spinner": "DOUpOa_spinner" };

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/DesktopUpdateIndicator.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var BUSY_PHASES = /* @__PURE__ */ new Set([
  "checking",
  "downloading",
  "verifying",
  "installing"
]);
function updateCopy(state, t) {
  if (state.configurationError !== void 0) return { label: t("desktop.channel.unavailable"), detail: t(`desktop.update.configuration.${state.configurationError}`) };
  const labels = {
    idle: "",
    checking: t("desktop.update.checking"),
    available: t("desktop.update.available"),
    downloading: t("desktop.update.progress", { percent: state.percent ?? 0 }),
    verifying: t("desktop.update.verifying"),
    installing: t("desktop.update.installing"),
    ready: t("desktop.update.ready"),
    error: t("desktop.update.retry")
  };
  const label = labels[state.phase];
  if (state.phase === "checking" || state.phase === "verifying" || state.phase === "installing") {
    return { label, detail: state.version ?? label };
  }
  if (state.phase === "error") {
    const failures = {
      configuration: t("desktop.update.configurationFailed"),
      check: t("desktop.update.checkFailed"),
      "check-network": t("desktop.update.checkNetworkFailed"),
      download: t("desktop.update.downloadFailed"),
      "download-space": t("desktop.update.downloadSpaceFailed"),
      "download-permission": t("desktop.update.downloadPermissionFailed"),
      "download-busy": t("desktop.update.downloadBusyFailed"),
      "download-network": t("desktop.update.downloadNetworkFailed"),
      install: t("desktop.update.installFailed"),
      "install-network": t("desktop.update.installNetworkFailed"),
      "stop-failed": t("desktop.update.stopFailed"),
      "tasks-changed": t("desktop.update.tasksChanged"),
      "tasks-unavailable": t("desktop.update.tasksUnavailable"),
      "fullscreen-timeout": t("desktop.update.fullscreenTimeout")
    };
    return { label, detail: failures[state.failure ?? "install"] };
  }
  if (state.phase === "downloading" && state.version !== void 0) {
    return { label, detail: t("desktop.update.downloadDetail", { percent: state.percent ?? 0, version: state.version }) };
  }
  return { label, detail: state.version === void 0 ? label : t("desktop.update.versionDetail", { label, version: state.version }) };
}
function DesktopUpdateIndicator({ wide, hidden, t, view, onOpen }) {
  const { presentation: state, failed, opening } = view;
  if (!wide || hidden || !failed && (state === void 0 || state.phase === "idle" && state.configurationError === void 0)) return null;
  const retryLabel = t("desktop.update.retry");
  const copy = state === void 0 ? { label: retryLabel, detail: retryLabel } : updateCopy(state, t);
  const label = failed ? retryLabel : copy.label;
  const error = failed || state?.phase === "error" || state?.configurationError !== void 0;
  const busy = opening || state !== void 0 && state.configurationError === void 0 && BUSY_PHASES.has(state.phase);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: failed ? retryLabel : copy.detail, side: "top", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type: "button",
      className: DesktopUpdateIndicator_default.indicator,
      "aria-label": label,
      "aria-disabled": busy,
      onClick: () => {
        if (!busy) onOpen();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: DesktopUpdateIndicator_default.icon, "aria-hidden": "true", children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: DesktopUpdateIndicator_default.errorDot }) : busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconLoadingOutlineRegular, { className: DesktopUpdateIndicator_default.spinner, size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconDownloadOutlineRegular, { size: 14 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })
      ]
    }
  ) });
}
function DesktopUpdateBadge({ useDesktopUpdate, useConnectionState, t }) {
  const { presentation: state, failed } = useDesktopUpdate((value) => value);
  const connection = useConnectionState((value) => value);
  if ((connection === "disconnected" || connection === "connecting") && state?.phase !== "installing" || !failed && (state === void 0 || state.phase === "idle" && state.configurationError === void 0)) return null;
  const retryLabel = t("desktop.update.retry");
  const copy = state === void 0 ? { label: retryLabel, detail: retryLabel } : updateCopy(state, t);
  const label = failed ? retryLabel : copy.label;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: failed ? label : copy.detail, side: "right", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { role: "img", "aria-label": label, className: DesktopUpdateIndicator_default.badge }) });
}

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/SettingsRoot.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var RECOVERY_CONFIRMATION_MS = 2e3;
var CONNECTING_MIN_VISIBLE_MS = 800;
function navIcon(id) {
  if (id === "account") return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconUserOutlineMedium, { size: 16 });
  if (id === "models") return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconDataOutlineMedium, { size: 16 });
  if (id === "agent-presets") return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconAgentPresetOutlineMedium, { size: 16 });
  if (id === "plugins") return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconPersonalizationOutlineMedium, { size: 16 });
  if (id === "archived-sessions") return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconArchiveOutlineMedium, { size: 16 });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconSettingsOutlineMedium, { size: 16 });
}
function SettingsPanel({ rows, renderSlot, activeId, onSelect, onClose }) {
  const active = rows.find((r2) => r2.id === activeId)?.id ?? rows[0]?.id;
  const titleId = (0, import_react.useId)();
  const panel = (0, import_react.useRef)(null);
  (0, import_dsh_client_ui_primitives2.useModalLayer)(panel, true, onClose);
  return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: SettingsRoot_default.overlay, role: "presentation", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: SettingsRoot_default.mask, "aria-hidden": "true", onClick: onClose }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ref: panel, tabIndex: -1, "data-shortcut-modal": "settings", className: SettingsRoot_default.panel, role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: SettingsRoot_default.navTitle,
          id: titleId,
          tabIndex: -1,
          "data-modal-autofocus": active === void 0 ? "" : void 0,
          children: renderSlot("settings.header", {})
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("nav", { className: SettingsRoot_default.nav, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: SettingsRoot_default.navList, children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          type: "button",
          className: clsx_default(SettingsRoot_default.navCell, row.id === active && SettingsRoot_default.active),
          "aria-current": row.id === active ? "true" : void 0,
          "data-modal-autofocus": row.id === active ? "" : void 0,
          onFocus: (event) => {
            event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
          },
          onClick: () => {
            onSelect(row.id);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SettingsRoot_default.navIcon, "aria-hidden": "true", children: renderSlot("settings.section.icon", { size: 16, active: row.id === active }, {
              only: row.id,
              fallback: navIcon(row.id)
            }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SettingsRoot_default.navLabel, children: row.label })
          ]
        },
        row.id
      )) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: SettingsRoot_default.header, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: SettingsRoot_default.actions, children: renderSlot("settings.action", {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: SettingsRoot_default.close, onClick: onClose, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.IconCloseOutlineRegular, { size: 14 }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: SettingsRoot_default.hiddenLabel, children: renderSlot("settings.close", {}) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: SettingsRoot_default.options, children: active !== void 0 && renderSlot("settings.section", { close: onClose }, { only: active }) })
    ] })
  ] }), document.body);
}
function SettingsRoot(props) {
  const {
    wide,
    reconnect,
    useConnectionState,
    useSections,
    useOnboardingSteps,
    useSessions,
    renderSlot,
    t,
    useDesktopUpdate,
    openDesktopUpdate,
    useStore,
    actions,
    useShortcuts
  } = props;
  const { open, activeId } = useStore((state) => state);
  const shortcut = useShortcuts((rows2) => rows2.find((row) => row.id === "settings.open"));
  const { close, openSection } = actions;
  const [requestedOnboarding, setRequestedOnboarding] = (0, import_react.useState)();
  const [completedOnboarding, setCompletedOnboarding] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
  const [showRecovery, setShowRecovery] = (0, import_react.useState)(false);
  const [holdConnecting, setHoldConnecting] = (0, import_react.useState)(false);
  const connectingShownAt = (0, import_react.useRef)(void 0);
  const rows = useSections((s) => s);
  const desktopUpdate = useDesktopUpdate((state) => state);
  const connectionState = useConnectionState((state) => state);
  const previousConnectionState = (0, import_react.useRef)(connectionState);
  const onboardingSteps = useOnboardingSteps((s) => s);
  const onboardingActive = useSessions((state) => {
    const main = Object.values(state.byId).find((session) => (session.retainedBy.mainView ?? 0) > 0);
    return state.phase === "ready" && (main === void 0 || main.blank);
  });
  const onboardingStep = requestedOnboarding !== void 0 ? onboardingSteps.find((step) => step.id === requestedOnboarding) : onboardingActive ? onboardingSteps.find((step) => !completedOnboarding.has(step.id)) : void 0;
  (0, import_react.useEffect)(() => {
    if (onboardingActive) return;
    setCompletedOnboarding(/* @__PURE__ */ new Set());
  }, [onboardingActive]);
  const onboardingStepSeen = (0, import_react.useRef)(onboardingStep);
  (0, import_react.useEffect)(() => {
    const appeared = onboardingStepSeen.current === void 0 && onboardingStep !== void 0;
    onboardingStepSeen.current = onboardingStep;
    if (appeared && open) close();
  }, [onboardingStep, open, close]);
  (0, import_react.useLayoutEffect)(() => {
    const previous = previousConnectionState.current;
    previousConnectionState.current = connectionState;
    if (connectionState !== "connected") {
      setShowRecovery(false);
      return;
    }
    if (previous !== "disconnected" && previous !== "connecting") return;
    setShowRecovery(true);
  }, [connectionState]);
  (0, import_react.useLayoutEffect)(() => {
    if (!showRecovery || holdConnecting) return;
    const timeout = window.setTimeout(() => {
      setShowRecovery(false);
    }, RECOVERY_CONFIRMATION_MS);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [showRecovery, holdConnecting]);
  (0, import_react.useLayoutEffect)(() => {
    if (connectionState === "connecting") {
      connectingShownAt.current = Date.now();
      return;
    }
    const shownAt = connectingShownAt.current;
    if (shownAt === void 0) return;
    connectingShownAt.current = void 0;
    const remaining = CONNECTING_MIN_VISIBLE_MS - (Date.now() - shownAt);
    if (remaining <= 0) return;
    setHoldConnecting(true);
    const timeout = window.setTimeout(() => {
      setHoldConnecting(false);
    }, remaining);
    return () => {
      window.clearTimeout(timeout);
      setHoldConnecting(false);
    };
  }, [connectionState]);
  const completeOnboardingStep = (0, import_react.useCallback)((id) => {
    setRequestedOnboarding(void 0);
    setCompletedOnboarding((previous) => {
      if (previous.has(id)) return previous;
      return /* @__PURE__ */ new Set([...previous, id]);
    });
  }, []);
  let connectionIndicator;
  if (connectionState === "connecting" || holdConnecting) {
    connectionIndicator = "connecting";
  } else if (connectionState === "disconnected") {
    connectionIndicator = "disconnected";
  } else if (showRecovery) {
    connectionIndicator = "recovered";
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: clsx_default(SettingsRoot_default.triggerRow, !wide && SettingsRoot_default.railRow), children: [
      renderSlot("settings.launcher", {
        wide,
        settingsOpen: open,
        openSettings: actions.open,
        ...shortcut?.keys.length ? { settingsShortcut: { keys: shortcut.keys, aria: shortcut.aria } } : {},
        openOnboarding: (id) => {
          close();
          setRequestedOnboarding(id);
        }
      }, { fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.Tooltip, { disabled: open, label: t("trigger"), shortcutKeys: shortcut?.keys, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: clsx_default(SettingsRoot_default.trigger, !wide && SettingsRoot_default.rail),
          "aria-label": t("trigger"),
          "aria-keyshortcuts": shortcut?.aria,
          "aria-haspopup": "dialog",
          "aria-expanded": open,
          onClick: () => {
            actions.open();
          },
          children: renderSlot("settings.trigger", { wide })
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_dsh_client_ui_primitives2.ConnectionIndicator,
        {
          state: wide && desktopUpdate.presentation?.phase !== "installing" ? connectionIndicator : void 0,
          disconnectedLabel: t("connection.error"),
          connectingLabel: t("connection.connecting"),
          recoveredLabel: t("connection.connected"),
          reconnectActionLabel: t("connection.reconnect"),
          restartActionLabel: t("connection.restart"),
          onReconnect: reconnect
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        DesktopUpdateIndicator,
        {
          wide,
          hidden: connectionIndicator !== void 0 && desktopUpdate.presentation?.phase !== "installing",
          t,
          view: desktopUpdate,
          onOpen: openDesktopUpdate
        }
      )
    ] }),
    open && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      SettingsPanel,
      {
        rows,
        renderSlot,
        activeId,
        onSelect: actions.select,
        onClose: close
      }
    ),
    onboardingStep !== void 0 && renderSlot("settings.onboarding", {
      stepId: onboardingStep.id,
      explicit: requestedOnboarding !== void 0,
      complete: () => {
        completeOnboardingStep(onboardingStep.id);
      },
      openSection
    }, { only: onboardingStep.id })
  ] });
}

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/desktop-channel-source.ts
var import_dsh_client_store2 = require("@deepseek-ai/dsh-client-store");
var DesktopChannelSource = class {
  /** @param bridge - Isolated shell API, present only in Desktop. */
  constructor(bridge) {
    this.bridge = bridge;
    this.unsubscribe = bridge.subscribe((state) => {
      if (!this.live) return;
      this.revision++;
      this.receive(state);
    });
    void bridge.get().then((state) => {
      if (this.live && this.revision === 0) this.receive(state);
    }, () => {
      if (this.live && this.revision === 0) this.store.set({ ...this.store.getSnapshot(), failed: true });
    });
  }
  /** Stable observation shared by mounted General views and the shell toast. */
  store = (0, import_dsh_client_store2.createSnapshotStore)({ failed: false });
  live = true;
  revision = 0;
  sequence = 0;
  unsubscribe;
  receive(state) {
    const previous = this.store.getSnapshot();
    const ownSaveFailure = previous.pending !== void 0 || previous.notice?.outcome === "uncertain";
    const notify = !ownSaveFailure && state.error !== void 0 && state.error !== "cleanup" && state.error !== previous.state?.error;
    this.store.set({
      ...previous,
      state,
      failed: false,
      ...notify ? { notice: { sequence: ++this.sequence, outcome: "configuration" } } : {}
    });
  }
  /**
   * Show a pending choice until the shell reports its actual selection.
   * @param channel - Selected feed.
   * @returns After the shell reports the result.
   */
  async select(channel) {
    if (!this.isLive() || this.store.getSnapshot().pending !== void 0) return;
    const state = this.store.getSnapshot().state;
    if (state?.channel === channel && state.error === void 0 && !state.changing) return;
    const revision = this.revision;
    const { notice: _notice, ...previous } = this.store.getSnapshot();
    this.store.set({ ...previous, pending: channel });
    let result;
    try {
      result = await this.bridge.set(channel);
    } catch (_error) {
    }
    if (!this.isLive()) return;
    const accept = result !== void 0 && revision === this.revision;
    if (accept) this.revision++;
    const { pending: _pending, ...current } = this.store.getSnapshot();
    this.store.set({
      ...current,
      ...accept && result !== void 0 ? { state: result.state, failed: false } : {},
      ...result?.kind === "unchanged" ? {} : {
        notice: { sequence: ++this.sequence, outcome: result?.kind === "applied" ? "applied" : result?.kind === "failed" ? result.reason : "save" }
      }
    });
  }
  /**
   * Retire only the toast whose animation completed.
   * @param sequence - Notice identity captured by the rendered toast.
   */
  dismissNotice(sequence) {
    const current = this.store.getSnapshot();
    if (current.notice?.sequence !== sequence) return;
    const { notice: _notice, ...next } = current;
    this.store.set(next);
  }
  isLive() {
    return this.live;
  }
  /** Detach the shell subscription and ignore late IPC responses. */
  dispose() {
    this.live = false;
    this.unsubscribe();
  }
};

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/DesktopChannelRow.tsx
var import_react2 = require("react");
var import_dsh_client_ui_primitives3 = require("@deepseek-ai/dsh-client-ui-primitives");

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/DesktopChannelRow.module.css
var css3 = "/* Desktop update channel row: label plus selector pill. */\n\n.dshChn_row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px 0;\n  border-bottom: 0.5px solid var(--dsw-alias-border-l2);\n}\n\n.dshChn_rowText {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding-right: 48px;\n}\n\n/* Narrow settings panel: the 48px gutter separates the label from its control\n   across a wide row and only squeezes the label here. */\n@media (max-width: 767px) {\n  :global(html:not([data-windows-titlebar]):not([data-platform='darwin'])) .dshChn_rowText {\n    padding-right: 16px;\n  }\n}\n\n.dshChn_title {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 22px;\n  color: var(--dsw-alias-label-primary);\n}\n\n.dshChn_description {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 18px;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.dshChn_selector {\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  height: 36px;\n  padding: 0 14px;\n  border: none;\n  border-radius: var(--dsw-radius-md);\n  background: var(--dsw-alias-bg-module-platform);\n  font: inherit;\n  font-size: 14px;\n  line-height: 22px;\n  color: var(--dsw-alias-label-primary);\n  cursor: pointer;\n}\n\n@media (hover: hover) {\n  .dshChn_selector:hover {\n    background: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n.dshChn_chevron {\n  flex: none;\n}\n\n.dshChn_spinner {\n  flex: none;\n  animation: spin 1s linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n";
var tagId3 = "@deepseek-ai/dsh-client-ui-settings-general/DesktopChannelRow.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId3) + "]") === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-general";
  tag.dataset.pluginCss = tagId3;
  tag.textContent = css3;
  document.head.appendChild(tag);
}
var DesktopChannelRow_default = { "row": "dshChn_row", "rowText": "dshChn_rowText", "title": "dshChn_title", "description": "dshChn_description", "selector": "dshChn_selector", "chevron": "dshChn_chevron", "spinner": "dshChn_spinner" };

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/DesktopChannelRow.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function DesktopChannelRow({ useChannel, select, t }) {
  const { state, failed, pending } = useChannel((value) => value);
  const [open, setOpen] = (0, import_react2.useState)(false);
  const busy = pending !== void 0 || state?.changing === true;
  const channel = pending ?? state?.channel;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: DesktopChannelRow_default.row, role: "group", "aria-label": t("desktop.channel.title"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: DesktopChannelRow_default.rowText, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: DesktopChannelRow_default.title, children: t("desktop.channel.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: DesktopChannelRow_default.description, children: t("desktop.channel.description") }),
      (failed || state?.error !== void 0) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { role: "alert", children: t(failed ? "desktop.channel.readError" : "desktop.channel.error") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_dsh_client_ui_primitives3.Menu,
      {
        open,
        onClose: () => {
          setOpen(false);
        },
        portal: true,
        align: "end",
        selectedId: channel ?? "",
        items: [{ id: "stable", label: t("desktop.channel.stable") }, { id: "nightly", label: t("desktop.channel.nightly") }],
        onSelect: (id) => {
          setOpen(false);
          void select(id);
        },
        anchor: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            type: "button",
            className: DesktopChannelRow_default.selector,
            disabled: busy || state === void 0,
            "aria-busy": busy,
            "aria-label": t("desktop.channel.title"),
            "aria-haspopup": "menu",
            "aria-expanded": open,
            onClick: () => {
              setOpen(!open);
            },
            children: [
              channel === void 0 || channel === null ? t("desktop.channel.unavailable") : t(channel === "stable" ? "desktop.channel.stable" : "desktop.channel.nightly"),
              busy ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives3.IconLoadingOutlineRegular, { className: DesktopChannelRow_default.spinner }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives3.IconChevronDownOutlineRegular, { className: DesktopChannelRow_default.chevron })
            ]
          }
        )
      }
    )
  ] });
}
function DesktopChannelToast({ useChannel, dismiss, openConfiguration, t }) {
  const notice = useChannel((value) => value.notice);
  if (notice === void 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_dsh_client_ui_primitives3.Toast,
    {
      text: t(`desktop.channel.result.${notice.outcome}`),
      ...notice.outcome === "configuration" ? {
        holdMs: 1e4,
        actions: [{ label: t("desktop.channel.details"), onClick: openConfiguration }]
      } : {},
      onDone: () => {
        dismiss(notice.sequence);
      },
      ...notice.outcome === "applied" ? { tone: "success" } : { icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives3.IconWarningOutlineRegular, {}) }
    },
    notice.sequence
  );
}

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/desktop-update-source.ts
var import_dsh_client_store3 = require("@deepseek-ai/dsh-client-store");
var DesktopUpdateSource = class {
  /** @param bridge - Optional isolated Electron API, absent in ordinary browsers. */
  constructor(bridge) {
    this.bridge = bridge;
    this.unsubscribe = bridge?.subscribe((presentation) => {
      if (!this.live) return;
      this.received = true;
      this.store.set({ ...this.store.getSnapshot(), presentation, failed: false });
    });
    void bridge?.status().then((presentation) => {
      if (this.live && !this.received) this.store.set({ ...this.store.getSnapshot(), presentation });
    }, () => {
      if (this.live && !this.received) this.store.set({ ...this.store.getSnapshot(), failed: true });
    });
  }
  /** Framework-observed carrier status shared by both sidebar controls. */
  store = (0, import_dsh_client_store3.createSnapshotStore)({ failed: false, opening: false });
  live = true;
  received = false;
  unsubscribe;
  /** Invoke one user action; subsequent clicks join the shell-owned operation. */
  open() {
    if (!this.live || this.bridge === void 0) return;
    const state = this.store.getSnapshot();
    if (state.opening || state.presentation !== void 0 && state.presentation.configurationError === void 0 && ["checking", "downloading", "verifying", "installing"].includes(state.presentation.phase)) return;
    this.store.set({ ...state, opening: true });
    void this.bridge.open().catch(() => {
      if (this.live) this.store.set({ ...this.store.getSnapshot(), failed: true });
    }).finally(() => {
      if (this.live) this.store.set({ ...this.store.getSnapshot(), opening: false });
    });
  }
  /** Detach the carrier and ignore any pending status or action completion. */
  dispose() {
    this.live = false;
    this.unsubscribe?.();
  }
};

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/chrome.tsx
var import_dsh_client_ui_primitives4 = require("@deepseek-ai/dsh-client-ui-primitives");

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/chrome.module.css
var css4 = "/* Trigger row label (the shell's button provides layout/colors; the label\n * only guards against overflow during the sidebar collapse crossfade). */\n\n.UQsH_q_triggerLabel {\n  overflow: hidden;\n  white-space: nowrap;\n}\n";
var tagId4 = "@deepseek-ai/dsh-client-ui-settings-general/chrome.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId4) + "]") === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-general";
  tag.dataset.pluginCss = tagId4;
  tag.textContent = css4;
  document.head.appendChild(tag);
}
var chrome_default = { "triggerLabel": "UQsH_q_triggerLabel" };

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/chrome.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function TriggerContent({ wide, t }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives4.IconSettingsOutlineMedium, { size: wide ? 16 : 18 }),
    wide && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: chrome_default.triggerLabel, children: t("trigger") })
  ] });
}
function HeaderContent({ t }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: t("title") });
}
function CloseLabel({ t }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: t("close") });
}

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/GeneralSection.module.css
var css5 = "/* Feature-contributed rows own their chrome and separators; the section\n * strips the trailing separator wherever the column ends. */\n\n._WvWnq_section {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n._WvWnq_section > :global([data-slot='settings._WvWnq_general._WvWnq_item']) > :last-child {\n  border-bottom: none;\n}\n";
var tagId5 = "@deepseek-ai/dsh-client-ui-settings-general/GeneralSection.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId5) + "]") === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-general";
  tag.dataset.pluginCss = tagId5;
  tag.textContent = css5;
  document.head.appendChild(tag);
}
var GeneralSection_default = { "section": "_WvWnq_section", "general": "_WvWnq_general", "item": "_WvWnq_item" };

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/GeneralSection.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function GeneralSection({ renderSlot }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: GeneralSection_default.section, children: renderSlot("settings.general.item", {}) });
}

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/CurrentVersionRow.module.css
var css6 = ".yIbyla_row {\n  padding: 16px 0;\n  color: var(--dsw-alias-label-primary);\n  font-size: 14px;\n  line-height: 22px;\n  overflow-wrap: anywhere;\n}\n";
var tagId6 = "@deepseek-ai/dsh-client-ui-settings-general/CurrentVersionRow.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId6) + "]") === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-general";
  tag.dataset.pluginCss = tagId6;
  tag.textContent = css6;
  document.head.appendChild(tag);
}
var CurrentVersionRow_default = { "row": "yIbyla_row" };

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/CurrentVersionRow.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function CurrentVersionRow({ t }) {
  const version = "0.2.2-alpha.3";
  if (version === void 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: CurrentVersionRow_default.row, children: t("general.currentVersion", { version }) });
}

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/DeveloperToolsRow.tsx
var import_react3 = require("react");
var import_dsh_client_ui_primitives5 = require("@deepseek-ai/dsh-client-ui-primitives");

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/DeveloperToolsRow.module.css
var css7 = ".Pt1bsG_row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 16px 0;\n  border-bottom: 0.5px solid var(--dsw-alias-border-l2);\n}\n\n.Pt1bsG_title {\n  font-size: 14px;\n  line-height: 20px;\n}\n\n.Pt1bsG_description {\n  margin-top: 4px;\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 18px;\n}\n";
var tagId7 = "@deepseek-ai/dsh-client-ui-settings-general/DeveloperToolsRow.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId7) + "]") === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-general";
  tag.dataset.pluginCss = tagId7;
  tag.textContent = css7;
  document.head.appendChild(tag);
}
var DeveloperToolsRow_default = { "row": "Pt1bsG_row", "title": "Pt1bsG_title", "description": "Pt1bsG_description" };

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/DeveloperToolsRow.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function DeveloperToolsRow({ useDeveloperTools, setEnabled, t }) {
  const enabled = useDeveloperTools((value) => value);
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const [failed, setFailed] = (0, import_react3.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: DeveloperToolsRow_default.row, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: DeveloperToolsRow_default.title, children: t("developerTools.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: DeveloperToolsRow_default.description, children: t("developerTools.description") }),
      failed && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { role: "alert", children: t("developerTools.error") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      import_dsh_client_ui_primitives5.Switch,
      {
        checked: enabled,
        disabled: busy,
        label: t("developerTools.title"),
        onChange: (next) => {
          setFailed(false);
          setBusy(true);
          void setEnabled(next).catch(() => {
            setFailed(true);
          }).finally(() => {
            setBusy(false);
          });
        }
      }
    )
  ] });
}

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx
var import_react4 = require("react");
var import_dsh_client_ui_primitives6 = require("@deepseek-ai/dsh-client-ui-primitives");

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/SettingsDocumentAction.module.css
var css8 = ".me01iq_action {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 8px;\n}\n\n.me01iq_error {\n  max-width: 180px;\n  overflow: hidden;\n  color: var(--dsw-alias-state-error-primary);\n  font-size: 12px;\n  line-height: 18px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n";
var tagId8 = "@deepseek-ai/dsh-client-ui-settings-general/SettingsDocumentAction.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId8) + "]") === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-general";
  tag.dataset.pluginCss = tagId8;
  tag.textContent = css8;
  document.head.appendChild(tag);
}
var SettingsDocumentAction_default = { "action": "me01iq_action", "error": "me01iq_error" };

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function SettingsDocumentAction({ controller, useSnapshot, t }) {
  const state = useSnapshot((snapshot) => snapshot);
  (0, import_react4.useEffect)(() => {
    void controller.load();
  }, [controller]);
  if (state.status !== "ready") return null;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: SettingsDocumentAction_default.action, children: [
    state.error === null ? null : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: SettingsDocumentAction_default.error, role: "alert", children: t("openDocument.error") }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      import_dsh_client_ui_primitives6.Button,
      {
        variant: "outline",
        size: "sm",
        disabled: state.opening,
        onClick: () => {
          void controller.open();
        },
        children: t("openDocument")
      }
    )
  ] });
}

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/settings-document-store.ts
var import_dsh_client_store4 = require("@deepseek-ai/dsh-client-store");
var SettingsDocumentStore = class {
  /**
   * @param ctx - the plugin's context, whose loopback `remote.settings`
   * namespace opens the provider document.
   * @param describeFace - the shared mirror's describe face (`hasDocument` source).
   */
  constructor(ctx, describeFace) {
    this.ctx = ctx;
    this.describeFace = describeFace;
  }
  /** uSES-safe state source shared by the registered header action. */
  store = (0, import_dsh_client_store4.createSnapshotStore)({
    status: "idle",
    opening: false,
    error: null
  });
  following;
  /**
   * Begin following the mirror (idempotent) and reflect whether the current
   * provider owns a local document.
   * @returns settlement once the snapshot reflects the mirror.
   */
  async load() {
    this.following ??= this.describeFace.subscribe(() => {
      this.derive();
    });
    this.store.update((state) => {
      state.status = "loading";
      state.error = null;
    });
    await this.describeFace.ensure();
    this.derive();
  }
  /**
   * Open the loaded document once; concurrent gestures collapse behind the in-flight action.
   * @returns after the native-open request settles, or immediately when unavailable/already opening.
   */
  async open() {
    const current = this.store.getSnapshot();
    if (current.status !== "ready" || current.opening) return;
    this.store.update((state) => {
      state.opening = true;
      state.error = null;
    });
    try {
      const result = await this.ctx.remote.settings.openSettingsDocument();
      if (!result.ok) {
        const { message } = result.error;
        this.store.update((state) => {
          state.error = message;
        });
      }
    } finally {
      this.store.update((state) => {
        state.opening = false;
      });
    }
  }
  /** Stop following the mirror. */
  dispose() {
    this.following?.();
    this.following = void 0;
  }
  derive() {
    const mirrored = this.describeFace.getSnapshot();
    if (mirrored.view === void 0) {
      if (mirrored.error !== null) {
        this.store.update((state) => {
          state.status = "unavailable";
          state.error = mirrored.error;
        });
      }
      return;
    }
    const { hasDocument } = mirrored.view;
    this.store.update((state) => {
      state.status = hasDocument ? "ready" : "unavailable";
      state.error = null;
    });
  }
};

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/HostReleasePrompt.tsx
var import_dsh_client_ui_primitives7 = require("@deepseek-ai/dsh-client-ui-primitives");

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/HostReleasePrompt.module.css
var css9 = "._64N1GW_dialog {\n  width: min(480px, 100%);\n}\n\n._64N1GW_transitions {\n  display: grid;\n  grid-template-columns: max-content minmax(0, max-content) 56px minmax(0, max-content);\n  justify-content: start;\n  align-items: center;\n  gap: 8px 12px;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n._64N1GW_label {\n  color: var(--dsw-alias-label-secondary);\n}\n\n._64N1GW_release {\n  font-family: var(--ds-font-family-code);\n  overflow-wrap: anywhere;\n}\n\n._64N1GW_solid {\n  color: var(--dsw-alias-label-primary);\n}\n\n._64N1GW_faded {\n  color: var(--dsw-alias-label-tertiary);\n}\n\n/* Both connectors share one 1px stroke; only style and color differ. */\n._64N1GW_line {\n  position: relative;\n  height: 0;\n  border-top-width: 1px;\n}\n\n/* Arrowhead at the end of the connector, centered on its stroke. */\n._64N1GW_line::after {\n  position: absolute;\n  top: -3.5px;\n  right: -1px;\n  border-top: 3px solid transparent;\n  border-bottom: 3px solid transparent;\n  border-left: 5px solid currentColor;\n  content: '';\n}\n\n._64N1GW_done {\n  border-top-style: solid;\n  border-top-color: var(--dsw-alias-state-success-primary);\n  color: var(--dsw-alias-state-success-primary);\n}\n\n._64N1GW_pending {\n  border-top-style: dashed;\n  border-top-color: var(--dsw-alias-label-tertiary);\n  color: var(--dsw-alias-label-tertiary);\n}\n";
var tagId9 = "@deepseek-ai/dsh-client-ui-settings-general/HostReleasePrompt.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId9) + "]") === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-general";
  tag.dataset.pluginCss = tagId9;
  tag.textContent = css9;
  document.head.appendChild(tag);
}
var HostReleasePrompt_default = { "dialog": "_64N1GW_dialog", "transitions": "_64N1GW_transitions", "label": "_64N1GW_label", "release": "_64N1GW_release", "solid": "_64N1GW_solid", "faded": "_64N1GW_faded", "line": "_64N1GW_line", "done": "_64N1GW_done", "pending": "_64N1GW_pending" };

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/HostReleasePrompt.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function transitionText(from, to, unknown) {
  const field = from?.version !== to?.version ? "version" : "commit";
  return [from?.[field] ?? unknown, to?.[field] ?? unknown];
}
function Transition({ label, from, to, done }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: HostReleasePrompt_default.label, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: clsx_default(HostReleasePrompt_default.release, done ? HostReleasePrompt_default.faded : HostReleasePrompt_default.solid), children: from }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { "aria-hidden": "true", className: clsx_default(HostReleasePrompt_default.line, done ? HostReleasePrompt_default.done : HostReleasePrompt_default.pending) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: clsx_default(HostReleasePrompt_default.release, done ? HostReleasePrompt_default.solid : HostReleasePrompt_default.faded), children: to })
  ] });
}
function HostReleasePrompt({ useReleaseChange, dismissRelease, reloadPage, t }) {
  const change = useReleaseChange((value) => value);
  if (change === void 0) return null;
  const unknown = t("hostRelease.unknown");
  const [serviceFrom, serviceTo] = transitionText(change.previous, change.host, unknown);
  const [pageFrom, pageTo] = transitionText(change.page, change.host, unknown);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    import_dsh_client_ui_primitives7.Modal,
    {
      open: true,
      title: t("hostRelease.title"),
      description: t("hostRelease.description"),
      closeLabel: t("hostRelease.later"),
      onClose: dismissRelease,
      className: clsx_default(HostReleasePrompt_default.dialog),
      footer: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_dsh_client_ui_primitives7.Button, { variant: "outline", "data-modal-autofocus": true, onClick: dismissRelease, children: t("hostRelease.later") }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_dsh_client_ui_primitives7.Button, { variant: "primary", onClick: reloadPage, children: t("hostRelease.reload") })
      ] }),
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: HostReleasePrompt_default.transitions, children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Transition, { label: t("hostRelease.service"), from: serviceFrom, to: serviceTo, done: true }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Transition, { label: t("hostRelease.page"), from: pageFrom, to: pageTo, done: false })
      ] })
    }
  );
}

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/locales.ts
var zh = {
  "desktop.channel.title": "\u66F4\u65B0\u6E20\u9053",
  "desktop.channel.description": "\u6B63\u5F0F\u7248\u9002\u5408\u65E5\u5E38\u4F7F\u7528\uFF1B\u5F00\u53D1\u7248\u53EF\u63D0\u524D\u4F53\u9A8C\u65B0\u529F\u80FD\uFF0C\u4F46\u53EF\u80FD\u4E0D\u7A33\u5B9A\u3002",
  "desktop.channel.stable": "\u6B63\u5F0F\u7248",
  "desktop.channel.nightly": "\u5F00\u53D1\u7248",
  "desktop.channel.unavailable": "\u914D\u7F6E\u4E0D\u53EF\u7528",
  "desktop.channel.error": "\u672A\u80FD\u5E94\u7528\u66F4\u65B0\u914D\u7F6E\u3002\u8BF7\u70B9\u51FB\u684C\u9762\u66F4\u65B0\u5165\u53E3\u67E5\u770B\u539F\u56E0\u3002",
  "desktop.channel.readError": "\u65E0\u6CD5\u8BFB\u53D6\u66F4\u65B0\u6E20\u9053\u72B6\u6001\uFF0C\u8BF7\u91CD\u542F\u5E94\u7528\u3002",
  "desktop.update.configurationFailed": "\u672A\u80FD\u5E94\u7528\u66F4\u65B0\u914D\u7F6E\u3002\u8BF7\u70B9\u51FB\u684C\u9762\u66F4\u65B0\u5165\u53E3\u67E5\u770B\u539F\u56E0\u3002",
  "desktop.channel.result.applied": "\u66F4\u65B0\u6E20\u9053\u5DF2\u5207\u6362",
  "desktop.channel.result.configuration": "\u914D\u7F6E\u6587\u4EF6\u5F02\u5E38\uFF0C\u66F4\u65B0\u5DF2\u6682\u505C",
  "desktop.channel.details": "\u67E5\u770B\u8BE6\u60C5",
  "desktop.channel.result.save": "\u4FDD\u5B58\u5931\u8D25",
  "desktop.channel.result.uncertain": "\u8BBE\u7F6E\u4FDD\u5B58\u5F02\u5E38",
  "desktop.channel.result.format": "\u4FDD\u5B58\u5931\u8D25\uFF0C\u914D\u7F6E\u6587\u4EF6\u683C\u5F0F\u6709\u8BEF",
  "desktop.channel.result.permission": "\u4FDD\u5B58\u5931\u8D25\uFF0C\u6CA1\u6709\u5199\u5165\u6743\u9650",
  "desktop.channel.result.apply": "\u8BBE\u7F6E\u4FDD\u5B58\u5F02\u5E38",
  "desktop.update.configuration.read": "\u66F4\u65B0\u5DF2\u6682\u505C\uFF1A\u65E0\u6CD5\u8BFB\u53D6\u914D\u7F6E\u6587\u4EF6",
  "desktop.update.configuration.format": "\u66F4\u65B0\u5DF2\u6682\u505C\uFF1A\u914D\u7F6E\u6587\u4EF6\u683C\u5F0F\u6709\u8BEF",
  "desktop.update.configuration.channel": "\u66F4\u65B0\u5DF2\u6682\u505C\uFF1Achannel \u53EA\u80FD\u662F nightly \u6216 stable",
  "desktop.update.configuration.cleanup": "\u66F4\u65B0\u5DF2\u6682\u505C\uFF1A\u65E0\u6CD5\u6E05\u7406\u65E7\u66F4\u65B0\uFF0C\u8BF7\u91CD\u542F\u5E94\u7528",
  "trigger": "\u8BBE\u7F6E",
  "shortcut.open": "\u6253\u5F00\u8BBE\u7F6E",
  "desktop.update.available": "\u65B0\u7248\u672C",
  "desktop.update.checking": "\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",
  "desktop.update.progress": "{percent}%",
  "desktop.update.verifying": "\u6B63\u5728\u6821\u9A8C\u66F4\u65B0\u6587\u4EF6\u2026",
  "desktop.update.installing": "\u6B63\u5728\u51C6\u5907\u91CD\u542F\u2026",
  "desktop.update.ready": "\u5B89\u88C5\u5E76\u91CD\u542F",
  "desktop.update.retry": "\u91CD\u8BD5\u66F4\u65B0",
  "desktop.update.versionDetail": "{label}\uFF1A{version}",
  "desktop.update.downloadDetail": "\u6B63\u5728\u4E0B\u8F7D\u66F4\u65B0\uFF1A{percent}%\n\u76EE\u6807\u7248\u672C\uFF1A{version}",
  "desktop.update.checkFailed": "\u68C0\u67E5\u66F4\u65B0\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002",
  "desktop.update.downloadFailed": "\u4E0B\u8F7D\u66F4\u65B0\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002",
  "desktop.update.downloadSpaceFailed": "\u78C1\u76D8\u7A7A\u95F4\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u4E0B\u8F7D\u66F4\u65B0\u3002\u8BF7\u91CA\u653E\u7A7A\u95F4\u540E\u91CD\u8BD5\u3002",
  "desktop.update.downloadPermissionFailed": "\u65E0\u6CD5\u5199\u5165\u66F4\u65B0\u6587\u4EF6\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u540E\u91CD\u8BD5\u3002",
  "desktop.update.downloadBusyFailed": "\u66F4\u65B0\u6587\u4EF6\u6B63\u88AB\u5360\u7528\uFF0C\u8BF7\u5173\u95ED\u5360\u7528\u5B83\u7684\u7A0B\u5E8F\u540E\u91CD\u8BD5\u3002",
  "desktop.update.installFailed": "\u5B89\u88C5\u66F4\u65B0\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002",
  "desktop.update.checkNetworkFailed": "\u68C0\u67E5\u66F4\u65B0\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u540E\u91CD\u8BD5\u3002",
  "desktop.update.downloadNetworkFailed": "\u4E0B\u8F7D\u66F4\u65B0\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u540E\u91CD\u8BD5\u3002",
  "desktop.update.installNetworkFailed": "\u5B89\u88C5\u66F4\u65B0\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u540E\u91CD\u8BD5\u3002",
  "desktop.update.fullscreenTimeout": "\u65E0\u6CD5\u9000\u51FA\u5168\u5C4F\uFF0C\u8BF7\u9000\u51FA\u5168\u5C4F\u540E\u91CD\u8BD5\u66F4\u65B0",
  "desktop.update.stopFailed": "\u672A\u80FD\u5B89\u5168\u505C\u6B62\u4EFB\u52A1\uFF0C\u66F4\u65B0\u5C1A\u672A\u5B89\u88C5\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002",
  "desktop.update.tasksChanged": "\u6709\u65B0\u4EFB\u52A1\u5F00\u59CB\u8FD0\u884C\uFF0C\u8BF7\u91CD\u65B0\u786E\u8BA4\u662F\u5426\u505C\u6B62\u4EFB\u52A1\u5E76\u66F4\u65B0\u3002",
  "desktop.update.tasksUnavailable": "\u65E0\u6CD5\u786E\u8BA4\u4EFB\u52A1\u72B6\u6001\uFF0C\u8BF7\u5728\u5DE5\u4F5C\u533A\u5C31\u7EEA\u540E\u91CD\u8BD5\u66F4\u65B0\u3002",
  "title": "\u8BBE\u7F6E",
  "close": "\u5173\u95ED",
  "openDocument": "\u6253\u5F00\u914D\u7F6E\u6587\u4EF6",
  "openDocument.error": "\u65E0\u6CD5\u6253\u5F00\u914D\u7F6E\u6587\u4EF6",
  "general.nav": "\u901A\u7528\u8BBE\u7F6E",
  "general.currentVersion": "\u5F53\u524D\u7248\u672C\uFF1A{version}",
  "developerTools.title": "\u663E\u793A\u4EE3\u7801\u5DE5\u4F5C\u89C6\u56FE",
  "developerTools.error": "\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
  "developerTools.description": "\u5F00\u542F\u540E\uFF0C\u663E\u793A\u8F68\u8FF9\u3001\u672C\u8F6E\u4EE3\u7801\u5DEE\u5F02\uFF0C\u53EF\u9009\u62E9\u5B8C\u6574\u7684 Agent \u9884\u8BBE\u5207\u6362",
  "connection.error": "\u8FDE\u63A5\u5F02\u5E38\uFF0C\u5237\u65B0\u91CD\u8BD5",
  "connection.connecting": "\u91CD\u65B0\u8FDE\u63A5\u4E2D",
  "connection.connected": "\u8FDE\u63A5\u6210\u529F",
  "connection.reconnect": "\u8FDE\u63A5\u5F02\u5E38\uFF0C\u70B9\u51FB\u7ACB\u5373\u91CD\u8FDE",
  "connection.restart": "\u8FDE\u63A5\u4E2D\u65AD\uFF0C\u6B63\u5728\u91CD\u8BD5\uFF0C\u70B9\u51FB\u7ACB\u5373\u91CD\u8FDE",
  "hostRelease.title": "\u670D\u52A1\u7248\u672C\u53D8\u5316",
  "hostRelease.description": "\u670D\u52A1\u7248\u672C\u5DF2\u53D8\u5316\uFF0C\u672C\u9875\u9762\u5DF2\u6682\u505C\u70ED\u66F4\u65B0\uFF0C\u5237\u65B0\u540E\u52A0\u8F7D\u65B0\u7248\u672C\u3002",
  "hostRelease.service": "\u670D\u52A1",
  "hostRelease.page": "\u9875\u9762",
  "hostRelease.unknown": "\u672A\u89E3\u6790",
  "hostRelease.reload": "\u5237\u65B0\u4EE5\u52A0\u8F7D\u65B0\u7248\u672C",
  "hostRelease.later": "\u6682\u4E0D\u5237\u65B0"
};
var en = {
  "desktop.channel.title": "Update channel",
  "desktop.channel.description": "Stable is suitable for everyday use. Development offers early access to new features but may be unstable.",
  "desktop.channel.stable": "Stable",
  "desktop.channel.nightly": "Development",
  "desktop.channel.unavailable": "Configuration unavailable",
  "desktop.channel.error": "Could not apply update settings. Open the desktop update indicator for details.",
  "desktop.channel.readError": "Could not read the update channel. Restart the app.",
  "desktop.update.configurationFailed": "Could not apply update settings. Open the desktop update indicator for details.",
  "desktop.channel.result.applied": "Update channel changed",
  "desktop.channel.result.configuration": "Settings file error; updates are paused",
  "desktop.channel.details": "View details",
  "desktop.channel.result.save": "Could not save",
  "desktop.channel.result.uncertain": "Settings save error",
  "desktop.channel.result.format": "Could not save: invalid settings file",
  "desktop.channel.result.permission": "Could not save: permission denied",
  "desktop.channel.result.apply": "Settings save error",
  "desktop.update.configuration.read": "Updates paused: cannot read settings file",
  "desktop.update.configuration.format": "Updates paused: invalid settings file",
  "desktop.update.configuration.channel": "Updates paused: channel must be nightly or stable",
  "desktop.update.configuration.cleanup": "Updates paused: cannot discard previous update; restart the app",
  "trigger": "Settings",
  "shortcut.open": "Open settings",
  "desktop.update.available": "Update",
  "desktop.update.checking": "Checking for updates\u2026",
  "desktop.update.progress": "{percent}%",
  "desktop.update.verifying": "Verifying update files\u2026",
  "desktop.update.installing": "Preparing to restart\u2026",
  "desktop.update.ready": "Install and Restart",
  "desktop.update.retry": "Retry update",
  "desktop.update.versionDetail": "{label}: {version}",
  "desktop.update.downloadDetail": "Downloading update: {percent}%\nTarget version: {version}",
  "desktop.update.checkFailed": "Could not check for updates. Please try again later.",
  "desktop.update.downloadFailed": "Could not download the update. Please try again.",
  "desktop.update.downloadSpaceFailed": "Not enough disk space to download the update. Free up space, then retry.",
  "desktop.update.downloadPermissionFailed": "Cannot write the update files. Check the folder permissions and retry.",
  "desktop.update.downloadBusyFailed": "An update file is in use. Close the program using it, then retry.",
  "desktop.update.installFailed": "Could not install the update. Please try again later.",
  "desktop.update.checkNetworkFailed": "Could not check for updates. Check your connection and try again.",
  "desktop.update.downloadNetworkFailed": "Could not download the update. Check your connection and try again.",
  "desktop.update.installNetworkFailed": "Could not install the update. Check your connection and try again.",
  "desktop.update.fullscreenTimeout": "Could not exit fullscreen. Exit fullscreen, then retry the update.",
  "desktop.update.stopFailed": "Could not safely stop the tasks. The update has not been installed. Please try again later.",
  "desktop.update.tasksChanged": "New tasks have started. Confirm again to stop the tasks and update.",
  "desktop.update.tasksUnavailable": "Task status is unavailable. Try updating again when the workspace is ready.",
  "title": "Settings",
  "close": "Close",
  "openDocument": "Open configuration file",
  "openDocument.error": "Could not open configuration file",
  "general.nav": "General",
  "general.currentVersion": "Current version: {version}",
  "developerTools.title": "Show coding view",
  "developerTools.error": "Could not save. Please try again.",
  "developerTools.description": "Shows trajectory, code diffs, and all Agent presets",
  "connection.error": "Disconnected",
  "connection.connecting": "Reconnecting",
  "connection.connected": "Connected",
  "connection.reconnect": "Disconnected, reconnect now",
  "connection.restart": "Reconnecting, reconnect now",
  "hostRelease.title": "Service version changed",
  "hostRelease.description": "The service version changed. This page paused live updates; reload to load the new version.",
  "hostRelease.service": "Service",
  "hostRelease.page": "Page",
  "hostRelease.unknown": "Unknown",
  "hostRelease.reload": "Reload to load the new version",
  "hostRelease.later": "Not now"
};
var ja = {
  "desktop.channel.title": "\u66F4\u65B0\u30C1\u30E3\u30F3\u30CD\u30EB",
  "desktop.channel.description": "\u5B89\u5B9A\u7248\u306F\u65E5\u5E38\u7684\u306A\u4F7F\u7528\u306B\u9069\u3057\u3066\u3044\u307E\u3059\u3002\u958B\u767A\u7248\u3067\u306F\u65B0\u6A5F\u80FD\u3092\u3044\u3061\u65E9\u304F\u8A66\u305B\u307E\u3059\u304C\u3001\u4E0D\u5B89\u5B9A\u306A\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002",
  "desktop.channel.stable": "\u5B89\u5B9A\u7248",
  "desktop.channel.nightly": "\u958B\u767A\u7248",
  "desktop.channel.unavailable": "\u8A2D\u5B9A\u3092\u5229\u7528\u3067\u304D\u307E\u305B\u3093",
  "desktop.channel.error": "\u66F4\u65B0\u8A2D\u5B9A\u3092\u9069\u7528\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u306E\u66F4\u65B0\u8868\u793A\u3067\u8A73\u7D30\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.channel.readError": "\u66F4\u65B0\u30C1\u30E3\u30F3\u30CD\u30EB\u3092\u8AAD\u307F\u53D6\u308C\u307E\u305B\u3093\u3002\u30A2\u30D7\u30EA\u3092\u518D\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.configurationFailed": "\u66F4\u65B0\u8A2D\u5B9A\u3092\u9069\u7528\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u306E\u66F4\u65B0\u8868\u793A\u3067\u8A73\u7D30\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.channel.result.applied": "\u66F4\u65B0\u30C1\u30E3\u30F3\u30CD\u30EB\u3092\u5909\u66F4\u3057\u307E\u3057\u305F",
  "desktop.channel.result.configuration": "\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306B\u554F\u984C\u304C\u3042\u308B\u305F\u3081\u3001\u66F4\u65B0\u3092\u505C\u6B62\u3057\u3066\u3044\u307E\u3059",
  "desktop.channel.details": "\u8A73\u7D30\u3092\u8868\u793A",
  "desktop.channel.result.save": "\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F",
  "desktop.channel.result.uncertain": "\u8A2D\u5B9A\u306E\u4FDD\u5B58\u4E2D\u306B\u554F\u984C\u304C\u767A\u751F\u3057\u307E\u3057\u305F",
  "desktop.channel.result.format": "\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\uFF1A\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306E\u5F62\u5F0F\u304C\u4E0D\u6B63\u3067\u3059",
  "desktop.channel.result.permission": "\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\uFF1A\u66F8\u304D\u8FBC\u307F\u6A29\u9650\u304C\u3042\u308A\u307E\u305B\u3093",
  "desktop.channel.result.apply": "\u8A2D\u5B9A\u306E\u4FDD\u5B58\u4E2D\u306B\u554F\u984C\u304C\u767A\u751F\u3057\u307E\u3057\u305F",
  "desktop.update.configuration.read": "\u66F4\u65B0\u3092\u505C\u6B62\u4E2D\uFF1A\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u53D6\u308C\u307E\u305B\u3093",
  "desktop.update.configuration.format": "\u66F4\u65B0\u3092\u505C\u6B62\u4E2D\uFF1A\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306E\u5F62\u5F0F\u304C\u4E0D\u6B63\u3067\u3059",
  "desktop.update.configuration.channel": "\u66F4\u65B0\u3092\u505C\u6B62\u4E2D\uFF1Achannel \u306F nightly \u307E\u305F\u306F stable \u306B\u3057\u3066\u304F\u3060\u3055\u3044",
  "desktop.update.configuration.cleanup": "\u66F4\u65B0\u3092\u505C\u6B62\u4E2D\uFF1A\u4EE5\u524D\u306E\u66F4\u65B0\u3092\u524A\u9664\u3067\u304D\u307E\u305B\u3093\u3002\u30A2\u30D7\u30EA\u3092\u518D\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044",
  "trigger": "\u8A2D\u5B9A",
  "shortcut.open": "\u8A2D\u5B9A\u3092\u958B\u304F",
  "desktop.update.available": "\u66F4\u65B0",
  "desktop.update.checking": "\u66F4\u65B0\u3092\u78BA\u8A8D\u4E2D\u2026",
  "desktop.update.progress": "{percent}%",
  "desktop.update.verifying": "\u66F4\u65B0\u30D5\u30A1\u30A4\u30EB\u3092\u691C\u8A3C\u4E2D\u2026",
  "desktop.update.installing": "\u518D\u8D77\u52D5\u306E\u6E96\u5099\u4E2D\u2026",
  "desktop.update.ready": "\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u3066\u518D\u8D77\u52D5",
  "desktop.update.retry": "\u66F4\u65B0\u3092\u518D\u8A66\u884C",
  "desktop.update.versionDetail": "{label}: {version}",
  "desktop.update.downloadDetail": "\u66F4\u65B0\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u4E2D: {percent}%\n\u5BFE\u8C61\u30D0\u30FC\u30B8\u30E7\u30F3: {version}",
  "desktop.update.checkFailed": "\u66F4\u65B0\u3092\u78BA\u8A8D\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u3057\u3070\u3089\u304F\u3057\u3066\u304B\u3089\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.downloadFailed": "\u66F4\u65B0\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.downloadSpaceFailed": "\u66F4\u65B0\u306E\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u306B\u5FC5\u8981\u306A\u30C7\u30A3\u30B9\u30AF\u5BB9\u91CF\u304C\u4E0D\u8DB3\u3057\u3066\u3044\u307E\u3059\u3002\u7A7A\u304D\u5BB9\u91CF\u3092\u5897\u3084\u3057\u3066\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.downloadPermissionFailed": "\u66F4\u65B0\u30D5\u30A1\u30A4\u30EB\u3092\u66F8\u304D\u8FBC\u3081\u307E\u305B\u3093\u3002\u30D5\u30A9\u30EB\u30C0\u30FC\u306E\u30A2\u30AF\u30BB\u30B9\u6A29\u3092\u78BA\u8A8D\u3057\u3066\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.downloadBusyFailed": "\u66F4\u65B0\u30D5\u30A1\u30A4\u30EB\u304C\u4F7F\u7528\u4E2D\u3067\u3059\u3002\u4F7F\u7528\u3057\u3066\u3044\u308B\u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u9589\u3058\u3066\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.installFailed": "\u66F4\u65B0\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u3057\u3070\u3089\u304F\u3057\u3066\u304B\u3089\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.checkNetworkFailed": "\u66F4\u65B0\u3092\u78BA\u8A8D\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u63A5\u7D9A\u3092\u78BA\u8A8D\u3057\u3066\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.downloadNetworkFailed": "\u66F4\u65B0\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u63A5\u7D9A\u3092\u78BA\u8A8D\u3057\u3066\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.installNetworkFailed": "\u66F4\u65B0\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u63A5\u7D9A\u3092\u78BA\u8A8D\u3057\u3066\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.fullscreenTimeout": "\u5168\u753B\u9762\u8868\u793A\u3092\u7D42\u4E86\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u5168\u753B\u9762\u8868\u793A\u3092\u7D42\u4E86\u3057\u3066\u304B\u3089\u66F4\u65B0\u3092\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.stopFailed": "\u30BF\u30B9\u30AF\u3092\u5B89\u5168\u306B\u505C\u6B62\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u66F4\u65B0\u306F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u3057\u3070\u3089\u304F\u3057\u3066\u304B\u3089\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.tasksChanged": "\u65B0\u3057\u3044\u30BF\u30B9\u30AF\u304C\u958B\u59CB\u3055\u308C\u307E\u3057\u305F\u3002\u30BF\u30B9\u30AF\u3092\u505C\u6B62\u3057\u3066\u66F4\u65B0\u3059\u308B\u306B\u306F\u3001\u3082\u3046\u4E00\u5EA6\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "desktop.update.tasksUnavailable": "\u30BF\u30B9\u30AF\u306E\u72B6\u614B\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3002\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u306E\u6E96\u5099\u304C\u3067\u304D\u3066\u304B\u3089\u66F4\u65B0\u3092\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "title": "\u8A2D\u5B9A",
  "close": "\u9589\u3058\u308B",
  "openDocument": "\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u3092\u958B\u304F",
  "openDocument.error": "\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F",
  "general.nav": "\u4E00\u822C",
  "general.currentVersion": "\u73FE\u5728\u306E\u30D0\u30FC\u30B8\u30E7\u30F3: {version}",
  "developerTools.title": "\u30B3\u30FC\u30C7\u30A3\u30F3\u30B0\u30D3\u30E5\u30FC\u3092\u8868\u793A",
  "developerTools.error": "\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "developerTools.description": "\u8ECC\u8DE1\u3001\u30B3\u30FC\u30C9\u5DEE\u5206\u3001\u3059\u3079\u3066\u306E\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u30D7\u30EA\u30BB\u30C3\u30C8\u3092\u8868\u793A\u3057\u307E\u3059",
  "connection.error": "\u5207\u65AD\u6E08\u307F",
  "connection.connecting": "\u518D\u63A5\u7D9A\u4E2D",
  "connection.connected": "\u63A5\u7D9A\u6E08\u307F",
  "connection.reconnect": "\u5207\u65AD\u3055\u308C\u307E\u3057\u305F\u3002\u4ECA\u3059\u3050\u518D\u63A5\u7D9A",
  "connection.restart": "\u518D\u63A5\u7D9A\u4E2D\u3001\u4ECA\u3059\u3050\u518D\u63A5\u7D9A",
  "hostRelease.title": "\u30B5\u30FC\u30D3\u30B9\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u304C\u5909\u66F4\u3055\u308C\u307E\u3057\u305F",
  "hostRelease.description": "\u30B5\u30FC\u30D3\u30B9\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u304C\u5909\u66F4\u3055\u308C\u307E\u3057\u305F\u3002\u3053\u306E\u30DA\u30FC\u30B8\u306E\u30E9\u30A4\u30D6\u66F4\u65B0\u306F\u505C\u6B62\u3057\u3066\u3044\u307E\u3059\u3002\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u65B0\u3057\u3044\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u8AAD\u307F\u8FBC\u3093\u3067\u304F\u3060\u3055\u3044\u3002",
  "hostRelease.service": "\u30B5\u30FC\u30D3\u30B9",
  "hostRelease.page": "\u30DA\u30FC\u30B8",
  "hostRelease.unknown": "\u4E0D\u660E",
  "hostRelease.reload": "\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u65B0\u3057\u3044\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u8AAD\u307F\u8FBC\u3080",
  "hostRelease.later": "\u5F8C\u3067"
};
var es = {
  "desktop.channel.title": "Canal de actualizaciones",
  "desktop.channel.description": "Estable es adecuado para el uso diario. Desarrollo permite probar nuevas funciones antes, pero puede ser inestable.",
  "desktop.channel.stable": "Estable",
  "desktop.channel.nightly": "Desarrollo",
  "desktop.channel.unavailable": "Configuraci\xF3n no disponible",
  "desktop.channel.error": "No se pudo aplicar la configuraci\xF3n. Abre el indicador de actualizaci\xF3n para ver los detalles.",
  "desktop.channel.readError": "No se pudo leer el canal de actualizaci\xF3n. Reinicia la aplicaci\xF3n.",
  "desktop.update.configurationFailed": "No se pudo aplicar la configuraci\xF3n. Abre el indicador de actualizaci\xF3n para ver los detalles.",
  "desktop.channel.result.applied": "Canal de actualizaci\xF3n cambiado",
  "desktop.channel.result.configuration": "Error en el archivo de ajustes; actualizaciones en pausa",
  "desktop.channel.details": "Ver detalles",
  "desktop.channel.result.save": "No se pudo guardar",
  "desktop.channel.result.uncertain": "Se produjo un problema al guardar los ajustes",
  "desktop.channel.result.format": "No se pudo guardar: archivo de configuraci\xF3n no v\xE1lido",
  "desktop.channel.result.permission": "No se pudo guardar: permiso denegado",
  "desktop.channel.result.apply": "Se produjo un problema al guardar los ajustes",
  "desktop.update.configuration.read": "Actualizaciones pausadas: no se puede leer la configuraci\xF3n",
  "desktop.update.configuration.format": "Actualizaciones pausadas: archivo de configuraci\xF3n no v\xE1lido",
  "desktop.update.configuration.channel": "Actualizaciones pausadas: channel debe ser nightly o stable",
  "desktop.update.configuration.cleanup": "Actualizaciones pausadas: no se pudo descartar la actualizaci\xF3n anterior; reinicia la aplicaci\xF3n",
  "trigger": "Configuraci\xF3n",
  "shortcut.open": "Abrir configuraci\xF3n",
  "desktop.update.available": "Actualizar",
  "desktop.update.checking": "Buscando actualizaciones...",
  "desktop.update.progress": "{percent}%",
  "desktop.update.verifying": "Verificando archivos de actualizaci\xF3n...",
  "desktop.update.installing": "Prepar\xE1ndose para reiniciar\u2026",
  "desktop.update.ready": "Instalar y reiniciar",
  "desktop.update.retry": "Reintentar actualizaci\xF3n",
  "desktop.update.versionDetail": "{label}: {version}",
  "desktop.update.downloadDetail": "Descargando la actualizaci\xF3n: {percent}%\nVersi\xF3n de destino: {version}",
  "desktop.update.checkFailed": "No se pudo buscar actualizaciones. Int\xE9ntelo de nuevo m\xE1s tarde.",
  "desktop.update.downloadFailed": "No se pudo descargar la actualizaci\xF3n. Por favor int\xE9ntalo de nuevo.",
  "desktop.update.downloadSpaceFailed": "No hay espacio suficiente para descargar la actualizaci\xF3n. Libera espacio y vuelve a intentarlo.",
  "desktop.update.downloadPermissionFailed": "No se pueden escribir los archivos de actualizaci\xF3n. Revisa los permisos de la carpeta y vuelve a intentarlo.",
  "desktop.update.downloadBusyFailed": "Un archivo de actualizaci\xF3n est\xE1 en uso. Cierra el programa que lo usa y vuelve a intentarlo.",
  "desktop.update.installFailed": "No se pudo instalar la actualizaci\xF3n. Int\xE9ntelo de nuevo m\xE1s tarde.",
  "desktop.update.checkNetworkFailed": "No se pudo buscar actualizaciones. Comprueba tu conexi\xF3n y vuelve a intentarlo.",
  "desktop.update.downloadNetworkFailed": "No se pudo descargar la actualizaci\xF3n. Comprueba tu conexi\xF3n y vuelve a intentarlo.",
  "desktop.update.installNetworkFailed": "No se pudo instalar la actualizaci\xF3n. Comprueba tu conexi\xF3n y vuelve a intentarlo.",
  "desktop.update.fullscreenTimeout": "No se pudo salir de la pantalla completa. Salga de la pantalla completa y luego vuelva a intentar la actualizaci\xF3n.",
  "desktop.update.stopFailed": "No se pudieron detener las tareas de forma segura. La actualizaci\xF3n no se ha instalado. Int\xE9ntelo de nuevo m\xE1s tarde.",
  "desktop.update.tasksChanged": "Han comenzado nuevas tareas. Confirme nuevamente para detener las tareas y actualizar.",
  "desktop.update.tasksUnavailable": "El estado de la tarea no est\xE1 disponible. Intente actualizar nuevamente cuando el espacio de trabajo est\xE9 listo.",
  "title": "Configuraci\xF3n",
  "close": "Cerrar",
  "openDocument": "Abrir archivo de configuraci\xF3n",
  "openDocument.error": "No se pudo abrir el archivo de configuraci\xF3n",
  "general.nav": "General",
  "general.currentVersion": "Versi\xF3n actual: {version}",
  "developerTools.title": "Mostrar vista de codificaci\xF3n",
  "developerTools.error": "No se pudo guardar. Por favor int\xE9ntalo de nuevo.",
  "developerTools.description": "Muestra la trayectoria, las diferencias de c\xF3digo y todos los ajustes preestablecidos del agente.",
  "connection.error": "desconectado",
  "connection.connecting": "Reconectando",
  "connection.connected": "Conectado",
  "connection.reconnect": "Desconectado, vuelve a conectarte ahora",
  "connection.restart": "Reconect\xE1ndonos, reconect\xE1ndonos ahora",
  "hostRelease.title": "La versi\xF3n del servicio cambi\xF3",
  "hostRelease.description": "La versi\xF3n del servicio cambi\xF3. Esta p\xE1gina detuvo las actualizaciones en vivo; recargar para cargar la nueva versi\xF3n.",
  "hostRelease.service": "Servicio",
  "hostRelease.page": "P\xE1gina",
  "hostRelease.unknown": "Desconocido",
  "hostRelease.reload": "Recargar para cargar la nueva versi\xF3n.",
  "hostRelease.later": "Ahora no"
};
var fr = {
  "desktop.channel.title": "Canal de mise \xE0 jour",
  "desktop.channel.description": "Stable convient \xE0 un usage quotidien. D\xE9veloppement permet de d\xE9couvrir les nouveaut\xE9s en avance, mais peut \xEAtre instable.",
  "desktop.channel.stable": "Stable",
  "desktop.channel.nightly": "D\xE9veloppement",
  "desktop.channel.unavailable": "Configuration indisponible",
  "desktop.channel.error": "Impossible d\u2019appliquer les param\xE8tres. Ouvrez l\u2019indicateur de mise \xE0 jour pour plus de d\xE9tails.",
  "desktop.channel.readError": "Impossible de lire le canal de mise \xE0 jour. Red\xE9marrez l\u2019application.",
  "desktop.update.configurationFailed": "Impossible d\u2019appliquer les param\xE8tres. Ouvrez l\u2019indicateur de mise \xE0 jour pour plus de d\xE9tails.",
  "desktop.channel.result.applied": "Canal de mise \xE0 jour modifi\xE9",
  "desktop.channel.result.configuration": "Erreur du fichier de param\xE8tres ; mises \xE0 jour suspendues",
  "desktop.channel.details": "Voir les d\xE9tails",
  "desktop.channel.result.save": "\xC9chec de l\u2019enregistrement",
  "desktop.channel.result.uncertain": "Une erreur est survenue lors de l\u2019enregistrement des param\xE8tres",
  "desktop.channel.result.format": "\xC9chec de l\u2019enregistrement : fichier de param\xE8tres invalide",
  "desktop.channel.result.permission": "\xC9chec de l\u2019enregistrement : permission refus\xE9e",
  "desktop.channel.result.apply": "Une erreur est survenue lors de l\u2019enregistrement des param\xE8tres",
  "desktop.update.configuration.read": "Mises \xE0 jour suspendues : lecture des param\xE8tres impossible",
  "desktop.update.configuration.format": "Mises \xE0 jour suspendues : fichier de param\xE8tres invalide",
  "desktop.update.configuration.channel": "Mises \xE0 jour suspendues : channel doit \xEAtre nightly ou stable",
  "desktop.update.configuration.cleanup": "Mises \xE0 jour suspendues : suppression de la mise \xE0 jour pr\xE9c\xE9dente impossible ; red\xE9marrez l\u2019application",
  "trigger": "Param\xE8tres",
  "shortcut.open": "Ouvrir les param\xE8tres",
  "desktop.update.available": "Mise \xE0 jour",
  "desktop.update.checking": "V\xE9rification des mises \xE0 jour\u2026",
  "desktop.update.progress": "{percent}%",
  "desktop.update.verifying": "V\xE9rification des fichiers de mise \xE0 jour\u2026",
  "desktop.update.installing": "Pr\xE9paration du red\xE9marrage\u2026",
  "desktop.update.ready": "Installer et red\xE9marrer",
  "desktop.update.retry": "R\xE9essayez la mise \xE0 jour",
  "desktop.update.versionDetail": "{label}\xA0: {version}",
  "desktop.update.downloadDetail": "T\xE9l\xE9chargement de la mise \xE0 jour\xA0: {percent}%\nVersion cible\xA0: {version}",
  "desktop.update.checkFailed": "Impossible de v\xE9rifier les mises \xE0 jour. Veuillez r\xE9essayer plus tard.",
  "desktop.update.downloadFailed": "Impossible de t\xE9l\xE9charger la mise \xE0 jour. Veuillez r\xE9essayer.",
  "desktop.update.downloadSpaceFailed": "Espace disque insuffisant pour t\xE9l\xE9charger la mise \xE0 jour. Lib\xE9rez de l\u2019espace, puis r\xE9essayez.",
  "desktop.update.downloadPermissionFailed": "Impossible d\u2019\xE9crire les fichiers de mise \xE0 jour. V\xE9rifiez les autorisations du dossier, puis r\xE9essayez.",
  "desktop.update.downloadBusyFailed": "Un fichier de mise \xE0 jour est utilis\xE9. Fermez le programme qui l\u2019utilise, puis r\xE9essayez.",
  "desktop.update.installFailed": "Impossible d'installer la mise \xE0 jour. Veuillez r\xE9essayer plus tard.",
  "desktop.update.checkNetworkFailed": "Impossible de v\xE9rifier les mises \xE0 jour. V\xE9rifiez votre connexion et r\xE9essayez.",
  "desktop.update.downloadNetworkFailed": "Impossible de t\xE9l\xE9charger la mise \xE0 jour. V\xE9rifiez votre connexion et r\xE9essayez.",
  "desktop.update.installNetworkFailed": "Impossible d'installer la mise \xE0 jour. V\xE9rifiez votre connexion et r\xE9essayez.",
  "desktop.update.fullscreenTimeout": "Impossible de quitter le mode plein \xE9cran. Quittez le mode plein \xE9cran, puis r\xE9essayez la mise \xE0 jour.",
  "desktop.update.stopFailed": "Impossible d'arr\xEAter les t\xE2ches en toute s\xE9curit\xE9. La mise \xE0 jour n'a pas \xE9t\xE9 install\xE9e. Veuillez r\xE9essayer plus tard.",
  "desktop.update.tasksChanged": "De nouvelles t\xE2ches ont commenc\xE9. Confirmez \xE0 nouveau pour arr\xEAter les t\xE2ches et mettre \xE0 jour.",
  "desktop.update.tasksUnavailable": "L'\xE9tat de la t\xE2che n'est pas disponible. Essayez \xE0 nouveau de mettre \xE0 jour lorsque l'espace de travail est pr\xEAt.",
  "title": "Param\xE8tres",
  "close": "Fermer",
  "openDocument": "Ouvrir le fichier de configuration",
  "openDocument.error": "Impossible d'ouvrir le fichier de configuration",
  "general.nav": "G\xE9n\xE9ral",
  "general.currentVersion": "Version actuelle\xA0: {version}",
  "developerTools.title": "Afficher la vue de codage",
  "developerTools.error": "Impossible d'enregistrer. Veuillez r\xE9essayer.",
  "developerTools.description": "Affiche la trajectoire, les diff\xE9rences de code et tous les pr\xE9r\xE9glages d'agent",
  "connection.error": "D\xE9connect\xE9",
  "connection.connecting": "Reconnexion",
  "connection.connected": "Connect\xE9",
  "connection.reconnect": "D\xE9connect\xE9, reconnectez-vous maintenant",
  "connection.restart": "Reconnexion, reconnectez-vous maintenant",
  "hostRelease.title": "La version du service a \xE9t\xE9 modifi\xE9e",
  "hostRelease.description": "La version du service a chang\xE9. Cette page a suspendu les mises \xE0 jour en direct\xA0; recharger pour charger la nouvelle version.",
  "hostRelease.service": "Service",
  "hostRelease.page": "Pages",
  "hostRelease.unknown": "Inconnu",
  "hostRelease.reload": "Recharger pour charger la nouvelle version",
  "hostRelease.later": "Pas maintenant"
};
var de = {
  "desktop.channel.title": "Update-Kanal",
  "desktop.channel.description": "Stabil eignet sich f\xFCr den Alltag. Entwicklung bietet fr\xFChzeitigen Zugang zu neuen Funktionen, kann aber instabil sein.",
  "desktop.channel.stable": "Stabil",
  "desktop.channel.nightly": "Entwicklung",
  "desktop.channel.unavailable": "Konfiguration nicht verf\xFCgbar",
  "desktop.channel.error": "Update-Einstellungen konnten nicht angewendet werden. Details finden Sie in der Update-Anzeige.",
  "desktop.channel.readError": "Der Update-Kanal konnte nicht gelesen werden. Starten Sie die App neu.",
  "desktop.update.configurationFailed": "Update-Einstellungen konnten nicht angewendet werden. Details finden Sie in der Update-Anzeige.",
  "desktop.channel.result.applied": "Update-Kanal ge\xE4ndert",
  "desktop.channel.result.configuration": "Fehler in der Einstellungsdatei; Updates sind angehalten",
  "desktop.channel.details": "Details anzeigen",
  "desktop.channel.result.save": "Speichern fehlgeschlagen",
  "desktop.channel.result.uncertain": "Beim Speichern der Einstellungen ist ein Fehler aufgetreten",
  "desktop.channel.result.format": "Speichern fehlgeschlagen: ung\xFCltige Einstellungsdatei",
  "desktop.channel.result.permission": "Speichern fehlgeschlagen: keine Schreibberechtigung",
  "desktop.channel.result.apply": "Beim Speichern der Einstellungen ist ein Fehler aufgetreten",
  "desktop.update.configuration.read": "Updates pausiert: Einstellungsdatei nicht lesbar",
  "desktop.update.configuration.format": "Updates pausiert: ung\xFCltige Einstellungsdatei",
  "desktop.update.configuration.channel": "Updates pausiert: channel muss nightly oder stable sein",
  "desktop.update.configuration.cleanup": "Updates pausiert: vorheriges Update nicht verwerfbar; App neu starten",
  "trigger": "Einstellungen",
  "shortcut.open": "Einstellungen \xF6ffnen",
  "desktop.update.available": "Aktualisieren",
  "desktop.update.checking": "Suche nach Updates\u2026",
  "desktop.update.progress": "{percent}%",
  "desktop.update.verifying": "Aktualisierungsdateien werden \xFCberpr\xFCft\u2026",
  "desktop.update.installing": "Neustart wird vorbereitet\u2026",
  "desktop.update.ready": "Installieren und neu starten",
  "desktop.update.retry": "Update erneut versuchen",
  "desktop.update.versionDetail": "{label}: {version}",
  "desktop.update.downloadDetail": "Update wird heruntergeladen: {percent}%\nZielversion: {version}",
  "desktop.update.checkFailed": "Es konnte nicht nach Updates gesucht werden. Bitte versuchen Sie es sp\xE4ter noch einmal.",
  "desktop.update.downloadFailed": "Das Update konnte nicht heruntergeladen werden. Bitte versuchen Sie es erneut.",
  "desktop.update.downloadSpaceFailed": "Nicht gen\xFCgend Speicherplatz f\xFCr das Update. Geben Sie Speicherplatz frei und versuchen Sie es erneut.",
  "desktop.update.downloadPermissionFailed": "Update-Dateien k\xF6nnen nicht geschrieben werden. Pr\xFCfen Sie die Ordnerberechtigungen und versuchen Sie es erneut.",
  "desktop.update.downloadBusyFailed": "Eine Update-Datei wird verwendet. Schlie\xDFen Sie das verwendende Programm und versuchen Sie es erneut.",
  "desktop.update.installFailed": "Das Update konnte nicht installiert werden. Bitte versuchen Sie es sp\xE4ter noch einmal.",
  "desktop.update.checkNetworkFailed": "Es konnte nicht nach Updates gesucht werden. \xDCberpr\xFCfen Sie Ihre Verbindung und versuchen Sie es erneut.",
  "desktop.update.downloadNetworkFailed": "Das Update konnte nicht heruntergeladen werden. \xDCberpr\xFCfen Sie Ihre Verbindung und versuchen Sie es erneut.",
  "desktop.update.installNetworkFailed": "Das Update konnte nicht installiert werden. \xDCberpr\xFCfen Sie Ihre Verbindung und versuchen Sie es erneut.",
  "desktop.update.fullscreenTimeout": "Der Vollbildmodus konnte nicht beendet werden. Beenden Sie den Vollbildmodus und versuchen Sie dann erneut, das Update durchzuf\xFChren.",
  "desktop.update.stopFailed": "Die Aufgaben konnten nicht sicher gestoppt werden. Das Update wurde nicht installiert. Bitte versuchen Sie es sp\xE4ter noch einmal.",
  "desktop.update.tasksChanged": "Neue Aufgaben haben begonnen. Best\xE4tigen Sie erneut, um die Aufgaben zu stoppen und zu aktualisieren.",
  "desktop.update.tasksUnavailable": "Der Aufgabenstatus ist nicht verf\xFCgbar. Versuchen Sie erneut, die Aktualisierung durchzuf\xFChren, wenn der Arbeitsbereich bereit ist.",
  "title": "Einstellungen",
  "close": "Schlie\xDFen",
  "openDocument": "Konfigurationsdatei \xF6ffnen",
  "openDocument.error": "Die Konfigurationsdatei konnte nicht ge\xF6ffnet werden",
  "general.nav": "Allgemein",
  "general.currentVersion": "Aktuelle Version: {version}",
  "developerTools.title": "Codieransicht anzeigen",
  "developerTools.error": "Konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.",
  "developerTools.description": "Zeigt Ausf\xFChrungsverlauf, Codeunterschiede und alle Agentenvoreinstellungen an",
  "connection.error": "Nicht verbunden",
  "connection.connecting": "Wieder verbinden",
  "connection.connected": "Verbunden",
  "connection.reconnect": "Verbindung getrennt, jetzt erneut verbinden",
  "connection.restart": "Verbindung wiederherstellen, jetzt erneut verbinden",
  "hostRelease.title": "Dienstversion ge\xE4ndert",
  "hostRelease.description": "Die Dienstversion hat sich ge\xE4ndert. Diese Seite hat Live-Updates angehalten. Neu laden, um die neue Version zu laden.",
  "hostRelease.service": "Service",
  "hostRelease.page": "Seite",
  "hostRelease.unknown": "Unbekannt",
  "hostRelease.reload": "Neu laden, um die neue Version zu laden",
  "hostRelease.later": "Nicht jetzt"
};
var ru = {
  "desktop.channel.title": "\u041A\u0430\u043D\u0430\u043B \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439",
  "desktop.channel.description": "\u0421\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u043F\u043E\u0432\u0441\u0435\u0434\u043D\u0435\u0432\u043D\u043E\u0433\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F. \u041A\u0430\u043D\u0430\u043B \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0440\u0430\u043D\u044C\u0448\u0435 \u043F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438, \u043D\u043E \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043D\u0435\u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u044B\u043C.",
  "desktop.channel.stable": "\u0421\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u044B\u0439",
  "desktop.channel.nightly": "\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430",
  "desktop.channel.unavailable": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B",
  "desktop.channel.error": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0438\u043D\u0434\u0438\u043A\u0430\u0442\u043E\u0440 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0435\u0439.",
  "desktop.channel.readError": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u043A\u0430\u043D\u0430\u043B \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439. \u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435.",
  "desktop.update.configurationFailed": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0438\u043D\u0434\u0438\u043A\u0430\u0442\u043E\u0440 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0435\u0439.",
  "desktop.channel.result.applied": "\u041A\u0430\u043D\u0430\u043B \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439 \u0438\u0437\u043C\u0435\u043D\u0451\u043D",
  "desktop.channel.result.configuration": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0444\u0430\u0439\u043B\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A; \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B",
  "desktop.channel.details": "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435",
  "desktop.channel.result.save": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  "desktop.channel.result.uncertain": "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A",
  "desktop.channel.result.format": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C: \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A",
  "desktop.channel.result.permission": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C: \u043D\u0435\u0442 \u043F\u0440\u0430\u0432 \u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C",
  "desktop.channel.result.apply": "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A",
  "desktop.update.configuration.read": "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B: \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  "desktop.update.configuration.format": "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B: \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A",
  "desktop.update.configuration.channel": "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B: channel \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C nightly \u0438\u043B\u0438 stable",
  "desktop.update.configuration.cleanup": "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B: \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435; \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
  "trigger": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  "shortcut.open": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  "desktop.update.available": "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C",
  "desktop.update.checking": "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439\u2026",
  "desktop.update.progress": "{percent}%",
  "desktop.update.verifying": "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0444\u0430\u0439\u043B\u043E\u0432 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439\u2026",
  "desktop.update.installing": "\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u043A \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0443\u2026",
  "desktop.update.ready": "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
  "desktop.update.retry": "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435",
  "desktop.update.versionDetail": "{label}: {version}",
  "desktop.update.downloadDetail": "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F: {percent}%\n \u0426\u0435\u043B\u0435\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F: {version}",
  "desktop.update.checkFailed": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443 \u043F\u043E\u0437\u0436\u0435.",
  "desktop.update.downloadFailed": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",
  "desktop.update.downloadSpaceFailed": "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043C\u0435\u0441\u0442\u0430 \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F. \u041E\u0441\u0432\u043E\u0431\u043E\u0434\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
  "desktop.update.downloadPermissionFailed": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0444\u0430\u0439\u043B\u044B \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u043F\u0430\u043F\u043A\u0435 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
  "desktop.update.downloadBusyFailed": "\u0424\u0430\u0439\u043B \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043D\u044F\u0442. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0449\u0443\u044E \u0435\u0433\u043E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0443 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
  "desktop.update.installFailed": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443 \u043F\u043E\u0437\u0436\u0435.",
  "desktop.update.checkNetworkFailed": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
  "desktop.update.downloadNetworkFailed": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
  "desktop.update.installNetworkFailed": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
  "desktop.update.fullscreenTimeout": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u0439\u0442\u0438 \u0438\u0437 \u043F\u043E\u043B\u043D\u043E\u044D\u043A\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0430. \u0412\u044B\u0439\u0434\u0438\u0442\u0435 \u0438\u0437 \u043F\u043E\u043B\u043D\u043E\u044D\u043A\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0430 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F.",
  "desktop.update.stopFailed": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0438. \u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443 \u043F\u043E\u0437\u0436\u0435.",
  "desktop.update.tasksChanged": "\u041D\u0430\u0447\u0430\u043B\u0438\u0441\u044C \u043D\u043E\u0432\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438. \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437, \u0447\u0442\u043E\u0431\u044B \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447 \u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435.",
  "desktop.update.tasksUnavailable": "\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u0434\u0430\u0447\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0435\u0449\u0435 \u0440\u0430\u0437, \u043A\u043E\u0433\u0434\u0430 \u0440\u0430\u0431\u043E\u0447\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0431\u0443\u0434\u0435\u0442 \u0433\u043E\u0442\u043E\u0432\u0430.",
  "title": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  "close": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
  "openDocument": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0444\u0430\u0439\u043B \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",
  "openDocument.error": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0444\u0430\u0439\u043B \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",
  "general.nav": "\u041E\u0431\u0449\u0438\u0435",
  "general.currentVersion": "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F: {version}.",
  "developerTools.title": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043E\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
  "developerTools.error": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",
  "developerTools.description": "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0442\u0440\u0430\u0435\u043A\u0442\u043E\u0440\u0438\u044E, \u0440\u0430\u0437\u043B\u0438\u0447\u0438\u044F \u0432 \u043A\u043E\u0434\u0435 \u0438 \u0432\u0441\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0430\u0433\u0435\u043D\u0442\u0430.",
  "connection.error": "\u041E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
  "connection.connecting": "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
  "connection.connected": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
  "connection.reconnect": "\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C \u0441\u043D\u043E\u0432\u0430 \u0441\u0435\u0439\u0447\u0430\u0441",
  "connection.restart": "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435, \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0441\u0435\u0439\u0447\u0430\u0441",
  "hostRelease.title": "\u0412\u0435\u0440\u0441\u0438\u044F \u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0430",
  "hostRelease.description": "\u0412\u0435\u0440\u0441\u0438\u044F \u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C. \u041D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F; \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E.",
  "hostRelease.service": "\u0421\u0435\u0440\u0432\u0438\u0441",
  "hostRelease.page": "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
  "hostRelease.unknown": "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E",
  "hostRelease.reload": "\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E",
  "hostRelease.later": "\u041D\u0435 \u0441\u0435\u0439\u0447\u0430\u0441"
};
var pt = {
  "desktop.channel.title": "Canal de atualiza\xE7\xE3o",
  "desktop.channel.description": "Est\xE1vel \xE9 adequado para o uso di\xE1rio. Desenvolvimento oferece acesso antecipado a novos recursos, mas pode ser inst\xE1vel.",
  "desktop.channel.stable": "Est\xE1vel",
  "desktop.channel.nightly": "Desenvolvimento",
  "desktop.channel.unavailable": "Configura\xE7\xE3o indispon\xEDvel",
  "desktop.channel.error": "N\xE3o foi poss\xEDvel aplicar as configura\xE7\xF5es. Abra o indicador de atualiza\xE7\xE3o para ver detalhes.",
  "desktop.channel.readError": "N\xE3o foi poss\xEDvel ler o canal de atualiza\xE7\xE3o. Reinicie o aplicativo.",
  "desktop.update.configurationFailed": "N\xE3o foi poss\xEDvel aplicar as configura\xE7\xF5es. Abra o indicador de atualiza\xE7\xE3o para ver detalhes.",
  "desktop.channel.result.applied": "Canal de atualiza\xE7\xE3o alterado",
  "desktop.channel.result.configuration": "Erro no arquivo de configura\xE7\xF5es; atualiza\xE7\xF5es pausadas",
  "desktop.channel.details": "Ver detalhes",
  "desktop.channel.result.save": "N\xE3o foi poss\xEDvel salvar",
  "desktop.channel.result.uncertain": "Ocorreu um erro ao salvar as configura\xE7\xF5es",
  "desktop.channel.result.format": "N\xE3o foi poss\xEDvel salvar: arquivo de configura\xE7\xF5es inv\xE1lido",
  "desktop.channel.result.permission": "N\xE3o foi poss\xEDvel salvar: permiss\xE3o negada",
  "desktop.channel.result.apply": "Ocorreu um erro ao salvar as configura\xE7\xF5es",
  "desktop.update.configuration.read": "Atualiza\xE7\xF5es pausadas: n\xE3o foi poss\xEDvel ler as configura\xE7\xF5es",
  "desktop.update.configuration.format": "Atualiza\xE7\xF5es pausadas: arquivo de configura\xE7\xF5es inv\xE1lido",
  "desktop.update.configuration.channel": "Atualiza\xE7\xF5es pausadas: channel deve ser nightly ou stable",
  "desktop.update.configuration.cleanup": "Atualiza\xE7\xF5es pausadas: n\xE3o foi poss\xEDvel descartar a atualiza\xE7\xE3o anterior; reinicie o aplicativo",
  "trigger": "Configura\xE7\xF5es",
  "shortcut.open": "Abrir configura\xE7\xF5es",
  "desktop.update.available": "Atualizar",
  "desktop.update.checking": "Verificando atualiza\xE7\xF5es\u2026",
  "desktop.update.progress": "{percent}%",
  "desktop.update.verifying": "Verificando arquivos de atualiza\xE7\xE3o\u2026",
  "desktop.update.installing": "Preparando para reiniciar\u2026",
  "desktop.update.ready": "Instalar e reiniciar",
  "desktop.update.retry": "Tentar atualizar novamente",
  "desktop.update.versionDetail": "{label}: {version}",
  "desktop.update.downloadDetail": "Fazendo download da atualiza\xE7\xE3o: {percent}%\nVers\xE3o de destino: {version}",
  "desktop.update.checkFailed": "N\xE3o foi poss\xEDvel verificar se h\xE1 atualiza\xE7\xF5es. Por favor, tente novamente mais tarde.",
  "desktop.update.downloadFailed": "N\xE3o foi poss\xEDvel baixar a atualiza\xE7\xE3o. Por favor, tente novamente.",
  "desktop.update.downloadSpaceFailed": "N\xE3o h\xE1 espa\xE7o suficiente para baixar a atualiza\xE7\xE3o. Libere espa\xE7o e tente novamente.",
  "desktop.update.downloadPermissionFailed": "N\xE3o foi poss\xEDvel gravar os arquivos de atualiza\xE7\xE3o. Verifique as permiss\xF5es da pasta e tente novamente.",
  "desktop.update.downloadBusyFailed": "Um arquivo de atualiza\xE7\xE3o est\xE1 em uso. Feche o programa que o utiliza e tente novamente.",
  "desktop.update.installFailed": "N\xE3o foi poss\xEDvel instalar a atualiza\xE7\xE3o. Por favor, tente novamente mais tarde.",
  "desktop.update.checkNetworkFailed": "N\xE3o foi poss\xEDvel verificar se h\xE1 atualiza\xE7\xF5es. Verifique sua conex\xE3o e tente novamente.",
  "desktop.update.downloadNetworkFailed": "N\xE3o foi poss\xEDvel baixar a atualiza\xE7\xE3o. Verifique sua conex\xE3o e tente novamente.",
  "desktop.update.installNetworkFailed": "N\xE3o foi poss\xEDvel instalar a atualiza\xE7\xE3o. Verifique sua conex\xE3o e tente novamente.",
  "desktop.update.fullscreenTimeout": "N\xE3o foi poss\xEDvel sair da tela cheia. Saia da tela inteira e tente atualizar novamente.",
  "desktop.update.stopFailed": "N\xE3o foi poss\xEDvel interromper as tarefas com seguran\xE7a. A atualiza\xE7\xE3o n\xE3o foi instalada. Por favor, tente novamente mais tarde.",
  "desktop.update.tasksChanged": "Novas tarefas foram iniciadas. Confirme novamente para interromper as tarefas e atualizar.",
  "desktop.update.tasksUnavailable": "O status da tarefa n\xE3o est\xE1 dispon\xEDvel. Tente atualizar novamente quando o espa\xE7o de trabalho estiver pronto.",
  "title": "Configura\xE7\xF5es",
  "close": "Fechar",
  "openDocument": "Abra o arquivo de configura\xE7\xE3o",
  "openDocument.error": "N\xE3o foi poss\xEDvel abrir o arquivo de configura\xE7\xE3o",
  "general.nav": "Geral",
  "general.currentVersion": "Vers\xE3o atual: {version}",
  "developerTools.title": "Mostrar visualiza\xE7\xE3o de codifica\xE7\xE3o",
  "developerTools.error": "N\xE3o foi poss\xEDvel salvar. Por favor, tente novamente.",
  "developerTools.description": "Mostra trajet\xF3ria, diferen\xE7as de c\xF3digo e todas as predefini\xE7\xF5es do agente",
  "connection.error": "Desconectado",
  "connection.connecting": "Reconectando",
  "connection.connected": "Conectado",
  "connection.reconnect": "Desconectado, reconecte agora",
  "connection.restart": "Reconectando, reconecte agora",
  "hostRelease.title": "Vers\xE3o do servi\xE7o alterada",
  "hostRelease.description": "A vers\xE3o do servi\xE7o mudou. Esta p\xE1gina pausou as atualiza\xE7\xF5es ao vivo; reload para carregar a nova vers\xE3o.",
  "hostRelease.service": "Servi\xE7o",
  "hostRelease.page": "P\xE1gina",
  "hostRelease.unknown": "Desconhecido",
  "hostRelease.reload": "Recarregue para carregar a nova vers\xE3o",
  "hostRelease.later": "Agora n\xE3o"
};

// ../../tmp/upstream-src/packages/client/ui-settings-general/src/client/index.ts
var NS = "settings";
var inject = ["slots", "locale", "connection", "remote", "remote.settings", "configForms", "shortcuts", "modules", "remoteAccess"];
function apply(ctx) {
  ctx.slots.inject("settings.general.item", () => ctx.slots.register({
    name: "settings.general.item",
    id: "developer-tools",
    order: 15,
    locale: NS,
    inject: () => ({
      hooks: { developerTools: ctx.configForms.developerTools.enabled },
      setEnabled: async (enabled) => {
        const settings = ctx.configForms.get("ui-settings");
        const previous = settings.getSnapshot().value?.enabled;
        const timestamp = Date.now();
        await ctx.configForms.developerTools.setEnabled(enabled);
        if (previous !== void 0 && previous !== enabled && settings.getSnapshot().value?.enabled === enabled) {
          ctx.get("productAnalytics")?.track("code_work_view_toggle", { is_enabled: enabled }, timestamp);
        }
      }
    })
  }, DeveloperToolsRow));
  ctx.slots.inject("settings.general.item", () => ctx.slots.register({
    name: "settings.general.item",
    id: "current-version",
    order: 100,
    locale: NS
  }, CurrentVersionRow));
  ctx.effect(() => ctx.locale.register(NS, { zh, en, ja, es, fr, de, ru, pt }), "ui-settings-general: dictionaries");
  const connection = ctx.get("connection");
  const carrier = globalThis.dshDesktop;
  const desktopUpdate = new DesktopUpdateSource(carrier?.protocolVersion === 1 ? carrier.updates : void 0);
  ctx.effect(() => () => {
    desktopUpdate.dispose();
  }, "ui-settings-general: desktop update carrier");
  const channelBridge = carrier?.protocolVersion === 1 ? carrier.updates?.channels : void 0;
  if (channelBridge !== void 0) {
    const channel = new DesktopChannelSource(channelBridge);
    ctx.effect(() => () => {
      channel.dispose();
    }, "ui-settings-general: desktop channel");
    ctx.slots.inject("settings.general.item", () => ctx.slots.register({
      name: "settings.general.item",
      id: "desktop-update-channel",
      order: 95,
      locale: NS,
      inject: () => ({ hooks: { channel: channel.store }, select: (value) => channel.select(value) })
    }, DesktopChannelRow));
    ctx.slots.inject("shell.overlay", () => ctx.slots.register({
      name: "shell.overlay",
      id: "desktop-channel-toast",
      locale: NS,
      inject: () => ({
        hooks: { channel: channel.store },
        dismiss: (sequence) => {
          channel.dismissNotice(sequence);
        },
        openConfiguration: () => {
          desktopUpdate.open();
        }
      })
    }, DesktopChannelToast));
  }
  ctx.slots.inject("sidebar.toggle.badge", () => ctx.slots.register({
    name: "sidebar.toggle.badge",
    locale: NS,
    inject: () => ({ hooks: { desktopUpdate: desktopUpdate.store, connectionState: connection.state } })
  }, DesktopUpdateBadge));
  const t = ctx.locale.bind(NS);
  const documentController = ctx.remote.$host.isLoopback ? new SettingsDocumentStore(ctx, ctx.configForms.describe()) : void 0;
  const documentInjected = documentController === void 0 ? void 0 : () => ({
    controller: documentController,
    hooks: { snapshot: documentController.store }
  });
  ctx.effect(() => () => {
    documentController?.dispose();
  }, "ui-settings-general: document action directory");
  let rowsVersion = -1;
  let rowsRevision = -1;
  let rows = [];
  let onboardingVersion = -1;
  let onboardingSteps = [];
  const shellInjected = () => ({
    openDesktopUpdate: () => {
      desktopUpdate.open();
    },
    reconnect: () => {
      connection.reconnect();
    },
    hooks: {
      shortcuts: ctx.shortcuts.catalog,
      desktopUpdate: desktopUpdate.store,
      connectionState: connection.state,
      sections: {
        getSnapshot: () => {
          const version = ctx.slots.getVersion("settings.section");
          const revision = ctx.locale.getSnapshot().revision;
          if (version !== rowsVersion || revision !== rowsRevision) {
            rowsVersion = version;
            rowsRevision = revision;
            rows = ctx.slots.entries("settings.section").map((e) => ({
              /* v8 ignore next -- list-slot registration requires id (SlotCore rejects an entry without one) */
              id: e.options.id ?? "",
              order: e.options.order ?? 0,
              label: (0, import_dsh_client_ui_slots.resolveSlotLabel)(e.options.label) ?? ""
            })).sort((a, b) => a.order - b.order);
          }
          return rows;
        },
        subscribe: (listener) => {
          const offLedger = ctx.slots.subscribe("settings.section", listener);
          const offLocale = ctx.locale.subscribe(listener);
          return () => {
            offLedger();
            offLocale();
          };
        }
      },
      onboardingSteps: {
        getSnapshot: () => {
          const version = ctx.slots.getVersion("settings.onboarding");
          if (version !== onboardingVersion) {
            onboardingVersion = version;
            onboardingSteps = ctx.slots.entries("settings.onboarding").map((e) => ({
              /* v8 ignore next -- list-slot registration requires id */
              id: e.options.id ?? "",
              order: e.options.order ?? 0
            })).sort((a, b) => a.order - b.order);
          }
          return onboardingSteps;
        },
        subscribe: (listener) => ctx.slots.subscribe("settings.onboarding", listener)
      }
    }
  });
  ctx.remoteAccess.whenAccess("settings/describe", () => ctx.slots.inject("sidebar.settings", () => {
    const shellHandle = createSettingsShellStore();
    const shellInstance = shellHandle.create();
    const shellStore = { ...shellHandle, create: () => shellInstance };
    const disposeCommand = ctx.shortcuts.register({
      id: "settings.open",
      label: () => t("shortcut.open"),
      aliases: ["settings", "preferences"],
      defaults: {
        "desktop:macos": { code: "Comma", modifiers: ["primary"] },
        "desktop:windows": { code: "Comma", modifiers: ["primary"] },
        "desktop:linux": { code: "Comma", modifiers: ["primary"] },
        "web:macos": { code: "Comma", modifiers: ["primary", "alt"] },
        "web:windows": { code: "Comma", modifiers: ["primary", "alt"] }
      },
      regions: ["page", "editable", "terminal"],
      modals: ["settings"],
      resolve: ({ modal }) => {
        if (modal !== null && modal !== "settings") return { status: "blocked", reason: "modal" };
        return { status: "handled", run: () => {
          if (modal === "settings") (0, import_dsh_client_ui_primitives8.closeTopModal)(document);
          else shellInstance.actions.open();
        } };
      }
    });
    const disposeSlot = ctx.slots.register({
      name: "sidebar.settings",
      locale: NS,
      store: shellStore,
      children: {
        "settings.launcher": { kind: "single", scope: "root" },
        "settings.trigger": { kind: "single", scope: "root" },
        "settings.header": { kind: "single", scope: "root" },
        "settings.action": { kind: "list", scope: "root" },
        "settings.close": { kind: "single", scope: "root" },
        "settings.section": { kind: "list", scope: "root" },
        "settings.section.icon": { kind: "list", scope: "root", inline: true },
        "settings.onboarding": { kind: "list", scope: "root" }
      },
      inject: shellInjected
    }, SettingsRoot);
    return () => {
      disposeCommand();
      disposeSlot();
    };
  }));
  ctx.slots.inject("settings.trigger", () => ctx.slots.register({ name: "settings.trigger", locale: NS }, TriggerContent));
  ctx.slots.inject("settings.header", () => ctx.slots.register({ name: "settings.header", locale: NS }, HeaderContent));
  if (documentInjected !== void 0) {
    ctx.slots.inject("settings.action", () => ctx.slots.register({
      name: "settings.action",
      id: "open-document",
      order: 0,
      locale: NS,
      inject: documentInjected
    }, SettingsDocumentAction));
  }
  ctx.slots.inject("settings.close", () => ctx.slots.register({ name: "settings.close", locale: NS }, CloseLabel));
  ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "general",
    order: 0,
    label: () => t("general.nav"),
    locale: NS,
    children: { "settings.general.item": { kind: "list", scope: "root" } }
  }, GeneralSection));
  const releasePromptInjected = () => ({
    dismissRelease: () => {
      ctx.modules.entries.dismissRelease();
    },
    reloadPage: () => {
      globalThis.location.reload();
    },
    hooks: { releaseChange: ctx.modules.entries.releaseChange }
  });
  ctx.slots.inject("shell.overlay", () => ctx.slots.register({
    name: "shell.overlay",
    id: "host-release-change",
    locale: NS,
    inject: releasePromptInjected
  }, HostReleasePrompt));
}

		return module.exports;
	}
});
