import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleRelatedCards from "@/components/ArticleRelatedCards";
import ArticleRichBody from "@/components/ArticleRichBody";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pickArticleVisuals } from "@/components/article/ArticleSvgs";
import { ArrowRightIcon, CalendarIcon } from "@/components/Icons";
import LeadForm from "@/components/LeadForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import { brandName } from "@/data/site";
import { getPublishedArticleBySlug, getPublishedArticleSlugs } from "@/lib/articles";
import { absoluteUrl, buildArticleSchema } from "@/lib/seo";

export const revalidate = 3600;

export function generateStaticParams() {
  return getPublishedArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);
  if (!article) notFound();

  const path = `/articles/${slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: path },
    keywords: article.keywords,
    openGraph: {
      title: `${article.title} | ${brandName}`,
      description: article.description,
      url: absoluteUrl(path),
      type: "article",
      publishedTime: `${article.publishedAt}T12:00:00.000Z`,
      modifiedTime: `${article.updatedAt ?? article.publishedAt}T12:00:00.000Z`
    }
  };
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "America/Los_Angeles"
    }).format(new Date(`${iso}T12:00:00`));
  } catch {
    return iso;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);
  if (!article) notFound();

  const path = `/articles/${slug}`;
  const articleSchema = buildArticleSchema({
    headline: article.title,
    description: article.description,
    path,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    keywords: article.keywords
  });

  const { Hero } = pickArticleVisuals(slug);

  return (
    <>
      <Breadcrumbs
        wideLastCrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Articles", href: "/articles" },
          { label: article.title, href: path }
        ]}
      />

      <article className="pb-24 pt-6 md:pt-10">
        <div className="container-wide">
          <RevealOnScroll>
            <header className="relative overflow-hidden rounded-3xl border border-line/70 bg-gradient-to-br from-panel/90 via-panel/60 to-deep/40 p-6 shadow-panel md:p-10 lg:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-leaf-gradient opacity-[0.07] blur-3xl md:-right-10 md:top-10"
              />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_minmax(160px,0.85fr)] lg:gap-12">
                <div className="min-w-0">
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-leaf">
                    <CalendarIcon size={14} /> Published {formatDate(article.publishedAt)}
                  </p>
                  <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-bright md:text-4xl lg:text-[2.75rem]">
                    {article.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-soft md:text-lg">{article.description}</p>
                  {article.keywords?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {article.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-leaf"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/articles" className="btn-secondary text-sm">
                      All guides
                    </Link>
                    <Link href="/#estimate" className="btn-primary text-sm">
                      Request a match <ArrowRightIcon size={14} />
                    </Link>
                  </div>
                </div>
                <div className="relative mx-auto flex max-w-[280px] justify-center lg:mx-0 lg:max-w-none">
                  <div className="absolute inset-0 -z-10 scale-110 rounded-[2rem] bg-gradient-to-tr from-primary/15 to-transparent blur-2xl" />
                  <Hero className="h-auto w-full max-w-[240px] drop-shadow-[0_12px_40px_rgba(34,197,94,0.15)] md:max-w-[280px]" />
                </div>
              </div>
            </header>
          </RevealOnScroll>

          <div className="mx-auto mt-12 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] lg:items-start">
            <RevealOnScroll>
              <div className="min-w-0">
                <ArticleRichBody markdown={article.content} slug={slug} />
                <ArticleRelatedCards />
                <div className="mt-10 rounded-2xl border border-primary/25 bg-primary/5 p-5 md:p-6">
                  <p className="text-sm font-semibold text-bright">Ready for an on-site walkthrough?</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    We match Tulare County homeowners with vetted local landscaping contractors for scoped estimates—turf, sod, irrigation,
                    lighting, cleanup, and gravel.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href="/#estimate" className="btn-primary text-sm">
                      Request introductions <ArrowRightIcon size={14} />
                    </Link>
                    <Link href="/services" className="btn-secondary text-sm">
                      Browse services
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <aside className="lg:sticky lg:top-28">
              <LeadForm />
            </aside>
          </div>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </>
  );
}
