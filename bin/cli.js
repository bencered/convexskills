#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  copyFileSync,
  readdirSync,
  symlinkSync,
} from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, "..");

const { REFERENCES } = await import(join(packageRoot, "index.js"));

const TARGET_ALIASES = new Map([
  ["claude", ".claude/skills"],
  ["codex", ".codex/skills"],
  ["cursor", ".cursor/skills"],
  ["agents", ".agents/skills"],
]);

function printHelp() {
  console.log(`
convex-skills - Agent skills for building Convex applications

USAGE:
  convex-skills <command> [options]

COMMANDS:
  list                    List the skill and its references
  install                 Install the convex skill to your project
  install-templates       Install template files to your project
  show [reference]        Print skill content (or a specific reference)
  path [reference]        Print the path to the skill or a reference file

OPTIONS:
  --dir <path>            Target directory (default: current directory)
  --target <name|path>    Install target: claude, codex, cursor, agents, or a path
  --link                  Symlink instead of copying
  --help, -h              Show this help message

EXAMPLES:
  convex-skills list
  convex-skills install
  convex-skills install --target agents
  convex-skills install --target cursor --link
  convex-skills install-templates
  convex-skills show
  convex-skills show functions
  convex-skills show agents
  convex-skills path                  Print path to main SKILL.md
  convex-skills path functions        Print path to a reference file
  convex-skills path convex-functions (v1 names also work)

REFERENCES:
${Object.entries(REFERENCES)
  .map(([name, desc]) => `  ${name.padEnd(25)} ${desc}`)
  .join("\n")}
`);
}

function listSkills() {
  console.log("\nConvex Skill (consolidated)\n");
  console.log("  convex                       Comprehensive Convex platform skill\n");
  console.log("References:\n");
  Object.entries(REFERENCES).forEach(([name, desc]) => {
    console.log(`  ${name.padEnd(25)} ${desc}`);
  });
  console.log("");
}

function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

function resolveTargetSkillsDir(targetDir, target) {
  if (!target) {
    return join(targetDir, ".claude", "skills");
  }

  const alias = TARGET_ALIASES.get(target);
  if (alias) {
    return join(targetDir, alias);
  }

  const resolved = resolve(targetDir, target);
  return resolved.endsWith("skills") ? resolved : join(resolved, "skills");
}

function installSkill(targetSkillsDir, useSymlink) {
  const skillSrc = join(packageRoot, "skills", "convex");
  const targetPath = join(targetSkillsDir, "convex");

  ensureDir(targetPath);

  if (useSymlink) {
    const skillMdSrc = join(skillSrc, "SKILL.md");
    const skillMdDest = join(targetPath, "SKILL.md");
    if (!existsSync(skillMdDest)) {
      symlinkSync(skillMdSrc, skillMdDest);
    }
    // Symlink references dir
    const refsSrc = join(skillSrc, "references");
    const refsDest = join(targetPath, "references");
    if (!existsSync(refsDest)) {
      symlinkSync(refsSrc, refsDest);
    }
    console.log(`Linked convex skill to ${targetPath}`);
    return;
  }

  // Copy SKILL.md
  copyFileSync(join(skillSrc, "SKILL.md"), join(targetPath, "SKILL.md"));

  // Copy references/
  const refsSrc = join(skillSrc, "references");
  const refsDest = join(targetPath, "references");
  ensureDir(refsDest);
  for (const file of readdirSync(refsSrc)) {
    copyFileSync(join(refsSrc, file), join(refsDest, file));
  }

  console.log(`Installed convex skill (with ${readdirSync(refsSrc).length} references) to ${targetPath}`);
}

function installTemplates(targetDir) {
  const templatesDir = join(packageRoot, "templates");

  // Install CLAUDE.md template
  const claudeTemplate = join(templatesDir, "CLAUDE.md");
  if (existsSync(claudeTemplate)) {
    const targetClaude = join(targetDir, "CLAUDE.md");
    if (!existsSync(targetClaude)) {
      copyFileSync(claudeTemplate, targetClaude);
      console.log(`Installed CLAUDE.md template`);
    } else {
      console.log(`Skipping CLAUDE.md (already exists)`);
    }
  }

  // Install skill templates
  const skillTemplatesDir = join(templatesDir, "skills");
  if (existsSync(skillTemplatesDir)) {
    const templates = readdirSync(skillTemplatesDir).filter((f) =>
      f.endsWith(".md"),
    );
    const targetSkillsDir = join(targetDir, ".claude", "skills");

    ensureDir(targetSkillsDir);

    templates.forEach((template) => {
      const src = join(skillTemplatesDir, template);
      const dest = join(targetSkillsDir, template);
      if (!existsSync(dest)) {
        copyFileSync(src, dest);
        console.log(`Installed template: ${template}`);
      } else {
        console.log(`Skipping ${template} (already exists)`);
      }
    });
  }

  console.log("\nDone!");
}

function showSkill(refName) {
  if (!refName) {
    // Show main SKILL.md
    const skillPath = join(packageRoot, "skills", "convex", "SKILL.md");
    console.log(readFileSync(skillPath, "utf-8"));
    return;
  }

  const refPath = join(packageRoot, "skills", "convex", "references", `${refName}.md`);
  if (!existsSync(refPath)) {
    console.error(`Error: Reference not found: ${refName}`);
    console.log("Run 'convex-skills list' to see available references.");
    process.exit(1);
  }
  console.log(readFileSync(refPath, "utf-8"));
}

// Parse arguments
const args = process.argv.slice(2);
let targetDir = process.cwd();
let target = null;
let useSymlink = false;

// Check for --dir flag
const dirIndex = args.indexOf("--dir");
if (dirIndex !== -1 && args[dirIndex + 1]) {
  targetDir = resolve(args[dirIndex + 1]);
  args.splice(dirIndex, 2);
}

const targetIndex = args.indexOf("--target");
if (targetIndex !== -1 && args[targetIndex + 1]) {
  target = args[targetIndex + 1];
  args.splice(targetIndex, 2);
}

const linkIndex = args.indexOf("--link");
if (linkIndex !== -1) {
  useSymlink = true;
  args.splice(linkIndex, 1);
}

const command = args[0];
const arg = args[1];
const targetSkillsDir = resolveTargetSkillsDir(targetDir, target);

switch (command) {
  case "list":
    listSkills();
    break;
  case "install":
    if (arg && arg !== "convex") {
      console.warn(`Warning: Individual skill "${arg}" no longer exists. Since v2.0, all skills are consolidated into a single "convex" skill with references.`);
      console.warn(`Installing the full convex skill instead. Use "convex-skills show ${arg.replace(/^convex-/, "")}" to view a specific reference.\n`);
    }
    installSkill(targetSkillsDir, useSymlink);
    break;
  case "install-all":
    // Backward compat — same as install now
    installSkill(targetSkillsDir, useSymlink);
    break;
  case "install-templates":
    installTemplates(targetDir);
    break;
  case "show":
    showSkill(arg);
    break;
  case "path":
    if (arg && arg !== "convex") {
      const refName = arg.replace(/^convex-/, "");
      const refPath = join(packageRoot, "skills", "convex", "references", `${refName}.md`);
      if (existsSync(refPath)) {
        console.log(refPath);
      } else {
        console.error(`Reference not found: ${refName}`);
        process.exit(1);
      }
    } else {
      console.log(join(packageRoot, "skills", "convex", "SKILL.md"));
    }
    break;
  case "--help":
  case "-h":
  case "help":
  case undefined:
    printHelp();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}
