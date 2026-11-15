import fs from 'node:fs';
import path from 'node:path';
import { SSH_CLIENT_CSS_APPEND, SSH_CLIENT_RUNTIME_COMPONENTS } from '../../ssh/index.ts';
import {
  LUMINEX_THEME_TOKENS,
  PRESET2_THEME_TOKENS,
  buildLuminexPresetCss,
  buildLuminexCanvasRuntimeCode,
} from './luminex-theme.ts';

const BROWSER_TAB_CSS_APPEND =
  '.wSkVaW_header{height:52px!important;min-height:52px!important;padding:0 20px 0 16px!important;align-items:center;box-sizing:border-box;background:var(--dsw-alias-bg-layer-1, var(--dsw-alias-bg-base))}' +
  '.wSkVaW_headerBlank{border-bottom:.5px solid var(--dsw-alias-border-l3)!important;height:52px!important;min-height:52px!important;padding:0 20px 0 16px!important;box-sizing:border-box}' +
  '.wSkVaW_titleRow{height:34px!important;min-height:34px!important;align-items:center;gap:8px!important;min-width:0;overflow:hidden;flex:1}' +
  '.wSkVaW_titleRow .wSkVaW_titleRow{flex:0 1 auto!important;padding-inline-start:0!important}' +
  '.wSkVaW_browserTabsBar{display:flex;align-items:center;gap:6px;min-width:0;flex:1;height:34px;overflow-x:hidden;scrollbar-width:none;padding:0;-webkit-app-region:no-drag;position:relative;scroll-behavior:auto}' +
  '.wSkVaW_browserTabsBar[data-overflow=true]{overflow-x:auto}' +
  '.wSkVaW_browserTabsBar::-webkit-scrollbar{display:none}' +
  '.wSkVaW_browserTab{display:inline-flex;align-items:center;gap:8px;height:34px;width:168px;min-width:168px;max-width:168px;flex:0 0 168px;padding:0 8px 0 10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l3, rgba(128,128,128,.16));background:color-mix(in srgb, var(--dsw-alias-bg-base) 55%, transparent);color:var(--dsw-alias-label-secondary);font-size:13px;line-height:18px;cursor:pointer;user-select:none;transition:background .12s ease,border-color .12s ease,color .12s ease,box-shadow .12s ease;position:relative;box-sizing:border-box;touch-action:none}' +
  '.wSkVaW_browserTab:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}' +
  '.wSkVaW_browserTabActive{background:#FFFFFF;border-color:#FF6A2B;border-width:1.5px;color:#1F2329;font-weight:600;box-shadow:0 2px 6px rgba(255,106,43,.12)}' +
  '.wSkVaW_browserTabDragging{z-index:10;cursor:grabbing!important;box-shadow:0 4px 12px rgba(0,0,0,.16)!important;transition:none!important;background:var(--dsw-alias-bg-base)!important}' +
  '.wSkVaW_browserTabIcon{width:14px;height:14px;flex:none;color:var(--dsw-alias-label-tertiary);display:inline-flex;align-items:center;justify-content:center;pointer-events:none}' +
  '.wSkVaW_browserTabActive .wSkVaW_browserTabIcon{color:#FF6A2B}' +
  '.wSkVaW_browserTabTitle{display:inline-flex;align-items:baseline;flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-align:left}' +
  '.wSkVaW_browserTabRenameInput{flex:1;min-width:0;width:100%;height:22px;padding:0 5px;margin:0;border-radius:4px;border:1px solid var(--dsw-alias-state-business-primary, #4d6bfe);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px;font-family:inherit;outline:none;box-sizing:border-box}' +
  '.wSkVaW_browserTabWs{font-size:11px;line-height:14px;padding:1px 5px;border-radius:4px;background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-tertiary);max-width:64px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:none;pointer-events:none}' +
  '.wSkVaW_browserTabClose{width:18px;height:18px;border-radius:4px;border:none;background:transparent;color:var(--dsw-alias-label-tertiary);display:inline-flex;align-items:center;justify-content:center;padding:0;cursor:pointer;flex:none;opacity:.65;transition:opacity .12s ease,background .12s ease,color .12s ease}' +
  '.wSkVaW_browserTab:hover .wSkVaW_browserTabClose,.wSkVaW_browserTabActive .wSkVaW_browserTabClose{opacity:1}' +
  '.wSkVaW_browserTabClose:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}' +
  '.wSkVaW_browserTabAdd{width:30px;height:30px;border-radius:8px;border:1px dashed var(--dsw-alias-border-l2, rgba(128,128,128,.25));background:var(--dsw-alias-bg-layer-1, var(--dsw-alias-bg-base));color:var(--dsw-alias-label-secondary);display:inline-flex;align-items:center;justify-content:center;padding:0;cursor:pointer;flex:0 0 30px;position:sticky;right:0;z-index:4;box-shadow:-6px 0 8px -4px var(--dsw-alias-bg-layer-1, var(--dsw-alias-bg-base));transition:background .14s ease,color .14s ease,border-color .14s ease}' +
  '.wSkVaW_browserTabAdd:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);border-style:solid;border-color:var(--dsw-alias-border-l2)}' +
  SSH_CLIENT_CSS_APPEND;

const BROWSER_TASK_TABS_COMPONENT = `		function getDshBrowserTabsStore() {
			if (!globalThis.__dshBrowserTabsStore) {
				const listeners = new Set();
				const store = {
					order: [],
					closedIds: new Set(),
					optimisticTabs: new Map(),
					stableKeys: new Map(),
					customTitles: new Map(),
					optimisticActiveId: void 0,
					noTabsHomeMode: false,
					homeStandbySessionId: void 0,
					awaitingStandbySession: false,
					seq: 0,
					revision: 0,
					subscribe(listener) {
						listeners.add(listener);
						return () => listeners.delete(listener);
					},
					getSnapshot() {
						return store.revision;
					},
					emit(sync = false) {
						store.revision += 1;
						const notifyAll = () => {
							for (const listener of listeners) {
								try {
									listener();
								} catch (_e) {}
							}
						};
						if (sync && typeof react_dom?.flushSync === "function") {
							try {
								react_dom.flushSync(notifyAll);
								return;
							} catch (_e) {}
						}
						notifyAll();
					},
					getCustomTitle(id) {
						return store.customTitles.get(id);
					},
					setCustomTitle(id, title) {
						const trimmed = (title ?? "").trim();
						if (trimmed) store.customTitles.set(id, trimmed);
						else store.customTitles.delete(id);
						store.emit(true);
					},
					resolveOptimisticTab(realId, targetOptKey) {
						if (!realId) return;
						store.closedIds.delete(realId);
						if (store.awaitingStandbySession && store.noTabsHomeMode) {
							store.awaitingStandbySession = false;
							store.homeStandbySessionId = realId;
							store.emit();
							return;
						}
						if (store.stableKeys.has(realId)) {
							return;
						}
						if (store.optimisticTabs.size > 0) {
							const firstOptKey = (targetOptKey && store.optimisticTabs.has(targetOptKey))
								? targetOptKey
								: store.optimisticTabs.keys().next().value;
							if (firstOptKey !== void 0) {
								const optMeta = store.optimisticTabs.get(firstOptKey);
								store.optimisticTabs.delete(firstOptKey);
								store.stableKeys.set(realId, firstOptKey);
								const custom = store.customTitles.get(firstOptKey);
								if (custom !== void 0) {
									store.customTitles.delete(firstOptKey);
									store.customTitles.set(realId, custom);
								}
								if (optMeta?.roomId) {
									globalThis.__dshGroupHubStore?.bindSessionToRoom?.(realId, optMeta.roomId, optMeta.title, firstOptKey);
								} else {
									globalThis.__dshGroupHubStore?.unbindSession?.(realId);
								}
								const optIdx = store.order.indexOf(firstOptKey);
								if (optIdx !== -1) {
									store.order[optIdx] = realId;
									for (let i = store.order.length - 1; i >= 0; i--) {
										if (i !== optIdx && store.order[i] === realId) {
											store.order.splice(i, 1);
										}
									}
								} else if (!store.order.includes(realId)) {
									store.order.push(realId);
								}
								if (store.optimisticActiveId === firstOptKey) store.optimisticActiveId = void 0;
								store.emit();
								return;
							}
						}
					},
					notifyPromptSent(sessionId) {
						if (!sessionId) return;
						if (store.noTabsHomeMode || store.homeStandbySessionId === sessionId) {
							store.noTabsHomeMode = false;
							store.homeStandbySessionId = void 0;
							store.awaitingStandbySession = false;
							store.closedIds.delete(sessionId);
							if (!store.order.includes(sessionId)) store.order.push(sessionId);
							store.emit(true);
						}
					}
				};
				globalThis.__dshBrowserTabsStore = store;
			}
			return globalThis.__dshBrowserTabsStore;
		}
		const browserTabOrderMemory = getDshBrowserTabsStore().order;
		function BrowserTaskTabsBar({ sessionId, useSessions, useWorkspaces, open, createNewTab, closeTab, renameTab, tWorkspace }) {
			const store = getDshBrowserTabsStore();
			const storeRev = (0, react.useSyncExternalStore)(store.subscribe, store.getSnapshot, store.getSnapshot);
			const sshStore = getDshSshStore();
			const sshRev = (0, react.useSyncExternalStore)(sshStore.subscribe, sshStore.getSnapshot, sshStore.getSnapshot);
			void sshRev;
			const sessionsState = useSessions((s) => s);
			const workspacesState = useWorkspaces((s) => s);
			const defaultWorkspaceName = tWorkspace ? tWorkspace("workspace.defaultName") : "Default workspace";
			const newSessionLabel = tWorkspace ? tWorkspace("session.new") : "New Session";
			const barRef = (0, react.useRef)(null);
			const addBtnRef = (0, react.useRef)(null);
			const [isOverflowing, setIsOverflowing] = (0, react.useState)(false);
			const [editingTabId, setEditingTabId] = (0, react.useState)(null);
			const [editingValue, setEditingValue] = (0, react.useState)("");
			const [dragState, setDragState] = (0, react.useState)(null);
			const suppressClickRef = (0, react.useRef)(false);

			(0, react.useEffect)(() => {
				if (!store.noTabsHomeMode || !sessionId) return;
				if (store.closedIds.has(sessionId)) return;
				const summary = sessionsState?.byId?.[sessionId];
				if (summary && (!summary.blank || summary.running || summary.promptAttempted)) {
					store.notifyPromptSent(sessionId);
				}
			}, [storeRev, sessionId, sessionsState]);

			const tabIds = (0, react.useMemo)(() => {
				if (store.noTabsHomeMode) {
					return [];
				}
				const archivedSet = new Set(workspacesState?.archivedSessionIds ?? []);
				const wsSessionIds = (workspacesState?.items ?? []).flatMap((w) => [...w.sessionIds].reverse());
				const allSessionIds = sessionsState?.ids ?? [];
				const validSet = new Set();
				const validCandidates = [];
				for (const id of [...wsSessionIds, ...allSessionIds]) {
					if (!id || validSet.has(id) || archivedSet.has(id) || store.closedIds.has(id)) continue;
					const summary = sessionsState?.byId?.[id];
					if (summary === void 0 || summary.origin === "subagent") continue;
					if (!store.order.includes(id) && !store.stableKeys.has(id) && store.optimisticTabs.size > 0) {
						const firstOptKey = store.optimisticTabs.keys().next().value;
						const optMeta = firstOptKey !== void 0 ? store.optimisticTabs.get(firstOptKey) : void 0;
						if (firstOptKey !== void 0 && !optMeta?.knownIds?.has(id)) {
							store.optimisticTabs.delete(firstOptKey);
							store.stableKeys.set(id, firstOptKey);
							const custom = store.customTitles.get(firstOptKey);
							if (custom !== void 0) {
								store.customTitles.delete(firstOptKey);
								store.customTitles.set(id, custom);
							}
							if (optMeta?.roomId) {
								globalThis.__dshGroupHubStore?.bindSessionToRoom?.(id, optMeta.roomId, optMeta.title, firstOptKey);
							} else {
								globalThis.__dshGroupHubStore?.unbindSession?.(id);
							}
							const optIdx = store.order.indexOf(firstOptKey);
							if (optIdx !== -1) store.order[optIdx] = id;
							if (store.optimisticActiveId === firstOptKey) store.optimisticActiveId = void 0;
						}
					}
					if (summary.blank && !summary.running && !summary.promptAttempted && !store.order.includes(id) && !store.stableKeys.has(id)) {
						continue;
					}
					validSet.add(id);
					validCandidates.push(id);
				}
				for (const optId of store.optimisticTabs.keys()) {
					if (!validSet.has(optId) && !store.closedIds.has(optId)) {
						validSet.add(optId);
						validCandidates.push(optId);
					}
				}
				const nextOrder = [];
				const included = new Set();
				for (const id of store.order) {
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
				store.order.length = 0;
				store.order.push(...nextOrder);
				return [...nextOrder];
			}, [sessionsState, workspacesState, storeRev]);

			const checkOverflow = (0, react.useCallback)(() => {
				const el = barRef.current;
				if (!el) return;
				const over = el.scrollWidth > el.clientWidth + 2 && tabIds.length > 1;
				setIsOverflowing((prev) => prev !== over ? over : prev);
				if (!over && el.scrollLeft !== 0) {
					el.scrollLeft = 0;
				}
			}, [tabIds.length]);

			(0, react.useLayoutEffect)(() => {
				checkOverflow();
				const el = barRef.current;
				if (!el || typeof ResizeObserver === "undefined") return;
				const ro = new ResizeObserver(() => checkOverflow());
				ro.observe(el);
				return () => ro.disconnect();
			}, [checkOverflow, tabIds.length, storeRev]);

			(0, react.useEffect)(() => {
				const el = barRef.current;
				if (!el) return;
				const onWheel = (e) => {
					const over = el.scrollWidth > el.clientWidth + 2 && tabIds.length > 1;
					if (!over) {
						if (el.scrollLeft !== 0) el.scrollLeft = 0;
						return;
					}
					const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
					if (delta === 0) return;
					e.preventDefault();
					const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
					el.scrollLeft = Math.max(0, Math.min(maxScroll, el.scrollLeft + delta));
				};
				el.addEventListener("wheel", onWheel, { passive: false });
				return () => el.removeEventListener("wheel", onWheel);
			}, [tabIds.length]);

			const commitRename = (tabId, rawVal) => {
				setEditingTabId((curr) => curr === tabId ? null : curr);
				const trimmed = (rawVal ?? "").trim();
				if (!trimmed) return;
				store.setCustomTitle(tabId, trimmed);
				if (!store.optimisticTabs.has(tabId)) {
					renameTab?.(tabId, trimmed);
				}
			};

			const startTabPointerDown = (e, tabId) => {
				if (e.button !== 0) return;
				if (editingTabId !== null) return;
				const targetEl = e.target;
				if (targetEl instanceof HTMLElement && (targetEl.closest("button") || targetEl.closest("input"))) return;
				const barEl = barRef.current;
				const tabEl = e.currentTarget;
				if (!barEl || !(tabEl instanceof HTMLElement)) return;

				const initialRect = tabEl.getBoundingClientRect();
				let naturalLeft = initialRect.left;
				const tabWidth = initialRect.width;
				let startX = e.clientX;
				let moved = false;
				const pointerId = e.pointerId;

				const onPointerMove = (moveEvent) => {
					const rawDx = moveEvent.clientX - startX;
					if (!moved && Math.abs(rawDx) < 4) return;
					if (!moved) {
						moved = true;
						suppressClickRef.current = true;
						try {
							tabEl.setPointerCapture(pointerId);
						} catch (_e) {}
					}
					const barRect = barEl.getBoundingClientRect();
					const addRect = addBtnRef.current ? addBtnRef.current.getBoundingClientRect() : null;
					const rightLimit = addRect ? Math.min(barRect.right, addRect.left - 4) : barRect.right;
					const minDx = barRect.left - naturalLeft;
					const maxDx = Math.max(minDx, rightLimit - (naturalLeft + tabWidth));
					const clampedDx = Math.max(minDx, Math.min(maxDx, rawDx));
					const draggedCenter = naturalLeft + clampedDx + tabWidth / 2;

					const curIdx = store.order.indexOf(tabId);
					if (curIdx !== -1) {
						const tabNodes = Array.from(barEl.querySelectorAll('[role="tab"]'));
						let targetIdx = curIdx;
						for (let i = 0; i < tabNodes.length; i++) {
							const node = tabNodes[i];
							const nodeId = node.getAttribute("data-tab-session-id");
							if (!nodeId || nodeId === tabId) continue;
							const rect = node.getBoundingClientRect();
							const mid = rect.left + rect.width / 2;
							if (i < curIdx && draggedCenter <= mid + 14) {
								targetIdx = i;
								break;
							}
							if (i > curIdx && draggedCenter >= mid - 14) {
								targetIdx = i;
							}
						}
						if (targetIdx !== curIdx) {
							const step = tabWidth + 6;
							const shift = (targetIdx - curIdx) * step;
							const next = [...store.order];
							const [item] = next.splice(curIdx, 1);
							next.splice(targetIdx, 0, item);
							store.order.length = 0;
							store.order.push(...next);
							naturalLeft += shift;
							startX += shift;
							const adjustedRawDx = moveEvent.clientX - startX;
							const nextMinDx = barRect.left - naturalLeft;
							const nextMaxDx = Math.max(nextMinDx, rightLimit - (naturalLeft + tabWidth));
							const nextClampedDx = Math.max(nextMinDx, Math.min(nextMaxDx, adjustedRawDx));
							setDragState({ tabId, dx: nextClampedDx });
							store.emit(true);
							return;
						}
					}
					setDragState({ tabId, dx: clampedDx });
				};

				const finishPointer = () => {
					window.removeEventListener("pointermove", onPointerMove);
					window.removeEventListener("pointerup", finishPointer);
					window.removeEventListener("pointercancel", finishPointer);
					if (moved) {
						setDragState(null);
						setTimeout(() => {
							suppressClickRef.current = false;
						}, 40);
					}
				};

				window.addEventListener("pointermove", onPointerMove);
				window.addEventListener("pointerup", finishPointer);
				window.addEventListener("pointercancel", finishPointer);
			};

			const effectiveActiveId = store.optimisticActiveId ?? sessionId;

			return (0, react_jsx_runtime.jsxs)("div", {
				ref: barRef,
				className: ConversationRoot_module_css_default.browserTabsBar,
				role: "tablist",
				"aria-label": "Browser task tabs",
				"data-browser-task-tabs": "",
				"data-overflow": isOverflowing ? "true" : "false",
				children: [
					tabIds.map((tabId) => {
						const summary = sessionsState?.byId?.[tabId];
						const optTab = store.optimisticTabs.get(tabId);
						const isActive = tabId === effectiveActiveId;
						const ws = (workspacesState?.items ?? []).find((w) => w.sessionIds.includes(tabId) || (summary?.cwd && w.path === summary.cwd) || (optTab?.workspaceId && w.workspaceId === optTab.workspaceId));
						const wsLabel = ws ? workspaceDisplayTitle(ws.title, defaultWorkspaceName) : "";
						const customTitle = store.getCustomTitle(tabId);
						const rawTitle = customTitle || (summary?.blank ? newSessionLabel : (summary?.title?.trim() || summary?.displayTitle || optTab?.title || newSessionLabel));
						const showWsBadge = (workspacesState?.items?.length ?? 0) > 1 && wsLabel !== "";
						const tooltipText = wsLabel ? \`\${wsLabel} · \${rawTitle}\` : rawTitle;
						const isEditing = editingTabId === tabId;
						const isDragging = dragState?.tabId === tabId;
						const reactKey = store.stableKeys.get(tabId) ?? tabId;
						const tabSshState = sshStore.getSession(tabId);
						const tabSshBadge = tabSshState?.tabBadgeState ?? "none";
						return (0, react_jsx_runtime.jsxs)("div", {
							role: "tab",
							tabIndex: 0,
							"aria-selected": isActive,
							"data-tab-session-id": tabId,
							title: tooltipText,
							style: isDragging ? { transform: \`translate3d(\${dragState.dx}px, 0px, 0px)\` } : void 0,
							className: clsx(
								ConversationRoot_module_css_default.browserTab,
								isActive && ConversationRoot_module_css_default.browserTabActive,
								isDragging && ConversationRoot_module_css_default.browserTabDragging
							),
							onPointerDown: (e) => startTabPointerDown(e, tabId),
							onClick: () => {
								if (suppressClickRef.current || isEditing) return;
								if (store.optimisticTabs.has(tabId)) {
									store.optimisticActiveId = tabId;
									store.emit(true);
									globalThis.__dshGroupHubStore?.syncActiveTabSession?.(tabId);
									globalThis.__dshSelectMainPanel?.(null);
								} else {
									store.optimisticActiveId = void 0;
									globalThis.__dshGroupHubStore?.syncActiveTabSession?.(tabId);
									globalThis.__dshSelectMainPanel?.(null);
									open?.(tabId);
								}
							},
							onDoubleClick: (e) => {
								const targetEl = e.target;
								if (targetEl instanceof HTMLElement && targetEl.closest("button")) return;
								e.stopPropagation();
								e.preventDefault();
								setEditingTabId(tabId);
								setEditingValue(rawTitle);
							},
							onKeyDown: (e) => {
								if (e.target !== e.currentTarget || isEditing) return;
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									if (store.optimisticTabs.has(tabId)) {
										store.optimisticActiveId = tabId;
										store.emit(true);
										globalThis.__dshGroupHubStore?.syncActiveTabSession?.(tabId);
										globalThis.__dshSelectMainPanel?.(null);
									} else {
										store.optimisticActiveId = void 0;
										globalThis.__dshGroupHubStore?.syncActiveTabSession?.(tabId);
										globalThis.__dshSelectMainPanel?.(null);
										open?.(tabId);
									}
								}
							},
							children: [
								isEditing ? (0, react_jsx_runtime.jsx)("input", {
									type: "text",
									"data-tab-rename-input": "",
									className: ConversationRoot_module_css_default.browserTabRenameInput,
									autoFocus: true,
									value: editingValue,
									onFocus: (e) => e.currentTarget.select(),
									onChange: (e) => setEditingValue(e.target.value),
									onClick: (e) => e.stopPropagation(),
									onDoubleClick: (e) => e.stopPropagation(),
									onPointerDown: (e) => e.stopPropagation(),
									onMouseDown: (e) => e.stopPropagation(),
									onKeyDown: (e) => {
										e.stopPropagation();
										if (e.key === "Enter") {
											e.preventDefault();
											commitRename(tabId, editingValue);
										} else if (e.key === "Escape") {
											e.preventDefault();
											setEditingTabId(null);
										}
									},
									onBlur: () => commitRename(tabId, editingValue)
								}) : (0, react_jsx_runtime.jsxs)("span", {
									className: ConversationRoot_module_css_default.browserTabTitle,
									children: [
										(0, react_jsx_runtime.jsx)("span", {
											className: "dsh_ssh_tab_title_text",
											children: rawTitle
										}),
										tabSshBadge === "connected" ? (0, react_jsx_runtime.jsx)("span", {
											className: "dsh_ssh_tab_suffix dsh_ssh_tab_suffix_green",
											"data-testid": "tab-ssh-suffix",
											"data-ssh-badge": "connected",
											children: "ssh"
										}) : tabSshBadge === "failed_after_success" ? (0, react_jsx_runtime.jsx)("span", {
											className: "dsh_ssh_tab_suffix dsh_ssh_tab_suffix_red",
											"data-testid": "tab-ssh-suffix",
											"data-ssh-badge": "failed_after_success",
											children: "ssh"
										}) : null
									]
								}),
								showWsBadge && !isEditing && (0, react_jsx_runtime.jsx)("span", {
									className: ConversationRoot_module_css_default.browserTabWs,
									children: wsLabel
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: ConversationRoot_module_css_default.browserTabClose,
									"aria-label": \`Close \${rawTitle}\`,
									onPointerDown: (e) => e.stopPropagation(),
									onClick: (e) => {
										e.stopPropagation();
										closeTab?.(tabId, tabIds, sessionId);
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
						}, reactKey);
					}),
					(0, react_jsx_runtime.jsx)("button", {
						ref: addBtnRef,
						type: "button",
						className: ConversationRoot_module_css_default.browserTabAdd,
						"aria-label": "New conversation tab",
						title: newSessionLabel,
						onClick: () => {
							createNewTab?.(sessionId);
						},
						children: (0, react_jsx_runtime.jsx)("svg", {
							width: 14,
							height: 14,
							viewBox: "0 0 14 14",
							fill: "none",
							"aria-hidden": "true",
							children: (0, react_jsx_runtime.jsx)("path", {
								d: "M7 2.75V11.25M2.75 7H11.25",
								stroke: "currentColor",
								strokeWidth: "1.4",
								strokeLinecap: "round"
							})
						})
					})
				]
			});
		}
		function ConversationHeader({ sessionId, useSession, useConversation, useSessions, useWorkspaces, open, createNewTab, closeTab, renameTab, tWorkspace, renderSlot }) {
			const store = getDshBrowserTabsStore();
			const storeRev = (0, react.useSyncExternalStore)(store.subscribe, store.getSnapshot, store.getSnapshot);
			const session = useSession((s) => s);
			const conversation = useConversation((s) => s);
			const forceHero = store.noTabsHomeMode || (sessionId !== void 0 && store.closedIds.has(sessionId));
			const blank = forceHero || session === void 0 || conversation === void 0 || session.blank && conversationPhase(session, conversation) === "blank";
			void storeRev;
			return (0, react_jsx_runtime.jsxs)("header", {
				className: clsx(ConversationRoot_module_css_default.header, blank && ConversationRoot_module_css_default.headerBlank, sessionId === void 0 && ConversationRoot_module_css_default.headerSessionless),
				"data-window-drag": true,
				children: [(0, react_jsx_runtime.jsx)("div", {
					className: ConversationRoot_module_css_default.headerLeading,
					"data-conversation-header-leading": "",
					children: renderSlot("conversation.header.leading", {})
				}), (0, react_jsx_runtime.jsxs)("div", {
					className: ConversationRoot_module_css_default.titleRow,
					children: [(0, react_jsx_runtime.jsx)(BrowserTaskTabsBar, {
						sessionId,
						useSessions,
						useWorkspaces,
						open,
						createNewTab,
						closeTab,
						renameTab,
						tWorkspace
					}), sessionId !== void 0 && renderSlot("conversation.session.header", { hideChrome: blank })]
				})]
			});
		}
${SSH_CLIENT_RUNTIME_COMPONENTS}`;

function patchBrandOfficial(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-client-ui-brand-official',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /function OfficialBrandMark\([^)]*\)\s*\{[\s\S]*?\n\t\t\}/,
    'function OfficialBrandMark() {\n\t\t\treturn null;\n\t\t}',
  );
  content = content.replace(
    /function OfficialBrandName\([^)]*\)\s*\{[\s\S]*?\n\t\t\}/,
    'function OfficialBrandName() {\n\t\t\treturn null;\n\t\t}',
  );
  fs.writeFileSync(filePath, content, 'utf8');
}

function patchConversationClient(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-client-ui-conversation',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 0. Remove HeroFish whale icon and Preview badge per user Focus Mode instructions
  content = content.replace(
    /function HeroFish\([^)]*\) \{[\s\S]*?\n\t\t\}/,
    'function HeroFish() {\n\t\t\treturn null;\n\t\t}',
  );
  content = content.replace(
    ', (0, react_jsx_runtime.jsx)("span", {\n\t\t\t\t\t\t\t\tclassName: HeroShell_module_css_default.previewBadge,\n\t\t\t\t\t\t\t\tchildren: t("hero.preview")\n\t\t\t\t\t\t\t})',
    '',
  );

  // 1. Update CSS append for browser task tabs
  content = content.replace(
    /tag\.textContent = css\$4(?: \+ ".*")?;/,
    `tag.textContent = css$4 + ${JSON.stringify(BROWSER_TAB_CSS_APPEND)};`,
  );

  content = content.replace(
    /"body": "wSkVaW_body",(?:\n\t\t\t"browserTab[^"]*": "[^"]*",)*/g,
    [
      '"body": "wSkVaW_body",',
      '\t\t\t"browserTab": "wSkVaW_browserTab",',
      '\t\t\t"browserTabActive": "wSkVaW_browserTabActive",',
      '\t\t\t"browserTabAdd": "wSkVaW_browserTabAdd",',
      '\t\t\t"browserTabClose": "wSkVaW_browserTabClose",',
      '\t\t\t"browserTabDragging": "wSkVaW_browserTabDragging",',
      '\t\t\t"browserTabIcon": "wSkVaW_browserTabIcon",',
      '\t\t\t"browserTabRenameInput": "wSkVaW_browserTabRenameInput",',
      '\t\t\t"browserTabTitle": "wSkVaW_browserTabTitle",',
      '\t\t\t"browserTabWs": "wSkVaW_browserTabWs",',
      '\t\t\t"browserTabsBar": "wSkVaW_browserTabsBar",',
    ].join('\n'),
  );

  // 1b. Update ConversationMainPanel and DefaultConversationViews so deleting the last tab switches to Home Page in 0ms
  content = content.replace(
    /function ConversationMainPanel\(props\) \{[\s\S]*?\n\t\t\}/,
    `function ConversationMainPanel(props) {
			const { sessionId, useSession, useSessions, useConversation, renderSlot, renderFactorySlot } = props;
			const store = getDshBrowserTabsStore();
			const storeRev = (0, react.useSyncExternalStore)(store.subscribe, store.getSnapshot, store.getSnapshot);
			const session = useSession((s) => s);
			const conversation = useConversation((s) => s);
			const shellPhase = session === void 0 || conversation === void 0 ? "blank" : conversationPhase(session, conversation);
			const openState = session?.openState;
			const summaryBlank = useSessions((s) => sessionId === void 0 ? void 0 : s.byId[sessionId]?.blank);
			const isKnownNonBlank = session?.blank === false || summaryBlank === false;
			const parentAvailabilityPending = session?.subagent?.address.mode === "continuable" && session.subagent.parentAvailable === void 0;
			const forceHero = store.noTabsHomeMode || (sessionId !== void 0 && store.closedIds.has(sessionId));
			const settling = !forceHero && sessionId !== void 0 && (shellPhase === "blank" && openState === "loading" && isKnownNonBlank || parentAvailabilityPending);
			const hero = forceHero || sessionId === void 0 || (shellPhase === "blank" && !settling);
			const phase = settling ? "settling" : hero ? "hero" : "active";
			void storeRev;
			return (0, react_jsx_runtime.jsxs)("div", {
				className: ConversationRoot_module_css_default.root,
				"data-phase": phase,
				children: [renderSlot("conversation.header", {}), renderFactorySlot("conversation.content", {
					variant: "main",
					phase,
					hero
				}, { slots: CONTENT_SLOTS })]
			});
		}`,
  );

  content = content.replace(
    'if (session.blank && conversationPhase(session, conversation) === "blank") return null;',
    'if (getDshBrowserTabsStore().noTabsHomeMode || getDshBrowserTabsStore().closedIds.has(session.id) || (session.blank && conversationPhase(session, conversation) === "blank")) return null;',
  );

  // 2. Replace BrowserTaskTabsBar and ConversationHeader
  content = content.replace(
    /(?:\t\tfunction getDshBrowserTabsStore\(\)[\s\S]*?|\t\tconst browserTabOrderMemory = \[\];[\s\S]*?|\t\tfunction ConversationHeader\(\{[\s\S]*?)\n\t\t\}\n+\t\t\/\*\*\n\t\t\* Resolve a preferred registered View/,
    `${BROWSER_TASK_TABS_COMPONENT.trimEnd()}\n\t\t/**\n\t\t* Resolve a preferred registered View`,
  );

  // 3. Ensure ConversationSessionHeader does not duplicate BrowserTaskTabsBar (since ConversationHeader now renders it persistently) and preserves useContextMenu prop
  content = content.replace(
    /function ConversationSessionHeader\(\{[^}]+\}\) \{\n\t\t\tconst \{ getTriggerProps \} = (?:typeof useContextMenu === "function" \? useContextMenu\(\) : \{ getTriggerProps: \(\) => \(\{\}\) \}|useContextMenu\(\));/,
    'function ConversationSessionHeader({ sessionId, hideChrome, useSessions, useWorkspaces, useConversationViews, useStore, renderSlot, open, createNewTab, closeTab, renameTab, tWorkspace, selectView, setPinned, t, useEntryPins, useEntryActions, useContextMenu }) {\n\t\t\tconst { getTriggerProps } = typeof useContextMenu === "function" ? useContextMenu() : { getTriggerProps: () => ({}) };',
  );

  content = content.replace(
    /return \(0, react_jsx_runtime\.jsxs\)\(react_jsx_runtime\.Fragment, \{ children: \[\(0, react_jsx_runtime\.jsxs\)\("div", \{\n\t\t\t\tclassName: ConversationRoot_module_css_default\.titleRow,\n\t\t\t\tchildren: \[(?:\(0, react_jsx_runtime\.jsx\)\(BrowserTaskTabsBar, \{[\s\S]*?\}\), )?!hideChrome && \(0, react_jsx_runtime\.jsxs\)\(react_jsx_runtime\.Fragment, \{ children: \[\(0, react_jsx_runtime\.jsxs\)\("div", \{\n\t\t\t\t\tclassName: ConversationRoot_module_css_default\.titleCluster,(?:\n\t\t\t\t\tstyle: \{ flex: "0 1 auto" \},)?/,
    `return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("div", {
				className: ConversationRoot_module_css_default.titleRow,
				children: [!hideChrome && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("div", {
					className: ConversationRoot_module_css_default.titleCluster,
					style: { flex: "0 1 auto" },`,
  );

  // 4. Clean up selectWorkspace tab order replacement
  content = content.replace(
    /(\t*const idx = browserTabOrderMemory\.indexOf\(sessionId\);\n\t*if \(idx !== -1\) browserTabOrderMemory\[idx\] = nextId;\n)+/g,
    '\t\t\t\t\t\t\tconst idx = browserTabOrderMemory.indexOf(sessionId);\n\t\t\t\t\t\t\tif (idx !== -1) browserTabOrderMemory[idx] = nextId;\n',
  );

  if (!content.includes('const idx = browserTabOrderMemory.indexOf(sessionId);')) {
    content = content.replace(
      'selectWorkspace: (workspaceId) => workspaceNavigation.openWorkspace(workspaceId, (nextId) => {\n\t\t\t\t\t\tif (sessionId !== void 0 && nextId !== sessionId) {',
      'selectWorkspace: (workspaceId) => workspaceNavigation.openWorkspace(workspaceId, (nextId) => {\n\t\t\t\t\t\tif (sessionId !== void 0 && nextId !== sessionId) {\n\t\t\t\t\t\t\tconst idx = browserTabOrderMemory.indexOf(sessionId);\n\t\t\t\t\t\t\tif (idx !== -1) browserTabOrderMemory[idx] = nextId;',
    );
  }

  // 5. Update registerHeader and registerSessionHeader in apply(ctx)
  content = content.replace(
    /(?:\t\t\tconst tWorkspace = ctx\.locale\.bind\("workspace"\);[\s\S]*?)?\t\t\tconst registerHeader = \(\) => slots\.register\(\{[\s\S]*?\}, ConversationSessionHeader\);/,
    `\t\t\tconst tWorkspace = ctx.locale.bind("workspace");
			const createNewTab = (currentSessionId, options = {}) => {
				const store = getDshBrowserTabsStore();
				const gStore = globalThis.__dshGroupHubStore;
				const wsSnap = ctx.get("workspaces")?.list?.getSnapshot?.();
				const sessSnap = sessions.list.getSnapshot();
				const archivedSet = new Set(wsSnap?.archivedSessionIds ?? []);
				const targetRoomId = options?.roomId || null;
				const customTabTitle = options?.title || "";
				if (!targetRoomId) {
					gStore?.leaveGroupRoom?.();
				}
				if (store.noTabsHomeMode) {
					const standbyId = store.homeStandbySessionId ?? currentSessionId;
					const standbySummary = standbyId ? sessSnap.byId[standbyId] : void 0;
					const standbyRoom = standbyId ? gStore?.getRoomForSession?.(standbyId) : null;
					for (const id of sessSnap.ids ?? []) {
						if (!store.order.includes(id) && sessSnap.byId[id]?.blank) {
							store.closedIds.add(id);
						}
					}
					store.noTabsHomeMode = false;
					store.homeStandbySessionId = void 0;
					store.awaitingStandbySession = false;
					if (standbyId && standbySummary && standbySummary.blank && !standbyRoom && !archivedSet.has(standbyId)) {
						store.closedIds.delete(standbyId);
						if (!store.order.includes(standbyId)) store.order.push(standbyId);
						if (customTabTitle) {
							store.customTitles.set(standbyId, customTabTitle);
						}
						if (targetRoomId && gStore?.bindSessionToRoom) {
							gStore.bindSessionToRoom(standbyId, targetRoomId);
						}
						store.optimisticActiveId = void 0;
						store.emit(true);
						workspaceNavigation.openSession(standbyId);
						return standbyId;
					}
				}
				for (const id of sessSnap.ids ?? []) {
					if (!store.order.includes(id) && !store.stableKeys.has(id) && sessSnap.byId[id]?.blank && !sessSnap.byId[id]?.running && !sessSnap.byId[id]?.promptAttempted) {
						store.closedIds.add(id);
					}
				}
				store.noTabsHomeMode = false;
				store.homeStandbySessionId = void 0;
				store.awaitingStandbySession = false;
				const tempId = "__opt_tab_" + (++store.seq);
				store.optimisticTabs.set(tempId, {
					id: tempId,
					title: customTabTitle || tWorkspace("session.new"),
					roomId: targetRoomId,
					knownIds: new Set(sessSnap.ids ?? []),
					createdAt: Date.now()
				});
				if (customTabTitle) {
					store.customTitles.set(tempId, customTabTitle);
				}
				if (targetRoomId && gStore?.bindSessionToRoom) {
					gStore.bindSessionToRoom(tempId, targetRoomId);
				}
				store.order.push(tempId);
				store.optimisticActiveId = tempId;
				store.emit(true);
				const fallbackWsId = options?.workspaceId || wsSnap?.items?.[0]?.workspaceId;
				workspaceNavigation.startSession(fallbackWsId, { reuseBlank: false });
				return tempId;
			};
			globalThis.__dshCreateNewTab = createNewTab;
			const closeTab = (targetId, currentTabIds, activeSessionId) => {
				const store = getDshBrowserTabsStore();
				const gStore = globalThis.__dshGroupHubStore;
				gStore?.unbindSession?.(targetId);
				const visibleIds = Array.isArray(currentTabIds) ? [...currentTabIds] : [...store.order];
				const closedIdx = visibleIds.indexOf(targetId);
				const remaining = visibleIds.filter((id) => id !== targetId);
				const orderIdx = store.order.indexOf(targetId);
				if (orderIdx !== -1) store.order.splice(orderIdx, 1);

				const sessSnap = sessions.list.getSnapshot();
				const wsSnap = ctx.get("workspaces")?.list?.getSnapshot?.();
				const archivedSet = new Set(wsSnap?.archivedSessionIds ?? []);

				if (store.optimisticTabs.has(targetId)) {
					store.optimisticTabs.delete(targetId);
					if (store.optimisticActiveId === targetId) store.optimisticActiveId = void 0;
					if (remaining.length === 0) {
						gStore?.leaveGroupRoom?.();
						store.order.length = 0;
						store.optimisticTabs.clear();
						store.noTabsHomeMode = true;
						const standbyId = (sessSnap.ids ?? []).find((id) => !archivedSet.has(id) && sessSnap.byId[id]?.blank && !sessSnap.byId[id]?.running && !sessSnap.byId[id]?.promptAttempted && !gStore?.getRoomForSession?.(id));
						for (const id of sessSnap.ids ?? []) {
							if (id !== standbyId) store.closedIds.add(id);
						}
						if (standbyId) {
							store.closedIds.delete(standbyId);
							store.homeStandbySessionId = standbyId;
							store.awaitingStandbySession = false;
							workspaceNavigation.openSession(standbyId);
						} else {
							store.homeStandbySessionId = void 0;
							store.awaitingStandbySession = true;
							workspaceNavigation.startSession();
						}
					}
					store.emit(true);
					return;
				}

				const summary = sessSnap.byId[targetId];

				if (remaining.length === 0) {
					gStore?.leaveGroupRoom?.();
					store.order.length = 0;
					store.optimisticTabs.clear();
					store.optimisticActiveId = void 0;
					store.customTitles.delete(targetId);
					for (const id of sessSnap.ids ?? []) {
						if (id !== targetId) store.closedIds.add(id);
					}
					if (summary?.blank && !summary?.running && !summary?.promptAttempted) {
						store.closedIds.delete(targetId);
						store.noTabsHomeMode = true;
						store.homeStandbySessionId = targetId;
						store.awaitingStandbySession = false;
						try {
							inputHub.shell(targetId)?.setDraft("");
						} catch (_e) {}
						if (activeSessionId !== targetId) {
							workspaceNavigation.openSession(targetId);
						}
						store.emit(true);
						return;
					}
					store.closedIds.add(targetId);
					store.noTabsHomeMode = true;
					store.homeStandbySessionId = void 0;
					store.awaitingStandbySession = true;
					store.emit(true);
					workspaceNavigation.startSession();
					workspaceNavigation.archiveSession(targetId, { stopActivity: true });
					return;
				}

				store.closedIds.add(targetId);
				if (activeSessionId === targetId || store.optimisticActiveId === targetId) {
					const nextActive = remaining[Math.min(Math.max(0, closedIdx), remaining.length - 1)];
					store.optimisticActiveId = void 0;
					if (nextActive && !store.optimisticTabs.has(nextActive)) {
						gStore?.syncActiveTabSession?.(nextActive);
						workspaceNavigation.openSession(nextActive);
					}
				}
				store.emit(true);
				workspaceNavigation.archiveSession(targetId, { stopActivity: true });
			};
			const renameTab = (targetId, newTitle) => {
				const trimmed = (newTitle ?? "").trim();
				if (!trimmed) return;
				const store = getDshBrowserTabsStore();
				store.setCustomTitle(targetId, trimmed);
				if (store.optimisticTabs.has(targetId)) return;
				sessions.using(targetId, { source: "workspaceOperation" }, (reference) => reference.binding.session.rename(trimmed)).catch((err) => {
					console.warn("tab rename failed:", err);
				});
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
						const store = getDshBrowserTabsStore();
						store.noTabsHomeMode = false;
						store.optimisticActiveId = void 0;
						store.emit(true);
						globalThis.__dshGroupHubStore?.syncActiveTabSession?.(id);
						workspaceNavigation.openSession(id);
					},
					createNewTab,
					closeTab,
					renameTab
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
						const store = getDshBrowserTabsStore();
						store.noTabsHomeMode = false;
						store.optimisticActiveId = void 0;
						store.emit(true);
						globalThis.__dshGroupHubStore?.syncActiveTabSession?.(id);
						workspaceNavigation.openSession(id);
					},
					createNewTab,
					closeTab,
					renameTab,
					selectView: (view) => {
						activateView(sessionId, view);
						actions.setView(view);
					}
				})
			}, ConversationSessionHeader);`,
  );

  // 6. Hook composer submit so sending a message on Home Page immediately exits noTabsHomeMode in 0ms and exposes composer draft helper
  content = content.replace(
    /const (?:rawShell|shell) = inputHub\.shell\(sessionId\);(?:\n\t\t\t\t\tconst shell = new Proxy\(rawShell, \{[\s\S]*?\}\);)?\n\t\t\t\t\tconst inputTriggers = inputHub\.inputTriggers\(sessionId\);/,
    `const rawShell = inputHub.shell(sessionId);
					globalThis.__dshAppendComposerDraft = (text) => {
						try {
							const cur = rawShell.getSnapshot?.()?.draft ?? "";
							rawShell.setDraft((cur ? cur.trimEnd() + " " : "") + text);
						} catch (_e) {}
					};
					const shell = new Proxy(rawShell, {
						get(target, prop, receiver) {
							if (prop === "submit") {
								return (...args) => {
									getDshBrowserTabsStore().notifyPromptSent(sessionId);
									const gStore = globalThis.__dshGroupHubStore;
									const boundRoomId = gStore?.getRoomForSession?.(sessionId) || (gStore?.activeRoomMode ? gStore?.activeRoomId : null);
									if (boundRoomId) {
										const rm = (gStore.rooms || []).find((r) => r.id === boundRoomId);
										if (rm && sessionId) {
											getDshBrowserTabsStore().setCustomTitle(sessionId, rm.name);
										}
										if (rm && gStore.busyAgentIds) {
											(rm.agentIds || []).forEach((id) => gStore.busyAgentIds.add(id));
											gStore.emit?.();
											setTimeout(() => {
												(rm.agentIds || []).forEach((id) => gStore.busyAgentIds.delete(id));
												gStore.emit?.();
											}, 8000);
										}
									}
									return target.submit(...args);
								};
							}
							const val = Reflect.get(target, prop, receiver);
							return typeof val === "function" ? val.bind(target) : val;
						}
					});
					const inputTriggers = inputHub.inputTriggers(sessionId);`,
  );

  // 7. Inject SshHeroConnectedLine in HeroShell (and keep above-composer clean when in Group Room mode since Group Identity is pinned at the top below tabs)
  content = content.replace(
    /function HeroShell\(\{[^}]+\}\) \{[\s\S]*?\n\t\t\}/,
    `function HeroShell({ t, renderSlot, sessionId, children }) {
			const [hovering, setHovering] = (0, react.useState)(false);
			const gStore = globalThis.__dshGroupHubStore;
			const gRev = (0, react.useSyncExternalStore)(
				(cb) => gStore?.subscribe ? gStore.subscribe(cb) : () => {},
				() => gStore?.getSnapshot ? gStore.getSnapshot() : 0
			);
			const tabStore = getDshBrowserTabsStore();
			const tabRev = (0, react.useSyncExternalStore)(tabStore.subscribe, tabStore.getSnapshot);
			void gRev;
			void tabRev;
			const effectiveSid = tabStore.optimisticActiveId || sessionId;
			const boundRoomId = effectiveSid && gStore?.getRoomForSession
				? gStore.getRoomForSession(effectiveSid)
				: (gStore?.activeRoomMode ? gStore?.activeRoomId : null);
			const isGroupMode = Boolean(boundRoomId);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: HeroShell_module_css_default.root,
				children: [!isGroupMode && (0, react_jsx_runtime.jsxs)("div", {
					className: HeroShell_module_css_default.stack,
					children: [
						(0, react_jsx_runtime.jsx)(SshHeroConnectedLine, { sessionId }),
						(0, react_jsx_runtime.jsxs)("div", {
							className: HeroShell_module_css_default.headline,
							children: [(0, react_jsx_runtime.jsx)("span", {
								className: HeroShell_module_css_default.fishHitbox,
								onPointerEnter: (event) => {
									if (event.pointerType !== "touch" && window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) setHovering(true);
								},
								onPointerLeave: () => {
									setHovering(false);
								},
								children: renderSlot("conversation.hero.brand.mark", {
									size: 34,
									className: HeroShell_module_css_default.fish
								}, { fallback: (0, react_jsx_runtime.jsx)(HeroFish, { hovering }) })
							}), (0, react_jsx_runtime.jsxs)("span", {
								className: HeroShell_module_css_default.titleGroup,
								children: [(0, react_jsx_runtime.jsx)("span", {
									children: t("hero.headline")
								})]
							})]
						}),
						(0, react_jsx_runtime.jsx)("div", { className: HeroShell_module_css_default.body })
					]
				}), children]
			});
		}`,
  );

  content = content.replace(
    /hero && \(0, react_jsx_runtime\.jsx\)\(HeroShell, \{\n\t\t\t\t\t\tt,\n\t\t\t\t\t\trenderSlot(?:\n\t\t\t\t\t\t,\s*sessionId|,\n\t\t\t\t\t\tsessionId)?\n\t\t\t\t\t\}\),/,
    `hero && (0, react_jsx_runtime.jsx)(HeroShell, {\n\t\t\t\t\t\tt,\n\t\t\t\t\t\trenderSlot,\n\t\t\t\t\t\tsessionId\n\t\t\t\t\t}),`,
  );

  // 8. Inject DshGroupRoomNativeBar pinned at the top of the message area (directly below browser tabs) and SshServerTelemetryDrawer inside ConversationContent body
  const groupRoomNativeBarCode = `		function DshGroupRoomNativeBar({ sessionId }) {
			const gStore = globalThis.__dshGroupHubStore;
			const gRev = (0, react.useSyncExternalStore)(
				(cb) => gStore?.subscribe ? gStore.subscribe(cb) : () => {},
				() => gStore?.getSnapshot ? gStore.getSnapshot() : 0
			);
			const tabStore = getDshBrowserTabsStore();
			const tabRev = (0, react.useSyncExternalStore)(tabStore.subscribe, tabStore.getSnapshot);
			void gRev;
			void tabRev;
			const [editingName, setEditingName] = (0, react.useState)(false);
			const [nameDraft, setNameDraft] = (0, react.useState)("");
			const [showTeaming, setShowTeaming] = (0, react.useState)(false);
			const [showSyncFeed, setShowSyncFeed] = (0, react.useState)(false);
			const [teamJoin, setTeamJoin] = (0, react.useState)({
				peerUrl: "",
				inviteCode: "",
				agentName: ""
			});
			const [teamNotice, setTeamNotice] = (0, react.useState)("");
			const fileInputRef = (0, react.useRef)(null);

			if (!gStore) return null;
			const effectiveSid = tabStore.optimisticActiveId || sessionId;
			const boundRoomId = effectiveSid && gStore.getRoomForSession
				? gStore.getRoomForSession(effectiveSid)
				: (gStore.activeRoomMode ? gStore.activeRoomId : null);
			if (!boundRoomId) return null;
			const rooms = gStore.rooms || [];
			const agents = gStore.agents || [];
			const connectors = gStore.connectors || [];
			const activeRoom = rooms.find((r) => r.id === boundRoomId);
			if (!activeRoom) return null;

			const commitRoomRename = async (rawVal) => {
				setEditingName(false);
				const trimmed = (rawVal ?? "").trim();
				if (!trimmed || trimmed === activeRoom.name) return;
				await gStore.renameRoom?.(activeRoom.id, trimmed, sessionId);
			};

			const handleAvatarFileChange = async (e) => {
				const file = e.target.files?.[0];
				e.target.value = "";
				if (!file) return;
				await gStore.uploadRoomAvatarFile?.(activeRoom.id, file);
			};

			const toggleRoomAgentInBar = async (ag) => {
				const curIds = activeRoom.agentIds || [];
				const exists = curIds.includes(ag.id);
				const nextIds = exists ? curIds.filter((id) => id !== ag.id) : [...curIds, ag.id];
				const resp = await fetch(\`/api/superagent-groups/rooms/\${encodeURIComponent(activeRoom.id)}\`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ agentIds: nextIds })
				});
				const data = await resp.json();
				if (data.ok) gStore.updateFromApi({ ok: true, rooms: data.rooms || [] });
				if (!exists) {
					globalThis.__dshAppendComposerDraft?.(\`@\${ag.handle} \`);
				}
			};

			const toggleRoomConnectorInBar = async (conn) => {
				const curIds = activeRoom.connectorIds || [];
				const exists = curIds.includes(conn.id);
				const nextIds = exists ? curIds.filter((id) => id !== conn.id) : [...curIds, conn.id];
				const resp = await fetch(\`/api/superagent-groups/rooms/\${encodeURIComponent(activeRoom.id)}\`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ connectorIds: nextIds })
				});
				const data = await resp.json();
				if (data.ok) gStore.updateFromApi({ ok: true, rooms: data.rooms || [] });
			};

			const updateMode = async (collaborationMode) => {
				const resp = await fetch(\`/api/superagent-groups/rooms/\${encodeURIComponent(activeRoom.id)}\`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ collaborationMode })
				});
				const data = await resp.json();
				if (data.ok) gStore.updateFromApi({ ok: true, rooms: data.rooms || [] });
			};

			const handleJoinPeerDsh = async () => {
				const code = teamJoin.inviteCode.trim() || activeRoom.inviteCode;
				const resp = await fetch("/api/superagent-groups/federation/join", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						inviteCode: code,
						agentName: teamJoin.agentName.trim() || "队友 DSH 协同节点",
						accountLabel: "跨 DSH 组队节点",
						remoteBridgeUrl: teamJoin.peerUrl.trim()
					})
				});
				const data = await resp.json();
				if (data.ok) {
					gStore.updateFromApi({ ok: true, agents: data.agents || [], rooms: data.rooms || [] });
					setTeamJoin({ peerUrl: "", inviteCode: "", agentName: "" });
					setTeamNotice(\`已成功将队友 DSH 节点「\${data.agent?.name}」(@\${data.agent?.handle}) 组队接入本群！\`);
				} else {
					setTeamNotice(data.error || "组队接入失败，请检查邀请码。");
				}
			};

			const copyTeamInvite = () => {
				const origin = typeof window !== "undefined" ? window.location.origin : "";
				const text = \`DSH 组队地址: \${origin} | 群组邀请码: \${activeRoom.inviteCode}\`;
				try {
					navigator.clipboard?.writeText(text);
					setTeamNotice(\`已复制组队口令：\${text}\`);
				} catch (_e) {
					setTeamNotice(\`组队口令：\${text}\`);
				}
			};

			const modeOptions = [
				{
					id: "auto_relay",
					label: "自动接力",
					tipTitle: "自动接力协同模式 (Auto Relay)",
					tipDesc: "群内消息由主责 Agent 先行响应，并根据任务上下文自动接力流转给下一位专精 Agent 深入处理（如主控架构师 -> 红队渗透专家 -> SRE 运维专家）。"
				},
				{
					id: "smart_mention",
					label: "@点名路由",
					tipTitle: "@点名精准路由模式 (Smart Mention)",
					tipDesc: "仅当消息中通过 @handle 明确点名对应 Agent 或外部群机器人时才触发其响应，适合精细化点对点调度。"
				},
				{
					id: "all_broadcast",
					label: "全员会诊",
					tipTitle: "全员会诊并发模式 (All Broadcast)",
					tipDesc: "群内所有已启用的跨账户 Agent 同时收到消息并从各自专业领域（架构、安全、运维等）并行输出会诊意见。"
				}
			];

			return (0, react_jsx_runtime.jsxs)("div", {
				"data-testid": "dsh-group-room-native-bar",
				style: {
					flex: "none",
					width: "100%",
					boxSizing: "border-box",
					padding: "10px 20px",
					borderBottom: "1px solid var(--dsw-alias-border-def, rgba(128,128,128,0.16))",
					background: "var(--dsw-alias-bg-layer-1, transparent)",
					display: "flex",
					flexDirection: "column",
					gap: 8,
					zIndex: 8
				},
				children: [
					(0, react_jsx_runtime.jsx)("input", {
						ref: fileInputRef,
						type: "file",
						accept: "image/*",
						"data-testid": "group-room-avatar-file-input",
						style: { display: "none" },
						onChange: handleAvatarFileChange
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						"data-testid": "group-room-identity-row",
						style: {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 12,
							minHeight: 32,
							flexWrap: "wrap"
						},
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								style: { display: "flex", alignItems: "center", gap: 10, minWidth: 0 },
								children: [
									(0, react_jsx_runtime.jsx)("div", {
										"data-testid": "group-room-avatar",
										"data-dsh-tip-title": \`群组头像 · \${activeRoom.name}\`,
										"data-dsh-tip": "双击打开本地资源管理器选择图片更换群头像，系统将自动等比例缩放至高清合适尺寸。",
										"data-dsh-tip-tag": "",
										title: "双击打开资源管理器更换群组头像（自动等比例缩放到合适尺寸）",
										onDoubleClick: (e) => {
											e.stopPropagation();
											fileInputRef.current?.click();
										},
										style: {
											width: 32,
											height: 32,
											borderRadius: 8,
											border: "1.5px solid #FF6A2B",
											background: "#FFFFFF",
											display: "inline-flex",
											alignItems: "center",
											justifyContent: "center",
											overflow: "hidden",
											cursor: "pointer",
											flexShrink: 0,
											userSelect: "none",
											boxSizing: "border-box",
											boxShadow: "0 2px 6px rgba(255,106,43,0.12)"
										},
										children: activeRoom.avatarUrl ? (0, react_jsx_runtime.jsx)("img", {
											src: activeRoom.avatarUrl,
											alt: activeRoom.name,
											style: {
												maxWidth: "100%",
												maxHeight: "100%",
												width: "auto",
												height: "auto",
												objectFit: "contain",
												display: "block"
											}
										}) : (0, react_jsx_runtime.jsx)("span", {
											style: {
												fontSize: 13,
												fontWeight: 650,
												lineHeight: 1,
												color: "#1F2329"
											},
											children: (activeRoom.name || "群").trim().slice(0, 1)
										})
									}),
									editingName ? (0, react_jsx_runtime.jsx)("input", {
										type: "text",
										"data-testid": "group-room-title-input",
										className: "dsh-ghub-input",
										autoFocus: true,
										style: { width: 260, height: 30, fontSize: 14, fontWeight: 600 },
										value: nameDraft,
										onFocus: (e) => e.currentTarget.select(),
										onChange: (e) => setNameDraft(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												commitRoomRename(nameDraft);
											} else if (e.key === "Escape") {
												e.preventDefault();
												setEditingName(false);
											}
										},
										onBlur: () => commitRoomRename(nameDraft)
									}) : (0, react_jsx_runtime.jsx)("strong", {
										"data-testid": "group-room-title",
										"data-dsh-tip-title": \`群组名称 · \${activeRoom.name}\`,
										"data-dsh-tip": \`当前群组说明：\${activeRoom.description || "多账户 Agent 与外部群机器人协同群"}。双击群名可直接在线修改并同步更新标签页标题。\`,
										"data-dsh-tip-tag": "",
										title: "双击修改群组名称",
										onDoubleClick: (e) => {
											e.stopPropagation();
											setNameDraft(activeRoom.name);
											setEditingName(true);
										},
										style: {
											fontSize: 15,
											fontWeight: 650,
											lineHeight: "22px",
											color: "var(--dsw-alias-label-primary)",
											cursor: "pointer",
											userSelect: "none",
											overflow: "hidden",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap"
										},
										children: activeRoom.name
									}),
									(0, react_jsx_runtime.jsx)("span", {
										style: { fontSize: 11.5, lineHeight: "22px", color: "var(--dsw-alias-label-tertiary)" },
										children: "双击头像换图 · 双击群名改名"
									})
								]
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						"data-testid": "group-room-settings-row",
						style: {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 8,
							minHeight: 28,
							flexWrap: "wrap"
						},
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" },
								children: [
									agents.map((ag) => {
										const inRoom = (activeRoom.agentIds || []).includes(ag.id);
										const agStatus = gStore.resolveRoomMemberStatus ? gStore.resolveRoomMemberStatus("agent", ag, activeRoom) : "活跃";
										const specialtyText = Array.isArray(ag.specialties) && ag.specialties.length > 0
											? \`专精领域：\${ag.specialties.join(" / ")}。\`
											: "";
										const roleText = ag.systemPrompt ? \`职责设定：\${ag.systemPrompt}\` : "";
										return (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "dsh-ghub-btn dsh-group-bar-ctrl",
											"data-testid": \`native-mention-chip-\${ag.handle}\`,
											"data-active": inRoom ? "true" : "false",
											"aria-pressed": inRoom,
											"data-dsh-tip-member": "true",
											"data-dsh-tip-title": \`@\${ag.handle} \${ag.name}（\${agStatus}）\`,
											"data-dsh-tip": \`来源：群组（\${activeRoom.name}） · 节点：\${ag.accountLabel || "跨账户节点"} · 模型：\${ag.model || "DeepSeek"}\\n\${specialtyText}\${roleText ? (specialtyText ? "\\n" : "") + roleText : ""}\\n\${inRoom ? "当前已在本群启用：点击可切换该 Agent 在本群的启用状态。" : "当前未在本群启用：点击启用该 Agent 加入本群协同，并在输入框插入 @" + ag.handle + " 点名指令。"}\`,
											"data-dsh-tip-tag": "点击启用 · 来源：群组",
											title: \`@\${ag.handle} \${ag.name} (\${agStatus}) — 点击启用 · 来源：群组\`,
											onClick: () => toggleRoomAgentInBar(ag),
											children: \`@\${ag.handle} \${ag.name}\`
										}, ag.id);
									}),
									connectors.map((conn) => {
										const inRoom = (activeRoom.connectorIds || []).includes(conn.id);
										const botStatus = gStore.resolveRoomMemberStatus ? gStore.resolveRoomMemberStatus("bot", conn, activeRoom) : "活跃";
										const cleanBotName = String(conn.name || "Bot").replace(/\\s*\\([^)]*\\)\\s*$/g, "").trim();
										return (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "dsh-ghub-btn dsh-group-bar-ctrl",
											"data-testid": \`native-bot-chip-\${conn.id}\`,
											"data-active": inRoom ? "true" : "false",
											"aria-pressed": inRoom,
											"data-dsh-tip-member": "true",
											"data-dsh-tip-title": \`Bot · \${cleanBotName}（\${botStatus}）\`,
											"data-dsh-tip": \`来源：群组（\${activeRoom.name}） · 协议：\${conn.productName || conn.platform || "Webhook"}\\nWebhook 路由：/api/superagent-connectors/\${conn.id}/webhook\\n\${inRoom ? "当前已在本群启用：点击可切换该 Bot 在本群的启用状态。" : "当前未在本群启用：点击启用该 Bot 接入本群实时双向消息投递。"}\`,
											"data-dsh-tip-tag": "点击启用 · 来源：群组",
											title: \`\${cleanBotName} (\${botStatus}) — 点击启用 · 来源：群组\`,
											onClick: () => toggleRoomConnectorInBar(conn),
											children: cleanBotName
										}, conn.id);
									}),
									(0, react_jsx_runtime.jsx)("span", {
										style: {
											width: 1,
											height: 16,
											background: "var(--dsw-alias-border-l2, rgba(128,128,128,0.22))",
											margin: "0 2px",
											flexShrink: 0
										}
									}),
									modeOptions.map((m) => {
										const isModeActive = activeRoom.collaborationMode === m.id;
										return (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "dsh-ghub-btn dsh-group-bar-ctrl",
											"data-testid": \`group-mode-btn-\${m.id}\`,
											"data-active": isModeActive ? "true" : "false",
											"aria-pressed": isModeActive,
											"data-dsh-tip-title": m.tipTitle,
											"data-dsh-tip": m.tipDesc,
											"data-dsh-tip-tag": "",
											onClick: () => updateMode(m.id),
											children: m.label
										}, m.id);
									})
								]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" },
								children: [
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "dsh-ghub-btn dsh-group-bar-ctrl",
										"data-testid": "toggle-dsh-teaming-btn",
										"data-active": showTeaming ? "true" : "false",
										"aria-pressed": showTeaming,
										"data-dsh-tip-title": \`多 DSH 跨实例组队联机（邀请码：\${activeRoom.inviteCode}）\`,
										"data-dsh-tip": "点击展开或收起跨 DSH 实例联邦组队面板：可将本群邀请码发给队友，或填入队友 DSH 实例地址与邀请码组建多人多 Agent 联机群聊。",
										"data-dsh-tip-tag": "",
										onClick: () => setShowTeaming((v) => !v),
										children: \`多 DSH 组队 (\${activeRoom.inviteCode})\`
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "dsh-ghub-btn dsh-group-bar-ctrl",
										"data-active": showSyncFeed ? "true" : "false",
										"aria-pressed": showSyncFeed,
										"data-dsh-tip-title": \`群组实时同步消息流（共 \${(activeRoom.messages || []).length} 条）\`,
										"data-dsh-tip": "点击展开或收起本群跨账户 Agent 与飞书、钉钉、企业微信、Telegram 等外部群机器人的实时同步消息预览。",
										"data-dsh-tip-tag": "",
										onClick: () => setShowSyncFeed((v) => !v),
										children: showSyncFeed ? "收起同步消息" : \`同步消息 (\${(activeRoom.messages || []).length})\`
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "dsh-ghub-btn dsh-group-bar-ctrl",
										"data-testid": "open-group-settings-btn",
										"data-active": "false",
										"data-dsh-tip-title": \`群设置 (\${(activeRoom.agentIds || []).length}A·\${(activeRoom.connectorIds || []).length}B)\`,
										"data-dsh-tip": \`该群组目前成员有 \${(activeRoom.agentIds || []).length} Agent \${(activeRoom.connectorIds || []).length} Bot。点击进入群组配置中心，管理跨账户 Agent 节点、外部机器人桥接及协同规则。\`,
										"data-dsh-tip-tag": "",
										onClick: () => globalThis.__dshSelectMainPanel?.("dsh-group-hub"),
										children: \`群设置 (\${(activeRoom.agentIds || []).length}A·\${(activeRoom.connectorIds || []).length}B)\`
									})
								]
							})
						]
					}),
					showTeaming && (0, react_jsx_runtime.jsxs)("div", {
						className: "dsh-ghub-card",
						"data-testid": "dsh-teaming-panel",
						style: { padding: "10px 12px", marginTop: 2 },
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" },
								children: [
									(0, react_jsx_runtime.jsxs)("span", {
										style: { fontSize: 12, fontWeight: 600 },
										children: [
											"多 DSH 实例组队联机 · 本群邀请码: ",
											(0, react_jsx_runtime.jsx)("code", { children: activeRoom.inviteCode })
										]
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "dsh-ghub-btn dsh-group-bar-ctrl",
										"data-dsh-tip-title": "复制本群组队联机口令",
										"data-dsh-tip": "一键复制当前 DSH 实例访问地址与本群专属邀请码，发送给队友即可在对方 DSH 中填入接入本群。",
										"data-dsh-tip-tag": "一键复制",
										onClick: copyTeamInvite,
										children: "复制本群组队口令（发给队友）"
									})
								]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								style: { display: "grid", gridTemplateColumns: "1.3fr 0.8fr 1fr auto", gap: 8, alignItems: "center", marginTop: 4 },
								children: [
									(0, react_jsx_runtime.jsx)("input", {
										className: "dsh-ghub-input",
										style: { height: 32 },
										"data-dsh-tip-title": "队友 DSH 实例 HTTP/HTTPS 地址",
										"data-dsh-tip": "填写队友暴露在局域网、Tailscale 或公网隧道的 DSH 实例地址，群消息将通过联邦 Webhook 自动双向同步。",
										placeholder: "队友 DSH 实例地址（如 https://xxx.run.app 或局域网 IP）",
										value: teamJoin.peerUrl,
										onChange: (e) => setTeamJoin({ ...teamJoin, peerUrl: e.target.value })
									}),
									(0, react_jsx_runtime.jsx)("input", {
										className: "dsh-ghub-input",
										style: { height: 32 },
										"data-dsh-tip-title": "联邦群组邀请码",
										"data-dsh-tip": \`填写目标群组的联邦邀请码（留空则默认使用本群邀请码 \${activeRoom.inviteCode}）。\`,
										placeholder: \`邀请码（默认 \${activeRoom.inviteCode}）\`,
										value: teamJoin.inviteCode,
										onChange: (e) => setTeamJoin({ ...teamJoin, inviteCode: e.target.value })
									}),
									(0, react_jsx_runtime.jsx)("input", {
										className: "dsh-ghub-input",
										style: { height: 32 },
										"data-dsh-tip-title": "队友 Agent 席位名称",
										"data-dsh-tip": "为接入本群的队友 DSH 节点设置显示名称，接入后将自动生成对应的 @handle 点名按钮。",
										placeholder: "队友 Agent 名称（如：队友安全 Agent）",
										value: teamJoin.agentName,
										onChange: (e) => setTeamJoin({ ...teamJoin, agentName: e.target.value })
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "dsh-ghub-btn dsh-ghub-btn-primary",
										style: { height: 32, padding: "0 14px" },
										"data-dsh-tip-title": "立即组队接入本群",
										"data-dsh-tip": "验证邀请码并将队友 DSH 实例注册为本群协同 Agent 席位，立即开启跨实例多人联机协同。",
										"data-dsh-tip-tag": "建立联机",
										onClick: handleJoinPeerDsh,
										children: "立即组队接入"
									})
								]
							}),
							teamNotice && (0, react_jsx_runtime.jsx)("div", {
								style: { fontSize: 11.5, color: "var(--dsw-alias-brand-primary, #4d6bfe)" },
								children: teamNotice
							})
						]
					}),
					showSyncFeed && (0, react_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 6,
							maxHeight: 180,
							overflowY: "auto",
							paddingTop: 4
						},
						children: (activeRoom.messages || []).slice(-6).map((msg) => (0, react_jsx_runtime.jsxs)("div", {
							style: {
								fontSize: 12,
								padding: "5px 10px",
								borderRadius: 8,
								background: "var(--dsw-alias-bg-layer-2, rgba(128,128,128,0.06))"
							},
							children: [
								(0, react_jsx_runtime.jsxs)("div", {
									style: { display: "flex", justifyContent: "space-between", gap: 8 },
									children: [
										(0, react_jsx_runtime.jsxs)("strong", {
											children: [msg.senderName, " · ", msg.senderBadge]
										}),
										(0, react_jsx_runtime.jsx)("span", {
											style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)" },
											children: new Date(msg.createdAt).toLocaleTimeString()
										})
									]
								}),
								(0, react_jsx_runtime.jsx)("div", {
									style: { whiteSpace: "pre-wrap", color: "var(--dsw-alias-label-primary)" },
									children: msg.text
								})
							]
						}, msg.id))
					})
				]
			});
		}`;

  if (content.includes('function DshGroupRoomNativeBar(')) {
    content = content.replace(
      /\t\tfunction DshGroupRoomNativeBar\(\{ sessionId \}\) \{[\s\S]*?\n\t\t\}\n\t\tfunction HeroShell\(/,
      `${groupRoomNativeBarCode}\n\t\tfunction HeroShell(`,
    );
  } else {
    content = content.replace(
      '\t\tfunction HeroShell(',
      `${groupRoomNativeBarCode}\n\t\tfunction HeroShell(`,
    );
  }

  content = content.replace(
    /children: \[(?:\(0, react_jsx_runtime\.jsx\)\(DshGroupRoomNativeBar, \{ sessionId \}\), )?\(0, react_jsx_runtime\.jsxs\)\("div", \{\n\t\t\t\t\tclassName: ConversationRoot_module_css_default\.scrollBody,\n\t\t\t\t\t"data-conversation-scroll": "",\n\t\t\t\t\tchildren: \[(?:\(0, react_jsx_runtime\.jsx\)\(DshGroupRoomNativeBar, \{ sessionId \}\), )?sessionId === void 0 \? null : \(0, react_jsx_runtime\.jsx\)\(Views, \{\}\), composerSeat\]\n\t\t\t\t\}\), (?:\(0, react_jsx_runtime\.jsx\)\(SshServerTelemetryDrawer, \{ sessionId \}\), )?\(0, react_jsx_runtime\.jsx\)\(WidthControls, \{/,
    `children: [(0, react_jsx_runtime.jsx)(DshGroupRoomNativeBar, { sessionId }), (0, react_jsx_runtime.jsxs)("div", {\n\t\t\t\t\tclassName: ConversationRoot_module_css_default.scrollBody,\n\t\t\t\t\t"data-conversation-scroll": "",\n\t\t\t\t\tchildren: [sessionId === void 0 ? null : (0, react_jsx_runtime.jsx)(Views, {}), composerSeat]\n\t\t\t\t}), (0, react_jsx_runtime.jsx)(SshServerTelemetryDrawer, { sessionId }), (0, react_jsx_runtime.jsx)(WidthControls, {`,
  );

  // 9. Inject SshComposerControl right after permission & plan in InputBar modes
  content = content.replace(
    /className: InputBar_module_css_default\.modes,\n\t\t\t\t\t\t\t\t\t\t\tchildren: \[sessionId === void 0 \? null : renderSlot\("conversation\.input\.permission", \{ locked \}\), sessionId === void 0 \? null : renderSlot\("conversation\.input\.plan", \{ locked \}\)(?:, sessionId === void 0 \? null : \(0, react_jsx_runtime\.jsx\)\(SshComposerControl, \{ sessionId, locked \}\))?\]/,
    `className: InputBar_module_css_default.modes,\n\t\t\t\t\t\t\t\t\t\t\tchildren: [sessionId === void 0 ? null : renderSlot("conversation.input.permission", { locked }), sessionId === void 0 ? null : renderSlot("conversation.input.plan", { locked }), sessionId === void 0 ? null : (0, react_jsx_runtime.jsx)(SshComposerControl, { sessionId, locked })]`,
  );

  // 10. Guard InputHub passive queries against transient sessions service unavailability
  content = content.replace(
    /canPickFiles\(id\) \{\n\t\t\t\tconst binding = this\.(?:sessions\(\)|rootCtx\.get\("sessions"\)\?)\.binding\(id\);\n\t\t\t\treturn binding !== void 0 && this\.shells\.get\(binding\)\?\.canPickFiles\(\) === true;\n\t\t\t\}/,
    `canPickFiles(id) {\n\t\t\t\tconst binding = this.rootCtx.get("sessions")?.binding(id);\n\t\t\t\treturn binding !== void 0 && this.shells.get(binding)?.canPickFiles() === true;\n\t\t\t}`,
  );
  content = content.replace(
    /pickFiles\(id\) \{\n\t\t\t\tconst binding = this\.(?:sessions\(\)|rootCtx\.get\("sessions"\)\?)\.binding\(id\);\n\t\t\t\tif \(binding !== void 0\) this\.shells\.get\(binding\)\?\.pickFiles\(\);\n\t\t\t\}/,
    `pickFiles(id) {\n\t\t\t\tconst binding = this.rootCtx.get("sessions")?.binding(id);\n\t\t\t\tif (binding !== void 0) this.shells.get(binding)?.pickFiles();\n\t\t\t}`,
  );
  content = content.replace(
    /inputTriggers\(id\) \{\n\t\t\t\tconst binding = this\.(?:sessions\(\)|rootCtx\.get\("sessions"\)\?)\.binding\(id\);\n\t\t\t\treturn binding === void 0 \? void 0 : this\.controller\(binding\.ctx\);\n\t\t\t\}/,
    `inputTriggers(id) {\n\t\t\t\tconst binding = this.rootCtx.get("sessions")?.binding(id);\n\t\t\t\treturn binding === void 0 ? void 0 : this.controller(binding.ctx);\n\t\t\t}`,
  );
  content = content.replace(
    /controller\(actx\) \{\n\t\t\t\tif \(this\.(?:sessions\(\)|rootCtx\.get\("sessions"\)\?)\.sessionOf\(actx\) === void 0\) return void 0;\n\t\t\t\treturn this\.rootCtx\.get\("inputTriggers"\)\?\.sessionOf\(actx\);\n\t\t\t\}\n\t\t\tpopup\(actx\) \{\n\t\t\t\tif \(this\.(?:sessions\(\)|rootCtx\.get\("sessions"\)\?)\.sessionOf\(actx\) === void 0\) return void 0;\n\t\t\t\treturn this\.rootCtx\.get\("commandUi"\)\?\.popupFor\(actx\);\n\t\t\t\}/,
    `controller(actx) {\n\t\t\t\tif (this.rootCtx.get("sessions")?.sessionOf(actx) === void 0) return void 0;\n\t\t\t\treturn this.rootCtx.get("inputTriggers")?.sessionOf(actx);\n\t\t\t}\n\t\t\tpopup(actx) {\n\t\t\t\tif (this.rootCtx.get("sessions")?.sessionOf(actx) === void 0) return void 0;\n\t\t\t\treturn this.rootCtx.get("commandUi")?.popupFor(actx);\n\t\t\t}`,
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function patchWorkspaceClient(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-client-ui-workspace',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update owningGroupKey
  content = content.replace(
    /function owningGroupKey\(workspaces, sessionId\) \{[\s\S]*?\n\t\t\}/,
    `function owningGroupKey(workspaces, sessionId) {
			return workspaces.find((workspace) => workspace.sessionIds.includes(sessionId))?.workspaceId ?? "";
		}`,
  );

  // 2. Update orderByRecency so sidebar workspace sessions match creation order 1-to-1
  content = content.replace(
    /function orderByRecency\(sessionIds, summaries\) \{[\s\S]*?\n\t\t\}/,
    `function orderByRecency(sessionIds, summaries) {\n\t\t\treturn [...sessionIds].reverse().filter((id) => summaries[id] !== void 0);\n\t\t}`,
  );

  // 3. Update pinCurrentBlank, sessionVisible, sectionMembers, sessionTitle, groupByWorkspace
  content = content.replace(
    /function pinCurrentBlank\(order, [A-Za-z0-9_]+\) \{[\s\S]*?\n\t\t\}/,
    `function pinCurrentBlank(order, _currentBlank) {\n\t\t\treturn [...order];\n\t\t}`,
  );

  content = content.replace(
    /function sessionVisible\(session, [A-Za-z0-9_]+, archived, archivedFilter\) \{[\s\S]*?\n\t\t\}/,
    `function sessionVisible(session, _current, archived, archivedFilter) {
			if (session.origin === "subagent") return false;
			if (globalThis.__dshGroupHubStore?.getRoomForSession?.(session.id)) return false;
			const tabStore = globalThis.__dshBrowserTabsStore;
			if (tabStore) {
				if (tabStore.closedIds.has(session.id)) return archivedFilter === "show" || archivedFilter === "only";
				if (tabStore.noTabsHomeMode && (session.id === tabStore.homeStandbySessionId || session.blank)) {
					return false;
				}
			}
			switch (archivedFilter) {
				case "default": return !archived.has(session.id);
				case "show": return true;
				case "only": return archived.has(session.id);
				default: return assertNever$1(archivedFilter);
			}
		}`,
  );

  content = content.replace(
    /function sectionMembers\(members, pinned, archived\) \{[\s\S]*?\n\t\t\}/,
    `function sectionMembers(members, pinned, archived) {
			const leading = [];
			const rest = [];
			for (const member of members) if (!archived.has(member.id) && pinned.has(member.id)) leading.push(member);
			else rest.push(member);
			return [
				...leading,
				...rest
			];
		}`,
  );

  content = content.replace(
    /function sessionTitle\(session\) \{[\s\S]*?\n\t\t\}/,
    `function sessionTitle(session) {
			const custom = globalThis.__dshBrowserTabsStore?.getCustomTitle?.(session.id);
			if (custom) return custom;
			return session.title?.trim() || (session.blank ? "" : "");
		}`,
  );

  content = content.replace(
    /function groupByWorkspace\(list, workspaces, archived, archivedFilter, ungroupedOrder\) \{[\s\S]*?\n\t\t\}/,
    `function groupByWorkspace(list, workspaces, archived, archivedFilter, ungroupedOrder) {
			const current = mainSessionId(list);
			const groups = [];
			const accounted = /* @__PURE__ */ new Set();
			const explicitIds = new Set(workspaces.flatMap((w) => w.sessionIds));
			for (const workspace of workspaces) {
				const members = [];
				const extraIds = list.ids.filter((id) => !explicitIds.has(id) && list.byId[id]?.cwd === workspace.path);
				const candidateIds = [...workspace.sessionIds, ...extraIds];
				for (const id of candidateIds) {
					const summary = list.byId[id];
					if (summary === void 0 || accounted.has(id)) continue;
					accounted.add(id);
					if (!sessionVisible(summary, current, archived, archivedFilter)) continue;
					members.push(summary);
				}
				if (archivedFilter === "only" && members.length === 0) continue;
				groups.push(buildGroup(workspace.workspaceId, workspace.workspaceId, workspace.path, Date.parse(workspace.createdAt), workspace.title, members));
			}
			const wsPaths = new Set(workspaces.map((w) => w.path));
			const stray = list.ids.map((id) => list.byId[id]).filter((s) => s !== void 0 && !s.blank && !accounted.has(s.id) && !wsPaths.has(s.cwd) && sessionVisible(s, current, archived, archivedFilter));
			if (stray.length > 0) groups.push(buildGroup("", void 0, void 0, void 0, "", orderedUngrouped(stray, ungroupedOrder, list.byId)));
			return groups;
		}`,
  );

  // 4. Disable AnimatedRows flash in SessionTree and FlatList & subscribe WorkspaceBrowser to tabStore
  content = content.replace(
    'ready: list.phase === "ready" && workspaceReady && !nativeDragActive,',
    'ready: false,',
  );
  content = content.replace(
    'ready: list.phase === "ready" && workspaceReady && drag === null,',
    'ready: false,',
  );

  content = content.replace(
    /(?:const tabStoreRev = [\s\S]*?void tabStoreRev;\n\t\t\t)?const ungroupedMemberIds = \(0, react\.useMemo\)\(\(\) => \{[\s\S]*?\}, \[list, workspaces(?:, tabStoreRev)?\]\);/,
    `const tabStoreRev = (0, react.useSyncExternalStore)(
				(cb) => globalThis.__dshBrowserTabsStore?.subscribe ? globalThis.__dshBrowserTabsStore.subscribe(cb) : () => {},
				() => globalThis.__dshBrowserTabsStore?.getSnapshot ? globalThis.__dshBrowserTabsStore.getSnapshot() : 0
			);
			void tabStoreRev;
			const ungroupedMemberIds = (0, react.useMemo)(() => {
				const accounted = new Set(workspaces.flatMap((workspace) => workspace.sessionIds));
				const wsPaths = new Set(workspaces.map((workspace) => workspace.path));
				return list.ids.filter((id) => {
					const s = list.byId[id];
					return s !== void 0 && !s.blank && !accounted.has(id) && !wsPaths.has(s.cwd);
				});
			}, [list, workspaces, tabStoreRev]);`,
  );

  content = content.replace(
    /const orderedWorkspaces = \(0, react\.useMemo\)\(\(\) => workspaces\.map\(\(workspace\) => \{\n\t\t\t\tconst memberIds = workspace\.sessionIds;/,
    `const orderedWorkspaces = (0, react.useMemo)(() => {
				const explicitWsIds = new Set(workspaces.flatMap((w) => w.sessionIds));
				return workspaces.map((workspace) => {
				const extraIds = list.ids.filter((id) => !explicitWsIds.has(id) && list.byId[id]?.cwd === workspace.path);
				const memberIds = [...extraIds.reverse(), ...workspace.sessionIds];`,
  );

  content = content.replace(
    /\t\t\t\}\), \[\n\t\t\t\tcurrentBlank,\n\t\t\t\tlist\.byId,\n\t\t\t\torderBy,\n\t\t\t\torderState,\n\t\t\t\tsessionOrderByAccount,\n\t\t\t\tworkspaces\n\t\t\t\]\);/,
    `\t\t\t});
			}, [
				currentBlank,
				list.byId,
				list.ids,
				orderBy,
				orderState,
				sessionOrderByAccount,
				workspaces,
				tabStoreRev
			]);`,
  );

  // 5. Update connectBlank, createInWorkspace, startSession, archiveSession, clearArchivedCurrent, clearMain, replaceMain, renameSession
  content = content.replace(
    /async connectBlank\(workspaceId, reuse(?: = \{\})?\) \{[\s\S]*?\n\t\t\t\}/,
    `async connectBlank(workspaceId, reuse = {}) {
				const workspace = this.workspaces.list.getSnapshot().items.find((item) => item.workspaceId === workspaceId);
				if (workspace === void 0) throw new Error(\`uiWorkspace.connectWorkspace: unknown workspace \${workspaceId}\`);
				if (reuse?.reuseBlank !== false) {
					const inflight = this.connecting.get(workspaceId);
					if (inflight !== void 0 && inflight.agentPreset === reuse?.agentPreset) return inflight.attempt;
				}
				const attempt = this.createInWorkspace(workspace, reuse).finally(() => {
					if (this.connecting.get(workspaceId)?.attempt === attempt) this.connecting.delete(workspaceId);
				});
				if (reuse?.reuseBlank !== false) {
					this.connecting.set(workspaceId, {
						agentPreset: reuse?.agentPreset,
						attempt
					});
				}
				return attempt;
			}`,
  );

  content = content.replace(
    /createInWorkspace\(workspace, options(?: = \{\})?\) \{[\s\S]*?\n\t\t\t\}/,
    `createInWorkspace(workspace, options = {}) {
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
				}).then((sessionId) => {
					globalThis.__dshBrowserTabsStore?.resolveOptimisticTab?.(sessionId);
					return sessionId;
				});
			}`,
  );

  content = content.replace(
    /const target = workspaceId \?\? currentWorkspaceId \?\? recent(?:\s*\?\?\s*workspace\.items\[0\]\?\.workspaceId)?;/,
    'const target = workspaceId ?? currentWorkspaceId ?? recent ?? workspace.items[0]?.workspaceId;',
  );

  content = content.replace(
    'this.prepareDraft(binding, draftOptions);\n\t\t\t\t} : void 0, agentPreset === void 0 ? {} : { agentPreset }).catch((reason) => {',
    'this.prepareDraft(binding, draftOptions);\n\t\t\t\t} : void 0, {\n\t\t\t\t\t...agentPreset === void 0 ? {} : { agentPreset },\n\t\t\t\t\treuseBlank: false\n\t\t\t\t}).catch((reason) => {',
  );

  content = content.replace(
    /async archiveSession\(sessionId, options = \{\}\) \{[\s\S]*?\n\t\t\t\}/,
    `async archiveSession(sessionId, options = {}) {
				globalThis.__dshBrowserTabsStore?.closedIds?.add(sessionId);
				globalThis.__dshBrowserTabsStore?.emit?.();
				await this.workspaces.archiveSession(sessionId, options);
			}`,
  );

  content = content.replace(
    /async unarchiveSession\(sessionId\) \{[\s\S]*?\n\t\t\t\}/,
    `async unarchiveSession(sessionId) {
				globalThis.__dshBrowserTabsStore?.closedIds?.delete(sessionId);
				if (globalThis.__dshBrowserTabsStore) {
					globalThis.__dshBrowserTabsStore.noTabsHomeMode = false;
					globalThis.__dshBrowserTabsStore.emit?.();
				}
				await this.workspaces.unarchiveSession(sessionId);
			}`,
  );

  content = content.replace(
    /clearArchivedCurrent\(\) \{[\s\S]*?\n\t\t\t\}/,
    `clearArchivedCurrent() {
				const current = this.mainReference?.sessionId;
				const wsSnap = this.workspaces.list.getSnapshot();
				if (current === void 0 || !wsSnap.archivedSessionIds.includes(current)) return false;
				this.clearMain();
				const tabStore = globalThis.__dshBrowserTabsStore;
				if (tabStore?.noTabsHomeMode) {
					if (tabStore.homeStandbySessionId && !wsSnap.archivedSessionIds.includes(tabStore.homeStandbySessionId)) {
						this.openSession(tabStore.homeStandbySessionId);
					} else {
						tabStore.homeStandbySessionId = void 0;
						if (!tabStore.awaitingStandbySession) {
							tabStore.awaitingStandbySession = true;
							this.startSession();
						}
					}
					return true;
				}
				const sessSnap = this.sessions.list.getSnapshot();
				const archivedSet = new Set(wsSnap.archivedSessionIds);
				const closedSet = tabStore?.closedIds ?? new Set();
				const remaining = sessSnap.ids.filter((id) => id !== current && !archivedSet.has(id) && !closedSet.has(id) && sessSnap.byId[id]?.origin !== "subagent");
				if (remaining.length > 0) {
					this.openSession(remaining[remaining.length - 1]);
				} else {
					if (tabStore) {
						tabStore.noTabsHomeMode = true;
						tabStore.awaitingStandbySession = true;
						tabStore.emit();
					}
					this.startSession();
				}
				return true;
			}`,
  );

  content = content.replace(
    /clearMain\(\) \{[\s\S]*?\n\t\t\t\}/,
    `clearMain() {
				const previous = this.mainReference;
				this.mainReference = void 0;
				globalThis.__dshMainRetainedSessionId = void 0;
				this.selection.set({});
				previous?.release();
				globalThis.__dshPublishMain?.();
				this.ctx.layout.selectPanel(null);
			}`,
  );

  content = content.replace(
    /replaceMain\(target, signal, panel, beforeOpen\) \{[\s\S]*?\n\t\t\t\}/,
    `replaceMain(target, signal, panel, beforeOpen) {
				signal.throwIfAborted();
				const reference = this.sessions.retain(target, { source: "mainView" });
				try {
					signal.throwIfAborted();
					globalThis.__dshBrowserTabsStore?.resolveOptimisticTab?.(reference.sessionId);
					globalThis.__dshGroupHubStore?.syncActiveTabSession?.(reference.sessionId);
					beforeOpen?.(reference.sessionId);
					if (signal.aborted) {
						reference.release();
						return;
					}
					const subagentAddress = typeof target === "string" ? this.sessions.subagentAddress(reference.sessionId) : target;
					this.selection.set({
						sessionId: reference.sessionId,
						...subagentAddress === void 0 ? {} : { subagentAddress }
					});
				} catch (error) {
					reference.release();
					throw error;
				}
				const previous = this.mainReference;
				this.mainReference = reference;
				globalThis.__dshMainRetainedSessionId = reference.sessionId;
				previous?.release();
				globalThis.__dshPublishMain?.();
				if (panel === "reveal") this.ctx.layout.selectPanel(null);
			}`,
  );

  content = content.replace(
    /const renameSession = async \(sessionId, title\) => \{[\s\S]*?\n\t\t\t\};/,
    `const renameSession = async (sessionId, title) => {
				globalThis.__dshBrowserTabsStore?.setCustomTitle?.(sessionId, title);
				const result = await sessions.using(sessionId, { source: "workspaceOperation" }, (reference) => reference.binding.session.rename(title));
				if (!result.ok) throw new Error(result.error.message);
			};`,
  );

  content = content.replace(
    /startSession: \(workspaceId, options\) => \{\n(?:\t*if \(globalThis\.__dshBrowserTabsStore\) \{[\s\S]*?\}\n)?(?:\t*globalThis\.__dshGroupHubStore\?\.leaveGroupRoom\?\.\(\);\n)?\t*uiWorkspace\.startSession\(workspaceId, options\);\n\t*\}/,
    `startSession: (workspaceId, options) => {
					globalThis.__dshGroupHubStore?.leaveGroupRoom?.();
					if (globalThis.__dshCreateNewTab && (!options || (!options.draft && !options.agentPreset))) {
						globalThis.__dshCreateNewTab(void 0, { workspaceId });
						return;
					}
					if (globalThis.__dshBrowserTabsStore) {
						globalThis.__dshBrowserTabsStore.noTabsHomeMode = false;
						globalThis.__dshBrowserTabsStore.awaitingStandbySession = false;
						globalThis.__dshBrowserTabsStore.emit?.();
					}
					uiWorkspace.startSession(workspaceId, options);
				}`,
  );

  // 6. Expose globalThis.__dshSelectMainPanel and inject 自动化任务 + 群组 (Groups) with all rooms directly below 默认工作区
  if (!content.includes('globalThis.__dshSelectMainPanel =')) {
    content = content.replace(
      'ctx.slots.inject("sidebar.workspaces", () => ctx.slots.register({',
      `globalThis.__dshSelectMainPanel = (panelId) => {
				try {
					ctx.layout.selectPanel(panelId);
				} catch (_e) {}
			};
			ctx.slots.inject("sidebar.workspaces", () => ctx.slots.register({`,
    );
  }

  const workspaceGroupsSectionCode = `		function getDshGroupHubStore() {
			if (!globalThis.__dshGroupHubStore) {
				const st = {
					rev: 0,
					rooms: [],
					agents: [],
					connectors: [],
					busyAgentIds: new Set(),
					busyConnectorIds: new Set(),
					activeRoomId: "room-core-collab",
					activeRoomMode: false,
					roomSessionMap: {},
					sessionRoomMap: {},
					groupExpanded: true,
					showAddRoom: false,
					loaded: false,
					loading: false,
					listeners: new Set(),
					bindSessionToRoom(sessionId, roomId) {
						if (!sessionId || !roomId) return;
						const prevSid = st.roomSessionMap[roomId];
						if (prevSid && prevSid !== sessionId && String(prevSid).startsWith("__opt_tab_")) {
							delete st.sessionRoomMap[prevSid];
						}
						st.roomSessionMap[roomId] = sessionId;
						st.sessionRoomMap[sessionId] = roomId;
						st.emit();
					},
					unbindSession(sessionId) {
						if (!sessionId) return;
						const roomId = st.sessionRoomMap[sessionId];
						if (roomId) {
							delete st.sessionRoomMap[sessionId];
							if (st.roomSessionMap[roomId] === sessionId) {
								delete st.roomSessionMap[roomId];
							}
							st.emit();
						}
					},
					getRoomForSession(sessionId) {
						if (!sessionId) return null;
						return st.sessionRoomMap[sessionId] || null;
					},
					syncActiveTabSession(sessionId) {
						const roomId = sessionId ? st.getRoomForSession(sessionId) : null;
						if (roomId) {
							const changed = !st.activeRoomMode || st.activeRoomId !== roomId;
							st.activeRoomId = roomId;
							st.activeRoomMode = true;
							if (changed) {
								st.emit();
								fetch("/api/superagent-groups/active-room", {
									method: "POST",
									headers: { "content-type": "application/json" },
									body: JSON.stringify({ roomId })
								}).catch(() => {});
							}
						} else if (st.activeRoomMode) {
							st.activeRoomMode = false;
							st.emit();
							fetch("/api/superagent-groups/active-room", {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({ roomId: null })
							}).catch(() => {});
						}
					},
					resolveRoomMemberStatus(kind, member, rm) {
						if (!member) return "失去联系";
						if (
							member.enabled === false ||
							member.status === "offline" ||
							member.connectionStatus === "disconnected" ||
							member.stats?.lastStatus === "error" ||
							member.stats?.lastStatus === "paused"
						) {
							return "失去联系";
						}
						if (
							(kind === "agent" && st.busyAgentIds.has(member.id)) ||
							(kind === "bot" && st.busyConnectorIds.has(member.id)) ||
							member.status === "busy" ||
							member.runtimeState === "working"
						) {
							return "爆发小宇宙";
						}
						const msgs = Array.isArray(rm?.messages) ? rm.messages : [];
						const rounds = [];
						let curRound = [];
						for (const m of msgs) {
							const isPrompt = m.relayHop === 0 || m.senderType === "human" || m.senderType === "external_bot" || m.senderType === "schedule";
							if (isPrompt && curRound.length > 0) {
								rounds.push(curRound);
								curRound = [m];
							} else {
								curRound.push(m);
							}
						}
						if (curRound.length > 0) rounds.push(curRound);
						const effectiveRounds = rounds.length >= 3 ? rounds.slice(-3) : (msgs.length >= 3 ? msgs.slice(-3).map((m) => [m]) : []);
						if (effectiveRounds.length >= 3) {
							if (kind === "agent") {
								const replied = effectiveRounds.some((r) => r.some((m) => m.senderId === member.id));
								if (!replied) return "休眠";
							} else {
								const active = effectiveRounds.some((r) =>
									r.some(
										(m) =>
											m.senderId === member.id ||
											(Array.isArray(m.broadcastReceipts) &&
												m.broadcastReceipts.some((rc) => rc.connectorId === member.id && rc.status !== "failed"))
									)
								);
								if (!active) return "休眠";
							}
						}
						return "活跃";
					},
					buildRoomMemberColumns(rm) {
						if (!rm) return { leftText: "", rightText: "", agentCount: 0, botCount: 0 };
						const roomAgents = (st.agents || []).filter((a) => (rm.agentIds || []).includes(a.id));
						const roomBots = (st.connectors || []).filter((c) => (rm.connectorIds || []).includes(c.id));
						const leftLines = roomAgents.map((a) => {
							const status = st.resolveRoomMemberStatus("agent", a, rm);
							return \`@\${a.handle} \${a.name}（\${status}）\`;
						});
						const rightLines = roomBots.map((c) => {
							const status = st.resolveRoomMemberStatus("bot", c, rm);
							const cleanName = String(c.name || "Bot").replace(/\\s*\\([^)]*\\)\\s*$/g, "").trim();
							return \`\${cleanName}（\${status}）\`;
						});
						return {
							leftText: leftLines.join("\\n"),
							rightText: rightLines.join("\\n"),
							agentCount: (rm.agentIds || []).length,
							botCount: (rm.connectorIds || []).length
						};
					},
					emit() {
						st.rev++;
						st.listeners.forEach((fn) => {
							try {
								fn();
							} catch (_e) {}
						});
					},
					subscribe(fn) {
						st.listeners.add(fn);
						return () => st.listeners.delete(fn);
					},
					getSnapshot() {
						return st.rev;
					},
					setActiveRoom(roomId) {
						st.activeRoomId = roomId;
						st.emit();
					},
					async renameRoom(roomId, newName, currentSessionId) {
						const trimmed = (newName ?? "").trim();
						if (!trimmed) return;
						const resp = await fetch(\`/api/superagent-groups/rooms/\${encodeURIComponent(roomId)}\`, {
							method: "PUT",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({ name: trimmed })
						});
						const data = await resp.json();
						if (data.ok) {
							st.updateFromApi({ ok: true, rooms: data.rooms || [] });
							const sid = st.roomSessionMap[roomId] || currentSessionId;
							if (sid) {
								globalThis.__dshBrowserTabsStore?.setCustomTitle?.(sid, trimmed);
							}
						}
					},
					async uploadRoomAvatarFile(roomId, file) {
						if (!file) return;
						const dataUrl = await new Promise((resolve) => {
							const reader = new FileReader();
							reader.onload = () => {
								const img = new Image();
								img.onload = () => {
									const maxDim = 96;
									const scale = Math.min(1, maxDim / Math.max(1, img.naturalWidth), maxDim / Math.max(1, img.naturalHeight));
									const w = Math.max(1, Math.round(img.naturalWidth * scale));
									const h = Math.max(1, Math.round(img.naturalHeight * scale));
									const canvas = document.createElement("canvas");
									canvas.width = w;
									canvas.height = h;
									const ctx2d = canvas.getContext("2d");
									if (ctx2d) {
										ctx2d.imageSmoothingEnabled = true;
										ctx2d.imageSmoothingQuality = "high";
										ctx2d.drawImage(img, 0, 0, w, h);
										resolve(canvas.toDataURL("image/png"));
									} else {
										resolve(String(reader.result || ""));
									}
								};
								img.onerror = () => resolve(String(reader.result || ""));
								img.src = String(reader.result || "");
							};
							reader.onerror = () => resolve("");
							reader.readAsDataURL(file);
						});
						if (!dataUrl) return;
						const resp = await fetch(\`/api/superagent-groups/rooms/\${encodeURIComponent(roomId)}\`, {
							method: "PUT",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({ avatarUrl: dataUrl })
						});
						const data = await resp.json();
						if (data.ok) {
							st.updateFromApi({ ok: true, rooms: data.rooms || [] });
						}
					},
					enterGroupRoom(roomId, navHelpers) {
						st.activeRoomId = roomId;
						st.activeRoomMode = true;
						st.emit();
						fetch("/api/superagent-groups/active-room", {
							method: "POST",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({ roomId })
						}).catch(() => {});
						globalThis.__dshSelectMainPanel?.(null);
						if (navHelpers) {
							const { workspaces, startSession, open, list } = navHelpers;
							const rm = (st.rooms || []).find((r) => r.id === roomId);
							const title = rm ? rm.name : "群组协同会话";
							const tabStore = globalThis.__dshBrowserTabsStore;
							const mappedSid = st.roomSessionMap[roomId];
							if (mappedSid && !tabStore?.closedIds?.has(mappedSid)) {
								if (list?.byId?.[mappedSid]) {
									st.bindSessionToRoom(mappedSid, roomId);
									if (tabStore) {
										tabStore.noTabsHomeMode = false;
										tabStore.optimisticActiveId = void 0;
										tabStore.setCustomTitle?.(mappedSid, title);
										tabStore.emit?.(true);
									}
									open?.(mappedSid);
									return;
								}
								if (tabStore?.optimisticTabs?.has(mappedSid)) {
									tabStore.noTabsHomeMode = false;
									tabStore.optimisticActiveId = mappedSid;
									tabStore.setCustomTitle?.(mappedSid, title);
									tabStore.emit?.(true);
									return;
								}
							}
							const defaultWsId = workspaces?.[0]?.workspaceId;
							if (tabStore?.noTabsHomeMode) {
								const standbyId = tabStore.homeStandbySessionId;
								if (standbyId && list?.byId?.[standbyId] && !st.getRoomForSession(standbyId)) {
									st.bindSessionToRoom(standbyId, roomId);
									tabStore.noTabsHomeMode = false;
									tabStore.homeStandbySessionId = void 0;
									tabStore.awaitingStandbySession = false;
									if (!tabStore.order.includes(standbyId)) tabStore.order.push(standbyId);
									tabStore.optimisticActiveId = void 0;
									tabStore.setCustomTitle?.(standbyId, title);
									tabStore.emit?.(true);
									open?.(standbyId);
									return;
								}
							}
							if (globalThis.__dshCreateNewTab) {
								globalThis.__dshCreateNewTab(void 0, {
									title,
									roomId,
									workspaceId: defaultWsId
								});
								return;
							}
							if (defaultWsId && startSession) {
								startSession(defaultWsId);
							}
						}
					},
					async createRoomInSidebar(navHelpers) {
						st.groupExpanded = true;
						st.emit();
						const existingNames = new Set((st.rooms || []).map((r) => r.name));
						let idx = (st.rooms || []).length + 1;
						let defaultName = \`新建协同群 \${idx}\`;
						while (existingNames.has(defaultName)) {
							idx += 1;
							defaultName = \`新建协同群 \${idx}\`;
						}
						try {
							const resp = await fetch("/api/superagent-groups/rooms", {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({
									name: defaultName,
									description: "多账户 Agent 与外部群机器人协同群",
									collaborationMode: "auto_relay",
									maxRelayHops: 2,
									agentIds: (st.agents || []).map((a) => a.id),
									connectorIds: (st.connectors || []).map((c) => c.id)
								})
							});
							const data = await resp.json();
							if (data.ok && data.room) {
								st.updateFromApi({ ok: true, rooms: data.rooms || [] });
								st.enterGroupRoom(data.room.id, navHelpers);
								return data.room;
							}
						} catch (_e) {}
						return null;
					},
					leaveGroupRoom() {
						if (!st.activeRoomMode) return;
						st.activeRoomMode = false;
						st.emit();
						fetch("/api/superagent-groups/active-room", {
							method: "POST",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({ roomId: null })
						}).catch(() => {});
					},
					setGroupExpanded(expanded) {
						st.groupExpanded = expanded;
						st.emit();
					},
					setShowAddRoom(open) {
						st.showAddRoom = open;
						st.emit();
					},
					updateFromApi(data) {
						if (!data || !data.ok) return;
						if (Array.isArray(data.agents)) st.agents = data.agents;
						if (Array.isArray(data.rooms)) {
							st.rooms = data.rooms;
							if (st.rooms.length > 0 && !st.rooms.some((r) => r.id === st.activeRoomId)) {
								st.activeRoomId = st.rooms[0].id;
							}
						}
						if (Array.isArray(data.connectors)) st.connectors = data.connectors;
						st.loaded = true;
						st.emit();
					},
					async load() {
						if (st.loading) return;
						st.loading = true;
						try {
							const resp = await fetch("/api/superagent-groups");
							if (resp.ok) {
								const data = await resp.json();
								st.updateFromApi(data);
							}
						} catch (_e) {
						} finally {
							st.loading = false;
						}
					}
				};
				globalThis.__dshGroupHubStore = st;
			}
			return globalThis.__dshGroupHubStore;
		}
		function DshWorkspaceGroupsAndScheduleSection({ usePanelInfo, workspaces, startSession, open, list }) {
			const store = getDshGroupHubStore();
			const rev = (0, react.useSyncExternalStore)(store.subscribe, store.getSnapshot);
			void rev;
			const [editingRoomId, setEditingRoomId] = (0, react.useState)(null);
			const [editingRoomName, setEditingRoomName] = (0, react.useState)("");
			const [avatarTargetRoomId, setAvatarTargetRoomId] = (0, react.useState)(null);
			const sidebarAvatarInputRef = (0, react.useRef)(null);

			(0, react.useEffect)(() => {
				if (!store.loaded) store.load();
			}, [store]);
			const activePanelId = usePanelInfo ? usePanelInfo((info) => info.activePanelId) : null;
			const isScheduleActive = activePanelId === "schedules";
			const isGroupHubActive = activePanelId === "dsh-group-hub";
			const isMainChatActive = activePanelId === null;
			const rooms = store.rooms || [];
			const groupExpanded = store.groupExpanded;

			const commitSidebarRoomRename = async (roomId, val) => {
				setEditingRoomId(null);
				const trimmed = (val ?? "").trim();
				if (!trimmed) return;
				await store.renameRoom?.(roomId, trimmed);
			};

			const onSidebarAvatarChange = async (e) => {
				const file = e.target.files?.[0];
				e.target.value = "";
				if (!file || !avatarTargetRoomId) return;
				await store.uploadRoomAvatarFile?.(avatarTargetRoomId, file);
			};

			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
				children: [
					(0, react_jsx_runtime.jsx)("input", {
						ref: sidebarAvatarInputRef,
						type: "file",
						accept: "image/*",
						style: { display: "none" },
						onChange: onSidebarAvatarChange
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: WorkspaceBrowser_module_css_default.groupSection,
						"data-testid": "workspace-automation-section",
						children: (0, react_jsx_runtime.jsxs)("div", {
							role: "treeitem",
							tabIndex: 0,
							"data-testid": "workspace-automation-row",
							"data-dsh-tip-title": "自动化任务 (Schedules)",
							"data-dsh-tip": "点击进入定时与事件驱动自动化任务面板，配置周期性巡检、自动构建与无人值守 Agent 作业。",
							"data-dsh-tip-tag": isScheduleActive ? "当前面板" : "点击进入",
							"aria-selected": isScheduleActive,
							className: clsx(Rows_module_css_default.projectRow, isScheduleActive && Rows_module_css_default.selected),
							onClick: () => {
								store.leaveGroupRoom?.();
								globalThis.__dshSelectMainPanel?.("schedules");
							},
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									store.leaveGroupRoom?.();
									globalThis.__dshSelectMainPanel?.("schedules");
								}
							},
							children: [
								(0, react_jsx_runtime.jsxs)("span", {
									className: Rows_module_css_default.slot,
									children: [
										(0, react_jsx_runtime.jsx)("span", {
											className: Rows_module_css_default.folder,
											children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {})
										}),
										(0, react_jsx_runtime.jsx)("span", {
											className: clsx(Rows_module_css_default.chevron, isScheduleActive && Rows_module_css_default.arrowOpen),
											children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFillRegular, {})
										})
									]
								}),
								(0, react_jsx_runtime.jsx)("span", {
									className: Rows_module_css_default.projectText,
									children: (0, react_jsx_runtime.jsx)("span", {
										className: Rows_module_css_default.title,
										children: "自动化任务"
									})
								}),
								(0, react_jsx_runtime.jsx)("span", {
									className: Rows_module_css_default.rowActions,
									onClick: (e) => e.stopPropagation(),
									children: (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: Rows_module_css_default.iconButton,
										"aria-label": "打开自动化任务",
										"data-dsh-tip-title": "打开自动化任务配置",
										"data-dsh-tip": "进入定时自动化任务面板，创建或管理无人值守执行计划。",
										"data-dsh-tip-tag": "自动化",
										title: "打开自动化任务",
										onClick: () => {
											store.leaveGroupRoom?.();
											globalThis.__dshSelectMainPanel?.("schedules");
										},
										children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconNewChatOutlineRegular, {})
									})
								})
							]
						})
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: WorkspaceBrowser_module_css_default.groupSection,
						"data-testid": "workspace-groups-section",
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								role: "treeitem",
								tabIndex: 0,
								"data-testid": "workspace-groups-folder",
								"data-dsh-tip-title": \`多 Agent 协同群组（共 \${rooms.length} 个群）\`,
								"data-dsh-tip": "点击展开或折叠协同群组列表；可在群内组织跨账户 Agent、外部飞书/钉钉/企微机器人与队友 DSH 联机协作。",
								"data-dsh-tip-tag": groupExpanded ? "已展开" : "点击展开",
								"aria-expanded": groupExpanded,
								className: clsx(Rows_module_css_default.projectRow),
								onClick: () => {
									store.setGroupExpanded(!groupExpanded);
								},
								onKeyDown: (e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										store.setGroupExpanded(!groupExpanded);
									}
								},
								children: [
									(0, react_jsx_runtime.jsxs)("span", {
										className: Rows_module_css_default.slot,
										children: [
											(0, react_jsx_runtime.jsx)("span", {
												className: Rows_module_css_default.folder,
												children: groupExpanded
													? (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenRegular, {})
													: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {})
											}),
											(0, react_jsx_runtime.jsx)("span", {
												className: clsx(Rows_module_css_default.chevron, groupExpanded && Rows_module_css_default.arrowOpen),
												children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFillRegular, {})
											})
										]
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: Rows_module_css_default.projectText,
										children: (0, react_jsx_runtime.jsx)("span", {
											className: Rows_module_css_default.title,
											children: "群组"
										})
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: Rows_module_css_default.rowActions,
										onClick: (e) => e.stopPropagation(),
										children: (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: Rows_module_css_default.iconButton,
											"data-testid": "workspace-groups-add-btn",
											"aria-label": "新建群组",
											"data-dsh-tip-title": "新建多 Agent 协同群组",
											"data-dsh-tip": "立即创建一个新的跨账户 Agent 与外部群机器人协同群聊，并自动进入该群组对话界面。",
											"data-dsh-tip-tag": "新建群组",
											title: "新建群组",
											onClick: async (e) => {
												e.stopPropagation();
												await store.createRoomInSidebar({ workspaces, startSession, open, list });
											},
											children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconNewChatOutlineRegular, {})
										})
									})
								]
							}),
							groupExpanded && rooms.map((rm) => {
								const isRoomSelected = (isGroupHubActive || (isMainChatActive && store.activeRoomMode)) && store.activeRoomId === rm.id;
								const isEditingThis = editingRoomId === rm.id;
								const cols = store.buildRoomMemberColumns ? store.buildRoomMemberColumns(rm) : { leftText: "", rightText: "", agentCount: (rm.agentIds || []).length, botCount: (rm.connectorIds || []).length };
								const agentCount = cols.agentCount;
								const botCount = cols.botCount;
								const memberSummaryText = \`该群组目前成员有 \${agentCount} Agent \${botCount} Bot\`;
								const statusFootText = "状态：活跃(正常沟通) · 爆发小宇宙(正在做事) · 休眠(连续3轮无回复) · 失去联系(掉线)";
								return (0, react_jsx_runtime.jsxs)("div", {
									role: "treeitem",
									tabIndex: 0,
									"data-testid": \`workspace-group-room-\${rm.id}\`,
									"data-dsh-tip-title": rm.name,
									"data-dsh-tip": memberSummaryText,
									"data-dsh-tip-tag": "",
									"data-dsh-tip-left-head": \`Agent (\${agentCount})\`,
									"data-dsh-tip-right-head": \`Bot (\${botCount})\`,
									"data-dsh-tip-left": cols.leftText,
									"data-dsh-tip-right": cols.rightText,
									"data-dsh-tip-foot": statusFootText,
									"aria-selected": isRoomSelected,
									className: clsx(Rows_module_css_default.sessionRow, isRoomSelected && Rows_module_css_default.selected),
									onClick: () => {
										if (isEditingThis) return;
										store.enterGroupRoom(rm.id, { workspaces, startSession, open, list });
									},
									onKeyDown: (e) => {
										if (isEditingThis) return;
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											store.enterGroupRoom(rm.id, { workspaces, startSession, open, list });
										}
									},
									children: [
										(0, react_jsx_runtime.jsx)("span", {
											className: Rows_module_css_default.slot,
											"data-testid": \`sidebar-group-avatar-\${rm.id}\`,
											"data-dsh-tip-title": \`更换「\${rm.name}」群头像\`,
											"data-dsh-tip": "双击打开本地资源管理器选择图片更换该群头像，自动等比例缩放至合适尺寸。",
											"data-dsh-tip-tag": "",
											title: "双击更换群头像",
											onDoubleClick: (e) => {
												e.stopPropagation();
												setAvatarTargetRoomId(rm.id);
												sidebarAvatarInputRef.current?.click();
											},
											children: rm.avatarUrl ? (0, react_jsx_runtime.jsx)("img", {
												src: rm.avatarUrl,
												alt: rm.name,
												style: {
													width: 16,
													height: 16,
													borderRadius: 4,
													objectFit: "contain",
													display: "inline-block"
												}
											}) : null
										}),
										isEditingThis ? (0, react_jsx_runtime.jsx)("input", {
											type: "text",
											"data-testid": \`sidebar-group-rename-input-\${rm.id}\`,
											className: "dsh-ghub-input",
											autoFocus: true,
											style: { height: 22, fontSize: 12, padding: "0 6px" },
											value: editingRoomName,
											onClick: (e) => e.stopPropagation(),
											onDoubleClick: (e) => e.stopPropagation(),
											onFocus: (e) => e.currentTarget.select(),
											onChange: (e) => setEditingRoomName(e.target.value),
											onKeyDown: (e) => {
												e.stopPropagation();
												if (e.key === "Enter") {
													e.preventDefault();
													commitSidebarRoomRename(rm.id, editingRoomName);
												} else if (e.key === "Escape") {
													e.preventDefault();
													setEditingRoomId(null);
												}
											},
											onBlur: () => commitSidebarRoomRename(rm.id, editingRoomName)
										}) : (0, react_jsx_runtime.jsx)("span", {
											className: Rows_module_css_default.title,
											"data-testid": \`sidebar-group-title-\${rm.id}\`,
											"data-dsh-tip-title": rm.name,
											"data-dsh-tip": memberSummaryText,
											"data-dsh-tip-tag": "",
											"data-dsh-tip-left-head": \`Agent (\${agentCount})\`,
											"data-dsh-tip-right-head": \`Bot (\${botCount})\`,
											"data-dsh-tip-left": cols.leftText,
											"data-dsh-tip-right": cols.rightText,
											"data-dsh-tip-foot": statusFootText,
											onDoubleClick: (e) => {
												e.stopPropagation();
												setEditingRoomName(rm.name);
												setEditingRoomId(rm.id);
											},
											children: rm.name
										}),
										(0, react_jsx_runtime.jsx)("span", {
											className: clsx(Rows_module_css_default.rowResting, "dsh-sidebar-group-stats"),
											"data-testid": \`sidebar-group-stats-\${rm.id}\`,
											"data-dsh-tip-title": rm.name,
											"data-dsh-tip": memberSummaryText,
											"data-dsh-tip-tag": "",
											"data-dsh-tip-left-head": \`Agent (\${agentCount})\`,
											"data-dsh-tip-right-head": \`Bot (\${botCount})\`,
											"data-dsh-tip-left": cols.leftText,
											"data-dsh-tip-right": cols.rightText,
											"data-dsh-tip-foot": statusFootText,
											children: (0, react_jsx_runtime.jsx)("span", {
												className: clsx(Rows_module_css_default.time, Rows_module_css_default.timestamp),
												children: \`\${agentCount}A·\${botCount}B\`
											})
										})
									]
								}, rm.id);
							})
						]
					})
				]
			});
		}`;

  if (content.includes('function DshWorkspaceGroupsAndScheduleSection(')) {
    content = content.replace(
      /\t\tfunction getDshGroupHubStore\(\) \{[\s\S]*?\n\t\t\}\n\t\tfunction SessionTree\(/,
      `${workspaceGroupsSectionCode}\n\t\tfunction SessionTree(`,
    );
  } else {
    content = content.replace(
      '\t\tfunction SessionTree(',
      `${workspaceGroupsSectionCode}\n\t\tfunction SessionTree(`,
    );
  }

  content = content.replace(
    /children: \[groups\.length === 0 && \(0, react_jsx_runtime\.jsx\)\(EmptySessions, \{\n\t\t\t\t\t\t\trowState,\n\t\t\t\t\t\t\tonLeaveArchivedOnly,\n\t\t\t\t\t\t\tt\n\t\t\t\t\t\t\}\), groupRows(?:, \(0, react_jsx_runtime\.jsx\)\(DshWorkspaceGroupsAndScheduleSection, \{[^}]*\}\))?\]/,
    `children: [groups.length === 0 && (0, react_jsx_runtime.jsx)(EmptySessions, {
							rowState,
							onLeaveArchivedOnly,
							t
						}), groupRows, (0, react_jsx_runtime.jsx)(DshWorkspaceGroupsAndScheduleSection, { usePanelInfo, workspaces, startSession, open, list })]`,
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function patchSessionClient(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-client-ui-session',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /publishMain\(\) \{[\s\S]*?\n\t\t\t\}/,
    `publishMain() {
				globalThis.__dshPublishMain = () => this.publishMain();
				if (!this.active) return;
				const byId = this.sessions.list.getSnapshot().byId;
				const currentId = this.current.value.key;
				const retainedId = globalThis.__dshMainRetainedSessionId;
				const isClientMainRetained = (id) => id !== void 0 && (this.sessions.retainInfo(id).getSnapshot().retainedBy.mainView ?? 0) > 0;
				const nextId = isClientMainRetained(currentId)
					? currentId
					: isClientMainRetained(retainedId)
						? retainedId
						: Object.values(byId).find((candidate) => isClientMainRetained(candidate.id) || (candidate.retainedBy.mainView ?? 0) > 0)?.id;
				this.watchMainRetention(nextId);
				const owner = nextId === void 0 ? void 0 : this.sessions.binding(nextId);
				const value = owner === void 0 ? this.absent.value : this.sourceFor(owner).value;
				if (this.current.value === value) return;
				this.current.value = value;
				(0, _deepseek_ai_dsh_client_store.notifySubscribers)(this.current.listeners, "[ui-session] main binding");
			}`,
  );
  fs.writeFileSync(filePath, content, 'utf8');
}

function patchSidebarRightClient(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-client-ui-sidebar-right',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /this\.reference\.ready\.catch\(\(error\) => \{\n(?:\t*if \(this\.retired \|\| this\.disposed\) return;\n)?\t*console\.error\("Sidebar Session opening failed:", error\);\n\t*\}\);/,
    `this.reference.ready.catch((error) => {\n\t\t\t\t\tif (this.retired || this.disposed) return;\n\t\t\t\t\tconsole.error("Sidebar Session opening failed:", error);\n\t\t\t\t});`,
  );
  fs.writeFileSync(filePath, content, 'utf8');
}

function patchAgentPresetClient(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-client-ui-agent-preset',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Keep AgentPresetSeat mounted across session retain transitions while preserving hook call order
  content = content.replace(
    /(?:useSessionRetainInfo\(\(info\) => sessionId === void 0 \|\| \(info\?\.retainedBy\.mainView \?\? 0\) > 0\);\n\t\t\tconst main = true;|const main = useSessionRetainInfo\(\(info\) => sessionId === void 0 \|\| \(info\?\.retainedBy\.mainView \?\? 0\) > 0\);)/,
    `useSessionRetainInfo((info) => sessionId === void 0 || (info?.retainedBy.mainView ?? 0) > 0);\n\t\t\tconst main = true;`,
  );

  // 1b. Attach custom oval warm-orange-accented scrollbar inside the AgentPresetSeat dropdown menu when open
  content = content.replace(
    /\(0, react\.useEffect\)\(\(\) => \{\n\t\t\t\tsetOpen\(false\);\n\t\t\t\}, \[developerTools, options\.length\]\);(?:\n\t\t\t\(0, react\.useEffect\)\(\(\) => \{[\s\S]*?\}, \[open, options\.length\]\);)?/,
    `(0, react.useEffect)(() => {
				setOpen(false);
			}, [developerTools, options.length]);
			(0, react.useEffect)(() => {
				if (!open || options.length === 0 || typeof document === "undefined") return;
				let cleanups = [];
				const rafId = window.requestAnimationFrame(() => {
					const menu = document.querySelector('div[role="menu"]:has(.cubgiG_item)');
					const vp = menu ? menu.querySelector('[role="presentation"]') : null;
					if (!menu || !vp) return;
					let rail = menu.querySelector(".dsh-preset-oval-scrollbar");
					if (!rail) {
						rail = document.createElement("div");
						rail.className = "dsh-preset-oval-scrollbar";
						rail.setAttribute("data-testid", "preset-oval-scrollbar");
						const thumbEl = document.createElement("div");
						thumbEl.className = "dsh-preset-oval-thumb";
						thumbEl.setAttribute("data-testid", "preset-oval-thumb");
						rail.appendChild(thumbEl);
						menu.appendChild(rail);
					}
					const thumb = rail.querySelector(".dsh-preset-oval-thumb");
					if (!thumb) return;
					const syncThumb = () => {
						const { scrollTop, scrollHeight, clientHeight } = vp;
						if (scrollHeight <= clientHeight + 2) {
							rail.style.opacity = "0";
							rail.style.pointerEvents = "none";
							return;
						}
						rail.style.opacity = "1";
						rail.style.pointerEvents = "auto";
						const trackH = rail.clientHeight || Math.max(80, clientHeight - 20);
						const ratio = clientHeight / Math.max(1, scrollHeight);
						const thumbH = Math.max(40, Math.min(trackH - 8, Math.round(trackH * ratio)));
						const maxScroll = Math.max(1, scrollHeight - clientHeight);
						const maxTop = Math.max(0, trackH - thumbH);
						const top = Math.round((scrollTop / maxScroll) * maxTop);
						thumb.style.height = thumbH + "px";
						thumb.style.transform = "translateY(" + top + "px)";
					};
					syncThumb();
					vp.addEventListener("scroll", syncThumb, { passive: true });
					let dragState = null;
					const onPointerDown = (e) => {
						e.preventDefault();
						e.stopPropagation();
						const rect = rail.getBoundingClientRect();
						const thumbRect = thumb.getBoundingClientRect();
						if (e.target === thumb) {
							dragState = { startY: e.clientY, startScroll: vp.scrollTop };
							try { thumb.setPointerCapture(e.pointerId); } catch (_e) {}
						} else {
							const clickOffset = e.clientY - rect.top - thumbRect.height / 2;
							const maxTop = Math.max(1, rect.height - thumbRect.height);
							const ratio = Math.max(0, Math.min(1, clickOffset / maxTop));
							vp.scrollTop = ratio * (vp.scrollHeight - vp.clientHeight);
							dragState = { startY: e.clientY, startScroll: vp.scrollTop };
						}
					};
					const onPointerMove = (e) => {
						if (!dragState) return;
						const rect = rail.getBoundingClientRect();
						const thumbRect = thumb.getBoundingClientRect();
						const maxTop = Math.max(1, rect.height - thumbRect.height);
						const maxScroll = Math.max(1, vp.scrollHeight - vp.clientHeight);
						const dy = e.clientY - dragState.startY;
						vp.scrollTop = dragState.startScroll + (dy / maxTop) * maxScroll;
					};
					const onPointerUp = () => {
						dragState = null;
					};
					rail.addEventListener("pointerdown", onPointerDown);
					window.addEventListener("pointermove", onPointerMove);
					window.addEventListener("pointerup", onPointerUp);
					cleanups.push(() => {
						vp.removeEventListener("scroll", syncThumb);
						rail.removeEventListener("pointerdown", onPointerDown);
						window.removeEventListener("pointermove", onPointerMove);
						window.removeEventListener("pointerup", onPointerUp);
					});
				});
				return () => {
					window.cancelAnimationFrame(rafId);
					cleanups.forEach((fn) => fn());
				};
			}, [open, options.length]);`,
  );

  // 2. Seed AgentPresetSeatController synchronously from a shared roster cache so switching tabs never unmounts/flashes "标准模式"
  content = content.replace(
    /(?:function getDshAgentPresetSeatCache\(\)[\s\S]*?)?const INITIAL\$1 = \{[\s\S]*?var AgentPresetSeatController = class \{[\s\S]*?\n\t\t\};/,
    `function getDshAgentPresetSeatCache() {
			if (!globalThis.__dshAgentPresetSeatCache) {
				globalThis.__dshAgentPresetSeatCache = {
					options: [{ id: "standard" }, { id: "ptc" }, { id: "minimal" }, { id: "cordis" }],
					fallback: "standard"
				};
			}
			return globalThis.__dshAgentPresetSeatCache;
		}
		const INITIAL$1 = {
			options: [{ id: "standard" }, { id: "ptc" }, { id: "minimal" }, { id: "cordis" }],
			current: "standard",
			error: null,
			busy: false,
			introduce: false
		};
		const UNCHANGED = { kind: "unchanged" };
		/** Stages the next session's preset and applies it when one appears. */
		var AgentPresetSeatController = class {
			ctx;
			currentSession;
			staged;
			/** Chip snapshot the renderer subscribes to. */
			store;
			/**
			* The Host-effective default, so a consumed stage can fall back to it without
			* re-reading the roster.
			*/
			fallback = "standard";
			/** Only the newest roster read may publish after overlapping refreshes. */
			loadGeneration = 0;
			/** Completion of the active Host selection; Settings choices wait before staging. */
			pendingSelection;
			constructor(ctx, currentSession, staged = {
				id: void 0,
				introduce: false
			}) {
				this.ctx = ctx;
				this.currentSession = currentSession;
				this.staged = staged;
				const cache = getDshAgentPresetSeatCache();
				this.fallback = cache.fallback || "standard";
				let initialSession;
				try {
					initialSession = this.currentSession?.();
				} catch (_e) {}
				const initialCurrent = this.staged.id ?? (initialSession === void 0 ? this.fallback : presetOf(initialSession) ?? this.fallback);
				this.store = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)({
					options: cache.options,
					current: initialCurrent || "standard",
					error: null,
					busy: false,
					introduce: false
				});
			}
			set(patch) {
				this.store.set({
					...this.store.getSnapshot(),
					...patch
				});
			}
			clearStage() {
				this.staged.id = void 0;
				this.staged.introduce = false;
			}
			async load() {
				const generation = ++this.loadGeneration;
				const roster = await readRoster(this.ctx);
				if (generation !== this.loadGeneration) return;
				const error = this.store.getSnapshot().error;
				if (!roster.ok) {
					if (typeof error !== "object" || error === null) this.set({ error: roster.error });
					return;
				}
				const { presets } = roster.value;
				const nextOptions = presetOptions(presets);
				const nextFallback = presets.find((preset) => preset.isDefault)?.id ?? presets[0]?.id ?? "standard";
				const cache = getDshAgentPresetSeatCache();
				if (nextOptions.length > 0) cache.options = nextOptions;
				if (nextFallback) cache.fallback = nextFallback;
				this.fallback = cache.fallback || "standard";
				const session = this.currentSession();
				const snap = this.store.getSnapshot();
				const nextCurrent = this.staged.id ?? (session === void 0 ? this.fallback : presetOf(session) ?? (snap.current || this.fallback));
				const nextError = typeof error === "object" ? error : null;
				const nextIntroduce = this.staged.introduce;
				const effectiveOptions = nextOptions.length > 0 ? nextOptions : cache.options;
				const sameOptions = snap.options.length === effectiveOptions.length && snap.options.every((opt, i) => opt.id === effectiveOptions[i]?.id && opt.name === effectiveOptions[i]?.name && opt.description === effectiveOptions[i]?.description);
				if (!sameOptions || snap.current !== nextCurrent || snap.error !== nextError || snap.introduce !== nextIntroduce) {
					this.set({
						options: effectiveOptions,
						current: nextCurrent,
						error: nextError,
						introduce: nextIntroduce
					});
				}
				await this.apply();
			}
			async select(id) {
				if (this.store.getSnapshot().busy) return UNCHANGED;
				this.stage(id);
				return await this.apply();
			}
			stage(id, introduce = false) {
				this.staged.id = id;
				this.staged.introduce = introduce;
				this.set({
					current: id,
					error: null,
					introduce
				});
			}
			dismissRefusal(refusal) {
				if (refusal !== null && typeof refusal === "object" && this.store.getSnapshot().error === refusal) this.set({ error: refusal.reason });
			}
			blankSessionId() {
				const session = this.currentSession();
				return session?.blank === true ? session.id : void 0;
			}
			async syncBlankSession(expectedSessionId, id) {
				while (this.pendingSelection !== void 0) await this.pendingSelection;
				const session = this.currentSession();
				if (session === void 0 || !session.blank || session.id !== expectedSessionId) return void 0;
				this.stage(id);
				const outcome = await this.apply();
				return outcome.kind === "refused" ? outcome.reason : void 0;
			}
			introduced() {
				if (!this.store.getSnapshot().introduce) return;
				this.staged.introduce = false;
				this.set({ introduce: false });
			}
			async apply() {
				if (this.store.getSnapshot().busy) return UNCHANGED;
				const staged = this.staged.id;
				const session = this.currentSession();
				const fallbackId = this.fallback || getDshAgentPresetSeatCache().fallback || "standard";
				if (staged === void 0) {
					const snapCurrent = this.store.getSnapshot().current;
					const current = session === void 0 ? (snapCurrent || fallbackId) : (presetOf(session) ?? (snapCurrent || fallbackId));
					if (current && current !== snapCurrent) this.set({ current });
					return UNCHANGED;
				}
				if (session === void 0) return { kind: "staged" };
				if (!session.blank || presetOf(session) === staged) {
					this.clearStage();
					return UNCHANGED;
				}
				const completion = Promise.withResolvers();
				this.pendingSelection = completion.promise;
				this.clearStage();
				const refuse = (reason) => {
					this.set({
						error: {
							reason,
							preset: this.store.getSnapshot().options.find((option) => option.id === staged) ?? { id: staged }
						},
						current: this.staged.id ?? presetOf(session) ?? fallbackId
					});
					return {
						kind: "refused",
						reason
					};
				};
				try {
					this.set({
						busy: true,
						error: null
					});
					const result = await this.ctx.remote.agentPresets.select(session.id, staged);
					if (!result.ok) {
						const { error } = result;
						return refuse("reason" in error.details && typeof error.details.reason === "string" ? error.details.reason : error.message);
					}
					this.set({ current: this.staged.id ?? result.value });
					return result.value === staged ? { kind: "applied" } : UNCHANGED;
				} catch (error) {
					return refuse(error instanceof Error ? error.message : String(error));
				} finally {
					this.pendingSelection = void 0;
					this.set({ busy: false });
					completion.resolve(void 0);
				}
			}
		};`,
  );

  content = content.replace(
    /ctx\.sessions\.retainInfo\?\.\(binding\.sessionId\)\?\.getSnapshot\?\.\(\)\?\.retainedBy\?\.mainView \?\? summary\.retainedBy\?\.mainView \?\? 0|ctx\.sessions\.retainInfo\(binding\.sessionId\)\.getSnapshot\(\)\.retainedBy\.mainView \?\? 0/,
    '(ctx.sessions.retainInfo?.(binding.sessionId)?.getSnapshot?.()?.retainedBy?.mainView ?? summary.retainedBy?.mainView ?? (globalThis.__dshMainRetainedSessionId === binding.sessionId ? 1 : 0))',
  );

  const agentPresetScrollCss =
    'div[role="menu"]:has(.cubgiG_item){position:fixed!important;max-height:min(280px,var(--dsh-anchored-max-height,280px))!important;width:320px!important;max-width:min(320px,calc(100vw - 24px))!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;border-radius:18px!important;padding:6px 4px 6px 6px!important}' +
    'body[data-dsh-theme-id="preset-1"] div[role="menu"]:has(.cubgiG_item){background-color:#262b3d!important;border:1px solid rgba(255,255,255,0.10)!important;box-shadow:0 16px 36px -8px rgba(6,8,18,0.55),0 4px 12px rgba(0,0,0,0.28),inset 0 1px 0 rgba(255,255,255,0.10)!important}' +
    'body[data-dsh-theme-id="preset-1"][data-dsh-preset1-mode="light"] div[role="menu"]:has(.cubgiG_item){background-color:#f4f4f4!important;border:1px solid rgba(0,0,0,0.09)!important;box-shadow:0 12px 28px -6px rgba(0,0,0,0.12),0 3px 8px rgba(0,0,0,0.05),inset 0 1px 0 #ffffff!important}' +
    'div[role="menu"]:has(.cubgiG_item) > [role="presentation"]{flex:1 1 auto!important;min-height:0!important;max-height:calc(min(280px,var(--dsh-anchored-max-height,280px)) - 12px)!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;scrollbar-width:none!important;-ms-overflow-style:none!important;padding-right:14px!important}' +
    'div[role="menu"]:has(.cubgiG_item) > [role="presentation"]::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}' +
    '.dsh-preset-oval-scrollbar{position:absolute!important;top:10px!important;bottom:10px!important;right:5px!important;width:8px!important;border-radius:9999px!important;background:rgba(255,106,43,0.08)!important;box-shadow:inset 0 1px 2px rgba(255,106,43,0.10),inset 0 0 0 0.5px rgba(255,106,43,0.14)!important;z-index:10!important;cursor:pointer!important;user-select:none!important;transition:background .18s ease,box-shadow .18s ease!important}' +
    '.dsh-preset-oval-thumb{position:absolute!important;top:0!important;left:0!important;width:100%!important;min-height:36px!important;border-radius:9999px!important;background-color:rgba(255,106,43,0.34)!important;background-image:linear-gradient(180deg,rgba(255,158,108,0.48) 0%,rgba(255,106,43,0.68) 50%,rgba(255,158,108,0.48) 100%)!important;border:1px solid rgba(255,255,255,0.72)!important;box-shadow:0 2px 6px rgba(255,106,43,0.24),inset 0 1px 1.5px rgba(255,255,255,0.75)!important;box-sizing:border-box!important;cursor:grab!important;transition:background .15s ease,box-shadow .15s ease,border-color .15s ease!important}' +
    '.dsh-preset-oval-scrollbar:hover .dsh-preset-oval-thumb,.dsh-preset-oval-thumb:hover{background-color:rgba(255,106,43,0.55)!important;background-image:linear-gradient(180deg,rgba(255,150,96,0.65) 0%,rgba(255,106,43,0.85) 50%,rgba(255,150,96,0.65) 100%)!important;box-shadow:0 3px 8px rgba(255,106,43,0.36),inset 0 1px 1.5px rgba(255,255,255,0.85)!important}' +
    'body[data-ds-dark-theme]:not([data-dsh-theme-id="preset-1"]):not([data-dsh-theme-id="preset-2"]) .dsh-preset-oval-scrollbar{background:rgba(255,255,255,0.06)!important;box-shadow:inset 0 1px 2px rgba(0,0,0,0.42),inset 0 0 0 0.5px rgba(255,255,255,0.09)!important}' +
    'body[data-ds-dark-theme]:not([data-dsh-theme-id="preset-1"]):not([data-dsh-theme-id="preset-2"]) .dsh-preset-oval-thumb{background-color:rgba(148,163,184,0.34)!important;background-image:linear-gradient(180deg,rgba(203,213,225,0.42) 0%,rgba(148,163,184,0.28) 100%)!important;border:1px solid rgba(255,255,255,0.18)!important;box-shadow:0 2px 5px rgba(0,0,0,0.38),inset 0 1px 1px rgba(255,255,255,0.24)!important}' +
    'body[data-ds-dark-theme]:not([data-dsh-theme-id="preset-1"]):not([data-dsh-theme-id="preset-2"]) .dsh-preset-oval-scrollbar:hover .dsh-preset-oval-thumb,body[data-ds-dark-theme]:not([data-dsh-theme-id="preset-1"]):not([data-dsh-theme-id="preset-2"]) .dsh-preset-oval-thumb:hover{background-color:rgba(203,213,225,0.48)!important;background-image:linear-gradient(180deg,rgba(226,232,240,0.56) 0%,rgba(148,163,184,0.42) 100%)!important;box-shadow:0 3px 7px rgba(0,0,0,0.45),inset 0 1px 1.5px rgba(255,255,255,0.32)!important}' +
    'body[data-dsh-theme-id="preset-1"] .dsh-preset-oval-scrollbar{background-color:#1b1f2d!important;background-image:linear-gradient(180deg,#161925 0%,#222738 100%)!important;border:1px solid rgba(255,255,255,0.08)!important;box-shadow:inset 0 1.5px 3px rgba(0,0,0,0.55),0 1px 0 rgba(255,255,255,0.05)!important}' +
    'body[data-dsh-theme-id="preset-1"] .dsh-preset-oval-thumb{background-color:#525a72!important;background-image:linear-gradient(180deg,rgba(148,158,186,0.75) 0%,rgba(86,95,122,0.88) 50%,rgba(64,72,96,0.94) 100%)!important;border:1px solid rgba(255,255,255,0.26)!important;box-shadow:0 2px 6px rgba(0,0,0,0.48),inset 0 1px 1.5px rgba(255,255,255,0.38),inset 0 -1px 1.5px rgba(15,18,28,0.45)!important}' +
    'body[data-dsh-theme-id="preset-1"] .dsh-preset-oval-scrollbar:hover .dsh-preset-oval-thumb,body[data-dsh-theme-id="preset-1"] .dsh-preset-oval-thumb:hover{background-color:#66708e!important;background-image:linear-gradient(180deg,rgba(176,186,214,0.85) 0%,rgba(106,116,146,0.92) 50%,rgba(80,89,116,0.96) 100%)!important;border-color:rgba(255,255,255,0.36)!important;box-shadow:0 3px 8px rgba(0,0,0,0.55),inset 0 1px 2px rgba(255,255,255,0.48)!important}' +
    'body[data-dsh-theme-id="preset-1"][data-dsh-preset1-mode="light"] .dsh-preset-oval-scrollbar{background-color:#d8d8d8!important;background-image:linear-gradient(180deg,#cecece 0%,#e0e0e0 100%)!important;border:1px solid rgba(0,0,0,0.10)!important;box-shadow:inset 0 1.5px 3px rgba(0,0,0,0.15),0 1px 0 rgba(255,255,255,0.8)!important}' +
    'body[data-dsh-theme-id="preset-1"][data-dsh-preset1-mode="light"] .dsh-preset-oval-thumb{background-color:#8e9198!important;background-image:linear-gradient(180deg,#b8bbc2 0%,#888b94 52%,#70737b 100%)!important;border:1px solid rgba(255,255,255,0.82)!important;box-shadow:0 2px 5px rgba(0,0,0,0.18),inset 0 1px 1.5px rgba(255,255,255,0.9),inset 0 -1px 1px rgba(0,0,0,0.18)!important}' +
    'body[data-dsh-theme-id="preset-1"][data-dsh-preset1-mode="light"] .dsh-preset-oval-scrollbar:hover .dsh-preset-oval-thumb,body[data-dsh-theme-id="preset-1"][data-dsh-preset1-mode="light"] .dsh-preset-oval-thumb:hover{background-color:#757880!important;background-image:linear-gradient(180deg,#a0a3ab 0%,#72757e 52%,#5a5d65 100%)!important;border-color:rgba(255,255,255,0.9)!important;box-shadow:0 3px 7px rgba(0,0,0,0.24),inset 0 1px 1.5px #ffffff!important}' +
    '.dsh-preset-oval-thumb:active{cursor:grabbing!important}' +
    '.cubgiG_itemDesc{display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;overflow:hidden!important}';

  content = content.replace(
    /tag\.textContent = css\$2(?: \+ ".*")?;/,
    `tag.textContent = css$2 + ${JSON.stringify(agentPresetScrollCss)};`,
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function patchSidebarClient(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-client-ui-sidebar',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  const sidebarCssAppend =
    '.hHd-Xa_root{background:transparent!important;box-sizing:border-box!important}' +
    '.hHd-Xa_root:not(.hHd-Xa_collapsed){min-width:264px!important;overflow:hidden!important}' +
    '.hHd-Xa_root:not(.hHd-Xa_collapsed) .hHd-Xa_logoRow{height:40px!important;min-height:40px!important;margin:0 0 8px 0!important;padding:0 0 0 calc(var(--dsh-sidebar-paint-inset) + 1px)!important;gap:8px;align-items:center;box-sizing:border-box}' +
    '.hHd-Xa_logoRow .hHd-Xa_newSession{flex:1;min-width:0;height:34px!important;margin:0!important;-webkit-app-region:no-drag;container-type:normal!important}' +
    '.hHd-Xa_newSession{container-type:normal!important;position:relative!important}' +
    '.hHd-Xa_newSessionLabelMask{flex:1 1 auto!important;min-width:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:visible!important;mask-image:none!important;-webkit-mask-image:none!important}' +
    '.hHd-Xa_newSessionContent{width:100%!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;transform:none!important;transition:color .22s ease!important}' +
    '.hHd-Xa_newSessionContent > svg{flex:0 0 auto!important;display:inline-block!important;width:15px!important;height:15px!important;visibility:visible!important;opacity:1!important;color:currentColor!important}' +
    '.hHd-Xa_newSessionShortcut{position:absolute!important;right:10px!important;top:50%!important;transform:translateY(-50%)!important;margin:0!important;pointer-events:none!important}' +
    '.hHd-Xa_panelRow,.hHd-Xa_collapsed .hHd-Xa_panelRow{border:0 none transparent!important;border-inline:0 none transparent!important;border-left:0 none transparent!important;border-right:0 none transparent!important;border-color:transparent!important;background-clip:border-box!important;background-origin:border-box!important;box-shadow:none!important;transition:background-color .2s cubic-bezier(.22,1,.36,1),color .2s cubic-bezier(.22,1,.36,1)!important}' +
    '.hHd-Xa_root:not(.hHd-Xa_collapsed) .hHd-Xa_panelRow{margin-inline:var(--dsh-sidebar-paint-inset,3px)!important;padding:7px calc(var(--dsh-sidebar-row-padding,12px) - var(--dsh-sidebar-paint-inset,3px))!important}' +
    '.hHd-Xa_toggle .hHd-Xa_panelIcon,.hHd-Xa_collapsed .hHd-Xa_toggle .hHd-Xa_panelIcon{display:inline-flex!important;visibility:visible!important;opacity:1!important;color:currentColor!important;transform:none!important;transition:color .2s ease,opacity .2s ease!important}' +
    '.hHd-Xa_toggle .hHd-Xa_railMark{display:none!important}' +
    '.hHd-Xa_root.hHd-Xa_collapsed{width:56px!important;min-width:56px!important;max-width:56px!important;padding:8px 10px 6px!important;align-items:center!important;overflow:hidden!important}' +
    '.hHd-Xa_collapsed .hHd-Xa_logoRow{width:36px!important;padding:0!important;margin:0 0 6px 0!important;justify-content:center!important}' +
    '.hHd-Xa_collapsed .hHd-Xa_toggle{margin:0!important;width:36px!important;height:36px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}' +
    '.hHd-Xa_collapsed > .hHd-Xa_newSession{width:36px!important;height:36px!important;min-width:36px!important;padding:0!important;margin:0 0 6px 0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 auto!important}' +
    '.hHd-Xa_collapsed > .hHd-Xa_newSession .hHd-Xa_newSessionContent{width:auto!important;gap:0!important}' +
    '.hHd-Xa_collapsed > .hHd-Xa_newSession .hHd-Xa_newSessionContent > svg{width:18px!important;height:18px!important}' +
    '.hHd-Xa_collapsed .hHd-Xa_panelList,.hHd-Xa_collapsed .hHd-Xa_footArea,.hHd-Xa_collapsed .hHd-Xa_footerActions,.hHd-Xa_collapsed .hHd-Xa_settingsArea{width:36px!important;display:flex!important;flex-direction:column!important;align-items:center!important}' +
    '.hHd-Xa_collapsed .hHd-Xa_panelRow{width:36px!important;height:36px!important;min-width:36px!important;padding:0!important;margin:0!important;justify-content:center!important}' +
    '.hHd-Xa_collapsed .hHd-Xa_panelRow .hHd-Xa_panelSlot,.hHd-Xa_collapsed .hHd-Xa_panelRow .hHd-Xa_panelGlyph{margin:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}' +
    '.hHd-Xa_collapsed .bhn1Oq_rail{width:36px!important;padding:6px 0!important;align-items:center!important}' +
    '.hHd-Xa_wide,.hHd-Xa_railIn .hHd-Xa_logoRow,.hHd-Xa_railIn .hHd-Xa_iconButton,.hHd-Xa_railIn .hHd-Xa_newSession,.hHd-Xa_railIn .hHd-Xa_panelList,.hHd-Xa_railIn .hHd-Xa_regionArea,.hHd-Xa_railIn .hHd-Xa_footArea{animation:none!important;transform:none!important}' +
    '.pI_x6G_frame:not([data-dragging]){transition:grid-template-columns .24s cubic-bezier(.22,1,.36,1),background-color .26s cubic-bezier(.22,1,.36,1)!important}';

  content = content.replace(
    /tag\.textContent = css(?: \+ ".*")?;/,
    `tag.textContent = css + ${JSON.stringify(sidebarCssAppend)};`,
  );

  content = content.replace(
    /const wide = windowsTitlebar \? !collapsed : !collapsed \|\| !settled;|const wide = !collapsed;/,
    'const wide = !collapsed;',
  );

  content = content.replace(
    /style: wide \? \{ width: collapsed \? lastWideWidth\.current : width \} : void 0,|style: \{ width: "100%" \},|style: wide \? \{ width: `\$\{width\}px` \} : \{ width: "56px" \},/,
    'style: wide ? { width: `${width}px` } : { width: "56px" },',
  );

  content = content.replace(
    /startSession: \(workspaceId\) => \{\s*(?:if \(workspaceId === void 0 && typeof globalThis\.__dshCreateNewTab === "function"\) \{\s*globalThis\.__dshCreateNewTab\(globalThis\.__dshMainRetainedSessionId\);\s*return;\s*\}\s*)?workspaceNavigation\.startSession\(workspaceId\);\s*\},/,
    `startSession: (workspaceId) => {
					if (workspaceId === void 0 && typeof globalThis.__dshCreateNewTab === "function") {
						globalThis.__dshCreateNewTab(globalThis.__dshMainRetainedSessionId);
						return;
					}
					workspaceNavigation.startSession(workspaceId);
				},`,
  );

  content = content.replace(
    /\t\t\t\t\tdarwinDesktop && \(0, react_jsx_runtime\.jsx\)\("div", \{\n\t\t\t\t\t\tclassName: SidebarRoot_module_css_default\.topStrip,[\s\S]*?\t\t\t\t\t\}\),\n\t\t\t\t\tpanels\.length > 0 && /,
    `\t\t\t\t\tdarwinDesktop && (0, react_jsx_runtime.jsx)("div", {
						className: SidebarRoot_module_css_default.topStrip,
						"data-window-drag": true,
						children: toggle
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: SidebarRoot_module_css_default.logoRow,
						"data-window-drag": true,
						children: [wide && canStartSession && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
							label: t("session.new.label"),
							shortcutKeys: newShortcut?.keys,
							delayMs: 500,
							side: captionTooltipSide,
							disabled: wide,
							children: (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: SidebarRoot_module_css_default.newSession,
								"aria-label": t("session.new.label"),
								"aria-keyshortcuts": newShortcut?.aria,
								onClick: openNewSession,
								children: [(0, react_jsx_runtime.jsx)("span", {
									className: SidebarRoot_module_css_default.newSessionLabelMask,
									children: (0, react_jsx_runtime.jsxs)("span", {
										className: SidebarRoot_module_css_default.newSessionContent,
										children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconNewChatOutlineMedium, { size: 14 }), (0, react_jsx_runtime.jsx)("span", {
											className: clsx(SidebarRoot_module_css_default.newSessionLabel, SidebarRoot_module_css_default.wide),
											children: t("session.new")
										})]
									})
								}), newShortcut !== void 0 && newShortcut.keys.length > 0 && (0, react_jsx_runtime.jsx)("span", {
									className: SidebarRoot_module_css_default.newSessionShortcut,
									"aria-hidden": "true",
									children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.ShortcutKeys, { keys: newShortcut.keys })
								})]
							})
						}), !darwinDesktop && toggle]
					}),
					!wide && canStartSession && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
						label: t("session.new.label"),
						shortcutKeys: newShortcut?.keys,
						delayMs: 500,
						side: captionTooltipSide,
						disabled: wide,
						children: (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: SidebarRoot_module_css_default.newSession,
							"aria-label": t("session.new.label"),
							"aria-keyshortcuts": newShortcut?.aria,
							onClick: openNewSession,
							children: [(0, react_jsx_runtime.jsx)("span", {
								className: SidebarRoot_module_css_default.newSessionLabelMask,
								children: (0, react_jsx_runtime.jsxs)("span", {
									className: SidebarRoot_module_css_default.newSessionContent,
									children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconNewChatOutlineRegular, { size: windowsTitlebar ? 16 : 18 })]
								})
							})]
						})
					}),
					panels.length > 0 && `,
  );

  // Filter "schedules" out of top sidebar panelList since 自动化任务 is now under 默认工作区
  content = content.replace(
    /panels\.filter\(\(\{ id \}\) => (?:id !== "schedules" && \()?id === "plugins" \|\| !unpinned\.includes\(id\)\)?\)/,
    'panels.filter(({ id }) => id !== "schedules" && (id === "plugins" || !unpinned.includes(id)))',
  );
  content = content.replace(
    /entries: panels\.filter\(\(\{ id \}\) => id !== "plugins"(?: && id !== "schedules")?\)/,
    'entries: panels.filter(({ id }) => id !== "plugins" && id !== "schedules")',
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function patchThemeClient(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-client-ui-theme',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure 3 cubes per row cleanly across desktop and mobile
  content = content.replace(
    'flex:1 1 0;padding:12px 6px',
    'flex:1 1 calc(33.333% - 8px);padding:12px 6px',
  );

  // Inject Luminex Preset 1 CSS into AppearanceRow stylesheet
  const luminexCss = buildLuminexPresetCss();
  content = content.replace(
    /tag\.textContent = css\$3(?: \+ ".*")?;/,
    `tag.textContent = css$3 + ${JSON.stringify(luminexCss)};`,
  );
  content = content
    .replace(
      '--dsw-alias-label-dimmed:var(--dsw-static-neutral-bluish-200)',
      '--dsw-alias-label-dimmed:#646a73',
    )
    .replace(
      '--dsw-alias-label-dimmed:var(--dsw-static-neutral-bluish-750)',
      '--dsw-alias-label-dimmed:#9ea9bc',
    );

  // Add Preset 1 ("极简") interactive mini slider icon (left = light, right = dark) and preset choices in CUBES & AppearanceRow
  content = content.replace(
    /(?:function Preset1MiniSliderIcon[\s\S]*?\n\t\t)?const CUBES = \[[\s\S]*?\n\t\t\];\n\t\t\/\*\*[\s\S]*?\*\/\n\t\tfunction AppearanceRow\(\{ t, setTheme, useStore \}\) \{[\s\S]*?\n\t\t\}/,
    `function Preset1MiniSliderIcon({ setTheme }) {
			const readSavedMode = () => {
				try {
					const raw = localStorage.getItem("dsh_preset1_submode_v2");
					if (raw === "light" || raw === "dark") return raw;
				} catch (_e) {}
				return "light";
			};
			const [submode, setSubmode] = (0, react.useState)(readSavedMode);
			const submodeRef = (0, react.useRef)(submode);
			submodeRef.current = submode;

			const sliderRef = (0, react.useRef)(null);
			const thumbRef = (0, react.useRef)(null);
			const spokeRef = (0, react.useRef)(null);
			const curTRef = (0, react.useRef)(submode === "dark" ? 1 : 0);
			const animFrameRef = (0, react.useRef)(0);
			const dragRef = (0, react.useRef)({ active: false, moved: false, startX: 0, startT: 0, lastT: 0 });

			const TRAVEL_PX = 38;

			const renderMiniAt = (0, react.useCallback)((tVal, stretch = 0) => {
				const clamped = Math.max(-0.04, Math.min(1.04, tVal));
				const normT = Math.max(0, Math.min(1, clamped));
				const x = normT * TRAVEL_PX;
				const scaleX = 1 + Math.abs(stretch) * 0.22;
				const scaleY = 1 - Math.abs(stretch) * 0.08;
				if (thumbRef.current) {
					thumbRef.current.style.transform = \`translate3d(\${x.toFixed(2)}px, 0, 0) scale(\${scaleX.toFixed(3)}, \${scaleY.toFixed(3)})\`;
				}
				if (spokeRef.current) {
					spokeRef.current.style.transform = \`rotate(\${(normT * 180).toFixed(1)}deg)\`;
				}
			}, []);

			const animateMiniTo = (0, react.useCallback)((targetT, forceFromT = null) => {
				if (animFrameRef.current) {
					cancelAnimationFrame(animFrameRef.current);
					animFrameRef.current = 0;
				}
				if (forceFromT !== null) {
					curTRef.current = forceFromT;
					renderMiniAt(forceFromT, 0);
				}
				const startT = curTRef.current;
				const dist = Math.abs(targetT - startT);
				if (dist < 0.005) {
					curTRef.current = targetT;
					renderMiniAt(targetT, 0);
					return;
				}
				const duration = Math.max(320, Math.round(480 * Math.max(0.65, dist)));
				const startTime = performance.now();
				const step = (now) => {
					const elapsed = Math.min(1, (now - startTime) / duration);
					const ease = 0.5 - 0.5 * Math.cos(elapsed * Math.PI);
					const nextT = startT + (targetT - startT) * ease;
					curTRef.current = nextT;
					const swell = Math.sin(elapsed * Math.PI) * Math.max(0.55, dist);
					renderMiniAt(nextT, swell);
					if (elapsed < 1) {
						animFrameRef.current = requestAnimationFrame(step);
					} else {
						curTRef.current = targetT;
						renderMiniAt(targetT, 0);
						animFrameRef.current = 0;
					}
				};
				animFrameRef.current = requestAnimationFrame(step);
			}, [renderMiniAt]);

			(0, react.useLayoutEffect)(() => {
				renderMiniAt(curTRef.current, 0);
				return () => {
					if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
				};
			}, [renderMiniAt]);

			(0, react.useEffect)(() => {
				const onSync = (e) => {
					const next = (e?.detail === "light" || e?.detail === "dark") ? e.detail : readSavedMode();
					submodeRef.current = next;
					setSubmode(next);
					if (!dragRef.current.active) {
						animateMiniTo(next === "dark" ? 1 : 0);
					}
				};
				window.addEventListener("dsh-preset1-submode", onSync);
				return () => window.removeEventListener("dsh-preset1-submode", onSync);
			}, [animateMiniTo]);

			const commitSubmode = (nextMode, animate = true, forceFromT = null) => {
				submodeRef.current = nextMode;
				setSubmode(nextMode);
				try {
					localStorage.setItem("dsh_preset1_submode_v2", nextMode);
					localStorage.setItem("dsh_preset1_submode", nextMode);
				} catch (_e) {}
				if (typeof setTheme === "function") {
					setTheme("preset-1");
				}
				if (typeof globalThis.__dshCommitPreset1Submode === "function") {
					globalThis.__dshCommitPreset1Submode(nextMode);
				} else {
					try {
						window.dispatchEvent(new CustomEvent("dsh-preset1-submode", { detail: nextMode }));
					} catch (_e) {}
				}
				if (animate) {
					animateMiniTo(nextMode === "dark" ? 1 : 0, forceFromT);
				}
			};

			const pointerToTrackT = (clientX, el) => {
				const rect = el.getBoundingClientRect();
				const thumbW = 32;
				const pad = 4;
				const travel = Math.max(1, rect.width - pad * 2 - thumbW);
				return Math.max(0, Math.min(1, (clientX - rect.left - pad - thumbW / 2) / travel));
			};

			return (0, react_jsx_runtime.jsxs)("span", {
				ref: sliderRef,
				className: "dsh_preset1_mini_slider",
				"data-testid": "preset1-mini-slider",
				"data-submode": submode,
				role: "slider",
				"aria-label": "高级灰主题滑块（左滑浅色，右滑深色）",
				"aria-valuemin": 0,
				"aria-valuemax": 1,
				"aria-valuenow": submode === "dark" ? 1 : 0,
				title: "点击左侧切换浅色 / 点击右侧切换深色（支持左右滑动）",
				onPointerDown: (e) => {
					if (e.button !== 0) return;
					e.preventDefault();
					e.stopPropagation();
					if (animFrameRef.current) {
						cancelAnimationFrame(animFrameRef.current);
						animFrameRef.current = 0;
					}
					const startT = curTRef.current;
					dragRef.current = { active: true, moved: false, startX: e.clientX, startT, lastT: startT };
					try {
						e.currentTarget.setPointerCapture(e.pointerId);
					} catch (_err) {}
				},
				onPointerMove: (e) => {
					const st = dragRef.current;
					if (!st.active) return;
					const dx = e.clientX - st.startX;
					if (Math.abs(dx) > 6) st.moved = true;
					if (!st.moved) return;
					const nextT = pointerToTrackT(e.clientX, e.currentTarget);
					st.lastT = nextT;
					curTRef.current = nextT;
					renderMiniAt(nextT, 0.35);
					const liveMode = nextT < 0.5 ? "light" : "dark";
					if (liveMode !== submodeRef.current) {
						commitSubmode(liveMode, false);
					}
				},
				onPointerUp: (e) => {
					const st = dragRef.current;
					if (!st.active) return;
					st.active = false;
					try {
						e.currentTarget.releasePointerCapture(e.pointerId);
					} catch (_err) {}
					if (st.moved) {
						const finalMode = st.lastT < 0.5 ? "light" : "dark";
						commitSubmode(finalMode, true);
					} else {
						const rect = e.currentTarget.getBoundingClientRect();
						const clickRatio = (e.clientX - rect.left) / Math.max(1, rect.width);
						const curMode = submodeRef.current;
						let nextMode;
						let fromT;
						if (clickRatio < 0.5) {
							// User clicked the left side
							if (curMode === "dark") {
								nextMode = "light";
								fromT = 1;
							} else {
								// Already on the left thumb -> toggle to right with animation
								nextMode = "dark";
								fromT = 0;
							}
						} else {
							// User clicked the right side
							if (curMode === "light") {
								nextMode = "dark";
								fromT = 0;
							} else {
								// Already on the right thumb -> toggle to left with animation
								nextMode = "light";
								fromT = 1;
							}
						}
						commitSubmode(nextMode, true, fromT);
					}
				},
				onPointerCancel: () => {
					const st = dragRef.current;
					if (!st.active) return;
					st.active = false;
					animateMiniTo(submodeRef.current === "dark" ? 1 : 0);
				},
				onClick: (e) => {
					e.stopPropagation();
				},
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						className: "dsh_mini_slider_cue_light",
						"aria-hidden": "true",
						children: (0, react_jsx_runtime.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 16 16",
							fill: "none",
							children: [
								(0, react_jsx_runtime.jsx)("circle", { cx: "8", cy: "8", r: "3", stroke: "currentColor", strokeWidth: "1.5" }),
								(0, react_jsx_runtime.jsx)("path", { d: "M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4L4.5 4.5M11.5 11.5L12.6 12.6M12.6 3.4L11.5 4.5M4.5 11.5L3.4 12.6", stroke: "currentColor", strokeWidth: "1.35", strokeLinecap: "round" })
							]
						})
					}),
					(0, react_jsx_runtime.jsx)("span", {
						className: "dsh_mini_slider_cue_dark",
						"aria-hidden": "true",
						children: (0, react_jsx_runtime.jsx)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 16 16",
							fill: "none",
							children: (0, react_jsx_runtime.jsx)("path", {
								d: "M12.8 9.8A5.2 5.2 0 0 1 6.2 3.2a5.2 5.2 0 1 0 6.6 6.6Z",
								stroke: "currentColor",
								strokeWidth: "1.45",
								strokeLinejoin: "round"
							})
						})
					}),
					(0, react_jsx_runtime.jsxs)("span", {
						ref: thumbRef,
						className: "dsh_mini_slider_thumb",
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: "dsh_mini_slider_glow",
								"aria-hidden": "true"
							}),
							(0, react_jsx_runtime.jsxs)("svg", {
								ref: spokeRef,
								className: "dsh_mini_slider_spoke",
								viewBox: "0 0 20 20",
								fill: "none",
								children: [
									(0, react_jsx_runtime.jsx)("line", { x1: "10", y1: "2.2", x2: "10", y2: "5.4", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }),
									(0, react_jsx_runtime.jsx)("line", { x1: "10", y1: "14.6", x2: "10", y2: "17.8", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }),
									(0, react_jsx_runtime.jsx)("line", { x1: "2.2", y1: "10", x2: "5.4", y2: "10", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }),
									(0, react_jsx_runtime.jsx)("line", { x1: "14.6", y1: "10", x2: "17.8", y2: "10", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }),
									(0, react_jsx_runtime.jsx)("line", { x1: "4.48", y1: "4.48", x2: "6.75", y2: "6.75", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }),
									(0, react_jsx_runtime.jsx)("line", { x1: "13.25", y1: "13.25", x2: "15.52", y2: "15.52", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }),
									(0, react_jsx_runtime.jsx)("line", { x1: "15.52", y1: "4.48", x2: "13.25", y2: "6.75", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }),
									(0, react_jsx_runtime.jsx)("line", { x1: "6.75", y1: "13.25", x2: "4.48", y2: "15.52", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" })
								]
							})
						]
					})
				]
			});
		}
		function Preset2NeumorphicIcon() {
			return (0, react_jsx_runtime.jsxs)("span", {
				className: "dsh_preset2_well_icon",
				"data-testid": "preset2-neumorphic-icon",
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						className: "dsh_preset2_well_glow",
						"aria-hidden": "true"
					}),
					(0, react_jsx_runtime.jsxs)("svg", {
						className: "dsh_preset2_well_svg",
						width: "16",
						height: "16",
						viewBox: "0 0 24 24",
						fill: "none",
						children: [
							(0, react_jsx_runtime.jsx)("rect", {
								x: "4",
								y: "4",
								width: "16",
								height: "16",
								rx: "5",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}),
							(0, react_jsx_runtime.jsx)("circle", {
								cx: "12",
								cy: "12",
								r: "3",
								stroke: "#FF6A2B",
								strokeWidth: "2",
								strokeLinecap: "round"
							})
						]
					})
				]
			});
		}
		const CUBES = [
			{
				id: "light",
				labelKey: "appearance.light",
				Icon: _deepseek_ai_dsh_client_ui_primitives.IconLightOutlineMedium
			},
			{
				id: "dark",
				labelKey: "appearance.dark",
				Icon: _deepseek_ai_dsh_client_ui_primitives.IconDarkOutlineMedium
			},
			{
				id: "system",
				labelKey: "appearance.system",
				Icon: _deepseek_ai_dsh_client_ui_primitives.IconFollowsystemOutlineMedium
			},
			{
				id: "preset-1",
				labelKey: "appearance.light",
				zhLabel: "高级灰",
				enLabel: "高级灰",
				Icon: Preset1MiniSliderIcon
			},
			{
				id: "preset-2",
				labelKey: "appearance.light",
				zhLabel: "极简橙",
				enLabel: "极简橙",
				Icon: Preset2NeumorphicIcon
			},
			{
				id: "preset-3",
				labelKey: "appearance.system",
				zhLabel: "预设 3",
				enLabel: "Preset 3",
				Icon: _deepseek_ai_dsh_client_ui_primitives.IconFollowsystemOutlineMedium
			}
		];
		/**
		* Render the Appearance row.
		* @param props - composed slot props.
		* @returns the row element tree.
		*/
		function AppearanceRow({ t, setTheme, useStore }) {
			const preference = useStore((s) => s.preference);
			const isZh = t("appearance.title") === "外观";
			return (0, react_jsx_runtime.jsxs)("div", {
				className: AppearanceRow_module_css_default.group,
				children: [(0, react_jsx_runtime.jsx)("div", {
					className: AppearanceRow_module_css_default.title,
					children: t("appearance.title")
				}), (0, react_jsx_runtime.jsx)("div", {
					className: AppearanceRow_module_css_default.cubeRow,
					children: CUBES.map(({ id, labelKey, zhLabel, enLabel, Icon }) => (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: clsx(AppearanceRow_module_css_default.themeCube, preference === id && AppearanceRow_module_css_default.selected),
						"aria-pressed": preference === id,
						onClick: () => {
							setTheme(id);
						},
						children: [(0, react_jsx_runtime.jsx)(Icon, { setTheme }), zhLabel ? (isZh ? zhLabel : enLabel) : t(labelKey)]
					}, id))
				})]
			});
		}`,
  );

  // Register the 3 preset ids in BUILTIN_THEMES (CSS rules on body[data-dsh-theme-id] own all token declarations for 0ms atomic switching)
  void LUMINEX_THEME_TOKENS;
  void PRESET2_THEME_TOKENS;
  content = content.replace(
    /const BUILTIN_THEMES = Object\.freeze\(\[[\s\S]*?\]\);/,
    `const BUILTIN_THEMES = Object.freeze([Object.freeze({
			id: "light",
			colorScheme: "light",
			tokens: Object.freeze({})
		}), Object.freeze({
			id: "dark",
			colorScheme: "dark",
			tokens: Object.freeze({})
		}), Object.freeze({
			id: "preset-1",
			colorScheme: "dark",
			tokens: Object.freeze({})
		}), Object.freeze({
			id: "preset-2",
			colorScheme: "light",
			tokens: Object.freeze({})
		}), Object.freeze({
			id: "preset-3",
			colorScheme: "light",
			tokens: Object.freeze({})
		})]);`,
  );

  // Persist custom preset selection and publish data-dsh-theme-id onto document.body
  content = content.replace(
    /setTheme\(id\) \{[\s\S]*?\n\t\t\t\}/,
    `setTheme(id) {
				if (id !== "system" && !this.themes.some((t) => t.id === id)) throw new Error(\`theme "\${id}" is not registered\`);
				if (this.preference === id) return;
				this.preference = id;
				try {
					if (isThemePreference(id)) {
						localStorage.removeItem("dsh_appearance_preset");
					} else {
						localStorage.setItem("dsh_appearance_preset", id);
					}
				} catch (_e) {}
				if (isThemePreference(id)) this.write(() => this.host.set(THEME_PREFERENCE_FIELD, id));
				this.publish();
			}`,
  );

  content = content.replace(
    /adopt\(\) \{[\s\S]*?\n\t\t\t\}/,
    `adopt() {
				if (this.pendingWrites > 0) return;
				let customPreset = null;
				try {
					customPreset = localStorage.getItem("dsh_appearance_preset");
				} catch (_e) {}
				const hasValidCustom = typeof customPreset === "string" && this.themes.some((t) => t.id === customPreset);
				const section = this.host.getSnapshot().value;
				if (section === void 0) {
					if (hasValidCustom && this.preference !== customPreset) {
						this.preference = customPreset;
						this.publish();
					}
					return;
				}
				const targetPreference = hasValidCustom ? customPreset : section.preference;
				const fontFamilies = durableFontFamilies(section);
				const fontSizes = sectionFontSizes(section);
				if (this.preference === targetPreference && FONT_ROLES.every((role) => this.fontSizes[role] === fontSizes[role] && this.fontFamilies[role] === fontFamilies[role])) return;
				this.preference = targetPreference;
				this.fontSizes = fontSizes;
				this.fontFamilies = fontFamilies;
				this.publish();
			}`,
  );

  const luminexRuntimeCode = buildLuminexCanvasRuntimeCode();
  content = content.replace(
    /(?:(?:function )?syncDshLuminexBackground\(themeId\) \{[\s\S]*?\n\t\t\}\n\t\t\t)?buildSnapshot\(\) \{[\s\S]*?\n\t\t\t\}/,
    `${luminexRuntimeCode}
			buildSnapshot() {
				const resolvedId = this.preference === "system" ? this.media?.matches === true ? "dark" : "light" : this.preference;
				const active = this.themes.find((t) => t.id === resolvedId);
				if (active === void 0) throw new Error(\`theme registry lost "\${resolvedId}"\`);
				this.syncDshLuminexBackground(active.id);
				return Object.freeze({
					preference: this.preference,
					fontSizes: this.fontSizes,
					fontFamilies: this.fontFamilies,
					active: this.composeActive(active),
					themes: Object.freeze([...this.themes]),
					revision: this.revision
				});
			}`,
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function patchCordisClientRunner(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-cordis-client-runner',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /sync: async \(providers\) => \{[\s\S]*?\n\t\t\t\t\},/,
    `sync: async (providers) => {
					const fn = ctx.remote?.dynamicCordisRunner?.syncInspectManifest;
					if (typeof fn !== "function") return;
					const answered = await fn(providers).catch(() => null);
					if (!answered?.ok) {
						const errMsg = \`\${answered?.error?.code ?? ""}: \${answered?.error?.message ?? ""}\`;
						if (
							answered?.error?.code === "gateway/cancelled" ||
							errMsg.includes("Failed to fetch") ||
							errMsg.includes("NetworkError") ||
							errMsg.includes("no active Connection") ||
							errMsg.includes("aborted")
						) {
							return;
						}
						throw new Error(errMsg);
					}
				},`,
  );

  content = content.replace(
    /(?:\t*if \(error && [\s\S]*?\) return;\n)?\t*console\.error\("\[cordis-client-runner\] syncing inspect providers failed:", error\);/,
    '\t\t\t\t\t\tif (error && (String(error.message || error).includes("syncInspectManifest") || String(error.message || error).includes("Failed to fetch") || String(error.message || error).includes("NetworkError") || String(error.message || error).includes("no active Connection") || String(error.message || error).includes("was aborted"))) return;\n\t\t\t\t\t\tconsole.error("[cordis-client-runner] syncing inspect providers failed:", error);',
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function patchUiCordisClient(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-client-ui-cordis',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /inventory: async \(\) => \{[\s\S]*?\n\t\t\t\};\n\t\t\tconst inventory = createCordisInventory\(port, \(error\) => \{[\s\S]*?\n\t\t\t\}\);/,
    `inventory: async () => {
					const isTransientCordisError = (msg) =>
						msg.includes("Failed to fetch") ||
						msg.includes("NetworkError") ||
						msg.includes("Load failed") ||
						msg.includes("gateway/cancelled") ||
						msg.includes("gateway/internal") ||
						msg.includes("dynamicCordisRunner") ||
						msg.includes("no active Connection") ||
						msg.includes("aborted") ||
						msg.includes("ECONNREFUSED");
					try {
						const fn = ctx.remote?.dynamicCordisRunner?.inventory;
						if (typeof fn !== "function") return [];
						let answered = await fn();
						if (!answered?.ok) {
							const errMsg = \`\${answered?.error?.code ?? "error"}: \${answered?.error?.message ?? ""}\`;
							if (isTransientCordisError(errMsg)) {
								await new Promise((r) => setTimeout(r, 800));
								answered = await fn().catch(() => null);
								if (!answered?.ok) {
									setTimeout(() => {
										try { inventory.refresh(); } catch (_e) {}
									}, 1600);
									return [];
								}
							} else {
								throw new Error(errMsg);
							}
						}
						return Array.isArray(answered.value) ? answered.value : [];
					} catch (err) {
						const msg = String(err?.message || err || "");
						if (isTransientCordisError(msg)) {
							setTimeout(() => {
								try { inventory.refresh(); } catch (_e) {}
							}, 1600);
							return [];
						}
						throw err;
					}
				}
			};
			const inventory = createCordisInventory(port, (error) => {
				const msg = String(error?.message || error || "");
				if (
					msg.includes("Failed to fetch") ||
					msg.includes("NetworkError") ||
					msg.includes("Load failed") ||
					msg.includes("gateway/cancelled") ||
					msg.includes("gateway/internal") ||
					msg.includes("dynamicCordisRunner") ||
					msg.includes("no active Connection") ||
					msg.includes("aborted") ||
					msg.includes("ECONNREFUSED")
				) {
					return;
				}
				console.error("[ui-cordis] reading the Cordis inventory failed:", error);
			});`,
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function patchApiSessionController(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-api-session-controller',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /failed: \(error\) => \{\n(?:\t*if \([\s\S]*?\) return;\n)?\t*console\.error\("\[session-controller\] control stream failed:", error\);\n\t*\}/,
    `failed: (error) => {
					if (error && (String(error.message || error).includes("signal is aborted") || String(error.message || error).includes("aborted without reason") || String(error.message || error).includes("Failed to fetch") || String(error.message || error).includes("NetworkError") || error.code === "gateway/cancelled")) return;
					console.error("[session-controller] control stream failed:", error);
				}`,
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

const SCHEDULE_GROUP_HUB_COMPONENT = `		function ensureDshGroupHubStore() {
			if (globalThis.__dshGroupHubStore) return globalThis.__dshGroupHubStore;
			const st = {
				rev: 0,
				rooms: [],
				agents: [],
				connectors: [],
				activeRoomId: "room-core-collab",
				groupExpanded: true,
				showAddRoom: false,
				loaded: false,
				loading: false,
				listeners: new Set(),
				emit() {
					st.rev++;
					st.listeners.forEach((fn) => {
						try {
							fn();
						} catch (_e) {}
					});
				},
				subscribe(fn) {
					st.listeners.add(fn);
					return () => st.listeners.delete(fn);
				},
				getSnapshot() {
					return st.rev;
				},
				setActiveRoom(roomId) {
					st.activeRoomId = roomId;
					st.emit();
				},
				setGroupExpanded(expanded) {
					st.groupExpanded = expanded;
					st.emit();
				},
				setShowAddRoom(open) {
					st.showAddRoom = open;
					st.emit();
				},
				updateFromApi(data) {
					if (!data || !data.ok) return;
					if (Array.isArray(data.agents)) st.agents = data.agents;
					if (Array.isArray(data.rooms)) {
						st.rooms = data.rooms;
						if (st.rooms.length > 0 && !st.rooms.some((r) => r.id === st.activeRoomId)) {
							st.activeRoomId = st.rooms[0].id;
						}
					}
					if (Array.isArray(data.connectors)) st.connectors = data.connectors;
					st.loaded = true;
					st.emit();
				},
				async load() {
					if (st.loading) return;
					st.loading = true;
					try {
						const resp = await fetch("/api/superagent-groups");
						if (resp.ok) {
							const data = await resp.json();
							st.updateFromApi(data);
						}
					} catch (_e) {
					} finally {
						st.loading = false;
					}
				}
			};
			globalThis.__dshGroupHubStore = st;
			return st;
		}
		function DshMultiAgentGroupHub() {
			const store = ensureDshGroupHubStore();
			const rev = (0, react.useSyncExternalStore)(store.subscribe, store.getSnapshot);
			void rev;
			const agents = store.agents || [];
			const rooms = store.rooms || [];
			const connectors = store.connectors || [];
			const activeRoomId = store.activeRoomId || "room-core-collab";
			const showAddRoom = Boolean(store.showAddRoom);

			const [sending, setSending] = (0, react.useState)(false);
			const [draftText, setDraftText] = (0, react.useState)("");
			const [senderSource, setSenderSource] = (0, react.useState)("human");
			const [showAddAgent, setShowAddAgent] = (0, react.useState)(false);
			const [showAddBot, setShowAddBot] = (0, react.useState)(false);
			const [newAgent, setNewAgent] = (0, react.useState)({
				name: "",
				handle: "",
				accountLabel: "",
				roleTitle: "",
				preset: "unrestricted",
				model: "deepseek-reasoner",
				apiKey: ""
			});
			const [newRoom, setNewRoom] = (0, react.useState)({
				name: "",
				description: "",
				collaborationMode: "auto_relay",
				maxRelayHops: 2
			});
			const [newBot, setNewBot] = (0, react.useState)({
				platform: "qq",
				name: "",
				targetGroupId: "",
				onebotHttpUrl: ""
			});
			const [notice, setNotice] = (0, react.useState)("");

			(0, react.useEffect)(() => {
				if (!store.loaded) store.load();
			}, [store]);

			const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

			const handleSend = async (overrideText, overrideSource) => {
				if (!activeRoom || sending) return;
				const text = (overrideText !== void 0 ? overrideText : draftText).trim();
				if (!text) return;
				const src = overrideSource || senderSource;
				setSending(true);
				setNotice("");
				try {
					let payload = {
						senderType: "human",
						senderId: "human-lead",
						senderName: "当前登录账户 · 主控台",
						senderBadge: "主控账户",
						platform: "dsh",
						text
					};
					if (src === "qq") {
						payload = {
							senderType: "external_bot",
							senderId: "qq-default",
							senderName: "QQ 群 · @群成员 (OneBot v11)",
							senderBadge: "QQ 群 (OneBot v11)",
							platform: "qq",
							text
						};
					} else if (src === "dingtalk") {
						payload = {
							senderType: "external_bot",
							senderId: "dingtalk-default",
							senderName: "钉钉群 · @研发值班",
							senderBadge: "钉钉机器人 (Stream)",
							platform: "dingtalk",
							text
						};
					} else if (src === "feishu") {
						payload = {
							senderType: "external_bot",
							senderId: "feishu-default",
							senderName: "飞书群 · @项目协同",
							senderBadge: "飞书机器人 (Lark)",
							platform: "feishu",
							text
						};
					} else if (src === "schedule") {
						payload = {
							senderType: "schedule",
							senderId: "schedule-cron",
							senderName: "自动化任务调度器",
							senderBadge: activeRoom.scheduleBinding || "定时巡检触发",
							platform: "schedule",
							text
						};
					}
					const resp = await fetch(\`/api/superagent-groups/rooms/\${encodeURIComponent(activeRoom.id)}/messages\`, {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify(payload)
					});
					const data = await resp.json();
					if (data.ok && Array.isArray(data.rooms)) {
						store.updateFromApi({ ok: true, rooms: data.rooms });
						if (overrideText === void 0) setDraftText("");
						const replyCount = Array.isArray(data.agentReplies) ? data.agentReplies.length : 0;
						setNotice(\`已完成 \${replyCount} 位跨账户 Agent 协同响应，并已向绑定群机器人同步回执。\`);
					}
				} catch (_e) {
					setNotice("发送失败，请稍后重试。");
				} finally {
					setSending(false);
				}
			};

			const handleCreateAgent = async () => {
				if (!newAgent.name.trim()) return;
				const resp = await fetch("/api/superagent-groups/agents", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(newAgent)
				});
				const data = await resp.json();
				if (data.ok) {
					store.updateFromApi({ ok: true, agents: data.agents || [], rooms: data.rooms || [] });
					setNewAgent({
						name: "",
						handle: "",
						accountLabel: "",
						roleTitle: "",
						preset: "unrestricted",
						model: "deepseek-reasoner",
						apiKey: ""
					});
					setShowAddAgent(false);
					setNotice(\`已添加跨账户 Agent「\${data.agent?.name}」(@\${data.agent?.handle}) 并拉入当前协同群。\`);
				}
			};

			const handleCreateRoom = async () => {
				if (!newRoom.name.trim()) return;
				const resp = await fetch("/api/superagent-groups/rooms", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						...newRoom,
						agentIds: agents.map((a) => a.id),
						connectorIds: connectors.map((c) => c.id)
					})
				});
				const data = await resp.json();
				if (data.ok && data.room) {
					store.updateFromApi({ ok: true, rooms: data.rooms || [] });
					store.setActiveRoom(data.room.id);
					store.setShowAddRoom(false);
					setNewRoom({
						name: "",
						description: "",
						collaborationMode: "auto_relay",
						maxRelayHops: 2
					});
					setNotice(\`已创建新协同群「\${data.room.name}」（联邦邀请码：\${data.room.inviteCode}），已同步至左侧工作区「群组」列表。\`);
				}
			};

			const handleCreateQuickBot = async () => {
				const resp = await fetch("/api/superagent-connectors", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						platform: newBot.platform,
						name: newBot.name.trim() || void 0,
						credentials: newBot.platform === "qq" ? {
							protocolMode: "onebot_v11",
							targetGroupId: newBot.targetGroupId || "748291032",
							onebotHttpUrl: newBot.onebotHttpUrl || ""
						} : {}
					})
				});
				const data = await resp.json();
				if (data.ok && data.connector && activeRoom) {
					const nextConnIds = Array.from(new Set([...(activeRoom.connectorIds || []), data.connector.id]));
					const roomResp = await fetch(\`/api/superagent-groups/rooms/\${encodeURIComponent(activeRoom.id)}\`, {
						method: "PUT",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({ connectorIds: nextConnIds })
					});
					const roomData = await roomResp.json();
					store.updateFromApi({
						ok: true,
						connectors: data.connectors || [],
						rooms: roomData.ok ? roomData.rooms : rooms
					});
					setNewBot({ platform: "qq", name: "", targetGroupId: "", onebotHttpUrl: "" });
					setShowAddBot(false);
					setNotice(\`已接入并拉入群机器人「\${data.connector.name}」。\`);
				}
			};

			const toggleRoomAgent = async (agentId) => {
				if (!activeRoom) return;
				const exists = activeRoom.agentIds.includes(agentId);
				const nextIds = exists
					? activeRoom.agentIds.filter((id) => id !== agentId)
					: [...activeRoom.agentIds, agentId];
				const resp = await fetch(\`/api/superagent-groups/rooms/\${encodeURIComponent(activeRoom.id)}\`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ agentIds: nextIds })
				});
				const data = await resp.json();
				if (data.ok) store.updateFromApi({ ok: true, rooms: data.rooms || [] });
			};

			const toggleRoomConnector = async (connectorId) => {
				if (!activeRoom) return;
				const exists = activeRoom.connectorIds.includes(connectorId);
				const nextIds = exists
					? activeRoom.connectorIds.filter((id) => id !== connectorId)
					: [...activeRoom.connectorIds, connectorId];
				const resp = await fetch(\`/api/superagent-groups/rooms/\${encodeURIComponent(activeRoom.id)}\`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ connectorIds: nextIds })
				});
				const data = await resp.json();
				if (data.ok) store.updateFromApi({ ok: true, rooms: data.rooms || [] });
			};

			const updateRoomMode = async (collaborationMode, maxRelayHops) => {
				if (!activeRoom) return;
				const resp = await fetch(\`/api/superagent-groups/rooms/\${encodeURIComponent(activeRoom.id)}\`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ collaborationMode, maxRelayHops })
				});
				const data = await resp.json();
				if (data.ok) store.updateFromApi({ ok: true, rooms: data.rooms || [] });
			};

			const [fedJoin, setFedJoin] = (0, react.useState)({
				inviteCode: "",
				agentName: "",
				handle: "",
				accountLabel: "",
				remoteBridgeUrl: ""
			});

			const handleFederationJoin = async () => {
				if (!fedJoin.inviteCode.trim() && !activeRoom) return;
				const resp = await fetch("/api/superagent-groups/federation/join", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						inviteCode: fedJoin.inviteCode.trim() || activeRoom?.inviteCode || "",
						agentName: fedJoin.agentName.trim() || "远端联邦 Agent",
						handle: fedJoin.handle.trim() || void 0,
						accountLabel: fedJoin.accountLabel.trim() || "跨实例联邦节点账户",
						remoteBridgeUrl: fedJoin.remoteBridgeUrl.trim()
					})
				});
				const data = await resp.json();
				if (data.ok) {
					store.updateFromApi({ ok: true, agents: data.agents || [], rooms: data.rooms || [] });
					setFedJoin({ inviteCode: "", agentName: "", handle: "", accountLabel: "", remoteBridgeUrl: "" });
					setNotice(\`已通过联邦邀请码接入远端 Agent「\${data.agent?.name}」(@\${data.agent?.handle})。\`);
				} else {
					setNotice(data.error || "联邦接入失败，请检查邀请码。");
				}
			};

			return (0, react_jsx_runtime.jsx)("section", {
				className: TaskManagerPage_module_css_default.page,
				"aria-label": activeRoom ? \`\${activeRoom.name} · 群设置\` : "群组配置中心",
				"data-testid": "dsh-group-hub-page",
				children: (0, react_jsx_runtime.jsx)("div", {
					className: TaskManagerPage_module_css_default.listPane,
					children: (0, react_jsx_runtime.jsx)("div", {
						className: TaskManagerPage_module_css_default.pageScroll,
						children: (0, react_jsx_runtime.jsxs)("div", {
							className: TaskManagerPage_module_css_default.pageContent,
							style: { maxWidth: 1120, width: "100%", boxSizing: "border-box" },
							children: [
								(0, react_jsx_runtime.jsxs)("div", {
									className: TaskManagerPage_module_css_default.pageHeading,
									children: [
										(0, react_jsx_runtime.jsxs)("div", {
											style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
											children: [
												(0, react_jsx_runtime.jsx)("h1", {
													children: activeRoom ? \`\${activeRoom.name} · 群成员与机器人设置\` : "群组配置中心"
												}),
												activeRoom && (0, react_jsx_runtime.jsx)("span", {
													className: "dsh-ghub-badge",
													children: \`跨实例联邦邀请码: \${activeRoom.inviteCode}\`
												})
											]
										}),
										(0, react_jsx_runtime.jsx)("div", {
											style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
											children: (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: "dsh-ghub-btn dsh-ghub-btn-primary",
												"data-testid": "back-to-native-group-chat-btn",
												onClick: () => {
													if (activeRoom) {
														store.activeRoomMode = true;
														store.setActiveRoom(activeRoom.id);
														fetch("/api/superagent-groups/active-room", {
															method: "POST",
															headers: { "content-type": "application/json" },
															body: JSON.stringify({ roomId: activeRoom.id })
														}).catch(() => {});
													}
													globalThis.__dshSelectMainPanel?.(null);
												},
												children: "返回主界面群聊"
											})
										})
									]
								}),
								notice && (0, react_jsx_runtime.jsx)("div", {
									className: "dsh-ghub-card",
									style: { fontSize: 12.5, marginBottom: 12, borderColor: "var(--dsw-alias-brand-primary)" },
									children: notice
								}),
								!store.loaded && rooms.length === 0 ? (0, react_jsx_runtime.jsx)("div", {
									className: "dsh-ghub-card",
									children: "正在加载跨账户 Agent 与多平台机器人群组配置中心..."
								}) : (0, react_jsx_runtime.jsxs)("div", {
									"data-testid": "dsh-multi-agent-group-hub",
									style: {
										display: "grid",
										gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
										gap: 14,
										alignItems: "start"
									},
									children: [
										(0, react_jsx_runtime.jsxs)("div", {
											className: "dsh-ghub-card",
											children: [
												(0, react_jsx_runtime.jsxs)("div", {
													className: "dsh-ghub-section-title",
													children: [
														(0, react_jsx_runtime.jsx)("span", { children: \`1. 跨账户 DeepSeek Agent (\${agents.length})\` }),
														(0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: "dsh-ghub-btn",
															"data-testid": "add-group-agent-btn",
															onClick: () => setShowAddAgent((v) => !v),
															children: showAddAgent ? "收起" : "+ 新增账户 Agent"
														})
													]
												}),
												showAddAgent && (0, react_jsx_runtime.jsxs)("div", {
													className: "dsh-ghub-card",
													style: { marginBottom: 8 },
													children: [
														(0, react_jsx_runtime.jsx)("input", {
															className: "dsh-ghub-input",
															placeholder: "Agent 名称（如：数据工程 Agent）",
															title: "Agent 名称（如：数据工程 Agent）",
															value: newAgent.name,
															onChange: (e) => setNewAgent({ ...newAgent, name: e.target.value })
														}),
														(0, react_jsx_runtime.jsx)("input", {
															className: "dsh-ghub-input",
															placeholder: "@点名代号（如：data，留空自动生成）",
															title: "@点名代号（如：data，留空自动生成）",
															value: newAgent.handle,
															onChange: (e) => setNewAgent({ ...newAgent, handle: e.target.value })
														}),
														(0, react_jsx_runtime.jsx)("input", {
															className: "dsh-ghub-input",
															placeholder: "所属账户标签（如：DeepSeek 账号 D）",
															title: "所属 DeepSeek 登录账户标签（如：DeepSeek 账号 D）",
															value: newAgent.accountLabel,
															onChange: (e) => setNewAgent({ ...newAgent, accountLabel: e.target.value })
														}),
														(0, react_jsx_runtime.jsx)("input", {
															className: "dsh-ghub-input",
															placeholder: "职责角色（如：SQL 性能优化与数据清洗）",
															title: "职责角色（如：SQL 性能优化与数据清洗）",
															value: newAgent.roleTitle,
															onChange: (e) => setNewAgent({ ...newAgent, roleTitle: e.target.value })
														}),
														(0, react_jsx_runtime.jsxs)("select", {
															className: "dsh-ghub-select",
															title: "选择该 Agent 的系统提示词预设模式",
															value: newAgent.preset,
															onChange: (e) => setNewAgent({ ...newAgent, preset: e.target.value }),
															children: [
																(0, react_jsx_runtime.jsx)("option", { value: "unrestricted", children: "预设模式：无限制破甲 (Unrestricted)" }),
																(0, react_jsx_runtime.jsx)("option", { value: "redteam", children: "预设模式：红队安全演练 (Redteam)" }),
																(0, react_jsx_runtime.jsx)("option", { value: "standard", children: "预设模式：标准协同 (Standard)" })
															]
														}),
														(0, react_jsx_runtime.jsx)("input", {
															type: "password",
															className: "dsh-ghub-input",
															placeholder: "专属 API Key（选填，留空复用主网关）",
															title: "该账户专属 DeepSeek API Key（选填，留空复用主网关）",
															value: newAgent.apiKey,
															onChange: (e) => setNewAgent({ ...newAgent, apiKey: e.target.value })
														}),
														(0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: "dsh-ghub-btn dsh-ghub-btn-primary",
															onClick: handleCreateAgent,
															children: "保存并拉入当前协同群"
														})
													]
												}),
												(0, react_jsx_runtime.jsx)("div", {
													style: { display: "flex", flexDirection: "column", gap: 6 },
													children: agents.map((ag) => {
														const inRoom = activeRoom?.agentIds.includes(ag.id);
														const agStatus = store.resolveRoomMemberStatus ? store.resolveRoomMemberStatus("agent", ag, activeRoom) : "活跃";
														const roomLabel = activeRoom?.name || "协同群";
														return (0, react_jsx_runtime.jsxs)("div", {
															className: "dsh-ghub-card",
															"data-testid": \`ghub-agent-card-\${ag.handle}\`,
															"data-dsh-tip-member": "true",
															"data-dsh-tip-title": \`@\${ag.handle} \${ag.name}（\${agStatus}）\`,
															"data-dsh-tip": \`来源：群组（\${roomLabel}） · 节点：\${ag.accountLabel} · 职责：\${ag.roleTitle}\\n\${inRoom ? "当前已在本群启用，点击右侧按钮可切换启用状态。" : "当前未在本群启用，点击可立即启用并拉入当前协同群。"}\`,
															"data-dsh-tip-tag": "点击启用 · 来源：群组",
															children: [
																(0, react_jsx_runtime.jsxs)("div", {
																	style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 },
																	children: [
																		(0, react_jsx_runtime.jsxs)("span", {
																			style: { fontWeight: 600, fontSize: 12.5, display: "inline-flex", alignItems: "center", gap: 6 },
																			children: [
																				ag.name,
																				(0, react_jsx_runtime.jsx)("span", {
																					className: "dsh-ghub-badge",
																					children: \`@\${ag.handle}\`
																				})
																			]
																		}),
																		(0, react_jsx_runtime.jsx)("button", {
																			type: "button",
																			className: "dsh-ghub-btn",
																			"data-active": inRoom ? "true" : "false",
																			"data-dsh-tip-member": "true",
																			"data-dsh-tip-title": \`@\${ag.handle} \${ag.name}（\${agStatus}）\`,
																			"data-dsh-tip": \`来源：群组（\${roomLabel}） · 节点：\${ag.accountLabel} · 职责：\${ag.roleTitle}\\n\${inRoom ? "当前已在本群启用，点击可切换启用状态。" : "当前未在本群启用，点击立即启用并拉入当前协同群。"}\`,
																			"data-dsh-tip-tag": "点击启用 · 来源：群组",
																			style: { padding: "2px 8px", fontSize: 11 },
																			onClick: () => toggleRoomAgent(ag.id),
																			children: inRoom ? "已在群内" : "拉入本群"
																		})
																	]
																}),
																(0, react_jsx_runtime.jsx)("div", {
																	style: { fontSize: 11.5, color: "var(--dsw-alias-label-secondary)" },
																	children: \`\${ag.accountLabel} · \${ag.roleTitle}\`
																}),
																(0, react_jsx_runtime.jsxs)("div", {
																	style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" },
																	children: [
																		(0, react_jsx_runtime.jsx)("span", {
																			className: "dsh-ghub-badge",
																			children: ag.preset === "redteam" ? "红队 Redteam" : ag.preset === "unrestricted" ? "破甲 Unrestricted" : "标准 Standard"
																		}),
																		ag.remoteBridgeUrl && (0, react_jsx_runtime.jsx)("span", {
																			className: "dsh-ghub-badge",
																			children: \`联邦节点: \${ag.remoteBridgeUrl}\`
																		})
																	]
																})
															]
														}, ag.id);
													})
												})
											]
										}),
										(0, react_jsx_runtime.jsxs)("div", {
											className: "dsh-ghub-card",
											children: [
												(0, react_jsx_runtime.jsxs)("div", {
													className: "dsh-ghub-section-title",
													children: [
														(0, react_jsx_runtime.jsx)("span", { children: \`2. 群内外部机器人 (QQ / 钉钉 / 飞书) (\${connectors.length})\` }),
														(0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: "dsh-ghub-btn",
															"data-testid": "add-group-bot-btn",
															onClick: () => setShowAddBot((v) => !v),
															children: showAddBot ? "收起" : "+ 拉入外部机器人"
														})
													]
												}),
												showAddBot && (0, react_jsx_runtime.jsxs)("div", {
													className: "dsh-ghub-card",
													style: { marginBottom: 8 },
													children: [
														(0, react_jsx_runtime.jsxs)("select", {
															className: "dsh-ghub-select",
															title: "选择外部机器人所属平台协议",
															value: newBot.platform,
															onChange: (e) => setNewBot({ ...newBot, platform: e.target.value }),
															children: [
																(0, react_jsx_runtime.jsx)("option", { value: "qq", children: "QQ 群机器人 (OneBot v11 / 官方 Bot)" }),
																(0, react_jsx_runtime.jsx)("option", { value: "dingtalk", children: "钉钉机器人 (Stream / Webhook)" }),
																(0, react_jsx_runtime.jsx)("option", { value: "feishu", children: "飞书 / Lark 机器人" }),
																(0, react_jsx_runtime.jsx)("option", { value: "wecom", children: "企业微信机器人 (WeCom)" }),
																(0, react_jsx_runtime.jsx)("option", { value: "custom", children: "自定义 Webhook 机器人" })
															]
														}),
														(0, react_jsx_runtime.jsx)("input", {
															className: "dsh-ghub-input",
															placeholder: "机器人名称（如：QQ 运维群机器人）",
															title: "机器人实例名称（如：QQ 运维告警二群机器人）",
															value: newBot.name,
															onChange: (e) => setNewBot({ ...newBot, name: e.target.value })
														}),
														newBot.platform === "qq" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
															children: [
																(0, react_jsx_runtime.jsx)("input", {
																	className: "dsh-ghub-input",
																	placeholder: "绑定 QQ 群号（如：748291032）",
																	title: "绑定 QQ 群号 / Group OpenID（如 748291032）",
																	value: newBot.targetGroupId,
																	onChange: (e) => setNewBot({ ...newBot, targetGroupId: e.target.value })
																}),
																(0, react_jsx_runtime.jsx)("input", {
																	className: "dsh-ghub-input",
																	placeholder: "OneBot 地址（选填：http://127.0.0.1:3001）",
																	title: "OneBot v11 HTTP 地址（选填，如 http://127.0.0.1:3001）",
																	value: newBot.onebotHttpUrl,
																	onChange: (e) => setNewBot({ ...newBot, onebotHttpUrl: e.target.value })
																})
															]
														}),
														(0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: "dsh-ghub-btn dsh-ghub-btn-primary",
															onClick: handleCreateQuickBot,
															children: "创建并拉入当前协同群"
														})
													]
												}),
												(0, react_jsx_runtime.jsx)("div", {
													style: { display: "flex", flexDirection: "column", gap: 6 },
													children: connectors.map((conn) => {
														const bound = activeRoom?.connectorIds.includes(conn.id);
														const botStatus = store.resolveRoomMemberStatus ? store.resolveRoomMemberStatus("bot", conn, activeRoom) : "活跃";
														const roomLabel = activeRoom?.name || "协同群";
														const cleanBotName = String(conn.name || "Bot").replace(/\\s*\\([^)]*\\)\\s*$/g, "").trim();
														return (0, react_jsx_runtime.jsxs)("div", {
															className: "dsh-ghub-card",
															"data-testid": \`ghub-bot-card-\${conn.id}\`,
															"data-dsh-tip-member": "true",
															"data-dsh-tip-title": \`Bot · \${cleanBotName}（\${botStatus}）\`,
															"data-dsh-tip": \`来源：群组（\${roomLabel}） · 协议：\${conn.productName} · Webhook：/api/superagent-connectors/\${conn.id}/webhook\\n\${bound ? "当前已在本群启用，点击右侧按钮可切换启用状态。" : "当前未在本群启用，点击可立即启用并拉入当前协同群。"}\`,
															"data-dsh-tip-tag": "点击启用 · 来源：群组",
															style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
															children: [
																(0, react_jsx_runtime.jsxs)("div", {
																	style: { minWidth: 0 },
																	children: [
																		(0, react_jsx_runtime.jsx)("div", {
																			style: { fontSize: 12.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
																			children: conn.name
																		}),
																		(0, react_jsx_runtime.jsx)("div", {
																			style: { fontSize: 11, color: "var(--dsw-alias-label-secondary)" },
																			children: \`\${conn.productName} · /api/superagent-connectors/\${conn.id}/webhook\`
																		})
																	]
																}),
																(0, react_jsx_runtime.jsx)("button", {
																	type: "button",
																	className: "dsh-ghub-btn",
																	"data-active": bound ? "true" : "false",
																	"data-dsh-tip-member": "true",
																	"data-dsh-tip-title": \`Bot · \${cleanBotName}（\${botStatus}）\`,
																	"data-dsh-tip": \`来源：群组（\${roomLabel}） · 协议：\${conn.productName} · Webhook：/api/superagent-connectors/\${conn.id}/webhook\\n\${bound ? "当前已在本群启用，点击可切换启用状态。" : "当前未在本群启用，点击立即启用并拉入当前协同群。"}\`,
																	"data-dsh-tip-tag": "点击启用 · 来源：群组",
																	style: { padding: "2px 8px", fontSize: 11 },
																	onClick: () => toggleRoomConnector(conn.id),
																	children: bound ? "已入群" : "拉入群"
																})
															]
														}, conn.id);
													})
												})
											]
										}),
										(0, react_jsx_runtime.jsxs)("div", {
											className: "dsh-ghub-card",
											children: [
												(0, react_jsx_runtime.jsx)("div", {
													className: "dsh-ghub-section-title",
													children: (0, react_jsx_runtime.jsx)("span", { children: "3. 跨实例联邦联机 (Federation) 与群策略" })
												}),
												activeRoom && (0, react_jsx_runtime.jsxs)("div", {
													style: { display: "flex", flexDirection: "column", gap: 8 },
													children: [
														(0, react_jsx_runtime.jsxs)("select", {
															className: "dsh-ghub-select",
															"aria-label": "群组协同路由模式",
															value: activeRoom.collaborationMode,
															onChange: (e) => updateRoomMode(e.target.value, activeRoom.maxRelayHops),
															children: [
																(0, react_jsx_runtime.jsx)("option", { value: "auto_relay", children: "协同策略：多账户 Agent 自动接力 (Auto Relay)" }),
																(0, react_jsx_runtime.jsx)("option", { value: "smart_mention", children: "协同策略：@点名智能路由 (Smart Mention)" }),
																(0, react_jsx_runtime.jsx)("option", { value: "all_broadcast", children: "协同策略：全员并发会诊 (All Broadcast)" })
															]
														}),
														(0, react_jsx_runtime.jsxs)("div", {
															style: { fontSize: 12, color: "var(--dsw-alias-label-secondary)", lineHeight: 1.55 },
															children: [
																"本群联邦接入端点：",
																(0, react_jsx_runtime.jsx)("code", {
																	style: { display: "block", marginTop: 2, padding: "4px 8px", borderRadius: 6, background: "var(--dsw-alias-bg-layer-2, rgba(128,128,128,0.08))" },
																	children: \`POST /api/superagent-groups/federation/join (邀请码: \${activeRoom.inviteCode})\`
																})
															]
														}),
														(0, react_jsx_runtime.jsx)("input", {
															className: "dsh-ghub-input",
															placeholder: \`联邦邀请码（默认本群：\${activeRoom.inviteCode}）\`,
															value: fedJoin.inviteCode,
															onChange: (e) => setFedJoin({ ...fedJoin, inviteCode: e.target.value })
														}),
														(0, react_jsx_runtime.jsx)("input", {
															className: "dsh-ghub-input",
															placeholder: "对方联邦 Agent 名称（如：友方安全实验室 Agent）",
															value: fedJoin.agentName,
															onChange: (e) => setFedJoin({ ...fedJoin, agentName: e.target.value })
														}),
														(0, react_jsx_runtime.jsx)("input", {
															className: "dsh-ghub-input",
															placeholder: "对方实例 Bridge 地址（如 https://peer-dsh.run.app）",
															value: fedJoin.remoteBridgeUrl,
															onChange: (e) => setFedJoin({ ...fedJoin, remoteBridgeUrl: e.target.value })
														}),
														(0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: "dsh-ghub-btn dsh-ghub-btn-primary",
															"data-testid": "federation-join-btn",
															onClick: handleFederationJoin,
															children: "通过联邦邀请码接入远端 Agent"
														})
													]
												})
											]
										})
									]
								})
							]
						})
					})
				})
			});
		}`;

function patchScheduleGroupHubClient(rootDir: string): void {
  const filePath = path.join(
    rootDir,
    'node_modules',
    '@deepseek-ai',
    'dsh-client-ui-schedule',
    'lib',
    'client.js',
  );
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace or inject DshMultiAgentGroupHub component before TaskManagerPage
  if (content.includes('function DshMultiAgentGroupHub()')) {
    content = content.replace(
      /(?:\t\tfunction ensureDshGroupHubStore\(\) \{[\s\S]*?\n\t\t\}\n)?\t\tfunction DshMultiAgentGroupHub\(\) \{[\s\S]*?\n\t\t\}\n\t\tfunction TaskManagerPage\(props\) \{/,
      `${SCHEDULE_GROUP_HUB_COMPONENT}\n\t\tfunction TaskManagerPage(props) {`,
    );
  } else {
    content = content.replace(
      '\t\tfunction TaskManagerPage(props) {',
      `${SCHEDULE_GROUP_HUB_COMPONENT}\n\t\tfunction TaskManagerPage(props) {`,
    );
  }

  // 2. Restore TaskManagerPage ("schedules") to pure scheduled tasks (no rooms or mode bar inside 自动化任务)
  content = content.replace(
    '\n\t\t\tconst [hubView, setHubView] = (0, react.useState)("groups");',
    '',
  );
  content = content.replace(
    /\t\t\t\t\t\t\t\t\t\(0, react_jsx_runtime\.jsxs\)\("div", \{\n\t\t\t\t\t\t\t\t\t\tclassName: "dsh-ghub-mode-bar",[\s\S]*?hubView === "groups" \? \(0, react_jsx_runtime\.jsx\)\(DshMultiAgentGroupHub, \{\}\) : \(0, react_jsx_runtime\.jsxs\)\(react_jsx_runtime\.Fragment, \{ children: \[\n\t\t\t\t\t\t\t\t\t\(0, react_jsx_runtime\.jsx\)\("div", \{\n\t\t\t\t\t\t\t\t\t\tclassName: TaskManagerPage_module_css_default\.filters,/,
    `\t\t\t\t\t\t\t\t\t(0, react_jsx_runtime.jsx)("div", {
										className: TaskManagerPage_module_css_default.filters,`,
  );
  content = content.replace(
    /\t\t\t\t\t\t\t\t\t\t\t\t\}\)\n\t\t\t\t\t\t\t\t\t\t\t\}\)\n\t\t\t\t\t\t\t\t\t\t\]\n\t\t\t\t\t\t\t\t\t\}\)\n\t\t\t\t\t\t\t\t\t\] \}\),\n\t\t\t\t\t\t\t\t\]\n\t\t\t\t\t\t\t\}\)\n\t\t\t\t\t\t\}\)\n\t\t\t\t\t\}\),/,
    `\t\t\t\t\t\t\t\t\t\t\t\t})
											})
										]
									})
								]
							})
						})
					}),`,
  );

  // 3. Register DshMultiAgentGroupHub as its own main panel ("dsh-group-hub")
  if (!content.includes('key: "dsh-group-hub"')) {
    content = content.replace(
      '}, TaskManagerPage));',
      `}, TaskManagerPage));
				yield ctx.slots.inject("main", () => ctx.slots.register({
					name: "main",
					key: "dsh-group-hub",
					locale: MANAGER_NS
				}, DshMultiAgentGroupHub));`,
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

export function applyDshClientPatches(rootDir = process.cwd()): void {
  patchBrandOfficial(rootDir);
  patchSidebarClient(rootDir);
  patchThemeClient(rootDir);
  patchConversationClient(rootDir);
  patchWorkspaceClient(rootDir);
  patchSessionClient(rootDir);
  patchSidebarRightClient(rootDir);
  patchAgentPresetClient(rootDir);
  patchCordisClientRunner(rootDir);
  patchUiCordisClient(rootDir);
  patchApiSessionController(rootDir);
  patchScheduleGroupHubClient(rootDir);
}




