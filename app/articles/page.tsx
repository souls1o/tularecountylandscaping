import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, CalendarIcon } from "@/components/Icons";
import RevealOnScroll from "@/components/RevealOnScroll";
import { brandName } from "@/data/site";
import { getPublishedArticlesMeta } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Landscaping Guides & Articles | Tulare County Homeowners",
  description: `Practical landscaping guides for Tulare County homeowners—drought ideas, turf comparisons, irrigation tips, and seasonal cleanup from ${brandName}.`,
  alternates: { canonical: "/articles" },
  openGraph: {
    title: `Landscaping Guides & Articles | ${brandName}`,
    description:
      "Central Valley landscaping guides covering water-wise yards, turf options, irrigation repair, gravel design, and seasonal cleanup.",
    url: absoluteUrl("/articles"),
    type: "website"
  }
};

export const revalidate = 3600;

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "America/Los_Angeles"
    }).format(new Date(`${iso}T12:00:00`));
  } catch {
    return iso;
  }
}

export default function ArticlesIndexPage() {
  const articles = getPublishedArticlesMeta();

  return (
    <article className="pb-24 pt-10 md:pt-14">
      <div className="container-wide">
        <RevealOnScroll>
          <p className="eyebrow eyebrow-dot">
            <span>Articles</span>
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-bright md:text-5xl">
            Guides for <span className="text-gradient">Tulare County yards</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-soft md:text-lg">
            Long-form articles aimed at real homeowner searches—water-wise design, turf tradeoffs, irrigation troubleshooting,
            and seasonal maintenance with links into our{" "}
            <Link href="/services" className="font-semibold text-leaf underline decoration-primary/35 underline-offset-2 hover:text-bright">
              services
            </Link>{" "}
            and{" "}
            <Link href="/locations" className="font-semibold text-leaf underline decoration-primary/35 underline-offset-2 hover:text-bright">
              city pages
            </Link>
            .
          </p>
        </RevealOnScroll>

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {articles.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/articles/${post.slug}`}
                className="group surface-elevated flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 md:p-7"
              >
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
                  <CalendarIcon size={14} /> {formatDate(post.publishedAt)}
                </span>
                <h2 className="mt-3 text-xl font-bold leading-snug text-bright group-hover:text-leaf md:text-2xl">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
                {post.keywords?.length ? (
                  <p className="mt-4 flex flex-wrap gap-2">
                    {post.keywords.slice(0, 4).map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full border border-line/80 bg-panel/50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted"
                      >
                        {kw}
                      </span>
                    ))}
                  </p>
                ) : null}
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-leaf">
                  Read guide <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <RevealOnScroll>
          <div className="surface-glass mt-14 p-6 md:p-8">
            <p className="text-sm leading-relaxed text-soft">
              Looking for a contractor introduction instead?{" "}
              <Link href="/#estimate" className="font-semibold text-leaf hover:text-bright">
                Request a match
              </Link>{" "}
              or call the intake line from our{" "}
              <Link href="/" className="font-semibold text-leaf hover:text-bright">
                homepage
              </Link>
              .
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </article>
  );
}
