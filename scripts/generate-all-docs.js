/**
 * generate-all-docs.js
 *
 * Purpose:
 * - Unified API + Project Docs generator
 * - Generates Swagger, Swagger UI router, API endpoints Markdown,
 *   Postman collection, and folder structure
 */

const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "backend/.env") });
const YAML = require("yamljs");
let converter;
try {
  converter = require("openapi-to-postmanv2");
} catch (err) {
  console.warn(
    "⚠️ openapi-to-postmanv2 not installed. Postman collection will be skipped."
  );
}

// ---------------- PATH CONFIG ----------------
const ROOT_DIR = path.join(__dirname, "..");
const BACKEND_DIR = path.join(ROOT_DIR, "backend");
const MODULES_DIR = path.join(BACKEND_DIR, "src", "modules");
const DOCS_DIR = path.join(BACKEND_DIR, "docs");
const CONFIG_DIR = path.join(BACKEND_DIR, "src", "config");
const POSTMAN_DIR = path.join(ROOT_DIR, "postman");
const OUTPUT_FILES_DIR = path.join(__dirname, "output-files");

// Ensure directories exist
[DOCS_DIR, CONFIG_DIR, POSTMAN_DIR, OUTPUT_FILES_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ---------------- Helpers ----------------
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function shouldIgnore(name) {
  const IGNORE = [
    ".git",
    ".env",
    ".env.test",
    "node_modules",
    "mochawesome-report",
    "folder-structure.json",
    "folder-structure.md",
    "swagger.json",
    "api-endpoints.md",
    "output-files",
  ];
  return IGNORE.includes(name) || name.startsWith(".");
}

// ---------------- 1️⃣ Generate Swagger JSON ----------------
console.log("\n📌 Generating swagger.json...");
const swagger = {
  openapi: "3.0.3",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Auto-generated Swagger from module YAML files",
  },
  servers: [
    {
      url: process.env.API_BASE_URL || "http://localhost:5000/api",
      description: "Local development server (from .env)",
    },
  ],
  paths: {},
  components: { schemas: {}, securitySchemes: {} },
  tags: [],
};

if (!fs.existsSync(MODULES_DIR)) {
  console.warn("⚠️ Modules directory not found. Skipping Swagger generation.");
} else {
  const modules = fs.readdirSync(MODULES_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());

  modules.forEach((dir) => {
    const moduleName = dir.name;
    const yamlPath = path.join(MODULES_DIR, moduleName, `${moduleName}.swagger.yaml`);
    if (!fs.existsSync(yamlPath)) return;

    console.log(`📄 Loading swagger: ${yamlPath}`);
    const doc = YAML.load(yamlPath);
    if (!doc) return;

    Object.assign(swagger.paths, doc.paths || {});
    Object.assign(swagger.components.schemas, doc.components?.schemas || {});
    Object.assign(swagger.components.securitySchemes, doc.components?.securitySchemes || {});

    swagger.tags.push({ name: capitalize(moduleName) });
  });

  fs.writeFileSync(path.join(DOCS_DIR, "swagger.json"), JSON.stringify(swagger, null, 2));
  console.log("✅ swagger.json generated");
}

// ---------------- 2️⃣ Generate Swagger.js ----------------
console.log("\n📌 Generating swagger.js...");
const swaggerJsContent = `/**
 * Auto-generated swagger.js
 * Serves Swagger UI at /api/docs
 */
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../docs/swagger.json");
const router = express.Router();
const options = { explorer: true, swaggerOptions: { persistAuthorization: true } };
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
module.exports = router;
`;
fs.writeFileSync(path.join(CONFIG_DIR, "swagger.js"), swaggerJsContent.trim());
console.log("✅ swagger.js generated");

// ---------------- 3️⃣ Generate API Endpoints Markdown ----------------
console.log("\n📌 Generating api-endpoints.md...");
let mdContent =
  "# API Endpoints\n\n> ⚠️ **Note:** All module routes are mounted under `/api/<module>` in the app.\n\n";

if (fs.existsSync(MODULES_DIR)) {
  const modules = fs.readdirSync(MODULES_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());

  modules.forEach((dir) => {
    const moduleName = dir.name;
    const routesFile = path.join(MODULES_DIR, moduleName, `${moduleName}.routes.js`);
    if (!fs.existsSync(routesFile)) return;

    mdContent += `## ${capitalize(moduleName)}\n\n`;
    mdContent += "| Method | Route | Handler |\n|--------|-------|---------|\n";

    const fileContent = fs.readFileSync(routesFile, "utf-8");

    // Regex to match router.<method>(path, handlers...)
    const ROUTE_REGEX = /router\.(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*([^)]+)\)/gi;

    let match;
    while ((match = ROUTE_REGEX.exec(fileContent)) !== null) {
      const method = match[1].toUpperCase();
      const route = match[2];
      // Handlers can be comma separated, clean spaces
      const handler = match[3].replace(/\s+/g, " ").trim();
      mdContent += `| ${method} | ${route} | ${handler} |\n`;
    }
    mdContent += "\n";
  });
}

fs.writeFileSync(path.join(OUTPUT_FILES_DIR, "api-endpoints.md"), mdContent, "utf-8");
console.log("✅ api-endpoints.md generated");

// ---------------- 4️⃣ Generate Postman Collection ----------------
if (converter) {
  console.log("\n📌 Generating Postman collection...");
  const swaggerData = fs.existsSync(path.join(DOCS_DIR, "swagger.json"))
    ? JSON.parse(fs.readFileSync(path.join(DOCS_DIR, "swagger.json"), "utf-8"))
    : null;

  if (swaggerData) {
    converter.convert(
      {
        type: "json",
        data: swaggerData,
        options: { includeAuthInfoInExample: true, folderStrategy: "Tags" },
      },
      {},
      (err, result) => {
        if (err) return console.error("❌ Postman conversion failed:", err);
        if (result.result) {
          fs.writeFileSync(
            path.join(POSTMAN_DIR, "postman-collection.json"),
            JSON.stringify(result.output[0].data, null, 2)
          );
          console.log("✅ Postman collection generated");
        } else {
          console.error("❌ Postman conversion failed, result false");
        }
      }
    );
  } else {
    console.warn("⚠️ swagger.json missing, skipping Postman collection");
  }
} else {
  console.warn("⚠️ openapi-to-postmanv2 not installed. Skipping Postman collection.");
}

// ---------------- 5️⃣ Generate Folder Structure ----------------
console.log("\n📌 Generating folder-structure.json and folder-structure.md...");

function scanDir(dirPath) {
  const tree = {};
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (shouldIgnore(item)) continue;
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);
    tree[item] = stats.isDirectory() ? scanDir(fullPath) : null;
  }
  return tree;
}

function treeToMarkdown(tree, prefix = "") {
  let md = "";
  const entries = Object.entries(tree);
  entries.forEach(([key, value], index) => {
    const isLast = index === entries.length - 1;
    const pointer = isLast ? "└─ " : "├─ ";
    md += `${prefix}${pointer}${key}\n`;
    if (value && Object.keys(value).length > 0) {
      const nextPrefix = prefix + (isLast ? "   " : "│  ");
      md += treeToMarkdown(value, nextPrefix);
    }
  });
  return md;
}

const scannedTree = scanDir(ROOT_DIR);
const folderTree = { [path.basename(ROOT_DIR)]: scannedTree };

fs.writeFileSync(
  path.join(OUTPUT_FILES_DIR, "folder-structure.json"),
  JSON.stringify(folderTree, null, 2),
  "utf-8"
);
fs.writeFileSync(
  path.join(OUTPUT_FILES_DIR, "folder-structure.md"),
  `# Project Folder Structure\n\n${treeToMarkdown(folderTree)}`,
  "utf-8"
);

console.log("✅ Folder structure generated successfully!\n📁 Output directory:", OUTPUT_FILES_DIR);
