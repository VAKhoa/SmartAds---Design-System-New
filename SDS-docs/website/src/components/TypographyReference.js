import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import documents from '../data/docs.generated.json';
import DocsShell from './DocsShell';
import '../styles/typography-reference.css';

const original = documents.find(item => item.id === 'foundation/typography');
const figmaPage = 'https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=68-1746&m=dev';
const figmaFrame = 'https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=11898-84498&m=dev';
const headings = [
  ['fonts', 'Font trong snapshot'], ['choose', 'Chọn từ style trên node'],
  ['styles', 'Text styles và binding'], ['code', 'Dùng trong code'],
  ['sizes', 'Text variables và font size'], ['catalog', 'Catalog 77 specimen'],
  ['review', 'Điểm cần review'],
].map(([id, text]) => ({ id, text, level: 2 }));
const document = {
  ...original,
  title: 'Typography',
  description: 'Font, text styles, Text variables và specimen từ bản chụp Figma SmartAds.',
  updated: '05/11/2026',
  headings,
};
const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));

const groups = [
  { id: 'catalog-display', title: 'Brand / Display', description: 'Sáu cỡ Display; mỗi cỡ có bốn weight trong snapshot.', match: name => name.startsWith('Brand/Display-') },
  { id: 'catalog-body', title: 'Brand / Body', description: 'Năm cỡ Body, gồm cả style Bold Balance bổ sung.', match: name => /^Brand\/Body-(xl|lg|md|sm|xs)\//.test(name) },
  { id: 'catalog-detail', title: 'Brand / chữ nhỏ', description: 'Microscope, caption, caption-sub và Tini được giữ nguyên tên Figma.', match: name => /^Brand\/(Microscope|Body-caption|Body-caption-sub|Tini)\//.test(name) },
  { id: 'catalog-code', title: 'Code', description: 'Một style DM Mono trong bản chụp.', match: name => name.startsWith('Code/') },
  { id: 'catalog-ads-merriweather', title: 'Ads / Merriweather', description: 'Mười style Ads dùng Merriweather.', match: name => name.startsWith('Ads/Merriweather/') },
  { id: 'catalog-ads-arial', title: 'Ads / Arial', description: 'Bốn style Ads dùng Arial; hai tên có bold nhưng fontStyle là Regular.', match: name => name.startsWith('Ads/Arial/') },
];

function numericWeight(style) {
  return style.fontName.variationSettings?.wght ?? { Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 }[style.fontName.style] ?? 400;
}
function lineHeightLabel(style) {
  return style.lineHeight.unit === 'PERCENT' ? Math.round(style.lineHeight.value) + '%' : 'AUTO';
}
function letterSpacingLabel(style) {
  if (!style.letterSpacing) return '—';
  return Number(style.letterSpacing.value.toFixed(2)) + (style.letterSpacing.unit === 'PERCENT' ? '%' : 'px');
}
function specimenStyle(style) {
  const family = style.fontName.family;
  const fallback = family === 'DM Mono' ? 'monospace' : family === 'Merriweather' ? 'serif' : 'sans-serif';
  const spacing = style.letterSpacing?.unit === 'PERCENT' ? (style.letterSpacing.value / 100) + 'em' : style.letterSpacing?.unit === 'PIXELS' ? style.letterSpacing.value + 'px' : '0';
  return {
    fontFamily: '"' + family + '", ' + fallback,
    fontSize: style.fontSize + 'px',
    fontWeight: numericWeight(style),
    lineHeight: style.lineHeight.unit === 'PERCENT' ? style.lineHeight.value / 100 : 'normal',
    letterSpacing: spacing,
  };
}
function specimenText(style) {
  if (style.name.startsWith('Code/')) return 'const size = 12;';
  return style.fontSize >= 28 ? 'Aa Đ 0123' : 'Aa Bb — Tiếng Việt 012345';
}
function issueFor(style) {
  const name = style.name;
  if (name === 'Brand/Body-xl/Semi') return 'Tên Semi, fontStyle Bold 700';
  if (name === 'Brand/Display-xs/Bold') return 'Line-height AUTO';
  if (name === 'Brand/Tini/Medium') return 'Thiếu binding fontSize';
  if (name.endsWith('Balance')) return 'Thiếu binding fontStyle';
  if (name === 'Ads/Arial/ads-arial-tini-sm-bold' || name === 'Ads/Arial/ads-arial-headline-sm-bold') return 'Tên bold, fontStyle Regular';
  return null;
}
function StyleRow({ style, variablesById }) {
  const bindings = Object.entries(style.boundVariables ?? {});
  const issue = issueFor(style);
  return <div className="sa-wf-style" data-style-name={style.name}>
    <div className="sa-wf-style-heading"><strong>{style.name}</strong>{issue && <span className="sa-wf-flag">Cần review</span>}</div>
    <div className="sa-wf-sample-window" role="img" aria-label={'Specimen ' + style.name}>
      <span className="sa-wf-sample" style={specimenStyle(style)} lang="vi">{specimenText(style)}</span>
    </div>
    <dl className="sa-wf-style-facts">
      <div><dt>Font</dt><dd>{style.fontName.family} · {style.fontName.style}{style.fontName.variationSettings?.wght ? ' (' + numericWeight(style) + ')' : ''}</dd></div>
      <div><dt>Size</dt><dd>{style.fontSize}px</dd></div>
      <div><dt>Line-height</dt><dd>{lineHeightLabel(style)}</dd></div>
      <div><dt>Letter spacing</dt><dd>{letterSpacingLabel(style)}</dd></div>
    </dl>
    <div className="sa-wf-style-trace"><span>Style ID</span><code>{style.id}</code></div>
    <div className="sa-wf-style-bindings"><span>Bindings</span>{bindings.length ? <ul>{bindings.map(([property, binding]) => <li key={property}><strong>{property}</strong><code>{binding.id}</code>{variablesById.get(binding.id) && <small>{variablesById.get(binding.id).name}</small>}</li>)}</ul> : <em>Không ghi trong snapshot</em>}</div>
    {issue && <p className="sa-wf-style-issue">{issue}. Giữ giá trị snapshot để đối chiếu; chưa sửa style Figma.</p>}
  </div>;
}
function StyleGroup({ group, styles, variablesById }) {
  const matches = styles.filter(style => group.match(style.name));
  const familyOf = style => style.name.split('/').slice(0, -1).join('/');
  const familyOrder = [...new Set(matches.map(familyOf))];
  matches.sort((a, b) => familyOrder.indexOf(familyOf(a)) - familyOrder.indexOf(familyOf(b)));
  let previousFamily = '';
  return <section id={group.id} className="sa-wf-catalog-group" aria-labelledby={group.id + '-title'}>
    <div className="sa-wf-group-head"><div><h3 id={group.id + '-title'}>{group.title}</h3><p>{group.description}</p></div><span>{matches.length} styles</span></div>
    <div className="sa-wf-style-list">{matches.map(style => {
      const family = familyOf(style);
      const showFamily = family !== previousFamily;
      previousFamily = family;
      return <div key={style.id}>{showFamily && <h4 className="sa-wf-family-label">{family}</h4>}<StyleRow style={style} variablesById={variablesById}/></div>;
    })}</div>
  </section>;
}

export default async function TypographyReference() {
  // Read the snapshot at build time to retain the exact binding IDs.
  const snapshotDir = join(process.cwd(), '..', 'variable-figma-export');
  const [stylesSnapshot, variablesSnapshot] = await Promise.all([
    readFile(join(snapshotDir, 'styles.json'), 'utf8').then(JSON.parse),
    readFile(join(snapshotDir, 'variables.text.json'), 'utf8').then(JSON.parse),
  ]);
  const styles = stylesSnapshot.text;
  const variables = variablesSnapshot.variables;
  const variablesById = new Map(variables.map(variable => [variable.id, variable]));
  const fontRows = [
    ['Brand/*', 'Public Sans', styles.filter(style => style.name.startsWith('Brand/')).length, 'Font của các style Brand và của website docs.'],
    ['Code/*', 'DM Mono', styles.filter(style => style.name.startsWith('Code/')).length, 'Chỉ thấy Code/Regular trong snapshot.'],
    ['Ads/Merriweather/*', 'Merriweather', styles.filter(style => style.name.startsWith('Ads/Merriweather/')).length, 'Font của nhóm Ads/Merriweather.'],
    ['Ads/Arial/*', 'Arial', styles.filter(style => style.name.startsWith('Ads/Arial/')).length, 'Font của nhóm Ads/Arial.'],
  ];
  const sizes = variables.filter(variable => variable.name.startsWith('typography/size/')).sort((a, b) => a.resolvedValues['Mode 1'] - b.resolvedValues['Mode 1']);
  const otherVariables = variables.filter(variable => !variable.name.startsWith('typography/size/'));
  const exampleStyle = styles.find(style => style.name === 'Brand/Body-sm/Regular');
  const codeExample = [
    '.local-example {',
    '  font-family: "' + exampleStyle.fontName.family + '", sans-serif;',
    '  font-size: ' + exampleStyle.fontSize + 'px;',
    '  font-weight: ' + numericWeight(exampleStyle) + ';',
    '  line-height: ' + Number((exampleStyle.lineHeight.value / 100).toFixed(2)) + ';',
    '  letter-spacing: ' + exampleStyle.letterSpacing.value + ';',
    '}',
  ].join('\n');

  return <DocsShell document={document} searchIndex={searchIndex}>
    <div className="sa-wireframe">
      <div className="sa-wf-notice"><strong>Dữ liệu draft</strong><span>Tên, ID và thông số lấy từ snapshot 02/11/2026; chưa phải API typography SDS đã phát hành. Nút Sao chép trang lấy Markdown gốc của bài này.</span></div>
      <div className="sa-wf-intro"><div className="sa-wf-intro-sample" aria-hidden="true">Aa<span>Đ</span></div><div><p>Trang Figma Typography có bốn frame: Introduction Typography, Typography Term, Typography và New Update Text Warp Style. Frame Typography cho thấy Public Sans Font Family và bảng Brand; các giá trị chi tiết dưới đây lấy từ bản export.</p><div className="sa-wf-source-links"><a href={figmaPage} target="_blank" rel="noreferrer">Mở trang Figma<span className="sr-only"> (tab mới)</span></a><a href={figmaFrame} target="_blank" rel="noreferrer">Mở frame Typography<span className="sr-only"> (tab mới)</span></a></div></div></div>
      <p className="sa-wf-count-line"><strong>{styles.length}</strong> text styles <span aria-hidden="true">/</span> <strong>{variables.length}</strong> Text variables <span aria-hidden="true">/</span> Mode 1 <span aria-hidden="true">/</span> Figma snapshot 02/11/2026</p>

      <section id="fonts" className="sa-wf-section" aria-labelledby="wf-fonts-title"><div className="sa-wf-section-head"><h2 id="wf-fonts-title">Font trong snapshot</h2><p>Font family được đọc từ từng text style, không gán thêm vai trò sản phẩm khi Figma chưa xác nhận.</p></div>
        <div className="sa-wf-table-wrap" role="region" aria-label="Bảng font của text styles" tabIndex="0"><table><thead><tr><th>Nhóm tên Figma</th><th>Font family</th><th>Styles</th><th>Bằng chứng hiện có</th></tr></thead><tbody>{fontRows.map(([group, family, count, evidence]) => <tr key={group}><td><strong>{group}</strong></td><td>{family}</td><td>{count}</td><td>{evidence}</td></tr>)}</tbody></table></div>
        <p className="sa-wf-help">Website docs đóng gói Public Sans. Specimen Code và Ads khai báo đúng tên font từ snapshot; trình duyệt có thể dùng fallback nếu DM Mono hoặc Merriweather chưa được cài. Thông số và Style ID vẫn hiển thị nguyên gốc để kiểm tra.</p>
      </section>

      <section id="choose" className="sa-wf-section" aria-labelledby="wf-choose-title"><div className="sa-wf-section-head"><h2 id="wf-choose-title">Chọn từ style trên node</h2><p>Bản chụp cho biết style nào tồn tại. Chưa có mapping vai trò như tiêu đề trang, nhãn nút hay thân bài được duyệt.</p></div>
        <ol className="sa-wf-steps"><li><strong>Đọc tên và Style ID</strong><span>Mở node thiết kế; ghi đúng style gắn vào lớp chữ. Đừng chọn chỉ theo tên Display, Body hoặc Ads.</span></li><li><strong>Đối chiếu thuộc tính thực</strong><span>Kiểm tra family, fontStyle, size, line-height, letter-spacing và variable binding ở catalog bên dưới.</span></li><li><strong>Kiểm tra ngữ cảnh sử dụng</strong><span>Nếu node chưa gắn style hoặc tên và giá trị xung đột, đưa vào review trước khi lập quy tắc dùng chung.</span></li></ol>
      </section>

      <section id="styles" className="sa-wf-section" aria-labelledby="wf-styles-title"><div className="sa-wf-section-head"><h2 id="wf-styles-title">Text styles và binding</h2><p>Mỗi text style là một tập thuộc tính quan sát được trong Figma. Binding chỉ cho biết thuộc tính đã nối variable nào trong bản export.</p></div>
        <div className="sa-wf-style-summary"><div><strong>Brand</strong><span>62 styles · Public Sans · Display, Body và chữ nhỏ</span></div><div><strong>Code</strong><span>1 style · DM Mono · letter-spacing 2%</span></div><div><strong>Ads</strong><span>14 styles · Merriweather và Arial · không ghi binding</span></div></div>
        <p>Trong snapshot, 77/77 style không ghi binding <code>lineHeight</code>. Hai variable family <code>typography/family/display</code> và <code>typography/family/text</code> cùng giải ra Public Sans; tên variable không chứng minh hai font khác nhau.</p>
      </section>

      <section id="code" className="sa-wf-section" aria-labelledby="wf-code-title"><div className="sa-wf-section-head"><h2 id="wf-code-title">Dùng trong code</h2><p>Ví dụ ánh xạ một style đã xác minh từ snapshot. Đây là CSS cục bộ minh họa, chưa phải class hoặc token API chính thức.</p></div>
        <div className="sa-wf-code-label"><strong>{exampleStyle.name}</strong><code>{exampleStyle.id}</code></div>
        <pre className="sa-wf-code"><code>{codeExample}</code></pre>
        <p className="sa-wf-help">Style trên bind <code>fontSize</code> trực tiếp tới <code>{exampleStyle.boundVariables.fontSize.id}</code>, <code>fontStyle</code> tới <code>{exampleStyle.boundVariables.fontStyle.id}</code> và <code>fontFamily</code> tới <code>{exampleStyle.boundVariables.fontFamily.id}</code>. CSS lấy giá trị đã giải từ snapshot; chưa có gói CSS SDS phát hành. Line-height 1.2 là của style sản phẩm, còn nội dung website docs dùng 200%.</p>
      </section>

      <section id="sizes" className="sa-wf-section" aria-labelledby="wf-sizes-title"><div className="sa-wf-section-head"><h2 id="wf-sizes-title">Text variables và font size</h2><p>Đủ 21 variable của collection Text, mode Mode 1. Giá trị font size sắp theo px để dễ so sánh; tên và ID giữ nguyên Figma.</p></div>
        <h3 className="sa-wf-subhead">15 biến size</h3>
        <div className="sa-wf-table-wrap" role="region" aria-label="Bảng 15 biến font size" tabIndex="0"><table><thead><tr><th>Variable Figma</th><th>Giá trị</th><th>Alias trong snapshot</th><th>Variable ID</th></tr></thead><tbody>{sizes.map(variable => { const value = variable.values['Mode 1']; return <tr key={variable.id}><td><strong>{variable.name}</strong></td><td>{variable.resolvedValues['Mode 1']}px</td><td>{value?.alias ?? '—'}{value?.variableId && <small className="sa-wf-cell-id">{value.variableId}</small>}</td><td><code className="sa-wf-id">{variable.id}</code></td></tr>; })}</tbody></table></div>
        <h3 className="sa-wf-subhead">2 family và 4 weight variables</h3>
        <div className="sa-wf-table-wrap" role="region" aria-label="Bảng biến font family và weight" tabIndex="0"><table><thead><tr><th>Variable Figma</th><th>Giá trị Mode 1</th><th>Variable ID</th></tr></thead><tbody>{otherVariables.map(variable => <tr key={variable.id}><td><strong>{variable.name}</strong></td><td>{variable.resolvedValues['Mode 1']}</td><td><code className="sa-wf-id">{variable.id}</code></td></tr>)}</tbody></table></div>
        <p className="sa-wf-help"><code>fs-xs = 16px</code> lớn hơn <code>fs-lg = 12px</code>. Đây là tên đang có trong Figma, chưa phải thang size được duyệt để dùng làm API.</p>
      </section>

      <section id="catalog" className="sa-wf-section" aria-labelledby="wf-catalog-title"><div className="sa-wf-section-head"><h2 id="wf-catalog-title">Catalog 77 specimen</h2><p>Mọi style trong snapshot đều có mẫu chữ, thông số, Style ID và binding. Mẫu chữ là chuỗi trung tính để kiểm tra dấu tiếng Việt và chữ số.</p></div>
        <nav className="sa-wf-jump" aria-label="Nhảy đến nhóm specimen">{groups.map(group => <a href={'#' + group.id} key={group.id}>{group.title}</a>)}</nav>
        {groups.map(group => <StyleGroup key={group.id} group={group} styles={styles} variablesById={variablesById}/>)}
      </section>

      <section id="review" className="sa-wf-section" aria-labelledby="wf-review-title"><div className="sa-wf-section-head"><h2 id="wf-review-title">Điểm cần review</h2><p>Trang giữ nguyên dữ liệu gốc, không tự sửa tên hoặc thông số trong Figma.</p></div>
        <ul className="sa-wf-review-list"><li><strong>Brand/Body-xl/Semi</strong> bind weight Semi nhưng fontStyle là Bold, weight 700.</li><li><strong>Brand/Display-xs/Bold</strong> dùng line-height AUTO; <strong>Brand/Tini/Medium</strong> thiếu binding fontSize.</li><li>Hai style <strong>Balance</strong> thiếu binding fontStyle; chưa có bằng chứng để suy ra quy tắc cân dòng.</li><li>Hai style <strong>Ads/Arial/*bold</strong> lưu fontStyle Regular dù tên có bold.</li><li>D2 về tên <strong>Tini</strong>, D4 về thang tên size, D8 về line-height đoạn dài còn mở. Cần đối chiếu Figma hiện tại trước khi chốt.</li></ul>
        <p className="sa-wf-help">Figma browser xác nhận cấu trúc bốn frame và bảng Public Sans/Brand; nội dung chi tiết của Introduction Typography và Typography Term chưa trích xuất được để kiểm chứng nguyên tắc hoặc thuật ngữ. Vì vậy trang này không suy ra quy tắc từ hai frame đó.</p>
      </section>
    </div>
  </DocsShell>;
}
