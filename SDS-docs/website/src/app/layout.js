import '../styles/public-sans.css';
import '../styles/figma.generated.css';
import '../styles/globals.css';
import '../styles/color-showcase.css';
import '../styles/typography-showcase.css';

export const metadata = {
  title: { default: 'SDS — SmartAds Design System', template: '%s · SDS' },
  description: 'Tài liệu SmartAds Design System dành cho designer, developer và AI agent.',
  robots: { index: false, follow: false },
  icons: { icon: '/brand/smartads-favicon.svg?v=123-499' },
};

const themeScript = `(function(){try{var t=localStorage.getItem('sds-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){}})();`;

export default function RootLayout({ children }) {
  return <html lang="vi" suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
    <body>{children}</body>
  </html>;
}
