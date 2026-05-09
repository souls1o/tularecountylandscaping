import Link from "next/link";
import { buildBreadcrumbSchema } from "@/lib/seo";

export type BreadcrumbCrumb = { label: string; href: string };

/**
 * Low-contrast trail below the nav — keeps hierarchy visible without competing with the hero.
 * Include matching JSON-LD via `buildBreadcrumbSchema` for search engines.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbCrumb[] }) {
  if (items.length === 0) return null;

  const schema = buildBreadcrumbSchema(items.map((c) => ({ name: c.label, path: c.href })));

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="border-b border-line/20 bg-black/[0.15] backdrop-blur-md"
      >
        <div className="container-wide py-2.5">
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted/70">
            {items.map((crumb, idx) => {
              const isLast = idx === items.length - 1;
              return (
                <li key={`${crumb.href}-${idx}`} className="inline-flex items-center gap-1">
                  {idx > 0 ? (
                    <span aria-hidden className="text-muted/40">
                      /
                    </span>
                  ) : null}
                  {isLast ? (
                    <span className="max-w-[min(100%,12rem)] truncate text-muted/55 md:max-w-[20rem]">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="max-w-[10rem] truncate text-muted/70 underline decoration-line/50 underline-offset-2 transition-colors hover:text-leaf/90 hover:decoration-leaf/40 md:max-w-[14rem]"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
