import { notFound } from 'next/navigation';
import DocsPage from '../../../components/DocsPage';
import documents from '../../../data/docs.generated.json';
import { navigation } from '../../../lib/navigation';

export function generateStaticParams() {
  return navigation.filter(item => item.id !== 'overview').map(item => ({ slug: item.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = documents.find(doc => doc.id === slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export default async function IntroductionPage({ params }) {
  const { slug } = await params;
  if (!navigation.some(item => item.id === slug && slug !== 'overview')) notFound();
  return <DocsPage id={slug} />;
}
