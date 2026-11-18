// Chuẩn hoá giá trị Figma ↔ CSS computed style để so sánh tất định.
// Không phụ thuộc thư viện ngoài. Dùng chung cho compare.mjs, token-index.mjs, figma-node-extract.mjs.

const NAMED = { white: '#ffffff', black: '#000000', transparent: '#00000000', red: '#ff0000', green: '#008000', blue: '#0000ff' };
const hex2 = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');

/** Trả '#rrggbb' hoặc '#rrggbbaa' (bỏ alpha khi = ff). null nếu không đọc được. */
export function normColor(v) {
  if (v == null || v === '') return null;
  if (typeof v === 'object') {
    // Figma {r,g,b,a} 0..1 (a có thể nằm ở opacity của paint)
    if ('r' in v) {
      const a = v.a ?? 1;
      return finish(hex2(v.r * 255) + hex2(v.g * 255) + hex2(v.b * 255), a);
    }
    return null;
  }
  let s = String(v).trim().toLowerCase();
  if (NAMED[s]) s = NAMED[s];
  if (s.startsWith('#')) {
    let h = s.slice(1);
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (!/^[0-9a-f]{6}([0-9a-f]{2})?$/.test(h)) return null;
    return h.length === 8 && h.endsWith('ff') ? '#' + h.slice(0, 6) : '#' + h;
  }
  const m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].replace(/\s*\/\s*/, ',').split(/[\s,]+/).filter(Boolean);
    const [r, g, b] = parts.slice(0, 3).map((p) => (p.endsWith('%') ? parseFloat(p) * 2.55 : parseFloat(p)));
    let a = parts[3] == null ? 1 : parts[3].endsWith('%') ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
    return finish(hex2(r) + hex2(g) + hex2(b), a);
  }
  return null;
}
function finish(rgb, a) {
  const aa = hex2(a * 255);
  return '#' + rgb + (aa === 'ff' ? '' : aa);
}

/** Số px từ '12px' | 12 | '0.75rem' | '1.2em' (cần fontSize) | '120%' (cần base). null nếu auto/normal/none. */
export function parsePx(v, { fontSize = 16, base = null } = {}) {
  if (v == null) return null;
  if (typeof v === 'number') return v;
  const s = String(v).trim().toLowerCase();
  if (['auto', 'normal', 'none', ''].includes(s)) return null;
  const n = parseFloat(s);
  if (Number.isNaN(n)) return null;
  if (s.endsWith('rem')) return n * 16;
  if (s.endsWith('em')) return n * fontSize;
  if (s.endsWith('%')) return base == null ? null : (n / 100) * base;
  return n;
}

const WEIGHTS = { thin: 100, hairline: 100, extralight: 200, ultralight: 200, light: 300, regular: 400, normal: 400, book: 400, medium: 500, semibold: 600, semi: 600, demibold: 600, bold: 700, extrabold: 800, ultrabold: 800, black: 900, heavy: 900 };
export function normWeight(v) {
  if (v == null) return null;
  if (typeof v === 'number') return v;
  const s = String(v).toLowerCase().replace(/[\s_-]|italic/g, '');
  if (/^\d+$/.test(s)) return Number(s);
  return WEIGHTS[s] ?? null;
}

export function normFamily(v) {
  if (v == null) return null;
  return String(v).split(',')[0].trim().replace(/^["']|["']$/g, '').toLowerCase();
}

/** Figma lineHeight {unit,value} hoặc CSS → px. */
export function lineHeightPx(v, fontSize) {
  if (v == null) return null;
  if (typeof v === 'object') {
    if (v.unit === 'PIXELS') return v.value;
    if (v.unit === 'PERCENT') return (v.value / 100) * fontSize;
    return null; // AUTO
  }
  const s = String(v).trim();
  if (s === 'normal') return null;
  if (/^[\d.]+$/.test(s)) return parseFloat(s) * fontSize; // unitless
  return parsePx(s, { fontSize, base: fontSize });
}

/** Figma letterSpacing {unit,value} hoặc CSS → px. 'normal' = 0. */
export function letterSpacingPx(v, fontSize) {
  if (v == null) return null;
  if (typeof v === 'object') return v.unit === 'PERCENT' ? (v.value / 100) * fontSize : v.value;
  if (String(v).trim() === 'normal') return 0;
  return parsePx(v, { fontSize });
}

/** CSS box-shadow → [{x,y,blur,spread,color,inset}] ; 'none' → []. */
export function parseShadow(v) {
  if (v == null) return [];
  if (Array.isArray(v)) return v.map(figmaEffectToShadow).filter(Boolean);
  const s = String(v).trim();
  if (!s || s === 'none') return [];
  const layers = [];
  let depth = 0, cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { layers.push(cur); cur = ''; } else cur += ch;
  }
  layers.push(cur);
  return layers.map((l) => {
    const colorMatch = l.match(/(rgba?\([^)]*\)|#[0-9a-f]{3,8}\b|\b(?:white|black|transparent)\b)/i);
    const color = colorMatch ? normColor(colorMatch[0]) : '#000000';
    const rest = colorMatch ? l.replace(colorMatch[0], ' ') : l;
    const inset = /\binset\b/.test(rest);
    const nums = (rest.match(/-?[\d.]+(px)?/g) || []).map((n) => parseFloat(n));
    const [x = 0, y = 0, blur = 0, spread = 0] = nums;
    return { x, y, blur, spread, color, inset };
  });
}
function figmaEffectToShadow(e) {
  if (!e || e.visible === false || !/SHADOW/.test(e.type || '')) return null;
  return { x: e.offset?.x ?? 0, y: e.offset?.y ?? 0, blur: e.radius ?? 0, spread: e.spread ?? 0, color: normColor(e.color), inset: e.type === 'INNER_SHADOW' };
}

export const round = (n, d = 2) => (n == null ? n : Math.round(n * 10 ** d) / 10 ** d);
