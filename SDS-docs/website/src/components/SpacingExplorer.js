'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import SpacingValue, { pxToRem } from './SpacingValue';

function CopyButton({ value, onCopy, className = '', children, label }) {
  return <button type="button" className={`sa-spacing-copy ${className}`.trim()}
    onClick={() => onCopy(value)} title={`Sao chép ${value}`} aria-label={label || `Sao chép ${value}`}>
    {children}<Icon name="copy" size={14} />
  </button>;
}

function ExamplePanel({ title, range, children, className = '' }) {
  const [showSpecs, setShowSpecs] = useState(false);
  return <section className={`sa-spacing-example ${className}`} aria-label={title}>
    <div className="sa-spacing-example-head">
      <div><h3>{title}</h3><p>{range}</p></div>
      <button type="button" className="sa-spacing-inspect-toggle" aria-pressed={showSpecs}
        onClick={() => setShowSpecs(value => !value)}>
        {showSpecs ? 'Hide Spacing Specs' : 'Show Spacing Specs'}
      </button>
    </div>
    <div className={`sa-spacing-example-stage${showSpecs ? ' is-inspecting' : ''}`}>
      {children}
    </div>
  </section>;
}

const tabNames = ['CSS Variables', 'Helper', 'Best Practices'];

export default function SpacingExplorer({ rows, exceptions, readDate, sourceHref }) {
  const [copyNotice, setCopyNotice] = useState('');
  const [tab, setTab] = useState(0);
  const noticeTimer = useRef(null);
  const tabRefs = useRef([]);

  useEffect(() => () => clearTimeout(noticeTimer.current), []);

  async function copyText(value) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      setCopyNotice(`Copied! ${value}`);
    } catch {
      setCopyNotice('Không thể sao chép. Hãy chọn giá trị trực tiếp.');
    }
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setCopyNotice(''), 3500);
  }

  function onTabKeyDown(event, index) {
    const next = event.key === 'ArrowRight' ? (index + 1) % tabNames.length
      : event.key === 'ArrowLeft' ? (index + tabNames.length - 1) % tabNames.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? tabNames.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus();
  }

  const cssCode = [':root {', ...rows.map(row =>
    `  ${row.token}: ${pxToRem(row.px)}; /* ${row.px}px = ${pxToRem(row.px)} · ${row.figmaName} */`
  ), '}'].join('\n');
  const helperCode = 'export function pxToRem(px: number, base = 16): string {\n  return `${px / base}rem`;\n}';
  const practicesText = 'Do: dùng gap và token đã duyệt; giữ giá trị ngoại lệ có nguồn Figma.\nDon’t: dùng margin lồng nhau để giả gap; ép mọi spacing thành bội số 4px (0.25rem).';
  const tabCopy = [cssCode, helperCode, practicesText];

  return <div className="sa-spacing-page">
    <div className="sa-spacing-toast" role="status" aria-live="polite" aria-atomic="true">{copyNotice}</div>

    <section id="overview" className="sa-spacing-hero" aria-labelledby="sa-spacing-overview-title">
      <div className="sa-spacing-hero-copy">
        <span className="sa-spacing-kicker">FOUNDATION <span aria-hidden="true">/</span> SPACING</span>
        <h2 id="sa-spacing-overview-title">Một thang, hai đơn vị</h2>
        <p>Tra cứu px và rem cùng tên, ID Figma của từng mức khoảng cách trước khi áp dụng vào giao diện.</p>
        <div className="sa-spacing-hero-source"><strong>13 mức chính</strong><span>Collection Spacing · mode sm</span><span>Bản export {readDate}</span></div>
      </div>
      <div className="sa-spacing-hero-scale" aria-label="Một số mức trên thang spacing: 4px bằng 0.25rem, 8px bằng 0.5rem, 12px bằng 0.75rem và 16px bằng 1rem">
        <span className="sa-spacing-scale-label">BƯỚC CƠ SỞ · 4px (0.25rem)</span>
        {[4, 8, 12, 16].map(px => <div className="sa-spacing-scale-row" key={px}><span className="sa-spacing-scale-bar" style={{ width: `${px * 4}px` }}/><span>{px}px <small>({pxToRem(px)})</small></span></div>)}
      </div>
    </section>

    <div className="sa-spacing-highlights" aria-label="Ba thông số cơ sở">
      <div className="sa-spacing-highlight"><span>01 / BASE UNIT</span><SpacingValue px={4} onCopy={copyText} className="sa-spacing-highlight-value"/><p>Bước ưu tiên của bố cục; ngoại lệ Figma được giữ lại.</p></div>
      <div className="sa-spacing-highlight"><span>02 / ROOT FONT SIZE</span><SpacingValue px={16} onCopy={copyText} className="sa-spacing-highlight-value"/><p>Cơ sở quy đổi dùng trong tài liệu và ví dụ code.</p></div>
      <div className="sa-spacing-highlight"><span>03 / FORMULA</span><strong className="sa-spacing-formula">rem = px / 16</strong><p>Quy đổi sẵn trong nội dung; không có calculator trên trang.</p></div>
    </div>

    <section id="rule" className="sa-spacing-section" aria-labelledby="sa-spacing-rule-title">
      <div className="sa-spacing-section-head"><span className="sa-spacing-section-index">01 / DISPLAY RULE</span><h2 id="sa-spacing-rule-title">Luôn đọc được cả px và rem</h2><p>Mỗi con số trên trang có một đơn vị để đối chiếu thiết kế và một đơn vị để đưa vào code. Click vào cụm giá trị để copy; thông báo chỉ xuất hiện khi Clipboard thành công.</p></div>
      <div className="sa-spacing-rule-sample"><div><span>INLINE</span><p>Khoảng cách giữa icon và nhãn: <SpacingValue px={8} onCopy={copyText}/>.</p></div><div><span>STACKED</span><SpacingValue px={24} mode="stacked" onCopy={copyText}/></div><div><span>CSS TOKEN</span><CopyButton value="var(--sa-space-6)" onCopy={copyText} className="sa-spacing-token-badge"><code>var(--sa-space-6)</code></CopyButton></div></div>
    </section>

    <section id="scale" className="sa-spacing-section" aria-labelledby="sa-spacing-scale-title">
      <div className="sa-spacing-section-head"><span className="sa-spacing-section-index">02 / TOKEN SCALE</span><h2 id="sa-spacing-scale-title">Spacing scale</h2><p>13 tên CSS numeric đã được duyệt cho trang docs. Tên Figma, ID và giá trị lấy từ snapshot; gói token cho sản phẩm chưa phát hành.</p></div>
      <div className="sa-spacing-table-wrap" role="region" aria-label="Bảng 13 spacing tokens" tabIndex="0">
        <table className="sa-spacing-table"><thead><tr><th scope="col">Token / CSS Variable</th><th scope="col">Multiplier</th><th scope="col">Pixels (px)</th><th scope="col">REM (rem)</th><th scope="col">Visual Preview</th><th scope="col">SmartAds Usage Context</th></tr></thead>
          <tbody>{rows.map(row => <tr key={row.token}>
            <td><CopyButton value={`var(${row.token})`} onCopy={copyText} className="sa-spacing-token-badge"><code>{row.token}</code></CopyButton><small className="sa-spacing-figma-name">{row.figmaName}</small></td>
            <td className="sa-spacing-multiplier">{row.multiplier}</td>
            <td><SpacingValue px={row.px} mode="stacked" copy="px" onCopy={copyText}/></td>
            <td><CopyButton value={pxToRem(row.px)} onCopy={copyText} className="sa-spacing-rem-copy"><strong>{pxToRem(row.px)}</strong></CopyButton></td>
            <td><div className="sa-spacing-preview" role="img" aria-label={`Thanh rộng ${row.px}px, ${pxToRem(row.px)}`}><span className={`sa-spacing-preview-bar${row.px === 0 ? ' is-zero' : ''}`} style={{ width: `${row.px}px` }} /></div><small>{row.px}px · {pxToRem(row.px)}</small></td>
            <td className="sa-spacing-usage">{row.usage}<small>{row.figmaId}</small></td>
          </tr>)}</tbody></table>
      </div>
      <p className="sa-spacing-table-note">Table cell được xác minh: padding ngang 12px (0.75rem) · <code>VariableID:15044:691533</code>; padding dọc 8px (0.5rem) · <code>VariableID:15044:691534</code>; content gap 8px (0.5rem) · <code>VariableID:15044:691535</code>. Các usage khác là ví dụ đề xuất.</p>
    </section>

    <section id="exceptions" className="sa-spacing-section" aria-labelledby="sa-spacing-exceptions-title">
      <div className="sa-spacing-section-head"><span className="sa-spacing-section-index">03 / SOURCE CHECK</span><h2 id="sa-spacing-exceptions-title">Giá trị Figma ngoài bảng chính</h2><p>Bảng numeric giúp tra cứu nhanh nhưng không xóa các variable đang có trong Figma. Khi một node dùng ngoại lệ, giữ đúng ID và giá trị nguồn.</p></div>
      <div className="sa-spacing-exception-grid">{exceptions.map(item => <div className="sa-spacing-exception" key={item.id}><code>{item.name}</code><SpacingValue px={item.px} onCopy={copyText}/><small>{item.id}</small></div>)}</div>
      <p className="sa-spacing-collision"><strong>Hai token khác nhau:</strong> <code>spacing/lg (Base)</code> = 16px (1rem), còn <code>spacing/lg</code> = 18px (1.125rem). Bảng numeric ánh xạ <code>--sa-space-4</code> tới token đầu tiên.</p>
    </section>

    <section id="application" className="sa-spacing-section" aria-labelledby="sa-spacing-application-title">
      <div className="sa-spacing-section-head"><span className="sa-spacing-section-index">04 / APPLICATION</span><h2 id="sa-spacing-application-title">Khoảng cách trong Table Cell</h2><p>Ví dụ này dùng đúng ba variable của component Table Cell trong bản export Figma. Sơ đồ chỉ thể hiện vị trí padding và gap; nội dung ô là placeholder, không đại diện một màn hình sản phẩm.</p></div>
      <div className="sa-spacing-examples">
        <ExamplePanel title="Table Cell · cấu tạo khoảng cách" range="Component Table Cell trong Figma · 3 variable binding" className="sa-spacing-example-table-cell">
          <div className="sa-spacing-cell-demo">
            <div className="sa-spacing-cell-schematic"><span className="sa-spacing-cell-content"><i aria-hidden="true"/><span>Content</span></span></div>
            <div className="sa-spacing-cell-legend">
              <div><span className="sa-spacing-cell-key is-pink"/><span>Padding ngang</span><strong>12px <small>(0.75rem)</small></strong><code>15044:691533</code></div>
              <div><span className="sa-spacing-cell-key is-blue"/><span>Padding dọc</span><strong>8px <small>(0.5rem)</small></strong><code>15044:691534</code></div>
              <div><span className="sa-spacing-cell-key is-green"/><span>Content gap</span><strong>8px <small>(0.5rem)</small></strong><code>15044:691535</code></div>
            </div>
          </div>
        </ExamplePanel>
      </div>
    </section>

    <section id="implementation" className="sa-spacing-section" aria-labelledby="sa-spacing-implementation-title">
      <div className="sa-spacing-section-head"><span className="sa-spacing-section-index">05 / BUILD</span><h2 id="sa-spacing-implementation-title">Developer implementation</h2><p>Copy CSS token hoặc helper để áp dụng theo môi trường code. Bộ numeric này là API của trang docs được duyệt; chưa phải package token sản phẩm.</p></div>
      <div className="sa-spacing-code-frame"><div className="sa-spacing-code-toolbar"><div role="tablist" aria-label="Ví dụ triển khai spacing" className="sa-spacing-code-tabs">{tabNames.map((name, index) => <button type="button" role="tab" key={name} id={`sa-spacing-tab-${index}`} aria-controls={`sa-spacing-panel-${index}`} aria-selected={tab === index} tabIndex={tab === index ? 0 : -1} ref={node => { tabRefs.current[index] = node; }} onClick={() => setTab(index)} onKeyDown={event => onTabKeyDown(event, index)}>{name}</button>)}</div><CopyButton value={tabCopy[tab]} onCopy={copyText} className="sa-spacing-copy-code" label={`Sao chép ${tabNames[tab]}`}><span>Copy</span></CopyButton></div>
        <div role="tabpanel" id={`sa-spacing-panel-${tab}`} aria-labelledby={`sa-spacing-tab-${tab}`} tabIndex="0" className="sa-spacing-code-panel">{tab < 2 ? <pre><code>{tabCopy[tab]}</code></pre> : <div className="sa-spacing-practices"><div><strong>Do</strong><ul><li>Dùng <code>gap</code> cho các phần tử cùng nhóm.</li><li>Dùng token có mapping Figma và giữ ngoại lệ có nguồn.</li><li>Đọc song song 8px (0.5rem) trong tài liệu.</li></ul></div><div><strong>Don’t</strong><ul><li>Chồng nhiều <code>margin</code> để mô phỏng cùng một gap.</li><li>Ép mọi spacing về bội số 4px (0.25rem).</li><li>Coi token docs là package sản phẩm đã phát hành.</li></ul></div></div>}</div>
      </div>
    </section>

    <section id="source" className="sa-spacing-section sa-spacing-source" aria-labelledby="sa-spacing-source-title"><div className="sa-spacing-section-head"><span className="sa-spacing-section-index">06 / TRACEABILITY</span><h2 id="sa-spacing-source-title">Nguồn và giới hạn</h2></div><p>Giá trị và ID lấy từ collection <code>Spacing</code>, mode <code>sm</code> và các binding <code>component/table/cell/*</code> trong bản export Figma ngày 02/11/2026. Chưa đối chiếu lại thuộc tính node trong Figma hiện tại. Bộ numeric <code>--sa-space-*</code> được duyệt cho trang docs; việc phát hành token package sản phẩm là bước riêng. Sơ đồ Table Cell là cách giải thích ba binding, không phải ảnh chụp UI.</p><a className="sa-spacing-source-link" href={sourceHref}>Mở Markdown gốc: foundation/spacing.md</a></section>
  </div>;
}
