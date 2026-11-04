import catalog from '../data/typography.generated.json';

const brandFamilies = [
  'Display-2xl', 'Display-xl', 'Display-lg', 'Display-md', 'Display-sm', 'Display-xs',
  'Body-xl', 'Body-lg', 'Body-md', 'Body-sm', 'Body-xs',
  'Microscope', 'Body-caption', 'Body-caption-sub', 'Tini',
];
const styles = new Map(catalog.styles.map(style => [style.name, style]));
const weights = ['Regular', 'Medium', 'Semi', 'Bold'];

function lineHeight(style) {
  return style.lineHeight.unit === 'PERCENT' ? Number((style.lineHeight.value / 100).toFixed(2)) : 'normal';
}

function lineHeightLabel(style) {
  return style.lineHeight.unit === 'PERCENT' ? `${Math.round(style.lineHeight.value)}%` : 'AUTO';
}

function weight(style) {
  return style.fontWeight ?? ({ Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 }[style.fontStyle] || 400);
}

function TypeRow({ family }) {
  const isDisplay = family.startsWith('Display');
  const style = styles.get(`Brand/${family}/${isDisplay ? 'Bold' : 'Regular'}`);
  return <div className="sa-type-row">
    <div className="sa-type-row-label">
      <strong>{family}</strong>
      <span>{style.fontSize}px · {lineHeightLabel(style)} · {weight(style)}</span>
    </div>
    <div className="sa-type-row-example" style={{ fontSize: style.fontSize, fontWeight: weight(style), lineHeight: lineHeight(style) }} aria-label={`Mẫu ${style.name}`}>
      {style.fontSize >= 32 ? 'Aa' : 'SmartAds rõ ràng'}
    </div>
  </div>;
}

export default function TypographyShowcase() {
  const brand = catalog.styles.filter(style => style.name.startsWith('Brand/'));
  return <section className="sa-type-studio" aria-labelledby="sa-type-studio-title">
    <div className="sa-type-heading">
      <div>
        <p className="sa-type-eyebrow">SDS · Typography foundation</p>
        <h2 id="sa-type-studio-title">Hệ chữ SmartAds</h2>
        <p>Specimen theo thông số text styles trong bản export Figma ngày 02/11/2026. Tên và kích thước được giữ nguyên để đối chiếu với file thiết kế.</p>
      </div>
      <div className="sa-type-counts" aria-label={`${catalog.styles.length} text styles và ${catalog.variables.length} Text variables`}>
        <span><strong>{catalog.styles.length}</strong> text styles</span>
        <span><strong>{catalog.variables.length}</strong> Text variables</span>
      </div>
    </div>

    <div className="sa-type-intro">
      <div className="sa-type-intro-meta"><span>Primary typeface</span><strong>Public Sans</strong><small>Brand styles · Regular / Medium / Semi / Bold</small></div>
      <p className="sa-type-intro-sample" lang="vi">Chữ rõ ràng.<br />Ý tưởng vươn xa.</p>
    </div>

    <div className="sa-type-section-heading"><h3>Thang chữ Brand</h3><p>Specimen là mẫu trực quan. Các tên style và thông số chính xác nằm trong bảng kiểm kê bên dưới.</p></div>
    <div className="sa-type-scale">
      {brandFamilies.map(family => <TypeRow key={family} family={family} />)}
    </div>

    <div className="sa-type-section-heading"><h3>Độ đậm</h3><p>Bốn weight của `Brand/Body-md/*` được hiển thị ở cỡ gốc 18px.</p></div>
    <div className="sa-type-weight-grid">
      {weights.map(name => {
        const style = styles.get(`Brand/Body-md/${name}`);
        return <div className="sa-type-weight" key={name}>
          <span>{name} · {weight(style)}</span>
          <strong style={{ fontWeight: weight(style), fontSize: style.fontSize, lineHeight: lineHeight(style) }}>Aa Việt Nam</strong>
          <code>{style.name}</code>
        </div>;
      })}
    </div>

    <details className="sa-type-inventory">
      <summary>Kiểm kê toàn bộ {catalog.styles.length} text styles</summary>
      <p>Bảng lấy trực tiếp từ snapshot. `Bindings` cho biết thuộc tính nào đang gắn variable; ô trống nghĩa là snapshot không ghi binding.</p>
      <div className="sa-table-scroll" tabIndex="0" role="region" aria-label="Bảng text styles Figma">
        <table>
          <thead><tr><th>Style Figma / ID</th><th>Font</th><th>Size</th><th>Weight</th><th>Line-height</th><th>Spacing</th><th>Bindings</th></tr></thead>
          <tbody>{catalog.styles.map(style => <tr key={style.id}>
            <td><strong>{style.name}</strong><small>{style.id}</small></td>
            <td>{style.fontFamily} {style.fontStyle}</td>
            <td>{style.fontSize}px</td>
            <td>{style.fontWeight ?? '—'}</td>
            <td>{lineHeightLabel(style)}</td>
            <td>{style.letterSpacing?.unit === 'PERCENT' ? `${style.letterSpacing.value}%` : '—'}</td>
            <td>{style.bindings.length ? style.bindings.join(', ') : '—'}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </details>
    <p className="sa-type-note">{brand.length} Brand styles được xem trước bằng Public Sans cục bộ của website. Font của `Code/*` và `Ads/*` được ghi trong tài liệu nhưng không được thay thế bằng font mô phỏng.</p>
  </section>;
}
