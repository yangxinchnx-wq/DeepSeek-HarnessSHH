// dsh-harness-community server-side stub.
// All server APIs (groups hub, MCP desktop, SSH) are served by the outer Express
// server (server.ts); this cordis plugin exists only so the bundle includes the
// package and loads its client.js module.
export async function apply(ctx) {
  ctx.effect(() => () => {}, "dsh-harness-community noop");
}
