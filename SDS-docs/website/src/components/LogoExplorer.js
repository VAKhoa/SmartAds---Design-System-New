'use client';

import { useMemo, useState } from 'react';
import manifest from '../../public/brand/logo-library/manifest.json';

const categories = [...new Set(manifest.assets.map(item => item.category))];
const normalize = value => String(value).toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
const formatSize = value => Number(value).toLocaleString('en-US', { maximumFractionDigits: 1 });

function Download({ href, label, filename }) {
  return <a className="sa-logo-download" href={href} download={filename} aria-label={`${label}: ${filename}`}>{label}</a>;
}

function AssetCard({ asset, previewMode }) {
  const dark = previewMode === 'dark' || (previewMode === 'auto' && asset.recommendedBackground === 'dark');
  const suitability = asset.backgroundSuitability;
  const rates = asset.contrastPassRate;
  const evidence = `Tỷ lệ nét logo đạt tương phản 3:1: nền Light ${Math.round(rates.light * 100)}%, nền Dark ${Math.round(rates.dark * 100)}%.`;
  const size = asset.intrinsicSize || asset.exportBounds;
  const downloadBase = asset.downloadName || asset.svg.split('/').pop().replace(/\.svg$/, '');
  return <article className="sa-logo-asset-card">
    <div className={`sa-logo-asset-preview ${previewMode === 'contrast' ? 'sa-logo-asset-preview-contrast' : dark ? 'sa-logo-asset-preview-dark' : 'sa-logo-asset-preview-light'}`}>
      <img src={asset.svg} alt={`Biến thể ${asset.variantLabel}`} loading="lazy" decoding="async" />
    </div>
    <div className="sa-logo-asset-body">
      <h3 title={asset.variantLabel}>{asset.variantLabel}</h3>
      <p className="sa-logo-asset-measure">SVG {formatSize(size.width)} × {formatSize(size.height)} px{asset.sourceFrameSize ? ` · Frame Figma ${formatSize(asset.sourceFrameSize.width)} × ${formatSize(asset.sourceFrameSize.height)} px` : ''}</p>
      <div className="sa-logo-background-tags" aria-label={evidence}>
        {suitability === 'Both' ? <><span className="sa-logo-background-tag">Light</span><span className="sa-logo-background-tag">Dark</span></>
          : suitability === 'Review' ? <><span className="sa-logo-background-tag">Ưu tiên {asset.recommendedBackground === 'dark' ? 'Dark' : 'Light'}</span><span className="sa-logo-background-tag sa-logo-background-tag-review">Cần rà soát</span></>
            : <span className="sa-logo-background-tag">{suitability}</span>}
      </div>
      <dl>
        <div><dt>sourceGroupId</dt><dd title={asset.sourceGroupId}>{asset.sourceGroupId}</dd></div>
        <div><dt>parentGroupId</dt><dd title={asset.parentGroupId}>{asset.parentGroupId}</dd></div>
      </dl>
      <div className="sa-logo-download-row">
        <Download href={asset.svg} label="Tải SVG" filename={`${downloadBase}.svg`} />
        <Download href={asset.png} label="Tải PNG" filename={`${downloadBase}.png`} />
      </div>
    </div>
  </article>;
}

export default function LogoExplorer() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [previewMode, setPreviewMode] = useState('auto');
  const [limit, setLimit] = useState(24);
  const counts = useMemo(() => new Map(categories.map(name => [name, manifest.assets.filter(asset => asset.category === name).length])), []);
  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    return manifest.assets.filter(asset =>
      (category === 'all' || asset.category === category) &&
      (!needle || normalize(`${asset.variantLabel} ${asset.sourceGroupId} ${asset.parentGroupId} ${asset.category}`).includes(needle)),
    );
  }, [category, query]);
  const visible = filtered.slice(0, limit);

  function selectCategory(value) { setCategory(value); setLimit(24); }
  function search(value) { setQuery(value); setLimit(24); }

  return <div className="sa-logo-explorer">
    <section className="sa-logo-feature" aria-label="Bản xuất trực tiếp logo SmartAds">
      <div className="sa-logo-feature-preview"><img src="/brand/logo-library/smartads-full-light.svg" alt="Logo SmartAds đầy đủ, bản xuất trực tiếp từ Figma node 123:497" width="295" height="90" /></div>
      <div className="sa-logo-feature-detail">
        <p className="sa-logo-kicker">BẢN XUẤT TRỰC TIẾP · 123:497</p>
        <h3>SmartAds · bản đối chiếu Figma</h3>
        <p>SVG và PNG xuất trực tiếp, giữ nền tím nhạt của node 123:497. Đây là bản đối chiếu 295 × 90 px, không phải file logo tách nền.</p>
        <div className="sa-logo-download-row">
          <Download href="/brand/logo-library/smartads-full-light.svg" label="Tải SVG" filename="smartads-full-light.svg" />
          <Download href="/brand/logo-library/smartads-full-light.png" label="Tải PNG" filename="smartads-full-light.png" />
        </div>
      </div>
    </section>

    <div className="sa-logo-catalog-controls">
      <label className="sa-logo-search-label" htmlFor="sa-logo-search">Tìm biến thể hoặc mã nhóm</label>
      <div className="sa-logo-control-row">
        <input id="sa-logo-search" type="search" value={query} onChange={event => search(event.target.value)} placeholder="Tìm trong 177 tài sản…" />
        <label className="sa-logo-preview-select">Nền xem trước
          <select value={previewMode} onChange={event => setPreviewMode(event.target.value)}>
            <option value="auto">Tự động</option><option value="light">Sáng</option><option value="dark">Tối</option><option value="contrast">Nửa sáng/tối</option>
          </select>
        </label>
      </div>
    </div>
    <div className="sa-logo-category-list" role="group" aria-label="Lọc nhóm logo">
      <button type="button" aria-pressed={category === 'all'} onClick={() => selectCategory('all')}>Tất cả <span>{manifest.assets.length}</span></button>
      {categories.map(name => <button key={name} type="button" aria-pressed={category === name} onClick={() => selectCategory(name)}>{name} <span>{counts.get(name)}</span></button>)}
    </div>
    <p className="sa-logo-contrast-guidance">Tag Light/Dark chỉ nền xem trước có độ tương phản tốt hơn theo phép đo 3:1 trên phần lớn nét logo; đây không phải quy tắc sử dụng thương hiệu trong Figma. Các bản gắn “Cần rà soát” chưa đạt ngưỡng kiểm tra trên cả hai nền.</p>
    <p className="sa-logo-result-count" role="status">Hiển thị {visible.length} / {filtered.length} tài sản{category !== 'all' ? ` · ${category}` : ''}{query ? ` · “${query}”` : ''}</p>
    {visible.length ? <div className="sa-logo-asset-grid">{visible.map(asset => <AssetCard key={asset.svg} asset={asset} previewMode={previewMode} />)}</div>
      : <p className="sa-logo-no-results">Không tìm thấy biến thể phù hợp. Thử tên hoặc mã nhóm khác.</p>}
    {filtered.length > visible.length && <button className="sa-logo-more" type="button" onClick={() => setLimit(value => value + 24)}>Xem thêm {Math.min(24, filtered.length - visible.length)} tài sản</button>}
    <p className="sa-logo-render-note">PNG trong catalog là bản render nền trong suốt từ SVG Figma; bản full-light phía trên là file xuất trực tiếp.</p>
  </div>;
}
