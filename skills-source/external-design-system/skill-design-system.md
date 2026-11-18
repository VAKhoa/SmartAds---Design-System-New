---
name: external-design-system
description: OPTIONAL. Shared external design-system library (outside this repository) for token/state/variant structure examples. Not required for any SDS task; skip if the external folder is missing.
---

# External Design System (optional, outside the repo)

This file is a repo-local pointer only. The full skill lives **outside this repository** at `E:\Test-Codex\design-system\SKILL.md` and exists only on the owner's machine.

- If that folder is not available (other machine, Claude Code, CI): **skip this skill, say it is unavailable, and continue with the repo's own rules** (`AGENTS.md`, `SDS-docs/content/rules/SDS-rules.md`, skill `ds-conventions`). Do not substitute another source silently.
- If it is available, resolve its `references/`, `scripts/`, `data/`, `templates/` from `E:\Test-Codex\design-system` and use only the parts relevant to the request. It is a source of structure ideas, never of SmartAds values: verify every design value against Figma (see `AGENTS.md`).
- The user decides task, files, scope and deliverable.
