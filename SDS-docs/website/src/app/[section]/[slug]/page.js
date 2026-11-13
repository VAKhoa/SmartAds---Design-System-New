import { notFound } from 'next/navigation';
import DocsShell from '../../../components/DocsShell';
import { plannedNavigation } from '../../../lib/navigation';
import documents from '../../../data/docs.generated.json';
import ColorShowcase from '../../../components/ColorShowcase';
import TypographyReference from '../../../components/TypographyReference';
import SpacingReference from '../../../components/SpacingReference';
import LogoReference from '../../../components/LogoReference';
import LayoutReference from '../../../components/LayoutReference';
import IconReference from '../../../components/IconReference';

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
  if (page.id === 'foundation/logo') return <LogoReference />;
  if (page.id === 'foundation/layout') return <LayoutReference />;
  if (page.id === 'foundation/icons') return <IconReference />;
  return <DocsShell document={document} searchIndex={searchIndex}>
    {page.id === 'foundation/colors' && <ColorShowcase />}
    <div className="sa-prose" dangerouslySetInnerHTML={{ __html: document.html }} />
  </DocsShell>;
}
