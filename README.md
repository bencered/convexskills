# For official Convex Skills use Convex Agent Plugins

Official Convex plugins for AI coding agents, providing development tools for building reactive backends with TypeScript.

https://github.com/get-convex/convex-agent-plugins


## Convex (unofficial) Skills 

[![npm version](https://img.shields.io/npm/v/@waynesutton/convex-skills.svg)](https://www.npmjs.com/package/@waynesutton/convex-skills)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

A consolidated AI-consumable skill for building production-ready applications with [Convex](https://convex.dev), following the [Agent Skills](https://agentskills.io/) open standard.

## Overview

This repository contains a single `convex` skill with 13 reference files covering all aspects of Convex development. The skill uses progressive disclosure — agents load the main `SKILL.md` first, then drill into specific references as needed.

## Code Quality

All references produce code that passes @convex-dev/eslint-plugin by default:

- **Skill references** prevent mistakes at generation time
- **ESLint** catches anything that slips through at build time

See the Code Quality section in [best-practices](skills/convex/references/best-practices.md) for setup instructions.

## Installation

### npm (recommended)

```bash
# Install globally for CLI access
npm install -g @waynesutton/convex-skills

# List the skill and its references
convex-skills list

# Install the convex skill to your project
convex-skills install

# Install to a specific target
convex-skills install --target agents
convex-skills install --target cursor
convex-skills install --target codex

# Symlink instead of copying
convex-skills install --target agents --link

# Install templates (CLAUDE.md + skill templates)
convex-skills install-templates

# Show a specific reference
convex-skills show functions
convex-skills show agents
```

Or use npx without installing:

```bash
npx @waynesutton/convex-skills list
npx @waynesutton/convex-skills install
```

### Programmatic Usage

```javascript
import { getSkill, getReference, listReferences, REFERENCES } from "@waynesutton/convex-skills";

// Get main SKILL.md content
const skill = getSkill("convex");

// Get a specific reference
const functions = getReference("convex", "functions");

// List all references
console.log(listReferences("convex"));
```

### Claude Code

```bash
# From marketplace
/plugin marketplace add waynesutton/convexskills
/plugin install convex-skills

# Or from local clone
git clone https://github.com/waynesutton/convexskills.git
```

### Cursor

Add via Settings > Rules > Add Rule > Remote Rule (GitHub) with `waynesutton/convexskills`, or install from the `.cursor-plugin/` config.

### Codex / OpenCode

```bash
# Copy the skill to your agent's skills directory
cp -r skills/convex "$CODEX_HOME/skills/"
# or
cp -r skills/convex ~/.config/opencode/skills/
```

### Standard Agent Skills Path

```bash
convex-skills install --target agents        # copies to .agents/skills/convex/
convex-skills install --target agents --link  # symlinks instead
```

## Skill Structure

```
skills/convex/
├── SKILL.md                          # Main entry point with decision trees
├── assets/                           # Logo files
└── references/
    ├── functions.md                  # Queries, mutations, actions
    ├── schema-validator.md           # Database schemas and validators
    ├── realtime.md                   # Reactive subscriptions
    ├── http-actions.md               # Webhooks and HTTP endpoints
    ├── file-storage.md               # File uploads and serving
    ├── cron-jobs.md                  # Scheduled background tasks
    ├── migrations.md                 # Schema evolution and data backfills
    ├── agents.md                     # AI agents with tools
    ├── component-authoring.md        # Reusable Convex packages
    ├── best-practices.md             # General patterns and guidelines
    ├── security-check.md             # Quick security checklist
    ├── security-audit.md             # Deep security review
    └── avoid-feature-creep.md        # Preventing scope creep
```

## Repository Structure

```
convex-skills/
├── skills/convex/            # The consolidated Convex skill
├── command/convex.md         # /convex slash command
├── templates/                # Templates for forking developers
│   ├── CLAUDE.md             # Project context template
│   └── skills/               # Claude Code skill templates
├── .claude-plugin/           # Claude Code plugin config
├── .cursor-plugin/           # Cursor plugin config
├── .codex/                   # Codex integration
├── AGENTS.md                 # Agent-facing documentation
├── CLAUDE.md                 # Claude configuration
├── GEMINI.md                 # Gemini CLI integration
└── LICENSE                   # Apache-2.0
```

## Templates

When you fork this repo, copy templates to set up your project:

```bash
convex-skills install-templates
```

| Template | Description |
|----------|-------------|
| [CLAUDE.md](templates/CLAUDE.md) | Project context template for Convex projects |
| [dev.md](templates/skills/dev.md) | Full-stack development practices |
| [help.md](templates/skills/help.md) | Problem-solving methodology |
| [gitrules.md](templates/skills/gitrules.md) | Git safety protocols |

## Usage

The skill is automatically available once installed. Agents load `SKILL.md` when Convex-related tasks are detected, then drill into specific references as needed.

```
Help me set up file uploads in Convex
Create a cron job to clean up expired sessions
Add a webhook endpoint for Stripe
Build an AI agent with Convex
```

### Slash Command

```
/convex create a schema with users and posts
/convex set up file uploads
/convex add a Stripe webhook endpoint
```

## License

Apache-2.0 — see [LICENSE](LICENSE) for details.

## References

- [npm Package](https://www.npmjs.com/package/@waynesutton/convex-skills)
- [Convex Documentation](https://docs.convex.dev/)
- [Convex LLMs.txt](https://docs.convex.dev/llms.txt)
- [Agent Skills Specification](https://agentskills.io/)
