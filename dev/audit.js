// Applecord overlay audit — paste into the DevTools console on discord.com
// with the theme applied, open a menu/popout/modal, then run acAudit().
//
// Lists opaque surfaces (alpha ≥ 0.85) inside Discord's overlay layers that
// aren't glass themselves. NO-GLASS = a floating surface the theme misses;
// IN-GLASS = an opaque patch inside a glass surface (often fine: images,
// banners, solid buttons).

window.acAudit = () => {
  const cls = (el) => String(el?.className?.baseVal ?? el?.className ?? '');
  const alpha = (bg) => {
    const m = bg.match(/rgba?\(([^)]+)\)/);
    if (!m) return /^(oklab|oklch|color)\(/.test(bg) ? 1 : 0;
    const parts = m[1].split(',').map(Number);
    return parts.length === 4 ? parts[3] : 1;
  };
  const roots = document.querySelectorAll(
    '[class^="layerContainer_"], [class^="layers_"] > [class^="layer_"]:not([class*="baseLayer_"])',
  );
  const gaps = new Set();
  for (const root of roots) {
    for (const el of root.querySelectorAll('*')) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 120 || rect.height < 24) continue;
      const cs = getComputedStyle(el);
      if (alpha(cs.backgroundColor) < 0.85 || cs.backdropFilter !== 'none') continue;
      let inGlass = false;
      for (let p = el.parentElement; p && p !== root; p = p.parentElement) {
        if (getComputedStyle(p).backdropFilter !== 'none') { inGlass = true; break; }
      }
      gaps.add(
        `${inGlass ? 'IN-GLASS' : 'NO-GLASS'} ${el.tagName.toLowerCase()}.${cls(el).split(' ').slice(0, 3).join('.')} ` +
          `${Math.round(rect.width)}x${Math.round(rect.height)} bg=${cs.backgroundColor}`,
      );
    }
  }
  return [...gaps];
};

acAudit();
