"use client";

import { useEffect, useState } from "react";

export type SectionNavEntry = {
  id: string;
  title: string;
};

/**
 * Reading affordances for the long single-page layout:
 * - a compact numbered rail (wide screens only) that tracks the current
 *   section via IntersectionObserver and jumps on click, with the full
 *   title shown on hover;
 * - a back-to-top button that appears once the reader has scrolled past
 *   the hero.
 */
export function SectionNav({ sections }: { sections: SectionNavEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    // A section is "current" while it crosses a band near the top of the
    // viewport; the band keeps exactly one section active for most scroll
    // positions even though sections are taller than the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0px -75% 0px" },
    );
    elements.forEach((el) => observer.observe(el));

    const onScroll = () => setShowTop(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  return (
    <>
      <nav
        aria-label="On this page"
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      >
        <ol className="flex flex-col gap-1">
          {sections.map((section, index) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id} className="group relative">
                <a
                  href={`#${section.id}`}
                  aria-label={section.title}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex h-6 w-7 items-center justify-center rounded border text-[10px] font-mono tabular-nums transition-colors ${
                    isActive
                      ? "border-[color:var(--color-accent)] bg-[rgba(15,76,129,0.08)] text-[color:var(--color-accent)] font-semibold"
                      : "border-[rgba(0,0,0,0.08)] bg-white/80 text-[color:var(--color-text-muted)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
                  }`}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </a>
                <span
                  className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded border border-[rgba(0,0,0,0.1)] bg-white px-2 py-1 text-xs text-[color:var(--color-text-primary)] opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                  aria-hidden
                >
                  {section.title}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(0,0,0,0.12)] bg-white text-[color:var(--color-text-secondary)] shadow-md transition-all hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span aria-hidden>↑</span>
      </button>
    </>
  );
}
