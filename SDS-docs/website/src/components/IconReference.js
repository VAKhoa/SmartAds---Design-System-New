import documents from '../data/docs.generated.json';
import DocsShell from './DocsShell';
import IconConnectionGuide from './IconConnectionGuide';
import IconExplorer from './IconExplorer';
import '../styles/icon-reference.css';

export default function IconReference() {
  const document = documents.find(item => item.id === 'foundation/icons');
  if (!document) throw new Error('Missing foundation/icons Markdown source');
  const connectionParts = document.html.split('<!-- smartads-icon-connection -->');
  if (connectionParts.length !== 2) throw new Error('Missing or duplicated Icons connection marker');
  const catalogParts = connectionParts[1].split('<!-- smartads-icon-catalog -->');
  if (catalogParts.length !== 2) throw new Error('Missing or duplicated Icons catalog marker');
  const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));

  return <DocsShell document={document} searchIndex={searchIndex}>
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: connectionParts[0] }} />
    <IconConnectionGuide />
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: catalogParts[0] }} />
    <IconExplorer />
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: catalogParts[1] }} />
  </DocsShell>;
}
