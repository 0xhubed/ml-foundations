import type { ReactNode } from "react";

export type SectionTakeawayProps = {
  children: ReactNode;
};

/**
 * Closing summary for a section: the one idea to carry forward. The prose
 * inside usually ends with a sentence that motivates the section that
 * follows directly below, so no explicit "next" link is needed.
 */
export function SectionTakeaway({ children }: SectionTakeawayProps) {
  return (
    <div className="mt-10 max-w-3xl rounded-lg border border-[rgba(107,140,174,0.3)] bg-[rgba(107,140,174,0.08)] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent)] mb-2">
        Takeaway
      </div>
      <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
        {children}
      </p>
    </div>
  );
}
