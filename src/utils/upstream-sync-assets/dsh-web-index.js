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

// ../../tmp/upstream-src/packages/web/web/src/index.ts
import { Remote, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";
import z from "@deepseek-ai/schemastery";

// ../../tmp/upstream-src/packages/web/web/src/types.ts
import { HarnessError } from "@deepseek-ai/dsh-llm";
var WebError = class extends HarnessError {
};

// ../../tmp/upstream-src/packages/web/web/src/index.ts
var _listProviders_dec, _a, _init;
var WebRuntime = class extends (_a = TypertRemoteService, _listProviders_dec = [Remote], _a) {
  constructor(ctx, config) {
    super(ctx, "web");
    this.config = config;
    __runInitializers(_init, 5, this);
    __publicField(this, "searchProviders", /* @__PURE__ */ new Map());
    __publicField(this, "fetchProviders", /* @__PURE__ */ new Map());
    __publicField(this, "searchProviderEnv");
    __publicField(this, "fetchProviderEnv");
    this.searchProviderEnv = process.env.DSH_WEB_SEARCH_PROVIDER;
    this.fetchProviderEnv = process.env.DSH_WEB_FETCH_PROVIDER;
  }
  /**
   * Register a search provider. `listProviders()` lists it until the
   * registration is disposed, which happens with the calling fiber or through
   * the returned disposer; registration and disposal each emit
   * `web/providers-changed`. Throws {@link WebError} `WEB_DUPLICATE_PROVIDER`
   * if its id is already registered for search.
   * @param provider - the provider; its `id` is the registry key.
   * @returns the disposer that unregisters the provider.
   */
  registerSearchProvider(provider) {
    return this.registerProvider(this.searchProviders, provider);
  }
  /**
   * Register a fetch provider, with the listing, disposal, and event behavior
   * of {@link WebRuntime.registerSearchProvider}. Throws {@link WebError}
   * `WEB_DUPLICATE_PROVIDER` if its id is already registered for fetch.
   * @param provider - the provider; its `id` is the registry key.
   * @returns the disposer that unregisters the provider.
   */
  registerFetchProvider(provider) {
    return this.registerProvider(this.fetchProviders, provider);
  }
  registerProvider(store, provider) {
    if (store.has(provider.id)) {
      throw new WebError(`a web provider with id "${provider.id}" is already registered`, "WEB_DUPLICATE_PROVIDER");
    }
    const emitChanged = () => {
      this.emitProvidersChanged();
    };
    const dispose = this.ctx.effect(function* () {
      store.set(provider.id, provider);
      emitChanged();
      yield () => {
        store.delete(provider.id);
        emitChanged();
      };
    }, "web.registerProvider()");
    return () => void dispose();
  }
  listProviders() {
    return {
      search: [...this.searchProviders.values()].map(providerInfo),
      fetch: [...this.fetchProviders.values()].map(providerInfo)
    };
  }
  /** Emit `web/providers-changed`, containing each listener's failure so none vetoes the mutation. */
  emitProvidersChanged() {
    for (const listener of this.ctx.events.dispatch("emit", ["web/providers-changed"])) {
      try {
        const returned = listener();
        void Promise.resolve(returned).catch((error) => {
          this.warnListenerFailure(error);
        });
      } catch (error) {
        this.warnListenerFailure(error);
      }
    }
  }
  warnListenerFailure(error) {
    this.ctx.logger.warn("web: a web/providers-changed listener failed");
    this.ctx.logger.warn(error);
  }
  /**
   * Run one search through the selected provider. Resolves the provider at call
   * time with the selection rules above; throws {@link WebError} when the
   * capability cannot run. The seam enforces `request.maxResults` on the result:
   * if the provider over-returns, `sources[]` is truncated and `truncated` set.
   * @param request - the query and optional result limit.
   * @param signal - optional cancellation signal forwarded to the provider.
   * @returns the provider's results, capped to `request.maxResults`.
   */
  async search(request, signal) {
    const result = await this.selectSearchProvider().search(request, signal);
    return capSources(result, request.maxResults);
  }
  /**
   * Whether the provider `search()` would select can authenticate a search made for a
   * model request on the `llmProvider` chat route. Asks only that provider's `ready()`;
   * one without `ready()` counts as ready. Makes no network calls. A selection failure
   * answers true, because `search()` reports that failure as a structured `WebError`.
   * @param llmProvider - the provider route id of the model request, when known.
   * @returns false only when the selected provider reports that it cannot authenticate.
   */
  async searchReady(llmProvider) {
    return await selectedProviderReady(() => this.selectSearchProvider(), llmProvider);
  }
  /** Select the search provider with the rules above, throwing the matching {@link WebError}. */
  selectSearchProvider() {
    const configuredId = this.config.searchProvider.get() ?? this.searchProviderEnv;
    return resolveProvider({
      providers: this.searchProviders,
      ...configuredId !== void 0 ? { configuredId } : {}
    });
  }
  /**
   * Retrieve one URL through the selected provider. Resolves the provider at
   * call time with the selection rules above; throws {@link WebError} when the
   * capability cannot run. A non-2xx response is a result, not a throw.
   * @param request - the URL plus retrieval options.
   * @param signal - optional cancellation signal forwarded to the provider.
   * @returns the retrieval outcome; non-2xx responses resolve descriptively.
   */
  async fetch(request, signal) {
    return await this.selectFetchProvider().fetch(request, signal);
  }
  /**
   * Whether the provider `fetch()` would select can authenticate a fetch made for a
   * model request on the `llmProvider` chat route. Asks only that provider's `ready()`;
   * one without `ready()` counts as ready. Makes no network calls. A selection failure
   * answers true, because `fetch()` reports that failure as a structured `WebError`.
   * @param llmProvider - the provider route id of the model request, when known.
   * @returns false only when the selected provider reports that it cannot authenticate.
   */
  async fetchReady(llmProvider) {
    return await selectedProviderReady(() => this.selectFetchProvider(), llmProvider);
  }
  /** Select the fetch provider with the rules above, throwing the matching {@link WebError}. */
  selectFetchProvider() {
    const configuredId = this.config.fetchProvider.get() ?? this.fetchProviderEnv;
    return resolveProvider({
      providers: this.fetchProviders,
      ...configuredId !== void 0 ? { configuredId } : {}
    });
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "listProviders", _listProviders_dec, WebRuntime);
__decoratorMetadata(_init, WebRuntime);
/**
 * Provider selection config. Operational env overrides feed the SAME fields:
 * `$DSH_WEB_SEARCH_PROVIDER` / `$DSH_WEB_FETCH_PROVIDER` are equivalent to
 * `searchProvider` / `fetchProvider` and are NOT a hidden priority chain.
 */
__publicField(WebRuntime, "Config", z.object({
  searchProvider: z.string().volatile(),
  fetchProvider: z.string().volatile()
}));
function providerInfo(provider) {
  return {
    id: provider.id,
    ...provider.title === void 0 ? {} : { title: provider.title },
    ...provider.description === void 0 ? {} : { description: provider.description }
  };
}
async function selectedProviderReady(select, llmProvider) {
  let provider;
  try {
    provider = select();
  } catch (_selectionFailure) {
    return true;
  }
  return await provider.ready?.(llmProvider) ?? true;
}
function resolveProvider(selection) {
  const { configuredId, providers } = selection;
  if (configuredId !== void 0) {
    const provider = providers.get(configuredId);
    if (!provider) {
      throw new WebError(`configured web provider "${configuredId}" is not registered`, "WEB_PROVIDER_CONFIGURED_MISSING");
    }
    if (!provider.available()) {
      throw new WebError(`configured web provider "${configuredId}" is registered but unavailable`, "WEB_PROVIDER_CONFIGURED_UNAVAILABLE");
    }
    return provider;
  }
  const usable = [...providers.values()].filter((provider) => provider.available());
  const [single] = usable;
  if (single === void 0) {
    throw new WebError("no usable web provider is registered", "WEB_PROVIDER_UNAVAILABLE");
  }
  if (usable.length > 1) {
    const ids = usable.map((provider) => provider.id).join(", ");
    throw new WebError(`multiple usable web providers are registered (${ids}); configure one explicitly`, "WEB_PROVIDER_AMBIGUOUS");
  }
  return single;
}
function capSources(result, maxResults) {
  if (maxResults === void 0 || result.sources.length <= maxResults) return result;
  return { ...result, sources: result.sources.slice(0, maxResults), truncated: true };
}
var index_default = WebRuntime;
export {
  WebError,
  WebRuntime,
  index_default as default
};
