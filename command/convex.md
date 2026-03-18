# /convex

Convex platform reference for AI/LLM consumption. Load this skill for contextual guidance when building with Convex.

## Usage

```
/convex create a schema with users and posts
/convex set up file uploads
/convex add a cron job to clean up expired sessions
/convex build an AI agent with tools
/convex add a Stripe webhook endpoint
/convex run a security audit
```

## Quick Reference

### Function Types

| Type | Database | External APIs | Use Case |
|------|----------|---------------|----------|
| `query` | Read-only | No | Fetching data (reactive, cached) |
| `mutation` | Read/Write | No | Modifying data (transactional) |
| `action` | Via runQuery/runMutation | Yes | External integrations |
| `httpAction` | Via runQuery/runMutation | Yes | Webhooks, REST APIs |

### Core Principles

1. **Always use validators** for args and returns
2. **Use indexes** instead of filters for queries
3. **Make mutations idempotent** with early returns
4. **Use internal functions** for sensitive operations
5. **Batch operations** for large datasets

## Decision Trees

### What are you building?

```
Need to store/query data?
├── Define schema → references/schema-validator.md
├── Write functions → references/functions.md
└── Build reactive UI → references/realtime.md

Need external integrations?
├── Webhooks/REST API → references/http-actions.md
├── Scheduled tasks → references/cron-jobs.md
└── File handling → references/file-storage.md

Building AI features?
└── AI agents, RAG, tools → references/agents.md

Need to review code?
├── Quick security check → references/security-check.md
├── Deep security audit → references/security-audit.md
└── Best practices review → references/best-practices.md

Maintaining existing code?
├── Schema changes → references/migrations.md
├── Component creation → references/component-authoring.md
└── Scope management → references/avoid-feature-creep.md
```

## References

All references live under `skills/convex/references/`:

| Reference | Description |
|-----------|-------------|
| `functions` | Queries, mutations, actions |
| `schema-validator` | Database schemas and validators |
| `realtime` | Reactive subscriptions |
| `http-actions` | Webhooks and HTTP endpoints |
| `file-storage` | File uploads and serving |
| `cron-jobs` | Scheduled background tasks |
| `migrations` | Schema evolution and data backfills |
| `agents` | AI agents with tools |
| `component-authoring` | Reusable Convex packages |
| `best-practices` | General patterns and guidelines |
| `security-check` | Quick security checklist |
| `security-audit` | Deep security review |
| `avoid-feature-creep` | Preventing scope creep |

## DO NOT

- Run `npx convex deploy` without explicit instruction
- Run any git commands without explicit instruction
- Edit files in `convex/_generated/`
- Use `filter()` instead of `withIndex()` on large tables
- Store secrets in code (use environment variables)
- Make public functions that should be internal

## Documentation Sources

Always fetch the latest documentation before implementing:

- **Primary**: https://docs.convex.dev/
- **LLMs.txt**: https://docs.convex.dev/llms.txt
