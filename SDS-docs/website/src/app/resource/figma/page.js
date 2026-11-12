import DocsShell from '../../../components/DocsShell';
import FigmaResources from '../../../components/FigmaResources';
import files from '../../../data/figma-files.json';
import documents from '../../../data/docs.generated.json';
import { figmaResourcePage } from '../../../lib/figma-resources';
import '../../../styles/figma-resources.css';

const resourceDocument = documents.find(item => item.id === figmaResourcePage.id);
if (!resourceDocument) throw new Error('Missing resource/figma Markdown source');

export const metadata = { title: resourceDocument.title, description: resourceDocument.description };

export default function FigmaResourcePage() {
  const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));
  return <DocsShell resource document={resourceDocument} searchIndex={searchIndex}><FigmaResources files={files}/></DocsShell>;
}
