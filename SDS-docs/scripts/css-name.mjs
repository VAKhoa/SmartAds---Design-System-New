// Quy tắc duy nhất đổi tên token Figma → tên CSS custom property.
// Dùng chung cho website/scripts/generate-theme.mjs và scripts/build-tokens.mjs.
// Quy tắc: chữ thường; bỏ nội dung trong ngoặc ( ); mọi dấu cách, "/" hoặc "_" → "-"; gộp "-" liên tiếp; bỏ "-" ở hai đầu.

export function slugToken(name) {
  return String(name)
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/%/g, '')
    .replace(/[\s/_.]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function cssVarName(prefix, name) {
  return `--${prefix}-${slugToken(name)}`;
}

export function isValidCssVarName(v) {
  return /^--[a-z][a-z0-9]*(-[a-z0-9]+)+$/.test(v);
}
