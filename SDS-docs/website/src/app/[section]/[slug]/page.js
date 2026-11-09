import { notFound } from 'next/navigation';
import DocsShell from '../../../components/DocsShell';
import { plannedNavigation } from '../../../lib/navigation';
import documents from '../../../data/docs.generated.json';
import ColorShowcase from '../../../components/ColorShowcase';
import TypographyReference from '../../../components/TypographyReference';
import SpacingReference from '../../../components/SpacingReference';

const pages = plannedNavigation.flatMap(group => group.items.map(item => ({ ...item, section: group.slug })));

export function generateStaticParams() {
  return pages.map(({ section, slug }) => ({ section, slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { section, slug } = await params;
  return { title: pages.find(page => page.section === section && page.slug === slug)?.title || 'SDS' };
}

export default async function SectionPage({ params }) {
  const { section, slug } = await params;
  const page = pages.find(page => page.section === section && page.slug === slug);
  if (!page) notFound();
  const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));
  const document = documents.find(doc => doc.id === page.id);
  if (!document) return <DocsShell empty document={{ ...page, headings: [] }} searchIndex={searchIndex} />;
  if (page.id === 'foundation/typography') return <TypographyReference />;
  if (page.id === 'foundation/spacing') return <SpacingReference />;
  return <DocsShell document={document} searchIndex={searchIndex}
    sourceFiles={[{ path: document.file, description: 'Mở file Markdown gốc của trang này.', href: document.sourceHref }]}>
    {page.id === 'foundation/colors' && <ColorShowcase />}
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: document.html }} />
  </DocsShell>;
}
