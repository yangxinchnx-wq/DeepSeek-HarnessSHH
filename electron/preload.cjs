// Sandboxed preload scripts must be CommonJS. Only the bridge surface is
// exposed: the page reports its active theme (attributes + computed colors)
// so the shell can recolor the Windows window-controls overlay.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dshDesktopShell', {
  reportTheme: (info) => ipcRenderer.send('dsh-shell:theme', info),
});
