import type { ReactNode } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { pickArticleVisuals, SvgAccentLeaf } from "@/components/article/ArticleSvgs";

const articleMdComponents: Components = {
  h2: ({ children }) => (
    <h2 className="relative mt-14 scroll-mt-28 text-2xl font-bold tracking-tight text-bright first:mt-6 md:mt-16 md:text-3xl">
      <span className="absolute -left-1 top-2 hidden h-8 w-1 rounded-full bg-leaf-gradient md:block" aria-hidden />
      <span className="md:pl-5">{children}</span>
    </h2>
  ),
  h3: ({ children }) => <h3 className="mt-10 text-lg font-semibold text-leaf md:text-xl">{children}</h3>,
  p: ({ children }) => (
    <p className="mt-5 text-[15px] leading-[1.75] text-soft md:text-[17px] md:leading-[1.72]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-6 list-outside list-disc space-y-3 pl-6 text-[15px] leading-relaxed text-soft marker:text-leaf md:text-[17px]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 list-inside list-decimal space-y-3 pl-1 text-[15px] leading-relaxed text-soft marker:font-semibold marker:text-leaf md:text-[17px]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed [&>p]:mt-2 [&>p:first-child]:mt-0">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-bright">{children}</strong>,
  em: ({ children }) => <em className="text-soft not-italic text-bright/95">{children}</em>,
  a: ({ href, children }) => {
    const internal = href?.startsWith("/");
    if (internal && href) {
      return (
        <Link
          href={href}
          className="font-semibold text-leaf underline decoration-primary/45 underline-offset-[3px] transition-colors hover:text-bright hover:decoration-bright/40"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="font-semibold text-leaf underline decoration-primary/45 underline-offset-[3px] hover:text-bright"
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="relative mt-10 overflow-hidden rounded-2xl border border-primary/35 bg-gradient-to-br from-primary/[0.14] via-primary/[0.06] to-transparent px-5 py-5 shadow-[inset_0_1px_0_rgba(74,222,128,0.12)] md:px-7 md:py-6">
      <SvgAccentLeaf className="pointer-events-none absolute -bottom-2 -right-2 h-24 w-24 rotate-12 opacity-[0.14]" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-leaf">Key takeaway</p>
      <div className="relative mt-3 space-y-3 text-[15px] leading-relaxed text-soft [&_p]:mt-0 [&_p+p]:mt-3 md:text-[17px]">
        {children as ReactNode}
      </div>
    </blockquote>
  ),
  hr: () => (
    <div className="my-12 flex flex-col items-center gap-4" aria-hidden>
      <div className="h-px w-full max-w-lg bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <SvgAccentLeaf className="h-9 w-9 opacity-[0.35]" />
    </div>
  )
};

type Props = { markdown: string; slug: string };

export default function ArticleRichBody({ markdown, slug }: Props) {
  const { accents } = pickArticleVisuals(slug);
  const Accent = accents[1] ?? accents[0];

  return (
    <div className="article-rich-body">
      <div className="relative rounded-2xl border border-line/60 bg-panel/30 p-6 md:p-10 lg:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute left-6 top-6 opacity-[0.07] md:left-8 md:top-8 lg:left-10 lg:top-10"
        >
          <Accent className="h-20 w-20 md:h-24 md:w-24" />
        </div>
        <div className="relative mx-auto max-w-[68ch] [&>*:first-child]:mt-0">
          <ReactMarkdown components={articleMdComponents}>{markdown.trim()}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
