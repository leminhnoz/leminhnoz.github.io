import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const postsDir = path.resolve("src/content/blog");
const distDir = path.resolve("dist");
const filePattern = /^(\d{4})-(\d{2})-(\d{2})-(.+)\.(?:md|mdx)$/;
const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---/;
const headingPattern = /^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/m;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stripYamlQuotes(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

function frontmatterTitle(raw) {
  const frontmatter = raw.match(frontmatterPattern)?.[1];
  const titleLine = frontmatter
    ?.split(/\r?\n/)
    .map((line) => line.match(/^title:\s*(.+)$/)?.[1])
    .find(Boolean);

  return titleLine ? stripYamlQuotes(titleLine) : undefined;
}

function redirectPage(destination, title) {
  const escapedDestination = escapeHtml(destination);
  const escapedTitle = escapeHtml(title);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex">
    <meta http-equiv="refresh" content="0; url=${escapedDestination}">
    <link rel="canonical" href="${escapedDestination}">
    <title>Redirecting to ${escapedTitle}</title>
  </head>
  <body>
    <p><a href="${escapedDestination}">Continue to ${escapedTitle}</a></p>
  </body>
</html>
`;
}

async function writeRedirect(target, destination, title) {
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, redirectPage(destination, title));
}

const files = (await readdir(postsDir)).filter((file) => /\.(?:md|mdx)$/.test(file));

for (const file of files) {
  const match = file.match(filePattern);

  if (!match) {
    throw new Error(`Post filename must match YYYY-MM-DD-slug.md: ${file}`);
  }

  const [, year, month, day, slug] = match;
  const postId = file.replace(/\.(?:md|mdx)$/, "");
  const raw = await readFile(path.join(postsDir, file), "utf8");
  const title = frontmatterTitle(raw)
    || raw.match(headingPattern)?.[1]?.trim()
    || slug.replace(/-/g, " ");
  const destination = `/blog/${postId.toLowerCase()}/`;

  await writeRedirect(path.join(distDir, "posts", postId, "index.html"), destination, title);
  await writeRedirect(path.join(distDir, year, month, day, `${slug}.html`), destination, title);
}
