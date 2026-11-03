import { createElement } from 'react';
import {
  IconSearch, IconArrowRight, IconArrowLeft, IconArrowUp, IconArrowDown,
  IconChevronRight, IconChevronDown, IconExternalLink, IconCopy, IconCheck,
  IconMenu2, IconX, IconCircleHalf2, IconLayoutGrid, IconLayersIntersect,
  IconCompass, IconHelpCircle, IconBook, IconFileText, IconSparkles, IconBrandFigma, IconLink,
} from '@tabler/icons-react';

// Single source for UI icons. Add named Tabler imports only; never draw custom paths.
const icons = {
  search: IconSearch, arrow: IconArrowRight, back: IconArrowLeft,
  up: IconArrowUp, 'arrow-down': IconArrowDown, chevron: IconChevronRight,
  down: IconChevronDown, external: IconExternalLink, copy: IconCopy,
  check: IconCheck, menu: IconMenu2, close: IconX, theme: IconCircleHalf2,
  overview: IconLayoutGrid, layers: IconLayersIntersect, compass: IconCompass,
  help: IconHelpCircle, book: IconBook, file: IconFileText, sparkles: IconSparkles,
  figma: IconBrandFigma, link: IconLink,
};

export default function Icon({ name, size = 18, ...props }) {
  const Component = icons[name];
  if (!Component) throw new Error(`Unknown Tabler icon alias: ${name}`);
  return createElement(Component, { size, stroke: 2, 'aria-hidden': true, focusable: false, ...props });
}
