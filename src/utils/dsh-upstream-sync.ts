import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { buildLuminexCanvasRuntimeCode, buildLuminexPresetCss } from './luminex-theme.ts';

const WEB_SEARCH_LOCALES: Record<string, { meta: { title: string; description?: string } }> = {
  'de.json': {
    meta: {
      title: 'Einstellungen für Websuche und Webabruf',
      description:
        'Wählen Sie die Anbieter für Websuche und Webabruf und konfigurieren Sie Schlüssel, Dienstadresse und Limits der DeepSeek-Anbieter.',
    },
  },
  'en.json': {
    meta: {
      title: 'ui-settings-web-search',
    },
  },
  'es.json': {
    meta: {
      title: 'Configuración de búsqueda y obtención web',
      description:
        'Elija los proveedores de búsqueda y obtención web y configure la clave, la dirección del servicio y los límites de los proveedores DeepSeek.',
    },
  },
  'fr.json': {
    meta: {
      title: 'Paramètres de recherche et de récupération web',
      description:
        "Choisissez les fournisseurs de recherche et de récupération web, et configurez la clé, l'adresse du service et les limites des fournisseurs DeepSeek.",
    },
  },
  'ja.json': {
    meta: {
      title: 'Web 検索と取得の設定',
      description:
        'Web 検索と Web 取得のプロバイダーを選択し、DeepSeek プロバイダーのキー、サービスアドレス、上限を設定します。',
    },
  },
  'pt.json': {
    meta: {
      title: 'Configurações de pesquisa e obtenção na web',
      description:
        'Escolha os provedores de pesquisa e obtenção na web e configure a chave, o endereço do serviço e os limites dos provedores DeepSeek.',
    },
  },
  'ru.json': {
    meta: {
      title: 'Настройки веб-поиска и загрузки',
      description:
        'Выберите поставщиков веб-поиска и загрузки и настройте ключ, адрес службы и ограничения поставщиков DeepSeek.',
    },
  },
  'zh.json': {
    meta: {
      title: '网页搜索与获取设置',
      description: '选择网页搜索与网页获取的提供方，并配置 DeepSeek 提供方的密钥、服务地址和上限。',
    },
  },
};

const MCP_MANAGER_LOCALES: Record<string, { meta: { title: string; description: string } }> = {
  'de.json': {
    meta: {
      title: 'MCP-Serververwaltung',
      description:
        'Verwaltet die MCP-Server, die in den Einstellungen konfiguriert oder von Plugins registriert wurden, und meldet ihren Verbindungsstatus.',
    },
  },
  'en.json': {
    meta: {
      title: 'MCP server manager',
      description:
        'Manage the MCP servers configured in Settings or registered by plugins, and report their connection status.',
    },
  },
  'es.json': {
    meta: {
      title: 'Administrador de servidores MCP',
      description:
        'Administra los servidores MCP configurados en Configuración o registrados por complementos e informa su estado de conexión.',
    },
  },
  'fr.json': {
    meta: {
      title: 'Gestionnaire de serveurs MCP',
      description:
        'Gère les serveurs MCP configurés dans les Paramètres ou enregistrés par des plugins, et indique leur état de connexion.',
    },
  },
  'ja.json': {
    meta: {
      title: 'MCP サーバー管理',
      description:
        '設定で構成した MCP サーバーとプラグインが登録した MCP サーバーを管理し、その接続状態を報告します。',
    },
  },
  'pt.json': {
    meta: {
      title: 'Gerenciador de servidores MCP',
      description:
        'Gerencia os servidores MCP configurados em Configurações ou registrados por plugins e informa o status da conexão deles.',
    },
  },
  'ru.json': {
    meta: {
      title: 'Управление MCP-серверами',
      description:
        'Управляет MCP-серверами, настроенными в «Настройках» или зарегистрированными плагинами, и сообщает их состояние подключения.',
    },
  },
  'zh.json': {
    meta: {
      title: 'MCP 服务器管理',
      description: '管理在设置中配置或由插件注册的 MCP 服务器，并报告它们的连接状态。',
    },
  },
};

const WEB_REMOTE_SPEC_CODE = `{
\tpackage: "@deepseek-ai/dsh-web",
\tmethods: {
\t\t"web/listProviders": {
\t\t\tservice: "web",
\t\t\tdescription: "List every registered search and fetch provider with its localized description.",
\t\t\tinvocation: { kind: "direct" },
\t\t\tparameters: [],
\t\t\tresult: {
\t\t\t\tmode: "strict",
\t\t\t\ttypeSymbol: "@deepseek-ai/dsh-web/types#WebProviderCatalog",
\t\t\t\tcreate: () => z.object({
\t\t\t\t\tsearch: z.array(z.object({ id: z.string(), description: z.record(z.string(), z.string()) })),
\t\t\t\t\tfetch: z.array(z.object({ id: z.string(), description: z.record(z.string(), z.string()) }))
\t\t\t\t}),
\t\t\t\tjsonSchema: { type: "object" }
\t\t\t}
\t\t}
\t}
}`;

const WEB_TYPERT_HOST_JS = `import { z } from "zod";
import { createTypertRemoteInfo } from "@deepseek-ai/dsh-typert-protocol/remote-info";

const $remote = createTypertRemoteInfo(${WEB_REMOTE_SPEC_CODE}, z);

export const TYPERT = {
\tpackage: "@deepseek-ai/dsh-web",
\tface: "host",
\tschemas: [],
\tget invocations() { return $remote.descriptors; },
\tmodel: { services: [], events: [], objects: [] }
};
`;

const WEB_TYPERT_REMOTE_CLIENT_JS = `import { z } from "zod";
import { createTypertRemoteInfo } from "@deepseek-ai/dsh-typert-protocol/remote-info";

export const TYPERT_REMOTE = createTypertRemoteInfo(${WEB_REMOTE_SPEC_CODE}, z);
export default TYPERT_REMOTE;
`;

const MCP_MANAGER_REMOTE_SPEC_CODE = `{
\tpackage: "@deepseek-ai/dsh-mcp-manager",
\tmethods: {
\t\t"mcpManager/watch": {
\t\t\tservice: "mcpManager",
\t\t\tdescription: "Yield the current MCP status snapshot, then every change until cancellation.",
\t\t\tmode: "stream",
\t\t\tinvocation: { kind: "direct" },
\t\t\tparameters: [],
\t\t\tcancellation: { parameter: "signal" },
\t\t\tresult: {
\t\t\t\tmode: "strict",
\t\t\t\ttypeSymbol: "@deepseek-ai/dsh-mcp-manager/types#McpStatusSnapshot",
\t\t\t\tcreate: () => z.object({ servers: z.array(z.any()) }),
\t\t\t\tjsonSchema: { type: "object" }
\t\t\t}
\t\t},
\t\t"mcpManager/restart": {
\t\t\tservice: "mcpManager",
\t\t\tdescription: "Restart a configured or plugin-contributed MCP server by name.",
\t\t\tinvocation: { kind: "direct" },
\t\t\tparameters: [
\t\t\t\t{
\t\t\t\t\tname: "name",
\t\t\t\t\tsource: "json",
\t\t\t\t\tcodec: {
\t\t\t\t\t\tmode: "strict",
\t\t\t\t\t\ttypeSymbol: "@deepseek-ai/dsh-mcp-manager#mcpManager/restart:name",
\t\t\t\t\t\tcreate: () => z.string(),
\t\t\t\t\t\tjsonSchema: { type: "string" }
\t\t\t\t\t},
\t\t\t\t\tstrictCodec: {
\t\t\t\t\t\tmode: "strict",
\t\t\t\t\t\ttypeSymbol: "@deepseek-ai/dsh-mcp-manager#mcpManager/restart:name",
\t\t\t\t\t\tcreate: () => z.string(),
\t\t\t\t\t\tjsonSchema: { type: "string" }
\t\t\t\t\t}
\t\t\t\t}
\t\t\t],
\t\t\tcancellation: { parameter: "signal" },
\t\t\tresult: {
\t\t\t\tmode: "strict",
\t\t\t\ttypeSymbol: "@deepseek-ai/dsh-mcp-manager/types#McpServerDiagnostic",
\t\t\t\tcreate: () => z.any(),
\t\t\t\tjsonSchema: { type: "object" }
\t\t\t}
\t\t},
\t\t"mcpManager/probe": {
\t\t\tservice: "mcpManager",
\t\t\tdescription: "Probe a server configuration without writing Settings or mounting a plugin.",
\t\t\timplementation: "probeFromClient",
\t\t\tinvocation: { kind: "direct" },
\t\t\tparameters: [
\t\t\t\t{
\t\t\t\t\tname: "request",
\t\t\t\t\tsource: "json",
\t\t\t\t\tcodec: {
\t\t\t\t\t\tmode: "strict",
\t\t\t\t\t\ttypeSymbol: "@deepseek-ai/dsh-mcp-manager/types#McpProbeRequest",
\t\t\t\t\t\tcreate: () => z.any(),
\t\t\t\t\t\tjsonSchema: { type: "object" }
\t\t\t\t\t},
\t\t\t\t\tstrictCodec: {
\t\t\t\t\t\tmode: "strict",
\t\t\t\t\t\ttypeSymbol: "@deepseek-ai/dsh-mcp-manager/types#McpProbeRequest",
\t\t\t\t\t\tcreate: () => z.any(),
\t\t\t\t\t\tjsonSchema: { type: "object" }
\t\t\t\t\t}
\t\t\t\t}
\t\t\t],
\t\t\tcancellation: { parameter: "signal" },
\t\t\tresult: {
\t\t\t\tmode: "strict",
\t\t\t\ttypeSymbol: "@deepseek-ai/dsh-mcp-manager/types#McpProbeResult",
\t\t\t\tcreate: () => z.any(),
\t\t\t\tjsonSchema: { type: "object" }
\t\t\t}
\t\t}
\t}
}`;

const MCP_MANAGER_TYPERT_HOST_JS = `import { z } from "zod";
import { createTypertRemoteInfo } from "@deepseek-ai/dsh-typert-protocol/remote-info";

const $remote = createTypertRemoteInfo(${MCP_MANAGER_REMOTE_SPEC_CODE}, z);

export const TYPERT = {
\tpackage: "@deepseek-ai/dsh-mcp-manager",
\tface: "host",
\tschemas: [],
\tget invocations() { return $remote.descriptors; },
\tmodel: { services: [], events: [], objects: [] }
};
`;

const MCP_MANAGER_TYPERT_REMOTE_CLIENT_JS = `import { z } from "zod";
import { createTypertRemoteInfo } from "@deepseek-ai/dsh-typert-protocol/remote-info";

export const TYPERT_REMOTE = createTypertRemoteInfo(${MCP_MANAGER_REMOTE_SPEC_CODE}, z);
export default TYPERT_REMOTE;
`;

const INSTALLED_BIN_JS = `#!/usr/bin/env node
/**
 * Installed CLI entry for disk launchers and embedded runtimes.
 * @module @deepseek-ai/dsh/installed-bin
 */
import { realpathSync } from "node:fs";
import { pathToFileURL } from "node:url";

/**
 * Run the CLI in the importing carrier's module tree.
 * @param options - Installation-owned runtime options.
 * @returns Settlement of the selected command.
 */
export async function runCli(options) {
\tconst cli = await import("./bin.js");
\tawait cli.runCli(options);
}

if (import.meta.main) {
\tconst entry = process.platform === "win32" ? pathToFileURL(realpathSync.native(import.meta.filename)).href : import.meta.url;
\tif (entry === import.meta.url) await runCli();
\telse {
\t\tconst canonical = await import(entry);
\t\tawait canonical.runCli();
\t}
}
`;

/**
 * Synchronizes the 5 upstream DeepSeek Harness commits from `0.2.2-alpha.3` -> `master` HEAD (`8bd0733`):
 * 1. Web Search & Fetch Settings Split (#7565)
 * 2. SDK Team Mode (#7773)
 * 3. MCP Manager Core (#3372)
 * 4. Desktop Update Channels (#7495) & Windows CLI 8.3 Short-Path Recovery (#7709)
 * 5. Cordis & Vendor Dependency Upgrades (#7790)
 */
export function applyDshUpstreamSync(rootDir = process.cwd()): void {
  const assetsDir = path.resolve(rootDir, 'src/utils/upstream-sync-assets');
  const nmScopeDir = path.join(rootDir, 'node_modules/@deepseek-ai');
  if (!fs.existsSync(nmScopeDir) || !fs.existsSync(assetsDir)) return;

  // =========================================================================
  // 1. Web Search & Fetch Settings Split (#7565)
  // =========================================================================
  const dshBasePatchPath = path.join(nmScopeDir, 'dsh-base/cordis.patch.yml');
  if (fs.existsSync(dshBasePatchPath)) {
    const raw = fs.readFileSync(dshBasePatchPath, 'utf8');
    if (raw.includes('searchProvider: deepseek-official')) {
      fs.writeFileSync(
        dshBasePatchPath,
        raw.replace('searchProvider: deepseek-official', 'searchProvider: deepseek-search-api'),
        'utf8',
      );
    }
  }

  const dshWebDir = path.join(nmScopeDir, 'dsh-web');
  const dshWebAssetPath = path.join(assetsDir, 'dsh-web-index.js');
  if (fs.existsSync(dshWebDir) && fs.existsSync(dshWebAssetPath)) {
    fs.copyFileSync(dshWebAssetPath, path.join(dshWebDir, 'lib/index.js'));
    fs.writeFileSync(path.join(dshWebDir, 'lib/typert.host.js'), WEB_TYPERT_HOST_JS, 'utf8');
    fs.writeFileSync(
      path.join(dshWebDir, 'lib/typert.remote-client.js'),
      WEB_TYPERT_REMOTE_CLIENT_JS,
      'utf8',
    );
    const pkgPath = path.join(dshWebDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      pkg.exports = {
        ...pkg.exports,
        '.': {
          types: './lib/types/index.d.ts',
          default: './lib/index.js',
        },
        './typert': {
          default: './lib/typert.host.js',
        },
        './remote': {
          default: './lib/typert.remote-client.js',
        },
      };
      if (!pkg.dependencies?.['@deepseek-ai/dsh-typert']) {
        pkg.dependencies = {
          ...pkg.dependencies,
          '@deepseek-ai/dsh-typert': '0.2.2-rc.3',
        };
      }
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    }
  }

  // Patch localized provider descriptions on web provider packages
  const webDeepSeekApiIndex = path.join(nmScopeDir, 'dsh-web-deepseek-api/lib/index.js');
  if (fs.existsSync(webDeepSeekApiIndex)) {
    let code = fs.readFileSync(webDeepSeekApiIndex, 'utf8');
    if (!code.includes('SEARCH_PROVIDER_DESCRIPTION')) {
      const descDecls = `const SEARCH_PROVIDER_DESCRIPTION = {
\ten: "Search the web with DeepSeek Search API",
\tzh: "使用 DeepSeek 搜索 API 搜索网页",
\tja: "DeepSeek 検索 API でウェブを検索します",
\tes: "Buscar en la web con la API de búsqueda de DeepSeek",
\tfr: "Rechercher sur le Web avec l’API de recherche DeepSeek",
\tde: "Mit der DeepSeek-Such-API im Web suchen",
\tru: "Искать в интернете через API поиска DeepSeek",
\tpt: "Pesquisar na web com a API de pesquisa DeepSeek"
};
const FETCH_PROVIDER_DESCRIPTION = {
\ten: "Fetch and extract web pages with DeepSeek Fetch API",
\tzh: "使用 DeepSeek 网页读取 API 获取并提取网页内容",
\tja: "DeepSeek 取得 API でウェブページを取得して抽出します",
\tes: "Obtener y extraer páginas web con la API de obtención de DeepSeek",
\tfr: "Récupérer et extraire des pages Web avec l’API de récupération DeepSeek",
\tde: "Webseiten mit der DeepSeek-Abruf-API abrufen und extrahieren",
\tru: "Получать и извлекать веб-страницы через API загрузки DeepSeek",
\tpt: "Buscar e extrair páginas da web com a API de obtenção DeepSeek"
};
`;
      code = code.replace(
        'function apply(ctx, config) {',
        descDecls + 'function apply(ctx, config) {',
      );
      code = code.replace(
        'ctx.web.registerSearchProvider({\n\t\tid: searchApi.id,',
        'ctx.web.registerSearchProvider({\n\t\tid: searchApi.id,\n\t\tdescription: SEARCH_PROVIDER_DESCRIPTION,',
      );
      code = code.replace(
        'ctx.web.registerFetchProvider({\n\t\tid: fetchApi.id,',
        'ctx.web.registerFetchProvider({\n\t\tid: fetchApi.id,\n\t\tdescription: FETCH_PROVIDER_DESCRIPTION,',
      );
      fs.writeFileSync(webDeepSeekApiIndex, code, 'utf8');
    }
  }

  const webFetchHttpIndex = path.join(nmScopeDir, 'dsh-web-fetch-http/lib/index.js');
  if (fs.existsSync(webFetchHttpIndex)) {
    let code = fs.readFileSync(webFetchHttpIndex, 'utf8');
    if (!code.includes('LOCAL_FETCH_PROVIDER_DESCRIPTION')) {
      const descDecl = `const LOCAL_FETCH_PROVIDER_DESCRIPTION = {
\ten: "Fetch HTTP(S) URLs directly from this machine",
\tzh: "直接从本机请求 HTTP(S) 网页",
\tja: "このマシンから直接 HTTP(S) URL を取得します",
\tes: "Obtener URL HTTP(S) directamente desde este equipo",
\tfr: "Récupérer les URL HTTP(S) directement depuis cette machine",
\tde: "HTTP(S)-URLs direkt von diesem Gerät abrufen",
\tru: "Загружать URL-адреса HTTP(S) напрямую с этого компьютера",
\tpt: "Buscar URLs HTTP(S) diretamente desta máquina"
};
`;
      code = code.replace(
        'var HttpFetchProvider = class {',
        descDecl +
          'var HttpFetchProvider = class {\n\tdescription = LOCAL_FETCH_PROVIDER_DESCRIPTION;',
      );
      fs.writeFileSync(webFetchHttpIndex, code, 'utf8');
    }
  }

  const webSearchDeepSeekIndex = path.join(nmScopeDir, 'dsh-web-search-deepseek/lib/index.js');
  if (fs.existsSync(webSearchDeepSeekIndex)) {
    let code = fs.readFileSync(webSearchDeepSeekIndex, 'utf8');
    if (!code.includes('DEEPSEEK_PROVIDER_DESCRIPTION')) {
      const descDecl = `const DEEPSEEK_PROVIDER_DESCRIPTION = {
\ten: "Search the web via DeepSeek API with built-in search grounding",
\tzh: "通过带内置搜索能力的 DeepSeek API 搜索网页",
\tja: "検索グラウンディング内蔵の DeepSeek API でウェブを検索します",
\tes: "Buscar en la web mediante la API de DeepSeek con búsqueda integrada",
\tfr: "Rechercher sur le Web via l’API DeepSeek avec recherche intégrée",
\tde: "Mit der DeepSeek-API mit integrierter Websuche suchen",
\tru: "Искать в интернете через API DeepSeek со встроенным поиском",
\tpt: "Pesquisar na web via API DeepSeek com pesquisa integrada"
};
`;
      code = code.replace(
        'function apply(ctx, config) {',
        descDecl + 'function apply(ctx, config) {',
      );
      code = code.replace(
        'ctx.web.registerSearchProvider({\n\t\tid: provider.id,',
        'ctx.web.registerSearchProvider({\n\t\tid: provider.id,\n\t\tdescription: DEEPSEEK_PROVIDER_DESCRIPTION,',
      );
      fs.writeFileSync(webSearchDeepSeekIndex, code, 'utf8');
    }
  }

  const uiSettingsWebSearchDir = path.join(nmScopeDir, 'dsh-client-ui-settings-web-search');
  const uiSettingsWebSearchAsset = path.join(assetsDir, 'ui-settings-web-search-client.js');
  if (fs.existsSync(uiSettingsWebSearchDir) && fs.existsSync(uiSettingsWebSearchAsset)) {
    fs.copyFileSync(uiSettingsWebSearchAsset, path.join(uiSettingsWebSearchDir, 'lib/client.js'));
    const localeDir = path.join(uiSettingsWebSearchDir, 'locale');
    fs.mkdirSync(localeDir, { recursive: true });
    for (const [fileName, data] of Object.entries(WEB_SEARCH_LOCALES)) {
      fs.writeFileSync(path.join(localeDir, fileName), JSON.stringify(data, null, 2) + '\n', 'utf8');
    }
  }

  // =========================================================================
  // 1b. Session-stats pills: always show the full reading on hover.
  // Upstream gates the pill tooltip behind onlyWhenClipped (ellipsis), which
  // hides the hover reading entirely when the label fits — restore it.
  // Handles both the formatted (rc.1) and minified (rc.3+) bundle shapes.
  // =========================================================================
  const chatClientPath = path.join(nmScopeDir, 'dsh-client-ui-chat/lib/client.js');
  if (fs.existsSync(chatClientPath)) {
    let code = fs.readFileSync(chatClientPath, 'utf8');
    if (code.includes('onlyWhenClipped: true')) {
      code = code.replace('onlyWhenClipped: true', 'onlyWhenClipped: false');
      fs.writeFileSync(chatClientPath, code, 'utf8');
    } else if (code.includes('onlyWhenClipped:true') && !code.includes('onlyWhenClipped:false')) {
      code = code.replace('onlyWhenClipped:true', 'onlyWhenClipped:false');
      fs.writeFileSync(chatClientPath, code, 'utf8');
    }
  }

  // =========================================================================
  // 1c. Luminex presets in the stock theme picker (settings → appearance):
  // register preset-1/2/3 in BUILTIN_THEMES, append appearance cubes, and add
  // the zh/en labels — so the rc.1 theme choices are selectable again.
  // =========================================================================
  const themeClientPath = path.join(nmScopeDir, 'dsh-client-ui-theme/lib/client.js');
  if (fs.existsSync(themeClientPath)) {
    let code = fs.readFileSync(themeClientPath, 'utf8');
    let changed = false;
    if (!code.includes('id:`preset-1`')) {
      const builtinAnchor =
        'Object.freeze({id:`dark`,colorScheme:`dark`,tokens:Object.freeze({})})]);';
      if (code.includes(builtinAnchor)) {
        code = code.replace(
          builtinAnchor,
          'Object.freeze({id:`dark`,colorScheme:`dark`,tokens:Object.freeze({})}),' +
            'Object.freeze({id:`preset-1`,colorScheme:`dark`,tokens:Object.freeze({})}),' +
            'Object.freeze({id:`preset-2`,colorScheme:`light`,tokens:Object.freeze({})}),' +
            'Object.freeze({id:`preset-3`,colorScheme:`light`,tokens:Object.freeze({})})]);',
        );
        changed = true;
      }
      const cubesAnchor =
        '{id:`system`,labelKey:`appearance.system`,Icon:_deepseek_ai_dsh_client_ui_primitives.IconFollowsystemOutlineMedium}];';
      if (code.includes(cubesAnchor)) {
        code = code.replace(
          cubesAnchor,
          '{id:`system`,labelKey:`appearance.system`,Icon:_deepseek_ai_dsh_client_ui_primitives.IconFollowsystemOutlineMedium},' +
            '{id:`preset-1`,labelKey:`appearance.preset1`,Icon:_deepseek_ai_dsh_client_ui_primitives.IconDarkOutlineMedium},' +
            '{id:`preset-2`,labelKey:`appearance.preset2`,Icon:_deepseek_ai_dsh_client_ui_primitives.IconLightOutlineMedium},' +
            '{id:`preset-3`,labelKey:`appearance.preset3`,Icon:_deepseek_ai_dsh_client_ui_primitives.IconFollowsystemOutlineMedium}];',
        );
        changed = true;
      }
      const zhAnchor = '"appearance.system":`跟随系统`,';
      if (code.includes(zhAnchor)) {
        code = code.replace(
          zhAnchor,
          zhAnchor +
            '"appearance.preset1":`高级灰`,' +
            '"appearance.preset2":`极简橙`,' +
            '"appearance.preset3":`预设 3`,',
        );
        changed = true;
      }
      const enAnchor = '"appearance.system":`System`,';
      if (code.includes(enAnchor)) {
        code = code.replace(
          enAnchor,
          enAnchor +
            '"appearance.preset1":`Luminex Gray`,' +
            '"appearance.preset2":`Luminex Orange`,' +
            '"appearance.preset3":`Preset 3`,',
        );
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(themeClientPath, code, 'utf8');
      }
    }
  }

  // =========================================================================
  // 2. SDK Team Mode (#7773)
  // =========================================================================
  const agentTeamIndex = path.join(nmScopeDir, 'dsh-experimental-agent-team/lib/index.js');
  if (fs.existsSync(agentTeamIndex)) {
    let code = fs.readFileSync(agentTeamIndex, 'utf8');
    if (!code.includes('defaultEnabled: z.boolean().default(false)')) {
      code = code.replace(
        'disposalTimeoutMs: z.number().step(1).min(1).default(DEFAULT_DISPOSAL_TIMEOUT_MS)\n\t});',
        'disposalTimeoutMs: z.number().step(1).min(1).default(DEFAULT_DISPOSAL_TIMEOUT_MS),\n\t\tdefaultEnabled: z.boolean().default(false)\n\t});',
      );
      code = code.replace(
        'disposalTimeoutMs: positiveLimit("disposalTimeoutMs", config.disposalTimeoutMs ?? DEFAULT_DISPOSAL_TIMEOUT_MS)\n\t\t};',
        'disposalTimeoutMs: positiveLimit("disposalTimeoutMs", config.disposalTimeoutMs ?? DEFAULT_DISPOSAL_TIMEOUT_MS),\n\t\t\tdefaultEnabled: config.defaultEnabled ?? false\n\t\t};',
      );
      code = code.replace(
        'ctx.on("agent/created", ({ agent }) => {\n\t\t\tthis.scheduleRecovery(agent);\n\t\t});',
        'ctx.on("agent/created", ({ agent, source, signal }) => {\n\t\t\tthis.scheduleRecovery(agent);\n\t\t\tif (this.config.defaultEnabled && source === "startup" && agent.session?.header?.origin !== "subagent" && typeof this.setEnabled === "function") {\n\t\t\t\tPromise.resolve(this.setEnabled(agent, true, signal)).catch(() => {});\n\t\t\t}\n\t\t});',
      );
      fs.writeFileSync(agentTeamIndex, code, 'utf8');
    }
  }

  const dshExamplesDir = path.join(nmScopeDir, 'dsh/config/examples');
  if (fs.existsSync(path.join(nmScopeDir, 'dsh'))) {
    fs.mkdirSync(dshExamplesDir, { recursive: true });
    fs.writeFileSync(
      path.join(dshExamplesDir, 'team-mode.yml'),
      '# Enable SDK Team Mode by default on startup sessions:\n- id: agent-team\n  config:\n    defaultEnabled: true\n',
      'utf8',
    );
  }

  // =========================================================================
  // 3. MCP Manager Core (#3372)
  // =========================================================================
  const mcpClientDir = path.join(nmScopeDir, 'dsh-mcp-client');
  const mcpClientAsset = path.join(assetsDir, 'dsh-mcp-client-index.js');
  if (fs.existsSync(mcpClientDir) && fs.existsSync(mcpClientAsset)) {
    fs.copyFileSync(mcpClientAsset, path.join(mcpClientDir, 'lib/index.js'));
  }

  const mcpManagerDir = path.join(nmScopeDir, 'dsh-mcp-manager');
  const mcpManagerAsset = path.join(assetsDir, 'dsh-mcp-manager-index.js');
  if (fs.existsSync(mcpManagerAsset)) {
    fs.mkdirSync(path.join(mcpManagerDir, 'lib'), { recursive: true });
    fs.mkdirSync(path.join(mcpManagerDir, 'locale'), { recursive: true });
    fs.copyFileSync(mcpManagerAsset, path.join(mcpManagerDir, 'lib/index.js'));
    fs.writeFileSync(
      path.join(mcpManagerDir, 'lib/typert.host.js'),
      MCP_MANAGER_TYPERT_HOST_JS,
      'utf8',
    );
    fs.writeFileSync(
      path.join(mcpManagerDir, 'lib/typert.remote-client.js'),
      MCP_MANAGER_TYPERT_REMOTE_CLIENT_JS,
      'utf8',
    );
    for (const [fileName, data] of Object.entries(MCP_MANAGER_LOCALES)) {
      fs.writeFileSync(
        path.join(mcpManagerDir, 'locale', fileName),
        JSON.stringify(data, null, 2) + '\n',
        'utf8',
      );
    }
    const mcpManagerPkg = {
      name: '@deepseek-ai/dsh-mcp-manager',
      description: 'Unified MCP server manager across Settings and plugin contributors',
      version: '0.2.2-rc.3',
      private: true,
      type: 'module',
      dsh: {
        category: 'other',
        locales: {
          zh: './locale/zh.json',
          en: './locale/en.json',
          ja: './locale/ja.json',
          es: './locale/es.json',
          fr: './locale/fr.json',
          de: './locale/de.json',
          ru: './locale/ru.json',
          pt: './locale/pt.json',
        },
      },
      exports: {
        '.': {
          default: './lib/index.js',
        },
        './typert': {
          default: './lib/typert.host.js',
        },
        './remote': {
          default: './lib/typert.remote-client.js',
        },
      },
      dependencies: {
        '@deepseek-ai/cordis': '^4.1.0',
        '@deepseek-ai/dsh-mcp-client': '0.2.2-rc.3',
        '@deepseek-ai/dsh-settings': '0.2.2-rc.3',
        '@deepseek-ai/dsh-typert': '0.2.2-rc.3',
        '@deepseek-ai/schemastery': '~3.19.0',
      },
    };
    fs.writeFileSync(
      path.join(mcpManagerDir, 'package.json'),
      JSON.stringify(mcpManagerPkg, null, 2) + '\n',
      'utf8',
    );
  }

  // Register mcp-manager in dsh-web-app
  const webAppPatchPath = path.join(nmScopeDir, 'dsh-web-app/cordis.patch.yml');
  if (fs.existsSync(webAppPatchPath)) {
    const raw = fs.readFileSync(webAppPatchPath, 'utf8');
    if (!raw.includes("name: '@deepseek-ai/dsh-mcp-manager'")) {
      const target = `    - id: message-feedback\n      name: '@deepseek-ai/dsh-message-feedback'\n      config:\n        maxNoteBytes: 8192`;
      const replacement = `${target}\n    - id: mcp-manager\n      name: '@deepseek-ai/dsh-mcp-manager'`;
      if (raw.includes(target)) {
        fs.writeFileSync(webAppPatchPath, raw.replace(target, replacement), 'utf8');
      }
    }
  }

  const webAppPkgPath = path.join(nmScopeDir, 'dsh-web-app/package.json');
  if (fs.existsSync(webAppPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(webAppPkgPath, 'utf8'));
    if (pkg.dependencies?.['@deepseek-ai/dsh-mcp-manager'] !== '0.2.2-rc.3') {
      pkg.dependencies = {
        ...pkg.dependencies,
        '@deepseek-ai/dsh-mcp-manager': '0.2.2-rc.3',
      };
      fs.writeFileSync(webAppPkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    }
  }

  // Register forwarded events & client remote mounts in dsh-api-remotes
  const apiRemotesIndex = path.join(nmScopeDir, 'dsh-api-remotes/lib/index.js');
  if (fs.existsSync(apiRemotesIndex)) {
    let code = fs.readFileSync(apiRemotesIndex, 'utf8');
    if (!code.includes('event: "web/providers-changed"')) {
      code = code.replace(
        '{\n\t\tevent: "settings/document-updated",\n\t\tmode: "emit"\n\t},',
        '{\n\t\tevent: "mcp-manager/status",\n\t\tmode: "emit"\n\t},\n\t{\n\t\tevent: "settings/document-updated",\n\t\tmode: "emit"\n\t},\n\t{\n\t\tevent: "web/providers-changed",\n\t\tmode: "emit"\n\t},',
      );
      fs.writeFileSync(apiRemotesIndex, code, 'utf8');
    }
  }

  const apiRemotesClient = path.join(nmScopeDir, 'dsh-api-remotes/lib/client.js');
  if (fs.existsSync(apiRemotesClient)) {
    let code = fs.readFileSync(apiRemotesClient, 'utf8');
    // Remove any legacy raw-object TYPERT_REMOTE$WEB declaration if present
    code = code.replace(
      /\t\tconst TYPERT_REMOTE\$WEB = \{[\s\S]*?const TYPERT_REMOTE\$MCP_MANAGER = \{[\s\S]*?\t\t\};\n\t\t(?=async function apply\(ctx\))/,
      '',
    );
    if (!code.includes('createTypertRemoteInfo({\n\tpackage: "@deepseek-ai/dsh-web"')) {
      const webSpec = WEB_REMOTE_SPEC_CODE.replace(/\bz\./g, 'zod.');
      const mcpSpec = MCP_MANAGER_REMOTE_SPEC_CODE.replace(/\bz\./g, 'zod.');
      const mountDecls = `\t\tconst TYPERT_REMOTE$WEB = createTypertRemoteInfo(${webSpec}, zod);\n\t\tconst TYPERT_REMOTE$MCP_MANAGER = createTypertRemoteInfo(${mcpSpec}, zod);\n`;
      code = code.replace(
        'async function apply(ctx) {',
        mountDecls + '\t\tasync function apply(ctx) {',
      );
      if (!code.includes('TYPERT_REMOTE$WEB,')) {
        code = code.replace(
          'TYPERT_REMOTE$20,\n\t\t\t\t\tTYPERT_REMOTE$24\n\t\t\t\t]',
          'TYPERT_REMOTE$20,\n\t\t\t\t\tTYPERT_REMOTE$24,\n\t\t\t\t\tTYPERT_REMOTE$WEB,\n\t\t\t\t\tTYPERT_REMOTE$MCP_MANAGER\n\t\t\t\t]',
        );
      }
      fs.writeFileSync(apiRemotesClient, code, 'utf8');
    }
  }

  // Register new viewer endpoint classes in dsh-experimental-liveshare
  const liveshareIndex = path.join(nmScopeDir, 'dsh-experimental-liveshare/lib/index.js');
  if (fs.existsSync(liveshareIndex)) {
    let code = fs.readFileSync(liveshareIndex, 'utf8');
    if (!code.includes('"web/listProviders"')) {
      code = code.replace(
        '"llm/listProviders": "reader-global-read",',
        '"llm/listProviders": "reader-global-read",\n\t"web/listProviders": "owner-only",\n\t"mcpManager/probe": "owner-only",\n\t"mcpManager/restart": "owner-only",\n\t"mcpManager/watch": "owner-only",',
      );
      fs.writeFileSync(liveshareIndex, code, 'utf8');
    }
  }

  // =========================================================================
  // 4. Desktop Update Channels (#7495) & Windows CLI Short-Path Fix (#7709)
  // =========================================================================
  const uiSettingsGeneralDir = path.join(nmScopeDir, 'dsh-client-ui-settings-general');
  const uiSettingsGeneralAsset = path.join(assetsDir, 'ui-settings-general-client.js');
  if (fs.existsSync(uiSettingsGeneralDir) && fs.existsSync(uiSettingsGeneralAsset)) {
    fs.copyFileSync(uiSettingsGeneralAsset, path.join(uiSettingsGeneralDir, 'lib/client.js'));
  }

  const clientRunnerPath = path.join(nmScopeDir, 'dsh-cordis-client-runner/lib/client.js');
  if (fs.existsSync(clientRunnerPath)) {
    let code = fs.readFileSync(clientRunnerPath, 'utf8');
    if (!code.includes('DesktopChannelRow')) {
      code = code.replace(
        'const CLIENT_SLOT_API = [',
        `const CLIENT_SLOT_API = [
\t\t\t{
\t\t\t\tkey: "DesktopChannelRow",
\t\t\t\tkind: "single",
\t\t\t\tscope: "root",
\t\t\t\tsummary: "Release channel selector row inside General settings.",
\t\t\t\tdoc: "Release channel selector row inside General settings.",
\t\t\t\tregisterOptions: [],
\t\t\t\townerProps: []
\t\t\t},
\t\t\t{
\t\t\t\tkey: "DesktopChannelToast",
\t\t\t\tkind: "single",
\t\t\t\tscope: "root",
\t\t\t\tsummary: "Update toast banner on the application shell.",
\t\t\t\tdoc: "Update toast banner on the application shell.",
\t\t\t\tregisterOptions: [],
\t\t\t\townerProps: []
\t\t\t},`,
      );
      fs.writeFileSync(clientRunnerPath, code, 'utf8');
    }
  }

  const dshDir = path.join(nmScopeDir, 'dsh');
  if (fs.existsSync(dshDir)) {
    fs.writeFileSync(path.join(dshDir, 'lib/installed-bin.js'), INSTALLED_BIN_JS, 'utf8');
    const dshPkgPath = path.join(dshDir, 'package.json');
    if (fs.existsSync(dshPkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(dshPkgPath, 'utf8'));
      pkg.exports = {
        ...pkg.exports,
        './installed-bin': {
          default: './lib/installed-bin.js',
        },
      };
      if (pkg.dependencies?.['@deepseek-ai/dsh-mcp-manager'] !== '0.2.2-rc.3') {
        pkg.dependencies = {
          ...pkg.dependencies,
          '@deepseek-ai/dsh-mcp-manager': '0.2.2-rc.3',
        };
      }
      fs.writeFileSync(dshPkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    }
  }

  // =========================================================================
  // 5. 0.2.2-rc.1 / master Update 1: Web Prompt Retry Deduplication (#7853)
  // =========================================================================
  const sessionControllerIndex = path.join(nmScopeDir, 'dsh-api-session-controller/lib/index.js');
  if (fs.existsSync(sessionControllerIndex)) {
    let code = fs.readFileSync(sessionControllerIndex, 'utf8');
    if (!code.includes('promptReceipts = /* @__PURE__ */ new WeakMap();')) {
      code = code.replace(
        'var SessionCommandController = class {\n\tctx;\n\tagents;\n\tdefaultCwd;',
        'var SessionCommandController = class {\n\tctx;\n\tagents;\n\tdefaultCwd;\n\tpromptReceipts = /* @__PURE__ */ new WeakMap();',
      );
      code = code.replace(
        'if (hasPromptRequest(agent, request.requestId)) return { accepted: true };',
        'if (this.hasPromptRequest(agent.session, request.requestId)) return { accepted: true };',
      );
      code = code.replace(
        'const admission = resolvePromptFileReceipts(request.content, (receiptId) => this.ctx.fileUploads.resolve(agent, receiptId));\n\t\tconst hasImage = admission.content.some((part) => part.type === "image");\n\t\tconst admit = async () => {',
        'const hasImage = request.content.some((part) => part.type === "image" || part.type === "file" && this.ctx.fileUploads.resolve(agent, part.receiptId)?.type === "image");\n\t\tconst admit = async () => {\n\t\t\tif (this.hasPromptRequest(agent.session, request.requestId)) return { accepted: true };\n\t\t\tconst admission = resolvePromptFileReceipts(request.content, (receiptId) => this.ctx.fileUploads.resolve(agent, receiptId));',
      );
      const hasPromptMethod = `\thasPromptRequest(session, requestId) {
\t\tlet receipts = this.promptReceipts.get(session);
\t\tif (receipts === void 0) {
\t\t\treceipts = {
\t\t\t\toffset: SessionLogOffset(0),
\t\t\t\tmessages: /* @__PURE__ */ new Set(),
\t\t\t\trequests: /* @__PURE__ */ new Set()
\t\t\t};
\t\t\tthis.promptReceipts.set(session, receipts);
\t\t}
\t\tif (receipts.requests.has(requestId)) return true;
\t\tconst events = session.snapshotEvents(receipts.offset);
\t\treceipts.offset = SessionLogOffset(receipts.offset + events.length);
\t\tfor (const event of events) {
\t\t\tif (event.seq < session.inheritedEventCount) continue;
\t\t\tconst messages = event.type === "agent/inbox/spliced" ? event.data.inserted : event.type === "user/message" ? [event.data] : [];
\t\t\tfor (const message of messages) {
\t\t\t\tif (receipts.messages.has(message.id)) continue;
\t\t\t\treceipts.messages.add(message.id);
\t\t\t\tconst source = message.source;
\t\t\t\tif ((source.kind === "user" || source.kind === "retry") && "rpcId" in source) receipts.requests.add(source.rpcId);
\t\t\t}
\t\t}
\t\treturn receipts.requests.has(requestId);
\t}
\tasync forkWorkspace(source) {`;
      code = code.replace('\tasync forkWorkspace(source) {', hasPromptMethod);
      fs.writeFileSync(sessionControllerIndex, code, 'utf8');
    }
  }

  // =========================================================================
  // 6. 0.2.2-rc.1 / master Update 2: Move Open in App into Session Menu (#7569)
  // =========================================================================
  const openInAppClient = path.join(nmScopeDir, 'dsh-client-ui-open-in-app/lib/client.js');
  if (fs.existsSync(openInAppClient)) {
    let code = fs.readFileSync(openInAppClient, 'utf8');
    if (!code.includes('registerSessionOpenWith')) {
      code = code.replace(
        `		function ContextMenuApplicationIcon({ icon }) {
			return icon.src ? (0, react_jsx_runtime.jsx)("img", {
				src: icon.src,
				width: 14,
				height: 14,
				alt: ""
			}) : (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRightUpOutlineRegular, {});
		}`,
        `		function ContextMenuApplicationIcon({ icon }) {
			const [failedSource, setFailedSource] = (0, react.useState)();
			return icon.src && failedSource !== icon.src ? (0, react_jsx_runtime.jsx)("img", {
				src: icon.src,
				width: 14,
				height: 14,
				alt: "",
				draggable: false,
				onError: () => {
					setFailedSource(icon.src);
				}
			}) : (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRightUpOutlineRegular, {});
		}`,
      );

      code = code.replace(
        `		function registerSessionReveal(ctx, controller, t, report) {
			ctx.effect(() => ctx.contextMenus.register({
				id: "open-in-app.reveal",
				target: "session",
				order: 500,
				observe: () => [
					controller.apps,
					ctx.sessions.list,
					ctx.locale
				],
				resolve: ({ sessionId }) => {
					const directory = ctx.sessions.list.getSnapshot().byId[sessionId]?.cwd;
					const applications = controller.apps.getSnapshot();
					const manager = applications?.find((id) => [
						"finder",
						"explorer",
						"filemanager"
					].includes(id));
					return [{
						id: "reveal",
						label: t(applications?.includes("finder") ? "menu.finder" : "menu.reveal"),
						icon: { key: "open-in-app.reveal" },
						disabled: !directory || manager === void 0,
						failureLabel: t("path.revealError"),
						...directory && manager !== void 0 ? { run: async () => {
							const outcome = await controller.launch(manager, directory);
							report(outcome.kind === "failed" ? {
								kind: "failed",
								failure: "revealError"
							} : outcome);
						} } : {}
					}];
				}
			}), "open-in-app: Session directory menu");
		}`,
        `		function registerSessionOpenWith(ctx, controller, t, report) {
			const resolve = ({ sessionId }) => {
				const directory = ctx.sessions.list.getSnapshot().byId[sessionId]?.cwd;
				const applications = (controller.apps.getSnapshot() ?? []).flatMap((id) => {
					const key = APP_LABEL_KEY[id];
					return key === void 0 ? [] : [{
						id,
						label: t(key),
						icon: \`\${OPEN_IN_APP_ICON_PREFIX_ROUTE}/\${id}\`
					}];
				});
				if (!directory || applications.length === 0) return [];
				const busy = controller.operation.getSnapshot().phase === "busy";
				return [{
					id: "openWith",
					label: t("path.open"),
					icon: { key: "open-in-app.reveal" },
					disabled: busy,
					children: applications.map((app) => ({
						id: \`app:\${app.id}\`,
						label: app.label,
						icon: {
							key: "open-in-app.application",
							src: app.icon
						},
						disabled: busy,
						run: async () => {
							const outcome = await controller.launch(app.id, directory);
							if (outcome.kind === "opened") controller.choose(app.id);
							report(outcome);
						}
					}))
				}];
			};
			for (const target of ["session", "sessionHeader"]) ctx.effect(() => ctx.contextMenus.register({
				id: "open-in-app.openWith",
				target,
				order: 500,
				...target === "sessionHeader" ? { separatorBefore: true } : {},
				observe: () => [
					controller.apps,
					controller.operation,
					ctx.sessions.list,
					ctx.locale
				],
				resolve
			}), \`open-in-app: \${target} directory menu\`);
		}`,
      );

      code = code.replace(
        'registerSessionReveal(ctx, controller, t, announcement.report);',
        'registerSessionOpenWith(ctx, controller, t, announcement.report);',
      );

      code = code.replace(
        `			function SessionOpenInAppAction(props) {
				const { sessionId, useSessions } = props;
				const cwd = useSessions((state) => state.byId[sessionId]?.cwd);
				return cwd ? (0, react.createElement)(OpenInAppAction, {
					...props,
					absolutePath: cwd
				}) : null;
			}
			ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
				name: "conversation.session.header.utilities",
				id: "open-in-app",
				order: -10,
				locale: NS,
				inject: directoryInjected
			}, SessionOpenInAppAction));`,
        '',
      );
      fs.writeFileSync(openInAppClient, code, 'utf8');
    }
  }

  // =========================================================================
  // 7. 0.2.2-rc.1 / master Update 3: Paste Plain Text Shortcut (#7787)
  // =========================================================================
  const shortcutsClient = path.join(nmScopeDir, 'dsh-client-shortcuts/lib/client.js');
  if (fs.existsSync(shortcutsClient)) {
    let code = fs.readFileSync(shortcutsClient, 'utf8');
    if (!code.includes('pasteAndMatchStyle')) {
      const pastePlainEffect = `\t\t\t\tctx.effect(() => {
\t\t\t\t\tconst onKeyDown = (event) => {
\t\t\t\t\t\tif (event.defaultPrevented || event.code !== "KeyV" || !event.shiftKey) return;
\t\t\t\t\t\tconst isPrimary = this.platform === "macos" ? event.metaKey && !event.ctrlKey : event.ctrlKey && !event.metaKey;
\t\t\t\t\t\tif (!isPrimary) return;
\t\t\t\t\t\tconst active = document.activeElement;
\t\t\t\t\t\tif (!active || !(active instanceof HTMLElement || active instanceof HTMLTextAreaElement || active instanceof HTMLInputElement)) return;
\t\t\t\t\t\t// Paste and Match Style (Shift+Command+V / Ctrl+Shift+V / Option+Shift+Command+V)
\t\t\t\t\t\tdocument.execCommand?.("pasteAndMatchStyle");
\t\t\t\t\t};
\t\t\t\t\twindow.addEventListener("keydown", onKeyDown, true);
\t\t\t\t\treturn () => window.removeEventListener("keydown", onKeyDown, true);
\t\t\t\t}, "shortcuts: pasteAndMatchStyle");\n`;
      code = code.replace(
        'ctx.effect(() => ctx.locale.subscribe(() => {',
        pastePlainEffect + '\t\t\t\tctx.effect(() => ctx.locale.subscribe(() => {',
      );
      fs.writeFileSync(shortcutsClient, code, 'utf8');
    }
  }

  // =========================================================================
  // 8. 0.2.2-rc.1 / master Update 4: Subagent Catalog Names (#7697) &
  //    Repeated Fork Title Suffixes (#7472)
  // =========================================================================
  const subagentIndex = path.join(nmScopeDir, 'dsh-subagent/lib/index.js');
  if (fs.existsSync(subagentIndex)) {
    let code = fs.readFileSync(subagentIndex, 'utf8');
    if (!code.includes('SiblingNameReservations')) {
      const namingHelpers = `//#region lib/types/names.js
const ROOT_AGENT_NAME = "lead";
const AGENT_NAME_PATTERN = /^[a-z][a-z0-9-]{0,31}$/u;
function isAgentName(value) {
\treturn AGENT_NAME_PATTERN.test(value) && value !== ROOT_AGENT_NAME;
}
function joinAgentPath(parentPath, childName) {
\treturn \`\${parentPath}/\${childName}\`;
}
function agentAddress(path, sessionId) {
\treturn \`\${path}@\${sessionId}\`;
}
function parentAgentPath(childPath) {
\tconst slash = childPath.lastIndexOf("/");
\treturn slash <= 0 ? ROOT_AGENT_NAME : childPath.slice(0, slash);
}
const subagentNameSchema = z$1.string().regex(AGENT_NAME_PATTERN).refine((value) => value !== ROOT_AGENT_NAME, { message: 'subagent name "lead" is reserved' });
var SiblingNameReservations = class {
\treservedByParent = /* @__PURE__ */ new Map();
\ttryReserve(parentSessionId, name) {
\t\tif (!isAgentName(name)) return void 0;
\t\tlet set = this.reservedByParent.get(parentSessionId);
\t\tif (set === void 0) {
\t\t\tset = /* @__PURE__ */ new Set();
\t\t\tthis.reservedByParent.set(parentSessionId, set);
\t\t}
\t\tif (set.has(name)) return void 0;
\t\tset.add(name);
\t\tlet released = false;
\t\treturn () => {
\t\t\tif (released) return;
\t\t\treleased = true;
\t\t\tset.delete(name);
\t\t\tif (set.size === 0) this.reservedByParent.delete(parentSessionId);
\t\t};
\t}
};
function catalogNames(entries) {
\tconst names = /* @__PURE__ */ new Set();
\tfor (const entry of entries) if ((entry.mode === "continuable" || entry.mode === "external") && typeof entry.name === "string") names.add(entry.name);
\treturn names;
}
//#endregion\n`;

      code = code.replace(
        'const sessionIdSchema = z$1.string();',
        namingHelpers + 'const sessionIdSchema = z$1.string();',
      );
      code = code.replace(
        'const continuableCatalogSchema = z$1.object({\n\tversion: z$1.union([z$1.literal(0), z$1.literal(1)]),\n\tchildId: sessionIdSchema,\n\tchildCreatedAt: z$1.number().int().nonnegative(),\n\tmode: z$1.literal("continuable"),\n\tlabel: z$1.string()\n}).strict();',
        'const continuableCatalogSchema = z$1.object({\n\tversion: z$1.union([z$1.literal(0), z$1.literal(1)]),\n\tchildId: sessionIdSchema,\n\tchildCreatedAt: z$1.number().int().nonnegative(),\n\tmode: z$1.literal("continuable"),\n\tlabel: z$1.string(),\n\tname: subagentNameSchema.optional()\n}).strict();',
      );
      code = code.replace(
        'const externalCatalogSchema = oneShotCatalogSchema.extend({\n\tversion: z$1.literal(2),\n\tmode: z$1.literal("external")\n});',
        'const externalCatalogSchema = oneShotCatalogSchema.extend({\n\tversion: z$1.literal(2),\n\tmode: z$1.literal("external"),\n\tname: subagentNameSchema.optional()\n});',
      );
      code = code.replace(
        'function establishCatalogChild(parent, child, descriptor) {\n\tparent.append("subagent/catalog", {\n\t\tversion: 0,\n\t\tchildId: child.id,\n\t\tchildCreatedAt: child.createdAt,\n\t\tmode: descriptor.mode,\n\t\tlabel: descriptor.label\n\t});\n}',
        'function establishCatalogChild(parent, child, descriptor, name) {\n\tparent.append("subagent/catalog", {\n\t\tversion: 0,\n\t\tchildId: child.id,\n\t\tchildCreatedAt: child.createdAt,\n\t\tmode: descriptor.mode,\n\t\tlabel: descriptor.label,\n\t\t...name === void 0 ? {} : { name }\n\t});\n}',
      );
      code = code.replace(
        'function establishExternalCatalogChild(parent, childId, label) {\n\tparent.append("subagent/catalog", {\n\t\tversion: EXTERNAL_SUBAGENT_CATALOG_VERSION,\n\t\tchildId,\n\t\tchildCreatedAt: Date.now(),\n\t\tmode: "external",\n\t\tlabel\n\t});\n}',
        'function establishExternalCatalogChild(parent, childId, label, name) {\n\tparent.append("subagent/catalog", {\n\t\tversion: EXTERNAL_SUBAGENT_CATALOG_VERSION,\n\t\tchildId,\n\t\tchildCreatedAt: Date.now(),\n\t\tmode: "external",\n\t\tlabel,\n\t\t...name === void 0 ? {} : { name }\n\t});\n}',
      );
      code = code.replace(
        'establishCatalogChild(parent.session, childHeader, descriptor);',
        'establishCatalogChild(parent.session, childHeader, descriptor, spec.name);',
      );
      code = code.replace(
        'if (spec.delivery === "parent") establishExternalCatalogChild(parent.session, activation.childId, spec.label);',
        'if (spec.delivery === "parent") establishExternalCatalogChild(parent.session, activation.childId, spec.label, spec.name);',
      );
      code = code.replace(
        'export { AssistantOutputFold,',
        'export { AssistantOutputFold, ROOT_AGENT_NAME, SiblingNameReservations, agentAddress, catalogNames, establishCatalogChild, establishExternalCatalogChild, isAgentName, joinAgentPath, parentAgentPath,',
      );
      fs.writeFileSync(subagentIndex, code, 'utf8');
    }
  }

  const subagentClient = path.join(nmScopeDir, 'dsh-client-ui-subagent/lib/client.js');
  if (fs.existsSync(subagentClient)) {
    let code = fs.readFileSync(subagentClient, 'utf8');
    if (!code.includes('function entryName(entry)')) {
      code = code.replace(
        'const MENU_VIEWPORT_MARGIN = 16;',
        'function entryName(entry) {\n\t\t\treturn entry.mode === "continuable" || entry.mode === "external" ? entry.name ?? entry.id : entry.id;\n\t\t}\n\t\tconst MENU_VIEWPORT_MARGIN = 16;',
      );
      code = code.replace(
        `					const summary = summaries[entry.id];
					const label = entry.label ?? entry.id;
					const mode = external ? t("mode.external") : entry.mode === "unknown" ? t("mode.unknown") : entry.mode === "one-shot" ? t("mode.oneShot") : t("mode.continuable");
					const completed = !external && entry.activity === "inactive" && summary?.projectionValues?.subagentTiming?.lastTurnCompleted === true;
					const activity = external ? void 0 : entry.activity === "running" ? t("activity.running") : completed ? t("activity.completed") : t("activity.inactive");
					const secondary = [
						summary?.title,
						requiresOpening ? t("catalog.migrationRequired") : mode,
						activity
					].filter((value) => value !== void 0).join(" · ");`,
        `					const summary = summaries[entry.id];
					const name = entryName(entry);
					const label = entry.label || summary?.title || name;
					const mode = external ? t("mode.external") : entry.mode === "unknown" ? t("mode.unknown") : entry.mode === "one-shot" ? t("mode.oneShot") : t("mode.continuable");
					const completed = !external && entry.activity === "inactive" && summary?.projectionValues?.subagentTiming?.lastTurnCompleted === true;
					const activity = external ? void 0 : entry.activity === "running" ? t("activity.running") : completed ? t("activity.completed") : t("activity.inactive");
					const secondary = [
						entry.label ? summary?.title : void 0,
						label === name ? void 0 : name,
						requiresOpening ? t("catalog.migrationRequired") : mode,
						activity
					].filter((value) => value !== void 0).join(" · ");`,
      );
      code = code.replace(
        'const switcherDisplayTitle = currentEntry !== void 0 ? currentEntry.label ?? currentEntry.id : displayTitle;',
        'const switcherDisplayTitle = currentEntry !== void 0 ? currentEntry.label || entryName(currentEntry) : displayTitle;',
      );
      fs.writeFileSync(subagentClient, code, 'utf8');
    }
  }

  const sessionControllerClient = path.join(nmScopeDir, 'dsh-api-session-controller/lib/client.js');
  if (fs.existsSync(sessionControllerClient)) {
    let code = fs.readFileSync(sessionControllerClient, 'utf8');
    if (!code.includes('function incrementedTitle(title)')) {
      code = code.replace(
        `		function increasedForkTitle(title) {
			const ascii = /^(.*?)\\((\\d+)\\)$/u.exec(title);
			if (ascii?.[1] !== void 0 && ascii[2] !== void 0) return \`\${ascii[1]}(\${BigInt(ascii[2]) + 1n})\`;
			const fullWidth = /^(.*?)（(\\d+)）$/u.exec(title);
			if (fullWidth?.[1] !== void 0 && fullWidth[2] !== void 0) return \`\${fullWidth[1]}（\${BigInt(fullWidth[2]) + 1n}）\`;
			return \`\${title} (1)\`;
		}`,
        `		function increasedForkTitle(title, taken) {
			let next = incrementedTitle(title);
			if (taken) {
				while (taken.has(next)) next = incrementedTitle(next);
			}
			return next;
		}
		function incrementedTitle(title) {
			const ascii = /^(.*?)\\((\\d+)\\)$/u.exec(title);
			if (ascii?.[1] !== void 0 && ascii[2] !== void 0) return \`\${ascii[1]}(\${BigInt(ascii[2]) + 1n})\`;
			const fullWidth = /^(.*?)（(\\d+)）$/u.exec(title);
			if (fullWidth?.[1] !== void 0 && fullWidth[2] !== void 0) return \`\${fullWidth[1]}（\${BigInt(fullWidth[2]) + 1n}）\`;
			return \`\${title} (1)\`;
		}`,
      );
      code = code.replace(
        `				if (sourceTitle !== void 0) {
					const renamed = await this.manager.rename(childId, increasedForkTitle(sourceTitle));
					if (!renamed.ok) throw new Error(\`fork child rename failed: \${renamed.error.code}: \${renamed.error.message}\`);
				}`,
        `				if (sourceTitle !== void 0) {
					const list = this.list.getSnapshot();
					const taken = new Set(list.ids.flatMap((id) => list.byId[id]?.title ?? []));
					const renamed = await this.manager.rename(childId, increasedForkTitle(sourceTitle, taken));
					if (!renamed.ok) throw new Error(\`fork child rename failed: \${renamed.error.code}: \${renamed.error.message}\`);
				}`,
      );
      if (!code.includes('exports.increasedForkTitle = increasedForkTitle;')) {
        code = code.replace(
          'exports.scopeOf = scopeOf;',
          'exports.increasedForkTitle = increasedForkTitle;\n\t\texports.scopeOf = scopeOf;',
        );
      }
      fs.writeFileSync(sessionControllerClient, code, 'utf8');
    }
  }

  // =========================================================================
  // 9. 0.2.2-rc.1 / master Update 5: Cordis Inspector Snapshot Budget (#7425)
  // =========================================================================
  const inspectorIndex = path.join(nmScopeDir, 'dsh-experimental-inspector/lib/index.js');
  if (fs.existsSync(inspectorIndex)) {
    let code = fs.readFileSync(inspectorIndex, 'utf8');
    let modified = false;
    if (code.includes('const SOURCE_FRAME_OVERHEAD_BYTES = 4096;\nconst MAX_TOPIC_CODE_UNITS = 128;')) {
      code = code.replace(
        'const SOURCE_FRAME_OVERHEAD_BYTES = 4096;\nconst MAX_TOPIC_CODE_UNITS = 128;',
        'const MAX_TOPIC_CODE_UNITS = 128;',
      );
      modified = true;
    }
    if (!code.includes('maxStatePayloadBytes')) {
      const budgetHelpers = `const MAX_TOPIC_CODE_UNITS = 128;
const STATE_RECORD_OVERHEAD_BYTES = 1024;
function maxStatePayloadBytes(maxFrameBytes) {
\treturn maxFrameBytes - SOURCE_FRAME_OVERHEAD_BYTES - STATE_RECORD_OVERHEAD_BYTES;
}
`;
      code = code.replace(
        'function resolveInspectorOptions(options = {}) {',
        budgetHelpers + 'function resolveInspectorOptions(options = {}) {',
      );
      code = code.replace(
        'if (Math.ceil(spec.maxBodyChunkBytes / 3) * 4 + 4096 > spec.maxSourceFrameBytes) throw new Error("inspector: maxSourceFrameBytes cannot carry one base64 body chunk");',
        'if (Math.ceil(spec.maxBodyChunkBytes / 3) * 4 + 4096 > spec.maxSourceFrameBytes) throw new Error("inspector: maxSourceFrameBytes cannot carry one base64 body chunk");\n\tif (maxStatePayloadBytes(spec.maxSourceFrameBytes) <= 0) throw new Error("inspector: maxSourceFrameBytes cannot carry a Cordis tree snapshot");',
      );
      code = code.replace(
        'maxBytes: spec.maxSourceFrameBytes - 4096',
        'maxBytes: maxStatePayloadBytes(spec.maxSourceFrameBytes)',
      );
      code = code.replace(
        'export { Config, apply, inject, name, resolveInspectorOptions, startInspector };',
        'export { Config, MAX_TOPIC_CODE_UNITS, STATE_RECORD_OVERHEAD_BYTES, apply, inject, maxStatePayloadBytes, name, resolveInspectorOptions, startInspector };',
      );
      modified = true;
    }
    if (modified) {
      fs.writeFileSync(inspectorIndex, code, 'utf8');
    }
  }

  const inspectorClient = path.join(nmScopeDir, 'dsh-experimental-inspector/lib/client.js');
  if (fs.existsSync(inspectorClient)) {
    let code = fs.readFileSync(inspectorClient, 'utf8');
    let modified = false;
    if (code.includes('const SOURCE_FRAME_OVERHEAD_BYTES = 4096;\n\t\tconst STATE_RECORD_OVERHEAD_BYTES = 1024;')) {
      code = code.replace(
        'const SOURCE_FRAME_OVERHEAD_BYTES = 4096;\n\t\tconst STATE_RECORD_OVERHEAD_BYTES = 1024;',
        'const STATE_RECORD_OVERHEAD_BYTES = 1024;',
      );
      modified = true;
    }
    if (!code.includes('maxStatePayloadBytes')) {
      code = code.replace(
        'const INSPECTOR_BOOTSTRAP_ROUTE = "/api/experimental-inspector/bootstrap".slice(1);',
        'const INSPECTOR_BOOTSTRAP_ROUTE = "/api/experimental-inspector/bootstrap".slice(1);\n\t\tconst STATE_RECORD_OVERHEAD_BYTES = 1024;\n\t\tfunction maxStatePayloadBytes(maxFrameBytes) {\n\t\t\treturn maxFrameBytes - SOURCE_FRAME_OVERHEAD_BYTES - STATE_RECORD_OVERHEAD_BYTES;\n\t\t}',
      );
      code = code.replace(
        'maxBytes: bootstrap.maxFrameBytes - 4096',
        'maxBytes: maxStatePayloadBytes(bootstrap.maxFrameBytes)',
      );
      modified = true;
    }
    if (modified) {
      fs.writeFileSync(inspectorClient, code, 'utf8');
    }
  }

  // =========================================================================
  // 10. dsh-superagent Bundle Integration (GitHub / Feishu / Eval / Ticket / Executor)
  // =========================================================================
  const vendorSuperagentDir = path.join(rootDir, 'vendor/dsh-superagent');
  const nmSuperagentDir = path.join(rootDir, 'node_modules/dsh-superagent');
  if (fs.existsSync(vendorSuperagentDir)) {
    fs.cpSync(vendorSuperagentDir, nmSuperagentDir, { recursive: true, force: true });

    const webAppDir = path.join(nmScopeDir, 'dsh-web-app');
    const webAppPkgPath = path.join(webAppDir, 'package.json');
    const webAppPresetsDir = path.join(webAppDir, 'presets');
    const vendorPatchPath = path.join(vendorSuperagentDir, 'cordis.patch.yml');
    if (fs.existsSync(webAppPresetsDir) && fs.existsSync(vendorPatchPath)) {
      fs.copyFileSync(vendorPatchPath, path.join(webAppPresetsDir, 'superagent.patch.yml'));
    }

    if (fs.existsSync(webAppPkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(webAppPkgPath, 'utf8'));
      let changed = false;
      const patches: string[] = pkg.dsh?.bundle?.patch ?? [];
      if (!patches.includes('./presets/superagent.patch.yml')) {
        pkg.dsh = {
          ...pkg.dsh,
          bundle: {
            ...pkg.dsh?.bundle,
            patch: [...patches, './presets/superagent.patch.yml'],
          },
        };
        changed = true;
      }
      if (pkg.dependencies?.['dsh-superagent'] !== '0.1.0') {
        pkg.dependencies = {
          ...pkg.dependencies,
          'dsh-superagent': '0.1.0',
        };
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(webAppPkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      }
    }

    const dshPkgPath = path.join(nmScopeDir, 'dsh/package.json');
    if (fs.existsSync(dshPkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(dshPkgPath, 'utf8'));
      if (pkg.dependencies?.['dsh-superagent'] !== '0.1.0') {
        pkg.dependencies = {
          ...pkg.dependencies,
          'dsh-superagent': '0.1.0',
        };
        fs.writeFileSync(dshPkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      }
    }
  }

  // =========================================================================
  // 11. Stale Combo Revision Fallback in dsh-client-modules
  // =========================================================================
  const clientModulesIndex = path.join(nmScopeDir, 'dsh-client-modules/lib/index.js');
  if (fs.existsSync(clientModulesIndex)) {
    let code = fs.readFileSync(clientModulesIndex, 'utf8');
    // Upgrade earlier pathname check if present
    if (code.includes('requestUrl.pathname === PLUGIN_ROUTE && requestUrl.search.startsWith("??")')) {
      code = code.replace(
        'requestUrl.pathname === PLUGIN_ROUTE && requestUrl.search.startsWith("??")',
        '(requestUrl.pathname === PLUGIN_ROUTE || requestUrl.pathname === "/plugins/") && requestUrl.search.startsWith("??")',
      );
      fs.writeFileSync(clientModulesIndex, code, 'utf8');
    } else if (!code.includes('fallbackCombo = buildCombo')) {
      code = code.replace(
        'const response = this.responses.get(resourceUrl) ?? this.previousBatchResponses.get(resourceUrl) ?? this.chunkResponse(requestUrl);',
        `let response = this.responses.get(resourceUrl) ?? this.previousBatchResponses.get(resourceUrl) ?? this.chunkResponse(requestUrl);
\t\tif (response === void 0 && (requestUrl.pathname === PLUGIN_ROUTE || requestUrl.pathname === "/plugins/") && requestUrl.search.startsWith("??")) {
\t\t\tconst rawQuery = requestUrl.search.slice(2).replace(/&rev=[^&]*$/, "");
\t\t\tconst isMap = rawQuery.endsWith(".map");
\t\t\tconst ids = rawQuery.split(",").map((part) => part.replace(/\\/client\\.js(?:\\.map)?$/, "")).filter(Boolean);
\t\t\tconst records = ids.map((id) => this.table.get(id)).filter((r) => r !== void 0);
\t\t\tif (records.length > 0) {
\t\t\t\tconst fallbackCombo = buildCombo(records, this.readSourceMap);
\t\t\t\tresponse = {
\t\t\t\t\tbody: isMap ? fallbackCombo.sourceMapBody : fallbackCombo.scriptBody,
\t\t\t\t\tcontentType: isMap ? "application/json; charset=utf-8" : "text/javascript; charset=utf-8"
\t\t\t\t};
\t\t\t}
\t\t}`,
      );
      fs.writeFileSync(clientModulesIndex, code, 'utf8');
    }
  }

  // =========================================================================
  // 12. dsh-purge-community Bundle Integration (Purge Panel / Unrestricted & Redteam Presets / Rewind / Boost)
  // =========================================================================
  const nmPurgeDir = path.join(rootDir, 'node_modules/dsh-purge-community');
  if (fs.existsSync(nmPurgeDir)) {
    // 12a. Qualify 0.2.2-alpha.3 / rc.1 / rc.2 / rc.3 in lib/community.js
    const communityJsPath = path.join(nmPurgeDir, 'lib/community.js');
    if (fs.existsSync(communityJsPath)) {
      let communityCode = fs.readFileSync(communityJsPath, 'utf8');
      let communityChanged = false;
      if (
        communityCode.includes('"0.2.1-rc.1"') &&
        !communityCode.includes('"0.2.2-rc.1"')
      ) {
        communityCode = communityCode.replace(
          '"0.2.1-rc.1"',
          '"0.2.1-rc.1",\n  "0.2.2-alpha.3",\n  "0.2.2-rc.1"',
        );
        communityChanged = true;
      }
      if (
        communityCode.includes('"0.2.2-rc.1"') &&
        !communityCode.includes('"0.2.2-rc.3"')
      ) {
        communityCode = communityCode.replace(
          '"0.2.2-rc.1"',
          '"0.2.2-rc.1",\n  "0.2.2-rc.2",\n  "0.2.2-rc.3"',
        );
        communityChanged = true;
      }
      if (communityChanged) {
        fs.writeFileSync(communityJsPath, communityCode, 'utf8');
      }
    }

    // 12b. Guard container-managed process restarts in lib/web.js
    const webJsPath = path.join(nmPurgeDir, 'lib/web.js');
    if (fs.existsSync(webJsPath)) {
      let webCode = fs.readFileSync(webJsPath, 'utf8');
      if (!webCode.includes('DSH_CONTAINER_MANAGED')) {
        webCode = webCode
          .replace(
            'function spawnRestartHelper(helper, payload, exitAfter = 250) {',
            'function spawnRestartHelper(helper, payload, exitAfter = 250) {\n  if (process.env.DSH_CONTAINER_MANAGED === "1") return;',
          )
          .replace(
            'export function scheduleRestart(request, _ctx, options = {}) {',
            'export function scheduleRestart(request, _ctx, options = {}) {\n  if (process.env.DSH_CONTAINER_MANAGED === "1") return { restarting: false };',
          )
          .replace(
            'export function scheduleCleanupRestart({ request, restartArgv: argv, cleanup = [] } = {}) {',
            'export function scheduleCleanupRestart({ request, restartArgv: argv, cleanup = [] } = {}) {\n  if (process.env.DSH_CONTAINER_MANAGED === "1") return { restarting: false };',
          );
        fs.writeFileSync(webJsPath, webCode, 'utf8');
      }
    }

    // 12c. Update agent presets & redteam preset generator for 0.2.2-rc.1 subagent exports
    for (const relPreset of [
      'presets/unrestricted/agent.cordis.yml',
      'presets/redteam/agent.cordis.yml',
    ]) {
      const presetFile = path.join(nmPurgeDir, relPreset);
      if (fs.existsSync(presetFile)) {
        let yml = fs.readFileSync(presetFile, 'utf8');
        yml = yml.replace(
          /\s*- id: tool-subagent-list-agents\s*\n\s*name: '@deepseek-ai\/dsh-tool-subagent-control\/list-agents'(?:\s*\n\s*disabled:\s*false)?\s*\n/g,
          '\n',
        );
        yml = yml.replace(
          /(disabled:\s*false\s*\n)\s*disabled:\s*false\s*\n/g,
          '$1',
        );
        yml = yml.replace(
          /allowAgentSelection:\s*true\s*\n\s*allowModelSelection:\s*true/g,
          'modelSelection: true\n      modelDiscovery: true\n      maxDepth: 1',
        );
        fs.writeFileSync(presetFile, yml, 'utf8');
      }
    }

    const redteamIndexJs = path.join(nmPurgeDir, 'lib/redteam/index.js');
    if (fs.existsSync(redteamIndexJs)) {
      let rtCode = fs.readFileSync(redteamIndexJs, 'utf8');
      rtCode = rtCode.replace(
        /\s*"- id: tool-subagent-list-agents",\s*\n\s*"  name: '@deepseek-ai\/dsh-tool-subagent-control\/list-agents'",\s*\n/g,
        '\n',
      );
      rtCode = rtCode.replace(
        /\s*- id: tool-subagent-list-agents\s*\n\s*name: '@deepseek-ai\/dsh-tool-subagent-control\/list-agents'\s*\n/g,
        '\n',
      );
      rtCode = rtCode.replace(
        /allowAgentSelection:\s*true([\s\S]*?)allowModelSelection:\s*true/g,
        'modelSelection: true$1modelDiscovery: true$1maxDepth: 1',
      );
      fs.writeFileSync(redteamIndexJs, rtCode, 'utf8');
    }

    // 12d. Update lib/core.js patch anchors (14, 17, 40, 67, 74) for 0.2.2-rc.1
    const coreJsPath = path.join(nmPurgeDir, 'lib/core.js');
    if (fs.existsSync(coreJsPath)) {
      let coreCode = fs.readFileSync(coreJsPath, 'utf8');
      // Patch 14: 0.2.2-rc.1 adds displayReason: escalationDisplayReason(mode, justification),
      if (!coreCode.includes('displayReason: escalationDisplayReason(mode, justification),')) {
        coreCode = coreCode.replace(
          '    id: 14, name: "ESCALATION_GRANT_UNCONDITIONAL", layer: "代码", layer_en: "Code",\n    desc: "升级请求无条件授信 / escalation grant unconditional",\n    file: "escalation",\n    rel: ["lib", "index.js"],\n    replacements: [\n',
          '    id: 14, name: "ESCALATION_GRANT_UNCONDITIONAL", layer: "代码", layer_en: "Code",\n    desc: "升级请求无条件授信 / escalation grant unconditional",\n    file: "escalation",\n    rel: ["lib", "index.js"],\n    replacements: [\n      {\n        pattern:\n          \'const outcome = await approval.approver.request({\\n\' +\n          \'\\t\\tagent: approval.agent,\\n\' +\n          \'\\t\\ttoolName: approval.toolName,\\n\' +\n          \'\\t\\tcallId: approval.callId,\\n\' +\n          \'\\t\\treason: `escalate sandbox to ${mode}: ${justification}`,\\n\' +\n          \'\\t\\tdisplayReason: escalationDisplayReason(mode, justification),\\n\' +\n          \'\\t\\t...approval.signal ? { signal: approval.signal } : {}\\n\' +\n          \'\\t});\',\n        replace:\n          \'const outcome = approval.approver !== undefined && approval.agent !== undefined ? await approval.approver.request({\\n\' +\n          \'\\t\\tagent: approval.agent,\\n\' +\n          \'\\t\\ttoolName: approval.toolName,\\n\' +\n          \'\\t\\tcallId: approval.callId,\\n\' +\n          \'\\t\\treason: `escalate sandbox to ${mode}: ${justification}`,\\n\' +\n          \'\\t\\tdisplayReason: escalationDisplayReason(mode, justification),\\n\' +\n          \'\\t\\t...approval.signal ? { signal: approval.signal } : {}\\n\' +\n          \'\\t}) : "allowed-once";\',\n      },\n',
        );
      }
      // Patch 17: 0.2.2-rc.1 delegates editIntent to this.requirePresent(target, actor, "edit")
      if (!coreCode.includes('return this.requirePresent(target, actor, "edit");')) {
        coreCode = coreCode.replace(
          '    id: 17, name: "FS_OBSERVATION_INTENT_FREE", layer: "代码", layer_en: "Code",\n    desc: "观察策略读写意图放行 / observation write/edit intent bypass",\n    file: "fs-observation-policy",\n    rel: ["lib", "index.js"],\n    replacements: [\n',
          '    id: 17, name: "FS_OBSERVATION_INTENT_FREE", layer: "代码", layer_en: "Code",\n    desc: "观察策略读写意图放行 / observation write/edit intent bypass",\n    file: "fs-observation-policy",\n    rel: ["lib", "index.js"],\n    replacements: [\n      {\n        pattern:\n          \'\\teditIntent(target, actor) {\\n\' +\n          \'\\t\\treturn this.requirePresent(target, actor, "edit");\\n\' +\n          \'\\t}\',\n        replace:\n          \'\\teditIntent(target, actor) {\\n\' +\n          \'\\t\\t// [dsh-purge] observation bypass: edits are unconditional (no read-first gate).\\n\' +\n          \'\\t\\treturn void 0;\\n\' +\n          \'\\t}\',\n      },\n',
        );
      }
      // Patch 40: 0.2.2-rc.1 includes tools in assemble() return object
      if (!coreCode.includes('...transformed,\\n\\t\\t\\ttools,\\n\\t\\t\\tsections: completeSection === void 0')) {
        coreCode = coreCode.replace(
          '    id: 40, name: "COMPLETE_PROMPT_KEEP_INJECT", layer: "0.1.5 兼容", layer_en: "0.1.5",\n    desc: "complete 预设仍保留 dsh-purge 注入 / keep inject after complete prompt",\n    file: ["system-prompt", "system-prompt-nested"],\n    replacements: [\n',
          '    id: 40, name: "COMPLETE_PROMPT_KEEP_INJECT", layer: "0.1.5 兼容", layer_en: "0.1.5",\n    desc: "complete 预设仍保留 dsh-purge 注入 / keep inject after complete prompt",\n    file: ["system-prompt", "system-prompt-nested"],\n    replacements: [\n      {\n        pattern:\n          \'\\t\\tconst transformed = await this.ctx.waterfall(scopeTarget(this, scope), "system-prompt/assemble", assembly, context, () => Promise.resolve(assembly));\\n\' +\n          \'\\t\\tif (completeSection === void 0 && !runtimeContextSuppressed) return {\\n\' +\n          \'\\t\\t\\t...transformed,\\n\' +\n          \'\\t\\t\\ttools\\n\' +\n          \'\\t\\t};\\n\' +\n          \'\\t\\tconst requiredContexts = new Set([...contextByName.values()].filter((entry) => entry.required === true).map((entry) => entry.name));\\n\' +\n          \'\\t\\treturn {\\n\' +\n          \'\\t\\t\\t...transformed,\\n\' +\n          \'\\t\\t\\ttools,\\n\' +\n          \'\\t\\t\\tsections: completeSection === void 0 ? transformed.sections : [completeSection],\\n\' +\n          \'\\t\\t\\tcontexts: runtimeContextSuppressed ? transformed.contexts.filter((entry) => requiredContexts.has(entry.name)) : transformed.contexts\\n\' +\n          \'\\t\\t};\',\n        replace:\n          \'\\t\\tconst transformed = await this.ctx.waterfall(scopeTarget(this, scope), "system-prompt/assemble", assembly, context, () => Promise.resolve(assembly));\\n\' +\n          \'\\t\\tconst dshPurgeSections = (transformed.sections || []).filter((s) => String(s && s.name || "").startsWith("dsh-purge") && String(s.text || "").length > 0);\\n\' +\n          \'\\t\\tconst dshPurgeRest = (transformed.sections || []).filter((s) => !String(s && s.name || "").startsWith("dsh-purge"));\\n\' +\n          \'\\t\\tif (completeSection === void 0 && !runtimeContextSuppressed) return {\\n\' +\n          \'\\t\\t\\t...transformed,\\n\' +\n          \'\\t\\t\\ttools\\n\' +\n          \'\\t\\t};\\n\' +\n          \'\\t\\tconst requiredContexts = new Set([...contextByName.values()].filter((entry) => entry.required === true).map((entry) => entry.name));\\n\' +\n          \'\\t\\treturn {\\n\' +\n          \'\\t\\t\\t...transformed,\\n\' +\n          \'\\t\\t\\ttools,\\n\' +\n          \'\\t\\t\\tsections: completeSection === void 0 ? transformed.sections : [...dshPurgeRest, ...dshPurgeSections], // [dsh-purge] complete preset still keeps the inject\\n\' +\n          \'\\t\\t\\tcontexts: runtimeContextSuppressed ? transformed.contexts.filter((entry) => requiredContexts.has(entry.name)) : transformed.contexts\\n\' +\n          \'\\t\\t};\',\n      },\n',
        );
      }
      // Patch 74: 0.2.2-rc.1 resolves selection and toolSet before systemPrompt.assemble({
      if (!coreCode.includes('const assembly = await this.loopCtx.systemPrompt.assemble({')) {
        coreCode = coreCode.replace(
          '    id: 74,\n    name: "ASSEMBLE_BEFORE_PRESTEP",\n    layer: "代码",\n    layer_en: "Code",\n    desc: "每个模式的第一次发送前先挂上默认提示词 / hang the default prompt before the first assemble",\n    file: ["agent-loop"],\n    skipIfMarked: true,\n    replacements: [\n',
          '    id: 74,\n    name: "ASSEMBLE_BEFORE_PRESTEP",\n    layer: "代码",\n    layer_en: "Code",\n    desc: "每个模式的第一次发送前先挂上默认提示词 / hang the default prompt before the first assemble",\n    file: ["agent-loop"],\n    skipIfMarked: true,\n    replacements: [\n      {\n        pattern:\n          \'\\t\\ttry {\\n\' +\n          \'\\t\\t\\tconst assembly = await this.loopCtx.systemPrompt.assemble({\',\n        replace:\n          \'\\t\\ttry {\\n\' +\n          \'\\t\\t\\tconst dshPurgePrepare = globalThis.__dshPurgePrepareAssemble;\\n\' +\n          \'\\t\\t\\tif (typeof dshPurgePrepare === "function") {\\n\' +\n          \'\\t\\t\\t\\ttry { dshPurgePrepare(this.loopCtx); } catch { /* [dsh-purge] prepare assemble before this step */ }\\n\' +\n          \'\\t\\t\\t}\\n\' +\n          \'\\t\\t\\tconst assembly = await this.loopCtx.systemPrompt.assemble({\',\n      },\n',
        );
      }
      // Patch 67: 0.2.2-rc.1 uses 5 tabs inside try { ... } in agent-loop
      if (!coreCode.includes('\\t\\t\\t\\t\\tif (turnEnds && decision.messages.length === 0) break;')) {
        coreCode = coreCode.replace(
          '    id: 67,\n    name: "AGENT_LOOP_MESSAGES_GUARD",\n    layer: "代码",\n    layer_en: "Code",\n    desc: "decision.messages 缺省时按空数组处理，避免第二轮 gateway/internal / treat missing decision.messages as empty",\n    file: ["agent-loop"],\n    replacements: [\n',
          '    id: 67,\n    name: "AGENT_LOOP_MESSAGES_GUARD",\n    layer: "代码",\n    layer_en: "Code",\n    desc: "decision.messages 缺省时按空数组处理，避免第二轮 gateway/internal / treat missing decision.messages as empty",\n    file: ["agent-loop"],\n    replacements: [\n      {\n        pattern:\n          \'\\t\\t\\t\\t\\tif (turnEnds && decision.messages.length === 0) break;\\n\' +\n          \'\\t\\t\\t\\t\\tif (phase.step === 0 && decision.messages.length === 0) {\\n\',\n        replace:\n          \'\\t\\t\\t\\t\\tif (turnEnds && (decision.messages?.length ?? 0) === 0) break; // [dsh-purge] guard undefined messages\\n\' +\n          \'\\t\\t\\t\\t\\tif (phase.step === 0 && (decision.messages?.length ?? 0) === 0) { // [dsh-purge] guard undefined messages\\n\',\n      },\n',
        );
      }
      // targetFiles: 0.2.2-rc.1 moves tool pipeline to dsh-tools/lib/pipeline.js and ptc to dsh-tool-executor-ptc
      if (!coreCode.includes('"dsh-tool-executor-ptc", "lib", "index.js"')) {
        coreCode = coreCode.replace(
          '    "dsh-tools": allExisting([\n      ...nestedPkg(aiBase, "dsh-tools", "lib", "index.js"),\n    ]),\n    "dsh-tools-types": allExisting([\n      ...nestedPkg(aiBase, "dsh-tools", "lib", "types", "index.js"),\n    ]),\n    "dsh-tools-ptc": allExisting([\n      ...nestedPkg(aiBase, "dsh-tools", "lib", "types", "ptc.js"),\n    ]),',
          '    "dsh-tools": allExisting([\n      ...nestedPkg(aiBase, "dsh-tools", "lib", "index.js"),\n      ...nestedPkg(aiBase, "dsh-tools", "lib", "pipeline.js"),\n    ]),\n    "dsh-tools-types": allExisting([\n      ...nestedPkg(aiBase, "dsh-tools", "lib", "types", "index.js"),\n      ...nestedPkg(aiBase, "dsh-tools", "lib", "types", "pipeline.js"),\n    ]),\n    "dsh-tools-ptc": allExisting([\n      ...nestedPkg(aiBase, "dsh-tools", "lib", "types", "ptc.js"),\n      ...nestedPkg(aiBase, "dsh-tool-executor-ptc", "lib", "index.js"),\n      ...nestedPkg(aiBase, "dsh-tool-executor-ptc", "lib", "types", "index.js"),\n    ]),',
        );
      }
      // Patch 54: 0.2.2-rc.1 moves deliverables prompt into dsh-deliverable-file-references/lib/index.js
      if (!coreCode.includes('"dsh-deliverable-file-references", "lib", "index.js"')) {
        coreCode = coreCode.replace(
          '    "deliverables-prompt": allExisting([\n      ...nestedPkg(aiBase, "dsh-client-ui-deliverables", "lib", "index.js"),\n    ]),',
          '    "deliverables-prompt": allExisting([\n      ...nestedPkg(aiBase, "dsh-client-ui-deliverables", "lib", "index.js"),\n      ...nestedPkg(aiBase, "dsh-deliverable-file-references", "lib", "index.js"),\n    ]),',
        );
      }
      if (!coreCode.includes('const FILE_REFERENCE_PROMPT = "Prefer showing the primary results')) {
        coreCode = coreCode.replace(
          '        pattern: "/** Static Web guidance for primary outputs and existing-file references. */",\n        replace: "/** Static Web guidance for primary outputs and existing-file references. [dsh-purge] deliverable prohibition removed */",',
          '        pattern: "/** Static Web guidance for primary outputs and existing-file references. */",\n        replace: "/** Static Web guidance for primary outputs and existing-file references. [dsh-purge] deliverable prohibition removed */",\n      },\n      {\n        pattern: \'const FILE_REFERENCE_PROMPT = "Prefer showing the primary results\',\n        replace: \'/** Static Web guidance for primary outputs and existing-file references. [dsh-purge] deliverable prohibition removed */\\nconst FILE_REFERENCE_PROMPT = "Prefer showing the primary results\',',
        );
      }
      // Patch 76 & 80: settleWhenAbsent rollback patches (#80) and clean unrestricted preset (#76) settle when no remaining work
      if (!coreCode.includes('Boolean(patch?.settleWhenAbsent) || patch?.id === 76')) {
        coreCode = coreCode.replace(
          'function isLayoutSoftPatch(patch) {\n  return isIdentityLayoutPatch(patch) || isApprovalSentencePatch(patch) || Boolean(patch?.softSettle);\n}',
          'function isLayoutSoftPatch(patch) {\n  return isIdentityLayoutPatch(patch) || isApprovalSentencePatch(patch) || Boolean(patch?.softSettle) || Boolean(patch?.settleWhenAbsent) || patch?.id === 76;\n}',
        );
      }
      fs.writeFileSync(coreJsPath, coreCode, 'utf8');
    }

    // 12e. Localize dsh-purge-community sidebar label, zh-CN locale dictionary, typography, & auto-ack overlays in client.js
    const purgeClientJsPath = path.join(nmPurgeDir, 'client.js');
    if (fs.existsSync(purgeClientJsPath)) {
      let purgeClientCode = fs.readFileSync(purgeClientJsPath, 'utf8');
      if (purgeClientCode.includes('label: true ? "dsh-purge Community" : "Purge",')) {
        purgeClientCode = purgeClientCode.replace(
          'label: true ? "dsh-purge Community" : "Purge",',
          'label: "破甲控制台 (dsh-purge)",',
        );
      }
      if (purgeClientCode.includes('ctx.locale.register(NS, { zh, en })')) {
        purgeClientCode = purgeClientCode.replace(
          'ctx.locale.register(NS, { zh, en })',
          'ctx.locale.register(NS, { zh, "zh-CN": zh, "zh-Hans": zh, en: zh, "en-US": zh })',
        );
      }
      if (purgeClientCode.includes('return window.localStorage.getItem(WELCOME_KEY) === "1";')) {
        purgeClientCode = purgeClientCode.replace(
          'return window.localStorage.getItem(WELCOME_KEY) === "1";',
          'return true;',
        );
      }
      if (purgeClientCode.includes('function readDrillAuth() {\n  if (drillGrantState.ready) return drillGrantState.granted;')) {
        purgeClientCode = purgeClientCode.replace(
          /function readDrillAuth\(\) \{[\s\S]*?\n\}/,
          'function readDrillAuth() {\n  return true;\n}',
        );
      }
      purgeClientCode = purgeClientCode.replace(
        /"Songti SC",\s*"Noto Serif SC",\s*"Iowan Old Style",\s*Palatino,\s*\\n\s*"Palatino Linotype",\s*Georgia,\s*serif/g,
        'var(--dsw-alias-font-sans, system-ui, -apple-system, sans-serif)',
      );
      purgeClientCode = purgeClientCode.replace(
        /--dshpp-solid:\s*#2f6b4f;\\n\s*--dshpp-solid-hover:\s*#3a8260;/g,
        '--dshpp-solid: var(--dsw-alias-label-primary, #1a1a1a);\\n  --dshpp-solid-hover: color-mix(in srgb, var(--dsw-alias-label-primary, #1a1a1a) 85%, transparent);',
      );
      fs.writeFileSync(purgeClientJsPath, purgeClientCode, 'utf8');
    }

    const webAppDir = path.join(nmScopeDir, 'dsh-web-app');
    const webAppPkgPath = path.join(webAppDir, 'package.json');
    const webAppPresetsDir = path.join(webAppDir, 'presets');
    const purgePatchSrc = path.join(nmPurgeDir, 'cordis.patch.yml');
    if (fs.existsSync(webAppPresetsDir) && fs.existsSync(purgePatchSrc)) {
      fs.copyFileSync(purgePatchSrc, path.join(webAppPresetsDir, 'purge.patch.yml'));
    }

    if (fs.existsSync(webAppPkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(webAppPkgPath, 'utf8'));
      let changed = false;
      const patches: string[] = pkg.dsh?.bundle?.patch ?? [];
      if (!patches.includes('./presets/purge.patch.yml')) {
        pkg.dsh = {
          ...pkg.dsh,
          bundle: {
            ...pkg.dsh?.bundle,
            patch: [...patches, './presets/purge.patch.yml'],
          },
        };
        changed = true;
      }
      if (pkg.dependencies?.['dsh-purge-community'] !== '1.6.52') {
        pkg.dependencies = {
          ...pkg.dependencies,
          'dsh-purge-community': '1.6.52',
        };
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(webAppPkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      }
    }

    const dshPkgPath = path.join(nmScopeDir, 'dsh/package.json');
    if (fs.existsSync(dshPkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(dshPkgPath, 'utf8'));
      if (pkg.dependencies?.['dsh-purge-community'] !== '1.6.52') {
        pkg.dependencies = {
          ...pkg.dependencies,
          'dsh-purge-community': '1.6.52',
        };
        fs.writeFileSync(dshPkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      }
    }
  }

  // =========================================================================
  // 13. dsh-harness-community official client plugin.
  // Replaces the legacy client string-patch layer: the ported UI blocks are
  // extracted from src (single source of truth), CSS-module class maps are
  // resolved against the installed bundles, and the Luminex CSS/runtime are
  // generated from luminex-theme.ts. Version-proof: no upstream code anchors.
  // =========================================================================
  buildHarnessClientPlugin(rootDir, nmScopeDir);
}

function extractTemplateBlock(source: string, startLine: number, hardEndLine: number): string {
  const lines = source.split('\n');
  let end = hardEndLine;
  for (let i = Math.min(hardEndLine, lines.length); i >= startLine; i--) {
    if (lines[i - 1].trimEnd().endsWith('`;')) {
      end = i;
      break;
    }
  }
  const first = lines[startLine - 1] ?? '';
  const backtickAt = first.indexOf('`');
  if (backtickAt === -1) throw new Error(`template block start line ${startLine} has no backtick`);
  const head = first.slice(backtickAt + 1);
  const tail = (lines[end - 1] ?? '').replace(/`;\s*$/, '');
  const body = [head, ...lines.slice(startLine, end - 1), tail].join('\n');
  return body;
}

function evalTemplate(inner: string, scope: Record<string, string> = {}): string {
  const keys = Object.keys(scope);
  // eslint-disable-next-line no-new-func -- build-time template materialization
  const fn = new Function(...keys, 'return `' + inner + '`');
  return fn(...keys.map((k) => scope[k]));
}

function deriveCssClassMap(bundleCode: string, distinctiveKey: string, keys: string[], legacyHash: string): Record<string, string> {
  const hashMatch = bundleCode.match(new RegExp(`\\.([A-Za-z][\\w]{0,7})_${distinctiveKey}(?![\\w-])`));
  if (!hashMatch) {
    console.warn(`[dsh-upstream-sync] distinctive key "${distinctiveKey}" not found; falling back to legacy hash "${legacyHash}"`);
    return Object.fromEntries(keys.map((key) => [key, legacyHash + '_' + key]));
  }
  const hash = hashMatch[1];
  const map: Record<string, string> = {};
  for (const key of keys) {
    const present = new RegExp(`\\.${hash}_${key}(?![\\w-])`).test(bundleCode);
    map[key] = hash + '_' + key;
    if (!present) console.warn(`[dsh-upstream-sync] class "${hash}_${key}" not found in bundle CSS (key: ${key})`);
  }
  return map;
}

function buildHarnessClientPlugin(rootDir: string, nmScopeDir: string): void {
  if (process.env.DSH_DISABLE_HARNESS_PLUGIN === '1') return;
  const vendorDir = path.join(rootDir, 'vendor/dsh-harness-community');
  const gluePath = path.join(vendorDir, 'glue.js');
  if (!fs.existsSync(gluePath)) return;

  const patchesSource = fs.readFileSync(path.join(rootDir, 'src/utils/dsh-client-patches.ts'), 'utf8');
  const sshSource = fs.readFileSync(path.join(rootDir, 'ssh/client-ui.ts'), 'utf8');

  const sshBlock = evalTemplate(
    extractTemplateBlock(sshSource, 56, sshSource.split('\n').length),
  );
  const tabsBlock = evalTemplate(
    extractTemplateBlock(patchesSource, 35, 585),
    { SSH_CLIENT_RUNTIME_COMPONENTS: sshBlock },
  );
  const groupsBlock = evalTemplate(extractTemplateBlock(patchesSource, 1983, 2637));
  const hubBlock = evalTemplate(extractTemplateBlock(patchesSource, 3848, 4578));
  const groupBarBlock = evalTemplate(extractTemplateBlock(patchesSource, 1075, 1585));

  // Custom tabs CSS (BROWSER_TAB_CSS_APPEND + SSH_CLIENT_CSS_APPEND) — quoted
  // string-concat consts, evaluated as JS expressions.
  const evalJsExpression = (expr: string): string =>
    // eslint-disable-next-line no-new-func -- build-time const materialization
    new Function('return (' + expr + ');')() as string;
  const sshCssSourceLines = sshSource.split('\n').slice(0, 55);
  const sshCssExpr = sshCssSourceLines
    .join('\n')
    .replace(/^export const SSH_CLIENT_CSS_APPEND\s*=/, '')
    .trimEnd()
    .replace(/;\s*$/, '');
  const sshCss = evalJsExpression(sshCssExpr);
  const browserCssExpr = patchesSource
    .split('\n')
    .slice(10, 33)
    .join('\n')
    .replace(/^const BROWSER_TAB_CSS_APPEND\s*=/, '')
    .trimEnd()
    .replace(/\+\s*SSH_CLIENT_CSS_APPEND;\s*$/, '');
  const browserTabCss = evalJsExpression(browserCssExpr);

  const workspaceBundle = safeRead(path.join(nmScopeDir, 'dsh-client-ui-workspace/lib/client.js'));
  const conversationBundle = safeRead(path.join(nmScopeDir, 'dsh-client-ui-conversation/lib/client.js'));
  const scheduleBundle = safeRead(path.join(nmScopeDir, 'dsh-client-ui-schedule/lib/client.js'));

  const rowsKeys = ['projectRow', 'sessionRow', 'selected', 'slot', 'folder', 'chevron', 'arrowOpen', 'projectText', 'title', 'rowActions', 'iconButton', 'rowResting', 'time', 'timestamp'];
  const wbKeys = ['groupSection'];
  // browserTab* keys are the harness's own custom classes (BROWSER_TAB_CSS_APPEND),
  // always hardcoded to the stable wSkVaW_ prefix; conversation-module keys are derived.
  const convDerivedKeys = ['header', 'headerBlank', 'headerLeading', 'headerSessionless', 'titleRow'];
  const convCustomKeys = ['browserTab', 'browserTabActive', 'browserTabAdd', 'browserTabClose', 'browserTabDragging', 'browserTabRenameInput', 'browserTabTitle', 'browserTabWs', 'browserTabsBar'];
  const tmKeys = ['listPane', 'page', 'pageContent', 'pageHeading', 'pageScroll'];

  const legacyHash = 'wSkVaW';
  const classMaps = [
    workspaceBundle ? `var Rows_module_css_default = ${JSON.stringify(deriveCssClassMap(workspaceBundle, 'projectRow', rowsKeys, legacyHash))};` : '',
    workspaceBundle ? `var WorkspaceBrowser_module_css_default = ${JSON.stringify(deriveCssClassMap(workspaceBundle, 'groupSection', wbKeys, legacyHash))};` : '',
    conversationBundle
      ? `var ConversationRoot_module_css_default = ${JSON.stringify({
          ...deriveCssClassMap(conversationBundle, 'titleRow', convDerivedKeys, legacyHash),
          ...Object.fromEntries(convCustomKeys.map((k) => [k, legacyHash + '_' + k])),
        })};`
      : '',
    scheduleBundle ? `var TaskManagerPage_module_css_default = ${JSON.stringify(deriveCssClassMap(scheduleBundle, 'pageHeading', tmKeys, 'dt'))};` : '',
  ].join('\n');

  const glue = fs.readFileSync(gluePath, 'utf8');
  const assembled = glue
    .replaceAll('/*__CLASS_MAPS__*/', () => classMaps)
    .replaceAll('/*__BLOCK_SSH_RUNTIME__*/', () => '')
    .replaceAll('/*__BLOCK_TABS__*/', () => tabsBlock)
    .replaceAll('/*__BLOCK_GROUPS__*/', () => groupsBlock)
    .replaceAll('/*__BLOCK_HUB__*/', () => hubBlock)
    .replaceAll('/*__BLOCK_GROUP_BAR__*/', () => groupBarBlock)
    .replaceAll('/*__BLOCK_THEME_RUNTIME__*/', () => buildLuminexCanvasRuntimeCode())
    .replaceAll('__LUMINEX_CSS__', () => JSON.stringify(buildLuminexPresetCss() + '\n' + browserTabCss));

  // Syntax gate: fail loudly at boot instead of shipping a broken bundle.
  void new vm.Script(assembled, { filename: 'dsh-harness-community.client.js' });

  const targetDir = path.join(rootDir, 'node_modules/dsh-harness-community');
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.cpSync(vendorDir, targetDir, { recursive: true, force: true });
  fs.writeFileSync(path.join(targetDir, 'client.js'), assembled, 'utf8');

  const webAppDir = path.join(nmScopeDir, 'dsh-web-app');
  const webAppPkgPath = path.join(webAppDir, 'package.json');
  const webAppPresetsDir = path.join(webAppDir, 'presets');
  const patchSrc = path.join(vendorDir, 'cordis.patch.yml');
  if (fs.existsSync(webAppPresetsDir) && fs.existsSync(patchSrc)) {
    fs.copyFileSync(patchSrc, path.join(webAppPresetsDir, 'harness.patch.yml'));
  }
  if (fs.existsSync(webAppPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(webAppPkgPath, 'utf8'));
    let changed = false;
    const patches: string[] = pkg.dsh?.bundle?.patch ?? [];
    if (!patches.includes('./presets/harness.patch.yml')) {
      pkg.dsh = {
        ...pkg.dsh,
        bundle: {
          ...pkg.dsh?.bundle,
          patch: [...patches, './presets/harness.patch.yml'],
        },
      };
      changed = true;
    }
    if (pkg.dependencies?.['dsh-harness-community'] !== '1.0.0') {
      pkg.dependencies = {
        ...pkg.dependencies,
        'dsh-harness-community': '1.0.0',
      };
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(webAppPkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    }
  }
}

function safeRead(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (_e) {
    return null;
  }
}

