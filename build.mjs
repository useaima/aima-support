import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");

async function copyIfPresent(file) {
  await cp(path.join(root, file), path.join(distDir, file), { force: true });
}

async function main() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  const staticFiles = ["index.html", "styles.css", "app.js", "favicon.ico", "logo.png", "robots.txt", "sitemap.xml"];

  for (const file of staticFiles) {
    await copyIfPresent(file);
  }

  console.log("Built support site shell for shared CMS-driven content.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
