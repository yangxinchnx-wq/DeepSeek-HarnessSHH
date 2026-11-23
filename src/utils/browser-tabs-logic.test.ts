import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampTabDragDx,
  reorderTabsByCenter,
  computeTabWheelScrollLeft,
  deriveVisibleTabIds,
  resolveSessionSwitchDirection,
  computeVerticalDragReorder,
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

test('deriveVisibleTabIds keeps an opened tab whose session summary is missing from the listing', () => {
  // s1 is referenced by the workspace but absent from byId (server listing can
  // omit it). It was opened as a tab, so it must survive the recompute.
  const state = {
    order: ['s1', 's2'],
    closedIds: new Set<string>(),
    customTitles: new Map<string, string>(),
    noTabsHomeMode: false,
    homeStandbySessionId: null,
  };

  const kept = deriveVisibleTabIds({
    workspaceSessionIds: ['s1', 's2'],
    allSessionIds: ['s2'],
    archivedSessionIds: [],
    byId: { s2: { id: 's2', blank: false, running: false } },
    state,
  });
  assert.deepEqual(kept.visibleTabIds, ['s1', 's2']);

  // An unopened session without a summary stays hidden (no resurrection).
  const hidden = deriveVisibleTabIds({
    workspaceSessionIds: ['s3'],
    allSessionIds: [],
    archivedSessionIds: [],
    byId: {},
    state,
  });
  assert.deepEqual(hidden.visibleTabIds, ['s1', 's2']);

  // Closing the tab still removes it.
  state.closedIds.add('s1');
  const closed = deriveVisibleTabIds({
    workspaceSessionIds: ['s1', 's2'],
    allSessionIds: ['s2'],
    archivedSessionIds: [],
    byId: { s2: { id: 's2', blank: false, running: false } },
    state,
  });
  assert.deepEqual(closed.visibleTabIds, ['s2']);
});

test('resolveSessionSwitchDirection chooses horizontal glide for tabs, vertical glide for sidebar, and fade-up fallback', () => {
  const order = ['s1', 's2', 's3'];
  assert.equal(resolveSessionSwitchDirection(order, 's1', 's3', 'tabs'), 'slide-left');
  assert.equal(resolveSessionSwitchDirection(order, 's3', 's1', 'tabs'), 'slide-right');
  assert.equal(resolveSessionSwitchDirection(order, 's1', 's2', 'sidebar'), 'slide-up');
  assert.equal(resolveSessionSwitchDirection(order, 's3', 's2', 'sidebar'), 'slide-down');
  assert.equal(resolveSessionSwitchDirection(order, 's1', 's1', 'tabs'), 'fade-up');
  assert.equal(resolveSessionSwitchDirection(order, undefined, 's2', 'tabs'), 'fade-up');
  assert.equal(resolveSessionSwitchDirection(order, 's1', 'unknown', 'sidebar'), 'fade-up');
  assert.equal(resolveSessionSwitchDirection(order, 's1', 's2', 'other'), 'fade-up');
});

test('reconcileStrictSidebarTabs enforces exact 1-to-1 parity with left sidebar and prunes ghost/group/deleted tabs', async () => {
  const { reconcileStrictSidebarTabs } = await import('./browser-tabs-logic');
  const result = reconcileStrictSidebarTabs({
    workspaces: [{ workspaceId: 'ws-1', path: '/ws', sessionIds: ['s1', 's2', 's_deleted'] }],
    allSessionIds: ['s1', 's2', 's_extra', 's_group', 's_sub', 's_stray_blank', 's_stray_real'],
    archivedSessionIds: [],
    byId: {
      s1: { id: 's1', blank: false, cwd: '/ws' },
      s2: { id: 's2', blank: true, cwd: '/ws' },
      s_extra: { id: 's_extra', blank: true, cwd: '/ws' },
      s_group: { id: 's_group', blank: false, cwd: '/ws' },
      s_sub: { id: 's_sub', blank: false, origin: 'subagent', cwd: '/ws' },
      s_stray_blank: { id: 's_stray_blank', blank: true, cwd: '/other' },
      s_stray_real: { id: 's_stray_real', blank: false, cwd: '/other' },
    },
    closedIds: new Set<string>(),
    groupSessionIds: new Set(['s_group']),
    existingOrder: ['s_ghost_from_order', 's2', 's1'],
  });

  // Preserves existing order (s2 before s1), includes cwd-matched blank s_extra and non-blank stray s_stray_real,
  // and strictly prunes deleted, ghost, group-room backing session, subagent, and stray blank sessions.
  assert.deepEqual(result, ['s2', 's1', 's_extra', 's_stray_real']);
});

test('reconcileStrictSidebarTabs unifies workspace sessions and group rooms 1-to-1 without duplicating backing sessions', async () => {
  const { reconcileStrictSidebarTabs, makeGroupRoomTabId, parseGroupRoomTabId, resolveEffectiveActiveTabId } =
    await import('./browser-tabs-logic');

  assert.equal(makeGroupRoomTabId('room-core-collab'), '__room__:room-core-collab');
  assert.equal(parseGroupRoomTabId('__room__:room-core-collab'), 'room-core-collab');
  assert.equal(parseGroupRoomTabId('session-123'), null);

  const initial = reconcileStrictSidebarTabs({
    workspaces: [{ workspaceId: 'ws-1', path: '/ws', sessionIds: ['s1', 's_room_backing'] }],
    allSessionIds: ['s1', 's_room_backing'],
    archivedSessionIds: [],
    byId: {
      s1: { id: 's1', blank: false, cwd: '/ws' },
      s_room_backing: { id: 's_room_backing', blank: false, cwd: '/ws' },
    },
    closedIds: new Set<string>(),
    groupSessionIds: new Set(['s_room_backing']),
    groupRooms: [
      { id: 'room-core-collab', name: '跨账户 Agent 与全平台机器人协同总群' },
      { id: 'room-sec-drill', name: '红蓝安全演练与应急响应群' },
    ],
    existingOrder: ['s1'],
  });
  // s_room_backing must NOT appear as a separate workspace tab; both rooms appear 1-to-1
  assert.deepEqual(initial, ['s1', '__room__:room-core-collab', '__room__:room-sec-drill']);

  // Adding a brand new group room and deleting an old room updates tabs dynamically
  const afterRoomChange = reconcileStrictSidebarTabs({
    workspaces: [{ workspaceId: 'ws-1', path: '/ws', sessionIds: ['s1', 's_room_backing'] }],
    allSessionIds: ['s1', 's_room_backing'],
    archivedSessionIds: [],
    byId: {
      s1: { id: 's1', blank: false, cwd: '/ws' },
      s_room_backing: { id: 's_room_backing', blank: false, cwd: '/ws' },
    },
    closedIds: new Set<string>(),
    groupSessionIds: new Set(['s_room_backing']),
    groupRooms: [
      { id: 'room-core-collab', name: '跨账户 Agent 与全平台机器人协同总群' },
      { id: 'room-new-ops', name: '新建协同群 3' },
    ],
    existingOrder: initial,
  });
  assert.deepEqual(afterRoomChange, ['s1', '__room__:room-core-collab', '__room__:room-new-ops']);

  // Active tab resolution maps group room mode & bound backing sessions to __room__:<roomId>
  assert.equal(
    resolveEffectiveActiveTabId({
      activeRoomMode: true,
      activeRoomId: 'room-core-collab',
      rawActiveSessionId: 's_room_backing',
      getRoomForSession: (sid) => (sid === 's_room_backing' ? 'room-core-collab' : null),
    }),
    '__room__:room-core-collab',
  );
  assert.equal(
    resolveEffectiveActiveTabId({
      activeRoomMode: false,
      activeRoomId: 'room-core-collab',
      rawActiveSessionId: 's_room_backing',
      getRoomForSession: (sid) => (sid === 's_room_backing' ? 'room-core-collab' : null),
    }),
    '__room__:room-core-collab',
  );
  assert.equal(
    resolveEffectiveActiveTabId({
      activeRoomMode: false,
      activeRoomId: 'room-core-collab',
      rawActiveSessionId: 's1',
      getRoomForSession: () => null,
    }),
    's1',
  );
});

test('computeVerticalDragReorder handles unequal folder heights smoothly without oscillation', () => {
  const items = [
    { id: 'ws:default', height: 180 },
    { id: 'automation', height: 32 },
    { id: 'groups', height: 70 },
  ];
  // Dragging tall Default workspace (180px) DOWN past short automation (32px) triggers after only ~25px!
  const downSmall = computeVerticalDragReorder({
    items,
    draggedId: 'ws:default',
    listTop: 100,
    visualTop: 100 + 25,
    direction: 1,
    gap: 4,
    hysteresis: 4,
  });
  assert.equal(downSmall.swapped, true);
  assert.deepEqual(downSmall.order, ['automation', 'ws:default', 'groups']);
  assert.equal(downSmall.anchorShiftY, 36); // 32 + 4

  // Immediately wiggling 1px UP at the same visual position must NOT oscillate back!
  const afterDownItems = [
    { id: 'automation', height: 32 },
    { id: 'ws:default', height: 180 },
    { id: 'groups', height: 70 },
  ];
  const reverseWiggle = computeVerticalDragReorder({
    items: afterDownItems,
    draggedId: 'ws:default',
    listTop: 100,
    visualTop: 100 + 24,
    direction: -1,
    gap: 4,
    hysteresis: 4,
  });
  assert.equal(reverseWiggle.swapped, false);
  assert.deepEqual(reverseWiggle.order, ['automation', 'ws:default', 'groups']);

  // Dragging short groups (70px) UP all the way past automation and Default workspace in a fast sweep
  const upSweep = computeVerticalDragReorder({
    items,
    draggedId: 'groups',
    listTop: 100,
    visualTop: 140,
    direction: -1,
    gap: 4,
    hysteresis: 4,
  });
  assert.equal(upSweep.swapped, true);
  assert.deepEqual(upSweep.order, ['groups', 'ws:default', 'automation']);
  assert.equal(upSweep.anchorShiftY, -(180 + 4 + 32 + 4));
});



