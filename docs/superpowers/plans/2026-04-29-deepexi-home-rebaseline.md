# Deepexi Home Rebaseline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Deepexi homepage and shared shell to match the canonical 2026-04-28 live-site baseline instead of the earlier TODO 1 assumptions.

**Architecture:** Use the current shared Next.js shell as the foundation, but replace the homepage information architecture, interaction rules, and reference inputs so they align with the canonical baseline screenshots and comparison notes in `docs/design-references/runtime-preview/compare-2026-04-28/`. Treat the earlier case-story section, disabled-entry assumptions, and placeholder alert flows as deprecated unless the current live baseline proves they still exist.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, existing local assets in `public/images/deepexi/home`, Playwright-based screenshot baseline under `docs/design-references/runtime-preview/compare-2026-04-28`, ESLint, TypeScript compiler, Next.js production build.

---

## Canonical Inputs

- Desktop original baseline: `docs/design-references/runtime-preview/compare-2026-04-28/original-desktop-baseline.png`
- Mobile original baseline: `docs/design-references/runtime-preview/compare-2026-04-28/original-mobile-baseline.png`
- Desktop local comparison: `docs/design-references/runtime-preview/compare-2026-04-28/local-desktop.png`
- Mobile local comparison: `docs/design-references/runtime-preview/compare-2026-04-28/local-mobile.png`
- Baseline notes: `docs/research/deepexi/home-reference.md`
- Comparison summary: `docs/research/deepexi/live-compare-2026-04-28.md`

## Current Baseline Findings

- The current live homepage visibly includes:
  - hero
  - DeepexiOS platform overview
  - three agent capability cards
  - FastAGI feature block
  - Deepexi enterprise model feature block
  - latest news strip
  - footer with QR area
- The current live homepage does not visibly include the earlier case-story section.
- The current local homepage still includes the older `关键产品能力` and `聆听客户故事` composition, so it must be restructured rather than lightly polished.
- Old placeholder interaction assumptions are no longer authoritative for the homepage baseline.

## File Map

**Create**

- `docs/superpowers/plans/2026-04-29-deepexi-home-rebaseline.md`

**Modify**

- `docs/research/deepexi/home-reference.md`
- `docs/research/deepexi/live-compare-2026-04-28.md`
- `src/content/home.ts`
- `src/components/pages/home/home-page.tsx`
- `src/components/site/header.tsx`
- `src/components/site/locale-switch.tsx`
- `src/components/site/mobile-menu.tsx`
- `src/components/site/footer.tsx`
- `src/content/site-nav.ts`
- `src/content/site-footer.ts`
- `src/app/globals.css`

**Delete or Stop Using**

- Deprecated root-level reference screenshots from the initial TODO 1 pass
- Temporary preview artifacts outside `docs/design-references/runtime-preview/compare-2026-04-28/`

**Verification**

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- browser verification against the canonical desktop and mobile baselines

### Task 1: Lock The Canonical Reference Set

**Files:**
- Modify: `docs/research/deepexi/home-reference.md`
- Modify: `docs/research/deepexi/live-compare-2026-04-28.md`

- [ ] **Step 1: Confirm the canonical original-site screenshots**

Use:

```text
docs/design-references/runtime-preview/compare-2026-04-28/original-desktop-baseline.png
docs/design-references/runtime-preview/compare-2026-04-28/original-mobile-baseline.png
```

- [ ] **Step 2: Confirm the current local comparison screenshots**

Use:

```text
docs/design-references/runtime-preview/compare-2026-04-28/local-desktop.png
docs/design-references/runtime-preview/compare-2026-04-28/local-mobile.png
```

- [ ] **Step 3: Keep only the rebaseline interpretation in the Deepexi research docs**

Expected:
- the homepage section list matches the current live baseline
- the docs explicitly state that the earlier case-story section is not part of the current live homepage
- the docs explicitly reject the old placeholder interaction assumptions for homepage reproduction

### Task 2: Replace The Homepage Information Architecture

**Files:**
- Modify: `src/content/home.ts`
- Modify: `src/components/pages/home/home-page.tsx`

- [ ] **Step 1: Remove the old case-story content model**

Expected:
- stop rendering `homeCaseStories`
- remove the `聆听客户故事` section from the homepage route
- stop treating `百丽时尚` and related case data as homepage requirements

- [ ] **Step 2: Split the current homepage content into baseline-aligned blocks**

Target composition:

```text
1. Hero
2. Platform overview
3. Three agent capability cards
4. FastAGI feature block
5. Deepexi enterprise model feature block
6. Latest news
7. Footer
```

- [ ] **Step 3: Reshape the visual hierarchy to match the live baseline**

Expected:
- hero headline placement matches the centered live composition more closely
- platform region uses the denser paragraph and large diagram-led layout
- the two product feature blocks appear below the three agent cards, not as a generic two-column “关键产品能力” panel

### Task 3: Rebaseline Header, Locale, And Navigation Behavior

**Files:**
- Modify: `src/components/site/header.tsx`
- Modify: `src/components/site/locale-switch.tsx`
- Modify: `src/components/site/mobile-menu.tsx`
- Modify: `src/content/site-nav.ts`

- [ ] **Step 1: Remove homepage-specific placeholder behavior that conflicts with the live baseline**

Expected:
- do not keep the homepage locale behavior tied to the earlier placeholder-alert assumption
- do not keep disabled-only homepage entry behavior if the current live shell shows real interaction

- [ ] **Step 2: Align desktop navigation and locale behavior with the current live shell**

Expected:
- desktop menu structure, dropdown visibility model, and locale presentation track the live baseline

- [ ] **Step 3: Align the mobile shell with the current live baseline**

Expected:
- mobile menu trigger, panel composition, and language area align with the live baseline rather than the earlier TODO 1 placeholder structure

### Task 4: Rebaseline News And Footer

**Files:**
- Modify: `src/components/pages/home/home-page.tsx`
- Modify: `src/components/site/footer.tsx`
- Modify: `src/content/site-footer.ts`

- [ ] **Step 1: Match the current live news strip composition**

Expected:
- latest news heading, card presentation, CTA placement, and spacing align with the baseline screenshots

- [ ] **Step 2: Add the missing footer QR-area structure**

Expected:
- footer layout and right-side visual module align more closely with the current live baseline

### Task 5: Verification And Diff Review

**Files:**
- Test: `docs/design-references/runtime-preview/compare-2026-04-28/original-desktop-baseline.png`
- Test: `docs/design-references/runtime-preview/compare-2026-04-28/original-mobile-baseline.png`

- [ ] **Step 1: Run static verification**

```bash
npm run lint
npm run typecheck
npm run build
```

- [ ] **Step 2: Regenerate local comparison captures**

Expected:
- update the local desktop and mobile comparison screenshots under `docs/design-references/runtime-preview/compare-2026-04-28/`

- [ ] **Step 3: Review remaining structural gaps**

Expected:
- explicitly note any remaining mismatch in hero alignment, card density, footer QR treatment, or live-shell interaction behavior

## Execution Notes

- Do not reopen the old TODO 1 homepage assumptions as source of truth.
- Do not use temporary `runtime-preview/deepexi-home-3001*` or `runtime-preview/deepexi-home-3007*` style files as references.
- Treat the canonical `compare-2026-04-28` directory as the only original-vs-local comparison source for homepage rebaseline work.
