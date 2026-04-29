# Deepexi Header Hover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the desktop first-level header navigation with deepexi.com so hover only highlights the item and click alone opens desktop panels.

**Architecture:** Extract the desktop nav class/state rules into a small pure helper module so the hover and active behavior can be verified with Node's built-in test runner before wiring it into the React header component. Keep the existing content model and desktop panel markup, but change the interaction model and visual tokens to match the target site.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Node built-in test runner

---

### Task 1: Add regression coverage for desktop nav behavior

**Files:**
- Create: `src/components/site/header-desktop-nav.ts`
- Create: `src/components/site/header-desktop-nav.test.ts`

- [ ] Step 1: Write a failing test for desktop nav class tokens and closed-by-default state.
- [ ] Step 2: Run `node --experimental-strip-types --test src/components/site/header-desktop-nav.test.ts` and confirm it fails because the helper does not exist yet.
- [ ] Step 3: Implement the minimal helper that returns the target hover and active class strings plus click-toggle state helpers.
- [ ] Step 4: Re-run `node --experimental-strip-types --test src/components/site/header-desktop-nav.test.ts` and confirm it passes.

### Task 2: Wire the helper into the desktop header

**Files:**
- Modify: `src/components/site/header.tsx`

- [ ] Step 1: Replace inline desktop nav class logic with helper calls.
- [ ] Step 2: Remove hover-to-open behavior from desktop menu triggers while keeping keyboard support and click toggling.
- [ ] Step 3: Adjust the header shell and nav spacing to better match the target desktop header.

### Task 3: Verify against the real target behavior

**Files:**
- Modify: `src/components/site/header.tsx`

- [ ] Step 1: Run `npm run typecheck`.
- [ ] Step 2: Use Playwright MCP to verify the desktop header stays closed on hover, opens on click, and uses the blue 5px underline treatment.
