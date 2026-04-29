# Deepexi Home Reference

Date: 2026-04-28
Reviewed: 2026-04-29
Source URL: https://www.deepexi.com/

Note: `/clone-website https://www.deepexi.com/` was not directly invocable in this terminal environment.
Note: Browser automation was used to generate the current canonical desktop and mobile live-site baselines.
Canonical desktop baseline: `docs/design-references/runtime-preview/compare-2026-04-28/original-desktop-baseline.png`
Canonical mobile baseline: `docs/design-references/runtime-preview/compare-2026-04-28/original-mobile-baseline.png`
Deprecated root-level desktop and mobile screenshots from the initial TODO 1 capture must not be used.
Baseline capture method: `3s wait -> human-like wheel scroll to bottom -> wheel scroll back to top -> full-page screenshot`.

## Homepage Sections

1. Header
2. Hero banner
3. DeepexiOS platform overview
4. Three agent capability cards
5. FastAGI product feature block
6. Deepexi enterprise model feature block
7. Latest news strip
8. Footer

## Home News Rules

- Follow the current live-site behavior.
- Keep the visible news cards, section heading, and `查看更多` CTA aligned to the live baseline.
- Do not fall back to the earlier TODO 1 non-interactive news assumptions when comparing against the current live site.

## Locale Rules

- Follow the current live-site behavior.
- Keep the trigger and dropdown interaction aligned to the live baseline.
- Do not fall back to the earlier local placeholder-alert behavior when reproducing the current live site.

## Shell Interaction Notes

- Desktop `DeepexiOS` and `关于我们` are visually closer to full-width mega menus than to floating rounded cards.
- The mobile menu should start from a flat first-level entry list:
  `DeepexiOS` / `行业实践` / `投资者关系` / `关于我们`
- The locale trigger should stay lightweight:
  globe icon + text label + compact dropdown; avoid the earlier heavier button treatment and extra caret emphasis.

## Not Visible In Current Live Baseline

- `聆听客户故事`
- `百丽时尚`
- The earlier case-story section should not be treated as a current live-page requirement unless a newer baseline capture proves otherwise.

## Legacy Asset Paths From Initial TODO 1 Capture

Note: The list below is kept only as historical context from the initial TODO 1 slice.
Note: It is not the authoritative source for the current live-page section structure.

- https://www.deepexi.com/images/logo-zh.png
- https://fastdata-cms-prd-obs.deepexi.com/AI_2x_fc25bd31a2.jpg
- https://fastdata-cms-prd-obs.deepexi.com/H5_banner_e0d41088fe.jpg
- https://www.deepexi.com/images/index-pc-bg.png
- https://www.deepexi.com/images/index-h5-bg.png
- https://fastdata-cms-prd-obs.deepexi.com/Deepexi_OS_5ee62d2557.png
- https://fastdata-cms-prd-obs.deepexi.com/Deepexi_2x_7a70299006.png
- https://fastdata-cms-prd-obs.deepexi.com/Fast_AGI_2x_341deee87f.png
- https://fastdata-cms-prd-obs.deepexi.com/2x_5a75727354.jpg
- https://fastdata-cms-prd-obs.deepexi.com/2x_8a3f87334e.jpg
- https://fastdata-cms-prd-obs.deepexi.com/hk_2x_d70cdff979.png
- https://fastdata-cms-prd-obs.deepexi.com/2026_0417_deepclaw_99fe8ea4fb.png
- https://fastdata-cms-prd-obs.deepexi.com/0326_0c1411e409.png
- https://fastdata-cms-prd-obs.deepexi.com/20260326_086178a2b7.png

## Legacy Local Asset Targets From Initial TODO 1 Capture

- `public/images/deepexi/home/logo-zh.png`
- `public/images/deepexi/home/hero-desktop.jpg`
- `public/images/deepexi/home/hero-mobile.jpg`
- `public/images/deepexi/home/platform-bg-desktop.png`
- `public/images/deepexi/home/platform-bg-mobile.png`
- `public/images/deepexi/home/platform-visual.png`
- `public/images/deepexi/home/feature-deepexi.png`
- `public/images/deepexi/home/feature-fastagi.png`
- `public/images/deepexi/home/case-belle.jpg`
- `public/images/deepexi/home/case-shipyard.jpg`
- `public/images/deepexi/home/case-hkha.png`
- `public/images/deepexi/home/news-1.png`
- `public/images/deepexi/home/news-2.png`
- `public/images/deepexi/home/news-3.png`
