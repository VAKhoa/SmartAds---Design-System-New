import DocsShell from '../../../components/DocsShell';
import FigmaResources from '../../../components/FigmaResources';
import files from '../../../data/figma-files.json';
import documents from '../../../data/docs.generated.json';
import { figmaResourcePage } from '../../../lib/figma-resources';
import '../../../styles/figma-resources.css';

export const metadata = { title: 'Figma files', description: figmaResourcePage.description };

export default function FigmaResourcePage() {
  const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));
  return <DocsShell resource document={figmaResourcePage} searchIndex={searchIndex}><FigmaResources files={files}/></DocsShell>;
}
