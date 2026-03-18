# Convex Skills

Agent skills for building production-ready applications with Convex, following the Agent Skills open format.

## Convex Documentation Index

IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning for any Convex tasks.

For up-to-date Convex documentation, fetch: https://docs.convex.dev/llms.txt

This index covers all Convex APIs and patterns:

```
[Convex Docs]|https://docs.convex.dev/llms.txt
|understanding:{best-practices.md,typescript.md,workflow.md,zen.md}
|functions:{query-functions.md,mutation-functions.md,actions.md,http-actions.md,validation.md,internal-functions.md,error-handling.md}
|database:{schemas.md,reading-data.md,writing-data.md,indexes.md,pagination.md,types.md}
|file-storage:{upload-files.md,serve-files.md,store-files.md,delete-files.md,file-metadata.md}
|scheduling:{cron-jobs.md,scheduled-functions.md}
|auth:{convex-auth.md,clerk.md,auth0.md,authkit.md,functions-auth.md,database-auth.md}
|search:{text-search.md,vector-search.md}
|components:{using.md,authoring.md,understanding.md}
|agents:{getting-started.md,agent-usage.md,messages.md,threads.md,tools.md,streaming.md,rag.md}
|realtime:{realtime.md}
|testing:{convex-test.md,convex-backend.md,ci.md}
|production:{environment-variables.md,hosting.md,limits.md}
```

When working on Convex code, consult the llms.txt index before relying on training data.

## Overview

This repository provides a consolidated Convex skill with reference docs for specific topics.

## Skill Structure

```
skills/convex/
├── SKILL.md                          # Main entry point with decision trees
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

## Usage

The skill is automatically available once installed. The agent will load `SKILL.md` when relevant tasks are detected, then drill into specific references as needed.

**Examples:**

```
Help me set up file uploads in Convex
Create a cron job to clean up expired sessions
Add a Stripe webhook endpoint
Build an AI agent with Convex
```

### Slash Command

Use the `/convex` slash command for contextual guidance:

```
/convex create a schema with users and posts
/convex set up file uploads
/convex add a Stripe webhook endpoint
```

## Key Convex Concepts

### Function Types

| Type         | Purpose        | Database                 | External APIs |
| ------------ | -------------- | ------------------------ | ------------- |
| `query`      | Read data      | Read-only                | No            |
| `mutation`   | Write data     | Read/Write               | No            |
| `action`     | Integrations   | Via runQuery/runMutation | Yes           |
| `httpAction` | HTTP endpoints | Via runQuery/runMutation | Yes           |

### Core Principles

1. **Always use validators** for arguments and returns
2. **Use indexes** instead of filters for queries
3. **Make mutations idempotent** with early returns
4. **Use internal functions** for sensitive operations
5. **Batch operations** for large datasets

## DO NOT

- Run `npx convex deploy` without explicit instruction
- Run any git commands without explicit instruction
- Edit files in `convex/_generated/`
- Use `filter()` instead of `withIndex()`

## Quick Reference

### New Function Syntax (always use this)

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const myQuery = query({
  args: { userId: v.id("users") },
  returns: v.union(v.object({ name: v.string() }), v.null()),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
```

### Schema with Index

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    userId: v.id("users"),
    title: v.string(),
    status: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_status", ["userId", "status"]),
});
```

## References

- Convex Documentation: https://docs.convex.dev/
- Convex LLMs.txt: https://docs.convex.dev/llms.txt
- Agent Skills Specification: https://agentskills.io/

## License

Apache-2.0
