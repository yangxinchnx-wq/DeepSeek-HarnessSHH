window.__ModuleLoader__.load({
	id: "dsh-superagent",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
"use strict";
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

// ../../tmp/dsh-superagent-prototype/src/client/index.tsx
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);
var import_react17 = require("react");

// ../../tmp/dsh-superagent-prototype/src/navigation.ts
var SessionNavigationError = class extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
};
async function openKnownSession(sessions, id, open, signal) {
  if (signal.aborted) return false;
  if (sessions.list.getSnapshot().phase !== "ready" || !sessions.list.getSnapshot().byId[id]) await sessions.refresh();
  if (signal.aborted) return false;
  const list = sessions.list.getSnapshot();
  if (list.phase !== "ready") throw new SessionNavigationError("not-ready");
  if (!list.byId[id]) throw new SessionNavigationError("not-listed");
  open(id);
  return true;
}

// ../../tmp/dsh-superagent-prototype/src/client/app.tsx
var import_react16 = require("react");

// ../../tmp/dsh-superagent-prototype/src/client/controls.tsx
var import_react = require("react");
var import_react_dom = require("react-dom");
var import_jsx_runtime = require("react/jsx-runtime");
var cx = (...names) => names.filter(Boolean).join(" ");
var ICON_PATHS = {
  "chevron-left": "M15 5l-7 7 7 7",
  "chevron-right": "M9 5l7 7-7 7",
  "chevron-down": "M5 9l7 7 7-7",
  "chevron-up": "M5 15l7-7 7 7",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",
  question: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01",
  plus: "M12 5v14M5 12h14",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  refresh: "M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  history: "M3.5 12a8.5 8.5 0 1 0 2.5-6M3.5 4v4h4M12 8v4l3 2",
  shield: "M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z",
  decision: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 12.5l2.5 2.5 4.5-5",
  message: "M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-5 4V6a1 1 0 0 1 1-1z",
  inbox: "M4 13l2.5-8h11l2.5 8M4 13v6h16v-6M4 13h5l1 2h4l1-2h5",
  hash: "M10 4L8 20M16 4l-2 16M5 9h15M4 15h15",
  filter: "M4 5h16l-6 7.5V18l-4 2v-7.5z",
  user: "M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5",
  close: "M6 6l12 12M18 6L6 18",
  settings: "M4 7h10M18 7h2M4 17h4M12 17h8M16 5v4M10 15v4",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  session: "M4 5h16v14H4zM8 10l3 2-3 2M13 15h3",
  stop: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5h5v5h-5z",
  pause: "M9 6v12M15 6v12",
  play: "M8 5l11 7-11 7z",
  unsubscribe: "M6 16v-5a6 6 0 0 1 10-4.5M18 11v5l2 2H8M10 20h4M4 4l16 16",
  dismiss: "M4 4l16 16M9.9 5.2A9 9 0 0 1 21 12a12 12 0 0 1-2.4 3.2M6.3 6.4A12 12 0 0 0 3 12c2 4 5.5 6 9 6 1.4 0 2.7-.3 3.9-.9",
  pull: "M7 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8v8M7 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM17 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM17 16V9a2 2 0 0 0-2-2h-4M13 5l-2 2 2 2",
  copy: "M9 9h10v11H9zM5 15V4h10",
  review: "M9 4h6v3H9zM7 5H5v15h14V5h-2M9 13l2 2 4-4",
  ask: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01",
  alert: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5v5.5M12 16.5h.01",
  running: "M12 3a9 9 0 1 0 9 9",
  blocked: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM5.6 5.6l12.8 12.8",
  queue: "M4 6h16M4 12h16M4 18h10"
};
function Icon({ name, size = 16 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: ICON_PATHS[name] })
    }
  );
}
function Button({ variant = "ghost", size = "md", icon, className, children, type = "button", ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type, className: cx("dt-btn", `dt-btn-${variant}`, `dt-btn-${size}`, className), ...rest, children: [
    icon !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dt-btn-icon", children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dt-btn-label", children })
  ] });
}
function Tag({ tone = "outline", title, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dt-tag", "data-tone": tone, title, children });
}
function Pill({ active, onClick, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      className: cx("dt-pill", active && "dt-pill-active"),
      "aria-pressed": active,
      onClick,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dt-pill-label", children })
    }
  );
}
function walk(event, values, value, onChange) {
  const index = values.indexOf(value);
  const steps = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: values.length - 1 };
  const next = steps[event.key];
  if (next === void 0) return;
  event.preventDefault();
  const target = values[(next + values.length) % values.length];
  if (target !== value) onChange(target);
  const list = event.currentTarget;
  requestAnimationFrame(() => list.querySelector('[role="tab"][aria-selected="true"]')?.focus());
}
function SegmentedTabs({ items, value, onChange, label: label2, className }) {
  const list = (0, import_react.useRef)(null);
  const [more, setMore] = (0, import_react.useState)();
  const measure = (0, import_react.useCallback)(() => {
    const element = list.current;
    if (!element) return;
    const start = element.scrollLeft > 1, end = element.scrollLeft + element.clientWidth < element.scrollWidth - 1;
    setMore(start && end ? "both" : start ? "start" : end ? "end" : void 0);
  }, []);
  (0, import_react.useEffect)(() => {
    measure();
    if (!list.current || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(list.current);
    for (const tab of list.current.children) observer.observe(tab);
    return () => {
      observer.disconnect();
    };
  }, [measure, items.length]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: list,
      role: "tablist",
      "aria-label": label2,
      className: cx("dt-tabs", className),
      "data-more": more,
      onScroll: measure,
      style: { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` },
      onKeyDown: (event) => walk(
        event,
        items.map((item) => item.value),
        value,
        onChange
      ),
      children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          role: "tab",
          id: item.id,
          "aria-controls": item.panelId,
          "aria-selected": item.value === value,
          tabIndex: item.value === value ? 0 : -1,
          className: "dt-tab",
          onClick: () => onChange(item.value),
          children: item.label
        },
        item.value
      ))
    }
  );
}
function SegmentedControl({ options, value, onChange, label: label2, disabled, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      role: "tablist",
      "aria-label": label2,
      className: cx("dt-segmented", className),
      style: { gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` },
      onKeyDown: (event) => {
        if (!disabled) walk(event, options.map((option) => option.value), value, onChange);
      },
      children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": option.value === value,
          tabIndex: option.value === value ? 0 : -1,
          title: option.title,
          disabled,
          className: "dt-segment",
          onClick: () => {
            if (option.value !== value) onChange(option.value);
          },
          children: option.label
        },
        option.value
      ))
    }
  );
}
function Input({ icon, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: cx("dt-input", className), children: [
    icon !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        className: "dt-input-icon",
        children: icon
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { ...rest })
  ] });
}
function Switch({
  checked,
  onChange,
  label: label2,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      "aria-label": label2,
      className: cx("dt-switch", className),
      onClick: () => onChange(!checked),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dt-switch-thumb" })
    }
  );
}
function StateDot({ state, className }) {
  if (state === "ongoing") {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: cx("dt-spinner", className), "data-state": "ongoing", width: 14, height: 14, viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "9.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "9.5" })
    ] }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cx("dt-state-dot", className), "data-state": state, "aria-hidden": "true" });
}
function Dot({ state, label: label2 }) {
  const dot = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateDot, { className: "dt-dot", state });
  return label2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dt-dot-wrap", title: label2, role: "img", "aria-label": label2, children: dot }) : dot;
}
function DisclosureRow({ icon, title, open, onToggle, collapsedContent, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dt-disclosure", "data-open": open || void 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "dt-disclosure-row",
        role: "button",
        tabIndex: 0,
        "aria-expanded": open,
        "data-disclosure-row": true,
        onClick: onToggle,
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dt-disclosure-lead", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dt-disclosure-icon", children: icon }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dt-disclosure-chevron", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: open ? "chevron-up" : "chevron-down" }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dt-disclosure-title", children: title }),
          !open && collapsedContent
        ]
      }
    ),
    open && children
  ] });
}
var FOCUSABLE = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';
function trapTab(event, dialog) {
  const items = [...dialog.querySelectorAll("*")].filter((element) => element.matches(FOCUSABLE));
  const first = items[0], last = items.at(-1), active = document.activeElement;
  const target = event.shiftKey ? last : first;
  if (!target || !dialog.contains(active) || active === dialog || active === (event.shiftKey ? first : last)) {
    event.preventDefault();
    target?.focus();
  }
}
function Modal({ open, onClose, title, closeLabel, description, footer, className, children }) {
  const dialog = (0, import_react.useRef)(null);
  const close = (0, import_react.useRef)(onClose);
  close.current = onClose;
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : void 0;
    dialog.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") close.current();
      else if (event.key === "Tab" && dialog.current) trapTab(event, dialog.current);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [open]);
  if (!open) return null;
  return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dt-modal-root", role: "presentation", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dt-modal-mask", "aria-hidden": "true", onClick: onClose }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: dialog, className: cx("dt-modal", className), role: "dialog", "aria-modal": "true", "aria-label": title, tabIndex: -1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dt-modal-header", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dt-modal-close", "aria-label": closeLabel, onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "close", size: 14 }) })
      ] }),
      description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dt-modal-description", children: description }),
      children !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dt-modal-body", children }),
      footer !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dt-modal-footer", children: footer })
    ] })
  ] }), document.body);
}
function InfoTip({ text: text2, icon = "question", warn }) {
  const anchor = (0, import_react.useRef)(null);
  const bubble = (0, import_react.useRef)(null);
  const [open, setOpen] = (0, import_react.useState)(false);
  (0, import_react.useLayoutEffect)(() => {
    const target = anchor.current, element = bubble.current;
    if (!open || !target || !element) return;
    const margin = 12, gap = 8;
    const a = target.getBoundingClientRect(), b = element.getBoundingClientRect();
    const above = a.top - gap - b.height >= margin;
    element.style.left = `${Math.max(margin, Math.min(a.left + a.width / 2 - b.width / 2, window.innerWidth - margin - b.width))}px`;
    element.style.top = `${above ? a.top - gap - b.height : a.bottom + gap}px`;
    element.style.visibility = "visible";
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        ref: anchor,
        type: "button",
        className: warn ? "dt-info dt-info-warn" : "dt-info",
        "aria-label": text2,
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onBlur: () => setOpen(false),
        onFocus: (event) => {
          if (event.currentTarget.matches(":focus-visible")) setOpen(true);
        },
        onKeyDown: (event) => {
          if (event.key === "Escape") setOpen(false);
        },
        onPointerUp: (event) => {
          if (event.pointerType === "touch") setOpen(!open);
        },
        onClick: (event) => {
          if (event.detail > 0 && event.nativeEvent.pointerType !== "touch") setOpen(false);
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: icon, size: 14 })
      }
    ),
    open && (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ref: bubble, role: "tooltip", className: "dt-tooltip", style: { visibility: "hidden" }, children: text2 }),
      document.body
    )
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/client/eval.tsx
var import_react8 = require("react");

// ../../tmp/dsh-superagent-prototype/src/admission.ts
var ADMISSION_OPTIONS = {
  listedUnaddressed: ["inferred", "ignore"],
  unlistedAddressed: ["explicit", "inferred", "ignore"],
  unlistedUnaddressed: ["inferred", "ignore"]
};
var ADMISSION_DEFAULTS = { listedUnaddressed: "inferred", unlistedAddressed: "ignore", unlistedUnaddressed: "ignore" };

// ../../tmp/dsh-superagent-prototype/src/limits.ts
var LIMITS = {
  ruleName: 100,
  ruleInstruction: 2e3,
  evalTimeoutSeconds: { min: 30, max: 600 },
  maxWorkers: { min: 1, max: 16 },
  prepareCommand: 4e3,
  promptMaxChars: { min: 1e3, max: 1e6 },
  admissionContextMaxPages: { min: 1, max: 100 },
  admissionContextTimeoutMs: { min: 1, max: 9e4 }
};

// ../../tmp/dsh-superagent-prototype/src/client/api.ts
var import_react2 = require("react");

// ../../tmp/dsh-superagent-prototype/src/core/errors.ts
var USER_ERRORS = {
  unknownTicket: ["missing", "Unknown ticket"],
  unknownProblem: ["missing", "Unavailable Eval not found"],
  unknownTrigger: ["missing", "Unknown trigger"],
  unknownAssignment: ["missing", "Unknown assignment"],
  unknownBlock: ["missing", "Unknown settings block: {block}"],
  unknownPromptRevision: ["missing", "Unknown prompt revision {revision}"],
  unknownPromptPart: ["refused", "Unknown built-in prompt part {part}"],
  ticketEnded: ["refused", "Ticket has ended"],
  assignmentEnded: ["refused", "Assignment has ended; a newer assignment owns this ticket"],
  evalFinished: ["refused", "Eval {eval} has finished or a later eval replaced it; decide the trigger's current eval"],
  notAdmissible: ["refused", "Trigger is not admissible: {reason}"],
  notExplicit: ["refused", "An accept through orchestrator_route is for explicit requests from allowed senders; assess proactive candidates with orchestrator_eval and orchestrator_eval_decide"],
  ticketStopped: ["refused", "A person stopped this ticket; new work needs an accept through orchestrator_route"],
  mandateRevoked: ["refused", "The current policy no longer holds this ticket's mandate; new work needs an accept through orchestrator_route"],
  notRetryable: ["refused", "Only an open ticket can be retried, and only when its worker last reported failed or blocked and no person has sent a message since, or when delivering an Input to its worker failed"],
  sourceThread: ["refused", "This is the thread the ticket started on; it stays subscribed"],
  followedThread: ["refused", "This thread is the ticket's own, such as its pull request's; it stays subscribed"],
  notFollowing: ["refused", "This ticket does not follow that thread"],
  questionWithResult: ["refused", "A question for a person cannot also be a ready result or an answer; report it separately"],
  askerWithoutQuestion: ["refused", "The message that raised a question needs the question it raised"],
  notAsker: ["refused", "A question must name the person's message that raised it, which reached this ticket"],
  notAnswerable: ["refused", "An answer must name the person's question it answers, which reached this ticket"],
  ackEnded: ["refused", "Ticket ended; do not acknowledge historical requests"],
  notReached: ["refused", "Trigger does not belong to this worker"],
  handedBack: ["refused", "This ticket handed that trigger back already"],
  handedBackHere: ["refused", "The worker of this ticket handed that trigger back as beyond it: accept it as new work, attach it to another ticket, or ignore it"],
  workerDecides: ["refused", "This message reached ticket {tickets} on its thread: its worker decides whether it belongs there and hands back what does not, which then arrives as a candidate. Only a stop goes through orchestrator_route, with kind stop"],
  ackNoChannel: ["refused", "Acknowledgement requires an assigned human source message"],
  ackNotPerson: ["refused", "Use the original human trigger, not a bot, CI or worker report"],
  notReady: ["refused", "Ticket is not ready for delivery. Keep progress internal and wait for a verified ready report; do not relabel progress as an answer or send it through another channel."],
  notAttention: ["refused", "Attention requires the ticket's current attention question in human_action. Routine unfinished work stays internal."],
  notQuestion: ["refused", "An answer must target the original human question, not a worker report or automated trigger"],
  noAnswer: ["refused", "No worker answer is ready for this human trigger. Wait for the worker's report, or request one with orchestrator_ticket_request_status, which acts only on a worker that reported waiting; ordinary progress cannot be relabelled as an answer."],
  noChannel: ["refused", "No reply channel for this ticket or trigger"],
  panelOnlyEnvironment: ["refused", "The execution environment (ticket directory, prepare command, blocked commands) can only be changed in the management panel"],
  panelOnlyAccounts: ["refused", "Source fields that setup reads, such as account CLIs, can only be changed in the management panel"],
  setupComplete: ["refused", "Setup is complete"],
  modelUnavailable: ["refused", "The {block} model is not available: {error}"],
  promptTooLong: ["refused", "Prompt configuration exceeds {limit} characters"],
  promptPlaceholders: ["refused", "The \u201C{part}\u201D template must keep {placeholders}, which the system fills in"],
  promptPartEmpty: ["refused", "The \u201C{part}\u201D part cannot be empty; reset it to follow its built-in text"],
  sourceNotInstalled: ["refused", "The {source} Source kind is not installed"],
  noLabels: ["refused", "This Source has no names to refresh"],
  nothingToSync: ["refused", "The {source} Source's part of the Policy has nothing to sync from, or the Source is off or waiting for setup"]
};

// ../../tmp/dsh-superagent-prototype/src/client/api.ts
var ApiError = class extends Error {
  constructor(message, status, details = {}) {
    super(message);
    this.status = status;
    this.details = details;
  }
  get issues() {
    return this.details.issues ?? [];
  }
  /** True when the host confirmed the record does not exist, rather than being unreachable. */
  get missing() {
    return this.status === 404 && !this.details.unreachable;
  }
};
var isUserError = (code) => typeof code === "string" && Object.hasOwn(USER_ERRORS, code);
async function api(messages2, path, method, body) {
  let response;
  const json = body === void 0 ? {} : { headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
  try {
    response = await fetch(`/orchestrator/api/${path}`, { method, ...json, headers: { "x-orchestrator-request": "1", ...json.headers } });
  } catch {
    throw new ApiError(messages2.offline, 0, { unreachable: true });
  }
  const text2 = await response.text();
  let value;
  try {
    value = text2 ? JSON.parse(text2) : {};
  } catch {
    value = void 0;
  }
  if (!response.ok) {
    const failure = value ?? {};
    const issues = Array.isArray(failure.issues) ? failure.issues : [];
    const user = isUserError(failure.code) ? { code: failure.code, values: failure.values ?? {} } : void 0;
    const { status } = response;
    const message = failure.setup ? messages2.setup(failure.setup) : user ? messages2.user(user) : typeof failure.error === "string" ? failure.error : !text2 && status === 404 ? messages2.notRunning : status >= 500 ? messages2.serverError(status) : messages2.requestFailed(status);
    throw new ApiError(message, status, {
      issues,
      ...failure.setup ? { setup: failure.setup } : {},
      ...user ? { user } : {},
      ...text2 ? {} : { unreachable: true }
    });
  }
  return value;
}
var HIDDEN_FACTOR = 6;
var same = (a, b) => a === b || JSON.stringify(a) === JSON.stringify(b);
function usePoll(load, deps, intervalMs = 5e3) {
  const [state, setState] = (0, import_react2.useState)({});
  const loader = (0, import_react2.useRef)(load);
  loader.current = load;
  const refresh = (0, import_react2.useRef)(async () => {
  });
  (0, import_react2.useEffect)(() => {
    let active = true;
    let timer;
    let queue = Promise.resolve();
    const once = async () => {
      clearTimeout(timer);
      try {
        const value = await loader.current();
        if (active) setState((previous) => same(previous.data, value) ? previous.error ? { data: previous.data } : previous : { data: value });
      } catch (failure) {
        if (active) setState((previous) => ({ ...previous, error: failure instanceof Error ? failure : new Error(String(failure)) }));
      } finally {
        if (active) timer = setTimeout(run, document.hidden ? intervalMs * HIDDEN_FACTOR : intervalMs);
      }
    };
    const run = () => queue = queue.then(once);
    const shown = () => {
      if (!document.hidden) void run();
    };
    refresh.current = run;
    void run();
    document.addEventListener("visibilitychange", shown);
    return () => {
      active = false;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", shown);
    };
  }, [...deps, intervalMs]);
  const reload = (0, import_react2.useCallback)(() => refresh.current(), []);
  return { data: state.data, error: state.error, reload };
}
var DECISION_FILTERS = ["work", "stop", "ignore", "unavailable", "all"];
var DECISION_KINDS = {
  work: "accept,reopen",
  stop: "stop",
  ignore: "ignore",
  unavailable: "unavailable",
  all: ""
};
function caller(messages2) {
  return (route, ...[request]) => {
    const [method, pattern] = route.split(" ");
    const values = request ?? {};
    const path = pattern.replace(/:(\w+)/g, (_match, name) => encodeURIComponent(String(values[name])));
    const query = Object.entries(values.query ?? {}).filter(([, value]) => value !== void 0 && value !== "").map(([name, value]) => `${name}=${encodeURIComponent(String(value))}`).join("&");
    return api(messages2(), query ? `${path}?${query}` : path, method, values.body);
  };
}

// ../../tmp/dsh-superagent-prototype/src/client/draft.tsx
var import_react4 = require("react");

// ../../tmp/dsh-superagent-prototype/src/client/provider.tsx
var import_react3 = require("react");
var import_react_dom2 = require("react-dom");

// raw-text:/tmp/dsh-superagent-prototype/src/client/client.css
var client_default = `/* Panel layout and local UI controls styled with DSH \`--dsw-alias-*\` design tokens; one rule per line. */
.dt-page { box-sizing: border-box; height: 100%; overflow: auto; scrollbar-gutter: stable; scroll-padding: 48px 0 72px; container-type: inline-size; padding: 28px clamp(24px, 4vw, 48px) 0; color: var(--dsw-alias-label-primary); }
/* Deployment page rendered inside DSH Plugin Manager, which owns scrolling and padding. */
.dt-embedded { container-type: inline-size; color: var(--dsw-alias-label-primary); }
/* Disable sticky positioning inside DSH Plugin Manager, where the host container owns scrolling and bottom padding. */
.dt-embedded .dt-savebar { position: static; }
.dt-page > .dt-column { max-width: 960px; margin: 0 auto; padding-bottom: 48px; display: flex; flex-direction: column; gap: 24px; }
.dt-head { position: relative; z-index: 3; display: flex; align-items: flex-start; justify-content: space-between; gap: 8px 16px; flex-wrap: wrap; }
.dt-search { position: relative; width: 240px; max-width: 100%; }
.dt-search-results { position: absolute; top: calc(100% + 6px); right: 0; width: min(560px, 90cqw); max-height: 60vh; overflow: auto; padding: 8px 16px; border: 0.5px solid var(--dsw-alias-border-l3); border-radius: 12px; background: var(--dsw-alias-bg-layer-2); box-shadow: var(--dsw-elevation-prominent); z-index: 5; display: flex; flex-direction: column; gap: 8px; }
.dt-mark { background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 25%, transparent); color: inherit; border-radius: 2px; }
[data-platform='darwin'] .dt-page .dt-head { padding-top: var(--dsh-frame-top-clearance, 0px); }
.dt-title { margin: 0; font-size: 15px; line-height: 22px; font-weight: 600; color: var(--dsw-alias-label-secondary); }
.dt-toolbar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.dt-page .dt-tabs { overflow-x: auto; display: flex; gap: 20px; max-width: none; padding: 0; border-radius: 0; background: none; border-bottom: 0.5px solid var(--dsw-alias-border-l3); }
.dt-segmented { width: 100%; max-width: 420px; box-sizing: border-box; display: inline-grid; gap: 2px; padding: 3px; border-radius: 9px; background: var(--dsw-alias-interactive-bg-hover); }
.dt-form.dt-block { padding: 16px; border: 0.5px solid var(--dsw-alias-border-l3); border-radius: 16px; gap: 16px; }
.dt-block-title { display: flex; align-items: center; gap: 4px; margin: 0; font-size: 16px; line-height: 24px; font-weight: 500; }
.dt-section { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.dt-section-title { margin: 0; display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; font-size: 13px; line-height: 20px; font-weight: 600; color: var(--dsw-alias-label-secondary); }
.dt-section-name { white-space: nowrap; }
.dt-count { font-size: 14px; color: var(--dsw-alias-label-caption); font-variant-numeric: tabular-nums; font-weight: 400; }
.dt-hint { margin: 0; font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-tertiary); }
.dt-error { margin: 0; font-size: 13px; line-height: 20px; color: var(--dsw-alias-state-error-primary); }
.dt-banner { margin: 0; padding: 8px 12px; border-radius: 10px; font-size: 13px; line-height: 20px; background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 10%, transparent); overflow-wrap: anywhere; }
.dt-banner.dt-danger { background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent); }
.dt-list { list-style: none; margin: 0 -8px; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.dt-row { position: relative; min-width: 0; border-radius: 12px; padding: 10px 8px; display: flex; flex-wrap: wrap; gap: 4px 12px; align-items: flex-start; }
.dt-row.dt-link:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dt-row-main { flex: 1 1 200px; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.dt-disclosure-body .dt-row-main { flex-basis: 0; }
.dt-row-title { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 14px; line-height: 20px; font-weight: 500; }
.dt-open { max-width: 100%; padding: 0; border: 0; background: transparent; color: inherit; font: inherit; font-size: 14px; line-height: 20px; font-weight: 500; text-align: left; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dt-open::after { content: ''; position: absolute; inset: 0; border-radius: 12px; }
.dt-open:focus-visible { outline: none; }
.dt-open-wrap { white-space: normal; }
.dt-open:focus-visible::after { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.dt-row-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 4px 10px; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-caption); overflow-wrap: anywhere; }
.dt-row-quote { font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dt-clamp { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
/* Transparent block borders preserve vertical spacing when line clamping clips padding. */
.dt-banner:is(.dt-clamp, .dt-clamp-8) { padding-block: 0; border-block: 8px solid transparent; }
.dt-banner-label { font-weight: 500; }
.dt-banner .dt-md { display: inline; }
.dt-banner .dt-md > p:first-child { display: inline; }
.dt-row-buttons { position: relative; z-index: 1; gap: 8px; margin-top: 4px; }
.dt-row-actions { position: relative; z-index: 1; display: flex; align-items: center; gap: 4px; flex: none; margin-left: auto; font-size: 13px; line-height: 20px; }
.dt-dot { flex: none; margin-top: 5px; }
.dt-inline-link { position: relative; z-index: 1; color: var(--dsw-alias-link); text-decoration: none; }
.dt-inline-link:hover { text-decoration: underline; }
.dt-textlink { padding: 0; border: 0; background: none; font: inherit; color: var(--dsw-alias-link); cursor: pointer; text-align: left; }
.dt-textlink:hover { text-decoration: underline; }
.dt-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 13px; line-height: 20px; }
.dt-kv { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; margin: 0; font-size: 13px; line-height: 20px; }
.dt-kv dt { color: var(--dsw-alias-label-tertiary); }
.dt-kv dd { margin: 0; min-width: 0; overflow-wrap: anywhere; }
.dt-timeline { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.dt-event { padding: 12px 0; border-bottom: 0.5px solid var(--dsw-alias-border-l2); display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.dt-event:last-child { border-bottom: 0; }
.dt-event.dt-highlight { background: var(--dsw-alias-interactive-bg-hover); border-radius: 8px; padding-inline: 8px; margin-inline: -8px; }
.dt-event-text { margin: 0; font-size: 13px; line-height: 20px; white-space: pre-wrap; overflow-wrap: anywhere; }
.dt-event-actor { font-weight: 500; color: var(--dsw-alias-label-secondary); }
.dt-event-quiet .dt-event-text { color: var(--dsw-alias-label-tertiary); }
.dt-flow { margin: 0; font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary); }
.dt-clamp-8 { display: -webkit-box; -webkit-line-clamp: 8; -webkit-box-orient: vertical; overflow: hidden; }
.dt-more { align-self: flex-start; font-size: 12px; }
.dt-reveal { opacity: 0; }
.dt-event:hover .dt-reveal, .dt-reveal:focus-visible { opacity: 1; }
@media (hover: none) {
  .dt-reveal { opacity: 1; }
}
.dt-event-foot { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary); }
.dt-filters { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.dt-filters .dt-search { margin-left: auto; }
.dt-form { display: flex; flex-direction: column; gap: 24px; }
.dt-fieldset { display: flex; flex-direction: column; gap: inherit; min-width: 0; margin: 0; padding: 0; border: 0; }
.dt-field { display: flex; flex-direction: column; gap: 6px; font-size: 13px; line-height: 20px; min-width: 0; }
.dt-field small { color: var(--dsw-alias-label-caption); font-size: 12px; }
.dt-textarea { box-sizing: border-box; width: 100%; min-width: 0; border: 0.5px solid var(--dsw-alias-border-l3); border-radius: 10px; padding: 8px 12px; font: inherit; font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1, transparent); resize: vertical; }
.dt-select { box-sizing: border-box; width: 100%; min-width: 0; height: 32px; border: 0.5px solid var(--dsw-alias-border-l4); border-radius: 8px; padding: 0 28px 0 8px; text-overflow: ellipsis; font: inherit; font-size: 14px; line-height: 22px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1, transparent); }
.dt-textarea:focus-visible, .dt-select:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.dt-mono { font-family: var(--ds-font-family-code, Menlo, monospace); font-size: 12px; overflow-wrap: anywhere; }
.dt-detail { margin-top: 2px; color: var(--dsw-alias-label-secondary); }
.dt-savebar .dt-error { white-space: pre-line; }
.dt-switch-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 36px; font-size: 13px; }
.dt-subhead-actions { display: inline-flex; align-items: center; gap: 4px; }
.dt-btn-busy .dt-btn-icon svg { animation: dt-spin 1s linear infinite; }
.dt-subhead { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary); }
.dt-rules, .dt-changes { list-style: none; margin: 0; padding: 0; }
.dt-field-head { display: inline-flex; align-items: center; gap: 4px; color: var(--dsw-alias-label-secondary); }
.dt-info { display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; padding: 0; border: 0; background: none; color: var(--dsw-alias-label-caption); cursor: help; }
.dt-info:hover, .dt-info:focus-visible { color: var(--dsw-alias-label-secondary); }
.dt-info:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; border-radius: 50%; }
.dt-tooltip { position: fixed; z-index: 1100; width: max-content; max-width: min(320px, calc(100vw - 24px)); padding: 3px 7px; border-radius: 8px; background: var(--dsw-alias-tooltip-bg); color: var(--dsw-static-neutral-bluish-00); font-size: 13px; line-height: 20px; overflow-wrap: break-word; pointer-events: none; animation: dt-tooltip-in 150ms ease-in-out; }
@keyframes dt-tooltip-in { from { opacity: 0; } }
.dt-rules { border-top: 0.5px solid var(--dsw-alias-border-l2); }
.dt-rule { display: flex; align-items: flex-start; gap: 12px; padding: 6px 0; border-bottom: 0.5px solid var(--dsw-alias-border-l2); }
.dt-rule > :first-child { flex: 1; min-width: 0; }
.dt-rule-preview { flex: 1; min-width: 0; margin-left: 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; color: var(--dsw-alias-label-caption); }
.dt-rule-switch { margin-top: 2px; flex: none; }
.dt-rule-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--dsw-alias-label-caption); }
.dt-rule-dot[data-enabled] { background: var(--dsw-alias-brand-primary); }
.dt-rule-body { display: flex; flex-direction: column; gap: 12px; padding: 8px 0 8px 28px; }
.dt-model { display: flex; flex-direction: column; gap: 6px; }
.dt-grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.dt-changes { display: flex; flex-direction: column; gap: 2px; font-size: 13px; line-height: 20px; }
.dt-changes li::before { content: '\xB7 '; color: var(--dsw-alias-label-caption); }
.dt-main { display: flex; flex-direction: column; gap: 24px; min-width: 0; }
.dt-modal.dt-glossary-modal { width: min(680px, 100%); }
.dt-nav-item { display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; min-height: 32px; padding: 6px 10px; border: 0; border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 13px; line-height: 20px; text-align: left; cursor: pointer; }
.dt-nav-item:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dt-nav-item[aria-current='true'] { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); font-weight: 500; }
.dt-nav-item:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: -2px; }
.dt-changed-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--dsw-alias-brand-primary); flex: none; }
.dt-add-skill { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; padding-top: 8px; border-top: 0.5px solid var(--dsw-alias-border-l2); }
.dt-prompt-main { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.dt-editor { min-height: 360px; }
.dt-inline-select { width: auto; }
.dt-preview-part { display: flex; flex-direction: column; gap: 6px; padding: 2px 0 2px 12px; border-left: 2px solid var(--dsw-alias-border-l3); }
.dt-preview-head { font-size: 13px; line-height: 20px; display: flex; align-items: baseline; gap: 8px; }
div.dt-preview-head { color: var(--dsw-alias-label-secondary); }
.dt-card { display: flex; flex-direction: column; gap: 12px; padding: 16px; border: 0.5px solid var(--dsw-alias-border-l3); border-radius: 16px; min-width: 0; }
.dt-card-head { display: flex; align-items: center; gap: 12px; min-height: 28px; }
.dt-card-head .dt-row-main { flex: 1 1 0; min-width: 64px; }
.dt-card-title { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dt-row-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; font-weight: 500; }
.dt-rows { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.dt-rows-item { display: grid; grid-template-columns: repeat(var(--dt-columns), minmax(0, 1fr)) auto; gap: 8px; align-items: center; }
.dt-filter-gap { flex: 1; }
.dt-page-head { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
.dt-page-head > .dt-btn { margin-left: -10px; }
.dt-page-title { display: flex; align-items: center; gap: 8px 16px; flex-wrap: wrap; width: 100%; }
.dt-page-title h2 { margin: 0; flex: 1 1 auto; min-width: 0; font-size: 20px; line-height: 28px; font-weight: 500; overflow-wrap: anywhere; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.dt-status-line { margin-top: -16px; }
.dt-plain-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; font-size: 13px; line-height: 20px; }
.dt-details { display: flex; flex-direction: column; gap: 2px; border-top: 0.5px solid var(--dsw-alias-border-l2); padding-top: 8px; }
.dt-danger-zone { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 16px; border-top: 0.5px solid var(--dsw-alias-border-l2); }
.dt-danger-zone .dt-btn { color: var(--dsw-alias-state-error-primary); }
.dt-md { display: flex; flex-direction: column; gap: 6px; font-size: 13px; line-height: 20px; overflow-wrap: anywhere; }
.dt-md p, .dt-md ul, .dt-md ol { margin: 0; }
.dt-md ul, .dt-md ol { padding-left: 20px; display: flex; flex-direction: column; gap: 2px; }
.dt-md-heading { font-weight: 500; }
.dt-code { font-family: var(--ds-font-family-code, Menlo, monospace); font-size: 12px; padding: 0 4px; border-radius: 4px; background: var(--dsw-alias-bg-module-platform); }
.dt-dot-wrap { display: inline-flex; flex: none; }
.dt-search-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.dt-ellipsis { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 280px; }
.dt-legend-title { margin: 16px 0 6px; font-size: 13px; color: var(--dsw-alias-label-tertiary); }
.dt-legend { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 13px; }
.dt-legend li { display: flex; align-items: center; gap: 6px; }
.dt-legend .dt-dot { margin-top: 0; }
.dt-savebar { position: sticky; bottom: 0; z-index: 2; display: flex; align-items: center; justify-content: flex-end; gap: 8px; flex-wrap: wrap; padding: 12px 0; background: var(--dsw-alias-bg-base, var(--dsw-alias-bg-layer-1)); border-top: 0.5px solid var(--dsw-alias-border-l2); }
.dt-savebar .dt-hint { margin-right: auto; }
.dt-card > .dt-savebar, .dt-block > .dt-savebar { margin: 0 -16px -16px; padding: 12px 16px; border-radius: 0 0 16px 16px; }
.dt-glossary { width: 100%; border-collapse: collapse; font-size: 13px; line-height: 20px; }
.dt-glossary th, .dt-glossary td { text-align: left; padding: 6px 8px; border-bottom: 0.5px solid var(--dsw-alias-border-l2); vertical-align: top; }
.dt-glossary th { color: var(--dsw-alias-label-tertiary); font-weight: 400; }
.dt-glossary th.dt-glossary-group { color: var(--dsw-alias-label-secondary); font-weight: 600; padding-top: 14px; }
.dt-glossary th:nth-child(-n+2), .dt-glossary td:nth-child(-n+2) { white-space: nowrap; }
.dt-values { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; margin: 16px 0 0; font-size: 13px; }
.dt-values dt { color: var(--dsw-alias-label-tertiary); }
.dt-values dd { margin: 0; }
.dt-pre { margin: 0; padding: 12px; border-radius: 10px; background: var(--dsw-alias-bg-module-platform); font-family: var(--ds-font-family-code, Menlo, monospace); font-size: 12px; line-height: 18px; white-space: pre-wrap; overflow-wrap: anywhere; max-height: 480px; overflow: auto; }
.dt-pre ins { background: color-mix(in srgb, var(--dsw-alias-state-success-primary, green) 18%, transparent); text-decoration: none; }
.dt-pre del { background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 18%, transparent); text-decoration: none; }
.dt-prompt { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 20px; align-items: start; }
.dt-prompt-nav { display: flex; flex-direction: column; gap: 2px; }
.dt-prompt-nav button { justify-content: flex-start; }
.dt-disclosure-body { padding: 8px 0 8px 28px; display: flex; flex-direction: column; gap: 8px; }
@container (max-width: 640px) {
  .dt-tab { padding: 0 8px; font-size: 13px; }
  .dt-segment { padding: 0 10px; }
  .dt-head { align-items: center; }
  .dt-search-results { right: auto; left: 0; width: 100%; }
  .dt-page-title h2 { font-size: 17px; line-height: 24px; }
  .dt-status-line { margin-top: -12px; }
  .dt-page .dt-tabs { display: flex; flex-wrap: nowrap; scrollbar-width: thin; }
  .dt-page .dt-tab { flex: none; }
  .dt-page .dt-tabs[data-more='end'] { mask-image: linear-gradient(to right, #000 calc(100% - 40px), transparent); }
  .dt-page .dt-tabs[data-more='start'] { mask-image: linear-gradient(to right, transparent, #000 40px); }
  .dt-page .dt-tabs[data-more='both'] { mask-image: linear-gradient(to right, transparent, #000 40px, #000 calc(100% - 40px), transparent); }
  .dt-kv { grid-template-columns: 1fr; gap: 2px; }
  .dt-grid3, .dt-prompt { grid-template-columns: 1fr; }
  .dt-search { width: 100%; }
  .dt-filters .dt-search { margin-left: 0; }
}
/* Local UI primitive styles (see controls.tsx). */
.dt-btn { display: inline-flex; align-items: center; justify-content: center; gap: 4px; border: none; border-radius: 18px; cursor: pointer; font: inherit; font-size: 14px; line-height: 22px; color: var(--dsw-alias-label-primary); background: transparent; padding: 0 14px; white-space: nowrap; }
.dt-btn:disabled { cursor: not-allowed; opacity: 0.4; }
.dt-btn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.dt-btn-md { height: 36px; }
.dt-btn-sm { height: 28px; font-size: 12px; line-height: 18px; padding: 0 10px; border-radius: 14px; }
.dt-btn-primary { background: var(--dsw-alias-button-primary-fill); color: var(--dsw-alias-label-primary-foreground); }
.dt-btn-primary:hover:not(:disabled) { background: var(--dsw-alias-button-primary-hover); }
.dt-btn-ghost:hover:not(:disabled), .dt-btn-outline:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover); }
.dt-btn-ghost:active:not(:disabled) { background: var(--dsw-alias-interactive-bg-active); }
.dt-btn-outline { border: 0.5px solid var(--dsw-alias-border-l3); }
.dt-btn-icon { display: inline-flex; width: 16px; height: 16px; align-items: center; justify-content: center; }
.dt-tag { display: inline-flex; align-items: center; border-radius: 999px; padding: 1px 8px; font-size: 11px; line-height: 17px; font-weight: 500; white-space: nowrap; }
.dt-tag[data-tone='outline'] { border: 0.5px solid var(--dsw-alias-border-l4); color: var(--dsw-alias-label-tertiary); }
.dt-tag[data-tone='neutral'] { background: var(--dsw-alias-bg-module-platform); color: var(--dsw-alias-label-secondary); }
.dt-tag[data-tone='quiet'] { color: var(--dsw-alias-label-tertiary); }
.dt-tag[data-tone='success'] { background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent); color: var(--dsw-alias-state-success-primary); }
.dt-tag[data-tone='info'] { background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent); color: var(--dsw-alias-state-business-primary); }
.dt-tag[data-tone='warning'] { background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 12%, transparent); color: var(--dsw-alias-state-warn-primary); }
.dt-tag[data-tone='danger'] { background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent); color: var(--dsw-alias-state-error-primary); }
.dt-choice-row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 4px 2px; }
.dt-field-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
.dt-pill { display: inline-flex; align-items: center; justify-content: center; gap: 4px; height: 28px; padding: 0 12px; border: 1px solid var(--dsw-alias-border-l3, rgba(128, 128, 128, 0.18)); border-radius: 999px; font: inherit; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-2); cursor: pointer; transform: scale(1); transform-origin: center center; transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, color 180ms ease; }
.dt-pill:hover { background: var(--dsw-alias-interactive-bg-hover); transform: scale(1.03); }
.dt-pill-active, .dt-pill-active:hover { color: var(--dsw-alias-label-primary); font-weight: 600; background: var(--dsw-alias-bg-layer-1, #ffffff); border-color: var(--dsw-alias-border-l3, rgba(128, 128, 128, 0.22)); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10); transform: scale(1.08); z-index: 1; }
.dt-tabs { display: grid; padding: 4px; border-radius: 12px; background: var(--dsw-alias-bg-module-platform); }
.dt-tab { box-sizing: border-box; height: 34px; padding: 0 12px; border: 0.5px solid transparent; border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 14px; line-height: 20px; white-space: nowrap; cursor: pointer; transition: color 180ms ease, background 180ms ease; }
.dt-tab:hover { color: var(--dsw-alias-label-primary); }
.dt-tab[aria-selected='true'] { color: var(--dsw-alias-label-primary); font-weight: 600; background: var(--dsw-alias-bg-layer-3); border-color: var(--dsw-alias-border-l3); }
.dt-tab:focus-visible { outline: none; text-decoration: underline; text-underline-offset: 4px; }
.dt-segment { height: 28px; padding: 0 16px; border: 0; border-radius: 7px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 13px; line-height: 20px; font-weight: 500; white-space: nowrap; cursor: pointer; transition: color 120ms ease, background 160ms ease; }
.dt-segment:hover:not(:disabled), .dt-segment[aria-selected='true'] { color: var(--dsw-alias-label-primary); }
.dt-segment[aria-selected='true'] { background: var(--dsw-alias-bg-layer-1); box-shadow: var(--dsw-elevation-soft); }
.dt-segment:disabled { cursor: default; opacity: 0.4; }
.dt-segment:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: -2px; }
.dt-input { box-sizing: border-box; display: inline-flex; align-items: center; gap: 6px; height: 32px; min-width: 0; padding: 0 8px; border: 0.5px solid var(--dsw-alias-border-l4); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); }
.dt-input:focus-within { border-color: var(--dsw-alias-brand-primary); }
.dt-input-icon { display: inline-flex; width: 16px; height: 16px; align-items: center; justify-content: center; color: var(--dsw-alias-label-tertiary); }
.dt-input input { flex: 1; min-width: 0; border: none; outline: none; background: transparent; font: inherit; font-size: 14px; line-height: 22px; color: var(--dsw-alias-label-primary); }
.dt-input input::placeholder { color: var(--dsw-alias-label-dimmed); }
.dt-input input::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }
.dt-field .dt-input, .dt-search .dt-input, .dt-add-skill .dt-input { display: flex; width: 100%; }
.dt-switch { box-sizing: border-box; flex: 0 0 auto; width: 36px; height: 20px; padding: 2px; border: 0; border-radius: 10px; background: var(--dsw-alias-border-l3); cursor: pointer; }
.dt-switch[aria-checked='true'] { background: var(--dsw-alias-brand-primary); }
.dt-switch:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.dt-switch-thumb { display: block; width: 16px; height: 16px; border-radius: 50%; background: var(--dsw-alias-label-primary-foreground); transition: transform 120ms ease; }
.dt-switch[aria-checked='true'] .dt-switch-thumb { transform: translateX(16px); }
.dt-state-dot { position: relative; display: inline-block; flex: none; width: 10px; height: 10px; color: var(--dsw-alias-state-idle-primary); }
.dt-state-dot::after { content: ''; position: absolute; inset: 20%; border-radius: 50%; background: currentColor; }
.dt-state-dot[data-state='done'] { color: var(--dsw-alias-state-success-primary); }
.dt-state-dot[data-state='warning'] { color: var(--dsw-alias-state-warn-primary); }
.dt-state-dot[data-state='error'] { color: var(--dsw-alias-state-error-primary); }
.dt-spinner { flex: none; color: var(--dsw-alias-label-tertiary); }
.dt-spinner g { transform-origin: center; animation: dt-spin 1.5s linear infinite; }
.dt-spinner circle { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.dt-spinner circle:first-child { opacity: 0.25; }
.dt-spinner circle:last-child { stroke-dasharray: 18 150; }
@keyframes dt-spin { to { transform: rotate(360deg); } }
.dt-disclosure-row { display: flex; align-items: center; gap: 4px; min-height: 28px; min-width: 0; border-radius: 8px; cursor: pointer; font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary); }
.dt-disclosure-row:hover { color: var(--dsw-alias-label-primary); }
.dt-disclosure-row:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.dt-disclosure-lead { position: relative; display: inline-flex; flex: none; width: 24px; height: 24px; align-items: center; justify-content: center; }
.dt-disclosure-icon { display: inline-flex; align-items: center; justify-content: center; }
.dt-disclosure-chevron { position: absolute; inset: 0; display: none; align-items: center; justify-content: center; }
.dt-disclosure-row:hover .dt-disclosure-icon, .dt-disclosure[data-open] .dt-disclosure-icon { visibility: hidden; }
.dt-disclosure-row:hover .dt-disclosure-chevron, .dt-disclosure[data-open] .dt-disclosure-chevron { display: inline-flex; }
.dt-disclosure-title { flex: 0 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dt-modal-root { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: max(24px, var(--dsh-frame-top-clearance, 24px)) 24px; }
.dt-modal-mask { position: absolute; inset: 0; background: var(--dsw-alias-bg-mask-1); backdrop-filter: var(--dsw-mask-blur); }
.dt-modal { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 20px; width: min(380px, 100%); max-height: 100%; padding: 0 0 24px; overflow: hidden; border-radius: 24px; background: var(--dsw-alias-bg-layer-2); box-shadow: var(--dsw-elevation-prominent); color: var(--dsw-alias-label-primary); outline: none; }
.dt-modal-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 22px 14px 0 24px; }
.dt-modal-header h2 { margin: 0; font-size: 16px; line-height: 24px; font-weight: 500; }
.dt-modal-close { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; border-radius: 8px; background: transparent; cursor: pointer; color: var(--dsw-alias-label-secondary); }
.dt-modal-close:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dt-modal-description { margin: -8px 0 0; padding: 0 24px; font-size: 14px; line-height: 22px; }
.dt-modal-body { min-width: 0; min-height: 0; overflow: auto; padding: 0 24px; }
.dt-modal-footer { display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 0 24px; }
.dt-toast { position: fixed; top: 40px; left: 50%; z-index: 1100; pointer-events: none; width: max-content; max-width: min(640px, calc(100vw - 48px)); padding: 12px 16px; border-radius: 14px; background: var(--dsw-alias-toast-bg); color: var(--dsw-static-neutral-bluish-00); font-size: 14px; line-height: 22px; box-shadow: var(--dsw-shadow-lv3); transform: translateX(-50%); animation: dt-toast-in 160ms ease-out, dt-toast-fade 1000ms ease var(--dt-toast-hold, 3000ms) forwards; }
@keyframes dt-toast-in { from { opacity: 0; transform: translate(-50%, -6px); } to { opacity: 1; transform: translate(-50%, 0); } }
@keyframes dt-toast-fade { to { opacity: 0; visibility: hidden; } }
@media (prefers-reduced-motion: reduce) {
  .dt-tab, .dt-segment, .dt-switch-thumb, .dt-spinner g, .dt-btn-busy .dt-btn-icon svg, .dt-tooltip { transition: none; animation: none; }
  .dt-toast { animation: dt-toast-fade 1000ms ease var(--dt-toast-hold, 3000ms) forwards; }
}
.dt-page .dt-tab { height: 34px; padding: 0 2px; border: 0; border-radius: 0; color: var(--dsw-alias-label-tertiary); font-size: 14px; }
.dt-page .dt-tab[aria-selected='true'] { background: none; color: var(--dsw-alias-label-primary); font-weight: 500; box-shadow: inset 0 -1.5px 0 var(--dsw-alias-label-primary); }
.dt-status-head { display: flex; align-items: center; gap: 8px; }
.dt-status-title { margin: 0; flex: 1; display: flex; align-items: center; gap: 4px; font-size: 15px; line-height: 22px; font-weight: 600; }
.dt-status-text { margin-left: auto; flex: none; font-size: 12px; font-weight: 400; color: var(--dsw-alias-label-secondary); }
.dt-status-line .dt-status-text { margin-left: 0; }
.dt-status-text[data-state='warning'] { color: var(--dsw-alias-state-warn-primary); }
.dt-status-text[data-state='error'] { color: var(--dsw-alias-state-error-primary); }
.dt-row-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.dt-lv { white-space: nowrap; }
.dt-lv-label { color: var(--dsw-alias-label-caption); }
.dt-lv-value { color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
.dt-chip { display: inline-flex; flex-wrap: wrap; max-width: 100%; border: 0.5px solid var(--dsw-alias-border-l3); border-radius: 6px; overflow: hidden; font-size: 11px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.dt-chip-source { padding: 0 6px; color: var(--dsw-alias-label-tertiary); background: var(--dsw-alias-bg-module-platform); }
.dt-chip-fact { padding: 0 6px; border-left: 0.5px solid var(--dsw-alias-border-l3); white-space: nowrap; }
.dt-chip-label { margin-right: 4px; color: var(--dsw-alias-label-caption); }
.dt-chip-link { position: relative; z-index: 1; text-decoration: none; cursor: pointer; transition: border-color 120ms ease; }
.dt-chip-link:hover { border-color: var(--dsw-alias-brand-primary); }
.dt-chip-link:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.dt-chip-open { display: inline-flex; align-items: center; padding: 0 5px; border-left: 0.5px solid var(--dsw-alias-border-l3); color: var(--dsw-alias-brand-primary); }
.dt-chip-problem, .dt-chip-problem .dt-chip-label { color: var(--dsw-alias-state-error-primary); }
.dt-cards { gap: 8px; }
.dt-att .dt-inline-link { font-size: 13px; font-weight: 500; }
.dt-list > .dt-att { margin: 2px 8px; }
.dt-att { padding: 10px 12px 10px 16px; border: 0; border-radius: 0; border-bottom: 0.5px solid var(--dsw-alias-border-l3); }
.dt-att::before { content: ''; position: absolute; left: 6px; top: 10px; bottom: 10px; width: 2px; border-radius: 1px; background: var(--dsw-alias-state-warn-primary); opacity: 0.7; }
.dt-att-error::before { background: var(--dsw-alias-state-error-primary); }
.dt-att-what { font-size: 12px; line-height: 18px; font-weight: 500; color: var(--dsw-alias-state-warn-primary); }
.dt-att-error .dt-att-what, .dt-att-error .dt-att-what .dt-open { color: var(--dsw-alias-state-error-primary); }
.dt-stats { display: flex; flex-wrap: wrap; gap: 6px 20px; }
.dt-stat { display: inline-flex; align-items: baseline; gap: 6px; font-size: 12px; color: var(--dsw-alias-label-caption); }
.dt-stat-value { font-size: 14px; font-weight: 500; color: var(--dsw-alias-label-primary); font-variant-numeric: tabular-nums; }
.dt-more-link { font-size: 12px; font-weight: 400; }
.dt-settings { display: grid; grid-template-columns: 156px minmax(0, 1fr); gap: 24px; align-items: start; }
.dt-settings-nav { position: sticky; top: 0; display: flex; flex-direction: column; gap: 2px; padding: 6px; border-radius: 12px; background: rgba(15, 23, 42, 0.025); border: 1px solid rgba(15, 23, 42, 0.055); box-sizing: border-box; }
body[data-ds-dark-theme] .dt-settings-nav { background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.07); }
.dt-settings-link { display: flex; align-items: center; min-height: 28px; padding: 4px 10px; margin: 0 !important; border: 0; border-radius: 7px; background: none; color: var(--dsw-alias-label-secondary, #475569); font: inherit; font-size: 13px; line-height: 18px; text-align: left; cursor: pointer; transition: background-color 140ms ease, color 140ms ease, box-shadow 140ms ease; }
.dt-settings-link:hover { color: var(--dsw-alias-label-primary, #1e293b); background: rgba(15, 23, 42, 0.04); }
body[data-ds-dark-theme] .dt-settings-link:hover { background: rgba(255, 255, 255, 0.06); }
.dt-settings-link[aria-current='page'] { background: #ffffff; color: var(--dsw-alias-label-primary, #0f172a); font-weight: 600; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06), 0 0 0 0.5px rgba(15, 23, 42, 0.08); }
body[data-ds-dark-theme] .dt-settings-link[aria-current='page'] { background: rgba(255, 255, 255, 0.10); color: #f8fafc; box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.14); }
.dt-settings-link[data-stage] + .dt-settings-link:not([data-stage]) { margin-top: 0 !important; }
.dt-settings-mcp-crumbs { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; padding: 6px 2px 2px; border-top: 1px solid rgba(15, 23, 42, 0.06); width: 100%; box-sizing: border-box; }
body[data-ds-dark-theme] .dt-settings-mcp-crumbs { border-top-color: rgba(255, 255, 255, 0.08); }
.dt-settings-mcp-crumb { appearance: none; display: flex; align-items: center; gap: 6px; width: 100%; min-height: 26px; padding: 4px 8px; margin: 0; border: 0; border-radius: 6px; background: transparent; font: inherit; font-size: 12px; line-height: 1.35; color: var(--dsw-alias-label-secondary, #475569); text-align: left; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; box-sizing: border-box; transition: background-color 140ms ease, color 140ms ease; }
.dt-settings-mcp-crumb:hover { background: rgba(15, 23, 42, 0.055); color: var(--dsw-alias-label-primary, #0f172a); }
.dt-settings-mcp-crumb[data-active='true'] { background: rgba(77, 107, 254, 0.08); color: var(--dsw-alias-label-primary, #0f172a); font-weight: 500; }
body[data-ds-dark-theme] .dt-settings-mcp-crumb:hover { background: rgba(255, 255, 255, 0.08); color: #f8fafc; }
body[data-ds-dark-theme] .dt-settings-mcp-crumb[data-active='true'] { background: rgba(255, 255, 255, 0.10); color: #f8fafc; }
.dt-settings-mcp-crumb-text { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dt-settings-mcp-crumb .dt-settings-mcp-dot { width: 7px; height: 7px; border-radius: 999px; background: var(--dsw-alias-label-tertiary, #94a3b8); flex: 0 0 7px; }
.dt-settings-mcp-crumb[data-state='ready'] .dt-settings-mcp-dot { background: #22c55e; }
.dt-settings-mcp-crumb[data-state='standby'] .dt-settings-mcp-dot { background: #eab308; }
.dt-settings-mcp-crumb[data-state='error'] .dt-settings-mcp-dot { background: #ef4444; }
.dt-settings-mcp-crumb[data-state='disabled'] .dt-settings-mcp-dot { background: #9ca3af; }
.dt-settings-body { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.dt-settings-title { margin: 0; font-size: 15px; line-height: 22px; font-weight: 600; }
.dt-subtabs { display: flex; gap: 16px; border-bottom: 0.5px solid var(--dsw-alias-border-l3); }
.dt-subtab { padding: 0 0 6px; border: 0; background: none; color: var(--dsw-alias-label-tertiary); font: inherit; font-size: 13px; cursor: pointer; }
.dt-subtab[aria-selected='true'] { color: var(--dsw-alias-label-primary); font-weight: 500; box-shadow: inset 0 -1.5px 0 var(--dsw-alias-label-primary); }
.dt-part { display: flex; flex-direction: column; gap: 12px; }
.dt-rows-summary { text-align: left; color: var(--dsw-alias-label-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
.dt-table { width: 100%; border-collapse: collapse; font-size: 12px; line-height: 18px; }
.dt-table th { text-align: left; font-weight: 400; color: var(--dsw-alias-label-caption); padding: 2px 8px 2px 0; }
.dt-table td { padding: 4px 8px 4px 0; border-top: 0.5px solid var(--dsw-alias-border-l3); vertical-align: top; color: var(--dsw-alias-label-secondary); overflow-wrap: anywhere; }
@container (max-width: 640px) {
  .dt-settings { grid-template-columns: 1fr; gap: 12px; }
  .dt-settings-nav { position: static; flex-direction: row; flex-wrap: wrap; }
  .dt-settings-link[data-stage] + .dt-settings-link:not([data-stage]) { margin-top: 0; }
  .dt-page .dt-tabs { gap: 14px; }
}
.dt-list > .dt-ticket { display: grid; grid-template-columns: 112px minmax(0, 1fr); column-gap: 12px; align-items: start; margin: 0; padding: 12px 8px 12px 18px; border-radius: 0; border-bottom: 0.5px solid var(--dsw-alias-border-l3); }
.dt-list > .dt-ticket[data-state]::before { content: ''; position: absolute; left: 6px; top: 12px; bottom: 12px; width: 2px; border-radius: 1px; background: var(--dsw-alias-state-warn-primary); opacity: 0.7; }
.dt-list > .dt-ticket[data-state='error']::before { background: var(--dsw-alias-state-error-primary); }
.dt-ticket-stage { align-self: stretch; padding-top: 1px; border-right: 0.5px solid var(--dsw-alias-border-l3); }
.dt-ticket-body { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.dt-ticket-body .dt-row-title .dt-open { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dt-ticket-meta { flex-wrap: nowrap; overflow: hidden; white-space: nowrap; }
.dt-ticket-meta .dt-chip { flex: none; }
.dt-ticket-note { min-width: 0; overflow: hidden; text-overflow: ellipsis; color: var(--dsw-alias-label-primary); }
.dt-ticket-note-error { color: var(--dsw-alias-state-error-primary); }
.dt-ticket-actions { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: 8px; min-height: 30px; margin-top: 2px; }
/* Pass pointer events through action containers to the row link, keeping only child controls interactive. */
.dt-ticket-actions, .dt-row-buttons, .dt-row-actions { pointer-events: none; }
.dt-ticket-actions > *, .dt-row-buttons > *, .dt-row-actions > * { pointer-events: auto; }
.dt-line { min-height: 20px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dt-row-meta.dt-line { flex-wrap: nowrap; }
.dt-line-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dt-error-text { color: var(--dsw-alias-state-error-primary); }
.dt-stage { display: inline-flex; align-items: flex-start; gap: 5px; font-size: 12px; line-height: 18px; font-weight: 500; color: var(--dsw-alias-label-secondary); }
.dt-stage svg { flex: none; margin-top: 2px; }
.dt-stage[data-state='warning'] { color: var(--dsw-alias-state-warn-primary); }
.dt-stage[data-state='error'] { color: var(--dsw-alias-state-error-primary); }
.dt-stage[data-state='ongoing'] { color: var(--dsw-alias-state-business-primary); }
.dt-icon-link { display: inline-flex; align-items: center; gap: 4px; }
a.dt-btn, a.dt-btn:hover { text-decoration: none; }
.dt-section-icon { display: inline-flex; align-self: center; color: var(--dsw-alias-label-tertiary); }
.dt-trigger-link { display: flex; flex-direction: column; gap: 2px; width: 100%; margin: -4px 0 -4px -8px; padding: 4px 8px; border: 0; border-radius: 8px; background: none; font: inherit; color: inherit; text-align: left; cursor: pointer; }
.dt-trigger-link:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dt-trigger-link:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.dt-trigger-text { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.dt-kv-stack { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.dt-banner-actions { margin-top: 6px; }
@container (max-width: 640px) {
  .dt-list > .dt-ticket { grid-template-columns: 1fr; row-gap: 4px; }
  .dt-ticket-stage { border-right: 0; }
}
.dt-nav-group { margin: 10px 10px 2px; font-size: 12px; font-weight: 600; color: var(--dsw-alias-label-secondary); }
.dt-nav-group:first-child { margin-top: 0; }
.dt-prompt-nav .dt-nav-item { flex-direction: column; align-items: flex-start; gap: 2px; text-align: left; }
.dt-nav-item > span { display: inline-flex; align-items: center; gap: 6px; }
.dt-nav-item small { font-size: 12px; line-height: 18px; font-weight: 400; color: var(--dsw-alias-label-caption); }
.dt-preview-part[data-editable] { border-left-color: var(--dsw-alias-brand-primary); }
.dt-preview-head b { font-weight: 500; }
.dt-preview-head > span { font-size: 12px; color: var(--dsw-alias-label-caption); }
.dt-changed-tag { margin-left: 6px; padding: 0 5px; border: 0.5px solid var(--dsw-alias-border-l3); border-radius: 4px; font-size: 11px; line-height: 16px; font-weight: 400; color: var(--dsw-alias-label-secondary); }
.dt-updated-tag { border-color: var(--dsw-alias-state-warn-primary); color: var(--dsw-alias-state-warn-primary); }
.dt-default-updated { display: flex; flex-direction: column; gap: 6px; padding: 2px 0 2px 12px; border-left: 2px solid var(--dsw-alias-state-warn-primary); }
.dt-diff-fold { color: var(--dsw-alias-label-caption); font-style: italic; }
.dt-compare { margin-left: auto; }
.dt-admission th { white-space: nowrap; }
.dt-admission thead tr:first-child th:not(:first-child) { color: var(--dsw-alias-label-secondary); font-weight: 500; }
.dt-admission td { vertical-align: middle; }
.dt-admission-scope { color: var(--dsw-alias-label-primary); font-size: 13px; }
.dt-admission-scope small { display: block; font-size: 11px; color: var(--dsw-alias-label-caption); }
.dt-admission-na { color: var(--dsw-alias-label-caption); }
.dt-admission-cell { display: flex; align-items: center; gap: 4px; }
.dt-admission-cell .dt-select { flex: 1; min-width: 0; }
.dt-admission-slot { display: inline-flex; flex: none; width: 16px; }
.dt-info-warn { color: var(--dsw-alias-state-warn-primary); }
.dt-field-segmented { max-width: 240px; }

.dt-btn-label, .dt-pill-label { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 4px; }
.dt-mcp-layout { display: flex; flex-direction: column; gap: 18px; }
.dt-mcp-intro { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(15, 23, 42, 0.07); }
body[data-ds-dark-theme] .dt-mcp-intro { border-bottom-color: rgba(255, 255, 255, 0.08); }
.dt-mcp-intro-text { display: flex; flex-direction: column; gap: 2px; }
.dt-mcp-zone { display: flex; flex-direction: column; gap: 10px; }
.dt-mcp-zone-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; padding: 0 2px; }
.dt-mcp-zone-title-wrap { display: inline-flex; align-items: center; gap: 8px; }
.dt-mcp-step-num { display: inline-flex; align-items: center; justify-content: center; height: 20px; min-width: 24px; padding: 0 7px; border-radius: 999px; font-size: 11px; font-weight: 600; font-variant-numeric: tabular-nums; background: rgba(77, 107, 254, 0.08); color: #3b5bdb; border: 1px solid rgba(77, 107, 254, 0.16); }
body[data-ds-dark-theme] .dt-mcp-step-num { background: rgba(255, 255, 255, 0.08); color: #cbd5e1; border-color: rgba(255, 255, 255, 0.14); }
.dt-mcp-zone-title { margin: 0; font-size: 14px; line-height: 20px; font-weight: 600; color: var(--dsw-alias-label-primary, #0f172a); }
.dt-mcp-zone-sub { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary, #64748b); }
.dt-mcp-add-bar { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 8px; }

/* Installed MCP Card — Clean, Airy Light Surface */
.dt-mcp-installed-card { position: relative; display: flex; flex-direction: column; gap: 12px; padding: 16px 18px; border-radius: 16px; border: 1px solid rgba(15, 23, 42, 0.08); background-color: #ffffff; background-image: none; box-shadow: 0 2px 8px -2px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02); transition: border-color 160ms ease, box-shadow 160ms ease, opacity 160ms ease; }
.dt-mcp-installed-card[data-focused='true'] { border-color: rgba(77, 107, 254, 0.45); box-shadow: 0 0 0 3px rgba(77, 107, 254, 0.10), 0 4px 12px -2px rgba(15, 23, 42, 0.06); }
body[data-ds-dark-theme] .dt-mcp-installed-card { background-color: var(--dsw-alias-bg-layer-2, #252a3c); border-color: rgba(255, 255, 255, 0.09); box-shadow: 0 4px 14px -4px rgba(0, 0, 0, 0.24); }
.dt-mcp-installed-card[data-enabled='false'] { opacity: 0.78; }
.dt-mcp-server-top { display: flex; align-items: center; justify-content: space-between; gap: 8px 10px; flex-wrap: wrap; }
.dt-mcp-server-main { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1 1 auto; cursor: pointer; border-radius: 10px; padding: 2px 4px; margin: -2px -4px; transition: background-color 140ms ease; }
.dt-mcp-server-main:hover { background-color: rgba(15, 23, 42, 0.025); }
body[data-ds-dark-theme] .dt-mcp-server-main:hover { background-color: rgba(255, 255, 255, 0.04); }
.dt-mcp-pkg-icon { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; flex: none; width: 34px; height: 34px; border-radius: 10px; background-color: #f8fafc; color: #334155; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03); }
body[data-ds-dark-theme] .dt-mcp-pkg-icon { background-color: #333a52; border-color: rgba(255, 255, 255, 0.12); color: #f8fafc; }
.dt-mcp-server-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.dt-mcp-server-title-row { display: flex; align-items: center; gap: 6px; flex-wrap: nowrap; }
.dt-mcp-server-name { margin: 0; font-size: 14px; line-height: 20px; font-weight: 600; color: var(--dsw-alias-label-primary, #0f172a); white-space: nowrap; }
.dt-mcp-badge-installed, .dt-mcp-badge-neutral { display: inline-flex; align-items: center; gap: 4px; height: 19px; padding: 0 7px; border-radius: 999px; font-size: 10.5px; font-weight: 500; white-space: nowrap; flex: none; background: #f1f5f9; color: #475569; border: 1px solid rgba(15, 23, 42, 0.07); }
body[data-ds-dark-theme] .dt-mcp-badge-installed, body[data-ds-dark-theme] .dt-mcp-badge-neutral { background: rgba(255, 255, 255, 0.08); color: #cbd5e1; border-color: rgba(255, 255, 255, 0.12); }
.dt-mcp-status-caption { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; line-height: 16px; color: var(--dsw-alias-label-tertiary, #64748b); font-weight: 400; white-space: nowrap; }
.dt-mcp-status-caption b { font-weight: 500; color: var(--dsw-alias-label-secondary, #475569); }
.dt-mcp-server-desc { flex: 1 1 100%; margin: 2px 0 0; font-size: 12.5px; line-height: 19px; color: var(--dsw-alias-label-secondary, #475569); }
.dt-mcp-server-right { display: inline-flex; align-items: center; gap: 6px; flex: none; margin-left: auto; }
.dt-mcp-switch-group { display: inline-flex; align-items: center; gap: 5px; padding-left: 2px; }
.dt-mcp-switch-meta { display: flex; flex-direction: column; align-items: flex-end; line-height: 1.2; }
.dt-mcp-switch-state { font-size: 11px; font-weight: 600; color: var(--dsw-alias-label-primary, #0f172a); white-space: nowrap; }
.dt-mcp-switch-sub { font-size: 10px; color: var(--dsw-alias-label-tertiary, #64748b); white-space: nowrap; }

/* Clean, Calm Capsule Buttons (.dt-btn and .dt-pill inside .dt-mcp-layout) */
.dt-mcp-layout .dt-btn, .dt-mcp-layout .dt-pill { position: relative; overflow: hidden; border-radius: 9999px; height: 28px; padding: 0 11px; font-size: 12px; line-height: 18px; font-weight: 500; white-space: nowrap; background-color: #ffffff; background-image: none; border: 1px solid rgba(15, 23, 42, 0.11); box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04); color: var(--dsw-alias-label-primary, #1e293b); transform: scale(1); transition: background-color 140ms ease, border-color 140ms ease, box-shadow 140ms ease, color 140ms ease, transform 140ms ease; }
.dt-mcp-layout .dt-btn::before, .dt-mcp-layout .dt-pill::before { display: none; }
.dt-mcp-layout .dt-btn > *, .dt-mcp-layout .dt-pill > * { position: relative; z-index: 1; }
.dt-mcp-layout .dt-btn:hover:not(:disabled), .dt-mcp-layout .dt-pill:hover:not(:disabled) { background-color: #f8fafc; border-color: rgba(15, 23, 42, 0.18); box-shadow: 0 2px 5px rgba(15, 23, 42, 0.06); }
.dt-mcp-layout .dt-btn:active:not(:disabled), .dt-mcp-layout .dt-pill:active:not(:disabled) { transform: scale(0.98); background-color: #f1f5f9; }
.dt-mcp-layout .dt-btn.dt-btn-primary { background-color: #1e293b; border-color: #1e293b; color: #ffffff; }
.dt-mcp-layout .dt-btn.dt-btn-primary:hover:not(:disabled) { background-color: #0f172a; border-color: #0f172a; color: #ffffff; }

/* Inactive vs Active Pill inside MCP panel */
.dt-mcp-layout .dt-pill:not(.dt-pill-active) { background-color: #f8fafc; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: none; color: var(--dsw-alias-label-secondary, #475569); font-weight: 500; }
.dt-mcp-layout .dt-pill:not(.dt-pill-active):hover { background-color: #f1f5f9; color: var(--dsw-alias-label-primary, #0f172a); }
.dt-mcp-layout .dt-pill.dt-pill-active { background-color: #ffffff; border: 1.5px solid #3b5bdb; font-weight: 600; color: #1e293b; box-shadow: 0 1px 4px rgba(59, 91, 219, 0.12); transform: none; }

/* Dark Mode adaptation for MCP buttons */
body[data-ds-dark-theme] .dt-mcp-layout .dt-btn, body[data-ds-dark-theme] .dt-mcp-layout .dt-pill { background-color: #2e344a; border: 1px solid rgba(255, 255, 255, 0.10); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.20); color: #f1f5f9; }
body[data-ds-dark-theme] .dt-mcp-layout .dt-pill:not(.dt-pill-active) { background-color: #252a3c; border-color: rgba(255, 255, 255, 0.07); color: #94a3b8; }
body[data-ds-dark-theme] .dt-mcp-layout .dt-pill.dt-pill-active { background-color: #363d56; border-color: rgba(255, 255, 255, 0.22); color: #ffffff; }

.dt-mcp-meta-box { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 16px; padding: 10px 14px; border-radius: 12px; background: #f8fafc; border: 1px solid rgba(15, 23, 42, 0.06); }
body[data-ds-dark-theme] .dt-mcp-meta-box { background: rgba(255, 255, 255, 0.04); border-color: rgba(255, 255, 255, 0.08); }
.dt-mcp-meta-item { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary, #475569); }
.dt-mcp-meta-label { font-weight: 500; color: var(--dsw-alias-label-tertiary, #64748b); }
.dt-mcp-tools-wrap { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding-top: 2px; }
.dt-mcp-tool-chip { display: inline-flex; align-items: center; height: 22px; padding: 0 9px; border-radius: 999px; font-size: 11.5px; line-height: 18px; background: #f1f5f9; color: #475569; border: 1px solid rgba(15, 23, 42, 0.06); }
body[data-ds-dark-theme] .dt-mcp-tool-chip { background: rgba(255, 255, 255, 0.06); color: #cbd5e1; border-color: rgba(255, 255, 255, 0.10); }
.dt-mcp-drawer { display: flex; flex-direction: column; gap: 12px; padding-top: 12px; border-top: 1px solid rgba(15, 23, 42, 0.07); }
body[data-ds-dark-theme] .dt-mcp-drawer { border-top-color: rgba(255, 255, 255, 0.08); }
.dt-mcp-mode-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 10px; }
.dt-mcp-mode-card { position: relative; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; width: 100%; padding: 13px 14px; border-radius: 14px; border: 1px solid rgba(15, 23, 42, 0.08); background: #ffffff; color: var(--dsw-alias-label-primary, #0f172a); font: inherit; text-align: left; cursor: pointer; transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease; }
.dt-mcp-mode-card:hover { background: #f8fafc; border-color: rgba(15, 23, 42, 0.15); }
.dt-mcp-mode-card[data-active='true'] { background-color: #ffffff; background-image: none; border: 1.5px solid #3b5bdb; box-shadow: 0 2px 10px -2px rgba(59, 91, 219, 0.12); }
.dt-mcp-mode-card[data-active='true']::before { display: none; }
body[data-ds-dark-theme] .dt-mcp-mode-card { background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08); color: #f8fafc; }
body[data-ds-dark-theme] .dt-mcp-mode-card[data-active='true'] { background-color: #32384f; border-color: rgba(255, 255, 255, 0.22); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.24); }
.dt-mcp-mode-head, .dt-mcp-mode-desc { position: relative; z-index: 1; }
.dt-mcp-mode-head { display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%; }
.dt-mcp-mode-title-wrap { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; line-height: 19px; font-weight: 600; color: var(--dsw-alias-label-primary, #0f172a); white-space: nowrap; }
.dt-mcp-radio { display: inline-flex; align-items: center; justify-content: center; width: 15px; height: 15px; border-radius: 50%; border: 1.5px solid rgba(15, 23, 42, 0.28); flex: none; }
.dt-mcp-mode-card[data-active='true'] .dt-mcp-radio { border-color: #3b5bdb; background: #3b5bdb; box-shadow: inset 0 0 0 3px #ffffff; }
.dt-mcp-mode-desc { margin: 0; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary, #475569); padding-left: 22px; }
.dt-mcp-policy-box { display: flex; flex-direction: column; gap: 2px; padding: 6px 14px; border-radius: 14px; background: #ffffff; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 1px 3px rgba(15, 23, 42, 0.02); }
body[data-ds-dark-theme] .dt-mcp-policy-box { background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08); }
.dt-mcp-policy-box .dt-switch-row { padding: 8px 0; border-bottom: 1px solid rgba(15, 23, 42, 0.06); }
body[data-ds-dark-theme] .dt-mcp-policy-box .dt-switch-row { border-bottom-color: rgba(255, 255, 255, 0.07); }
.dt-mcp-policy-box .dt-switch-row:last-child { border-bottom: 0; }

body[data-dsh-theme-id="preset-1"] .dt-form.dt-block, body[data-dsh-theme-id="preset-2"] .dt-form.dt-block { background: #ffffff; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 2px 8px -2px rgba(15, 23, 42, 0.04); border-radius: 16px; }
body[data-ds-dark-theme][data-dsh-theme-id="preset-1"] .dt-form.dt-block { background: var(--dsw-alias-bg-layer-2); border-color: rgba(255, 255, 255, 0.09); box-shadow: var(--dsw-elevation-soft); }
`;

// ../../tmp/dsh-superagent-prototype/src/core/reasons.ts
var REASONS = {
  said: "{text}",
  timeout: "Assessment timed out",
  policyChanged: "Policy changed during assessment",
  noAdmissible: "No admissible trigger",
  startedTicket: "Already started ticket {ticket}",
  acceptedBefore: "Trigger {trigger} was accepted before",
  routed: "Routed to ticket {ticket}",
  explicitRouted: "Explicit request from an allowed sender routed by the orchestrator",
  humanStop: "Human asked to stop",
  legacyImport: "Imported from the pre-domain-model task record",
  forwarded: "Forwarded to the worker of the Ticket already on this Thread",
  senderNotMember: "The sender is not on the Source's list",
  retried: "Retried by a person",
  hostRestarted: "dsh-superagent restarted",
  stopUnknown: "Stop target is unknown or already ended",
  stopNotExplicit: "A stop needs an explicit request from a sender on the list",
  directionUnsettled: "Implementation intent or target direction is not established, or a product/design decision is still required",
  noRuleMatched: "No enabled admission rule matched",
  ignoredFromCard: "Ignored from its card, without a rule assessment",
  observed: "Observe mode: would accept ({text})"
};
function reasonText(reasons) {
  return [reasons ?? []].flat().map((reason) => {
    const template = REASONS[reason.code] ?? reason.code;
    const text2 = template.replace(/\{(\w+)\}/g, (match, name) => reason.values?.[name] ?? match);
    return reason.triggerId ? `${reason.triggerId}: ${text2}` : text2;
  }).join("; ");
}

// ../../tmp/dsh-superagent-prototype/src/client/text.ts
var errorText = (failure) => failure instanceof Error ? failure.message : String(failure);
var localized = (t, text2) => typeof text2 === "string" ? text2 : text2 ? text2[t("lang") === "en" ? "en" : "zh"] : "";
var actorName = (t, actor) => actor?.name ? localized(t, actor.name) : t("automatedNotice");
function valueLabel(t, group, key) {
  if (!key) return "";
  const name = `${group}.${key}`;
  const text2 = t(name);
  return text2 === name ? key : text2;
}
function reasonLabel(t, reason) {
  if (typeof reason === "string") return reason ? label(t, { code: reason }) : "";
  return [reason ?? []].flat().map((item) => label(t, item)).filter(Boolean).join("\uFF1B");
}
function label(t, reason) {
  const key = `reason.${reason.code}`;
  const text2 = reason.code === "said" ? reason.values?.text ?? "" : t(key, reason.values);
  if (reason.code !== "said" && text2 !== key) return text2;
  const written = reason.code === "said" ? text2 : reasonText({ ...reason, triggerId: void 0 });
  if (/^\w*Error\b/.test(written)) {
    const first = written.split("\n")[0];
    return first.length > 140 ? `${first.slice(0, 140)}\u2026` : first;
  }
  return written;
}
var setupText = (t, problem) => t(`setup.${problem.code}`, problem.values);
var healthText = (t, health) => health.code ? t(`healthCode.${health.code}`, health.values) : health.detail;
function readableMarkers(t, text2) {
  return text2.replace(/!\[[^\]]*\]\([^)]*\)|\[Image: [^\]]*\]|\[image\]/g, t("imageMarker")).replace(/\[Chat card: [^\]]*\]/g, t("cardMarker")).replace(/\[Media: [^\]]*\]/g, t("mediaMarker")).replace(/\[Merged forward\]/g, t("forwardMarker")).replace(/@_user_\d+/g, t("unknownMention"));
}
var timeLocale = (lang) => lang === "en" ? "en" : "zh-CN";
function when(value, lang) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const seconds = Math.round((date.getTime() - Date.now()) / 1e3);
  if (Math.abs(seconds) < 86400) {
    const relative = new Intl.RelativeTimeFormat(timeLocale(lang), { numeric: "auto" });
    if (Math.abs(seconds) < 60) return relative.format(0, "second");
    if (Math.abs(seconds) < 3600) return relative.format(Math.round(seconds / 60), "minute");
    return relative.format(Math.round(seconds / 3600), "hour");
  }
  const sameYear = date.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear();
  const year = sameYear ? {} : { year: "numeric" };
  return date.toLocaleString(timeLocale(lang), { ...year, month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function fullTime(value, lang) {
  const date = new Date(value ?? "");
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString(timeLocale(lang));
}

// ../../tmp/dsh-superagent-prototype/src/client/provider.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Panel = (0, import_react3.createContext)(void 0);
var PanelState = (0, import_react3.createContext)(void 0);
function usePanel() {
  const value = (0, import_react3.useContext)(Panel);
  if (!value) throw new Error("dsh-superagent page rendered outside its panel");
  return value;
}
function usePanelData() {
  const value = (0, import_react3.useContext)(PanelState);
  if (!value) throw new Error("dsh-superagent page rendered outside its panel");
  return value;
}
function useAction(action, { reload } = {}) {
  const { notify } = usePanel();
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const running = (0, import_react3.useRef)(false);
  const run = async (...args) => {
    if (running.current) return false;
    running.current = true;
    setBusy(true);
    try {
      await action(...args);
      await reload?.();
      return true;
    } catch (failure) {
      notify(errorText(failure));
      return false;
    } finally {
      running.current = false;
      setBusy(false);
    }
  };
  return { run, busy };
}
var messages = (t) => ({
  offline: t("offline"),
  notRunning: t("hostNotRunning"),
  serverError: (status) => t("serverError", { status }),
  requestFailed: (status) => t("requestFailed", { status }),
  setup: (problem) => problem.values.output ? `${setupText(t, problem)}
${problem.values.output}` : setupText(t, problem),
  // A refusal names a prompt part by its label.
  user: ({ code, values }) => t(`userError.${code}`, values.part ? { ...values, part: valueLabel(t, "promptPart", values.part) } : values)
});
function Toast({ text: text2, onDone, holdMs = 3e3 }) {
  const done = (0, import_react3.useRef)(onDone);
  done.current = onDone;
  (0, import_react3.useEffect)(() => {
    const timer = setTimeout(() => done.current(), holdMs + 1e3);
    return () => clearTimeout(timer);
  }, [holdMs]);
  return (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dt-toast", role: "status", style: { ["--dt-toast-hold"]: `${holdMs}ms` }, children: text2 }),
    document.body
  );
}
var stay = () => {
};
var noSession = async () => {
};
function PanelProvider({ t, interval = 5e3, openSession = noSession, navigate = stay, back = stay, backLabel = "", children }) {
  const copy = (0, import_react3.useRef)(t);
  copy.current = t;
  const call = (0, import_react3.useMemo)(() => caller(() => messages(copy.current)), []);
  const [toast, setToast] = (0, import_react3.useState)();
  const notify = (0, import_react3.useCallback)((text2) => setToast({ text: text2, id: Date.now() }), []);
  const [restarting, setRestarting] = (0, import_react3.useState)();
  const [restarts, setRestarts] = (0, import_react3.useState)(0);
  const restart = (0, import_react3.useCallback)(() => setRestarting({ down: false }), []);
  const { data: state, error, reload } = usePoll(() => call("GET state"), [call], restarting ? 1e3 : interval);
  if (restarting && !!error !== restarting.down) {
    setRestarting(error ? { down: true } : void 0);
    if (!error) setRestarts(restarts + 1);
  }
  (0, import_react3.useEffect)(() => {
    if (!restarting) return;
    const timer = setTimeout(() => setRestarting(void 0), 3e4);
    return () => clearTimeout(timer);
  }, [restarting]);
  const context = (0, import_react3.useMemo)(() => ({ t, call, navigate, back, backLabel, openSession, notify, restart }), [
    t,
    call,
    navigate,
    back,
    backLabel,
    openSession,
    notify,
    restart
  ]);
  const data = (0, import_react3.useMemo)(() => ({ state, error, reload, setup: state?.setup, running: state?.load.running ?? 0, restarts }), [
    state,
    error,
    reload,
    restarts
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Panel.Provider, { value: context, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(PanelState.Provider, { value: data, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("style", { children: client_default }),
    children,
    toast && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Toast, { text: toast.text, onDone: () => setToast(void 0) }, toast.id)
  ] }) });
}

// ../../tmp/dsh-superagent-prototype/src/client/draft.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var same2 = (a, b) => JSON.stringify(a) === JSON.stringify(b);
var isRecord = (value) => !!value && typeof value === "object" && !Array.isArray(value);
var LIST_KEYS = ["id", "chatId"];
var named = (list, field) => list.every((item) => isRecord(item) && typeof item[field] === "string") && new Set(list.map((item) => item[field])).size === list.length;
function merge3(base, mine, theirs, conflicts = [], path = []) {
  if (same2(mine, base) || same2(mine, theirs)) return theirs;
  if (same2(theirs, base)) return mine;
  if (Array.isArray(mine) && Array.isArray(theirs) && (base === void 0 || Array.isArray(base))) {
    const lists = [base ?? [], mine, theirs];
    const field = LIST_KEYS.find((name) => lists.every((list) => named(list, name)));
    if (field) return mergeList(lists, field, conflicts, path);
  }
  if (!isRecord(base) || !isRecord(mine) || !isRecord(theirs)) {
    conflicts.push(path);
    return mine;
  }
  const merged = {};
  for (const key of /* @__PURE__ */ new Set([...Object.keys(theirs), ...Object.keys(mine)])) {
    const value = merge3(base[key], mine[key], theirs[key], conflicts, [...path, key]);
    if (value !== void 0) merged[key] = value;
  }
  return merged;
}
function mergeList([base, mine, theirs], field, conflicts, path) {
  const name = (item) => String(item[field]);
  const [before, ours, others] = [base, mine, theirs].map((list) => new Map(list.map((item) => [name(item), item])));
  const order = theirs.map(name);
  mine.forEach((item, index) => {
    if (order.includes(name(item))) return;
    const previous = mine.slice(0, index).map(name).reverse().find((key) => order.includes(key));
    order.splice(previous === void 0 ? 0 : order.indexOf(previous) + 1, 0, name(item));
  });
  return order.flatMap((key) => {
    const value = merge3(before.get(key), ours.get(key), others.get(key), conflicts, [...path, key]);
    return value === void 0 ? [] : [value];
  });
}
function read(key) {
  if (!key) return void 0;
  try {
    const stored = JSON.parse(sessionStorage.getItem(key) ?? "null");
    return stored && "base" in stored && "value" in stored && Number.isInteger(stored.revision) ? stored : void 0;
  } catch (error) {
    void error;
    return void 0;
  }
}
var FAILURES = /* @__PURE__ */ new Set(["conflict", "invalid", "failed", "unstored"]);
function draftReducer(state, action) {
  const { phase, draft, seen } = state;
  switch (action.type) {
    case "edit": {
      if (phase === "saving" || phase === "awaitingRevision") return state;
      if (same2(action.value, action.saved)) return { phase: "clean", seen };
      const notice = state.notice && FAILURES.has(state.notice.kind) ? state.notice : void 0;
      return { phase: "editing", seen, notice, draft: {
        base: draft?.base ?? action.saved,
        value: action.value,
        revision: draft?.revision ?? action.revision ?? 0,
        ...action.meta === void 0 ? {} : { meta: action.meta }
      } };
    }
    case "discard":
      return phase === "saving" || phase === "awaitingRevision" ? state : { phase: "clean", seen };
    case "submit":
      return phase === "editing" ? { ...state, phase: "saving" } : state;
    case "saved":
      return phase === "saving" && draft ? {
        phase: "awaitingRevision",
        seen,
        sent: { value: draft.value, revision: action.revision, restarting: action.restarting }
      } : state;
    case "refused":
      return { ...state, phase: phase === "saving" ? "editing" : phase, notice: action.notice };
    case "revisionArrived": {
      if (phase === "saving") return state;
      const { revision, saved } = action;
      if (state.sent) return revision >= state.sent.revision ? { phase: "clean", seen: revision } : { ...state, seen: revision };
      if (!draft || draft.revision === revision) return { ...state, seen: revision };
      const paths = [];
      const value = merge3(draft.base, draft.value, saved, paths);
      if (same2(value, saved)) return { phase: "clean", seen: revision };
      return {
        phase: "editing",
        seen: revision,
        draft: { ...draft, base: saved, value, revision },
        notice: paths.length ? { kind: "conflict", revision, paths } : { kind: "merged", revision }
      };
    }
  }
}
function saveBarText(t, { phase, sent, notice }, words2 = {}) {
  switch (notice?.kind) {
    case "conflict":
      return { error: words2.conflict?.(notice.revision, notice.paths) ?? t("saveConflict"), status: "" };
    case "invalid":
      return { error: t("invalidSettings", { fields: notice.fields.join(t("listSeparator")) }), status: "" };
    case "failed":
      return { error: notice.error, status: "" };
    case "unstored":
      return { error: t("draftFailed", { error: notice.error }), status: "" };
    case "merged":
      return { status: words2.merged?.(notice.revision) ?? t("saveMerged") };
    case "rebasing":
      return { status: t("saveRebasing") };
  }
  if (phase === "awaitingRevision") return { status: t(sent?.restarting ? "savedRestarting" : "saved") };
  return { status: phase === "clean" ? t("saved") : words2.editing ?? t(notice?.kind === "restored" ? "draftRestored" : "draftKept") };
}
function useDraft({ key, saved, revision, save, reload }) {
  const { restart } = usePanel();
  const [state, dispatch] = (0, import_react4.useReducer)(draftReducer, void 0, () => {
    const stored = read(key);
    const initial = stored ? { phase: "editing", draft: stored, notice: { kind: "restored" } } : { phase: "clean" };
    return revision === void 0 ? initial : draftReducer(initial, { type: "revisionArrived", saved, revision });
  });
  if (state.phase !== "saving" && revision !== void 0 && revision !== state.seen) dispatch({ type: "revisionArrived", saved, revision });
  (0, import_react4.useEffect)(() => {
    if (!key) return;
    try {
      if (state.draft) sessionStorage.setItem(key, JSON.stringify(state.draft));
      else sessionStorage.removeItem(key);
    } catch (failure) {
      dispatch({ type: "refused", notice: { kind: "unstored", error: errorText(failure) } });
    }
  }, [key, state.draft]);
  const failed = (failure) => dispatch({ type: "refused", notice: { kind: "failed", error: errorText(failure) } });
  const submit = async (event) => {
    event?.preventDefault();
    const { draft } = state;
    if (state.phase !== "editing" || !draft) return;
    dispatch({ type: "submit" });
    let result;
    try {
      result = await save(draft.value, draft.revision, draft.base);
    } catch (failure) {
      const fields = failure instanceof ApiError ? failure.issues.map((issue) => issue.path) : [];
      if (failure instanceof ApiError && failure.status === 409) {
        await reload().then(() => dispatch({ type: "refused", notice: { kind: "rebasing" } }), failed);
      } else dispatch({ type: "refused", notice: fields.length ? { kind: "invalid", fields } : {
        kind: "failed",
        error: errorText(failure)
      } });
      return;
    }
    dispatch({ type: "saved", revision: result.revision, restarting: !!result.restarting });
    if (result.restarting) restart();
    else await reload().catch(failed);
  };
  return {
    state,
    value: state.sent?.value ?? state.draft?.value ?? saved,
    meta: state.draft?.meta,
    revision: state.draft?.revision ?? revision ?? 0,
    dirty: state.draft !== void 0,
    busy: state.phase === "saving" || state.phase === "awaitingRevision",
    submit,
    edit: (value, meta) => dispatch({ type: "edit", value, meta, saved, revision }),
    discard: () => dispatch({ type: "discard" })
  };
}
function SaveBar({ state, dirty, busy, words: words2, status, onDiscard, onSave }) {
  const { t } = usePanel();
  const line = saveBarText(t, state, words2);
  const shown = dirty || busy || !!line.error;
  const bar = (0, import_react4.useRef)(null);
  const block = (0, import_react4.useRef)(null);
  const focused = (0, import_react4.useRef)(false);
  (0, import_react4.useLayoutEffect)(() => {
    if (shown) {
      block.current = bar.current?.parentElement ?? null;
      return;
    }
    const lost = !document.activeElement || document.activeElement === document.body;
    if (focused.current && block.current && lost) {
      block.current.tabIndex = -1;
      block.current.focus({ preventScroll: true });
    }
    focused.current = false;
  }, [shown]);
  if (!shown) return null;
  const leave = (next) => {
    if (next && !bar.current?.contains(next)) focused.current = false;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      ref: bar,
      className: "dt-savebar",
      onFocus: () => {
        focused.current = true;
      },
      onBlur: (event) => leave(event.relatedTarget),
      children: [
        line.error ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dt-error dt-clamp", role: "alert", children: line.error }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dt-hint", "aria-live": "polite", children: status ?? line.status }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { variant: "ghost", size: "sm", disabled: !dirty || busy, onClick: onDiscard, children: t("discard") }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { variant: "primary", size: "sm", disabled: !dirty || busy, ...onSave ? { onClick: onSave } : { type: "submit" }, children: t("save") })
      ]
    }
  );
}

// ../../tmp/dsh-superagent-prototype/src/client/rows.tsx
var import_react6 = require("react");

// ../../tmp/dsh-superagent-prototype/src/client/marks.ts
function ticketMark(t, ticket) {
  switch (ticket.stage) {
    case "ended":
      return { label: valueLabel(t, "outcome", ticket.ended?.outcome), tone: "neutral", dot: "idle", icon: "stop" };
    case "person": {
      const action = ticket.action;
      const icon = action === "review" ? "review" : action === "failed" ? "alert" : action === "blocked" ? "blocked" : action === "delivery" ? "inbox" : "ask";
      return { label: t(`stage.${action}`), tone: action === "failed" ? "danger" : "warning", dot: action === "failed" ? "error" : "warning", icon };
    }
    case "working":
      return ticket.action === "queued" ? { label: t("stage.queued"), tone: "neutral", dot: "idle", icon: "queue" } : { label: t("stage.working"), tone: "info", dot: "ongoing", icon: "running" };
    default:
      return { label: t("stage.idle"), tone: "neutral", dot: "idle", icon: "clock" };
  }
}
var reportDot = (report) => report === "failed" ? "error" : report === "blocked" || report === "waiting" ? "warning" : report === "ready" ? "done" : "ongoing";
var THREAD_MARKS = {
  error: { dot: "error", icon: "alert", label: "threadPollFailed" },
  evaluating: { dot: "ongoing", icon: "running", label: "threadEvaluating" },
  queued: { dot: "warning", icon: "queue", label: "threadQueued" },
  subscribed: { dot: "done", icon: "inbox", label: "threadSubscribed" },
  dormant: { dot: "idle", icon: "clock", label: "threadDormantShort" },
  unsubscribed: { dot: "idle", icon: "hash", label: "threadUnsubscribed" }
};
function threadMark(t, thread) {
  const { dot, icon, label: label2 } = THREAD_MARKS[thread.stage];
  return { dot, icon, label: t(label2, { count: thread.pending }) };
}
var SOURCE_MARKS = {
  missing: { dot: "idle", label: "sourceNotInstalled" },
  off: { dot: "idle", label: "sourceOff" },
  error: { dot: "error", label: "sourceState.error" },
  setup: { dot: "idle", label: "sourceState.setup" },
  starting: { dot: "ongoing", label: "sourceState.ongoing" },
  paused: { dot: "warning", label: "sourceState.warning" },
  ready: { dot: "done", label: "sourceState.done" }
};
var sourceMark = (t, state) => ({ dot: SOURCE_MARKS[state].dot, label: t(SOURCE_MARKS[state].label) });
var DECISION_MARKS = {
  accept: { dot: "done", icon: "decision", tone: "success" },
  reopen: { dot: "done", icon: "refresh", tone: "success" },
  stop: { dot: "idle", icon: "stop", tone: "danger" },
  ignore: { dot: "idle", icon: "dismiss", tone: "neutral" },
  unavailable: { dot: "warning", icon: "alert", tone: "warning" },
  wouldAccept: { dot: "idle", icon: "dismiss", tone: "warning" }
};
function decisionMark(t, outcome) {
  return { ...DECISION_MARKS[outcome], label: outcome === "wouldAccept" ? t("wouldAccept") : valueLabel(t, "decision", outcome) };
}

// ../../tmp/dsh-superagent-prototype/src/client/widgets.tsx
var import_react5 = require("react");

// ../../tmp/dsh-superagent-prototype/src/client/markdown.ts
function shortUrl(url) {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.length > 24 ? `${parsed.pathname.slice(0, 24)}\u2026` : parsed.pathname;
    return `${parsed.host}${path === "/" ? "" : path}`;
  } catch (error) {
    void error;
    return url;
  }
}
function linkify(text2) {
  return text2.split(/(https?:\/\/[^\s)，。]*[^\s)，。.,;:!?'"])/).filter(Boolean).map((part) => /^https?:\/\//.test(part) ? { kind: "link", text: shortUrl(part), url: part } : { kind: "text", text: part });
}
function inlines(text2) {
  return text2.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/).flatMap((part) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return [{ kind: "bold", text: part.slice(2, -2) }];
    if (/^`[^`]+`$/.test(part)) return [{ kind: "code", text: part.slice(1, -1) }];
    const link = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/.exec(part);
    return link ? [{ kind: "link", text: link[1], url: link[2] }] : linkify(part);
  });
}
function markdownBlocks(text2) {
  const blocks = [];
  let list;
  for (const line of text2.split("\n")) {
    const item = /^\s*[-*]\s+(.*)$/.exec(line) ?? /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (item) {
      const ordered = !/^\s*[-*]/.test(line);
      if (!list || list.ordered !== ordered) blocks.push(list = { kind: "list", ordered, items: [] });
      list.items.push(item[1]);
      continue;
    }
    list = void 0;
    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    if (line.trim()) blocks.push(heading ? { kind: "heading", text: heading[1] } : { kind: "paragraph", text: line });
  }
  return blocks;
}

// ../../tmp/dsh-superagent-prototype/src/app/api.ts
var TICKET_FILTERS = ["open", "person", "working", "idle", "ended"];
var THREAD_FILTERS = ["subscribed", "evaluating", "recent", "all"];

// ../../tmp/dsh-superagent-prototype/src/client/route.ts
var TABS = ["overview", "source", "trigger", "eval", "execution", "settings"];
var SETTINGS_GROUPS = ["source", "mcp", "eval", "execution", "prompts", "deployment"];
var HOME = { page: "overview" };
var settingsRoute = (group, query = {}) => ({ page: "settings", query: { group, ...query } });
var setupPage = (place) => place === "deployment" ? settingsRoute("deployment") : settingsRoute("source", { source: place });
var routeLabel = (t, route) => route.id ? t(route.page === "trigger" ? "term.thread" : "term.ticket") : t(`tab.${route.page}`);
var pick = (values, value) => values.find((item) => item === value);
function compact(query) {
  const set = Object.entries(query).filter(([, value]) => value !== void 0);
  return set.length ? Object.fromEntries(set) : void 0;
}
function parseRoute(value) {
  const { page, id, query } = value ?? {};
  const text2 = (name) => typeof query?.[name] === "string" ? query[name] : void 0;
  const record = typeof id === "string" && id ? id : void 0;
  switch (page) {
    case "overview":
    case "source":
      return { page };
    case "trigger":
      return record ? { page, id: record, query: compact({ trigger: text2("trigger") }) } : { page, query: compact({ filter: pick(THREAD_FILTERS, query?.filter) }) };
    case "eval":
      return { page, query: compact({
        filter: pick(DECISION_FILTERS, query?.filter),
        window: query?.window === "24h" ? "24h" : void 0
      }) };
    case "execution":
      return record ? { page, id: record } : { page, query: compact({ filter: pick(TICKET_FILTERS, query?.filter) }) };
    case "settings":
      return { page, query: {
        group: pick(SETTINGS_GROUPS, query?.group) ?? "source",
        ...compact({ source: text2("source"), version: text2("version") })
      } };
    default:
      return void 0;
  }
}
var ROUTE_KEY = "dsh-superagent/route";
var lastSettingsGroup = ({ route, group }) => route.page === "settings" ? route.query.group : group ?? "source";
function initialLocation() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(ROUTE_KEY) ?? "null");
    const route = parseRoute(stored?.route);
    const stack = Array.isArray(stored?.stack) ? stored.stack : [];
    if (route) return { route, stack: stack.flatMap((item) => parseRoute(item) ?? []), group: pick(SETTINGS_GROUPS, stored?.group) };
  } catch (error) {
    void error;
  }
  return { route: HOME, stack: [] };
}
function remember(location) {
  try {
    sessionStorage.setItem(ROUTE_KEY, JSON.stringify(location));
  } catch (failure) {
    void failure;
  }
}

// ../../tmp/dsh-superagent-prototype/src/client/widgets.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var external = { target: "_blank", rel: "noopener noreferrer" };
function When({ at }) {
  const { t } = usePanel();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("time", { dateTime: at, title: fullTime(at, t("lang")), children: when(at, t("lang")) });
}
function SetupMessage({ problem, lead }) {
  const { t } = usePanel();
  const text2 = setupText(t, problem);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    lead ? t("setupProblem", { detail: text2 }) : text2,
    problem.values.output && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dt-detail dt-mono dt-clamp", children: problem.values.output })
  ] });
}
function Section({ title, count, children, action, hint, badge, icon }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: "dt-section", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h2", { className: "dt-section-title", children: [
      icon && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dt-section-icon", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: icon, size: 14 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dt-section-name", children: title }),
      count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dt-count", children: count }),
      hint && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(InfoTip, { text: hint }),
      badge,
      action && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { style: { marginLeft: "auto" }, children: action })
    ] }),
    children
  ] });
}
function Hint({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "dt-hint", children });
}
function LabelValue({ label: label2, value }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "dt-lv", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dt-lv-label", children: label2 }),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dt-lv-value", children: value })
  ] });
}
function KeyValues({ rows }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("dl", { className: "dt-kv", children: rows.map(([key, value], index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      style: { display: "contents" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("dt", { children: key }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("dd", { children: value })
      ]
    },
    index
  )) });
}
function Inlines({ parts }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: parts.map((part, index) => part.kind === "bold" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: part.text }, index) : part.kind === "code" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { className: "dt-code", children: part.text }, index) : part.kind === "link" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { className: "dt-inline-link", href: part.url, title: part.url, ...external, children: part.text }, index) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react5.Fragment, { children: part.text }, index)) });
}
function MarkdownLite({ text: text2 }) {
  const { t } = usePanel();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dt-md", children: markdownBlocks(readableMarkers(t, text2)).map((block, index) => {
    if (block.kind !== "list") return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: block.kind === "heading" ? "dt-md-heading" : void 0, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      Inlines,
      {
        parts: inlines(block.text)
      }
    ) }, index);
    const items = block.items.map((item, at) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Inlines, { parts: inlines(item) }) }, at));
    return block.ordered ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ol", { children: items }, index) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ul", { children: items }, index);
  }) });
}
function MoreToggle({ open, onToggle }) {
  const { t } = usePanel();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "dt-textlink dt-more", "aria-expanded": open, onClick: onToggle, children: open ? t("collapse") : t("expand") });
}
function ClampText({ text: text2 }) {
  const [open, setOpen] = (0, import_react5.useState)(false);
  const long = text2.length > 480 || text2.split("\n").length > 8;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: long && !open ? "dt-event-text dt-clamp-8" : "dt-event-text", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Inlines, { parts: linkify(text2) }) }),
    long && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(MoreToggle, { open, onToggle: () => setOpen(!open) })
  ] });
}
function ConfirmButton({ label: label2, title, message, onConfirm, variant = "ghost", icon }) {
  const { t } = usePanel();
  const [open, setOpen] = (0, import_react5.useState)(false);
  const confirm = useAction(onConfirm);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Button, { variant, size: "sm", icon: icon && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: icon, size: 14 }), onClick: () => setOpen(true), children: label2 }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      Modal,
      {
        open,
        onClose: () => setOpen(false),
        title,
        closeLabel: t("close"),
        description: message,
        footer: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Button, { variant: "ghost", onClick: () => setOpen(false), children: t("cancel") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            Button,
            {
              variant: "primary",
              disabled: confirm.busy,
              onClick: () => {
                void confirm.run().then((done) => {
                  if (done) setOpen(false);
                });
              },
              children: t("confirm")
            }
          )
        ] })
      }
    )
  ] });
}
function SessionButton({
  sessionId,
  label: label2,
  variant = "ghost"
}) {
  const { t, openSession, notify } = usePanel();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    Button,
    {
      variant,
      size: "sm",
      icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "session", size: 14 }),
      onClick: () => {
        openSession(sessionId).catch((error) => notify(errorText(error)));
      },
      children: label2 ?? t("openSession")
    }
  );
}
function ExternalLink({ href, children, icon = "external" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("a", { className: "dt-inline-link dt-icon-link", href, ...external, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: icon, size: 13 }),
    children
  ] });
}
function ActionLink({ href, children, icon = "external" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("a", { className: "dt-btn dt-btn-outline dt-btn-sm", href, ...external, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dt-btn-icon", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      Icon,
      {
        name: icon,
        size: 14
      }
    ) }),
    children
  ] });
}
function StageMark({ state, icon, label: label2 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "dt-stage", "data-state": state, children: [
    state === "ongoing" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(StateDot, { state: "ongoing" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      Icon,
      {
        name: icon,
        size: 14
      }
    ),
    label2
  ] });
}
function LoadState({ error, loading }) {
  const { t } = usePanel();
  if (error) return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "dt-error", role: "alert", children: error.message });
  return loading ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Hint, { children: t("loading") }) : null;
}
function LoadMore({ onMore }) {
  const { t } = usePanel();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Button, { variant: "outline", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "chevron-down", size: 14 }), onClick: onMore, children: t("loadMore") });
}
function StatusHead({ hint, settings }) {
  const { t, navigate } = usePanel();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dt-status-head", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h2", { className: "dt-status-title", children: [
      t("statusTitle"),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(InfoTip, { text: hint })
    ] }),
    settings && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      Button,
      {
        variant: "ghost",
        size: "sm",
        icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "settings" }),
        onClick: () => navigate(settingsRoute(settings)),
        children: t("tab.settings")
      }
    )
  ] });
}
function PageHead({ title, children }) {
  const { back, backLabel } = usePanel();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dt-page-head", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Button, { variant: "ghost", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "chevron-left" }), onClick: back, children: backLabel }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dt-page-title", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { children: title }),
      children && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dt-actions", children })
    ] })
  ] });
}
function CheckSetupButton() {
  const { t, call, notify, restart } = usePanel();
  const { running } = usePanelData();
  const check = async () => {
    await call("POST setup/check");
    notify(t("setupChecking"));
    restart();
  };
  const action = useAction(check);
  if (running > 0) {
    const message = t("setupCheckInterrupts", { count: running });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ConfirmButton,
      {
        variant: "outline",
        icon: "refresh",
        label: t("setupCheck"),
        title: t("setupCheck"),
        message,
        onConfirm: check
      }
    );
  }
  const icon = /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "refresh", size: 14 });
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    Button,
    {
      variant: "outline",
      size: "sm",
      icon,
      disabled: action.busy,
      onClick: () => {
        void action.run();
      },
      children: t("setupCheck")
    }
  );
}

// ../../tmp/dsh-superagent-prototype/src/client/rows.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function TicketLine({ ticket, question, onChanged, context }) {
  const { t, call, navigate } = usePanel();
  const status = ticketMark(t, ticket);
  const after = async (request) => {
    await request;
    await onChanged?.();
  };
  const note = question && ticket.note && { ...ticket.note, text: readableMarkers(t, ticket.note.text) };
  const answer = ticket.reply && ticket.stage === "person" && ticket.action === "answer" ? ticket.reply : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { className: "dt-row dt-link dt-ticket", "data-state": question ? status.dot : void 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dt-ticket-stage", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(StageMark, { state: status.dot, icon: status.icon, label: status.label }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dt-ticket-body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dt-row-title", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dt-open", onClick: () => navigate({
        page: "execution",
        id: ticket.id
      }), children: ticket.title }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dt-row-meta dt-ticket-meta", children: [
        ticket.threads.map((thread) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ThreadChip, { thread }, thread.key)),
        context && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ContextTag, {}),
        ticket.undelivered > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(LabelValue, { label: t("ticketUndeliveredLabel"), value: ticket.undelivered }),
        note ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: note.error ? "dt-ticket-note dt-ticket-note-error" : "dt-ticket-note", title: note.text, children: note.text }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(When, { at: ticket.updatedAt })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dt-ticket-actions", children: onChanged && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        answer && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ActionLink, { href: answer.url, icon: "message", children: t("answerIn", { source: valueLabel(
          t,
          "source",
          answer.source
        ) }) }),
        ticket.actions.retry && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          ConfirmButton,
          {
            variant: "outline",
            icon: "refresh",
            label: t("retry"),
            title: t("retryTitle"),
            message: t("retryConfirm", { title: ticket.title }),
            onConfirm: () => after(call("POST tickets/:id/retry", { id: ticket.id }))
          }
        ),
        ticket.actions.retry && ticket.sessionId && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SessionButton, { variant: "outline", sessionId: ticket.sessionId }),
        ticket.actions.stop && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          ConfirmButton,
          {
            variant: "outline",
            icon: "stop",
            label: t("stop"),
            title: t("stopConfirmTitle"),
            message: t("stopConfirm", { title: ticket.title }),
            onConfirm: () => after(call("POST tickets/:id/stop", { id: ticket.id }))
          }
        )
      ] }) })
    ] })
  ] });
}
function ContextTag() {
  const { t } = usePanel();
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Tag, { tone: "quiet", title: t("contextOnlyHint"), children: t("contextOnly") });
}
function ThreadLine({ thread, ticketId, context }) {
  const { t, navigate } = usePanel();
  const live = thread.tickets.filter((ticket) => ticket.state === "open" && ticket.id !== ticketId);
  const { dot, icon, label: label2 } = threadMark(t, thread);
  const reaches = live.length > 0 && `${live[0].title}${live.length > 1 ? t("andMore", { count: live.length - 1 }) : ""}`;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { className: "dt-row dt-link dt-ticket", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dt-ticket-stage", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(StageMark, { state: dot, icon, label: label2 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dt-ticket-body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dt-row-title", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dt-open", title: thread.pollError, onClick: () => navigate({
        page: "trigger",
        id: thread.key
      }), children: readableMarkers(t, thread.title) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dt-row-quote dt-line", children: thread.latest && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        actorName(t, thread.latest.actor),
        t("labelSeparator"),
        readableMarkers(t, thread.latest.preview) || t("empty")
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dt-row-meta dt-line", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ThreadChip, { thread }),
        context && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ContextTag, {}),
        thread.pollError ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dt-line-text dt-error-text", children: thread.pollError }) : reaches && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          LabelValue,
          {
            label: t("fanoutTo"),
            value: reaches
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(When, { at: thread.lastAt })
      ] })
    ] })
  ] });
}
function DecisionLine({ decision }) {
  const { t, navigate } = usePanel();
  const matched = decision.rules.filter((rule) => rule.matched).map((rule) => rule.name);
  const mark = decisionMark(t, decision.outcome);
  const preview = readableMarkers(t, decision.preview);
  const reason = decision.reason ? reasonLabel(t, decision.reason) : "";
  const open = () => decision.ticketId ? navigate({ page: "execution", id: decision.ticketId }) : navigate({ page: "trigger", id: decision.thread, query: { trigger: decision.triggerIds[0] ?? "" } });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { className: "dt-row dt-link dt-ticket", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dt-ticket-stage", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(StageMark, { state: mark.dot, icon: mark.icon, label: mark.label }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dt-ticket-body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dt-row-title", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dt-open", title: reason || void 0, onClick: open, children: decision.ticketTitle ?? (decision.threadTitle ? readableMarkers(t, decision.threadTitle) : preview || t("empty")) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dt-row-quote dt-line", children: preview }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dt-row-meta dt-line", children: [
        reason && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dt-line-text", children: reason }),
        matched.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(LabelValue, { label: t("ruleLabel"), value: matched.join(t("listSeparator")) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(When, { at: decision.at })
      ] })
    ] })
  ] });
}
function ThreadChip({ thread }) {
  const { t } = usePanel();
  const cells = /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dt-chip-source", children: valueLabel(t, "source", thread.source) }),
    Object.entries(thread.facts).map(([id, fact]) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: fact.problem ? "dt-chip-fact dt-chip-problem" : "dt-chip-fact", children: [
      fact.label && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dt-chip-label", children: localized(t, fact.label) }),
      localized(t, fact.value)
    ] }, id))
  ] });
  return thread.url ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("a", { className: "dt-chip dt-chip-link", href: thread.url, target: "_blank", rel: "noopener noreferrer", title: thread.title, children: [
    cells,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dt-chip-open", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "external", size: 11 }) })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dt-chip", children: cells });
}
function automatedRuns(items, sender) {
  const runs = [];
  for (const item of items) {
    const last = runs.at(-1), from = sender(item);
    if (last && from !== void 0 && sender(last.item) === from) last.earlier.push(item);
    else runs.push({ item, earlier: [] });
  }
  return runs;
}
function Earlier({ items }) {
  const { t } = usePanel();
  const [open, setOpen] = (0, import_react6.useState)(false);
  if (!items.length) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dt-textlink", "aria-expanded": open, onClick: () => setOpen(!open), children: open ? t("collapse") : t("automatedEarlier", { count: items.length }) }),
    open && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ul", { className: "dt-plain-list dt-hint", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        When,
        {
          at: item.at
        }
      ),
      " \xB7 ",
      readableMarkers(t, item.preview) || t("empty")
    ] }, item.id)) })
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/client/settings-kit.tsx
var import_react7 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var numberOf = (text2) => text2.trim() ? Number(text2) : null;
var SettingsContext = (0, import_react7.createContext)(void 0);
function useSettings() {
  const value = (0, import_react7.useContext)(SettingsContext);
  if (!value) throw new Error("A settings block rendered outside the settings");
  return value;
}
function SettingsProvider({ children }) {
  const { call } = usePanel();
  const { restarts } = usePanelData();
  const { data, error, reload } = usePoll(() => call("GET settings"), [call, restarts]);
  if (!data) return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(LoadState, { error, loading: true });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(SettingsContext.Provider, { value: { settings: data, reload }, children: [
    error && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(LoadState, { error, loading: false }),
    children
  ] });
}
function useBlockDraft(block, saved, revision, toValue = (draft) => draft) {
  const { t, call, notify } = usePanel();
  const { state } = usePanelData();
  const { reload } = useSettings();
  return useDraft({ key: `dsh-superagent/draft/${state?.masterId ?? ""}/${block}`, saved, revision, reload, save: async (value, from) => {
    const result = await call("PUT settings/:block", { block, body: { value: toValue(value), revision: from } });
    notify(t(result.restarting ? "savedRestarting" : "saved"));
    return result;
  } });
}
function Fields({ disabled, children }) {
  const set = (0, import_react7.useRef)(null);
  const focused = (0, import_react7.useRef)(null);
  (0, import_react7.useLayoutEffect)(() => {
    const active = document.activeElement;
    if (disabled) focused.current = active instanceof HTMLElement && set.current?.contains(active) ? active : null;
    else if (focused.current && (!active || active === document.body)) {
      focused.current.focus({ preventScroll: true });
      focused.current = null;
    }
  }, [disabled]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("fieldset", { ref: set, className: "dt-fieldset", disabled, children });
}
function Field({
  label: label2,
  hint,
  note,
  children
}) {
  const id = (0, import_react7.useId)();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dt-field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "dt-field-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { htmlFor: id, children: label2 }),
      hint && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(InfoTip, { text: hint })
    ] }),
    (0, import_react7.cloneElement)(
      children,
      { id }
    ),
    note && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("small", { children: note })
  ] });
}
function SwitchRow({
  label: label2,
  hint,
  checked,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dt-switch-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dt-field-head", children: [
      label2,
      hint && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(InfoTip, { text: hint })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      Switch,
      {
        checked,
        onChange,
        label: label2
      }
    )
  ] });
}
function ModelField({ id, value, onChange }) {
  const { t, call } = usePanel();
  const [catalog, setCatalog] = (0, import_react7.useState)();
  const [error, setError] = (0, import_react7.useState)();
  (0, import_react7.useEffect)(() => {
    call("GET models").then(setCatalog, (failure) => setError(errorText(failure)));
  }, [call]);
  const current = { provider: value?.provider ?? "", model: value?.model ?? "", effort: value?.reasoningEffort ?? "" };
  const set = (next) => {
    const { provider, model, effort } = { ...current, ...next };
    onChange(provider.trim() || model.trim() || effort.trim() ? { provider, model, ...effort ? { reasoningEffort: effort } : {} } : null);
  };
  const models = catalog?.groups.find((group) => group.id === current.provider.trim())?.models ?? [];
  const fallback = catalog?.default;
  const input = (name, label2, placeholder) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Field, { label: label2, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    Input,
    {
      list: `${id}-${name}s`,
      spellCheck: false,
      placeholder,
      value: current[name],
      onChange: (event) => set({ [name]: event.target.value })
    }
  ) });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dt-model", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Hint, { children: fallback ? t("defaultModel", { model: `${fallback.provider} / ${fallback.model}${fallback.reasoningEffort ? ` \xB7 ${fallback.reasoningEffort}` : ""}` }) : t("defaultModelUnavailable") }),
    error && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "dt-error", children: t("modelCatalogError", { error }) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dt-grid3", children: [
      input("provider", t("modelProvider"), t("modelInherit")),
      input("model", t("modelName"), t("modelInherit")),
      input(
        "effort",
        t("modelEffort"),
        t("modelEffortDefault")
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("datalist", { id: `${id}-providers`, children: catalog?.groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "option",
      {
        value: group.id,
        children: group.name
      },
      group.id
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("datalist", { id: `${id}-models`, children: models.map((model) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: model.id, children: model.name }, model.id)) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("datalist", { id: `${id}-efforts`, children: (models.find((model) => model.id === current.model.trim())?.reasoning?.efforts ?? []).map((effort) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "option",
      {
        value: effort.id,
        children: effort.name
      },
      effort.id
    )) })
  ] });
}
function changeText(t, change, sources) {
  const source = sources.find((item) => item.id === change.source);
  const field = (change.part ? source?.policy?.fields : source?.fields)?.find((item) => item.key === change.field);
  const shown = (value) => value === void 0 || value === null || value === "" ? t("unsetValue") : typeof value === "boolean" ? t(value ? "yes" : "no") : change.code === "mode" ? valueLabel(t, "mode", String(value)) : String(value);
  return t(
    `change.${change.code}`,
    {
      items: (change.items ?? []).map((item) => source?.labels[item] ?? item).join(t("listSeparator")),
      from: shown(change.from),
      to: shown(change.to),
      name: change.name ?? "",
      source: source ? localized(t, source.title) : change.source ?? "",
      field: field ? localized(t, field.label) : change.field ?? ""
    }
  );
}
function ConfigHistory({ blocks, versions, focus }) {
  const { t, call } = usePanel();
  const { settings } = useSettings();
  const { sources } = settings;
  const [open, setOpen] = (0, import_react7.useState)(!!focus);
  const [data, setData] = (0, import_react7.useState)();
  const [error, setError] = (0, import_react7.useState)();
  const revisions = JSON.stringify([Object.values(settings.blocks).map((block) => block.revision), sources.map((source) => source.revision)]);
  (0, import_react7.useEffect)(() => {
    if (open) call("GET policy/history").then(setData, (failure) => setError(errorText(failure)));
  }, [open, call, revisions]);
  const listed = (block) => block ? blocks.some((item) => item === block || item.endsWith(":") && block.startsWith(item)) : blocks.includes("policy");
  const items = data?.items.filter((item) => versions && item.policyChanged || listed(item.block)) ?? [];
  const target = focus ? items.filter((item) => item.policyChanged && item.policyVersion.startsWith(focus)).at(-1) : void 0;
  const scroll = (element) => {
    if (element && !element.dataset.scrolled) {
      element.dataset.scrolled = "1";
      element.scrollIntoView?.({ block: "center" });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(DisclosureRow, { icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "history" }), title: t("configHistory"), open, onToggle: () => setOpen(!open), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dt-disclosure-body", children: [
    error && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "dt-error", children: error }),
    data && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Hint, { children: t("historyIntro") }),
      focus && !target && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Hint, { children: t("policyVersionUnrecorded", { version: focus.slice(0, 8) }) }),
      items.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", { className: "dt-timeline", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        "li",
        {
          className: item === target ? "dt-event dt-highlight" : "dt-event",
          ref: item === target ? scroll : void 0,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "dt-row-title", children: t("historyItem", { revision: item.revision, source: valueLabel(
              t,
              "historySource",
              item.source
            ) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dt-event-foot", children: [
              when(item.savedAt, t("lang")),
              item.policyChanged && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
                " \xB7 ",
                t(
                  "historyPolicyChanged",
                  { version: item.policyVersion.slice(0, 8) }
                )
              ] })
            ] }),
            item.changes === null ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Hint, { children: t("historyNoBaseline") }) : item.changes.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", { className: "dt-changes", children: item.changes.map((change, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: changeText(t, change, sources) }, index)) }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Hint, { children: t("historyNoChanges") }),
            item.notified.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Hint, { children: t("historyNotified", {
              count: item.notified.length,
              titles: item.notified.map((ticket) => ticket.title).join(t("listSeparator"))
            }) })
          ]
        },
        item.revision
      )) }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Hint, { children: t("historyEmpty") })
    ] })
  ] }) });
}
var ROWS_SHOWN = 6;
var byName = ([, a], [, b]) => a.localeCompare(b);
function RowsField({ field, value, saved, onChange, labels, refreshLabels }) {
  const { t, notify } = usePanel();
  const [open, setOpen] = (0, import_react7.useState)(false);
  const refresh = useAction(async () => {
    try {
      const added = await refreshLabels();
      notify(added.length ? t("labelsAdded", { names: added.join(t("listSeparator")) }) : t("labelsCurrent"));
    } catch (failure) {
      notify(t("labelsFailed", { error: errorText(failure) }));
    }
  });
  const label2 = localized(t, field.label), hint = localized(t, field.hint);
  const rows = Array.isArray(value) ? value : [];
  const set = (index, row) => onChange(rows.map((item, position) => position === index ? row : item));
  const key = field.columns[0];
  const savedKeys = new Set((Array.isArray(saved) ? saved : []).map((row) => row[key.key]));
  const choose = key.type === "text" && key.choose && Object.keys(labels).length ? localized(t, key.choose) : "";
  const choices = (id) => Object.entries(labels).filter(([option]) => option === id || !rows.some((other) => other[key.key] === option)).sort(byName);
  const blank = Object.fromEntries(field.columns.map((column) => [column.key, column.type === "select" ? column.options[0].value : ""]));
  const named2 = field.columns[1]?.type === "text" ? field.columns[1] : void 0;
  const rowName = (row) => named2 && row[named2.key] || labels[row[key.key] ?? ""] || row[key.key] || "";
  const cell = (row, index, column) => {
    const id = row[key.key] ?? "", change = (next) => set(index, { ...row, [column.key]: next });
    if (column === key && (savedKeys.has(id) || !choose && labels[id])) {
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: labels[id] ? "dt-row-label" : "dt-row-label dt-mono", title: id, children: labels[id] ?? id }, column.key);
    }
    if (column === key && choose) {
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        "select",
        {
          className: "dt-select",
          "aria-label": choose,
          required: true,
          value: id,
          onChange: (event) => change(event.target.value),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "", disabled: true, children: choose }),
            choices(id).map(([option, name]) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: option, children: name }, option))
          ]
        },
        column.key
      );
    }
    if (column.type === "select") {
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "select",
        {
          className: "dt-select",
          "aria-label": localized(t, column.label),
          value: row[column.key] ?? "",
          onChange: (event) => change(event.target.value),
          children: column.options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: option.value, children: localized(t, option.label) }, option.value))
        },
        column.key
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      Input,
      {
        className: column.optional ? void 0 : "dt-mono",
        "aria-label": localized(t, column.label),
        placeholder: localized(t, column.label),
        required: !column.optional,
        pattern: column.pattern,
        spellCheck: false,
        value: row[column.key] ?? "",
        onChange: (event) => change(event.target.value)
      },
      column.key
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dt-field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dt-subhead", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "dt-field-head", children: [
        label2,
        hint && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(InfoTip, { text: hint }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "dt-count", children: rows.length || "" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "dt-subhead-actions", children: [
        key.type === "text" && key.refresh && refreshLabels && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: refresh.busy ? "dt-btn-busy" : void 0,
            icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "refresh" }),
            disabled: refresh.busy,
            "aria-busy": refresh.busy,
            onClick: () => {
              void refresh.run();
            },
            children: localized(t, key.refresh)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { variant: "ghost", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "plus" }), onClick: () => {
          setOpen(true);
          onChange([
            ...rows,
            blank
          ]);
        }, children: t("addRow") })
      ] })
    ] }),
    rows.length > ROWS_SHOWN && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "button",
      {
        type: "button",
        className: "dt-textlink dt-rows-summary",
        "aria-expanded": open,
        onClick: () => setOpen(!open),
        children: open ? t("collapse") : rows.map(rowName).join(t("listSeparator"))
      }
    ),
    (rows.length <= ROWS_SHOWN || open) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "ul",
      {
        className: "dt-rows",
        style: { ["--dt-columns"]: field.columns.length },
        children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("li", { className: "dt-rows-item", children: [
          field.columns.map((column) => cell(row, index, column)),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            Button,
            {
              variant: "ghost",
              size: "sm",
              icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "trash" }),
              "aria-label": t("removeRow", { name: labels[row[key.key] ?? ""] || row[key.key] || label2 }),
              onClick: () => onChange(rows.filter((_, position) => position !== index))
            }
          )
        ] }, index))
      }
    )
  ] });
}
function SourceField({ field, value, saved, fact, onChange, labels, refreshLabels }) {
  const { t, navigate } = usePanel();
  const label2 = localized(t, field.label), hint = localized(t, field.hint);
  switch (field.type) {
    case "switch":
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SwitchRow, { label: label2, hint, checked: value === true, onChange });
    case "select":
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Field, { label: label2, hint, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        SegmentedControl,
        {
          className: "dt-segmented dt-field-segmented",
          label: label2,
          value: String(value ?? field.options[0].value),
          options: field.options.map((option) => ({ value: option.value, label: localized(t, option.label) })),
          onChange
        }
      ) });
    case "number":
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Field, { label: label2, hint, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        Input,
        {
          type: "number",
          min: field.min,
          max: field.max,
          required: true,
          value: String(value ?? ""),
          onChange: (event) => onChange(event.target.value === "" ? "" : Number(event.target.value))
        }
      ) });
    case "text":
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Field, { label: label2, hint, note: localized(t, fact), children: field.choose && Object.keys(labels).length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("select", { className: "dt-select", value: String(value ?? ""), onChange: (event) => onChange(event.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "", children: localized(t, field.choose) }),
        value && !labels[String(value)] ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: String(value), children: String(value) }) : null,
        Object.entries(labels).sort(byName).map(([option, name]) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: option, children: name }, option))
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        Input,
        {
          value: String(value ?? ""),
          readOnly: field.readonly,
          pattern: field.pattern,
          spellCheck: false,
          onChange: (event) => onChange(event.target.value)
        }
      ) });
    case "fact":
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dt-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "dt-field-head", children: [
          label2,
          hint && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(InfoTip, { text: hint })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "dt-mono", children: localized(t, fact) || t("empty") }),
        field.settings && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            type: "button",
            className: "dt-textlink",
            onClick: () => navigate(settingsRoute(field.settings)),
            children: t(`openSettingsOf.${field.settings}`)
          }
        ) })
      ] });
    case "rows":
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        RowsField,
        {
          field,
          value,
          saved,
          onChange,
          labels,
          refreshLabels
        }
      );
  }
}

// ../../tmp/dsh-superagent-prototype/src/client/eval.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function EvalStatus({ filter, window: window2, paused }) {
  const { t, call, navigate } = usePanel();
  const [limit, setLimit] = (0, import_react8.useState)(30);
  const { data, error } = usePoll(() => call("GET decisions", { query: {
    limit,
    kind: DECISION_KINDS[filter],
    ...window2 ? { window: window2 } : {}
  } }), [filter, limit, window2]);
  const show = (key, last24h) => navigate({ page: "eval", query: {
    ...key === "work" ? {} : { filter: key },
    ...last24h ? { window: "24h" } : {}
  } }, true);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(StatusHead, { hint: t("evalStatusIntro"), settings: "eval" }),
    paused && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "dt-banner", children: [
      t("evalRecordsPaused"),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          type: "button",
          className: "dt-textlink",
          onClick: () => navigate({ page: "execution" }),
          children: t("resumeWhere")
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dt-filters", children: [
      DECISION_FILTERS.map((key) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Pill, { active: filter === key, onClick: () => {
        setLimit(30);
        show(key, !!window2);
      }, children: t(`decisionFilter.${key}`) }, key)),
      window2 && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dt-filter-gap" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Pill, { active: true, onClick: () => show(filter, false), children: t("lastDayOnly") })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LoadState, { error, loading: !data }),
    data && (data.items.length ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("ul", { className: "dt-list", children: data.items.map((decision) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      DecisionLine,
      {
        decision
      },
      decision.id
    )) }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Hint, { children: t("none") })),
    data?.next_offset != null && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LoadMore, { onMore: () => setLimit(limit + 30) })
  ] });
}
function RuleRow({ rule, expanded, onToggle, onChange, onDuplicate, onRemove }) {
  const { t } = usePanel();
  const name = rule.name.trim() || t("newRule");
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("li", { className: "dt-rule", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      DisclosureRow,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dt-rule-dot", "data-enabled": rule.enabled || void 0 }),
        title: name,
        open: expanded,
        onToggle,
        collapsedContent: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dt-rule-preview", children: rule.instruction }),
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dt-rule-body", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Field, { label: t("ruleName"), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Input, { value: rule.name, required: true, maxLength: LIMITS.ruleName, onChange: (event) => onChange({
            ...rule,
            name: event.target.value
          }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Field, { label: t("ruleInstruction"), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "textarea",
            {
              className: "dt-textarea",
              rows: 4,
              required: true,
              maxLength: LIMITS.ruleInstruction,
              value: rule.instruction,
              placeholder: t("ruleInstructionPlaceholder"),
              onChange: (event) => onChange({ ...rule, instruction: event.target.value })
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dt-actions", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Button, { variant: "ghost", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { name: "copy" }), onClick: onDuplicate, children: t("duplicate") }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Button, { variant: "ghost", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { name: "trash" }), onClick: onRemove, children: t("remove") })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Switch, { className: "dt-rule-switch", checked: rule.enabled, onChange: (enabled) => onChange({ ...rule, enabled }), label: t(
      "ruleEnable",
      { name }
    ) })
  ] });
}
function SourcePart({ source, part, saved, dirty, onChange, reload }) {
  const { t, call, notify } = usePanel();
  const policy = source.policy;
  const sync = policy.sync;
  const run = useAction(() => call("POST policy-sync/:id", { id: source.id }), { reload });
  const syncNow = () => {
    if (dirty) notify(t("syncNeedsSave"));
    else void run.run();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dt-part", children: [
    policy.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      SourceField,
      {
        field,
        value: part[field.key],
        saved: saved[field.key],
        fact: void 0,
        labels: source.labels,
        onChange: (next) => onChange({ ...part, [field.key]: next })
      },
      field.key
    )),
    sync && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dt-row-buttons", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Button, { variant: "outline", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { name: "refresh" }), disabled: run.busy || !sync.ready, onClick: syncNow, children: localized(
        t,
        sync.label
      ) }),
      sync.health?.state === "ready" && sync.health.at && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LabelValue, { label: t("syncDone"), value: when(sync.health.at, t("lang")) }),
      sync.health?.state === "error" && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dt-error dt-clamp", children: sync.health.detail })
    ] }),
    policy.rows ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      AdmissionTable,
      {
        rows: policy.rows,
        labels: source.labels,
        table: part.admission ?? {},
        explicit: localized(t, policy.explicit),
        onChange: (admission) => onChange({ ...part, admission })
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dt-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dt-field-head", children: t("explicitRequest") }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: localized(
        t,
        policy.explicit
      ) })
    ] })
  ] });
}
var CELLS = ["listedUnaddressed", "unlistedAddressed", "unlistedUnaddressed"];
function AdmissionTable({ rows, labels, table, explicit, onChange }) {
  const { t } = usePanel();
  const name = (row) => labels[row.id] ?? localized(t, row.label);
  const set = (row, cell, value) => onChange({ ...table, [row]: { ...table[row], [cell]: value } });
  const select = (row, cell) => {
    const value = table[row.id]?.[cell] ?? ADMISSION_DEFAULTS[cell];
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "dt-admission-cell", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("select", { className: "dt-select", "aria-label": `${name(row)} \xB7 ${t(`admissionCell.${cell}`)}`, value, onChange: (event) => set(
        row.id,
        cell,
        event.target.value
      ), children: ADMISSION_OPTIONS[cell].map((option) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value: option, children: t(`admissionValue.${option}`) }, option)) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dt-admission-slot", children: cell === "unlistedAddressed" && value === "explicit" && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        InfoTip,
        {
          text: t("admissionAnyoneWarning"),
          icon: "alert",
          warn: true
        }
      ) })
    ] }) }, cell);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Section, { title: t("admission"), hint: t("admissionHint"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Hint, { children: explicit }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("table", { className: "dt-table dt-admission", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("thead", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("th", { rowSpan: 2, children: t("admissionScope") }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("th", { children: t("admissionListed") }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("th", { colSpan: 2, children: t("admissionUnlisted") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("th", { children: t("admissionUnaddressed") }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("th", { children: t("admissionAddressed") }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("th", { children: t("admissionUnaddressed") })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("td", { className: "dt-admission-scope", children: [
          name(row),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("small", { children: localized(t, row.note) })
        ] }),
        CELLS.map((cell) => row.cells[cell] ? select(row, cell) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "td",
          {
            className: "dt-admission-na",
            "aria-label": t("admissionNotReceived"),
            children: "\u2014"
          },
          cell
        ))
      ] }, row.id)) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Hint, { children: t("admissionFootnote") })
  ] });
}
function PolicyBlock() {
  const { t } = usePanel();
  const { settings: { blocks, sources, policyVersion }, reload } = useSettings();
  const draft = useBlockDraft("policy", blocks.policy.value, blocks.policy.revision);
  const policy = draft.value;
  const [expanded, setExpanded] = (0, import_react8.useState)(/* @__PURE__ */ new Set());
  const parts = sources.filter((source) => source.installed && source.policy);
  const [tab, setTab] = (0, import_react8.useState)();
  const current = parts.find((source) => source.id === tab) ?? parts[0];
  const edit = (next) => draft.edit({ ...policy, ...next });
  const toggle = (id) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };
  const insert = (rule, at) => {
    setExpanded(/* @__PURE__ */ new Set([...expanded, rule.id]));
    edit({ rules: [...policy.rules.slice(0, at), rule, ...policy.rules.slice(at)] });
  };
  const reveal = (target) => {
    if (target instanceof Element && target.closest(".dt-rules")) setExpanded(new Set(policy.rules.map((rule) => rule.id)));
  };
  const part = (id) => policy.sources[id] ?? { allowed: [] };
  const add = () => insert({ id: crypto.randomUUID(), name: "", enabled: true, instruction: "" }, policy.rules.length);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "form",
    {
      className: "dt-form dt-block",
      onSubmit: (event) => {
        void draft.submit(event);
      },
      onInvalidCapture: (event) => reveal(event.target),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Fields, { disabled: draft.busy, children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("h2", { className: "dt-block-title", children: [
            t("term.policy"),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(InfoTip, { text: t("policyIntro") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "dt-flow", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LabelValue, { label: t("policyVersion"), value: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dt-mono", children: policyVersion.slice(0, 8) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              InfoTip,
              {
                text: t("policyVersionHint")
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Section, { title: t("rules"), hint: t("rulesHint"), action: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            Button,
            {
              variant: "ghost",
              size: "sm",
              icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { name: "plus" }),
              onClick: add,
              children: t("addRule")
            }
          ), children: policy.rules.length ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("ul", { className: "dt-rules", children: policy.rules.map((rule, index) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            RuleRow,
            {
              rule,
              expanded: expanded.has(rule.id),
              onToggle: () => toggle(rule.id),
              onChange: (next) => edit({ rules: policy.rules.map((item, position) => position === index ? next : item) }),
              onDuplicate: () => insert(
                { ...rule, id: crypto.randomUUID(), name: `${rule.name}${t("copySuffix")}`.slice(0, LIMITS.ruleName) },
                index + 1
              ),
              onRemove: () => edit({ rules: policy.rules.filter((_, position) => position !== index) })
            },
            rule.id
          )) }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Hint, { children: t("rulesEmpty") }) }),
          current && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Section, { title: t("policyPerSource"), hint: t("policyPerSourceHint"), children: [
            parts.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dt-subtabs", role: "tablist", "aria-label": t("policyPerSource"), children: parts.map((source) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": source === current,
                className: "dt-subtab",
                onClick: () => setTab(source.id),
                children: localized(t, source.title)
              },
              source.id
            )) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              SourcePart,
              {
                source: current,
                part: part(current.id),
                saved: blocks.policy.value.sources[current.id] ?? {},
                dirty: draft.dirty,
                reload,
                onChange: (next) => edit({ sources: {
                  ...policy.sources,
                  [current.id]: next
                } })
              },
              current.id
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SaveBar, { ...draft, onDiscard: draft.discard })
      ]
    }
  );
}
function EvalBlock() {
  const { t } = usePanel();
  const block = useSettings().settings.blocks.eval;
  const saved = { ...block.value, timeoutSeconds: String(block.value.timeoutSeconds) };
  const draft = useBlockDraft("eval", saved, block.revision, (value2) => ({ ...value2, timeoutSeconds: numberOf(value2.timeoutSeconds) }));
  const value = draft.value;
  const edit = (next) => draft.edit({ ...value, ...next });
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("form", { className: "dt-form dt-block", onSubmit: (event) => {
    void draft.submit(event);
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(Fields, { disabled: draft.busy, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("h2", { className: "dt-block-title", children: [
        t("evalSettings"),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(InfoTip, { text: t("evalIntro") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Section, { title: t("acceptMode"), hint: t(`modeOption.${value.mode}`), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        SegmentedControl,
        {
          className: "dt-segmented",
          label: t("acceptMode"),
          value: value.mode,
          onChange: (mode) => edit({ mode }),
          options: ["off", "observe", "auto"].map((mode) => ({
            value: mode,
            label: valueLabel(t, "mode", mode),
            title: t(`modeOption.${mode}`)
          }))
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Field, { label: t("evalTimeout"), hint: t("evalTimeoutHint"), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        Input,
        {
          type: "number",
          min: LIMITS.evalTimeoutSeconds.min,
          max: LIMITS.evalTimeoutSeconds.max,
          required: true,
          value: value.timeoutSeconds,
          onChange: (event) => edit({ timeoutSeconds: event.target.value })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Section, { title: t("assessorModel"), hint: t("assessorModelHint"), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ModelField, { id: "dt-eval-model", value: value.model, onChange: (model) => edit({ model }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SaveBar, { ...draft, onDiscard: draft.discard })
  ] });
}
function EvalSettings({ version }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dt-form", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(PolicyBlock, {}),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(EvalBlock, {}),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ConfigHistory, { blocks: ["policy", "eval"], versions: true, ...version ? { focus: version } : {} })
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/client/execution.tsx
var import_react9 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
function ExecutionStatus({ filter: current, state, reload }) {
  const { t, call, navigate } = usePanel();
  const [limit, setLimit] = (0, import_react9.useState)(20);
  const { data, error, reload: reloadTickets } = usePoll(() => call("GET tickets", { query: { state: current, limit } }), [current, limit]);
  const { paused, load: { maxWorkers } } = state;
  const pause = async () => {
    await call("POST executor/pause", { body: { paused: !paused } });
    await reload();
  };
  const status = state.setup.problem ? { tone: "warning", label: t("executorWaitingSetup") } : paused ? {
    tone: "warning",
    label: t("processingPaused")
  } : { tone: "ongoing", label: t("executorRunning") };
  const action = paused ? "resumeProcessing" : "pauseProcessing";
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(StatusHead, { hint: t("executionStatusIntro"), settings: "execution" }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "dt-row-meta dt-status-line", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "dt-status-text", "data-state": status.tone, children: status.label }),
      !state.setup.problem && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          LabelValue,
          {
            label: t("executingLabel"),
            value: `${state.load.running} / ${maxWorkers}`
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(LabelValue, { label: t("queuedLabel"), value: state.load.queued })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        ConfirmButton,
        {
          variant: "outline",
          icon: paused ? "play" : "pause",
          label: t(action),
          title: t(action),
          message: t(paused ? "resumeProcessingConfirm" : "pauseProcessingConfirm"),
          onConfirm: pause
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "dt-filters", children: TICKET_FILTERS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      Pill,
      {
        active: current === value,
        onClick: () => {
          setLimit(20);
          navigate(
            { page: "execution", query: value === "open" ? {} : { filter: value } },
            true
          );
        },
        children: t(`ticketFilter.${value}`)
      },
      value
    )) }),
    current === "idle" && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Hint, { children: t("idleHint") }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(LoadState, { error, loading: !data }),
    data && (data.items.length ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("ul", { className: "dt-list", children: data.items.map((ticket) => ticket.stage === "person" ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      TicketLine,
      {
        ticket,
        question: true,
        onChanged: reloadTickets
      },
      ticket.id
    ) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TicketLine, { ticket }, ticket.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Hint, { children: t("none") })),
    data?.next_offset != null && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(LoadMore, { onMore: () => setLimit(limit + 20) })
  ] });
}
var firstSentence = (text2) => /^[^。；;.]*(?:[。；;]|\.(?=\s|$))?/.exec(text2)?.[0] ?? text2;
function EnvironmentVariables({
  groups,
  sources,
  onPick
}) {
  const { t } = usePanel();
  const [open, setOpen] = (0, import_react9.useState)(false);
  const owner = (id) => id === "executor" ? t("term.executor") : localized(t, sources.find((source) => source.id === id)?.title ?? id);
  const count = groups.reduce((sum, group) => sum + group.variables.length, 0);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    DisclosureRow,
    {
      icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "hash" }),
      title: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
        t("environmentVariables"),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "dt-count", children: count })
      ] }),
      open,
      onToggle: () => setOpen(!open),
      children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "dt-disclosure-body", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Hint, { children: t("environmentPick") }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("table", { className: "dt-table", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("th", { children: t("environmentKey") }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("th", { children: t("environmentDescription") }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("th", { children: t("environmentOwner") })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("tbody", { children: groups.flatMap((group) => group.variables.map((variable) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: "dt-textlink dt-mono", onClick: () => onPick(variable.key), children: variable.key }) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("td", { title: localized(t, variable.description), children: firstSentence(localized(t, variable.description)) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("td", { children: [
              owner(group.owner),
              !group.enabled && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "dt-hint", children: [
                " \xB7 ",
                t("sourceOff")
              ] })
            ] })
          ] }, variable.key))) })
        ] })
      ] })
    }
  );
}
function ExecutionSettings() {
  const { t } = usePanel();
  const { blocks, environment, sources } = useSettings().settings;
  const executor = blocks.executor.value;
  const saved = { ...executor, maxWorkers: String(executor.maxWorkers), blockedCommands: executor.blockedCommands.join(" ") };
  const draft = useBlockDraft(
    "executor",
    saved,
    blocks.executor.revision,
    (value2) => ({ ...value2, maxWorkers: numberOf(value2.maxWorkers), blockedCommands: value2.blockedCommands.split(/[\s,]+/).filter(Boolean) })
  );
  const value = draft.value;
  const edit = (next) => draft.edit({ ...value, ...next });
  const prepare = (0, import_react9.useRef)(null);
  const insert = (key) => {
    const field = prepare.current;
    const at = field?.selectionStart ?? value.prepare.length, to = field?.selectionEnd ?? at;
    edit({ prepare: `${value.prepare.slice(0, at)}"$${key}"${value.prepare.slice(to)}` });
    requestAnimationFrame(() => {
      field?.focus();
      const caret = at + key.length + 3;
      field?.setSelectionRange(caret, caret);
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "dt-form", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("form", { className: "dt-form", onSubmit: (event) => {
      void draft.submit(event);
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Fields, { disabled: draft.busy, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "dt-form dt-block", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("h2", { className: "dt-block-title", children: [
            t("term.executor"),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(InfoTip, { text: t("executorIntro") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Section, { title: t("executorModel"), hint: t("executorModelHint"), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            ModelField,
            {
              id: "dt-worker-model",
              value: value.model,
              onChange: (model) => edit({ model })
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Field, { label: t("maxWorkers"), hint: t("maxWorkersHint"), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            Input,
            {
              type: "number",
              min: LIMITS.maxWorkers.min,
              max: LIMITS.maxWorkers.max,
              required: true,
              value: value.maxWorkers,
              onChange: (event) => edit({ maxWorkers: event.target.value })
            }
          ) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "dt-form dt-block", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("h2", { className: "dt-block-title", children: [
            t("term.environment"),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(InfoTip, { text: t("environmentIntro") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Field, { label: t("executionDirectory"), hint: t("executionDirectoryHint"), note: value.directory ? void 0 : t("executionDirectoryDefault", { root: environment.root }), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            Input,
            {
              className: "dt-mono",
              value: value.directory,
              placeholder: t("executionDirectoryEmpty"),
              spellCheck: false,
              pattern: "/.*",
              onChange: (event) => edit({ directory: event.target.value })
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Field, { label: t("prepareCommand"), hint: t("prepareCommandHint"), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "textarea",
            {
              ref: prepare,
              className: "dt-textarea dt-mono",
              rows: 3,
              maxLength: LIMITS.prepareCommand,
              spellCheck: false,
              placeholder: t("prepareCommandEmpty"),
              value: value.prepare,
              onChange: (event) => edit({ prepare: event.target.value })
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(EnvironmentVariables, { groups: environment.variables, sources, onPick: insert }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Field, { label: t("blockedCommands"), hint: t("blockedCommandsHint"), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            Input,
            {
              className: "dt-mono",
              value: value.blockedCommands,
              placeholder: t("blockedCommandsNone"),
              spellCheck: false,
              onChange: (event) => edit({ blockedCommands: event.target.value })
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SaveBar, { ...draft, onDiscard: draft.discard })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ConfigHistory, { blocks: ["executor", "pause"] })
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/infra/text.ts
var words = new Intl.Segmenter("zh", { granularity: "word" });

// ../../tmp/dsh-superagent-prototype/src/setup.ts
var SETUP_PROBLEMS = {
  foreignFile: ["deployment", "{file} was not written by dsh-superagent; move it, or choose another state directory."],
  gitTooOld: ["deployment", "git does not read the github.com credential configuration dsh-superagent writes; dsh-superagent needs git 2.32 or later."],
  environmentFailed: ["deployment", "Preparing the agent environment failed."],
  repositoryUnset: ["github", "The GitHub Source names no repository."],
  agentCliUnset: ["github", "The agent GitHub CLI is not set."],
  agentCliMissing: ["github", "The agent GitHub CLI was not found."],
  agentCliSignedOut: ["github", "The agent GitHub CLI cannot read its account."],
  agentCliNoAccount: ["github", "The agent GitHub CLI did not report a GitHub account."],
  repositoryUnreadable: ["github", "@{account} cannot read {repository}."],
  repositoryUnreported: ["github", "The agent GitHub CLI did not return {repository}."],
  repositoryReadOnly: ["github", "@{account} cannot push to {repository}."],
  feishuCliFailed: ["feishu", "The bot lark-cli does not work."],
  feishuNoApp: ["feishu", "auth status of the bot lark-cli did not report the app."],
  feishuBotNotReady: ["feishu", "The bot identity of app {app} is {status}; configure the app secret with lark-cli."],
  feishuUserIdentity: ["feishu", "The bot lark-cli allows user identities (strict mode {mode}); give the bot its own lark-cli configuration in strict mode bot, as docs/006-deployment.md describes."],
  feishuNoBot: ["feishu", "The Feishu bot API did not return the bot's open_id."]
};

// ../../tmp/dsh-superagent-prototype/src/sources/host.ts
var HEALTH_TEXT = {
  setupPending: "Waiting for the deployment check",
  sourceOff: "Off",
  feishuCliUnset: "The Source is on, and its bot lark-cli is not set",
  feishuBotMissing: "Waiting for the Feishu bot",
  pollFailures: "{count} consecutive failed polls; last: {error}"
};

// ../../tmp/dsh-superagent-prototype/src/client/locales.ts
var TEXT = {
  // Shared
  title: ["Superagent", "Superagent"],
  close: ["\u5173\u95ED", "Close"],
  cancel: ["\u53D6\u6D88", "Cancel"],
  confirm: ["\u786E\u5B9A", "Confirm"],
  loading: ["\u6B63\u5728\u8BFB\u53D6\u2026", "Loading\u2026"],
  loadMore: ["\u52A0\u8F7D\u66F4\u591A", "Load more"],
  offline: ["\u65E0\u6CD5\u8FDE\u63A5\u5230 dsh-superagent \u670D\u52A1\u3002\u8BF7\u786E\u8BA4\u5B83\u6B63\u5728\u8FD0\u884C\uFF08dsh-superagent status\uFF09\uFF0C\u7136\u540E\u91CD\u8BD5\u3002", "Cannot reach the dsh-superagent service. Check that it is running (dsh-superagent status), then retry."],
  serverError: ["dsh-superagent \u670D\u52A1\u5185\u90E8\u9519\u8BEF\uFF08{status}\uFF09\uFF0C\u8BF7\u67E5\u770B\u8FD0\u884C\u65E5\u5FD7\u540E\u91CD\u8BD5\u3002", "dsh-superagent service error ({status}). Check the log, then retry."],
  requestFailed: ["\u8BF7\u6C42\u5931\u8D25\uFF08{status}\uFF09\u3002", "Request failed ({status})."],
  empty: ["\u2014", "\u2014"],
  yes: ["\u662F", "Yes"],
  no: ["\u5426", "No"],
  "decision.accept": ["\u63A5\u5355", "Accept"],
  "decision.reopen": ["\u7EED\u505A", "Reopen"],
  "decision.stop": ["\u505C\u6B62", "Stop"],
  "decision.ignore": ["\u5FFD\u7565", "Ignore"],
  "decision.unavailable": ["\u672A\u5B8C\u6210", "Unavailable"],
  "strength.explicit": ["\u660E\u786E", "Explicit"],
  "strength.inferred": ["\u63A8\u65AD", "Inferred"],
  "mode.off": ["\u5173\u95ED", "Off"],
  "mode.observe": ["\u4EC5\u89C2\u5BDF", "Observe"],
  "mode.auto": ["\u81EA\u52A8\u63A5\u5355", "Auto"],
  "source.feishu": ["\u98DE\u4E66", "Feishu"],
  "source.github": ["GitHub", "GitHub"],
  "source.github-issue": ["GitHub Issue", "GitHub Issue"],
  "health.github": ["GitHub \u6765\u6E90", "GitHub Source"],
  "health.feishu": ["\u98DE\u4E66\u6765\u6E90", "Feishu Source"],
  "health.history": ["\u98DE\u4E66\u8865\u6536", "Feishu recovery"],
  "health.runtime": ["dsh-superagent", "dsh-superagent"],
  "health.models": ["\u6A21\u578B\u670D\u52A1", "Model service"],
  "health.assessment": ["\u53D1\u7ED9\u4E3B Session \u7684\u8BC4\u4F30", "Evals sent to the main Session"],
  "health.launch": ["\u6D3E\u5DE5\u542F\u52A8", "Assignment launches"],
  "health.delivery": ["\u8F93\u5165\u9001\u8FBE", "Input delivery to Assignments"],
  "health.relay": ["\u8F6C\u8FBE\u7ED9\u4E3B Session \u7684\u6D88\u606F", "Relays to the main Session"],
  "health.notice": ["\u7ED9\u4E3B Session \u7684\u901A\u77E5", "Notices to the main Session"],
  "health.reply": ["\u53D1\u5F80\u6E20\u9053\u7684\u6D88\u606F", "Messages to Channels"],
  "health.worker": ["\u6267\u884C\u5668\u4E8B\u4EF6\u5904\u7406", "Executor event handling"],
  "health.evals": ["\u672A\u5B8C\u6210\u7684\u8BC4\u4F30", "Unavailable Evals"],
  none: ["\u6682\u65E0\u3002", "None."],
  openSession: ["\u6253\u5F00 Session", "Open Session"],
  stop: ["\u505C\u6B62", "Stop"],
  policyVersion: ["\u7B56\u7565\u7248\u672C", "Policy version"],
  mediaMarker: ["[\u5A92\u4F53]", "[Media]"],
  forwardMarker: ["[\u5408\u5E76\u8F6C\u53D1]", "[Merged forward]"],
  ticketId: ["\u5DE5\u5355 id", "Ticket id"],
  wouldAccept: ["\u5FFD\u7565\uFF08\u53EF\u63A5\u5355\uFF0C\u4EC5\u89C2\u5BDF\uFF09", "Ignore (would accept; observe only)"],
  timeline: ["\u89E6\u53D1\u65F6\u95F4\u7EBF", "Trigger timeline"],
  groupMember: ["\u98DE\u4E66\u7528\u6237", "Feishu user"],
  feishuBot: ["\u98DE\u4E66\u673A\u5668\u4EBA", "Feishu bot"],
  unknownMention: ["@\u67D0\u4EBA", "@someone"],
  automatedNotice: ["\u81EA\u52A8\u901A\u77E5", "Automated notice"],
  requeue: ["\u91CD\u65B0\u8BC4\u4F30", "Evaluate again"],
  imageMarker: ["[\u56FE\u7247]", "[image]"],
  rules: ["\u63A5\u5355\u89C4\u5219", "Accept rules"],
  remove: ["\u5220\u9664", "Delete"],
  "historySource.panel": ["\u7BA1\u7406\u9875", "Management page"],
  "historySource.defaults": ["\u63D2\u4EF6\u9ED8\u8BA4\u503C", "Plugin defaults"],
  "historySource.tool": ["\u4E3B Session \u5DE5\u5177", "Main Session tool"],
  "historySource.sync": ["\u4ECE\u7FA4\u540C\u6B65", "Sync"],
  "historySource.web": ["\u7BA1\u7406\u9875", "Management page"],
  "historySource.member-sync": ["\u6210\u5458\u540C\u6B65", "Member sync"],
  "historySource.orchestrator-tool": ["\u4E3B Session \u5DE5\u5177", "Main Session tool"],
  "historySource.internal": ["\u5185\u90E8", "Internal"],
  "historySource.policy-sync": ["\u4ECE\u7FA4\u540C\u6B65", "Sync"],
  "historySource.sections-migration": ["\u5347\u7EA7\u8FC1\u79FB", "Upgrade migration"],
  "historySource.vocabulary-migration": ["\u5347\u7EA7\u8FC1\u79FB", "Upgrade migration"],
  "historySource.settings-migration": ["\u5347\u7EA7\u8FC1\u79FB", "Upgrade migration"],
  listSeparator: ["\u3001", ", "],
  labelSeparator: ["\uFF1A", ": "],
  lang: ["zh", "en"],
  automatedEarlier: ["\u540C\u4E00\u53D1\u9001\u8005\u4E4B\u524D\u8FD8\u6709 {count} \u6761\u81EA\u52A8\u6D88\u606F", "{count} earlier automated messages from the same sender"],
  collapse: ["\u6536\u8D77", "Collapse"],
  expand: ["\u5C55\u5F00\u5168\u6587", "Show all"],
  cardMarker: ["[\u5361\u7247\u6D88\u606F]", "[card message]"],
  setupProblem: ["\u90E8\u7F72\u68C0\u67E5\u672A\u901A\u8FC7\uFF1A{detail}", "Deployment check failed: {detail}"],
  hostNotRunning: ["dsh-superagent \u6CA1\u6709\u54CD\u5E94\uFF1A\u5B83\u53EF\u80FD\u6B63\u5728\u91CD\u542F\uFF1B\u6301\u7EED\u5982\u6B64\u65F6\uFF0CDSH \u7684\u65E5\u5FD7\u5199\u660E\u539F\u56E0\uFF0C\u5E38\u89C1\u7684\u662F\u914D\u7F6E\u6709\u8BEF\u3002", "dsh-superagent is not answering: it may be restarting; if this persists, the DSH log names the cause, often a configuration error."],
  savedRestarting: ["\u5DF2\u4FDD\u5B58\uFF0Cdsh-superagent \u6B63\u5728\u91CD\u542F", "Saved; dsh-superagent is restarting"],
  problems: ["\u7CFB\u7EDF\u95EE\u9898", "System problems"],
  dismiss: ["\u4E0D\u518D\u63D0\u793A", "Dismiss"],
  saved: ["\u5DF2\u4FDD\u5B58", "Saved"],
  "tab.settings": ["\u8BBE\u7F6E", "Settings"],
  statusTitle: ["\u72B6\u6001", "Status"],
  executingLabel: ["\u6267\u884C\u4E2D", "Executing"],
  queuedLabel: ["\u6392\u961F", "Queued"],
  resumeProcessing: ["\u6062\u590D\u5904\u7406", "Resume processing"],
  resumeProcessingConfirm: ["\u6062\u590D\u540E\u7EE7\u7EED\u8BC4\u4F30\u3001\u6D3E\u5DE5\u548C\u53D1\u9001\u56DE\u590D\u3002", "Resuming starts Evals, Assignments and replies again."],
  restartInterrupts: ["\u4FDD\u5B58\u4F1A\u91CD\u542F dsh-superagent\uFF1A{count} \u4E2A\u8FDB\u884C\u4E2D\u7684\u6D3E\u5DE5\u4F1A\u4E2D\u65AD\uFF0C\u5E76\u5E26\u6062\u590D\u8BF4\u660E\u91CD\u65B0\u5F00\u59CB\u3002", "Saving restarts dsh-superagent: {count} running Assignments stop and start again with a recovery note."],
  sourceOff: ["\u5DF2\u5173\u95ED", "Off"],
  executorWaitingSetup: ["\u6267\u884C\u5668\u7B49\u5F85\u90E8\u7F72\u68C0\u67E5", "Executor waiting for the deployment check"],
  // Header, search, and tabs
  panel: ["Superagent", "Superagent"],
  openMaster: ["\u6253\u5F00\u4E3B Session", "Open main Session"],
  pagesLabel: ["dsh-superagent \u9875\u9762", "dsh-superagent pages"],
  searchPlaceholder: ["\u641C\u7D22\u5DE5\u5355\u3001\u7EBF\u7A0B\u3001\u89E6\u53D1\u6216\u94FE\u63A5", "Search Tickets, Threads, Triggers or links"],
  searchLabel: ["\u641C\u7D22", "Search"],
  searchFound: ["\u627E\u5230 {tickets} \u4E2A\u5DE5\u5355\u3001{threads} \u4E2A\u7EBF\u7A0B\u3001{items} \u6761\u89E6\u53D1", "Found {tickets} Tickets, {threads} Threads and {items} Triggers"],
  searchNone: ["\u6CA1\u6709\u627E\u5230\u3002\u53EF\u4EE5\u8F93\u5165\u89E6\u53D1\u6587\u5B57\u3001GitHub PR \u6216 Issue \u94FE\u63A5\u3001#\u7F16\u53F7\u3001\u98DE\u4E66\u6D88\u606F\u94FE\u63A5\u6216 om_ \u5F00\u5934\u7684\u6D88\u606F id\u3002", "Nothing found. Try Trigger text, a GitHub PR or Issue link, #number, a Feishu message link, or an om_ message id."],
  searchNoneGithub: ["\u6CA1\u6709\u627E\u5230\u3002\u53EF\u4EE5\u8F93\u5165\u89E6\u53D1\u6587\u5B57\u3001GitHub PR \u6216 Issue \u94FE\u63A5\u6216 #\u7F16\u53F7\u3002", "Nothing found. Try Trigger text, a GitHub PR or Issue link, or #number."],
  "ticket.ended": ["\u5DF2\u7ED3\u675F", "ended"],
  sessionListNotReady: ["Session \u5217\u8868\u5C1A\u672A\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002", "The Session list has not loaded yet; try again shortly."],
  sessionNotListed: ["\u8FD9\u4E2A Session \u4E0D\u5728\u5F53\u524D\u4F1A\u8BDD\u5217\u8868\u91CC\uFF0C\u53EF\u80FD\u5DF2\u88AB\u5F52\u6863\u6216\u5220\u9664\u3002", "This Session is not in the current list; it may have been archived or deleted."],
  searchFiltered: ["\u88AB\u6765\u6E90\u8FC7\u6EE4\uFF1A{reason}", "Filtered by its Source: {reason}"],
  searchFoundCapped: ["\u627E\u5230 {tickets} \u4E2A\u5DE5\u5355\u3001{threads} \u4E2A\u7EBF\u7A0B\u3001\u524D {items} \u6761\u89E6\u53D1\uFF08\u8BF7\u7F29\u5C0F\u641C\u7D22\u8303\u56F4\uFF09", "Found {tickets} Tickets, {threads} Threads and the first {items} Triggers (narrow the search)"],
  inThread: ["\u5728 {thread}", "in {thread}"],
  "tab.overview": ["\u6982\u89C8", "Overview"],
  "tab.source": ["\u6765\u6E90", "Source"],
  "tab.trigger": ["\u89E6\u53D1", "Trigger"],
  "tab.eval": ["\u8BC4\u4F30", "Eval"],
  "tab.execution": ["\u6267\u884C", "Execution"],
  // Overview
  sourceError: ["{source} \u6765\u6E90\u5F02\u5E38", "{source} Source failing"],
  needsYouNone: ["\u6CA1\u6709\u5F85\u5904\u7406\u7684\u5DE5\u5355\u3002", "No pending Tickets."],
  pendingTickets: ["\u5F85\u5904\u7406\u5DE5\u5355", "Pending Tickets"],
  problemEvalOverdue: ["\u8BC4\u4F30\u8D85\u65F6\u672A\u51B3\u5B9A\uFF1A{thread}", "Eval overdue: {thread}"],
  problemSetup: ["\u90E8\u7F72\u68C0\u67E5\u672A\u901A\u8FC7\uFF0Cdsh-superagent \u6682\u4E0D\u63A5\u5355", "Deployment check failed; dsh-superagent takes no work"],
  problemNoSource: ["\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u6765\u6E90\uFF0C\u4E0D\u4F1A\u6536\u5230\u4EFB\u4F55\u89E6\u53D1", "No Source is running; no Triggers arrive"],
  actionOpenSources: ["\u53BB\u6253\u5F00\u6765\u6E90", "Turn on a Source"],
  problemPaused: ["\u5904\u7406\u5DF2\u6682\u505C\uFF1A\u4E0D\u5F00\u59CB\u65B0\u7684\u8BC4\u4F30\uFF0C\u4E0D\u6D3E\u5DE5\uFF0C\u4E0D\u53D1\u9001\u56DE\u590D", "Processing paused: no new Evals, Assignments or replies"],
  problemReply: ["{source} \u56DE\u590D\u53D1\u9001\u5931\u8D25\uFF08\u5DF2\u91CD\u8BD5 {attempts} \u6B21\uFF09", "{source} reply failing (retried {attempts} times)"],
  problemRuntime: ["\u8FD0\u884C\u5F02\u5E38\uFF1A{name}", "{name} failing"],
  problemEvalUnavailable: ["\u8BC4\u4F30\u672A\u5B8C\u6210\uFF1A{thread}", "Eval unavailable: {thread}"],
  sourceErrorHint: ["\u6765\u6E90\u4F1A\u5728\u6BCF\u6B21\u8F6E\u8BE2\u65F6\u81EA\u52A8\u91CD\u8BD5\u3002\u6301\u7EED\u51FA\u73B0\u65F6\u68C0\u67E5\u7F51\u7EDC\u548C\u8BE5\u6765\u6E90\u7684\u767B\u5F55\u72B6\u6001\u3002", "The Source retries on every poll. If this persists, check the network and the Source's sign-in."],
  details: ["\u8BE6\u60C5 \u203A", "Details \u203A"],
  lastDay: ["\u8FC7\u53BB 24 \u5C0F\u65F6", "Last 24 hours"],
  flowReceivedLabel: ["\u5230\u8FBE", "Arrived"],
  flowFilteredLabel: ["\u88AB\u8FC7\u6EE4", "Filtered"],
  flowDroppedLabel: ["\u653E\u5F03\u53D1\u9001", "Not sent"],
  flowJudgedLabel: ["\u5DF2\u8BC4\u4F30", "Evaluated"],
  flowAcceptedLabel: ["\u63A5\u5355\u6216\u7EED\u505A", "Accepted or continued"],
  idleLabel: ["\u7B49\u5F85\u65B0\u89E6\u53D1", "Waiting for a Trigger"],
  problemNoAllowed: ["\u6CA1\u6709\u4EBA\u80FD\u53D1\u8D77\u5DE5\u4F5C\uFF1A\u5404\u6765\u6E90\u4E0A\u7684\u540D\u5355\u90FD\u4E3A\u7A7A\uFF0C\u4EFB\u4F55\u8BF7\u6C42\u90FD\u4E0D\u4F1A\u6210\u4E3A\u5DE5\u5355", "No one may originate work: the lists on every Source are empty, so no request can become a Ticket"],
  actionAddAllowed: ["\u53BB\u6DFB\u52A0", "Add senders"],
  "problemSetupFix.github": ["\u5728\u8BBE\u7F6E \u203A \u6765\u6E90\u7684 GitHub \u5361\u7247\u4FEE\u6B63\u540E\u4FDD\u5B58\uFF0C\u4F1A\u91CD\u65B0\u68C0\u67E5\uFF1B\u5728 dsh-superagent \u4E4B\u5916\u4FEE\u590D\u7684\uFF08\u4F8B\u5982\u767B\u5F55 CLI\uFF09\uFF0C\u70B9\u201C\u91CD\u65B0\u68C0\u67E5\u201D\u3002", "Fix it on the GitHub card of the Source settings and save to check again; after a fix outside dsh-superagent, such as signing a CLI in, choose Check again."],
  "problemSetupFix.feishu": ["\u5728\u8BBE\u7F6E \u203A \u6765\u6E90\u7684\u98DE\u4E66\u5361\u7247\u4FEE\u6B63\u540E\u4FDD\u5B58\uFF0C\u4F1A\u91CD\u65B0\u68C0\u67E5\uFF1B\u5728 dsh-superagent \u4E4B\u5916\u4FEE\u590D\u7684\uFF08\u4F8B\u5982\u914D\u7F6E\u673A\u5668\u4EBA\uFF09\uFF0C\u70B9\u201C\u91CD\u65B0\u68C0\u67E5\u201D\u3002", "Fix it on the Feishu card of the Source settings and save to check again; after a fix outside dsh-superagent, such as configuring the bot, choose Check again."],
  "problemSetupFix.deployment": ["\u5728\u90E8\u7F72\u8BBE\u7F6E\u91CC\u4FEE\u6B63\u540E\u4FDD\u5B58\uFF0C\u4F1A\u91CD\u65B0\u68C0\u67E5\uFF1B\u5728 dsh-superagent \u4E4B\u5916\u4FEE\u590D\u7684\uFF08\u4F8B\u5982\u5347\u7EA7 git\uFF09\uFF0C\u70B9\u201C\u91CD\u65B0\u68C0\u67E5\u201D\u3002", "Fix it in the Deployment settings and save to check again; after a fix outside dsh-superagent, such as upgrading git, choose Check again."],
  problemSetupFeishu: ["\u98DE\u4E66\u673A\u5668\u4EBA\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u98DE\u4E66\u6765\u6E90\u6682\u505C", "Feishu bot check failed; the Feishu Source is paused"],
  // Source
  labelsAdded: ["\u5217\u8868\u5DF2\u66F4\u65B0\uFF0C\u65B0\u589E\uFF1A{names}", "List updated, added: {names}"],
  labelsCurrent: ["\u5217\u8868\u5DF2\u662F\u6700\u65B0", "List is up to date"],
  labelsFailed: ["\u8BFB\u53D6\u5931\u8D25\uFF0C\u5217\u8868\u4FDD\u6301\u4E0D\u53D8\uFF1A{error}", "Could not read the list; it stays as it was: {error}"],
  sourceNotInstalled: ["\u63D2\u4EF6\u672A\u5B89\u88C5", "Plugin not installed"],
  sourceNotInstalledHint: ["\u63D0\u4F9B\u8FD9\u4E2A\u6765\u6E90\u7684\u63D2\u4EF6\u6CA1\u6709\u52A0\u8F7D\uFF0C\u914D\u7F6E\u6309\u4FDD\u5B58\u65F6\u7684\u6837\u5B50\u4FDD\u7559\u3002", "The plugin that provides this Source is not loaded; its configuration is kept as saved."],
  sourceEnable: ["\u8FD0\u884C\u6765\u6E90\uFF1A{name}", "Run Source: {name}"],
  addRow: ["\u6DFB\u52A0", "Add"],
  removeRow: ["\u79FB\u9664\uFF1A{name}", "Remove: {name}"],
  sourceFilteredTitle: ["24 \u5C0F\u65F6\u5185\u6700\u8FD1\u88AB\u8FC7\u6EE4\u7684\u89E6\u53D1", "Latest Triggers filtered in the last 24 hours"],
  sourceDroppedTitle: ["24 \u5C0F\u65F6\u5185\u653E\u5F03\u53D1\u9001\u7684\u6D88\u606F", "Not sent in the last 24 hours"],
  sourceDroppedHint: ["\u8FD9\u4E9B\u6D88\u606F\u8981\u53D1\u5F80\u7684\u5BF9\u8BDD\u5DF2\u65E0\u6CD5\u63A5\u6536\uFF0C\u6216\u6765\u6E90\u5DF2\u4E0D\u518D\u76D1\u542C\u8BE5\u5BF9\u8BDD\uFF0C\u56E0\u6B64\u653E\u5F03\u53D1\u9001\u3002", "Their conversation can no longer receive them, or the Source no longer listens to it, so they are not sent."],
  sourceStatusIntro: ["\u6BCF\u4E2A\u6765\u6E90\u662F\u5426\u5728\u8FD0\u884C\u3001\u8FC7\u53BB 24 \u5C0F\u65F6\u5230\u8FBE\u548C\u88AB\u8FC7\u6EE4\u7684\u89E6\u53D1\uFF0C\u4EE5\u53CA\u88AB\u8FC7\u6EE4\u7684\u539F\u56E0\u3002", "Whether each Source runs, the Triggers that arrived and were filtered in the last 24 hours, and why they were filtered."],
  sourceReceivedLabel: ["24 \u5C0F\u65F6\u5230\u8FBE", "Arrived in 24 h"],
  sourceFilteredLabel: ["\u88AB\u8FC7\u6EE4", "Filtered"],
  sourceLatestLabel: ["\u6700\u8FD1", "Latest"],
  advanced: ["\u9AD8\u7EA7", "Advanced"],
  "sourceState.done": ["\u8FD0\u884C\u4E2D", "Running"],
  "sourceState.ongoing": ["\u542F\u52A8\u4E2D", "Starting"],
  "sourceState.warning": ["\u5F85\u5904\u7406", "Pending"],
  "sourceState.error": ["\u51FA\u9519", "Failing"],
  sourceOpenSettings: ["\u53BB\u8BBE\u7F6E", "Open settings"],
  "sourceState.setup": ["\u7B49\u5F85\u90E8\u7F72\u68C0\u67E5", "Waiting for the deployment check"],
  setupFixLink: ["\u53BB\u4FEE\u6B63", "Fix it"],
  "openSettingsOf.deployment": ["\u53BB\u90E8\u7F72\u9875\u4FEE\u6539", "Change it on Deployment"],
  // Trigger
  loadEarlier: ["\u52A0\u8F7D\u66F4\u65E9\u7684\u89E6\u53D1", "Load earlier Triggers"],
  subscribedTickets: ["\u8BA2\u9605\u6B64\u7EBF\u7A0B\u7684\u5DE5\u5355", "Tickets subscribed to this Thread"],
  threadNotFound: ["\u627E\u4E0D\u5230\u8FD9\u4E2A\u7EBF\u7A0B\u3002", "Thread not found."],
  threadsNone: ["\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u7EBF\u7A0B\u3002", "No matching Threads."],
  threadLatest: ["\u6700\u8FD1 {time}", "Latest {time}"],
  threadCreated: ["\u521B\u5EFA {time}", "Created {time}"],
  threadEvaluating: ["\u8BC4\u4F30\u8FDB\u884C\u4E2D", "Eval running"],
  pollFailed: ["\u8F6E\u8BE2\u5931\u8D25\uFF1A{error}", "Polling failed: {error}"],
  unsubscribe: ["\u53D6\u6D88\u8BA2\u9605", "Unsubscribe"],
  unsubscribeTitle: ["\u53D6\u6D88\u8BA2\u9605", "Unsubscribe"],
  unsubscribeConfirm: ["\u53D6\u6D88\u540E\uFF0C\u201C{title}\u201D\u7684\u65B0\u89E6\u53D1\u4E0D\u518D\u6247\u51FA\u7ED9\u5DE5\u5355\uFF0C\u76F4\u5230\u4E0B\u4E00\u6B21\u63A5\u5355\u6216\u5173\u8054\u3002", 'New Triggers in "{title}" will stop fanning out to Tickets until the next accept or attach.'],
  unsubscribePending: ["\u5DF2\u53D6\u6D88\u8BA2\u9605\uFF0C\u7ED3\u679C\u7B49\u5F85\u6CE8\u5165\u4E3B Session\u3002", "Unsubscribed; the receipt is waiting to reach the main Session."],
  openOriginal: ["\u6253\u5F00\u539F\u6587", "Open original"],
  evaluatingBanner: ["\u8BC4\u4F30\u8FDB\u884C\u4E2D\uFF1A{count} \u6761\u89E6\u53D1\uFF0C{strength}\uFF0C{deadline} \u5230\u671F\u3002", "Eval running: {count} Triggers, {strength}, due {deadline}."],
  noTriggers: ["\u6CA1\u6709\u4FDD\u7559\u7684\u89E6\u53D1\u3002", "No retained Triggers."],
  dispositionQueued: ["\u5DF2\u6392\u961F\uFF0C\u7B49\u5F85\u8BC4\u4F30", "Queued for Eval"],
  dispositionEvaluating: ["\u8BC4\u4F30\u8FDB\u884C\u4E2D", "Eval running"],
  dispositionFanout: ["\u6247\u51FA\u5230 {count} \u4E2A\u5DE5\u5355", "Fanned out to {count} Tickets"],
  dispositionDelivered: ["\u5DF2\u9001\u8FBE\u5DE5\u5355", "Delivered to Ticket"],
  dispositionDeliveredHint: ["\u6709\u4EBA\u5728\u5DF2\u6709\u5DE5\u5355\u7684\u7EBF\u7A0B\u4E0A\u8DDF\u8FDB\u65F6\uFF0C\u6D88\u606F\u76F4\u63A5\u9001\u8FBE\u5DE5\u5355\u7684\u6267\u884C\u5668\uFF0C\u4E0D\u7ECF\u8BC4\u4F30\uFF0C\u4E5F\u4E0D\u4EA7\u751F\u51B3\u5B9A\u3002", "A person's follow-up on a Thread with a Ticket goes straight to the Ticket's Executor, with no Eval and no Decision."],
  handedBack: ["\u201C{ticket}\u201D\u7684\u6267\u884C\u5668\u628A\u8FD9\u6761\u89E6\u53D1\u4EA4\u56DE\u8BC4\u4F30\uFF1A{reason}", "The Executor of \u201C{ticket}\u201D handed it back for an Eval: {reason}"],
  inputHandedBack: ["\u5DF2\u4EA4\u56DE\u8BC4\u4F30\uFF1A{reason}", "Handed back for an Eval: {reason}"],
  contextOnly: ["\u4EC5\u4F5C\u4E0A\u4E0B\u6587", "Context only"],
  contextOnlyHint: ["\u6267\u884C\u5668\u5173\u6CE8\u8FD9\u4E2A\u7EBF\u7A0B\u53EA\u4E3A\u4E86\u89E3\u60C5\u51B5\uFF1A\u8FD9\u91CC\u7684\u6D88\u606F\u4F1A\u9001\u8FBE\u5DE5\u5355\uFF0C\u4F46\u4E0D\u5E26\u6388\u6743\uFF0C\u4E5F\u4E0D\u4F1A\u6062\u590D\u5DF2\u7ED3\u675F\u7684\u5DE5\u5355\u3002", "The Executor follows this Thread only to stay informed: its messages reach the Ticket but grant nothing and resume no ended Ticket."],
  requeueAlready: ["\u8FD9\u6761\u89E6\u53D1\u5DF2\u7ECF\u5728\u8BC4\u4F30\u4E2D\u3002", "This Trigger is already in an Eval."],
  andMore: ["\u7B49 {count} \u4E2A", " and {count} more"],
  newestFirst: ["\u6700\u65B0\u5728\u524D", "newest first"],
  openTicket: ["\u67E5\u770B\u5DE5\u5355", "Open Ticket"],
  tagFiltered: ["\u5DF2\u8FC7\u6EE4\uFF1A{reason}", "Filtered: {reason}"],
  threadDormantShort: ["\u5DE5\u5355\u5DF2\u7ED3\u675F", "Tickets ended"],
  threadPollFailed: ["\u8F6E\u8BE2\u5931\u8D25", "Polling failed"],
  threadQueued: ["\u6392\u961F {count}", "{count} queued"],
  threadSubscribed: ["\u5DF2\u8BA2\u9605", "Subscribed"],
  threadUnsubscribed: ["\u672A\u8BA2\u9605", "Not subscribed"],
  fanoutTo: ["\u6247\u51FA\u7ED9", "Fans out to"],
  unsubscribeHint: ["\u53D6\u6D88\u8BA2\u9605\u540E\uFF0C\u8FD9\u4E2A\u7EBF\u7A0B\u7684\u65B0\u89E6\u53D1\u4E0D\u518D\u6247\u51FA\u7ED9\u5DE5\u5355\uFF0C\u76F4\u5230\u4E0B\u4E00\u6B21\u63A5\u5355\u6216\u5173\u8054\u3002", "After unsubscribing, new Triggers here stop fanning out to Tickets until the next accept or attach."],
  "threadFilter.subscribed": ["\u5DF2\u88AB\u8BA2\u9605", "Subscribed"],
  "threadFilter.evaluating": ["\u8BC4\u4F30\u4E2D", "Evaluating"],
  "threadFilter.recent": ["24 \u5C0F\u65F6\u5185\u6709\u65B0\u89E6\u53D1", "New Triggers in 24 h"],
  "threadFilter.all": ["\u5168\u90E8\u7EBF\u7A0B", "All Threads"],
  triggerIntro: ["\u89E6\u53D1\u6309\u7EBF\u7A0B\u5F52\u7EC4\uFF1B\u7EBF\u7A0B\u51B3\u5B9A\u5B83\u4EEC\u6247\u51FA\u7ED9\u54EA\u4E9B\u5DE5\u5355\u3001\u7531\u54EA\u6B21\u8BC4\u4F30\u5904\u7406\u3002", "Triggers grouped by Thread; the Thread decides which Tickets they fan out to and which Eval handles them."],
  threadDecisions: ["\u8FD9\u4E2A\u7EBF\u7A0B\u7684\u51B3\u5B9A \xB7 {count}", "Decisions in this Thread \xB7 {count}"],
  // Eval
  policyVersionHint: ["\u7B56\u7565\u7248\u672C\u7531\u63A5\u5355\u89C4\u5219\u3001\u5404\u6765\u6E90\u4E0A\u7684\u7B56\u7565\u548C\u8BC4\u4F30\u7684\u63A5\u5355\u6A21\u5F0F\u51B3\u5B9A\uFF1B\u4FEE\u6539\u4EFB\u4F55\u4E00\u9879\u90FD\u4F1A\u751F\u6210\u65B0\u7248\u672C\uFF0C\u5E76\u901A\u77E5\u8FDB\u884C\u4E2D\u7684\u5DE5\u5355\u3002\u6BCF\u4E2A\u5DE5\u5355\u8BB0\u4E0B\u63A5\u5355\u65F6\u7684\u7248\u672C\u3002", "The rules, the Policy on each Source and the accept mode of Eval make up the Policy version; any change makes a new version and notifies open Tickets. Each Ticket records the version it was accepted under."],
  syncNeedsSave: ["\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u4FEE\u6539\uFF0C\u518D\u540C\u6B65\u3002", "Save or discard your changes before syncing."],
  acceptMode: ["\u63A5\u5355\u6A21\u5F0F", "Accept mode"],
  "modeOption.off": ["\u53EA\u5904\u7406\u660E\u786E\u7684\u8BF7\u6C42\uFF0C\u4E0D\u8BC4\u4F30\u5176\u4ED6\u89E6\u53D1", "Only explicit requests are handled; other Triggers are not evaluated"],
  "modeOption.observe": ["\u8BC4\u4F30\u5176\u4ED6\u89E6\u53D1\u5E76\u8BB0\u5F55\u7814\u5224\uFF0C\u4F46\u4E0D\u63A5\u5355", "Other Triggers are evaluated and Assessments recorded, but nothing is accepted"],
  "modeOption.auto": ["\u5176\u4ED6\u89E6\u53D1\u7B26\u5408\u89C4\u5219\u65F6\u63A5\u5355", "Other Triggers that match a rule are accepted"],
  rulesHint: ["\u5199\u660E\u53EF\u4EE5\u63A5\u4EC0\u4E48\u3001\u5E94\u5FFD\u7565\u4EC0\u4E48\uFF0C\u4E5F\u53EF\u4EE5\u5199\u660E\u6309\u8FD9\u6761\u89C4\u5219\u63A5\u4E0B\u7684\u5DE5\u5355\u8BF7\u8C01\u5BA1\u9605 PR\u3002\u591A\u6761\u547D\u4E2D\u53EA\u63A5\u4E00\u5355\uFF0C\u6709\u51B2\u7A81\u6216\u4E0D\u660E\u786E\u65F6\u4E0D\u63A5\u5355\u3002", "State what to accept and what to ignore, and optionally who reviews the PRs of Tickets accepted under the rule. Several matches accept once; conflicts or ambiguity accept nothing."],
  addRule: ["\u6DFB\u52A0\u89C4\u5219", "Add rule"],
  rulesEmpty: ["\u6682\u65E0\u89C4\u5219\uFF0C\u4E0D\u4F1A\u4E3B\u52A8\u63A5\u5355\u3002", "No rules; nothing is accepted proactively."],
  ruleName: ["\u89C4\u5219\u540D\u79F0", "Rule name"],
  ruleInstruction: ["\u63A5\u5355\u6761\u4EF6", "Acceptance condition"],
  ruleInstructionPlaceholder: ["\u4F8B\u5982\uFF1A\u660E\u786E\u8981\u6C42\u4FEE\u6B63\u5DF2\u6709\u8BF4\u660E\u4E2D\u7684\u5931\u6548\u94FE\u63A5\uFF1B\u4E0D\u65B0\u589E\u6216\u6539\u53D8\u4EA7\u54C1\u627F\u8BFA\u3002", "For example: explicit requests to fix broken links in existing docs; no new product promises."],
  ruleEnable: ["\u542F\u7528\u89C4\u5219\uFF1A{name}", "Enable rule: {name}"],
  newRule: ["\u65B0\u89C4\u5219", "New rule"],
  duplicate: ["\u590D\u5236", "Duplicate"],
  copySuffix: [" \u526F\u672C", " copy"],
  evalTimeout: ["\u5355\u6B21\u8BC4\u4F30\u65F6\u9650 / \u79D2", "Eval time limit / seconds"],
  evalTimeoutHint: ["\u4E3B Session \u8BFB\u53D6\u4E0A\u4E0B\u6587\u5E76\u7814\u5224\u3002\u5230\u671F\u540E\u8BB0\u4E3A\u672A\u5B8C\u6210\uFF0C\u540E\u7EED\u89E6\u53D1\u91CD\u65B0\u8BC4\u4F30\u3002", "The main Session reads context and assesses. When time runs out the Eval is unavailable and later Triggers are evaluated again."],
  evalIntro: ["\u8BC4\u4F30\u51B3\u5B9A\u4E00\u6279\u89E6\u53D1\u662F\u5426\u6210\u4E3A\u5DE5\u4F5C\uFF1A\u63A8\u65AD\u51FA\u7684\u5019\u9009\u80FD\u5426\u63A5\u5355\u3001\u8BC4\u4F30\u65F6\u9650\u548C\u7814\u5224\u6A21\u578B\u3002", "Eval decides whether a batch of Triggers becomes work: whether inferred candidates may be accepted, the time limit, and the assessor model."],
  evalSettings: ["\u8BC4\u4F30\u8BBE\u7F6E", "Eval settings"],
  policyIntro: ["\u8BC4\u4F30\u4F9D\u636E\u7684\u89C4\u5219\uFF1A\u63A5\u5355\u89C4\u5219\uFF0C\u4EE5\u53CA\u5404\u6765\u6E90\u4E0A\u8C01\u80FD\u53D1\u8D77\u5DE5\u4F5C\u3002\u4FEE\u6539\u4F1A\u751F\u6210\u65B0\u7684\u7B56\u7565\u7248\u672C\uFF0C\u5E76\u901A\u77E5\u8FDB\u884C\u4E2D\u7684\u5DE5\u5355\u3002", "The rules Eval follows: the accept rules, and who may originate work on each Source. A change makes a new Policy version and notifies open Tickets."],
  assessorModel: ["\u7814\u5224\u6A21\u578B", "Assessor model"],
  assessorModelHint: ["\u4E3B Session \u7684\u6A21\u578B\uFF0C\u8D1F\u8D23\u7814\u5224\u548C\u8DEF\u7531\u3002\u4FDD\u5B58\u540E\u7528\u4E8E\u65B0\u5EFA\u7684\u4E3B Session\uFF0C\u5DF2\u6709 Session \u4FDD\u6301\u539F\u9009\u62E9\u3002", "Model of the main Session, which assesses and routes. Applies to a newly created main Session; existing Sessions keep their choice."],
  ruleLabel: ["\u89C4\u5219", "Rules"],
  "decisionFilter.work": ["\u63A5\u5355\u4E0E\u7EED\u505A", "Accept and reopen"],
  "decisionFilter.stop": ["\u505C\u6B62", "Stopped"],
  "decisionFilter.ignore": ["\u5FFD\u7565", "Ignored"],
  "decisionFilter.unavailable": ["\u672A\u5B8C\u6210", "Unavailable"],
  "decisionFilter.all": ["\u5168\u90E8", "All"],
  lastDayOnly: ["\u4EC5\u8FC7\u53BB 24 \u5C0F\u65F6\u5230\u8FBE\u7684\u89E6\u53D1 \u2715", "Triggers from the last 24 hours only \u2715"],
  evalStatusIntro: ["\u8BC4\u4F30\u6309\u7B56\u7565\u5BF9\u89E6\u53D1\u505A\u51FA\u7684\u51B3\u5B9A\uFF0C\u6BCF\u6761\u5199\u660E\u7406\u7531\u3002", "The Decisions Eval made on Triggers under the Policy, each with its reason."],
  policyPerSource: ["\u5728\u5404\u6765\u6E90\u4E0A", "On each Source"],
  policyPerSourceHint: ["\u7B56\u7565\u5728\u6BCF\u4E2A\u6765\u6E90\u4E0A\u7684\u90E8\u5206\uFF1A\u8C01\u80FD\u901A\u8FC7\u8FD9\u4E2A\u6765\u6E90\u53D1\u8D77\u5DE5\u4F5C\uFF0C\u7528\u8FD9\u4E2A\u6765\u6E90\u81EA\u5DF1\u7684\u8EAB\u4EFD\uFF1B\u4E0D\u540C\u6765\u6E90\u4E4B\u95F4\u4E0D\u5BF9\u5E94\u3002\u8981\u8BA9\u667A\u80FD\u4F53\u77E5\u9053\u540C\u4E00\u4E2A\u4EBA\u5728\u5404\u6765\u6E90\u7684\u8D26\u53F7\uFF0C\u5199\u5728\u63D0\u793A\u8BCD\u91CC\u3002", "The Policy's part on each Source: who may originate work through it, in that Source's own identities, with no mapping between Sources. To tell the agents a person's account on each Source, write it in the prompts."],
  explicitRequest: ["\u660E\u786E\u7684\u8BF7\u6C42", "Explicit request"],
  admission: ["\u51C6\u5165", "Admission"],
  admissionHint: ["\u6BCF\u4E2A\u63A5\u6536\u8303\u56F4\u91CC\uFF0C\u8C01\u7684\u4EC0\u4E48\u6D88\u606F\u7B97\u660E\u786E\u7684\u8BF7\u6C42\u3001\u63A8\u65AD\u7684\u5019\u9009\uFF0C\u6216\u88AB\u5FFD\u7565\u3002\u884C\u6765\u81EA\u6765\u6E90\u8BBE\u7F6E\u91CC\u7684\u63A5\u6536\u8303\u56F4\u3002\u8BA1\u5165\u7B56\u7565\u7248\u672C\u3002", "For each receiving scope, whose messages are explicit requests, inferred candidates, or ignored. The rows come from the receiving scopes in the Source settings. Part of the Policy version."],
  admissionScope: ["\u63A5\u6536\u8303\u56F4", "Receiving scope"],
  admissionListed: ["\u540D\u5355\u5185", "On the list"],
  admissionUnlisted: ["\u540D\u5355\u5916", "Not on the list"],
  admissionAddressed: ["\u70B9\u540D\u667A\u80FD\u4F53", "Addresses the agent"],
  admissionUnaddressed: ["\u672A @", "No mention"],
  admissionNotReceived: ["\u8FD9\u4E2A\u8303\u56F4\u6536\u4E0D\u5230\u8FD9\u7C7B\u6D88\u606F", "This scope does not receive these messages"],
  "admissionCell.listedUnaddressed": ["\u540D\u5355\u5185 \xB7 \u672A @", "On the list \xB7 no mention"],
  "admissionCell.unlistedAddressed": ["\u540D\u5355\u5916 \xB7 \u70B9\u540D\u667A\u80FD\u4F53", "Not on the list \xB7 addresses the agent"],
  "admissionCell.unlistedUnaddressed": ["\u540D\u5355\u5916 \xB7 \u672A @", "Not on the list \xB7 no mention"],
  "admissionValue.explicit": ["\u660E\u786E\u7684\u8BF7\u6C42", "Explicit request"],
  "admissionValue.inferred": ["\u63A8\u65AD\u7684\u5019\u9009", "Inferred candidate"],
  "admissionValue.ignore": ["\u5FFD\u7565", "Ignore"],
  admissionAnyoneWarning: ["\u8FD9\u4E2A\u8303\u56F4\u91CC\u4EFB\u4F55\u4EBA\u70B9\u540D\u667A\u80FD\u4F53\u90FD\u80FD\u76F4\u63A5\u53D1\u8D77\u5DE5\u4F5C", "Anyone here who addresses the agent can originate work directly"],
  admissionFootnote: ["\u300C\u63A8\u65AD\u7684\u5019\u9009\u300D\u6309\u63A5\u5355\u6A21\u5F0F\u8BC4\u4F30\uFF1A\u6A21\u5F0F\u4E3A\u5173\u95ED\u65F6\u5FFD\u7565\u3002\u5DF2\u6709\u5DE5\u5355\u7684\u7EBF\u7A0B\u91CC\u7684\u8DDF\u8FDB\u4E0D\u770B\u8FD9\u5F20\u8868\u3002\u6539\u6210\u66F4\u5F31\u7684\u9009\u9879\u65F6\uFF0C\u6309\u8FD9\u4E00\u683C\u63A5\u4E0B\u7684\u8FDB\u884C\u4E2D\u5DE5\u5355\u7684\u6388\u6743\u5931\u6548\u3002", "Inferred candidates follow the accept mode and are ignored when it is off. Follow-ups on Threads that have Tickets do not use this table. Weakening a cell revokes the Mandates of open Tickets accepted under it."],
  syncDone: ["\u4E0A\u6B21\u540C\u6B65", "Last synced"],
  evalRecordsPaused: ["\u5904\u7406\u5DF2\u6682\u505C\uFF1A\u65B0\u7684\u89E6\u53D1\u4F1A\u88AB\u8BB0\u5F55\uFF0C\u4F46\u4E0D\u4F1A\u88AB\u8BC4\u4F30\u3002", "Processing is paused: new Triggers are recorded but not evaluated."],
  resumeWhere: ["\u5728\u6267\u884C\u72B6\u6001\u4E2D\u6062\u590D", "Resume in the Execution status"],
  // Execution
  "outcome.completed": ["\u5DF2\u5B8C\u6210", "Completed"],
  "outcome.merged": ["PR \u5DF2\u5408\u5E76", "Pull request merged"],
  "outcome.closed": ["PR \u5DF2\u5173\u95ED\uFF08\u672A\u5408\u5E76\uFF09", "Pull request closed unmerged"],
  "outcome.dropped": ["\u65E0\u9700\u5904\u7406", "Nothing to do"],
  "outcome.stopped": ["\u4EBA\u5DE5\u505C\u6B62", "Stopped by a person"],
  "assignment.pending": ["\u5F85\u542F\u52A8", "Pending"],
  "assignment.running": ["\u6267\u884C\u4E2D", "Running"],
  "assignment.ended": ["\u5DF2\u7ED3\u675F", "Ended"],
  "report.queued": ["\u6392\u961F", "queued"],
  "report.running": ["\u6267\u884C\u4E2D", "running"],
  "report.progress": ["\u8FDB\u5C55", "progress"],
  "report.waiting": ["\u7B49\u5F85", "waiting"],
  "report.ready": ["\u5C31\u7EEA", "ready"],
  "report.blocked": ["\u53D7\u963B", "blocked"],
  "report.failed": ["\u5931\u8D25", "failed"],
  "report.dropped": ["\u65E0\u9700\u5904\u7406", "no action needed"],
  "report.completed": ["\u5DF2\u5B8C\u6210", "completed"],
  "report.merged": ["\u5DF2\u5408\u5E76", "merged"],
  "report.closed": ["PR \u5DF2\u5173\u95ED", "PR closed"],
  "report.stopped": ["\u5DF2\u505C\u6B62", "stopped"],
  "report.open": ["\u8FDB\u884C\u4E2D", "open"],
  "input.trigger": ["\u89E6\u53D1", "Trigger"],
  "input.policy-changed": ["\u7B56\u7565\u53D8\u66F4", "Policy change"],
  "input.reopen": ["\u7EED\u505A", "Reopened"],
  "input.resumed": ["\u6062\u590D\uFF1A\u7EBF\u7A0B\u4E0A\u6709\u4EBA\u53D1\u4E86\u65B0\u6D88\u606F", "Resumed by a new message on its thread"],
  "input.text": ["dsh-superagent \u8BF4\u660E", "dsh-superagent note"],
  "input.note": ["\u4E3B Session \u7684\u5907\u6CE8", "Orchestrator note"],
  attentionPrefix: ["\u5F85\u4EBA\u5DE5\u51B3\u5B9A\uFF1A", "Attention: "],
  stopConfirmTitle: ["\u505C\u6B62\u5DE5\u5355", "Stop Ticket"],
  stopConfirm: ["\u505C\u6B62\u201C{title}\u201D\uFF1F\u5F53\u524D\u6D3E\u5DE5\u7ED3\u675F\uFF0CSession \u548C\u6267\u884C\u76EE\u5F55\u4FDD\u7559\uFF1B\u505C\u6B62\u6536\u56DE\u6388\u6743\uFF0C\u4E4B\u540E\u7EBF\u7A0B\u91CC\u7684\u6D88\u606F\u4E0D\u518D\u6062\u590D\u5B83\uFF0C\u8981\u7EE7\u7EED\u9700\u8981\u91CD\u65B0\u63A5\u5355\u3002", 'Stop "{title}"? Its current Assignment ends; its Session and directory stay. Stopping withdraws its Mandate: later messages on its Threads do not resume it, and continuing needs a new accept.'],
  endedAt: ["{time} {outcome}\uFF1A{reason}", "{time} {outcome}: {reason}"],
  assignmentNumber: ["\u7B2C {number} \u6B21\u6D3E\u5DE5", "Assignment {number}"],
  inputDelivered: ["\u5DF2\u9001\u8FBE", "Delivered"],
  inputPausedHint: ["\u672A\u9001\u8FBE\uFF1A\u5904\u7406\u5DF2\u6682\u505C\uFF0C\u6062\u590D\u540E\u9001\u8FBE", "Undelivered: processing is paused; delivery resumes with it"],
  inputWaitingHint: ["\u672A\u9001\u8FBE\uFF1A\u7B49\u5F85\u6D3E\u5DE5\u8FD0\u884C", "Undelivered: waiting for the Assignment to run"],
  inputRetryHint: ["\u672A\u9001\u8FBE\uFF1A\u4F1A\u81EA\u52A8\u91CD\u8BD5\uFF0C\u76F4\u5230\u9001\u8FBE", "Undelivered: delivery is retried until it succeeds"],
  deliveryFailedPrefix: ["\u9001\u8FBE\u5931\u8D25\uFF1A", "Delivery failed: "],
  subscribedThreads: ["\u8BA2\u9605\u7684\u7EBF\u7A0B", "Subscribed Threads"],
  answerIn: ["\u53BB{source}\u56DE\u7B54", "Answer in {source}"],
  ticketNotFound: ["\u627E\u4E0D\u5230\u8FD9\u4E2A\u5DE5\u5355\u3002", "Ticket not found."],
  identifiers: ["\u6807\u8BC6", "Identifiers"],
  "basis.admission": ["\u51C6\u5165", "Admission"],
  "basis.followup": ["\u7EBF\u7A0B\u5185\u8DDF\u8FDB", "Follow-up in Thread"],
  "basis.observation": ["\u63A5\u6536\u5168\u90E8\u6D88\u606F\u7684\u7FA4", "Chat receiving all messages"],
  "basis.bot": ["\u540D\u5355\u5185\u7684\u673A\u5668\u4EBA", "Listed bot"],
  "basis.mode": ["\u63A5\u5355\u6A21\u5F0F", "Accept mode"],
  "basis.rules": ["\u547D\u4E2D\u89C4\u5219", "Matched rules"],
  "basis.legacyAuthority": ["\u65E7\u7248\u6388\u6743", "Legacy authority"],
  "legacy.explicit_mention": ["@ \u667A\u80FD\u4F53", "Mention"],
  "legacy.proactive_rule": ["\u4E3B\u52A8\u89C4\u5219", "Proactive rule"],
  "legacy.thread_followup": ["\u7EBF\u7A0B\u5185\u8DDF\u8FDB", "Thread follow-up"],
  ruleMatched: ["{rule} \xB7 \u5339\u914D\uFF1A{reason}", "{rule} \xB7 matched: {reason}"],
  ruleUnmatched: ["{rule} \xB7 \u4E0D\u5339\u914D\uFF1A{reason}", "{rule} \xB7 not matched: {reason}"],
  directionLine: ["\u5B9E\u65BD\u610F\u56FE\uFF1A{intent}\uFF1B\u4FEE\u6539\u4F9D\u636E\uFF1A{basis}\uFF1B{design}", "Implementation intent: {intent}; target: {basis}; {design}"],
  intentYes: ["\u5DF2\u660E\u786E", "established"],
  intentNo: ["\u672A\u660E\u786E", "not established"],
  "targetBasis.specified": ["\u5DF2\u660E\u786E\u76EE\u6807", "specified"],
  "targetBasis.existing-standard": ["\u65E2\u6709\u89C4\u8303\uFF0F\u5DF2\u9A8C\u8BC1\u6B63\u786E\u72B6\u6001", "existing standard or verified correct state"],
  "targetBasis.undetermined": ["\u76EE\u6807\u672A\u5B9A", "undetermined"],
  designNeeded: ["\u4ECD\u9700\u4EA7\u54C1\uFF0F\u89C6\u89C9\u8BBE\u8BA1\u51B3\u7B56", "a product or design decision remains"],
  designNotNeeded: ["\u65E0\u9700\u65B0\u589E\u8BBE\u8BA1\u51B3\u7B56", "no new design decision"],
  directionEvidence: ["\u65B9\u5411\u8BC1\u636E\uFF1A{evidence}", "Evidence: {evidence}"],
  maxWorkers: ["\u5E76\u884C\u5DE5\u5355\u6570", "Concurrent Tickets"],
  maxWorkersHint: ["\u8D85\u8FC7\u5E76\u53D1\u4E0A\u9650\u7684\u5DE5\u5355\u6392\u961F\u7B49\u5F85\u3002", "Tickets beyond the limit wait in a queue."],
  "basis.sender": ["\u53D1\u8D77\u4EBA", "Sender"],
  "basis.addressed": ["\u70B9\u540D\u65B9\u5F0F", "Addressed by"],
  "addressed.mention": ["@ \u667A\u80FD\u4F53", "Mention"],
  "addressed.direct": ["\u79C1\u804A", "Direct message"],
  executorIntro: ["\u6267\u884C\u5668\u6267\u884C\u6D3E\u5DE5\uFF1A\u6BCF\u4E2A\u5DE5\u5355\u4E00\u4E2A\u6267\u884C\u5668 Session \u548C\u6267\u884C\u76EE\u5F55\u3002", "The Executor runs Assignments: one Executor Session and directory per Ticket."],
  executorModel: ["\u6267\u884C\u5668\u6A21\u578B", "Executor model"],
  executorModelHint: ["\u4FDD\u5B58\u540E\u7528\u4E8E\u65B0\u5EFA\u7684\u6267\u884C\u5668 Session\uFF0C\u5DF2\u6709 Session \u4FDD\u6301\u539F\u9009\u62E9\u3002\u7559\u7A7A\u7EE7\u627F DSH \u9ED8\u8BA4\u503C\u3002", "Applies to new Executor Sessions; existing Sessions keep their choice. Leave empty to inherit the DSH default."],
  assignmentReportShort: ["\u62A5\u544A\uFF1A{state}", "Report: {state}"],
  assignmentSpan: ["{from} \u2192 {to}", "{from} \u2192 {to}"],
  inputUndelivered: ["\u672A\u9001\u8FBE", "Undelivered"],
  mandateDetails: ["\u6388\u6743\u8BE6\u60C5", "Mandate details"],
  now: ["\u73B0\u5728", "now"],
  stopHint: ["\u505C\u6B62\u540E\u5F53\u524D\u6D3E\u5DE5\u7ED3\u675F\uFF0CSession \u548C\u6267\u884C\u76EE\u5F55\u4FDD\u7559\uFF1B\u505C\u6B62\u6536\u56DE\u6388\u6743\uFF0C\u4E4B\u540E\u7EBF\u7A0B\u91CC\u7684\u6D88\u606F\u4E0D\u518D\u6062\u590D\u5B83\uFF0C\u8981\u7EE7\u7EED\u9700\u8981\u91CD\u65B0\u63A5\u5355\u3002", "Stopping ends the current Assignment; its Session and directory stay. Stopping withdraws its Mandate: later messages on its Threads do not resume it, and continuing needs a new accept."],
  idleHint: ["\u6267\u884C\u5668\u7ED3\u675F\u4E86\u5F53\u524D\u56DE\u5408\uFF0C\u6CA1\u6709\u63D0\u51FA\u95EE\u9898\uFF1B\u8FD9\u4E9B\u5DE5\u5355\u8BA2\u9605\u7684\u7EBF\u7A0B\u6536\u5230\u65B0\u89E6\u53D1\u65F6\u7EE7\u7EED\u3002", "The Executor ended its turn without asking anything; a new Trigger on a subscribed Thread resumes it."],
  "stage.answer": ["\u5F85\u56DE\u7B54", "Awaiting answer"],
  "stage.review": ["\u5F85\u9A8C\u6536", "Awaiting review"],
  "stage.blocked": ["\u5F85\u5904\u7406\u53D7\u963B", "Blocked"],
  "stage.failed": ["\u5F85\u5904\u7406\u5931\u8D25", "Failed"],
  "stage.delivery": ["\u8F93\u5165\u672A\u9001\u8FBE", "Input undelivered"],
  "stage.queued": ["\u6392\u961F\u4E2D", "Queued"],
  "stage.working": ["\u6267\u884C\u4E2D", "Working"],
  "stage.idle": ["\u7B49\u5F85\u65B0\u89E6\u53D1", "Waiting for a Trigger"],
  deliveredInputs: ["\u5DF2\u9001\u8FBE\u7684\u8F93\u5165 \xB7 {count}", "Delivered Inputs \xB7 {count}"],
  endedAtShort: ["{time} {outcome}", "{time} {outcome}"],
  legacyAssignment: ["\u539F\u59CB\u8BF4\u660E", "Original brief"],
  legacyScopeShort: ["\u672A\u8BB0\u5F55\uFF08\u65E7\u7248\u5BFC\u5165\uFF09", "Not recorded (legacy import)"],
  retry: ["\u91CD\u8BD5", "Retry"],
  failedPrefix: ["\u5931\u8D25\uFF1A", "Failed: "],
  blockedPrefix: ["\u53D7\u963B\uFF1A", "Blocked: "],
  retryConfirm: ["\u4E3A\u201C{title}\u201D\u7ED3\u675F\u5F53\u524D\u6D3E\u5DE5\u5E76\u91CD\u65B0\u6D3E\u5DE5\uFF1F\u6388\u6743\u548C\u8BA2\u9605\u4E0D\u53D8\u3002", 'End the current Assignment of "{title}" and start a new one? Mandate and Subscriptions stay.'],
  retryTitle: ["\u91CD\u8BD5\u5DE5\u5355", "Retry Ticket"],
  undeliveredInputs: ["\u672A\u9001\u8FBE\u7684\u8F93\u5165", "Undelivered Inputs"],
  executionStatusIntro: ["\u6267\u884C\u5668\u7684\u72B6\u6001\uFF0C\u4EE5\u53CA\u6309\u5728\u7B49\u8C01\u5206\u7EC4\u7684\u5DE5\u5355\u3002", "The Executor's state, and the Tickets grouped by who they wait on."],
  ticketUndeliveredLabel: ["\u672A\u9001\u8FBE", "Undelivered"],
  ticketMandateLabel: ["\u6388\u6743", "Mandate"],
  ticketActorLabel: ["\u53D1\u8D77", "From"],
  ticketUpdatedLabel: ["\u66F4\u65B0", "Updated"],
  executionDirectory: ["\u6267\u884C\u76EE\u5F55\u7684\u6839\u76EE\u5F55", "Ticket directory root"],
  executionDirectoryDefault: ["\u7559\u7A7A\u65F6\u7528 {root}", "Empty uses {root}"],
  executionDirectoryEmpty: ["\u7559\u7A7A\uFF1A\u9ED8\u8BA4\u76EE\u5F55", "Empty: the default directory"],
  openThread: ["\u6253\u5F00 {source} \u539F\u6587", "Open on {source}"],
  executionDirectoryHint: ["\u6BCF\u4E2A\u5DE5\u5355\u5728\u8FD9\u91CC\u6709\u81EA\u5DF1\u7684\u76EE\u5F55\uFF0C\u4EE5\u5DE5\u5355\u77ED\u540D\u547D\u540D\uFF1B\u6267\u884C\u5668 Session \u5728\u5176\u4E2D\u5DE5\u4F5C\u3002\u8FD9\u53EA\u6309\u76EE\u5F55\u5206\u5F00\u5DE5\u5355\uFF0C\u4E0D\u662F\u5B89\u5168\u8FB9\u754C\u3002", "Each Ticket gets its own directory here, named by its short name, where its Executor Session works. This separates Tickets by directory only; it is not a security boundary."],
  prepareCommand: ["\u51C6\u5907\u547D\u4EE4", "Prepare command"],
  prepareCommandHint: ["\u65B0\u5DE5\u5355\u7684\u76EE\u5F55\u5EFA\u597D\u524D\uFF0C\u5728\u6839\u76EE\u5F55\u4E0B\u7528 sh \u8FD0\u884C\u4E00\u6B21\uFF0C\u6267\u884C\u73AF\u5883\u7684\u53D8\u91CF\u662F\u5B83\u7684\u73AF\u5883\u53D8\u91CF\uFF0C\u4F8B\u5982\u7528 git worktree \u628A\u4ED3\u5E93\u68C0\u51FA\u5230 $DSH_SUPERAGENT_DIR\u3002\u7559\u7A7A\u5C31\u662F\u7A7A\u76EE\u5F55\u3002\u5931\u8D25\u65F6\u5DE5\u5355\u663E\u793A\u5931\u8D25\uFF0C\u5E76\u9644\u4E0A\u547D\u4EE4\u7684\u8F93\u51FA\u3002", "Runs once with sh in the root before a new Ticket's directory exists, with the execution environment's variables as its environment, for example to check a repository out to $DSH_SUPERAGENT_DIR with git worktree. Leave it empty for an empty directory. A failure fails the Ticket with the command's output."],
  prepareCommandEmpty: ["\u7559\u7A7A\uFF1A\u7A7A\u76EE\u5F55", "Empty: an empty directory"],
  blockedCommands: ["\u7981\u6B62\u8C03\u7528\u7684\u547D\u4EE4", "Blocked commands"],
  blockedCommandsHint: ["\u6267\u884C\u5668 Session \u8C03\u7528\u8FD9\u4E9B\u547D\u4EE4\u540D\u65F6\u76F4\u63A5\u5931\u8D25\uFF0C\u4F8B\u5982\u7528\u4F60\u4E2A\u4EBA\u8D26\u53F7\u767B\u5F55\u7684 CLI\u3002\u53EA\u62E6\u6309\u540D\u5B57\u7684\u8C03\u7528\uFF0C\u7528\u7EDD\u5BF9\u8DEF\u5F84\u4ECD\u80FD\u8FD0\u884C\uFF0C\u6240\u4EE5\u4E0D\u662F\u5B89\u5168\u8FB9\u754C\u3002gh\u3001git\u3001lark-cli \u4E0D\u80FD\u7981\u6B62\u3002", "Command names that fail when an Executor Session calls them, such as a CLI signed in to your own account. Only calls by name fail; an absolute path still runs, so this is not a security boundary. gh, git and lark-cli cannot be blocked."],
  blockedCommandsNone: ["\u4EE5\u7A7A\u683C\u5206\u9694\uFF1B\u6CA1\u6709", "Separated by spaces; none"],
  environmentIntro: ["\u6267\u884C\u5668\u548C\u5404\u6765\u6E90\u5411\u6267\u884C\u73AF\u5883\u767B\u8BB0\u53D8\u91CF\uFF0C\u6BCF\u4E2A\u6709\u952E\u3001\u503C\u548C\u8BF4\u660E\u3002\u51C6\u5907\u547D\u4EE4\u4EE5\u73AF\u5883\u53D8\u91CF\u8BFB\u53D6\u5B83\u4EEC\uFF0C\u6267\u884C\u5668 Session \u5728\u6307\u4EE4\u91CC\u8BFB\u5230\u5B83\u4EEC\u548C\u8BF4\u660E\u3002\u5DE5\u5355\u81EA\u5DF1\u7684\u503C\u6765\u81EA\u5B83\u7684\u76EE\u5F55\u548C\u63A5\u4E0B\u5B83\u7684\u89E6\u53D1\uFF0C\u5176\u4F59\u662F\u90E8\u7F72\u7684\u5F53\u524D\u503C\uFF1B\u4E0D\u542B\u4EFB\u4F55\u5BC6\u94A5\u3002\u53EA\u80FD\u5728\u7BA1\u7406\u9875\u4FEE\u6539\u3002", "The Executor and the Sources register variables with the execution environment, each with a key, a value and a description. The prepare command reads them as environment variables, and the Executor Session reads them with their descriptions in its instructions. A Ticket's own values follow from its directory and the Trigger that started it; the others are the deployment's current values. None holds a credential. Only the management page can change these settings."],
  environmentVariables: ["\u53EF\u7528\u7684\u73AF\u5883\u53D8\u91CF", "Available variables"],
  environmentPick: ["\u70B9\u51FB\u952E\u540D\u63D2\u5165\u5230\u51C6\u5907\u547D\u4EE4\u3002", "Choose a key to insert it into the prepare command."],
  environmentKey: ["\u952E", "Key"],
  environmentDescription: ["\u8BF4\u660E", "Description"],
  environmentOwner: ["\u6CE8\u518C\u8005", "Registered by"],
  executorRunning: ["\u6267\u884C\u5668\u8FD0\u884C\u4E2D", "Executor running"],
  pauseProcessing: ["\u6682\u505C\u5904\u7406", "Pause processing"],
  pauseProcessingConfirm: ["\u6682\u505C\u540E\uFF0C\u6765\u6E90\u7EE7\u7EED\u8BB0\u5F55\u89E6\u53D1\uFF0C\u4F46\u4E0D\u5F00\u59CB\u65B0\u7684\u8BC4\u4F30\u3001\u4E0D\u6D3E\u5DE5\u3001\u4E0D\u53D1\u9001\u56DE\u590D\uFF0C\u76F4\u5230\u6062\u590D\u3002", "While paused, Sources keep recording Triggers, but no Evals or Assignments start and no replies are sent until processing resumes."],
  processingPaused: ["\u5904\u7406\u5DF2\u6682\u505C", "Processing paused"],
  "ticketFilter.open": ["\u8FDB\u884C\u4E2D", "Open"],
  "ticketFilter.person": ["\u5F85\u5904\u7406", "Pending"],
  "ticketFilter.working": ["\u6267\u884C\u4E2D", "Working"],
  "ticketFilter.idle": ["\u7B49\u5F85\u65B0\u89E6\u53D1", "Waiting for a Trigger"],
  "ticketFilter.ended": ["\u5DF2\u7ED3\u675F", "Ended"],
  // Settings, drafts, and configuration history
  policyVersionUnrecorded: ["\u6700\u8FD1\u7684\u4FDD\u5B58\u8BB0\u5F55\u91CC\u6CA1\u6709\u7B56\u7565\u7248\u672C {version}\uFF1A\u5B83\u6765\u81EA\u66F4\u65E9\u7684\u4FDD\u5B58\u3001\u9996\u6B21\u542F\u52A8\u65F6\u7684\u8BBE\u7F6E\u6216\u66F4\u65E9\u7684\u6570\u636E\u3002", "The recent saves do not include Policy version {version}: an older save, the settings at the first start, or older data made it."],
  defaultModel: ["DSH \u5F53\u524D\u9ED8\u8BA4\uFF1A{model}", "DSH default: {model}"],
  defaultModelUnavailable: ["DSH \u9ED8\u8BA4\u6A21\u578B\u6682\u4E0D\u53EF\u7528", "DSH default model unavailable"],
  modelProvider: ["\u670D\u52A1\u5546", "Provider"],
  modelName: ["\u6A21\u578B", "Model"],
  modelEffort: ["\u63A8\u7406\u5F3A\u5EA6\uFF08\u53EF\u9009\uFF09", "Reasoning effort (optional)"],
  modelInherit: ["\u7EE7\u627F DSH \u9ED8\u8BA4\u503C", "Inherit the DSH default"],
  modelEffortDefault: ["\u6A21\u578B\u9ED8\u8BA4", "Model default"],
  modelCatalogError: ["\u65E0\u6CD5\u52A0\u8F7D\u6A21\u578B\u5EFA\u8BAE\uFF0C\u4ECD\u53EF\u586B\u5199\u5DF2\u77E5\u7684\u670D\u52A1\u5546\u548C\u6A21\u578B\uFF1A{error}", "Model suggestions are unavailable; known Provider and Model names still work: {error}"],
  historyIntro: ["\u6BCF\u6B21\u4FDD\u5B58\u8BB0\u4E00\u6761\uFF1B\u6539\u53D8\u7B56\u7565\u7248\u672C\u7684\u4FDD\u5B58\uFF08\u63A5\u5355\u89C4\u5219\u3001\u5404\u6765\u6E90\u4E0A\u7684\u7B56\u7565\u3001\u63A5\u5355\u6A21\u5F0F\uFF09\u901A\u77E5\u8FDB\u884C\u4E2D\u7684\u5DE5\u5355\u3002", "Each save is one entry; saves that change the Policy version (rules, the Policy on each Source, accept mode) notify open Tickets."],
  historyItem: ["\u7B2C {revision} \u6B21\u4FDD\u5B58 \xB7 {source}", "Save {revision} \xB7 {source}"],
  historyPolicyChanged: ["\u751F\u6210\u7B56\u7565\u7248\u672C {version}", "New Policy version {version}"],
  historyNoBaseline: ["\u4E0A\u4E00\u4E2A\u8BBE\u7F6E\u7248\u672C\u6CA1\u6709\u8BB0\u5F55\uFF0C\u65E0\u6CD5\u6BD4\u8F83\u3002", "The previous revision was not recorded; nothing to compare."],
  historyNoChanges: ["\u5F53\u524D\u8BBE\u7F6E\u9879\u6CA1\u6709\u53D8\u5316\u3002", "No change to current settings."],
  historyNotified: ["\u56E0\u7B56\u7565\u53D8\u66F4\u901A\u77E5\u4E86 {count} \u4E2A\u8FDB\u884C\u4E2D\u7684\u5DE5\u5355\uFF1A{titles}", "Policy change notified {count} open Tickets: {titles}"],
  historyEmpty: ["\u8FD8\u6CA1\u6709\u8BB0\u5F55\u7684\u7248\u672C\uFF1B\u4E0B\u6B21\u4FDD\u5B58\u540E\u5F00\u59CB\u8BB0\u5F55\u3002", "No revisions recorded yet; history starts with the next save."],
  "change.mode": ["\u63A5\u5355\u6A21\u5F0F\uFF1A{from} \u2192 {to}", "Accept mode: {from} \u2192 {to}"],
  "change.timeout": ["\u8BC4\u4F30\u65F6\u9650\uFF1A{from} \u2192 {to} \u79D2", "Eval time limit: {from} \u2192 {to} s"],
  "change.ruleAdded": ["\u65B0\u589E\u89C4\u5219\uFF1A{name}", "Rule added: {name}"],
  "change.ruleRenamed": ["\u89C4\u5219\u6539\u540D\uFF1A{from} \u2192 {to}", "Rule renamed: {from} \u2192 {to}"],
  "change.ruleInstruction": ["\u89C4\u5219\u6761\u4EF6\u4FEE\u6539\uFF1A{name}", "Rule condition changed: {name}"],
  "change.ruleEnabled": ["\u89C4\u5219\u542F\u7528\uFF1A{name}", "Rule enabled: {name}"],
  "change.ruleDisabled": ["\u89C4\u5219\u505C\u7528\uFF1A{name}", "Rule disabled: {name}"],
  "change.ruleRemoved": ["\u5220\u9664\u89C4\u5219\uFF1A{name}", "Rule removed: {name}"],
  "change.paused": ["\u6682\u505C\u5904\u7406", "Processing paused"],
  "change.resumed": ["\u6062\u590D\u5904\u7406", "Processing resumed"],
  "change.maxWorkers": ["\u5E76\u884C\u5DE5\u5355\u6570\uFF1A{from} \u2192 {to}", "Concurrent Tickets: {from} \u2192 {to}"],
  "change.executionDirectory": ["\u6267\u884C\u76EE\u5F55\u7684\u6839\u76EE\u5F55\uFF1A{from} \u2192 {to}", "Ticket directory root: {from} \u2192 {to}"],
  "change.prepareCommand": ["\u51C6\u5907\u547D\u4EE4", "Prepare command"],
  "change.blockedCommands": ["\u7981\u6B62\u8C03\u7528\u7684\u547D\u4EE4\uFF1A{from} \u2192 {to}", "Blocked commands: {from} \u2192 {to}"],
  configHistory: ["\u914D\u7F6E\u5386\u53F2", "Configuration history"],
  "change.evalModel": ["\u7814\u5224\u6A21\u578B", "Assessor model"],
  "change.executorModel": ["\u6267\u884C\u5668\u6A21\u578B", "Executor model"],
  "change.sourceEnabled": ["\u542F\u7528\u6765\u6E90\uFF1A{source}", "Source enabled: {source}"],
  "change.sourceDisabled": ["\u505C\u7528\u6765\u6E90\uFF1A{source}", "Source disabled: {source}"],
  "change.sourceAdmission": ["{source} \xB7 \u51C6\u5165\u4FEE\u6539", "{source} \xB7 admission changed"],
  "change.sourceField": ["{source} \xB7 {field}\uFF1A{from} \u2192 {to}", "{source} \xB7 {field}: {from} \u2192 {to}"],
  "change.sourceRowsAdded": ["{source} \xB7 {field} \u65B0\u589E\uFF1A{items}", "{source} \xB7 {field} added: {items}"],
  "change.sourceRowsRemoved": ["{source} \xB7 {field} \u79FB\u9664\uFF1A{items}", "{source} \xB7 {field} removed: {items}"],
  "change.sourceRowsChanged": ["{source} \xB7 {field} \u4FEE\u6539\uFF1A{items}", "{source} \xB7 {field} changed: {items}"],
  draftRestored: ["\u672A\u4FDD\u5B58 \xB7 \u5DF2\u6062\u590D\u8349\u7A3F", "Unsaved \xB7 draft restored"],
  draftKept: ["\u672A\u4FDD\u5B58 \xB7 \u8349\u7A3F\u5DF2\u4FDD\u7559", "Unsaved \xB7 draft kept"],
  draftFailed: ["\u65E0\u6CD5\u4FDD\u7559\u8349\u7A3F\uFF0C\u8BF7\u4FDD\u5B58\u540E\u518D\u79BB\u5F00\uFF1A{error}", "Could not keep the draft; save before leaving: {error}"],
  save: ["\u4FDD\u5B58", "Save"],
  discard: ["\u653E\u5F03\u4FEE\u6539", "Discard changes"],
  saveConflict: ["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u4FEE\u6539\uFF0C\u5176\u4E2D\u6709\u4F60\u4E5F\u6539\u8FC7\u7684\u9879\uFF1B\u4FDD\u5B58\u4F1A\u4EE5\u4F60\u7684\u4FEE\u6539\u4E3A\u51C6\u3002", "Settings changed elsewhere, including items you changed too; saving keeps your version of them."],
  saveMerged: ["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u4FEE\u6539\uFF0C\u4F60\u7684\u4FEE\u6539\u5DF2\u5408\u5E76\u5230\u6700\u65B0\u7248\u672C\uFF1B\u8BF7\u68C0\u67E5\u540E\u4FDD\u5B58\u3002", "Settings changed elsewhere; your changes are merged onto the latest version. Check them, then save."],
  saveRebasing: ["\u5DF2\u5728\u522B\u5904\u4FEE\u6539\uFF0C\u6B63\u5728\u8BFB\u53D6\u6700\u65B0\u7248\u672C\u2026", "Changed elsewhere; reading the latest version\u2026"],
  invalidSettings: ["\u8FD9\u4E9B\u5B57\u6BB5\u65E0\u6548\uFF1A{fields}", "Invalid fields: {fields}"],
  "settingsGroup.source": ["\u6765\u6E90", "Sources"],
  "settingsGroup.mcp": ["MCP \u4E0E\u684C\u9762 GUI", "MCP & Desktop GUI"],
  "settingsGroup.eval": ["\u8BC4\u4F30", "Eval"],
  "settingsGroup.execution": ["\u6267\u884C", "Execution"],
  "settingsGroup.prompts": ["\u63D0\u793A\u8BCD", "Prompts"],
  "settingsGroup.deployment": ["\u90E8\u7F72", "Deployment"],
  mcpNavTitle: ["MCP", "MCP"],
  mcpPluginTabTitle: ["MCP \u9ED8\u8BA4\u9762\u677F", "MCP Default"],
  unsetValue: ["\u672A\u8BBE\u7F6E", "not set"],
  // Prompts
  promptChanges: ["{count} \u5904\u4FEE\u6539", "{count} changes"],
  unsaved: ["\u672A\u4FDD\u5B58", "Unsaved"],
  promptsDraftVersion: ["\u672A\u4FDD\u5B58 \xB7 \u57FA\u4E8E\u7248\u672C {revision}", "Unsaved \xB7 based on version {revision}"],
  "promptPart.runtime/admission": ["\u4E3B Session \u63A5\u5355\u7EA6\u675F", "Main Session accept constraints"],
  "promptPart.runtime/policy": ["\u7B56\u7565\u4E0E\u542F\u7528\u7684\u89C4\u5219", "Policy and enabled rules"],
  "promptPart.runtime/handoff/orchestrator": ["\u5DE5\u5355\u4EA4\u4ED8\u4E0E\u4EBA\u5DE5\u786E\u8BA4\uFF08\u4E3B Session\uFF09", "Ticket handoff and human confirmation (main Session)"],
  "promptPart.runtime/handoff/worker": ["\u5DE5\u5355\u4EA4\u4ED8\u4E0E\u4EBA\u5DE5\u786E\u8BA4\uFF08\u6267\u884C\u5668\uFF09", "Ticket handoff and human confirmation (Executor)"],
  "promptPart.runtime/policy/none": ["\u7B56\u7565\uFF08\u6CA1\u6709\u542F\u7528\u7684\u89C4\u5219\u65F6\uFF09", "Policy (when no rule is enabled)"],
  "promptPart.skill/feishu": ["\u98DE\u4E66\u6280\u80FD", "Feishu skill"],
  "promptPart.skill/github": ["GitHub \u6280\u80FD", "GitHub skill"],
  "promptPart.runtime/environment": ["\u6267\u884C\u73AF\u5883", "Execution environment"],
  promptViewEdit: ["\u7F16\u8F91", "Edit"],
  promptViewFull: ["\u5B8C\u6574\u63D0\u793A\u8BCD", "Full prompt"],
  promptViewHistory: ["\u5386\u53F2", "History"],
  promptSections: ["\u63D0\u793A\u8BCD\u6BB5\u843D", "Prompt sections"],
  promptTeamGroup: ["\u56E2\u961F\u7EA6\u5B9A", "Team agreements"],
  promptSkillsGroup: ["\u6280\u80FD", "Skills"],
  "promptPartHint.communication": ["\u4F55\u65F6\u901A\u77E5\u4EBA\u3001\u6D88\u606F\u7684\u5199\u6CD5\u3001GitHub \u9996\u884C\u58F0\u660E\u3001Review \u7684\u56DE\u590D\u4E0E review bot", "When to notify people, how messages read, the GitHub first line, review replies and review bots"],
  "promptPartHint.scope": ["\u5DE5\u5355\u4F55\u65F6\u7EE7\u7EED\u3001\u4F55\u65F6\u6682\u505C\u5E76\u4EA4\u8349\u7A3F", "When a Ticket goes on, and when it stops with a draft"],
  "promptPartHint.delivery": ["PR \u8BC1\u636E\u3001\u81EA\u52A8\u5408\u5E76\u6761\u4EF6\u3001\u63D0\u4EA4\u4F5C\u8005", "PR evidence, the auto-merge condition, the commit author"],
  "promptReadBy.both": ["\u4E3B Session \u548C\u6267\u884C\u5668 Session \u90FD\u4F1A\u8BFB\u5230\u3002", "The main Session and Executor Sessions read it."],
  "promptReadBy.skill": ["Session \u9700\u8981\u65F6\u6309\u540D\u5B57\u52A0\u8F7D\u3002", "Sessions load it by name when they need it."],
  "promptReadBy.orchestrator": ["\u53EA\u6709\u4E3B Session \u4F1A\u8BFB\u5230\u3002", "Only the main Session reads it."],
  "promptReadBy.worker": ["\u53EA\u6709\u6267\u884C\u5668 Session \u4F1A\u8BFB\u5230\u3002", "Only Executor Sessions read it."],
  promptBuiltInGroup: ["\u5185\u7F6E\u6BB5\u843D", "Built-in parts"],
  promptTemplateHint: ["\u8FD9\u662F\u6A21\u677F\uFF1A\u4FDD\u7559\u5360\u4F4D\u7B26 {placeholders}\uFF0C\u7531\u7CFB\u7EDF\u586B\u5165\u5185\u5BB9\u3002", "A template: keep the placeholders {placeholders}, which the system fills in."],
  promptDefaultUpdated: ["\u9ED8\u8BA4\u5185\u5BB9\u5DF2\u66F4\u65B0", "Default updated"],
  promptDefaultUpdatedHint: ["\u5347\u7EA7\u6539\u4E86\u8FD9\u4E00\u6BB5\u7684\u9ED8\u8BA4\u5185\u5BB9\uFF0C\u4F60\u7684\u6587\u672C\u4FDD\u6301\u4E0D\u53D8\u3002", "An upgrade changed the default of this part; your text stays as it is."],
  promptDefaultUpdatedKnown: ["\u4E0B\u9762\u662F\u9ED8\u8BA4\u5185\u5BB9\u7684\u53D8\u5316\u3002", "Below is how the default changed."],
  promptDefaultUpdatedUnknown: [
    "\u7CFB\u7EDF\u6CA1\u6709\u8BB0\u5F55\u4F60\u7F16\u8F91\u65F6\u7684\u9ED8\u8BA4\u5185\u5BB9\uFF1B\u4E0B\u9762\u662F\u4F60\u7684\u6587\u672C\u4E0E\u65B0\u9ED8\u8BA4\u5185\u5BB9\u7684\u5BF9\u6BD4\u3002",
    "The default you edited from was not recorded; below, your text against the new default."
  ],
  promptRemovedParts: [
    "\u5F53\u524D\u63D2\u4EF6\u7248\u672C\u5DF2\u6CA1\u6709\u8FD9\u4E9B\u6BB5\u843D\uFF0C\u4F60\u4E3A\u5B83\u4EEC\u5199\u7684\u6587\u672C\u4E0D\u518D\u4F7F\u7528\uFF0C\u4E0B\u6B21\u4FDD\u5B58\u65F6\u79FB\u9664\uFF1A{parts}",
    "This version no longer has these parts; your text for them is unused and goes at the next save: {parts}"
  ],
  promptKeepMine: ["\u4FDD\u7559\u6211\u7684\u6587\u672C", "Keep my text"],
  promptTakeDefault: ["\u6539\u7528\u65B0\u7684\u9ED8\u8BA4\u5185\u5BB9", "Use the new default"],
  promptFullState: ["\u5171 {count} \u6BB5 \xB7 {chars} \u5B57\u7B26 \xB7 {state}", "{count} sections \xB7 {chars} characters \xB7 {state}"],
  promptCopyAll: ["\u590D\u5236\u5168\u6587", "Copy all"],
  promptChanged: ["\u5DF2\u6539", "Changed"],
  promptCompare: ["\u6BD4\u8F83\u5BF9\u8C61", "Compare with"],
  promptCompareSaved: ["\u4E0E\u5DF2\u4FDD\u5B58\u6BD4\u8F83", "Against saved"],
  promptCompareDefault: ["\u4E0E\u9ED8\u8BA4\u6BD4\u8F83", "Against defaults"],
  promptBuiltInFolded: ["\u6309\u5F53\u524D\u8BBE\u7F6E\u751F\u6210\uFF0C\u4E0D\u53C2\u4E0E\u6BD4\u8F83\u3002", "Generated from the current settings; not compared."],
  promptSameAsSaved: ["\u4E0E\u5DF2\u4FDD\u5B58\u76F8\u540C\u3002", "Same as saved."],
  promptSameLines: ["\u2026 \u76F8\u540C\u7684 {count} \u884C \u2026", "\u2026 {count} unchanged lines \u2026"],
  copied: ["\u5DF2\u590D\u5236", "Copied"],
  promptPartTeam: ["\u56E2\u961F\u7EA6\u5B9A", "Team agreement"],
  promptPartFixed: ["\u5185\u7F6E", "Built in"],
  promptPartGenerated: ["\u5185\u7F6E \xB7 \u6309\u5F53\u524D\u8BBE\u7F6E\u751F\u6210", "Built in \xB7 from the current settings"],
  "promptPart.communication": ["\u6C9F\u901A\u65B9\u5F0F", "Communication"],
  "promptPart.scope": ["\u5DE5\u5355\u8303\u56F4", "Ticket scope"],
  "promptPart.delivery": ["\u4EA4\u4ED8\u8981\u6C42", "Delivery requirements"],
  "promptPart.legacy": ["\u65E9\u671F\u7248\u672C\u7684\u5B8C\u6574\u914D\u7F6E\uFF08\u8F7D\u5165\u540E\u662F\u5185\u7F6E\u6587\u672C\u52A0\u5B83\u7684\u6280\u80FD\uFF09", "A complete configuration of an earlier version (loading it gives the built-in text and its skills)"],
  "promptPart.runtime/shared": ["\u5171\u4EAB\u7EA6\u5B9A", "Shared rules"],
  "promptPart.runtime/orchestrator": ["\u4E3B Session \u89D2\u8272", "Main Session role"],
  "promptPart.runtime/worker": ["\u6267\u884C\u5668\u89D2\u8272", "Executor role"],
  "promptPart.runtime/subscriptions": ["\u8BA2\u9605", "Subscriptions"],
  "promptPart.runtime/replies": ["\u56DE\u590D\u4E0E\u786E\u8BA4", "Replies and acknowledgements"],
  "promptPart.runtime/dispatch": ["\u8DEF\u7531", "Routing"],
  "promptPart.runtime/work": ["\u6267\u884C", "Execution"],
  promptViews: ["\u67E5\u770B\u65B9\u5F0F", "View"],
  promptBody: ["Markdown \u6B63\u6587", "Markdown"],
  promptResetSection: ["\u6062\u590D\u6B64\u6BB5\u9ED8\u8BA4\u5185\u5BB9", "Restore this section default"],
  promptPreviewTarget: ["\u9884\u89C8\u76EE\u6807", "Preview target"],
  promptPreviewDraft: ["\u672A\u4FDD\u5B58\u8349\u7A3F", "unsaved draft"],
  promptPreviewSaved: ["\u7248\u672C {revision}", "version {revision}"],
  promptEditSource: ["\u7F16\u8F91\u6B64\u6BB5", "Edit section"],
  promptHistoryHint: ["\u8F7D\u5165\u4F1A\u66FF\u6362\u6574\u5957\u8349\u7A3F\uFF1A\u4E09\u4E2A\u56E2\u961F\u6BB5\u843D\u548C\u56E2\u961F\u6280\u80FD\uFF1B\u4FDD\u5B58\u540E\u624D\u751F\u6548\u3002", "Loading replaces the whole draft: the three team sections and the team skills; nothing changes until you save."],
  promptHistoryItem: ["\u7248\u672C {revision} \xB7 {time} \xB7 {source}", "Version {revision} \xB7 {time} \xB7 {source}"],
  promptHistoryInitial: ["\u521D\u59CB\u7248\u672C", "initial"],
  promptHistoryChanged: ["\u4FEE\u6539\u6BB5\uFF1A{parts}", "Changed: {parts}"],
  promptHistoryNone: ["\u521D\u59CB\u7248\u672C\u6216\u65E0\u5185\u5BB9\u53D8\u5316", "Initial version or no content change"],
  promptOlder: ["\u66F4\u65E9\u7248\u672C", "Older versions"],
  promptRestore: ["\u5C06\u8FD9\u4E2A\u7248\u672C\u8F7D\u5165\u8349\u7A3F", "Load this version into the draft"],
  promptDefaults: ["\u5C06\u6574\u5957\u9ED8\u8BA4\u5185\u5BB9\u8F7D\u5165\u8349\u7A3F", "Load all defaults into the draft"],
  promptDraftFromHistory: ["\u6574\u5957\u8349\u7A3F\u6765\u81EA\u5386\u53F2\u7248\u672C {revision}\uFF1B\u4FDD\u5B58\u5C06\u521B\u5EFA\u65B0\u7248\u672C", "Draft loaded from version {revision}; saving creates a new version"],
  promptDraftFromDefaults: ["\u6574\u5957\u8349\u7A3F\u6765\u81EA\u5F53\u524D\u63D2\u4EF6\u9ED8\u8BA4\u503C", "Draft loaded from the current plugin defaults"],
  promptDraftSectionReset: ["\u5DF2\u6062\u590D\u6B64\u6BB5\u9ED8\u8BA4\u5185\u5BB9\uFF1A{part}", "Restored the default of: {part}"],
  promptAddSkill: ["\u6DFB\u52A0\u81EA\u5B9A\u4E49\u6280\u80FD", "Add a custom skill"],
  promptSkillName: ["\u540D\u79F0\uFF0C\u4F8B\u5982 testing", "Name, e.g. testing"],
  promptAddSkillAction: ["\u6DFB\u52A0\u5230\u8349\u7A3F", "Add to draft"],
  promptSkillNameInvalid: ["\u6280\u80FD\u540D\u79F0\u987B\u552F\u4E00\uFF0C\u4EC5\u4F7F\u7528\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u8FDE\u5B57\u7B26\uFF0C\u4EE5\u5B57\u6BCD\u5F00\u5934\u3002", "Skill names must be unique, start with a letter, and use lowercase letters, digits and hyphens."],
  promptConflict: ["\u63D0\u793A\u8BCD\u5DF2\u88AB\u4FEE\u6539\u5230\u7248\u672C {revision}\u3002\u5DF2\u4FDD\u7559\u4F60\u7684\u8349\u7A3F\uFF1B\u8BF7\u6BD4\u8F83\u540E\u91CD\u65B0\u4FDD\u5B58\u3002", "Prompts changed to version {revision}. Your draft is kept; compare and save again."],
  promptConflictParts: ["\u63D0\u793A\u8BCD\u5DF2\u88AB\u4FEE\u6539\u5230\u7248\u672C {revision}\uFF0C\u5176\u4E2D {parts} \u4F60\u4E5F\u6539\u8FC7\uFF1B\u4FDD\u5B58\u4F1A\u4EE5\u4F60\u7684\u7248\u672C\u4E3A\u51C6\u3002", "Prompts changed to version {revision}, including {parts}, which you changed too; saving keeps your version."],
  promptSavedPending: ["\u5DF2\u4FDD\u5B58\uFF1B\u901A\u77E5\u7B49\u5F85\u6CE8\u5165\u4E3B Session\u3002", "Saved; the notice is waiting to reach the main Session."],
  promptSessions: ["Session \u6700\u8FD1\u4F7F\u7528\u7684\u7248\u672C", "Versions used by Sessions"],
  promptSessionItem: ["{session}\uFF1A\u7248\u672C {revision}", "{session}: version {revision}"],
  promptNoSessions: ["\u6682\u65E0\u6A21\u578B\u8BF7\u6C42", "No model requests yet"],
  "promptRole.orchestrator": ["\u4E3B Session", "Main Session"],
  "promptRole.worker": ["\u6267\u884C\u5668 Session", "Executor Session"],
  // Deployment
  deploymentIntro: ["\u8FD9\u53F0\u673A\u5668\u4E0A\u7684 dsh-superagent \u8BBE\u7F6E\uFF0C\u5B58\u653E\u5728 DSH \u914D\u7F6E\u6587\u4EF6\u7684 dsh-superagent \u6761\u76EE\u91CC\uFF1B\u4FDD\u5B58\u540E\u7ACB\u5373\u751F\u6548\uFF0C\u4E0D\u4F1A\u91CD\u542F dsh-superagent\u3002", "dsh-superagent's settings on this machine, kept in the dsh-superagent entry of the DSH configuration; a saved change applies at once, without restarting dsh-superagent."],
  deploymentUnavailable: ["dsh-superagent \u542F\u52A8\u5B8C\u6210\u540E\u624D\u80FD\u4FEE\u6539\u8FD9\u4E9B\u503C\u3002", "These values can be changed once dsh-superagent has started."],
  deploymentDerived: ["\u4ED3\u5E93\u4E0E\u8D26\u53F7", "Repository and accounts"],
  deploymentDerivedHint: ["\u7531\u6765\u6E90\u8BBE\u7F6E\u91CC\u7684\u4ED3\u5E93\u548C CLI \u5F97\u51FA\u3002", "Derived from the repository and the CLIs in the Source settings."],
  deploymentRepository: ["\u4ED3\u5E93", "Repository"],
  deploymentAgent: ["\u667A\u80FD\u4F53\u8D26\u53F7", "Agent account"],
  deploymentFeishu: ["\u98DE\u4E66\u673A\u5668\u4EBA", "Feishu bot"],
  deploymentFeishuNone: ["\u672A\u8BBE\u7F6E", "Not set"],
  deploymentAccountsWhere: ["\u8D26\u53F7\u5728 dsh-superagent \u9762\u677F\u7684\u6765\u6E90\u8BBE\u7F6E\u91CC\u4FEE\u6539\u3002", "Accounts are changed in the Source settings of the dsh-superagent panel."],
  deploymentMachine: ["\u672C\u673A\u8BBE\u7F6E", "This machine"],
  deploymentStateDir: ["\u72B6\u6001\u76EE\u5F55", "State directory"],
  deploymentStateDirHint: ["\u6570\u636E\u5E93\u3001\u9501\u3001\u6267\u884C\u5668\u7684\u547D\u4EE4\u548C\u667A\u80FD\u4F53\u7684 git \u914D\u7F6E\u6240\u5728\u76EE\u5F55\uFF0C\u53EA\u80FD\u5728 DSH \u914D\u7F6E\u6587\u4EF6\u91CC\u4FEE\u6539\u3002", "Holds the database, locks, the Executor's commands and the agent's git configuration; change it only in the DSH configuration file."],
  deploymentLimits: ["\u4E0A\u9650", "Limits"],
  deploymentLimitsHint: ["\u672C\u673A\u8D44\u6E90\u7684\u4E0A\u9650\uFF1A\u4FDD\u5B58\u7684\u63D0\u793A\u8BCD\u6700\u957F\u591A\u5C11\u5B57\uFF0C\u8BC4\u4F30\u8BFB\u53D6\u7EBF\u7A0B\u4E0A\u4E0B\u6587\u65F6\u6700\u591A\u8BFB\u51E0\u9875\u3001\u6BCF\u6B21\u8BFB\u53D6\u6700\u591A\u7B49\u591A\u4E45\u3002", "Resource limits on this machine: how long a saved prompt may be, and how many Thread pages Eval may read and how long one read may take."],
  deploymentPromptMaxChars: ["\u63D0\u793A\u8BCD\u914D\u7F6E\u7684\u6700\u5927\u5B57\u7B26\u6570", "Largest prompt configuration / characters"],
  deploymentContextPages: ["\u4E00\u6B21\u7814\u5224\u53EF\u8BFB\u7684\u7EBF\u7A0B\u9875\u6570", "Thread pages one Assessment may read"],
  deploymentContextTimeout: ["\u4E00\u6B21\u4E0A\u4E0B\u6587\u8BFB\u53D6\u7684\u65F6\u9650 / \u6BEB\u79D2", "Time limit of one context read / ms"],
  deploymentRefused: ["DSH \u62D2\u7EDD\u4E86\u8FD9\u6B21\u4FEE\u6539\uFF1A\u8BBE\u7F6E\u53EF\u80FD\u5DF2\u5728\u522B\u5904\u4FEE\u6539\u3002\u653E\u5F03\u4FEE\u6539\u540E\u53EF\u770B\u5230\u5F53\u524D\u503C\u3002", "DSH refused the change; the settings may have changed elsewhere. Discard to see the current values."],
  deploymentNoForms: ["\u8FD9\u4E2A DSH \u7248\u672C\u4E0D\u63D0\u4F9B\u914D\u7F6E\u8868\u5355\uFF0C\u8FD9\u4E9B\u503C\u53EA\u80FD\u5728 DSH \u914D\u7F6E\u6587\u4EF6\u7684 dsh-superagent \u6761\u76EE\u91CC\u4FEE\u6539\u3002", "This DSH version has no configuration forms; change these values in the dsh-superagent entry of the DSH configuration file."],
  deploymentReadOnly: ["\u53EA\u6709\u672C\u673A\u4E0A\u7684\u6D4F\u89C8\u5668\u53EF\u4EE5\u4FEE\u6539\u8FD9\u4E9B\u503C\u3002", "Only a browser on this machine can change these values."],
  setupCheck: ["\u91CD\u65B0\u68C0\u67E5", "Check again"],
  setupChecking: ["\u6B63\u5728\u91CD\u65B0\u68C0\u67E5\uFF0Cdsh-superagent \u6B63\u5728\u91CD\u542F", "Checking again; dsh-superagent is restarting"],
  setupCheckInterrupts: ["\u91CD\u65B0\u68C0\u67E5\u4F1A\u91CD\u542F dsh-superagent\uFF1A{count} \u4E2A\u8FDB\u884C\u4E2D\u7684\u6D3E\u5DE5\u4F1A\u4E2D\u65AD\uFF0C\u5E76\u5E26\u6062\u590D\u8BF4\u660E\u91CD\u65B0\u5F00\u59CB\u3002", "Checking again restarts dsh-superagent: {count} running Assignments stop and start again with a recovery note."],
  // Reason codes; legacy English sentence reasons map to these in text.ts
  "reason.not_human": ["\u81EA\u52A8\u6D88\u606F", "Automated message"],
  "reason.not_a_member": ["\u53D1\u9001\u8005\u4E0D\u5728\u8FD9\u4E2A\u6765\u6E90\u7684\u540D\u5355\u91CC", "Sender is not on this Source's list"],
  "reason.no_mention": ["\u6CA1\u6709\u70B9\u540D\u667A\u80FD\u4F53\uFF0C\u4E14\u8FD9\u4E2A\u6765\u6E90\u4E0D\u63A5\u6536\u5176\u4F59\u6D88\u606F", "Does not address the agent, and this Source does not receive the rest"],
  "reason.admission_ignored": ["\u51C6\u5165\u8BBE\u4E3A\u5FFD\u7565", "Admission set to ignore"],
  "reason.chat_not_allowed": ["\u7FA4\u4E0D\u5728\u76D1\u542C\u7684\u7FA4\u91CC", "Chat is not a listened chat"],
  "reason.direct_messages_not_allowed": ["\u79C1\u804A\u672A\u5F00\u653E", "Direct messages are off"],
  "reason.observation_only": ["\u4EC5\u89C2\u5BDF\u7684\u7FA4\uFF08\u65E7\u7248\u8FC7\u6EE4\uFF09", "Observe-only chat (legacy filter)"],
  "reason.untracked_source": ["\u7EBF\u7A0B\u672A\u88AB\u8BA2\u9605", "Thread not subscribed"],
  "reason.issue_assigned": ["Issue \u5DF2\u6709\u8D1F\u8D23\u4EBA", "Issue has an assignee"],
  "reason.issue_closed": ["Issue \u5DF2\u5173\u95ED", "Issue is closed"],
  "reason.issue_has_pull_request": ["Issue \u5DF2\u6709\u5173\u8054 PR", "Issue has a linked PR"],
  "reason.issue_unclaimed_less_than_day": ["Issue \u65E0\u4EBA\u8BA4\u9886\u672A\u6EE1\u4E00\u5929", "Issue unclaimed for less than a day"],
  "reason.task_ended": ["\u5DE5\u5355\u5DF2\u7ED3\u675F", "Ticket ended"],
  "reason.task_paused": ["\u5DE5\u5355\u5DF2\u6682\u505C", "Ticket paused"],
  "reason.subscription_inactive": ["\u8BA2\u9605\u672A\u751F\u6548", "Subscription inactive"],
  "reason.subscription_removed": ["\u8BA2\u9605\u5DF2\u79FB\u9664", "Subscription removed"],
  "reason.issue_awaiting_eligibility": ["\u7B49\u5F85 Issue \u6EE1\u8DB3\u8D44\u683C", "Waiting for Issue eligibility"],
  "reason.timeout": ["\u8BC4\u4F30\u8D85\u65F6\u672A\u51B3\u5B9A", "Eval timed out"],
  "reason.policyChanged": ["\u8BC4\u4F30\u671F\u95F4\u7B56\u7565\u5DF2\u53D8\u66F4", "Policy changed during the Eval"],
  "reason.noAdmissible": ["\u6CA1\u6709\u53EF\u51C6\u5165\u7684\u89E6\u53D1", "No admissible Trigger"],
  "reason.startedTicket": ["\u5DF2\u7ECF\u5F00\u8FC7\u5DE5\u5355 {ticket}", "Already started Ticket {ticket}"],
  "reason.acceptedBefore": ["\u89E6\u53D1 {trigger} \u4E4B\u524D\u5DF2\u63A5\u5355", "Trigger {trigger} was accepted before"],
  "reason.routed": ["\u5DF2\u8F6C\u7ED9\u5DE5\u5355 {ticket}", "Routed to Ticket {ticket}"],
  "reason.stopUnknown": ["\u8981\u505C\u6B62\u7684\u5DE5\u5355\u4E0D\u5B58\u5728\u6216\u5DF2\u7ED3\u675F", "The Ticket to stop is unknown or ended"],
  "reason.stopNotExplicit": ["\u505C\u6B62\u9700\u8981\u540D\u5355\u91CC\u7684\u4EBA\u660E\u786E\u8981\u6C42", "Stopping needs an explicit request from someone on the list"],
  "reason.directionUnsettled": ["\u5B9E\u73B0\u610F\u56FE\u6216\u76EE\u6807\u672A\u786E\u5B9A\uFF0C\u6216\u8FD8\u8981\u4EA7\u54C1\u6216\u8BBE\u8BA1\u51B3\u5B9A", "Intent or target not settled, or a product or design decision is still open"],
  "reason.noRuleMatched": ["\u6CA1\u6709\u542F\u7528\u7684\u51C6\u5165\u89C4\u5219\u5339\u914D", "No enabled admission rule matched"],
  "reason.ignoredFromCard": ["\u4EC5\u51ED\u5019\u9009\u5361\u7247\u5FFD\u7565\uFF0C\u672A\u7ECF\u89C4\u5219\u7814\u5224", "Ignored from its card, without a rule assessment"],
  "reason.observed": ["\u89C2\u5BDF\u6A21\u5F0F\uFF1A\u672C\u4F1A\u63A5\u5355\uFF08{text}\uFF09", "Observe mode: would accept ({text})"],
  "reason.explicitRouted": ["\u540D\u5355\u91CC\u7684\u4EBA\u660E\u786E\u8BF7\u6C42\uFF0C\u7531\u4E3B Session \u63A5\u5355", "Explicit request from someone on the list, accepted by the main Session"],
  "reason.legacyImport": ["\u4ECE\u65E7\u7248\u5DE5\u5355\u8BB0\u5F55\u5BFC\u5165", "Imported from a legacy Ticket record"],
  "reason.channelGone": ["\u5BF9\u8BDD\u5DF2\u65E0\u6CD5\u63A5\u6536\u6D88\u606F", "The conversation can no longer receive messages"],
  "reason.channelIgnored": ["\u6765\u6E90\u5DF2\u4E0D\u518D\u76D1\u542C\u8FD9\u4E2A\u5BF9\u8BDD", "The Source no longer listens to this conversation"],
  "reason.hostRestarted": ["dsh-superagent \u91CD\u542F", "dsh-superagent restarted"],
  "reason.retried": ["\u4EBA\u5DE5\u91CD\u8BD5", "Retried by a person"],
  "reason.completed": ["\u5DF2\u5B8C\u6210", "Completed"],
  "reason.dropped": ["\u65E0\u9700\u5904\u7406\uFF0C\u5DF2\u5173\u95ED", "No action needed; closed"],
  "reason.merged": ["PR \u5DF2\u5408\u5E76", "PR merged"],
  "reason.closed": ["PR \u5DF2\u5173\u95ED", "PR closed"],
  "reason.stopped": ["\u4EBA\u5DE5\u505C\u6B62", "Stopped by a human"],
  "reason.revoked": ["\u6388\u6743\u5DF2\u5931\u6548", "Mandate no longer valid"],
  "reason.humanStop": ["\u6709\u4EBA\u8981\u6C42\u505C\u6B62", "Someone asked to stop"],
  "reason.forwarded": ["\u5DF2\u6247\u51FA\u7ED9\u8BE5\u7EBF\u7A0B\u7684\u5DE5\u5355", "Fanned out to the Thread's Ticket"],
  "reason.senderNotMember": ["\u53D1\u9001\u8005\u4E0D\u5728\u8FD9\u4E2A\u6765\u6E90\u7684\u540D\u5355\u91CC", "Sender is not on this Source's list"],
  "reason.source_disabled": ["\u6765\u6E90\u5DF2\u505C\u7528", "Source disabled"],
  "reason.issue_sender_or_admission_disabled": ["Issue \u53D1\u8D77\u4EBA\u4E0D\u5728\u540D\u5355\u6216\u4E3B\u52A8\u63A5\u5355\u5DF2\u5173\u95ED", "Issue sender not on the list, or proactive accept off"],
  "reason.source_not_installed": ["\u6765\u6E90\u63D2\u4EF6\u672A\u52A0\u8F7D", "Source plugin not loaded"],
  "reason.issue_unclaimed_less_than_wait": ["Issue \u65E0\u4EBA\u8BA4\u9886\u672A\u6EE1\u7B49\u5F85\u65F6\u957F", "Issue unclaimed for less than the wait"],
  // Glossary
  glossary: ["\u672F\u8BED\u8868", "Glossary"],
  glossaryIntro: ["\u754C\u9762\u53EA\u663E\u793A\u4E00\u79CD\u8BED\u8A00\uFF1B\u6587\u6863\u3001\u4EE3\u7801\u548C\u5DE5\u5177\u4F7F\u7528\u82F1\u6587\u672F\u8BED\u3002", "The interface shows one language; documents, code and tools use the English terms."],
  glossaryChinese: ["\u4E2D\u6587", "\u4E2D\u6587"],
  glossaryEnglish: ["English", "English"],
  glossaryMeaning: ["\u542B\u4E49", "Meaning"],
  "term.source": ["\u6765\u6E90", "Source"],
  "term.trigger": ["\u89E6\u53D1", "Trigger"],
  "term.thread": ["\u7EBF\u7A0B", "Thread"],
  "term.correlation": ["\u5173\u8054", "Correlation"],
  "term.channel": ["\u6E20\u9053", "Channel"],
  "term.policy": ["\u7B56\u7565", "Policy"],
  "term.eval": ["\u8BC4\u4F30", "Eval"],
  "term.gate": ["\u51C6\u5165", "Gate"],
  "term.assessment": ["\u7814\u5224", "Assessment"],
  "term.decision": ["\u51B3\u5B9A", "Decision"],
  "term.mandate": ["\u6388\u6743", "Mandate"],
  "term.ticket": ["\u5DE5\u5355", "Ticket"],
  "term.assignment": ["\u6D3E\u5DE5", "Assignment"],
  "term.subscription": ["\u8BA2\u9605", "Subscription"],
  "term.fanout": ["\u6247\u51FA", "Fan-out"],
  "term.executor": ["\u6267\u884C\u5668", "Executor"],
  "term.report": ["\u62A5\u544A", "Report"],
  "term.attention": ["\u5F85\u4EBA\u5DE5\u51B3\u5B9A", "Attention"],
  "term.disposition": ["\u53BB\u5411", "Disposition"],
  "term.input": ["\u8F93\u5165", "Input"],
  "term.scope": ["\u8303\u56F4", "Scope"],
  "term.strength": ["\u5F3A\u5EA6", "Strength"],
  "term.agent": ["\u667A\u80FD\u4F53", "Agent"],
  "term.mainSession": ["\u4E3B Session", "Main Session"],
  "term.executorSession": ["\u6267\u884C\u5668 Session", "Executor Session"],
  "term.policyVersion": ["\u7B56\u7565\u7248\u672C", "Policy version"],
  "meaning.agent": ["\u4EE5 dsh-superagent \u8EAB\u4EFD\u5DE5\u4F5C\u7684\u865A\u62DF\u540C\u4E8B\uFF1A\u901A\u8FC7 GitHub \u8D26\u53F7\u3001\u98DE\u4E66\u673A\u5668\u4EBA\u7B49\u8EAB\u4EFD\u5728\u6765\u6E90\u4E0A\u884C\u52A8", "The virtual colleague dsh-superagent runs: it acts on the Sources through its identities, such as a GitHub account or a Feishu bot"],
  "meaning.mainSession": ["\u8BC4\u4F30\u89E6\u53D1\u3001\u63A5\u5355\u6D3E\u5DE5\u5E76\u56DE\u590D\u7684 DSH Session\uFF1B\u63D0\u793A\u8BCD\u91CC\u79F0 orchestrator", "The DSH Session that evaluates Triggers, accepts and dispatches work, and replies; prompts call it the orchestrator"],
  "meaning.executorSession": ["\u6267\u884C\u5668\u4E3A\u4E00\u4E2A\u5DE5\u5355\u8FD0\u884C\u7684 DSH Session\uFF1B\u63D0\u793A\u8BCD\u91CC\u79F0 worker", "The DSH Session the Executor runs for one Ticket; prompts call it the worker"],
  "meaning.policyVersion": ["\u63A5\u5355\u89C4\u5219\u3001\u5404\u6765\u6E90\u4E0A\u7684\u7B56\u7565\u548C\u63A5\u5355\u6A21\u5F0F\u7684\u4E00\u4E2A\u7EC4\u5408\u7684\u6807\u8BC6\uFF1B\u6BCF\u4E2A\u5DE5\u5355\u8BB0\u4E0B\u63A5\u5355\u65F6\u7684\u7248\u672C", "The identifier of one combination of rules, the Policy on each Source and accept mode; each Ticket records the version it was accepted under"],
  "glossaryGroup.roles": ["\u89D2\u8272", "Roles"],
  "meaning.source": ["\u4EA7\u751F\u89E6\u53D1\u7684\u4E8B\u4EF6\u6D41\uFF1B\u7531\u63D2\u4EF6\u63D0\u4F9B\u7684\u7C7B\u578B\u52A0\u4E00\u4EFD\u914D\u7F6E\uFF08\u662F\u5426\u8FD0\u884C\u3001\u76D1\u542C\u4EC0\u4E48\uFF09", "An event stream that produces Triggers; a plugin-provided kind plus one configuration (whether it runs, what it listens to)"],
  "meaning.trigger": ["\u6765\u6E90\u4EA7\u751F\u7684\u5355\u4E2A\u4E0D\u53EF\u53D8\u4E8B\u4EF6", "One immutable event produced by a Source"],
  "meaning.thread": ["\u6309\u65F6\u95F4\u6392\u5217\u7684\u89E6\u53D1\uFF1B\u540C\u4E00\u65F6\u95F4\u53EA\u6709\u4E00\u4E2A\u8BC4\u4F30", "Triggers in time order; one Eval at a time"],
  "meaning.correlation": ["\u4E00\u4E2A\u89E6\u53D1\u540C\u5C5E\u591A\u4E2A\u7EBF\u7A0B\u65F6\u7EBF\u7A0B\u4E4B\u95F4\u7684\u5173\u7CFB\uFF0C\u53EA\u7528\u6765\u8865\u5145\u4E0A\u4E0B\u6587", "Relation between Threads that share a Trigger; context only"],
  "meaning.channel": ["\u7EBF\u7A0B\u7684\u53EA\u5199\u7AEF\uFF0C\u7528\u4E8E\u56DE\u590D", "The write-only side of a Thread, for replies"],
  "meaning.policy": ["\u7248\u672C\u5316\u7684\u63A5\u5355\u89C4\u5219\u548C\u5404\u6765\u6E90\u4E0A\u7684\u540D\u5355\uFF1B\u51B3\u5B9A\u8C01\u80FD\u53D1\u8D77\u5DE5\u4F5C\u3001\u63A5\u4EC0\u4E48", "Versioned rules and each Source's list; decides who may originate work and what is accepted"],
  "meaning.eval": ["\u5BF9\u4E00\u6279\u89E6\u53D1\u505A\u51FA\u51B3\u5B9A\u7684\u8FC7\u7A0B", "The process that turns a batch of Triggers into a Decision"],
  "meaning.gate": ["\u8BC4\u4F30\u7684\u7B2C\u4E00\u5C42\uFF1A\u8C01\u80FD\u53D1\u8D77\u5DE5\u4F5C\u3001\u5F3A\u5EA6\u591A\u5C11", "First Eval layer: who may originate work, and how strongly"],
  "meaning.assessment": ["\u8BC4\u4F30\u4E2D\u7684\u6A21\u578B\u8BED\u4E49\u5224\u65AD", "Eval step where the model judges meaning"],
  "meaning.decision": ["\u8BC4\u4F30\u7684\u7ED3\u679C", "The result of an Eval"],
  "meaning.mandate": ["\u63A5\u5355\u65F6\u4EA7\u51FA\u7684\u6388\u6743\uFF1A\u5F3A\u5EA6\u3001\u8303\u56F4\u3001\u4F9D\u636E\u7684\u7B56\u7565\u7248\u672C", "Authorization produced by accept: strength, scope and Policy version"],
  "meaning.ticket": ["\u88AB\u6388\u6743\u7684\u5DE5\u4F5C\u5355\u4F4D", "An authorized unit of work"],
  "meaning.assignment": ["\u5DE5\u5355\u4E0E\u4E00\u4E2A\u6267\u884C\u5668 Session \u7684\u7ED1\u5B9A", "Binding of a Ticket to one Executor Session"],
  "meaning.subscription": ["\u5DE5\u5355\u4E0E\u7EBF\u7A0B\u7684\u5173\u7CFB\uFF1B\u4E3B Session \u53EA\u5728\u6D88\u606F\u660E\u786E\u6307\u5411\u67D0\u4E2A\u5DE5\u5355\u65F6\u624D\u628A\u7EBF\u7A0B\u5173\u8054\u7ED9\u5B83\uFF0C\u6267\u884C\u5668\u53EF\u4EE5\u9000\u8BA2\u4E0E\u672C\u5DE5\u5355\u65E0\u5173\u7684\u7EBF\u7A0B", "Relation between a Ticket and a Thread; the main Session attaches a Thread only when its message points at the Ticket, and the Executor can drop a Thread unrelated to its Ticket"],
  "meaning.fanout": ["\u8BA2\u9605\u7EBF\u7A0B\u4E0A\u7684\u89E6\u53D1\u4F5C\u4E3A\u4E0A\u4E0B\u6587\u9001\u8FBE\u5DE5\u5355\uFF0C\u4E0D\u5E26\u6388\u6743", "Triggers on a subscribed Thread reach the Ticket as context, without authority"],
  "meaning.executor": ["\u6267\u884C\u6D3E\u5DE5\u7684\u4E00\u65B9\uFF1A\u6BCF\u4E2A\u5DE5\u5355\u4E00\u4E2A\u6267\u884C\u5668 Session \u548C\u6267\u884C\u76EE\u5F55", "What runs Assignments: one Executor Session and directory per Ticket"],
  "meaning.report": ["\u6D3E\u5DE5\u5411\u5DE5\u5355\u56DE\u62A5\u7684\u72B6\u6001", "State an Assignment reports to its Ticket"],
  "meaning.attention": ["\u5DE5\u5355\u4E0A\u7B49\u5F85\u4EBA\u56DE\u7B54\u7684\u95EE\u9898", "A question on a Ticket waiting for a human"],
  "meaning.disposition": ["\u4E00\u4E2A\u89E6\u53D1\u88AB\u8FC7\u6EE4\u3001\u8BC4\u4F30\u3001\u6247\u51FA\u7684\u8BB0\u5F55", "Where a Trigger went: filtered, evaluated, fanned out"],
  "meaning.input": ["\u9001\u8FBE\u5DE5\u5355\u7684\u4E0A\u4E0B\u6587\uFF08\u6247\u51FA\u7684\u89E6\u53D1\u3001\u7B56\u7565\u53D8\u66F4\u3001\u6062\u590D\u3001\u6587\u672C\uFF09", "Context delivered to a Ticket (fanned-out Triggers, Policy changes, resumes, text)"],
  "meaning.scope": ["\u6388\u6743\u5141\u8BB8\u7684\u5DE5\u4F5C\u8303\u56F4", "The work a Mandate allows"],
  "meaning.strength": ["\u6388\u6743\u4E0E\u8BC4\u4F30\u7684\u4F9D\u636E\u5F3A\u5EA6", "How strong the grounds of a Mandate or Eval are"],
  legendTitle: ["\u72B6\u6001\u989C\u8272", "Status colors"],
  "legend.done": ["\u5B8C\u6210\u3001\u5C31\u7EEA\u6216\u5DF2\u63A5\u5355", "Done, ready or accepted"],
  "legend.ongoing": ["\u6267\u884C\u4E2D\u6216\u8BC4\u4F30\u4E2D", "Running or evaluating"],
  "legend.warning": ["\u7B49\u5F85\u3001\u53D7\u963B\u6216\u9700\u8981\u4EBA", "Waiting, blocked or needs a person"],
  "legend.error": ["\u5931\u8D25\u6216\u5F02\u5E38", "Failed or failing"],
  "legend.idle": ["\u5DF2\u7ED3\u675F\u3001\u5DF2\u505C\u7528\u6216\u65E0\u540E\u7EED", "Ended, disabled or no follow-up"],
  "term.environment": ["\u6267\u884C\u73AF\u5883", "Execution environment"],
  "meaning.environment": ["\u6BCF\u4E2A\u5DE5\u5355\u7684\u6267\u884C\u5668 Session \u548C\u51C6\u5907\u547D\u4EE4\u8FD0\u884C\u7684\u73AF\u5883\uFF1A\u6267\u884C\u5668\u548C\u5404\u6765\u6E90\u767B\u8BB0\u7684\u53D8\u91CF\uFF0C\u6BCF\u4E2A\u6709\u952E\u3001\u503C\u548C\u8BF4\u660E", "Where a Ticket's Executor Session and prepare command run: the variables the Executor and the Sources register, each with a key, a value and a description"],
  // User and agent error codes; English reuses the host's own text read by agents
  "userError.unknownTicket": ["\u627E\u4E0D\u5230\u8FD9\u4E2A\u5DE5\u5355\u3002", USER_ERRORS.unknownTicket[1]],
  "userError.unknownProblem": ["\u627E\u4E0D\u5230\u8FD9\u4E2A\u672A\u5B8C\u6210\u7684\u8BC4\u4F30\u3002", USER_ERRORS.unknownProblem[1]],
  "userError.unknownTrigger": ["\u627E\u4E0D\u5230\u8FD9\u4E2A\u89E6\u53D1\u3002", USER_ERRORS.unknownTrigger[1]],
  "userError.unknownAssignment": ["\u627E\u4E0D\u5230\u8FD9\u4E2A\u6D3E\u5DE5\u3002", USER_ERRORS.unknownAssignment[1]],
  "userError.unknownBlock": ["\u6CA1\u6709\u8FD9\u4E2A\u8BBE\u7F6E\u5757\uFF1A{block}", USER_ERRORS.unknownBlock[1]],
  "userError.unknownPromptRevision": ["\u6CA1\u6709\u63D0\u793A\u8BCD\u7248\u672C {revision}\u3002", USER_ERRORS.unknownPromptRevision[1]],
  "userError.unknownPromptPart": ["\u6CA1\u6709\u5185\u7F6E\u63D0\u793A\u8BCD\u6BB5\u843D {part}\u3002", USER_ERRORS.unknownPromptPart[1]],
  "userError.ticketEnded": ["\u5DE5\u5355\u5DF2\u7ED3\u675F\u3002", USER_ERRORS.ticketEnded[1]],
  "userError.assignmentEnded": ["\u8FD9\u4E2A\u6D3E\u5DE5\u5DF2\u7ED3\u675F\uFF0C\u5DE5\u5355\u5DF2\u7531\u8F83\u65B0\u7684\u6D3E\u5DE5\u63A5\u624B\u3002", USER_ERRORS.assignmentEnded[1]],
  "userError.evalFinished": ["\u8BC4\u4F30 {eval} \u5DF2\u7ED3\u675F\uFF0C\u6216\u5DF2\u88AB\u4E4B\u540E\u7684\u8BC4\u4F30\u53D6\u4EE3\uFF1B\u8BF7\u5BF9\u8FD9\u4E2A\u89E6\u53D1\u5F53\u524D\u7684\u8BC4\u4F30\u505A\u51B3\u5B9A\u3002", USER_ERRORS.evalFinished[1]],
  "userError.notAdmissible": ["\u8FD9\u4E2A\u89E6\u53D1\u672A\u901A\u8FC7\u51C6\u5165\uFF1A{reason}", USER_ERRORS.notAdmissible[1]],
  "userError.notExplicit": ["\u901A\u8FC7 orchestrator_route \u63A5\u5355\u53EA\u7528\u4E8E\u540D\u5355\u5185\u53D1\u9001\u8005\u7684\u660E\u786E\u8BF7\u6C42\uFF1B\u4E3B\u52A8\u63A5\u5355\u7684\u5019\u9009\u8BF7\u7528 orchestrator_eval \u548C orchestrator_eval_decide \u7814\u5224\u3002", USER_ERRORS.notExplicit[1]],
  "userError.ticketStopped": ["\u6709\u4EBA\u505C\u6B62\u4E86\u8FD9\u4E2A\u5DE5\u5355\uFF1B\u65B0\u5DE5\u4F5C\u9700\u8981\u901A\u8FC7 orchestrator_route \u63A5\u5355\u3002", USER_ERRORS.ticketStopped[1]],
  "userError.mandateRevoked": ["\u6309\u5F53\u524D\u7B56\u7565\uFF0C\u8FD9\u4E2A\u5DE5\u5355\u7684\u6388\u6743\u5DF2\u5931\u6548\uFF1B\u65B0\u5DE5\u4F5C\u9700\u8981\u901A\u8FC7 orchestrator_route \u63A5\u5355\u3002", USER_ERRORS.mandateRevoked[1]],
  "userError.notRetryable": ["\u53EA\u6709\u8FDB\u884C\u4E2D\u7684\u5DE5\u5355\u53EF\u4EE5\u91CD\u8BD5\uFF0C\u800C\u4E14\u4EC5\u5F53\u6267\u884C\u5668\u6700\u8FD1\u4E00\u6B21\u62A5\u544A\u4E3A\u5931\u8D25\u6216\u53D7\u963B\u4E14\u6B64\u540E\u6CA1\u6709\u4EBA\u53D1\u8FC7\u6D88\u606F\uFF0C\u6216\u8005\u5411\u6267\u884C\u5668\u9001\u8FBE\u8F93\u5165\u5931\u8D25\u65F6\u624D\u53EF\u4EE5\u3002", USER_ERRORS.notRetryable[1]],
  "userError.sourceThread": ["\u8FD9\u662F\u5DE5\u5355\u5F00\u59CB\u65F6\u6240\u5728\u7684\u7EBF\u7A0B\uFF0C\u4F1A\u4FDD\u6301\u8BA2\u9605\u3002", USER_ERRORS.sourceThread[1]],
  "userError.followedThread": ["\u8FD9\u662F\u5DE5\u5355\u81EA\u5DF1\u7684\u7EBF\u7A0B\uFF0C\u4F8B\u5982\u5B83\u7684 PR\uFF0C\u4F1A\u4FDD\u6301\u8BA2\u9605\u3002", USER_ERRORS.followedThread[1]],
  "userError.notFollowing": ["\u8FD9\u4E2A\u5DE5\u5355\u6CA1\u6709\u8BA2\u9605\u90A3\u4E2A\u7EBF\u7A0B\u3002", USER_ERRORS.notFollowing[1]],
  "userError.questionWithResult": ["\u7ED9\u4EBA\u7684\u95EE\u9898\u4E0D\u80FD\u540C\u65F6\u662F\u5C31\u7EEA\u7684\u7ED3\u679C\u6216\u56DE\u7B54\uFF0C\u8BF7\u5206\u5F00\u62A5\u544A\u3002", USER_ERRORS.questionWithResult[1]],
  "userError.askerWithoutQuestion": ["\u63D0\u51FA\u95EE\u9898\u7684\u6D88\u606F\u9700\u8981\u9644\u4E0A\u5B83\u63D0\u51FA\u7684\u95EE\u9898\u3002", USER_ERRORS.askerWithoutQuestion[1]],
  "userError.notAsker": ["\u95EE\u9898\u5FC5\u987B\u6307\u660E\u63D0\u51FA\u5B83\u7684\u90A3\u6761\u4EBA\u53D1\u7684\u6D88\u606F\uFF0C\u4E14\u90A3\u6761\u6D88\u606F\u5DF2\u9001\u8FBE\u8FD9\u4E2A\u5DE5\u5355\u3002", USER_ERRORS.notAsker[1]],
  "userError.notAnswerable": ["\u56DE\u7B54\u5FC5\u987B\u6307\u660E\u5B83\u6240\u56DE\u7B54\u7684\u3001\u7531\u4EBA\u63D0\u51FA\u7684\u95EE\u9898\uFF0C\u4E14\u8FD9\u4E2A\u95EE\u9898\u5DF2\u9001\u8FBE\u8FD9\u4E2A\u5DE5\u5355\u3002", USER_ERRORS.notAnswerable[1]],
  "userError.ackEnded": ["\u5DE5\u5355\u5DF2\u7ED3\u675F\uFF0C\u4E0D\u8981\u786E\u8BA4\u8FC7\u53BB\u7684\u8BF7\u6C42\u3002", USER_ERRORS.ackEnded[1]],
  "userError.notReached": ["\u8FD9\u4E2A\u89E6\u53D1\u4E0D\u5C5E\u4E8E\u8FD9\u4E2A\u6267\u884C\u5668\u3002", USER_ERRORS.notReached[1]],
  "userError.handedBack": ["\u8FD9\u4E2A\u5DE5\u5355\u5DF2\u7ECF\u4EA4\u56DE\u8FC7\u8FD9\u4E2A\u89E6\u53D1\u3002", USER_ERRORS.handedBack[1]],
  "userError.handedBackHere": ["\u8FD9\u4E2A\u5DE5\u5355\u7684\u6267\u884C\u5668\u5DF2\u628A\u8FD9\u4E2A\u89E6\u53D1\u4EA4\u56DE\uFF0C\u8BA4\u4E3A\u5B83\u8D85\u51FA\u672C\u5DE5\u5355\u7684\u8303\u56F4\uFF1A\u8BF7\u628A\u5B83\u4F5C\u4E3A\u65B0\u5DE5\u4F5C\u63A5\u5355\u3001\u5173\u8054\u5230\u53E6\u4E00\u4E2A\u5DE5\u5355\uFF0C\u6216\u5FFD\u7565\u5B83\u3002", USER_ERRORS.handedBackHere[1]],
  "userError.workerDecides": ["\u8FD9\u6761\u6D88\u606F\u5DF2\u901A\u8FC7\u6240\u5728\u7EBF\u7A0B\u9001\u8FBE\u5DE5\u5355 {tickets}\uFF1A\u7531\u5DE5\u5355\u7684\u6267\u884C\u5668\u5224\u65AD\u5B83\u662F\u5426\u5C5E\u4E8E\u8FD9\u4E2A\u5DE5\u5355\uFF0C\u4E0D\u5C5E\u4E8E\u7684\u4F1A\u88AB\u4EA4\u56DE\uFF0C\u4E4B\u540E\u4F5C\u4E3A\u5019\u9009\u5230\u8FBE\u3002\u53EA\u6709\u505C\u6B62\u4F8B\u5916\uFF0C\u7528 orchestrator_route \u5E76\u628A kind \u8BBE\u4E3A stop\u3002", USER_ERRORS.workerDecides[1]],
  "userError.ackNoChannel": ["\u786E\u8BA4\u9700\u8981\u4E00\u6761\u5DF2\u6D3E\u7ED9\u8FD9\u4E2A\u6267\u884C\u5668\u3001\u7531\u4EBA\u53D1\u51FA\u7684\u539F\u59CB\u6D88\u606F\u3002", USER_ERRORS.ackNoChannel[1]],
  "userError.ackNotPerson": ["\u8BF7\u4F7F\u7528\u6700\u521D\u90A3\u6761\u4EBA\u53D1\u7684\u89E6\u53D1\uFF0C\u800C\u4E0D\u662F\u673A\u5668\u4EBA\u3001CI \u6216\u6267\u884C\u5668\u7684\u62A5\u544A\u3002", USER_ERRORS.ackNotPerson[1]],
  "userError.notReady": ["\u5DE5\u5355\u8FD8\u4E0D\u80FD\u4EA4\u4ED8\u3002\u8FDB\u5C55\u53EA\u5728\u5185\u90E8\u4FDD\u7559\uFF0C\u7B49\u5F85\u7ECF\u8FC7\u9A8C\u8BC1\u7684\u5C31\u7EEA\u62A5\u544A\uFF1B\u4E0D\u8981\u628A\u8FDB\u5C55\u5F53\u4F5C\u56DE\u7B54\uFF0C\u4E5F\u4E0D\u8981\u901A\u8FC7\u5176\u4ED6\u6E20\u9053\u53D1\u9001\u3002", USER_ERRORS.notReady[1]],
  "userError.notAttention": ["\u5F85\u4EBA\u5DE5\u51B3\u5B9A\u7684\u6D88\u606F\u9700\u8981\u5728 human_action \u4E2D\u5199\u660E\u5DE5\u5355\u5F53\u524D\u5F85\u4EBA\u5DE5\u51B3\u5B9A\u7684\u95EE\u9898\u3002\u65E5\u5E38\u672A\u5B8C\u6210\u7684\u5DE5\u4F5C\u53EA\u5728\u5185\u90E8\u4FDD\u7559\u3002", USER_ERRORS.notAttention[1]],
  "userError.notQuestion": ["\u56DE\u7B54\u5FC5\u987B\u9488\u5BF9\u6700\u521D\u7531\u4EBA\u63D0\u51FA\u7684\u95EE\u9898\uFF0C\u800C\u4E0D\u662F\u6267\u884C\u5668\u62A5\u544A\u6216\u81EA\u52A8\u89E6\u53D1\u3002", USER_ERRORS.notQuestion[1]],
  "userError.noAnswer": ["\u6267\u884C\u5668\u8FD8\u6CA1\u6709\u56DE\u7B54\u8FD9\u6761\u4EBA\u53D1\u7684\u89E6\u53D1\u3002\u8BF7\u7B49\u5F85\u6267\u884C\u5668\u7684\u62A5\u544A\uFF0C\u6216\u7528 orchestrator_ticket_request_status \u8BF7\u6C42\u4E00\u4EFD\uFF08\u5B83\u53EA\u5BF9\u5904\u4E8E\u7B49\u5F85\u72B6\u6001\u7684\u6267\u884C\u5668\u8D77\u4F5C\u7528\uFF09\uFF1B\u666E\u901A\u8FDB\u5C55\u4E0D\u80FD\u5F53\u4F5C\u56DE\u7B54\u3002", USER_ERRORS.noAnswer[1]],
  "userError.noChannel": ["\u8FD9\u4E2A\u5DE5\u5355\u6216\u89E6\u53D1\u6CA1\u6709\u53EF\u4EE5\u56DE\u590D\u7684\u6E20\u9053\u3002", USER_ERRORS.noChannel[1]],
  "userError.panelOnlyEnvironment": ["\u6267\u884C\u73AF\u5883\uFF08\u6267\u884C\u76EE\u5F55\u3001\u51C6\u5907\u547D\u4EE4\u3001\u7981\u6B62\u8C03\u7528\u7684\u547D\u4EE4\uFF09\u53EA\u80FD\u5728\u7BA1\u7406\u9875\u4FEE\u6539\u3002", USER_ERRORS.panelOnlyEnvironment[1]],
  "userError.panelOnlyAccounts": ["\u90E8\u7F72\u68C0\u67E5\u8BFB\u53D6\u7684\u6765\u6E90\u5B57\u6BB5\uFF08\u4F8B\u5982\u8D26\u53F7 CLI\uFF09\u53EA\u80FD\u5728\u7BA1\u7406\u9875\u4FEE\u6539\u3002", USER_ERRORS.panelOnlyAccounts[1]],
  "userError.setupComplete": ["\u90E8\u7F72\u68C0\u67E5\u5DF2\u901A\u8FC7\u3002", USER_ERRORS.setupComplete[1]],
  "userError.modelUnavailable": ["{block} \u7684\u6A21\u578B\u4E0D\u53EF\u7528\uFF1A{error}", USER_ERRORS.modelUnavailable[1]],
  "userError.promptTooLong": ["\u63D0\u793A\u8BCD\u914D\u7F6E\u8D85\u8FC7 {limit} \u4E2A\u5B57\u7B26\u3002", USER_ERRORS.promptTooLong[1]],
  "userError.promptPlaceholders": ["\u300C{part}\u300D\u7684\u6A21\u677F\u5FC5\u987B\u4FDD\u7559\u5360\u4F4D\u7B26 {placeholders}\uFF0C\u7531\u7CFB\u7EDF\u586B\u5165\u5185\u5BB9\u3002", USER_ERRORS.promptPlaceholders[1]],
  "userError.promptPartEmpty": ["\u300C{part}\u300D\u6BB5\u843D\u4E0D\u80FD\u4E3A\u7A7A\uFF1B\u8981\u6CBF\u7528\u5185\u7F6E\u6587\u672C\uFF0C\u8BF7\u6062\u590D\u6B64\u6BB5\u9ED8\u8BA4\u5185\u5BB9\u3002", USER_ERRORS.promptPartEmpty[1]],
  "userError.sourceNotInstalled": ["{source} \u6765\u6E90\u7684\u63D2\u4EF6\u6CA1\u6709\u5B89\u88C5\u3002", USER_ERRORS.sourceNotInstalled[1]],
  "userError.noLabels": ["\u8FD9\u4E2A\u6765\u6E90\u6CA1\u6709\u53EF\u4EE5\u5237\u65B0\u7684\u540D\u79F0\u3002", USER_ERRORS.noLabels[1]],
  "userError.nothingToSync": ["{source} \u6765\u6E90\u4E0A\u7684\u7B56\u7565\u6CA1\u6709\u6307\u5B9A\u4ECE\u54EA\u91CC\u540C\u6B65\uFF0C\u6216\u8005\u8FD9\u4E2A\u6765\u6E90\u5DF2\u5173\u95ED\u6216\u5728\u7B49\u5F85\u90E8\u7F72\u68C0\u67E5\u3002", USER_ERRORS.nothingToSync[1]],
  // Setup problems and health codes; English reuses the host's own text read by the log and main Session
  "setup.repositoryUnset": ["GitHub \u6765\u6E90\u6CA1\u6709\u8BBE\u7F6E\u76D1\u542C\u7684\u4ED3\u5E93\u3002", SETUP_PROBLEMS.repositoryUnset[1]],
  "setup.foreignFile": ["{file} \u4E0D\u662F dsh-superagent \u5199\u5165\u7684\u6587\u4EF6\uFF1B\u79FB\u8D70\u5B83\uFF0C\u6216\u6362\u4E00\u4E2A\u72B6\u6001\u76EE\u5F55\u3002", SETUP_PROBLEMS.foreignFile[1]],
  "setup.gitTooOld": ["git \u6CA1\u6709\u8BFB\u53D6 dsh-superagent \u4E3A github.com \u5199\u7684\u51ED\u636E\u914D\u7F6E\uFF1B\u9700\u8981 git 2.32 \u6216\u66F4\u65B0\u7248\u672C\u3002", SETUP_PROBLEMS.gitTooOld[1]],
  "setup.environmentFailed": ["\u51C6\u5907\u667A\u80FD\u4F53\u7684\u8FD0\u884C\u73AF\u5883\u5931\u8D25\u3002", SETUP_PROBLEMS.environmentFailed[1]],
  "setup.agentCliUnset": ["\u6CA1\u6709\u8BBE\u7F6E\u667A\u80FD\u4F53\u7684 GitHub CLI\u3002", SETUP_PROBLEMS.agentCliUnset[1]],
  "setup.agentCliMissing": ["\u627E\u4E0D\u5230\u667A\u80FD\u4F53\u7684 GitHub CLI\u3002", SETUP_PROBLEMS.agentCliMissing[1]],
  "setup.agentCliSignedOut": ["\u667A\u80FD\u4F53\u7684 GitHub CLI \u8BFB\u4E0D\u5230\u5B83\u7684\u8D26\u53F7\u3002", SETUP_PROBLEMS.agentCliSignedOut[1]],
  "setup.agentCliNoAccount": ["\u667A\u80FD\u4F53\u7684 GitHub CLI \u6CA1\u6709\u62A5\u544A GitHub \u8D26\u53F7\u3002", SETUP_PROBLEMS.agentCliNoAccount[1]],
  "setup.repositoryUnreadable": ["@{account} \u8BFB\u4E0D\u5230 {repository}\u3002", SETUP_PROBLEMS.repositoryUnreadable[1]],
  "setup.repositoryUnreported": ["\u667A\u80FD\u4F53\u7684 GitHub CLI \u6CA1\u6709\u8FD4\u56DE {repository}\u3002", SETUP_PROBLEMS.repositoryUnreported[1]],
  "setup.repositoryReadOnly": ["@{account} \u6CA1\u6709 {repository} \u7684\u63A8\u9001\u6743\u9650\u3002", SETUP_PROBLEMS.repositoryReadOnly[1]],
  "setup.feishuCliFailed": ["\u673A\u5668\u4EBA\u7684 lark-cli \u4E0D\u53EF\u7528\u3002", SETUP_PROBLEMS.feishuCliFailed[1]],
  "setup.feishuNoApp": ["\u673A\u5668\u4EBA\u7684 lark-cli \u7684 auth status \u6CA1\u6709\u62A5\u544A\u5E94\u7528\u3002", SETUP_PROBLEMS.feishuNoApp[1]],
  "setup.feishuBotNotReady": ["\u5E94\u7528 {app} \u7684\u673A\u5668\u4EBA\u8EAB\u4EFD\u72B6\u6001\u662F {status}\uFF1B\u7528 lark-cli \u914D\u7F6E\u5E94\u7528\u5BC6\u94A5\u3002", SETUP_PROBLEMS.feishuBotNotReady[1]],
  "setup.feishuUserIdentity": ["\u673A\u5668\u4EBA\u7684 lark-cli \u5141\u8BB8\u7528\u6237\u8EAB\u4EFD\uFF08strict mode \u4E3A {mode}\uFF09\uFF1B\u6309 docs/006-deployment.md \u7ED9\u673A\u5668\u4EBA\u4E00\u4EFD strict mode \u4E3A bot \u7684\u5355\u72EC\u914D\u7F6E\u3002", SETUP_PROBLEMS.feishuUserIdentity[1]],
  "setup.feishuNoBot": ["\u98DE\u4E66\u673A\u5668\u4EBA\u63A5\u53E3\u6CA1\u6709\u8FD4\u56DE\u673A\u5668\u4EBA\u7684 open_id\u3002", SETUP_PROBLEMS.feishuNoBot[1]],
  "healthCode.setupPending": ["\u7B49\u5F85\u90E8\u7F72\u68C0\u67E5", HEALTH_TEXT.setupPending],
  "healthCode.sourceOff": ["\u5DF2\u5173\u95ED", HEALTH_TEXT.sourceOff],
  "healthCode.feishuCliUnset": ["\u6765\u6E90\u5DF2\u6253\u5F00\uFF0C\u8FD8\u6CA1\u6709\u8BBE\u7F6E\u673A\u5668\u4EBA\u7684 lark-cli", HEALTH_TEXT.feishuCliUnset],
  "healthCode.feishuBotMissing": ["\u7B49\u5F85\u98DE\u4E66\u673A\u5668\u4EBA", HEALTH_TEXT.feishuBotMissing],
  "healthCode.pollFailures": ["\u8FDE\u7EED {count} \u6B21\u8F6E\u8BE2\u5931\u8D25\uFF0C\u6700\u8FD1\u4E00\u6B21\uFF1A{error}", HEALTH_TEXT.pollFailures]
};
var language = (index) => Object.fromEntries(Object.entries(TEXT).map(([key, pair]) => [key, pair[index]]));
var zh = language(0);
var en = language(1);
var GLOSSARY = {
  roles: ["agent", "mainSession", "executorSession"],
  source: ["source", "channel"],
  trigger: ["trigger", "thread", "correlation", "subscription", "fanout", "disposition"],
  eval: ["policy", "policyVersion", "eval", "gate", "assessment", "decision", "mandate", "scope", "strength"],
  execution: ["executor", "environment", "ticket", "assignment", "input", "report", "attention"]
};
var GLOSSARY_VALUES = {
  decision: ["decision.accept", "decision.reopen", "decision.stop", "decision.ignore", "decision.unavailable"],
  strength: ["strength.explicit", "strength.inferred"],
  ticket: ["stage.answer", "stage.review", "stage.blocked", "stage.failed", "stage.delivery", "stage.queued", "stage.working", "stage.idle", "ticket.ended"],
  assignment: ["assignment.pending", "assignment.running", "assignment.ended"],
  report: ["report.progress", "report.waiting", "report.ready", "report.blocked", "report.failed", "report.dropped"]
};

// ../../tmp/dsh-superagent-prototype/src/client/overview.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function ProblemLine({ problem, onChanged }) {
  const { t, call, navigate } = usePanel();
  const post = useAction((request) => request(), { reload: onChanged });
  const row = (title, detail, route, hint, actions) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "li",
    {
      className: "dt-row dt-link dt-att dt-att-error",
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "dt-row-main", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "dt-att-what", children: route ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          "button",
          {
            type: "button",
            className: "dt-open dt-open-wrap",
            onClick: () => navigate(route),
            children: title
          }
        ) : title }),
        detail,
        hint && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Hint, { children: hint }),
        actions && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "dt-row-meta dt-row-buttons", children: actions })
      ] })
    }
  );
  const go = (label2, route) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Button, { variant: "outline", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    Icon,
    {
      name: "settings",
      size: 14
    }
  ), onClick: () => navigate(route), children: label2 });
  const raw = (text2) => text2 && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "dt-error dt-clamp dt-mono", children: text2 });
  const worded = (text2) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "dt-error", children: text2 });
  switch (problem.kind) {
    // A failed Feishu bot check pauses only the Feishu Source; other setup problems halt the entire service.
    case "setup":
      return row(
        t(problem.place === "feishu" ? "problemSetupFeishu" : "problemSetup"),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "dt-error", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          SetupMessage,
          {
            problem
          }
        ) }),
        setupPage(problem.place),
        t(`problemSetupFix.${problem.place}`),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CheckSetupButton, {})
      );
    case "no-source":
      return row(t("problemNoSource"), void 0, settingsRoute("source"), void 0, go(
        t("actionOpenSources"),
        settingsRoute("source")
      ));
    case "no-allowed":
      return row(t("problemNoAllowed"), void 0, settingsRoute("eval"), void 0, go(
        t("actionAddAllowed"),
        settingsRoute("eval")
      ));
    case "executor-paused":
      return row(
        t("problemPaused"),
        void 0,
        { page: "execution" },
        void 0,
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          ConfirmButton,
          {
            variant: "outline",
            icon: "play",
            label: t("resumeProcessing"),
            title: t("resumeProcessing"),
            message: t("resumeProcessingConfirm"),
            onConfirm: async () => {
              await call("POST executor/pause", { body: { paused: false } });
              await onChanged();
            }
          }
        )
      );
    case "runtime-error":
      return row(t("problemRuntime", { name: valueLabel(t, "health", problem.name) }), raw(problem.detail), void 0);
    case "source-error": {
      const health = problem.source.health;
      return row(t("sourceError", { source: localized(t, problem.source.title) }), health.code ? worded(healthText(t, health)) : raw(health.detail), { page: "source" }, t("sourceErrorHint"));
    }
    case "eval-overdue":
      return row(t("problemEvalOverdue", { thread: readableMarkers(t, problem.thread.title) }), void 0, {
        page: "trigger",
        id: problem.thread.key
      });
    case "eval-unavailable":
      return row(
        t("problemEvalUnavailable", { thread: readableMarkers(t, problem.thread.title) }),
        raw(reasonLabel(
          t,
          problem.reason
        )),
        { page: "trigger", id: problem.thread.key, query: { trigger: problem.triggerId } },
        void 0,
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            Button,
            {
              variant: "outline",
              size: "sm",
              icon: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "refresh", size: 14 }),
              disabled: post.busy,
              onClick: () => {
                void post.run(() => call("POST triggers/:id/requeue", { id: problem.triggerId }));
              },
              children: t("requeue")
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            Button,
            {
              variant: "outline",
              size: "sm",
              icon: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "dismiss", size: 14 }),
              disabled: post.busy,
              onClick: () => {
                void post.run(() => call("POST decisions/:id/dismiss", { id: problem.decisionId }));
              },
              children: t("dismiss")
            }
          )
        ] })
      );
    case "outgoing":
      return row(
        t("problemReply", {
          source: valueLabel(t, "source", problem.outgoing.channel.source),
          attempts: problem.outgoing.attempts
        }),
        raw(problem.outgoing.error),
        void 0
      );
  }
}
function OverviewPage() {
  const { t, call, navigate } = usePanel();
  const { setup } = usePanelData();
  const { data, error, reload } = usePoll(() => call("GET overview"), []);
  if (!data) return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(LoadState, { error, loading: true });
  const stat = (label2, value, route) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "dt-stat", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "dt-stat-label", children: label2 }),
    route ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "dt-textlink dt-stat-value", onClick: () => navigate(route), children: value }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "span",
      {
        className: "dt-stat-value",
        children: value
      }
    )
  ] });
  const more = (route) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "button",
    {
      type: "button",
      className: "dt-textlink dt-more-link",
      onClick: () => navigate(route),
      children: t("details")
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    error && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(LoadState, { error, loading: false }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Section, { title: t("pendingTickets"), count: data.person.length, children: data.person.length ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("ul", { className: "dt-list dt-cards", children: data.person.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      TicketLine,
      {
        ticket,
        question: true,
        onChanged: reload
      },
      ticket.id
    )) }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Hint, { children: t("needsYouNone") }) }),
    data.problems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Section, { title: t("problems"), count: data.problems.length, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("ul", { className: "dt-list dt-cards", children: data.problems.map((problem, index) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      ProblemLine,
      {
        problem,
        onChanged: reload
      },
      index
    )) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Section, { title: t("lastDay"), action: more({ page: "trigger", query: { filter: "recent" } }), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "dt-stats", children: [
      stat(t("flowReceivedLabel"), data.flow.received),
      stat(t("flowFilteredLabel"), data.flow.filtered, data.flow.filtered ? { page: "source" } : void 0),
      stat(t("flowJudgedLabel"), data.flow.judged),
      stat(t("flowAcceptedLabel"), data.flow.accepted, { page: "eval", query: { window: "24h" } }),
      data.flow.dropped > 0 && stat(t("flowDroppedLabel"), data.flow.dropped, { page: "source" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Section, { title: t("term.executor"), action: more({ page: "execution" }), children: setup?.problem ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Hint, { children: t("executorWaitingSetup") }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "dt-stats", children: [
      stat(t("executingLabel"), `${data.executor.running} / ${data.executor.maxWorkers}`),
      stat(t("queuedLabel"), data.executor.queued),
      stat(t("idleLabel"), data.executor.idle)
    ] }) })
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/client/deployment.tsx
var import_react10 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var MACHINE_LIMITS = ["promptMaxChars", "admissionContextMaxPages", "admissionContextTimeoutMs"];
var text = (value) => typeof value === "string" || typeof value === "number" ? String(value) : "";
var limitsOf = (values) => Object.fromEntries(MACHINE_LIMITS.map((key) => [key, text(values?.[key])]));
function usePageForm(form) {
  const subscribe = (0, import_react10.useCallback)((listener) => form ? form.subscribe(listener) : () => {
  }, [form]);
  const state = (0, import_react10.useSyncExternalStore)(subscribe, () => form?.getSnapshot());
  return (0, import_react10.useMemo)(() => form && state ? { state, mutate: form.mutate.bind(form) } : void 0, [form, state]);
}
function DeploymentPage({ setup, form, accounts: showAccounts }) {
  const { t, notify } = usePanel();
  const snapshot = form?.state;
  const editable = snapshot?.status === "ready" && snapshot.writable;
  const draft = useDraft({
    saved: limitsOf(editable ? snapshot.value : setup.machine),
    revision: editable ? snapshot.revision : void 0,
    reload: async () => {
    },
    save: async (value, revision, base) => {
      const ops = MACHINE_LIMITS.filter((key) => value[key].trim() !== base[key].trim()).map((key) => value[key].trim() ? { op: "set", path: [key], value: Number(value[key]) } : { op: "unset", path: [key] });
      if (!form || !await form.mutate(ops, revision)) throw new Error(t("deploymentRefused"));
      notify(t("saved"));
      return { revision: revision + 1, restarting: false };
    }
  });
  const accounts = setup.accounts;
  const readOnlyHint = !form ? t("deploymentNoForms") : snapshot?.mode === "memory" ? t("deploymentReadOnly") : snapshot?.status === "loading" ? t("loading") : snapshot?.status === "unavailable" ? t("deploymentUnavailable") : !editable ? t("deploymentReadOnly") : void 0;
  const limit = (key, label2) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Field, { label: label2, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    Input,
    {
      type: "number",
      min: LIMITS[key].min,
      max: LIMITS[key].max,
      step: 1,
      value: draft.value[key],
      disabled: !editable,
      onChange: (event) => draft.edit({ ...draft.value, [key]: event.target.value })
    }
  ) });
  const feishu = accounts?.feishu ? accounts.feishu.name || accounts.feishu.botId : setup.feishuProblem ? setupText(t, setup.feishuProblem) : t("deploymentFeishuNone");
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("form", { className: "dt-form", onSubmit: (event) => {
    void draft.submit(event);
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Fields, { disabled: draft.busy, children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Hint, { children: t("deploymentIntro") }),
      setup.problem && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dt-row-buttons", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "dt-error", role: "status", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(SetupMessage, { problem: setup.problem, lead: true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(CheckSetupButton, {})
      ] }),
      showAccounts && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Section, { title: t("deploymentDerived"), hint: t("deploymentDerivedHint"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(KeyValues, { rows: [
          [t("deploymentRepository"), accounts?.repository ?? "\u2014"],
          [t("deploymentAgent"), accounts ? `@${accounts.agent}` : "\u2014"],
          [t("deploymentFeishu"), feishu]
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Hint, { children: t("deploymentAccountsWhere") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Section, { title: t("deploymentMachine"), children: [
        readOnlyHint && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Hint, { children: readOnlyHint }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dt-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { className: "dt-field-head", children: [
            t("deploymentStateDir"),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(InfoTip, { text: t("deploymentStateDirHint") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "dt-mono", children: setup.machine.stateDir })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Section, { title: t("deploymentLimits"), hint: t("deploymentLimitsHint"), children: [
        limit("promptMaxChars", t("deploymentPromptMaxChars")),
        limit("admissionContextMaxPages", t("deploymentContextPages")),
        limit("admissionContextTimeoutMs", t("deploymentContextTimeout"))
      ] })
    ] }),
    editable && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(SaveBar, { ...draft, onDiscard: draft.discard })
  ] });
}
function PluginPage({ form }) {
  const { t } = usePanel();
  const { state, error } = usePanelData();
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "dt-embedded", children: state ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(DeploymentPage, { setup: state.setup, form, accounts: true }) : error ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "dt-error", role: "alert", children: error.message }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "dt-hint", children: t("loading") }) });
}
function PluginConfig({ t, view, form }) {
  return view === "page" ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(PanelProvider, { t, interval: 1e4, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(PluginPage, { form }) }) : null;
}

// ../../tmp/dsh-superagent-prototype/src/client/prompts.tsx
var import_react11 = require("react");

// ../../tmp/dsh-superagent-prototype/src/client/prompt-config.ts
var isSkill = (name) => name.startsWith("skill/");
var isPart = (name) => name.startsWith("part/");
var partKey = (name) => name.slice(5);
var sections = (config) => [
  ...Object.keys(config).filter((name) => name !== "skills" && name !== "overrides"),
  ...Object.keys(config.skills).map((name) => `skill/${name}`),
  ...Object.keys(config.overrides ?? {}).map((key) => `part/${key}`)
];
var sectionText = (config, name) => isPart(name) ? config.overrides?.[partKey(name)]?.text : isSkill(name) ? config.skills[name.slice(6)] : name !== "skills" && name !== "overrides" && Object.hasOwn(config, name) ? config[name] : void 0;
var withOverrides = (config, parts) => ({
  ...config,
  overrides: Object.fromEntries(Object.entries(config.overrides ?? {}).filter(([key]) => !parts || parts.some((part) => part.key === key)))
});
var partText = (config, part) => config.overrides?.[part.key]?.text ?? part.text;
function withOverride(config, part, text2, rebase = false) {
  const { [part.key]: previous, ...others } = config.overrides ?? {};
  const base = rebase ? part.base : previous?.base ?? part.base;
  return { ...config, overrides: text2 === void 0 || text2 === part.text ? others : { ...others, [part.key]: { text: text2, base } } };
}
function withSection(config, name, text2) {
  return isSkill(name) ? { ...config, skills: { ...config.skills, [name.slice(6)]: text2 } } : { ...config, [name]: text2 };
}
function withoutSkill(config, name) {
  const { [name.slice(6)]: _removed, ...skills } = config.skills;
  return { ...config, skills };
}
var changedSections = (config, saved) => [.../* @__PURE__ */ new Set([...sections(config), ...sections(saved)])].filter((name) => isPart(name) ? JSON.stringify(config.overrides?.[partKey(name)]) !== JSON.stringify(saved.overrides?.[partKey(name)]) : sectionText(config, name) !== sectionText(saved, name));
var sectionLabel = (t, view, name) => isPart(name) ? valueLabel(t, "promptPart", partKey(name)) : isSkill(name) ? `${view.skillPrefix}${name.slice(6)}` : valueLabel(t, "promptPart", name);
var skillNameFree = (name, config, view) => new RegExp(view.skillName).test(name) && !Object.hasOwn(config.skills, name) && !view.builtin.includes(name);
var partWith = (part, base) => part.heading === void 0 ? base : `${part.heading}
${base}`;
function lineDiff(before, after) {
  const a = before.split("\n"), b = after.split("\n");
  const lcs = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
  const lines = [];
  for (let i = 0, j = 0; i < a.length || j < b.length; ) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      lines.push({ kind: "same", text: a[i] });
      i++;
      j++;
    } else if (j < b.length && (i === a.length || lcs[i][j + 1] >= lcs[i + 1][j])) lines.push({ kind: "ins", text: b[j++] });
    else lines.push({ kind: "del", text: a[i++] });
  }
  const folded = [];
  for (let k = 0; k < lines.length; ) {
    let end = k;
    while (end < lines.length && lines[end].kind === "same") end++;
    if (end - k > 4) folded.push(lines[k], { kind: "fold", count: end - k - 2 }, lines[end - 1]);
    else folded.push(...lines.slice(k, Math.max(end, k + 1)));
    k = Math.max(end, k + 1);
  }
  return folded;
}

// ../../tmp/dsh-superagent-prototype/src/client/prompts.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var originText = (t, view, from) => from === void 0 ? void 0 : from === "defaults" ? t("promptDraftFromDefaults") : "revision" in from ? t("promptDraftFromHistory", { revision: from.revision }) : t("promptDraftSectionReset", { part: sectionLabel(t, view, from.reset) });
function PromptsPage() {
  const { call } = usePanel();
  const [view, setView] = (0, import_react11.useState)();
  const [error, setError] = (0, import_react11.useState)();
  const reload = (0, import_react11.useCallback)(async () => {
    setView(await call("GET prompts"));
  }, [call]);
  (0, import_react11.useEffect)(() => {
    reload().catch(setError);
  }, [reload]);
  return view ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(PromptsEditor, { view, reload }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(LoadState, { loading: true, error });
}
function PromptsEditor({ view, reload }) {
  const { t, call, notify } = usePanel();
  const saved = withOverrides(view.current.config);
  const draft = useDraft({
    key: `dsh-superagent/prompts/${view.masterId}`,
    saved,
    revision: view.revision,
    reload,
    save: async (config2, baseRevision) => {
      const result = await call("PUT prompts", { body: { config: config2, baseRevision } });
      notify(t(result.context_delivery === "pending" ? "promptSavedPending" : "saved"));
      return result;
    }
  });
  const config = draft.value;
  const [tab, setTab] = (0, import_react11.useState)("edit");
  const [selection, select] = (0, import_react11.useState)(draft.meta?.selection ?? "communication");
  const exists = isPart(selection) ? view.parts.some((part) => part.key === partKey(selection)) : sectionText(config, selection) !== void 0;
  const selected = exists ? selection : "communication";
  const changed = changedSections(config, saved);
  const edit = (next, note = {}) => draft.edit(next, {
    from: note.from ?? draft.meta?.from,
    selection: note.selection ?? selected
  });
  const open = (name) => {
    select(name);
    setTab("edit");
  };
  const words2 = {
    merged: (revision) => t("promptConflict", { revision }),
    conflict: (revision, paths) => t("promptConflictParts", { revision, parts: paths.map(([name, item]) => sectionLabel(
      t,
      view,
      item === void 0 ? name : name === "skills" ? `skill/${item}` : name === "overrides" ? `part/${item}` : name
    )).join(t("listSeparator")) }),
    editing: [
      t("promptsDraftVersion", { revision: draft.revision }),
      t("promptChanges", { count: changed.length }),
      originText(t, view, draft.meta?.from)
    ].filter(Boolean).join(" \xB7 ")
  };
  const tabs = [
    { value: "edit", label: t("promptViewEdit") },
    { value: "full", label: t("promptViewFull") },
    { value: "history", label: t("promptViewHistory") }
  ];
  const removed = view.defaultChanged.filter((item) => item.removed).map((item) => item.part);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-form", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dt-subtabs", role: "tablist", "aria-label": t("promptViews"), children: tabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "button",
      {
        type: "button",
        role: "tab",
        className: "dt-subtab",
        "aria-selected": tab === item.value,
        onClick: () => setTab(item.value),
        children: item.label
      },
      item.value
    )) }),
    removed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t("promptRemovedParts", { parts: removed.join(t("listSeparator")) }) }),
    tab === "edit" && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(PromptSections, { config, view, changed, selected, onSelect: select, onEdit: edit }),
    tab === "full" && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(FullPrompt, { config, view, dirty: draft.dirty, revision: draft.revision, onEdit: open }),
    tab === "history" && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      PromptHistory,
      {
        view,
        from: draft.meta?.from,
        onLoad: (next, from) => edit(withOverrides(next, view.parts), { from })
      },
      view.revision
    ),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      SaveBar,
      {
        ...draft,
        words: words2,
        onSave: () => {
          void draft.submit();
        },
        onDiscard: () => {
          draft.discard();
          reload().catch((failure) => notify(errorText(failure)));
        }
      }
    )
  ] });
}
function PromptSections({ config, view, changed, selected, onSelect, onEdit }) {
  const { t } = usePanel();
  const [name, setName] = (0, import_react11.useState)("");
  const [invalid, setInvalid] = (0, import_react11.useState)(false);
  const item = (section, children) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "button",
    {
      type: "button",
      className: "dt-nav-item",
      "aria-current": section === selected ? "true" : void 0,
      onClick: () => onSelect(section),
      children
    },
    section
  );
  const unsaved = (section) => changed.includes(section) && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "dt-changed-dot", "aria-label": t("unsaved") });
  const add = (event) => {
    event.preventDefault();
    if (!skillNameFree(name.trim(), config, view)) {
      setInvalid(true);
      return;
    }
    const section = `skill/${name.trim()}`;
    setName("");
    onEdit(withSection(config, section, ""), { selection: section });
    onSelect(section);
  };
  const part = isPart(selected) ? view.parts.find((item2) => item2.key === partKey(selected)) : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-prompt", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("nav", { className: "dt-prompt-nav", "aria-label": t("promptSections"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dt-nav-group", children: t("promptTeamGroup") }),
      view.sections.map((section) => item(section, /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { children: [
          sectionLabel(t, view, section),
          config[section] !== view.defaults[section] && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            "span",
            {
              className: "dt-changed-tag",
              children: t("promptChanged")
            }
          ),
          unsaved(section)
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("small", { children: t(`promptPartHint.${section}`) })
      ] }))),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dt-nav-group", children: t("promptBuiltInGroup") }),
      view.parts.map((entry) => item(`part/${entry.key}`, /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { children: [
        sectionLabel(t, view, `part/${entry.key}`),
        config.overrides?.[entry.key] && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "dt-changed-tag", children: t("promptChanged") }),
        updated(config, entry) && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "dt-changed-tag dt-updated-tag", children: t("promptDefaultUpdated") }),
        unsaved(`part/${entry.key}`)
      ] }))),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dt-nav-group", children: t("promptSkillsGroup") }),
      Object.keys(config.skills).map((skill) => item(`skill/${skill}`, /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { children: [
        sectionLabel(t, view, `skill/${skill}`),
        unsaved(
          `skill/${skill}`
        )
      ] }))),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("form", { className: "dt-add-skill", onSubmit: add, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          Input,
          {
            value: name,
            placeholder: t("promptSkillName"),
            "aria-label": t("promptAddSkill"),
            spellCheck: false,
            onChange: (event) => {
              setName(event.target.value);
              setInvalid(false);
            }
          }
        ),
        invalid && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "dt-error", role: "alert", children: t("promptSkillNameInvalid") }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Button, { variant: "ghost", size: "sm", type: "submit", icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "plus" }), children: t("promptAddSkillAction") })
      ] })
    ] }),
    part ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(BuiltInEditor, { config, view, part, onEdit }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(TeamEditor, { config, view, selected, onSelect, onEdit })
  ] });
}
var updated = (config, part) => {
  const override = config.overrides?.[part.key];
  return !!override?.base && override.base !== part.base;
};
function TeamEditor({ config, view, selected, onSelect, onEdit }) {
  const { t } = usePanel();
  const text2 = sectionText(config, selected) ?? "";
  const fallback = sectionText(view.defaults, selected);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-prompt-main", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-subhead", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h3", { className: "dt-section-title", children: sectionLabel(t, view, selected) }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "dt-actions", children: isSkill(selected) ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Button, { variant: "outline", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "trash" }), onClick: () => {
        onEdit(
          withoutSkill(config, selected),
          { selection: "communication" }
        );
        onSelect("communication");
      }, children: t("remove") }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        Button,
        {
          variant: "outline",
          size: "sm",
          icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "refresh" }),
          disabled: fallback === text2,
          onClick: () => onEdit(withSection(config, selected, fallback ?? ""), { from: { reset: selected } }),
          children: t("promptResetSection")
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t(isSkill(selected) ? "promptReadBy.skill" : "promptReadBy.both") }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "textarea",
      {
        className: "dt-textarea dt-mono dt-editor",
        spellCheck: false,
        "aria-label": t("promptBody"),
        value: text2,
        onChange: (event) => onEdit(withSection(config, selected, event.target.value))
      }
    )
  ] });
}
function BuiltInEditor({ config, view, part, onEdit }) {
  const { t } = usePanel();
  const name = `part/${part.key}`;
  const reset = () => onEdit(withOverride(config, part, void 0), { from: { reset: name } });
  const base = config.overrides?.[part.key]?.base;
  const previous = view.defaultChanged.find((item) => item.part === part.key && item.base === base)?.previous;
  const readBy = part.key.startsWith("skill/") ? "promptReadBy.skill" : part.roles.length > 1 ? "promptReadBy.both" : `promptReadBy.${part.roles[0]}`;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-prompt-main", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-subhead", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h3", { className: "dt-section-title", children: sectionLabel(t, view, name) }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "dt-actions", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        Button,
        {
          variant: "outline",
          size: "sm",
          icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "refresh" }),
          disabled: !config.overrides?.[part.key],
          onClick: reset,
          children: t("promptResetSection")
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t(readBy) }),
    part.placeholders && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t("promptTemplateHint", { placeholders: part.placeholders.join(t("listSeparator")) }) }),
    updated(config, part) && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("section", { className: "dt-default-updated", "aria-label": t("promptDefaultUpdated"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("b", { children: t("promptDefaultUpdated") }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t("promptDefaultUpdatedHint") }),
      previous !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t("promptDefaultUpdatedKnown") }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Diff, { lines: lineDiff(previous, part.text) })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t("promptDefaultUpdatedUnknown") }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Diff, { lines: lineDiff(partText(config, part), part.text) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "dt-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Button, { variant: "outline", size: "sm", onClick: () => onEdit(withOverride(config, part, partText(config, part), true)), children: t("promptKeepMine") }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Button, { variant: "outline", size: "sm", onClick: reset, children: t("promptTakeDefault") })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "textarea",
      {
        className: "dt-textarea dt-mono dt-editor",
        spellCheck: false,
        "aria-label": t("promptBody"),
        value: partText(config, part),
        onChange: (event) => onEdit(withOverride(config, part, event.target.value))
      }
    )
  ] });
}
var KIND_LABEL = { team: "promptPartTeam", fixed: "promptPartFixed", generated: "promptPartGenerated" };
function FullPrompt({ config, view, dirty, revision, onEdit }) {
  const { t, call, notify } = usePanel();
  const [target, setTarget] = (0, import_react11.useState)("orchestrator");
  const [compare, setCompare] = (0, import_react11.useState)(dirty ? "saved" : "default");
  const [preview, setPreview] = (0, import_react11.useState)();
  const [error, setError] = (0, import_react11.useState)();
  (0, import_react11.useEffect)(() => {
    let active = true;
    call("POST prompts/preview", { body: config }).then(
      (value) => {
        if (active) {
          setPreview({ config, value });
          setError(void 0);
        }
      },
      (failure) => {
        if (active) setError(failure);
      }
    );
    return () => {
      active = false;
    };
  }, [call, config]);
  if (!preview || error) return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(LoadState, { loading: true, error });
  const shown = dirty ? compare : "default";
  const team = isSkill(target) && Object.hasOwn(preview.config.skills, target.slice(6));
  const parts = isSkill(target) ? [{ name: target, kind: team ? "team" : "fixed", ...team ? {} : { key: target }, text: preview.value.skills[target.slice(6)] ?? "" }] : preview.value.parts[target];
  const builtIn = (key) => view.parts.find((part) => part.key === key);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-subhead", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
        "select",
        {
          className: "dt-select dt-inline-select",
          "aria-label": t("promptPreviewTarget"),
          value: target,
          onChange: (event) => setTarget(event.target.value),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", { value: "orchestrator", children: valueLabel(t, "promptRole", "orchestrator") }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", { value: "worker", children: valueLabel(t, "promptRole", "worker") }),
            Object.keys(preview.value.skills).map((name) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("option", { value: `skill/${name}`, children: sectionLabel(
              t,
              view,
              `skill/${name}`
            ) }, name))
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t("promptFullState", {
        count: parts.length,
        chars: parts.reduce((sum, part) => sum + part.text.length, 0),
        state: dirty ? t("promptPreviewDraft") : t("promptPreviewSaved", { revision })
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(SegmentedControl, { className: "dt-segmented dt-compare", label: t("promptCompare"), value: shown, options: [...dirty ? [{ value: "saved", label: t("promptCompareSaved") }] : [], {
        value: "default",
        label: t("promptCompareDefault")
      }], onChange: setCompare }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Button, { variant: "outline", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "copy" }), onClick: () => {
        void navigator.clipboard.writeText(parts.map((part) => part.text).join("\n\n")).then(() => notify(t("copied")));
      }, children: t("promptCopyAll") })
    ] }),
    parts.map((part) => {
      const { kind } = part;
      const text2 = sectionText(preview.config, part.name) ?? "";
      const entry = part.key === void 0 ? void 0 : builtIn(part.key);
      const from = (config2) => kind === "team" ? partWith(part, sectionText(config2, part.name) ?? "") : kind === "fixed" && entry ? partText(config2, entry) : void 0;
      const base = from(shown === "saved" ? view.current.config : view.defaults);
      const edited = kind === "team" ? !isSkill(part.name) && text2 !== sectionText(view.defaults, part.name) : !!entry && !!preview.config.overrides?.[entry.key];
      const template = kind === "generated" && !!entry && preview.config.overrides?.[entry.key]?.text !== view.current.config.overrides?.[entry.key]?.text;
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("section", { className: "dt-preview-part", "data-editable": kind === "team" || entry !== void 0 || void 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-preview-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("b", { children: sectionLabel(t, view, entry ? `part/${entry.key}` : part.name) }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: t(KIND_LABEL[kind]) }),
          edited && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "dt-changed-tag", children: t("promptChanged") }),
          (kind === "team" || entry) && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            "button",
            {
              type: "button",
              className: "dt-textlink",
              onClick: () => onEdit(entry ? `part/${entry.key}` : part.name),
              children: t("promptEditSource")
            }
          )
        ] }),
        base !== void 0 && base !== part.text ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Diff, { lines: lineDiff(base, part.text) }) : shown === "saved" && !template ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t(kind === "generated" ? "promptBuiltInFolded" : "promptSameAsSaved") }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("pre", { className: "dt-pre", children: part.text })
      ] }, part.name);
    })
  ] });
}
function Diff({ lines }) {
  const { t } = usePanel();
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("pre", { className: "dt-pre", children: lines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react11.Fragment, { children: line.kind === "fold" ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "dt-diff-fold", children: t("promptSameLines", { count: line.count }) }),
    "\n"
  ] }) : line.kind === "ins" ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("ins", { children: `${line.text}
` }) : line.kind === "del" ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("del", { children: `${line.text}
` }) : `${line.text}
` }, index)) });
}
function PromptHistory({ view, from, onLoad }) {
  const { t, call } = usePanel();
  const [older, setOlder] = (0, import_react11.useState)();
  const next = older ? older.next_offset : view.next_offset;
  const more = useAction(async (offset) => {
    const page = await call("GET prompts", { query: { offset } });
    setOlder({ revisions: [...older?.revisions ?? [], ...page.revisions], next_offset: page.next_offset });
  });
  const load = useAction(async (revision) => {
    onLoad((await call("GET prompts", { query: { revision } })).current.config, { revision });
  });
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-form", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t("promptHistoryHint") }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("ul", { className: "dt-list", children: [...view.revisions, ...older?.revisions ?? []].map((version) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("li", { className: "dt-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-row-main", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dt-row-title", children: t("promptHistoryItem", { revision: version.revision, time: version.savedAt ? when(version.savedAt, t("lang")) : t("promptHistoryInitial"), source: valueLabel(t, "historySource", version.source) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dt-row-meta", children: version.changed.length ? t("promptHistoryChanged", { parts: version.changed.map((name) => sectionLabel(t, view, name)).join(t("listSeparator")) }) : t("promptHistoryNone") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dt-row-actions", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        Button,
        {
          variant: "outline",
          size: "sm",
          icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "history" }),
          disabled: load.busy || typeof from === "object" && "revision" in from && from.revision === version.revision,
          onClick: () => {
            void load.run(version.revision);
          },
          children: t("promptRestore")
        }
      ) })
    ] }, version.revision)) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-actions", children: [
      next !== null && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        Button,
        {
          variant: "outline",
          size: "sm",
          icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "chevron-down" }),
          disabled: more.busy,
          onClick: () => {
            void more.run(next);
          },
          children: t("promptOlder")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        Button,
        {
          variant: "outline",
          size: "sm",
          icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "refresh" }),
          onClick: () => onLoad(view.defaults, "defaults"),
          children: t("promptDefaults")
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dt-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: t("promptSessions") }),
      view.sessions.length ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("ul", { className: "dt-changes dt-mono", children: view.sessions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "li",
        {
          children: t("promptSessionItem", { session: item.sessionId, revision: item.revision })
        },
        item.sessionId
      )) }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Hint, { children: t("promptNoSessions") })
    ] })
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/client/source.tsx
var import_react12 = require("react");
var import_jsx_runtime12 = require("react/jsx-runtime");
function SourceCard({ source }) {
  const { t, call } = usePanel();
  const { running } = usePanelData();
  const { reload } = useSettings();
  const [advancedOpen, setAdvancedOpen] = (0, import_react12.useState)(false);
  const refreshLabels = async () => {
    const { added } = await call(
      "POST sources/:id/labels",
      { id: source.id }
    );
    await reload();
    return added;
  };
  const draft = useBlockDraft(`source:${source.id}`, source.value, source.revision);
  const value = draft.value;
  const { problem, value: saved } = source;
  const changed = (key) => String(value.config[key] ?? "") !== String(saved.config[key] ?? "");
  const restarts = draft.dirty && source.restarts.some(changed);
  const description = localized(t, source.description);
  const field = (spec) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    SourceField,
    {
      field: spec,
      value: value.config[spec.key],
      saved: saved.config[spec.key],
      labels: source.labels,
      refreshLabels,
      fact: spec.type === "fact" || !changed(spec.key) ? source.facts[spec.key] : void 0,
      onChange: (next) => draft.edit({ ...value, config: { ...value.config, [spec.key]: next } })
    },
    spec.key
  );
  const advanced = source.fields.filter((spec) => spec.advanced);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("form", { id: `dt-source-${source.id}`, className: "dt-card", onSubmit: (event) => {
    void draft.submit(event);
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(Fields, { disabled: draft.busy, children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-card-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "dt-row-main", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-title", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-card-title", children: localized(t, source.title) }),
          description && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(InfoTip, { text: description }),
          !source.installed && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Tag, { tone: "warning", children: t("sourceNotInstalled") })
        ] }) }),
        source.installed && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          Switch,
          {
            checked: value.enabled,
            onChange: (enabled) => draft.edit({ ...value, enabled }),
            label: t("sourceEnable", { name: localized(t, source.title) })
          }
        )
      ] }),
      problem && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-buttons", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "dt-error", role: "status", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(SetupMessage, { problem, lead: true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(CheckSetupButton, {})
      ] }),
      !source.installed && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Hint, { children: t("sourceNotInstalledHint") }),
      source.installed && source.fields.filter((spec) => !spec.advanced).map(field),
      source.installed && advanced.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        DisclosureRow,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Icon, { name: "settings" }),
          title: t("advanced"),
          open: advancedOpen,
          onToggle: () => setAdvancedOpen(!advancedOpen),
          children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "dt-disclosure-body", children: advanced.map(field) })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      SaveBar,
      {
        ...draft,
        status: restarts && running > 0 ? t("restartInterrupts", { count: running }) : void 0,
        onDiscard: draft.discard
      }
    )
  ] });
}
function i18nText(val) {
  if (!val) return "";
  if (typeof val === "object") return String(val.zh || val.en || "");
  return String(val);
}

function BotConnectorCard({ connector, template, onSaved, onDuplicate, onDelete, onTest, busyId, noticeForId }) {
  const [name, setName] = (0, import_react12.useState)(connector.name || "");
  const [productName, setProductName] = (0, import_react12.useState)(connector.productName || "");
  const [enabled, setEnabled] = (0, import_react12.useState)(Boolean(connector.enabled));
  const [listenMode, setListenMode] = (0, import_react12.useState)(connector.listenMode || "mentions");
  const [credentials, setCredentials] = (0, import_react12.useState)(connector.credentials || connector.config || {});
  const [copied, setCopied] = (0, import_react12.useState)(false);
  (0, import_react12.useEffect)(() => {
    setName(connector.name || "");
    setProductName(connector.productName || "");
    setEnabled(Boolean(connector.enabled));
    setListenMode(connector.listenMode || "mentions");
    setCredentials(connector.credentials || connector.config || {});
  }, [connector.id, connector.updatedAt]);

  const initialCreds = connector.credentials || connector.config || {};
  const dirty = name !== (connector.name || "") ||
    productName !== (connector.productName || "") ||
    enabled !== Boolean(connector.enabled) ||
    listenMode !== (connector.listenMode || "mentions") ||
    JSON.stringify(credentials) !== JSON.stringify(initialCreds);

  const fields = template ? template.fields : [];
  const webhookPath = connector.webhookPath || `/api/superagent-connectors/${connector.id}/webhook`;
  const fullWebhookUrl = typeof window !== "undefined" ? `${window.location.origin}${webhookPath}` : webhookPath;
  const isBusy = busyId === connector.id;
  const receivedCount = connector.stats?.receivedCount ?? connector.stats?.received ?? 0;

  const handleFieldChange = (key, val) => {
    setCredentials((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopyWebhook = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(fullWebhookUrl).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleSave = (nextEnabled) => {
    const targetEnabled = typeof nextEnabled === "boolean" ? nextEnabled : enabled;
    onSaved(connector.id, {
      name: name.trim() || connector.name,
      productName: productName.trim() || connector.productName,
      enabled: targetEnabled,
      listenMode,
      credentials
    });
  };

  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    "section",
    {
      id: `dt-connector-${connector.id}`,
      "data-testid": `connector-card-${connector.id}`,
      className: "dt-card",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("header", { className: "dt-card-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-card-heading", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { className: "dt-card-title", children: connector.name }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "dt-hint", children: [
              i18nText(connector.productName) || (template ? i18nText(template.title) : connector.platform),
              " · 实例 ID: ",
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("code", { className: "dt-code", children: connector.id }),
              " · ",
              enabled ? "已启用监听" : "已暂停",
              receivedCount > 0 ? ` · 已接收 ${receivedCount} 条消息` : ""
            ] }),
            template && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "dt-card-desc", children: i18nText(template.summary || template.QuickGuide) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Switch,
            {
              checked: enabled,
              disabled: isBusy,
              onChange: (next) => {
                setEnabled(next);
                handleSave(next);
              },
              label: connector.name
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field-grid", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "机器人实例名称 (区分多账号)" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Input,
              {
                value: name,
                placeholder: "例如：钉钉机器人 · 研发群账号 2",
                onChange: (e) => setName(e.target.value)
              }
            )
          ] }),
          connector.platform === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "所属产品 / 系统名称" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Input,
              {
                value: productName,
                placeholder: "例如：Jira / Linear / 内部工单系统 / Mattermost",
                onChange: (e) => setProductName(e.target.value)
              }
            )
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "触发监听范围" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-choice-row", children: [
              [
                { value: "mentions", label: "仅 @ 提及 / 评论指派" },
                { value: "all", label: "全部群消息与事件" },
                { value: "direct", label: "仅私聊消息" }
              ].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                Pill,
                {
                  active: listenMode === opt.value,
                  onClick: () => setListenMode(opt.value),
                  children: opt.label
                },
                opt.value
              ))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "专属入站 Webhook 回调地址 (各账号独立隔离)" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-choice-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("code", { className: "dt-code", children: fullWebhookUrl }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Button,
              {
                variant: "ghost",
                onClick: handleCopyWebhook,
                children: copied ? "已复制地址" : "复制 Webhook"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "dt-hint", children: "无需编写任何本地 .sh 脚本！在对应平台后台填入上方凭证或将事件回调指向该专属地址即可。" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "dt-field-grid", children: fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("label", { className: "dt-label", children: [
            i18nText(field.label),
            field.required ? " *" : ""
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Input,
            {
              type: field.type === "password" || field.secret ? "password" : "text",
              mono: field.type === "password" || field.secret || field.key.includes("Path") || field.key.includes("Url") || field.key.includes("Template"),
              value: credentials[field.key] || "",
              placeholder: field.placeholder || "",
              onChange: (e) => handleFieldChange(field.key, e.target.value)
            }
          ),
          (field.hint || field.helperText) && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "dt-hint", children: i18nText(field.hint || field.helperText) })
        ] }, field.key)) }),
        noticeForId && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: noticeForId.tone === "error" ? "dt-error" : "dt-hint", children: noticeForId.text }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-choice-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: dirty ? "primary" : "ghost",
              disabled: isBusy,
              onClick: () => handleSave(),
              children: dirty ? "保存配置 *" : "保存配置"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "ghost",
              disabled: isBusy,
              onClick: () => onTest(connector.id),
              children: "发送测试消息"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "ghost",
              disabled: isBusy,
              onClick: () => onDuplicate(connector.id),
              children: "+ 再加一个同平台账号"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "ghost",
              disabled: isBusy,
              onClick: () => onDelete(connector.id),
              children: "删除实例"
            }
          )
        ] })
      ]
    }
  );
}

function BotConnectorHub() {
  const [connectors, setConnectors] = (0, import_react12.useState)([]);
  const [templates, setTemplates] = (0, import_react12.useState)([]);
  const [loading, setLoading] = (0, import_react12.useState)(true);
  const [filterPlatform, setFilterPlatform] = (0, import_react12.useState)("all");
  const [busyId, setBusyId] = (0, import_react12.useState)("");
  const [notices, setNotices] = (0, import_react12.useState)({});
  const [showCustomCreator, setShowCustomCreator] = (0, import_react12.useState)(false);
  const [customName, setCustomName] = (0, import_react12.useState)("");
  const [customProduct, setCustomProduct] = (0, import_react12.useState)("");
  const [customOutboundUrl, setCustomOutboundUrl] = (0, import_react12.useState)("");
  const [customTextPath, setCustomTextPath] = (0, import_react12.useState)("text");

  const setCardNotice = (id, text, tone = "info") => {
    setNotices((prev) => ({ ...prev, [id]: { text, tone } }));
  };

  const loadConnectors = (0, import_react12.useCallback)(async () => {
    try {
      const res = await fetch("/api/superagent-connectors");
      const data = await res.json();
      if (data && data.ok) {
        setConnectors(Array.isArray(data.connectors) ? data.connectors : []);
        setTemplates(Array.isArray(data.templates) ? data.templates : []);
      }
    } catch (_err) {
    } finally {
      setLoading(false);
    }
  }, []);

  (0, import_react12.useEffect)(() => {
    loadConnectors();
  }, [loadConnectors]);

  const handleAddPlatformAccount = async (platform, extra = {}) => {
    setBusyId(`add-${platform}`);
    try {
      const res = await fetch("/api/superagent-connectors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          enabled: true,
          ...extra
        })
      });
      const data = await res.json();
      if (data && data.ok && data.connector) {
        await loadConnectors();
        setFilterPlatform("all");
        setCardNotice(data.connector.id, `已创建新机器人账号实例「${data.connector.name}」，可直接填写凭证或发送测试消息。`);
        setTimeout(() => {
          document.getElementById(`dt-connector-${data.connector.id}`)?.scrollIntoView?.({ behavior: "smooth", block: "center" });
        }, 80);
      }
    } finally {
      setBusyId("");
    }
  };

  const handleCreateCustomBot = async () => {
    if (!customProduct.trim() && !customName.trim()) return;
    const productLabel = customProduct.trim() || "自定义产品";
    const instanceName = customName.trim() || `${productLabel} 机器人 · 账号 1`;
    await handleAddPlatformAccount("custom", {
      name: instanceName,
      productName: productLabel,
      credentials: {
        inboundMode: "webhook",
        textPath: customTextPath.trim() || "text",
        senderPath: "sender.name",
        threadPath: "threadId",
        outboundWebhookUrl: customOutboundUrl.trim(),
        outboundBodyTemplate: '{"text": "{{text}}", "threadId": "{{threadId}}"}'
      }
    });
    setCustomName("");
    setCustomProduct("");
    setCustomOutboundUrl("");
    setShowCustomCreator(false);
  };

  const handleSaveConnector = async (id, patch) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/superagent-connectors/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch)
      });
      const data = await res.json();
      if (data && data.ok) {
        await loadConnectors();
        setCardNotice(id, "配置已保存并实时生效（已自动生成底层桥接器，无需手动写脚本）。");
      } else {
        setCardNotice(id, data?.error || "保存失败", "error");
      }
    } finally {
      setBusyId("");
    }
  };

  const handleDuplicateConnector = async (id) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/superagent-connectors/${encodeURIComponent(id)}/duplicate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (data && data.ok && data.connector) {
        await loadConnectors();
        setCardNotice(data.connector.id, `已基于原账号新增同平台账号「${data.connector.name}」，请填入第 2 个账号的独立凭证。`);
        setTimeout(() => {
          document.getElementById(`dt-connector-${data.connector.id}`)?.scrollIntoView?.({ behavior: "smooth", block: "center" });
        }, 80);
      }
    } finally {
      setBusyId("");
    }
  };

  const handleDeleteConnector = async (id) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/superagent-connectors/${encodeURIComponent(id)}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data && data.ok) {
        await loadConnectors();
      }
    } finally {
      setBusyId("");
    }
  };

  const handleTestConnector = async (id) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/superagent-connectors/${encodeURIComponent(id)}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (data && data.ok) {
        await loadConnectors();
        setCardNotice(
          id,
          `测试消息已成功注入 Superagent 线程 (${data.threadKey || data.triggerId || ""})！可在左侧「线程 (Threads)」中查看。`
        );
      } else {
        setCardNotice(id, data?.error || "测试发送失败", "error");
      }
    } finally {
      setBusyId("");
    }
  };

  const templateMap = {};
  templates.forEach((tpl) => {
    templateMap[tpl.platform] = tpl;
  });

  const dingtalkCount = connectors.filter((c) => c.platform === "dingtalk").length;
  const githubCount = connectors.filter((c) => c.platform === "github").length;
  const customCount = connectors.filter((c) => c.platform === "custom").length;

  const visibleConnectors = connectors.filter((c) => {
    if (filterPlatform === "all") return true;
    if (filterPlatform === "wecom_qq") return c.platform === "wecom" || c.platform === "qq";
    return c.platform === filterPlatform;
  });

  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-form", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { className: "dt-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("header", { className: "dt-card-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-card-heading", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { className: "dt-card-title", children: "多账号与自定义产品机器人接入中心" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "dt-hint", children: [
            "默认预置 钉钉机器人 与 GitHub 监听 · 当前已配置 ",
            connectors.length,
            " 个机器人实例（钉钉 ",
            dingtalkCount,
            " 个 · GitHub ",
            githubCount,
            " 个 · 自定义产品 ",
            customCount,
            " 个）"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "p",
            {
              className: "dt-card-desc",
              children: "支持同一平台挂载多个独立账号（例如同时接入 2 个钉钉机器人账号、多个 GitHub 仓库或飞书应用），并提供通用「自定义机器人」适配器，让后续任何新产品只需配置 Webhook / JSON 路径即可零脚本接入。"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "一键新增机器人账号 / 接入新产品" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-choice-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "outline",
              disabled: Boolean(busyId),
              onClick: () => handleAddPlatformAccount("dingtalk"),
              children: "+ 新增钉钉账号"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "outline",
              disabled: Boolean(busyId),
              onClick: () => handleAddPlatformAccount("github"),
              children: "+ 新增 GitHub 账号"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "outline",
              disabled: Boolean(busyId),
              onClick: () => handleAddPlatformAccount("feishu"),
              children: "+ 新增飞书账号"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "outline",
              disabled: Boolean(busyId),
              onClick: () => handleAddPlatformAccount("wecom"),
              children: "+ 新增企业微信"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "outline",
              disabled: Boolean(busyId),
              onClick: () => handleAddPlatformAccount("qq"),
              children: "+ 新增 QQ 机器人"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "outline",
              disabled: Boolean(busyId),
              onClick: () => setShowCustomCreator(!showCustomCreator),
              children: "+ 添加自定义产品机器人"
            }
          )
        ] })
      ] }),
      showCustomCreator && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h4", { className: "dt-card-title", children: "接入自定义产品机器人 (Universal Webhook / Polling)" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "dt-hint", children: "适用于任何第三方或内部产品（如 Jira、Linear、Mattermost、自研工单/告警系统、客服平台等）。创建后将生成独立入站 Webhook 并支持自定义 JSON 字段映射。" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field-grid", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "产品 / 系统名称 *" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Input,
              {
                value: customProduct,
                placeholder: "例如：Jira 工单系统 / Linear / 内部 IM",
                onChange: (e) => setCustomProduct(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "机器人实例名称" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Input,
              {
                value: customName,
                placeholder: "例如：Jira 生产环境告警机器人 · 账号 1",
                onChange: (e) => setCustomName(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "消息正文 JSON 路径 (textPath)" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Input,
              {
                mono: true,
                value: customTextPath,
                placeholder: "例如：text 或 issue.fields.summary",
                onChange: (e) => setCustomTextPath(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "出站回复 Webhook URL (选填)" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Input,
              {
                mono: true,
                value: customOutboundUrl,
                placeholder: "https://your-product.internal/api/bot/reply",
                onChange: (e) => setCustomOutboundUrl(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-choice-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "primary",
              onClick: handleCreateCustomBot,
              children: "确认创建自定义机器人"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "ghost",
              onClick: () => setShowCustomCreator(false),
              children: "取消"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "按平台筛选实例" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-choice-row", children: [
          [
            { key: "all", label: `全部实例 (${connectors.length})` },
            { key: "dingtalk", label: `钉钉 DingTalk (${dingtalkCount})` },
            { key: "github", label: `GitHub (${githubCount})` },
            { key: "feishu", label: `飞书 Feishu (${connectors.filter((c) => c.platform === "feishu").length})` },
            { key: "wecom_qq", label: `企微 / QQ (${connectors.filter((c) => c.platform === "wecom" || c.platform === "qq").length})` },
            { key: "custom", label: `自定义产品 (${customCount})` }
          ].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Pill,
            {
              active: filterPlatform === tab.key,
              onClick: () => setFilterPlatform(tab.key),
              children: tab.label
            },
            tab.key
          ))
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "dt-hint", children: "正在加载机器人实例列表..." }) : visibleConnectors.map((connector) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      BotConnectorCard,
      {
        connector,
        template: templateMap[connector.platform],
        onSaved: handleSaveConnector,
        onDuplicate: handleDuplicateConnector,
        onDelete: handleDeleteConnector,
        onTest: handleTestConnector,
        busyId,
        noticeForId: notices[connector.id]
      },
      connector.id
    ))
  ] });
}

function SourceSettings({ focus }) {
  const { sources } = useSettings().settings;
  const [legacyOpen, setLegacyOpen] = (0, import_react12.useState)(false);
  (0, import_react12.useEffect)(() => {
    if (focus) document.getElementById(`dt-source-${focus}`)?.scrollIntoView?.({ block: "start" });
  }, [focus]);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-form", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(BotConnectorHub, {}),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      DisclosureRow,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Icon, { name: "settings" }),
        title: "底层原生 CLI 引擎高级配置 (GitHub gh / 飞书 lark-cli)",
        open: legacyOpen,
        onToggle: () => setLegacyOpen(!legacyOpen),
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-disclosure-body", children: [
          sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(SourceCard, { source }, source.id)),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(ConfigHistory, { blocks: ["source:"] })
        ] })
      }
    )
  ] });
}
function DroppedReplies({ items }) {
  const { t, navigate } = usePanel();
  const [open, setOpen] = (0, import_react12.useState)(false);
  const target = (item) => item.ticket ? { route: { page: "execution", id: item.ticket.id }, name: item.ticket.title } : item.thread ? { route: { page: "trigger", id: item.thread }, name: t("term.thread") } : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    DisclosureRow,
    {
      icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Icon, { name: "dismiss" }),
      title: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
        t("sourceDroppedTitle"),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "span",
          {
            className: "dt-count",
            children: items.length
          }
        )
      ] }),
      open,
      onToggle: () => setOpen(!open),
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-disclosure-body", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Hint, { children: t("sourceDroppedHint") }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("ul", { className: "dt-list", children: items.map((item) => {
          const link = target(item);
          return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("li", { className: "dt-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Dot, { state: "idle" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-main", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "dt-row-title dt-line", children: readableMarkers(t, item.preview) || t("empty") }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-meta", children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Tag, { tone: "neutral", children: reasonLabel(t, item.dropped.reason) }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(When, { at: item.dropped.at }),
                link && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", className: "dt-textlink", onClick: () => navigate(link.route), children: link.name })
              ] })
            ] })
          ] }, item.id);
        }) })
      ] })
    }
  );
}
function SourceRow({ source }) {
  const { t, navigate } = usePanel();
  const { setup } = usePanelData();
  const [filteredOpen, setFilteredOpen] = (0, import_react12.useState)(false);
  const { problem, dropped } = source;
  const { dot, label: state } = sourceMark(t, source.state);
  const { received, filtered, lastAt } = source.stats;
  const notes = source.enabled && !problem && !setup?.problem ? source.health.filter((item) => item.state === "error" || item.state === "paused") : [];
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("li", { className: "dt-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Dot, { state: dot, label: state }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-main", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-row-name", children: localized(t, source.title) }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "span",
          {
            className: "dt-status-text",
            "data-state": dot,
            children: state
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-meta", children: [
        received > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          LabelValue,
          {
            label: t("sourceReceivedLabel"),
            value: received
          }
        ),
        filtered > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(LabelValue, { label: t("sourceFilteredLabel"), value: filtered }),
        lastAt && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(LabelValue, { label: t("sourceLatestLabel"), value: when(lastAt, t("lang")) })
      ] }),
      problem && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "dt-error", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(SetupMessage, { problem, lead: true }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "button",
          {
            type: "button",
            className: "dt-textlink",
            onClick: () => navigate(settingsRoute("source", { source: source.id })),
            children: t("sourceOpenSettings")
          }
        )
      ] }),
      notes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: item.state === "error" ? "dt-error dt-clamp" : "dt-hint dt-clamp", children: [
        valueLabel(t, "health", item.name),
        t("labelSeparator"),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: item.code ? void 0 : "dt-mono", children: healthText(
          t,
          item
        ) })
      ] }, item.name)),
      source.filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        DisclosureRow,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Icon, { name: "filter" }),
          title: t("sourceFilteredTitle"),
          open: filteredOpen,
          onToggle: () => setFilteredOpen(!filteredOpen),
          children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "dt-disclosure-body", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("ul", { className: "dt-list", children: source.filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("li", { className: "dt-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Dot, { state: "idle" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
              "div",
              {
                className: "dt-row-main",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-title", children: [
                    actorName(t, item.actor),
                    t("labelSeparator"),
                    readableMarkers(t, item.preview) || t("empty")
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-meta", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Tag, { tone: "neutral", children: reasonLabel(t, item.reason) }),
                    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(When, { at: item.at })
                  ] })
                ]
              }
            )
          ] }, item.id)) }) })
        }
      ),
      dropped.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(DroppedReplies, { items: dropped })
    ] })
  ] });
}
function ConnectorStatusSummary() {
  const { navigate } = usePanel();
  const [connectors, setConnectors] = (0, import_react12.useState)([]);
  (0, import_react12.useEffect)(() => {
    fetch("/api/superagent-connectors")
      .then((r) => r.json())
      .then((d) => {
        if (d && d.ok && Array.isArray(d.connectors)) setConnectors(d.connectors);
      })
      .catch(() => {});
  }, []);
  if (!connectors.length) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { className: "dt-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("header", { className: "dt-card-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-card-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { className: "dt-card-title", children: "多账号与自定义机器人实例状态" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "dt-hint", children: "默认启用钉钉与 GitHub，支持同平台多账号并行监听与自定义产品接入" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        Button,
        {
          variant: "ghost",
          onClick: () => navigate(settingsRoute("source")),
          children: "管理多账号与自定义机器人"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("ul", { className: "dt-list", children: connectors.map((c) => {
      const cnt = c.stats?.receivedCount ?? c.stats?.received ?? 0;
      const whPath = c.webhookPath || `/api/superagent-connectors/${c.id}/webhook`;
      return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("li", { className: "dt-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Dot, { state: c.enabled ? "ok" : "idle", label: c.enabled ? "已启用" : "已停用" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-main", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-title", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-row-name", children: c.name }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-status-text", "data-state": c.enabled ? "ok" : "idle", children: c.enabled ? "运行中" : "已停用" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-row-meta", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "dt-hint", children: [
              i18nText(c.productName) || c.platform,
              " · Webhook: ",
              whPath,
              cnt > 0 ? ` · 已接收 ${cnt} 条` : ""
            ] })
          ] })
        ] })
      ] }, c.id);
    }) })
  ] });
}
function SourceStatus() {
  const { t, call, navigate } = usePanel();
  const { setup } = usePanelData();
  const { data, error } = usePoll(() => call("GET sources"), []);
  const elsewhere = setup?.problem?.place === "deployment" ? setup.problem : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-form", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(StatusHead, { hint: t("sourceStatusIntro"), settings: "source" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(ConnectorStatusSummary, {}),
    elsewhere && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "dt-error", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(SetupMessage, { problem: elsewhere, lead: true }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "button",
        {
          type: "button",
          className: "dt-textlink",
          onClick: () => navigate(setupPage(elsewhere.place)),
          children: t("setupFixLink")
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(LoadState, { error, loading: !data }),
    data && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("ul", { className: "dt-list", children: data.map((source) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(SourceRow, { source }, source.id)) })
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/client/settings.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
var WIN_MCP_TOOL_LABELS = {
  "State-Tool": "窗口与控件读取",
  "Click-Tool": "鼠标点击",
  "Type-Tool": "键盘输入",
  "Scroll-Tool": "滚轮滚动",
  "Drag-Tool": "鼠标拖拽",
  "Move-Tool": "光标移动",
  "Shortcut-Tool": "快捷键组合",
  "App-Tool": "应用启动/切换",
  "Wait-Tool": "等待就绪",
  "Scrape-Tool": "网页/文本抓取"
};

function McpServerCard({ server, policy, busyId, notice, onSave, onProbe, onDelete }) {
  const isWinMcp = server.id === "windows_mcp" || server.templateId === "windows-mcp";
  const [name, setName] = (0, import_react12.useState)(server.name || server.id);
  const [enabled, setEnabled] = (0, import_react12.useState)(Boolean(server.enabled));
  const [transport, setTransport] = (0, import_react12.useState)(server.transport || "stdio");
  const [command, setCommand] = (0, import_react12.useState)(server.command || "uvx");
  const [argsText, setArgsText] = (0, import_react12.useState)(Array.isArray(server.args) ? server.args.join(" ") : "windows-mcp");
  const [url, setUrl] = (0, import_react12.useState)(server.url || "http://127.0.0.1:8000/mcp");
  const [dirty, setDirty] = (0, import_react12.useState)(false);
  const [copiedCmd, setCopiedCmd] = (0, import_react12.useState)(false);
  const [expanded, setExpanded] = (0, import_react12.useState)(
    () => globalThis.__dshFocusedMcpServerId === server.id || !server.builtin
  );
  const [focused, setFocused] = (0, import_react12.useState)(
    () => globalThis.__dshFocusedMcpServerId === server.id
  );

  (0, import_react12.useEffect)(() => {
    setName(server.name || server.id);
    setEnabled(Boolean(server.enabled));
    setTransport(server.transport || "stdio");
    setCommand(server.command || "");
    setArgsText(Array.isArray(server.args) ? server.args.join(" ") : "");
    setUrl(server.url || "");
    setDirty(false);
  }, [server]);

  (0, import_react12.useEffect)(() => {
    let focusTimer = null;
    const applyServerFocus = (targetId) => {
      if (targetId !== server.id) {
        setFocused(false);
        return;
      }
      setExpanded(true);
      setFocused(true);
      requestAnimationFrame(() => {
        const el = document.getElementById(`dt-mcp-server-${server.id}`);
        if (el && typeof el.scrollIntoView === "function") {
          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
      if (focusTimer) clearTimeout(focusTimer);
      focusTimer = setTimeout(() => setFocused(false), 2200);
    };
    if (globalThis.__dshFocusedMcpServerId === server.id) {
      applyServerFocus(server.id);
    }
    const onFocusEvent = (e) => {
      const targetId = e?.detail?.serverId;
      if (targetId) applyServerFocus(targetId);
    };
    window.addEventListener("dsh-mcp-focus-server", onFocusEvent);
    return () => {
      window.removeEventListener("dsh-mcp-focus-server", onFocusEvent);
      if (focusTimer) clearTimeout(focusTimer);
    };
  }, [server.id]);

  const isBusy = busyId === server.id;
  const rawState = server.status?.state || "standby";
  const dotState = !enabled ? "idle" : rawState === "ready" ? "done" : rawState === "error" ? "error" : "done";

  const shortStateText = !enabled
    ? "服务未开启"
    : rawState === "ready"
      ? `运行就绪${server.status?.latencyMs ? ` (${server.status.latencyMs}ms)` : ""}`
      : rawState === "error"
        ? "连接异常"
        : transport === "stdio"
          ? "本机按需待命"
          : "远程节点待命";

  const detailedStateCaption = !enabled
    ? "当前状态：已停用（暂不挂载桌面工具）"
    : rawState === "ready"
      ? `当前状态：已启用 · 运行就绪（${command || "uvx"} 已连接）`
      : rawState === "error"
        ? `当前状态：已启用 · 连接异常（请检查配置）`
        : transport === "stdio"
          ? "当前状态：已启用 · 本机按需待命"
          : "当前状态：已启用 · 远程节点待命";

  const commitSave = (override = {}) => {
    const parsedArgs = (override.argsText ?? argsText)
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    onSave(server.id, {
      name: (override.name ?? name).trim() || server.id,
      enabled: override.enabled !== undefined ? override.enabled : enabled,
      transport: override.transport ?? transport,
      command: (override.command ?? command).trim(),
      args: parsedArgs,
      url: (override.url ?? url).trim()
    });
    setDirty(false);
  };

  const quickCli = transport === "stdio"
    ? `${command || "uvx"} ${argsText || "windows-mcp"}`.trim()
    : `uvx windows-mcp --transport streamable-http --host 0.0.0.0 --port 8000`;

  const handleCopyCli = () => {
    try {
      navigator.clipboard?.writeText(quickCli);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 1800);
    } catch (_err) {}
  };

  const displaySummary = isWinMcp
    ? "提供窗口识别、鼠标点击、键盘输入、快捷键与应用切换等 10 项桌面自动化能力。"
    : server.summary || "自定义 MCP 扩展服务";

  const toolItems = Array.isArray(server.exposedTools) ? server.exposedTools : [];

  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    "section",
    {
      className: "dt-mcp-installed-card",
      "data-enabled": String(enabled),
      "data-expanded": String(expanded),
      "data-focused": focused ? "true" : void 0,
      id: `dt-mcp-server-${server.id}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-server-top", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", {
            className: "dt-mcp-server-main",
            role: "button",
            tabIndex: 0,
            "aria-expanded": expanded,
            onClick: () => setExpanded((v) => !v),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpanded((v) => !v);
              }
            },
            children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "dt-mcp-pkg-icon", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(McpNavIcon, { size: 18 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-server-info", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-server-title-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { className: "dt-mcp-server-name", children: isWinMcp ? "Windows-MCP 桌面控制" : name || server.id }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  "span",
                  {
                    className: "dt-mcp-badge-neutral",
                    children: server.builtin ? "内置安装" : "扩展服务"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "dt-mcp-status-caption", children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(StateDot, { state: dotState }),
                detailedStateCaption
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-server-right", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Button,
              {
                variant: "ghost",
                size: "sm",
                disabled: isBusy,
                onClick: () => onProbe(server.id),
                children: isBusy ? "检测中…" : "测试连接"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setExpanded(!expanded),
                children: expanded ? "收起设置" : "连接设置"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-switch-group", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-switch-state", children: enabled ? "已启用" : "已停用" }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                Switch,
                {
                  checked: enabled,
                  label: `启用 MCP 服务 ${name}`,
                  onChange: (nextVal) => {
                    setEnabled(nextVal);
                    commitSave({ enabled: nextVal });
                  }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "dt-mcp-server-desc", children: displaySummary })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-meta-box", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-meta-item", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-meta-label", children: "运行位置：" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-choice-row", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                Pill,
                {
                  active: transport === "stdio",
                  onClick: () => {
                    setTransport("stdio");
                    commitSave({ transport: "stdio" });
                  },
                  children: isWinMcp ? "Windows 本机运行" : "本地进程 (stdio)"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                Pill,
                {
                  active: transport === "streamable-http",
                  onClick: () => {
                    setTransport("streamable-http");
                    commitSave({ transport: "streamable-http" });
                    setExpanded(true);
                  },
                  children: isWinMcp ? "远程 Windows 电脑" : "远程节点 (HTTP)"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-meta-item", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-meta-label", children: transport === "stdio" ? "启动指令：" : "远程地址：" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("code", { className: "dt-code", children: transport === "stdio" ? quickCli : url || "http://127.0.0.1:8000/mcp" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: handleCopyCli,
                children: copiedCmd ? "已复制" : "复制命令"
              }
            )
          ] })
        ] }),
        toolItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-tools-wrap", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-meta-label", children: "已安装动作：" }),
          toolItems.map((toolName) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "span",
            {
              className: "dt-mcp-tool-chip",
              children: WIN_MCP_TOOL_LABELS[toolName] || toolName
            },
            toolName
          ))
        ] }),
        notice && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: notice.tone === "error" ? "dt-error" : "dt-hint", children: notice.text }),
        expanded && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-drawer", children: [
          transport === "stdio" ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field-grid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "服务名称" }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                Input,
                {
                  value: name,
                  placeholder: "Windows-MCP 桌面控制",
                  onChange: (e) => {
                    setName(e.target.value);
                    setDirty(true);
                  }
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "启动程序 (Command)" }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                Input,
                {
                  mono: true,
                  value: command,
                  placeholder: "uvx / npx / node",
                  onChange: (e) => {
                    setCommand(e.target.value);
                    setDirty(true);
                  }
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "启动参数 (Args)" }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                Input,
                {
                  mono: true,
                  value: argsText,
                  placeholder: "windows-mcp",
                  onChange: (e) => {
                    setArgsText(e.target.value);
                    setDirty(true);
                  }
                }
              )
            ] })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: "dt-label", children: "远程 Windows 电脑地址 (HTTP Endpoint)" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Input,
              {
                mono: true,
                value: url,
                placeholder: "http://192.168.1.100:8000/mcp",
                onChange: (e) => {
                  setUrl(e.target.value);
                  setDirty(true);
                }
              }
            ),
            isWinMcp && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "dt-hint", children: [
              "在目标 Windows 电脑运行：",
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("code", { className: "dt-code", children: quickCli })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-choice-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Button,
              {
                variant: dirty ? "primary" : "outline",
                size: "sm",
                disabled: isBusy,
                onClick: () => commitSave(),
                children: dirty ? "保存修改 *" : "保存参数"
              }
            ),
            !server.builtin && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Button,
              {
                variant: "ghost",
                size: "sm",
                disabled: isBusy,
                onClick: () => onDelete(server.id),
                children: "移除此服务"
              }
            )
          ] })
        ] })
      ]
    }
  );
}

function McpDefaultSettingsPanel({ embedded = false }) {
  const [policy, setPolicy] = (0, import_react12.useState)({
    defaultGuiEngine: "windows-mcp",
    autoFallbackPwshUia: true,
    preferNativeSandboxShell: true,
    visionSetOfMarks: true
  });
  const [servers, setServers] = (0, import_react12.useState)([]);
  const [templates, setTemplates] = (0, import_react12.useState)([]);
  const [skillMarkdown, setSkillMarkdown] = (0, import_react12.useState)("");
  const [loading, setLoading] = (0, import_react12.useState)(true);
  const [busyId, setBusyId] = (0, import_react12.useState)("");
  const [notices, setNotices] = (0, import_react12.useState)({});
  const [skillOpen, setSkillOpen] = (0, import_react12.useState)(false);

  const setCardNotice = (id, text, tone = "info") => {
    setNotices((prev) => ({ ...prev, [id]: { text, tone } }));
  };

  const applyPayload = (data) => {
    if (!data || typeof data !== "object") return;
    if (data.policy) setPolicy(data.policy);
    if (Array.isArray(data.servers)) setServers(data.servers);
    if (Array.isArray(data.templates)) setTemplates(data.templates);
    if (typeof data.skillMarkdown === "string") setSkillMarkdown(data.skillMarkdown);
  };

  const loadMcpSettings = (0, import_react12.useCallback)(async () => {
    try {
      const res = await fetch("/api/mcp-settings");
      const data = await res.json();
      applyPayload(data);
    } catch (_err) {
    } finally {
      setLoading(false);
    }
  }, []);

  (0, import_react12.useEffect)(() => {
    loadMcpSettings();
  }, [loadMcpSettings]);

  const handleUpdatePolicy = async (patch) => {
    const optimistic = { ...policy, ...patch };
    setPolicy(optimistic);
    setBusyId("policy");
    try {
      const res = await fetch("/api/mcp-settings/policy", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch)
      });
      const data = await res.json();
      applyPayload(data);
      setCardNotice("policy", "桌面控制设置已保存。");
    } catch (_err) {
      setCardNotice("policy", "保存失败，请稍后重试", "error");
    } finally {
      setBusyId("");
    }
  };

  const handleSaveServer = async (id, patch) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/mcp-settings/servers/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch)
      });
      const data = await res.json();
      applyPayload(data);
      setCardNotice(id, "配置已保存。");
    } catch (_err) {
      setCardNotice(id, "保存失败", "error");
    } finally {
      setBusyId("");
    }
  };

  const handleProbeServer = async (id) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/mcp-settings/servers/${encodeURIComponent(id)}/probe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      const data = await res.json();
      applyPayload(data);
      if (data?.server?.status?.detail) {
        setCardNotice(id, data.server.status.detail, data.server.status.state === "error" ? "error" : "info");
      }
    } catch (_err) {
      setCardNotice(id, "连接检测失败", "error");
    } finally {
      setBusyId("");
    }
  };

  const handleAddFromTemplate = async (templateId) => {
    const tpl = templates.find((item) => item.templateId === templateId);
    setBusyId(`add-${templateId}`);
    try {
      const suffix = servers.length + 1;
      const payload = tpl ? {
        id: `${templateId.replace(/[^a-z0-9]/gi, "_")}_${suffix}`,
        name: `${tpl.title?.zh || templateId} #${suffix}`,
        templateId: tpl.templateId,
        badge: tpl.badge,
        summary: tpl.summary?.zh || "",
        transport: tpl.defaultTransport,
        command: tpl.defaultCommand,
        args: tpl.defaultArgs,
        env: tpl.defaultEnv,
        url: tpl.defaultUrl,
        exposedTools: tpl.exposedTools,
        enabled: true
      } : {
        name: `自定义 MCP 服务 #${suffix}`,
        templateId: "custom-stdio",
        transport: "stdio",
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-everything"],
        enabled: true
      };
      const res = await fetch("/api/mcp-settings/servers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      applyPayload(data);
      if (data?.server?.id) {
        setCardNotice(data.server.id, `已添加「${data.server.name}」，请填写连接参数并保存。`);
      }
    } finally {
      setBusyId("");
    }
  };

  const handleDeleteServer = async (id) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/mcp-settings/servers/${encodeURIComponent(id)}`, {
        method: "DELETE"
      });
      const data = await res.json();
      applyPayload(data);
    } finally {
      setBusyId("");
    }
  };

  const enabledCount = servers.filter((s) => s.enabled).length;

  const body = /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-form dt-mcp-layout", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("style", { children: client_default }),
    embedded && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-intro", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-intro-text", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h2", { className: "dt-block-title", children: "MCP 服务与桌面控制" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "p",
          {
            className: "dt-hint",
            children: "查看已内置安装的 MCP 工具服务，或切换 Windows 桌面自动化控制方式。"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "dt-mcp-status-caption", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(StateDot, { state: enabledCount > 0 ? "done" : "idle" }),
        "已安装 ",
        servers.length || 1,
        " 项 · 已启用 ",
        enabledCount || 1,
        " 项"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-zone", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-zone-bar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-zone-title-wrap", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-step-num", children: "已安装" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { className: "dt-mcp-zone-title", children: "当前已安装的 MCP 服务" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-add-bar", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "outline",
              size: "sm",
              disabled: Boolean(busyId),
              onClick: () => handleAddFromTemplate("playwright-mcp"),
              children: "+ Playwright 浏览器"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "outline",
              size: "sm",
              disabled: Boolean(busyId),
              onClick: () => handleAddFromTemplate("custom-stdio"),
              children: "+ 本地 MCP"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Button,
            {
              variant: "outline",
              size: "sm",
              disabled: Boolean(busyId),
              onClick: () => handleAddFromTemplate("custom-http"),
              children: "+ 远程 MCP"
            }
          )
        ] })
      ] }),
      loading ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "dt-hint", children: "正在加载已安装服务…" }) : servers.map((srv) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        McpServerCard,
        {
          server: srv,
          policy,
          busyId,
          notice: notices[srv.id],
          onSave: handleSaveServer,
          onProbe: handleProbeServer,
          onDelete: handleDeleteServer
        },
        srv.id
      ))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-zone", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-zone-bar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-zone-title-wrap", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-step-num", children: "模式与说明" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { className: "dt-mcp-zone-title", children: "桌面操控方案与安全保护" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-zone-sub", children: "点击卡片即可切换首选操控引擎" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-mode-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
          "button",
          {
            type: "button",
            className: "dt-mcp-mode-card",
            "data-active": String(policy.defaultGuiEngine === "windows-mcp"),
            onClick: () => handleUpdatePolicy({ defaultGuiEngine: "windows-mcp" }),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-mode-head", children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "dt-mcp-mode-title-wrap", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-radio" }),
                  "Windows-MCP 桌面控制"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-badge-neutral", children: "默认推荐" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "p",
                {
                  className: "dt-mcp-mode-desc",
                  children: "调用上方已安装的 Windows-MCP 服务，支持读取窗口控件与截图定位，速度最快。"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
          "button",
          {
            type: "button",
            className: "dt-mcp-mode-card",
            "data-active": String(policy.defaultGuiEngine === "pwsh-uia"),
            onClick: () => handleUpdatePolicy({ defaultGuiEngine: "pwsh-uia" }),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-mode-head", children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "dt-mcp-mode-title-wrap", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-radio" }),
                  "PowerShell 原生无障碍"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-mcp-badge-neutral", children: "系统自带" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "p",
                {
                  className: "dt-mcp-mode-desc",
                  children: "直接通过 Windows 自带 PowerShell 调用系统 .NET 组件操控窗口，无需外部服务。"
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-mcp-policy-box", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-switch-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-row-label", children: "命令与文件走安全沙箱" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-hint", children: "命令行与文件读写强制由系统安全沙箱执行，自动屏蔽外部高危命令工具" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Switch,
            {
              checked: Boolean(policy.preferNativeSandboxShell),
              label: "命令与文件走安全沙箱",
              onChange: (val) => handleUpdatePolicy({ preferNativeSandboxShell: val })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-switch-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-row-label", children: "未连接时自动切换备用方案" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-hint", children: "当 Windows-MCP 未启动时，自动改用系统自带的 PowerShell 原生无障碍方案" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Switch,
            {
              checked: Boolean(policy.autoFallbackPwshUia),
              label: "未连接时自动切换备用方案",
              onChange: (val) => handleUpdatePolicy({ autoFallbackPwshUia: val })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-switch-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "dt-field", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-row-label", children: "复杂界面启用截图视觉定位" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dt-hint", children: "遇到游戏、画布或自绘窗口无法读取控件时，自动截图并标注编号辅助点击" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Switch,
            {
              checked: Boolean(policy.visionSetOfMarks),
              label: "复杂界面启用截图视觉定位",
              onChange: (val) => handleUpdatePolicy({ visionSetOfMarks: val })
            }
          )
        ] })
      ] }),
      notices.policy && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: notices.policy.tone === "error" ? "dt-error" : "dt-hint", children: notices.policy.text })
    ] }),
    skillMarkdown && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      DisclosureRow,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Icon, { name: "settings" }),
        title: "查看底层 Agent 执行规则 (.agents/skills/windows-desktop-gui/SKILL.md)",
        open: skillOpen,
        onToggle: () => setSkillOpen(!skillOpen),
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "dt-disclosure-body", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("pre", { className: "dt-pre", children: skillMarkdown }) })
      }
    )
  ] });

  return embedded ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "dt-embedded", children: body }) : body;
}

function McpNavIcon({ size = 16 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("rect", { x: "2", y: "2.5", width: "12", height: "8.5", rx: "1.8" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M5.5 13.5h5" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M8 11v2.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("circle", { cx: "5.5", cy: "6.75", r: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("circle", { cx: "10.5", cy: "6.75", r: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M6.5 6.75h3" })
      ]
    }
  );
}

var STAGE_GROUPS = ["source", "eval", "execution"];
function McpServicesBreadcrumb({ group, navigate }) {
  const [servers, setServers] = (0, import_react13.useState)(null);
  const [focusedId, setFocusedId] = (0, import_react13.useState)(
    () => globalThis.__dshFocusedMcpServerId || "windows_mcp"
  );
  (0, import_react13.useEffect)(() => {
    let alive = true;
    const loadServers = () => {
      fetch("/api/mcp-settings").then((r) => r.ok ? r.json() : null).then((d) => {
        if (alive && d && Array.isArray(d.servers)) setServers(d.servers);
      }).catch(() => {});
    };
    loadServers();
    const onFocusServer = (e) => {
      if (e?.detail?.serverId) setFocusedId(e.detail.serverId);
    };
    window.addEventListener("dsh-mcp-focus-server", onFocusServer);
    return () => {
      alive = false;
      window.removeEventListener("dsh-mcp-focus-server", onFocusServer);
    };
  }, []);
  if (!servers || servers.length === 0) return null;
  const handleSelectServer = (serverId) => {
    const targetId = serverId || "windows_mcp";
    globalThis.__dshFocusedMcpServerId = targetId;
    setFocusedId(targetId);
    if (typeof navigate === "function") {
      navigate(settingsRoute("mcp"), true);
    }
    const dispatchFocus = () => {
      try {
        window.dispatchEvent(
          new CustomEvent("dsh-mcp-focus-server", { detail: { serverId: targetId } })
        );
      } catch (_e) {}
    };
    dispatchFocus();
    requestAnimationFrame(() => {
      dispatchFocus();
      setTimeout(dispatchFocus, 60);
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "div",
    {
      className: "dt-settings-mcp-crumbs",
      children: servers.map((s, i) => {
        const srvId = s.id || "windows_mcp";
        const isActive = group === "mcp" && focusedId === srvId;
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
          "button",
          {
            type: "button",
            className: "dt-settings-mcp-crumb",
            "data-server-id": srvId,
            "data-active": isActive ? "true" : void 0,
            "data-state": s.status && s.status.state || "standby",
            title: [s.name, s.badge, s.status && s.status.detail, "点击展开服务配置"].filter(Boolean).join(" · ") || void 0,
            onClick: () => handleSelectServer(srvId),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("i", { className: "dt-settings-mcp-dot" }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "dt-settings-mcp-crumb-text", children: s.name })
            ]
          },
          srvId + ":" + i
        );
      })
    }
  );
}
function SettingsPage({ group, query, state, deploymentForm }) {
  const { t, navigate } = usePanel();
  const content = (() => {
    switch (group) {
      case "source":
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SettingsProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SourceSettings, { ...query.source ? { focus: query.source } : {} }) });
      case "mcp":
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(McpDefaultSettingsPanel, { embedded: false });
      case "eval":
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SettingsProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(EvalSettings, { version: query.version }) });
      case "execution":
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SettingsProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ExecutionSettings, {}) });
      case "prompts":
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(PromptsPage, {});
      case "deployment":
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(DeploymentPage, { setup: state.setup, form: deploymentForm });
    }
  })();
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "dt-settings", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("nav", { className: "dt-settings-nav", "aria-label": t("tab.settings"), children: [SETTINGS_GROUPS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "button",
      {
        type: "button",
        className: "dt-settings-link",
        "data-stage": STAGE_GROUPS.includes(value) || void 0,
        "aria-current": value === group ? "page" : void 0,
        onClick: () => navigate(
          settingsRoute(value),
          true
        ),
        children: t(`settingsGroup.${value}`)
      },
      value
    )), /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(McpServicesBreadcrumb, { group, navigate }) ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "dt-settings-body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { className: "dt-settings-title", children: t(`settingsGroup.${group}`) }),
      content
    ] })
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/client/thread.tsx
var import_react13 = require("react");
var import_jsx_runtime14 = require("react/jsx-runtime");
function triggerTags(t, trigger, subscribed) {
  const d = trigger.disposition;
  const tags = [];
  if (d.queued) tags.push(/* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Tag, { tone: "info", children: t("dispositionQueued") }, "q"));
  else if (d.evaluating) tags.push(/* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Tag, { tone: "info", children: t("dispositionEvaluating") }, "e"));
  else if (d.filtered) tags.push(/* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Tag, { tone: "neutral", children: t("tagFiltered", { reason: reasonLabel(t, d.filtered) }) }, "f"));
  else if (d.decision && d.decision.outcome !== "ignore") {
    const { tone, label: label2 } = decisionMark(t, d.decision.outcome);
    tags.push(/* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Tag, { tone, children: label2 }, "d"));
  }
  if (d.delivered) tags.push(/* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Tag, { tone: "info", title: t("dispositionDeliveredHint"), children: t("dispositionDelivered") }, "o"));
  else if (d.fanout.length && !(subscribed && d.fanout.every((id) => subscribed.has(id)))) tags.push(/* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    Tag,
    {
      tone: "info",
      children: t("dispositionFanout", { count: d.fanout.length })
    },
    "o"
  ));
  return tags;
}
function TriggerItem({ trigger, earlier, target, subscribed, requeue }) {
  const { t, navigate } = usePanel();
  const ticketId = trigger.disposition.decision?.ticketId;
  const scroll = (element) => {
    if (element && target === trigger.id && !element.dataset.scrolled) {
      element.dataset.scrolled = "1";
      element.scrollIntoView?.({ block: "center" });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("li", { id: `trigger-${trigger.id}`, className: `dt-event${target === trigger.id ? " dt-highlight" : ""}${trigger.human ? "" : " dt-event-quiet"}`, ref: scroll, children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "dt-event-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("strong", { className: "dt-event-actor", children: actorName(t, trigger.actor) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        When,
        {
          at: trigger.at
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ClampText, { text: readableMarkers(t, trigger.text || trigger.preview) }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Earlier, { items: earlier }),
    trigger.disposition.handbacks.map((item) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Hint, { children: t("handedBack", {
      ticket: item.title,
      reason: item.reason
    }) }, item.ticketId)),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "dt-event-foot", children: [
      triggerTags(t, trigger, subscribed),
      ticketId && !subscribed.has(ticketId) && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        "button",
        {
          type: "button",
          className: "dt-textlink dt-icon-link",
          onClick: () => navigate({ page: "execution", id: ticketId }),
          children: t("openTicket")
        }
      ),
      requeue && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
        "button",
        {
          type: "button",
          className: "dt-textlink dt-icon-link dt-reveal",
          disabled: requeue.busy,
          "aria-busy": requeue.busy,
          onClick: requeue.run,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "refresh", size: 13 }),
            t("requeue")
          ]
        }
      )
    ] })
  ] });
}
var overlaps = (some, others) => some.some((item) => others.some((other) => other.id === item.id));
var byTime = (triggers) => [...new Map(triggers.map((item) => [item.id, item])).values()].sort((a, b) => a.at.localeCompare(b.at));
var gapBetween = (newest, older) => !!older && newest.earlier !== null && !overlaps(newest.timeline, older.triggers);
function mergeTimeline(newest, older) {
  if (!older || newest.earlier === null || gapBetween(newest, older)) return newest;
  return { ...newest, timeline: byTime([...older.triggers, ...newest.timeline]), earlier: older.cursor };
}
var PAGE = 50;
function useThreadTimeline(key, target) {
  const { call, notify } = usePanel();
  const [older, setOlder] = (0, import_react13.useState)();
  const { data: newest, error, reload } = usePoll(() => call("GET threads/:key", { key, query: { limit: PAGE } }), [key]);
  const data = newest && mergeTimeline(newest, older);
  const read2 = (id) => !!newest?.timeline.some((item) => item.id === id) || !!older?.triggers.some((item) => item.id === id);
  const missing = !!target && !!newest && !read2(target);
  (0, import_react13.useEffect)(() => {
    if (!missing) return;
    let active = true;
    call("GET threads/:key", { key, query: { limit: PAGE, around: target } }).then((page) => {
      if (active) setOlder({ triggers: page.timeline, cursor: page.earlier });
    }, (failure) => {
      if (active) notify(errorText(failure));
    });
    return () => {
      active = false;
    };
  }, [missing, call, key, target, notify]);
  const gap = !!newest && gapBetween(newest, older);
  (0, import_react13.useEffect)(() => {
    if (!gap || !newest || !older) return;
    let active = true;
    const fill2 = async () => {
      let run = newest.timeline, cursor = newest.earlier;
      while (cursor !== null && !overlaps(run, older.triggers)) {
        const page = await call("GET threads/:key", { key, query: { limit: PAGE, before: cursor } });
        run = [...page.timeline, ...run];
        cursor = page.earlier;
      }
      if (active) setOlder({ triggers: byTime([...older.triggers, ...run]), cursor: overlaps(run, older.triggers) ? older.cursor : cursor });
    };
    fill2().catch((failure) => {
      if (active) notify(errorText(failure));
    });
    return () => {
      active = false;
    };
  }, [gap, newest, older, call, key, notify]);
  const earlier = useAction(async (shown) => {
    const page = await call("GET threads/:key", { key, query: { limit: PAGE, before: shown.earlier } });
    setOlder({ triggers: [...page.timeline, ...shown.timeline], cursor: page.earlier });
  });
  return { data, error, reload, earlier };
}
function ThreadPage({ id, target }) {
  const { t, call, navigate, notify } = usePanel();
  const [decisionsOpen, setDecisionsOpen] = (0, import_react13.useState)(false);
  const { data, error, reload, earlier } = useThreadTimeline(id, target);
  const requeue = useAction(async (trigger) => {
    const result = await call("POST triggers/:id/requeue", { id: trigger });
    if (!result.queued) notify(t("requeueAlready"));
  }, { reload });
  if (!data) return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      PageHead,
      {
        title: t("term.thread")
      }
    ),
    error instanceof ApiError && error.missing ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Hint, { children: t("threadNotFound") }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      LoadState,
      {
        error,
        loading: true
      }
    )
  ] });
  const subscribed = new Set(data.tickets.map((ticket) => ticket.id));
  const sender = (trigger) => !trigger.human && trigger.id !== target ? `${trigger.actor.source}:${trigger.actor.id}` : void 0;
  const unsubscribe = async () => {
    const result = await call("POST threads/:key/unsubscribe", { key: data.key });
    if (result.context_delivery === "pending") notify(t("unsubscribePending"));
    await reload();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(PageHead, { title: readableMarkers(t, data.title), children: data.url && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ActionLink, { href: data.url, children: t("openOriginal") }) }),
    error && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(LoadState, { error, loading: false }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "dt-row-meta dt-status-line", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: valueLabel(t, "source", data.source) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: t(
        "threadLatest",
        { time: when(data.lastAt, t("lang")) }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: t("threadCreated", { time: when(data.createdAt, t("lang")) }) })
    ] }),
    data.evaluating && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "dt-banner", children: t("evaluatingBanner", {
      count: data.evaluating.triggers,
      strength: valueLabel(t, "strength", data.evaluating.strength),
      deadline: when(data.evaluating.deadline, t("lang"))
    }) }),
    data.pollError && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "dt-error dt-clamp", children: t("pollFailed", { error: data.pollError }) }),
    data.tickets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Section, { title: t("subscribedTickets"), count: data.tickets.length, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("ul", { className: "dt-list", children: data.tickets.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      TicketLine,
      {
        ticket,
        context: data.context.includes(ticket.id)
      },
      ticket.id
    )) }) }),
    data.decisions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      DisclosureRow,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "decision" }),
        title: t(
          "threadDecisions",
          { count: data.decisions.length }
        ),
        open: decisionsOpen,
        onToggle: () => setDecisionsOpen(!decisionsOpen),
        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "dt-disclosure-body", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("ul", { className: "dt-list", children: data.decisions.map((decision) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          DecisionLine,
          {
            decision
          },
          decision.id
        )) }) })
      }
    ),
    data.correlated.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Section, { title: t("term.correlation"), children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("ul", { className: "dt-plain-list", children: data.correlated.map((item) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { type: "button", className: "dt-textlink", onClick: () => navigate({ page: "trigger", id: item.key }), children: readableMarkers(
      t,
      item.title
    ) }) }, item.key)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(Section, { title: t("timeline"), count: t("newestFirst"), children: [
      data.timeline.length ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("ol", { className: "dt-timeline", children: automatedRuns(data.timeline.slice().reverse(), sender).map(({
        item,
        earlier: folded
      }) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        TriggerItem,
        {
          trigger: item,
          earlier: folded,
          target,
          subscribed,
          requeue: item.actions.requeue ? { busy: requeue.busy, run: () => {
            void requeue.run(item.id);
          } } : void 0
        },
        item.id
      )) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Hint, { children: t("noTriggers") }),
      data.earlier && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Button, { variant: "outline", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        Icon,
        {
          name: "chevron-down",
          size: 14
        }
      ), disabled: earlier.busy, onClick: () => {
        void earlier.run(data);
      }, children: t("loadEarlier") }) })
    ] }),
    data.tickets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "dt-danger-zone", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "dt-hint", children: t("unsubscribeHint") }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        ConfirmButton,
        {
          variant: "outline",
          icon: "unsubscribe",
          label: t("unsubscribe"),
          title: t("unsubscribeTitle"),
          message: t("unsubscribeConfirm", { title: data.title }),
          onConfirm: unsubscribe
        }
      )
    ] })
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/client/ticket.tsx
var import_react14 = require("react");
var import_jsx_runtime15 = require("react/jsx-runtime");
function InputLine({ input, earlier = [] }) {
  const { t, navigate } = usePanel();
  const trigger = input.kind === "trigger" ? input.trigger : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("li", { className: "dt-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Dot, { state: input.delivered ? "idle" : "warning", label: input.delivered ? t("inputDelivered") : t("inputUndelivered") }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dt-row-main", children: [
      trigger ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dt-row-title", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("button", { type: "button", className: "dt-open", onClick: () => navigate({
        page: "trigger",
        id: trigger.thread,
        query: { trigger: trigger.id }
      }), children: [
        actorName(t, trigger.actor),
        t("labelSeparator"),
        readableMarkers(t, trigger.preview) || t("empty")
      ] }) }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dt-row-title", children: valueLabel(t, "input", input.kind) }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dt-row-meta", children: [
        input.kind === "trigger" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: valueLabel(t, "input", input.kind) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          When,
          {
            at: input.at
          }
        )
      ] }),
      (input.kind === "text" || input.kind === "note") && input.text && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dt-row-quote", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(MarkdownLite, { text: input.text }) }),
      trigger?.handback && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Hint, { children: t("inputHandedBack", { reason: trigger.handback.reason }) }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Earlier, { items: earlier })
    ] })
  ] });
}
function InputList({ inputs }) {
  const sender = (input) => input.kind === "trigger" && input.trigger && !input.trigger.human ? `${input.trigger.actor.source}:${input.trigger.actor.id}` : void 0;
  const shown = (input) => ({ id: input.id, at: input.at, preview: input.kind === "trigger" ? input.trigger?.preview ?? "" : "" });
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { className: "dt-list", children: automatedRuns(inputs, sender).map((run) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    InputLine,
    {
      input: run.item,
      earlier: run.earlier.map(shown)
    },
    run.item.id
  )) });
}
function Details({ icon, title, open = false, children }) {
  const [shown, setShown] = (0, import_react14.useState)(open);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(DisclosureRow, { icon: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Icon, { name: icon }), title, open: shown, onToggle: () => setShown(!shown), children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dt-disclosure-body", children }) });
}
function Assignments({ ticket }) {
  const { t } = usePanel();
  const report = (state) => t("assignmentReportShort", { state: valueLabel(t, "report", state) });
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { className: "dt-list", children: ticket.assignments.slice().reverse().map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("li", { className: "dt-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Dot, { state: item.state === "running" ? reportDot(item.report?.state) : "idle", label: valueLabel(t, "assignment", item.state) }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dt-row-main", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dt-row-title", children: t("assignmentNumber", { number: ticket.assignments.length - index }) }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dt-row-meta", children: [
        item.turnEndedAt && item.report ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Tag, { tone: "neutral", children: report(item.report.state) }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Tag, { tone: item.state === "running" ? "info" : "neutral", children: valueLabel(t, "assignment", item.state) }),
        item.state !== "running" && item.report && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: report(item.report.state) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: t("assignmentSpan", { from: when(item.startedAt ?? item.createdAt, t("lang")), to: when(
          item.endedAt ?? item.turnEndedAt,
          t("lang")
        ) || t("now") }) }),
        item.endedReason && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: reasonLabel(t, item.endedReason) })
      ] })
    ] }),
    item.ref && item.ref !== ticket.sessionId && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dt-row-actions", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      SessionButton,
      {
        variant: "outline",
        sessionId: item.ref
      }
    ) })
  ] }, item.id)) });
}
function MandateDetails({ ticket, actor }) {
  const { t, navigate } = usePanel();
  const { mandate, decision } = ticket;
  const fact = (item) => {
    if (item.name === "legacyAuthority") return valueLabel(t, "legacy", item.value);
    if (item.name === "mode" || item.name === "addressed") return valueLabel(t, item.name, item.value);
    if (item.name === "admission") return valueLabel(t, "admissionCell", item.value);
    if (item.name === "rules") return item.value.map((rule) => rule.name).join(t("listSeparator"));
    return item.name === "sender" ? item.value : t("yes");
  };
  const { legacy } = ticket.basis;
  const facts = ticket.basis.facts.filter((item) => !(item.name === "sender" && item.value === actor));
  const direction = decision?.direction;
  const rows = decision ? [
    [t("term.trigger"), /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("button", { type: "button", className: "dt-trigger-link", onClick: () => navigate({
      page: "trigger",
      id: decision.thread,
      query: { trigger: decision.triggerIds[0] ?? "" }
    }), children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "dt-trigger-text", children: readableMarkers(t, decision.preview) || t("empty") }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { className: "dt-row-meta", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { children: [
          valueLabel(t, "source", mandate.actor.source),
          " \xB7 ",
          actor
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(When, { at: decision.at })
      ] })
    ] })],
    [t("term.decision"), /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dt-kv-stack", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: decisionMark(t, decision.outcome).label }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Hint, { children: reasonLabel(t, decision.reason) }),
      decision.rules.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Hint, { children: t(rule.matched ? "ruleMatched" : "ruleUnmatched", {
        rule: rule.name,
        reason: rule.reason
      }) }, rule.id)),
      direction && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(Hint, { children: [
        t("directionLine", {
          intent: t(direction.implementation_requested ? "intentYes" : "intentNo"),
          basis: valueLabel(t, "targetBasis", direction.target_basis),
          design: t(direction.requires_design_decision ? "designNeeded" : "designNotNeeded")
        }),
        " ",
        t(
          "directionEvidence",
          { evidence: direction.evidence }
        )
      ] })
    ] })]
  ] : [];
  const version = /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { type: "button", className: "dt-textlink dt-mono", onClick: () => navigate(settingsRoute(
    "eval",
    { version: mandate.policyVersion }
  )), children: mandate.policyVersion.slice(0, 8) });
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Section, { title: t("mandateDetails"), icon: "shield", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(KeyValues, { rows: [
    ...rows,
    [t("term.scope"), legacy ? t("legacyScopeShort") : mandate.scope || t("empty")],
    ...facts.map((item) => [valueLabel(t, "basis", item.name), fact(item)]),
    ...legacy ? [] : [[t("policyVersion"), version]]
  ] }) });
}
function TicketPage({ id }) {
  const { t, call } = usePanel();
  const { data, error, reload } = usePoll(() => call("GET tickets/:id", { id }), [id]);
  const after = async (request) => {
    await request;
    await reload();
  };
  if (!data) return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      PageHead,
      {
        title: t("term.ticket")
      }
    ),
    error instanceof ApiError && error.missing ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Hint, { children: t("ticketNotFound") }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      LoadState,
      {
        error,
        loading: true
      }
    )
  ] });
  const status = ticketMark(t, data);
  const actor = actorName(t, data.mandate.actor);
  const { legacy } = data.basis;
  const undelivered = data.inputs.filter((input) => !input.delivered);
  const failedText = /^(?:\w+Error|Error)\b[:：]/.test(data.summary);
  const failed = data.stage === "person" && data.action === "failed";
  const opening = data.threads.find((thread) => thread.url);
  const ended = data.ended && (() => {
    const outcome = valueLabel(t, "outcome", data.ended.outcome), reason = reasonLabel(t, data.ended.reason), time = when(
      data.ended.at,
      t("lang")
    );
    return reason ? t("endedAt", { time, outcome, reason }) : t("endedAtShort", { time, outcome });
  })();
  const channel = data.channels[0];
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(PageHead, { title: data.title, children: [
      opening?.url && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ActionLink, { href: opening.url, children: t("openThread", { source: valueLabel(t, "source", opening.source) }) }),
      data.actions.retry && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        ConfirmButton,
        {
          variant: "outline",
          icon: "refresh",
          label: t("retry"),
          title: t("retryTitle"),
          message: t("retryConfirm", { title: data.title }),
          onConfirm: () => after(call("POST tickets/:id/retry", { id }))
        }
      ),
      data.sessionId && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SessionButton, { variant: "outline", sessionId: data.sessionId })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(LoadState, { error, loading: false }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dt-row-meta dt-status-line", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(StageMark, { state: status.dot, icon: status.icon, label: status.label }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(LabelValue, { label: t("ticketMandateLabel"), value: valueLabel(t, "strength", data.mandate.strength) }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(LabelValue, { label: t("ticketActorLabel"), value: `${valueLabel(t, "source", data.mandate.actor.source)} \xB7 ${actor}` }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(LabelValue, { label: t("ticketUpdatedLabel"), value: when(data.updatedAt, t("lang")) })
    ] }),
    ended && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Hint, { children: ended }),
    data.attention && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dt-banner", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "dt-banner-label", children: t("attentionPrefix") }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        MarkdownLite,
        {
          text: data.attention.question
        }
      ),
      channel && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dt-banner-actions", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ActionLink, { href: channel.url, icon: "message", children: t("answerIn", { source: valueLabel(t, "source", channel.source) }) }) })
    ] }),
    data.actions.retry && data.summary && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { className: `dt-banner${failed ? " dt-danger" : ""}${failedText ? " dt-mono" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "dt-banner-label", children: t(failed ? "failedPrefix" : "blockedPrefix") }),
      data.summary
    ] }),
    data.deliveryError && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { className: "dt-banner dt-danger dt-mono", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "dt-banner-label", children: t("deliveryFailedPrefix") }),
      data.deliveryError
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(MandateDetails, { ticket: data, actor }),
    undelivered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(Section, { title: t("undeliveredInputs"), count: undelivered.length, children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Hint, { children: data.deliveryError ? t("inputRetryHint") : data.paused ? t("inputPausedHint") : t("inputWaitingHint") }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(InputList, { inputs: undelivered })
    ] }),
    data.threads.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Section, { title: t("subscribedThreads"), count: data.threads.length, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { className: "dt-list", children: data.threads.map((thread) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      ThreadLine,
      {
        thread,
        ticketId: data.id,
        context: thread.context
      },
      thread.key
    )) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dt-details", children: [
      data.assignments.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Details, { icon: "queue", title: `${t("term.assignment")} \xB7 ${data.assignments.length}`, open: true, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        Assignments,
        {
          ticket: data
        }
      ) }),
      data.environment.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Details, { icon: "settings", title: t("term.environment"), children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("table", { className: "dt-table", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("tbody", { children: data.environment.map((variable) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("tr", { title: localized(
        t,
        variable.description
      ), children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("td", { className: "dt-mono", children: variable.key }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("td", { className: "dt-mono", children: variable.value || /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "span",
          {
            className: "dt-hint",
            children: t("empty")
          }
        ) })
      ] }, variable.key)) }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Details, { icon: "message", title: t("term.channel"), children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { className: "dt-plain-list", children: data.channels.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ExternalLink, { href: item.url, icon: item.source === "github" ? "pull" : "message", children: localized(t, item.label) }) }, index)) }) }),
      data.inputs.length > undelivered.length && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Details, { icon: "inbox", title: t(
        "deliveredInputs",
        { count: data.inputs.length - undelivered.length }
      ), children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(InputList, { inputs: data.inputs.filter((input) => input.delivered) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Details, { icon: "hash", title: t("identifiers"), children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(KeyValues, { rows: [
        [t("ticketId"), /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "dt-mono", children: data.id })],
        [t("executionDirectory"), /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "span",
          {
            className: "dt-mono",
            children: data.directory ?? t("empty")
          }
        )],
        ...legacy && data.mandate.scope ? [[t("legacyAssignment"), /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "span",
          {
            className: "dt-mono dt-clamp",
            children: data.mandate.scope
          }
        )]] : []
      ] }) })
    ] }),
    data.actions.stop && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dt-danger-zone", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "dt-hint", children: t("stopHint") }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        ConfirmButton,
        {
          variant: "outline",
          label: t("stop"),
          title: t("stopConfirmTitle"),
          message: t("stopConfirm", { title: data.title }),
          onConfirm: () => after(call("POST tickets/:id/stop", { id }))
        }
      )
    ] })
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/client/trigger.tsx
var import_react15 = require("react");
var import_jsx_runtime16 = require("react/jsx-runtime");
function TriggerStatus({ filter }) {
  const { t, call, navigate } = usePanel();
  const [limit, setLimit] = (0, import_react15.useState)(20);
  const { data, error } = usePoll(() => call("GET threads", { query: { filter, limit } }), [filter, limit]);
  const go = (next) => {
    setLimit(20);
    navigate(
      { page: "trigger", query: next !== "subscribed" ? { filter: next } : {} },
      true
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_jsx_runtime16.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(StatusHead, { hint: t("triggerIntro") }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "dt-filters", children: THREAD_FILTERS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      Pill,
      {
        active: filter === value,
        onClick: () => go(value),
        children: t(`threadFilter.${value}`)
      },
      value
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(LoadState, { error, loading: !data }),
    data && (data.items.length ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("ul", { className: "dt-list", children: data.items.map((thread) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(ThreadLine, { thread }, thread.key)) }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Hint, { children: t("threadsNone") })),
    data?.next_offset != null && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(LoadMore, { onMore: () => setLimit(limit + 20) })
  ] });
}

// ../../tmp/dsh-superagent-prototype/src/client/app.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function Glossary({ open, onClose }) {
  const { t } = usePanel();
  const chinese = t("tab.overview") === zh["tab.overview"];
  const [own, other] = chinese ? [zh, en] : [en, zh];
  const heading = (group) => t(group === "roles" ? "glossaryGroup.roles" : `tab.${group}`);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    Modal,
    {
      className: "dt-glossary-modal",
      open,
      onClose,
      title: t("glossary"),
      closeLabel: t("close"),
      description: t("glossaryIntro"),
      footer: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Button, { variant: "primary", onClick: onClose, children: t("close") }),
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "dt-glossary-body", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("table", { className: "dt-glossary", children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("th", { children: t(chinese ? "glossaryChinese" : "glossaryEnglish") }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("th", { children: t(chinese ? "glossaryEnglish" : "glossaryChinese") }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("th", { children: t("glossaryMeaning") })
          ] }) }),
          Object.entries(GLOSSARY).map(([group, keys]) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("tbody", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("th", { colSpan: 3, scope: "rowgroup", className: "dt-glossary-group", children: heading(group) }) }),
            keys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("td", { children: own[`term.${key}`] }),
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("td", { children: other[`term.${key}`] }),
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("td", { children: own[`meaning.${key}`] })
            ] }, key))
          ] }, group))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "dt-legend-title", children: t("legendTitle") }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ul", { className: "dt-legend", children: ["done", "ongoing", "warning", "error", "idle"].map((state) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Dot, { state }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: t(`legend.${state}`) })
        ] }, state)) }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("dl", { className: "dt-values", children: Object.entries(GLOSSARY_VALUES).map(([group, values]) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { display: "contents" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("dt", { children: own[`term.${group}`] }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("dd", { children: values.map((key) => `${own[key]} ${other[key]}`).join(" \xB7 ") })
        ] }, group)) })
      ] })
    }
  );
}
function Highlight({ text: text2, query }) {
  const index = query ? text2.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (index < 0) return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_jsx_runtime17.Fragment, { children: text2 });
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
    text2.slice(0, index),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("mark", { className: "dt-mark", children: text2.slice(index, index + query.length) }),
    text2.slice(index + query.length)
  ] });
}
function Result({ name, open, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("li", { className: "dt-row dt-link", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "dt-row-main", children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "dt-row-title", children: open ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("button", { type: "button", className: "dt-open", onClick: open, children: name }) : name }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "dt-row-meta", children })
  ] }) });
}
function SearchResults({ result, query, onClose }) {
  const { t, navigate } = usePanel();
  const { setup } = usePanelData();
  const empty = !result.items.length && !result.threads.length && !result.tickets.length;
  const counts = { tickets: result.tickets.length, threads: result.threads.length, items: result.items.length };
  const go = (route) => () => {
    onClose();
    navigate(route);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "dt-search-results", role: "region", "aria-label": t("searchLabel"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "dt-search-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dt-hint", children: empty ? t(setup?.accounts?.feishu ? "searchNone" : "searchNoneGithub") : t(result.items.length >= 20 ? "searchFoundCapped" : "searchFound", counts) }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Button, { variant: "ghost", size: "sm", icon: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Icon, { name: "close", size: 14 }), "aria-label": t("close"), onClick: onClose })
    ] }),
    !empty && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("ul", { className: "dt-list", children: [
      result.tickets.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
        Result,
        {
          name: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Highlight, { text: ticket.title, query }),
          open: go({ page: "execution", id: ticket.id }),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: t("term.ticket") }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: ticket.stage === "ended" ? t("ticket.ended") : ticketMark(t, ticket).label })
          ]
        },
        ticket.id
      )),
      result.threads.map((thread) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Result, { name: readableMarkers(t, thread.title), open: go({
        page: "trigger",
        id: thread.key
      }), children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: t("term.thread") }) }, thread.key)),
      result.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
        Result,
        {
          name: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
            Highlight,
            {
              text: readableMarkers(t, item.preview) || t("empty"),
              query
            }
          ),
          open: item.filtered === void 0 ? go({ page: "trigger", id: item.threads[0], query: { trigger: item.id } }) : void 0,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: valueLabel(t, "source", item.source) }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: actorName(t, item.actor) }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(When, { at: item.at }),
            item.threadTitle && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dt-ellipsis", children: t("inThread", { thread: readableMarkers(t, item.threadTitle) }) }),
            item.filtered !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: t("searchFiltered", { reason: reasonLabel(t, item.filtered) }) })
          ]
        },
        item.id
      ))
    ] })
  ] });
}
function Header({ masterId }) {
  const { t, call, openSession, notify } = usePanel();
  const [glossary, setGlossary] = (0, import_react16.useState)(false);
  const [query, setQuery] = (0, import_react16.useState)("");
  const [result, setResult] = (0, import_react16.useState)();
  const latest = (0, import_react16.useRef)(0);
  const show = (value) => {
    latest.current++;
    setResult(value);
  };
  const search = (0, import_react16.useRef)(null);
  (0, import_react16.useEffect)(() => {
    if (!result) return;
    const close = (event) => {
      if (!search.current?.contains(event.target)) show();
    };
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
    };
  }, [result]);
  const submit = (event) => {
    event.preventDefault();
    const text2 = query.trim();
    if (!text2) {
      show();
      return;
    }
    const request = ++latest.current;
    call("GET search", { query: { q: text2 } }).then(
      (value) => {
        if (request === latest.current) setResult({ query: text2, value });
      },
      (failure) => {
        if (request === latest.current) notify(errorText(failure));
      }
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("header", { className: "dt-head", children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "dt-head-title", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("h1", { className: "dt-title", children: t("title") }) }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "dt-toolbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("form", { ref: search, className: "dt-search", role: "search", onSubmit: submit, onKeyDown: (event) => {
        if (event.key === "Escape") show();
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          Input,
          {
            type: "search",
            icon: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Icon, { name: "search" }),
            value: query,
            placeholder: t("searchPlaceholder"),
            "aria-label": t("searchLabel"),
            onChange: (event) => {
              setQuery(event.target.value);
              if (!event.target.value) show();
            }
          }
        ),
        result && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(SearchResults, { result: result.value, query: result.query, onClose: () => {
          show();
        } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        Button,
        {
          variant: "ghost",
          size: "sm",
          icon: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Icon, { name: "question" }),
          "aria-label": t("glossary"),
          title: t("glossary"),
          "aria-haspopup": "dialog",
          onClick: () => setGlossary(true)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        Button,
        {
          variant: "outline",
          size: "sm",
          icon: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Icon, { name: "session", size: 14 }),
          disabled: !masterId,
          onClick: () => {
            if (masterId) openSession(masterId).catch((failure) => notify(errorText(failure)));
          },
          children: t("openMaster")
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Glossary, { open: glossary, onClose: () => setGlossary(false) })
  ] });
}
function Pages({ route, openTab, deploymentForm }) {
  const { t } = usePanel();
  const { state, error, reload } = usePanelData();
  (0, import_react16.useEffect)(() => {
    document.getElementById(`dt-tab-${route.page}`)?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
  }, [route.page]);
  const waiting = error ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "dt-error", role: "alert", children: error.message }) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "dt-hint", children: t("loading") });
  const page = (() => {
    switch (route.page) {
      case "overview":
        return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(OverviewPage, {});
      case "source":
        return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(SourceStatus, {});
      case "trigger":
        return route.id !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ThreadPage, { id: route.id, target: route.query?.trigger }, route.id) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(TriggerStatus, { filter: route.query?.filter ?? "subscribed" });
      case "eval":
        return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          EvalStatus,
          {
            filter: route.query?.filter ?? "work",
            window: route.query?.window,
            paused: !!state?.paused
          }
        );
      case "execution":
        return route.id !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(TicketPage, { id: route.id }, route.id) : state ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ExecutionStatus, { filter: route.query?.filter ?? "open", state, reload }) : waiting;
      case "settings":
        return state ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          SettingsPage,
          {
            group: route.query.group,
            query: route.query,
            state,
            deploymentForm
          },
          state.masterId
        ) : waiting;
    }
  })();
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "dt-page", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "dt-column", children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Header, { masterId: state?.masterId }),
    error && state && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "dt-error", role: "status", children: error.message }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      SegmentedTabs,
      {
        className: "dt-tabs",
        label: t("pagesLabel"),
        value: route.page,
        onChange: openTab,
        items: TABS.map((value) => ({ value, label: t(`tab.${value}`), id: `dt-tab-${value}`, panelId: "dt-page" }))
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("main", { id: "dt-page", role: "tabpanel", "aria-labelledby": `dt-tab-${route.page}`, className: "dt-main", children: page })
  ] }) });
}
function App({ t, openSession, deploymentForm }) {
  const [location, setLocation] = (0, import_react16.useState)(initialLocation);
  (0, import_react16.useEffect)(() => {
    remember(location);
  }, [location]);
  const move = (0, import_react16.useCallback)((next) => setLocation((current) => ({ ...next(current), group: lastSettingsGroup(current) })), []);
  const navigate = (0, import_react16.useCallback)((route, replace = false) => move((current) => ({
    route,
    stack: replace ? current.stack : [...current.stack, current.route].slice(-20)
  })), [move]);
  const back = (0, import_react16.useCallback)(() => move((current) => ({ route: current.stack.at(-1) ?? HOME, stack: current.stack.slice(0, -1) })), [move]);
  const openTab = (0, import_react16.useCallback)((tab) => move((current) => ({ stack: [], route: tab === "settings" ? settingsRoute(lastSettingsGroup(current)) : { page: tab, id: void 0 } })), [move]);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PanelProvider, { t, openSession, navigate, back, backLabel: routeLabel(t, location.stack.at(-1) ?? HOME), children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Pages, { route: location.route, openTab, deploymentForm }) });
}

// ../../tmp/dsh-superagent-prototype/src/client/index.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var NS = "dshSuperagent";
var PANEL_ID = "dsh-superagent";
var ENTRY = "dsh-superagent";
function HammerIcon({ size }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { d: "M6 3.5h9l3.5 1.75v2.5L15 9.5H6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { d: "M10 9.5v10.25a1.75 1.75 0 0 0 3.5 0V9.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { d: "M10 15.5h3.5" })
  ] });
}
function Mounted({ ctx, t }) {
  const pending = (0, import_react17.useRef)(void 0);
  (0, import_react17.useEffect)(() => () => {
    pending.current?.abort();
  }, []);
  const openSession = (0, import_react17.useCallback)(async (id) => {
    pending.current?.abort();
    const request = new AbortController();
    pending.current = request;
    try {
      await openKnownSession(ctx.sessions, id, (target) => {
        const tabStore = globalThis.__dshBrowserTabsStore;
        if (tabStore) {
          tabStore.noTabsHomeMode = false;
          tabStore.closedIds?.delete(target);
          if (Array.isArray(tabStore.order) && !tabStore.order.includes(target)) {
            tabStore.order.push(target);
          }
          tabStore.emit?.(true);
        }
        ctx.uiWorkspace.openSession(target);
        ctx.layout?.selectPanel?.(null);
      }, request.signal);
    } catch (error) {
      if (error instanceof SessionNavigationError) throw new Error(t(error.code === "not-ready" ? "sessionListNotReady" : "sessionNotListed"));
      throw error;
    }
  }, [ctx, t]);
  const form = usePageForm(ctx.get("configForms")?.get(ENTRY));
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(App, { t, openSession, deploymentForm: form });
}
var inject = ["slots", "locale", "sessions", "uiWorkspace"];
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-superagent: dictionaries");
  const t = ctx.locale.bind(NS);
  ctx.slots.inject("main", () => ctx.slots.register(
    { name: "main", key: PANEL_ID, locale: NS, inject: () => ({}) },
    (props) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Mounted, { ctx, t: props.t })
  ));
  ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({ name: "sidebar.panellist", id: PANEL_ID, order: 10, label: () => t("panel"), locale: NS }, HammerIcon));
  ctx.slots.inject("plugins.row.config", () => ctx.slots.register(
    { name: "plugins.row.config", key: `${ENTRY}#${ENTRY}`, locale: NS },
    (props) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(PluginConfig, { t: props.t, view: props.view, form: props.form })
  ));
  ctx.slots.inject("settings.section.icon", () => ctx.slots.register(
    { name: "settings.section.icon", id: "mcp" },
    (props) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(McpNavIcon, { size: props?.size ?? 16 })
  ));
  ctx.slots.inject("settings.section", () => ctx.slots.register(
    { name: "settings.section", id: "mcp", order: 12, label: () => t("mcpNavTitle"), locale: NS },
    () => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(McpDefaultSettingsPanel, { embedded: true })
  ));
}
		return module.exports;
	}
});
