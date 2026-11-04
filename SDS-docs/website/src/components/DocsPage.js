import documents from '../data/docs.generated.json';
import { aiSourceFiles } from '../data/ai-source-files';
import { navigation } from '../lib/navigation';
import DocsShell from './DocsShell';
import AiSiteUsage from './AiSiteUsage';

export default function DocsPage({ id }) {
  const document = documents.find(doc => doc.id === id);
  const introduction = navigation.map(item => documents.find(doc => doc.id === item.id));
  const index = introduction.indexOf(document);
  const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));
  return <DocsShell document={document} searchIndex={searchIndex}
    sourceFiles={id === 'ai-agents' ? aiSourceFiles : [{ path: document.file, description: 'Mở file Markdown gốc của trang này.', href: document.sourceHref }]}
    previous={index > 0 ? { title: introduction[index - 1].title, href: introduction[index - 1].href } : null}
    next={index < introduction.length - 1 ? { title: introduction[index + 1].title, href: introduction[index + 1].href } : null}>
    <>{id === 'ai-agents' && <AiSiteUsage/>}<div className="sa-prose" dangerouslySetInnerHTML={{ __html: document.html }} /></>
  </DocsShell>;
}
