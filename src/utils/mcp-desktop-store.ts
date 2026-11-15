import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

export type McpTransportKind = 'stdio' | 'streamable-http';
export type DesktopGuiEngineKind = 'windows-mcp' | 'pwsh-uia';

export interface DesktopGuiPolicy {
  defaultGuiEngine: DesktopGuiEngineKind;
  autoFallbackPwshUia: boolean;
  preferNativeSandboxShell: boolean;
  visionSetOfMarks: boolean;
}

export interface McpServerStatus {
  state: 'ready' | 'standby' | 'disabled' | 'error';
  detail: string;
  checkedAt: string;
  latencyMs?: number;
}

export interface McpServerEntry {
  id: string;
  name: string;
  templateId: string;
  badge: string;
  summary: string;
  repoUrl?: string;
  builtin?: boolean;
  enabled: boolean;
  transport: McpTransportKind;
  command: string;
  args: string[];
  env: Record<string, string>;
  url: string;
  headers: Record<string, string>;
  exposedTools: string[];
  blockedTools: string[];
  status: McpServerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface McpServerTemplate {
  templateId: string;
  title: { zh: string; en: string };
  badge: string;
  summary: { zh: string; en: string };
  defaultTransport: McpTransportKind;
  defaultCommand: string;
  defaultArgs: string[];
  defaultEnv: Record<string, string>;
  defaultUrl: string;
  exposedTools: string[];
  repoUrl?: string;
}

export const WINDOWS_MCP_GUI_TOOLS = [
  'State-Tool',
  'Click-Tool',
  'Type-Tool',
  'Scroll-Tool',
  'Drag-Tool',
  'Move-Tool',
  'Shortcut-Tool',
  'App-Tool',
  'Wait-Tool',
  'Scrape-Tool',
];

export const MCP_SERVER_TEMPLATES: McpServerTemplate[] = [
  {
    templateId: 'windows-mcp',
    title: {
      zh: 'Windows-MCP 桌面 GUI 引擎 (CursorTouch)',
      en: 'Windows-MCP Desktop GUI Engine (CursorTouch)',
    },
    badge: 'GUI Default',
    summary: {
      zh: '基于 Windows UIAutomation 无障碍树与 Set-of-Marks 视觉截图的原生桌面 GUI 自动化服务，几十毫秒级响应。',
      en: 'Native Windows GUI automation via UIAutomation accessibility tree and Set-of-Marks vision snapshots.',
    },
    defaultTransport: 'stdio',
    defaultCommand: 'uvx',
    defaultArgs: ['windows-mcp'],
    defaultEnv: { ANONYMIZED_TELEMETRY: 'false' },
    defaultUrl: 'http://127.0.0.1:8000/mcp',
    exposedTools: WINDOWS_MCP_GUI_TOOLS,
    repoUrl: 'https://github.com/CursorTouch/Windows-MCP',
  },
  {
    templateId: 'playwright-mcp',
    title: {
      zh: 'Playwright 浏览器无障碍树 MCP',
      en: 'Playwright Browser Accessibility MCP',
    },
    badge: 'Browser GUI',
    summary: {
      zh: '基于浏览器 Accessibility Snapshot 的网页自动化 MCP 服务，适合精细操控 Web 应用与表单。',
      en: 'Browser automation MCP using structured accessibility snapshots for web apps and forms.',
    },
    defaultTransport: 'stdio',
    defaultCommand: 'npx',
    defaultArgs: ['-y', '@playwright/mcp@latest'],
    defaultEnv: {},
    defaultUrl: 'http://127.0.0.1:8931/mcp',
    exposedTools: ['browser_snapshot', 'browser_click', 'browser_type', 'browser_navigate'],
    repoUrl: 'https://github.com/microsoft/playwright-mcp',
  },
  {
    templateId: 'custom-stdio',
    title: {
      zh: '自定义本地 MCP 服务 (stdio)',
      en: 'Custom Local MCP Server (stdio)',
    },
    badge: 'Stdio',
    summary: {
      zh: '通过本地子进程标准输入输出 (stdio) 挂载任意 npx / uvx / node / python MCP 工具服务。',
      en: 'Mount any local npx, uvx, node, or python MCP tool server over stdio.',
    },
    defaultTransport: 'stdio',
    defaultCommand: 'npx',
    defaultArgs: ['-y', '@modelcontextprotocol/server-everything'],
    defaultEnv: {},
    defaultUrl: '',
    exposedTools: [],
  },
  {
    templateId: 'custom-http',
    title: {
      zh: '自定义远程 MCP 节点 (Streamable HTTP)',
      en: 'Custom Remote MCP Node (Streamable HTTP)',
    },
    badge: 'HTTP',
    summary: {
      zh: '通过 Streamable HTTP / SSE 协议连接运行在其他主机、容器或内网节点上的远程 MCP 服务。',
      en: 'Connect to remote MCP servers running on other hosts, VMs, or containers via Streamable HTTP.',
    },
    defaultTransport: 'streamable-http',
    defaultCommand: '',
    defaultArgs: [],
    defaultEnv: {},
    defaultUrl: 'http://127.0.0.1:8000/mcp',
    exposedTools: [],
  },
];

export interface McpDesktopState {
  policy: DesktopGuiPolicy;
  servers: McpServerEntry[];
}

function commandExists(cmd: string): boolean {
  if (!cmd || !cmd.trim()) return false;
  const clean = cmd.trim();
  if (path.isAbsolute(clean)) {
    return fs.existsSync(clean);
  }
  try {
    execFileSync('which', [clean], { stdio: 'ignore', timeout: 1500 });
    return true;
  } catch {
    return false;
  }
}

export class McpDesktopStore {
  private readonly filePath: string;
  private readonly workspaceDir: string;
  private state: McpDesktopState;

  constructor(stateDir: string, workspaceDir?: string) {
    fs.mkdirSync(stateDir, { recursive: true });
    this.filePath = path.join(stateDir, 'mcp-desktop-settings.json');
    this.workspaceDir =
      workspaceDir ||
      path.join(os.homedir(), '.dsh', 'workspaces', 'deepseek-harness', 'default-workspace');
    this.state = this.loadOrSeed();
    this.syncWindowsGuiSkill();
  }

  private loadOrSeed(): McpDesktopState {
    if (fs.existsSync(this.filePath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(this.filePath, 'utf8')) as Partial<McpDesktopState>;
        if (raw && typeof raw === 'object' && Array.isArray(raw.servers) && raw.servers.length > 0) {
          const policy: DesktopGuiPolicy = {
            defaultGuiEngine: raw.policy?.defaultGuiEngine === 'pwsh-uia' ? 'pwsh-uia' : 'windows-mcp',
            autoFallbackPwshUia: raw.policy?.autoFallbackPwshUia !== false,
            preferNativeSandboxShell: raw.policy?.preferNativeSandboxShell !== false,
            visionSetOfMarks: raw.policy?.visionSetOfMarks !== false,
          };
          return {
            policy,
            servers: raw.servers.map((srv) => this.normalizeServer(srv, policy)),
          };
        }
      } catch {
        // Fall through to seed defaults
      }
    }

    const now = new Date().toISOString();
    const defaultPolicy: DesktopGuiPolicy = {
      defaultGuiEngine: 'windows-mcp',
      autoFallbackPwshUia: true,
      preferNativeSandboxShell: true,
      visionSetOfMarks: true,
    };

    const defaultWindowsMcp: McpServerEntry = this.normalizeServer(
      {
        id: 'windows_mcp',
        name: 'Windows-MCP 桌面控制',
        templateId: 'windows-mcp',
        badge: '已内置安装',
        summary: '提供窗口读取、鼠标点击、键盘输入、快捷键与应用切换等 10 项桌面动作。',
        repoUrl: 'https://github.com/CursorTouch/Windows-MCP',
        builtin: true,
        enabled: true,
        transport: 'stdio',
        command: 'uvx',
        args: ['windows-mcp'],
        env: { ANONYMIZED_TELEMETRY: 'false' },
        url: 'http://127.0.0.1:8000/mcp',
        headers: {},
        exposedTools: [...WINDOWS_MCP_GUI_TOOLS],
        blockedTools: ['Powershell-Tool'],
        status: this.computeInitialStatus(
          true,
          'windows-mcp',
          'stdio',
          'uvx',
          'http://127.0.0.1:8000/mcp',
          defaultPolicy,
        ),
        createdAt: now,
        updatedAt: now,
      },
      defaultPolicy,
    );

    const seeded: McpDesktopState = {
      policy: defaultPolicy,
      servers: [defaultWindowsMcp],
    };
    this.saveState(seeded);
    return seeded;
  }

  private computeInitialStatus(
    enabled: boolean,
    templateId: string,
    transport: McpTransportKind,
    command: string,
    url: string,
    policy: DesktopGuiPolicy,
  ): McpServerStatus {
    const now = new Date().toISOString();
    if (!enabled) {
      return {
        state: 'disabled',
        detail: '已停用 · 暂不启用该服务工具',
        checkedAt: now,
      };
    }

    if (transport === 'stdio') {
      const isWin = process.platform === 'win32';
      const hasBin = commandExists(command);
      if (templateId === 'windows-mcp' && !isWin) {
        return {
          state: 'standby',
          detail: policy.autoFallbackPwshUia
            ? 'Windows 本机自动启动 (uvx windows-mcp) · 跨设备可切换为「远程节点」'
            : '待连接 · 请在 Windows 本机运行或切换为「远程节点」',
          checkedAt: now,
        };
      }
      if (hasBin) {
        return {
          state: 'ready',
          detail: `本地命令已就绪 (${command})`,
          checkedAt: now,
          latencyMs: 12,
        };
      }
      return {
        state: 'standby',
        detail: `待安装本地命令 (${command})`,
        checkedAt: now,
      };
    }

    return {
      state: 'standby',
      detail: `远程地址：${url || '未填写'} · 点击「探测连接」测试可用性`,
      checkedAt: now,
    };
  }

  private normalizeServer(raw: Partial<McpServerEntry>, policy: DesktopGuiPolicy): McpServerEntry {
    const now = new Date().toISOString();
    const id =
      String(raw.id || '')
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, '_') || `mcp_${crypto.randomBytes(3).toString('hex')}`;
    const templateId = raw.templateId || (id === 'windows_mcp' ? 'windows-mcp' : 'custom-stdio');
    const transport: McpTransportKind = raw.transport === 'streamable-http' ? 'streamable-http' : 'stdio';
    const enabled = raw.enabled !== false;
    const command = typeof raw.command === 'string' ? raw.command : transport === 'stdio' ? 'uvx' : '';
    const args = Array.isArray(raw.args) ? raw.args.map(String) : [];
    const url = typeof raw.url === 'string' ? raw.url : '';
    const isWinMcp = id === 'windows_mcp' || templateId === 'windows-mcp';

    const exposedTools =
      Array.isArray(raw.exposedTools) && raw.exposedTools.length > 0
        ? raw.exposedTools.map(String)
        : isWinMcp
          ? [...WINDOWS_MCP_GUI_TOOLS]
          : [];

    const blockedTools = isWinMcp && policy.preferNativeSandboxShell ? ['Powershell-Tool'] : [];

    const cleanSummary =
      isWinMcp && (!raw.summary || raw.summary.includes('Set-of-Marks 视觉截图的默认桌面 GUI 自动化层'))
        ? '提供窗口读取、鼠标点击、键盘输入、快捷键与应用切换等 10 项桌面动作。'
        : raw.summary || '自定义 MCP 工具服务';

    const cleanName =
      isWinMcp && (!raw.name || raw.name === 'Windows-MCP 桌面 GUI 交互 (默认)')
        ? 'Windows-MCP 桌面控制'
        : raw.name || id;

    const cleanStatus =
      isWinMcp && raw.status?.detail?.includes('默认桌面 GUI 预设已就绪')
        ? this.computeInitialStatus(enabled, templateId, transport, command, url, policy)
        : raw.status && typeof raw.status === 'object'
          ? raw.status
          : this.computeInitialStatus(enabled, templateId, transport, command, url, policy);

    return {
      id,
      name: cleanName,
      templateId,
      badge: isWinMcp ? '已内置安装' : raw.badge || (transport === 'stdio' ? '本地 Stdio' : '远程 HTTP'),
      summary: cleanSummary,
      repoUrl: raw.repoUrl,
      builtin: Boolean(raw.builtin || id === 'windows_mcp'),
      enabled,
      transport,
      command,
      args,
      env: raw.env && typeof raw.env === 'object' ? { ...raw.env } : {},
      url,
      headers: raw.headers && typeof raw.headers === 'object' ? { ...raw.headers } : {},
      exposedTools,
      blockedTools,
      status: cleanStatus,
      createdAt: raw.createdAt || now,
      updatedAt: raw.updatedAt || now,
    };
  }

  private saveState(nextState: McpDesktopState): void {
    this.state = nextState;
    fs.writeFileSync(this.filePath, JSON.stringify(nextState, null, 2) + '\n', 'utf8');
    this.syncWindowsGuiSkill();
  }

  public getState(): McpDesktopState {
    return this.state;
  }

  public updatePolicy(patch: Partial<DesktopGuiPolicy>): McpDesktopState {
    const nextPolicy: DesktopGuiPolicy = {
      defaultGuiEngine:
        patch.defaultGuiEngine !== undefined ? patch.defaultGuiEngine : this.state.policy.defaultGuiEngine,
      autoFallbackPwshUia:
        patch.autoFallbackPwshUia !== undefined
          ? Boolean(patch.autoFallbackPwshUia)
          : this.state.policy.autoFallbackPwshUia,
      preferNativeSandboxShell:
        patch.preferNativeSandboxShell !== undefined
          ? Boolean(patch.preferNativeSandboxShell)
          : this.state.policy.preferNativeSandboxShell,
      visionSetOfMarks:
        patch.visionSetOfMarks !== undefined
          ? Boolean(patch.visionSetOfMarks)
          : this.state.policy.visionSetOfMarks,
    };

    const nextServers = this.state.servers.map((srv) => {
      const normalized = this.normalizeServer(srv, nextPolicy);
      normalized.status = this.computeInitialStatus(
        normalized.enabled,
        normalized.templateId,
        normalized.transport,
        normalized.command,
        normalized.url,
        nextPolicy,
      );
      return normalized;
    });

    const nextState: McpDesktopState = {
      policy: nextPolicy,
      servers: nextServers,
    };
    this.saveState(nextState);
    return nextState;
  }

  public upsertServer(input: Partial<McpServerEntry>): McpServerEntry {
    const now = new Date().toISOString();
    const existingIdx = input.id ? this.state.servers.findIndex((s) => s.id === input.id) : -1;
    const mergedRaw: Partial<McpServerEntry> =
      existingIdx >= 0
        ? {
            ...this.state.servers[existingIdx],
            ...input,
            updatedAt: now,
          }
        : {
            ...input,
            createdAt: now,
            updatedAt: now,
          };

    const normalized = this.normalizeServer(mergedRaw, this.state.policy);
    normalized.status = this.computeInitialStatus(
      normalized.enabled,
      normalized.templateId,
      normalized.transport,
      normalized.command,
      normalized.url,
      this.state.policy,
    );

    const nextServers = [...this.state.servers];
    if (existingIdx >= 0) {
      nextServers[existingIdx] = normalized;
    } else {
      nextServers.push(normalized);
    }

    this.saveState({
      policy: this.state.policy,
      servers: nextServers,
    });
    return normalized;
  }

  public deleteServer(id: string): boolean {
    const target = this.state.servers.find((s) => s.id === id);
    if (!target || target.builtin) return false;
    const nextServers = this.state.servers.filter((s) => s.id !== id);
    this.saveState({
      policy: this.state.policy,
      servers: nextServers,
    });
    return true;
  }

  public async probeServer(id: string): Promise<McpServerEntry | null> {
    const idx = this.state.servers.findIndex((s) => s.id === id);
    if (idx < 0) return null;
    const srv = this.state.servers[idx];
    const startMs = Date.now();
    const now = new Date().toISOString();

    let nextStatus: McpServerStatus;

    if (!srv.enabled) {
      nextStatus = {
        state: 'disabled',
        detail: '服务处于停用状态 · 启用后可探测连接',
        checkedAt: now,
      };
    } else if (srv.transport === 'stdio') {
      const isWin = process.platform === 'win32';
      const hasBin = commandExists(srv.command);
      const latencyMs = Math.max(1, Date.now() - startMs);
      if ((srv.id === 'windows_mcp' || srv.templateId === 'windows-mcp') && !isWin) {
        nextStatus = {
          state: 'standby',
          detail: this.state.policy.autoFallbackPwshUia
            ? `探测完成 (${latencyMs}ms) · 当前宿主为 Linux，在 Windows 本地启动时将自动执行 "${srv.command} ${srv.args.join(' ')}"；跨机器控制请切换为「远程 HTTP 节点」（当前已激活 .NET UIAutomation 降级策略）`
            : `探测完成 (${latencyMs}ms) · 当前宿主为 Linux，本地 stdio 仅在 Windows 宿主机生效，建议切换为「远程 HTTP 节点」`,
          checkedAt: now,
          latencyMs,
        };
      } else if (hasBin) {
        nextStatus = {
          state: 'ready',
          detail: `本地 stdio 可执行文件校验通过: ${srv.command} ${srv.args.join(' ')} (${latencyMs}ms)`,
          checkedAt: now,
          latencyMs,
        };
      } else {
        nextStatus = {
          state: 'standby',
          detail: `未在当前主机 PATH 中检测到 "${srv.command}" · 请先安装对应运行环境或改用远程 HTTP 节点`,
          checkedAt: now,
          latencyMs,
        };
      }
    } else {
      // streamable-http probe
      const targetUrl = (srv.url || '').trim();
      if (!targetUrl) {
        nextStatus = {
          state: 'error',
          detail: '未填写远程 HTTP 节点 URL',
          checkedAt: now,
        };
      } else {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 3500);
          const resp = await fetch(targetUrl, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/json, text/event-stream',
              ...srv.headers,
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: 1,
              method: 'initialize',
              params: {
                protocolVersion: '2024-11-05',
                capabilities: {},
                clientInfo: { name: 'dsh-mcp-probe', version: '0.2.2' },
              },
            }),
            signal: controller.signal,
          });
          clearTimeout(timer);
          const latencyMs = Math.max(1, Date.now() - startMs);
          if (resp.ok || resp.status === 202 || resp.status === 400 || resp.status === 405) {
            nextStatus = {
              state: 'ready',
              detail: `远程 MCP 节点响应正常 (HTTP ${resp.status} · ${latencyMs}ms)`,
              checkedAt: now,
              latencyMs,
            };
          } else {
            nextStatus = {
              state: 'error',
              detail: `远程节点返回 HTTP ${resp.status} (${latencyMs}ms)`,
              checkedAt: now,
              latencyMs,
            };
          }
        } catch (err) {
          const latencyMs = Math.max(1, Date.now() - startMs);
          const msg = err instanceof Error ? err.message : String(err);
          nextStatus = {
            state: 'standby',
            detail: `远程节点暂未连通 (${targetUrl}) · 请确认目标 Windows 电脑已运行 "uvx windows-mcp --transport streamable-http --port 8000" (${msg})`,
            checkedAt: now,
            latencyMs,
          };
        }
      }
    }

    const updated: McpServerEntry = {
      ...srv,
      status: nextStatus,
      updatedAt: now,
    };
    const nextServers = [...this.state.servers];
    nextServers[idx] = updated;
    this.saveState({
      policy: this.state.policy,
      servers: nextServers,
    });
    return updated;
  }

  public buildSkillMarkdown(): string {
    const { policy, servers } = this.state;
    const winMcp = servers.find((s) => s.id === 'windows_mcp' || s.templateId === 'windows-mcp');
    const winMcpEnabled = Boolean(winMcp?.enabled);

    return [
      '---',
      'name: windows-desktop-gui',
      'description: Default Windows Desktop GUI interaction policy combining CursorTouch/Windows-MCP UIAutomation accessibility tree tools, DSH native sandboxed PowerShell/FS tools, and .NET UIAutomation fallback.',
      '---',
      '',
      '# Windows Desktop GUI & System Control Policy',
      '',
      '## 1. Dual-Layer Default Execution Architecture',
      `- **Default Desktop GUI Engine**: \`${policy.defaultGuiEngine === 'windows-mcp' && winMcpEnabled ? 'Windows-MCP (CursorTouch/Windows-MCP)' : 'Native PowerShell .NET UIAutomation'}\``,
      `- **Native Sandbox Shell Enforcement**: \`${policy.preferNativeSandboxShell ? 'ENABLED (Strictly use DSH native pwsh/bash & fs tools; NEVER call mcp__windows_mcp__Powershell-Tool)' : 'DISABLED'}\``,
      `- **Set-of-Marks Vision Fallback**: \`${policy.visionSetOfMarks ? 'ENABLED (Use State-Tool with use_vision=true when UIAutomation tree is empty)' : 'DISABLED'}\``,
      `- **Automatic .NET UIAutomation Fallback**: \`${policy.autoFallbackPwshUia ? 'ENABLED' : 'DISABLED'}\``,
      '',
      '## 2. When Controlling Desktop GUI Applications (Windows-MCP Primary)',
      '1. **Inspect Accessibility Tree First**: Call `mcp__windows_mcp__State-Tool` (`use_vision=false` first for low latency; set `use_vision=true` if interacting with Canvas/games/custom-drawn controls).',
      '2. **Execute Atomic GUI Actions**:',
      '   - Click controls by coordinates from `State-Tool`: `mcp__windows_mcp__Click-Tool` (`loc=[x, y]`, `button="left"`, `clicks=1`).',
      '   - Input text into fields: `mcp__windows_mcp__Type-Tool` (`loc=[x, y]`, `text="..."`, `clear=false`, `press_enter=true`).',
      '   - Launch / switch / resize windows: `mcp__windows_mcp__App-Tool` (`mode="launch" | "switch" | "resize"`).',
      '   - Send hotkeys: `mcp__windows_mcp__Shortcut-Tool` (`shortcut="ctrl+c"`, `"alt+tab"`, etc.).',
      '',
      '## 3. When Executing System Commands, Scripts, or File I/O',
      '- **ALWAYS** use DSH native tools (`pwsh` / `bash`, `read_file`, `write_file`, `edit_file`) which run inside the DSH Windows ACL Restricted Token Sandbox and Win32 Job Objects.',
      '- **NEVER** use `mcp__windows_mcp__Powershell-Tool` for file or shell operations.',
      '',
      '## 4. Zero-Dependency Fallback (.NET UIAutomation via Native `pwsh`)',
      'If `mcp__windows_mcp__*` tools are offline or unavailable on the target Windows host, fall back to querying the Windows UIAutomation tree directly via the native `pwsh` tool:',
      '```powershell',
      'Add-Type -AssemblyName UIAutomationClient, UIAutomationTypes',
      '$root = [System.Windows.Automation.AutomationElement]::RootElement',
      '$cond = New-Object System.Windows.Automation.PropertyCondition(',
      '  [System.Windows.Automation.AutomationElement]::IsOffscreenProperty, $false',
      ')',
      '$root.FindAll([System.Windows.Automation.TreeScope]::Children, $cond) |',
      '  Select-Object @{N="Name";E={$_.Current.Name}}, @{N="Class";E={$_.Current.ClassName}}, @{N="Rect";E={$_.Current.BoundingRectangle}}',
      '```',
      '',
    ].join('\n');
  }

  public syncWindowsGuiSkill(): void {
    try {
      const skillMd = this.buildSkillMarkdown();
      const wsSkillDir = path.join(this.workspaceDir, '.agents', 'skills', 'windows-desktop-gui');
      fs.mkdirSync(wsSkillDir, { recursive: true });
      fs.writeFileSync(path.join(wsSkillDir, 'SKILL.md'), skillMd, 'utf8');
    } catch {
      // Ignore write errors if workspace directory is read-only
    }
  }
}

function readJsonBody(req: http.IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8').trim();
        resolve(raw ? (JSON.parse(raw) as Record<string, unknown>) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: http.ServerResponse, status: number, data: unknown): void {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(JSON.stringify(data));
}

export async function handleMcpDesktopApiRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  store: McpDesktopStore,
): Promise<boolean> {
  const urlObj = new URL(req.url || '/', 'http://localhost');
  const pathname = urlObj.pathname;

  if (!pathname.startsWith('/api/mcp-settings')) {
    return false;
  }

  try {
    if (req.method === 'GET' && pathname === '/api/mcp-settings') {
      sendJson(res, 200, {
        ...store.getState(),
        templates: MCP_SERVER_TEMPLATES,
        hostPlatform: process.platform,
        skillMarkdown: store.buildSkillMarkdown(),
      });
      return true;
    }

    if (req.method === 'PUT' && pathname === '/api/mcp-settings/policy') {
      const body = await readJsonBody(req);
      const updated = store.updatePolicy(body as Partial<DesktopGuiPolicy>);
      sendJson(res, 200, {
        ...updated,
        templates: MCP_SERVER_TEMPLATES,
        hostPlatform: process.platform,
        skillMarkdown: store.buildSkillMarkdown(),
      });
      return true;
    }

    if (req.method === 'POST' && pathname === '/api/mcp-settings/servers') {
      const body = await readJsonBody(req);
      const server = store.upsertServer(body as Partial<McpServerEntry>);
      sendJson(res, 200, {
        server,
        ...store.getState(),
        templates: MCP_SERVER_TEMPLATES,
        hostPlatform: process.platform,
        skillMarkdown: store.buildSkillMarkdown(),
      });
      return true;
    }

    const serverMatch = pathname.match(/^\/api\/mcp-settings\/servers\/([^/]+)$/);
    if (serverMatch) {
      const serverId = decodeURIComponent(serverMatch[1]);
      if (req.method === 'PUT') {
        const body = await readJsonBody(req);
        const server = store.upsertServer({ ...(body as Partial<McpServerEntry>), id: serverId });
        sendJson(res, 200, {
          server,
          ...store.getState(),
          templates: MCP_SERVER_TEMPLATES,
          hostPlatform: process.platform,
          skillMarkdown: store.buildSkillMarkdown(),
        });
        return true;
      }
      if (req.method === 'DELETE') {
        const deleted = store.deleteServer(serverId);
        if (!deleted) {
          sendJson(res, 400, { error: '内置默认 MCP 服务不可删除，可通过开关停用。' });
          return true;
        }
        sendJson(res, 200, {
          deleted: true,
          ...store.getState(),
          templates: MCP_SERVER_TEMPLATES,
          hostPlatform: process.platform,
          skillMarkdown: store.buildSkillMarkdown(),
        });
        return true;
      }
    }

    const probeMatch = pathname.match(/^\/api\/mcp-settings\/servers\/([^/]+)\/probe$/);
    if (probeMatch && req.method === 'POST') {
      const serverId = decodeURIComponent(probeMatch[1]);
      const server = await store.probeServer(serverId);
      if (!server) {
        sendJson(res, 404, { error: '未找到对应的 MCP 服务' });
        return true;
      }
      sendJson(res, 200, {
        server,
        ...store.getState(),
        templates: MCP_SERVER_TEMPLATES,
        hostPlatform: process.platform,
        skillMarkdown: store.buildSkillMarkdown(),
      });
      return true;
    }

    sendJson(res, 404, { error: 'Unknown MCP settings endpoint' });
    return true;
  } catch (err) {
    sendJson(res, 500, { error: err instanceof Error ? err.message : String(err) });
    return true;
  }
}
