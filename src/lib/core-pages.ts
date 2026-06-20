import { readFile } from "node:fs/promises";
import nodePath from "node:path";
import { siteJsonLd } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const corePagesDir = nodePath.join(process.cwd(), "src/content/core-pages");

type CorePageFile = "index.html" | "about.html" | "quiz.html";

const pagePaths: Record<CorePageFile, string> = {
  "index.html": "",
  "about.html": "/about",
  "quiz.html": "/quiz",
};

const headers = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "public, max-age=0, must-revalidate",
};

export async function corePageResponse(fileName: CorePageFile) {
  const html = await readFile(nodePath.join(corePagesDir, fileName), "utf8");
  const enrichedHtml = injectHeadMetadata(html, fileName);

  return new Response(enrichedHtml, {
    headers,
  });
}

function injectHeadMetadata(html: string, fileName: CorePageFile) {
  const canonicalPath = pagePaths[fileName];
  const canonicalUrl = `${siteConfig.url}${canonicalPath}`;
  const canonical = `<link rel="canonical" href="${canonicalUrl}">`;
  const jsonLd = JSON.stringify(siteJsonLd()).replace(/</g, "\\u003c");
  const schema = `<script type="application/ld+json">${jsonLd}</script>`;

  return html.replace("</head>", `${canonical}\n${schema}\n</head>`);
}
