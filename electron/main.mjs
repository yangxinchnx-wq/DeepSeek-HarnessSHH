import { app, BrowserWindow, dialog, ipcMain, nativeTheme, shell } from 'electron';
import { spawn } from 'node:child_process';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Port is configurable so the shell can coexist with other apps on :3000 —
// set PORT=<n> when launching; the spawned server inherits the same env.
const APP_PORT = Number(process.env.PORT || 3000);
const APP_URL = `http://127.0.0.1:${APP_PORT}`;
const READY_TIMEOUT_MS = 90_000;
const OVERLAY_HEIGHT = 52; // matches .wSkVaW_header / .hHd-Xa_logoRow strip
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Observed GPU-process crashes (exit_code=1) taking down the network service
// and then the whole shell. The UI is a standard web app — software rendering
// is plenty and avoids the flaky GPU/disk-cache path entirely.
app.disableHardwareAcceleration();
// Windows' native window-occlusion tracker can stick in "occluded" after
// focus/coverage changes and then throttle painting forever: the window keeps
// showing a stale frame while the DOM, clicks and state all keep working
// underneath (clicks look dead, mid-drag tab ghosts linger as "overlays").
// Stop Chromium from calculating native occlusion and from throttling this
// window in the background so the shell always paints what it renders.
app.commandLine.appendSwitch("disable-features", "CalculateNativeWinOcclusion");

function resolveServerRoot() {
  // Dev: the shell lives in the project root, so does the server tree.
  // Packaged: electron-builder puts the server tree under resources/server
  // (see electron-builder.yml extraResources), outside the asar.
  if (!app.isPackaged) return app.getAppPath();
  return path.join(process.resourcesPath, 'server');
}

// Server host: prefer the system Node (its ABI matches the natively compiled
// modules in node_modules — node-pty, koffi). Fall back to Electron's built-in
// Node (ELECTRON_RUN_AS_NODE=1) when no system Node is on PATH, e.g. packaged.
function startServerProcess(nodeExe, extraEnv) {
  const root = resolveServerRoot();
  const child = spawn(nodeExe, [path.join(root, 'node_modules', 'tsx', 'dist', 'cli.mjs'), path.join(root, 'server.ts')], {
    cwd: root,
    env: { ...process.env, ...extraEnv },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });

  const tail = [];
  const collect = (chunk) => {
    const text = chunk.toString();
    if (tail.push(text) > 80) tail.shift();
    serverLogTail = tail.join('');
    process.stdout.write(text); // surface server logs in the terminal that launched the shell
  };
  child.stdout.on('data', collect);
  child.stderr.on('data', collect);
  child.on('exit', (code) => {
    if (serverChild === child) serverChild = null;
    if (code !== 0 && code !== null) {
      console.error(`[electron-shell] server exited with code ${code}`);
    }
  });

  return child;
}

function spawnServer() {
  const child = startServerProcess(process.platform === 'win32' ? 'node.exe' : 'node', {});
  child.on('error', (err) => {
    if (serverChild === child) serverChild = null;
    if (err?.code === 'ENOENT' && !fallbackTried) {
      // No system Node on PATH — retry with Electron's embedded Node runtime.
      fallbackTried = true;
      console.warn('[electron-shell] system node not found, falling back to Electron runtime');
      serverChild = startServerProcess(process.execPath, { ELECTRON_RUN_AS_NODE: '1' });
      void waitForServerAndShow(); // re-arm readiness for the fallback process
    } else {
      console.error('[electron-shell] failed to spawn server:', err);
    }
  });

  serverChild = child;
  return child;
}

function killServerTree() {
  const child = serverChild;
  if (!child || child.killed) return;
  serverChild = null;
  if (process.platform === 'win32') {
    // dsh spawns its own children (web UI, sandbox shells) — kill the whole tree
    spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true })
      .on('error', () => child.kill());
  } else {
    try {
      process.kill(-child.pid, 'SIGTERM'); // kill the process group
    } catch {
      child.kill('SIGTERM');
    }
  }
}

function waitForServer(timeoutMs) {
  const startedAt = Date.now();
  return new Promise((resolve, reject) => {
    const probe = () => {
      const req = http.get(APP_URL, (res) => {
        res.resume();
        resolve(res.statusCode || 200);
      });
      req.on('error', () => {
        if (Date.now() - startedAt > timeoutMs) {
          reject(new Error(`server did not become ready within ${timeoutMs / 1000}s at ${APP_URL}`));
        } else {
          setTimeout(probe, 500);
        }
      });
    };
    probe();
  });
}

async function waitForServerAndShow() {
  try {
    await waitForServer(READY_TIMEOUT_MS);
  } catch (err) {
    if (bootFailed) return;
    bootFailed = true;
    dialog.showErrorBox(
      'DeepSeek Harness failed to start',
      `${err instanceof Error ? err.message : String(err)}\n\nServer log tail:\n${serverLogTail || '(no output captured)'}`,
    );
    app.quit();
    return;
  }
  if (bootFailed) return;
  if (!mainWindow) mainWindow = createWindow();
}

// --- Theme-following window-controls overlay (Windows) ---------------------
// The web header strip (.wSkVaW_header + .hHd-Xa_logoRow, both carrying
// data-window-drag) becomes the drag region; the native buttons overlay on the
// right and are recolored from the page's reported theme.

function cssColorToHex(color, fallback) {
  const m = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\)/.exec(color || '');
  if (!m) return fallback;
  if (m[4] !== undefined && Number(m[4]) < 0.5) return fallback;
  const [r, g, b] = [m[1], m[2], m[3]].map((v) => Number(v).toString(16).padStart(2, '0'));
  return `#${r}${g}${b}`;
}

function overlayForReport(report) {
  const themeId = report?.themeId || '';
  const mode = report?.mode || '';
  if (themeId === 'preset-1') {
    return mode === 'light'
      ? { color: '#d7d7d7', symbolColor: '#1a1a1a' }
      : { color: '#222534', symbolColor: '#f8fafc' };
  }
  if (themeId === 'preset-2') {
    return { color: '#E4E4E6', symbolColor: '#2B2D38' };
  }
  return nativeTheme.shouldUseDarkColors
    ? { color: '#151517', symbolColor: '#f8fafc' }
    : { color: '#ffffff', symbolColor: '#1a1a1a' };
}

let lastThemeReport = null;

function applyOverlay(win, report) {
  lastThemeReport = report || null;
  if (process.platform !== 'win32' || typeof win?.setTitleBarOverlay !== 'function' || win.isDestroyed()) return;
  // FIX 2: use the theme's own fixed caption palette. dsh ships its surface as a
  // background IMAGE with a dual-mode body, so the body's computed bg/fg are a
  // poor source for caption colors (they produced dark/black caption squares in
  // the "高级灰" preset). Only the default/system theme follows the system look;
  // preset-1 / preset-2 use their dedicated, always-light-or-dark captions.
  const themeId = report?.themeId || '';
  const knownTheme = themeId === 'preset-1' || themeId === 'preset-2';
  const base = overlayForReport(report);
  const color = knownTheme ? base.color : (report?.bg ? cssColorToHex(report.bg, base.color) : base.color);
  const symbolColor = knownTheme ? base.symbolColor : (report?.fg ? cssColorToHex(report.fg, base.symbolColor) : base.symbolColor);
  try {
    win.setTitleBarOverlay({ ...base, color, symbolColor });
    console.log(`[electron-shell] overlay: ${color} / ${symbolColor} (theme=${themeId || 'default'}${report?.mode ? ` ${report.mode}` : ''})`);
  } catch (err) {
    console.warn('[electron-shell] setTitleBarOverlay failed:', err?.message);
  }
  // FIX 2b: paint the web page's top strip with the exact caption color so the
  // native title bar (above) and the page (below) form one continuous surface.
  // dsh themes fill the body with a background IMAGE; its top edge colour never
  // exactly matches the solid caption colour, which read as a "色块" under the
  // min/max/close buttons. A synchronized solid strip removes that seam.
  if (!win.isDestroyed()) {
    win.webContents.executeJavaScript(
      `(() => { var el = document.getElementById('dsh-titlebar-fill');
         if (!el) { el = document.createElement('div'); el.id = 'dsh-titlebar-fill'; document.body.appendChild(el); }
         el.style.setProperty('--dsh-caption-color', '${color}'); })()`
    ).catch(() => {});
  }
}

// Installed into the page after every load; reports theme attribute changes
// (preset switches, light-pull flips) with the body's actual computed colors.
const SHELL_THEME_OBSERVER_JS = `(() => {
  const send = () => {
    try {
      const b = document.body;
      if (!b) return;
      const cs = getComputedStyle(b);
      window.dshDesktopShell && window.dshDesktopShell.reportTheme({
        themeId: b.getAttribute('data-dsh-theme-id') || '',
        mode: b.getAttribute('data-dsh-preset1-mode') || '',
        bg: cs.backgroundColor,
        fg: cs.color,
      });
    } catch {}
  };
  if (window.__dshShellThemeObserver) { send(); return true; }
  window.__dshShellThemeObserver = true;
  document.body && document.body.setAttribute('data-dsh-desktop', '1');
  new MutationObserver(send).observe(document.body, {
    attributes: true,
    attributeFilter: ['data-dsh-theme-id', 'data-dsh-preset1-mode'],
  });
  send();
  return true;
})()`;

ipcMain.on('dsh-shell:theme', (event, report) => {
  applyOverlay(BrowserWindow.fromWebContents(event.sender), report);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 680,
    title: 'DeepSeek Harness',
    backgroundColor: '#151517', // matches dsh dark boot splash
    autoHideMenuBar: true,
    show: false,
    // Frameless: the app's own header (logo row + task tabs) is the title bar.
    titleBarStyle: 'hidden',
    ...(process.platform === 'win32'
      ? { titleBarOverlay: { ...overlayForReport(null), height: OVERLAY_HEIGHT } }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'), // sandboxed preloads must be CJS
      // Plain browser-like context: the UI already talks to :3000 over HTTP/WS.
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      backgroundThrottling: false, // keep painting when the shell loses focus
    },
  });

  win.once('ready-to-show', () => win.show());
  // F12 / Ctrl+Shift+I toggle DevTools (no default accelerator exists without a menu).
  win.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;
    const isF12 = input.key === 'F12';
    const isCtrlShiftI = (input.control || input.meta) && input.shift && input.key.toLowerCase() === 'i';
    if (isF12 || isCtrlShiftI) {
      event.preventDefault();
      win.webContents.toggleDevTools();
    }
  });
  win.webContents.on('did-finish-load', () => {
    win.webContents
      .executeJavaScript(SHELL_THEME_OBSERVER_JS)
      .then((installed) => console.log(`[electron-shell] theme observer installed: ${installed === true}`))
      .catch((err) => console.warn('[electron-shell] theme observer inject failed:', err?.message));
  });
  // Anything the UI tries to pop out (target=_blank) opens in the system browser.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) void shell.openExternal(url);
    return { action: 'deny' };
  });
  win.on('closed', () => {
    mainWindow = null;
  });

  void win.loadURL(APP_URL);
  return win;
}

let serverChild = null;
let serverLogTail = '';
let mainWindow = null;
let fallbackTried = false;
let bootFailed = false;

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    } else {
      createWindow();
    }
  });

  app.whenReady().then(() => {
    spawnServer();
    void waitForServerAndShow();
  });

  // Default (non-preset) theme follows the OS scheme — refresh the overlay on flips.
  nativeTheme.on('updated', () => {
    if (mainWindow && !lastThemeReport?.themeId) applyOverlay(mainWindow, lastThemeReport);
  });

  app.on('before-quit', () => {
    console.log('[electron-shell] quitting (before-quit)');
    killServerTree();
  });

  app.on('window-all-closed', () => {
    // No macOS convention here: the shell owns the server lifecycle, so quit.
    console.log('[electron-shell] all windows closed');
    app.quit();
  });

  app.on('quit', () => {
    killServerTree();
  });
}
