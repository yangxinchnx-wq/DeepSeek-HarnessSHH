var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x) {
    return __privateSet(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// ../../tmp/upstream-src/packages/mcp/mcp-manager/src/index.ts
import { Service } from "@deepseek-ai/cordis";
import { Remote, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";
import z from "@deepseek-ai/schemastery";
import * as McpClient from "@deepseek-ai/dsh-mcp-client";
import { ReconnectSchema, SERVER_NAME_PATTERN, connectionStatusOf, probeServer, resolveReconnectPolicy } from "@deepseek-ai/dsh-mcp-client";
import { MAX_TIMER_DELAY_MS } from "@deepseek-ai/dsh-timeout";
import { deepEqualJson } from "@deepseek-ai/dsh-util-values";
import { assertTemplateSyntax } from "@deepseek-ai/dsh-mcp-client";
var ServerEntrySchema = z.object({
  transport: z.union(["stdio", "streamable-http"]).required(),
  command: z.string().default(""),
  args: z.array(String).default([]),
  env: z.dict(String).default({}),
  cwd: z.string().default(""),
  url: z.string().default(""),
  headers: z.dict(String).default({}),
  enabled: z.boolean().default(true),
  toolCallTimeoutMs: z.number(),
  startupTimeoutMs: z.number().min(1).max(MAX_TIMER_DELAY_MS).default(3e4),
  closeTimeoutMs: z.number().min(1).max(MAX_TIMER_DELAY_MS),
  reconnect: ReconnectSchema
});
function templatedStrings(name, entry) {
  const path = `servers.${name}`;
  if (entry.transport === "stdio") {
    return [
      [entry.command, `${path}.command`],
      ...entry.args.map((arg, index) => [arg, `${path}.args[${String(index)}]`]),
      ...Object.entries(entry.env).map(([key, value]) => [value, `${path}.env.${key}`]),
      [entry.cwd, `${path}.cwd`]
    ];
  }
  return [
    [entry.url, `${path}.url`],
    ...Object.entries(entry.headers).map(([key, value]) => [value, `${path}.headers.${key}`])
  ];
}
function validateEntries(entries) {
  for (const [name, entry] of Object.entries(entries)) {
    const path = `servers.${name}`;
    if (!SERVER_NAME_PATTERN.test(name)) {
      throw new Error(`${path}: server name must match ${String(SERVER_NAME_PATTERN)} \u2014 rename the entry key`);
    }
    if (entry.transport === "stdio") {
      if (entry.command === "") {
        throw new Error(`${path}: a stdio server requires "command"`);
      }
      if (entry.url !== "") {
        throw new Error(`${path}: "url" is not a stdio field \u2014 remove it or set transport: streamable-http`);
      }
      if (Object.keys(entry.headers).length > 0) {
        throw new Error(`${path}: "headers" is not a stdio field \u2014 remove it or set transport: streamable-http`);
      }
    } else {
      if (entry.url === "") {
        throw new Error(`${path}: a streamable-http server requires "url"`);
      }
      if (entry.command !== "") {
        throw new Error(`${path}: "command" is not a streamable-http field \u2014 remove it or set transport: stdio`);
      }
      if (entry.args.length > 0) {
        throw new Error(`${path}: "args" is not a streamable-http field \u2014 remove it or set transport: stdio`);
      }
      if (Object.keys(entry.env).length > 0) {
        throw new Error(`${path}: "env" is not a streamable-http field \u2014 remove it or set transport: stdio`);
      }
      if (entry.cwd !== "") {
        throw new Error(`${path}: "cwd" is not a streamable-http field \u2014 remove it or set transport: stdio`);
      }
    }
    for (const [value, where] of templatedStrings(name, entry)) assertTemplateSyntax(value, where);
    resolveReconnectPolicy(entry.reconnect, `${path}.reconnect`);
  }
}
var _probeFromClient_dec, _restart_dec, _watch_dec, _a, _init, _b;
var _McpServerManager = class _McpServerManager extends (_b = TypertRemoteService) {
  /**
   * Validate the resolved server configuration.
   * @param ctx - the manager's plugin context; children mount under its fiber.
   * @param config - resolved manager configuration with live references.
   */
  constructor(ctx, config) {
    super(ctx, "mcpManager");
    this.config = config;
    __runInitializers(_init, 5, this);
    __publicField(this, "ownerContext");
    __publicField(this, "instances", /* @__PURE__ */ new Map());
    __publicField(this, "statuses", /* @__PURE__ */ new Map());
    /** Plugin-contributed entries, each owned by its registering plugin's effect. */
    __publicField(this, "registrations", /* @__PURE__ */ new Map());
    /** Wake callbacks of active `watch` streams. */
    __publicField(this, "watchers", /* @__PURE__ */ new Set());
    /** Aborted at service dispose so `watch` streams end. */
    __publicField(this, "lifetime", new AbortController());
    /** Settled operation tail serializing every lifecycle operation. */
    __publicField(this, "tail", Promise.resolve());
    /** Set at service dispose: refuse new operations while queued ones drain. */
    __publicField(this, "stopped", false);
    this.ownerContext = ctx;
    validateEntries(config.servers.get());
  }
  /**
   * Validate Config updates and reconcile the initial server set. Teardown
   * cancels probes and unmounts every instance, retaining cleanup failures in
   * the readable status registry.
   */
  *[(_a = Service.init, _watch_dec = [Remote({ mode: "stream" })], _restart_dec = [Remote], _probeFromClient_dec = [Remote("probe")], _a)]() {
    yield async () => {
      this.stop();
      await this.tail;
      for (const [name, record] of [...this.instances]) await this.unmount(name, record);
    };
    const owner = this.ctx.fiber;
    const registrations = this.registrations;
    this.ctx.on("internal/config", (fiber, next) => {
      const raw = next();
      if (fiber !== owner) return raw;
      const servers = _McpServerManager.Config(raw).servers.get();
      validateEntries(servers);
      const taken = Object.keys(servers).find((name) => registrations.has(name));
      if (taken !== void 0) throw new Error(`servers.${taken}: a plugin already registers this server name \u2014 rename the entry key`);
      return raw;
    });
    this.ctx.on("internal/plugin", (fiber) => {
      if (fiber === owner && fiber.uid === null) this.stop();
    }, { global: true });
    this.ctx.on("loader/volatile-update", () => {
      void this.entriesChanged("config reconcile");
    });
    void this.ctx.fiber.await().then(
      () => {
        void this.schedule(() => this.reconcileOnce(), "initial reconcile");
      },
      /* v8 ignore next 2 -- init is this fiber's whole startup and this registration is its
         last statement, so a rejected activation cannot reach a registered continuation */
      () => void 0
    );
  }
  /**
   * Read configured and registered servers and retained runtime records without mounting or probing.
   * @returns configured entries in document order, then registered entries, then retained records for removed entries.
   */
  list() {
    const entries = this.entries();
    return [.../* @__PURE__ */ new Set([...Object.keys(entries), ...this.instances.keys()])].map((name) => ({
      name,
      configured: Object.hasOwn(entries, name),
      status: this.statuses.get(name) ?? (entries[name]?.enabled ? { state: "connecting", attempt: 0 } : { state: "disabled" })
    }));
  }
  /**
   * Contribute one server for the calling plugin's lifetime. A registered
   * entry is enabled while registered; its removal awaits the instance's
   * unmount, so plugin disposal withdraws the server's tools before settling.
   * @param name - server key and tool namespace, unique across configured and registered servers.
   * @param entry - transport, endpoint, and budgets, validated like a configured entry.
   * @returns an idempotent disposer that removes the registration.
   * @throws when the name is taken, the entry is invalid, or the manager is disposed.
   */
  register(name, entry) {
    const resolved = ServerEntrySchema({ ...entry, enabled: true });
    validateEntries({ [name]: resolved });
    const dispose = this.ctx.effect(() => {
      if (this.stopped) throw new Error("mcp-manager: the manager is disposed");
      if (Object.hasOwn(this.config.servers.get(), name) || this.registrations.has(name)) {
        throw new Error(`mcp-manager: server "${name}" is already configured or registered`);
      }
      this.registrations.set(name, resolved);
      void this.entriesChanged(`registration of "${name}"`);
      return () => {
        this.registrations.delete(name);
        if (!this.stopped) return this.entriesChanged(`removal of "${name}"`);
      };
    }, "mcpManager.register()");
    return () => void dispose();
  }
  async *watch(signal) {
    const ended = AbortSignal.any([signal, this.lifetime.signal]);
    const aborted = () => ended.aborted;
    let wake = Promise.withResolvers();
    let dirty = true;
    const notify = () => {
      dirty = true;
      wake.resolve();
    };
    this.watchers.add(notify);
    ended.addEventListener("abort", notify, { once: true });
    try {
      while (!aborted()) {
        if (!dirty) await wake.promise;
        if (aborted()) break;
        dirty = false;
        wake = Promise.withResolvers();
        yield this.list();
      }
    } finally {
      this.watchers.delete(notify);
      ended.removeEventListener("abort", notify);
    }
  }
  async restart(name) {
    await this.enqueue(async () => {
      if (this.entries()[name] === void 0) {
        throw new Error(`mcp-manager: unknown server "${name}" \u2014 it is neither configured nor registered`);
      }
      await this.remount(name);
    });
  }
  probeFromClient(name, signal) {
    return this.probe(name, { signal });
  }
  /**
   * Probe one configured server without touching its live instance: resolve
   * the entry's templates, connect, list tools, close. A disabled entry can be
   * probed — that is how a management surface tests it before enabling.
   * Configuration changes and manager disposal cancel the probe.
   * @param name - the configured or registered server key.
   * @param options - probe budget, listing caps, and abort signal.
   * @returns the stage-classified probe outcome and independent cleanup result.
   * @throws when the manager is disposed, the entry is absent or changing, cleanup is
   * incomplete, options are invalid, or a required credentials provider is missing.
   */
  async probe(name, options) {
    if (this.stopped) throw new Error("mcp-manager: the manager is disposed");
    const entry = this.entries()[name];
    if (entry === void 0) throw new Error(`mcp-manager: unknown server "${name}"`);
    let record = this.instances.get(name);
    if (record === void 0) {
      record = { entrySnapshot: entry, probes: /* @__PURE__ */ new Map() };
      this.instances.set(name, record);
    }
    if (record.retired || !deepEqualJson(entry, record.entrySnapshot)) throw new Error(`mcp-manager: configuration for "${name}" is changing`);
    if (record.failure !== void 0) throw new Error(`mcp-manager: cleanup for "${name}" is incomplete; restart the Host`);
    const lifetime = new AbortController();
    const owner = record;
    const signal = options?.signal === void 0 ? lifetime.signal : AbortSignal.any([lifetime.signal, options.signal]);
    const done = probeServer(this.ownerContext, this.toClientConfig(name, entry), { ...options, signal }).then((result) => {
      const closure = {
        closeConfirmed: result.closeConfirmed,
        ...result.cleanupError === void 0 ? {} : { cleanupError: result.cleanupError }
      };
      if (!closure.closeConfirmed || closure.cleanupError !== void 0) {
        this.setStatus(name, { state: "failed", reason: "cleanup", result: this.retainCleanupFailure(owner, closure) });
      }
      return result;
    }).finally(() => {
      owner.probes.delete(lifetime);
    });
    owner.probes.set(lifetime, done);
    return done;
  }
  retire(record) {
    record.retired = true;
    record.detachStatus?.();
    for (const lifetime of record.probes.keys()) lifetime.abort();
  }
  stop() {
    this.stopped = true;
    this.lifetime.abort();
    for (const record of this.instances.values()) this.retire(record);
  }
  /** Configured entries in document order, followed by registered entries. */
  entries() {
    return { ...this.config.servers.get(), ...Object.fromEntries(this.registrations) };
  }
  /** Retire records whose entry changed or disappeared, then queue reconciliation. */
  entriesChanged(what) {
    const entries = this.entries();
    for (const [name, record] of this.instances) {
      if (!deepEqualJson(record.entrySnapshot, entries[name])) this.retire(record);
    }
    this.changed();
    return this.schedule(() => this.reconcileOnce(), what);
  }
  /** Wake every `watch` stream. */
  changed() {
    for (const notify of this.watchers) notify();
  }
  /** Queue one lifecycle operation on the serialized tail and contain its failure. */
  schedule(op, what) {
    return this.enqueue(op).catch((error) => {
      this.ctx.logger.error(`mcp-manager: ${what} failed`);
      this.ctx.logger.error(error);
    });
  }
  /** Serialize one operation behind every queued predecessor. */
  enqueue(op) {
    const run = this.tail.then(async () => {
      if (this.stopped) {
        throw new Error("mcp-manager: the manager is disposed");
      }
      return op();
    });
    this.tail = run.then(() => void 0, () => void 0);
    return run;
  }
  /** Reconcile the live instance set against the current entries. */
  async reconcileOnce() {
    const servers = this.entries();
    for (const [name, record] of this.instances) {
      const entry = servers[name];
      if (!record.retired && entry !== void 0 && deepEqualJson(entry, record.entrySnapshot)) continue;
      await this.unmount(name, record);
    }
    for (const name of this.statuses.keys()) {
      if (servers[name] === void 0 && !this.instances.has(name)) this.statuses.delete(name);
    }
    this.changed();
    for (const [name, entry] of Object.entries(servers)) {
      const record = this.instances.get(name);
      if (record?.retired || record?.failure !== void 0) continue;
      if (!entry.enabled) {
        this.setStatus(name, { state: "disabled" });
        continue;
      }
      if (record?.handle !== void 0) continue;
      this.mount(name, entry, record);
    }
  }
  async remount(name) {
    const record = this.instances.get(name);
    if (record !== void 0 && !await this.unmount(name, record)) {
      throw new Error(`mcp-manager: cleanup for "${name}" is incomplete; restart the Host`);
    }
    const entry = this.entries()[name];
    if (entry === void 0 || this.stopped) return;
    if (!entry.enabled) {
      this.setStatus(name, { state: "disabled" });
      return;
    }
    this.mount(name, entry);
  }
  mount(name, entry, existing) {
    if (this.stopped || !deepEqualJson(this.entries()[name], entry)) return;
    const record = existing ?? { entrySnapshot: entry, probes: /* @__PURE__ */ new Map() };
    this.instances.set(name, record);
    this.setStatus(name, { state: "connecting", attempt: 0 });
    const handle = record.handle = this.ownerContext.plugin(McpClient, this.toClientConfig(name, entry));
    void handle.await().then(() => {
      if (record.retired) return;
      const cell = connectionStatusOf(handle);
      if (cell === void 0) throw new Error(`mcp-manager: "${name}" activated without connection status`);
      const publish = () => {
        if (record.retired) return;
        const status = cell.current();
        if (status.state === "failed" && status.reason === "unclosed-generation") {
          const hadFailure = record.failure !== void 0;
          const result = this.retainCleanupFailure(record, cell.closure());
          this.setStatus(name, hadFailure ? { state: "failed", reason: "cleanup", result } : status);
        } else if (record.failure === void 0) this.setStatus(name, status);
      };
      record.detachStatus = cell.onChange(publish);
      publish();
    }).catch((error) => {
      if (record.retired || this.stopped) return;
      void this.schedule(async () => {
        if (record.retired) return;
        if (await this.unmount(name, record)) this.setStatus(name, { state: "failed", reason: "load", lastError: String(error) });
      }, `failed startup of "${name}"`);
    });
  }
  async unmount(name, record) {
    this.retire(record);
    await Promise.allSettled([...record.probes.values()]);
    if (record.handle !== void 0) {
      await record.handle.dispose();
      const result = connectionStatusOf(record.handle)?.closure();
      if (result !== void 0 && (!result.closeConfirmed || result.cleanupError !== void 0)) this.retainCleanupFailure(record, result);
    }
    if (record.failure !== void 0) {
      this.setStatus(name, { state: "failed", reason: "cleanup", result: record.failure });
      return false;
    }
    this.instances.delete(name);
    return true;
  }
  /** Retain the first cleanup diagnostic and every unconfirmed transport closure. */
  retainCleanupFailure(record, result) {
    return record.failure = {
      ...result,
      ...record.failure,
      closeConfirmed: result.closeConfirmed && record.failure?.closeConfirmed !== false
    };
  }
  /**
   * Publish changed statuses for configured or registered entries and retained runtime records.
   * Removed entries with incomplete cleanup remain observable; disposed managers
   * retain the final status without emitting events.
   */
  setStatus(name, status) {
    if (this.entries()[name] === void 0 && !this.instances.has(name)) return;
    const previous = this.statuses.get(name);
    if (previous !== void 0 && deepEqualJson(previous, status)) return;
    this.statuses.set(name, status);
    if (this.stopped) return;
    this.changed();
    void this.ctx.parallel("mcp-manager/status", name, status).catch((error) => {
      this.ctx.logger.error(`mcp-manager: a mcp-manager/status listener failed for "${name}"`);
      this.ctx.logger.error(error);
    });
  }
  /**
   * Resolve client defaults while retaining template strings for runtime
   * expansion. Non-strict startup exposes connection failures through status;
   * the manager schema supplies its startup budget.
   */
  toClientConfig(name, entry) {
    const shared = {
      serverName: name,
      failOnStartupError: false,
      expandTemplates: true,
      ...entry.closeTimeoutMs === void 0 ? {} : { closeTimeoutMs: entry.closeTimeoutMs },
      ...entry.toolCallTimeoutMs === void 0 ? {} : { toolCallTimeoutMs: entry.toolCallTimeoutMs },
      startupTimeoutMs: entry.startupTimeoutMs,
      reconnect: entry.reconnect
    };
    if (entry.transport === "stdio") {
      return McpClient.Config({
        transport: "stdio",
        command: entry.command,
        args: [...entry.args],
        env: { ...entry.env },
        cwd: entry.cwd,
        ...shared
      });
    }
    return McpClient.Config({
      transport: "streamable-http",
      url: entry.url,
      headers: { ...entry.headers },
      ...shared
    });
  }
};
_init = __decoratorStart(_b);
__decorateElement(_init, 1, "watch", _watch_dec, _McpServerManager);
__decorateElement(_init, 1, "restart", _restart_dec, _McpServerManager);
__decorateElement(_init, 1, "probeFromClient", _probeFromClient_dec, _McpServerManager);
__decoratorMetadata(_init, _McpServerManager);
/** Schema for {@link Config}; Settings exposes its volatile fields. */
__publicField(_McpServerManager, "Config", z.object({
  servers: z.dict(ServerEntrySchema).default({}).volatile()
}));
__publicField(_McpServerManager, "inject", ["tools"]);
var McpServerManager = _McpServerManager;
export {
  McpServerManager as default
};
