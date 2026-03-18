import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync, readdirSync, existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the path to the skills directory
 */
export function getSkillsPath() {
  return join(__dirname, "skills");
}

/**
 * Get the path to the templates directory
 */
export function getTemplatesPath() {
  return join(__dirname, "templates");
}

/**
 * List all available skills (top-level skill directories)
 */
export function listSkills() {
  const skillsPath = getSkillsPath();
  const skills = readdirSync(skillsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return skills;
}

/**
 * List all reference files for a skill
 */
export function listReferences(skillName) {
  const refsPath = join(getSkillsPath(), skillName, "references");
  if (!existsSync(refsPath)) return [];
  return readdirSync(refsPath)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/**
 * Get a skill's SKILL.md content by name
 */
export function getSkill(skillName) {
  const skillPath = join(getSkillsPath(), skillName, "SKILL.md");
  if (!existsSync(skillPath)) {
    const refName = skillName.replace(/^convex-/, "");
    const refPath = join(getSkillsPath(), "convex", "references", `${refName}.md`);
    if (existsSync(refPath)) {
      throw new Error(
        `Skill "${skillName}" was consolidated into convex/references/${refName} in v2.0. ` +
        `Use getReference("convex", "${refName}") instead.`
      );
    }
    throw new Error(`Skill not found: ${skillName}`);
  }
  return readFileSync(skillPath, "utf-8");
}

/**
 * Get a reference file's content
 */
export function getReference(skillName, refName) {
  const refPath = join(getSkillsPath(), skillName, "references", `${refName}.md`);
  if (!existsSync(refPath)) {
    throw new Error(`Reference not found: ${skillName}/references/${refName}.md`);
  }
  return readFileSync(refPath, "utf-8");
}

/**
 * Get the path to a specific skill
 */
export function getSkillPath(skillName) {
  const skillPath = join(getSkillsPath(), skillName, "SKILL.md");
  if (existsSync(skillPath)) return skillPath;
  const refName = skillName.replace(/^convex-/, "");
  const refPath = join(getSkillsPath(), "convex", "references", `${refName}.md`);
  if (existsSync(refPath)) return refPath;
  throw new Error(`Skill or reference not found: ${skillName}`);
}

/**
 * Available references with descriptions
 */
export const REFERENCES = {
  "best-practices": "Guidelines for building production-ready Convex apps",
  "functions": "Writing queries, mutations, actions, and HTTP actions",
  "realtime": "Patterns for building reactive applications",
  "schema-validator": "Database schema definition and validation",
  "file-storage": "File upload, storage, and serving",
  "agents": "Building AI agents with Convex",
  "cron-jobs": "Scheduled functions and background tasks",
  "http-actions": "HTTP endpoints and webhook handling",
  "migrations": "Schema evolution and data migrations",
  "security-check": "Quick security audit checklist",
  "security-audit": "Deep security review patterns",
  "component-authoring": "Creating reusable Convex components",
  "avoid-feature-creep": "Preventing scope creep in projects",
};

/** @deprecated Use REFERENCES instead. Note: keys changed in v2 (e.g. "convex-functions" → "functions") */
export const SKILLS = {
  ...REFERENCES,
  // v1 backward-compat keys (prefixed names)
  "convex-best-practices": REFERENCES["best-practices"],
  "convex-functions": REFERENCES["functions"],
  "convex-realtime": REFERENCES["realtime"],
  "convex-schema-validator": REFERENCES["schema-validator"],
  "convex-file-storage": REFERENCES["file-storage"],
  "convex-agents": REFERENCES["agents"],
  "convex-cron-jobs": REFERENCES["cron-jobs"],
  "convex-http-actions": REFERENCES["http-actions"],
  "convex-migrations": REFERENCES["migrations"],
  "convex-security-check": REFERENCES["security-check"],
  "convex-security-audit": REFERENCES["security-audit"],
  "convex-component-authoring": REFERENCES["component-authoring"],
};

export default {
  getSkillsPath,
  getTemplatesPath,
  listSkills,
  listReferences,
  getSkill,
  getReference,
  getSkillPath,
  REFERENCES,
  SKILLS,
};
