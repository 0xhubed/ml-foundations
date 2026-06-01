import type { ReactNode } from "react";
import type { ChapterDefinition } from "@/lib/sections";

export type ChapterLayoutProps = {
  chapter: ChapterDefinition;
  children: ReactNode;
};

export function ChapterLayout({ chapter, children }: ChapterLayoutProps) {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg-primary)]">
      {/* Header - matching landing page style */}
      <header className="relative z-10 mx-auto flex w-full max-w-[var(--max-width)] items-center justify-between px-6 py-8 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl border border-[rgba(15,76,129,0.15)] bg-[rgba(15,76,129,0.06)] shadow-[0_8px_24px_rgba(15,76,129,0.12)]" />
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-text-secondary)] leading-tight">Machine Learning</p>
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-text-secondary)] leading-tight">Foundations</p>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-16 pb-20">
        <section className="section-boundary">
          <div className="mx-auto grid w-full max-w-[var(--max-width)] gap-10 px-6 lg:px-8">
            <div className="flex flex-col gap-5">
              <span className="badge w-fit">Chapter {chapter.order.toString().padStart(2, "0")}</span>
              <h1 className="section-heading text-balance text-[clamp(2.4rem,5vw,3.4rem)]">{chapter.title}</h1>
              <p className="section-body text-balance">{chapter.summary}</p>

              {/* Meta row: who it's for and how long it takes */}
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
                {chapter.difficulty ? (
                  <span className="rounded-full border border-[rgba(0,0,0,0.1)] px-3 py-1 text-[color:var(--color-text-primary)] capitalize">
                    {chapter.difficulty}
                  </span>
                ) : null}
                {chapter.estimatedMinutes ? (
                  <span className="rounded-full border border-[rgba(0,0,0,0.1)] px-3 py-1 text-[color:var(--color-text-primary)]">
                    ~{chapter.estimatedMinutes} min read
                  </span>
                ) : null}
                {chapter.prerequisites ? (
                  <span className="rounded-full border border-[rgba(0,0,0,0.1)] px-3 py-1 text-[color:var(--color-text-primary)]">
                    Prerequisites: {chapter.prerequisites}
                  </span>
                ) : null}
              </div>

              {/* How to read this page */}
              <div className="rounded-lg border-l-2 border-[color:var(--color-accent)] bg-[rgba(15,76,129,0.05)] px-4 py-3 max-w-3xl">
                <p className="text-sm text-[color:var(--color-text-secondary)]">
                  <span className="font-semibold text-[color:var(--color-text-primary)]">How to read this:</span>{" "}
                  Work through the sections top to bottom — each one builds on the last. Every
                  chart is interactive, so drag points, click nodes, and move the sliders. Look for
                  the <span className="font-semibold text-[color:var(--color-accent)]">Try it</span> prompts
                  for what to explore, and the <span className="font-semibold text-[color:var(--color-accent)]">Takeaway</span> at
                  the end of each section for the one idea to carry forward.
                </p>
              </div>

              {/* What you'll learn */}
              {chapter.learningOutcomes && chapter.learningOutcomes.length > 0 ? (
                <div className="max-w-3xl">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)] mb-3">
                    What you&apos;ll learn
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {chapter.learningOutcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-[color:var(--color-text-secondary)]">
                        <span aria-hidden className="text-[color:var(--color-accent)] mt-0.5">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* The path: clickable roadmap of every section */}
              {chapter.sections.length > 0 ? (
                <nav aria-label="Section roadmap" className="max-w-3xl">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)] mb-3">
                    The path
                  </h2>
                  <ol className="flex flex-col gap-1.5">
                    {chapter.sections.map((entry, index) => (
                      <li key={entry.id}>
                        <a
                          href={`#${entry.id}`}
                          className="group flex items-baseline gap-3 rounded px-2 py-1.5 hover:bg-[rgba(15,76,129,0.05)]"
                        >
                          <span className="text-xs font-mono text-[color:var(--color-text-muted)] tabular-nums">
                            {(index + 1).toString().padStart(2, "0")}
                          </span>
                          <span className="text-sm font-medium text-[color:var(--color-text-primary)] group-hover:text-[color:var(--color-accent)]">
                            {entry.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}

              {/* Author */}
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.28em] text-[color:var(--color-text-secondary)]">
                <span>{chapter.presenters.length > 1 ? "Authors" : "Author"}</span>
                {chapter.presenters.map((presenter) => (
                  <span
                    key={`${chapter.id}-${presenter}`}
                    className="rounded-full border border-[rgba(0,0,0,0.1)] px-3 py-1 text-[color:var(--color-text-primary)]"
                  >
                    {presenter}
                  </span>
                ))}
              </div>

              {chapter.studio ? (
                <div className="mt-2 flex flex-wrap gap-3">
                  <a
                    className="button-secondary"
                    href={chapter.studio.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {chapter.studio.label}
                  </a>
                </div>
              ) : null}
              <p className="caption text-[color:var(--color-text-muted)]">{chapter.tagline}</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-16">{children}</div>
      </main>
    </div>
  );
}
