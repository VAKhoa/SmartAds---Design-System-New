export const navigation = [
  { id: 'overview', title: 'Overview', href: '/', file: 'index.md', icon: 'overview' },
  { id: 'design-system', title: 'Design System?', href: '/introduction/design-system/', file: 'introduction/design-system.md', icon: 'layers' },
  { id: 'principles', title: 'Principles', href: '/introduction/principles/', file: 'introduction/principles.md', icon: 'compass' },
  { id: 'getting-started', title: 'Getting Started', href: '/introduction/getting-started/', file: 'introduction/getting-started.md', icon: 'arrow' },
  { id: 'ai-agents', title: 'AI Agents', href: '/introduction/ai-agents/', file: 'introduction/ai-agents.md', icon: 'sparkles' },
  { id: 'faq', title: 'FAQ', href: '/introduction/faq/', file: 'introduction/faq.md', icon: 'help' },
  { id: 'glossary', title: 'Glossary', href: '/introduction/glossary/', file: 'introduction/glossary.md', icon: 'book' },
];

// Menu scaffold from Figma sQYYGDipDACa8UIqgdWWZq, node 319:375.
// Logo and Layout are added for the requested SDS documentation taxonomy.
export const plannedNavigation = [
  { title: 'Foundation', slug: 'foundation', items: ['Colors', 'Typography', 'Spacing', 'Layout', 'Icons', 'Logo'] },
  { title: 'Components', slug: 'components', items: ['Button', 'Badge', 'Card', 'Input', 'Dialog', 'Select', 'Checkbox', 'Switch', 'Alert', 'Avatar', 'Tooltips'] },
  { title: 'Patterns', slug: 'patterns', items: ['Forms', 'Data Tables', 'Navigation'] },
].map(group => ({ ...group, items: group.items.map(title => {
  const slug = title.toLowerCase().replaceAll(' ', '-');
  return { title, section: group.title, slug, id: group.slug + '/' + slug, href: '/' + group.slug + '/' + slug + '/', file: group.slug === 'foundation' && slug === 'colors' ? 'foundation/sds-color.md' : group.slug + '/' + slug + '.md', icon: 'book' };
}) }));
