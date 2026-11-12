---
name: sds-fe-website-builder
description: Build or revise the SmartAds SDS documentation website UI from verified Figma and project sources while preserving its Next.js, JavaScript, and CSS architecture.
---

# SDS FE Website Builder

Use this skill for FE work in `SDS-docs/website/`. It adapts the user-provided FE Builder role prompt (`gemini-code-1793846041373.md`) to the actual SDS repository. Work under Agent Core's task scope and review gate.

## Source and architecture

- Read `SmartAds - SDS/AGENTS.md`, `SDS-docs/content/rules/SDS-rules.md`, `SDS-docs/content/rules/website-ui-rules.md`, and the relevant source page before editing.
- Use the assigned Figma node for design details. Trace token values to Figma variables/styles or the dated export; label snapshot-only facts as draft. Handler reports help identify questions but do not replace source evidence.
- Open only the Figma file explicitly assigned for the task and verify its file key. Prefer the user's local `figma-local@figma-local-workspace` plugin: call `whoami` first and require `info@smartads.tech`, then use read-only metadata/design-context/export tools without controlling the desktop. If tools or identity are unavailable, report the limit; do not switch to a marketplace Figma plugin, desktop app, or Chrome without a new user instruction. If the user later requests the desktop app, enter Dev Mode by default. Permission to edit the website does not grant permission to edit Figma.
- Keep the website's Next.js, React, JavaScript/JSX, and plain CSS stack. Use existing `sa` classes, semantic website variables, components, and generated theme. Do not introduce TypeScript, Tailwind, `cva`, `clsx`, `tailwind-merge`, or motion libraries solely because the source role prompt mentions them.
- Keep `website/src/styles/figma.generated.css`, `website/src/data/*.generated.json`, `.next/`, and `out/` generated from their inputs. Edit the source or generator instead of the generated output.

### Choose the existing file layer

- Distinguish documentation UI from product component deliverables. Read `SDS-docs/content/rules/component-code-rules.md` when implementing or documenting a Figma product component: shipped examples, copyable snippets, and handoff code must be plain HTML/CSS/JavaScript, without JSX, TypeScript, CSS preprocessors, or framework runtime dependencies. Keep the docs shell in Next.js/React. Preview the same vanilla source delivered to developers; a React wrapper may host it but is not the deliverable. Docs-only React helpers such as `SpacingValue` stay internal to the website.

- `website/src/app/` defines routes and metadata. The shared documentation frame, search, theme, sidebar, and table of contents live in `website/src/components/DocsShell.js`; reuse it for documentation pages.
- Every populated page uses the shared `SourceFileLinks` block immediately after its title and subtitle. `DocsShell` derives the primary Markdown card from `document.file` and `document.sourceHref`; pass only additional reference files. The Resource / Figma page has its own Markdown source while its card data remains in `figma-files.json`. Keep empty routes empty.
- `website/src/lib/navigation.js` owns sidebar names, order, and routes. Article copy lives in `SDS-docs/content/pages/` as Markdown with frontmatter and sources; use `content/guides/content-guide.md` for each page's canonical path.
- Page-specific React UI belongs in `website/src/components/`; its CSS belongs in `website/src/styles/`. Add to `src/app/layout.js` only when a stylesheet must load globally. Keep `public/brand/` assets sourced from Figma.
- `website/scripts/prepare.mjs` and `generate-theme.mjs` generate content and theme data. Change them only when the source-to-output flow actually changes; do not hand-edit their outputs.
- Before replacing a route, check all callers, tests, documentation links, and generated-data consumers. Remove obsolete UI only after the replacement works; keep the Markdown source and its public `.md` link when the page still needs them.

## Build decisions

- Prefer a verified semantic token or existing website variable for repeated colors and surfaces. A measured one-off layout value may remain in website CSS when its Figma node or existing website rule supports it; record the source. Do not invent a product token to satisfy a zero-hardcoding slogan.
- Follow the website's typography, spacing, and responsive rules. The docs body uses 200% line-height and header/sidebar use 120%; specimen samples may use the exact Figma style value. Respect the project's documented spacing and asset exceptions rather than forcing every dimension onto a 4px/8px grid or a T-shirt name.
- Translate Figma Auto Layout into flex/grid according to the measured node: direction, gap, padding, alignment, fill, hug, and constraints. Use `min-width: 0` and appropriate overflow handling where long text or tables require it.
- Make reusable components when the UI repeats or has a clear API. Keep existing shared shell and navigation. Add variants, slots, and data states only when the design or product behavior has evidence; flag missing states instead of presenting them as approved SmartAds behavior.
- Use semantic HTML, visible keyboard focus, appropriate ARIA, and responsive light/dark behavior. For interactive elements, check applicable rest, hover, active, focus, disabled, and selected states. Use Tabler through `website/src/components/Icon.js` for functional icons.

## Delivery

1. Inspect the current route, source, and dependent components. Resolve routine implementation choices; raise a blocker to Agent Core only when a missing fact prevents the requested outcome.
2. Implement in source files, preserve real SmartAds content, and label proposals or unverified values. Keep copy, links, and code examples traceable to the source.
3. Run `npm run build`. For layout, navigation, behavior, or theme changes, run relevant Playwright checks and inspect the affected route in light/dark and desktop/mobile. Check whether `content/pages/`, guides, and `website/README.md` became stale; update affected docs and their `updated` field.
4. Report files changed, source node/variable/style IDs, behavior and states checked, test results, remaining draft facts, and decisions Agent Core must escalate. Link source files instead of pasting complete production code unless explicitly requested.

Do not deploy, publish, alter Figma, or expand a page-specific approval to the whole website without the user's authorization.
