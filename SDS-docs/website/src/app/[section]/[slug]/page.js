import { notFound } from 'next/navigation';
import DocsShell from '../../../components/DocsShell';
import { plannedNavigation } from '../../../lib/navigation';
import documents from '../../../data/docs.generated.json';

const pages = plannedNavigation.flatMap(group => group.items.map(item => ({ ...item, section: group.slug })));

export function generateStaticParams() {
  return pages.map(({ section, slug }) => ({ section, slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { section, slug } = await params;
  return { title: pages.find(page => page.section === section && page.slug === slug)?.title || 'SDS' };
}

export default async function EmptySectionPage({ params }) {
  const { section, slug } = await params;
  const page = pages.find(page => page.section === section && page.slug === slug);
  if (!page) notFound();
  const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));
  return <DocsShell empty document={{ ...page, headings: [] }} searchIndex={searchIndex} />;
}
