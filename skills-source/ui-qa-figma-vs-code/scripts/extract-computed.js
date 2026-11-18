// Dán NGUYÊN file này vào công cụ chạy JS của trình duyệt (built-in browser javascript_tool,
// Chrome DevTools, Playwright page.evaluate). Chỉ đọc DOM/CSSOM, không sửa trang.
// Định nghĩa window.__uiqa một lần; các lần gọi sau chỉ cần một dòng ngắn → tiết kiệm token.
//
//   __uiqa.tree('.campaign-card', 4)                 // cây DOM gọn để ghép với cây layer Figma (Bước 1–2)
//   __uiqa.inspect(['.btn-primary', '.card__title']) // computed + CSS gốc (var() còn nguyên) + rule state (Bước 3)
//   __uiqa.inspect(['.btn'], { props: ['color','background-color'] })  // chỉ lấy vài thuộc tính
//
// inspect() trả mỗi selector: { sel, n (số phần tử khớp), tag, cls, text, rect, css{prop: computed},
//   src{prop: giá trị viết trong CSS/inline, giữ var()}, states{':hover': {prop: authored}}, unread[] (stylesheet cross-origin) }.
// Bỏ giá trị mặc định (0px, none, normal, auto…) và gộp 4 cạnh bằng nhau để output ngắn.
(() => {
  const PROPS = [
    'color', 'background-color', 'background-image', 'opacity',
    'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'text-align', 'text-transform', 'text-decoration-line', 'white-space',
    'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'row-gap', 'column-gap',
    'display', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items', 'align-self', 'order', 'position', 'z-index', 'overflow-x', 'overflow-y',
    'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height', 'aspect-ratio', 'box-sizing',
    'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
    'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
    'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
    'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius',
    'box-shadow', 'filter', 'backdrop-filter', 'outline-width', 'outline-style', 'outline-color', 'outline-offset',
    'fill', 'stroke', 'cursor',
  ];
  const DEFAULTS = new Set(['0px', 'none', 'normal', 'auto', 'visible', 'static', 'start', 'nowrap', 'row', 'stretch', 'rgba(0, 0, 0, 0)', '0', 'content-box', '1', 'default']);
  const KEEP_ALWAYS = new Set(['color', 'background-color', 'font-family', 'font-size', 'font-weight', 'line-height', 'display', 'width', 'height', 'opacity']);
  const STATE_RE = /:(hover|focus-visible|focus-within|focus|active|disabled|checked|invalid)|\[(disabled|aria-disabled|aria-invalid|aria-selected|aria-expanded|aria-checked)[^\]]*\]|\.(is-|has-)?(active|disabled|error|invalid|selected|open|loading)\b/;

  function rules() {
    const out = []; const unread = [];
    const walk = (list, sheetHref) => {
      for (const r of list) {
        if (r.cssRules && !r.selectorText) { // @media / @supports / @layer
          if (r.media && !matchMedia(r.media.mediaText).matches) continue;
          walk(r.cssRules, sheetHref);
        } else if (r.selectorText) out.push({ r, href: sheetHref });
      }
    };
    for (const s of document.styleSheets) {
      try { walk(s.cssRules, s.href ? s.href.split('/').slice(-1)[0] : '<style>'); } catch { unread.push(s.href); }
    }
    return { list: out, unread };
  }

  const shorthand4 = (o, base, sides) => {
    const vals = sides.map((s) => o[base(s)]);
    if (vals.every((v) => v !== undefined) && vals.every((v) => v === vals[0])) {
      sides.forEach((s) => delete o[base(s)]);
      o[base('*')] = vals[0];
    }
  };
  const compact = (o) => {
    shorthand4(o, (s) => (s === '*' ? 'padding' : `padding-${s}`), ['top', 'right', 'bottom', 'left']);
    shorthand4(o, (s) => (s === '*' ? 'margin' : `margin-${s}`), ['top', 'right', 'bottom', 'left']);
    for (const k of ['width', 'style', 'color']) shorthand4(o, (s) => (s === '*' ? `border-${k}` : `border-${s}-${k}`), ['top', 'right', 'bottom', 'left']);
    shorthand4(o, (s) => (s === '*' ? 'border-radius' : `border-${s}-radius`), ['top-left', 'top-right', 'bottom-right', 'bottom-left']);
    if (o['row-gap'] !== undefined && o['row-gap'] === o['column-gap']) { o.gap = o['row-gap']; delete o['row-gap']; delete o['column-gap']; }
    if (o['border-style'] === 'none' || (!o['border-style'] && !Object.keys(o).some((k) => /^border-\w+-style$/.test(k)))) {
      for (const k of Object.keys(o)) if (/^border(-(top|right|bottom|left))?-(style|width|color)$/.test(k)) delete o[k];
    }
    if (!o['outline-style']) { delete o['outline-width']; delete o['outline-color']; delete o['outline-offset']; }
    return o;
  };

  // Giá trị viết trong CSS cho prop (giữ var()). Lấy rule khớp cuối cùng (xấp xỉ cascade, không tính specificity đầy đủ) + inline style.
  function authored(el, prop, R) {
    let val = null, from = null;
    for (const { r, href } of R.list) {
      if (STATE_RE.test(r.selectorText)) continue;
      let ok = false; try { ok = el.matches(r.selectorText); } catch { /* selector lạ */ }
      if (!ok) continue;
      const v = r.style.getPropertyValue(prop) || shorthandValue(r.style, prop);
      if (v) { val = v.trim() + (r.style.getPropertyPriority(prop) ? ' !important' : ''); from = `${href} ${r.selectorText}`; }
    }
    const inl = el.style.getPropertyValue(prop);
    if (inl) { val = inl.trim(); from = 'inline'; }
    return val ? { v: val, from } : null;
  }
  function shorthandValue(style, prop) {
    const m = prop.match(/^(padding|margin)-/) ? prop.split('-')[0] : prop.match(/^border-(top|right|bottom|left)-(width|style|color)$/) ? 'border' : /radius$/.test(prop) ? 'border-radius' : /gap$/.test(prop) ? 'gap' : prop === 'background-color' ? 'background' : null;
    const v = m ? style.getPropertyValue(m) : '';
    return v && /var\(/.test(v) ? `${v} (shorthand ${m})` : '';
  }

  function stateRules(el, R) {
    const out = {};
    for (const { r } of R.list) {
      if (!STATE_RE.test(r.selectorText)) continue;
      for (const sel of r.selectorText.split(',')) {
        const m = sel.match(STATE_RE); if (!m) continue;
        const base = sel.replace(new RegExp(STATE_RE.source, 'g'), '').trim();
        let ok = false; try { ok = base && el.matches(base); } catch { /* */ }
        if (!ok) continue;
        const key = m[0];
        out[key] = out[key] || {};
        for (let i = 0; i < r.style.length; i++) { const p = r.style[i]; out[key][p] = r.style.getPropertyValue(p).trim(); }
      }
    }
    return out;
  }

  function inspect(selectors, opts = {}) {
    const R = rules();
    const props = opts.props || PROPS;
    return selectors.map((sel) => {
      const all = document.querySelectorAll(sel); const el = all[opts.index || 0];
      if (!el) return { sel, n: 0, error: '[NOT FOUND]' };
      const cs = getComputedStyle(el); const css = {}; const src = {};
      const isSvg = el instanceof SVGElement;
      for (const p of props) {
        if ((p === 'fill' || p === 'stroke') && !isSvg && !opts.props) continue;
        const v = cs.getPropertyValue(p);
        if (!KEEP_ALWAYS.has(p) && DEFAULTS.has(v)) continue;
        css[p] = v;
        const a = authored(el, p, R);
        if (a) src[p] = a.v + (opts.from ? `  ⟵ ${a.from}` : '');
      }
      // Biến SDS khai báo được trên phần tử (để biết token nào tồn tại trong code)
      const rect = el.getBoundingClientRect();
      const res = {
        sel, n: all.length, tag: el.tagName.toLowerCase(), cls: el.className && typeof el.className === 'string' ? el.className : '',
        text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40),
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: +rect.width.toFixed(1), h: +rect.height.toFixed(1) },
        css: compact(css), src: compact(src),
      };
      if (opts.states !== false) { const st = stateRules(el, R); if (Object.keys(st).length) res.states = st; }
      if (el.tagName === 'IMG') res.asset = el.currentSrc || el.src;
      if (el.tagName === 'svg' || el.querySelector?.('svg')) { const s = el.tagName === 'svg' ? el : el.querySelector('svg'); res.svg = { w: s.getAttribute('width'), h: s.getAttribute('height'), viewBox: s.getAttribute('viewBox'), cls: s.getAttribute('class') }; }
      if (R.unread.length) res.unread = R.unread;
      return res;
    });
  }

  // Cây DOM gọn: tag.class "text" [w×h] flex-dir gap — để ghép với cây layer Figma.
  function tree(sel, depth = 4) {
    const root = document.querySelector(sel); if (!root) return '[NOT FOUND] ' + sel;
    const lines = [];
    const walk = (el, d) => {
      if (d > depth || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName)) return;
      const cs = getComputedStyle(el); if (cs.display === 'none') return;
      const r = el.getBoundingClientRect();
      const cls = typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : '';
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').slice(0, 30);
      const lay = cs.display.includes('flex') ? ` ${cs.flexDirection} gap:${cs.rowGap === cs.columnGap ? cs.rowGap : cs.rowGap + '/' + cs.columnGap}` : cs.display.includes('grid') ? ' grid' : '';
      lines.push(`${'  '.repeat(d)}${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${cls}${own ? ` "${own}"` : ''} [${Math.round(r.width)}×${Math.round(r.height)}]${lay}`);
      for (const c of el.children) walk(c, d + 1);
    };
    walk(root, 0);
    return lines.join('\n');
  }

  // Môi trường đo: zoom/devicePixelRatio ≠ 1 làm border 1px hiện 0.8px… → so theo src (giá trị viết) hoặc đặt zoom 100%.
  function env() {
    const probe = document.createElement('div'); probe.style.cssText = 'position:absolute;border-top:1px solid;visibility:hidden';
    document.body.appendChild(probe); const bw = getComputedStyle(probe).borderTopWidth; probe.remove();
    return {
      viewport: `${innerWidth}×${innerHeight}`, dpr: devicePixelRatio, onePxBorder: bw,
      fonts: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`).slice(0, 12),
      fontsReady: document.fonts.status,
      saVars: [...new Set([...document.styleSheets].flatMap((s) => { try { return [...s.cssRules]; } catch { return []; } })
        .filter((r) => r.selectorText === ':root').flatMap((r) => [...r.style].filter((p) => p.startsWith('--sa-'))))].length,
    };
  }

  window.__uiqa = { inspect, tree, env, version: 2 };
  return 'uiqa ready: __uiqa.env() · __uiqa.tree(sel, depth) · __uiqa.inspect([sels], {props, states, from, index})';
})();
