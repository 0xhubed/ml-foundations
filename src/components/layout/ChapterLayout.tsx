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
          <div className="h-11 w-11 rounded-2xl border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] shadow-[0_12px_32px_rgba(8,12,20,0.45)]" />
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
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.28em] text-[color:var(--color-text-secondary)]">
                <span>Speakers</span>
                {chapter.presenters.map((presenter) => (
                  <span
                    key={`${chapter.id}-${presenter}`}
                    className="rounded-full border border-[rgba(255,255,255,0.18)] px-3 py-1 text-[color:var(--color-text-primary)]"
                  >
                    {presenter}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {chapter.studio ? (
                  <a
                    className="button-secondary"
                    href={chapter.studio.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {chapter.studio.label}
                  </a>
                ) : null}
              </div>
              <p className="caption text-[color:var(--color-text-muted)]">{chapter.tagline}</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-16">{children}</div>
      </main>
    </div>
  );
}
