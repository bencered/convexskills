# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]

No unreleased changes.

## [2.0.0] - 2026-03-18

### Breaking Changes

- **Consolidated 14 discrete skill directories into a single `convex` skill** with a `references/` folder, following the [cloudflare/skills](https://github.com/cloudflare/skills) pattern
- **npm API changed**: `SKILLS` export replaced by `REFERENCES` with new keys (e.g. `"convex-functions"` → `"functions"`). A `SKILLS` alias is kept with both old and new keys for backward compat, but prefer `REFERENCES`. `getSkill("convex-best-practices")` no longer works — use `getReference("convex", "best-practices")` instead. `getSkillPath()` now resolves old names to reference file paths.
- **`CLAUDE.md` removed from npm package** — it was a symlink to `agents.md`, which is now included directly. Tools looking for `CLAUDE.md` in `node_modules` should use `agents.md` instead.
- **CLI changed**: `convex-skills install <skill-name>` is removed; use `convex-skills install` (installs the full skill with all references)
- Old skill directory paths (`skills/convex-functions/SKILL.md` etc.) no longer exist

### Migration from 1.x

**npm programmatic API:**
```js
// Before (1.x)
import { getSkill, SKILLS } from "@waynesutton/convex-skills";
const content = getSkill("convex-best-practices");

// After (2.x)
import { getSkill, getReference, REFERENCES } from "@waynesutton/convex-skills";
const skill = getSkill("convex");          // main SKILL.md
const ref = getReference("convex", "best-practices"); // specific reference
```

**CLI:**
```bash
# Before (1.x)
convex-skills install convex-best-practices
convex-skills install-all

# After (2.x)
convex-skills install              # installs full skill + references
convex-skills show best-practices  # view a specific reference
```

### Added

- `skills/convex/references/` directory with 13 reference files
- New `SKILL.md` entry point with decision trees and reference index
- `.claude-plugin/marketplace.json` for Claude Code plugin marketplace
- `.cursor-plugin/` directory for Cursor support
- `compatibility` and `allowed-tools` fields in SKILL.md frontmatter (per agentskills.io spec)
- `getReference()` and `listReferences()` programmatic API exports
- `convex-skills show [reference]` CLI command
- `cursor` as a `--target` alias in CLI

### Changed

- All 13 discrete SKILL.md files moved to `skills/convex/references/` as plain markdown (frontmatter stripped)
- `SKILL.md` frontmatter now spec-compliant per agentskills.io
- `index.js` and `bin/cli.js` rewritten for consolidated structure
- `command/convex.md` updated to reference new paths
- `agents.md`, `.codex/README.md`, `README.md`, `docs.md`, `files.md` updated
- `package.json` version bumped to 2.0.0
- Updated README.md to reference official Convex Agent Plugins repo as the primary resource
- Fixed typo in README heading ("offical" to "official")
- Consolidated `convex-eslint` skill into `convex-best-practices` Code Quality section

### Removed

- 13 individual skill directories (`skills/convex-functions/`, `skills/convex-agents/`, etc.)
- Deleted standalone `skills/convex-eslint/` directory (content merged into convex-best-practices)

### Fixed

- Removed unsupported frontmatter fields to avoid Pi skill parser conflicts
- Per-skill `agents/openai.yaml` and `assets/` duplicates
- `.DS_Store` files (added to `.gitignore`)


## [1.0.7] - 2026-02-02

### Added

- Codex skill icons via `agents/openai.yaml` in every skill folder
- `assets/small-logo.svg` and `assets/large-logo.png` for Codex UI display

## [1.0.6] - 2026-02-02

### Added

- Retrieval-led reasoning pattern in AGENTS.md, CLAUDE.md, and GEMINI.md
  - Compressed Convex docs index pointing to https://docs.convex.dev/llms.txt
  - Instruction to prefer retrieval over pre-training for Convex tasks
- Quick Reference section with common code patterns (function syntax, schema, queries)
- Dual-approach architecture: passive context (AGENTS.md) + on-demand skills

### Changed

- Updated AGENTS.md with Convex Documentation Index section
- Updated CLAUDE.md with matching documentation index
- Updated GEMINI.md with llms.txt reference and retrieval instruction

### Fixed

- Added missing convex-eslint to bin/cli.js SKILLS object

## [1.0.5] - 2026-02-02

### Added

- `skills/convex-eslint/SKILL.md`: ESLint compliance skill
- `.codex/README.md`: Codex CLI integration instructions
- Code Quality sections in skills and templates

## [1.0.4] - 2026-01-14

### Added

- Template skills for developers who fork the repository
- `files.md`, `task.md`, `docs.md`
- `skills/convex/SKILL.md`: Umbrella skill indexing all Convex skills

### Fixed

- Skill `name` field now matches folder name for `/skill` commands to work

## [1.0.0] - 2026-01-14

### Added

- Initial repository with 9 core Convex skills
- GEMINI.md, agents.md, CLAUDE.md
- OpenCode plugin for Convex sync
- README.md, CONTRIBUTING.md, MIT License
