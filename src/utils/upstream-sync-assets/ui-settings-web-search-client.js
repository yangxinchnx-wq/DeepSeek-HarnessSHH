window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-settings-web-search",
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

// ../../tmp/upstream-src/packages/client/ui-settings-web-search/src/client/index.ts
var index_exports = {};
__export(index_exports, {
  NS: () => NS,
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// ../../tmp/upstream-src/packages/client/ui-settings-web-search/src/client/WebSearchCard.tsx
var import_react = require("react");
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

// ../../tmp/upstream-src/packages/client/ui-settings-web-search/src/client/locales.ts
var en = {
  title: "Web search and fetch",
  description: "Choose the providers web search and web fetch use.",
  searchSection: "Web search provider",
  fetchSection: "Web fetch provider",
  providerDeepSeek: "DeepSeek Search API",
  providerLegacy: "DeepSeek (legacy)",
  legacyKeyHint: "Uses the signed-in account on account-model requests; otherwise uses this API key ({ref}), shared with Models by default.",
  maxUses: "Maximum searches per request",
  maxUsesHint: "Maximum server-side searches per Messages request: a positive integer, default 5.",
  invalidMaxUses: "Enter a positive integer, or leave blank to use the default.",
  providerLocal: "Direct fetch",
  providerDeepSeekFetch: "DeepSeek Fetch API",
  providerMissing: "{id} (not loaded)",
  providerAuto: "Automatic",
  providersFailed: "Couldn't load the provider list, so this menu may be incomplete.",
  retry: "Retry",
  pluginProviderHint: "Configure this provider in its own plugin settings.",
  credential: "API key",
  baseUrl: "Base URL",
  baseUrlHint: "Include the API prefix. Leave blank to use the official address. The provider appends {path}.",
  apiKeyUnsetApi: "No key is configured.",
  searchGuide: "Search & Fetch guide",
  searchGuideUrl: "https://api-docs.deepseek.com/guides/search",
  apiKeySet: "A key is configured.",
  count: "Results per search",
  countHint: "Results returned per query: an integer from 1 to 50, default 10. This controls result count, not search calls. web_search keeps no more sources than its own result limit.",
  overridden: "Overridden",
  reset: "Reset to default",
  readOnly: "This deployment stores settings read-only.",
  unavailable: "This plugin is not loaded, so it cannot be configured right now.",
  save: "Save",
  saving: "Saving\u2026",
  saveFailed: "The deployment did not accept these values; they were left for you to correct.",
  invalidNumber: "Enter a number, or leave blank to use the default.",
  invalidCount: "Enter an integer from 1 to 50, or leave blank to use the default."
};
var zh = {
  title: "\u7F51\u9875\u641C\u7D22\u4E0E\u83B7\u53D6",
  description: "\u9009\u62E9\u7F51\u9875\u641C\u7D22\u4E0E\u7F51\u9875\u83B7\u53D6\u4F7F\u7528\u7684\u63D0\u4F9B\u65B9\u3002",
  searchSection: "\u7F51\u9875\u641C\u7D22\u63D0\u4F9B\u65B9",
  fetchSection: "\u7F51\u9875\u83B7\u53D6\u63D0\u4F9B\u65B9",
  providerDeepSeek: "DeepSeek Search API",
  providerLegacy: "DeepSeek\uFF08\u65E7\u7248\uFF09",
  legacyKeyHint: "\u8D26\u53F7\u6A21\u578B\u53D1\u8D77\u7684\u8BF7\u6C42\u4F7F\u7528\u5DF2\u767B\u5F55\u8D26\u53F7\uFF1B\u5176\u4ED6\u8BF7\u6C42\u4F7F\u7528\u6B64 API Key\uFF08{ref}\uFF09\uFF0C\u9ED8\u8BA4\u4E0E\u300C\u6A21\u578B\u300D\u9875\u5171\u7528",
  maxUses: "\u5355\u6B21\u8BF7\u6C42\u6700\u591A\u641C\u7D22\u6B21\u6570",
  maxUsesHint: "\u6BCF\u6B21 Messages \u8BF7\u6C42\u5141\u8BB8\u7684\u670D\u52A1\u7AEF\u641C\u7D22\u6B21\u6570\u4E0A\u9650\uFF0C\u987B\u4E3A\u6B63\u6574\u6570\uFF0C\u9ED8\u8BA4 5",
  invalidMaxUses: "\u8BF7\u586B\u6B63\u6574\u6570\uFF1B\u7559\u7A7A\u8868\u793A\u4F7F\u7528\u9ED8\u8BA4\u503C",
  providerLocal: "\u672C\u673A\u76F4\u63A5\u83B7\u53D6",
  providerDeepSeekFetch: "DeepSeek Fetch API",
  providerMissing: "{id}\uFF08\u672A\u52A0\u8F7D\uFF09",
  providerAuto: "\u81EA\u52A8\u9009\u62E9",
  providersFailed: "\u65E0\u6CD5\u8BFB\u53D6\u63D0\u4F9B\u65B9\u5217\u8868\uFF0C\u6B64\u83DC\u5355\u53EF\u80FD\u4E0D\u5B8C\u6574",
  retry: "\u91CD\u8BD5",
  pluginProviderHint: "\u8BF7\u5728\u8BE5\u63D2\u4EF6\u81EA\u5DF1\u7684\u8BBE\u7F6E\u4E2D\u914D\u7F6E",
  credential: "API Key",
  baseUrl: "Base URL",
  baseUrlHint: "\u586B\u5199\u542B API \u524D\u7F00\u7684\u5730\u5740\uFF1B\u7559\u7A7A\u65F6\u4F7F\u7528\u5B98\u65B9\u5730\u5740\uFF1B\u7A0B\u5E8F\u8FFD\u52A0 {path}",
  apiKeyUnsetApi: "\u672A\u914D\u7F6E\u5BC6\u94A5\u3002",
  searchGuide: "\u7F51\u9875\u641C\u7D22\u4E0E\u83B7\u53D6\u6307\u5357",
  searchGuideUrl: "https://api-docs.deepseek.com/zh-cn/guides/search",
  apiKeySet: "\u5DF2\u914D\u7F6E\u5BC6\u94A5\u3002",
  count: "\u6BCF\u6B21\u641C\u7D22\u7ED3\u679C\u6570",
  countHint: "\u6BCF\u4E2A\u67E5\u8BE2\u8FD4\u56DE\u7684\u7ED3\u679C\u6761\u6570\uFF0C\u987B\u4E3A 1\u201350 \u7684\u6574\u6570\uFF0C\u9ED8\u8BA4 10\uFF1B\u4E0D\u63A7\u5236\u641C\u7D22\u8C03\u7528\u6B21\u6570\u3002web_search \u4FDD\u7559\u7684\u6765\u6E90\u6570\u4E0D\u8D85\u8FC7\u5176\u81EA\u8EAB\u7684\u7ED3\u679C\u4E0A\u9650\u3002",
  overridden: "\u5DF2\u8986\u76D6",
  reset: "\u6062\u590D\u9ED8\u8BA4",
  readOnly: "\u672C\u90E8\u7F72\u7684\u8BBE\u7F6E\u4E3A\u53EA\u8BFB\u3002",
  unavailable: "\u8BE5\u63D2\u4EF6\u5F53\u524D\u672A\u52A0\u8F7D\uFF0C\u6682\u65F6\u65E0\u6CD5\u914D\u7F6E\u3002",
  save: "\u4FDD\u5B58",
  saving: "\u4FDD\u5B58\u4E2D\u2026",
  saveFailed: "\u672C\u90E8\u7F72\u6CA1\u6709\u63A5\u53D7\u8FD9\u4E9B\u503C\uFF0C\u5DF2\u4FDD\u7559\u4F9B\u4F60\u4FEE\u6539\u3002",
  invalidNumber: "\u8BF7\u586B\u6570\u5B57\uFF1B\u7559\u7A7A\u8868\u793A\u4F7F\u7528\u9ED8\u8BA4\u503C\u3002",
  invalidCount: "\u8BF7\u586B 1\u201350 \u7684\u6574\u6570\uFF1B\u7559\u7A7A\u8868\u793A\u4F7F\u7528\u9ED8\u8BA4\u503C\u3002"
};
function formLabels(t) {
  return { unavailable: t("unavailable"), readOnly: t("readOnly"), saveFailed: t("saveFailed"), save: t("save"), saving: t("saving") };
}
var ja = {
  "title": "Web \u691C\u7D22\u3068\u53D6\u5F97",
  "description": "Web \u691C\u7D22\u3068 Web \u53D6\u5F97\u306B\u4F7F\u7528\uFFFD\uFFFD\uFFFD\u308B\u30D7\u30ED\u30D0\u30A4\u30C0\u30FC\u3092\u9078\u629E\u3057\u307E\u3059\u3002",
  "searchSection": "Web \u691C\u7D22\u30D7\u30ED\u30D0\u30A4\u30C0\u30FC",
  "fetchSection": "Web \u53D6\u5F97\u30D7\u30ED\u30D0\u30A4\u30C0\u30FC",
  "providerDeepSeek": "DeepSeek Search API",
  "providerLegacy": "DeepSeek\uFF08\u65E7\u7248\uFF09",
  "legacyKeyHint": "\u30A2\u30AB\u30A6\u30F3\u30C8\u30E2\u30C7\u30EB\u306E\u30EA\u30AF\u30A8\u30B9\u30C8\u3067\u306F\u30ED\u30B0\u30A4\u30F3\u4E2D\u306E\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u4F7F\u3044\u3001\u305D\u308C\u4EE5\u5916\u3067\u306F\u3053\u306E API \u30AD\u30FC\uFF08{ref}\u3001\u65E2\u5B9A\u3067\u306F\u30E2\u30C7\u30EB\u8A2D\u5B9A\u3068\u5171\u6709\uFF09\u3092\u4F7F\u3044\u307E\u3059\u3002",
  "maxUses": "\u30EA\u30AF\u30A8\u30B9\u30C8\u3054\u3068\u306E\u6700\u5927\u691C\u7D22\u56DE\u6570",
  "maxUsesHint": "Messages \u30EA\u30AF\u30A8\u30B9\u30C8\u3054\u3068\u306E\u30B5\u30FC\u30D0\u30FC\u5074\u691C\u7D22\u56DE\u6570\u306E\u4E0A\u9650\u3067\u3059\u3002\u6B63\u306E\u6574\u6570\u3067\u3001\u65E2\u5B9A\u5024\u306F 5 \u3067\u3059\u3002",
  "invalidMaxUses": "\u6B63\u306E\u6574\u6570\u3092\u5165\u529B\u3059\u308B\u304B\u3001\u65E2\u5B9A\u5024\u3092\u4F7F\u3046\u5834\u5408\u306F\u7A7A\u6B04\u306B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "providerLocal": "\u76F4\u63A5\u53D6\u5F97",
  "providerDeepSeekFetch": "DeepSeek Fetch API",
  "providerMissing": "{id}\uFF08\u672A\u8AAD\u307F\u8FBC\u307F\uFF09",
  "providerAuto": "\u81EA\u52D5",
  "providersFailed": "\u30D7\u30ED\u30D0\u30A4\u30C0\u30FC\u4E00\u89A7\u3092\u8AAD\u307F\u8FBC\u3081\u306A\u304B\u3063\u305F\u305F\u3081\u3001\u3053\u306E\u30E1\u30CB\u30E5\u30FC\u306F\u4E0D\u5B8C\u5168\u306A\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002",
  "retry": "\u518D\u8A66\u884C",
  "pluginProviderHint": "\u3053\u306E\u30D7\u30ED\u30D0\u30A4\u30C0\u30FC\u306F\u3001\u305D\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u81EA\u8EAB\u306E\u8A2D\u5B9A\u3067\u69CB\u6210\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "credential": "API \u30AD\u30FC",
  "baseUrl": "\u30D9\u30FC\u30B9 URL",
  "baseUrlHint": "API \u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9\u3092\u542B\u3081\u3066\u304F\u3060\u3055\u3044\u3002\u7A7A\u6B04\u306E\u5834\u5408\u306F\u516C\uFFFD\uFFFD\u30A2\u30C9\u30EC\u30B9\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002\u30D7\u30ED\u30D0\u30A4\u30C0\u30FC\u306F {path} \u3092\u8FFD\u52A0\u3057\u307E\u3059\u3002",
  "apiKeyUnsetApi": "\u30AD\u30FC\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002",
  "searchGuide": "\u691C\u7D22\u3068\u53D6\u5F97\u306E\u30AC\u30A4\u30C9",
  "searchGuideUrl": "https://api-docs.deepseek.com/guides/search",
  "apiKeySet": "\u30AD\u30FC\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u3059\u3002",
  "count": "\u691C\u7D22\u3042\u305F\u308A\u306E\u7D50\u679C\u6570",
  "countHint": "\u30AF\u30A8\u30EA\u3054\u3068\u306B\u8FD4\u3055\u308C\u308B\u7D50\u679C\u6570: 1\u301C50 \u306E\u6574\u6570\u3001\u30C7\u30D5\u30A9\u30EB\u30C8\u306F 10 \u3067\u3059\u3002\u3053\u308C\u306F\u7D50\u679C\u6570\u3067\u3042\u308A\u3001\u691C\u7D22\u547C\u3073\u51FA\u3057\u6570\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002web_search \u306F\u81EA\u8EAB\u306E\u7D50\u679C\u4E0A\u9650\u3092\u8D85\u3048\u308B\u30BD\u30FC\u30B9\u3092\u4FDD\u6301\u3057\u307E\u305B\u3093\u3002",
  "overridden": "\u4E0A\u66F8\u304D\u6E08\u307F",
  "reset": "\u30C7\u30D5\u30A9\u30EB\u30C8\u306B\u623B\u3059",
  "readOnly": "\u3053\u306E\u30C7\u30D7\u30ED\u30A4\u3067\u306F\u8A2D\u5B9A\u306F\u8AAD\u307F\u53D6\u308A\u5C02\u7528\u3067\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002",
  "unavailable": "\u3053\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u306F\u8AAD\u307F\u8FBC\u307E\u308C\u3066\u3044\u306A\u3044\u305F\u3081\u3001\u73FE\u5728\u8A2D\u5B9A\u3067\u304D\u307E\u305B\u3093\u3002",
  "save": "\u4FDD\u5B58",
  "saving": "\u4FDD\u5B58\u4E2D\u2026",
  "saveFailed": "\u30C7\u30D7\u30ED\u30A4\u304C\u3053\u308C\u3089\u306E\u5024\u3092\u53D7\u3051\u5165\u308C\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4FEE\u6B63\u7528\u306B\u6B8B\u3055\u308C\u3066\u3044\u307E\u3059\u3002",
  "invalidNumber": "\u6570\u5024\u3092\u5165\u529B\u3059\u308B\u304B\u3001\u30C7\u30D5\u30A9\u30EB\u30C8\u3092\u4F7F\u7528\u3059\u308B\u306B\u306F\u7A7A\u6B04\u306B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "invalidCount": "1\u301C50 \u306E\u6574\u6570\u3092\u5165\u529B\u3059\u308B\u304B\u3001\u30C7\u30D5\u30A9\u30EB\u30C8\u3092\u4F7F\u7528\u3059\u308B\u306B\u306F\u7A7A\u6B04\u306B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
};
var es = {
  title: "B\xFAsqueda y obtenci\xF3n web",
  description: "Elija los proveedores que usan la b\xFAsqueda web y la obtenci\xF3n web.",
  searchSection: "Proveedor de b\xFAsqueda web",
  fetchSection: "Proveedor de obtenci\xF3n web",
  providerDeepSeek: "DeepSeek Search API",
  providerLegacy: "DeepSeek (heredado)",
  legacyKeyHint: "Las solicitudes del modelo de cuenta usan la cuenta conectada; las dem\xE1s usan esta clave API ({ref}), compartida con Modelos de forma predeterminada.",
  maxUses: "B\xFAsquedas m\xE1ximas por solicitud",
  maxUsesHint: "M\xE1ximo de b\xFAsquedas del servidor por solicitud Messages: entero positivo, predeterminado 5.",
  invalidMaxUses: "Introduzca un entero positivo o deje vac\xEDo para usar el valor predeterminado.",
  providerLocal: "Obtenci\xF3n directa",
  providerDeepSeekFetch: "DeepSeek Fetch API",
  providerMissing: "{id} (no cargado)",
  providerAuto: "Autom\xE1tico",
  providersFailed: "No se pudo cargar la lista de proveedores, por lo que este men\xFA puede estar incompleto.",
  retry: "Reintentar",
  pluginProviderHint: "Configure este proveedor en la configuraci\xF3n de su propio complemento.",
  credential: "Clave de API",
  baseUrl: "URL base",
  baseUrlHint: "Incluya el prefijo de la API. D\xE9jelo en blanco para usar la direcci\xF3n oficial. El proveedor agrega {path}.",
  apiKeyUnsetApi: "No hay ninguna clave configurada.",
  searchGuide: "Gu\xEDa de b\xFAsqueda y recuperaci\xF3n",
  searchGuideUrl: "https://api-docs.deepseek.com/guides/search",
  apiKeySet: "Se configura una clave.",
  count: "Resultados por b\xFAsqueda",
  countHint: "Resultados devueltos por consulta: un n\xFAmero entero del 1 al 50, valor predeterminado 10. Esto controla el recuento de resultados, no las llamadas de b\xFAsqueda. web_search no guarda m\xE1s fuentes que su propio l\xEDmite de resultados.",
  overridden: "Anulado",
  reset: "Restablecer los valores predeterminados",
  readOnly: "Esta implementaci\xF3n almacena configuraciones de solo lectura.",
  unavailable: "Este complemento no est\xE1 cargado, por lo que no se puede configurar en este momento.",
  save: "Guardar",
  saving: "Guardando\u2026",
  saveFailed: "El despliegue no acept\xF3 estos valores; quedaron para que usted los corrigiera.",
  invalidNumber: "Ingrese un n\xFAmero o d\xE9jelo en blanco para usar el valor predeterminado.",
  invalidCount: "Ingrese un n\xFAmero entero del 1 al 50 o d\xE9jelo en blanco para usar el valor predeterminado."
};
var fr = {
  title: "Recherche et r\xE9cup\xE9ration web",
  description: "Choisissez les fournisseurs utilis\xE9s par la recherche web et la r\xE9cup\xE9ration web.",
  searchSection: "Fournisseur de recherche web",
  fetchSection: "Fournisseur de r\xE9cup\xE9ration web",
  providerDeepSeek: "DeepSeek Search API",
  providerLegacy: "DeepSeek (ancienne version)",
  legacyKeyHint: "Les requ\xEAtes du mod\xE8le de compte utilisent le compte connect\xE9 ; les autres utilisent cette cl\xE9 API ({ref}), partag\xE9e avec Mod\xE8les par d\xE9faut.",
  maxUses: "Recherches maximales par requ\xEAte",
  maxUsesHint: "Maximum de recherches c\xF4t\xE9 serveur par requ\xEAte Messages : entier positif, 5 par d\xE9faut.",
  invalidMaxUses: "Saisissez un entier positif ou laissez vide pour utiliser la valeur par d\xE9faut.",
  providerLocal: "R\xE9cup\xE9ration directe",
  providerDeepSeekFetch: "DeepSeek Fetch API",
  providerMissing: "{id} (non charg\xE9)",
  providerAuto: "Automatique",
  providersFailed: "Impossible de charger la liste des fournisseurs ; ce menu peut \xEAtre incomplet.",
  retry: "R\xE9essayer",
  pluginProviderHint: "Configurez ce fournisseur dans les param\xE8tres de son propre plugin.",
  credential: "Cl\xE9 API",
  baseUrl: "URL de base",
  baseUrlHint: "Incluez le pr\xE9fixe de l'API. Laissez vide pour utiliser l'adresse officielle. Le fournisseur ajoute {path}.",
  apiKeyUnsetApi: "Aucune cl\xE9 n'est configur\xE9e.",
  searchGuide: "Guide de recherche et de r\xE9cup\xE9ration",
  searchGuideUrl: "https://api-docs.deepseek.com/guides/search",
  apiKeySet: "Une cl\xE9 est configur\xE9e.",
  count: "R\xE9sultats par recherche",
  countHint: "R\xE9sultats renvoy\xE9s par requ\xEAte\xA0: un nombre entier de 1 \xE0 50, 10 par d\xE9faut. Cela contr\xF4le le nombre de r\xE9sultats, pas les appels de recherche. web_search ne conserve pas plus de sources que sa propre limite de r\xE9sultats.",
  overridden: "Remplac\xE9",
  reset: "R\xE9initialiser aux valeurs par d\xE9faut",
  readOnly: "Ce d\xE9ploiement stocke les param\xE8tres en lecture seule.",
  unavailable: "Ce plugin n'est pas charg\xE9, il ne peut donc pas \xEAtre configur\xE9 pour le moment.",
  save: "Enregistrer",
  saving: "Sauvegarde\u2026",
  saveFailed: "Le d\xE9ploiement n'a pas accept\xE9 ces valeurs ; ils vous ont \xE9t\xE9 laiss\xE9s \xE0 corriger.",
  invalidNumber: "Entrez un num\xE9ro ou laissez ce champ vide pour utiliser la valeur par d\xE9faut.",
  invalidCount: "Entrez un nombre entier compris entre 1 et 50 ou laissez vide pour utiliser la valeur par d\xE9faut."
};
var de = {
  title: "Websuche und Webabruf",
  description: "W\xE4hlen Sie die Anbieter f\xFCr Websuche und Webabruf.",
  searchSection: "Anbieter f\xFCr Websuche",
  fetchSection: "Anbieter f\xFCr Webabruf",
  providerDeepSeek: "DeepSeek Search API",
  providerLegacy: "DeepSeek (Legacy)",
  legacyKeyHint: "Kontomodellanfragen verwenden das angemeldete Konto; andere verwenden diesen API-Schl\xFCssel ({ref}), standardm\xE4\xDFig mit Modelle geteilt.",
  maxUses: "Maximale Suchen pro Anfrage",
  maxUsesHint: "Maximale serverseitige Suchen pro Messages-Anfrage: positive Ganzzahl, Standard 5.",
  invalidMaxUses: "Geben Sie eine positive Ganzzahl ein oder lassen Sie das Feld f\xFCr den Standard leer.",
  providerLocal: "Direkter Abruf",
  providerDeepSeekFetch: "DeepSeek Fetch API",
  providerMissing: "{id} (nicht geladen)",
  providerAuto: "Automatisch",
  providersFailed: "Die Anbieterliste konnte nicht geladen werden, daher ist dieses Men\xFC m\xF6glicherweise unvollst\xE4ndig.",
  retry: "Erneut versuchen",
  pluginProviderHint: "Konfigurieren Sie diesen Anbieter in den Einstellungen seines eigenen Plugins.",
  credential: "API-Schl\xFCssel",
  baseUrl: "Basis-URL",
  baseUrlHint: "F\xFCgen Sie das API-Pr\xE4fix ein. Leer lassen, um die offizielle Adresse zu verwenden. Der Anbieter h\xE4ngt {path} an.",
  apiKeyUnsetApi: "Es ist kein Schl\xFCssel konfiguriert.",
  searchGuide: "Leitfaden zum Suchen und Abrufen",
  searchGuideUrl: "https://api-docs.deepseek.com/guides/search",
  apiKeySet: "Ein Schl\xFCssel ist konfiguriert.",
  count: "Ergebnisse pro Suche",
  countHint: "Pro Abfrage zur\xFCckgegebene Ergebnisse: eine Ganzzahl von 1 bis 50, Standard 10. Dies steuert die Ergebnisanzahl, nicht Suchaufrufe. web_search beh\xE4lt nicht mehr Quellen als sein eigenes Ergebnislimit.",
  overridden: "\xDCberschrieben",
  reset: "Auf Standard zur\xFCcksetzen",
  readOnly: "Diese Bereitstellung speichert Einstellungen schreibgesch\xFCtzt.",
  unavailable: "Dieses Plugin ist nicht geladen und kann daher derzeit nicht konfiguriert werden.",
  save: "Speichern",
  saving: "Speichern\u2026",
  saveFailed: "Die Bereitstellung hat diese Werte nicht akzeptiert. Sie mussten sie korrigieren.",
  invalidNumber: "Geben Sie eine Zahl ein oder lassen Sie das Feld leer, um den Standardwert zu verwenden.",
  invalidCount: "Geben Sie eine Ganzzahl zwischen 1 und 50 ein oder lassen Sie das Feld leer, um den Standardwert zu verwenden."
};
var ru = {
  title: "\u0412\u0435\u0431-\u043F\u043E\u0438\u0441\u043A \u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430",
  description: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u043E\u0432 \u0434\u043B\u044F \u0432\u0435\u0431-\u043F\u043E\u0438\u0441\u043A\u0430 \u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043D\u0438\u0446.",
  searchSection: "\u041F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A \u0432\u0435\u0431-\u043F\u043E\u0438\u0441\u043A\u0430",
  fetchSection: "\u041F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043D\u0438\u0446",
  providerDeepSeek: "DeepSeek Search API",
  providerLegacy: "DeepSeek (\u043F\u0440\u0435\u0436\u043D\u044F\u044F \u0432\u0435\u0440\u0441\u0438\u044F)",
  legacyKeyHint: "\u0417\u0430\u043F\u0440\u043E\u0441\u044B \u043C\u043E\u0434\u0435\u043B\u0438 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442; \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u2014 \u044D\u0442\u043E\u0442 \u043A\u043B\u044E\uFFFD\uFFFD API ({ref}), \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u043E\u0431\u0449\u0438\u0439 \u0441 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C\u0438 \u043C\u043E\u0434\u0435\u043B\u0435\u0439.",
  maxUses: "\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C \u043F\u043E\u0438\u0441\u043A\u043E\u0432 \u043D\u0430 \u0437\u0430\u043F\u0440\u043E\u0441",
  maxUsesHint: "\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C \u0441\u0435\u0440\u0432\u0435\u0440\u043D\u044B\u0445 \u043F\u043E\u0438\u0441\u043A\u043E\u0432 \u043D\u0430 \u0437\u0430\u043F\u0440\u043E\u0441 Messages: \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0446\u0435\u043B\u043E\u0435, \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E 5.",
  invalidMaxUses: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0446\u0435\u043B\u043E\u0435 \u0438\u043B\u0438 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u0443\u0441\u0442\u044B\u043C \u0434\u043B\u044F \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E.",
  providerLocal: "\u041F\u0440\u044F\u043C\u0430\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430",
  providerDeepSeekFetch: "DeepSeek Fetch API",
  providerMissing: "{id} (\u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D)",
  providerAuto: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
  providersFailed: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u043E\u0432, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u044D\u0442\u043E \u043C\u0435\u043D\u044E \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043D\u0435\u043F\u043E\u043B\u043D\u044B\u043C.",
  retry: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C",
  pluginProviderHint: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u044D\u0442\u043E\u0433\u043E \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430 \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u0435\u0433\u043E \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u043B\u0430\u0433\u0438\u043D\u0430.",
  credential: "\u041A\u043B\u044E\u0447 API",
  baseUrl: "\u0411\u0430\u0437\u043E\u0432\u044B\u0439 URL",
  baseUrlHint: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043F\u0440\u0435\u0444\u0438\u043A\u0441 API. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u0443\u0441\u0442\u044B\u043C, \u0447\u0442\u043E\u0431\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441. \u041F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442 {path}.",
  apiKeyUnsetApi: "\u041A\u043B\u044E\u0447 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D.",
  searchGuide: "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043F\u043E \u043F\u043E\u0438\u0441\u043A\u0443 \u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044E",
  searchGuideUrl: "https://api-docs.deepseek.com/guides/search",
  apiKeySet: "\u041A\u043B\u044E\u0447 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D.",
  count: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E \u043F\u043E\u0438\u0441\u043A\u0443",
  countHint: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B, \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C\u044B\u0435 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: \u0446\u0435\u043B\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u043E\u0442 1 \u0434\u043E 50, \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E 10. \u042D\u0442\u043E \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u0442 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432, \u0430 \u043D\u0435 \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0435 \u0432\u044B\u0437\u043E\u0432\u044B. web_search \u0445\u0440\u0430\u043D\u0438\u0442 \u043D\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432, \u0447\u0435\u043C \u0435\u0433\u043E \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043B\u0438\u043C\u0438\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432.",
  overridden: "\u041F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043E",
  reset: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
  readOnly: "\u0412 \u044D\u0442\u043E\u043C \u0440\u0430\u0437\u0432\u0435\u0440\u0442\u044B\u0432\u0430\u043D\u0438\u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0447\u0442\u0435\u043D\u0438\u044F.",
  unavailable: "\u042D\u0442\u043E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0435\u0433\u043E \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441.",
  save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  saving: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u2026",
  saveFailed: "\u0420\u0430\u0437\u0432\u0435\u0440\u0442\u044B\u0432\u0430\u043D\u0438\u0435 \u043D\u0435 \u043F\u0440\u0438\u043D\u044F\u043B\u043E \u044D\u0442\u0438 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F; \u0438\u0445 \u043E\u0441\u0442\u0430\u0432\u0438\u043B\u0438 \u0432\u0430\u043C \u043D\u0430 \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435.",
  invalidNumber: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0447\u0438\u0441\u043B\u043E \u0438\u043B\u0438 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u043E\u043B\u0435 \u043F\u0443\u0441\u0442\u044B\u043C, \u0447\u0442\u043E\u0431\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\uFFFD\uFFFD\u043D\u0438\u044E.",
  invalidCount: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0446\u0435\u043B\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u043E\u0442 1 \u0434\u043E 50 \u0438\u043B\u0438 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u043E\u043B\u0435 \u043F\u0443\u0441\u0442\u044B\u043C, \u0447\u0442\u043E\u0431\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E."
};
var pt = {
  title: "Pesquisa e obten\xE7\xE3o na web",
  description: "Escolha os provedores usados pela pesquisa na web e pela obten\xE7\xE3o na web.",
  searchSection: "Provedor de pesquisa na web",
  fetchSection: "Provedor de obten\xE7\xE3o na web",
  providerDeepSeek: "DeepSeek Search API",
  providerLegacy: "DeepSeek (legado)",
  legacyKeyHint: "Pedidos do modelo de conta usam a conta conectada; os demais usam esta chave API ({ref}), compartilhada com Modelos por padr\xE3o.",
  maxUses: "M\xE1ximo de pesquisas por pedido",
  maxUsesHint: "M\xE1ximo de pesquisas no servidor por pedido Messages: inteiro positivo, padr\xE3o 5.",
  invalidMaxUses: "Insira um inteiro positivo ou deixe vazio para usar o padr\xE3o.",
  providerLocal: "Obten\xE7\xE3o direta",
  providerDeepSeekFetch: "DeepSeek Fetch API",
  providerMissing: "{id} (n\xE3o carregado)",
  providerAuto: "Autom\xE1tico",
  providersFailed: "N\xE3o foi poss\xEDvel carregar a lista de provedores, por isso este menu pode estar incompleto.",
  retry: "Tentar novamente",
  pluginProviderHint: "Configure este provedor nas configura\xE7\xF5es do pr\xF3prio plugin.",
  credential: "Chave de API",
  baseUrl: "URL base",
  baseUrlHint: "Inclua o prefixo da API. Deixe em branco para usar o endere\xE7o oficial. O provedor anexa {path}.",
  apiKeyUnsetApi: "Nenhuma chave est\xE1 configurada.",
  searchGuide: "Guia de pesquisa e busca",
  searchGuideUrl: "https://api-docs.deepseek.com/guides/search",
  apiKeySet: "Uma chave est\xE1 configurada.",
  count: "Resultados por pesquisa",
  countHint: "Resultados retornados por consulta: um n\xFAmero inteiro de 1 a 50, padr\xE3o 10. Isso controla a contagem de resultados, n\xE3o as chamadas de pesquisa. web_search n\xE3o mant\xE9m mais fontes do que seu pr\xF3prio limite de resultados.",
  overridden: "Substitu\xEDdo",
  reset: "Redefinir para o padr\xE3o",
  readOnly: "Esta implanta\xE7\xE3o armazena configura\xE7\xF5es somente leitura.",
  unavailable: "Este plugin n\xE3o est\xE1 carregado, portanto n\xE3o pode ser configurado agora.",
  save: "Salvar",
  saving: "Salvando\u2026",
  saveFailed: "A implanta\xE7\xE3o n\xE3o aceitou esses valores; eles foram deixados para voc\xEA corrigir.",
  invalidNumber: "Insira um n\xFAmero ou deixe em branco para usar o padr\xE3o.",
  invalidCount: "Insira um n\xFAmero inteiro de 1 a 50 ou deixe em branco para usar o padr\xE3o."
};

// ../../tmp/upstream-src/packages/client/ui-settings-web-search/src/client/WebSearchCard.module.css
var css = "/*\n * Web search and fetch page: two provider sections, each a title and a menu\n * with its hints. Under Search, the DeepSeek Search API shows its result count,\n * and the legacy DeepSeek search its API key, base URL, and searches per\n * request, in a gray panel. The sections are told apart by spacing and the\n * panel; the only hairlines are the settings fields' dividers inside the panel.\n */\n\n.ebPkbG_section {\n  display: flex;\n  flex-direction: column;\n}\n\n.ebPkbG_section + .ebPkbG_section {\n  margin-top: 32px;\n}\n\n.ebPkbG_sectionTitle {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 20px;\n  color: var(--dsw-alias-label-primary);\n}\n\n.ebPkbG_field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 8px 0 12px;\n}\n\n.ebPkbG_selector {\n  display: inline-flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  width: 100%;\n  height: 34px;\n  padding: 0 12px;\n  border: 0.5px solid var(--dsw-alias-border-l4);\n  border-radius: var(--dsw-radius-md);\n  background: var(--dsw-alias-bg-layer-3);\n  font: inherit;\n  font-size: 13px;\n  line-height: 1.5;\n  color: var(--dsw-alias-label-primary);\n  text-align: start;\n  cursor: pointer;\n}\n\n.ebPkbG_selector:focus-visible {\n  outline: none;\n  border-color: var(--dsw-alias-state-business-primary);\n}\n\n.ebPkbG_selector:disabled {\n  color: var(--dsw-alias-label-tertiary);\n  cursor: default;\n}\n\n@media (hover: hover) {\n  .ebPkbG_selector:hover:not(:disabled) {\n    background: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n.ebPkbG_selectorLabel {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ebPkbG_chevron {\n  flex: none;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n/* The gray panel holding a section's settings below its provider menu. */\n.ebPkbG_panel {\n  display: flex;\n  flex-direction: column;\n  padding: 0 16px;\n  border-radius: var(--dsw-radius-md);\n  background: var(--dsw-alias-bg-module-platform);\n}\n\n.ebPkbG_hint {\n  margin: 0;\n  font-size: 12px;\n  line-height: 1.5;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.ebPkbG_notice {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  font-size: 12px;\n  line-height: 1.5;\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.ebPkbG_link {\n  color: var(--dsw-alias-link);\n  text-decoration: none;\n}\n\n@media (hover: hover) {\n  .ebPkbG_link:hover {\n    text-decoration: underline;\n  }\n}\n";
var tagId = "@deepseek-ai/dsh-client-ui-settings-web-search/WebSearchCard.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-web-search";
  tag.dataset.pluginCss = tagId;
  tag.textContent = css;
  document.head.appendChild(tag);
}
var WebSearchCard_default = { "section": "ebPkbG_section", "sectionTitle": "ebPkbG_sectionTitle", "field": "ebPkbG_field", "selector": "ebPkbG_selector", "selectorLabel": "ebPkbG_selectorLabel", "chevron": "ebPkbG_chevron", "panel": "ebPkbG_panel", "hint": "ebPkbG_hint", "notice": "ebPkbG_notice", "link": "ebPkbG_link" };

// ../../tmp/upstream-src/packages/client/ui-settings-web-search/src/client/web-search-card-controller.ts
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var WEB_SEARCH_NS = "web-search-deepseek";
var WEB_API_NS = "web-deepseek-api";
var WEB_NS = "web";
var PROVIDER_IDS = {
  apiSearch: "deepseek-search-api",
  legacySearch: "deepseek-official",
  localFetch: "http",
  apiFetch: "deepseek-fetch-api"
};
var MENU_ORDER = {
  search: [PROVIDER_IDS.apiSearch, PROVIDER_IDS.legacySearch],
  fetch: [PROVIDER_IDS.localFetch, PROVIDER_IDS.apiFetch]
};
var DEFAULT_API_KEY_REF = "DEEPSEEK_API_KEY";
var API_KEY_FIELD = "legacyApiKey";
var WebSearchCardController = class {
  /**
   * @param scopes - the bound settings scopes for the page's namespaces.
   * @param ctx - the page plugin's context, whose `remote.credentials` namespace
   * answers for the credential the legacy key control references, and whose
   * `remote.web` namespace lists the registered providers.
   */
  constructor(scopes, ctx) {
    this.scopes = scopes;
    this.ctx = ctx;
    this.credential = { ref: this.ref(), configured: false, writable: true };
    this.draftRef = this.ref();
    this.savingRef = this.draftRef;
    this.selection = new import_dsh_client_ui_primitives.SettingsFormModel(scopes.web, [
      (0, import_dsh_client_ui_primitives.settingsTextField)("searchProvider"),
      (0, import_dsh_client_ui_primitives.settingsTextField)("fetchProvider")
    ], [{ field: API_KEY_FIELD, write: (text) => this.writeKey(text) }]);
    this.api = new import_dsh_client_ui_primitives.SettingsFormModel(scopes.api, [
      {
        ...(0, import_dsh_client_ui_primitives.settingsNumberField)("count"),
        parse: (text) => {
          if (text.trim() === "") return { kind: "clear" };
          const value = Number(text);
          return Number.isInteger(value) && value >= 1 && value <= 50 ? { kind: "set", value } : void 0;
        }
      }
    ]);
    this.legacy = new import_dsh_client_ui_primitives.SettingsFormModel(scopes.legacy, [
      (0, import_dsh_client_ui_primitives.settingsTextField)("baseURL"),
      { ...(0, import_dsh_client_ui_primitives.settingsNumberField)("maxUses"), parse: (text) => {
        if (text.trim() === "") return { kind: "clear" };
        const value = Number(text);
        return Number.isInteger(value) && value >= 1 ? { kind: "set", value } : void 0;
      } }
    ]);
    this.selectionServed = this.selection.shell().available;
    this.store = (0, import_dsh_client_store.createSnapshotStore)(this.projection());
    this.unsubscribe = [
      ...[this.selection, this.api, this.legacy].map((form) => form.bind(() => form.shell()).subscribe(() => {
        this.publish();
      })),
      ...[scopes.web, scopes.api, scopes.legacy].map((scope) => scope.subscribe(() => {
        this.queueCredentialRead();
      })),
      scopes.web.subscribe(() => {
        const served = this.selection.shell().available;
        if (served && !this.selectionServed) this.refreshProviders();
        this.selectionServed = served;
      })
    ];
    void this.readCredential();
    this.refreshProviders();
  }
  selection;
  api;
  legacy;
  store;
  unsubscribe;
  credential;
  credentialReadQueued = false;
  credentialReadSequence = 0;
  /** Reference the key draft was typed for; read only while that draft is non-empty. */
  draftRef;
  /** The draft reference the running or last selection save writes under. */
  savingRef;
  droppingDraft = false;
  providers;
  providersFailed = false;
  providerReadSequence = 0;
  selectionServed = false;
  disposed = false;
  /**
   * Republish after a form or scope change. A staged selection can hide the
   * key control without any scope publishing; a scope change can rename the
   * reference itself.
   */
  publish() {
    if (this.droppingDraft) return;
    this.dropStaleKeyDraft();
    const ref = this.ref();
    if (ref !== this.credential.ref) {
      this.resetCredentialReference(ref);
      this.queueCredentialRead();
    }
    this.store.set(this.projection());
  }
  /** The provider id a selection field stages. */
  selected(field) {
    return this.selection.field(field).text;
  }
  /**
   * Menu entries for one capability: the registered official providers in
   * {@link MENU_ORDER}, then every other registered provider in Host order,
   * and the selected id when the Host does not register it. Before the list
   * arrives, the menu holds only the selected id.
   */
  options(capability, selected) {
    const registered = this.providers?.[capability];
    if (registered === void 0) return selected === "" ? [] : [{ id: selected, missing: false }];
    const first = MENU_ORDER[capability];
    const ordered = [
      ...first.flatMap((id) => registered.filter((info) => info.id === id)),
      ...registered.filter((info) => !first.includes(info.id))
    ];
    const options = ordered.map((info) => ({
      id: info.id,
      ...info.title === void 0 ? {} : { title: info.title },
      ...info.description === void 0 ? {} : { description: info.description },
      missing: false
    }));
    if (selected !== "" && !registered.some((info) => info.id === selected)) options.push({ id: selected, missing: true });
    return options;
  }
  /** Whether the Host reports `id` as registered, or has not answered yet. */
  registered(capability, id) {
    return this.providers === void 0 || this.providers[capability].some((info) => info.id === id);
  }
  searchKind() {
    const id = this.selected("searchProvider");
    if (id === "" || !this.registered("search", id)) return "none";
    if (id === PROVIDER_IDS.apiSearch) return this.api.shell().available ? "deepseek" : "none";
    if (id === PROVIDER_IDS.legacySearch) return this.legacy.shell().available ? "legacy" : "none";
    return this.providers === void 0 ? "none" : "plugin";
  }
  fetchKind() {
    const id = this.selected("fetchProvider");
    if (id === "" || !this.registered("fetch", id)) return "none";
    if (id === PROVIDER_IDS.localFetch) return "local";
    if (id === PROVIDER_IDS.apiFetch) return this.api.shell().available ? "deepseek" : "none";
    return this.providers === void 0 ? "none" : "plugin";
  }
  /** The reference the key control addresses, from the legacy settings or the default. */
  ref() {
    return this.scopes.legacy.getSnapshot().value?.apiKeyEnv || DEFAULT_API_KEY_REF;
  }
  /** Whether the page shows the key control. */
  keyShown() {
    return this.searchKind() === "legacy";
  }
  /**
   * Drop the key draft once the page no longer shows the control or the
   * control addresses another reference, so a draft is never written under
   * another reference or under one no control shows.
   */
  dropStaleKeyDraft() {
    if (this.selection.field(API_KEY_FIELD).text === "") return;
    if (this.keyShown() && this.draftRef === this.ref()) return;
    this.droppingDraft = true;
    try {
      this.selection.actions().edit(API_KEY_FIELD, "");
    } finally {
      this.droppingDraft = false;
    }
  }
  /**
   * Stage a key draft for the reference the control addresses now.
   * @param text - the draft text.
   */
  editKey(text) {
    if (!this.keyShown()) return;
    this.draftRef = this.ref();
    this.selection.actions().edit(API_KEY_FIELD, text);
  }
  projection() {
    const primary = this.selection.shell();
    const served = [primary, this.api.shell(), this.legacy.shell()].filter((item) => item.available);
    const shell = {
      available: primary.available,
      writable: served.every((item) => item.writable),
      dirty: served.some((item) => item.dirty),
      invalid: served.some((item) => item.invalid),
      saving: served.some((item) => item.saving),
      failed: served.some((item) => item.failed)
    };
    const searchSelected = this.selected("searchProvider");
    const fetchSelected = this.selected("fetchProvider");
    const base = this.scopes.web.getSnapshot().base;
    return {
      ...shell,
      selectionBlocked: shell.invalid || shell.failed,
      providersFailed: this.providersFailed,
      search: {
        selected: searchSelected,
        options: this.options("search", searchSelected),
        kind: this.searchKind(),
        auto: base?.searchProvider === void 0
      },
      fetch: {
        selected: fetchSelected,
        options: this.options("fetch", fetchSelected),
        kind: this.fetchKind(),
        auto: base?.fetchProvider === void 0
      },
      count: this.api.field("count"),
      messagesBaseURL: this.legacy.field("baseURL"),
      maxUses: this.legacy.field("maxUses"),
      legacyKey: this.keyShown() ? { ...this.selection.field(API_KEY_FIELD), ...this.credential } : void 0
    };
  }
  /**
   * Re-read the registered providers. Only the latest read publishes; a failed
   * read keeps the previous list and marks the page's provider list as failed
   * until a later read succeeds.
   */
  refreshProviders() {
    void this.readProviders();
  }
  async readProviders() {
    if (this.disposed) return;
    const sequence = ++this.providerReadSequence;
    const response = await this.ctx.remote.web.listProviders();
    if (this.disposed || sequence !== this.providerReadSequence) return;
    if (response.ok) this.providers = response.value;
    this.providersFailed = !response.ok;
    this.publish();
  }
  /** Clear the old reference's answer and invalidate its pending reads. */
  resetCredentialReference(ref) {
    this.credential = { ref, configured: false, writable: true };
    this.credentialReadSequence++;
  }
  /** Combine settings publications, including connection-reset refreshes, into one credential read. */
  queueCredentialRead() {
    if (this.credentialReadQueued) return;
    this.credentialReadQueued = true;
    queueMicrotask(() => {
      this.credentialReadQueued = false;
      void this.readCredential();
    });
  }
  /**
   * Ask the credentials domain about the reference the key control currently names.
   *
   * Only the latest read publishes its answer, and only while its reference
   * is unchanged. A write's readback retains its own result even if
   * another read starts or the reference changes.
   * @param written - a reference a save just wrote, asked about in the same read.
   * @returns the answer by reference, or undefined after failure or disposal.
   */
  async readCredential(written) {
    if (this.disposed) return;
    const ref = this.ref();
    if (ref !== this.credential.ref) {
      this.resetCredentialReference(ref);
      this.store.set(this.projection());
    }
    const sequence = ++this.credentialReadSequence;
    const names = [.../* @__PURE__ */ new Set([ref, ...written === void 0 ? [] : [written]])];
    const response = await this.ctx.remote.credentials.describe(names);
    if (this.disposed || !response.ok) return;
    const views = response.value;
    if (sequence !== this.credentialReadSequence) return views;
    if (ref !== this.ref()) {
      this.publish();
      return views;
    }
    const view = views[ref];
    const next = { ref, configured: view?.configured ?? false, writable: view?.writable ?? true };
    if (next.configured !== this.credential.configured || next.writable !== this.credential.writable) {
      this.credential = next;
      this.publish();
    }
    return views;
  }
  /**
   * Re-read after the Host reports a change to the reference this page watches.
   *
   * A key can be written from somewhere else — the Models page addresses the
   * same reference — and no settings section changes when it is, so without
   * this the badge keeps reporting a state the Host already replaced.
   * @param ref - the reference the Host reports as changed.
   */
  refreshCredential(ref) {
    if (ref !== this.credential.ref) return;
    void this.readCredential();
  }
  /**
   * Build the face the page's slot registration injects.
   * @returns the page's snapshot and its form actions.
   */
  inject() {
    return {
      hooks: { webSearchCard: this.store },
      edit: (field, text) => {
        if (field === "legacyApiKey") {
          this.editKey(text);
          return;
        }
        if (field === "messagesBaseURL" || field === "maxUses") {
          this.legacy.actions().edit(field === "messagesBaseURL" ? "baseURL" : field, text);
          return;
        }
        this.api.actions().edit(field, text);
      },
      resetField: (field) => {
        const form = field === "messagesBaseURL" || field === "maxUses" ? this.legacy : this.api;
        form.actions().resetField(field === "messagesBaseURL" ? "baseURL" : field);
      },
      selectProvider: (field, id) => {
        this.select(field, id);
      },
      retryProviders: () => {
        this.refreshProviders();
      },
      resolveText: (text) => this.ctx.locale.resolveText(text),
      save: () => {
        void this.save();
      },
      discard: () => {
        for (const form of [this.selection, this.api, this.legacy]) form.actions().discard();
      }
    };
  }
  /**
   * Stage one provider selection. Automatic selection and a target equal to
   * the composed value clear the override, so the deployment default keeps
   * applying.
   * @param field - the selection field.
   * @param id - the provider id to select, or the empty string for automatic selection.
   */
  select(field, id) {
    const composed = this.scopes.web.getSnapshot().base?.[field];
    if (id === "" || composed === id) this.selection.actions().resetField(field);
    else this.selection.actions().edit(field, id);
  }
  /**
   * Save the API section before the selection, so a selection takes effect
   * only after the settings it uses have landed. A refused section stops the
   * selection from saving and keeps every remaining draft for correction. The
   * key draft's reference is fixed when the selection save plans its writes,
   * so a provider change during the save does not redirect a key the save
   * already planned.
   * @returns settlement after every attempted write.
   */
  async save() {
    const state = this.projection();
    if (!state.available || state.invalid || state.saving) return;
    for (const form of [this.api, this.legacy]) {
      if (!form.shell().available || !form.shell().dirty) continue;
      await form.save();
      if (form.shell().failed) return;
    }
    if (!this.selection.shell().dirty) return;
    this.savingRef = this.draftRef;
    await this.selection.save();
  }
  /**
   * Write the staged key under the reference its draft belonged to when the
   * save started, then re-read whether the Host now holds it.
   * @param value - the staged credential literal.
   * @returns whether the Host reports a configured credential afterwards.
   */
  async writeKey(value) {
    const ref = this.savingRef;
    await this.ctx.remote.credentials.set(ref, value);
    return (await this.readCredential(ref))?.[ref]?.configured ?? false;
  }
  /** Release subscriptions and prevent queued reads or late answers from publishing. */
  dispose() {
    this.disposed = true;
    for (const off of this.unsubscribe) off();
    for (const form of [this.selection, this.api, this.legacy]) form.dispose();
  }
};

// ../../tmp/upstream-src/packages/client/ui-settings-web-search/src/client/WebSearchCard.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PROVIDER_LABELS = {
  [PROVIDER_IDS.apiSearch]: "providerDeepSeek",
  [PROVIDER_IDS.legacySearch]: "providerLegacy",
  [PROVIDER_IDS.localFetch]: "providerLocal",
  [PROVIDER_IDS.apiFetch]: "providerDeepSeekFetch"
};
function providerLabel(t, option) {
  const key = PROVIDER_LABELS[option.id];
  const name = key === void 0 ? option.title ?? option.id : t(key);
  return option.missing ? t("providerMissing", { id: name }) : name;
}
function WebSearchCard(props) {
  const { t } = props;
  const state = props.useWebSearchCard((snapshot) => snapshot);
  if (props.view === "summary") return t("description");
  const disabled = !state.writable || state.saving;
  const menuDisabled = disabled || state.selectionBlocked;
  const { search, fetch } = state;
  const describe = (section) => {
    const description = section.options.find((option) => option.id === section.selected)?.description;
    return description === void 0 ? void 0 : props.resolveText(description) || void 0;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_dsh_client_ui_primitives2.SettingsForm, { labels: formLabels(t), state, onSave: props.save, onDiscard: props.discard, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: WebSearchCard_default.section, "aria-labelledby": "plugin-config-web-search-section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { id: "plugin-config-web-search-section", className: WebSearchCard_default.sectionTitle, children: t("searchSection") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ProviderSelect,
        {
          id: "plugin-config-web-search-provider",
          labelledBy: "plugin-config-web-search-section",
          t,
          section: search,
          disabled: menuDisabled,
          field: "searchProvider",
          onSelect: props.selectProvider,
          providersFailed: state.providersFailed,
          onRetry: props.retryProviders,
          description: describe(search),
          hint: search.kind === "deepseek" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { className: WebSearchCard_default.link, href: t("searchGuideUrl"), target: "_blank", rel: "noopener noreferrer", children: t("searchGuide") }) : search.kind === "plugin" ? t("pluginProviderHint") : void 0
        }
      ),
      search.kind === "deepseek" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: WebSearchCard_default.panel, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives2.SettingsValueField,
        {
          id: "plugin-config-web-search-count",
          label: t("count"),
          hint: t("countHint"),
          numeric: true,
          overriddenLabel: t("overridden"),
          resetLabel: t("reset"),
          invalidLabel: t("invalidCount"),
          disabled,
          ...state.count,
          onEdit: (text) => {
            props.edit("count", text);
          },
          onReset: () => {
            props.resetField("count");
          }
        }
      ) }),
      search.kind === "legacy" && state.legacyKey !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: WebSearchCard_default.panel, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_dsh_client_ui_primitives2.SettingsSecretField,
          {
            id: "plugin-config-web-search-key",
            label: t("credential"),
            hint: t("legacyKeyHint", { ref: state.legacyKey.ref }),
            disabled: !state.legacyKey.writable || state.saving,
            text: state.legacyKey.text,
            configured: state.legacyKey.configured,
            stateLabel: state.legacyKey.configured ? t("apiKeySet") : t("apiKeyUnsetApi"),
            onEdit: (text) => {
              props.edit("legacyApiKey", text);
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_dsh_client_ui_primitives2.SettingsValueField,
          {
            id: "plugin-config-web-search-endpoint",
            label: t("baseUrl"),
            hint: t("baseUrlHint", { path: "/messages" }),
            overriddenLabel: t("overridden"),
            resetLabel: t("reset"),
            invalidLabel: t("invalidNumber"),
            disabled,
            ...state.messagesBaseURL,
            onEdit: (text) => {
              props.edit("messagesBaseURL", text);
            },
            onReset: () => {
              props.resetField("messagesBaseURL");
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_dsh_client_ui_primitives2.SettingsValueField,
          {
            id: "plugin-config-web-search-max-uses",
            label: t("maxUses"),
            hint: t("maxUsesHint"),
            numeric: true,
            overriddenLabel: t("overridden"),
            resetLabel: t("reset"),
            invalidLabel: t("invalidMaxUses"),
            disabled,
            ...state.maxUses,
            onEdit: (text) => {
              props.edit("maxUses", text);
            },
            onReset: () => {
              props.resetField("maxUses");
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: WebSearchCard_default.section, "aria-labelledby": "plugin-config-web-fetch-section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { id: "plugin-config-web-fetch-section", className: WebSearchCard_default.sectionTitle, children: t("fetchSection") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ProviderSelect,
        {
          id: "plugin-config-web-fetch-provider",
          labelledBy: "plugin-config-web-fetch-section",
          t,
          section: fetch,
          disabled: menuDisabled,
          field: "fetchProvider",
          onSelect: props.selectProvider,
          providersFailed: state.providersFailed,
          onRetry: props.retryProviders,
          description: describe(fetch),
          hint: fetch.kind === "plugin" ? t("pluginProviderHint") : void 0
        }
      )
    ] })
  ] });
}
var AUTO_ID = "";
function Dropdown(props) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const trigger = (0, import_react.useRef)(null);
  const shown = open && !props.disabled;
  const valueId = `${props.id}-value`;
  const anchor = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      ref: trigger,
      id: props.id,
      type: "button",
      className: WebSearchCard_default.selector,
      "aria-haspopup": "menu",
      "aria-expanded": shown,
      "aria-labelledby": `${props.labelledBy} ${valueId}`,
      disabled: props.disabled,
      onClick: () => {
        setOpen((value) => !value);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { id: valueId, className: WebSearchCard_default.selectorLabel, children: props.valueLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives2.IconChevronDownOutlineRegular, { className: WebSearchCard_default.chevron })
      ]
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_dsh_client_ui_primitives2.Menu,
    {
      open: shown,
      onClose: () => {
        setOpen(false);
      },
      items: props.items,
      selectedId: props.selectedId,
      onSelect: (id) => {
        trigger.current?.focus({ preventScroll: true });
        setOpen(false);
        if (id !== props.selectedId) props.onSelect(id);
      },
      portal: true,
      autoFocus: true,
      minWidthFromAnchor: true,
      anchor
    }
  );
}
function ReadFailure(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: WebSearchCard_default.notice, role: "status", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: props.message }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "outline", size: "sm", onClick: props.onRetry, children: props.retry })
  ] });
}
function ProviderSelect(props) {
  const { t, section } = props;
  const current = section.options.find((option) => option.id === section.selected);
  const items = [
    ...section.auto ? [{ id: AUTO_ID, label: t("providerAuto") }] : [],
    ...section.options.map((option) => ({ id: option.id, label: providerLabel(t, option) }))
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: WebSearchCard_default.field, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Dropdown,
      {
        id: props.id,
        labelledBy: props.labelledBy,
        items,
        selectedId: section.selected,
        valueLabel: current === void 0 ? t("providerAuto") : providerLabel(t, current),
        disabled: props.disabled,
        onSelect: (id) => {
          props.onSelect(props.field, id);
        }
      }
    ),
    props.description !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: WebSearchCard_default.hint, children: props.description }),
    props.hint !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: WebSearchCard_default.hint, children: props.hint }),
    props.providersFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadFailure, { message: t("providersFailed"), retry: t("retry"), onRetry: props.onRetry })
  ] });
}

// ../../tmp/upstream-src/packages/client/ui-settings-web-search/src/client/index.ts
var NS = "settings.webSearch";
var inject = ["slots", "locale", "remote", "remote.credentials", "remote.web", "configForms"];
function apply(ctx) {
  const t = ctx.locale.bind(NS);
  ctx.effect(() => ctx.locale.register(NS, { zh, en, ja, es, fr, de, ru, pt }), "ui-settings-web-search: dictionaries");
  const card = new WebSearchCardController({
    web: ctx.configForms.get(WEB_NS),
    api: ctx.configForms.get(WEB_API_NS),
    legacy: ctx.configForms.get(WEB_SEARCH_NS)
  }, ctx);
  ctx.effect(() => () => {
    card.dispose();
  }, "ui-settings-web-search: form subscription");
  ctx.effect(
    () => ctx.remote.$on("credentials/reference-updated", (ref) => {
      card.refreshCredential(ref);
    }),
    "ui-settings-web-search: credential invalidations"
  );
  ctx.effect(() => {
    const disposers = [
      ctx.remote.$on("web/providers-changed", () => {
        card.refreshProviders();
      }),
      ctx.on("connection/reset", () => {
        card.refreshProviders();
      })
    ];
    return () => {
      for (const dispose of disposers) dispose();
    };
  }, "ui-settings-web-search: provider invalidations");
  ctx.effect(() => ctx.configForms.whileServed([WEB_NS], () => ctx.slots.inject("plugins.item", () => ctx.slots.register({
    name: "plugins.item",
    id: "web-search",
    order: 20,
    label: () => t("title"),
    locale: NS,
    inject: () => card.inject()
  }, WebSearchCard))), "ui-settings-web-search: page");
}

		return module.exports;
	}
});
