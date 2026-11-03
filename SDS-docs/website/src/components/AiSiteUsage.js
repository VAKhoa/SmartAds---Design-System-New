'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const siteUrl = 'https://smart-ads-design-system-new.vercel.app/';

export default function AiSiteUsage() {
  const [copied, setCopied] = useState(false);
  const resetTimeout = useRef(null);

  useEffect(() => () => clearTimeout(resetTimeout.current), []);

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      clearTimeout(resetTimeout.current);
      resetTimeout.current = setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  }

  return <section className="sa-ai-usage" aria-labelledby="sa-ai-usage-title">
    <h2 id="sa-ai-usage-title">Cách sử dụng</h2>
    <p className="sa-ai-usage-intro">Đưa đường dẫn này cho AI agent khi cần thiết kế hoặc viết code theo SDS.</p>
    <div className="sa-ai-usage-url">
      <a href={siteUrl} target="_blank" rel="noopener noreferrer">{siteUrl}<span className="sr-only"> (mở tab mới)</span></a>
      <button type="button" onClick={copyUrl} aria-label="Sao chép đường dẫn website SDS"><Icon name={copied ? 'check' : 'copy'} size={15}/><span>{copied ? 'Đã sao chép' : 'Sao chép'}</span></button>
    </div>
    <span className="sr-only" role="status">{copied ? 'Đã sao chép đường dẫn website SDS' : ''}</span>
    <p className="sa-ai-usage-note">Khi AI agent đề nghị thêm website SDS vào nguồn tham khảo của dự án, bạn chỉ cần đồng ý một lần. Sau đó, tiếp tục giao task kèm nguồn và phạm vi cụ thể; không cần cài lại đường dẫn cho mỗi yêu cầu.</p>
  </section>;
}
