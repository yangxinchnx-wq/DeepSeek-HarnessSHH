export interface TabDragBounds {
  containerWidth: number;
  tabOffsetLeft: number;
  tabWidth: number;
  scrollLeft: number;
}

/**
 * Clamps horizontal drag delta (dx) so the dragged tab never leaves
 * the visible horizontal bounds of the tab strip container.
 */
export function clampTabDragDx(rawDx: number, bounds: TabDragBounds): number {
  const visualLeft = bounds.tabOffsetLeft - bounds.scrollLeft;
  const minDx = -visualLeft;
  const maxDx = Math.max(0, bounds.containerWidth - (visualLeft + bounds.tabWidth));
  if (rawDx < minDx) return minDx;
  if (rawDx > maxDx) return maxDx;
  return rawDx;
}

/**
 * Reorders `tabIds` when the dragged tab's center crosses a neighbor's midpoint.
 * Returns the updated order and the anchor X adjustment so the dragged tab stays under the pointer.
 */
export function reorderTabsByCenter(
  tabIds: readonly string[],
  draggedId: string,
  draggedCenterX: number,
  tabRects: ReadonlyArray<{ id: string; left: number; width: number }>,
  gap = 6,
): { order: string[]; anchorShiftX: number } {
  const currentIndex = tabIds.indexOf(draggedId);
  if (currentIndex === -1) {
    return { order: [...tabIds], anchorShiftX: 0 };
  }

  let targetIndex = currentIndex;
  let anchorShiftX = 0;

  if (currentIndex > 0) {
    const prevId = tabIds[currentIndex - 1];
    const prevRect = tabRects.find((r) => r.id === prevId);
    if (prevRect && draggedCenterX < prevRect.left + prevRect.width / 2) {
      targetIndex = currentIndex - 1;
      anchorShiftX = -(prevRect.width + gap);
    }
  }

  if (targetIndex === currentIndex && currentIndex < tabIds.length - 1) {
    const nextId = tabIds[currentIndex + 1];
    const nextRect = tabRects.find((r) => r.id === nextId);
    if (nextRect && draggedCenterX > nextRect.left + nextRect.width / 2) {
      targetIndex = currentIndex + 1;
      anchorShiftX = nextRect.width + gap;
    }
  }

  if (targetIndex === currentIndex) {
    return { order: [...tabIds], anchorShiftX: 0 };
  }

  const nextOrder = [...tabIds];
  const [moved] = nextOrder.splice(currentIndex, 1);
  nextOrder.splice(targetIndex, 0, moved);
  return { order: nextOrder, anchorShiftX };
}

/**
 * Computes the next horizontal scrollLeft for wheel events on the tab bar.
 * Scrolling is strictly disabled when the tabs do not overflow the container.
 */
export function computeTabWheelScrollLeft(params: {
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
  deltaX: number;
  deltaY: number;
}): { overflows: boolean; nextScrollLeft: number } {
  const { scrollLeft, scrollWidth, clientWidth, deltaX, deltaY } = params;
  const maxScrollLeft = scrollWidth - clientWidth;
  if (maxScrollLeft <= 1) {
    return { overflows: false, nextScrollLeft: 0 };
  }
  const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
  const clamped = Math.max(0, Math.min(maxScrollLeft, scrollLeft + delta));
  return { overflows: true, nextScrollLeft: clamped };
}

export interface SessionLikeSummary {
  id: string;
  blank?: boolean;
  running?: boolean;
  origin?: string;
  title?: string;
  displayTitle?: string;
}

export interface BrowserTabsStateSnapshot {
  order: string[];
  closedIds: Set<string>;
  customTitles: Map<string, string>;
  noTabsHomeMode: boolean;
  homeStandbySessionId: string | null;
}

/**
 * Derives the visible tab IDs and whether `noTabsHomeMode` should auto-exit
 * because the user sent a message in the home standby session.
 */
export function deriveVisibleTabIds(params: {
  workspaceSessionIds: readonly string[];
  allSessionIds: readonly string[];
  archivedSessionIds: readonly string[];
  byId: Record<string, SessionLikeSummary | undefined>;
  state: BrowserTabsStateSnapshot;
}): {
  visibleTabIds: string[];
  shouldExitHomeMode: boolean;
} {
  const { workspaceSessionIds, allSessionIds, archivedSessionIds, byId, state } = params;
  const archivedSet = new Set(archivedSessionIds);

  let shouldExitHomeMode = false;
  if (state.noTabsHomeMode && state.homeStandbySessionId) {
    const standbySummary = byId[state.homeStandbySessionId];
    if (standbySummary && (!standbySummary.blank || standbySummary.running)) {
      shouldExitHomeMode = true;
    }
  }

  const effectiveNoTabsHomeMode = state.noTabsHomeMode && !shouldExitHomeMode;
  const hiddenStandbyId = effectiveNoTabsHomeMode ? state.homeStandbySessionId : null;

  const validSet = new Set<string>();
  const validCandidates: string[] = [];

  for (const id of [...workspaceSessionIds, ...allSessionIds]) {
    if (!id || validSet.has(id) || archivedSet.has(id) || state.closedIds.has(id)) continue;
    if (hiddenStandbyId && id === hiddenStandbyId) continue;
    const summary = byId[id];
    if (!summary) {
      // The session listing can omit a session the workspace still references.
      // A tab the user already opened must not vanish on recompute — keep it;
      // unopened ids stay hidden as before.
      if (state.order.includes(id)) {
        validSet.add(id);
        validCandidates.push(id);
      }
      continue;
    }
    if (summary.origin === 'subagent') continue;
    if (effectiveNoTabsHomeMode && summary.blank) continue;
    validSet.add(id);
    validCandidates.push(id);
  }

  // Opened tabs survive list churn: keep ids from `order` that neither the
  // workspace nor the session list mentions anymore (closed/archived excluded).
  for (const orderId of state.order) {
    if (!orderId || validSet.has(orderId) || archivedSet.has(orderId) || state.closedIds.has(orderId)) continue;
    if (hiddenStandbyId && orderId === hiddenStandbyId) continue;
    validSet.add(orderId);
    validCandidates.push(orderId);
  }

  const nextOrder: string[] = [];
  const included = new Set<string>();
  for (const id of state.order) {
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

  return {
    visibleTabIds: nextOrder,
    shouldExitHomeMode,
  };
}

export type SessionSwitchSource = 'tabs' | 'sidebar' | 'other';
export type SessionSwitchDirection =
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'fade-up';

/**
 * Resolves the spatial transition direction when switching between two sessions
 * so tab switches glide horizontally and sidebar switches glide vertically.
 */
export function resolveSessionSwitchDirection(
  order: readonly string[],
  prevId: string | undefined | null,
  nextId: string | undefined | null,
  source: SessionSwitchSource = 'other',
): SessionSwitchDirection {
  if (!prevId || !nextId || prevId === nextId) {
    return 'fade-up';
  }
  const prevIdx = order.indexOf(prevId);
  const nextIdx = order.indexOf(nextId);
  if (prevIdx === -1 || nextIdx === -1 || prevIdx === nextIdx) {
    return 'fade-up';
  }
  if (source === 'tabs') {
    return nextIdx > prevIdx ? 'slide-left' : 'slide-right';
  }
  if (source === 'sidebar') {
    return nextIdx > prevIdx ? 'slide-up' : 'slide-down';
  }
  return 'fade-up';
}

export const GROUP_ROOM_TAB_PREFIX = '__room__:';

export function makeGroupRoomTabId(roomId: string): string {
  return `${GROUP_ROOM_TAB_PREFIX}${roomId}`;
}

export function parseGroupRoomTabId(tabId: string | undefined | null): string | null {
  if (!tabId || !tabId.startsWith(GROUP_ROOM_TAB_PREFIX)) return null;
  const roomId = tabId.slice(GROUP_ROOM_TAB_PREFIX.length);
  return roomId || null;
}

export interface GroupRoomLike {
  id: string;
  name?: string;
}

export interface WorkspaceLikeItem {
  workspaceId: string;
  path?: string;
  sessionIds: readonly string[];
}

/**
 * Resolves the active tab ID across both regular workspace sessions and group
 * rooms (including when the active DSH session is a group room's backing session).
 */
export function resolveEffectiveActiveTabId(params: {
  activeRoomMode?: boolean;
  activeRoomId?: string | null;
  rawActiveSessionId?: string | null;
  getRoomForSession?: (sessionId: string) => string | null | undefined;
}): string {
  const { activeRoomMode, activeRoomId, rawActiveSessionId, getRoomForSession } = params;
  if (activeRoomMode && activeRoomId) {
    return makeGroupRoomTabId(activeRoomId);
  }
  if (!rawActiveSessionId) return '';
  if (parseGroupRoomTabId(rawActiveSessionId)) return rawActiveSessionId;
  const boundRoomId = getRoomForSession?.(rawActiveSessionId);
  if (boundRoomId) return makeGroupRoomTabId(boundRoomId);
  return rawActiveSessionId;
}

/**
 * Reconciles top browser tabs strictly 1-to-1 with the left sidebar conversation
 * list (workspace sessions + group room conversations):
 * - Excludes deleted/missing, archived, closed, and subagent sessions
 * - Excludes raw backing DSH sessions bound to a group room (preventing duplicates)
 * - Includes every visible group room as `__room__:<roomId>` so existing and newly
 *   created group rooms automatically stay 1-to-1 with the top tab bar
 * - Preserves user drag order strictly within the live valid set
 */
export function reconcileStrictSidebarTabs(params: {
  workspaces: readonly WorkspaceLikeItem[];
  allSessionIds: readonly string[];
  archivedSessionIds: readonly string[];
  byId: Record<string, (SessionLikeSummary & { cwd?: string }) | undefined>;
  closedIds: ReadonlySet<string>;
  groupSessionIds?: ReadonlySet<string>;
  groupRooms?: readonly GroupRoomLike[];
  existingOrder: readonly string[];
}): string[] {
  const {
    workspaces,
    allSessionIds,
    archivedSessionIds,
    byId,
    closedIds,
    groupSessionIds,
    groupRooms = [],
    existingOrder,
  } = params;
  const archivedSet = new Set(archivedSessionIds);
  const explicitWsIds = new Set(workspaces.flatMap((w) => w.sessionIds));
  const wsPaths = new Set(workspaces.map((w) => w.path).filter(Boolean));

  const isSidebarVisible = (summary: (SessionLikeSummary & { cwd?: string }) | undefined): summary is SessionLikeSummary & { cwd?: string } => {
    if (!summary || !summary.id || summary.origin === 'subagent') return false;
    if (archivedSet.has(summary.id) || closedIds.has(summary.id) || groupSessionIds?.has(summary.id)) return false;
    return true;
  };

  const validSet = new Set<string>();
  const validCandidates: string[] = [];

  for (const workspace of workspaces) {
    const extraIds = allSessionIds.filter((id) => !explicitWsIds.has(id) && byId[id]?.cwd === workspace.path);
    const wsCandidates = [...workspace.sessionIds].reverse().concat([...extraIds].reverse());
    for (const id of wsCandidates) {
      if (!id || validSet.has(id)) continue;
      if (!isSidebarVisible(byId[id])) continue;
      validSet.add(id);
      validCandidates.push(id);
    }
  }

  for (const id of allSessionIds) {
    if (!id || validSet.has(id)) continue;
    const summary = byId[id];
    if (!summary || summary.blank || (summary.cwd && wsPaths.has(summary.cwd)) || !isSidebarVisible(summary)) continue;
    validSet.add(id);
    validCandidates.push(id);
  }

  for (const room of groupRooms) {
    if (!room || !room.id) continue;
    const roomTabId = makeGroupRoomTabId(room.id);
    if (validSet.has(roomTabId) || closedIds.has(roomTabId)) continue;
    validSet.add(roomTabId);
    validCandidates.push(roomTabId);
  }

  const nextOrder: string[] = [];
  const included = new Set<string>();
  for (const id of existingOrder) {
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
  return nextOrder;
}

export interface VerticalDragItem {
  id: string;
  height: number;
}

/**
 * Computes direction-aware, oscillation-free vertical drag reordering across
 * items of arbitrary unequal heights using analytical layout slot coordinates
 * (immune to in-flight FLIP CSS transforms).
 */
export function computeVerticalDragReorder(params: {
  items: readonly VerticalDragItem[];
  draggedId: string;
  listTop: number;
  visualTop: number;
  direction: number;
  gap?: number;
  hysteresis?: number;
}): {
  order: string[];
  swapped: boolean;
  anchorShiftY: number;
  newIndex: number;
} {
  const { items, draggedId, listTop, visualTop, direction, gap = 4, hysteresis = 4 } = params;
  const curIdx = items.findIndex((item) => item.id === draggedId);
  if (curIdx === -1 || items.length < 2 || direction === 0) {
    return { order: items.map((i) => i.id), swapped: false, anchorShiftY: 0, newIndex: curIdx };
  }

  const work = items.map((i) => ({ id: i.id, height: i.height }));
  let idx = curIdx;
  let anchorShiftY = 0;
  let swapped = false;

  const slotTopOf = (targetIdx: number): number => {
    let y = listTop;
    for (let i = 0; i < targetIdx; i++) {
      y += work[i].height + gap;
    }
    return y;
  };

  const draggedHeight = work[idx].height;
  const visualBottom = visualTop + draggedHeight;

  if (direction > 0) {
    while (idx < work.length - 1) {
      const nextSlotTop = slotTopOf(idx + 1);
      const nextMid = nextSlotTop + work[idx + 1].height / 2;
      if (visualBottom > nextMid + hysteresis) {
        const shift = work[idx + 1].height + gap;
        const tmp = work[idx];
        work[idx] = work[idx + 1];
        work[idx + 1] = tmp;
        idx += 1;
        anchorShiftY += shift;
        swapped = true;
      } else {
        break;
      }
    }
  } else if (direction < 0) {
    while (idx > 0) {
      const prevSlotTop = slotTopOf(idx - 1);
      const prevMid = prevSlotTop + work[idx - 1].height / 2;
      if (visualTop < prevMid - hysteresis) {
        const shift = -(work[idx - 1].height + gap);
        const tmp = work[idx];
        work[idx] = work[idx - 1];
        work[idx - 1] = tmp;
        idx -= 1;
        anchorShiftY += shift;
        swapped = true;
      } else {
        break;
      }
    }
  }

  return {
    order: work.map((i) => i.id),
    swapped,
    anchorShiftY,
    newIndex: idx,
  };
}



