# Deepexi Live Compare

Date: 2026-04-28
Original URL: https://www.deepexi.com/
Local URL: http://127.0.0.1:3014/

## Method

- Compared the live site and the current local branch with `playwright-mcp`.
- Captured desktop and mobile full-page screenshots.
- The canonical original-site baseline uses:
  `3s wait -> human-like wheel scroll to the bottom -> wheel scroll back to top -> full-page screenshot`.
- Saved accessibility snapshots and DOM summary JSON for both pages.
- Used the live site as it rendered on 2026-04-28, not the earlier TODO 1 reference note.
- Revalidated the local branch on 2026-04-29 with `next build` + `next start`.
- Recalculated screenshot similarity with `magick compare -metric RMSE` after matching local viewport widths to the canonical baseline widths.

## Artifacts

- Desktop original screenshot: `docs/design-references/runtime-preview/compare-2026-04-28/original-desktop-baseline.png`
- Desktop local screenshot: `docs/design-references/runtime-preview/compare-2026-04-28/local-desktop.png`
- Mobile original screenshot: `docs/design-references/runtime-preview/compare-2026-04-28/original-mobile-baseline.png`
- Mobile local screenshot: `docs/design-references/runtime-preview/compare-2026-04-28/local-mobile.png`
- Structure snapshots and JSON summaries are stored alongside those screenshots in the same folder.
- Older `original-*` screenshot variants were deleted from the compare directory to avoid baseline ambiguity.

## High-Level Result

- The local page matches the live site's overall brand direction, title text, header position, hero image family, and core section intent.
- The local page does not match the current live site pixel-for-pixel.
- The homepage structure has already been rebaselined to the current live composition; the previous case-story drift is no longer the main gap.
- The biggest visible improvement in this pass is shared shell behavior:
  desktop mega menus, mobile first-level menu layout, and locale trigger/dropdown now track the live shell more closely.
- Current normalized RMSE similarity estimate:
  `desktop_full 76.66%`
  `mobile_full 68.48%`

## Matches

- Page title matches: `滴普科技 - AI创造无限可能`
- Header is present on both desktop and mobile.
- Hero uses the same core visual direction and headline.
- The DeepexiOS platform section is present on both pages.
- The homepage section inventory now matches the live baseline:
  hero -> platform -> three agents -> two product blocks -> latest news -> footer
- The latest news area and footer are present on both pages.
- The local page sets `lang="zh-CN"`, which is a positive semantic improvement over the live page capture.
- Desktop `DeepexiOS` and `关于我们` now behave closer to full-width live mega menus than to isolated floating cards.
- The mobile menu now opens as a flat left-column first-level shell, which is materially closer to the live mobile baseline.

## Major Differences

- Hero and header spacing still differ:
  the local desktop top shell is closer now, but the exact header spacing, hero crop, and title placement are not yet pixel-identical.

- The desktop locale area is still slightly heavier than the live shell:
  it is functionally aligned, but the icon spacing and dropdown positioning can still be compressed.

- The about menu content density still differs:
  the row count is now closer, but the live shell still has tighter truncation, line length, and column rhythm.

- Footer and lower-page polish still differ:
  the QR region exists, but the final spacing, divider rhythm, and footer typography are not yet fully aligned to the live baseline.

- Mobile page length still differs:
  even after menu rebaseline, the local mobile page remains longer than the live baseline because the content blocks are still taller overall.

## Structural Notes

- The live site rendered with weak semantic extraction in this capture.
- DOM summary for the live page returned no heading or nav arrays even though text is visibly present on screen.
- Screenshot comparison was more reliable than raw heading and button counts for the live page.

## Assessment For TODO 1

- If the target is the canonical 2026-04-28 live baseline, the current local page is now structurally on the right track.
- The main remaining gaps are no longer “wrong sections”.
  They are shell fidelity, hero/header/footer spacing, and overall mobile/desktop density control.

## Suggested Next Step

- Continue trimming shell-level pixel gaps first:
  header spacing, hero crop, locale visual weight, about-menu density, and footer rhythm.
- Keep the current `Link + prefetch={false}` strategy until the target routes are implemented.
- After homepage shell polish stabilizes, start filling `/news`, `/case`, `/investor-relations`, `/fastAgi`, and `/deepexi` to remove the known 404 destinations.
