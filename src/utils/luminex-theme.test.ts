import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LUMINEX_PRESET_ID,
  PRESET2_ID,
  LUMINEX_THEME_TOKENS,
  LUMINEX_LIGHT_PULL_TOKENS,
  PRESET2_THEME_TOKENS,
  EXECUTIVE_CONTRAST_PAIRS,
  computeContrastRatio,
  buildLuminexSvgDataUri,
  buildPreset2Css,
  buildLuminexPresetCss,
  buildLuminexCanvasRuntimeCode,
} from './luminex-theme.ts';

test('Designownow Preset 1 color pairs (Dark Apple Liquid Glass & Light Ceramic Glass) all meet or exceed WCAG AA/AAA contrast thresholds', () => {
  for (const pair of EXECUTIVE_CONTRAST_PAIRS) {
    const ratio = computeContrastRatio(pair.fg, pair.bg);
    assert.ok(
      ratio >= pair.minRatio,
      `${pair.name} (${pair.fg} on ${pair.bg}) contrast ratio ${ratio.toFixed(2)}:1 must be >= ${pair.minRatio}:1`,
    );
  }
});

test('buildLuminexSvgDataUri and buildLuminexCanvasRuntimeCode generate Apple Liquid Glass backdrop and 1:1 godly.design corner pill toggle', () => {
  const baseUri = buildLuminexSvgDataUri();
  const runtimeCode = buildLuminexCanvasRuntimeCode();
  assert.ok(baseUri.startsWith('data:image/svg+xml;utf8,'));
  const decodedBase = decodeURIComponent(baseUri.slice('data:image/svg+xml;utf8,'.length));
  assert.ok(!decodedBase.includes('<text'), 'Background SVG must not contain any embedded text');
  assert.ok(!decodedBase.includes('<animate'), 'Background SVG must be static with no SMIL animations');
  assert.ok(decodedBase.includes('#2b3042'), 'Background SVG must include Slate-Indigo studio tone');
  assert.ok(decodedBase.includes('cornerOrchidAmbient'), 'Background SVG must include subtle corner ambient glow');
  assert.ok(decodedBase.includes('softMistBlur'), 'Background SVG must include soft Gaussian atmospheric color diffusion');
  assert.ok(runtimeCode.includes('document.body.setAttribute("data-dsh-theme-id", themeId)'));
  assert.ok(runtimeCode.includes('dsh-corner-pull-toggle'), 'Runtime code must mount the Designownow curved-corner pull toggle widget');
  assert.ok(runtimeCode.includes('const duration = 540;'), 'Runtime code must use a snappy 540ms fluid transition animation');
  assert.ok(runtimeCode.includes('dsh_cpt_core_glow'), 'Runtime code must render the inner diffused color core inside the capsule');
  assert.ok(runtimeCode.includes('__dshCommitPreset1Submode'), 'Runtime code must expose __dshCommitPreset1Submode for mini slider sync');
  assert.ok(runtimeCode.includes('document.body.getAttribute("data-dsh-theme-id") === "preset-2"'), 'Runtime code must apply Preset 2 Light Mode Only tokens when preset-2 is selected');
});

test('buildLuminexPresetCss scopes Apple Liquid Glass stage card, atomic token declarations, and 1:1 godly.design pill slider to preset-1', () => {
  const css = buildLuminexPresetCss();
  assert.ok(css.includes(`body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"]`));
  assert.ok(css.includes('border-radius:24px 96px 24px 24px!important;corner-shape:round!important'));
  assert.ok(css.includes('backdrop-filter:blur(40px) saturate(185%)!important'));
  assert.ok(css.includes('filter:url(#cptGrooveInsetDark)'));
  assert.ok(css.includes('.dsh_cpt_capsule{position:absolute;width:68px;height:48px;margin-left:-34px;margin-top:-24px;border-radius:999px!important;corner-shape:round!important'));
  assert.ok(css.includes('.dsh_cpt_dimple{width:34px;height:34px;flex:0 0 34px;aspect-ratio:1/1;border-radius:50%!important;corner-shape:round!important'));
  assert.ok(css.includes('.dsh_cpt_core_glow'));
  assert.ok(css.includes('.dsh_preset1_mini_slider'));
  assert.ok(css.includes('.dsh_mini_slider_thumb'));
  assert.ok(css.includes('.uV2eYG_card'));
  assert.equal(LUMINEX_THEME_TOKENS['--dsw-alias-bg-base'], '#1f2230');
  assert.equal(LUMINEX_THEME_TOKENS['--dsw-alias-label-primary'], '#f8fafc');
  assert.equal(LUMINEX_LIGHT_PULL_TOKENS['--dsw-alias-label-primary'], '#1a1a1a');
  assert.ok(css.includes('.uV2eYG_primary'));
});

test('buildPreset2Css implements Soft Neumorphism + Frosted Acrylic Light Mode Only with #FF6A2B Subsurface Warm Glow and concentric geometry', () => {
  const css = buildPreset2Css();
  assert.ok(css.includes(`body[data-dsh-theme-id="${PRESET2_ID}"]`));
  assert.ok(css.includes('linear-gradient(135deg,#E4E4E6 0%,#EAEAEF 100%)'), 'Canvas must use 135deg #E4E4E6 to #EAEAEF gradient');
  assert.ok(css.includes('#EFEFF2'), 'Main surface must use #EFEFF2');
  assert.ok(css.includes('#DCDCE0'), 'Recessed wells and input bases must use #DCDCE0');
  assert.ok(css.includes('#FF6A2B'), 'Subsurface warm glow must use #FF6A2B');
  assert.ok(css.includes('filter:blur(12px)'), 'Subsurface warm glow must use blur(12px)');
  assert.ok(css.includes('cubic-bezier(.22,1,.36,1)'), 'Micro-interactions must use spring damping curve cubic-bezier(.22,1,.36,1)');
  assert.ok(css.includes('border-radius:32px!important'), 'Main surface card must use 32px concentric radius');
  assert.ok(css.includes('border-radius:9999px!important'), 'Buttons and pills must use full pill radius');
  assert.equal(PRESET2_THEME_TOKENS['--dsw-alias-label-primary'], '#2B2D38');
  assert.equal(PRESET2_THEME_TOKENS['--dsw-alias-label-secondary'], '#6E7180');
  assert.equal(PRESET2_THEME_TOKENS['--dsw-alias-label-tertiary'], '#9E9FA8');
  assert.equal(PRESET2_THEME_TOKENS['--dsw-alias-menu-icon'], '#2B2D38');
  assert.equal(LUMINEX_THEME_TOKENS['--dsw-alias-menu-icon'], '#f8fafc');
  assert.equal(LUMINEX_LIGHT_PULL_TOKENS['--dsw-alias-menu-icon'], '#1a1a1a');
  assert.ok(
    css.includes('radial-gradient(36% 60% at 50% 50%,rgba(255,112,51,0.58)') &&
      css.includes('radial-gradient(50% 24% at 50% 50%,rgba(255,112,51,0.54)') &&
      css.includes('width:94%;height:92%') &&
      css.includes('filter:blur(10px)'),
    'Preset 2 button glow must use feathered 94%-width spindle geometry with soft blur(10px)',
  );
  assert.ok(!css.includes('transition:all'), 'Preset 2 must not use transition:all on backdrop-filter elements to prevent click lag');
  assert.ok(css.includes('.dsh_preset2_well_svg{width:16px!important;height:16px!important'), 'Preset 2 icon SVG must have explicit non-zero dimensions');
});

test('buildLuminexPresetCss includes universal theme-switching, menu icon visibility, and interactive transition animations across all themes', () => {
  const css = buildLuminexPresetCss();
  assert.ok(
    css.includes('body,.pI_x6G_frame,.pI_x6G_sidebarCol,.pI_x6G_centerCol,.pI_x6G_rightbarCol,.wSkVaW_root,.wSkVaW_header,.wSkVaW_headerBlank,.wSkVaW_body,.wSkVaW_scrollBody,.hHd-Xa_root{transition:'),
    'Must include universal layout and surface transitions for all themes',
  );
  assert.ok(
    css.includes('.hHd-Xa_newSession svg,.hHd-Xa_iconButton svg,.hHd-Xa_panelRow svg,.wSkVaW_browserTab svg,.wSkVaW_browserTabAdd svg,._8HJdBW_themeCube svg{flex-shrink:0;visibility:visible!important;opacity:1!important'),
    'Must preserve SVG icon visibility and transitions across all buttons and theme cubes',
  );
  assert.ok(
    css.includes('.yHnPSG_signedOutMenu [role=menuitem]>span:first-child:not(:last-child)'),
    'Must enforce high-contrast icon visibility inside the 3-option More popup menu',
  );
  assert.equal(LUMINEX_THEME_TOKENS['--dsw-alias-label-dimmed'], '#9ea9bc');
  assert.equal(LUMINEX_LIGHT_PULL_TOKENS['--dsw-alias-label-dimmed'], '#595959');
  assert.equal(PRESET2_THEME_TOKENS['--dsw-alias-label-dimmed'], '#6E7180');
  assert.ok(
    css.includes('.zGbnIq_input::placeholder') &&
      css.includes('-webkit-text-fill-color:var(--dsw-alias-label-dimmed'),
    'Must enforce high-contrast placeholder text across all form inputs in every theme',
  );
  assert.ok(
    css.includes('.dsh-preset-oval-scrollbar') &&
      css.includes('.dsh-preset-oval-thumb') &&
      css.includes('rgba(255,106,43,0.34)') &&
      css.includes('border-radius:9999px!important') &&
      !css.includes('scrollbar-width:thin'),
    'Agent preset menu scrollbar must use oval capsule geometry with subtle warm orange accent and must not set scrollbar-width:thin',
  );
  assert.ok(
    css.includes('#dsh-themed-tooltip-card') &&
      css.includes(`body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card`) &&
      css.includes(`body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card`) &&
      css.includes(`body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card`),
    'Must include per-theme floating explanation tooltip styles for Preset 2, Preset 1 Dark, Preset 1 Light, and default themes',
  );
  const runtimeCode = buildLuminexCanvasRuntimeCode();
  assert.ok(
    runtimeCode.includes('ensureDshUniversalTooltips') &&
      runtimeCode.includes('dsh-themed-tooltip-card') &&
      runtimeCode.includes('data-dsh-tip'),
    'Runtime code must mount universal hover tooltip card across all themes',
  );
  assert.ok(
    runtimeCode.includes('[data-shortcut-modal="settings"]') &&
      runtimeCode.includes('.yHnPSG_root') &&
      runtimeCode.includes('.yHnPSG_signedOutMenu'),
    'Runtime code must suppress hover tooltips on the Settings modal and the bottom-left More button/menu',
  );
  assert.ok(
    !runtimeCode.includes('操作或切换对应选项状态。'),
    'Runtime code must not use generic cookie-cutter fallback tooltip descriptions',
  );
  assert.ok(
    runtimeCode.includes('.dt-page') &&
      runtimeCode.includes('概览 · 待办工单与 24h 触发漏斗') &&
      runtimeCode.includes('来源接入配置 · 多账号机器人与监听范围') &&
      runtimeCode.includes('.dshpp-page') &&
      runtimeCode.includes('状态 · 宿主补丁、25 层自检与版本维护') &&
      runtimeCode.includes('资产测绘 · C段、存活主机、端口与指纹'),
    'Runtime code must provide deep, function-specific hover descriptions for Superagent and dsh-purge controls',
  );
  assert.ok(
    runtimeCode.includes('globalThis.__dshTooltipMaxShows : 200') &&
      runtimeCode.includes('globalThis.__dshTooltipCooldownMs : 0') &&
      runtimeCode.includes('globalThis.__dshTooltipAutoHideMs : 5000') &&
      runtimeCode.includes('__dshTooltipQuotaState') &&
      runtimeCode.includes('data-dsh-tip-member') &&
      runtimeCode.includes('const showMemberTag = Boolean(spec.isMemberTip && spec.tag);'),
    'Runtime code must enforce tooltip quota config, 5s auto-dismiss, and restrict tag badges to specific Bot/Agent items',
  );
  assert.ok(
    css.includes('.hHd-Xa_root:not(.hHd-Xa_collapsed) .hHd-Xa_logoRow > .hHd-Xa_toggle{width:36px!important;height:36px!important') &&
      css.includes('.hHd-Xa_root:not(.hHd-Xa_collapsed) .hHd-Xa_newSessionRow .hHd-Xa_newSession{width:calc(100% - 44px)!important;max-width:calc(100% - 44px)!important;height:36px!important') &&
      css.includes('.hHd-Xa_root.hHd-Xa_collapsed .hHd-Xa_logoRow > .hHd-Xa_toggle,.hHd-Xa_root.hHd-Xa_collapsed .hHd-Xa_newSessionRow .hHd-Xa_newSession{width:36px!important;height:36px!important') &&
      css.includes('.hHd-Xa_logoRow > .hHd-Xa_toggle svg,.hHd-Xa_newSession svg,.hHd-Xa_newSession .hHd-Xa_newSessionContent > svg{width:16px!important;height:16px!important'),
    'Must enforce identical 36px height, alignment, and 16x16 SVG icon sizing for .hHd-Xa_newSession and .hHd-Xa_toggle across all themes and expanded/collapsed states',
  );
});


