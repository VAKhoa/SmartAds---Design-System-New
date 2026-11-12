export const figmaResourcePage = {
  id: 'resource/figma',
  href: '/resource/figma/',
  file: 'resource/figma.md',
  section: 'Resource',
  icon: 'figma',
};

export function getFigmaUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['figma.com', 'www.figma.com'].includes(url.hostname) ? url.href : null;
  } catch { return null; }
}
