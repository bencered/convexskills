---
name: convex
description: Comprehensive Convex platform skill covering functions, schema, realtime subscriptions, file storage, HTTP actions, cron jobs, migrations, agents, components, security, and best practices. Use for any Convex development task.
license: Apache-2.0
compatibility: Requires Node.js 18+. Works with Claude Code, Cursor, OpenCode, Codex, and any agent supporting the Agent Skills standard.
allowed-tools: Bash(npx:*) Bash(node:*) Read Write Edit
metadata:
  version: "2.0.0"
  tags: "convex, backend, database, realtime, typescript"
---

# Convex Platform Skill

Consolidated skill for building on the Convex platform. Use the decision trees below to find the right reference, then load detailed guidance.

Your knowledge of Convex APIs and patterns may be outdated. **Prefer retrieval over pre-training** — the references in this skill are starting points, not source of truth.

## Retrieval Sources

| Source | URL | Use for |
|--------|-----|---------|
| Convex docs | https://docs.convex.dev | API reference, limits, configuration |
| LLM-optimized docs | https://docs.convex.dev/llms.txt | Compact reference for agents |

When a reference file and the docs disagree, **trust the docs**.

## Quick Decision Trees

### "I need to write backend logic"

```
Need backend code?
├─ Read data reactively → references/realtime.md
├─ Read/write data (queries, mutations) → references/functions.md
├─ Call external APIs or do async work → references/functions.md (actions)
├─ Handle incoming webhooks/HTTP → references/http-actions.md
├─ Schedule recurring tasks → references/cron-jobs.md
└─ Build AI agents with tools → references/agents.md
```

### "I need to model or migrate data"

```
Need data work?
├─ Define tables and validators → references/schema-validator.md
├─ Evolve schema or backfill data → references/migrations.md
└─ Upload/serve files → references/file-storage.md
```

### "I need to build reusable packages"

```
Building components?
└─ Reusable Convex packages → references/component-authoring.md
```

### "I need to ship quality code"

```
Need quality guidance?
├─ General patterns and conventions → references/best-practices.md
├─ Quick security checklist → references/security-check.md
├─ Deep security review → references/security-audit.md
└─ Prevent scope creep → references/avoid-feature-creep.md
```

## References

| Reference | Use when |
|-----------|----------|
| `functions` | Writing queries, mutations, actions |
| `schema-validator` | Defining database schemas and validators |
| `realtime` | Building reactive subscriptions |
| `http-actions` | Webhooks and HTTP endpoints |
| `file-storage` | File uploads, serving, storage |
| `cron-jobs` | Scheduled background tasks |
| `migrations` | Schema evolution, data backfills |
| `agents` | Building AI agents with tools |
| `component-authoring` | Reusable Convex packages |
| `best-practices` | General patterns and guidelines |
| `security-check` | Quick security audit checklist |
| `security-audit` | Deep security review |
| `avoid-feature-creep` | Preventing scope creep in projects |

## Quick Start

For most Convex tasks:
1. Start with `best-practices` for general patterns
2. Use `functions` for writing backend logic
3. Use `schema-validator` for data modeling
4. Load specific references as needed
