import documents from '../data/docs.generated.json';
import { aiSourceFiles } from '../data/ai-source-files';
import DocsShell from './DocsShell';
import AiSiteUsage from './AiSiteUsage';

export default function DocsPage({ id }) {
  const document = documents.find(doc => doc.id === id);
  const index = documents.indexOf(document);
  const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));
  return <DocsShell document={document} searchIndex={searchIndex}
    sourceFiles={id === 'ai-agents' ? aiSourceFiles : null}
    previous={index > 0 ? { title: documents[index - 1].title, href: documents[index - 1].href } : null}
    next={index < documents.length - 1 ? { title: documents[index + 1].title, href: documents[index + 1].href } : null}>
    <>{id === 'ai-agents' && <AiSiteUsage/>}<div className="sa-prose" dangerouslySetInnerHTML={{ __html: document.html }} /></>
  </DocsShell>;
}
