import documents from '../data/docs.generated.json';
import DocsShell from './DocsShell';
import LogoExplorer from './LogoExplorer';
import '../styles/logo-reference.css';

export default function LogoReference() {
  const document = documents.find(item => item.id === 'foundation/logo');
  if (!document) throw new Error('Missing foundation/logo Markdown source');
  const marker = '<!-- smartads-logo-assets -->';
  const parts = document.html.split(marker);
  if (parts.length !== 2) throw new Error('Missing or duplicated logo gallery marker in Markdown');
  const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));

  return <DocsShell document={document} searchIndex={searchIndex}>
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: parts[0] }} />
    <LogoExplorer />
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: parts[1] }} />
  </DocsShell>;
}
