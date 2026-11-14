// dsh-harness-community server-side stub (root entry — cordis resolves the
// plugin name to the package root). Real server APIs live in the outer
// Express server (server.ts); this keeps the bundle include importable.
export async function apply(ctx) {
  ctx.effect(() => () => {}, "dsh-harness-community noop");
}
