// ../../tmp/dsh-superagent-prototype/src/core/model.ts
var liveTicket = (ticket) => !ticket.ended;

// ../../tmp/dsh-superagent-prototype/src/core/ids.ts
import { createHash } from "node:crypto";
function key(...values) {
  return createHash("sha256").update(JSON.stringify(values)).digest("hex").slice(0, 32);
}

// ../../tmp/dsh-superagent-prototype/src/infra/text.ts
var words = new Intl.Segmenter("zh", { granularity: "word" });
var fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, name2) => values[name2] ?? "");
var sameName = (a, b) => a.toLowerCase() === b.toLowerCase();
var escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ../../tmp/dsh-superagent-prototype/src/limits.ts
var LIMITS = {
  ruleName: 100,
  ruleInstruction: 2e3,
  evalTimeoutSeconds: { min: 30, max: 600 },
  maxWorkers: { min: 1, max: 16 },
  prepareCommand: 4e3,
  promptMaxChars: { min: 1e3, max: 1e6 },
  admissionContextMaxPages: { min: 1, max: 100 },
  admissionContextTimeoutMs: { min: 1, max: 9e4 }
};

// ../../tmp/dsh-superagent-prototype/src/deployment.ts
import { accessSync, constants, statSync } from "node:fs";
import { delimiter as delimiter2, isAbsolute, join as join2 } from "node:path";
import s from "@deepseek-ai/schemastery";
import { z as z2 } from "zod";

// ../../tmp/dsh-superagent-prototype/src/infra/environment.ts
import { lstat, mkdir, readdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { realpathSync } from "node:fs";
import { delimiter, join, resolve } from "node:path";

// ../../tmp/dsh-superagent-prototype/src/infra/commands.ts
import { execFile } from "node:child_process";
import { basename } from "node:path";
import { promisify } from "node:util";
import { z } from "zod";
var exec = promisify(execFile);
var CliError = class extends Error {
  constructor(message, code, exitCode) {
    super(message);
    this.code = code;
    this.exitCode = exitCode;
  }
};
function validItems(item, list, tally) {
  const items = list.flatMap((value) => {
    const parsed = item.safeParse(value);
    return parsed.success ? [parsed.data] : [];
  });
  if (tally) tally.skipped += list.length - items.length;
  return items;
}

// ../../tmp/dsh-superagent-prototype/src/infra/environment.ts
var LEGACY_MARKERS = ["dsh-tag", "dsh-go", "dsh-freelancer"].map((name2) => `# Written by ${name2} on every start; edits are lost.`);

// ../../tmp/dsh-superagent-prototype/src/deployment.ts
var absolute = (description) => s.string().pattern(/^\//).description(`${description} Absolute path.`);
var Config = s.object({
  stateDir: absolute("Directory for the database, locks, worker shims, the agent's git configuration and, by default, the ticket directories.").default(process.env.DSH_SUPERAGENT_STATE_DIR || "/tmp/dsh-superagent-state"),
  promptMaxChars: s.number().min(LIMITS.promptMaxChars.min).max(LIMITS.promptMaxChars.max).step(1).default(1e5).description("Largest saved prompt configuration, in characters.").volatile(),
  admissionContextMaxPages: s.number().min(LIMITS.admissionContextMaxPages.min).max(LIMITS.admissionContextMaxPages.max).step(1).default(10).description("Pages of thread context one assessment may read.").volatile(),
  admissionContextTimeoutMs: s.number().min(LIMITS.admissionContextTimeoutMs.min).max(LIMITS.admissionContextTimeoutMs.max).step(1).default(15e3).description("Time limit of one context read during an assessment, in milliseconds.").volatile()
});
var GithubAccountsSchema = z2.object({
  repository: z2.string().trim().regex(/^([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)?$/, "owner/name").default(""),
  cli: z2.string().trim().default("")
});
var FeishuBotSchema = z2.object({ cli: z2.string().trim().default("") });
var SETUP_FIELDS = { github: Object.keys(GithubAccountsSchema.shape), feishu: Object.keys(FeishuBotSchema.shape) };
var GithubUser = z2.object({ login: z2.string().regex(/^[A-Za-z0-9-]+$/), id: z2.number().int().positive() });
var RepositoryAccess = z2.object({ name: z2.string().regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/), push: z2.boolean().nullable() });
var AuthStatus = z2.object({ appId: z2.string().regex(/^cli_[A-Za-z0-9]+$/), brand: z2.enum(["feishu", "lark"]).default("feishu"), identities: z2.object({ bot: z2.object({ status: z2.string() }) }) });
var BotInfo = z2.object({ bot: z2.object({ open_id: z2.string().regex(/^ou_[A-Za-z0-9]+$/), app_name: z2.string().default("") }) });

// ../../tmp/dsh-superagent-prototype/src/sources/github-read.ts
import { z as z4 } from "zod";

// ../../tmp/dsh-superagent-prototype/src/sources/github-trigger.ts
import { z as z3 } from "zod";
var SOURCE = "github";
var githubChannel = (number, url) => ({ source: SOURCE, thread: `github:${number}`, address: { number: String(number), ...url ? { url } : {} } });
var githubPage = (repository, number, pr = false) => `https://github.com/${repository}/${pr ? "pull" : "issues"}/${number}`;
function githubAddress(url, repository) {
  const address = /^https:\/\/(?:api\.github\.com\/repos|github\.com)\/([^/]+\/[^/]+)\/(issues|pulls?)\/(\d+)\/?(?:#discussion_r(\d+)|#[\w-]*)?$/i;
  const match = address.exec(url);
  if (!match || !sameName(match[1], repository)) return void 0;
  return { number: Number(match[3]), pr: match[2].toLowerCase() !== "issues", ...match[4] ? { discussion: Number(match[4]) } : {} };
}
var UserSchema = z3.looseObject({ login: z3.string(), type: z3.string().optional() }).nullable().transform((user) => user ?? { login: "ghost", type: "User" });
var CommentSchema = z3.looseObject({
  id: z3.number(),
  body: z3.string().nullish(),
  user: UserSchema,
  html_url: z3.string().nullish(),
  created_at: z3.string().nullish(),
  updated_at: z3.string().nullish(),
  submitted_at: z3.string().nullish(),
  state: z3.string().nullish(),
  commit_id: z3.string().nullish(),
  path: z3.string().nullish(),
  line: z3.number().nullish(),
  original_line: z3.number().nullish(),
  diff_hunk: z3.string().nullish(),
  in_reply_to_id: z3.number().nullish()
});
var IssueSchema = CommentSchema.extend({
  number: z3.number(),
  title: z3.string(),
  state: z3.string(),
  created_at: z3.string(),
  html_url: z3.string(),
  pull_request: z3.looseObject({ url: z3.string() }).nullish()
});
var isHumanLogin = (user) => !/\[bot\]$/.test(user.login) && (!user.type || user.type === "User");
function reviewPlace(comment) {
  const line = comment.line ?? comment.original_line;
  const hunk = (comment.diff_hunk ?? "").split("\n").slice(-3).join("\n");
  return [`${comment.path}${line != null ? `:${line}` : ""}`, hunk].filter(Boolean).join("\n");
}
function commentText(comment, kind) {
  const decided = kind === "review" && comment.state && comment.state !== "COMMENTED";
  const decision = decided ? `${comment.state} review of commit ${comment.commit_id ?? "unknown"}` : "";
  const place = kind === "inline" && comment.path ? reviewPlace(comment) : "";
  return [decision, place, comment.body ?? ""].filter(Boolean).join("\n\n");
}
var mentions = (text, login) => new RegExp(`(?:^|[^a-zA-Z0-9_@])@${escapeRegExp(login)}(?![a-zA-Z0-9_-])`, "i").test(text);
var author = (user, agent) => ({ actor: { source: SOURCE, id: user.login }, human: isHumanLogin(user) && !sameName(user.login, agent) });
function commentTrigger(comment, ref, kind, agent) {
  const at = comment.updated_at ?? comment.submitted_at ?? comment.created_at ?? (/* @__PURE__ */ new Date()).toISOString();
  const version = comment.updated_at ?? comment.submitted_at ?? "";
  const id = key("github-comment", comment.html_url ?? `github:${ref.number}`, String(comment.id), version);
  return {
    id,
    source: SOURCE,
    threads: [{ source: SOURCE, id: String(ref.number) }],
    ...author(comment.user, agent),
    at,
    text: commentText(comment, kind),
    ...mentions(comment.body ?? "", agent) ? { addressed: "mention" } : {},
    channel: githubChannel(ref.number, comment.html_url ?? void 0),
    ...comment.html_url ?? ref.url ? { url: comment.html_url ?? ref.url } : {},
    meta: {
      number: ref.number,
      isPr: ref.isPr,
      ...ref.prAuthor ? { prAuthor: ref.prAuthor } : {},
      commentId: comment.id,
      kind,
      ...comment.path ? { path: comment.path, line: comment.line ?? comment.original_line ?? null } : {},
      ...comment.in_reply_to_id ? { inReplyTo: comment.in_reply_to_id } : {}
    }
  };
}
function issueTrigger(issue, agent) {
  const body = issue.body ?? "";
  return {
    id: key("github-issue", String(issue.number)),
    source: SOURCE,
    threads: [{ source: SOURCE, id: String(issue.number) }],
    ...author(issue.user, agent),
    at: issue.created_at,
    text: `${issue.title}

${body}`,
    ...mentions(body, agent) ? { addressed: "mention" } : {},
    channel: githubChannel(issue.number, issue.html_url),
    url: issue.html_url,
    meta: { number: issue.number, isPr: false, kind: "issue" }
  };
}
function pullTrigger(pull2, agent) {
  return { ...issueTrigger(pull2, agent), meta: { number: pull2.number, isPr: true, prAuthor: pull2.user.login, kind: "pull" } };
}
function branchCiTrigger(branch, sha, revision, summary, url) {
  return {
    id: key("github-ci", `branch:${branch}`, String(revision)),
    source: SOURCE,
    threads: [{ source: SOURCE, id: `ci:${branch}` }],
    actor: { source: SOURCE, id: "" },
    human: false,
    at: (/* @__PURE__ */ new Date()).toISOString(),
    text: summary,
    url,
    meta: { ci: true, branch, sha, revision }
  };
}
function ciTrigger(pr, revision, summary) {
  return {
    id: key("github-ci", String(pr.number), String(revision)),
    source: SOURCE,
    threads: [{ source: SOURCE, id: String(pr.number) }],
    actor: { source: SOURCE, id: "" },
    human: false,
    at: (/* @__PURE__ */ new Date()).toISOString(),
    text: summary,
    channel: githubChannel(pr.number),
    url: pr.html_url,
    meta: { number: pr.number, isPr: true, prAuthor: pr.user.login, ci: true, revision }
  };
}

// ../../tmp/dsh-superagent-prototype/src/sources/github-read.ts
var CheckSchema = z4.looseObject({ name: z4.string(), status: z4.string(), conclusion: z4.string().nullable() });
var StatusSchema = z4.looseObject({ context: z4.string(), state: z4.string() });
var FAILING = /* @__PURE__ */ new Set(["failure", "timed_out", "cancelled", "action_required", "startup_failure", "error"]);
function ciCounts(snapshot) {
  const statuses = snapshot.statuses ?? [];
  return {
    failed: snapshot.checks.filter((check) => FAILING.has(check.conclusion ?? "")).length + statuses.filter((status) => FAILING.has(status.state)).length,
    running: snapshot.checks.filter((check) => check.status !== "completed").length + statuses.filter((status) => status.state === "pending").length
  };
}
function ciSummary(snapshot, where, read) {
  const checks = snapshot.checks.map((check) => ({ name: check.name, failed: FAILING.has(check.conclusion ?? ""), running: check.status !== "completed" }));
  const statuses = (snapshot.statuses ?? []).map((status) => ({ name: status.context, failed: FAILING.has(status.state), running: status.state === "pending" }));
  const results = [...checks, ...statuses];
  const failed2 = results.filter((result) => result.failed).map((result) => result.name);
  const running = results.filter((result) => result.running).map((result) => result.name);
  const names = (list) => list.slice(0, 5).join(", ") + (list.length > 5 ? `, and ${list.length - 5} more` : "");
  const at = `on ${where} at ${snapshot.head.slice(0, 7)}`;
  const still = running.length ? `; ${running.length} still running` : "";
  const line = failed2.length ? `CI failed ${failed2.length}/${results.length} ${at}: ${names(failed2)}${still}` : running.length ? `CI running ${running.length}/${results.length} ${at}: ${names(running)}` : `CI passed ${results.length}/${results.length} ${at}`;
  return `${line}
Read ${read} for every check.`;
}
function ciFailures(snapshot) {
  return [
    ...snapshot.checks.filter((check) => FAILING.has(check.conclusion ?? "")).map((check) => check.name),
    ...(snapshot.statuses ?? []).filter((status) => FAILING.has(status.state)).map((status) => status.context)
  ].sort();
}
function ciFact(counts) {
  if (counts.failed) return { label: { zh: "CI \u5931\u8D25", en: "CI failed" }, value: String(counts.failed), problem: true };
  if (counts.running) return { label: { zh: "CI \u8FDB\u884C\u4E2D", en: "CI running" }, value: String(counts.running) };
  return { label: "CI", value: { zh: "\u901A\u8FC7", en: "passed" } };
}
async function pullChecks(commands, head, tally) {
  const page = z4.looseObject({ check_runs: z4.array(z4.unknown()) });
  const pages = await commands.api(z4.array(page), `commits/${head}/check-runs?per_page=100`, "--paginate", "--slurp");
  const runs = validItems(CheckSchema, pages.flatMap((page2) => page2.check_runs), tally);
  const statuses = await commands.pages(StatusSchema, `commits/${head}/statuses?per_page=100`, tally);
  const latest = /* @__PURE__ */ new Map();
  for (const status of statuses) if (!latest.has(status.context)) latest.set(status.context, status.state);
  const checks = runs.map(({ name: name2, status, conclusion }) => ({ name: name2, status, conclusion }));
  return {
    head,
    checks: checks.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
    statuses: [...latest].map(([context, state]) => ({ context, state })).sort((a, b) => a.context.localeCompare(b.context))
  };
}
function githubMessage(item, text, id) {
  const line = item.line ?? item.original_line;
  return {
    id,
    from: item.user.login,
    at: item.created_at ?? item.submitted_at ?? "",
    text,
    ...!isHumanLogin(item.user) ? { bot: true } : {},
    ...item.html_url ? { url: item.html_url } : {},
    ...item.path ? { path: item.path, ...line != null ? { line } : {} } : {}
  };
}
var DescriptionSchema = IssueSchema.extend({
  labels: z4.array(z4.looseObject({ name: z4.string() })).nullish(),
  draft: z4.boolean().nullish(),
  merged: z4.boolean().nullish(),
  head: z4.looseObject({ ref: z4.string() }).nullish(),
  base: z4.looseObject({ ref: z4.string() }).nullish()
});
async function reviewThread(commands, number, comment, tally) {
  const comments = await commands.pages(CommentSchema, `pulls/${number}/comments?per_page=100`, tally);
  const root = comments.find((item) => item.id === comment)?.in_reply_to_id ?? comment;
  return comments.filter((item) => item.id === root || item.in_reply_to_id === root).sort((a, b) => (a.created_at ?? "").localeCompare(b.created_at ?? ""));
}
function threadMessages(thread, id) {
  const [first] = thread;
  return thread.map((item) => item === first ? githubMessage(item, [reviewPlace(item), item.body ?? ""].filter(Boolean).join("\n\n"), id(item)) : { ...githubMessage(item, item.body ?? "", id(item)), ...first ? { reply_to: id(first) } : {} });
}
async function conversationPage(commands, number, page) {
  const messages = [];
  if (page === 1) {
    const issue = await commands.api(IssueSchema, `issues/${number}`);
    messages.push(githubMessage(issue, `${issue.title}

${issue.body ?? ""}`, issue.html_url));
  }
  const listed = await commands.api(z4.array(z4.unknown()), `issues/${number}/comments?per_page=100&page=${page}`);
  const tally = { skipped: 0 };
  const comments = validItems(CommentSchema, listed, tally);
  messages.push(...comments.map((comment) => githubMessage(comment, comment.body ?? "", comment.html_url ?? String(comment.id))));
  return { messages, next_resource: listed.length === 100 ? String(page + 1) : null, ...tally.skipped ? { skipped: tally.skipped } : {} };
}
var githubThreadContext = {
  messageId: (trigger) => trigger.url ?? "",
  read: async (commands, trigger, part, cursor) => {
    if (typeof trigger.meta.branch === "string") {
      const message = { id: trigger.url ?? trigger.id, from: "CI", at: trigger.at, text: trigger.text, bot: true };
      return { messages: [message], body: { status: "branch_ci", messages: [message] }, status: "branch_ci" };
    }
    const number = Number(trigger.meta.number);
    if (trigger.meta.kind === "inline" && typeof trigger.meta.commentId === "number") {
      const thread = await reviewThread(commands, number, trigger.meta.commentId);
      const messages = threadMessages(thread, (item) => item.html_url ?? String(item.id));
      const read = part === "thread" ? messages : messages.slice(0, 1);
      return { messages: read, body: { status: "review_thread", messages: read }, status: "review_thread" };
    }
    const body = await conversationPage(commands, number, Number(cursor ?? "1"));
    return { messages: body.messages, next: body.next_resource ?? void 0, body };
  }
};

// ../../tmp/dsh-superagent-prototype/src/sources/github-channel.ts
import { z as z5 } from "zod";
var CommentSchema2 = z5.looseObject({
  id: z5.number(),
  body: z5.string().nullish(),
  in_reply_to_id: z5.number().nullish(),
  user: z5.looseObject({ login: z5.string() }).nullish()
});
var gone = (error) => error instanceof CliError && (error.code === 410 || error.code === 403 && /locked/i.test(error.message));
var missing = (error) => error instanceof CliError && (error.code === 404 || error.code === 410);
async function sendGithub(host, message) {
  const { commands } = host;
  const { repository, github } = commands.deployment;
  const number = Number(message.channel.address.number);
  if (!number) throw new Error("Missing GitHub reply target");
  try {
    const address = githubAddress(message.channel.address.url ?? "", repository);
    let rootId;
    if (address?.pr && address.discussion && address.number === number) {
      const source = await commands.api(CommentSchema2, `pulls/comments/${address.discussion}`).catch((error) => {
        if (missing(error)) return void 0;
        throw error;
      });
      rootId = source ? source.in_reply_to_id ?? source.id : void 0;
    }
    const path = rootId === void 0 ? `issues/${number}/comments` : `pulls/${number}/comments`;
    const marker = `<!-- dsh-superagent:${message.id} -->`;
    const mine = (comment) => sameName(comment.user?.login ?? "", github.login) && (rootId === void 0 || comment.in_reply_to_id === rootId) && (comment.body ?? "").includes(marker);
    if ((await commands.pages(CommentSchema2, path)).some(mine)) return "sent";
    const target = rootId === void 0 ? path : `${path}/${rootId}/replies`;
    await commands.api(z5.unknown(), target, "--method", "POST", "-f", `body=${message.text}

${marker}`);
    return "sent";
  } catch (error) {
    if (gone(error)) return "gone";
    throw error;
  }
}
function githubLink(address, links) {
  const number = address.number ?? "";
  const review = !!links.repository && !!githubAddress(address.url ?? "", links.repository)?.discussion;
  return {
    url: address.url ?? (links.repository ? githubPage(links.repository, Number(number)) : ""),
    label: review ? { zh: `GitHub #${number} \u7684 review \u8BA8\u8BBA`, en: `Review discussion on GitHub #${number}` } : { zh: `GitHub #${number}`, en: `GitHub #${number}` }
  };
}

// ../../tmp/dsh-superagent-prototype/src/sources/github-pull.ts
import { z as z6 } from "zod";
var PullSchema = z6.looseObject({
  title: z6.string().optional(),
  state: z6.string(),
  html_url: z6.string(),
  user: UserSchema,
  body: z6.string().nullish(),
  created_at: z6.string().optional(),
  merged: z6.boolean().optional(),
  merged_at: z6.string().nullish(),
  closed_at: z6.string().nullish(),
  auto_merge: z6.unknown().optional(),
  head: z6.looseObject({ sha: z6.string(), ref: z6.string(), repo: z6.looseObject({ full_name: z6.string() }).nullish() })
});
var readPull = async (ctx, number, signal) => ({ ...await ctx.commands.withSignal(signal).api(PullSchema, `pulls/${number}`), number });
var pullNumber = (thread) => thread.startsWith(`${SOURCE}:`) ? Number(thread.slice(SOURCE.length + 1)) : void 0;
var pullsOf = (ticket, open = false) => (ticket.follows ?? []).filter((item) => !open || !item.closed).flatMap((item) => pullNumber(item.thread) ?? []);
var agentPull = (pr, deployment) => sameName(pr.user.login, deployment.github.login) && sameName(pr.head?.repo?.full_name ?? "", deployment.repository);
var ticketBranch = (ticket, ref) => !!ticket.execution?.name && ref.split("/").at(-1) === ticket.execution.name;
var AUTO_MERGE_ON = { label: { zh: "\u81EA\u52A8\u5408\u5E76", en: "Auto-merge" }, value: { zh: "\u5DF2\u5F00\u542F", en: "on" } };
function claimPull(ctx, ticketId, pr) {
  const ticket = ctx.tickets.get(ticketId);
  if (!ticket || !liveTicket(ticket)) return "Ticket ended because its PR was closed";
  const source = ctx.triggers.get(ticket.origin.triggerId);
  const started = source?.source === SOURCE && source.meta.isPr === true && source.meta.number === pr.number;
  const opened = agentPull(pr, ctx.deployment) && ticketBranch(ticket, pr.head.ref);
  if (!started && !opened) {
    const { login } = ctx.deployment.github;
    return `PR does not belong to this ticket: use the source PR or a PR by ${login} from a branch whose last path segment is DSH_SUPERAGENT_NAME; omit pr_number when no PR exists`;
  }
  const owner = ctx.tickets.open().find((item) => pullsOf(item, true).includes(pr.number));
  if (owner && owner.id !== ticketId) return "PR already belongs to another active ticket";
  const follow = ticket.follows?.find((item) => item.thread === `${SOURCE}:${pr.number}`);
  if (pr.state === "open" && (!follow || follow.closed || opened && !follow.own)) bind(ctx, ticketId, pr, opened);
  return void 0;
}
async function observePull(ctx, pr) {
  const ended = pr.state === "closed" || !!pr.merged;
  if (ended) closePull(ctx, pr);
  else {
    const candidates = agentPull(pr, ctx.deployment) ? ctx.tickets.open().filter((ticket2) => ticketBranch(ticket2, pr.head.ref)) : [];
    const ticket = candidates.length === 1 ? candidates[0] : void 0;
    const reopened = ticket?.follows?.some((item) => item.thread === `${SOURCE}:${pr.number}` && item.closed);
    if (ticket && (reopened || pullsOf(ticket, true).every((number) => number === pr.number))) claimPull(ctx, ticket.id, pr);
  }
  ctx.threads.describe(`github:${pr.number}`, { facts: { autoMerge: !ended && pr.auto_merge != null ? AUTO_MERGE_ON : null } });
  return ended;
}
function bind(ctx, ticketId, pr, own) {
  ctx.atomic(() => {
    ctx.tickets.bindThread(ticketId, { source: SOURCE, id: String(pr.number) }, own);
    ctx.threads.patch(`github:${pr.number}`, { number: pr.number, isPr: true, url: pr.html_url, prAuthor: pr.user.login });
  });
}
function closePull(ctx, pr) {
  if (!ctx.tickets.open().some((ticket) => pullsOf(ticket, true).includes(pr.number))) return;
  const at = pr.merged_at ?? pr.closed_at ?? (/* @__PURE__ */ new Date()).toISOString();
  ctx.tickets.threadClosed({ source: SOURCE, id: String(pr.number) }, pr.merged ? "merged" : "closed", at);
}

// ../../tmp/dsh-superagent-prototype/src/sources/host.ts
var HEALTH_TEXT = {
  setupPending: "Waiting for the deployment check",
  sourceOff: "Off",
  feishuCliUnset: "The Source is on, and its bot lark-cli is not set",
  feishuBotMissing: "Waiting for the Feishu bot",
  pollFailures: "{count} consecutive failed polls; last: {error}"
};
function health(state, code, values = {}) {
  return { state, detail: fill(HEALTH_TEXT[code], values), code, ...Object.keys(values).length ? { values } : {} };
}
var sourceContext = (host, kind) => host.context(kind);

// ../../tmp/dsh-superagent-prototype/src/kv.ts
var record = (key2) => key2;
function family(prefix, format = (...name2) => name2.join(":")) {
  return Object.assign((...name2) => `${prefix}${format(...name2)}`, { prefix });
}
var KV = {
  /** Store: current database schema version. */
  store: { schema: record("schema") },
  /** Settings: current revision, per-block revision, and saved settings snapshots (including the current one). */
  settings: {
    revision: record("settings-revision"),
    block: family("settings-block-revision:"),
    version: family("settings-version:")
  },
  /** Prompts: current revision and saved prompt versions. */
  prompts: {
    revision: record("prompt-revision"),
    version: family("prompt-version:"),
    /** The built-in text of a prompt part an override was edited from, by its `base`, which shows what an upgrade changed. */
    builtIn: family("prompt-built-in:")
  },
  /** Runtime: the main Session's ID. */
  runtime: { masterId: record("master-id") },
  /** Sessions: prompt revisions each Session has worked under, ordered oldest first; the last entry (`.at(-1)`) is its active revision. */
  sessions: { prompts: family("session-prompts:") },
  /** Schema 11 migration: legacy main-Session queues imported into the effect table. */
  queues: {
    relays: record("relay-queue"),
    unsubscribed: record("subscription-results"),
    prompts: record("prompt-notification"),
    settings: record("settings-notification")
  },
  /** Per-Source resolved display names mapping a named ID (such as a Feishu chat ID) to its display name. */
  sources: { labels: family("source-labels:") },
  /**
   * GitHub Source: notification cursor and pending retries; per-Issue/PR read cursor shared by notification and polled reads;
   * per-stream cursor, start times by kind, and ETag; default-branch CI state; and per-PR CI fingerprint and revision (`revision`
   * counts reported CI changes so each produces a distinct Trigger ID).
   */
  github: {
    since: record("github-since"),
    retries: record("github-retry"),
    cursor: family("github-cursor:"),
    stream: family("github-stream:"),
    branchCi: record("github-branch-ci"),
    ci: family("github-ci:")
  },
  /**
   * Feishu Source: known chats (`true` for direct messages); per-chat history cursor and active topics mapped from topic ID
   * to last-seen timestamp; and per-polled-thread seen message IDs and initialization flag.
   */
  feishu: {
    chats: record("feishu-chats"),
    history: family("feishu-history:"),
    topics: family("feishu-history-threads:"),
    seen: family("thread-seen:"),
    initialized: family("thread-initialized:")
  }
};

// ../../tmp/dsh-superagent-prototype/src/sources/poll.ts
var POLL_HORIZON_MS = 14 * 24 * 36e5;
function polled(ctx, thread, now = Date.now()) {
  const tickets = thread.subscriptions.map((id) => ctx.tickets.get(id));
  if (tickets.some((ticket) => !!ticket && liveTicket(ticket))) return true;
  const times = [thread.lastAt ?? thread.createdAt, ...tickets.map((ticket) => ticket?.ended?.at ?? "")].map(Date.parse).filter(Number.isFinite);
  return now - Math.max(...times) < POLL_HORIZON_MS;
}
var cursorAt = (started) => new Date(Date.parse(started) - 5e3).toISOString();
async function pollThreads(ctx, source, stopped2, poll, skip = () => false) {
  for (const thread of ctx.threads.subscribed(source)) {
    if (stopped2()) return;
    if (skip(thread) || !polled(ctx, thread)) continue;
    try {
      await poll(thread);
      ctx.threads.patch(thread.key, { pollError: void 0 });
    } catch (error) {
      if (stopped2()) return;
      ctx.threads.patch(thread.key, { pollError: String(error) });
    }
  }
}
function pause(ms, signal) {
  return new Promise((resolve2) => {
    if (signal.aborted) {
      resolve2();
      return;
    }
    const stop = () => {
      clearTimeout(timer);
      resolve2();
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", stop);
      resolve2();
    }, ms);
    signal.addEventListener("abort", stop, { once: true });
  });
}

// ../../tmp/dsh-superagent-prototype/src/sources/github.ts
import { z as z7 } from "zod";
var NotificationSchema = z7.looseObject({
  repository: z7.looseObject({ full_name: z7.string() }),
  subject: z7.looseObject({ url: z7.string().nullish() })
});
var GithubConfigSchema = GithubAccountsSchema.extend({
  pollSeconds: z7.number().int().min(60).max(3600).default(60),
  failuresBeforeError: z7.number().int().min(1).max(20).default(3),
  observeIssues: z7.boolean().default(false),
  observePulls: z7.boolean().default(false),
  observeComments: z7.boolean().default(false),
  observeCi: z7.boolean().default(false)
}).strict();
var OBSERVED = { issues: "observeIssues", pulls: "observePulls", comments: "observeComments", ci: "observeCi" };
function scopeOf(meta) {
  if (meta.ci === true) return typeof meta.branch === "string" ? "ci" : void 0;
  if (meta.kind === "issue") return "issues";
  if (meta.kind === "pull") return "pulls";
  return meta.kind === "conversation" || meta.kind === "inline" || meta.kind === "review" ? "comments" : void 0;
}
var githubKind = {
  kind: SOURCE,
  title: { zh: "GitHub", en: "GitHub" },
  description: { zh: "\u667A\u80FD\u4F53\u7684 GitHub \u8D26\u53F7\uFF1B\u63A5\u6536\u4ED3\u5E93\u91CC\u53D1\u7ED9\u5B83\u7684\u901A\u77E5\u3001\u5DF2\u8BA2\u9605 Issue \u4E0E PR \u7684\u8BA8\u8BBA\u3001CI \u72B6\u6001\u53D8\u5316\u548C PR \u5408\u5E76\u5173\u95ED\u3002", en: "The agent's GitHub accounts; receives notifications to it in the repository, discussion on subscribed Issues and PRs, CI changes, and PR merge or close." },
  schema: GithubConfigSchema,
  fields: [
    {
      key: "repository",
      type: "text",
      pattern: "[A-Za-z0-9_.\\-]+/[A-Za-z0-9_.\\-]+",
      label: { zh: "\u76D1\u542C\u7684\u4ED3\u5E93", en: "Repository" },
      hint: { zh: "\u5199\u4F5C owner/name\u3002\u8FD9\u4E2A\u6765\u6E90\u63A5\u6536\u8FD9\u4E2A\u4ED3\u5E93\u7684\u901A\u77E5\u548C\u8BA8\u8BBA\uFF1B\u4FDD\u5B58\u65F6\u68C0\u67E5\u667A\u80FD\u4F53\u8D26\u53F7\u80FD\u5426\u63A8\u9001\u5230\u5B83\uFF0C\u7136\u540E\u91CD\u542F dsh-superagent\u3002", en: "Written owner/name. This Source receives the repository's notifications and discussion; saving checks that the agent account can push to it, then restarts dsh-superagent." }
    },
    {
      key: "cli",
      type: "text",
      label: { zh: "\u667A\u80FD\u4F53\u7684 GitHub CLI", en: "Agent GitHub CLI" },
      hint: { zh: "\u547D\u4EE4\u540D\u6216\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u901A\u5E38\u662F\u7528 GH_CONFIG_DIR \u767B\u5F55\u667A\u80FD\u4F53\u8D26\u53F7\u7684 gh \u5305\u88C5\u811A\u672C\u3002\u667A\u80FD\u4F53\u4EE5\u5B83\u767B\u5F55\u7684\u8D26\u53F7\u884C\u4E8B\uFF0C\u6267\u884C\u5668\u4EE5 gh \u8C03\u7528\u5B83\u3002\u4FDD\u5B58\u65F6\u68C0\u67E5\u5B83\u767B\u5F55\u7684\u8D26\u53F7\u80FD\u5426\u63A8\u9001\u5230\u4ED3\u5E93\uFF0C\u7136\u540E\u91CD\u542F dsh-superagent\u3002", en: "A command name or absolute path, usually a gh wrapper signed in to the agent account through GH_CONFIG_DIR. The agent acts as the account it is signed in to, and the Executor calls it as gh. Saving checks that this account can push to the repository, then restarts dsh-superagent." }
    },
    { key: "pollSeconds", type: "number", advanced: true, min: 60, max: 3600, label: { zh: "\u8F6E\u8BE2\u95F4\u9694 / \u79D2", en: "Polling interval / seconds" }, hint: { zh: "GitHub \u8981\u6C42\u66F4\u957F\u95F4\u9694\u65F6\u4EE5 GitHub \u4E3A\u51C6\u3002", en: "A longer interval requested by GitHub wins." } },
    { key: "failuresBeforeError", type: "number", advanced: true, min: 1, max: 20, label: { zh: "\u8FDE\u7EED\u5931\u8D25\u51E0\u6B21\u540E\u62A5\u544A\u5F02\u5E38", en: "Failed polls before reporting an error" }, hint: { zh: "\u5355\u6B21\u7F51\u7EDC\u4E2D\u65AD\u4F1A\u5728\u4E0B\u4E00\u6B21\u8F6E\u8BE2\u65F6\u81EA\u52A8\u91CD\u8BD5\uFF0C\u4E0D\u5FC5\u62A5\u544A\u3002", en: "A single network interruption is retried on the next poll and need not be reported." } },
    {
      key: "observeIssues",
      type: "switch",
      label: { zh: "\u63A5\u6536\u4ED3\u5E93\u91CC\u7684\u65B0 Issue", en: "Receive new Issues in the repository" },
      hint: { zh: "\u6253\u5F00\u540E\uFF0C\u6CA1\u6709 @ \u667A\u80FD\u4F53\u7684\u65B0 Issue \u4E5F\u4F1A\u6536\u5230\uFF0C\u7531\u7B56\u7565\u7684\u63A5\u6536\u8868\u51B3\u5B9A\u662F\u5426\u6210\u4E3A\u5019\u9009\u3002\u4ECE\u6253\u5F00\u7684\u65F6\u5019\u5F00\u59CB\uFF0C\u4E0D\u8BFB\u4EE5\u524D\u7684\u3002", en: "New Issues that do not mention the agent are received too, and the Policy's admission table decides whether they become candidates. Starts when switched on; earlier ones are not read." }
    },
    {
      key: "observePulls",
      type: "switch",
      label: { zh: "\u63A5\u6536\u4ED3\u5E93\u91CC\u7684\u65B0 PR", en: "Receive new pull requests in the repository" },
      hint: { zh: "\u6253\u5F00\u540E\uFF0C\u6CA1\u6709 @ \u667A\u80FD\u4F53\u7684\u65B0 PR \u4E5F\u4F1A\u6536\u5230\uFF0C\u7531\u7B56\u7565\u7684\u63A5\u6536\u8868\u51B3\u5B9A\u662F\u5426\u6210\u4E3A\u5019\u9009\u3002", en: "New pull requests that do not mention the agent are received too, and the Policy's admission table decides whether they become candidates." }
    },
    {
      key: "observeComments",
      type: "switch",
      label: { zh: "\u63A5\u6536\u4ED3\u5E93\u91CC\u7684\u8BC4\u8BBA", en: "Receive comments in the repository" },
      hint: { zh: "\u6253\u5F00\u540E\uFF0CIssue \u548C PR \u4E0A\u6CA1\u6709 @ \u667A\u80FD\u4F53\u7684\u8BC4\u8BBA\u548C\u4EE3\u7801\u8BC4\u8BBA\u4E5F\u4F1A\u6536\u5230\uFF0C\u7531\u7B56\u7565\u7684\u63A5\u6536\u8868\u51B3\u5B9A\u662F\u5426\u6210\u4E3A\u5019\u9009\u3002", en: "Comments and review comments on Issues and PRs that do not mention the agent are received too, and the Policy's admission table decides whether they become candidates." }
    },
    {
      key: "observeCi",
      type: "switch",
      label: { zh: "\u63A5\u6536\u9ED8\u8BA4\u5206\u652F\u7684 CI", en: "Receive the default branch's CI" },
      hint: { zh: "\u6253\u5F00\u540E\uFF0C\u9ED8\u8BA4\u5206\u652F\u7684 CI \u5931\u8D25\u548C\u6062\u590D\u4F1A\u6536\u5230\uFF0C\u7531\u7B56\u7565\u7684\u63A5\u6536\u8868\u51B3\u5B9A\u662F\u5426\u6210\u4E3A\u5019\u9009\u3002", en: "Failures of the default branch's CI, and its recovery, are received, and the Policy's admission table decides whether they become candidates." }
    }
  ],
  // What the Source observes across the repository it receives in full; elsewhere, only what addresses the agent.
  scope: ({ meta }, config) => {
    const row = scopeOf(meta);
    return { listened: true, observed: row !== void 0 && config[OBSERVED[row]], ...row ? { row } : {} };
  },
  health: ["github"],
  channel: { send: sendGithub, link: githubLink },
  threadContext: githubThreadContext,
  // `#12`, `12`, or the page of an Issue or PR, of any repository, names Thread 12.
  find: (query) => {
    const number = (/^#?(\d+)$/.exec(query.trim()) ?? /github\.com\/[^/]+\/[^/]+\/(?:pull|issues)\/(\d+)/.exec(query))?.[1];
    return { threads: number ? [`${SOURCE}:${number}`] : [], terms: [] };
  },
  policy: {
    schema: z7.object({
      allowed: z7.array(z7.object({ id: z7.string().regex(/^[A-Za-z0-9-]+$/) }).strict()).default([]),
      bots: z7.array(z7.object({ id: z7.string().regex(/^[A-Za-z0-9-]+(\[bot\])?$/) }).strict()).optional()
    }).strict(),
    fields: [
      {
        key: "allowed",
        type: "rows",
        label: { zh: "\u80FD\u53D1\u8D77\u5DE5\u4F5C\u7684 GitHub \u8D26\u53F7", en: "GitHub accounts that may originate work" },
        columns: [{ key: "id", type: "text", label: { zh: "\u8D26\u53F7", en: "Account" }, pattern: "[A-Za-z0-9\\-]+" }]
      },
      {
        key: "bots",
        type: "rows",
        label: { zh: "\u8BC4\u8BBA\u53EF\u4EE5\u6210\u4E3A\u5019\u9009\u7684\u673A\u5668\u4EBA", en: "Bots whose comments may become candidates" },
        hint: { zh: "\u540D\u5355\u91CC\u7684\u673A\u5668\u4EBA\u8D26\u53F7\uFF08\u4F8B\u5982 dependabot[bot]\uFF09\u7684\u8BC4\u8BBA\u5728\u6765\u6E90\u6536\u5230\u65F6\u6210\u4E3A\u63A8\u65AD\u7684\u5019\u9009\uFF0C\u4EA4\u7ED9\u8BC4\u4F30\uFF1A\u8BC4\u8BBA @ \u4E86\u667A\u80FD\u4F53\uFF0C\u6216\u8005\u6253\u5F00\u4E86\u201C\u63A5\u6536\u4ED3\u5E93\u91CC\u7684\u8BC4\u8BBA\u201D\u3002\u5B83\u4EEC\u4E0D\u80FD\u53D1\u8D77\u660E\u786E\u7684\u8BF7\u6C42\uFF0C\u4E5F\u4E0D\u80FD\u505C\u6B62\u5DE5\u5355\uFF1B\u5176\u4ED6\u673A\u5668\u4EBA\u7684\u8BC4\u8BBA\u4E0D\u63A5\u6536\u3002", en: "A comment of a bot account on this list, such as dependabot[bot], becomes an inferred candidate for an assessment when the Source receives it: when it mentions the agent, or with Receive comments in the repository on. Such a comment never makes an explicit request or stops a ticket; other bots' comments are not admitted." },
        columns: [{ key: "id", type: "text", label: { zh: "\u8D26\u53F7", en: "Account" }, pattern: "[A-Za-z0-9\\-]+(\\[bot\\])?" }]
      }
    ],
    explicit: { zh: "\u540D\u5355\u91CC\u7684\u8D26\u53F7\u5728 Issue \u6216\u8BC4\u8BBA\u91CC @ \u667A\u80FD\u4F53\u7684\u8D26\u53F7\u3002", en: "An account on the list mentions the agent's account in an Issue or a comment." },
    rows(stored) {
      const config = GithubConfigSchema.partial().parse(stored);
      const note = (observed) => observed ? { zh: "\u5168\u90E8", en: "All" } : { zh: "\u4EC5 @", en: "@ only" };
      const row = (id, label) => ({
        id,
        label,
        note: note(config[OBSERVED[id]]),
        cells: { listedUnaddressed: !!config[OBSERVED[id]], unlistedAddressed: true, unlistedUnaddressed: !!config[OBSERVED[id]] }
      });
      return [
        row("issues", { zh: "\u65B0 Issue", en: "New Issues" }),
        row("pulls", { zh: "\u65B0 PR", en: "New pull requests" }),
        row("comments", { zh: "\u8BC4\u8BBA", en: "Comments" }),
        // CI has no sender, so only the cell of a sender off the list who does not address the agent applies.
        {
          id: "ci",
          label: { zh: "\u9ED8\u8BA4\u5206\u652F\u7684 CI", en: "Default branch CI" },
          note: config.observeCi ? { zh: "\u63A5\u6536", en: "Received" } : { zh: "\u4E0D\u63A5\u6536", en: "Not received" },
          cells: { listedUnaddressed: false, unlistedAddressed: false, unlistedUnaddressed: !!config.observeCi }
        }
      ];
    }
  },
  environment: {
    variables: [
      { key: "DSH_SUPERAGENT_GITHUB_REPOSITORY", description: { zh: "\u8FD9\u4E2A\u6765\u6E90\u76D1\u542C\u7684\u4ED3\u5E93\uFF0Cowner/name\u3002\u667A\u80FD\u4F53\u5728\u8FD9\u91CC\u5F00\u7684 PR\uFF0C\u5206\u652F\u6700\u540E\u4E00\u6BB5\u662F DSH_SUPERAGENT_NAME \u65F6\uFF08\u4F8B\u5982 agent/$DSH_SUPERAGENT_NAME\uFF09\u4F1A\u5173\u8054\u5230\u5DE5\u5355", en: "The repository this Source watches, as owner/name. A PR the agent opens here from a branch whose last path segment is DSH_SUPERAGENT_NAME (for example agent/$DSH_SUPERAGENT_NAME) binds to the ticket" } },
      { key: "DSH_SUPERAGENT_GITHUB_ACCOUNT", description: { zh: "\u667A\u80FD\u4F53\u7684 GitHub \u8D26\u53F7\uFF1Bgh \u4EE5\u5B83\u767B\u5F55\uFF0C\u9664\u81EA\u52A8\u5408\u5E76\u5916\u7684 GitHub \u64CD\u4F5C\u90FD\u7528 gh\uFF0C\u4E0D\u7528\u5176\u4ED6\u8D26\u53F7\u6216\u51ED\u636E", en: "The agent's GitHub account. gh is signed in to it; use gh for every GitHub operation except auto-merge, and never another account or credential" } },
      { key: "DSH_SUPERAGENT_GITHUB_COMMIT_EMAIL", description: { zh: "\u667A\u80FD\u4F53\u8D26\u53F7\u7684\u63D0\u4EA4\u90AE\u7BB1\u3002\u8FD9\u91CC\u7684 git \u6CA1\u6709\u8EAB\u4EFD\uFF1A\u6309\u63D0\u793A\u8BCD\u5199\u660E\u7684\u4F5C\u8005\u63D0\u4EA4\uFF0C\u6CA1\u6709\u5199\u660E\u65F6\u7528\u667A\u80FD\u4F53\u8D26\u53F7\u548C\u8FD9\u4E2A\u90AE\u7BB1", en: "Commit email of the agent's account. git has no identity here: commit as the author these instructions name, or as the agent's account with this email when they name none" } },
      { key: "DSH_SUPERAGENT_GITHUB_NUMBER", description: { zh: "\u63A5\u4E0B\u5DE5\u5355\u7684 Issue \u6216 PR \u7F16\u53F7\uFF1B\u5DE5\u5355\u4E0D\u662F\u4ECE GitHub \u6765\u7684\u65F6\u4E3A\u7A7A", en: "Number of the Issue or PR that started the ticket; empty when the ticket did not start on GitHub" } },
      { key: "DSH_SUPERAGENT_GITHUB_PR_HEAD", description: { zh: "\u63A5\u4E0B\u5DE5\u5355\u7684 PR \u7684 head \u5F15\u7528 refs/pull/<\u7F16\u53F7>/head\uFF1B\u4E0D\u662F PR \u65F6\u4E3A\u7A7A", en: "Head ref refs/pull/<number>/head of the PR that started the ticket; empty when it was not a PR" } }
    ],
    values: ({ deployment, trigger }) => {
      const number = trigger?.threads[0]?.source === SOURCE ? Number(trigger.meta.number) || 0 : 0;
      return {
        DSH_SUPERAGENT_GITHUB_REPOSITORY: deployment.repository,
        DSH_SUPERAGENT_GITHUB_ACCOUNT: deployment.github.login,
        DSH_SUPERAGENT_GITHUB_COMMIT_EMAIL: deployment.github.noreply,
        DSH_SUPERAGENT_GITHUB_NUMBER: number ? String(number) : "",
        DSH_SUPERAGENT_GITHUB_PR_HEAD: number && trigger?.meta.isPr === true ? `refs/pull/${number}/head` : ""
      };
    }
  },
  facts: (deployment) => deployment ? {
    cli: { zh: `\u5F53\u524D\u8D26\u53F7 @${deployment.github.login}`, en: `Current account @${deployment.github.login}` }
  } : {}
};
var name = "dsh-superagent-github";
var inject = ["orchestrator"];
function apply(ctx) {
  ctx.effect(() => ctx.orchestrator.sources.register(githubKind), "github: source kind");
  ctx.effect(() => {
    const source = sourceContext(ctx.orchestrator, githubKind);
    const controller = new AbortController();
    const running = watch(source, controller.signal).catch((error) => {
      source.report("github", { state: "error", detail: String(error) });
    });
    return async () => {
      controller.abort();
      await running;
    };
  });
}
function pollFailure(failures, threshold, error) {
  return failures >= threshold ? health("error", "pollFailures", { count: String(failures), error: String(error) }) : void 0;
}
async function watch(ctx, signal) {
  let interval = 60;
  let failures = 0;
  await ctx.ready;
  if (!ctx.configured()) {
    ctx.report("github", health("paused", "setupPending"));
    return;
  }
  while (!signal.aborted) {
    const config = ctx.config(SOURCE);
    try {
      if (config) interval = await pollRound(ctx, signal);
      else ctx.report("github", health("paused", "sourceOff"));
      failures = 0;
    } catch (error) {
      failures += 1;
      const failed2 = pollFailure(failures, config?.failuresBeforeError ?? 1, error);
      if (!signal.aborted && failed2) ctx.report("github", failed2);
    }
    await pause(Math.max(interval, ctx.config(SOURCE)?.pollSeconds ?? 60) * 1e3, signal);
  }
}
var newRound = (signal) => ({
  started: (/* @__PURE__ */ new Date()).toISOString(),
  signal,
  pulls: /* @__PURE__ */ new Map(),
  read: /* @__PURE__ */ new Set(),
  failures: [],
  dropped: [],
  abandoned: [],
  tally: { skipped: 0 }
});
var stopped = (ctx, round) => !!round.signal?.aborted || !ctx.config(SOURCE);
var RETRY_WINDOW_MS = 24 * 36e5;
var deleted = (error) => error instanceof CliError && error.code === 410;
function failed(ctx, round, number, error, abandoned = false) {
  if (deleted(error)) round.dropped.push(number);
  else if (abandoned) round.abandoned.push(number);
  else round.failures.push(`#${number}: ${String(error)}`);
  ctx.threads.patch(`github:${number}`, { pollError: String(error) });
}
function included(raw) {
  const split = raw.search(/\r?\n\r?\n/);
  if (split < 0) throw new Error("GitHub returned no HTTP headers");
  return { headers: raw.slice(0, split), body: raw.slice(split).trim() };
}
var ListedSchema = CommentSchema.extend({ issue_url: z7.string().nullish(), pull_request_url: z7.string().nullish() });
var STREAMS = [
  { id: "issues", observed: (config) => config.observeIssues || config.observePulls, path: "issues?state=all" },
  { id: "comments", observed: (config) => config.observeComments, path: "issues/comments?" },
  { id: "review-comments", observed: (config) => config.observeComments, path: "pulls/comments?" }
];
async function pollRepository(ctx, round) {
  const config = ctx.config(SOURCE);
  if (!config) return;
  for (const stream of STREAMS) {
    if (stopped(ctx, round)) return;
    if (!stream.observed(config)) {
      ctx.state.set(KV.github.stream(stream.id), void 0);
      continue;
    }
    try {
      await readStream(ctx, round, stream.id, stream.path, config);
    } catch (error) {
      if (!stopped(ctx, round)) round.failures.push(`${stream.id}: ${String(error)}`);
    }
  }
  if (!config.observeCi) {
    const seen = ctx.state.get(KV.github.branchCi);
    ctx.state.set(KV.github.branchCi, seen && { revision: seen.revision });
    return;
  }
  try {
    await pollBranchCi(ctx, round);
  } catch (error) {
    if (!stopped(ctx, round)) round.failures.push(`default branch CI: ${String(error)}`);
  }
}
async function readStream(ctx, round, id, path, config) {
  const name2 = KV.github.stream(id);
  const stored = ctx.state.get(name2);
  const kinds = id === "issues" ? [...config.observeIssues ? ["issues"] : [], ...config.observePulls ? ["pulls"] : []] : ["comments"];
  const before = typeof stored?.started === "object" ? stored.started : {};
  const started = Object.fromEntries(kinds.map((kind) => [kind, before[kind] ?? round.started]));
  const horizon = Math.floor((Date.parse(round.started) - POLL_HORIZON_MS) / 36e5) * 36e5;
  const since = new Date(Math.max(Date.parse(stored?.since ?? round.started), horizon)).toISOString();
  const conditional = stored?.etag && stored.since === since ? ["-H", `If-None-Match: ${stored.etag}`] : [];
  let raw;
  const listed = `${path}&sort=updated&direction=asc&per_page=100&since=${encodeURIComponent(since)}`;
  try {
    raw = await ctx.commands.withSignal(round.signal).api(listed, "--include", ...conditional);
  } catch (error) {
    if (error instanceof CliError && error.code === 304) return;
    throw error;
  }
  const { headers, body } = included(raw);
  const items = validItems(ListedSchema, z7.array(z7.unknown()).parse(JSON.parse(body)), round.tally);
  const { login } = ctx.deployment.github;
  const fresh = (at, kind) => kind in started && Date.parse(at ?? "") >= Math.max(Date.parse(started[kind]), horizon);
  for (const item of items) {
    if (stopped(ctx, round)) throw new Error("The GitHub Source stopped during the poll");
    if (sameName(item.user.login, login)) continue;
    if (id === "issues") {
      const issue = IssueSchema.safeParse(item);
      const pr = issue.success && !!issue.data.pull_request;
      if (!issue.success || !fresh(issue.data.created_at, pr ? "pulls" : "issues")) continue;
      await ctx.receive(pr ? pullTrigger(issue.data, login) : issueTrigger(issue.data, login));
      nameThread(ctx, issue.data.number, issue.data.title);
      continue;
    }
    const number = Number(/\/(?:issues|pulls)\/(\d+)$/.exec((id === "comments" ? item.issue_url : item.pull_request_url) ?? "")?.[1]);
    if (!number || !fresh(item.updated_at ?? item.created_at, "comments")) continue;
    const isPr = id === "review-comments" || /\/pull\//.test(item.html_url ?? "");
    const ref = { number, isPr, ...item.html_url ? { url: item.html_url } : {} };
    const trigger = commentTrigger(item, ref, id === "comments" ? "conversation" : "inline", login);
    if (trigger.text) await ctx.receive(trigger);
  }
  const newest = Math.max(...items.map((item) => Date.parse(item.updated_at ?? "")).filter(Number.isFinite));
  const moved = Number.isFinite(newest) ? cursorAt(new Date(newest).toISOString()) : since;
  const next = Date.parse(moved) > Date.parse(since) ? moved : since;
  const etag = /^etag:\s*(.+)$/im.exec(headers)?.[1]?.trim();
  ctx.state.set(name2, { since: next, started, ...etag && next === since ? { etag } : {} });
}
async function pollBranchCi(ctx, round) {
  const commands = ctx.commands.withSignal(round.signal);
  const { default_branch: branch } = await commands.api(z7.looseObject({ default_branch: z7.string() }), "");
  const head = await commands.api(z7.looseObject({ sha: z7.string() }), `commits/${encodeURIComponent(branch)}`);
  const snapshot = await pullChecks(commands, head.sha, round.tally);
  const previous = ctx.state.get(KV.github.branchCi);
  const known = previous?.branch === branch ? previous.failures : void 0;
  const failures = ciFailures(snapshot);
  const counts = ciCounts(snapshot);
  const now = failures.length || !counts.running ? failures : known ?? [];
  let revision = previous?.revision ?? 0;
  if (known && JSON.stringify(now) !== JSON.stringify(known)) {
    revision += 1;
    const summary = ciSummary(snapshot, branch, `github/commits/${head.sha}/checks`);
    const url = `https://github.com/${ctx.deployment.repository}/commit/${head.sha}`;
    await ctx.receive(branchCiTrigger(branch, head.sha, revision, summary, url));
    ctx.threads.describe(`github:ci:${branch}`, { label: `CI on ${branch}`, facts: { ci: ciFact(counts) } });
  }
  ctx.state.set(KV.github.branchCi, { branch, failures: now, revision });
}
async function pollRound(ctx, signal) {
  const round = newRound(signal);
  const notified = await pollNotifications(ctx, round).then((value) => ({ value }), (error) => ({ error }));
  await pollRepository(ctx, round);
  await pollTicketPulls(ctx, signal, round);
  await pollThreads2(ctx, signal, round);
  if ("error" in notified) throw notified.error;
  const { count, interval } = notified.value;
  if (signal?.aborted) return interval;
  if (round.failures.length) throw new Error(`${round.failures.length} GitHub reads failed: ${round.failures.slice(0, 3).join("; ")}`);
  const named = (numbers) => [...new Set(numbers)].sort((a, b) => a - b).map((number) => `#${number}`).join(", ");
  const dropped = (round.dropped.length ? `; deleted on GitHub: ${named(round.dropped)}` : "") + (round.abandoned.length ? `; dropped after their reads kept failing: ${named(round.abandoned)}` : "") + (round.tally.skipped ? `; ${round.tally.skipped} unreadable items skipped` : "");
  ctx.report("github", { state: "ready", detail: `${count} notifications; next poll \u2265 ${interval}s${dropped}`, at: round.started });
  return interval;
}
async function pollNotifications(ctx, round) {
  const { state } = ctx;
  const commands = ctx.commands.withSignal(round.signal);
  const since = state.get(KV.github.since) ?? round.started;
  if (state.get(KV.github.since) === void 0) state.set(KV.github.since, since);
  const { repository } = ctx.deployment;
  const path = `notifications?all=true&per_page=50&since=${encodeURIComponent(since)}`;
  const raw = await commands.api(path, "--include");
  const split = raw.search(/\r?\n\r?\n/);
  if (split < 0) throw new Error("GitHub returned no HTTP headers");
  const headers = raw.slice(0, split);
  const body = raw.slice(split).trim();
  const asked = Number(/x-poll-interval:\s*(\d+)/i.exec(headers)?.[1] ?? 60);
  const interval = Math.max(60, Number.isFinite(asked) ? asked : 60);
  const notifications = /rel="next"/.test(headers) ? await commands.pages(NotificationSchema, path, round.tally) : validItems(NotificationSchema, z7.array(z7.unknown()).parse(JSON.parse(body)), round.tally);
  const retries = { ...state.get(KV.github.retries) };
  const items = new Map(Object.entries(retries).map(([number, retry]) => [Number(number), retry]));
  for (const notification of notifications.reverse()) {
    if (!sameName(notification.repository.full_name, repository)) continue;
    const address = githubAddress(notification.subject.url ?? "", repository);
    if (!address || address.discussion || items.has(address.number)) continue;
    const { number, pr } = address;
    items.set(number, { since: [state.get(KV.github.cursor(number)) ?? since, since].sort().at(-1), pr });
  }
  for (const [number, item] of items) {
    if (stopped(ctx, round)) return { count: notifications.length, interval };
    round.read.add(number);
    try {
      await readNotified(ctx, round, number, item);
      delete retries[number];
    } catch (error) {
      if (stopped(ctx, round)) return { count: notifications.length, interval };
      const retry = { ...item, failedAt: item.failedAt ?? round.started, attempts: (item.attempts ?? 0) + 1 };
      const abandoned = Date.parse(round.started) - Date.parse(retry.failedAt) >= RETRY_WINDOW_MS;
      failed(ctx, round, number, error, abandoned);
      if (!deleted(error) && !abandoned) {
        retries[number] = retry;
        continue;
      }
      delete retries[number];
    }
  }
  ctx.atomic(() => {
    state.set(KV.github.since, cursorAt(round.started));
    state.set(KV.github.retries, retries);
  });
  return { count: notifications.length, interval };
}
async function readNotified(ctx, round, number, item) {
  const { since } = item;
  let isPr = item.pr;
  if (!isPr) {
    const issue = await ctx.commands.withSignal(round.signal).api(IssueSchema, `issues/${number}`);
    isPr = !!issue.pull_request;
    if (!isPr) {
      const { login } = ctx.deployment.github;
      const opened = Date.parse(issue.created_at) >= Date.parse(since) && !sameName(issue.user.login, login);
      if (opened) await ctx.receive(issueTrigger(issue, login));
      await intakeComments(ctx, { number, isPr: false, url: issue.html_url }, since, round);
      nameThread(ctx, number, issue.title);
    }
  }
  if (isPr) {
    const pr = await pull(ctx, round, number);
    const { login } = ctx.deployment.github;
    if (pr.created_at && Date.parse(pr.created_at) >= Date.parse(since) && !sameName(pr.user.login, login)) {
      const opened = { number, title: pr.title ?? "", body: pr.body, user: pr.user, created_at: pr.created_at, html_url: pr.html_url };
      await ctx.receive(pullTrigger(opened, login));
    }
    await intakeComments(ctx, { number, isPr: true, url: pr.html_url, prAuthor: pr.user.login }, since, round);
    if (pr.title) nameThread(ctx, number, pr.title);
  }
  ctx.state.set(KV.github.cursor(number), cursorAt(round.started));
  ctx.threads.patch(`github:${number}`, { pollError: void 0 });
}
function pull(ctx, round, number) {
  let read = round.pulls.get(number);
  if (!read) {
    read = readPull(ctx, number, round.signal).then(async (pr) => {
      await observePull(ctx, pr);
      return pr;
    });
    round.pulls.set(number, read);
  }
  return read;
}
async function intakeComments(ctx, ref, since, round) {
  const commands = ctx.commands.withSignal(round.signal);
  const { login } = ctx.deployment.github;
  const kinds = ref.isPr ? ["conversation", "inline", "review"] : ["conversation"];
  for (const kind of kinds) {
    const suffix = `&since=${encodeURIComponent(since)}`;
    const path = kind === "conversation" ? `issues/${ref.number}/comments?per_page=100${suffix}` : kind === "inline" ? `pulls/${ref.number}/comments?per_page=100${suffix}` : `pulls/${ref.number}/reviews?per_page=100`;
    const comments = await commands.pages(CommentSchema, path, round.tally);
    for (const comment of comments) {
      if (stopped(ctx, round)) throw new Error("The GitHub Source stopped during the poll");
      const timestamp = Date.parse(comment.updated_at ?? comment.submitted_at ?? comment.created_at ?? "");
      if (!Number.isFinite(timestamp) || timestamp < Date.parse(since)) continue;
      if (sameName(comment.user.login, login)) continue;
      const trigger = commentTrigger(comment, ref, kind, login);
      if (trigger.text) await ctx.receive(trigger);
    }
  }
}
async function pollTicketPulls(ctx, signal, round = newRound(signal)) {
  const numbers = [...new Set(ctx.tickets.open().flatMap((ticket) => pullsOf(ticket, true)))];
  for (const number of numbers) {
    if (stopped(ctx, round)) return;
    try {
      const pr = await pull(ctx, round, number);
      if (pr.state !== "closed" && !pr.merged) await pollChecks(ctx, round, number, pr);
    } catch (error) {
      if (!stopped(ctx, round)) failed(ctx, round, number, error);
    }
  }
}
async function pollChecks(ctx, round, number, pr) {
  const snapshot = await pullChecks(ctx.commands.withSignal(round.signal), pr.head.sha, round.tally);
  const fingerprint = key(JSON.stringify(snapshot));
  const previous = ctx.state.get(KV.github.ci(number));
  if (previous?.fingerprint === fingerprint) return;
  const revision = previous ? previous.revision + 1 : 0;
  if (previous) await ctx.receive(ciTrigger(pr, revision, ciSummary(snapshot, `PR #${number}`, `github/pulls/${number}/checks`)));
  ctx.state.set(KV.github.ci(number), { fingerprint, revision });
  ctx.threads.describe(`github:${number}`, { facts: { ci: ciFact(ciCounts(snapshot)) } });
}
function nameThread(ctx, number, title) {
  ctx.threads.patch(`github:${number}`, { title });
  ctx.threads.describe(`github:${number}`, { label: `#${number} ${title}`, facts: { number: { value: `#${number}` } } });
}
async function pollThreads2(ctx, signal, round = newRound(signal)) {
  await pollThreads(ctx, SOURCE, () => stopped(ctx, round), async (thread) => {
    try {
      await pollThread(ctx, round, thread);
    } catch (error) {
      if (stopped(ctx, round)) throw error;
      if (deleted(error)) round.dropped.push(Number(thread.ref.id));
      else round.failures.push(`${thread.key}: ${String(error)}`);
      throw error;
    }
  }, (thread) => round.read.has(Number(thread.ref.id)));
}
async function pollThread(ctx, round, thread) {
  if (thread.ref.id.startsWith("ci:")) return;
  const number = Number(thread.ref.id);
  if (!number) throw new Error("Subscribed thread has no GitHub issue or PR number");
  round.read.add(number);
  if (typeof thread.meta.isPr !== "boolean" || typeof thread.meta.title !== "string") {
    const issue = await ctx.commands.withSignal(round.signal).api(IssueSchema, `issues/${number}`);
    ctx.threads.patch(thread.key, { number, isPr: !!issue.pull_request, url: issue.html_url });
    if (issue.title) nameThread(ctx, number, issue.title);
    thread = ctx.threads.get(thread.key) ?? thread;
  }
  const checkpoint = KV.github.cursor(number);
  const since = ctx.state.get(checkpoint) ?? thread.createdAt;
  if (thread.meta.isPr === true) {
    const pr = await pull(ctx, round, number);
    await intakeComments(ctx, { number, isPr: true, url: pr.html_url, prAuthor: pr.user.login }, since, round);
  } else await intakeComments(ctx, { number, isPr: false }, since, round);
  ctx.state.set(checkpoint, cursorAt(round.started));
}
export {
  apply,
  commentTrigger,
  githubKind,
  inject,
  name,
  pollFailure,
  pollRound,
  pollThreads2 as pollThreads,
  pollTicketPulls
};
