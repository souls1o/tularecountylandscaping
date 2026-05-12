import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type ArticleFrontmatter = {
  title: string;
  description: string;
  /** ISO date YYYY-MM-DD */
  publishedAt: string;
  /** Optional — defaults to publishedAt */
  updatedAt?: string;
  /** SEO keyword phrases */
  keywords?: string[];
};

export type ArticleMeta = ArticleFrontmatter & { slug: string };

export type ArticleDoc = ArticleMeta & { content: string };

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

/** Calendar "today" YYYY-MM-DD in America/Los_Angeles (matches article date displays). */
export function getTodayYmdLa(reference = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(reference);
}

/** True when `publishedAt` (YYYY-MM-DD) is on or before "today" in Los Angeles. */
export function isArticlePublished(publishedAt: string, reference = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) return false;
  return publishedAt <= getTodayYmdLa(reference);
}

function readArticleFile(slug: string): ArticleDoc | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<ArticleFrontmatter>;
  if (!fm.title || !fm.description || !fm.publishedAt) return null;

  const kwRaw = fm.keywords as unknown;
  let keywords: string[] | undefined;
  if (Array.isArray(kwRaw)) keywords = kwRaw.map(String);
  else if (typeof kwRaw === "string") keywords = kwRaw.split(",").map((s) => s.trim()).filter(Boolean);

  return {
    slug,
    title: fm.title,
    description: fm.description,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    keywords,
    content: content.trim()
  };
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getArticleBySlug(slug: string): ArticleDoc | null {
  return readArticleFile(slug);
}

/** File on disk only — includes future-dated (scheduled) posts. */
export function getAllArticlesMeta(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => readArticleFile(slug))
    .filter((a): a is ArticleDoc => a !== null)
    .map(
      (a): ArticleMeta => ({
        slug: a.slug,
        title: a.title,
        description: a.description,
        publishedAt: a.publishedAt,
        updatedAt: a.updatedAt,
        keywords: a.keywords
      })
    )
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** Public listings, sitemap, and home teasers — excludes future `publishedAt` (LA calendar). */
export function getPublishedArticlesMeta(reference = new Date()): ArticleMeta[] {
  return getAllArticlesMeta().filter((a) => isArticlePublished(a.publishedAt, reference));
}

export function getPublishedArticleSlugs(reference = new Date()): string[] {
  return getPublishedArticlesMeta(reference).map((a) => a.slug);
}

export function getPublishedArticleBySlug(slug: string, reference = new Date()): ArticleDoc | null {
  const doc = getArticleBySlug(slug);
  if (!doc || !isArticlePublished(doc.publishedAt, reference)) return null;
  return doc;
}
