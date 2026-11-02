// Đọc-only. Dump text style và effect style ra định dạng flat.
const out = { kind: 'styles', text: [], effect: [] };
const ts = await figma.getLocalTextStylesAsync();
for (const s of ts) {
  out.text.push({
    name: s.name, description: s.description || '',
    fontFamily: s.fontName.family, fontStyle: s.fontName.style,
    fontSize: s.fontSize, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing,
    boundVariables: Object.keys(s.boundVariables || {})
  });
}
const es = await figma.getLocalEffectStylesAsync();
const hex = (c) => '#' + [c.r, c.g, c.b].map(n => Math.round(n * 255).toString(16).padStart(2, '0')).join('');
for (const s of es) {
  out.effect.push({
    name: s.name, description: s.description || '',
    effects: s.effects.map(e => ({ type: e.type, color: e.color ? hex(e.color) : undefined, alpha: e.color ? e.color.a : undefined, offset: e.offset, radius: e.radius, spread: e.spread }))
  });
}
return out;
