import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function main() {
  const indexHtml = await read("index.html");
  const appJs = await read("app.js");

  const requiredIndexText = [
    "Open EVA",
    "Open Orbis",
    "Cookie",
    "Search-first support for EVA and Orbis (UTG)",
  ];

  const requiredAppText = [
    "name: \"Orbis\"",
    "title: \"What is Orbis (UTG)?\"",
    "title: \"How do I install and onboard Orbis?\"",
    "title: \"How does the human approval flow work in Orbis?\"",
    "title: \"Why does Orbis emphasize idempotency?\"",
    "slug: \"what-is-universal-transaction-gateway\"",
    "slug: \"utg-human-approval-flow\"",
    "slug: \"eva-first-review\"",
    "View Orbis GitHub",
  ];

  for (const text of requiredIndexText) {
    if (!indexHtml.includes(text)) {
      throw new Error(`index.html is missing expected text: ${text}`);
    }
  }

  for (const text of requiredAppText) {
    if (!appJs.includes(text)) {
      throw new Error(`app.js is missing expected text: ${text}`);
    }
  }

  console.log("Verified support shell content for EVA and Orbis.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
