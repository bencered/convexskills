# Codebase Structure

```
convex-skills/
├── skills/
│   └── convex/                       # Consolidated Convex skill
│       ├── SKILL.md                  # Main entry point (decision trees, reference index)
│       ├── assets/                   # Logo files
│       │   ├── large-logo.png
│       │   └── small-logo.svg
│       └── references/               # Detailed reference docs
│           ├── functions.md          # Queries, mutations, actions
│           ├── schema-validator.md   # Database schemas and validators
│           ├── realtime.md           # Reactive subscriptions
│           ├── http-actions.md       # HTTP endpoints, webhooks
│           ├── file-storage.md       # File uploads and serving
│           ├── cron-jobs.md          # Scheduled background tasks
│           ├── migrations.md         # Schema evolution, data backfills
│           ├── agents.md             # AI agents with tools
│           ├── component-authoring.md # Reusable Convex packages
│           ├── best-practices.md     # General patterns and guidelines
│           ├── security-check.md     # Quick security checklist
│           ├── security-audit.md     # Deep security review
│           └── avoid-feature-creep.md # Preventing scope creep
│
├── command/
│   └── convex.md                     # /convex slash command
│
├── templates/                        # Templates for forking developers
│   ├── CLAUDE.md                     # Project context template
│   └── skills/
│       ├── dev.md                    # Full-stack development practices
│       ├── help.md                   # Problem-solving methodology
│       ├── gitrules.md               # Git safety protocols
│       └── README.md                 # Template installation guide
│
├── .claude-plugin/                   # Claude Code plugin config
│   ├── plugin.json
│   └── marketplace.json
│
├── .cursor-plugin/                   # Cursor plugin config
│   ├── plugin.json
│   └── marketplace.json
│
├── .codex/                           # Codex integration
│   └── README.md
│
├── bin/
│   └── cli.js                        # CLI entry point (convex-skills command)
│
├── index.js                          # Programmatic API
├── package.json                      # npm package config (v2.0.0)
├── AGENTS.md                         # Agent-facing documentation
├── agents.md                         # Passive context for AI agents
├── CLAUDE.md                         # Claude Code configuration
├── GEMINI.md                         # Gemini CLI integration
├── README.md                         # Project overview
├── CONTRIBUTING.md                   # Contribution guidelines
├── changelog.md                      # Version history
├── docs.md                           # Documentation index
├── files.md                          # This file
└── LICENSE                           # Apache-2.0
```

## Key Files

- **`skills/convex/SKILL.md`** — The main skill file. Agents load this first, then drill into references as needed (progressive disclosure).
- **`index.js`** — Programmatic API: `getSkill()`, `getReference()`, `listReferences()`, `REFERENCES`.
- **`bin/cli.js`** — CLI: `convex-skills install`, `convex-skills list`, `convex-skills show [reference]`.
- **`agents.md`** — Always-loaded passive context with Convex docs index and quick reference patterns.
