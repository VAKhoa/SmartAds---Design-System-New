export const navigation = [
  { id: 'overview', title: 'Overview', href: '/', file: 'index.md', icon: 'overview' },
  { id: 'design-system', title: 'Design System?', href: '/introduction/design-system/', file: 'introduction/design-system.md', icon: 'layers' },
  { id: 'principles', title: 'Principles', href: '/introduction/principles/', file: 'introduction/principles.md', icon: 'compass' },
  { id: 'getting-started', title: 'Getting Started', href: '/introduction/getting-started/', file: 'introduction/getting-started.md', icon: 'arrow' },
  { id: 'ai-agents', title: 'AI Agents', href: '/introduction/ai-agents/', file: 'introduction/ai-agents.md', icon: 'sparkles' },
  { id: 'faq', title: 'FAQ', href: '/introduction/faq/', file: 'introduction/faq.md', icon: 'help' },
  { id: 'glossary', title: 'Glossary', href: '/introduction/glossary/', file: 'introduction/glossary.md', icon: 'book' },
];

export const figmaUrl = 'https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=1-2';

// Menu scaffold from Figma sQYYGDipDACa8UIqgdWWZq, node 319:375. Each planned item has its own blank route.
export const plannedNavigation = [
  { title: 'Foundation', slug: 'foundation', items: ['Overview', 'Colors', 'Typography', 'Spacing', 'Icons'] },
  { title: 'Components', slug: 'components', items: ['Button', 'Badge', 'Card', 'Input', 'Dialog', 'Select', 'Checkbox', 'Switch', 'Alert', 'Avatar', 'Tooltips'] },
  { title: 'Patterns', slug: 'patterns', items: ['Forms', 'Data Tables', 'Navigation'] },
].map(group => ({ ...group, items: group.items.map(title => {
  const slug = title.toLowerCase().replaceAll(' ', '-');
  return { title, slug, id: group.slug + '/' + slug, href: '/' + group.slug + '/' + slug + '/' };
}) }));
