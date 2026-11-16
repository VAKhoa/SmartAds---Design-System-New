// Danh sách token Figma mà theme website (figma.generated.css) lấy từ snapshot.
// generate-theme.mjs và scripts/build-tokens.mjs cùng đọc file này để nhóm "A" (khớp Figma + repo) không bị lệch.

export const colorNames = [
  'background/neutral', 'background/secondary', 'background/primary-selected',
  'background/gray', 'text/on-primary-black-inverse', 'text/on-primary-black-weak',
  'text/primary-white', 'text/primary-green', 'text/secondary',
  'border/gray-muted', 'border/primary', 'border/primary-hover',
  'border/secondary-hover', 'text/accent-hover',
];

export const dimensionNames = ['spacing/xs', 'spacing/sm', 'spacing/md', 'spacing/xl', 'radius/sm', 'radius/md', 'radius/lg'];

// Primitive màu (collection "Primitives ", mode Value) thay cho hex hard-code trong CSS docs.
export const primitiveColorNames = [
  'color/primary/200', 'color/primary/300', 'color/primary/500',
  'color/neutral/950', 'color/neutral/400', 'color/neutral/700', 'color/base/white',
];
