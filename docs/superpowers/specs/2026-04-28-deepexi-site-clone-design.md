# Deepexi Site Clone Design

Deprecated: This design was written before the 2026-04-28 live-site rebaseline pass completed.
Deprecated: Do not use it as the authoritative homepage reference for the current live Deepexi site.
Superseded by the 2026-04-29 homepage rebaseline planning work and the canonical screenshots under `docs/design-references/runtime-preview/compare-2026-04-28/`.

Date: 2026-04-28
Status: Draft approved in chat, written for implementation planning
Project: `ai-website-cloner-template`

## Goal

Within the existing `ai-website-cloner-template` project, rebuild the Deepexi public Chinese website as a high-fidelity multi-route Next.js site using the page-by-page cloning workflow.

The implementation should prioritize visual parity with the live site while adapting a few user-specified interactions:

- Only build the Chinese site
- Preserve the language switcher dropdown structure; selecting a locale item shows `alert("暂无功能")`
- `/activity` cards show `alert("暂无功能")` when clicking any card area
- `/industry-report` cards show `alert("暂无功能")` when clicking any card area
- Preserve news-related visual entry points, but make them non-clickable
- Do not implement `/news` or `/news-detail/*`

## Scope

### In Scope

- High-fidelity cloning of the following routes:
  - `/`
  - `/product/deepexi`
  - `/fastAgi`
  - `/product/fastdata-foil`
  - `/product/deepSense`
  - `/product/dataSense`
  - `/product/deepClaw`
  - `/activity`
  - `/industry-report`
  - `/case`
  - `/investor-relations`
  - `/company`
- Compatibility entry routes:
  - `/deepexi`
  - `/fastagi`
- Shared header, footer, mobile navigation, and route wiring
- Local static assets in `public/`
- Responsive behavior for desktop and mobile
- Tailwind-based styling aligned with the template stack

### Out of Scope

- `/news`
- `/news-detail/*`
- Legacy FastData alias routes such as `/fastData`, `/product/fastData`, and `/product/fastdata`
- English locale content
- External live playback pages
- PDF reading experience inside the site
- Backend, CMS, analytics, auth, or search

## User Decisions

- Use the existing `ai-website-cloner-template` directory as the final project
- Use the page-by-page cloning strategy with route-based delivery
- Target fidelity should be as close to 1:1 as practical
- Activity and report cards should not navigate externally
- Language switching should not change locale
- Keep news-related entry points visible, but fully disabled
- Treat `/product/deepexi` as the official Deepexi route
- Treat `/fastAgi` as the official FastAGI route
- Keep `/deepexi` and `/fastagi` as compatibility entry routes only
- Do not support legacy FastData alias routes

## Constraints

### Product Constraints

- The site should feel like the live Deepexi public site, not a generic redesign
- Shared structure should be reused only when the underlying visual pattern is truly stable
- Product pages may share primitives, but should not be prematurely abstracted

### Technical Constraints

- Keep the existing template stack:
  - Next.js 16 App Router
  - React 19
  - TypeScript
  - Tailwind CSS v4
  - Existing shadcn/ui baseline where useful
- Avoid introducing new heavy dependencies unless a later implementation step proves one is necessary
- Keep all project-related files inside the current project directory

### UI Quality Constraints

Implementation should follow the Vercel Web Interface Guidelines as a coding constraint, not only as an after-the-fact review. In particular:

- Use semantic interactive elements:
  - `<button>` for actions
  - `<Link>` or `<a>` for navigation
  - no clickable `div`/`span`
- Provide visible `focus-visible` treatment on all interactive elements
- Avoid `transition: all`; list transition properties explicitly
- Respect `prefers-reduced-motion`
- Ensure icon-only buttons have `aria-label`
- Ensure images have dimensions and meaningful `alt` handling
- Use balanced headings where appropriate
- Prevent text overflow with `min-w-0`, `truncate`, `line-clamp-*`, or `break-words`
- Add skip-link support and correct heading hierarchy
- Use `scroll-margin-top` for anchor-linked sections such as `/company#intro`

These constraints should shape Tailwind usage during implementation, not just final cleanup.

## Architecture

The site should remain a single Next.js application with a shared site shell and route-specific page modules.

```text
src/
  app/
    page.tsx
    company/page.tsx
    case/page.tsx
    investor-relations/page.tsx
    activity/page.tsx
    industry-report/page.tsx
    deepexi/page.tsx
    fastagi/page.tsx
    product/
      deepexi/page.tsx
      fastdata-foil/page.tsx
      deepSense/page.tsx
      dataSense/page.tsx
      deepClaw/page.tsx
  components/
    site/
      header.tsx
      footer.tsx
      mobile-menu.tsx
      locale-switch.tsx
      unavailable-alert.tsx
      skip-link.tsx
    pages/
      home/
      company/
      case/
      investor-relations/
      activity/
      industry-report/
      product/
  content/
    site-nav.ts
    site-footer.ts
    company.ts
    case.ts
    activity.ts
    industry-report.ts
    products/
  types/
  lib/
public/
  images/
  videos/
  seo/
docs/
  research/
  design-references/
  superpowers/specs/
```

## Layering Strategy

### 1. Site Shell

Shared shell components are responsible for:

- Main header and desktop navigation
- Mobile navigation drawer/menu
- Footer
- Skip link
- Locale switch affordance, including the visible dropdown panel structure
- Disabled news entry presentation in header and footer
- Shared alert behavior for unavailable actions

The shell must not include page-specific layout assumptions beyond the sticky header and site-wide footer.

### 2. Page Modules

Each route gets a dedicated page module subtree. This keeps page-level fidelity work isolated and reduces the chance that one page refactor breaks another.

Examples:

- `src/components/pages/home/*`
- `src/components/pages/company/*`
- `src/components/pages/product/deepexi/*`

### 3. Shared Visual Primitives

Only extract shared primitives when the same pattern appears at least twice with stable structure. Likely candidates:

- Hero/banner wrapper
- Product capability split sections
- Media cards
- Metric cards
- Consistent CTA/link treatments

Do not force all product sections into one generalized component if their spacing, content hierarchy, or interaction differs.

### 4. Static Content Layer

Static content files should hold:

- Navigation labels and route metadata
- Footer link groups
- Product section data
- Activity/report card data
- Company anchor section metadata
- Compatibility route mapping
- Disabled news teaser content and labels for home/header/footer

This keeps JSX readable and makes route reuse easier.

## Route Strategy

### Primary Routes

- `/` -> Home page
- `/product/deepexi` -> Deepexi enterprise model page
- `/fastAgi` -> FastAGI page
- `/product/fastdata-foil` -> FastData Foil page
- `/product/deepSense` -> DeepSense page
- `/product/dataSense` -> DataSense page
- `/product/deepClaw` -> DeepClaw page
- `/activity` -> Activity listing page
- `/industry-report` -> Industry report listing page
- `/case` -> Case showcase page
- `/investor-relations` -> Investor relations page
- `/company` -> Company page

### Compatibility Routes

- `/deepexi` -> reuse the `/product/deepexi` page module
- `/fastagi` -> reuse the `/fastAgi` page module

These compatibility routes should not duplicate implementation. They should render the same underlying page module while treating `/product/deepexi` and `/fastAgi` as the official routes.

### Compatibility SEO Rules

- Official route for Deepexi content: `/product/deepexi`
- Official route for FastAGI content: `/fastAgi`
- Compatibility routes stay accessible for parity with the current public site:
  - `/deepexi`
  - `/fastagi`
- Compatibility routes should emit canonical metadata pointing to the official route
- Compatibility routes should emit `robots` metadata equivalent to `noindex,follow`
- Compatibility routes should not 30x redirect, because the current source site exposes them as live entry pages
- Legacy FastData aliases are intentionally excluded and should remain unsupported

### Explicitly Excluded Routes

- `/news`
- `/news-detail/*`

## Behavior Strategy

### Keep Native Site Behavior Where Useful

- Header navigation should route to internal pages
- Company anchor links should scroll to corresponding sections
- Mobile navigation should open and close like a proper menu
- Videos and imagery should remain part of the page where the source site uses them
- The language switcher should preserve its trigger + dropdown interaction layer on desktop and mobile
- News-related regions should preserve their visual structure even though the destination routes are excluded

### Intentionally Modified Behavior

- Locale trigger click -> opens the visible language dropdown panel
- Locale item click (`简体中文` or `English`) -> `alert("暂无功能")`
- Home news cards -> visible but non-clickable
- Home "查看更多" -> visible but non-clickable
- Header "企业动态" and news shortcut cards -> visible but non-clickable
- Footer "企业动态" -> visible but non-clickable
- `/activity` whole-card click -> `alert("暂无功能")`
- `/industry-report` whole-card click -> `alert("暂无功能")`

These modified actions should be handled by a shared client-side utility component or helper so the wording and accessibility treatment stay consistent.

### Accessibility Notes For Modified Actions

- Use real `<button>` elements for unavailable action cards when the full card is clickable
- Preserve visual affordance for clickability without pretending they are links
- If cards remain link-like visually, add concise assistive copy or `aria-label` where needed
- Keep disabled news items out of the tab order and do not attach click handlers
- For report cards, preserve the visible CTA styling, but render it as part of the same outer card button instead of a nested interactive control

## Cloning Workflow

Implementation should use the existing `/clone-website` workflow in page-by-page passes, not one giant pass.

### Why Page-by-Page

- It matches the user requirement for route-based delivery
- It keeps extraction artifacts understandable
- It reduces the chance of style sprawl and component confusion
- It makes it easier to reconcile shared shell elements across pages

### Planned Cloning Order

#### Phase 1: Foundation & Home

- Clone `/`
- Extract:
  - global fonts
  - colors
  - shared header
  - shared footer
  - homepage sections
- Freeze news-related visuals as disabled, non-clickable UI during this phase
- Build the initial site shell

#### Phase 2: Product & Capability Group

- Clone:
  - `/product/deepexi`
  - `/fastAgi`
  - `/product/fastdata-foil`
  - `/product/deepSense`
  - `/product/dataSense`
  - `/product/deepClaw`
- Then add:
  - `/deepexi`
  - `/fastagi`

This phase is the most likely place to extract shared product primitives.

#### Phase 3: Brand & Company Group

- Clone:
  - `/company`
  - `/case`
  - `/investor-relations`

These pages should stay mostly independent except for the site shell and any truly repeated media/section primitives.

#### Phase 4: Listing Pages With Modified Actions

- Clone:
  - `/activity`
  - `/industry-report`
- Replace external navigation behavior with unavailable alerts

#### Phase 5: Global Reconciliation

- Normalize shared tokens
- Reconcile spacing and typography drift across cloned pages
- Consolidate duplicate primitives where safe
- Clean asset paths and metadata
- Review mobile behavior

## Data & Asset Strategy

### Assets

- Download and store page assets under `public/`
- Preserve meaningful names where possible
- Separate likely groups:
  - `public/images/deepexi/*`
  - `public/videos/deepexi/*`
  - `public/seo/*`

### Static Content

Use typed content files for:

- Product page section content
- Company section anchors
- Activity/report cards
- Footer groups
- Header menu groups

This allows modules to stay presentational while keeping route content centralized.

## Metadata Strategy

Each route should define route-specific metadata in App Router files or shared helpers:

- `lang="zh-CN"` at the document root
- Chinese title
- Chinese description
- Open Graph image where available
- Theme color aligned with the page background if needed

Compatibility routes should reuse page content but override metadata where required to express canonical and `noindex,follow` behavior.

## Styling Strategy

Tailwind should be used as the primary implementation layer, but in a controlled way:

- Global tokens in `globals.css`
- Route/page styling in module components
- Avoid giant unreadable class strings when a local component wrapper or extracted primitive improves clarity
- Preserve mobile-first responsive structure
- Keep animation classes explicit and reduced-motion aware

Expected shared token work includes:

- brand blue and neutrals
- background surfaces
- text hierarchy colors
- card shadows
- section spacing rhythm
- header and footer spacing

## Testing & Verification Strategy

### Functional Checks

- Every in-scope route renders successfully
- Internal navigation works
- Compatibility routes resolve correctly
- Company anchor links scroll to the correct section
- Locale switch and unavailable cards produce the expected alert
- Disabled news entries remain visually present and non-interactive
- Legacy FastData alias routes remain unsupported

### Visual Checks

- Desktop comparison against the live site
- Mobile comparison against the live site
- Spot-check spacing, typography, and imagery on each route

### Quality Checks

- `npm run lint`
- `npm run typecheck`
- `npm run build`

### UI Guideline Review

After implementation, run a UI review using the `web-design-guidelines` skill against the touched files and fix findings before claiming completion.

## Planned TODO Breakdown

### TODO 1

Home page + global shell

- header
- footer
- locale switch dropdown + item alert
- disabled home/header/footer news entries
- homepage sections
- global tokens

### TODO 2

Product/capability routes + compatibility routes

- six product/capability pages
- `/deepexi`
- `/fastagi`
- compatibility route SEO metadata

### TODO 3

Company/brand routes

- `/company`
- `/case`
- `/investor-relations`

### TODO 4

Listing routes with modified click behavior

- `/activity`
- `/industry-report`
- unavailable alert behavior

### TODO 5

Global reconciliation

- deduplicate safe primitives
- normalize tokens
- tidy assets
- route metadata
- mobile fixes

### TODO 6

Guideline audit & polish

- run `web-design-guidelines` review on affected UI files
- fix accessibility and interaction issues
- re-run verification

## Risks

- Shared shell extracted from one page may drift from other routes if not reconciled carefully
- Product pages may appear similar but differ enough that premature abstraction causes fidelity loss
- Asset naming and organization can become messy without early conventions
- Route-level metadata may get skipped if implementation focuses too hard on visual cloning
- Compatibility routes can accidentally diverge if they are copied instead of reusing modules

## Recommended Next Step

Write the implementation plan next, using this design as the source of truth, then execute TODO 1 first:

- foundation shell
- homepage
- shared tokens
- header/footer
