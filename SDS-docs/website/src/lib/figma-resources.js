export const figmaResourcePage = {
  id: 'resource/figma',
  title: 'Figma files',
  href: '/resource/figma/',
  description: 'Các file thiết kế SmartAds được tập hợp để designer và developer cùng sử dụng.',
  searchText: 'Resource Figma file thư viện thiết kế variables styles component library',
  icon: 'figma',
  headings: [],
};

export function getFigmaUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['figma.com', 'www.figma.com'].includes(url.hostname) ? url.href : null;
  } catch { return null; }
}
