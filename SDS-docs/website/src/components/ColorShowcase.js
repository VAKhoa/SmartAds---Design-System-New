import catalog from '../data/color.generated.json';

const light = 'Accessible (Light Mode)';
const dark = 'Accessible (Dark Mode)';
const primitiveMap = new Map(catalog.primitives.map(item => [item.name, item]));
const aliasMap = new Map(catalog.aliases.map(item => [item.name, item]));

const palettes = [
  ['Primary', 'primary'],
  ['Secondary light', 'secondary light'],
  ['Secondary dark', 'secondary dark'],
  ['Gray', 'gray'],
  ['Green', 'green'],
  ['Blue', 'blue'],
  ['Yellow', 'yellow'],
  ['Orange', 'orange'],
  ['Red light', 'red light'],
  ['Red dark', 'red dark'],
];

const roles = [
  ['Nền trung tính', 'background/neutral'],
  ['Nền phụ', 'background/secondary'],
  ['Bề mặt nâng', 'surface/elevation'],
  ['Primary', 'surface/primary'],
  ['Hover', 'surface/primary-hover'],
  ['Pressed', 'surface/primary-press'],
  ['Viền phụ', 'border/secondary-muted'],
  ['Chữ phụ', 'text/secondary'],
];

function Swatch({ name, value }) {
  return <div className="sa-color-swatch">
    <div className="sa-color-swatch-paint" style={{ backgroundColor: value }} aria-label={`${name}: ${value}`} role="img" />
    <div className="sa-color-swatch-meta"><span>{name}</span><code>{value.toUpperCase()}</code></div>
  </div>;
}

export default function ColorShowcase() {
  return <section className="sa-color-studio" aria-labelledby="sa-color-studio-title">
    <div className="sa-color-studio-heading">
      <div>
        <p className="sa-color-eyebrow">SDS · Color foundation</p>
        <h2 id="sa-color-studio-title">Bảng màu SmartAds</h2>
        <p>Swatch từ bản chụp Figma ngày 02/11/2026. Tên variable đang có được giữ nguyên để bạn đối chiếu trực tiếp.</p>
      </div>
      <div className="sa-color-count" aria-label="484 color variables">
        <strong>484</strong><span>color variables</span>
      </div>
    </div>

    <div className="sa-color-mode-grid" aria-label="Giá trị semantic theo Light và Dark">
      {[['Light', light], ['Dark', dark]].map(([label, mode]) => <div className="sa-color-mode" key={label}>
        <div className="sa-color-mode-title"><span className="sa-color-mode-dot" /> <h3>{label} mode</h3><span>Alias collection</span></div>
        <div className="sa-color-role-list">
          {roles.map(([title, token]) => {
            const value = aliasMap.get(token)?.resolvedValues[mode];
            return <div className="sa-color-role" key={token}>
              <span className="sa-color-role-chip" style={{ backgroundColor: value }} />
              <span className="sa-color-role-name"><b>{title}</b><code>{token}</code></span>
              <code className="sa-color-role-value">{value?.toUpperCase()}</code>
            </div>;
          })}
        </div>
      </div>)}
    </div>

    <div className="sa-color-palette-heading"><h3>Primitives</h3><p>Giá trị gốc để tra cứu alias. Dùng token theo vai trò khi triển khai UI.</p></div>
    <div className="sa-color-palette-list">
      {palettes.map(([label, group]) => {
        const entries = [...primitiveMap.values()].filter(item => item.name.startsWith(`color/${group}/`) && /^\d+$/.test(item.name.split('/').at(-1))).sort((a, b) => Number(a.name.split('/').at(-1)) - Number(b.name.split('/').at(-1)));
        return <section className="sa-color-palette" key={group} aria-label={`${label} palette`}>
          <div className="sa-color-palette-label"><h4>{label}</h4><span>{entries.length} shades</span></div>
          <div className="sa-color-swatch-grid">{entries.map(item => <Swatch key={item.id} name={item.name.split('/').at(-1)} value={item.resolvedValues.Value} />)}</div>
        </section>;
      })}
    </div>
  </section>;
}
