# Codex Skills Integration

This folder enables Codex to auto-discover Convex skills from this repository.

## Setup

The `.codex/skills/convex` symlink points to `../../skills/convex`, so Codex auto-discovers the consolidated skill.

To set up in your own project:

```bash
mkdir -p .codex/skills
ln -s ../../skills/convex .codex/skills/convex
```

## Available

Single consolidated `convex` skill with 13 reference files under `skills/convex/references/`.

See the main [README](/README.md) for full documentation.
