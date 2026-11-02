import { notFound } from 'next/navigation';
import DocsPage from '../../../components/DocsPage';
import documents from '../../../data/docs.generated.json';

export function generateStaticParams() {
  return documents.filter(doc => doc.id !== 'overview').map(doc => ({ slug: doc.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = documents.find(doc => doc.id === slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export default async function IntroductionPage({ params }) {
  const { slug } = await params;
  if (!documents.some(doc => doc.id === slug && slug !== 'overview')) notFound();
  return <DocsPage id={slug} />;
}
