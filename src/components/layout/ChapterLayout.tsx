import type { ReactNode } from "react";
import type { ChapterDefinition } from "@/lib/sections";
import { SectionNav } from "@/components/layout/SectionNav";

export type ChapterLayoutProps = {
  chapter: ChapterDefinition;
  children: ReactNode;
};

export function ChapterLayout({ chapter, children }: ChapterLayoutProps) {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg-primary)]">
      {/* Masthead */}
      <header className="relative z-10 mx-auto w-full max-w-[var(--max-width)] px-6 pt-10 lg:px-8">
        <div className="border-t-[3px] border-b border-[rgba(26,26,26,0.85)] py-6 text-center">
          <h1 className="masthead-title">{chapter.title}</h1>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(26,26,26,0.25)] py-2 text-[0.68rem] uppercase tracking-[0.25em] text-[color:var(--color-text-muted)]">
          <span>An Interactive Guide</span>
          <span className="hidden sm:inline">From a Straight Line to a Transformer</span>
          <span>Est. {chapter.estimatedMinutes ?? 45} Minutes</span>
        </div>
      </header>

      <main className="flex flex-col pb-20">
        <section className="section-boundary">
          <div className="mx-auto grid w-full max-w-[var(--max-width)] gap-10 px-6 lg:px-8">
            <div className="flex flex-col gap-5">
              {/* Byline: author, audience, length */}
              <p
                className="text-sm italic text-[color:var(--color-text-secondary)]"
                style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
              >
                By {chapter.presenters.join(", ")}
                {chapter.difficulty ? (
                  <>
                    {" "}· <span className="capitalize">{chapter.difficulty}</span> friendly
                  </>
                ) : null}
                {chapter.estimatedMinutes ? <> · ~{chapter.estimatedMinutes} min</> : null}
                {chapter.prerequisites === "None" ? (
                  <> · No prerequisites</>
                ) : chapter.prerequisites ? (
                  <> · Prerequisites: {chapter.prerequisites}</>
                ) : null}
              </p>

              {/* Intro: hook, scope, and how to read, in one paragraph */}
              <p className="section-body text-balance">
                How does a model actually learn? This interactive guide builds modern AI up from a
                straight line to a transformer, one step at a time: linear regression, gradient
                descent, backpropagation, and the attention mechanism behind today&apos;s language
                models. Read top to bottom; every chart is interactive, the{" "}
                <span className="font-semibold text-[color:var(--color-accent)]">Try it</span> notes
                tell you what to play with, and each section closes with a{" "}
                <span className="font-semibold text-[color:var(--color-accent)]">Takeaway</span>,
                the one idea to carry forward.
              </p>

              {/* The path: clickable roadmap of every section */}
              {chapter.sections.length > 0 ? (
                <nav aria-label="Section roadmap" className="max-w-3xl">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)] mb-3">
                    The path
                  </h2>
                  <ol className="grid gap-1.5 sm:grid-cols-2">
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
            </div>
          </div>
        </section>

        <div className="flex flex-col">{children}</div>
      </main>

      <SectionNav
        sections={chapter.sections.map(({ id, title }) => ({ id, title }))}
      />
    </div>
  );
}
