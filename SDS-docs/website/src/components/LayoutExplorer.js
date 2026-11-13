'use client';

import { useState } from 'react';
import campaign from '../data/layout-campaign.json';
import dashboard from '../data/layout-dashboard.json';

export function GridSpecimen({ columns, gutter, offset, styleId, readDate }) {
  return <section className="sa-layout-specimen" aria-label="Minh họa Grid/Body Layout">
    <div className="sa-layout-specimen-heading">
      <div><p className="sa-layout-eyebrow">GRID STYLE · SNAPSHOT {readDate}</p><h3>Grid/Body Layout</h3></div>
      <code title={styleId}>12 cột · STRETCH</code>
    </div>
    <div className="sa-layout-grid-canvas" role="img" aria-label={`${columns} cột co giãn, gutter ${gutter}px, offset ${offset}px`}>
      <div className="sa-layout-grid-columns" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: gutter, marginInline: offset }}>
        {Array.from({ length: columns }, (_, index) => <span key={index} />)}
      </div>
    </div>
    <dl className="sa-layout-specimen-facts">
      <div><dt>Cột</dt><dd>{columns} · STRETCH</dd></div>
      <div><dt>Gutter</dt><dd>{gutter}px</dd></div>
      <div><dt>Offset</dt><dd>{offset}px mỗi phía</dd></div>
    </dl>
    <p className="sa-layout-specimen-note">Sơ đồ thu nhỏ để đọc trên trang tài liệu. Grid style này chưa được chứng minh là đang gắn cho mọi frame hoặc mọi viewport.</p>
  </section>;
}

const states = [
  { id: 'expanded', label: 'Sidebar mở' },
  { id: 'collapsed', label: 'Sidebar thu gọn' },
  { id: 'chat', label: 'AI Chat mở' },
];

export function CampaignSpecimen() {
  const [viewport, setViewport] = useState(1440);
  const [state, setState] = useState('expanded');
  const frame = campaign.scenarios.find(item => item.viewport === viewport && item.state === state);
  if (!frame) throw new Error(`Missing Create Campaign frame ${viewport}/${state}`);
  const figmaHref = `https://www.figma.com/design/${campaign.fileKey}/SmartAds---Design-System?node-id=${frame.frameId.replace(':', '-')}&m=dev`;

  return <section className="sa-layout-specimen" aria-label="Sơ đồ bố cục Create Campaign">
    <div className="sa-layout-specimen-heading">
      <div><p className="sa-layout-eyebrow">FRAME ĐÃ ĐO · {campaign.readDate}</p><h3>Create Campaign</h3></div>
      <a href={figmaHref} target="_blank" rel="noopener noreferrer">Mở frame Figma</a>
    </div>
    <div className="sa-layout-controls">
      <label>Viewport trong Figma
        <select value={viewport} onChange={event => setViewport(Number(event.target.value))}>
          {[1920, 1440, 1366, 1280].map(width => <option key={width} value={width}>{width}px</option>)}
        </select>
      </label>
      <label>Trạng thái frame
        <select value={state} onChange={event => setState(event.target.value)}>
          {states.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
      </label>
    </div>
    <div className="sa-layout-campaign-diagram" role="img" aria-label={`Sơ đồ tỷ lệ: sidebar ${frame.sidebar}px, main ${frame.main}px, Overview ${frame.overview}px${frame.chatPanel ? `, AI Chat ${frame.chatPanel}px` : ''}`}>
      <div className="sa-layout-campaign-sidebar" style={{ flexGrow: frame.sidebar }} />
      <div className="sa-layout-campaign-area" style={{ flexGrow: viewport - frame.sidebar }}>
        <div className="sa-layout-campaign-header" />
        <div className="sa-layout-campaign-content">
          <span className="sa-layout-campaign-main" style={{ flexGrow: frame.main }} />
          <span className="sa-layout-campaign-overview" style={{ flexGrow: frame.overview }} />
          {frame.chatPanel && <span className="sa-layout-campaign-chat" style={{ flexGrow: frame.chatPanel }} />}
        </div>
      </div>
    </div>
    <div className="sa-layout-campaign-legend" aria-hidden="true"><span><i className="sa-layout-legend-sidebar" />Sidebar</span><span><i className="sa-layout-legend-main" />Main</span><span><i className="sa-layout-legend-overview" />Overview</span>{frame.chatPanel && <span><i className="sa-layout-legend-chat" />AI Chat</span>}</div>
    <dl className="sa-layout-specimen-facts sa-layout-campaign-facts">
      <div><dt>Sidebar</dt><dd>{frame.sidebar}px</dd></div>
      <div><dt>Header</dt><dd>{frame.header}px</dd></div>
      <div><dt>Main</dt><dd>{frame.main}px</dd></div>
      <div><dt>Gap</dt><dd>{frame.gap}px</dd></div>
      <div><dt>Overview</dt><dd>{frame.overview}px</dd></div>
      {frame.chatPanel && <div><dt>AI Chat</dt><dd>{frame.chatPanel}px</dd></div>}
    </dl>
    <p className="sa-layout-specimen-note">Sơ đồ tỷ lệ của các lớp đo được, không phải ảnh chụp hay CSS breakpoint. Frame <code>{frame.frameId}</code> trả metadata ở mức sparse; chưa suy ra Auto Layout/constraints từ đây.</p>
    {state !== 'expanded' && <p className="sa-layout-conflict">Cần đối chiếu: frame này có sidebar thu gọn 60px; variable <code>Screen/Sidebar/Collapsed</code> trong snapshot là 84px.</p>}
  </section>;
}

export function DashboardSpecimen() {
  const [viewport, setViewport] = useState(1440);
  const [state, setState] = useState('expanded');
  const frame = dashboard.frames.find(item => item.viewport === viewport && item.state === state);
  if (!frame) throw new Error(`Missing Dashboard frame ${viewport}/${state}`);
  const figmaHref = `https://www.figma.com/design/${dashboard.fileKey}/SmartAds---Design-System?node-id=${frame.frameId.replace(':', '-')}&m=dev`;

  return <section className="sa-layout-specimen" aria-label="Sơ đồ bố cục Dashboard">
    <div className="sa-layout-specimen-heading">
      <div><p className="sa-layout-eyebrow">DASHBOARD / ADVERTISER · FRAME {dashboard.readDate}</p><h3>Sidebar và vùng báo cáo</h3></div>
      <a href={figmaHref} target="_blank" rel="noopener noreferrer">Mở frame Figma</a>
    </div>
    <div className="sa-layout-controls">
      <label>Viewport trong Figma
        <select value={viewport} onChange={event => setViewport(Number(event.target.value))}>
          {[1920, 1440, 1366, 1280].map(width => <option key={width} value={width}>{width}px</option>)}
        </select>
      </label>
      <label>Trạng thái sidebar
        <select value={state} onChange={event => setState(event.target.value)}>
          <option value="expanded">Mở · 248px</option><option value="collapsed">Thu gọn · 60px</option>
        </select>
      </label>
    </div>
    <div className="sa-layout-dashboard-diagram" role="img" aria-label={`Dashboard ${viewport}px: sidebar ${frame.sidebar}px, content ${frame.contentWidth}px, inset 20px, dải 5 KPI, chart và section tiếp theo`}>
      <div className="sa-layout-dashboard-sidebar" style={{ flexGrow: frame.sidebar }} />
      <div className="sa-layout-dashboard-area" style={{ flexGrow: viewport - frame.sidebar }}>
        <div className="sa-layout-dashboard-header" />
        <div className="sa-layout-dashboard-body">
          <div className="sa-layout-dashboard-kpis">{Array.from({ length: dashboard.kpi.count }, (_, index) => <span key={index} />)}</div>
          <div className="sa-layout-dashboard-chart" />
          <div className="sa-layout-dashboard-section" />
        </div>
      </div>
    </div>
    <div className="sa-layout-dashboard-legend" aria-hidden="true">Dải KPI · Chart · Section tiếp theo</div>
    <dl className="sa-layout-specimen-facts sa-layout-dashboard-facts">
      <div><dt>Sidebar</dt><dd>{frame.sidebar}px</dd></div>
      <div><dt>Content</dt><dd>{frame.contentWidth}px</dd></div>
      <div><dt>Inset hai phía</dt><dd>{dashboard.vertical.inset}px</dd></div>
      <div><dt>KPI panels</dt><dd>{dashboard.kpi.count} · wrap</dd></div>
      <div><dt>KPI gap</dt><dd>{dashboard.kpi.gap}px</dd></div>
      <div><dt>Panel min-width</dt><dd>{dashboard.kpi.minPanelWidth}px</dd></div>
    </dl>
    <p className="sa-layout-specimen-note">Sơ đồ thu nhỏ mô tả thứ tự khối, không phải screenshot hay hành vi cuộn. Frame <code>{frame.frameId}</code> chỉ cho số đo shell; dải KPI được đọc chi tiết tại <code>{dashboard.kpi.sourceNodeId}</code> với gap gắn <code>{dashboard.kpi.gapVariable}</code>.</p>
    {state === 'collapsed' && <p className="sa-layout-conflict">Cần đối chiếu: frame Dashboard có sidebar thu gọn 60px, còn variable <code>Screen/Sidebar/Collapsed</code> trong snapshot là 84px.</p>}
  </section>;
}
