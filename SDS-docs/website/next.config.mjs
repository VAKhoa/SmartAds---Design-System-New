import { fileURLToPath } from 'node:url';

export default {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
  poweredByHeader: false,
};
