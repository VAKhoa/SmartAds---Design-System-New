export default function SourceFileLinks({ files }) {
  return <section className="sa-ai-files" aria-labelledby="sa-ai-files-title">
    <div className="sa-ai-files-heading">
      <p className="sa-ai-files-eyebrow">Tài liệu nguồn</p>
      <h2 id="sa-ai-files-title">Mở file Markdown</h2>
      <p>Chọn file để mở nội dung Markdown gốc.</p>
    </div>
    <div className="sa-ai-files-grid">
      {files.map(file => <a key={file.path} href={file.href} className="sa-ai-file-card">
        <span className="sa-ai-file-icon" aria-hidden="true">
          <img className="sa-ai-file-sheet sa-ai-file-asset-light" src="/brand/ai-file-light.svg" width="32" height="40" alt=""/>
          <img className="sa-ai-file-corner sa-ai-file-asset-light" src="/brand/ai-file-corner-light.svg" width="12" height="12" alt=""/>
          <img className="sa-ai-file-code sa-ai-file-asset-light" src="/brand/ai-file-code-light.svg" width="16" height="16" alt=""/>
          <img className="sa-ai-file-sheet sa-ai-file-asset-dark" src="/brand/ai-file-dark.svg" width="32" height="40" alt=""/>
          <img className="sa-ai-file-corner sa-ai-file-asset-dark" src="/brand/ai-file-corner-dark.svg" width="12" height="12" alt=""/>
          <img className="sa-ai-file-code sa-ai-file-asset-dark" src="/brand/ai-file-code-dark.svg" width="16" height="16" alt=""/>
        </span>
        <span className="sa-ai-file-copy"><strong>{file.path}</strong><span className="sa-ai-file-description">{file.description}</span></span>
      </a>)}
    </div>
  </section>;
}
