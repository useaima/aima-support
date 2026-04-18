import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");

async function main() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(path.join(distDir, "articles"), { recursive: true });

  const staticFiles = ["index.html", "styles.css", "app.js", "data.json"];

  for (const file of staticFiles) {
    await cp(path.join(root, file), path.join(distDir, file));
  }

  const articleHtml = await readFile(path.join(root, "index.html"), "utf8");
  const supportData = JSON.parse(await readFile(path.join(root, "data.json"), "utf8"));
  const articles = supportData.categories.flatMap((category) => category.articles);

  for (const article of articles) {
    const articleDir = path.join(distDir, "articles", article.id);
    await mkdir(articleDir, { recursive: true });
    await writeFile(path.join(articleDir, "index.html"), articleHtml, "utf8");
  }

  console.log(`Built support site with ${articles.length} article routes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
