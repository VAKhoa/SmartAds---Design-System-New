'use client';

import { useState } from 'react';
import Icon from './Icon';
import { getFigmaUrl } from '../lib/figma-resources';

function FigmaMark() {
  return <span className="sa-figma-mark" aria-hidden="true">
    {['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left'].map(part =>
      <img key={part} src={`/brand/figma/${part}.svg`} alt="" width="11.5" height="11.5"/>
    )}
  </span>;
}

function FigmaCard({ file }) {
  const [previewState, setPreviewState] = useState('loading');
  const href = getFigmaUrl(file.url);
  // Previews are optional local images in public/. Broken images fall back to the Figma mark.
  const thumbnail = typeof file.thumbnail === 'string' && /^\/(?!\/)/.test(file.thumbnail) ? file.thumbnail : null;
  const content = <>
    <div className="sa-figma-card-preview" aria-busy={Boolean(thumbnail && previewState === 'loading')}>
      <FigmaMark/>
      {thumbnail && previewState !== 'error' && <img className={`sa-figma-thumbnail${previewState === 'loaded' ? ' is-loaded' : ''}`}
        src={thumbnail} alt="" onLoad={() => setPreviewState('loaded')} onError={() => setPreviewState('error')}/>}
    </div>
    <div className="sa-figma-card-info">
      <h2>{file.title}</h2>
      <p>{file.description || 'Mở file thiết kế trong Figma.'}</p>
      {!href && <span className="sa-figma-unavailable">Chưa có liên kết</span>}
    </div>
    {href && <span className="sa-figma-card-action" aria-hidden="true"><Icon name="external" size={14}/>Open in Figma</span>}
    {href && <span className="sr-only">Mở trong Figma (tab mới)</span>}
  </>;
  return href
    ? <a className="sa-figma-card" href={href} target="_blank" rel="noopener noreferrer">{content}</a>
    : <div className="sa-figma-card" role="link" aria-disabled="true">{content}</div>;
}

export default function FigmaResources({ files }) {
  if (!files.length) return <div className="sa-figma-empty" role="status"><Icon name="figma" size={32}/><h2>Chưa có file Figma</h2><p>Các file thiết kế sẽ được cập nhật tại đây.</p></div>;
  return <section aria-label="Danh sách file Figma" className="sa-figma-directory">
    <p className="sa-figma-count">{files.length} file thiết kế</p>
    <div className="sa-figma-grid">{files.map(file => <FigmaCard key={file.id} file={file}/>)}</div>
  </section>;
}
