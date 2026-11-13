'use client';

import { useState } from 'react';

const fileKey = 'cRZ5kIi4kD6j9lh1dbh5mh';

const captures = {
  drawer: {
    title: 'Drawer trong bảng Figma',
    eyebrow: 'ẢNH CẮT TỪ BẢNG FIGMA',
    nodeId: '8454:44595',
    src: '/figma/layout/drawer-variants.png',
    image: { width: 4096, height: 1278 },
    crop: { x: 1080, y: 0, width: 508, height: 763 },
    alt: 'Vùng Drawer được cắt từ ảnh xuất toàn bảng Figma SmartAds; ba ví dụ Drawer xếp dọc trên nền tím nhạt.',
    note: 'Ảnh cắt từ bản xuất toàn bảng; chữ trong vùng Drawer có độ phân giải hạn chế. Bảng kích thước phía trên vẫn là nguồn để đối chiếu các variant.',
    regions: [
      { label: 'Vùng Drawer', detail: 'Ba ví dụ Drawer nằm trong bảng Figma; khung này chỉ đánh dấu vùng minh họa.', x: 8, y: 72, width: 426, height: 675 },
    ],
  },
  campaign: {
    title: 'Create Campaign · 1440px',
    eyebrow: 'ẢNH FRAME GỐC · SIDEBAR MỞ',
    nodeId: '12055:211379',
    src: '/figma/layout/create-campaign-1440.png',
    image: { width: 1324, height: 4096 },
    crop: { x: 0, y: 0, width: 1324, height: 900 },
    alt: 'Phần đầu màn Create Campaign 1440px trong Figma SmartAds, gồm sidebar, header, vùng Main và Overview.',
    note: 'Ảnh xuất của frame 1440px với sidebar mở đã được Figma thu nhỏ do giới hạn chiều cao PNG. Nhãn px lấy từ số đo frame Figma, không phải số pixel của ảnh xuất. Phần dưới frame được ẩn; dùng nút phóng to hoặc mở ảnh gốc để xem thêm.',
    regions: [
      { label: 'Sidebar · 248px', detail: 'Thanh điều hướng bên trái trong frame này.', x: 0, y: 0, width: 228, height: 900 },
      { label: 'Header · 128px', detail: 'Header nằm trên vùng nội dung.', x: 228, y: 0, width: 1096, height: 117 },
      { label: 'Main · 847px', detail: 'Vùng biểu mẫu Create Campaign tại frame 1440px.', x: 247, y: 136, width: 779, height: 764 },
      { label: 'Overview · 280px', detail: 'Cột tóm tắt bên phải Main.', x: 1043, y: 136, width: 258, height: 764 },
    ],
    details: [
      { label: 'Main · phần đầu biểu mẫu', x: 247, y: 136, width: 779, height: 520 },
      { label: 'Overview · phần đầu cột', x: 1043, y: 136, width: 258, height: 440 },
    ],
  },
  dashboard: {
    title: 'Dashboard · 1440px',
    eyebrow: 'ẢNH FRAME GỐC · SIDEBAR MỞ',
    nodeId: '14416:251235',
    src: '/figma/layout/dashboard-1440.png',
    image: { width: 1446, height: 3604 },
    crop: { x: 0, y: 0, width: 1446, height: 800 },
    alt: 'Phần đầu Dashboard Advertiser 1440px trong Figma SmartAds, gồm sidebar, header, năm KPI và biểu đồ.',
    note: 'Ảnh xuất minh họa frame Dashboard 1440px với sidebar mở. Nhãn px lấy từ số đo frame Figma; các viền bám vùng nhìn thấy trong PNG và không xác lập breakpoint hay grid cho màn khác.',
    regions: [
      { label: 'Sidebar · 248px', detail: 'Thanh điều hướng bên trái trong frame này.', x: 0, y: 0, width: 250, height: 800 },
      { label: 'Header · 128px', detail: 'Header trên vùng báo cáo.', x: 250, y: 0, width: 1196, height: 128 },
      { label: '5 KPI · gap 12px', detail: 'Dải năm StatisticPanel, gap gắn spacing/md.', x: 270, y: 148, width: 1149, height: 118 },
      { label: 'Chart · 435px', detail: 'Vùng biểu đồ dưới dải KPI.', x: 270, y: 287, width: 1149, height: 435 },
    ],
    details: [
      { label: 'StatisticPanel · một trong năm KPI', x: 270, y: 148, width: 220, height: 118 },
      { label: 'Chart · vùng báo cáo', x: 270, y: 287, width: 1149, height: 435 },
    ],
  },
};

function percent(part, total) {
  return `${(part / total) * 100}%`;
}

export default function LayoutCapture({ kind }) {
  const capture = captures[kind];
  const [annotated, setAnnotated] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  if (!capture) throw new Error(`Unknown layout capture: ${kind}`);
  const figmaHref = `https://www.figma.com/design/${fileKey}/SmartAds---Design-System?node-id=${capture.nodeId.replace(':', '-')}&m=dev`;
  const { crop, image } = capture;

  return <figure className={`sa-layout-capture sa-layout-capture--${kind}`} aria-label={`Ảnh Figma ${capture.title}`}>
    <div className="sa-layout-capture-topline">
      <div><p className="sa-layout-eyebrow">{capture.eyebrow}</p><h3>{capture.title}</h3></div>
      <div className="sa-layout-capture-actions">
        <button type="button" aria-pressed={annotated} onClick={() => setAnnotated(value => !value)}>{annotated ? 'Ẩn viền đo' : 'Hiện viền đo'}</button>
        {kind !== 'drawer' && <button type="button" aria-pressed={zoomed} onClick={() => setZoomed(value => !value)}>{zoomed ? 'Thu nhỏ' : 'Phóng to'}</button>}
      </div>
    </div>
    <div className={`sa-layout-capture-scroll${zoomed ? ' sa-layout-capture-scroll--zoom' : ''}`} tabIndex={zoomed ? 0 : undefined} aria-label={zoomed ? `Ảnh ${capture.title} có thể cuộn để xem khi phóng to` : undefined}>
      <div className="sa-layout-capture-frame" style={{ aspectRatio: `${crop.width} / ${crop.height}` }}>
        <img src={capture.src} width={image.width} height={image.height} alt={capture.alt} loading="lazy" style={{ width: percent(image.width, crop.width), left: percent(-crop.x, crop.width), top: percent(-crop.y, crop.height) }} />
        {annotated && <div className="sa-layout-capture-overlays" aria-hidden="true">
          {capture.regions.map((region, index) => <span className="sa-layout-capture-region" key={region.label} style={{ left: percent(region.x, crop.width), top: percent(region.y, crop.height), width: percent(region.width, crop.width), height: percent(region.height, crop.height) }}><b><em>{String(index + 1).padStart(2, '0')}</em><span> · {region.label}</span></b></span>)}
        </div>}
      </div>
    </div>
    {capture.details && <div className={`sa-layout-capture-details sa-layout-capture-details--${kind}`} aria-label={`Chi tiết UI ${capture.title}`}>
      {capture.details.map(detail => <div className="sa-layout-capture-detail" key={detail.label}>
        <div className="sa-layout-capture-detail-image" style={{ aspectRatio: `${detail.width} / ${detail.height}` }}>
          <img src={capture.src} width={image.width} height={image.height} alt={`Ảnh cắt từ frame Figma: ${detail.label}`} loading="lazy" style={{ width: percent(image.width, detail.width), left: percent(-detail.x, detail.width), top: percent(-detail.y, detail.height) }} />
        </div>
        <strong>{detail.label}</strong>
      </div>)}
    </div>}
    <figcaption>
      <p>{capture.note}</p>
      {annotated && <ol className="sa-layout-capture-key">{capture.regions.map((region, index) => <li key={region.label}><span>{String(index + 1).padStart(2, '0')}</span><strong>{region.label}</strong><small>{region.detail}</small></li>)}</ol>}
      <div className="sa-layout-capture-source"><span>Figma node <code>{capture.nodeId}</code></span><a href={figmaHref} target="_blank" rel="noopener noreferrer">Mở node Dev Mode</a>{kind !== 'drawer' && <a href={capture.src} target="_blank" rel="noopener noreferrer">Mở ảnh xuất gốc</a>}</div>
    </figcaption>
  </figure>;
}
