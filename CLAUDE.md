# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page Next.js 15 (App Router) site: an interactive "Machine Learning Foundations" walkthrough that builds from linear regression up to transformers, using Plotly visualizations and KaTeX math. It was extracted and de-branded from a larger internal tech talk, so the repo is intentionally narrow — there is one content page and no backend.

## Commands

```bash
npm install
npm run dev      # dev server (Turbopack) — page is at localhost:3000/ml-foundations (basePath!)
npm run build    # production build (Turbopack) — the source of truth (see below)
npm start        # serve the production build
npm run lint     # eslint
```

**`basePath: "/ml-foundations"` is set in `next.config.ts`**: the site is published as
`agent-engineering.ch/ml-foundations` via a rewrite in the separate `agent-engineering`
Vercel project. Locally the page therefore lives under `/ml-foundations` too; the bare
root `/` 404s. Don't remove the basePath without also changing that rewrite.

Do not run `npm run build` while `npm run dev` is running — they share `.next` and the
dev server will start serving stale or broken output (if that happens: kill dev,
`rm -rf .next`, restart).

There is **no test suite** (no `test` script). Verify changes with `npm run build` and by viewing the page.

The `export-notebooks` script in package.json is a leftover from the parent repo — it points at `../scripts/` which does not exist here. Ignore it.

## Build behavior (important)

`next.config.ts` sets both `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`. This is deliberate: the Plotly components have ~16 pre-existing `tsc` type errors (the `@types/plotly.js` definitions are stricter than how the charts are configured). **`npm run build` is the source of truth and passes; `npx tsc --noEmit` and `npm run lint` will report those known errors.** Don't treat them as regressions or try to "fix" the Plotly typings unless that is the explicit task.

## Architecture

**The entire visible site is `src/app/page.tsx`** — a sequence of twelve `<section id="...">` blocks (linear-regression → … → transformer-pipeline), wrapped in `ChapterLayout`. There are no other routes. To change what the page shows, edit this file.

**Content config is the single source of truth: `src/lib/sections.ts`.** It exports one `ChapterDefinition` (`getChapterDefinition("neural")`) whose `sections[]` array drives the in-page sub-navigation. **The `id` of each entry in `sections[]` must exactly match a `<section id="...">` in `page.tsx`** — they are coupled by anchor links. If you add, remove, or rename a section, update both files together or the sub-nav will point at dead anchors.

**Visualizations are Plotly only, and must be loaded client-side.** Every chart component is a `"use client"` component that imports Plot via `next/dynamic` with `ssr: false`:

```ts
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
```

This is required because Plotly touches `window` at import time; a plain import breaks the SSR/static build. Follow this pattern for any new visualization. Plotly colors and base layouts are centralized in `src/lib/plotlyLightTheme.ts` (`PLOTLY_COLORS` is a projector/monitor-safe palette) — reuse it rather than hardcoding colors.

**Math rendering:** KaTeX via `react-katex` (`InlineMath` / `BlockMath`). For copyable formula blocks use `src/components/ui/MathCopyBlock.tsx`; for break-out fullscreen visuals use `src/components/ui/FullScreenCard.tsx`. Pure math helpers (predictions, cost) live in `src/lib/costFunctions.ts`.

**`src/types/react-plotly.d.ts`** is an ambient type declaration (never imported directly) that TypeScript needs to compile the `react-plotly.js` usage. Do not delete it.

## Styling

Tailwind CSS 4 plus CSS custom properties defined in `src/app/globals.css` (light theme, `data-theme="light"`). Prefer the existing design-token utility classes over ad-hoc styling: `section-boundary` (section wrapper/spacing), `section-heading`, `section-body`, `caption`, `badge`, `glass-panel`, `button-secondary`. Colors come from `var(--color-*)` (e.g. `--color-accent`, `--color-text-primary`); content width is `--max-width`.

## Known leftovers from the extraction

`zustand`, `@anthropic-ai/sdk`, and `openai` are still in `package.json` but unused (the store and API routes were removed during extraction). The package `name` is still `"presentation-site"`. These are safe to clean up but currently harmless.
