'use client';

import { useMemo, useState } from 'react';
import catalog from '../data/mingcute.generated.json';

const pageSize = 48;
const normalize = value => String(value).toLocaleLowerCase('en').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[_\s]+/g, '-');
const titleCase = value => value.split('-').map(part => part ? part[0].toUpperCase() + part.slice(1) : '').join(' ');
const assetPath = (style, slug) => `/mingcute/${style}/${slug}.svg`;
const assetName = (style, slug) => `sa-icon-${slug}-${style === 'core-regular' ? 'regular' : 'filled'}`;

export default function IconExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [style, setStyle] = useState('core-regular');
  const [size, setSize] = useState(24);
  const [limit, setLimit] = useState(pageSize);
  const [message, setMessage] = useState('');
  const categoryCounts = useMemo(() => {
    const counts = new Map();
    for (const icon of catalog.icons) counts.set(icon.category, (counts.get(icon.category) || 0) + 1);
    return counts;
  }, []);
  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    return catalog.icons.filter(icon => (category === 'all' || icon.category === category) &&
      (!term || normalize(`${icon.slug} ${icon.name} ${icon.category}`).includes(term)));
  }, [query, category]);
  const visible = filtered.slice(0, limit);

  function updateQuery(value) { setQuery(value); setLimit(pageSize); }
  function updateCategory(value) { setCategory(value); setLimit(pageSize); }
  function updateStyle(value) { setStyle(value); setLimit(pageSize); }

  async function copy(value, success) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(success);
    } catch {
      setMessage('Không thể sao chép tự động. Hãy kiểm tra quyền Clipboard của trình duyệt.');
    }
  }

  async function copyAsset(icon, format) {
    const name = assetName(style, icon.slug);
    if (format === 'name') return copy(name, `Đã sao chép ${name}`);
    try {
      const response = await fetch(assetPath(style, icon.slug));
      if (!response.ok) throw new Error(`SVG HTTP ${response.status}`);
      const svg = await response.text();
      if (!svg.startsWith('<svg') || !svg.includes('viewBox="0 0 24 24"')) throw new Error('SVG không hợp lệ');
      const content = format === 'html' ? `<span class="sa-icon" aria-hidden="true">${svg}</span>` : svg;
      await copy(content, `Đã sao chép ${format === 'html' ? 'HTML' : 'SVG'}: ${name}`);
    } catch {
      setMessage(`Không thể đọc SVG ${name}. Hãy thử tải file trực tiếp.`);
    }
  }

  return <section className="sa-icon-explorer" aria-label="Danh mục icon MingCute">
    <div className="sa-icon-catalog-heading">
      <div><p className="sa-icon-kicker">MINGCUTE CORE · V{catalog.version}</p><h3>Thư viện SVG có thể dùng ngay</h3><p>Tra tên gốc, chọn style và copy đúng vector từ gói chính thức.</p></div>
      <div className="sa-icon-catalog-side">
        <div className="sa-icon-catalog-stats"><strong>{catalog.icons.length.toLocaleString('vi-VN')}</strong><span>tên icon</span><strong>{(catalog.icons.length * catalog.styles.length).toLocaleString('vi-VN')}</strong><span>file SVG</span></div>
      </div>
    </div>
    <div className="sa-icon-controls">
      <label className="sa-icon-search">Tìm icon
        <input type="search" value={query} onChange={event => updateQuery(event.target.value)} placeholder="Ví dụ: home, chart, ad…" aria-controls="sa-icon-results" />
      </label>
      <label>Nhóm
        <select value={category} onChange={event => updateCategory(event.target.value)}>
          <option value="all">Tất cả nhóm ({catalog.icons.length})</option>
          {catalog.categories.map(item => <option key={item} value={item}>{titleCase(item)} ({categoryCounts.get(item)})</option>)}
        </select>
      </label>
      <label>Kích thước xem thử
        <select value={size} onChange={event => setSize(Number(event.target.value))}>
          {[16, 20, 24, 32].map(value => <option value={value} key={value}>{value}px</option>)}
        </select>
      </label>
    </div>
    <div className="sa-icon-style-switch" role="group" aria-label="Kiểu icon MingCute">
      <button type="button" aria-pressed={style === 'core-regular'} onClick={() => updateStyle('core-regular')}>Core Regular</button>
      <button type="button" aria-pressed={style === 'core-filled'} onClick={() => updateStyle('core-filled')}>Core Filled</button>
    </div>
    <p className="sa-icon-result-count" id="sa-icon-results">Hiển thị {visible.length} / {filtered.length} tên icon · {style === 'core-regular' ? 'Core Regular' : 'Core Filled'}{category !== 'all' ? ` · ${titleCase(category)}` : ''}</p>
    {visible.length ? <div className="sa-icon-grid">{visible.map(icon => {
      const name = assetName(style, icon.slug);
      const href = assetPath(style, icon.slug);
      return <article className="sa-icon-card" key={`${style}/${icon.slug}`}>
        <div className="sa-icon-card-preview"><img src={href} width={size} height={size} alt="" aria-hidden="true" loading="lazy" decoding="async" /></div>
        <div className="sa-icon-card-body"><h4 title={icon.slug}>{titleCase(icon.slug)}</h4><p>{icon.category} · {style === 'core-regular' ? 'Regular' : 'Filled'}</p><code title={name}>{name}</code></div>
        <div className="sa-icon-card-actions">
          <button type="button" onClick={() => copyAsset(icon, 'svg')} aria-label={`Sao chép SVG ${name}`}>Copy SVG</button>
          <button type="button" onClick={() => copyAsset(icon, 'html')} aria-label={`Sao chép HTML ${name}`}>Copy HTML</button>
          <button type="button" onClick={() => copyAsset(icon, 'name')} aria-label={`Sao chép tên ${name}`}>Copy tên</button>
          <a href={href} download={`${name}.svg`} aria-label={`Tải SVG ${name}`}>Tải SVG</a>
        </div>
      </article>;
    })}</div> : <p className="sa-icon-empty">Không tìm thấy icon. Thử tên khác hoặc chọn Tất cả nhóm.</p>}
    {visible.length < filtered.length && <button className="sa-icon-load-more" type="button" onClick={() => setLimit(current => current + pageSize)}>Xem thêm {Math.min(pageSize, filtered.length - visible.length)} icon</button>}
    <div className="sa-icon-catalog-footer"><p role="status" aria-live="polite">{message || 'SVG giữ nguyên vector MingCute; màu xem trước không thay đổi asset tải xuống.'}</p><a href="https://www.mingcute.com/" target="_blank" rel="noopener noreferrer">Mở MingCute ↗</a></div>
  </section>;
}
