import type { ReactNode } from "react";

export type TryItProps = {
  children: ReactNode;
};

/**
 * Inline prompt that tells a self-guided reader how to interact with the
 * visualization that follows: what to drag/click/hover, and what to watch for.
 * Replaces the verbal cues a presenter would give in a live talk.
 */
export function TryIt({ children }: TryItProps) {
  return (
    <div className="mb-5 max-w-3xl rounded-lg border-l-2 border-[color:var(--color-accent)] bg-[rgba(15,76,129,0.05)] px-4 py-3">
      <p className="text-sm text-[color:var(--color-text-secondary)]">
        <span className="font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent)] text-xs mr-2">
          Try it
        </span>
        {children}
      </p>
    </div>
  );
}
