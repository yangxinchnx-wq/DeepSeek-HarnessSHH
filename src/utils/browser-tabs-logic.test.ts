import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampTabDragDx,
  reorderTabsByCenter,
  computeTabWheelScrollLeft,
  deriveVisibleTabIds,
} from './browser-tabs-logic';

test('clampTabDragDx strictly bounds horizontal movement within container', () => {
  const bounds = {
    containerWidth: 600,
    tabOffsetLeft: 100,
    tabWidth: 160,
    scrollLeft: 0,
  };
  assert.equal(clampTabDragDx(-250, bounds), -100);
  assert.equal(clampTabDragDx(50, bounds), 50);
  assert.equal(clampTabDragDx(500, bounds), 340);
});

test('reorderTabsByCenter swaps adjacent tabs when crossing midpoint', () => {
  const tabIds = ['s1', 's2', 's3'];
  const rects = [
    { id: 's1', left: 0, width: 160 },
    { id: 's2', left: 166, width: 160 },
    { id: 's3', left: 332, width: 160 },
  ];

  // Dragging s1 right past s2's midpoint (166 + 80 = 246)
  const resRight = reorderTabsByCenter(tabIds, 's1', 260, rects, 6);
  assert.deepEqual(resRight.order, ['s2', 's1', 's3']);
  assert.equal(resRight.anchorShiftX, 166);

  // Dragging s2 left past s1's midpoint (0 + 80 = 80)
  const resLeft = reorderTabsByCenter(tabIds, 's2', 60, rects, 6);
  assert.deepEqual(resLeft.order, ['s2', 's1', 's3']);
  assert.equal(resLeft.anchorShiftX, -166);
});

test('computeTabWheelScrollLeft disables scrolling when not overflowing and scrolls when overflowing', () => {
  const noOverflow = computeTabWheelScrollLeft({
    scrollLeft: 0,
    scrollWidth: 500,
    clientWidth: 600,
    deltaX: 0,
    deltaY: 120,
  });
  assert.equal(noOverflow.overflows, false);
  assert.equal(noOverflow.nextScrollLeft, 0);

  const withOverflow = computeTabWheelScrollLeft({
    scrollLeft: 40,
    scrollWidth: 1000,
    clientWidth: 600,
    deltaX: 0,
    deltaY: 120,
  });
  assert.equal(withOverflow.overflows, true);
  assert.equal(withOverflow.nextScrollLeft, 160);
});

test('deriveVisibleTabIds hides standby blank session in noTabsHomeMode until message is sent', () => {
  const byId = {
    s1: { id: 's1', blank: true, running: false },
  };
  const state = {
    order: [],
    closedIds: new Set<string>(),
    customTitles: new Map<string, string>(),
    noTabsHomeMode: true,
    homeStandbySessionId: 's1',
  };

  // While s1 is still blank, 0 tabs are shown
  const beforeSend = deriveVisibleTabIds({
    workspaceSessionIds: ['s1'],
    allSessionIds: ['s1'],
    archivedSessionIds: [],
    byId,
    state,
  });
  assert.deepEqual(beforeSend.visibleTabIds, []);
  assert.equal(beforeSend.shouldExitHomeMode, false);

  // Once user sends a message (s1.blank becomes false or running becomes true), tab appears automatically!
  byId.s1 = { id: 's1', blank: false, running: true };
  const afterSend = deriveVisibleTabIds({
    workspaceSessionIds: ['s1'],
    allSessionIds: ['s1'],
    archivedSessionIds: [],
    byId,
    state,
  });
  assert.deepEqual(afterSend.visibleTabIds, ['s1']);
  assert.equal(afterSend.shouldExitHomeMode, true);
});
