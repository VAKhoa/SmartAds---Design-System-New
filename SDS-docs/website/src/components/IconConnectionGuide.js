export default function IconConnectionGuide() {
  return <figure className="sa-icon-connection" aria-label="Ba bước kết nối MingCute với SmartAds">
    <figcaption className="sa-icon-connection-caption">LUỒNG SỬ DỤNG · MINGCUTE CORE</figcaption>
    <ol className="sa-icon-connection-steps">
      <li>
        <div className="sa-icon-connection-art sa-icon-connection-art-repo" aria-hidden="true">
          <span className="sa-icon-connection-window"><i /><i /><i /></span>
          <span className="sa-icon-connection-branch"><i /><i /><i /></span>
          <span className="sa-icon-connection-art-label">mingcute-icons</span>
        </div>
        <span className="sa-icon-connection-index">01 · NGUỒN</span>
        <strong>GitHub chính thức</strong>
        <span>README và giấy phép Apache-2.0</span>
      </li>
      <li>
        <div className="sa-icon-connection-art sa-icon-connection-art-terminal" aria-hidden="true">
          <span className="sa-icon-connection-window"><i /><i /><i /></span>
          <span className="sa-icon-connection-prompt">$ npm install</span>
          <span className="sa-icon-connection-package">@mingcute/svg@3.1.0</span>
        </div>
        <span className="sa-icon-connection-index">02 · CÀI ĐẶT</span>
        <strong>Khóa phiên bản SVG</strong>
        <span>Core Regular hoặc Core Filled</span>
      </li>
      <li>
        <div className="sa-icon-connection-art sa-icon-connection-art-asset" aria-hidden="true">
          <span className="sa-icon-connection-asset-tile"><img src="/mingcute/core-regular/home-1.svg" width="27" height="27" alt="" /></span>
          <span className="sa-icon-connection-asset-name">home-1.svg</span>
          <span className="sa-icon-connection-asset-code">&lt;/&gt;</span>
        </div>
        <span className="sa-icon-connection-index">03 · SỬ DỤNG</span>
        <strong>Đưa vào SmartAds</strong>
        <span>SVG trong HTML/CSS/JS thuần</span>
      </li>
    </ol>
    <div className="sa-icon-connection-footer">
      <p>Đọc mã nguồn và chọn đúng gói public trước khi đưa SVG vào sản phẩm.</p>
      <a className="sa-icon-github-link" href="https://github.com/mingcute-design/mingcute-icons" target="_blank" rel="noopener noreferrer">
        <img className="sa-icon-github-mark sa-icon-github-mark-light" src="/brand/github-light.svg" width="20" height="20" alt="" />
        <img className="sa-icon-github-mark sa-icon-github-mark-dark" src="/brand/github-dark.svg" width="20" height="20" alt="" />
        <span>GitHub MingCute</span><span className="sr-only"> (mở tab mới)</span>
      </a>
    </div>
  </figure>;
}
