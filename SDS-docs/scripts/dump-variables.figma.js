// Đọc-only. Chạy qua Figma MCP (use_figma) hoặc trong plugin tạm của Figma.
// Cách dùng: đặt COLLECTION = '' để lấy tổng quan; đặt tên collection để lấy chi tiết biến.
// Kết quả: JSON theo định dạng "flat" mà scripts/ds-tokens.mjs đọc được.
const COLLECTION = ''; // ví dụ: 'Alias', 'Spacing'

const cols = await figma.variables.getLocalVariableCollectionsAsync();

if (!COLLECTION) {
  const overview = [];
  for (const c of cols) {
    const byType = {};
    for (const id of c.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(id);
      if (v) byType[v.resolvedType] = (byType[v.resolvedType] || 0) + 1;
    }
    overview.push({ collection: c.name, id: c.id, modes: c.modes.map(m => m.name), count: c.variableIds.length, byType });
  }
  const ts = await figma.getLocalTextStylesAsync();
  const es = await figma.getLocalEffectStylesAsync();
  const ps = await figma.getLocalPaintStylesAsync();
  return { kind: 'overview', collections: overview, styles: { text: ts.length, effect: es.length, paint: ps.length } };
}

const col = cols.find(c => c.name === COLLECTION);
if (!col) return { error: 'collection not found', available: cols.map(c => c.name) };

const nameById = {};
const toHex = (c) => {
  const h = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
  const base = '#' + h(c.r) + h(c.g) + h(c.b);
  return c.a !== undefined && c.a < 1 ? base + h(c.a) : base;
};
const serialize = async (val) => {
  if (val && typeof val === 'object' && val.type === 'VARIABLE_ALIAS') {
    if (!nameById[val.id]) {
      const t = await figma.variables.getVariableByIdAsync(val.id);
      nameById[val.id] = t ? t.name : val.id;
    }
    return { alias: nameById[val.id] };
  }
  if (val && typeof val === 'object' && 'r' in val) return toHex(val);
  return val;
};

const variables = [];
for (const id of col.variableIds) {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) continue;
  const values = {};
  for (const m of col.modes) values[m.name] = await serialize(v.valuesByMode[m.modeId]);
  variables.push({
    collection: col.name, name: v.name, type: v.resolvedType,
    description: v.description || '', scopes: v.scopes, hidden: v.hiddenFromPublishing, values
  });
}
return { kind: 'variables', collection: col.name, modes: col.modes.map(m => m.name), count: variables.length, variables };
