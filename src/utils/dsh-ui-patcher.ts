import fs from 'node:fs';
import path from 'node:path';

/**
 * Idempotently applies UI patches to the installed @deepseek-ai/dsh client bundles:
 * 1. Removes top-left sidebar whale & wordmark SVGs and hero Preview badge (dsh-client-ui-brand-official)
 * 2. Removes hero whale SVG and adds BrowserTaskTabsBar with '+' button in <header> (dsh-client-ui-conversation)
 * 3. Connects browser task tabs two-way with Workspaces tree & session lifecycle (dsh-client-ui-workspace)
 * 4. Guards retainInfo lookup during rapid tab switching/closing (dsh-client-ui-agent-preset)
 */
export function applyDshUiPatches(nodeModulesDir: string): void {
  patchBrandOfficial(nodeModulesDir);
  patchWorkspaceClient(nodeModulesDir);
  patchAgentPresetClient(nodeModulesDir);
  patchConversationClient(nodeModulesDir);
}

function patchBrandOfficial(nodeModulesDir: string): void {
  const filePath = path.join(
    nodeModulesDir,
    '@deepseek-ai',
    'dsh-client-ui-brand-official',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;

  let code = fs.readFileSync(filePath, 'utf8');
  if (code.includes('/* DSH_BRAND_PATCHED */')) return;

  // 1. Remove sidebar brand lockup (whale icon + deepseek HARNESS wordmarks)
  const lockupTarget = `		function OfficialBrandLockup({ collapsed }) {
			return (0, react_jsx_runtime.jsxs)("span", {
				className: clsx(OfficialBrand_module_css_default.lockup, collapsed && OfficialBrand_module_css_default.lockupCollapsed),
				"aria-label": BRAND_NAME,
				children: [(0, react_jsx_runtime.jsx)("span", {
					className: OfficialBrand_module_css_default.whale,
					"aria-hidden": "true",
					children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.SvgIcon, {
						svg: whale_default,
						width: "100%",
						height: "100%"
					})
				}), (0, react_jsx_runtime.jsxs)("span", {
					className: OfficialBrand_module_css_default.wordmarks,
					"aria-hidden": "true",
					children: [(0, react_jsx_runtime.jsx)("span", {
						className: OfficialBrand_module_css_default.deepseek,
						children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.SvgIcon, {
							svg: deepseek_default,
							width: "100%",
							height: "100%"
						})
					}), (0, react_jsx_runtime.jsx)("span", {
						className: OfficialBrand_module_css_default.harness,
						children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.SvgIcon, {
							svg: harness_default,
							width: "100%",
							height: "100%"
						})
					})]
				})]
			});
		}`;

  const lockupReplacement = `		/* DSH_BRAND_PATCHED */
		function OfficialBrandLockup({ collapsed }) {
			return (0, react_jsx_runtime.jsxs)("span", {
				className: clsx(OfficialBrand_module_css_default.lockup, collapsed && OfficialBrand_module_css_default.lockupCollapsed),
				"aria-label": BRAND_NAME,
				children: [(0, react_jsx_runtime.jsx)("span", {
					className: OfficialBrand_module_css_default.whale,
					"aria-hidden": "true"
				}), (0, react_jsx_runtime.jsx)("span", {
					className: OfficialBrand_module_css_default.wordmarks,
					"aria-hidden": "true"
				})]
			});
		}`;

  if (code.includes(lockupTarget)) {
    code = code.replace(lockupTarget, lockupReplacement);
  }

  // 2. Remove Preview badge registration in hero
  const previewTarget = `				yield ctx.slots.register({
					name: "conversation.hero.brand.badge",
					locale: NS
				}, OfficialPreviewBadge);`;
  if (code.includes(previewTarget)) {
    code = code.replace(previewTarget, '');
  }

  fs.writeFileSync(filePath, code, 'utf8');
}

function patchWorkspaceClient(nodeModulesDir: string): void {
  const filePath = path.join(
    nodeModulesDir,
    '@deepseek-ai',
    'dsh-client-ui-workspace',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;

  let code = fs.readFileSync(filePath, 'utf8');
  if (code.includes('/* DSH_WORKSPACE_TABS_PATCHED */')) return;

  // 1. Preserve creation order in orderByRecency and show all open blank tab sessions in Workspaces tree
  const orderTarget = `		function orderByRecency(sessionIds, summaries) {
			return sessionIds.flatMap((id) => {
				const summary = summaries[id];
				if (summary === void 0) return [];
				return [{
					id,
					rank: summary.updatedAt
				}];
			}).sort((a, b) => {
				if (a.rank !== b.rank) return b.rank - a.rank;
				return a.id < b.id ? -1 : 1;
			}).map((member) => member.id);
		}`;

  const orderReplacement = `		/* DSH_WORKSPACE_TABS_PATCHED */
		function orderByRecency(sessionIds, summaries) {
			return [...sessionIds].reverse().filter((id) => summaries[id] !== void 0);
		}`;

  if (code.includes(orderTarget)) {
    code = code.replace(orderTarget, orderReplacement);
  }

  const visibilityTarget = `			const ordinary = [];
			const archives = [];
			for (const id of orderByRecency([...members.values()].filter((id) => !included.has(id)), summaries)) if (archived.has(id)) archives.push(id);
			else ordinary.push(id);
			return [
				...pins,
				...ordered,
				...ordinary,
				...archives
			];
		}
		/**
		* Keep the selected provisional New Session ahead of either base order.
		* @param order - recency or reconciled manual order.
		* @param currentBlank - selected blank Session in this account, when present.
		* @returns a copy with the selected blank first and no duplicate slot.
		*/
		function pinCurrentBlank(order, currentBlank) {
			if (currentBlank === void 0) return [...order];
			return [currentBlank, ...order.filter((id) => id !== currentBlank)];
		}
		/**
		* Ordinary sessions are visible; among blank sessions, only the current one
		* is visible. Subagent children use their parent header catalog; archived
		* sessions follow the archived filter, while their accounting slots remain
		* either way so unarchiving restores position.
		*/
		function sessionVisible(session, current, archived, archivedFilter) {
			if (session.origin === "subagent") return false;
			if (session.blank && session.id !== current) return false;
			switch (archivedFilter) {
				case "default": return !archived.has(session.id);
				case "show": return true;
				case "only": return archived.has(session.id);
				/* v8 ignore next 2 -- closed-union backstop; only reached if the filter is forged */
				default: return assertNever$1(archivedFilter);
			}
		}
		/**
		* Keep the visible New Session placeholder first, then partition pinned and
		* ordinary rows without changing either partition's caller order.
		*/
		function sectionMembers(members, pinned, archived) {
			const placeholders = [];
			const leading = [];
			const rest = [];
			for (const member of members) if (member.blank) placeholders.push(member);
			else if (!archived.has(member.id) && pinned.has(member.id)) leading.push(member);
			else rest.push(member);
			return [
				...placeholders,
				...leading,
				...rest
			];
		}`;

  const visibilityReplacement = `			const ordinary = [];
			const archives = [];
			for (const id of [...members.values()].filter((id) => !included.has(id))) if (archived.has(id)) archives.push(id);
			else ordinary.push(id);
			return [
				...pins,
				...ordered,
				...ordinary,
				...archives
			];
		}
		function pinCurrentBlank(order, _currentBlank) {
			return [...order];
		}
		function sessionVisible(session, _current, archived, archivedFilter) {
			if (session.origin === "subagent") return false;
			switch (archivedFilter) {
				case "default": return !archived.has(session.id);
				case "show": return true;
				case "only": return archived.has(session.id);
				default: return assertNever$1(archivedFilter);
			}
		}
		function sectionMembers(members, pinned, archived) {
			const leading = [];
			const rest = [];
			for (const member of members) if (!archived.has(member.id) && pinned.has(member.id)) leading.push(member);
			else rest.push(member);
			return [
				...leading,
				...rest
			];
		}`;

  if (code.includes(visibilityTarget)) {
    code = code.replace(visibilityTarget, visibilityReplacement);
  }

  // 2. Allow minting new blank sessions when reuseBlank === false
  const connectBlankTarget = `			async connectBlank(workspaceId, reuse = {}) {
				const workspace = this.workspaces.list.getSnapshot().items.find((item) => item.workspaceId === workspaceId);
				if (workspace === void 0) throw new Error(\`uiWorkspace.connectWorkspace: unknown workspace \${workspaceId}\`);
				const inflight = this.connecting.get(workspaceId);
				if (inflight !== void 0 && inflight.agentPreset === reuse.agentPreset) return inflight.attempt;
				const attempt = this.createInWorkspace(workspace, reuse).finally(() => {
					if (this.connecting.get(workspaceId)?.attempt === attempt) this.connecting.delete(workspaceId);
				});
				this.connecting.set(workspaceId, {
					agentPreset: reuse.agentPreset,
					attempt
				});
				return attempt;
			}
			/** Name the first reusable member blank so the Host only mints when none qualifies. */
			createInWorkspace(workspace, options = {}) {
				const archived = this.workspaces.list.getSnapshot().archivedSessionIds;
				const sessions = this.sessions.list.getSnapshot();
				const blank = sessions.ids.find((id) => {
					const summary = sessions.byId[id];
					const listed = summary?.projectionValues?.agentPreset;
					return summary !== void 0 && summary.blank && summary.cwd === workspace.path && workspace.sessionIds.includes(id) && !archived.includes(id) && (options.agentPreset === void 0 || typeof listed !== "string" || listed === options.agentPreset);
				});
				return this.createNamed({
					workspaceId: workspace.workspaceId,
					...blank === void 0 ? {} : { sessionId: blank },
					...options.agentPreset === void 0 ? {} : { agentPreset: options.agentPreset }
				});
			}`;

  const connectBlankReplacement = `			async connectBlank(workspaceId, reuse = {}) {
				const workspace = this.workspaces.list.getSnapshot().items.find((item) => item.workspaceId === workspaceId);
				if (workspace === void 0) throw new Error(\`uiWorkspace.connectWorkspace: unknown workspace \${workspaceId}\`);
				if (reuse.reuseBlank !== false) {
					const inflight = this.connecting.get(workspaceId);
					if (inflight !== void 0 && inflight.agentPreset === reuse.agentPreset) return inflight.attempt;
				}
				const attempt = this.createInWorkspace(workspace, reuse).finally(() => {
					if (this.connecting.get(workspaceId)?.attempt === attempt) this.connecting.delete(workspaceId);
				});
				if (reuse.reuseBlank !== false) {
					this.connecting.set(workspaceId, {
						agentPreset: reuse.agentPreset,
						attempt
					});
				}
				return attempt;
			}
			createInWorkspace(workspace, options = {}) {
				const archived = this.workspaces.list.getSnapshot().archivedSessionIds;
				const sessions = this.sessions.list.getSnapshot();
				const blank = options.reuseBlank === false ? void 0 : sessions.ids.find((id) => {
					const summary = sessions.byId[id];
					const listed = summary?.projectionValues?.agentPreset;
					return summary !== void 0 && summary.blank && summary.cwd === workspace.path && workspace.sessionIds.includes(id) && !archived.includes(id) && (options.agentPreset === void 0 || typeof listed !== "string" || listed === options.agentPreset);
				});
				return this.createNamed({
					workspaceId: workspace.workspaceId,
					...blank === void 0 ? {} : { sessionId: blank },
					...options.agentPreset === void 0 ? {} : { agentPreset: options.agentPreset }
				});
			}`;

  if (code.includes(connectBlankTarget)) {
    code = code.replace(connectBlankTarget, connectBlankReplacement);
  }

  // 3. Make startSession pass reuseBlank: false
  const startSessionTarget = `				this.openWorkspace(target, initializeDraft ? (id) => {
					const binding = this.sessions.binding(id);
					if (binding === void 0) this.draftPreparationFailed();
					this.prepareDraft(binding, draftOptions);
				} : void 0, agentPreset === void 0 ? void 0 : { agentPreset }).catch((reason) => {
					console.warn("new session failed:", reason);
				});`;

  const startSessionReplacement = `				this.openWorkspace(target, initializeDraft ? (id) => {
					const binding = this.sessions.binding(id);
					if (binding === void 0) this.draftPreparationFailed();
					this.prepareDraft(binding, draftOptions);
				} : void 0, {
					...agentPreset === void 0 ? {} : { agentPreset },
					reuseBlank: false
				}).catch((reason) => {
					console.warn("new session failed:", reason);
				});`;

  if (code.includes(startSessionTarget)) {
    code = code.replace(startSessionTarget, startSessionReplacement);
  }

  // 4. Switch to adjacent unarchived tab or start a new session in clearArchivedCurrent
  const clearArchivedTarget = `			clearArchivedCurrent() {
				const current = this.mainReference?.sessionId;
				if (current === void 0 || !this.workspaces.list.getSnapshot().archivedSessionIds.includes(current)) return false;
				this.clearMain();
				return true;
			}`;

  const clearArchivedReplacement = `			clearArchivedCurrent() {
				const current = this.mainReference?.sessionId;
				const wsSnap = this.workspaces.list.getSnapshot();
				if (current === void 0 || !wsSnap.archivedSessionIds.includes(current)) return false;
				this.clearMain();
				const sessSnap = this.sessions.list.getSnapshot();
				const archivedSet = new Set(wsSnap.archivedSessionIds);
				const remaining = sessSnap.ids.filter((id) => id !== current && !archivedSet.has(id) && sessSnap.byId[id]?.origin !== "subagent");
				if (remaining.length > 0) {
					this.openSession(remaining[remaining.length - 1]);
				} else {
					this.startSession();
				}
				return true;
			}`;

  if (code.includes(clearArchivedTarget)) {
    code = code.replace(clearArchivedTarget, clearArchivedReplacement);
  }

  fs.writeFileSync(filePath, code, 'utf8');
}

function patchAgentPresetClient(nodeModulesDir: string): void {
  const filePath = path.join(
    nodeModulesDir,
    '@deepseek-ai',
    'dsh-client-ui-agent-preset',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;

  let code = fs.readFileSync(filePath, 'utf8');
  if (code.includes('/* DSH_AGENT_PRESET_PATCHED */')) return;

  const target = `					const summary = ctx.sessions.list.getSnapshot().byId[binding.sessionId];
					return summary !== void 0 && (ctx.sessions.retainInfo(binding.sessionId).getSnapshot().retainedBy.mainView ?? 0) > 0 ? summary : void 0;`;

  const replacement = `					/* DSH_AGENT_PRESET_PATCHED */
					const summary = ctx.sessions.list.getSnapshot().byId[binding.sessionId];
					return summary !== void 0 && (ctx.sessions.retainInfo?.(binding.sessionId)?.getSnapshot?.()?.retainedBy?.mainView ?? summary.retainedBy?.mainView ?? 0) > 0 ? summary : void 0;`;

  if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync(filePath, code, 'utf8');
  }
}

function patchConversationClient(nodeModulesDir: string): void {
  const filePath = path.join(
    nodeModulesDir,
    '@deepseek-ai',
    'dsh-client-ui-conversation',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;

  let code = fs.readFileSync(filePath, 'utf8');
  if (code.includes('/* DSH_CONVERSATION_TABS_PATCHED */')) return;

  // 1. Remove hero whale SVG icon in NewSessionHero
  const heroWhaleTarget = `					children: [(0, react_jsx_runtime.jsx)("span", {
						className: NewSessionHero_module_css_default.brandMark,
						"aria-hidden": "true",
						children: renderSlot("conversation.hero.brand.mark", {}, (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.SvgIcon, {
							svg: whale_default,
							width: 28,
							height: 28
						}))
					}), (0, react_jsx_runtime.jsxs)("span", {`;

  const heroWhaleReplacement = `					children: [(0, react_jsx_runtime.jsxs)("span", {`;

  if (code.includes(heroWhaleTarget)) {
    code = code.replace(heroWhaleTarget, heroWhaleReplacement);
  }

  // 2. Add browser tab bar CSS rules and class mappings to ConversationRoot.module.css
  const cssTarget = `		const tagId$4 = "@deepseek-ai/dsh-client-ui-conversation/ConversationRoot.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-conversation";
			tag.dataset.pluginCss = tagId$4;
			tag.textContent = css$4;
			document.head.appendChild(tag);
		}
		var ConversationRoot_module_css_default = {
			"body": "wSkVaW_body",`;

  const extraCss = `.wSkVaW_header{min-height:48px!important;padding:6px 20px 6px 16px!important;align-items:center;background:var(--dsw-alias-bg-layer-1, var(--dsw-alias-bg-base))}.wSkVaW_headerBlank{border-bottom:.5px solid var(--dsw-alias-border-l3)!important;min-height:48px!important;padding-bottom:6px!important}.wSkVaW_titleRow{min-height:36px!important;gap:8px!important;min-width:0}.wSkVaW_browserTabsBar{display:flex;align-items:center;gap:6px;min-width:0;flex:1;overflow-x:auto;scrollbar-width:none;padding:2px 0;-webkit-app-region:no-drag}.wSkVaW_browserTabsBar::-webkit-scrollbar{display:none}.wSkVaW_browserTab{display:inline-flex;align-items:center;gap:8px;height:32px;min-width:128px;max-width:220px;padding:0 8px 0 10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l3, rgba(128,128,128,.16));background:color-mix(in srgb, var(--dsw-alias-bg-base) 55%, transparent);color:var(--dsw-alias-label-secondary);font-size:13px;line-height:18px;cursor:pointer;user-select:none;flex:0 1 180px;transition:background .14s ease,border-color .14s ease,color .14s ease,box-shadow .14s ease;position:relative;box-sizing:border-box}.wSkVaW_browserTab:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.wSkVaW_browserTabActive{background:var(--dsw-alias-bg-base);border-color:color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 42%, var(--dsw-alias-border-l2, rgba(128,128,128,.28)));color:var(--dsw-alias-label-primary);font-weight:500;box-shadow:0 1px 3px rgba(0,0,0,.06)}.wSkVaW_browserTabIcon{width:14px;height:14px;flex:none;color:var(--dsw-alias-label-tertiary);display:inline-flex;align-items:center;justify-content:center}.wSkVaW_browserTabActive .wSkVaW_browserTabIcon{color:var(--dsw-alias-state-business-primary, #4d6bfe)}.wSkVaW_browserTabTitle{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left}.wSkVaW_browserTabWs{font-size:11px;line-height:14px;padding:1px 5px;border-radius:4px;background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-tertiary);max-width:76px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:none}.wSkVaW_browserTabClose{width:18px;height:18px;border-radius:4px;border:none;background:transparent;color:var(--dsw-alias-label-tertiary);display:inline-flex;align-items:center;justify-content:center;padding:0;cursor:pointer;flex:none;opacity:.65;transition:opacity .12s ease,background .12s ease,color .12s ease}.wSkVaW_browserTab:hover .wSkVaW_browserTabClose,.wSkVaW_browserTabActive .wSkVaW_browserTabClose{opacity:1}.wSkVaW_browserTabClose:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.wSkVaW_browserTabAdd{width:28px;height:28px;border-radius:7px;border:1px dashed var(--dsw-alias-border-l2, rgba(128,128,128,.25));background:transparent;color:var(--dsw-alias-label-secondary);display:inline-flex;align-items:center;justify-content:center;padding:0;cursor:pointer;flex:none;transition:background .14s ease,color .14s ease,border-color .14s ease}.wSkVaW_browserTabAdd:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);border-style:solid;border-color:var(--dsw-alias-border-l2)}`;

  const cssReplacement = `		const tagId$4 = "@deepseek-ai/dsh-client-ui-conversation/ConversationRoot.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-conversation";
			tag.dataset.pluginCss = tagId$4;
			tag.textContent = css$4 + ${JSON.stringify(extraCss)};
			document.head.appendChild(tag);
		}
		var ConversationRoot_module_css_default = {
			"body": "wSkVaW_body",
			"browserTab": "wSkVaW_browserTab",
			"browserTabActive": "wSkVaW_browserTabActive",
			"browserTabAdd": "wSkVaW_browserTabAdd",
			"browserTabClose": "wSkVaW_browserTabClose",
			"browserTabIcon": "wSkVaW_browserTabIcon",
			"browserTabTitle": "wSkVaW_browserTabTitle",
			"browserTabWs": "wSkVaW_browserTabWs",
			"browserTabsBar": "wSkVaW_browserTabsBar",`;

  if (code.includes(cssTarget)) {
    code = code.replace(cssTarget, cssReplacement);
  }

  // 3. Replace ConversationHeader and ConversationSessionHeader with BrowserTaskTabsBar
  const headerComponentTarget = `		function ConversationHeader({ sessionId, useSessions, renderSlot }) {
			const blank = useSessions((s) => sessionId !== void 0 && s.byId[sessionId]?.blank === true);
			const sessionless = sessionId === void 0 || blank;
			return (0, react_jsx_runtime.jsxs)("header", {
				className: clsx(ConversationRoot_module_css_default.header, sessionless && ConversationRoot_module_css_default.headerBlank, sessionId === void 0 && ConversationRoot_module_css_default.headerSessionless),
				"data-window-drag": "true",
				children: [(0, react_jsx_runtime.jsx)("div", {
					className: ConversationRoot_module_css_default.headerLeading,
					"data-conversation-header-leading": "",
					children: renderSlot("conversation.header.leading", {})
				}), renderSlot("conversation.session.header", {})]
			});
		}
		/**
		* Session-specific header fragment: lineage breadcrumbs, utilities, corner, and view tabs.
		* @param props - Session-scoped sources, view store, and authorized header slots.
		* @returns The session header fragment, or null for blank Sessions.
		*/
		function ConversationSessionHeader({ sessionId, useSession, useSessions, useConversation, useConversationViews, useEntryPins, useEntryActions, setPinned, open, selectView, renderSlot, t }) {
			const blank = useSession((s) => s.subagent === null && s.blank);
			const title = useSession((s) => s.title);
			const crumbs = useSessions((s) => sessionLineage(s.byId, sessionId));
			const activeView = useConversation((s) => s.activeView);
			const views = useConversationViews((s) => s);
			const unpinned = useEntryPins((s) => s);
			const hasEntryActions = useEntryActions((s) => s);
			const [moreOpen, setMoreOpen] = (0, react.useState)(false);
			if (blank) return (0, react_jsx_runtime.jsx)("div", {
				className: ConversationRoot_module_css_default.titleRow,
				children: (0, react_jsx_runtime.jsx)("div", {
					className: ConversationRoot_module_css_default.headerCorner,
					children: renderSlot("conversation.session.header.corner", {})
				})
			});
			const currentLabel = title.trim() || t("session.untitled");
			const showTabs = views.length > 1 || hasEntryActions;
			const pinnedViews = views.filter((view) => !unpinned.includes(view.id));
			const overflowActive = views.some((view) => unpinned.includes(view.id) && view.id === activeView);
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
				children: [(0, react_jsx_runtime.jsxs)("div", {
					className: ConversationRoot_module_css_default.titleRow,
					children: [
						(0, react_jsx_runtime.jsxs)("div", {
							className: ConversationRoot_module_css_default.titleCluster,
							children: [
								(0, react_jsx_runtime.jsx)("nav", {
									className: ConversationRoot_module_css_default.crumbs,
									"aria-label": t("header.Breadcrumb"),
									children: crumbs.map((crumb, index) => {
										const isCurrent = index === crumbs.length - 1;
										const label = isCurrent ? currentLabel : crumb.title.trim() || t("session.untitled");
										return (0, react_jsx_runtime.jsxs)("span", {
											className: ConversationRoot_module_css_default.crumbSeg,
											children: [index > 0 && (0, react_jsx_runtime.jsx)("span", {
												className: ConversationRoot_module_css_default.crumbSep,
												"aria-hidden": "true",
												children: "/"
											}), isCurrent ? (0, react_jsx_runtime.jsx)("span", {
												className: clsx(ConversationRoot_module_css_default.crumb, ConversationRoot_module_css_default.crumbCurrent, crumb.subagent && ConversationRoot_module_css_default.crumbSubagent),
												"aria-current": "page",
												children: label
											}) : (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: clsx(ConversationRoot_module_css_default.crumb, crumb.subagent && ConversationRoot_module_css_default.crumbSubagent),
												onClick: () => {
													open(crumb.id);
												},
												children: label
											})]
										}, crumb.id);
									})
								}),
								renderSlot("conversation.session.header.lineage", {}),
								(0, react_jsx_runtime.jsx)("div", {
									className: ConversationRoot_module_css_default.headerActions,
									children: renderSlot("conversation.session.header.actions", {})
								})
							]
						}),
						(0, react_jsx_runtime.jsx)("div", {
							className: ConversationRoot_module_css_default.headerUtilities,
							children: renderSlot("conversation.session.header.utilities", {})
						}),
						(0, react_jsx_runtime.jsx)("div", {
							className: ConversationRoot_module_css_default.headerCorner,
							children: renderSlot("conversation.session.header.corner", {})
						})
					]
				}), showTabs && (0, react_jsx_runtime.jsxs)("div", {`;

  const headerComponentReplacement = `		/* DSH_CONVERSATION_TABS_PATCHED */
		const browserTabOrderMemory = [];
		function BrowserTaskTabsBar({ sessionId, useSessions, useWorkspaces, open, createNewTab, closeTab, tWorkspace }) {
			const sessionsState = useSessions((s) => s);
			const workspacesState = useWorkspaces((s) => s);
			const defaultWorkspaceName = tWorkspace ? tWorkspace("workspace.defaultName") : "Default workspace";
			const newSessionLabel = tWorkspace ? tWorkspace("session.new") : "New Session";
			const tabIds = (0, react.useMemo)(() => {
				const archivedSet = new Set(workspacesState?.archivedSessionIds ?? []);
				const wsSessionIds = (workspacesState?.items ?? []).flatMap((w) => [...w.sessionIds].reverse());
				const allSessionIds = sessionsState?.ids ?? [];
				const validSet = new Set();
				const validCandidates = [];
				for (const id of [...wsSessionIds, ...allSessionIds]) {
					if (!id || validSet.has(id) || archivedSet.has(id)) continue;
					const summary = sessionsState?.byId?.[id];
					if (summary === void 0 || summary.origin === "subagent") continue;
					validSet.add(id);
					validCandidates.push(id);
				}
				const nextOrder = [];
				const included = new Set();
				for (const id of browserTabOrderMemory) {
					if (validSet.has(id) && !included.has(id)) {
						nextOrder.push(id);
						included.add(id);
					}
				}
				for (const id of validCandidates) {
					if (!included.has(id)) {
						nextOrder.push(id);
						included.add(id);
					}
				}
				browserTabOrderMemory.length = 0;
				browserTabOrderMemory.push(...nextOrder);
				return nextOrder;
			}, [sessionsState, workspacesState]);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: ConversationRoot_module_css_default.browserTabsBar,
				role: "tablist",
				"aria-label": "Browser task tabs",
				"data-browser-task-tabs": "",
				children: [
					tabIds.map((tabId) => {
						const summary = sessionsState?.byId?.[tabId];
						const isActive = tabId === sessionId;
						const ws = (workspacesState?.items ?? []).find((w) => w.sessionIds.includes(tabId));
						const wsLabel = ws ? workspaceDisplayTitle(ws.title, defaultWorkspaceName) : "";
						const rawTitle = summary?.blank ? newSessionLabel : (summary?.title?.trim() || summary?.displayTitle || newSessionLabel);
						const showWsBadge = (workspacesState?.items?.length ?? 0) > 1 && wsLabel !== "";
						const tooltipText = wsLabel ? \`\${wsLabel} · \${rawTitle}\` : rawTitle;
						return (0, react_jsx_runtime.jsxs)("div", {
							role: "tab",
							tabIndex: 0,
							"aria-selected": isActive,
							"data-tab-session-id": tabId,
							title: tooltipText,
							className: clsx(ConversationRoot_module_css_default.browserTab, isActive && ConversationRoot_module_css_default.browserTabActive),
							onClick: () => {
								open?.(tabId);
							},
							onKeyDown: (e) => {
								if (e.target !== e.currentTarget) return;
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									open?.(tabId);
								}
							},
							children: [
								(0, react_jsx_runtime.jsx)("svg", {
									width: 14,
									height: 14,
									viewBox: "0 0 16 16",
									fill: "none",
									"aria-hidden": "true",
									className: ConversationRoot_module_css_default.browserTabIcon,
									children: (0, react_jsx_runtime.jsx)("path", {
										d: "M2.5 3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H12.5C13.0523 2.5 13.5 2.94772 13.5 3.5V10.5C13.5 11.0523 13.0523 11.5 12.5 11.5H6.20711L3.35355 13.8536C3.03857 14.1134 2.5 13.8893 2.5 13.4645V3.5Z",
										stroke: "currentColor",
										strokeWidth: "1.3",
										strokeLinejoin: "round"
									})
								}),
								(0, react_jsx_runtime.jsx)("span", {
									className: ConversationRoot_module_css_default.browserTabTitle,
									children: rawTitle
								}),
								showWsBadge && (0, react_jsx_runtime.jsx)("span", {
									className: ConversationRoot_module_css_default.browserTabWs,
									children: wsLabel
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: ConversationRoot_module_css_default.browserTabClose,
									"aria-label": \`Close \${rawTitle}\`,
									onClick: (e) => {
										e.stopPropagation();
										closeTab?.(tabId);
									},
									children: (0, react_jsx_runtime.jsx)("svg", {
										width: 12,
										height: 12,
										viewBox: "0 0 12 12",
										fill: "none",
										"aria-hidden": "true",
										children: (0, react_jsx_runtime.jsx)("path", {
											d: "M3 3L9 9M9 3L3 9",
											stroke: "currentColor",
											strokeWidth: "1.3",
											strokeLinecap: "round"
										})
									})
								})
							]
						}, tabId);
					}),
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: ConversationRoot_module_css_default.browserTabAdd,
						"aria-label": "New conversation tab",
						title: newSessionLabel,
						onClick: () => {
							createNewTab?.();
						},
						children: (0, react_jsx_runtime.jsx)("svg", {
							width: 14,
							height: 14,
							viewBox: "0 0 14 14",
							fill: "none",
							"aria-hidden": "true",
							children: (0, react_jsx_runtime.jsx)("path", {
								d: "M7 2.5V11.5M2.5 7H11.5",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})
						})
					})
				]
			});
		}
		function ConversationHeader({ sessionId, useSessions, useWorkspaces, open, createNewTab, closeTab, tWorkspace, renderSlot }) {
			const blank = useSessions((s) => sessionId !== void 0 && s.byId[sessionId]?.blank === true);
			const sessionless = sessionId === void 0 || blank;
			return (0, react_jsx_runtime.jsxs)("header", {
				className: clsx(ConversationRoot_module_css_default.header, sessionless && ConversationRoot_module_css_default.headerBlank, sessionId === void 0 && ConversationRoot_module_css_default.headerSessionless),
				"data-window-drag": "true",
				children: [(0, react_jsx_runtime.jsx)("div", {
					className: ConversationRoot_module_css_default.headerLeading,
					"data-conversation-header-leading": "",
					children: renderSlot("conversation.header.leading", {})
				}), sessionId === void 0 ? (0, react_jsx_runtime.jsx)("div", {
					className: ConversationRoot_module_css_default.titleRow,
					children: (0, react_jsx_runtime.jsx)(BrowserTaskTabsBar, {
						sessionId,
						useSessions,
						useWorkspaces,
						open,
						createNewTab,
						closeTab,
						tWorkspace
					})
				}) : renderSlot("conversation.session.header", {})]
			});
		}
		function ConversationSessionHeader({ sessionId, useSession, useSessions, useWorkspaces, useConversation, useConversationViews, useEntryPins, useEntryActions, setPinned, open, createNewTab, closeTab, selectView, renderSlot, t, tWorkspace }) {
			const blank = useSession((s) => s.subagent === null && s.blank);
			const activeView = useConversation((s) => s.activeView);
			const views = useConversationViews((s) => s);
			const unpinned = useEntryPins((s) => s);
			const hasEntryActions = useEntryActions((s) => s);
			const [moreOpen, setMoreOpen] = (0, react.useState)(false);
			if (blank) return (0, react_jsx_runtime.jsxs)("div", {
				className: ConversationRoot_module_css_default.titleRow,
				children: [
					(0, react_jsx_runtime.jsx)(BrowserTaskTabsBar, {
						sessionId,
						useSessions,
						useWorkspaces,
						open,
						createNewTab,
						closeTab,
						tWorkspace
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: ConversationRoot_module_css_default.headerCorner,
						children: renderSlot("conversation.session.header.corner", {})
					})
				]
			});
			const showTabs = views.length > 1 || hasEntryActions;
			const pinnedViews = views.filter((view) => !unpinned.includes(view.id));
			const overflowActive = views.some((view) => unpinned.includes(view.id) && view.id === activeView);
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
				children: [(0, react_jsx_runtime.jsxs)("div", {
					className: ConversationRoot_module_css_default.titleRow,
					children: [
						(0, react_jsx_runtime.jsx)(BrowserTaskTabsBar, {
							sessionId,
							useSessions,
							useWorkspaces,
							open,
							createNewTab,
							closeTab,
							tWorkspace
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: ConversationRoot_module_css_default.headerActions,
							children: [
								renderSlot("conversation.session.header.lineage", {}),
								renderSlot("conversation.session.header.actions", {})
							]
						}),
						(0, react_jsx_runtime.jsx)("div", {
							className: ConversationRoot_module_css_default.headerUtilities,
							children: renderSlot("conversation.session.header.utilities", {})
						}),
						(0, react_jsx_runtime.jsx)("div", {
							className: ConversationRoot_module_css_default.headerCorner,
							children: renderSlot("conversation.session.header.corner", {})
						})
					]
				}), showTabs && (0, react_jsx_runtime.jsxs)("div", {`;

  if (code.includes(headerComponentTarget)) {
    code = code.replace(headerComponentTarget, headerComponentReplacement);
  }

  // 4. Wire selectWorkspace tab replacement and inject createNewTab/closeTab/open/tWorkspace into registerHeader & registerSessionHeader
  const selectWsTarget = `					selectWorkspace: (workspaceId) => workspaceNavigation.openWorkspace(workspaceId, (nextId) => {
						if (sessionId !== void 0 && nextId !== sessionId) {`;

  const selectWsReplacement = `					selectWorkspace: (workspaceId) => workspaceNavigation.openWorkspace(workspaceId, (nextId) => {
						if (sessionId !== void 0 && nextId !== sessionId) {
							const idx = browserTabOrderMemory.indexOf(sessionId);
							if (idx !== -1) browserTabOrderMemory[idx] = nextId;`;

  if (code.includes(selectWsTarget)) {
    code = code.replace(selectWsTarget, selectWsReplacement);
  }

  const registerHeaderTarget = `			const registerHeader = () => slots.register({
				name: "conversation.header",
				children: {
					"conversation.header.leading": {
						kind: "single",
						scope: "root"
					},
					"conversation.session.header": {
						kind: "single",
						scope: "session"
					}
				}
			}, ConversationHeader);
			const registerSessionHeader = () => slots.register({
				name: "conversation.session.header",
				locale: NS,
				children: {
					"conversation.session.header.lineage": {
						kind: "single",
						scope: "session"
					},
					"conversation.session.header.actions": {
						kind: "list",
						scope: "session"
					},
					"conversation.session.header.utilities": {
						kind: "list",
						scope: "session"
					},
					"conversation.session.header.corner": {
						kind: "single",
						scope: "session"
					},
					"conversation.session.header.views.actions": {
						kind: "list",
						scope: "root"
					}
				},
				store: conversationStore,
				inject: (sessionId, actions) => ({
					hooks: {
						conversationViews,
						entryPins: viewPins.unpinned,
						entryActions: viewActions
					},
					setPinned: viewPins.setPinned,
					open: (id) => {
						workspaceNavigation.openSession(id);
					},
					selectView: (view) => {
						activateView(sessionId, view);
						actions.setView(view);
					}
				})
			}, ConversationSessionHeader);`;

  const registerHeaderReplacement = `			const tWorkspace = ctx.locale.bind("workspace");
			const createNewTab = () => {
				workspaceNavigation.startSession();
			};
			const closeTab = (targetId) => {
				const idx = browserTabOrderMemory.indexOf(targetId);
				if (idx !== -1) browserTabOrderMemory.splice(idx, 1);
				workspaceNavigation.archiveSession(targetId, { stopActivity: true });
			};
			const registerHeader = () => slots.register({
				name: "conversation.header",
				locale: NS,
				children: {
					"conversation.header.leading": {
						kind: "single",
						scope: "root"
					},
					"conversation.session.header": {
						kind: "single",
						scope: "session"
					}
				},
				inject: () => ({
					tWorkspace,
					open: (id) => {
						workspaceNavigation.openSession(id);
					},
					createNewTab,
					closeTab
				})
			}, ConversationHeader);
			const registerSessionHeader = () => slots.register({
				name: "conversation.session.header",
				locale: NS,
				children: {
					"conversation.session.header.lineage": {
						kind: "single",
						scope: "session"
					},
					"conversation.session.header.actions": {
						kind: "list",
						scope: "session"
					},
					"conversation.session.header.utilities": {
						kind: "list",
						scope: "session"
					},
					"conversation.session.header.corner": {
						kind: "single",
						scope: "session"
					},
					"conversation.session.header.views.actions": {
						kind: "list",
						scope: "root"
					}
				},
				store: conversationStore,
				inject: (sessionId, actions) => ({
					hooks: {
						conversationViews,
						entryPins: viewPins.unpinned,
						entryActions: viewActions
					},
					tWorkspace,
					setPinned: viewPins.setPinned,
					open: (id) => {
						workspaceNavigation.openSession(id);
					},
					createNewTab,
					closeTab,
					selectView: (view) => {
						activateView(sessionId, view);
						actions.setView(view);
					}
				})
			}, ConversationSessionHeader);`;

  if (code.includes(registerHeaderTarget)) {
    code = code.replace(registerHeaderTarget, registerHeaderReplacement);
  }

  fs.writeFileSync(filePath, code, 'utf8');
}
