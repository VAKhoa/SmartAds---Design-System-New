import Icon from './Icon';

export default function AiSourceFiles({ files }) {
  return <section className="sa-ai-files" aria-labelledby="sa-ai-files-title">
    <div className="sa-ai-files-heading">
      <p className="sa-ai-files-eyebrow">Tài liệu nguồn</p>
      <h2 id="sa-ai-files-title">Mở file Markdown</h2>
      <p>Quy tắc và hướng dẫn gốc để làm việc với SDS.</p>
    </div>
    <div className="sa-ai-files-grid">
      {files.map(file => <a key={file.path} href={file.href} className="sa-ai-file-card">
        <span className="sa-ai-file-icon"><Icon name="file" size={22} stroke={1.75}/></span>
        <span className="sa-ai-file-copy"><strong>{file.path}</strong><span className="sa-ai-file-description">{file.description}</span></span>
        <Icon name="arrow" size={18} className="sa-ai-file-arrow"/>
      </a>)}
    </div>
  </section>;
}
