export const LUMINEX_PRESET_ID = 'preset-1';
export const PRESET2_ID = 'preset-2';

/**
 * Preset 2: Soft Neumorphism + Frosted Acrylic (Light Mode Only) Theme Tokens.
 * - Canvas: #E4E4E6 -> #EAEAEF (135deg)
 * - Main Surface: #EFEFF2 with frosted acrylic translucency
 * - Recessed Well: #DCDCE0 with engraved inner shadows
 * - Subsurface Warm Glow: #FF6A2B (blur 12px, opacity 0.65)
 * - Typography: Primary #2B2D38, Secondary #6E7180, Caption #9E9FA8
 */
export const PRESET2_THEME_TOKENS: Readonly<Record<string, string>> = Object.freeze({
  '--dsw-alias-bg-base': '#E4E4E6',
  '--dsw-alias-bg-layer-1': '#EFEFF2',
  '--dsw-alias-bg-layer-2': '#F5F5F8',
  '--dsw-alias-bg-layer-3': '#DCDCE0',
  '--dsw-alias-bg-module-platform': '#EFEFF2',
  '--dsw-alias-bg-overlay': 'rgba(239, 239, 242, 0.88)',
  '--dsw-alias-border-l1': 'rgba(255, 255, 255, 0.65)',
  '--dsw-alias-border-l2': 'rgba(0, 0, 0, 0.06)',
  '--dsw-alias-border-l3': 'rgba(0, 0, 0, 0.08)',
  '--dsw-alias-border-l4': 'rgba(0, 0, 0, 0.10)',
  '--dsw-alias-label-primary': '#2B2D38',
  '--dsw-alias-label-secondary': '#6E7180',
  '--dsw-alias-label-tertiary': '#9E9FA8',
  '--dsw-alias-label-caption': '#9E9FA8',
  '--dsw-alias-button-floating-fill': 'rgba(239, 239, 242, 0.85)',
  '--dsw-alias-button-floating-hover': 'rgba(255, 255, 255, 0.92)',
  '--dsw-alias-button-elevated-fill': 'rgba(239, 239, 242, 0.88)',
  '--dsw-alias-state-business-primary': '#FF6A2B',
  '--dsw-alias-state-business-tertiary': 'rgba(255, 106, 43, 0.16)',
  '--dsw-alias-interactive-bg-hover': 'rgba(255, 255, 255, 0.55)',
  '--dsw-alias-interactive-bg-active': 'rgba(255, 106, 43, 0.14)',
  '--dsw-specific-sidebar-fill': 'rgba(228, 228, 230, 0.75)',
  '--dsw-specific-sidebar-nav-item-active': 'rgba(239, 239, 242, 0.92)',
  '--dsw-specific-sidebar-nav-item-active-accent': '#FF6A2B',
  '--dsw-specific-input-major': '#DCDCE0',
  '--dsw-specific-selector': 'rgba(239, 239, 242, 0.85)',
  '--dsw-specific-bubble': 'rgba(239, 239, 242, 0.90)',
  '--dsw-specific-bubble-highlight': '#FFFFFF',
  '--dsw-menu-surface-fill': 'rgba(239, 239, 242, 0.96)',
  '--dsw-specific-menu': 'rgba(239, 239, 242, 0.96)',
  '--dsw-alias-menu-icon': '#2B2D38',
  '--dsw-alias-label-primary-dimmed': '#4A4D5E',
  '--dsw-alias-label-dimmed': '#6E7180',
});

/**
 * Apple Liquid Glass (Dark Slate-Titanium) Theme Tokens for Preset 1 (`t = 1`).
 * Calibrated to match the godly.design reference (`ref-dark.png`) and Apple's
 * optical Liquid Glass material hierarchy.
 */
export const LUMINEX_THEME_TOKENS: Readonly<Record<string, string>> = Object.freeze({
  '--dsw-alias-bg-base': '#1f2230',
  '--dsw-alias-bg-layer-1': '#262a3b',
  '--dsw-alias-bg-layer-2': '#2e3346',
  '--dsw-alias-bg-layer-3': '#363c52',
  '--dsw-alias-bg-module-platform': '#3d445c',
  '--dsw-alias-bg-overlay': 'rgba(34, 38, 54, 0.88)',
  '--dsw-alias-border-l1': 'rgba(255, 255, 255, 0.05)',
  '--dsw-alias-border-l2': 'rgba(255, 255, 255, 0.08)',
  '--dsw-alias-border-l3': 'rgba(255, 255, 255, 0.11)',
  '--dsw-alias-border-l4': 'rgba(255, 255, 255, 0.16)',
  '--dsw-alias-label-primary': '#f8fafc',
  '--dsw-alias-label-secondary': '#e2e8f0',
  '--dsw-alias-label-tertiary': '#b8c2d4',
  '--dsw-alias-label-caption': '#9ea9bc',
  '--dsw-alias-button-floating-fill': 'rgba(54, 60, 82, 0.68)',
  '--dsw-alias-button-floating-hover': 'rgba(66, 73, 98, 0.80)',
  '--dsw-alias-button-elevated-fill': 'rgba(52, 58, 78, 0.72)',
  '--dsw-alias-state-business-primary': '#c084fc',
  '--dsw-alias-state-business-tertiary': 'rgba(192, 132, 252, 0.18)',
  '--dsw-alias-interactive-bg-hover': 'rgba(255, 255, 255, 0.08)',
  '--dsw-alias-interactive-bg-active': 'rgba(192, 132, 252, 0.18)',
  '--dsw-specific-sidebar-fill': 'rgba(32, 36, 50, 0.58)',
  '--dsw-specific-sidebar-nav-item-active': 'rgba(255, 255, 255, 0.13)',
  '--dsw-specific-sidebar-nav-item-active-accent': 'rgba(255, 255, 255, 0.20)',
  '--dsw-specific-input-major': 'rgba(42, 47, 66, 0.68)',
  '--dsw-specific-selector': 'rgba(52, 58, 78, 0.68)',
  '--dsw-specific-bubble': 'rgba(48, 54, 74, 0.74)',
  '--dsw-specific-bubble-highlight': 'rgba(60, 67, 90, 0.84)',
  '--dsw-menu-surface-fill': 'rgba(32, 36, 50, 0.95)',
  '--dsw-specific-menu': 'rgba(32, 36, 50, 0.95)',
  '--dsw-alias-menu-icon': '#f8fafc',
  '--dsw-alias-label-primary-dimmed': '#e2e8f0',
  '--dsw-alias-label-dimmed': '#9ea9bc',
});

/**
 * Apple Liquid Glass (Light Ceramic Alabaster) Theme Tokens when pulled to Daylight mode (`t = 0`).
 * Calibrated to match the godly.design reference (`ref-light.png`).
 */
export const LUMINEX_LIGHT_PULL_TOKENS: Readonly<Record<string, string>> = Object.freeze({
  '--dsw-alias-bg-base': '#d7d7d7',
  '--dsw-alias-bg-layer-1': '#eaeaea',
  '--dsw-alias-bg-layer-2': '#f2f2f2',
  '--dsw-alias-bg-layer-3': '#f7f7f7',
  '--dsw-alias-bg-module-platform': '#f8f8f8',
  '--dsw-alias-bg-overlay': 'rgba(246, 246, 246, 0.94)',
  '--dsw-alias-border-l1': 'rgba(0, 0, 0, 0.06)',
  '--dsw-alias-border-l2': 'rgba(0, 0, 0, 0.085)',
  '--dsw-alias-border-l3': 'rgba(0, 0, 0, 0.12)',
  '--dsw-alias-border-l4': 'rgba(0, 0, 0, 0.16)',
  '--dsw-alias-label-primary': '#1a1a1a',
  '--dsw-alias-label-secondary': '#2e2e2e',
  '--dsw-alias-label-tertiary': '#525252',
  '--dsw-alias-label-caption': '#666666',
  '--dsw-alias-button-floating-fill': 'rgba(248, 248, 248, 0.92)',
  '--dsw-alias-button-floating-hover': '#ffffff',
  '--dsw-alias-button-elevated-fill': 'rgba(246, 246, 246, 0.94)',
  '--dsw-alias-state-business-primary': '#2b2b2b',
  '--dsw-alias-state-business-tertiary': 'rgba(0, 0, 0, 0.07)',
  '--dsw-alias-interactive-bg-hover': 'rgba(0, 0, 0, 0.045)',
  '--dsw-alias-interactive-bg-active': 'rgba(0, 0, 0, 0.08)',
  '--dsw-specific-sidebar-fill': 'rgba(220, 220, 220, 0.78)',
  '--dsw-specific-sidebar-nav-item-active': 'rgba(246, 246, 246, 0.94)',
  '--dsw-specific-sidebar-nav-item-active-accent': '#fafafa',
  '--dsw-specific-input-major': 'rgba(248, 248, 248, 0.95)',
  '--dsw-specific-selector': 'rgba(246, 246, 246, 0.92)',
  '--dsw-specific-bubble': 'rgba(248, 248, 248, 0.95)',
  '--dsw-specific-bubble-highlight': '#ffffff',
  '--dsw-menu-surface-fill': 'rgba(250, 250, 250, 0.97)',
  '--dsw-specific-menu': 'rgba(250, 250, 250, 0.97)',
  '--dsw-alias-menu-icon': '#1a1a1a',
  '--dsw-alias-label-primary-dimmed': '#2e2e2e',
  '--dsw-alias-label-dimmed': '#595959',
});

/**
 * Key foreground/background color pairs used across Preset 1 Apple Liquid Glass surfaces
 * for automated WCAG 2.1 AA/AAA contrast verification.
 */
export const EXECUTIVE_CONTRAST_PAIRS = Object.freeze([
  { name: 'Dark Liquid Glass: Hero headline on slate-indigo glass stage (#2c3144)', fg: '#ffffff', bg: '#2c3144', minRatio: 10.5 },
  { name: 'Dark Liquid Glass: Primary text on studio base (#1f2230)', fg: '#f8fafc', bg: '#1f2230', minRatio: 13 },
  { name: 'Dark Liquid Glass: Hero workspace & mode glass pills (#30364a)', fg: '#f8fafc', bg: '#30364a', minRatio: 9.5 },
  { name: 'Dark Liquid Glass: Primary text on composer glass console (#282d3e)', fg: '#f8fafc', bg: '#282d3e', minRatio: 11 },
  { name: 'Dark Liquid Glass: Secondary label on composer glass console (#282d3e)', fg: '#e2e8f0', bg: '#282d3e', minRatio: 9.5 },
  { name: 'Dark Liquid Glass: Placeholder label on composer glass console (#282d3e)', fg: '#9ea9bc', bg: '#282d3e', minRatio: 5.2 },
  { name: 'Dark Liquid Glass: Sidebar primary text on frosted sidebar (#202432)', fg: '#f8fafc', bg: '#202432', minRatio: 12.5 },
  { name: 'Dark Liquid Glass: Active tab primary text on active glass tab (#363c52)', fg: '#ffffff', bg: '#363c52', minRatio: 8.5 },
  { name: 'Light Liquid Glass: Hero headline on porcelain stage (#eaeaea)', fg: '#1a1a1a', bg: '#eaeaea', minRatio: 12.5 },
  { name: 'Light Liquid Glass: Primary text on composer crystal card (#f6f6f6)', fg: '#1a1a1a', bg: '#f6f6f6', minRatio: 14 },
  { name: 'Light Liquid Glass: Secondary label on composer crystal card (#f6f6f6)', fg: '#2e2e2e', bg: '#f6f6f6', minRatio: 10.5 },
  { name: 'Light Liquid Glass: Placeholder label on composer crystal card (#f6f6f6)', fg: '#525252', bg: '#f6f6f6', minRatio: 5.8 },
]);

/**
 * Parses a #RRGGBB hex string into relative luminance per WCAG 2.1.
 */
export function computeRelativeLuminance(hex: string): number {
  const clean = hex.replace(/^#/, '').trim();
  if (clean.length !== 6) {
    throw new Error(`Expected 6-digit hex color, got "${hex}"`);
  }
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Computes WCAG 2.1 contrast ratio between two #RRGGBB hex colors.
 */
export function computeContrastRatio(hexA: string, hexB: string): number {
  const lumA = computeRelativeLuminance(hexA);
  const lumB = computeRelativeLuminance(hexB);
  const brightest = Math.max(lumA, lumB);
  const darkest = Math.min(lumA, lumB);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Generates the Deep Slate-Indigo Studio SVG backdrop (`ref-dark.png`) with subtle,
 * natural optical bloom behind the Apple Liquid Glass surfaces.
 */
export function buildLuminexSvgDataUri(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1200" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="execBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2b3042"/>
      <stop offset="52%" stop-color="#222636"/>
      <stop offset="100%" stop-color="#181b28"/>
    </linearGradient>
    <radialGradient id="topLeftSoftKey" cx="16%" cy="14%" r="65%">
      <stop offset="0%" stop-color="#64748b" stop-opacity="0.14"/>
      <stop offset="52%" stop-color="#475569" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#181b28" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cornerOrchidAmbient" cx="88%" cy="18%" r="42%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.08"/>
      <stop offset="48%" stop-color="#7c3aed" stop-opacity="0.035"/>
      <stop offset="100%" stop-color="#181b28" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bottomIndigoMist" cx="24%" cy="68%" r="48%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#181b28" stop-opacity="0"/>
    </radialGradient>
    <filter id="softMistBlur" x="0%" y="0%" width="100%" height="100%">
      <feGaussianBlur stdDeviation="1"/>
    </filter>
  </defs>
  <rect width="1920" height="1200" fill="url(#execBase)"/>
  <rect width="1920" height="1200" fill="url(#topLeftSoftKey)"/>
  <rect width="1920" height="1200" fill="url(#cornerOrchidAmbient)"/>
  <rect width="1920" height="1200" fill="url(#bottomIndigoMist)"/>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

/**
 * Generates the Pure Neutral Stone-Silver / Matte Alabaster SVG backdrop (`image_af49985c.png`)
 * with exact achromatic grays (#e2e2e2 -> #d7d7d7 -> #c4c4c4, R=G=B, zero blue cast).
 */
export function buildLuminexLightSvgDataUri(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1200" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="lightBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e2e2e2"/>
      <stop offset="48%" stop-color="#d5d5d5"/>
      <stop offset="100%" stop-color="#c4c4c4"/>
    </linearGradient>
    <radialGradient id="lightTopLeftKey" cx="18%" cy="14%" r="68%">
      <stop offset="0%" stop-color="#efefef" stop-opacity="0.65"/>
      <stop offset="55%" stop-color="#dfdfdf" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#d5d5d5" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1200" fill="url(#lightBase)"/>
  <rect width="1920" height="1200" fill="url(#lightTopLeftKey)"/>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export function buildLuminexFlowOverlayDataUri(): string {
  return buildLuminexSvgDataUri();
}

function serializeTokensToCssDeclarations(tokens: Readonly<Record<string, string>>): string {
  return Object.entries(tokens)
    .map(([k, v]) => `${k}:${v}!important`)
    .join(';');
}

/**
 * Generates the CSS stylesheet rules scoped to body[data-dsh-theme-id="preset-1"]
 * implementing:
 * 1. Exact Neutral Stone-Silver backdrop (#e2e2e2 -> #d5d5d5 -> #c4c4c4) with porcelain-white lifted surfaces (#fafafa -> #efefef & #efefef -> #e5e5e5)
 * 2. Delicate contours (轮廓) and subtle unobtrusive shadows (不那么明显的阴影) across all interactive components
 * 3. 1:1 replication of the curved corner pill slider (.dsh_cpt_capsule, .dsh_cpt_dimple, .dsh_cpt_core_glow)
 */
export function buildLuminexPresetCss(): string {
  const baseUri = buildLuminexSvgDataUri();
  const lightUri = buildLuminexLightSvgDataUri();
  const darkTokenDecls = serializeTokensToCssDeclarations(LUMINEX_THEME_TOKENS);
  const lightTokenDecls = serializeTokensToCssDeclarations(LUMINEX_LIGHT_PULL_TOKENS);
  const syncTransition =
    'background-color .24s cubic-bezier(.22,1,.36,1),border-color .24s cubic-bezier(.22,1,.36,1),color .24s cubic-bezier(.22,1,.36,1),opacity .22s cubic-bezier(.22,1,.36,1),transform .18s cubic-bezier(.22,1,.36,1)';
  const universalSurfaceTransition =
    'background-color .24s cubic-bezier(.22,1,.36,1),border-color .24s cubic-bezier(.22,1,.36,1),color .24s cubic-bezier(.22,1,.36,1),opacity .22s cubic-bezier(.22,1,.36,1)';
  const interactiveControlTransition =
    'background-color .24s cubic-bezier(.22,1,.36,1),border-color .24s cubic-bezier(.22,1,.36,1),box-shadow .24s cubic-bezier(.22,1,.36,1),color .24s cubic-bezier(.22,1,.36,1),opacity .22s cubic-bezier(.22,1,.36,1),transform .18s cubic-bezier(.22,1,.36,1)';

  return [
    // 0. Universal Theme-Switching & Interactive Transition Animations (Applies across ALL themes: Light, Dark, System, 极简, 预设 2, 预设 3)
    `body{--dsw-alias-label-dimmed:#646a73!important}`,
    `body[data-ds-dark-theme]{--dsw-alias-label-dimmed:#9ea9bc!important}`,
    `.zGbnIq_input,.Mbwy4a_fieldInput,.fV0t5q_searchInput,.nhfO0a_search,.pXSMma_modalInput,.ZuhsRW_createInput,.bhn1Oq_searchInput,.bhn1Oq_renameInput,.dt-input input,.dt-textarea,.dt-select,.dshpp-input,.dshpp-textarea,.dshpp-select,input:not([type="checkbox"]):not([type="radio"]):not([type="range"]),textarea,select{color:var(--dsw-alias-label-primary)!important}`,
    `.zGbnIq_input::placeholder,.Mbwy4a_fieldInput::placeholder,.fV0t5q_searchInput::placeholder,.nhfO0a_search::placeholder,.pXSMma_modalInput::placeholder,.ZuhsRW_createInput::placeholder,.bhn1Oq_searchInput::placeholder,.bhn1Oq_renameInput::placeholder,.dt-input input::placeholder,.dt-textarea::placeholder,.dshpp-input::placeholder,.dshpp-textarea::placeholder,input::placeholder,textarea::placeholder{color:var(--dsw-alias-label-dimmed,var(--dsw-alias-label-secondary))!important;opacity:1!important;-webkit-text-fill-color:var(--dsw-alias-label-dimmed,var(--dsw-alias-label-secondary))!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .zGbnIq_input,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .Mbwy4a_fieldInput,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dt-input,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dt-textarea,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dt-select,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dshpp-input,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dshpp-textarea,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dshpp-select{background-color:#1e2231!important;border-color:rgba(255,255,255,0.18)!important;color:#f8fafc!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .zGbnIq_input,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .Mbwy4a_fieldInput,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dt-input,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dt-textarea,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dt-select,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dshpp-input,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dshpp-textarea,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dshpp-select{background-color:#ffffff!important;border-color:rgba(0,0,0,0.16)!important;color:#1a1a1a!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .zGbnIq_input,body[data-dsh-theme-id="${PRESET2_ID}"] .Mbwy4a_fieldInput,body[data-dsh-theme-id="${PRESET2_ID}"] .dt-input,body[data-dsh-theme-id="${PRESET2_ID}"] .dt-textarea,body[data-dsh-theme-id="${PRESET2_ID}"] .dt-select,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-input,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-textarea,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-select{background-color:#FFFFFF!important;border-color:rgba(43,45,56,0.16)!important;color:#2B2D38!important}`,
    `select.zGbnIq_input option,.dt-select option,.dshpp-select option,select option{background-color:var(--dsw-alias-bg-layer-1,#ffffff);color:var(--dsw-alias-label-primary,#1a1a1a)}`,
    `body,.pI_x6G_frame,.pI_x6G_sidebarCol,.pI_x6G_centerCol,.pI_x6G_rightbarCol,.wSkVaW_root,.wSkVaW_header,.wSkVaW_headerBlank,.wSkVaW_body,.wSkVaW_scrollBody,.hHd-Xa_root{transition:${universalSurfaceTransition}}`,
    `.hHd-Xa_newSession,.hHd-Xa_iconButton,.YDXeBa_sessionRow,.YDXeBa_projectRow,.wSkVaW_browserTab,.wSkVaW_browserTabAdd,.wSkVaW_heroWorkspaceRow,.wSkVaW_heroWorkspaceRow button,.pXSMma_headline,.uV2eYG_card,.uV2eYG_scroll,.uV2eYG_placeholder,.uV2eYG_add,.uV2eYG_primary,._8HJdBW_themeCube{transition:${interactiveControlTransition}}`,
    `.hHd-Xa_panelRow,.hHd-Xa_collapsed .hHd-Xa_panelRow{border:0 none transparent!important;border-inline:0 none transparent!important;border-left:0 none transparent!important;border-right:0 none transparent!important;border-color:transparent!important;background-clip:border-box!important;background-origin:border-box!important;transition:background-color .22s cubic-bezier(.22,1,.36,1),color .22s cubic-bezier(.22,1,.36,1),transform .18s cubic-bezier(.22,1,.36,1)!important}`,
    `.hHd-Xa_newSession:active,.hHd-Xa_iconButton:active,.hHd-Xa_panelRow:active,.wSkVaW_browserTab:active,.wSkVaW_browserTabAdd:active,.wSkVaW_heroWorkspaceRow button:active,.uV2eYG_add:active,.uV2eYG_primary:active,._8HJdBW_themeCube:active{transform:scale(0.97)}`,
    `.wSkVaW_composerHero .pXSMma_root,.wSkVaW_composerHero .wSkVaW_heroWorkspaceRow{transform:translateY(-8px)!important}`,
    `.hHd-Xa_newSession svg,.hHd-Xa_iconButton svg,.hHd-Xa_panelRow svg,.wSkVaW_browserTab svg,.wSkVaW_browserTabAdd svg,._8HJdBW_themeCube svg{flex-shrink:0;visibility:visible!important;opacity:1!important;transition:transform .24s cubic-bezier(.22,1,.36,1),color .24s cubic-bezier(.22,1,.36,1)}`,
    `._itemIcon_1p5el_165,.yHnPSG_signedOutMenu [role=menuitem]>span:first-child:not(:last-child),._3e4SsG_itemIcon,[role=menu] [role=menuitem]>span:first-child:not(:last-child){color:var(--dsw-alias-label-primary)!important;opacity:1!important;visibility:visible!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}`,
    `._itemIcon_1p5el_165 svg,.yHnPSG_signedOutMenu [role=menuitem]>span:first-child:not(:last-child) svg,[role=menu] [role=menuitem] svg{color:var(--dsw-alias-label-primary)!important;opacity:1!important;visibility:visible!important;flex-shrink:0!important}`,
    `.dsh_preset1_glass_spec{backdrop-filter:blur(40px) saturate(185%)!important}`,

    // 1. Studio Backdrop & Atomic CSS Token Authority (prevents ThemePresenter from ever desyncing tokens)
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"]{--dsh-cpt-t:1;${darkTokenDecls};background-color:#222534!important;background-image:url("${baseUri}")!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;color:#f8fafc!important;transition:${syncTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"]::before{content:"";position:fixed;inset:0;background-image:url("${lightUri}");background-size:cover;background-position:center center;background-repeat:no-repeat;opacity:0;pointer-events:none;z-index:0;transition:opacity .28s cubic-bezier(.22,1,.36,1)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"]{${lightTokenDecls};background-color:#d7d7d7!important;color:#1a1a1a!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"]::before{opacity:1}`,
    `#dsh-luminex-bg-canvas{display:none!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #root{position:relative;z-index:1}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .pI_x6G_frame,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .pI_x6G_centerCol,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .pI_x6G_rightbarCol,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .pI_x6G_bottomRow,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_root{background:transparent!important;overflow:visible!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .hHd-Xa_root{background:transparent!important;overflow:hidden!important}`,

    // 2. Main Stage Card (.wSkVaW_body) — Clean Solid/Crisp Surface without white blurry haze or expensive backdrop-filter
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_body{margin:20px 76px 18px 16px!important;border-radius:24px 96px 24px 24px!important;corner-shape:round!important;background-color:#262b3d!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.08)!important;box-shadow:0 12px 32px -12px rgba(6,8,18,0.28),0 4px 12px -4px rgba(6,8,18,0.16)!important;position:relative!important;overflow:visible!important;transition:${syncTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .wSkVaW_body{background-color:#eaeaea!important;background-image:none!important;border:1px solid rgba(0,0,0,0.075)!important;box-shadow:8px 12px 24px -8px rgba(0,0,0,0.075),2px 4px 10px -2px rgba(0,0,0,0.035)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_scrollBody{border-radius:23px 95px 23px 23px!important;corner-shape:round!important;background:transparent!important;transition:${syncTransition}}`,

    // 3. Left Sidebar (.pI_x6G_sidebarCol), Selected Session Row (.YDXeBa_sessionRow.YDXeBa_selected — Focus Selector 4) & New Session Button (.hHd-Xa_newSession — Focus Selector 3) — Zero white blur/haze
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .pI_x6G_sidebarCol{background-color:#202434!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border-right:1px solid rgba(255,255,255,0.07)!important;box-shadow:none!important;color:#f8fafc!important;transition:${syncTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .pI_x6G_sidebarCol{background-color:#dcdcdc!important;background-image:none!important;border-right:1px solid rgba(0,0,0,0.075)!important;box-shadow:none!important;color:#1a1a1a!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .hHd-Xa_newSession{background-color:#2d3348!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.09)!important;border-radius:10px!important;color:#f8fafc!important;box-shadow:0 2px 6px -1px rgba(0,0,0,0.20)!important;transition:${interactiveControlTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .hHd-Xa_newSession:hover{background-color:#343b52!important;border-color:rgba(255,255,255,0.14)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .hHd-Xa_newSession{background-color:#f3f3f3!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(0,0,0,0.085)!important;border-radius:10px!important;color:#1a1a1a!important;box-shadow:0 1px 3px rgba(0,0,0,0.04)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .hHd-Xa_newSession:hover{background-color:#f8f8f8!important;background-image:none!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .hHd-Xa_newSession .hHd-Xa_newSessionLabelMask{mask-image:none!important;-webkit-mask-image:none!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .YDXeBa_sessionRow.YDXeBa_selected{background-color:#2d3348!important;background-image:none!important;background-origin:padding-box!important;background-clip:padding-box!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,0.09),0 2px 6px -2px rgba(0,0,0,0.18)!important;transition:${interactiveControlTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .YDXeBa_sessionRow.YDXeBa_selected{background-color:#f2f2f2!important;background-image:none!important;background-origin:padding-box!important;background-clip:padding-box!important;box-shadow:inset 0 0 0 1px rgba(0,0,0,0.08),0 1px 3px rgba(0,0,0,0.035)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .YDXeBa_sessionRow .YDXeBa_title{mask-image:none!important;-webkit-mask-image:none!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .bhn1Oq_fade{display:none!important;background:none!important}`,

    // 4. Top Studio Header & Browser Task Tabs (.wSkVaW_header, .wSkVaW_browserTab — Focus Selector 2) — Zero white blur/haze
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_header,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_headerBlank{background:transparent!important;border-bottom:none!important;box-shadow:none!important;backdrop-filter:none!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_browserTab{background-color:#282d40!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.08)!important;border-radius:10px!important;color:#cbd5e1!important;box-shadow:0 1px 3px rgba(0,0,0,0.18)!important;transition:${interactiveControlTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_browserTab:hover{background-color:#30364c!important;border-color:rgba(255,255,255,0.12)!important;color:#ffffff!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_browserTabActive{background-color:#31374e!important;background-image:none!important;border:1px solid rgba(255,255,255,0.11)!important;color:#ffffff!important;box-shadow:0 2px 6px rgba(0,0,0,0.22)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_browserTabAdd{background-color:#2b3044!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.09)!important;border-radius:10px!important;color:#f8fafc!important;box-shadow:0 1px 3px rgba(0,0,0,0.18)!important;transition:${interactiveControlTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .wSkVaW_browserTab{background-color:#ececec!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(0,0,0,0.075)!important;color:#2e2e2e!important;box-shadow:0 1px 2px rgba(0,0,0,0.03)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .wSkVaW_browserTabActive{background-color:#f4f4f4!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(0,0,0,0.085)!important;color:#1a1a1a!important;box-shadow:0 1px 3px rgba(0,0,0,0.045)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .wSkVaW_browserTabAdd{background-color:#f3f3f3!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(0,0,0,0.085)!important;color:#1a1a1a!important;box-shadow:0 1px 2px rgba(0,0,0,0.035)!important}`,

    // 5. Hero Headline, Composer Stack & Workspace/Mode Pills (.wSkVaW_composerStack — Focus Selector 1) — Zero white blur/haze
    // In active conversations the composerSeat overlays the scroll body: keep an opaque backdrop
    // (upstream's gradient mask) so scrolled messages never show through beneath the composer dock.
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_root[data-phase="active"] .wSkVaW_composerStack,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_root[data-phase="active"] .wSkVaW_composerSeat{background:linear-gradient(180deg,rgba(38,43,61,0) 0px,#262b3d 48px)!important;background-image:linear-gradient(180deg,rgba(38,43,61,0) 0px,#262b3d 48px)!important;box-shadow:none!important;backdrop-filter:none!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_composerStack,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_composerSeat{box-shadow:none!important;backdrop-filter:none!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .wSkVaW_root[data-phase="active"] .wSkVaW_composerStack,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .wSkVaW_root[data-phase="active"] .wSkVaW_composerSeat{background:linear-gradient(180deg,rgba(234,234,234,0) 0px,#eaeaea 48px)!important;background-image:linear-gradient(180deg,rgba(234,234,234,0) 0px,#eaeaea 48px)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .pXSMma_headline{color:#f4f6fb!important;font-weight:500!important;letter-spacing:normal!important;text-shadow:none!important;transition:color .26s cubic-bezier(.22,1,.36,1)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .pXSMma_headline{color:#1a1a1a!important;font-weight:500!important;letter-spacing:normal!important;text-shadow:none!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_heroWorkspaceRow button{background-color:#2e344a!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.09)!important;color:#f1f5f9!important;border-radius:999px!important;padding:5px 14px!important;min-height:32px!important;box-shadow:0 2px 6px -1px rgba(0,0,0,0.20)!important;transition:${interactiveControlTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .wSkVaW_heroWorkspaceRow button:hover{background-color:#353c54!important;border-color:rgba(255,255,255,0.14)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .wSkVaW_heroWorkspaceRow button{background-color:#f6f6f6!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(0,0,0,0.085)!important;color:#1a1a1a!important;box-shadow:0 1px 3px rgba(0,0,0,0.04)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .wSkVaW_heroWorkspaceRow button:hover{background-color:#fafafa!important;background-image:none!important}`,

    // 6. Floating Composer Console (.uV2eYG_card, .uV2eYG_add, & neutral .uV2eYG_primary send button) — Zero white blur/haze
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .uV2eYG_card{background-color:#2b3146!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.09)!important;border-radius:24px!important;box-shadow:0 8px 24px -8px rgba(0,0,0,0.26),0 2px 6px rgba(0,0,0,0.16)!important;color:#f8fafc!important;transition:${syncTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .uV2eYG_placeholder{color:#94a3b8!important;transition:color .26s cubic-bezier(.22,1,.36,1)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .uV2eYG_add{background-color:#333a52!important;background-image:none!important;border:1px solid rgba(255,255,255,0.10)!important;color:#ffffff!important;box-shadow:0 1px 3px rgba(0,0,0,0.20)!important;transition:${interactiveControlTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .uV2eYG_card{background-color:#f7f7f7!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(0,0,0,0.085)!important;border-radius:24px!important;box-shadow:0 6px 18px -6px rgba(0,0,0,0.05),0 1px 3px rgba(0,0,0,0.03)!important;color:#1a1a1a!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .uV2eYG_placeholder{color:#595959!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .uV2eYG_add{background-color:#f2f2f2!important;background-image:none!important;border:1px solid rgba(0,0,0,0.085)!important;color:#1a1a1a!important;box-shadow:0 1px 2px rgba(0,0,0,0.035)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .uV2eYG_primary{background-color:#333333!important;background-image:none!important;border:1px solid rgba(0,0,0,0.15)!important;color:#ffffff!important;box-shadow:0 1px 3px rgba(0,0,0,0.10)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .uV2eYG_primary:disabled,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .uV2eYG_primary[disabled]{background-color:#c2c2c2!important;background-image:none!important;border:1px solid rgba(0,0,0,0.08)!important;color:#f5f5f5!important;box-shadow:none!important}`,

    // 7. Settings Modal Cubes & Preset 1 ("极简") Interactive Mini Slider
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] ._8HJdBW_themeCube{background:#2b3146;border-color:rgba(255,255,255,0.09);color:#e2e8f0;box-shadow:0 2px 6px rgba(0,0,0,0.18);transition:${interactiveControlTransition}}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] ._8HJdBW_themeCube._8HJdBW_selected{background:#343b54!important;border-color:rgba(255,255,255,0.18)!important;color:#ffffff!important;box-shadow:0 4px 12px rgba(0,0,0,0.24)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] ._8HJdBW_themeCube{background:#f3f3f3;border:1px solid rgba(0,0,0,0.08);color:#2e2e2e;box-shadow:0 1px 3px rgba(0,0,0,0.04)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] ._8HJdBW_themeCube._8HJdBW_selected{background:#ffffff!important;border-color:#2b2b2b!important;color:#1a1a1a!important;box-shadow:0 4px 12px -4px rgba(0,0,0,0.10)}`,
    `.dsh_preset1_mini_slider{width:78px;height:34px;border-radius:999px;position:relative;display:inline-flex;align-items:center;padding:3px;box-sizing:border-box;cursor:pointer;user-select:none;-webkit-user-select:none;touch-action:none;vertical-align:middle;background-color:#d8d8d8;border:1px solid rgba(0,0,0,0.12);box-shadow:inset 0 1.5px 3px rgba(0,0,0,0.13),0 1px 0 rgba(255,255,255,0.65);transition:background-color .28s cubic-bezier(.22,1,.36,1),border-color .28s cubic-bezier(.22,1,.36,1),box-shadow .28s cubic-bezier(.22,1,.36,1)}`,
    `.dsh_preset1_mini_slider:active{cursor:grabbing}`,
    `.dsh_preset1_mini_slider[data-submode="dark"]{background-color:#1e2231;border-color:rgba(255,255,255,0.15);box-shadow:inset 0 1.5px 4px rgba(0,0,0,0.52),0 1px 0 rgba(255,255,255,0.06)}`,
    `.dsh_mini_slider_cue_light,.dsh_mini_slider_cue_dark{position:absolute;top:50%;width:14px;height:14px;margin-top:-7px;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:1;transition:opacity .24s cubic-bezier(.22,1,.36,1),transform .24s cubic-bezier(.22,1,.36,1),color .24s ease}`,
    `.dsh_mini_slider_cue_light{left:11px;color:rgba(255,255,255,0.62);opacity:0;transform:scale(0.75)}`,
    `.dsh_preset1_mini_slider[data-submode="dark"] .dsh_mini_slider_cue_light{opacity:1;transform:scale(1)}`,
    `.dsh_mini_slider_cue_dark{right:11px;color:rgba(0,0,0,0.46);opacity:1;transform:scale(1)}`,
    `.dsh_preset1_mini_slider[data-submode="dark"] .dsh_mini_slider_cue_dark{opacity:0;transform:scale(0.75)}`,
    `.dsh_mini_slider_thumb{width:32px;height:26px;border-radius:999px;display:flex;align-items:center;justify-content:center;position:relative;z-index:2;box-sizing:border-box;overflow:hidden;background-color:#ffffff;border:1px solid rgba(0,0,0,0.09);color:#1a1a1a;box-shadow:0 2px 6px rgba(0,0,0,0.18),0 1px 2px rgba(0,0,0,0.10);will-change:transform;transition:background-color .28s cubic-bezier(.22,1,.36,1),color .28s cubic-bezier(.22,1,.36,1),box-shadow .28s cubic-bezier(.22,1,.36,1),border-color .28s cubic-bezier(.22,1,.36,1)}`,
    `.dsh_preset1_mini_slider[data-submode="dark"] .dsh_mini_slider_thumb{background-color:#353c54;border-color:rgba(255,255,255,0.20);color:#f8fafc;box-shadow:0 2px 7px rgba(0,0,0,0.45),inset 0 1px 1px rgba(255,255,255,0.14)}`,
    `.dsh_mini_slider_glow{position:absolute;right:2px;top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(224,122,72,0.75) 0%,rgba(224,122,72,0) 72%);transition:opacity .28s cubic-bezier(.22,1,.36,1)}`,
    `.dsh_preset1_mini_slider[data-submode="dark"] .dsh_mini_slider_glow{background:radial-gradient(circle,rgba(217,70,239,0.8) 0%,rgba(217,70,239,0) 72%)}`,
    `.dsh_mini_slider_spoke{width:14px;height:14px;display:block;position:relative;z-index:1;will-change:transform}`,

    // 8. 1:1 Godly.design / image_af49985c.png Sculpted Groove & Floating Pill Slider (#dsh-corner-pull-toggle)
    `#dsh-corner-pull-toggle{display:none}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-corner-pull-toggle{display:block;position:absolute;top:-72px;right:-72px;width:240px;height:240px;pointer-events:none;z-index:28;user-select:none;-webkit-user-select:none}`,
    `.dsh_cpt_svg{width:240px;height:240px;overflow:visible;display:block}`,
    `.dsh_cpt_track_hit{pointer-events:stroke;cursor:pointer}`,
    `.dsh_cpt_groove_bg,.dsh_cpt_groove_rim{transition:stroke .28s cubic-bezier(.22,1,.36,1),opacity .28s cubic-bezier(.22,1,.36,1)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh_cpt_groove_rim{stroke:rgba(255,255,255,0.06)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh_cpt_groove_bg{stroke:rgba(26,29,42,0.58);filter:url(#cptGrooveInsetDark)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh_cpt_groove_rim{stroke:rgba(0,0,0,0.09)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh_cpt_groove_bg{stroke:#cccccc;filter:url(#cptGrooveInsetLight)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh_cpt_trail_dark{opacity:0.86;transition:opacity .28s cubic-bezier(.22,1,.36,1)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh_cpt_trail_dark{opacity:0}`,
    `.dsh_cpt_capsule{position:absolute;width:68px;height:48px;margin-left:-34px;margin-top:-24px;border-radius:999px!important;corner-shape:round!important;overflow:hidden;pointer-events:auto;cursor:grab;display:flex;align-items:center;justify-content:flex-start;padding:0 7px;box-sizing:border-box;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;transition:box-shadow .28s cubic-bezier(.22,1,.36,1),background-color .28s cubic-bezier(.22,1,.36,1),border-color .28s cubic-bezier(.22,1,.36,1);will-change:transform,left,top}`,
    `.dsh_cpt_capsule::before{content:"";position:absolute;inset:0;border-radius:999px;corner-shape:round!important;background:linear-gradient(45deg,rgba(255,255,255,0.12) 0%,rgba(255,255,255,0.025) 52%,rgba(8,10,18,0.10) 100%);pointer-events:none;z-index:1}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh_cpt_capsule::before{background:linear-gradient(135deg,rgba(255,255,255,0.62) 0%,rgba(255,255,255,0.14) 48%,rgba(0,0,0,0.05) 100%)}`,
    `.dsh_cpt_capsule:active{cursor:grabbing}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh_cpt_capsule{background-color:rgba(56,62,84,0.88);background-image:linear-gradient(45deg,rgba(90,98,128,0.42) 0%,rgba(48,53,74,0.30) 54%,rgba(26,30,44,0.44) 100%);border:1px solid rgba(255,255,255,0.13);box-shadow:12px -6px 28px -6px rgba(6,8,18,0.30),4px -2px 12px -3px rgba(6,8,18,0.16),inset 1px -0.5px 2px rgba(255,255,255,0.20),inset -1px 1px 2.5px rgba(6,8,15,0.26),inset -2px 0 6px rgba(192,38,211,0.15)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh_cpt_capsule{background-color:rgba(224,222,224,0.94);background-image:linear-gradient(135deg,rgba(242,242,244,0.95) 0%,rgba(212,210,214,0.85) 54%,rgba(198,192,188,0.82) 100%);border:1px solid rgba(255,255,255,0.68);border-bottom-color:rgba(0,0,0,0.12);border-right-color:rgba(0,0,0,0.10);box-shadow:10px 12px 22px -4px rgba(0,0,0,0.20),3px 5px 10px -2px rgba(0,0,0,0.10),inset 1.5px 1.5px 3px #ffffff,inset -1px -1.5px 3px rgba(0,0,0,0.12)}`,
    `.dsh_cpt_glint{position:absolute;bottom:2px;left:3px;width:26px;height:6px;border-radius:999px;corner-shape:round!important;background:radial-gradient(ellipse at center,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.32) 45%,rgba(255,255,255,0) 78%);transform:rotate(24deg);pointer-events:none;z-index:3}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh_cpt_glint{bottom:auto;top:1px;left:5px;transform:rotate(-16deg)}`,
    `.dsh_cpt_core_glow{position:absolute;right:6px;top:50%;width:28px;height:28px;margin-top:-14px;border-radius:50%!important;corner-shape:round!important;opacity:0.85;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(217,70,239,0.85) 0%,rgba(217,70,239,0.35) 45%,rgba(217,70,239,0) 75%);transition:opacity .28s cubic-bezier(.22,1,.36,1)}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh_cpt_core_glow{background:radial-gradient(circle,rgba(224,122,72,0.85) 0%,rgba(224,122,72,0.35) 45%,rgba(224,122,72,0) 75%)}`,
    `.dsh_cpt_dimple{width:34px;height:34px;flex:0 0 34px;aspect-ratio:1/1;border-radius:50%!important;corner-shape:round!important;overflow:hidden;display:flex;align-items:center;justify-content:center;position:relative;z-index:2;transition:background-color .28s cubic-bezier(.22,1,.36,1),box-shadow .28s cubic-bezier(.22,1,.36,1),color .28s cubic-bezier(.22,1,.36,1),border-color .28s cubic-bezier(.22,1,.36,1);will-change:transform}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh_cpt_dimple{background-color:rgba(68,74,100,0.72);background-image:linear-gradient(45deg,rgba(14,16,28,0.20) 0%,rgba(82,90,118,0.18) 100%);border:1px solid rgba(255,255,255,0.11);box-shadow:inset 1.5px -1.5px 4px rgba(6,8,15,0.34),inset -1px 1px 3px rgba(255,255,255,0.18),0.5px -0.5px 1.5px rgba(255,255,255,0.12);color:#eef2ff}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh_cpt_dimple{background-color:#cbc6cc;background-image:linear-gradient(135deg,rgba(182,176,184,0.65) 0%,rgba(232,230,234,0.92) 100%);border:1px solid rgba(255,255,255,0.65);box-shadow:inset 2px 2px 4px rgba(0,0,0,0.16),inset -1.5px -1.5px 3px rgba(255,255,255,0.85),0 1px 1.5px rgba(255,255,255,0.75);color:#1e1b18}`,
    `.dsh_cpt_spoke{width:15px;height:15px;display:block;will-change:transform}`,
    buildPreset2Css(),
  ].join('');
}

/**
 * Generates the complete CSS ruleset for Preset 2 (`preset-2`):
 * Industrial-grade Soft Neumorphism + Frosted Acrylic (Light Mode Only) with
 * Subsurface Warm Orange Glow (`#FF6A2B`, `filter: blur(12px)`, `opacity: 0.65`).
 */
export function buildPreset2Css(): string {
  const tokenDecls = Object.entries(PRESET2_THEME_TOKENS)
    .map(([key, value]) => `${key}:${value}!important`)
    .join(';');

  const surfaceTransition =
    'background-color .24s cubic-bezier(.22,1,.36,1),border-color .24s cubic-bezier(.22,1,.36,1),color .24s cubic-bezier(.22,1,.36,1),opacity .22s cubic-bezier(.22,1,.36,1)';
  const springTransition =
    'background-color .24s cubic-bezier(.22,1,.36,1),border-color .24s cubic-bezier(.22,1,.36,1),box-shadow .24s cubic-bezier(.22,1,.36,1),color .24s cubic-bezier(.22,1,.36,1),transform .18s cubic-bezier(.22,1,.36,1),opacity .22s cubic-bezier(.22,1,.36,1)';
  const glowTransition = 'opacity .24s cubic-bezier(.22,1,.36,1),transform .24s cubic-bezier(.22,1,.36,1)';
  const elevatedSurfaceBg = 'linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,255,255,0.42))';
  const elevatedShadow =
    '0 12px 24px -6px rgba(0,0,0,0.08),0 4px 8px rgba(0,0,0,0.04),inset 0 1.5px 2px rgba(255,255,255,0.95),inset 0 -1px 2px rgba(0,0,0,0.05)';
  const recessedBg = 'linear-gradient(145deg,rgba(0,0,0,0.05),rgba(255,255,255,0.5))';
  const recessedShadow = 'inset 2px 2px 5px rgba(0,0,0,0.1),inset -2px -2px 5px rgba(255,255,255,0.85)';
  const centeredOrangeBloom =
    'radial-gradient(ellipse at center,rgba(255,106,43,0.95) 0%,rgba(255,106,43,0.52) 34%,rgba(255,106,43,0.16) 64%,rgba(255,106,43,0) 100%)';
  const spindleOrangeBloom =
    'radial-gradient(36% 60% at 50% 50%,rgba(255,112,51,0.58) 0%,rgba(255,112,51,0.36) 40%,rgba(255,112,51,0.14) 72%,rgba(255,112,51,0) 100%),radial-gradient(50% 24% at 50% 50%,rgba(255,112,51,0.54) 0%,rgba(255,112,51,0.38) 52%,rgba(255,112,51,0.22) 78%,rgba(255,112,51,0.08) 92%,rgba(255,112,51,0) 100%)';

  return [
    // Spec reference rule + Preset 2 Icon inside Appearance Settings Cube
    `.dsh_preset2_subsurface_spec{background:#FF6A2B;filter:blur(12px);opacity:0.65}`,
    `.dsh_preset2_well_icon{width:34px;height:34px;border-radius:9999px;background-color:#DCDCE0;background-image:${recessedBg};box-shadow:${recessedShadow};display:inline-flex;align-items:center;justify-content:center;position:relative;overflow:hidden;box-sizing:border-box;transition:${springTransition}}`,
    `.dsh_preset2_well_glow{position:absolute;inset:2px;border-radius:9999px;background:${centeredOrangeBloom};opacity:0.72;pointer-events:none;transition:${glowTransition}}`,
    `._8HJdBW_themeCube:hover .dsh_preset2_well_glow{opacity:0.92;transform:scale(1.12)}`,
    `.dsh_preset2_well_svg{width:16px!important;height:16px!important;flex:0 0 16px!important;color:#2B2D38!important;position:relative;z-index:1;display:block!important}`,

    // 1. Canvas Background (#E4E4E6 -> #EAEAEF 135deg) & Atomic Light Mode Tokens
    `body[data-dsh-theme-id="${PRESET2_ID}"]{${tokenDecls};background-color:#E4E4E6!important;background-image:linear-gradient(135deg,#E4E4E6 0%,#EAEAEF 100%)!important;color:#2B2D38!important;transition:${surfaceTransition}}`,
    `.wSkVaW_scrollBody::-webkit-scrollbar,.uV2eYG_scroll::-webkit-scrollbar{display:none!important}`,
    `.wSkVaW_scrollBody,.uV2eYG_scroll{scrollbar-width:none!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .pI_x6G_frame,body[data-dsh-theme-id="${PRESET2_ID}"] .pI_x6G_centerCol,body[data-dsh-theme-id="${PRESET2_ID}"] .pI_x6G_rightbarCol,body[data-dsh-theme-id="${PRESET2_ID}"] .pI_x6G_bottomRow,body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_root{background:transparent!important;overflow:visible!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_root{background:transparent!important;overflow:hidden!important}`,

    // 2. Main Surface Card (.wSkVaW_body — #EFEFF2 + Acrylic Gradient + 32px Super-ellipse Radius)
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_body{margin:18px 20px 18px 14px!important;border-radius:32px!important;background-color:#EFEFF2!important;background-image:${elevatedSurfaceBg}!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.68)!important;box-shadow:${elevatedShadow}!important;position:relative!important;overflow:visible!important;transition:${surfaceTransition}}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_scrollBody{border-radius:28px!important;background:transparent!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .bhn1Oq_fade{display:none!important}`,

    // 3. Left Sidebar & Tactile Engraved/Elevated Controls (Gentle Feathered Spindle Orange Bloom: airy center, long soft tapered ends, blur(10px))
    `body[data-dsh-theme-id="${PRESET2_ID}"] .pI_x6G_sidebarCol{background-color:#E7E7EC!important;background-image:linear-gradient(135deg,rgba(255,255,255,0.52),rgba(228,228,230,0.32))!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border-right:1px solid rgba(255,255,255,0.68)!important;box-shadow:inset -1px 0 2px rgba(255,255,255,0.85)!important;color:#2B2D38!important;transition:${surfaceTransition}}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_newSession{position:relative!important;overflow:hidden!important;border-radius:10px!important;background-color:#EFEFF2!important;background-image:${elevatedSurfaceBg}!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.68)!important;box-shadow:${elevatedShadow}!important;color:#2B2D38!important;font-weight:500!important;transition:${springTransition}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_newSession::before{content:"";position:absolute;left:50%;top:50%;width:94%;height:92%;transform:translate(-50%,-50%);border-radius:10px;background:${spindleOrangeBloom};filter:blur(10px);opacity:0.36;pointer-events:none;transition:${glowTransition};z-index:0}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_newSession > *{position:relative;z-index:1}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_newSession:hover{box-shadow:0 14px 26px -6px rgba(0,0,0,0.10),0 6px 14px -2px rgba(255,106,43,0.14),inset 0 2px 3px rgba(255,255,255,1),inset 0 -1px 2px rgba(0,0,0,0.05)!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_newSession:hover::before{opacity:0.48;transform:translate(-50%,-50%) scale(1.02)}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_newSession:active{transform:scale(0.97)!important;box-shadow:0 3px 6px rgba(0,0,0,0.04),${recessedShadow}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_newSession .hHd-Xa_newSessionLabelMask{mask-image:none!important;-webkit-mask-image:none!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_logoRow > button:not(.hHd-Xa_newSession){border-radius:10px!important;background-color:#DCDCE0!important;background-image:${recessedBg}!important;box-shadow:${recessedShadow}!important;color:#2B2D38!important;transition:${springTransition}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_logoRow > button:not(.hHd-Xa_newSession):active{transform:scale(0.97)!important}`,

    // 4. Sidebar Selected Session Row & Recessed Wells
    `body[data-dsh-theme-id="${PRESET2_ID}"] .YDXeBa_sessionRow{margin-inline:var(--dsh-sidebar-paint-inset,8px)!important;border:1px solid transparent!important;border-radius:9999px!important;color:#6E7180!important;transition:${springTransition}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .YDXeBa_sessionRow.YDXeBa_selected{position:relative!important;overflow:hidden!important;margin-inline:var(--dsh-sidebar-paint-inset,8px)!important;border-radius:9999px!important;background-color:#EFEFF2!important;background-image:${elevatedSurfaceBg}!important;background-origin:border-box!important;background-clip:padding-box!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.68)!important;box-shadow:${elevatedShadow}!important;color:#2B2D38!important;font-weight:500!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .YDXeBa_sessionRow.YDXeBa_selected::before{content:"";position:absolute;left:50%;top:50%;width:94%;height:92%;transform:translate(-50%,-50%);border-radius:9999px;background:${spindleOrangeBloom};filter:blur(10px);opacity:0.34;pointer-events:none;transition:${glowTransition};z-index:0}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .YDXeBa_sessionRow.YDXeBa_selected > *{position:relative;z-index:1}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .YDXeBa_sessionRow.YDXeBa_selected:hover::before{opacity:0.46;transform:translate(-50%,-50%) scale(1.02)}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .YDXeBa_sessionRow .YDXeBa_title{mask-image:none!important;-webkit-mask-image:none!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .bhn1Oq_fade{display:none!important;background:none!important}`,

    // 5. Top Header & Pill Browser Tabs
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_header,body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_headerBlank{background:transparent!important;border-bottom:none!important;box-shadow:none!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTab{border-radius:9999px!important;background-color:#DCDCE0!important;background-image:${recessedBg}!important;border:1px solid rgba(255,255,255,0.45)!important;box-shadow:${recessedShadow}!important;color:#6E7180!important;transition:${springTransition}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTab:hover{color:#2B2D38!important;box-shadow:inset 1.5px 1.5px 4px rgba(0,0,0,0.08),inset -2px -2px 5px rgba(255,255,255,0.95)!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTab:active{transform:scale(0.97)!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTabActive{position:relative!important;overflow:hidden!important;border-radius:9999px!important;background-color:#EFEFF2!important;background-image:${elevatedSurfaceBg}!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.68)!important;box-shadow:${elevatedShadow}!important;color:#2B2D38!important;font-weight:500!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTabActive::before{content:"";position:absolute;left:50%;top:50%;width:94%;height:92%;transform:translate(-50%,-50%);border-radius:9999px;background:${spindleOrangeBloom};filter:blur(10px);opacity:0.36;pointer-events:none;transition:${glowTransition};z-index:0}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTabActive:hover::before{opacity:0.48;transform:translate(-50%,-50%) scale(1.02)}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTabActive > *{position:relative;z-index:1}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTabActive .wSkVaW_browserTabIcon{color:#FF6A2B!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTabAdd{border-radius:9999px!important;background-color:#DCDCE0!important;background-image:${recessedBg}!important;border:1px solid rgba(255,255,255,0.55)!important;box-shadow:${recessedShadow}!important;color:#2B2D38!important;transition:${springTransition}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTabAdd:hover{background-color:#EFEFF2!important;background-image:${elevatedSurfaceBg}!important;box-shadow:${elevatedShadow}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_browserTabAdd:active{transform:scale(0.97)!important;box-shadow:${recessedShadow}!important}`,

    // 6. Hero Control Area & Elevated Frosted Workspace/Mode Capsules
    // Keep the active-phase composer backdrop opaque so messages never show through beneath the dock.
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_root[data-phase="active"] .wSkVaW_composerStack,body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_root[data-phase="active"] .wSkVaW_composerSeat{background:linear-gradient(180deg,rgba(239,239,242,0) 0px,#EFEFF2 48px)!important;background-image:linear-gradient(180deg,rgba(239,239,242,0) 0px,#EFEFF2 48px)!important;box-shadow:none!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_composerStack,body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_composerSeat{background:transparent!important;background-image:none!important;box-shadow:none!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .pXSMma_headline{color:#2B2D38!important;font-weight:500!important;letter-spacing:normal!important;text-shadow:none!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_heroWorkspaceRow{background:transparent!important;background-image:none!important;box-shadow:none!important;border-radius:0!important;padding:0 16px 0 20px!important;margin-top:4px!important;display:flex!important;align-items:center!important;gap:8px!important;align-self:stretch!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_heroWorkspaceRow button{position:relative!important;overflow:hidden!important;border-radius:9999px!important;background-color:#EFEFF2!important;background-image:${elevatedSurfaceBg}!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.68)!important;box-shadow:${elevatedShadow}!important;color:#2B2D38!important;padding:5px 14px!important;min-height:32px!important;transition:${springTransition}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_heroWorkspaceRow button::before{content:"";position:absolute;left:50%;top:50%;width:92%;height:90%;transform:translate(-50%,-50%);border-radius:9999px;background:${spindleOrangeBloom};filter:blur(9px);opacity:0.30;pointer-events:none;transition:${glowTransition};z-index:0}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_heroWorkspaceRow button > *{position:relative;z-index:1}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_heroWorkspaceRow button:hover{box-shadow:0 12px 24px -6px rgba(0,0,0,0.10),0 4px 12px rgba(255,106,43,0.14),inset 0 2px 3px rgba(255,255,255,1),inset 0 -1px 2px rgba(0,0,0,0.04)!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_heroWorkspaceRow button:hover::before{opacity:0.42;transform:translate(-50%,-50%) scale(1.02)}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .wSkVaW_heroWorkspaceRow button:active{transform:scale(0.97)!important;box-shadow:0 2px 5px rgba(0,0,0,0.04),${recessedShadow}!important}`,

    // 7. Hero Composer Card (28px Concentric Radius) + Recessed Input Well (.uV2eYG_scroll #DCDCE0) + Subsurface Warm Glow Primary Button (#FF6A2B)
    `body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_card{border-radius:28px!important;background-color:#EFEFF2!important;background-image:${elevatedSurfaceBg}!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.68)!important;box-shadow:${elevatedShadow}!important;color:#2B2D38!important;transition:${springTransition}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_scroll{background-color:#DCDCE0!important;background-image:${recessedBg}!important;box-shadow:${recessedShadow}!important;border-radius:16px!important;padding:4px 10px!important;margin:-2px 0 2px 0!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_placeholder{color:#9E9FA8!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_add{border-radius:9999px!important;background-color:#DCDCE0!important;background-image:${recessedBg}!important;border:1px solid rgba(255,255,255,0.55)!important;box-shadow:${recessedShadow}!important;color:#2B2D38!important;transition:${springTransition}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_add:hover{background-color:#EFEFF2!important;background-image:${elevatedSurfaceBg}!important;box-shadow:${elevatedShadow}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_add:active{transform:scale(0.97)!important;box-shadow:${recessedShadow}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_primary,body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_primary:disabled,body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_primary[disabled]{position:relative!important;overflow:hidden!important;border-radius:9999px!important;background-color:#EFEFF2!important;background-image:radial-gradient(circle at 50% 50%,rgba(255,106,43,0.65) 0%,rgba(255,106,43,0.28) 62%,rgba(255,255,255,0.78) 100%),${elevatedSurfaceBg}!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.72)!important;color:#2B2D38!important;box-shadow:0 8px 20px -4px rgba(255,106,43,0.45),0 4px 8px rgba(0,0,0,0.05),inset 0 1.5px 2px rgba(255,255,255,0.95),inset 0 -1px 2px rgba(255,106,43,0.20)!important;transition:${springTransition}!important;opacity:1!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_primary:hover{box-shadow:0 10px 24px -3px rgba(255,106,43,0.62),0 4px 10px rgba(0,0,0,0.06),inset 0 2px 3px rgba(255,255,255,1)!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .uV2eYG_primary:active{transform:scale(0.97)!important;box-shadow:0 3px 8px rgba(255,106,43,0.35),${recessedShadow}!important}`,

    // 8. Settings Modal & Theme Cubes in Preset 2
    `body[data-dsh-theme-id="${PRESET2_ID}"] ._8HJdBW_themeCube{border-radius:20px!important;background-color:#DCDCE0!important;background-image:${recessedBg}!important;border:1px solid rgba(255,255,255,0.5)!important;box-shadow:${recessedShadow}!important;color:#6E7180!important;transition:${springTransition}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] ._8HJdBW_themeCube:hover{color:#2B2D38!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] ._8HJdBW_themeCube:active{transform:scale(0.97)!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] ._8HJdBW_themeCube._8HJdBW_selected{background-color:#EFEFF2!important;background-image:radial-gradient(circle at 50% 32%,rgba(255,106,43,0.20) 0%,transparent 65%),${elevatedSurfaceBg}!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid rgba(255,255,255,0.75)!important;box-shadow:${elevatedShadow},0 6px 18px -4px rgba(255,106,43,0.22)!important;color:#2B2D38!important;font-weight:500!important}`,

    // 9. dsh-purge-community (.dshpp-page / .dshpp-native / .dshpp-root) & Redteam Drill (.rt-dock) Full Multi-Theme UI Redesign
    `.YDXeBa_projectRow.YDXeBa_selected{background:var(--dsw-alias-interactive-bg-active,rgba(128,128,128,0.14))!important;color:var(--dsw-alias-label-primary)!important;font-weight:500!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .YDXeBa_projectRow.YDXeBa_selected{background:rgba(255,255,255,0.09)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,0.12)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"].light .YDXeBa_projectRow.YDXeBa_selected{background:rgba(255,255,255,0.92)!important;box-shadow:0 4px 12px -2px rgba(20,25,38,0.07),inset 0 1px 0 #FFFFFF!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .YDXeBa_projectRow.YDXeBa_selected{background-color:#EFEFF2!important;background-image:radial-gradient(circle at 0% 50%,rgba(255,106,43,0.18) 0%,transparent 55%),${elevatedSurfaceBg}!important;border:1px solid rgba(255,255,255,0.75)!important;box-shadow:${elevatedShadow}!important;color:#2B2D38!important}`,
    `.dshpp-page,.dshpp-root,.dshpp-native{--dshpp-sans:var(--dsw-alias-font-sans,system-ui,-apple-system,sans-serif)!important;--dshpp-display:var(--dsw-alias-font-sans,system-ui,-apple-system,sans-serif)!important;--dshpp-mono:var(--dsw-alias-font-mono,ui-monospace,SFMono-Regular,Menlo,monospace)!important;--dshpp-fg:var(--dsw-alias-label-primary,#141413)!important;--dshpp-ink:var(--dsw-alias-label-primary,#141413)!important;--dshpp-mute:var(--dsw-alias-label-secondary,#575653)!important;--dshpp-bg:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-base))!important;--dshpp-bg-2:var(--dsw-alias-bg-layer-2,rgba(128,128,128,0.06))!important;--dshpp-paper:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-base))!important;--dshpp-line:var(--dsw-alias-border-l1,rgba(128,128,128,0.16))!important;--dshpp-line-strong:var(--dsw-alias-border-l2,rgba(128,128,128,0.28))!important;--dshpp-accent:var(--dsw-alias-brand-primary,#4d6bfe)!important;--dshpp-solid:var(--dsw-alias-label-primary,#1a1a1a)!important;--dshpp-solid-hover:color-mix(in srgb,var(--dsw-alias-label-primary,#1a1a1a) 85%,transparent)!important;font-family:var(--dsw-alias-font-sans,system-ui,-apple-system,sans-serif)!important;color:var(--dsw-alias-label-primary)!important}`,
    `.dshpp-page{background:var(--dsw-alias-bg-base)!important;padding:24px 32px 64px!important}`,
    `.dshpp-page>*{max-width:1120px!important;margin-left:auto!important;margin-right:auto!important}`,
    `.dshpp-page :is(h1,h2,h3,h4,b,strong,summary,.dshpp-title,.dshpp-now-ver,.dshpp-edition-name,.dshpp-rule-name,.dshpp-cwd-name){font-family:var(--dsw-alias-font-sans,system-ui,-apple-system,sans-serif)!important}`,
    `.dshpp-page-head{display:flex!important;align-items:center!important;gap:14px!important;padding:16px 20px!important;margin-bottom:12px!important;border-radius:16px!important;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.18))!important;background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-base))!important;box-shadow:0 2px 12px -2px rgba(0,0,0,0.04)!important}`,
    `.dshpp-page-glyph{width:40px!important;height:40px!important;border-radius:12px!important;background:color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 12%,var(--dsw-alias-bg-layer-2,transparent))!important;border:1px solid color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 26%,transparent)!important;color:var(--dsw-alias-brand-primary,#4d6bfe)!important}`,
    `.dshpp-page-title h1{font-size:18px!important;font-weight:650!important;letter-spacing:-0.01em!important;color:var(--dsw-alias-label-primary)!important}`,
    `.dshpp-page-ver{padding:2px 8px!important;border-radius:6px!important;background:var(--dsw-alias-bg-layer-2,rgba(128,128,128,0.1))!important;border:1px solid var(--dsw-alias-border-l1,rgba(128,128,128,0.18))!important;font-size:11.5px!important;font-weight:500!important}`,
    `.dshpp-strip{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:8px 20px!important;padding:11px 18px!important;margin:0 auto 12px!important;border-radius:12px!important;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.16))!important;background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-base))!important;font-size:12.5px!important}`,
    `.dshpp-layout-details,.dshpp-page details:not(.dshpp-fold-inline){border:1px solid var(--dsw-alias-border-l1,rgba(128,128,128,0.16))!important;border-radius:11px!important;background:var(--dsw-alias-bg-layer-2,rgba(128,128,128,0.04))!important;padding:0 14px!important;margin:8px auto!important}`,
    `.dshpp-layout-details>summary,.dshpp-page details:not(.dshpp-fold-inline)>summary{cursor:pointer!important;padding:10px 0!important;font-size:13px!important;font-weight:500!important;color:var(--dsw-alias-label-primary)!important;user-select:none!important}`,
    `.dshpp-page-tabs{display:flex!important;align-items:center!important;gap:4px!important;padding:4px!important;margin:12px auto 4px!important;border-radius:12px!important;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.18))!important;background:var(--dsw-alias-bg-layer-2,rgba(128,128,128,0.08))!important;border-bottom:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.18))!important}`,
    `.dshpp-page-tabs button{border:0!important;border-radius:8px!important;padding:7px 16px!important;margin:0!important;font-size:13px!important;font-weight:500!important;color:var(--dsw-alias-label-secondary)!important;background:transparent!important;transition:${springTransition}!important}`,
    `.dshpp-page-tabs button:hover{color:var(--dsw-alias-label-primary)!important;background:var(--dsw-alias-interactive-bg-hover)!important}`,
    `.dshpp-page-tabs button[aria-selected="true"]{background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-base))!important;color:var(--dsw-alias-label-primary)!important;font-weight:600!important;box-shadow:0 1px 3px rgba(0,0,0,0.08)!important;border-bottom-color:transparent!important}`,
    `.dshpp-page .dshpp-card,.dshpp-page section.dshpp-panel{border-radius:16px!important;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.18))!important;background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-base))!important;padding:20px 22px!important;box-shadow:0 2px 12px -2px rgba(0,0,0,0.04)!important}`,
    `.dshpp-page .dshpp-hero{border-radius:14px!important;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.18))!important;background:var(--dsw-alias-bg-layer-2,rgba(128,128,128,0.04))!important;padding:18px 20px!important}`,
    `.dshpp-page .dshpp-actions{background:transparent!important;backdrop-filter:none!important;position:static!important;padding:6px 0 10px!important;margin:0!important}`,
    `.dshpp-btn,.dshpp-page .dshpp-btn{border-radius:9px!important;font-weight:500!important;padding:7px 14px!important;min-height:34px!important;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.24))!important;background:var(--dsw-alias-bg-layer-2,transparent)!important;color:var(--dsw-alias-label-primary)!important;transition:${springTransition}!important}`,
    `.dshpp-btn:hover:not(:disabled),.dshpp-page .dshpp-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)!important;border-color:var(--dsw-alias-border-l2,rgba(128,128,128,0.35))!important}`,
    `.dshpp-btn-primary,.dshpp-page .dshpp-btn-primary{background:var(--dsw-alias-label-primary,#1a1a1a)!important;color:var(--dsw-alias-bg-base,#ffffff)!important;border-color:var(--dsw-alias-label-primary,#1a1a1a)!important;box-shadow:0 1px 2px rgba(0,0,0,0.10)!important;font-weight:600!important}`,
    `.dshpp-btn-primary:hover:not(:disabled),.dshpp-page .dshpp-btn-primary:hover:not(:disabled){opacity:0.9!important;background:var(--dsw-alias-label-primary,#1a1a1a)!important}`,
    `.dshpp-page .dshpp-btn-danger,.dshpp-page .dshpp-btn-solid-danger{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#d14343) 10%,var(--dsw-alias-bg-layer-1,transparent))!important;color:var(--dsw-alias-state-error-primary,#d14343)!important;border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary,#d14343) 30%,transparent)!important}`,
    `.dshpp-page .dshpp-btn-danger:hover:not(:disabled),.dshpp-page .dshpp-btn-solid-danger:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#d14343) 18%,var(--dsw-alias-bg-layer-1,transparent))!important}`,
    `.dshpp-page input:not([type="checkbox"]):not([type="radio"]),.dshpp-page select,.dshpp-page textarea{border-radius:10px!important;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.24))!important;background:var(--dsw-alias-bg-base)!important;color:var(--dsw-alias-label-primary)!important;-webkit-text-fill-color:var(--dsw-alias-label-primary)!important;padding:8px 12px!important}`,
    `.rt-dock.rt-embedded{border-radius:16px!important;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.2))!important;background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-base))!important;overflow:hidden!important;box-shadow:0 2px 12px -2px rgba(0,0,0,0.04)!important}`,
    `.rt-head,.rt-tabs,.rt-toolbar,.rt-foot{background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-base))!important;border-color:var(--dsw-alias-border-l1,rgba(128,128,128,0.14))!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dshpp-page-head,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dshpp-strip,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dshpp-page .dshpp-card,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dshpp-page section.dshpp-panel,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .rt-dock.rt-embedded,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-ghub-sidebar,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-ghub-main{background:rgba(24,25,30,0.68)!important;backdrop-filter:blur(24px) saturate(160%)!important;-webkit-backdrop-filter:blur(24px) saturate(160%)!important;border:1px solid rgba(255,255,255,0.09)!important;box-shadow:0 12px 32px -8px rgba(0,0,0,0.42),inset 0 1px 0 rgba(255,255,255,0.10)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"].light .dshpp-page-head,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"].light .dshpp-strip,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"].light .dshpp-page .dshpp-card,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"].light .dshpp-page section.dshpp-panel,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"].light .rt-dock.rt-embedded,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"].light .dsh-ghub-sidebar,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"].light .dsh-ghub-main{background:rgba(255,255,255,0.82)!important;backdrop-filter:blur(24px) saturate(180%)!important;-webkit-backdrop-filter:blur(24px) saturate(180%)!important;border:1px solid rgba(15,23,42,0.08)!important;box-shadow:0 10px 26px -6px rgba(15,23,42,0.06),inset 0 1px 0 #FFFFFF!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page-head,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-strip,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page .dshpp-card,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page section.dshpp-panel,body[data-dsh-theme-id="${PRESET2_ID}"] .rt-dock.rt-embedded,body[data-dsh-theme-id="${PRESET2_ID}"] .dsh-ghub-sidebar,body[data-dsh-theme-id="${PRESET2_ID}"] .dsh-ghub-main{background-color:#EFEFF2!important;background-image:${elevatedSurfaceBg}!important;border:1px solid rgba(255,255,255,0.75)!important;box-shadow:${elevatedShadow}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page-tabs,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page .dshpp-hero,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-layout-details,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page details:not(.dshpp-fold-inline),body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page input:not([type="checkbox"]):not([type="radio"]),body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page select,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page textarea,body[data-dsh-theme-id="${PRESET2_ID}"] .dsh-ghub-timeline,body[data-dsh-theme-id="${PRESET2_ID}"] .dsh-ghub-input,body[data-dsh-theme-id="${PRESET2_ID}"] .dsh-ghub-select,body[data-dsh-theme-id="${PRESET2_ID}"] .dsh-ghub-textarea{background-color:#DCDCE0!important;background-image:${recessedBg}!important;border:1px solid rgba(255,255,255,0.55)!important;box-shadow:${recessedShadow}!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page-tabs button[aria-selected="true"],body[data-dsh-theme-id="${PRESET2_ID}"] .dsh-ghub-room-btn[data-active="true"]{background-color:#FFFFFF!important;background-image:none!important;border:1.5px solid #FF6A2B!important;box-shadow:0 2px 8px rgba(255,106,43,0.14)!important;color:#1F2329!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-btn-primary,body[data-dsh-theme-id="${PRESET2_ID}"] .dshpp-page .dshpp-btn-primary{background-color:#EFEFF2!important;background-image:radial-gradient(circle at 50% 50%,rgba(255,106,43,0.52) 0%,rgba(255,106,43,0.20) 62%,rgba(255,255,255,0.78) 100%),${elevatedSurfaceBg}!important;color:#2B2D38!important;border:1px solid rgba(255,255,255,0.75)!important;box-shadow:0 6px 16px -4px rgba(255,106,43,0.35),inset 0 1px 2px rgba(255,255,255,0.95)!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] .dsh-ghub-btn-primary,body[data-dsh-theme-id="${PRESET2_ID}"] .dsh-ghub-btn[data-active="true"],body[data-dsh-theme-id="${PRESET2_ID}"] .dsh-group-bar-ctrl[data-active="true"]{background:#FFFFFF!important;background-color:#FFFFFF!important;background-image:none!important;border:1.5px solid #FF6A2B!important;color:#1F2329!important;-webkit-text-fill-color:#1F2329!important;box-shadow:0 2px 8px rgba(255,106,43,0.14)!important;font-weight:600!important}`,

    // 10. Multi-Agent & Multi-Bot Group Hub (.dsh-ghub-*) Theme-Consistent Styles
    `.dsh-ghub-mode-bar{display:inline-flex;align-items:center;gap:4px;padding:4px;border-radius:10px;background:var(--dsw-alias-bg-layer-2,rgba(128,128,128,0.08));border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.18));margin-bottom:14px;flex-wrap:wrap}`,
    `.dsh-ghub-mode-btn{appearance:none;border:1px solid transparent;border-radius:7px;padding:6px 14px;font:inherit;font-size:13px;font-weight:500;color:var(--dsw-alias-label-secondary);background:transparent;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background .15s ease,color .15s ease,border-color .15s ease}`,
    `.dsh-ghub-mode-btn:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}`,
    `.dsh-ghub-mode-btn[data-active="true"]{background:#FFFFFF!important;background-image:none!important;border:1.5px solid #FF6A2B!important;color:#1F2329!important;font-weight:600;box-shadow:0 2px 8px rgba(255,106,43,0.14)}`,
    `.dsh-ghub-shell{display:grid;grid-template-columns:368px minmax(0,1fr);gap:16px;min-height:620px;align-items:stretch;color:var(--dsw-alias-label-primary)}`,
    `@media (max-width:960px){.dsh-ghub-shell{grid-template-columns:1fr}}`,
    `.dsh-ghub-sidebar,.dsh-ghub-main{display:flex;flex-direction:column;gap:12px;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.2));border-radius:14px;background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-base));padding:12px;min-width:0;box-sizing:border-box}`,
    `.dsh-ghub-section-title{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;font-weight:600;letter-spacing:0.02em;color:var(--dsw-alias-label-secondary);margin:0 0 6px}`,
    `.dsh-ghub-card{border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.18));border-radius:10px;padding:10px;background:var(--dsw-alias-bg-layer-2,rgba(128,128,128,0.04));display:flex;flex-direction:column;gap:6px;min-width:0}`,
    `.dsh-ghub-room-btn{width:100%;text-align:left;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.18));border-radius:10px;padding:10px 12px;background:var(--dsw-alias-bg-layer-2,rgba(128,128,128,0.04));color:var(--dsw-alias-label-primary);cursor:pointer;display:flex;flex-direction:column;gap:4px;font:inherit;transition:border-color .15s ease,background .15s ease}`,
    `.dsh-ghub-room-btn:hover{background:var(--dsw-alias-interactive-bg-hover)}`,
    `.dsh-ghub-room-btn[data-active="true"]{border:1.5px solid #FF6A2B!important;background:#FFFFFF!important;background-image:none!important;color:#1F2329!important;box-shadow:0 2px 8px rgba(255,106,43,0.12)}`,
    `.dsh-ghub-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 7px;border-radius:6px;font-size:11px;font-weight:500;line-height:16px;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.22));background:var(--dsw-alias-bg-layer-1,transparent);color:var(--dsw-alias-label-secondary);white-space:nowrap}`,
    `.dsh-ghub-timeline{flex:1;min-height:340px;max-height:500px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:12px;border-radius:10px;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.16));background:var(--dsw-alias-bg-base)}`,
    `.dsh-ghub-msg{display:flex;flex-direction:column;gap:6px;padding:10px 12px;border-radius:10px;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.18));background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-base))}`,
    `.dsh-ghub-msg[data-sender-type="agent"]{border-left:3px solid #FF6A2B}`,
    `.dsh-ghub-msg[data-sender-type="external_bot"]{border-left:3px solid #10b981}`,
    `.dsh-ghub-msg[data-sender-type="human"]{background:color-mix(in srgb,#FF6A2B 7%,var(--dsw-alias-bg-layer-1,transparent))}`,
    `.dsh-ghub-input,.dsh-ghub-select,.dsh-ghub-textarea{box-sizing:border-box;width:100%;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.24));border-radius:8px;padding:7px 9px;font:inherit;font-size:12.5px;color:var(--dsw-alias-label-primary)!important;-webkit-text-fill-color:var(--dsw-alias-label-primary)!important;background:var(--dsw-alias-bg-base)!important}`,
    `.dsh-ghub-btn{appearance:none;border:1px solid var(--dsw-alias-border-l2,rgba(128,128,128,0.22));border-radius:8px;padding:6px 12px;font:inherit;font-size:12.5px;font-weight:500;background:var(--dsw-alias-bg-layer-2,#F4F5F7);color:var(--dsw-alias-label-secondary,#575653);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;transition:background .15s ease,border-color .15s ease,color .15s ease,box-shadow .15s ease}`,
    `.dsh-ghub-btn:hover:not(:disabled){border-color:rgba(255,106,43,0.55);color:var(--dsw-alias-label-primary)}`,
    `.dsh-ghub-btn[data-active="true"],.dsh-group-bar-ctrl[data-active="true"],.dsh-ghub-btn-primary{background:#FFFFFF!important;background-color:#FFFFFF!important;background-image:none!important;border:1.5px solid #FF6A2B!important;color:#1F2329!important;-webkit-text-fill-color:#1F2329!important;font-weight:600!important;box-shadow:0 2px 6px rgba(255,106,43,0.12)!important}`,
    `.dsh-ghub-btn:disabled{opacity:0.5;cursor:not-allowed}`,
    `.dsh-group-bar-ctrl{height:28px!important;min-height:28px!important;max-height:28px!important;padding:0 9px!important;border-radius:8px!important;font-size:12px!important;font-weight:500!important;line-height:25px!important;box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;margin:0!important;vertical-align:middle!important}`,
    `select.dsh-group-bar-ctrl{width:auto!important;padding:0 24px 0 10px!important;background:#FFFFFF!important;background-color:#FFFFFF!important;border:1.5px solid #FF6A2B!important;color:#1F2329!important;-webkit-text-fill-color:#1F2329!important;font-weight:600!important;cursor:pointer!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-ghub-btn[data-active="true"],body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-group-bar-ctrl[data-active="true"],body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-ghub-btn-primary,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] select.dsh-group-bar-ctrl,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-ghub-mode-btn[data-active="true"],body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-ghub-room-btn[data-active="true"]{background:#343b54!important;background-color:#343b54!important;background-image:none!important;border:1.5px solid rgba(255,255,255,0.24)!important;color:#f8fafc!important;-webkit-text-fill-color:#f8fafc!important;box-shadow:0 2px 6px rgba(0,0,0,0.28),inset 0 1px 0 rgba(255,255,255,0.14)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh-ghub-btn[data-active="true"],body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh-group-bar-ctrl[data-active="true"],body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh-ghub-btn-primary,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] select.dsh-group-bar-ctrl,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh-ghub-mode-btn[data-active="true"],body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh-ghub-room-btn[data-active="true"]{background:#ffffff!important;background-color:#ffffff!important;background-image:none!important;border:1.5px solid #2b2b2b!important;color:#1a1a1a!important;-webkit-text-fill-color:#1a1a1a!important;box-shadow:0 2px 6px rgba(0,0,0,0.08)!important}`,
    `div[role="menu"]:has(.cubgiG_item){position:fixed!important;max-height:min(280px,var(--dsh-anchored-max-height,280px))!important;width:320px!important;max-width:min(320px,calc(100vw - 24px))!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;border-radius:18px!important;padding:6px 4px 6px 6px!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] div[role="menu"]:has(.cubgiG_item){background-color:#262b3d!important;border:1px solid rgba(255,255,255,0.10)!important;box-shadow:0 16px 36px -8px rgba(6,8,18,0.55),0 4px 12px rgba(0,0,0,0.28),inset 0 1px 0 rgba(255,255,255,0.10)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] div[role="menu"]:has(.cubgiG_item){background-color:#f4f4f4!important;border:1px solid rgba(0,0,0,0.09)!important;box-shadow:0 12px 28px -6px rgba(0,0,0,0.12),0 3px 8px rgba(0,0,0,0.05),inset 0 1px 0 #ffffff!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] div[role="menu"]:has(.cubgiG_item){background-color:#EFEFF2!important;background-image:${elevatedSurfaceBg}!important;border:1px solid rgba(255,255,255,0.75)!important;box-shadow:${elevatedShadow}!important}`,
    `div[role="menu"]:has(.cubgiG_item) > [role="presentation"]{flex:1 1 auto!important;min-height:0!important;max-height:calc(min(280px,var(--dsh-anchored-max-height,280px)) - 12px)!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;scrollbar-width:none!important;-ms-overflow-style:none!important;padding-right:14px!important}`,
    `div[role="menu"]:has(.cubgiG_item) > [role="presentation"]::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}`,
    `.dsh-preset-oval-scrollbar{position:absolute!important;top:10px!important;bottom:10px!important;right:5px!important;width:8px!important;border-radius:9999px!important;background:rgba(255,106,43,0.08)!important;box-shadow:inset 0 1px 2px rgba(255,106,43,0.10),inset 0 0 0 0.5px rgba(255,106,43,0.14)!important;z-index:10!important;cursor:pointer!important;user-select:none!important;transition:background .18s ease,box-shadow .18s ease!important}`,
    `.dsh-preset-oval-thumb{position:absolute!important;top:0!important;left:0!important;width:100%!important;min-height:36px!important;border-radius:9999px!important;background-color:rgba(255,106,43,0.34)!important;background-image:linear-gradient(180deg,rgba(255,158,108,0.48) 0%,rgba(255,106,43,0.68) 50%,rgba(255,158,108,0.48) 100%)!important;border:1px solid rgba(255,255,255,0.72)!important;box-shadow:0 2px 6px rgba(255,106,43,0.24),inset 0 1px 1.5px rgba(255,255,255,0.75)!important;box-sizing:border-box!important;cursor:grab!important;transition:background .15s ease,box-shadow .15s ease,border-color .15s ease!important}`,
    `.dsh-preset-oval-scrollbar:hover .dsh-preset-oval-thumb,.dsh-preset-oval-thumb:hover{background-color:rgba(255,106,43,0.55)!important;background-image:linear-gradient(180deg,rgba(255,150,96,0.65) 0%,rgba(255,106,43,0.85) 50%,rgba(255,150,96,0.65) 100%)!important;box-shadow:0 3px 8px rgba(255,106,43,0.36),inset 0 1px 1.5px rgba(255,255,255,0.85)!important}`,
    `body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) .dsh-preset-oval-scrollbar{background:rgba(255,255,255,0.06)!important;box-shadow:inset 0 1px 2px rgba(0,0,0,0.42),inset 0 0 0 0.5px rgba(255,255,255,0.09)!important}`,
    `body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) .dsh-preset-oval-thumb{background-color:rgba(148,163,184,0.34)!important;background-image:linear-gradient(180deg,rgba(203,213,225,0.42) 0%,rgba(148,163,184,0.28) 100%)!important;border:1px solid rgba(255,255,255,0.18)!important;box-shadow:0 2px 5px rgba(0,0,0,0.38),inset 0 1px 1px rgba(255,255,255,0.24)!important}`,
    `body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) .dsh-preset-oval-scrollbar:hover .dsh-preset-oval-thumb,body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) .dsh-preset-oval-thumb:hover{background-color:rgba(203,213,225,0.48)!important;background-image:linear-gradient(180deg,rgba(226,232,240,0.56) 0%,rgba(148,163,184,0.42) 100%)!important;box-shadow:0 3px 7px rgba(0,0,0,0.45),inset 0 1px 1.5px rgba(255,255,255,0.32)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-preset-oval-scrollbar{background-color:#1b1f2d!important;background-image:linear-gradient(180deg,#161925 0%,#222738 100%)!important;border:1px solid rgba(255,255,255,0.08)!important;box-shadow:inset 0 1.5px 3px rgba(0,0,0,0.55),0 1px 0 rgba(255,255,255,0.05)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-preset-oval-thumb{background-color:#525a72!important;background-image:linear-gradient(180deg,rgba(148,158,186,0.75) 0%,rgba(86,95,122,0.88) 50%,rgba(64,72,96,0.94) 100%)!important;border:1px solid rgba(255,255,255,0.26)!important;box-shadow:0 2px 6px rgba(0,0,0,0.48),inset 0 1px 1.5px rgba(255,255,255,0.38),inset 0 -1px 1.5px rgba(15,18,28,0.45)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-preset-oval-scrollbar:hover .dsh-preset-oval-thumb,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .dsh-preset-oval-thumb:hover{background-color:#66708e!important;background-image:linear-gradient(180deg,rgba(176,186,214,0.85) 0%,rgba(106,116,146,0.92) 50%,rgba(80,89,116,0.96) 100%)!important;border-color:rgba(255,255,255,0.36)!important;box-shadow:0 3px 8px rgba(0,0,0,0.55),inset 0 1px 2px rgba(255,255,255,0.48)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh-preset-oval-scrollbar{background-color:#d8d8d8!important;background-image:linear-gradient(180deg,#cecece 0%,#e0e0e0 100%)!important;border:1px solid rgba(0,0,0,0.10)!important;box-shadow:inset 0 1.5px 3px rgba(0,0,0,0.15),0 1px 0 rgba(255,255,255,0.8)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh-preset-oval-thumb{background-color:#8e9198!important;background-image:linear-gradient(180deg,#b8bbc2 0%,#888b94 52%,#70737b 100%)!important;border:1px solid rgba(255,255,255,0.82)!important;box-shadow:0 2px 5px rgba(0,0,0,0.18),inset 0 1px 1.5px rgba(255,255,255,0.9),inset 0 -1px 1px rgba(0,0,0,0.18)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh-preset-oval-scrollbar:hover .dsh-preset-oval-thumb,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] .dsh-preset-oval-thumb:hover{background-color:#757880!important;background-image:linear-gradient(180deg,#a0a3ab 0%,#72757e 52%,#5a5d65 100%)!important;border-color:rgba(255,255,255,0.9)!important;box-shadow:0 3px 7px rgba(0,0,0,0.24),inset 0 1px 1.5px #ffffff!important}`,
    `.dsh-preset-oval-thumb:active{cursor:grabbing!important}`,
    `.cubgiG_itemDesc{display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;overflow:hidden!important}`,
    `[data-testid^="workspace-group-room-"]:hover .YDXeBa_rowResting,[data-testid^="workspace-group-room-"] .dsh-sidebar-group-stats{display:inline-flex!important;pointer-events:auto!important}`,

    // 10b. rc.3 alignment: suppress rc.3-native decorations the rc.1 UI never had
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .hHd-Xa_brand,body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_brand{display:none!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .pXSMma_previewBadge,body[data-dsh-theme-id="${PRESET2_ID}"] .pXSMma_previewBadge{display:none!important}`,

    // 10c. rc.1 alignment: 新会话 button shares the top row with the sidebar toggle.
    // transform moves it without touching layout flow (collapse-safe); the row is
    // pointer-transparent so the toggle beneath stays clickable.
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .hHd-Xa_newSessionRow,body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_newSessionRow{transform:translateY(-44px)!important;pointer-events:none!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .hHd-Xa_newSessionRow .hHd-Xa_newSession,body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_newSessionRow .hHd-Xa_newSession{width:calc(100% - 44px)!important;max-width:calc(100% - 44px)!important;flex:0 0 auto!important;pointer-events:auto!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] .hHd-Xa_newSessionRow .hHd-Xa_newSessionShortcut,body[data-dsh-theme-id="${PRESET2_ID}"] .hHd-Xa_newSessionRow .hHd-Xa_newSessionShortcut{display:none!important}`,

    // 11. Universal Theme-Adaptive Floating Explanation Tooltip (#dsh-themed-tooltip-card & [role="tooltip"])
    `#dsh-themed-tooltip-card{position:fixed!important;left:0;top:0;z-index:2147483646!important;pointer-events:none!important;max-width:316px!important;min-width:168px!important;padding:10px 13px!important;border-radius:14px!important;box-sizing:border-box!important;display:flex!important;flex-direction:column!important;gap:5px!important;opacity:0;visibility:hidden;transform:translate3d(0,4px,0) scale(0.98);transition:opacity .14s cubic-bezier(.22,1,.36,1),transform .14s cubic-bezier(.22,1,.36,1),visibility .14s ease!important;font-family:var(--dsw-alias-font-sans,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif)!important;background-color:#ffffff!important;background-image:linear-gradient(145deg,#ffffff 0%,#f8fafc 100%)!important;border:1px solid rgba(15,23,42,0.11)!important;box-shadow:0 12px 28px -6px rgba(15,23,42,0.14),0 4px 10px -2px rgba(15,23,42,0.06),inset 0 1px 0 #ffffff!important;color:#0f172a!important}`,
    `#dsh-themed-tooltip-card[data-has-cols="true"]{max-width:468px!important;min-width:348px!important;padding:11px 14px!important}`,
    `#dsh-themed-tooltip-card[data-visible="true"]{opacity:1!important;visibility:visible!important;transform:translate3d(0,0,0) scale(1)!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-header{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;min-width:0!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-title-wrap{display:inline-flex!important;align-items:center!important;gap:6px!important;min-width:0!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-dot{width:6px!important;height:6px!important;border-radius:9999px!important;flex-shrink:0!important;background:#FF6A2B!important;box-shadow:0 0 6px rgba(255,106,43,0.45)!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-title{font-size:12.5px!important;font-weight:650!important;line-height:1.35!important;letter-spacing:-0.01em!important;color:#0f172a!important;overflow:hidden!important;text-overflow:ellipsis!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-tag{font-size:10.5px!important;font-weight:600!important;line-height:1.2!important;padding:2px 6px!important;border-radius:6px!important;white-space:nowrap!important;flex-shrink:0!important;background:rgba(255,106,43,0.10)!important;color:#d94e14!important;border:1px solid rgba(255,106,43,0.24)!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-desc{font-size:11.5px!important;font-weight:450!important;line-height:1.5!important;color:#475569!important;word-break:break-word!important;white-space:pre-line!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-cols{display:none!important}`,
    `#dsh-themed-tooltip-card[data-has-cols="true"] .dsh-tip-cols{display:grid!important;grid-template-columns:minmax(145px,1fr) minmax(145px,1fr)!important;gap:10px!important;margin-top:3px!important;padding-top:7px!important;border-top:1px solid rgba(15,23,42,0.09)!important;align-items:start!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-col{display:flex!important;flex-direction:column!important;gap:4px!important;min-width:0!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-col-right{padding-left:10px!important;border-left:1px solid rgba(15,23,42,0.08)!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-col-head{font-size:11px!important;font-weight:650!important;line-height:1.3!important;color:#0f172a!important;margin-bottom:1px!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-col-list{display:flex!important;flex-direction:column!important;gap:3px!important;min-width:0!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-col-item{font-size:11px!important;line-height:1.4!important;color:#334155!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}`,
    `#dsh-themed-tooltip-card .dsh-tip-foot{display:none!important}`,
    `#dsh-themed-tooltip-card[data-has-foot="true"] .dsh-tip-foot{display:block!important;font-size:10.5px!important;line-height:1.35!important;color:#64748b!important;margin-top:2px!important;padding-top:6px!important;border-top:1px dashed rgba(15,23,42,0.09)!important}`,
    // Default Dark Theme Tooltip
    `body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) #dsh-themed-tooltip-card,body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) [role="tooltip"]{background-color:#202532!important;background-image:linear-gradient(145deg,#262c3b 0%,#1b1f2b 100%)!important;border:1px solid rgba(255,255,255,0.12)!important;box-shadow:0 14px 32px -6px rgba(0,0,0,0.55),0 4px 12px rgba(0,0,0,0.32),inset 0 1px 0 rgba(255,255,255,0.10)!important;color:#f1f5f9!important}`,
    `body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) #dsh-themed-tooltip-card .dsh-tip-dot{background:#94a3b8!important;box-shadow:0 0 6px rgba(148,163,184,0.45)!important}`,
    `body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) #dsh-themed-tooltip-card .dsh-tip-title,body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) #dsh-themed-tooltip-card .dsh-tip-col-head{color:#f8fafc!important}`,
    `body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) #dsh-themed-tooltip-card .dsh-tip-tag{background:rgba(148,163,184,0.16)!important;color:#e2e8f0!important;border-color:rgba(255,255,255,0.16)!important}`,
    `body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) #dsh-themed-tooltip-card .dsh-tip-desc,body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) #dsh-themed-tooltip-card .dsh-tip-col-item{color:#cbd5e1!important}`,
    `body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) #dsh-themed-tooltip-card .dsh-tip-cols,body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) #dsh-themed-tooltip-card .dsh-tip-col-right,body[data-ds-dark-theme]:not([data-dsh-theme-id="${LUMINEX_PRESET_ID}"]):not([data-dsh-theme-id="${PRESET2_ID}"]) #dsh-themed-tooltip-card .dsh-tip-foot{border-color:rgba(255,255,255,0.12)!important;color:#94a3b8!important}`,
    // 极简橙 (Preset 2) Neumorphic Frosted Acrylic + Warm Orange Tooltip
    `body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card,body[data-dsh-theme-id="${PRESET2_ID}"] [role="tooltip"]{background-color:#EFEFF2!important;background-image:radial-gradient(120% 90% at 0% 0%,rgba(255,106,43,0.12) 0%,transparent 58%),linear-gradient(135deg,rgba(255,255,255,0.96) 0%,rgba(239,239,242,0.94) 100%)!important;backdrop-filter:blur(16px) saturate(160%)!important;-webkit-backdrop-filter:blur(16px) saturate(160%)!important;border:1px solid rgba(255,106,43,0.38)!important;border-radius:16px!important;box-shadow:6px 8px 20px rgba(166,168,179,0.38),-4px -4px 12px rgba(255,255,255,0.9),0 4px 14px rgba(255,106,43,0.14),inset 0 1px 1.5px #FFFFFF!important;color:#2B2D38!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card .dsh-tip-dot{background:#FF6A2B!important;box-shadow:0 0 8px rgba(255,106,43,0.65)!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card .dsh-tip-title,body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card .dsh-tip-col-head{color:#1F2329!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card .dsh-tip-tag{background:#FFFFFF!important;color:#FF6A2B!important;border:1px solid rgba(255,106,43,0.45)!important;box-shadow:0 1px 3px rgba(255,106,43,0.12)!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card .dsh-tip-desc,body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card .dsh-tip-col-item{color:#4E5160!important}`,
    `body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card .dsh-tip-cols,body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card .dsh-tip-col-right,body[data-dsh-theme-id="${PRESET2_ID}"] #dsh-themed-tooltip-card .dsh-tip-foot{border-color:rgba(255,106,43,0.22)!important;color:#6E7180!important}`,
    // 高级灰 · 深色 (Preset 1 Dark) Slate-Titanium Liquid Glass Tooltip
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] [role="tooltip"]{background-color:rgba(34,39,56,0.95)!important;background-image:linear-gradient(145deg,rgba(52,59,84,0.96) 0%,rgba(28,32,48,0.97) 100%)!important;backdrop-filter:blur(22px) saturate(175%)!important;-webkit-backdrop-filter:blur(22px) saturate(175%)!important;border:1px solid rgba(255,255,255,0.18)!important;border-radius:15px!important;box-shadow:0 16px 36px -6px rgba(5,8,18,0.62),0 4px 12px rgba(0,0,0,0.35),inset 0 1px 1px rgba(255,255,255,0.22)!important;color:#f8fafc!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card .dsh-tip-dot{background:#94a3b8!important;box-shadow:0 0 8px rgba(148,163,184,0.55)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card .dsh-tip-title,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card .dsh-tip-col-head{color:#f8fafc!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card .dsh-tip-tag{background:rgba(148,163,184,0.18)!important;color:#e2e8f0!important;border:1px solid rgba(255,255,255,0.20)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card .dsh-tip-desc,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card .dsh-tip-col-item{color:#cbd5e1!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card .dsh-tip-cols,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card .dsh-tip-col-right,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"] #dsh-themed-tooltip-card .dsh-tip-foot{border-color:rgba(255,255,255,0.14)!important;color:#94a3b8!important}`,
    // 高级灰 · 浅色 (Preset 1 Light) Matte Alabaster & Brushed Graphite Ceramic Tooltip
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] [role="tooltip"]{background-color:#f7f7f8!important;background-image:linear-gradient(145deg,#ffffff 0%,#ececef 100%)!important;backdrop-filter:blur(18px) saturate(160%)!important;-webkit-backdrop-filter:blur(18px) saturate(160%)!important;border:1px solid rgba(0,0,0,0.13)!important;border-radius:15px!important;box-shadow:0 12px 28px -6px rgba(0,0,0,0.15),0 3px 9px rgba(0,0,0,0.06),inset 0 1px 1px #ffffff!important;color:#1a1a1a!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card .dsh-tip-dot{background:#52555e!important;box-shadow:0 0 6px rgba(82,85,94,0.35)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card .dsh-tip-title,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card .dsh-tip-col-head{color:#1a1a1a!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card .dsh-tip-tag{background:#e6e7ea!important;color:#2b2b2b!important;border:1px solid rgba(0,0,0,0.14)!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card .dsh-tip-desc,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card .dsh-tip-col-item{color:#3a3a3a!important}`,
    `body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card .dsh-tip-cols,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card .dsh-tip-col-right,body[data-dsh-theme-id="${LUMINEX_PRESET_ID}"][data-dsh-preset1-mode="light"] #dsh-themed-tooltip-card .dsh-tip-foot{border-color:rgba(0,0,0,0.10)!important;color:#666666!important}`,
  ].join('');
}

/**
 * Generates the browser runtime method that syncs the active theme id to document.body
 * and mounts the 1:1 godly.design Curved Corner Liquid-Glass Pill Slider on .wSkVaW_body.
 */
export function buildLuminexCanvasRuntimeCode(): string {
  return `syncDshLuminexBackground(themeId) {
			if (typeof document === "undefined" || !document.body) return;
			document.body.setAttribute("data-dsh-theme-id", themeId);
			const existingCanvas = document.getElementById("dsh-luminex-bg-canvas");
			if (existingCanvas) existingCanvas.remove();

			const ensureDshUniversalTooltips = () => {
				if (globalThis.__dshUniversalTooltipMounted) return;
				globalThis.__dshUniversalTooltipMounted = true;

				const ensureCard = () => {
					let card = document.getElementById("dsh-themed-tooltip-card");
					if (!card && document.body) {
						card = document.createElement("div");
						card.id = "dsh-themed-tooltip-card";
						card.setAttribute("data-testid", "dsh-themed-tooltip");
						card.setAttribute("data-visible", "false");
						card.setAttribute("data-has-cols", "false");
						card.innerHTML = \`
							<div class="dsh-tip-header">
								<span class="dsh-tip-title-wrap">
									<span class="dsh-tip-dot" aria-hidden="true"></span>
									<span class="dsh-tip-title"></span>
								</span>
								<span class="dsh-tip-tag" style="display:none"></span>
							</div>
							<div class="dsh-tip-desc"></div>
							<div class="dsh-tip-cols" style="display:none">
								<div class="dsh-tip-col dsh-tip-col-left">
									<div class="dsh-tip-col-head">Agent</div>
									<div class="dsh-tip-col-list dsh-tip-left-list"></div>
								</div>
								<div class="dsh-tip-col dsh-tip-col-right">
									<div class="dsh-tip-col-head">Bot</div>
									<div class="dsh-tip-col-list dsh-tip-right-list"></div>
								</div>
							</div>
							<div class="dsh-tip-foot" style="display:none"></div>
						\`;
						document.body.appendChild(card);
					}
					return card;
				};

				const stripNativeTitles = (el) => {
					let cur = el;
					while (cur && cur !== document.body && cur.nodeType === 1) {
						const rawTitle = cur.getAttribute("title");
						if (rawTitle) {
							cur.setAttribute("data-dsh-saved-title", rawTitle);
							cur.removeAttribute("title");
						}
						cur = cur.parentElement;
					}
				};

				const resolveTooltipSpec = (rawTarget) => {
					if (!rawTarget || rawTarget.nodeType !== 1) return null;

					// 0. Exclusions:
					// (a) Entire Settings modal/page — never show any hover tooltips inside Settings
					if (rawTarget.closest('[data-shortcut-modal="settings"], .SettingsRoot_panel')) {
						return null;
					}
					// (b) Bottom-left "更多" (More / Account menu) button, footer area, and its secondary popup menu
					if (rawTarget.closest('.yHnPSG_root, .yHnPSG_anchor, .yHnPSG_trigger, .yHnPSG_signedOutMenu, button[aria-label="Account menu"], .hHd-Xa_footArea, .hHd-Xa_footerActions, .hHd-Xa_settingsArea')) {
						return null;
					}
					const enclosingMenu = rawTarget.closest('[role="menu"]');
					if (enclosingMenu && !enclosingMenu.querySelector('.cubgiG_item')) {
						return null;
					}
					const maybeMoreRow = rawTarget.closest('.hHd-Xa_panelRow, [role="treeitem"]');
					if (maybeMoreRow) {
						const rowLabel = (maybeMoreRow.textContent || "").trim();
						if (rowLabel === "更多" || rowLabel.toLowerCase() === "more") {
							return null;
						}
					}

					const explicitEl = rawTarget.closest("[data-dsh-tip],[data-dsh-tip-title],[data-dsh-tip-left],[data-dsh-tip-right]");
					if (explicitEl) {
						const title = (explicitEl.getAttribute("data-dsh-tip-title") || explicitEl.textContent || "").trim();
						const desc = (explicitEl.getAttribute("data-dsh-tip") || "").trim();
						const isMemberTip = explicitEl.getAttribute("data-dsh-tip-member") === "true";
						const tag = isMemberTip ? (explicitEl.getAttribute("data-dsh-tip-tag") || "点击启用 · 来源：群组").trim() : "";
						const leftRaw = (explicitEl.getAttribute("data-dsh-tip-left") || "").trim();
						const rightRaw = (explicitEl.getAttribute("data-dsh-tip-right") || "").trim();
						const leftHead = (explicitEl.getAttribute("data-dsh-tip-left-head") || "Agent").trim();
						const rightHead = (explicitEl.getAttribute("data-dsh-tip-right-head") || "Bot").trim();
						const foot = (explicitEl.getAttribute("data-dsh-tip-foot") || "").trim();
						if (title || desc || leftRaw || rightRaw) {
							return {
								anchor: explicitEl,
								title: title || "功能说明",
								desc: desc || "",
								tag,
								isMemberTip,
								leftHead,
								rightHead,
								leftLines: leftRaw ? leftRaw.split("\\n").filter(Boolean) : [],
								rightLines: rightRaw ? rightRaw.split("\\n").filter(Boolean) : [],
								foot,
								side: "auto"
							};
						}
					}

					// 1. Agent Preset Dropdown Menu Item (.cubgiG_item)
					const presetItem = rawTarget.closest(".cubgiG_item");
					if (presetItem) {
						const titleNode = presetItem.querySelector(".cubgiG_itemTitle");
						const descNode = presetItem.querySelector(".cubgiG_itemDesc");
						const itemTitle = (titleNode ? titleNode.textContent : presetItem.textContent || "").trim();
						const itemDesc = (descNode ? descNode.textContent : "").trim();
						const isChecked = presetItem.getAttribute("aria-checked") === "true";
						const menuEl = presetItem.closest('div[role="menu"]');
						return {
							anchor: presetItem,
							menuAnchor: menuEl,
							title: itemTitle || "预设模式",
							desc: itemDesc ? \`\${itemDesc}\\n点击即可将当前会话切换为「\${itemTitle}」预设工作流。\` : \`点击将当前会话切换为「\${itemTitle}」预设模式。\`,
							tag: isChecked ? "当前已启用" : "点击切换",
							side: "right"
						};
					}

					// 2. Agent Preset Trigger Button (.cubgiG_seat button)
					const presetSeatBtn = rawTarget.closest(".cubgiG_seat button, .cubgiG_trigger");
					if (presetSeatBtn) {
						const curLabel = (presetSeatBtn.textContent || "标准模式").trim();
						return {
							anchor: presetSeatBtn,
							title: \`Agent 预设模式 · \${curLabel}\`,
							desc: "点击展开上下滚动的预设列表，可按任务场景切换标准模式、网页应用开发、学术论文写作、数据可视化分析等专属工作流。",
							tag: "预设模式",
							side: "auto"
						};
					}

					// 3. Group Room Bar Controls & Group Hub Controls
					const groupBtn = rawTarget.closest(".dsh-group-bar-ctrl, .dsh-ghub-btn, .dsh-ghub-mode-btn, .dsh-ghub-room-btn");
					if (groupBtn) {
						const txt = (groupBtn.textContent || "").trim();
						const isActive = groupBtn.getAttribute("data-active") === "true" || groupBtn.getAttribute("aria-pressed") === "true";
						if (txt.includes("自动接力")) {
							return {
								anchor: groupBtn,
								title: "自动接力协同模式 (Auto Relay)",
								desc: "群内消息由主责 Agent 先行响应，并根据任务上下文自动接力流转给下一位专精 Agent 深入处理，适合多阶段复杂研发或攻防任务。",
								tag: isActive ? "当前已启用" : "点击切换",
								side: "auto"
							};
						}
						if (txt.includes("@点名路由")) {
							return {
								anchor: groupBtn,
								title: "@点名精准路由模式 (Smart Mention)",
								desc: "仅被消息中 @handle 明确点名的账户 Agent 或外部群机器人触发响应，避免无关成员刷屏，适合精细化指令调度。",
								tag: isActive ? "当前已启用" : "点击切换",
								side: "auto"
							};
						}
						if (txt.includes("全员会诊")) {
							return {
								anchor: groupBtn,
								title: "全员会诊并发模式 (All Broadcast)",
								desc: "群内所有已启用的跨账户 Agent 同时接收消息并从架构、红队安全、SRE 运维等各自视角独立给出会诊方案。",
								tag: isActive ? "当前已启用" : "点击切换",
								side: "auto"
							};
						}
						if (txt.includes("多 DSH 组队")) {
							return {
								anchor: groupBtn,
								title: "多 DSH 实例跨机联机面板",
								desc: "展开或收起跨 DSH 实例组队控制栏：可一键复制本群邀请码发给队友，或输入队友 DSH 实例地址与邀请码组建跨机协同战队。",
								tag: isActive ? "已展开" : "点击展开",
								side: "auto"
							};
						}
						if (txt.includes("同步消息") || txt.includes("收起同步消息")) {
							return {
								anchor: groupBtn,
								title: "群组实时同步消息流",
								desc: "展开或收起当前群组内跨账户 Agent 与飞书、钉钉、企业微信、Telegram 等外部群机器人的最近实时同步消息记录。",
								tag: isActive ? "已展开" : "点击查看",
								side: "auto"
							};
						}
						if (txt.includes("群设置")) {
							return {
								anchor: groupBtn,
								title: "群组配置中心 (Group Hub)",
								desc: "打开完整群组协同配置中心，管理多账户 Agent 席位、配置外部 IM 群机器人 Webhook 桥接、设置接力跳数上限及调试协同时间轴。",
								tag: "配置中心",
								side: "auto"
							};
						}
					}

					// 4. Browser Task Tabs & New Tab Button
					const browserTabClose = rawTarget.closest(".wSkVaW_browserTabClose");
					if (browserTabClose) {
						return {
							anchor: browserTabClose,
							title: "关闭当前任务标签页",
							desc: "关闭该会话标签页并归档后台活动；若关闭最后一个标签页将自动回到待机主页。",
							tag: "快捷键",
							side: "auto"
						};
					}
					const browserTabAdd = rawTarget.closest(".wSkVaW_browserTabAdd");
					if (browserTabAdd) {
						return {
							anchor: browserTabAdd,
							title: "新建并行任务标签页",
							desc: "在当前工作区立即开启一个全新的独立 DSH 会话标签页，支持多任务并行执行与切换。",
							tag: "新建会话",
							side: "auto"
						};
					}
					const browserTab = rawTarget.closest(".wSkVaW_browserTab");
					if (browserTab) {
						const tabName = (browserTab.textContent || "新任务").trim();
						const isSelected = browserTab.getAttribute("aria-selected") === "true";
						return {
							anchor: browserTab,
							title: \`任务标签页 · \${tabName}\`,
							desc: "单击切换到该会话标签页，双击标签文字可自定义重命名任务标题。",
							tag: isSelected ? "当前标签" : "点击切换",
							side: "auto"
						};
					}

					// 5. Theme Cubes, Mini Slider & Corner Pull Toggle
					const themeCube = rawTarget.closest("._8HJdBW_themeCube");
					if (themeCube) {
						const label = (themeCube.getAttribute("aria-label") || themeCube.getAttribute("data-dsh-saved-title") || themeCube.textContent || "主题切换").trim();
						const isPressed = themeCube.getAttribute("aria-pressed") === "true";
						return {
							anchor: themeCube,
							title: \`界面主题 · \${label}\`,
							desc: label.includes("高级灰")
								? "切换至高级灰 (Preset 1) 液态玻璃/哑光陶瓷双模态主题，支持通过迷你滑块或右上角拉环在深色与浅色间丝滑切换。"
								: label.includes("极简橙")
									? "切换至极简橙 (Preset 2) 柔和拟物与磨砂亚克力浅色主题，配备暖橙色 (#FF6A2B) 激活描边与微光点缀。"
									: \`切换当前界面外观为「\${label}」主题配色方案。\`,
							tag: isPressed ? "当前主题" : "点击切换",
							side: "auto"
						};
					}
					const miniSlider = rawTarget.closest(".dsh_preset1_mini_slider");
					if (miniSlider) {
						return {
							anchor: miniSlider,
							title: "高级灰 · 深浅双模态滑块",
							desc: "点击切换「高级灰」主题的液态玻璃深色模式 (Dark) 与哑光陶瓷浅色模式 (Light)。",
							tag: "双模态",
							side: "auto"
						};
					}
					const cornerCapsule = rawTarget.closest(".dsh_cpt_capsule, .dsh_cpt_groove_bg");
					if (cornerCapsule) {
						return {
							anchor: cornerCapsule,
							title: "高级灰 · 弧形轨道拉环开关",
							desc: "拖拽或点击右上角液态玻璃胶囊拉环，实时联动切换「高级灰」深色液态玻璃与浅色陶瓷工作台。",
							tag: "拖拽/点击",
							side: "auto"
						};
					}

					// 6. Composer Bar Controls (+ attachment, Permission, Plan, SSH, Model selector, Send)
					const sshBtn = rawTarget.closest(".dsh-ssh-trigger");
					if (sshBtn) {
						const sshTxt = (sshBtn.textContent || "SSH").trim();
						return {
							anchor: sshBtn,
							title: \`远程服务器网关 · \${sshTxt}\`,
							desc: "点击打开 SSH 远程服务器连接与监控抽屉，配置主机凭据、查看实时 CPU/内存/磁盘遥测并在远程终端执行命令。",
							tag: "远程网关",
							side: "auto"
						};
					}
					const composerAdd = rawTarget.closest(".uV2eYG_add");
					if (composerAdd) {
						return {
							anchor: composerAdd,
							title: "添加附件与上下文",
							desc: "上传本地文件、代码片段或图片作为当前会话的输入上下文。",
							tag: "附件",
							side: "auto"
						};
					}
					const composerPrimary = rawTarget.closest(".uV2eYG_primary");
					if (composerPrimary) {
						return {
							anchor: composerPrimary,
							title: "发送消息 / 执行指令",
							desc: "将当前输入框中的指令发送给当前会话或协同群组中的 Agent 执行（快捷键 Enter）。",
							tag: "Enter",
							side: "auto"
						};
					}
					const composerModeBtn = rawTarget.closest(".uV2eYG_modes button, .uV2eYG_footer button");
					if (composerModeBtn) {
						const modeTxt = (composerModeBtn.textContent || composerModeBtn.getAttribute("aria-label") || "").trim();
						if (modeTxt.toLowerCase().includes("plan")) {
							return {
								anchor: composerModeBtn,
								title: "Plan 架构规划模式",
								desc: "开启后 Agent 会在动手修改代码或执行命令前先输出结构化实施计划，待确认后再执行。",
								tag: composerModeBtn.getAttribute("aria-pressed") === "true" ? "已开启" : "点击切换",
								side: "auto"
							};
						}
						if (modeTxt) {
							return {
								anchor: composerModeBtn,
								title: \`会话控制 · \${modeTxt}\`,
								desc: \`点击配置或切换当前会话的「\${modeTxt}」执行参数与权限策略。\`,
								tag: "会话参数",
								side: "auto"
							};
						}
					}

					// 7. Left Sidebar Rows & Actions
					const newSessionBtn = rawTarget.closest(".hHd-Xa_newSession");
					if (newSessionBtn) {
						return {
							anchor: newSessionBtn,
							title: "新建任务会话",
							desc: "在默认工作区中创建一个新的对话任务并打开独立标签页。",
							tag: "新建任务",
							side: "auto"
						};
					}
					const panelRow = rawTarget.closest(".hHd-Xa_panelRow, [role='treeitem']");
					if (panelRow) {
						const rowTxt = (panelRow.textContent || "").trim();
						if (rowTxt.includes("Superagent")) {
							return {
								anchor: panelRow,
								title: "Superagent 自主派工与多源值守总控台",
								desc: "全天候监听 GitHub、飞书、钉钉、企微、QQ 等外部事件源，由主 Session 按准入表与接单规则自动研判 (Eval)，将明确请求或高把握候选派发为独立沙箱执行器工单 (Ticket) 闭环交付。",
								tag: "自主总控台",
								side: "right"
							};
						}
						if (rowTxt.includes("插件") || rowTxt.toLowerCase().includes("plugin")) {
							return {
								anchor: panelRow,
								title: "MCP 与扩展插件中心",
								desc: "管理、启用或配置 MCP 工具服务与外部技能插件。",
								tag: "导航面板",
								side: "right"
							};
						}
						if (rowTxt.includes("破甲控制台") || rowTxt.toLowerCase().includes("purge")) {
							return {
								anchor: panelRow,
								title: "破甲控制台 · dsh-purge Community",
								desc: "DeepSeek Harness 本机宿主补丁与红队演练总控台：管理 80 项宿主补丁写入与还原、25 层破甲自检、系统提示词与尾部强化段注入、AGENTS/CLAUDE 规则集切换及授权红队演练台。",
								tag: "破甲总控台",
								side: "right"
							};
						}
						if (rowTxt.includes("红队演练")) {
							return {
								anchor: panelRow,
								title: "红队演练中心 (Red Team Dock)",
								desc: "进入自动化安全渗透测试、漏洞扫描验证与攻防演练工作台。",
								tag: "安全演练",
								side: "right"
							};
						}
						if (rowTxt.includes("群组配置中心")) {
							return {
								anchor: panelRow,
								title: "群组配置中心 (Group Hub)",
								desc: "集中管理跨账户 Agent 列表、多 DSH 联机群组与飞书/钉钉/企微外部机器人桥接。",
								tag: "多Agent协同",
								side: "right"
							};
						}
					}

					// 8. Selected Component 1 Deep Inspection: Superagent (.dt-page)
					const dtRoot = rawTarget.closest(".dt-page");
					if (dtRoot) {
						// 8.1 Header Search Input
						const dtSearch = rawTarget.closest(".dt-search");
						if (dtSearch) {
							return {
								anchor: dtSearch,
								title: "全局检索 · 工单 / 线程 / 触发",
								desc: "支持按关键词、#工单或PR编号、GitHub Issue/PR 链接、飞书 om_ 消息 ID 快速定位对应的工单、对话线程或外部触发事件。",
								tag: "全局检索",
								side: "auto"
							};
						}
						// 8.2 Main Top Navigation Tabs (.dt-tabs .dt-tab)
						const dtTab = rawTarget.closest(".dt-tabs .dt-tab");
						if (dtTab) {
							const tabId = dtTab.id || "";
							const txt = (dtTab.textContent || "").trim();
							const isSelected = dtTab.getAttribute("aria-selected") === "true" || dtTab.classList.contains("is-active");
							const tag = isSelected ? "当前视图" : "点击切换";
							if (tabId.includes("overview") || txt.includes("概览") || txt.includes("Overview")) {
								return {
									anchor: dtTab,
									title: "概览 · 待办工单与 24h 触发漏斗",
									desc: "集中展示当前需人工介入的待回答/待验收/受阻/失败工单、来源与运行时告警、过去 24 小时「到达 → 准入过滤 → 主 Session 研判 → 派工接单」转化漏斗及并发执行器状态。",
									tag,
									side: "auto"
								};
							}
							if (tabId.includes("source") || txt === "来源" || txt === "Source") {
								return {
									anchor: dtTab,
									title: "来源 · 多平台机器人与事件接入监控",
									desc: "实时监控 GitHub、飞书、钉钉、企微、QQ 及通用 Webhook 机器人实例的在线状态，统计各来源过去 24 小时到达触发数、被准入过滤条数及具体拦截原因。",
									tag,
									side: "auto"
								};
							}
							if (tabId.includes("trigger") || txt.includes("触发") || txt.includes("Trigger")) {
								return {
									anchor: dtTab,
									title: "触发 · 外部对话线程与事件流",
									desc: "按外部会话线程 (Thread) 归组查看实时事件流，追踪每条消息是否触发扇出 (Fan-out) 唤醒关联工单、是否进入主 Session 评估队列以及最终研判结论。",
									tag,
									side: "auto"
								};
							}
							if (tabId.includes("eval") || txt.includes("评估") || txt.includes("Eval")) {
								return {
									anchor: dtTab,
									title: "评估 · 主 Session 研判决策审计",
									desc: "按当前策略版本审计主 Session 对外部触发做出的「接单与续做 / 停止 / 忽略 / 未完成」研判记录，查看命中的接单规则、授权校验与方向性证据。",
									tag,
									side: "auto"
								};
							}
							if (tabId.includes("execution") || txt.includes("执行") || txt.includes("Execution")) {
								return {
									anchor: dtTab,
									title: "执行 · 独立沙箱执行器与工单队列",
									desc: "管理所有由主 Session 派发的工单 (Ticket)，实时监控并发执行器槽位占用，按「待处理 / 执行中 / 等待新触发 / 已结束」追踪任务进度、交付物与关联线程。",
									tag,
									side: "auto"
								};
							}
							if (tabId.includes("settings") || txt.includes("设置") || txt.includes("Settings")) {
								return {
									anchor: dtTab,
									title: "设置 · 来源桥接 / MCP / 评估与提示词策略",
									desc: "配置多账号 IM 与代码仓机器人接入、MCP 工具与桌面 GUI 操控引擎、准入与自动接单规则、工单独立沙箱目录、系统提示词分段模板及本机部署参数。",
									tag,
									side: "auto"
								};
							}
						}
						// 8.3 Settings Left Sub-Navigation (.dt-settings-nav .dt-settings-link)
						const dtSettingsLink = rawTarget.closest(".dt-settings-nav .dt-settings-link");
						if (dtSettingsLink) {
							const txt = (dtSettingsLink.textContent || "").trim();
							const isActive = dtSettingsLink.classList.contains("is-active");
							const tag = isActive ? "当前配置项" : "点击切换";
							if (txt.includes("来源") || txt.includes("Sources")) {
								return {
									anchor: dtSettingsLink,
									title: "来源接入配置 · 多账号机器人与监听范围",
									desc: "一站式添加和管理钉钉、GitHub、飞书、企业微信、QQ 机器人及自定义 Webhook 实例，或配置底层 gh / lark-cli 仓库轮询、群聊监听范围与发件人白名单。",
									tag,
									side: "right"
								};
							}
							if (txt.includes("MCP") || txt.includes("GUI")) {
								return {
									anchor: dtSettingsLink,
									title: "MCP 服务与桌面 GUI 操控引擎",
									desc: "管理 Windows-MCP、Playwright 浏览器自动化、本地 stdio 及远程 HTTP MCP 工具服务，切换桌面视觉操控引擎（Windows-MCP / PowerShell UIA）并配置高危操作确认保护。",
									tag,
									side: "right"
								};
							}
							if (txt.includes("评估") || txt.includes("Eval")) {
								return {
									anchor: dtSettingsLink,
									title: "评估策略 · 准入分级与接单规则",
									desc: "设定推断候选的接单模式（关闭 / 仅观察 / 自动接单），编写自然语言接单规则，配置各来源范围的准入级别（明确请求 / 推断候选 / 忽略）以及主 Session 研判模型与超时。",
									tag,
									side: "right"
								};
							}
							if (txt.includes("执行") || txt.includes("Execution")) {
								return {
									anchor: dtSettingsLink,
									title: "执行策略 · 并发槽位与独立沙箱目录",
									desc: "配置最大并行执行工单数、每个工单的独立工作目录根路径、新建工单前的 sh 准备脚本（如 git worktree 检出）、禁止调用的高危命令黑名单及执行器默认模型。",
									tag,
									side: "right"
								};
							}
							if (txt.includes("提示词") || txt.includes("Prompts")) {
								return {
									anchor: dtSettingsLink,
									title: "提示词管理 · 主控与执行器分段模板",
									desc: "编辑主 Session 与执行器 Session 的可写提示词分段（沟通方式、工单范围、交付要求、自定义技能），支持预览完整拼接提示词、与默认模板对比差异及按历史版本回滚。",
									tag,
									side: "right"
								};
							}
							if (txt.includes("部署") || txt.includes("Deployment")) {
								return {
									anchor: dtSettingsLink,
									title: "本机部署与上下文读取限制",
									desc: "查看派生仓库、智能体身份与本机状态存储目录，配置提示词最大字符数、单次研判可读线程页数及上下文拉取超时上限。",
									tag,
									side: "right"
								};
							}
						}
						// 8.4 Overview 24h Funnel Stat Cells (.dt-overview-stat-btn)
						const dtStatBtn = rawTarget.closest(".dt-overview-stat-btn");
						if (dtStatBtn) {
							const statTxt = (dtStatBtn.textContent || "").trim();
							if (statTxt.includes("到达") || statTxt.includes("Arrived")) {
								return {
									anchor: dtStatBtn,
									title: "24 小时到达触发总数",
									desc: "过去 24 小时从所有已开启来源（GitHub / 飞书 / 钉钉等）接收到的外部事件总数。点击可跳转至「触发」页按线程查看明细。",
									tag: "点击跳转",
									side: "auto"
								};
							}
							if (statTxt.includes("过滤") || statTxt.includes("Filtered")) {
								return {
									anchor: dtStatBtn,
									title: "24 小时被准入规则过滤触发数",
									desc: "因未命中监听范围、发件人不在白名单或准入级别设为「忽略」而在进入主 Session 前被直接拦截的事件数。点击可查看各来源过滤原因。",
									tag: "点击跳转",
									side: "auto"
								};
							}
							if (statTxt.includes("已评估") || statTxt.includes("Evaluated")) {
								return {
									anchor: dtStatBtn,
									title: "24 小时主 Session 已研判次数",
									desc: "通过准入校验并由主 Session 完成意图与规则研判的触发总数。点击可跳转至「评估」页查看每条决定的方向证据。",
									tag: "点击跳转",
									side: "auto"
								};
							}
							if (statTxt.includes("接单") || statTxt.includes("Accepted")) {
								return {
									anchor: dtStatBtn,
									title: "24 小时接单并派工数",
									desc: "主 Session 判定需要接手处理并成功新建工单 (Ticket) 或唤醒已有工单续做的次数。点击可查看对应的评估决策列表。",
									tag: "点击跳转",
									side: "auto"
								};
							}
						}
						// 8.5 Interactive Buttons, Pills & Controls inside Superagent (.dt-page)
						const dtCtrl = rawTarget.closest("button, summary, select, label.dt-switch");
						if (dtCtrl) {
							stripNativeTitles(dtCtrl);
							const aria = (dtCtrl.getAttribute("aria-label") || dtCtrl.getAttribute("data-dsh-saved-title") || "").trim();
							const txt = (dtCtrl.textContent || "").trim().replace(/\\s+/g, " ");
							const label = aria || txt;
							if (dtCtrl.classList.contains("dt-glossary-btn") || label.includes("术语表") || label.includes("Glossary")) {
								return {
									anchor: dtCtrl,
									title: "Superagent 概念术语表与状态图例",
									desc: "打开中英术语对照表与状态指示灯图例，详细查阅来源、触发、线程、准入、研判、授权、工单、派工与扇出 (Fan-out) 的工作流定义。",
									tag: "概念参考",
									side: "auto"
								};
							}
							if (label.includes("打开主 Session") || label.includes("Open main Session")) {
								return {
									anchor: dtCtrl,
									title: "打开主控 Orchestrator 会话",
									desc: "在工作区标签页中直接打开负责全局触发研判 (Eval)、跨线程上下文核查与工单派工调度的主 Session 对话流。",
									tag: "主控会话",
									side: "auto"
								};
							}
							if (label.includes("暂停处理") || label.includes("Pause")) {
								return {
									anchor: dtCtrl,
									title: "暂停该工单自动执行",
									desc: "暂停当前工单的执行器调度与新触发自动续做，保留现有工作目录与上下文，直到手动点击「恢复处理」。",
									tag: "工单控制",
									side: "auto"
								};
							}
							if (label.includes("恢复处理") || label.includes("Resume")) {
								return {
									anchor: dtCtrl,
									title: "恢复该工单自动执行",
									desc: "解除工单暂停状态，允许执行器继续处理待办步骤并响应关联线程的新外部触发。",
									tag: "工单控制",
									side: "auto"
								};
							}
							if (label === "重试" || label === "Retry") {
								return {
									anchor: dtCtrl,
									title: "重新派工执行",
									desc: "针对失败、受阻或未完成的任务重新唤醒执行器或重新发起主 Session 研判。",
									tag: "重试任务",
									side: "auto"
								};
							}
							if (label === "停止" || label === "Stop") {
								return {
									anchor: dtCtrl,
									title: "终止当前执行器运行",
									desc: "立即向正在运行该工单的执行器 Session 发送中断信号，停止当前轮次的工具调用与代码执行。",
									tag: "立即停止",
									side: "auto"
								};
							}
							if (label.includes("重新评估") || label.includes("Re-evaluate")) {
								return {
									anchor: dtCtrl,
									title: "触发主 Session 重新研判",
									desc: "将该外部对话线程的最新消息重新送入主 Session 按当前评估规则再做一次接单研判。",
									tag: "手动研判",
									side: "auto"
								};
							}
							if (label.includes("取消订阅") || label.includes("Unsubscribe")) {
								return {
									anchor: dtCtrl,
									title: "取消线程自动订阅",
									desc: "退订该外部对话线程；后续普通回复将不再按已订阅线程自动旁路准入，仅在再次命中明确请求时触发。",
									tag: "订阅管理",
									side: "auto"
								};
							}
							// Trigger thread filter pills
							if (txt.startsWith("已被订阅") || txt.startsWith("Subscribed")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 已被工单订阅的活跃线程",
									desc: "仅显示当前已被智能体参与或绑定了工单的外部线程；此类线程的新消息会通过扇出 (Fan-out) 直接唤醒关联工单。",
									tag: "线程筛选",
									side: "auto"
								};
							}
							if (txt.startsWith("评估中") || txt.startsWith("Evaluating")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 正在排队或主 Session 研判中的线程",
									desc: "仅显示刚通过准入校验、正在等待或正在由主 Session 执行接单研判的外部对话线程。",
									tag: "线程筛选",
									side: "auto"
								};
							}
							if (txt.startsWith("24 小时内有新触发") || txt.startsWith("Active in 24h")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 过去 24 小时有新消息的线程",
									desc: "显示过去 24 小时内收到过外部触发事件的全部对话线程。",
									tag: "线程筛选",
									side: "auto"
								};
							}
							if (txt.startsWith("全部线程") || txt.startsWith("All threads")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 历史全部外部线程",
									desc: "显示本地状态库中记录的所有外部对话线程（包含已归档或超过 24 小时无活动的线程）。",
									tag: "线程筛选",
									side: "auto"
								};
							}
							// Eval decision filter pills
							if (txt.startsWith("接单与续做") || txt.startsWith("Accepted")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 研判结论为「接单与续做」",
									desc: "仅查看主 Session 判定应当接手并成功新建工单或追加到既有工单续做的评估记录。",
									tag: "决策筛选",
									side: "auto"
								};
							}
							if (txt.startsWith("忽略") || txt.startsWith("Ignored")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 研判结论为「忽略」",
									desc: "仅查看主 Session 研判后认定无需智能体介入（如纯闲聊、他人讨论或未命中接单规则）而静默跳过的记录。",
									tag: "决策筛选",
									side: "auto"
								};
							}
							if (txt.startsWith("未完成") || txt.startsWith("Incomplete")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 研判超时或未完成记录",
									desc: "查看因主 Session 研判超时、模型调用异常或未输出有效工具决策而中断的评估记录，支持一键重试。",
									tag: "决策筛选",
									side: "auto"
								};
							}
							// Execution ticket filter pills
							if (txt.startsWith("进行中") || txt.startsWith("Active")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 全部未完结工单",
									desc: "汇总显示当前所有处于执行中、排队中、等待新触发或需人工介入的活跃工单。",
									tag: "工单筛选",
									side: "auto"
								};
							}
							if (txt.startsWith("待处理") || txt.startsWith("Needs attention")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 需人工介入的待处理工单",
									desc: "仅显示处于「待回答 (Waiting Answer)」「待验收 (Waiting Review)」「受阻 (Blocked)」或「失败 (Failed)」状态的工单。",
									tag: "优先处理",
									side: "auto"
								};
							}
							if (txt.startsWith("执行中") || txt.startsWith("Running")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 正在占用执行器运行的工单",
									desc: "仅显示当前正在独立沙箱 Session 中执行代码、调用工具或排队等待执行器槽位的工单。",
									tag: "工单筛选",
									side: "auto"
								};
							}
							if (txt.startsWith("等待新触发") || txt.startsWith("Waiting")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 等待外部后续回复的工单",
									desc: "显示阶段性工作已交付、正在挂起等待外部协作者在关联线程中进一步回复或评论的工单。",
									tag: "工单筛选",
									side: "auto"
								};
							}
							if (txt.startsWith("已结束") || txt.startsWith("Closed")) {
								return {
									anchor: dtCtrl,
									title: "筛选 · 已完成或已取消工单",
									desc: "查看已经闭环交付完成 (Done) 或被取消归档的历史工单记录。",
									tag: "工单筛选",
									side: "auto"
								};
							}
							// BotConnectorHub controls
							if (txt.includes("新增钉钉") || txt.includes("新增 GitHub") || txt.includes("新增飞书") || txt.includes("新增企业微信") || txt.includes("新增 QQ") || txt.includes("添加自定义产品机器人") || txt.includes("再加一个同平台账号")) {
								return {
									anchor: dtCtrl,
									title: \`添加多账号机器人实例 · \${txt.replace(/^\\+\\s*/, "")}\`,
									desc: "在当前工作台新增一个独立凭证、独立 Webhook/轮询地址与专属路由规则的机器人账号实例，支持同平台多账号并行在线。",
									tag: "新增实例",
									side: "auto"
								};
							}
							if (txt.includes("保存连接配置")) {
								return {
									anchor: dtCtrl,
									title: "保存并热重载多账号机器人配置",
									desc: "将当前所有平台机器人实例的凭据、监听范围与启用状态持久化保存到服务端并立即生效。",
									tag: "持久化保存",
									side: "auto"
								};
							}
							if (txt.includes("发送测试消息")) {
								return {
									anchor: dtCtrl,
									title: "向该机器人实例发送连通性测试消息",
									desc: "通过服务端接口向该机器人的目标会话或 Webhook 发送一条真实探活消息，验证凭据与网络签名是否正确。",
									tag: "连通性测试",
									side: "auto"
								};
							}
							if (txt.includes("删除实例")) {
								return {
									anchor: dtCtrl,
									title: "移除该机器人账号实例",
									desc: "从多账号接入列表中删除当前机器人实例配置，删除后请点击右上角「保存连接配置」落盘。",
									tag: "移除实例",
									side: "auto"
								};
							}
							// MCP & Desktop GUI panel controls
							if (txt.includes("Windows-MCP 视觉桌面引擎")) {
								return {
									anchor: dtCtrl,
									title: "切换为 Windows-MCP 视觉桌面操控引擎",
									desc: "优先通过 Windows-MCP 提供的无障碍树快照、坐标点击、键盘输入与窗口切换工具直接操控本机桌面 GUI 应用。",
									tag: "桌面引擎",
									side: "auto"
								};
							}
							if (txt.includes("PowerShell / Win32 UIA 原生引擎")) {
								return {
									anchor: dtCtrl,
									title: "切换为 PowerShell / Win32 UIA 原生操控引擎",
									desc: "使用内置 PowerShell 与 .NET UIAutomation 脚本执行桌面窗口枚举、截图与键鼠模拟，无需额外安装 Python MCP 依赖。",
									tag: "桌面引擎",
									side: "auto"
								};
							}
							if (txt.includes("安装预设") || txt.includes("添加并启用")) {
								return {
									anchor: dtCtrl,
									title: "一键安装并启用 MCP 服务",
									desc: "将该 MCP 工具服务写入宿主配置并立即挂载，使主 Session 与执行器 Session 可直接调用其暴露的工具集。",
									tag: "安装 MCP",
									side: "auto"
								};
							}
							if (txt.includes("保存桌面操控配置")) {
								return {
									anchor: dtCtrl,
									title: "保存桌面 GUI 引擎与安全保护策略",
									desc: "保存当前所选的桌面操控引擎、执行动作前自动截屏核验开关以及涉及系统设置/支付/删除操作前的人工确认策略。",
									tag: "保存配置",
									side: "auto"
								};
							}
							// Eval settings controls
							if (txt === "关闭" || txt === "Off") {
								return {
									anchor: dtCtrl,
									title: "推断候选模式 · 关闭",
									desc: "主 Session 仅研判明确 @智能体 或点名触发的请求；未点名的普通群聊或讨论（推断候选）将直接跳过，不消耗主 Session 研判。",
									tag: "接单模式",
									side: "auto"
								};
							}
							if (txt === "仅观察" || txt === "Observe") {
								return {
									anchor: dtCtrl,
									title: "推断候选模式 · 仅观察（影子研判）",
									desc: "主 Session 会对推断候选正常执行接单规则研判并记录在「评估」页供审计，但即便命中规则也不会实际派工建单，适合新规则上线前试运行。",
									tag: "接单模式",
									side: "auto"
								};
							}
							if (txt === "自动接单" || txt === "Auto-accept") {
								return {
									anchor: dtCtrl,
									title: "推断候选模式 · 自动接单",
									desc: "即使外部消息未明确 @智能体，只要命中已开启的接单规则且主 Session 研判把握充分，即自动创建工单并派发执行器处理。",
									tag: "接单模式",
									side: "auto"
								};
							}
							if (txt.includes("添加规则") || txt.includes("Add rule")) {
								return {
									anchor: dtCtrl,
									title: "新增自然语言接单规则",
									desc: "添加一条供主 Session 研判推断候选时对照的自然语言条件规则（如「当有人在群里反馈线上报错且附带堆栈时自动接单排查」）。",
									tag: "新增规则",
									side: "auto"
								};
							}
							// Prompts settings controls
							if (txt === "编辑" || txt === "Edit") {
								return {
									anchor: dtCtrl,
									title: "提示词分段编辑视图",
									desc: "按模块分段编辑沟通方式、工单范围、交付要求与自定义技能，并可展开查看宿主内置的只读运行时规则。",
									tag: "提示词视图",
									side: "auto"
								};
							}
							if (txt.includes("完整提示词") || txt.includes("Full prompt")) {
								return {
									anchor: dtCtrl,
									title: "完整系统提示词拼接预览",
									desc: "预览将内置运行时规则与您自定义的可写分段完整拼接后的最终系统提示词全文，支持与已保存版本或默认模板对比差异。",
									tag: "提示词视图",
									side: "auto"
								};
							}
							if (txt === "历史" || txt === "History") {
								return {
									anchor: dtCtrl,
									title: "提示词版本历史与回滚",
									desc: "查看每次保存提示词生成的版本快照、各分段修改摘要与字数统计，支持将当前编辑稿与任意历史版本对比或一键还原。",
									tag: "版本历史",
									side: "auto"
								};
							}
							if (txt.includes("恢复此段默认内容") || txt.includes("Reset to default")) {
								return {
									anchor: dtCtrl,
									title: "恢复该分段为官方默认模板",
									desc: "将当前提示词分段内容重置为 Superagent 内置出厂模板（需点击右上角「保存」才会正式写入生效）。",
									tag: "重置分段",
									side: "auto"
								};
							}
							if (txt.includes("添加自定义技能") || txt.includes("Add custom skill")) {
								return {
									anchor: dtCtrl,
									title: "新增执行器自定义技能分段",
									desc: "为执行器 Session 增加一段专属技能指导（如特定代码库规范、内部发布流程或固定排障手册），随工单上下文一并注入。",
									tag: "新增技能",
									side: "auto"
								};
							}
						}
					}

					// 9. Selected Component 2 Deep Inspection: 破甲控制台 (.dshpp-page, .dshpp-root, .rt-dock, .rt-full)
					const purgeRoot = rawTarget.closest(".dshpp-page, .dshpp-root, .rt-dock, .rt-full");
					if (purgeRoot) {
						// 9.1 Top / Native Navigation Tabs (.dshpp-page-tabs button, .dshpp-native-nav button)
						const purgeTab = rawTarget.closest(".dshpp-page-tabs button, .dshpp-native-nav button");
						if (purgeTab) {
							const txt = (purgeTab.textContent || "").trim();
							const isSelected = purgeTab.getAttribute("aria-selected") === "true" || purgeTab.getAttribute("aria-pressed") === "true" || purgeTab.classList.contains("is-on");
							const tag = isSelected ? "当前页签" : "点击切换";
							if (txt === "状态") {
								return {
									anchor: purgeTab,
									title: "状态 · 宿主补丁、25 层自检与版本维护",
									desc: "查看当前 DSH 宿主兼容级别与磁盘补丁写入进度，一键应用或还原 80 项宿主补丁，运行 25 层破甲自检与一次性回显探针，并管理版本通道切换与本机快照回滚。",
									tag,
									side: "auto"
								};
							}
							if (txt === "提示词") {
								return {
									anchor: purgeTab,
									title: "提示词 · 系统级覆盖注入正文",
									desc: "编辑并持久化写入宿主系统提示词槽位的核心注入正文；支持一键恢复插件内置默认破甲提示词，配合状态页的「破甲强化段」在多轮长对话中保持强指令优先级。",
									tag,
									side: "auto"
								};
							}
							if (txt === "规则") {
								return {
									anchor: purgeTab,
									title: "规则 · 全局指令库与工作区策略",
									desc: "管理多套 AGENTS.md / CLAUDE.md 全局指令规则集并一键切换激活；配置工作区策略（严格剥离本地规则 / 提示词为空时兜底 / 总是允许）及勾选当前项目的本地规则文件。",
									tag,
									side: "auto"
								};
							}
							if (txt === "技能") {
								return {
									anchor: purgeTab,
									title: "技能 · 官方 $DSH_HOME/skills 目录管理",
									desc: "导入压缩包或文件夹格式的 Skill 扩展包至宿主官方目录，在线编辑 SKILL.md 的触发描述 (description) 与指令正文，供聊天输入 /名称 或模型按任务自动调用。",
									tag,
									side: "auto"
								};
							}
							if (txt === "演练台") {
								return {
									anchor: purgeTab,
									title: "演练台 · 授权红队攻防与资产测绘工作台",
									desc: "进入本机授权红队演练工作台，按演练靶标统一管理资产测绘、本机安全工具环境适配 (Kali / Toolkit)、子智能体、会话隧道、漏洞战果、攻击链、得分目标与渗透报告。",
									tag,
									side: "auto"
								};
							}
							if (txt === "更多") {
								return {
									anchor: purgeTab,
									title: "更多 · 自有服务器白名单与演练入口",
									desc: "维护受控自有服务器 IP / 账号@主机名白名单（解析后连同解析地址自动放行，避免误拦授权运维或靶机操作），并提供红队演练台快捷入口。",
									tag,
									side: "auto"
								};
							}
						}

						// 9.2 Red Team Drill Console Tabs (.rt-tabs .rt-tab)
						const rtTab = rawTarget.closest(".rt-tabs .rt-tab");
						if (rtTab) {
							const txt = (rtTab.textContent || "").trim();
							const isSelected = rtTab.getAttribute("aria-selected") === "true" || rtTab.classList.contains("on");
							const tag = isSelected ? "当前模块" : "红队模块";
							if (txt.includes("资产测绘")) {
								return {
									anchor: rtTab,
									title: "资产测绘 · C段、存活主机、端口与指纹",
									desc: "管理当前演练靶标下的网段、存活资产、开放端口与服务指纹树，追踪被动测绘与主动探测信号并一键下发侦察任务。",
									tag,
									side: "auto"
								};
							}
							if (txt.includes("环境适配")) {
								return {
									anchor: rtTab,
									title: "环境适配 · 本机渗透工具链与出网代理",
									desc: "配置或自动分配 nmap、nuclei、fscan、sqlmap 等本机安全工具路径，设置 FOFA_KEY / VPS 凭据并检查当前进程出网代理状态。",
									tag,
									side: "auto"
								};
							}
							if (txt.includes("智能体")) {
								return {
									anchor: rtTab,
									title: "智能体 · 红队专精角色与分工调度",
									desc: "查看与配置负责外网打点、Web 漏洞利用、内网横向移动、权限维持等不同攻防阶段的红队智能体角色及其专属提示词。",
									tag,
									side: "auto"
								};
							}
							if (txt.includes("会话隧道")) {
								return {
									anchor: rtTab,
									title: "会话隧道 · 反弹 Shell 与内网代理通道",
									desc: "集中监控演练过程中建立的反弹 Shell、WebShell、SSH 隧道与 SOCKS 代理跳板状态，记录凭据与跳板拓扑。",
									tag,
									side: "auto"
								};
							}
							if (txt.includes("漏洞战果")) {
								return {
									anchor: rtTab,
									title: "漏洞战果 · 已验证漏洞与战果凭据库",
									desc: "汇总演练中确认的高危漏洞、PoC/Exp 复现证据、获取到的账号密码、API 密钥与敏感样本文件。",
									tag,
									side: "auto"
								};
							}
							if (txt.includes("攻击链")) {
								return {
									anchor: rtTab,
									title: "攻击链 · 从外网入口到核心靶标路径图",
									desc: "按时间与因果顺序梳理「资产暴露面 → 初始突破 → 权限提升 → 内网横向 → 核心靶标控制」的完整杀伤链节点。",
									tag,
									side: "auto"
								};
							}
							if (txt.includes("得分目标")) {
								return {
									anchor: rtTab,
									title: "得分目标 · 攻防演练计分板与证据截图",
									desc: "对照《突破入侵类得分规则》自动核算当前演练总分、各项上限占用、同资产同端口封顶去重及证据截图，支持自定义新增得分点。",
									tag,
									side: "auto"
								};
							}
							if (txt.includes("报告")) {
								return {
									anchor: rtTab,
									title: "报告 · 自动化红队演练报告生成",
									desc: "基于已记录的漏洞战果、攻击链、得分命中与证据截图，一键汇编结构化攻防演练复盘报告。",
									tag,
									side: "auto"
								};
							}
							if (txt.includes("知识库")) {
								return {
									anchor: rtTab,
									title: "知识库 · 漏洞利用手法与内网武器库检索",
									desc: "检索内置与自定义的常见中间件漏洞、域渗透手法、免杀绕过与提权备忘录，供智能体在演练中实时参考。",
									tag,
									side: "auto"
								};
							}
							if (txt.includes("技能库")) {
								return {
									anchor: rtTab,
									title: "技能库 · 红队自动化工具调用技能集",
									desc: "查看并管理演练台内置的扫描、爆破、漏洞验证与后渗透自动化 Skill 模块及其工具依赖状态。",
									tag,
									side: "auto"
								};
							}
						}

						// 9.3 Status Strip Items (.dshpp-strip-item)
						const stripItem = rawTarget.closest(".dshpp-strip-item");
						if (stripItem && !rawTarget.closest(".dshpp-help")) {
							const sTxt = (stripItem.textContent || "").trim().replace(/\\s+/g, " ");
							if (sTxt.startsWith("DSH")) {
								return {
									anchor: stripItem,
									title: \`宿主客户端版本 · \${sTxt}\`,
									desc: "当前连接的 DeepSeek Harness 宿主内核版本号，决定适用哪些宿主补丁锚点。",
									tag: "宿主内核",
									side: "auto"
								};
							}
							if (sTxt.includes("兼容级别")) {
								return {
									anchor: stripItem,
									title: "宿主版本兼容级别校验",
									desc: "读取宿主各组件版本并核对补丁锚点：「已回归验证 (qualified)」代表全部适用补丁锚点均已逐条回归通过。",
									tag: "兼容校验",
									side: "auto"
								};
							}
							if (sTxt.includes("磁盘写入计数")) {
								return {
									anchor: stripItem,
									title: "宿主磁盘补丁写入进度",
									desc: "显示实际写进本机 DSH 宿主代码的补丁条数 / 本机适用总条数（自动排除当前系统或未安装插件不需要的补丁项）。",
									tag: "补丁计数",
									side: "auto"
								};
							}
							if (sTxt.startsWith("插件")) {
								return {
									anchor: stripItem,
									title: \`当前运行插件版本 · \${sTxt}\`,
									desc: "当前加载的 dsh-purge Community 社区版插件版本号。",
									tag: "插件版本",
									side: "auto"
								};
							}
						}

						// 9.4 Individual 25-Layer Self-Check Items (.dshpp-check)
						const checkRow = rawTarget.closest(".dshpp-check");
						if (checkRow) {
							const nameNode = checkRow.querySelector(".dshpp-check-name");
							const valNode = checkRow.querySelector(".dshpp-check-val");
							const cName = (nameNode ? nameNode.textContent : checkRow.textContent || "").trim();
							const cVal = (valNode ? valNode.textContent : "").trim();
							return {
								anchor: checkRow,
								title: \`破甲自检层 · \${cName}\`,
								desc: \`当前状态：\${cVal || "已检测"}。核验该防护层关联的宿主补丁锚点是否已完整写入磁盘并解除对应限制。\`,
								tag: cVal || "自检层",
								side: "auto"
							};
						}

						// 9.5 Buttons, Fold Summaries, Selects & Checkboxes inside dsh-purge
						const purgeCtrl = rawTarget.closest("button, summary, select, label, a");
						if (purgeCtrl) {
							stripNativeTitles(purgeCtrl);
							const aria = (purgeCtrl.getAttribute("aria-label") || purgeCtrl.getAttribute("data-dsh-saved-title") || "").trim();
							const txt = (purgeCtrl.textContent || "").trim().replace(/\\s+/g, " ");
							const label = aria || txt;

							if (purgeCtrl.classList.contains("dshpp-btn-lead") || txt === "应用" || txt === "处理中…") {
								return {
									anchor: purgeCtrl,
									title: "一键应用宿主补丁与系统提示词",
									desc: "将全部适用本机 DSH 版本的破甲补丁（免责改强指令、沙箱/审批自动放行、解除文件系统围栏与重复调用守卫等）写入宿主磁盘，并挂载当前系统提示词。",
									tag: "写入宿主",
									side: "auto"
								};
							}
							if (txt === "还原") {
								const inRules = Boolean(purgeCtrl.closest('[aria-label="规则集"]'));
								return {
									anchor: purgeCtrl,
									title: inRules ? "还原全局指令文件 (AGENTS.md / CLAUDE.md)" : "还原宿主至官方未打补丁状态",
									desc: inRules
										? "清空当前写入全局指令文件的激活规则内容并恢复初始状态（您创建的规则库列表本身会完整保留）。"
										: "使用本机备份 (.bak) 将已修改的 DSH 宿主文件恢复为官方原版代码，移除破甲补丁改动（保留已保存的提示词与规则集）。",
									tag: inRules ? "重置指令" : "恢复原版",
									side: "auto"
								};
							}
							if (txt === "卸载" || txt === "卸载中…") {
								return {
									anchor: purgeCtrl,
									title: "卸载 dsh-purge 并还原宿主原版",
									desc: "完整还原 DSH 宿主全部原版文件，并彻底清除本插件的文件、配置与补丁入口，完成后自动重启客户端。",
									tag: "高危操作",
									side: "auto"
								};
							}
							if (txt === "查看逐层") {
								return {
									anchor: purgeCtrl,
									title: "展开 / 收起 25 层破甲自检明细",
									desc: "逐层查看身份层、审批门、沙箱围栏、工具修剪、Hooks 放行等 25 个破甲防护层的实时就位状态与关联补丁编号。",
									tag: "逐层诊断",
									side: "auto"
								};
							}
							if (txt === "重测") {
								return {
									anchor: purgeCtrl,
									title: "重新执行 25 层破甲自检",
									desc: "立即重新扫描宿主磁盘文件与运行时状态，核验全部 25 层破甲补丁是否完整就位。",
									tag: "立即自检",
									side: "auto"
								};
							}
							if (txt === "探针") {
								return {
									anchor: purgeCtrl,
									title: "生成一次性系统提示词回显探针",
									desc: "在系统提示词中埋入一次性随机探针标记；发送下一轮对话时观察模型是否原样回显该标记，以真实验证注入链路在当前会话中是否生效。",
									tag: "真机验证",
									side: "auto"
								};
							}
							if ((txt === "开启" || txt === "关闭") && purgeCtrl.closest('[aria-label="破甲状态"]')) {
								return {
									anchor: purgeCtrl,
									title: \`破甲强化段 (Boost) · 点击\${txt}\`,
									desc: "在系统提示词末尾追加同级强指令段（层级声明 / 拒绝即故障 / 抗谄媚 / 多轮重申），防止模型在长上下文或多轮工具调用后退化推脱；修改后重启生效。",
									tag: "尾部强化",
									side: "auto"
								};
							}
							if (txt.startsWith("版本管理")) {
								return {
									anchor: purgeCtrl,
									title: "展开 / 收起插件版本与通道管理",
									desc: "在正式版 (Stable) 与测试版 (Beta) 通道间切换，或从下拉列表中选择指定历史版本进行固定与升降级。",
									tag: "版本通道",
									side: "auto"
								};
							}
							if (txt.startsWith("补丁明细")) {
								return {
									anchor: purgeCtrl,
									title: "展开 / 收起 80 项宿主补丁分组明细表",
									desc: "按「提示词 / 代码 / 工具 / 0.1.5 兼容 / 0.2.0 兼容」五大分组查看每一项补丁的编号、改造点说明与当前应用状态。",
									tag: "补丁清单",
									side: "auto"
								};
							}
							if (purgeCtrl.classList.contains("dshpp-group-h")) {
								return {
									anchor: purgeCtrl,
									title: \`补丁分组 · \${txt}\`,
									desc: "点击展开或收起该架构层级的宿主补丁表格，逐条查看补丁 ID、作用描述与磁盘写入状态。",
									tag: "点击展开",
									side: "auto"
								};
							}
							if (txt.startsWith("高级选项")) {
								return {
									anchor: purgeCtrl,
									title: "展开 / 收起 Hooks 拦截放行高级选项",
									desc: "配置是否自动旁路 PreToolUse / UserPromptSubmit / Stop hook 的 deny 与 ask 拦截逻辑（关联补丁 #30 / #31 / #64 / #65）。",
									tag: "高级策略",
									side: "auto"
								};
							}
							if (txt.includes("放行 hooks 的 deny / ask")) {
								return {
									anchor: purgeCtrl,
									title: "放行 Hooks 的 deny / ask 拦截",
									desc: "勾选时自动放行所有 Hook 拒绝分支；取消勾选后，您自定义的 PreToolUse / UserPromptSubmit / Stop hook 的 deny 将按官方逻辑生效（改完需点「应用」并重启）。",
									tag: "Hooks 开关",
									side: "auto"
								};
							}
							if (label.includes("自动检查更新")) {
								return {
									anchor: purgeCtrl,
									title: "启动后定时自动检查社区版更新",
									desc: "开启后在启动 30 秒后及后续按设定小时数自动向仓库检查新版本；关闭后会同时暂停自动安装。",
									tag: "更新策略",
									side: "auto"
								};
							}
							if (label.includes("更新检查间隔")) {
								return {
									anchor: purgeCtrl,
									title: "设置后台自动检查更新的小时间隔",
									desc: "选择每隔 1 / 6 / 12 / 24 小时在后台轮询一次社区版最新发行包。",
									tag: "轮询间隔",
									side: "auto"
								};
							}
							if (label.includes("自动安装更新")) {
								return {
									anchor: purgeCtrl,
									title: "发现新正式版时自动备份并静默安装",
									desc: "仅在自动检查开启且未固定历史版本时生效：安装前自动创建本机备份并校验发行包签名，安装完成后等待您手动重启 DSH。",
									tag: "更新策略",
									side: "auto"
								};
							}
							if (txt === "检查社区版更新" || txt === "检测更新") {
								return {
									anchor: purgeCtrl,
									title: "立即查询远端仓库最新发行版",
									desc: "连接社区版发布源获取可用版本列表，对比当前本机版本号并判断是否可一键升级。",
									tag: "在线检查",
									side: "auto"
								};
							}
							if (txt === "最近动作") {
								return {
									anchor: purgeCtrl,
									title: "查看最近 10 条本机维护审计日志",
									desc: "读取 /dsh-purge/audit 接口，展示最近执行的补丁应用、备份创建、版本更新与回滚操作时间戳及结果详情。",
									tag: "审计记录",
									side: "auto"
								};
							}
							if (txt === "发行记录") {
								return {
									anchor: purgeCtrl,
									title: "在浏览器中打开 GitHub Releases 发行说明",
									desc: "前往社区版仓库查看各版本的补丁增删明细、宿主版本适配说明与变更日志。",
									tag: "外部链接",
									side: "auto"
								};
							}
							if (txt === "安装所选版本") {
								return {
									anchor: purgeCtrl,
									title: "备份当前插件并安装所选社区发行版",
									desc: "自动为当前插件创建一份本机快照备份，随后下载并覆盖安装下拉框中所选的社区发行版本（完成后需重启 DSH 进程）。",
									tag: "版本安装",
									side: "auto"
								};
							}
							if (txt === "刷新备份列表") {
								return {
									anchor: purgeCtrl,
									title: "重新扫描本机插件快照备份",
									desc: "刷新保存在本机的历史插件快照列表，核对各备份点的创建时间戳与包含的插件版本号。",
									tag: "备份管理",
									side: "auto"
								};
							}
							if (txt === "立即备份") {
								return {
									anchor: purgeCtrl,
									title: "立即创建当前插件状态的本机快照",
									desc: "将当前已安装的 dsh-purge 插件代码与入口打包保存为本机备份点，便于随时一键无损回滚。",
									tag: "创建快照",
									side: "auto"
								};
							}
							if (label.includes("选择回滚备份")) {
								return {
									anchor: purgeCtrl,
									title: "选择要回滚恢复的本机备份快照",
									desc: "按备份创建时间与插件版本号选择目标快照，配合右侧「回滚插件」按钮恢复至该历史状态。",
									tag: "选择快照",
									side: "auto"
								};
							}
							if (txt === "回滚插件") {
								return {
									anchor: purgeCtrl,
									title: "回滚插件至所选本机备份版本",
									desc: "仅回滚 Purge 插件代码及其挂载入口，完整保留您当前的系统提示词、规则集与其他设置（回滚后需重启 DSH 进程生效）。",
									tag: "快照回滚",
									side: "auto"
								};
							}
							if (txt === "恢复默认") {
								return {
									anchor: purgeCtrl,
									title: "恢复插件内置默认破甲提示词",
									desc: "用插件加密槽中的最新内置默认系统提示词覆盖当前编辑框并立即保存落盘。",
									tag: "重置提示词",
									side: "auto"
								};
							}
							if (txt === "保存名单") {
								return {
									anchor: purgeCtrl,
									title: "保存受控自有服务器白名单",
									desc: "保存您管理的服务器 IP 或 账号@主机名 列表；名单内的主机及其 DNS 解析地址将在本机安全策略中自动放行。",
									tag: "保存白名单",
									side: "auto"
								};
							}
							if (purgeCtrl.id === "dshpp-policy-select" || label.includes("工作区策略")) {
								return {
									anchor: purgeCtrl,
									title: "工作区本地规则 (AGENTS.md / CLAUDE.md) 策略",
									desc: "切换宿主如何对待项目目录中的规则文件：「严格」永远剥离本地规则；「空位兜底」仅当提示词框为空时才注入；「总是允许」保留 DSH 原生加载行为。",
									tag: "工作区策略",
									side: "auto"
								};
							}
							if (txt === "重新扫描") {
								return {
									anchor: purgeCtrl,
									title: "重新扫描当前工作目录的本地规则文件",
									desc: "扫描当前会话工作目录、上级目录与项目根目录下的 AGENTS.md / CLAUDE.md 候选文件并刷新勾选列表。",
									tag: "扫描目录",
									side: "auto"
								};
							}
							if (txt === "新建") {
								return {
									anchor: purgeCtrl,
									title: "新建全局指令规则集",
									desc: "根据输入的 ID、名称与目标文件类型（AGENTS.md 或 CLAUDE.md）创建一套新的全局规则模板并打开右侧编辑器。",
									tag: "新建规则",
									side: "auto"
								};
							}
							if (txt === "启用") {
								return {
									anchor: purgeCtrl,
									title: "激活并挂载该规则集",
									desc: "将此规则集设为当前生效规则，立即写入全局 AGENTS.md / CLAUDE.md 指令槽位供会话与红队模式加载。",
									tag: "激活规则",
									side: "auto"
								};
							}
							if (txt === "导入压缩包") {
								return {
									anchor: purgeCtrl,
									title: "从压缩包导入 DSH 技能 (.zip / .tgz / .skill)",
									desc: "选择包含 SKILL.md 的技能压缩包并自动解压导入至宿主官方 $DSH_HOME/skills 目录。",
									tag: "导入技能",
									side: "auto"
								};
							}
							if (txt === "导入文件夹") {
								return {
									anchor: purgeCtrl,
									title: "从本地文件夹直接导入 DSH 技能",
									desc: "选择包含 SKILL.md 及脚本资源的本地文件夹，自动过滤无关缓存文件后导入至官方 $DSH_HOME/skills 目录。",
									tag: "导入技能",
									side: "auto"
								};
							}
							if (txt === "自动分配") {
								return {
									anchor: purgeCtrl,
									title: "扫描工具箱文件夹并自动绑定渗透工具路径",
									desc: "递归扫描输入的整包工具箱目录 (toolkitDir)，自动识别 nmap、nuclei、fscan、ffuf 等可执行文件并批量填入下方配置表。",
									tag: "一键配环境",
									side: "auto"
								};
							}
							if (txt.includes("新增得分点")) {
								return {
									anchor: purgeCtrl,
									title: "新增自定义攻防演练得分点",
									desc: "在内置《突破入侵类得分规则》之外添加自定义计分项（可自由设定名称、分类、单次分值与得分条件说明）。",
									tag: "自定义计分",
									side: "auto"
								};
							}
							if (txt === "创建靶标") {
								return {
									anchor: purgeCtrl,
									title: "创建新的红队攻防演练靶标空间",
									desc: "按输入的靶标单位名称初始化独立的 SQLite 演练数据库，隔离存储该靶标的资产测绘、漏洞战果、攻击链与得分记录。",
									tag: "新建演练",
									side: "auto"
								};
							}
							if (purgeCtrl.classList.contains("rt-eng-select")) {
								return {
									anchor: purgeCtrl,
									title: "切换当前激活的红队演练靶标",
									desc: "在多个演练项目或靶标单位之间切换，演练台内所有资产、会话隧道、漏洞战果与计分板将同步切换至所选靶标。",
									tag: "靶标切换",
									side: "auto"
								};
							}
						}
					}

					// 10. Elements with an explicit, distinct descriptive title attribute (never generate cookie-cutter fallback text)
					const titledEl = rawTarget.closest("[data-dsh-saved-title], [title]");
					if (titledEl) {
						stripNativeTitles(titledEl);
						const savedTitle = (titledEl.getAttribute("data-dsh-saved-title") || "").trim();
						const textLabel = (titledEl.textContent || "").trim().replace(/\\s+/g, " ");
						if (savedTitle && savedTitle !== textLabel && savedTitle.length >= 6) {
							return {
								anchor: titledEl,
								title: (textLabel && textLabel.length <= 28 ? textLabel : "功能说明"),
								desc: savedTitle,
								tag: "",
								side: "auto"
							};
						}
					}

					return null;
				};

				let currentAnchor = null;
				let autoHideTimer = null;
				const quotaState = {
					count: 0,
					cooldownUntil: 0,
					cooldownTimer: null
				};
				globalThis.__dshTooltipQuotaState = quotaState;
				globalThis.__dshResetTooltipQuota = () => {
					quotaState.count = 0;
					quotaState.cooldownUntil = 0;
					if (quotaState.cooldownTimer !== null) {
						clearTimeout(quotaState.cooldownTimer);
						quotaState.cooldownTimer = null;
					}
					if (autoHideTimer !== null) {
						clearTimeout(autoHideTimer);
						autoHideTimer = null;
					}
					currentAnchor = null;
				};

				const getTooltipTimingConfig = () => ({
					maxShows: typeof globalThis.__dshTooltipMaxShows === "number" ? globalThis.__dshTooltipMaxShows : 200,
					cooldownMs: typeof globalThis.__dshTooltipCooldownMs === "number" ? globalThis.__dshTooltipCooldownMs : 0,
					autoHideMs: typeof globalThis.__dshTooltipAutoHideMs === "number" ? globalThis.__dshTooltipAutoHideMs : 5000
				});

				const clearAutoHideTimer = () => {
					if (autoHideTimer !== null) {
						clearTimeout(autoHideTimer);
						autoHideTimer = null;
					}
				};

				const hideCardVisualOnly = () => {
					clearAutoHideTimer();
					const card = document.getElementById("dsh-themed-tooltip-card");
					if (card) {
						card.setAttribute("data-visible", "false");
					}
				};

				const hideTooltip = () => {
					currentAnchor = null;
					hideCardVisualOnly();
				};

				const positionCard = (card, spec) => {
					const anchor = spec.anchor;
					if (!anchor || !anchor.isConnected) {
						hideTooltip();
						return;
					}
					const rect = anchor.getBoundingClientRect();
					if (rect.width === 0 && rect.height === 0) {
						hideTooltip();
						return;
					}
					const vw = window.innerWidth || document.documentElement.clientWidth || 1280;
					const vh = window.innerHeight || document.documentElement.clientHeight || 800;
					const cardRect = card.getBoundingClientRect();
					const cw = cardRect.width || 260;
					const ch = cardRect.height || 72;

					let left = rect.left + rect.width / 2 - cw / 2;
					let top = rect.bottom + 8;

					if (spec.side === "right") {
						const refRect = spec.menuAnchor ? spec.menuAnchor.getBoundingClientRect() : rect;
						if (refRect.right + 10 + cw <= vw - 8) {
							left = refRect.right + 10;
						} else if (refRect.left - 10 - cw >= 8) {
							left = refRect.left - 10 - cw;
						} else {
							left = Math.max(8, Math.min(vw - cw - 8, rect.left));
						}
						top = Math.max(8, Math.min(vh - ch - 8, rect.top + rect.height / 2 - ch / 2));
					} else {
						if (top + ch > vh - 10 && rect.top - ch - 8 >= 8) {
							top = rect.top - ch - 8;
						}
						left = Math.max(10, Math.min(vw - cw - 10, left));
						top = Math.max(10, Math.min(vh - ch - 10, top));
					}

					card.style.left = \`\${Math.round(left)}px\`;
					card.style.top = \`\${Math.round(top)}px\`;
				};

				const showTooltipForTarget = (rawTarget) => {
					if (!rawTarget || rawTarget.nodeType !== 1) {
						hideTooltip();
						return;
					}
					stripNativeTitles(rawTarget);
					const spec = resolveTooltipSpec(rawTarget);
					if (!spec || !spec.anchor) {
						hideTooltip();
						return;
					}
					const card = ensureCard();
					if (!card) return;
					if (currentAnchor === spec.anchor) {
						if (card.getAttribute("data-visible") === "true") {
							positionCard(card, spec);
						}
						return;
					}

					currentAnchor = spec.anchor;
					clearAutoHideTimer();

					const { maxShows, cooldownMs, autoHideMs } = getTooltipTimingConfig();
					const now = Date.now();
					if (quotaState.cooldownUntil > 0 && now >= quotaState.cooldownUntil) {
						quotaState.count = 0;
						quotaState.cooldownUntil = 0;
						if (quotaState.cooldownTimer !== null) {
							clearTimeout(quotaState.cooldownTimer);
							quotaState.cooldownTimer = null;
						}
					}

					if (quotaState.cooldownUntil > now || quotaState.count >= maxShows) {
						hideCardVisualOnly();
						return;
					}

					quotaState.count += 1;
					if (quotaState.count >= maxShows) {
						quotaState.cooldownUntil = now + cooldownMs;
						if (quotaState.cooldownTimer !== null) {
							clearTimeout(quotaState.cooldownTimer);
						}
						quotaState.cooldownTimer = setTimeout(() => {
							quotaState.count = 0;
							quotaState.cooldownUntil = 0;
							quotaState.cooldownTimer = null;
							if (currentAnchor && currentAnchor.isConnected) {
								const resumeTarget = currentAnchor;
								currentAnchor = null;
								showTooltipForTarget(resumeTarget);
							}
						}, cooldownMs);
					}

					const titleEl = card.querySelector(".dsh-tip-title");
					const descEl = card.querySelector(".dsh-tip-desc");
					const tagEl = card.querySelector(".dsh-tip-tag");
					const colsEl = card.querySelector(".dsh-tip-cols");
					const leftHeadEl = card.querySelector(".dsh-tip-col-left .dsh-tip-col-head");
					const rightHeadEl = card.querySelector(".dsh-tip-col-right .dsh-tip-col-head");
					const leftListEl = card.querySelector(".dsh-tip-left-list");
					const rightListEl = card.querySelector(".dsh-tip-right-list");
					const footEl = card.querySelector(".dsh-tip-foot");
					if (titleEl) titleEl.textContent = spec.title;
					if (descEl) {
						descEl.textContent = spec.desc || "";
						descEl.style.display = spec.desc ? "block" : "none";
					}
					const showMemberTag = Boolean(spec.isMemberTip && spec.tag);
					if (tagEl) {
						if (showMemberTag) {
							tagEl.textContent = spec.tag;
							tagEl.style.display = "inline-flex";
						} else {
							tagEl.textContent = "";
							tagEl.style.display = "none";
						}
					}
					const hasCols = (Array.isArray(spec.leftLines) && spec.leftLines.length > 0) || (Array.isArray(spec.rightLines) && spec.rightLines.length > 0);
					card.setAttribute("data-has-cols", hasCols ? "true" : "false");
					if (colsEl) {
						if (hasCols) {
							if (leftHeadEl) leftHeadEl.textContent = spec.leftHead || "Agent";
							if (rightHeadEl) rightHeadEl.textContent = spec.rightHead || "Bot";
							if (leftListEl) {
								leftListEl.innerHTML = "";
								const lItems = Array.isArray(spec.leftLines) && spec.leftLines.length > 0 ? spec.leftLines : ["暂无 Agent"];
								lItems.forEach((line) => {
									const item = document.createElement("div");
									item.className = "dsh-tip-col-item";
									item.textContent = line;
									leftListEl.appendChild(item);
								});
							}
							if (rightListEl) {
								rightListEl.innerHTML = "";
								const rItems = Array.isArray(spec.rightLines) && spec.rightLines.length > 0 ? spec.rightLines : ["暂无 Bot"];
								rItems.forEach((line) => {
									const item = document.createElement("div");
									item.className = "dsh-tip-col-item";
									item.textContent = line;
									rightListEl.appendChild(item);
								});
							}
						} else {
							if (leftListEl) leftListEl.innerHTML = "";
							if (rightListEl) rightListEl.innerHTML = "";
						}
					}
					if (footEl) {
						if (spec.foot) {
							footEl.textContent = spec.foot;
							card.setAttribute("data-has-foot", "true");
						} else {
							footEl.textContent = "";
							card.setAttribute("data-has-foot", "false");
						}
					}
					card.setAttribute("data-visible", "true");
					positionCard(card, spec);

					const activeAnchorAtShow = spec.anchor;
					autoHideTimer = setTimeout(() => {
						autoHideTimer = null;
						if (currentAnchor === activeAnchorAtShow) {
							hideCardVisualOnly();
						}
					}, autoHideMs);
				};

				document.addEventListener("pointerover", (e) => {
					showTooltipForTarget(e.target);
				}, true);

				document.addEventListener("pointermove", (e) => {
					if (currentAnchor && (!currentAnchor.isConnected || !currentAnchor.contains(e.target))) {
						showTooltipForTarget(e.target);
					} else if (!currentAnchor) {
						showTooltipForTarget(e.target);
					}
				}, { passive: true, capture: true });

				document.addEventListener("pointerdown", () => {
					hideTooltip();
				}, true);

				document.addEventListener("wheel", () => {
					hideTooltip();
				}, { passive: true, capture: true });

				document.addEventListener("keydown", (e) => {
					if (e.key === "Escape") hideTooltip();
				}, true);

				window.addEventListener("blur", hideTooltip);
			};

			ensureDshUniversalTooltips();

			const applySubmodeTokens = (mode) => {
				if (document.body.getAttribute("data-dsh-theme-id") !== "${LUMINEX_PRESET_ID}") {
					document.body.removeAttribute("data-dsh-preset1-mode");
					document.body.style.removeProperty("--dsh-cpt-t");
					if (document.body.getAttribute("data-dsh-theme-id") === "${PRESET2_ID}") {
						document.documentElement.style.colorScheme = "light";
						document.body.removeAttribute("data-ds-dark-theme");
					}
					return;
				}
				document.body.setAttribute("data-dsh-preset1-mode", mode);
				document.documentElement.style.colorScheme = mode;
				if (mode === "dark") {
					document.body.setAttribute("data-ds-dark-theme", "");
				} else {
					document.body.removeAttribute("data-ds-dark-theme");
				}
			};

			if (themeId !== "${LUMINEX_PRESET_ID}") {
				applySubmodeTokens("light");
				const existingWidget = document.getElementById("dsh-corner-pull-toggle");
				if (existingWidget) existingWidget.remove();
				return;
			}

			let savedMode = "dark";
			try {
				const raw = localStorage.getItem("dsh_preset1_submode_v2");
				if (raw === "light" || raw === "dark") savedMode = raw;
			} catch (_e) {}
			applySubmodeTokens(savedMode);

			globalThis.__dshCommitPreset1Submode = (nextMode) => {
				if (nextMode !== "light" && nextMode !== "dark") return;
				savedMode = nextMode;
				try {
					localStorage.setItem("dsh_preset1_submode_v2", nextMode);
					localStorage.setItem("dsh_preset1_submode", nextMode);
				} catch (_e) {}
				applySubmodeTokens(nextMode);
				if (typeof globalThis.__dshAnimateCornerToggle === "function") {
					globalThis.__dshAnimateCornerToggle(nextMode === "light" ? 0 : 1);
				}
				try {
					window.dispatchEvent(new CustomEvent("dsh-preset1-submode", { detail: nextMode }));
				} catch (_e) {}
			};

			const ensureCornerWidget = () => {
				if (document.body.getAttribute("data-dsh-theme-id") !== "${LUMINEX_PRESET_ID}") return;
				const host = document.querySelector(".wSkVaW_body");
				if (!host) return;
				let widget = document.getElementById("dsh-corner-pull-toggle");
				if (!widget) {
					widget = document.createElement("div");
					widget.id = "dsh-corner-pull-toggle";
					widget.setAttribute("data-testid", "designownow-corner-toggle");
					widget.innerHTML = \`
						<svg class="dsh_cpt_svg" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<filter id="cptGrooveBlur" x="-40%" y="-40%" width="180%" height="180%">
									<feGaussianBlur stdDeviation="8"/>
								</filter>
								<filter id="cptGrooveInsetDark" x="-25%" y="-25%" width="150%" height="150%">
									<feOffset dx="1.5" dy="2"/>
									<feGaussianBlur stdDeviation="5.5" result="blur"/>
									<feComposite operator="out" in="SourceGraphic" in2="blur" result="inverse"/>
									<feFlood flood-color="#05070e" flood-opacity="0.28" result="color"/>
									<feComposite operator="in" in="color" in2="inverse" result="shadow"/>
									<feComposite operator="over" in="shadow" in2="SourceGraphic"/>
								</filter>
								<filter id="cptGrooveInsetLight" x="-25%" y="-25%" width="150%" height="150%">
									<feOffset dx="1.5" dy="2"/>
									<feGaussianBlur stdDeviation="5" result="blur"/>
									<feComposite operator="out" in="SourceGraphic" in2="blur" result="inverse"/>
									<feFlood flood-color="#5a5a5a" flood-opacity="0.18" result="color"/>
									<feComposite operator="in" in="color" in2="inverse" result="shadow"/>
									<feComposite operator="over" in="shadow" in2="SourceGraphic"/>
								</filter>
								<linearGradient id="cptPurpleTrail" x1="72" y1="36" x2="204" y2="168" gradientUnits="userSpaceOnUse">
									<stop offset="0%" stop-color="#9333ea" stop-opacity="0.12"/>
									<stop offset="52%" stop-color="#c026d3" stop-opacity="0.48"/>
									<stop offset="100%" stop-color="#e82ab2" stop-opacity="0.86"/>
								</linearGradient>
							</defs>
							<!-- Bottom-right 1px subtle catch-light lip + 3D Recessed Carved Groove -->
							<path class="dsh_cpt_groove_rim" d="M 73.5 37.5 A 132 132 0 0 1 205.5 169.5" stroke="rgba(255, 255, 255, 0.06)" stroke-width="47" stroke-linecap="round"/>
							<path class="dsh_cpt_groove_bg dsh_cpt_track_hit" d="M 72 36 A 132 132 0 0 1 204 168" stroke="rgba(24, 27, 39, 0.88)" stroke-width="47" stroke-linecap="round"/>
							<path class="dsh_cpt_trail_glow dsh_cpt_trail_dark" d="M 72 36 A 132 132 0 0 1 204 168" stroke="url(#cptPurpleTrail)" stroke-width="22" stroke-linecap="round" filter="url(#cptGrooveBlur)"/>
						</svg>
						<button type="button" class="dsh_cpt_capsule" aria-label="Pull to toggle Preset 1 Dark/Light studio mode" title="Drag or click to toggle Liquid Glass Dark / Daylight mode">
							<span class="dsh_cpt_glint" aria-hidden="true"></span>
							<span class="dsh_cpt_dimple" aria-hidden="true">
								<svg class="dsh_cpt_spoke" viewBox="0 0 20 20" fill="none">
									<line x1="10" y1="2.2" x2="10" y2="5.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
									<line x1="10" y1="14.6" x2="10" y2="17.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
									<line x1="2.2" y1="10" x2="5.4" y2="10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
									<line x1="14.6" y1="10" x2="17.8" y2="10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
									<line x1="4.48" y1="4.48" x2="6.75" y2="6.75" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
									<line x1="13.25" y1="13.25" x2="15.52" y2="15.52" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
									<line x1="15.52" y1="4.48" x2="13.25" y2="6.75" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
									<line x1="6.75" y1="13.25" x2="4.48" y2="15.52" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
								</svg>
							</span>
							<span class="dsh_cpt_core_glow" aria-hidden="true"></span>
						</button>
					\`;
					host.appendChild(widget);

					const capsule = widget.querySelector(".dsh_cpt_capsule");
					const spoke = widget.querySelector(".dsh_cpt_spoke");
					const grooveBg = widget.querySelector(".dsh_cpt_groove_bg");
					const svgEl = widget.querySelector(".dsh_cpt_svg");

					const CX = 72;
					const CY = 168;
					const R = 132;
					const DEG0 = -90;
					const DEG1 = 0;

					let curT = savedMode === "light" ? 0 : 1;
					let animFrame = 0;

					const renderAt = (tVal, pullStretch = 0) => {
						const clamped = Math.max(-0.08, Math.min(1.08, tVal));
						const normT = Math.max(0, Math.min(1, clamped));
						const deg = DEG0 + clamped * (DEG1 - DEG0);
						const rad = deg * Math.PI / 180;
						const x = CX + R * Math.cos(rad);
						const y = CY + R * Math.sin(rad);
						const rotDeg = deg + 90;
						const midSwell = Math.sin(normT * Math.PI) * 0.04;
						const scaleX = 1 + midSwell + Math.abs(pullStretch) * 0.05;
						const scaleY = 1 + midSwell * 0.6 - Math.abs(pullStretch) * 0.025;

						document.body.style.setProperty("--dsh-cpt-t", normT.toFixed(3));

						if (capsule) {
							capsule.style.left = x.toFixed(2) + "px";
							capsule.style.top = y.toFixed(2) + "px";
							capsule.style.transform = \`rotate(\${rotDeg.toFixed(2)}deg) scale(\${scaleX.toFixed(3)}, \${scaleY.toFixed(3)})\`;
						}
						if (spoke) {
							spoke.style.transform = \`rotate(\${(clamped * 180).toFixed(1)}deg)\`;
						}
					};

					const animateTo = (targetT) => {
						if (animFrame) cancelAnimationFrame(animFrame);
						const startT = curT;
						const startTime = performance.now();
						const duration = 540;
						const step = (now) => {
							const elapsed = Math.min(1, (now - startTime) / duration);
							// Snappy yet silky sinusoidal ease-in-out (~1.5x faster than before)
							const ease = 0.5 - 0.5 * Math.cos(elapsed * Math.PI);
							curT = startT + (targetT - startT) * ease;
							const pull = Math.sin(elapsed * Math.PI) * 0.14 * Math.abs(targetT - startT);
							renderAt(curT, pull);
							if (elapsed < 1) {
								animFrame = requestAnimationFrame(step);
							} else {
								curT = targetT;
								renderAt(curT, 0);
								animFrame = 0;
							}
						};
						animFrame = requestAnimationFrame(step);
					};

					globalThis.__dshAnimateCornerToggle = animateTo;

					const commitMode = (nextMode) => {
						savedMode = nextMode;
						try {
							localStorage.setItem("dsh_preset1_submode_v2", nextMode);
							localStorage.setItem("dsh_preset1_submode", nextMode);
						} catch (_e) {}
						// Apply submode tokens immediately at 0ms so Left Sidebar, Groove & Right Stage transition in 100% lockstep
						applySubmodeTokens(nextMode);
						animateTo(nextMode === "light" ? 0 : 1);
						try {
							window.dispatchEvent(new CustomEvent("dsh-preset1-submode", { detail: nextMode }));
						} catch (_e) {}
					};

					renderAt(curT, 0);

					let dragging = false;
					let moved = false;
					let startX = 0;
					let startY = 0;

					const pointerToT = (clientX, clientY) => {
						const rect = svgEl.getBoundingClientRect();
						const px = clientX - rect.left - CX;
						const py = clientY - rect.top - CY;
						let deg = Math.atan2(py, px) * 180 / Math.PI;
						if (deg > 90) deg -= 360;
						const rawT = (deg - DEG0) / (DEG1 - DEG0);
						if (rawT < 0) return -Math.min(0.08, Math.pow(-rawT, 0.7) * 0.08);
						if (rawT > 1) return 1 + Math.min(0.08, Math.pow(rawT - 1, 0.7) * 0.08);
						return rawT;
					};

					capsule.addEventListener("pointerdown", (e) => {
						if (e.button !== 0) return;
						e.preventDefault();
						e.stopPropagation();
						if (animFrame) {
							cancelAnimationFrame(animFrame);
							animFrame = 0;
						}
						dragging = true;
						moved = false;
						startX = e.clientX;
						startY = e.clientY;
						try {
							capsule.setPointerCapture(e.pointerId);
						} catch (_err) {}
					});

					capsule.addEventListener("pointermove", (e) => {
						if (!dragging) return;
						if (Math.hypot(e.clientX - startX, e.clientY - startY) > 4) moved = true;
						if (!moved) return;
						const nextT = pointerToT(e.clientX, e.clientY);
						const over = nextT < 0 ? nextT : nextT > 1 ? nextT - 1 : 0;
						curT = nextT;
						renderAt(curT, over * 3.0);
						const liveMode = curT < 0.5 ? "light" : "dark";
						if (liveMode !== savedMode) {
							savedMode = liveMode;
							try {
								localStorage.setItem("dsh_preset1_submode_v2", liveMode);
								localStorage.setItem("dsh_preset1_submode", liveMode);
							} catch (_e) {}
							applySubmodeTokens(liveMode);
							try {
								window.dispatchEvent(new CustomEvent("dsh-preset1-submode", { detail: liveMode }));
							} catch (_e) {}
						}
					});

					let lastPointerUpAt = 0;
					const endDrag = () => {
						if (!dragging) return;
						dragging = false;
						lastPointerUpAt = performance.now();
						if (!moved) {
							commitMode(savedMode === "dark" ? "light" : "dark");
						} else {
							commitMode(curT < 0.5 ? "light" : "dark");
						}
					};
					capsule.addEventListener("pointerup", endDrag);
					capsule.addEventListener("pointercancel", endDrag);
					capsule.addEventListener("click", (e) => {
						if (performance.now() - lastPointerUpAt < 350) return;
						e.stopPropagation();
						commitMode(savedMode === "dark" ? "light" : "dark");
					});

					if (grooveBg) {
						grooveBg.addEventListener("click", (e) => {
							e.stopPropagation();
							commitMode(savedMode === "dark" ? "light" : "dark");
						});
					}
				} else if (widget.parentElement !== host) {
					host.appendChild(widget);
				}
			};

			if (globalThis.__dshHarnessCornerWidget === true) ensureCornerWidget();
			if (!globalThis.__dshCornerToggleObserver && typeof MutationObserver !== "undefined") {
				const obs = new MutationObserver(() => {
					if (globalThis.__dshHarnessCornerWidget !== true) return;
					if (document.body.getAttribute("data-dsh-theme-id") === "${LUMINEX_PRESET_ID}") {
						if (!document.getElementById("dsh-corner-pull-toggle")) {
							ensureCornerWidget();
						}
					}
				});
				obs.observe(document.body, { childList: true, subtree: true });
				globalThis.__dshCornerToggleObserver = obs;
			}
		}`;
}

