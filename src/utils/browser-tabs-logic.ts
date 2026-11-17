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
