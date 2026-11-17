# DeepSeek Harness

An open-source agent harness built on the **"Everything is a Plugin"** architecture powered by [Cordis](https://github.com/deepseek-ai/deepseek-harness) (dsh `0.2.2-rc.3`).

## Run Locally

**Prerequisites:** Node.js ≥ 24.9

1. Install dependencies:
   `npm install --legacy-peer-deps`
2. (Optional) set `DEEPSEEK_API_KEY` in `.env.local`
3. Start:
   `npm run dev` → open http://127.0.0.1:3000

Or run it as a desktop app (Electron shell, spawns the server itself):

   `npm run desktop`

Ports: `3000` Express server · `3080` dsh web · `3082` local LLM gateway.

## Desktop shell (Electron)

- `npm run desktop` — dev shell: single-instance window, spawns `server.ts` with
  the system Node (falls back to Electron's embedded Node when absent), reuses a
  server already listening on :3000, and kills the whole process tree on quit.
- `npm run desktop:build` — NSIS installer via electron-builder (config in
  `electron-builder.yml`; server tree ships under `resources/server`). Note:
  large output since the full `node_modules` is bundled with the server.
- Shell code: `electron/main.mjs`.

## Layout

| Path | Purpose |
|---|---|
| `server.ts` | Express host: group-hub / MCP-desktop / SSH APIs, Anthropic gateway, dsh spawn |
| `src/utils/dsh-upstream-sync.ts` | Boot-time upstream sync + patch layer + **harness plugin builder** |
| `vendor/dsh-harness-community/` | Official client plugin (groups sidebar, browser tabs, Luminex theme, tooltips) |
| `vendor/dsh-superagent/` | Vendored Superagent console (Windows path fixes, MCP breadcrumb) |
| `src/utils/dsh-client-patches.ts` | Source of truth for the plugin's ported UI blocks |
| `src/utils/luminex-theme.ts` | Luminex theme CSS/runtime generators |
| `ssh/` | SSH drawer client components + manager |
| `workspaces/` | Runtime workspace state |

## Architecture notes

- **No string-patching of client bundles.** Since dsh rc.3 ships minified client
  modules, all custom UI lives in `dsh-harness-community`, an official client
  plugin (`window.__ModuleLoader__` module with `apply(ctx)` + `ctx.slots`), assembled
  at boot by `buildHarnessClientPlugin()`. Version-proof: no upstream code anchors.
- Legacy rc.1 string patches were removed with the rc.3 upgrade; `dsh-client-patches.ts`
  remains only as the source for the extracted UI blocks.
- Set `DSH_DISABLE_HARNESS_PLUGIN=1` to boot without the UI plugin.
