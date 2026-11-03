// Original SVG layers and geometry from Figma component 123:497 (294.75 × 90).
// Scale the composed group uniformly; keep each SVG's native dimensions intact.
export default function Logo({ dark = false }) {
  const asset = name => `/brand/smartads-${dark ? 'dark-' : ''}${name}.svg`;
  return <span className="sa-logo" role="img" aria-label="SmartAds — Powered by FPT Online" data-figma-node={dark ? '15828:129796' : '123:497'}>
    <span className="sa-logo-native">
      <img className="sa-logo-symbol" src={asset('symbol')} width="65.25" height="90" alt="" />
      <span className="sa-logo-type">
        <img src={asset('wordmark')} width="211.5" height="36" alt="" />
        <span className="sa-logo-signature"><img src={asset('powered-by')} width="124.675" height="18" alt="" /><img src="/brand/smartads-fpt-online.svg" width="80.0751" height="28.6364" alt="" /></span>
      </span>
    </span>
  </span>;
}
