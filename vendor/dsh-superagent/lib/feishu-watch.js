// ../../tmp/dsh-superagent-prototype/src/sources/feishu.ts
import { z as z7 } from "zod";

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

// ../../tmp/dsh-superagent-prototype/src/infra/text.ts
var words = new Intl.Segmenter("zh", { granularity: "word" });
var IM_WORDS = 100;
function wordCount(text) {
  let count = 0;
  for (const segment of words.segment(text)) if (segment.isWordLike) count++;
  return count;
}
function checkedImText(text) {
  const count = wordCount(text);
  if (count > IM_WORDS) throw new Error(`IM message has ${count} words; maximum is ${IM_WORDS}. Rewrite as a short high-level update. Do not split it into multiple messages.`);
  return text;
}
var fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, name2) => values[name2] ?? "");

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

// ../../tmp/dsh-superagent-prototype/src/sources/feishu-trigger.ts
import { z as z3 } from "zod";

// ../../tmp/dsh-superagent-prototype/src/core/model.ts
var threadKey = (ref) => `${ref.source}:${ref.id}`;
var liveTicket = (ticket) => !ticket.ended;

// ../../tmp/dsh-superagent-prototype/src/core/ids.ts
import { createHash } from "node:crypto";
function key(...values) {
  return createHash("sha256").update(JSON.stringify(values)).digest("hex").slice(0, 32);
}

// ../../tmp/dsh-superagent-prototype/src/sources/feishu-trigger.ts
var SOURCE = "feishu";
var feishuChannel = (chatId, messageId2, direct = false) => ({ source: SOURCE, thread: `feishu:${chatId}`, address: { chatId, messageId: messageId2, ...direct ? { direct: "true" } : {} } });
var EventSchema = z3.object({
  message_id: z3.string(),
  chat_id: z3.string(),
  chat_type: z3.enum(["p2p", "group"]),
  sender_id: z3.string(),
  sender_type: z3.enum(["user", "bot"]),
  content: z3.string(),
  create_time: z3.string(),
  mentions: z3.array(z3.object({ id: z3.string(), key: z3.string().optional(), name: z3.string().optional() })).default([]),
  root_id: z3.string().optional(),
  parent_id: z3.string().optional(),
  thread_id: z3.string().optional(),
  message_app_link: z3.url().optional()
});
var feishuThreadId = (chatId, rootId, messageId2) => `${chatId}:${rootId ?? messageId2}`;
var feishuTriggerId = (messageId2) => key("feishu", messageId2);
var withMentionNames = (text, mentions) => mentions.reduce((result, mention) => mention.key && mention.name ? result.replaceAll(mention.key, `@${mention.name}`) : result, text);
function feishuTime(value) {
  const time = /^\d+$/.test(value) ? Number(value) : Date.parse(value);
  if (!Number.isFinite(time)) throw new Error(`Unreadable Feishu message time: ${value}`);
  return new Date(time).toISOString();
}
function feishuTrigger(input, botId, botAppId) {
  const event = EventSchema.parse(input);
  if (event.sender_id === botId || event.sender_id === botAppId) return;
  const direct = event.chat_type === "p2p";
  const mentioned = event.mentions.some((mention) => mention.id === botId || mention.id === botAppId);
  const thread = feishuThreadId(event.chat_id, event.root_id, event.message_id);
  return {
    id: feishuTriggerId(event.message_id),
    source: SOURCE,
    threads: [{ source: SOURCE, id: thread }],
    actor: { source: SOURCE, id: event.sender_id },
    human: event.sender_type === "user",
    ...direct ? { addressed: "direct" } : mentioned ? { addressed: "mention" } : {},
    at: feishuTime(event.create_time),
    text: withMentionNames(event.content, event.mentions),
    channel: feishuChannel(event.chat_id, event.message_id, direct),
    ...event.message_app_link ? { url: event.message_app_link } : {},
    meta: {
      chatId: event.chat_id,
      messageId: event.message_id,
      direct,
      mentioned,
      ...event.root_id ? { rootId: event.root_id } : {},
      ...event.parent_id ? { parentId: event.parent_id } : {},
      ...event.thread_id ? { threadId: event.thread_id } : {}
    }
  };
}
function feishuRef(trigger) {
  const meta = trigger.meta;
  if (trigger.source !== SOURCE || !meta.chatId || !meta.messageId) return void 0;
  return { triggerId: trigger.id, chatId: meta.chatId, messageId: meta.messageId, at: trigger.at };
}
var HistoricalMessageSchema = z3.looseObject({
  message_id: z3.string(),
  chat_id: z3.string(),
  create_time: z3.string(),
  root_id: z3.string().optional(),
  parent_id: z3.string().optional(),
  thread_id: z3.string().optional(),
  deleted: z3.boolean().optional(),
  message_app_link: z3.string().optional(),
  sender: z3.looseObject({ id: z3.string().default(""), sender_type: z3.string() }),
  body: z3.looseObject({ content: z3.string() }).optional(),
  mentions: z3.array(z3.looseObject({ id: z3.string(), key: z3.string().optional(), name: z3.string().optional() })).optional()
});
var HistoryPageSchema = z3.looseObject({
  items: z3.array(z3.unknown()).default([]),
  has_more: z3.boolean().default(false),
  page_token: z3.string().optional()
});
function historyText(message) {
  let content;
  try {
    content = JSON.parse(message.body?.content ?? "");
  } catch {
    content = message.body?.content ?? "";
  }
  const plain = content && typeof content === "object" && "text" in content && typeof content.text === "string" ? content.text : void 0;
  return typeof content === "string" ? content : plain ?? JSON.stringify(content);
}
function historyEvent(message, chatId, direct) {
  return {
    message_id: message.message_id,
    chat_id: chatId,
    chat_type: direct ? "p2p" : "group",
    create_time: message.create_time,
    sender_id: message.sender.id,
    sender_type: message.sender.sender_type === "user" ? "user" : "bot",
    content: historyText(message),
    mentions: message.mentions ?? [],
    root_id: message.root_id,
    parent_id: message.parent_id,
    thread_id: message.thread_id,
    message_app_link: message.message_app_link
  };
}
function topicEvent(message, chatId, direct, root) {
  return {
    message_id: message.message_id,
    chat_id: chatId,
    chat_type: direct ? "p2p" : "group",
    create_time: message.create_time,
    sender_id: message.sender.open_bot_id ?? message.sender.id,
    sender_type: message.sender.sender_type === "user" ? "user" : "bot",
    content: message.content ?? "",
    mentions: message.mentions ?? [],
    parent_id: message.parent_id,
    thread_id: message.thread_id,
    root_id: message.root_id ?? (message.message_id === root ? void 0 : root),
    message_app_link: message.message_app_link
  };
}

// ../../tmp/dsh-superagent-prototype/src/sources/feishu-channel.ts
var feishuChatLink = (brand, chatId) => `https://applink.${brand === "lark" ? "larksuite.com" : "feishu.cn"}/client/chat/open?openChatId=${encodeURIComponent(chatId)}`;
var gone = (error) => error instanceof CliError && error.code !== void 0 && (error.code === 230011 || /withdrawn/i.test(error.message) || Math.floor(error.code / 100) === 2300 && /not found/i.test(error.message));
async function sendFeishu(host, message) {
  const messageId2 = message.channel.address.messageId;
  if (!messageId2) throw new Error("Missing Feishu reply target");
  const text = checkedImText(message.text);
  const reply = ["im", "+messages-reply", "--message-id", messageId2, "--markdown", text, "--reply-in-thread", "--idempotency-key", message.id];
  try {
    await host.commands.lark(reply);
  } catch (error) {
    if (gone(error)) return "gone";
    throw error;
  }
  return "sent";
}
var feishuLink = (address, links) => ({
  url: feishuChatLink(links.feishu?.brand ?? "feishu", address.chatId ?? ""),
  label: { zh: "\u98DE\u4E66\u6D88\u606F", en: "Feishu message" },
  ...address.messageId ? { triggerId: feishuTriggerId(address.messageId) } : {}
});

// ../../tmp/dsh-superagent-prototype/src/sources/feishu-read.ts
import { z as z5 } from "zod";

// ../../tmp/dsh-superagent-prototype/src/sources/feishu-image.ts
import { mkdtemp, readFile as readFile2, realpath, rm, stat } from "node:fs/promises";
import { dirname, extname, join as join3 } from "node:path";
import { z as z4 } from "zod";
function admissionImageKeys(text) {
  return [...new Set(text.match(/\bimg_[a-zA-Z0-9_-]+\b/g) ?? [])];
}
async function readAdmissionImage(agent, commands, ref, text, imageKey, stateDir, signal) {
  if (!admissionImageKeys(text).includes(imageKey)) throw new Error("Choose an image key from this source message");
  const messageId2 = z4.string().regex(/^om_[a-zA-Z0-9_-]+$/).parse(ref.messageId);
  const attachments = agent.ctx.get("attachments");
  if (!attachments) throw new Error("Image reading is unavailable: no attachment service is mounted");
  const route = agent.session.requestHeader()?.config;
  const provider = route?.provider ?? agent.options.provider;
  const model = route?.model ?? agent.options.model;
  const llm = agent.ctx.get("llm");
  if (!llm || !provider || !model) throw new Error("Image reading is unavailable: the current model route is unresolved");
  const info = await llm.resolveModelInfo(provider, model, signal);
  if (!info.inputModalities?.includes("image")) throw new Error(`Model ${model} does not support image input; the image has not been inspected`);
  signal.throwIfAborted();
  const directory = await mkdtemp(join3(stateDir, "admission-image-"));
  try {
    const result = z4.object({ saved_path: z4.string() }).parse(await commands.withSignal(signal).lark([
      "im",
      "+messages-resources-download",
      "--message-id",
      messageId2,
      "--file-key",
      imageKey,
      "--type",
      "image",
      "--output",
      "./image"
    ], directory));
    const path = await realpath(result.saved_path);
    if (dirname(path) !== await realpath(directory)) throw new Error("Image download returned a path outside its temporary directory");
    const mediaTypes = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif" };
    const mediaType = mediaTypes[extname(path).toLowerCase()];
    if (!mediaType) throw new Error("The downloaded resource is not a supported PNG/JPEG/WebP/GIF image");
    const file = await stat(path);
    if (!file.isFile() || file.size > Math.min(attachments.imageLimits.maxImageBytes, attachments.imageLimits.maxMessageImageBytes)) throw new Error("The image exceeds the deployment byte limit or is not a regular file");
    const data = await readFile2(path, { signal });
    signal.throwIfAborted();
    const image = await attachments.saveImage({ data, mediaType, name: `${imageKey}${extname(path)}` });
    signal.throwIfAborted();
    return { source_message_id: messageId2, image_key: imageKey, image };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

// ../../tmp/dsh-superagent-prototype/src/sources/feishu-read.ts
var messageId = z5.string().regex(/^om_[a-zA-Z0-9_-]+$/);
var sourceSchema = z5.object({
  message_id: messageId,
  chat_id: z5.string(),
  root_id: messageId.optional(),
  parent_id: messageId.optional(),
  thread_id: z5.string().regex(/^omt?_[a-zA-Z0-9_-]+$/).optional(),
  deleted: z5.boolean().optional()
});
var messageSchema = z5.object({
  message_id: messageId,
  chat_id: z5.string(),
  content: z5.string().optional(),
  msg_type: z5.string(),
  sender: z5.object({ id: z5.string(), name: z5.string().optional(), open_bot_id: z5.string().optional(), sender_type: z5.string() }),
  create_time: z5.string(),
  update_time: z5.string().optional(),
  updated: z5.boolean().optional(),
  deleted: z5.boolean().optional(),
  mentions: z5.array(z5.object({ id: z5.string(), name: z5.string().optional(), key: z5.string().optional() })).optional(),
  message_app_link: z5.string().optional(),
  thread_id: z5.string().optional(),
  root_id: z5.string().optional(),
  parent_id: z5.string().optional()
});
var threadSchema = z5.object({
  messages: z5.array(z5.unknown()),
  has_more: z5.boolean(),
  page_token: z5.string().optional(),
  thread_id: z5.string()
});
function feishuResource(resource) {
  const match = /^feishu\/([^/]+)\/(message|root|parent|thread|around)(?:\/([^/]+))?$/.exec(resource);
  if (!match || match[3] && match[2] !== "thread" && match[2] !== "around") {
    throw new Error("Use feishu/<trigger-id>/message, /root, /parent, /thread or /around; follow returned next_resource for another page");
  }
  return { triggerId: match[1], section: match[2], cursor: match[3] ? decodeURIComponent(match[3]) : void 0 };
}
async function sourceOf(commands, ref) {
  const id = messageId.parse(ref.messageId);
  const params = JSON.stringify({ message_ids: [id] });
  const listed = await commands.lark(["api", "GET", "/open-apis/im/v1/messages/mget", "--params", params]);
  const sourceResult = z5.object({ items: z5.array(sourceSchema) }).parse(listed);
  const source = sourceResult.items.find((message) => message.message_id === id);
  if (!source || source.deleted) throw new Error("The source Feishu message is unavailable or deleted; retained trigger text is still readable");
  if (source.chat_id !== ref.chatId) throw new Error("Feishu source chat does not match the accepted trigger");
  return source;
}
async function readFeishu(commands, ref, resource, pageSize, order = "asc") {
  const request = feishuResource(resource);
  if (request.triggerId !== ref.triggerId) throw new Error("A Feishu source trigger is required");
  if (request.section === "around") throw new Error("The chat around a message is read with feishuRead");
  const source = await sourceOf(commands, ref);
  if (request.section === "thread") {
    if (!source.thread_id) return { status: "no_thread", messages: [], next_resource: null };
    const args = ["im", "+threads-messages-list", "--thread", source.thread_id, "--order", order, "--page-size", String(pageSize), "--no-reactions"];
    if (request.cursor) args.push("--page-token", request.cursor);
    const result2 = threadSchema.parse(await commands.lark(args));
    const tally = { skipped: 0 };
    const messages = validItems(messageSchema, result2.messages, tally);
    const outside = messages.some((message2) => message2.chat_id !== source.chat_id || message2.thread_id && message2.thread_id !== source.thread_id);
    if (result2.thread_id !== source.thread_id || outside) throw new Error("Feishu returned messages outside the source thread");
    if (result2.has_more && (!result2.page_token || result2.page_token === request.cursor)) throw new Error("Feishu thread pagination did not advance; history is incomplete");
    return {
      status: "available",
      thread_id: result2.thread_id,
      messages,
      ...tally.skipped ? { skipped: tally.skipped } : {},
      next_resource: result2.has_more ? `feishu/${ref.triggerId}/thread/${encodeURIComponent(result2.page_token)}` : null
    };
  }
  const target = request.section === "root" ? source.root_id : request.section === "parent" ? source.parent_id : source.message_id;
  if (!target) return { status: `no_${request.section}`, message: null };
  const result = z5.object({ messages: z5.array(messageSchema) }).parse(await commands.lark(["im", "+messages-mget", "--message-ids", target, "--no-reactions"]));
  const message = result.messages.find((message2) => message2.message_id === target);
  if (!message) throw new Error("The requested Feishu message is unavailable; do not infer its contents");
  if (message.chat_id !== source.chat_id) throw new Error("Feishu returned a message outside the source chat");
  return { status: message.deleted ? "deleted" : "available", message };
}
function isoTime2(value) {
  try {
    return feishuTime(value);
  } catch {
    return value;
  }
}
function feishuView(message) {
  return {
    id: message.message_id,
    from: message.sender.name || message.sender.id,
    at: isoTime2(message.create_time),
    text: message.deleted ? "" : withMentionNames(message.content ?? "", message.mentions ?? []),
    ...message.sender.sender_type !== "user" ? { bot: true } : {},
    ...message.deleted ? { deleted: true } : {},
    ...message.parent_id ? { reply_to: message.parent_id } : {},
    ...message.message_app_link ? { url: message.message_app_link } : {}
  };
}
function historyView(message) {
  return {
    id: message.message_id,
    from: message.sender.id,
    at: isoTime2(message.create_time),
    text: message.deleted ? "" : withMentionNames(historyText(message), message.mentions ?? []),
    ...message.sender.sender_type !== "user" ? { bot: true } : {},
    ...message.deleted ? { deleted: true } : {},
    ...message.parent_id ? { reply_to: message.parent_id } : {},
    ...message.message_app_link ? { url: message.message_app_link } : {}
  };
}
async function chatAround(commands, ref, cursor, before = 5, after = 5) {
  const time = Date.parse(ref.at ?? "");
  if (!Number.isFinite(time)) throw new Error("The source Feishu message has no time to read the chat around");
  const list = async (parameters) => {
    const params = JSON.stringify({ container_id_type: "chat", container_id: ref.chatId, ...parameters });
    const page = HistoryPageSchema.parse(await commands.lark(["api", "GET", "/open-apis/im/v1/messages", "--params", params]));
    return { ...page, items: validItems(HistoricalMessageSchema, page.items).filter((item) => item.chat_id === ref.chatId) };
  };
  const earlier = await list({
    end_time: String(Math.ceil(time / 1e3)),
    sort_type: "ByCreateTimeDesc",
    page_size: cursor ? 10 : before + 1,
    ...cursor ? { page_token: cursor } : {}
  });
  const later = cursor || !after ? [] : (await list({ start_time: String(Math.floor(time / 1e3)), sort_type: "ByCreateTimeAsc", page_size: after + 1 })).items;
  const seen = /* @__PURE__ */ new Set();
  const messages = [...earlier.items.reverse(), ...later].filter((item) => !seen.has(item.message_id) && seen.add(item.message_id)).map(historyView);
  const more = earlier.has_more && earlier.page_token && earlier.page_token !== cursor;
  const next = more ? `feishu/${ref.triggerId}/around/${encodeURIComponent(earlier.page_token)}` : null;
  return { status: "available", messages, next_resource: next };
}
async function feishuRead(commands, ref, resource, pageSize) {
  const request = feishuResource(resource);
  if (request.section === "around") {
    if (request.triggerId !== ref.triggerId) throw new Error("A Feishu source trigger is required");
    await sourceOf(commands, ref);
    return chatAround(commands, ref, request.cursor);
  }
  const result = await readFeishu(commands, ref, resource, pageSize);
  if ("messages" in result) return { ...result, messages: result.messages.map(feishuView) };
  return { status: result.status, message: result.message ? feishuView(result.message) : null };
}
function sourceRef(trigger) {
  const ref = feishuRef(trigger);
  if (!ref) throw new Error("A Feishu source trigger is required");
  return ref;
}
var feishuThreadContext = {
  messageId: (trigger) => String(trigger.meta.messageId ?? ""),
  read: async (commands, trigger, part, cursor, config) => {
    const ref = sourceRef(trigger);
    const resource = `feishu/${trigger.id}/${part}${cursor ? "/" + encodeURIComponent(cursor) : ""}`;
    const body = await feishuRead(commands, ref, resource, config.readPageSize);
    if (part === "thread" && body.status === "no_thread") {
      const around = await chatAround(commands, ref, void 0, 5, 0);
      return { messages: around.messages, body: { status: "chat_neighbours", messages: around.messages }, status: "chat_neighbours" };
    }
    const messages = "messages" in body ? body.messages : body.message ? [body.message] : [];
    const next = "next_resource" in body && body.next_resource ? decodeURIComponent(body.next_resource.split("/").at(-1)) : void 0;
    return { messages, next, body: { ...body }, status: body.status };
  },
  images: admissionImageKeys,
  image: (agent, commands, trigger, message, key2, stateDir, signal) => readAdmissionImage(agent, commands, { ...sourceRef(trigger), messageId: message.id }, message.text, key2, stateDir, signal)
};

// ../../tmp/dsh-superagent-prototype/src/sources/feishu-loops.ts
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { setTimeout as delay } from "node:timers/promises";
import { z as z6 } from "zod";

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
async function pollThreads(ctx, source, stopped, poll, skip = () => false) {
  for (const thread of ctx.threads.subscribed(source)) {
    if (stopped()) return;
    if (skip(thread) || !polled(ctx, thread)) continue;
    try {
      await poll(thread);
      ctx.threads.patch(thread.key, { pollError: void 0 });
    } catch (error) {
      if (stopped()) return;
      ctx.threads.patch(thread.key, { pollError: String(error) });
    }
  }
}

// ../../tmp/dsh-superagent-prototype/src/sources/feishu-loops.ts
var runFeishu = (ctx, signal) => Promise.allSettled([watch, backfillLoop, chatNamesLoop].map((loop) => loop(ctx, signal)));
var enabled = (ctx) => ctx.config(SOURCE);
var bot = (ctx) => {
  const resolved = ctx.deployment.feishu;
  if (!resolved) throw new Error("The Feishu Source has no working bot CLI");
  return resolved;
};
async function receive(ctx, trigger) {
  await ctx.receive(trigger);
  const chatId = String(trigger.meta.chatId ?? "");
  if (!chatId) return;
  const name2 = ctx.state.get(KV.sources.labels(SOURCE))?.[chatId] ?? chatId;
  const chat = trigger.meta.direct === true ? { value: { zh: "\u79C1\u804A", en: "Direct message" } } : { value: name2 };
  for (const ref of trigger.threads) ctx.threads.describe(threadKey(ref), { url: chatLink(ctx, chatId), facts: { chat } });
}
var chatLink = (ctx, chatId) => feishuChatLink(ctx.deployment.feishu?.brand ?? "feishu", chatId);
function available(ctx) {
  if (ctx.configured() && ctx.deployment.feishu) return true;
  const waiting = health("paused", ctx.configured() ? "feishuCliUnset" : "setupPending");
  ctx.report("feishu", ctx.problem ? { state: "paused", detail: ctx.problem.detail } : waiting);
  return false;
}
async function watch(ctx, signal) {
  await ctx.ready;
  if (!available(ctx)) return;
  let retry;
  while (!signal.aborted) {
    if (!enabled(ctx)) {
      ctx.report("feishu", health("paused", "sourceOff"));
      await delay(5e3, void 0, { signal }).catch(() => {
      });
      continue;
    }
    const running = new AbortController();
    const check = setInterval(() => {
      if (!enabled(ctx)) running.abort();
    }, 5e3);
    const stop = () => running.abort();
    signal.addEventListener("abort", stop, { once: true });
    const began = Date.now();
    try {
      await consume(ctx, running.signal);
    } catch (error) {
      if (!running.signal.aborted) ctx.report("feishu", { state: "error", detail: String(error) });
    } finally {
      clearInterval(check);
      signal.removeEventListener("abort", stop);
    }
    if (running.signal.aborted) continue;
    retry = consumerRetry(retry, Date.now() - began);
    await delay(retry, void 0, { signal }).catch(() => {
    });
  }
}
var consumerRetry = (previous, ranMs) => previous === void 0 || ranMs >= 6e4 ? 1e3 : Math.min(previous * 2, 6e4);
async function consume(ctx, signal) {
  const child = spawn(
    bot(ctx).cli,
    ["event", "consume", "im.message.receive_v1", "--as", "bot"],
    { stdio: ["pipe", "pipe", "pipe"], env: {
      ...process.env,
      LARKSUITE_CLI_NO_UPDATE_NOTIFIER: "1",
      LARKSUITE_CLI_NO_SKILLS_NOTIFIER: "1"
    } }
  );
  const stdout = createInterface({ input: child.stdout });
  const stderr = createInterface({ input: child.stderr });
  let chain = Promise.resolve();
  let diagnostic = "";
  let ready = false;
  const stop = () => {
    child.stdin.end();
    child.kill("SIGTERM");
  };
  signal.addEventListener("abort", stop, { once: true });
  const timeout = setTimeout(() => {
    diagnostic = "Feishu event consumer did not become ready within 45 seconds";
    stop();
  }, 45e3);
  stderr.on("line", (line) => {
    diagnostic = line.slice(0, 4e3);
    if (line.startsWith("[event] ready")) {
      ready = true;
      clearTimeout(timeout);
      ctx.report("feishu", { state: "ready", detail: "Listening for bot events", at: (/* @__PURE__ */ new Date()).toISOString() });
    } else if (/WARN|drop|error/.test(line)) ctx.report("feishu", { state: "error", detail: diagnostic });
  });
  stdout.on("line", (line) => {
    chain = chain.then(async () => {
      if (line.length > 1048576) throw new Error("Feishu event exceeds 1 MiB");
      const trigger = feishuTrigger(JSON.parse(line), bot(ctx).botId, bot(ctx).appId);
      if (!trigger || !enabled(ctx)) return;
      const chats = ctx.state.get(KV.feishu.chats) ?? {};
      chats[String(trigger.meta.chatId)] = trigger.meta.direct === true;
      ctx.state.set(KV.feishu.chats, chats);
      await receive(ctx, trigger);
    }).catch((error) => {
      ctx.report("feishu", { state: "error", detail: String(error) });
    });
  });
  try {
    await new Promise((resolve2, reject) => {
      child.once("error", reject);
      const exited = (code) => new Error(`Feishu event consumer exited (${code}, ready=${ready}): ${diagnostic}`);
      child.once("close", (code) => signal.aborted ? resolve2() : reject(exited(code)));
    });
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener("abort", stop);
    stdout.close();
    stderr.close();
    await chain;
  }
}
async function refreshChatNames(ctx, signal) {
  const commands = ctx.commands.withSignal(signal);
  const result = z6.looseObject({ chats: z6.array(z6.looseObject({ chat_id: z6.string(), name: z6.string().nullish() })).optional() }).parse(await commands.lark(["im", "+chat-list", "--page-all", "--page-size", "100"]));
  const names = Object.fromEntries((result.chats ?? []).filter((chat) => chat.name).map((chat) => [chat.chat_id, chat.name]));
  ctx.state.set(KV.sources.labels(SOURCE), names);
  return names;
}
async function chatNamesLoop(ctx, signal) {
  await ctx.ready;
  if (!available(ctx)) return;
  while (!signal.aborted) {
    if (enabled(ctx)) {
      try {
        await refreshChatNames(ctx, signal);
      } catch {
      }
    }
    await delay(6e4, void 0, { signal }).catch(() => {
    });
  }
}
async function backfillLoop(ctx, signal) {
  await ctx.ready;
  if (!available(ctx)) {
    ctx.report("history", health("paused", "feishuBotMissing"));
    return;
  }
  while (!signal.aborted) {
    const config = enabled(ctx);
    if (!config) {
      ctx.report("history", health("paused", "sourceOff"));
      await delay(6e4, void 0, { signal }).catch(() => {
      });
      continue;
    }
    const seen = ctx.state.get(KV.feishu.chats) ?? {};
    const known = Object.entries(seen).filter(([, direct]) => direct && config.directMessages);
    const chats = { ...Object.fromEntries(config.chats.map((chat) => [chat.chatId, false])), ...Object.fromEntries(known) };
    const errors = [];
    const tally = { skipped: 0 };
    for (const [chatId, direct] of Object.entries(chats)) {
      if (signal.aborted) break;
      const started = (/* @__PURE__ */ new Date()).toISOString();
      const cursorKey = KV.feishu.history(chatId);
      const since = ctx.state.get(cursorKey);
      if (since === void 0) {
        ctx.state.set(cursorKey, started);
        continue;
      }
      try {
        await backfillChat(ctx, chatId, direct, since, started, signal, tally);
        if (!signal.aborted) ctx.state.set(cursorKey, cursorAt(started));
      } catch (error) {
        if (!signal.aborted) errors.push(`${chatId}: ${String(error)}`);
      }
    }
    await pollThreads2(ctx, signal, tally);
    const skipped = tally.skipped ? `; ${tally.skipped} unreadable messages skipped` : "";
    if (!signal.aborted) ctx.report("history", errors.length ? { state: "error", detail: errors.join("\n") } : { state: "ready", detail: `Configured groups and known direct chats recovered${skipped}`, at: (/* @__PURE__ */ new Date()).toISOString() });
    await delay(6e4, void 0, { signal }).catch(() => {
    });
  }
}
async function backfillChat(ctx, chatId, direct, since, until, signal, tally = { skipped: 0 }) {
  const commands = ctx.commands.withSignal(signal);
  const topicsKey = KV.feishu.topics(chatId);
  const topics = { ...ctx.state.get(topicsKey) };
  const scan = async (kind, id) => {
    let page;
    const pages = /* @__PURE__ */ new Set();
    do {
      if (signal.aborted) throw signal.reason;
      const seconds = (time) => String(Math.floor(Date.parse(time) / 1e3));
      const parameters = {
        container_id_type: kind,
        container_id: id,
        start_time: seconds(since),
        end_time: seconds(until),
        sort_type: "ByCreateTimeAsc",
        page_size: 50,
        ...page ? { page_token: page } : {}
      };
      const request = ["api", "GET", "/open-apis/im/v1/messages", "--params", JSON.stringify(parameters)];
      const result = HistoryPageSchema.parse(await commands.lark(request));
      for (const message of validItems(HistoricalMessageSchema, result.items, tally)) {
        const outside = message.chat_id !== chatId || kind === "thread" && message.thread_id !== id;
        if (outside) throw new Error("Feishu history returned a message outside the requested chat or thread");
        if (message.deleted) continue;
        const at = feishuTime(message.create_time);
        if (message.thread_id && !(Date.parse(topics[message.thread_id] ?? "") >= Date.parse(at))) topics[message.thread_id] = at;
        const trigger = feishuTrigger(historyEvent(message, chatId, direct), bot(ctx).botId, bot(ctx).appId);
        if (trigger) await receive(ctx, trigger);
      }
      const stuck = result.has_more && (!result.page_token || pages.has(result.page_token));
      if (stuck) throw new Error("Feishu history pagination did not advance");
      page = result.has_more ? result.page_token : void 0;
      if (page) pages.add(page);
    } while (page);
  };
  await scan("chat", chatId);
  const followed = new Set(ctx.threads.subscribed(SOURCE).filter((thread) => polled(ctx, thread)).map((thread) => String(thread.meta.threadId ?? ctx.triggers.latest(thread.key)?.meta.threadId ?? "")));
  for (const [id, seen] of Object.entries(topics)) {
    if (!followed.has(id) && Date.parse(until) - Date.parse(seen) >= POLL_HORIZON_MS) delete topics[id];
  }
  ctx.state.set(topicsKey, topics);
  for (const id of Object.keys(topics)) await scan("thread", id);
  ctx.state.set(topicsKey, topics);
}
function threadRef(ctx, thread) {
  const meta = thread.meta;
  if (meta.chatId && meta.messageId && meta.sourceTriggerId) {
    return { triggerId: meta.sourceTriggerId, chatId: meta.chatId, messageId: meta.messageId };
  }
  const trigger = ctx.triggers.latest(thread.key);
  return trigger ? feishuRef(trigger) : void 0;
}
async function pollThreads2(ctx, signal, tally) {
  await pollThreads(ctx, SOURCE, () => !!signal?.aborted, (thread) => pollThread(ctx, thread, signal, tally));
}
async function pollThread(ctx, thread, signal, tally) {
  const ref = threadRef(ctx, thread);
  if (!ref) throw new Error("Subscribed thread has no retained source message");
  const config = enabled(ctx);
  if (!config) return;
  const commands = ctx.commands.withSignal(signal);
  const pageSize = config.readPageSize;
  const checkpoint = KV.feishu.seen(thread.key);
  const known = new Set(ctx.state.get(checkpoint) ?? []);
  const initialized = ctx.state.get(KV.feishu.initialized(thread.key));
  if (!initialized) {
    for (const section of ["root", "parent"]) {
      const result = await readFeishu(commands, ref, `feishu/${ref.triggerId}/${section}`, pageSize);
      if ("message" in result && result.message) known.add(result.message.message_id);
    }
    ctx.state.set(checkpoint, [...known]);
  }
  const direct = ctx.state.get(KV.feishu.chats)?.[ref.chatId] === true;
  const since = Date.parse(thread.createdAt);
  const root = thread.ref.id.slice(thread.ref.id.indexOf(":") + 1);
  let resource = `feishu/${ref.triggerId}/thread`;
  while (resource) {
    if (signal?.aborted) return;
    const result = await readFeishu(commands, ref, resource, pageSize, "desc");
    if (!("messages" in result)) throw new Error("Expected Feishu thread messages");
    if (tally && "skipped" in result) tally.skipped += result.skipped ?? 0;
    if ("thread_id" in result && result.thread_id && thread.meta.threadId !== result.thread_id) {
      ctx.threads.patch(thread.key, { threadId: result.thread_id });
    }
    const encounteredKnown = result.messages.some((message) => known.has(message.message_id));
    const { botId, appId } = bot(ctx);
    for (const message of result.messages.filter((item) => !known.has(item.message_id) && !item.deleted).reverse()) {
      if (signal?.aborted) return;
      const trigger = feishuTrigger(topicEvent(message, ref.chatId, direct, root), botId, appId);
      if (!trigger || !initialized && Date.parse(trigger.at) < since) continue;
      await receive(ctx, trigger);
    }
    result.messages.forEach((message) => known.add(message.message_id));
    ctx.state.set(checkpoint, [...known]);
    if (initialized && encounteredKnown) break;
    resource = result.next_resource;
  }
  ctx.state.set(KV.feishu.initialized(thread.key), true);
}

// ../../tmp/dsh-superagent-prototype/src/sources/feishu.ts
var MembersSchema = z7.looseObject({
  users: z7.array(z7.looseObject({ member_id: z7.string(), name: z7.string() })),
  has_more: z7.boolean(),
  truncations: z7.array(z7.unknown()).optional()
});
var FeishuConfigSchema = FeishuBotSchema.extend({
  readPageSize: z7.number().int().min(1).max(50).default(20),
  linkTimeoutMs: z7.number().int().min(1).max(9e4).default(5e3),
  chats: z7.array(z7.object({ chatId: z7.string().regex(/^oc_[a-zA-Z0-9]+$/), name: z7.string().trim().max(60).optional(), listen: z7.enum(["mentions", "all"]) }).strict()).refine((chats) => new Set(chats.map((chat) => chat.chatId)).size === chats.length, "Duplicate chat IDs").default([]),
  directMessages: z7.boolean().default(true),
  otherChats: z7.enum(["none", "mentions"]).default("none")
}).strict();
var feishuKind = {
  kind: SOURCE,
  refreshLabels: (host, signal) => refreshChatNames(sourceContext(host, feishuKind), signal),
  title: { zh: "\u98DE\u4E66", en: "Feishu" },
  description: { zh: "\u63A5\u6536\u4E0B\u5217\u7FA4\u548C\u79C1\u804A\u4E2D\u53D1\u7ED9\u673A\u5668\u4EBA\u7684\u6D88\u606F\uFF0C\u8865\u6536\u7FA4\u5386\u53F2\u5E76\u8F6E\u8BE2\u8BA2\u9605\u7684\u7EBF\u7A0B\u3002", en: "Receives messages to the bot in these chats and direct messages, recovers chat history and polls subscribed Threads." },
  schema: FeishuConfigSchema,
  fields: [
    {
      key: "cli",
      type: "text",
      label: { zh: "\u673A\u5668\u4EBA\u7684 lark-cli", en: "Bot lark-cli" },
      hint: { zh: "\u547D\u4EE4\u540D\u6216\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u6307\u5411\u53EA\u5141\u8BB8\u673A\u5668\u4EBA\u8EAB\u4EFD\uFF08strict mode bot\uFF09\u7684 lark-cli \u914D\u7F6E\uFF1B\u6267\u884C\u5668\u4EE5 lark-cli \u8C03\u7528\u5B83\u3002\u4FDD\u5B58\u65F6\u8BFB\u53D6\u5E94\u7528\u548C\u673A\u5668\u4EBA\uFF0C\u7136\u540E\u91CD\u542F dsh-superagent\u3002", en: "A command name or absolute path of a lark-cli configuration that allows only the bot identity (strict mode bot); the Executor calls it as lark-cli. Saving reads the app and the bot, then restarts dsh-superagent." }
    },
    {
      key: "chats",
      type: "rows",
      label: { zh: "\u63A5\u6536\u7684\u7FA4", en: "Chats" },
      hint: { zh: "\u201C\u4EC5 @\u201D\u53EA\u63A5\u6536 @ \u673A\u5668\u4EBA\u7684\u6D88\u606F\u548C\u5DF2\u6709\u5DE5\u5355\u7684\u7EBF\u7A0B\uFF1B\u201C\u5168\u90E8\u6D88\u606F\u201D\u4E5F\u63A5\u6536\u5176\u4F59\u6D88\u606F\uFF0C\u8BC4\u4F30\u53EF\u4EE5\u6309\u89C4\u5219\u4ECE\u4E2D\u63A8\u65AD\u5DE5\u4F5C\uFF0C\u9700\u8981\u673A\u5668\u4EBA\u6709\u8BFB\u53D6\u5168\u90E8\u6D88\u606F\u7684\u6743\u9650\u3002", en: '"@ only" receives messages that mention the bot and Threads that have Tickets; "All" also receives the rest, from which Eval may infer work under the rules; the bot needs permission to read all messages.' },
      columns: [
        { key: "chatId", type: "text", label: { zh: "\u7FA4", en: "Chat" }, pattern: "oc_[a-zA-Z0-9]+", choose: { zh: "\u9009\u62E9\u673A\u5668\u4EBA\u5DF2\u52A0\u5165\u7684\u7FA4", en: "Choose a chat the bot has joined" }, refresh: { zh: "\u5237\u65B0\u7FA4\u5217\u8868", en: "Refresh chats" } },
        { key: "listen", type: "select", label: { zh: "\u63A5\u6536", en: "Receive" }, options: [{ value: "mentions", label: { zh: "\u4EC5 @", en: "@ only" } }, { value: "all", label: { zh: "\u5168\u90E8\u6D88\u606F", en: "All" } }] }
      ]
    },
    {
      key: "otherChats",
      type: "select",
      label: { zh: "\u5176\u4ED6\u7FA4", en: "Other chats" },
      options: [{ value: "none", label: { zh: "\u4E0D\u63A5\u6536", en: "Not received" } }, { value: "mentions", label: { zh: "\u4EC5 @", en: "@ only" } }],
      hint: { zh: "\u673A\u5668\u4EBA\u5DF2\u52A0\u5165\u3001\u4F46\u6CA1\u5217\u5728\u4E0A\u9762\u7684\u7FA4\u3002\u201C\u4EC5 @\u201D\u63A5\u6536\u90A3\u91CC @ \u673A\u5668\u4EBA\u7684\u6D88\u606F\uFF1B\u8C01\u7684\u6D88\u606F\u80FD\u53D1\u8D77\u5DE5\u4F5C\u770B\u7B56\u7565\u91CC\u7684\u51C6\u5165\u3002", en: `Chats the bot has joined that are not listed above. "@ only" receives messages there that mention the bot; whose messages may originate work is the Policy's admission.` }
    },
    { key: "directMessages", type: "switch", label: { zh: "\u63A5\u6536\u79C1\u804A", en: "Direct messages" } },
    { key: "readPageSize", type: "number", advanced: true, min: 1, max: 50, label: { zh: "\u6BCF\u9875\u6D88\u606F\u6570", en: "Messages per page" }, hint: { zh: "\u667A\u80FD\u4F53\u8BFB\u53D6\u7EBF\u7A0B\u548C\u7FA4\u5386\u53F2\u65F6\uFF0C\u6BCF\u9875\u7684\u6D88\u606F\u6570\u3002", en: "Messages per page when agents read Threads and chat history." } },
    {
      key: "linkTimeoutMs",
      type: "number",
      advanced: true,
      min: 1,
      max: 9e4,
      label: { zh: "\u539F\u6D88\u606F\u94FE\u63A5\u7684\u67E5\u8BE2\u65F6\u9650 / \u6BEB\u79D2", en: "Original message link time limit / ms" },
      hint: { zh: "\u67E5\u8BE2\u539F\u6D88\u606F\u94FE\u63A5\u6700\u591A\u7B49\u5F85\u7684\u65F6\u95F4\uFF1B\u8D85\u65F6\u540E\u667A\u80FD\u4F53\u6539\u4E3A\u76F4\u63A5\u8BFB\u53D6\u539F\u6D88\u606F\u3002", en: "How long to wait for an original message's link; after that, agents read the message itself." }
    }
  ],
  health: ["feishu", "history"],
  scope({ meta }, config) {
    if (meta.direct === true) return config.directMessages ? { listened: true, observed: false, row: "direct" } : { listened: false, reason: "direct_messages_not_allowed" };
    const chat = config.chats.find((item) => item.chatId === meta.chatId);
    if (chat) return { listened: true, observed: chat.listen === "all", row: chat.chatId };
    return config.otherChats === "mentions" ? { listened: true, observed: false, row: "other" } : { listened: false, reason: "chat_not_allowed" };
  },
  // A reply goes only to a chat the Source still receives.
  channel: {
    allowed: (address, config) => feishuKind.scope({ meta: { chatId: address.chatId ?? "", direct: address.direct === "true" } }, config).listened,
    send: sendFeishu,
    link: feishuLink
  },
  threadContext: feishuThreadContext,
  find: (query) => ({ threads: [], terms: [...new Set(query.match(/om_[A-Za-z0-9_-]+/g) ?? [])] }),
  // A message's Trigger is named after the message, so the one it answers is named after its parent.
  repliesTo: (trigger) => typeof trigger.meta.parentId === "string" ? feishuTriggerId(trigger.meta.parentId) : void 0,
  policy: {
    unnamed: { person: { zh: "\u98DE\u4E66\u7528\u6237", en: "Feishu user" }, bot: { zh: "\u98DE\u4E66\u673A\u5668\u4EBA", en: "Feishu bot" } },
    schema: z7.object({
      allowed: z7.array(z7.object({ id: z7.string().regex(/^ou_[a-zA-Z0-9]+$/), name: z7.string().trim().max(100).optional() }).strict()).refine((users) => new Set(users.map((user) => user.id)).size === users.length, "Duplicate open_ids").default([]),
      syncChat: z7.string().regex(/^(oc_[a-zA-Z0-9]+)?$/).default(""),
      bots: z7.array(z7.object({ id: z7.string().regex(/^(cli|ou)_[a-zA-Z0-9]+$/), name: z7.string().trim().max(100).optional() }).strict()).refine((bots) => new Set(bots.map((bot2) => bot2.id)).size === bots.length, "Duplicate bot ids").optional()
    }).strict(),
    fields: [
      {
        key: "allowed",
        type: "rows",
        label: { zh: "\u80FD\u53D1\u8D77\u5DE5\u4F5C\u7684\u98DE\u4E66\u7528\u6237", en: "Feishu users who may originate work" },
        columns: [{ key: "id", type: "text", label: { zh: "open_id", en: "open_id" }, pattern: "ou_[a-zA-Z0-9]+" }, { key: "name", type: "text", label: { zh: "\u540D\u5B57", en: "Name" }, optional: true }]
      },
      {
        key: "syncChat",
        type: "text",
        pattern: "(oc_[a-zA-Z0-9]+)?",
        label: { zh: "\u540C\u6B65\u6765\u6E90\u7FA4", en: "Sync chat" },
        choose: { zh: "\u4E0D\u540C\u6B65", en: "Do not sync" },
        hint: { zh: "\u540C\u6B65\u65F6\uFF0C\u540D\u5355\u53D8\u6210\u8FD9\u4E2A\u7FA4\u91CC\u7684\u4EBA\uFF1A\u65B0\u6210\u5458\u52A0\u5165\uFF0C\u79BB\u5F00\u7684\u4EBA\u79FB\u9664\uFF0C\u540D\u5B57\u53D6\u7FA4\u91CC\u7684\u540D\u5B57\u3002\u542F\u52A8\u65F6\u548C\u70B9\u540C\u6B65\u65F6\u8FDB\u884C\u3002", en: "Syncing makes the list the people in this chat: new members join, people who left are removed, and names follow the chat. It runs at startup and on Sync." }
      },
      {
        key: "bots",
        type: "rows",
        label: { zh: "\u6D88\u606F\u53EF\u4EE5\u6210\u4E3A\u5019\u9009\u7684\u673A\u5668\u4EBA", en: "Bots whose messages may become candidates" },
        hint: { zh: "\u540D\u5355\u91CC\u7684\u673A\u5668\u4EBA\u5728\u63A5\u6536\u7684\u7FA4\u91CC\u53D1\u7684\u6D88\u606F\u6210\u4E3A\u63A8\u65AD\u7684\u5019\u9009\uFF0C\u4EA4\u7ED9\u8BC4\u4F30\uFF1B\u5B83\u4EEC\u4E0D\u80FD\u53D1\u8D77\u660E\u786E\u7684\u8BF7\u6C42\uFF0C\u4E5F\u4E0D\u80FD\u505C\u6B62\u5DE5\u5355\u3002\u5176\u4ED6\u673A\u5668\u4EBA\u7684\u6D88\u606F\u4E0D\u63A5\u6536\u3002", en: "Messages of a bot on this list, in chats the Source receives, become inferred candidates for an assessment; they never make an explicit request or stop a ticket. Other bots' messages are not admitted." },
        columns: [
          { key: "id", type: "text", label: { zh: "App ID \u6216 open_id", en: "App ID or open_id" }, pattern: "(cli|ou)_[a-zA-Z0-9]+" },
          { key: "name", type: "text", label: { zh: "\u540D\u5B57", en: "Name" }, optional: true }
        ]
      }
    ],
    explicit: { zh: "\u540D\u5355\u5185\u7684\u4EBA @ \u673A\u5668\u4EBA\u6216\u79C1\u804A\u673A\u5668\u4EBA\uFF0C\u603B\u662F\u660E\u786E\u7684\u8BF7\u6C42\uFF0C\u4E0D\u9700\u8981\u914D\u7F6E\u3002", en: "Someone on the list who mentions the bot or messages it directly always makes an explicit request; that needs no setting." },
    rows(stored) {
      const config = FeishuConfigSchema.parse(stored);
      const mentions = { zh: "\u4EC5 @", en: "@ only" };
      return [
        ...config.chats.map((chat) => ({
          id: chat.chatId,
          label: chat.name || chat.chatId,
          note: chat.listen === "all" ? { zh: "\u5168\u90E8\u6D88\u606F", en: "All" } : mentions,
          cells: { listedUnaddressed: chat.listen === "all", unlistedAddressed: true, unlistedUnaddressed: chat.listen === "all" }
        })),
        {
          id: "other",
          label: { zh: "\u5176\u4ED6\u7FA4", en: "Other chats" },
          note: config.otherChats === "mentions" ? mentions : { zh: "\u4E0D\u63A5\u6536", en: "Not received" },
          cells: { listedUnaddressed: false, unlistedAddressed: config.otherChats === "mentions", unlistedUnaddressed: false }
        },
        {
          id: "direct",
          label: { zh: "\u79C1\u804A", en: "Direct messages" },
          note: config.directMessages ? { zh: "\u63A5\u6536", en: "Received" } : { zh: "\u4E0D\u63A5\u6536", en: "Not received" },
          cells: { listedUnaddressed: false, unlistedAddressed: config.directMessages, unlistedUnaddressed: false }
        }
      ];
    },
    sync: {
      label: { zh: "\u7ACB\u5373\u540C\u6B65", en: "Sync now" },
      ready: (part) => !!part.syncChat,
      async run(host, part, signal) {
        const commands = sourceContext(host, feishuKind).commands.withSignal(signal);
        const chat = String(part.syncChat);
        const members = ["im", "+chat-members-list", "--chat-id", chat, "--member-types", "user", "--page-all", "--page-limit", "0"];
        const result = MembersSchema.parse(await commands.lark(members));
        if (result.has_more || result.truncations?.length) throw new Error("Feishu returned an incomplete member list");
        const users = new Map(result.users.map((user) => [user.member_id, user.name]));
        const known = new Set(part.allowed.map((entry) => entry.id));
        return { ...part, allowed: [...part.allowed.filter((entry) => users.has(entry.id)).map((entry) => ({ ...entry, name: users.get(entry.id) })), ...result.users.filter((user) => !known.has(user.member_id)).map((user) => ({ id: user.member_id, name: user.name }))] };
      }
    }
  },
  environment: {
    variables: [
      { key: "DSH_SUPERAGENT_FEISHU_BOT", description: { zh: "\u98DE\u4E66\u673A\u5668\u4EBA\uFF1Blark-cli \u4EE5\u5B83\u884C\u4E8B", en: "The Feishu bot; lark-cli acts as it" } },
      { key: "DSH_SUPERAGENT_FEISHU_CHAT", description: { zh: "\u63A5\u4E0B\u5DE5\u5355\u7684\u98DE\u4E66\u7FA4 chat_id\uFF1B\u5DE5\u5355\u4E0D\u662F\u4ECE\u98DE\u4E66\u6765\u7684\u65F6\u4E3A\u7A7A", en: "chat_id of the Feishu chat that started the ticket; empty when the ticket did not start on Feishu" } }
    ],
    values: ({ deployment, trigger }) => ({ DSH_SUPERAGENT_FEISHU_BOT: deployment.feishu ? deployment.feishu.name || deployment.feishu.botId : "", DSH_SUPERAGENT_FEISHU_CHAT: trigger?.source === SOURCE ? String(trigger.meta.chatId ?? "") : "" })
  },
  facts: (deployment) => deployment?.feishu ? { cli: { zh: `\u5F53\u524D\u673A\u5668\u4EBA ${deployment.feishu.name || deployment.feishu.botId}`, en: `Current bot ${deployment.feishu.name || deployment.feishu.botId}` } } : {}
};
var feishuSettings = (sources) => sources.instance(SOURCE)?.config ?? FeishuConfigSchema.parse({});
var name = "dsh-superagent-feishu";
var inject = ["orchestrator"];
function apply(ctx) {
  ctx.effect(() => ctx.orchestrator.sources.register(feishuKind), "feishu: source kind");
  ctx.effect(() => {
    const controller = new AbortController();
    const running = runFeishu(sourceContext(ctx.orchestrator, feishuKind), controller.signal);
    return async () => {
      controller.abort();
      await running;
    };
  });
}
export {
  SOURCE,
  apply,
  backfillChat,
  consumerRetry,
  feishuKind,
  feishuRef,
  feishuSettings,
  feishuThreadId,
  feishuTime,
  feishuTrigger,
  feishuTriggerId,
  historyEvent,
  inject,
  name,
  pollThreads2 as pollThreads,
  refreshChatNames,
  threadRef,
  withMentionNames
};
