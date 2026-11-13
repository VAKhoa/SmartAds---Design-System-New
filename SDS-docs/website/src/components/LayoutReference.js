import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import documents from '../data/docs.generated.json';
import DocsShell from './DocsShell';
import { GridSpecimen, CampaignSpecimen, DashboardSpecimen } from './LayoutExplorer';
import LayoutCapture from './LayoutCapture';
import '../styles/layout-reference.css';

export default async function LayoutReference() {
  const document = documents.find(item => item.id === 'foundation/layout');
  if (!document) throw new Error('Missing foundation/layout Markdown source');
  const gridMarker = '<!-- smartads-layout-grid -->';
  const drawerMarker = '<!-- smartads-layout-drawer -->';
  const campaignMarker = '<!-- smartads-layout-campaign -->';
  const dashboardMarker = '<!-- smartads-layout-dashboard -->';
  const gridParts = document.html.split(gridMarker);
  const drawerParts = gridParts[1]?.split(drawerMarker);
  const campaignParts = drawerParts?.[1]?.split(campaignMarker);
  const dashboardParts = campaignParts?.[1]?.split(dashboardMarker);
  if (gridParts.length !== 2 || drawerParts?.length !== 2 || campaignParts?.length !== 2 || dashboardParts?.length !== 2) throw new Error('Missing or duplicated Layout visual markers in Markdown');

  const snapshot = JSON.parse(await readFile(join(process.cwd(), '..', 'variable-figma-export', 'styles.json'), 'utf8'));
  if (snapshot.fileKey !== 'cRZ5kIi4kD6j9lh1dbh5mh') throw new Error('Unexpected grid-style source file');
  const body = snapshot.grid.find(style => style.name === 'Grid/Body Layout');
  const columns = body?.layoutGrids.find(layer => layer.pattern === 'COLUMNS' && layer.alignment === 'STRETCH');
  if (body?.id !== 'S:308be77502ea63d1b71dfc40be0a3c6e1d3416be,' ||
      columns?.count !== 12 || columns?.gutterSize !== 12 || columns?.offset !== 20) {
    throw new Error('Grid/Body Layout no longer matches the reviewed Figma snapshot');
  }
  const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));

  return <DocsShell document={document} searchIndex={searchIndex}>
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: gridParts[0] }} />
    <GridSpecimen columns={columns.count} gutter={columns.gutterSize} offset={columns.offset} styleId={body.id} readDate={snapshot.readDate} />
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: drawerParts[0] }} />
    <LayoutCapture kind="drawer" />
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: campaignParts[0] }} />
    <LayoutCapture kind="campaign" />
    <CampaignSpecimen />
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: dashboardParts[0] }} />
    <LayoutCapture kind="dashboard" />
    <DashboardSpecimen />
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: dashboardParts[1] }} />
  </DocsShell>;
}
