import type { ReactNode } from "react";

export type SectionTakeawayProps = {
  children: ReactNode;
  /** Anchor id of the next section, e.g. "gradient-descent". */
  nextHref?: string;
  /** Human-readable title of the next section. */
  nextLabel?: string;
};

/**
 * Closing summary for a section: the one idea to carry forward, plus an
 * explicit pointer to what comes next. Gives a read-through reader the
 * connective tissue a presenter would otherwise narrate between slides.
 */
export function SectionTakeaway({ children, nextHref, nextLabel }: SectionTakeawayProps) {
  return (
    <div className="mt-10 rounded-lg border border-[rgba(107,140,174,0.3)] bg-[rgba(107,140,174,0.08)] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent)] mb-2">
        Takeaway
      </div>
      <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
        {children}
      </p>
      {nextHref && nextLabel ? (
        <a
          href={`#${nextHref}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-accent)] hover:underline"
        >
          Next: {nextLabel} <span aria-hidden>→</span>
        </a>
      ) : null}
    </div>
  );
}
