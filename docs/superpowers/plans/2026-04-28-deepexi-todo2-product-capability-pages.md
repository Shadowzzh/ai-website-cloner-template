# Deepexi TODO2 Product & Capability Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the six Deepexi product/capability routes plus the two compatibility entry routes, while selectively re-enabling only the product-related shell navigation and preserving all other TODO1 disabled behaviors.

**Architecture:** Keep the existing TODO1 shell and content structure, then add a dedicated `src/components/pages/product/*` subtree and `src/content/products/*` content layer for the six in-scope product pages. Route modules in `src/app/product/*` render page-specific modules, while `/deepexi` and `/fastagi` reuse the official product page modules with compatibility-route metadata rules.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, `next/image`, existing site shell/content contracts, browser automation and local asset download scripts, ESLint, TypeScript compiler, Next.js production build.

---

## Scope Split

This plan covers **TODO 2 only**:

- `/product/deepexi`
- `/fastAgi`
- `/product/fastdata-foil`
- `/product/deepSense`
- `/product/dataSense`
- `/product/deepClaw`
- `/deepexi`
- `/fastagi`
- selective shell activation for product-related entries only
- compatibility-route canonical + `noindex,follow` metadata

Still out of scope in this plan:

- `/company`
- `/case`
- `/investor-relations`
- `/activity`
- `/industry-report`
- `/news`
- `/news-detail/*`
- legacy FastData aliases such as `/fastData`, `/product/fastData`, `/product/fastdata`

## File Map

**Create**

- `docs/research/deepexi/products-reference.md`
- `scripts/download-deepexi-product-assets.mjs`
- `src/content/products/deepexi.ts`
- `src/content/products/fastagi.ts`
- `src/content/products/fastdata-foil.ts`
- `src/content/products/deepsense.ts`
- `src/content/products/datasense.ts`
- `src/content/products/deepclaw.ts`
- `src/components/pages/product/product-page-shell.tsx`
- `src/components/pages/product/product-hero.tsx`
- `src/components/pages/product/product-section.tsx`
- `src/components/pages/product/deepexi-page.tsx`
- `src/components/pages/product/fastagi-page.tsx`
- `src/components/pages/product/fastdata-foil-page.tsx`
- `src/components/pages/product/deepsense-page.tsx`
- `src/components/pages/product/datasense-page.tsx`
- `src/components/pages/product/deepclaw-page.tsx`
- `src/app/product/deepexi/page.tsx`
- `src/app/fastAgi/page.tsx`
- `src/app/product/fastdata-foil/page.tsx`
- `src/app/product/deepSense/page.tsx`
- `src/app/product/dataSense/page.tsx`
- `src/app/product/deepClaw/page.tsx`
- `src/app/deepexi/page.tsx`
- `src/app/fastagi/page.tsx`

**Modify**

- `src/types/site.ts`
- `src/content/site-nav.ts`
- `src/content/site-footer.ts`
- `src/content/home.ts`
- `src/components/site/header.tsx`
- `src/components/site/footer.tsx`
- `src/components/site/mobile-menu.tsx`

**Verification**

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- browser verification on all eight in-scope TODO2 routes
- UI guideline review on all touched TODO2 files

### Task 1: Capture Product Route Reference Artifacts

**Files:**
- Create: `docs/research/deepexi/products-reference.md`
- Create: `scripts/download-deepexi-product-assets.mjs`
- Create: `public/images/deepexi/products/*`
- Test: `docs/design-references/deepexi-product-*.png`

- [ ] **Step 1: Gather product-route screenshots and source notes**

For each route below, capture a desktop full-page screenshot and a mobile full-page screenshot using the available browser tooling:

```text
https://www.deepexi.com/product/deepexi
https://www.deepexi.com/fastAgi
https://www.deepexi.com/product/fastdata-foil
https://www.deepexi.com/product/deepSense
https://www.deepexi.com/product/dataSense
https://www.deepexi.com/product/deepClaw
```

Save them under `docs/design-references/` using this naming scheme:

```text
deepexi-product-deepexi-desktop.png
deepexi-product-deepexi-mobile.png
deepexi-product-fastagi-desktop.png
deepexi-product-fastagi-mobile.png
deepexi-product-fastdata-foil-desktop.png
deepexi-product-fastdata-foil-mobile.png
deepexi-product-deepsense-desktop.png
deepexi-product-deepsense-mobile.png
deepexi-product-datasense-desktop.png
deepexi-product-datasense-mobile.png
deepexi-product-deepclaw-desktop.png
deepexi-product-deepclaw-mobile.png
```

- [ ] **Step 2: Write the local product reference note**

Create `docs/research/deepexi/products-reference.md` with this exact structure:

```md
# Deepexi Product Pages Reference

Date: 2026-04-28
Routes:
- /product/deepexi
- /fastAgi
- /product/fastdata-foil
- /product/deepSense
- /product/dataSense
- /product/deepClaw

## Shared Product Page Rules

- Reuse the existing TODO1 site shell
- Product routes are enabled in header, footer, and homepage product cards
- Company, case, investor, activity, report, and news entries remain disabled in TODO2
- `/deepexi` is a compatibility route for `/product/deepexi`
- `/fastagi` is a compatibility route for `/fastAgi`
- Compatibility routes stay accessible but must emit canonical + `noindex,follow`

## Route Visual Summary

### /product/deepexi
- hero title: Deepexi 企业大模型
- desktop hero image: https://fastdata-cms-prd-obs.deepexi.com/Deepexi_2x_5d0cac4630.jpg
- mobile hero image: https://fastdata-cms-prd-obs.deepexi.com/H5_Deepexi_0c9eb901ac.jpg

### /fastAgi
- hero title: FastAGI 企业智能体平台
- desktop hero image: https://fastdata-cms-prd-obs.deepexi.com/Fast_AGI_2x_0317d84afc.jpg
- mobile hero image: https://fastdata-cms-prd-obs.deepexi.com/H5_Fast_AGI_29c43579ce.jpg

### /product/fastdata-foil
- hero title: FastData Foil 数据融合平台
- desktop hero image: https://fastdata-cms-prd-obs.deepexi.com/banner_Fast_Foil_2x_89462e6c1b.jpg
- mobile hero image: https://fastdata-cms-prd-obs.deepexi.com/H5_Fast_Foil_5175359d3e.jpg

### /product/deepSense
- hero title: DeepSense工业智能体
- desktop hero image: https://fastdata-cms-prd-obs.deepexi.com/Deep_Sense_2x_8ef2cfa84c.jpg
- mobile hero image: https://fastdata-cms-prd-obs.deepexi.com/H5_Deep_Sense_9be8340957.jpg

### /product/dataSense
- hero title: DataSense运营智能体
- desktop hero image: https://fastdata-cms-prd-obs.deepexi.com/Data_Sense_2x_24581b99b6.jpg
- mobile hero image: https://fastdata-cms-prd-obs.deepexi.com/H5_Data_Sense_c49810fe6a.jpg

### /product/deepClaw
- hero title: DeepClaw 企业基础智能体
- desktop hero image: https://fastdata-cms-prd-obs.deepexi.com/Deep_Claw_2x_49684dd4ec.jpg
- mobile hero image: https://fastdata-cms-prd-obs.deepexi.com/H5_Deep_Claw_7020428a37.jpg

## Local Asset Targets Used In TODO 2

- `public/images/deepexi/products/deepexi/*`
- `public/images/deepexi/products/fastagi/*`
- `public/images/deepexi/products/fastdata-foil/*`
- `public/images/deepexi/products/deepsense/*`
- `public/images/deepexi/products/datasense/*`
- `public/images/deepexi/products/deepclaw/*`
```

- [ ] **Step 3: Create the product asset download script**

Create `scripts/download-deepexi-product-assets.mjs` with this exact structure:

```js
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");

const assetMap = [
  [
    "https://fastdata-cms-prd-obs.deepexi.com/Deepexi_2x_5d0cac4630.jpg",
    "public/images/deepexi/products/deepexi/hero-desktop.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/H5_Deepexi_0c9eb901ac.jpg",
    "public/images/deepexi/products/deepexi/hero-mobile.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/Fast_AGI_2x_0317d84afc.jpg",
    "public/images/deepexi/products/fastagi/hero-desktop.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/H5_Fast_AGI_29c43579ce.jpg",
    "public/images/deepexi/products/fastagi/hero-mobile.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/banner_Fast_Foil_2x_89462e6c1b.jpg",
    "public/images/deepexi/products/fastdata-foil/hero-desktop.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/H5_Fast_Foil_5175359d3e.jpg",
    "public/images/deepexi/products/fastdata-foil/hero-mobile.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/Deep_Sense_2x_8ef2cfa84c.jpg",
    "public/images/deepexi/products/deepsense/hero-desktop.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/H5_Deep_Sense_9be8340957.jpg",
    "public/images/deepexi/products/deepsense/hero-mobile.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/Data_Sense_2x_24581b99b6.jpg",
    "public/images/deepexi/products/datasense/hero-desktop.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/H5_Data_Sense_c49810fe6a.jpg",
    "public/images/deepexi/products/datasense/hero-mobile.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/Deep_Claw_2x_49684dd4ec.jpg",
    "public/images/deepexi/products/deepclaw/hero-desktop.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/H5_Deep_Claw_7020428a37.jpg",
    "public/images/deepexi/products/deepclaw/hero-mobile.jpg",
  ],
];

async function downloadAsset(sourceUrl, targetPath) {
  const targetFile = resolve(repoRoot, targetPath);
  await mkdir(dirname(targetFile), { recursive: true });

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${sourceUrl}: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await writeFile(targetFile, Buffer.from(arrayBuffer));
  console.log(`Downloaded ${targetPath}`);
}

for (const [sourceUrl, targetPath] of assetMap) {
  await downloadAsset(sourceUrl, targetPath);
}
```

- [ ] **Step 4: Verify the reference artifacts exist**

Run:

```bash
test -f docs/research/deepexi/products-reference.md
test -f docs/design-references/deepexi-product-deepexi-desktop.png
test -f docs/design-references/deepexi-product-fastagi-mobile.png
```

Expected:

```text
exit 0
```

- [ ] **Step 5: Commit the reference artifacts**

```bash
git add docs/research/deepexi/products-reference.md scripts/download-deepexi-product-assets.mjs docs/design-references public/images/deepexi/products
git commit -m "docs: capture Deepexi product route references"
```

### Task 2: Extend Typed Contracts for Product Routes

**Files:**
- Modify: `src/types/site.ts`
- Test: `npm run typecheck`

- [ ] **Step 1: Extend the route unions for TODO2**

Update `src/types/site.ts` so `SiteRouteHref` includes the now-in-scope product and compatibility routes:

```ts
export type SiteRouteHref =
  | "/case"
  | "/company"
  | "/deepexi"
  | "/fastAgi"
  | "/fastagi"
  | "/investor-relations"
  | "/product/dataSense"
  | "/product/deepClaw"
  | "/product/deepSense"
  | "/product/deepexi"
  | "/product/fastdata-foil";
```

Do not add legacy FastData aliases. Keep `SiteAnchorHref`, `SiteLinkItem`, and `HomeFeatureCard` aligned with the existing discriminated-union model from TODO1.

- [ ] **Step 2: Add product-page content contracts**

Append these types to `src/types/site.ts`:

```ts
export interface ProductHeroContent {
  title: string;
  description: string;
  desktopImageSrc: string;
  mobileImageSrc: string;
}

export interface ProductBodySection {
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface ProductPageContent {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: SiteRouteHref;
  compatibilityPaths?: SiteRouteHref[];
  hero: ProductHeroContent;
  sections: readonly ProductBodySection[];
}
```

- [ ] **Step 3: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected:

```text
> ai-website-clone-template@0.3.1 typecheck
> tsc --noEmit
```

- [ ] **Step 4: Commit the contract changes**

```bash
git add src/types/site.ts
git commit -m "feat: extend route contracts for Deepexi product pages"
```

### Task 3: Add Product Content Sources

**Files:**
- Modify: `src/content/site-nav.ts`
- Modify: `src/content/site-footer.ts`
- Modify: `src/content/home.ts`
- Create: `src/content/products/deepexi.ts`
- Create: `src/content/products/fastagi.ts`
- Create: `src/content/products/fastdata-foil.ts`
- Create: `src/content/products/deepsense.ts`
- Create: `src/content/products/datasense.ts`
- Create: `src/content/products/deepclaw.ts`
- Test: `npm run typecheck`

- [ ] **Step 1: Re-enable only product-related shell entries**

Update `src/content/site-nav.ts` so:

```ts
export const deepexiOsColumns: NavColumn[] = [
  {
    title: "基础设施",
    items: [
      { label: "Deepexi 企业大模型", href: "/product/deepexi", kind: "route" },
      { label: "FastAGI 企业智能体平台", href: "/fastAgi", kind: "route" },
    ],
  },
  {
    title: "智能体",
    items: [
      { label: "DeepSense 工业智能体", href: "/product/deepSense", kind: "route" },
      { label: "DataSense 运营智能体", href: "/product/dataSense", kind: "route" },
      { label: "DeepClaw 企业基础智能体", href: "/product/deepClaw", kind: "route" },
    ],
  },
];
```

Leave `deepexiPrimaryNav` and `aboutColumns` disabled for now.

- [ ] **Step 2: Re-enable only product-related footer and homepage entries**

Update `src/content/site-footer.ts` so the `DeepexiOS` group items become `kind: "route"` with the existing hrefs. Keep investor, company, and 企业动态 disabled.

Update `src/content/home.ts` so `homeFeatureCards` becomes:

```ts
export const homeFeatureCards: HomeFeatureCard[] = [
  {
    title: "FastAGI 企业级人工智能解决方案",
    description:
      "FastAGI是基于自有企业级多模态大模型技术栈构建的Agentic人工智能解决方案。",
    imageSrc: "/images/deepexi/home/feature-fastagi.png",
    imageAlt: "FastAGI 产品展示图",
    href: "/fastAgi",
    kind: "route",
  },
  {
    title: "Deepexi企业大模型",
    description:
      "Deepexi 企业大模型通过学习企业内部业务逻辑、专有名词与历史数据，形成企业专属认知。",
    imageSrc: "/images/deepexi/home/feature-deepexi.png",
    imageAlt: "Deepexi 企业大模型展示图",
    href: "/product/deepexi",
    kind: "route",
  },
];
```

- [ ] **Step 3: Create the six product content files**

Create these files with the same structure:

```ts
import type { ProductPageContent } from "@/types/site";

export const deepexiPageContent: ProductPageContent = {
  metaTitle: "Deepexi",
  metaDescription:
    "Deepexi 企业大模型并非仅依托互联网公开数据的通用 AI，其通过学习企业内部业务逻辑、专有名词与历史数据，形成企业专属认知。",
  canonicalPath: "/product/deepexi",
  compatibilityPaths: ["/deepexi"],
  hero: {
    title: "Deepexi 企业大模型",
    description:
      "Deepexi 企业大模型并非仅依托互联网公开数据的通用 AI，其通过学习企业内部业务逻辑、专有名词与历史数据，形成企业专属认知。",
    desktopImageSrc: "/images/deepexi/products/deepexi/hero-desktop.jpg",
    mobileImageSrc: "/images/deepexi/products/deepexi/hero-mobile.jpg",
  },
  sections: [],
};
```

Repeat with route-appropriate names and canonical/compatibility values for:

- `fastagiPageContent`
  - `metaTitle`: `FastAGI`
  - `metaDescription`: `FastAGI 企业智能体平台重点升级了 Agentic AI 多项能力，实现端到端 Harness 架构。`
  - `hero.title`: `FastAGI 企业智能体平台`
  - `hero.description`: `FastAGI 企业智能体平台重点升级了 Agentic AI 多项能力，实现端到端 Harness 架构。`
  - `hero.desktopImageSrc`: `/images/deepexi/products/fastagi/hero-desktop.jpg`
  - `hero.mobileImageSrc`: `/images/deepexi/products/fastagi/hero-mobile.jpg`
- `fastdataFoilPageContent`
  - `metaTitle`: `FastData Foil`
  - `metaDescription`: `FastData Foil 数据融合平台集湖仓一体、流批一体、统一治理等功能于一身。`
  - `hero.title`: `FastData Foil 数据融合平台`
  - `hero.description`: `FastData Foil 数据融合平台集湖仓一体、流批一体、统一治理等功能于一身。`
  - `hero.desktopImageSrc`: `/images/deepexi/products/fastdata-foil/hero-desktop.jpg`
  - `hero.mobileImageSrc`: `/images/deepexi/products/fastdata-foil/hero-mobile.jpg`
- `deepsensePageContent`
  - `metaTitle`: `DeepSense`
  - `metaDescription`: `DeepSense工业智能体覆盖工程与产品设计、BOM 分析、工艺优化、故障维修、NC 研发等岗位技能。`
  - `hero.title`: `DeepSense工业智能体`
  - `hero.description`: `DeepSense工业智能体覆盖工程与产品设计、BOM 分析、工艺优化、故障维修、NC 研发等岗位技能。`
  - `hero.desktopImageSrc`: `/images/deepexi/products/deepsense/hero-desktop.jpg`
  - `hero.mobileImageSrc`: `/images/deepexi/products/deepsense/hero-mobile.jpg`
- `datasensePageContent`
  - `metaTitle`: `DataSense`
  - `metaDescription`: `DataSense运营智能体覆盖运营决策、商品企划、货品管理、财税筹划等岗位技能。`
  - `hero.title`: `DataSense运营智能体`
  - `hero.description`: `DataSense运营智能体覆盖运营决策、商品企划、货品管理、财税筹划等岗位技能。`
  - `hero.desktopImageSrc`: `/images/deepexi/products/datasense/hero-desktop.jpg`
  - `hero.mobileImageSrc`: `/images/deepexi/products/datasense/hero-mobile.jpg`
- `deepclawPageContent`
  - `metaTitle`: `DeepClaw`
  - `metaDescription`: `DeepClaw 企业基础智能体覆盖数据治理运维、代码开发、产业政策服务等基础岗位 Skills。`
  - `hero.title`: `DeepClaw 企业基础智能体`
  - `hero.description`: `DeepClaw 企业基础智能体覆盖数据治理运维、代码开发、产业政策服务等基础岗位 Skills。`
  - `hero.desktopImageSrc`: `/images/deepexi/products/deepclaw/hero-desktop.jpg`
  - `hero.mobileImageSrc`: `/images/deepexi/products/deepclaw/hero-mobile.jpg`

`compatibilityPaths` should only be present on:

- `/product/deepexi` -> `["/deepexi"]`
- `/fastAgi` -> `["/fastagi"]`

All other product pages should omit `compatibilityPaths`.

- [ ] **Step 4: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected:

```text
> ai-website-clone-template@0.3.1 typecheck
> tsc --noEmit
```

- [ ] **Step 5: Commit the content source changes**

```bash
git add src/content/site-nav.ts src/content/site-footer.ts src/content/home.ts src/content/products src/types/site.ts
git commit -m "feat: add Deepexi product route content sources"
```

### Task 4: Build Shared Product Page Primitives

**Files:**
- Create: `src/components/pages/product/product-page-shell.tsx`
- Create: `src/components/pages/product/product-hero.tsx`
- Create: `src/components/pages/product/product-section.tsx`
- Test: `npm run lint`
- Test: `npm run typecheck`

- [ ] **Step 1: Create the hero primitive**

Create `src/components/pages/product/product-hero.tsx`:

```tsx
import Image from "next/image";
import type { ProductHeroContent } from "@/types/site";

interface ProductHeroProps {
  content: ProductHeroContent;
}

export function ProductHero({ content }: ProductHeroProps) {
  return (
    <section className="relative min-h-[640px] overflow-hidden border-b border-border">
      <picture className="absolute inset-0">
        <source media="(max-width: 767px)" srcSet={content.mobileImageSrc} />
        <img
          alt=""
          className="h-full w-full object-cover"
          height="640"
          src={content.desktopImageSrc}
          width="1440"
        />
      </picture>
      <div className="relative z-10 mx-auto flex min-h-[640px] max-w-[1200px] items-center px-4">
        <div className="max-w-[640px]">
          <h1 className="text-balance text-5xl font-semibold leading-tight text-foreground md:text-6xl">
            {content.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the body-section primitive**

Create `src/components/pages/product/product-section.tsx`:

```tsx
import Image from "next/image";
import type { ProductBodySection } from "@/types/site";

interface ProductSectionProps {
  section: ProductBodySection;
}

export function ProductSection({ section }: ProductSectionProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-16">
      <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div className="min-w-0">
          <h2 className="text-balance text-3xl font-semibold text-foreground">
            {section.title}
          </h2>
          <p className="mt-6 whitespace-pre-line text-base leading-8 text-muted-foreground">
            {section.body}
          </p>
        </div>
        {section.imageSrc ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              alt={section.imageAlt ?? section.title}
              className="object-cover"
              fill
              sizes="(max-width: 767px) 100vw, 40vw"
              src={section.imageSrc}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create the route-shell primitive**

Create `src/components/pages/product/product-page-shell.tsx`:

```tsx
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { ProductHero } from "@/components/pages/product/product-hero";
import { ProductSection } from "@/components/pages/product/product-section";
import type { ProductPageContent } from "@/types/site";

interface ProductPageShellProps {
  content: ProductPageContent;
}

export function ProductPageShell({ content }: ProductPageShellProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        <ProductHero content={content.hero} />
        {content.sections.map((section) => (
          <ProductSection key={section.title} section={section} />
        ))}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Run lint and typecheck**

Run:

```bash
npx eslint src/components/pages/product/product-page-shell.tsx src/components/pages/product/product-hero.tsx src/components/pages/product/product-section.tsx
npm run typecheck
```

Expected:

```text
0 problems
```

- [ ] **Step 5: Commit the shared product primitives**

```bash
git add src/components/pages/product/product-page-shell.tsx src/components/pages/product/product-hero.tsx src/components/pages/product/product-section.tsx
git commit -m "feat: add Deepexi product page primitives"
```

### Task 5: Implement the Six Product Route Modules

**Files:**
- Create: `src/components/pages/product/deepexi-page.tsx`
- Create: `src/components/pages/product/fastagi-page.tsx`
- Create: `src/components/pages/product/fastdata-foil-page.tsx`
- Create: `src/components/pages/product/deepsense-page.tsx`
- Create: `src/components/pages/product/datasense-page.tsx`
- Create: `src/components/pages/product/deepclaw-page.tsx`
- Create: `src/app/product/deepexi/page.tsx`
- Create: `src/app/fastAgi/page.tsx`
- Create: `src/app/product/fastdata-foil/page.tsx`
- Create: `src/app/product/deepSense/page.tsx`
- Create: `src/app/product/dataSense/page.tsx`
- Create: `src/app/product/deepClaw/page.tsx`
- Test: `npm run lint`
- Test: `npm run typecheck`
- Test: `npm run build`

- [ ] **Step 1: Create the page modules**

Create one file per product page in `src/components/pages/product/` using this pattern:

```tsx
import { ProductPageShell } from "@/components/pages/product/product-page-shell";
import { deepexiPageContent } from "@/content/products/deepexi";

export function DeepexiPage() {
  return <ProductPageShell content={deepexiPageContent} />;
}
```

Repeat for all six page modules with route-appropriate imports and component names.

- [ ] **Step 2: Create the route entry files**

Create one App Router entry per page using this pattern:

```tsx
import type { Metadata } from "next";
import { DeepexiPage } from "@/components/pages/product/deepexi-page";
import { deepexiPageContent } from "@/content/products/deepexi";

export const metadata: Metadata = {
  title: deepexiPageContent.metaTitle,
  description: deepexiPageContent.metaDescription,
};

export default function Page() {
  return <DeepexiPage />;
}
```

Repeat for all six routes.

- [ ] **Step 3: Run lint, typecheck, and build**

Run:

```bash
npx eslint src/components/pages/product src/app/product src/app/fastAgi/page.tsx
npm run typecheck
npm run build
```

Expected:

```text
✓ Compiled successfully
```

- [ ] **Step 4: Commit the product route modules**

```bash
git add src/components/pages/product src/app/product src/app/fastAgi/page.tsx src/content/products
git commit -m "feat: implement Deepexi product capability routes"
```

### Task 6: Add Compatibility Routes and TODO2 Validation

**Files:**
- Create: `src/app/deepexi/page.tsx`
- Create: `src/app/fastagi/page.tsx`
- Test: `npm run lint`
- Test: `npm run typecheck`
- Test: `npm run build`

- [ ] **Step 1: Create the compatibility route files**

Create `src/app/deepexi/page.tsx`:

```tsx
import type { Metadata } from "next";
import { DeepexiPage } from "@/components/pages/product/deepexi-page";
import { deepexiPageContent } from "@/content/products/deepexi";

export const metadata: Metadata = {
  title: deepexiPageContent.metaTitle,
  description: deepexiPageContent.metaDescription,
  alternates: {
    canonical: "/product/deepexi",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <DeepexiPage />;
}
```

Create `src/app/fastagi/page.tsx`:

```tsx
import type { Metadata } from "next";
import { FastAgiPage } from "@/components/pages/product/fastagi-page";
import { fastagiPageContent } from "@/content/products/fastagi";

export const metadata: Metadata = {
  title: fastagiPageContent.metaTitle,
  description: fastagiPageContent.metaDescription,
  alternates: {
    canonical: "/fastAgi",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <FastAgiPage />;
}
```

- [ ] **Step 2: Run build verification**

Run:

```bash
npx eslint src/app/deepexi/page.tsx src/app/fastagi/page.tsx
npm run typecheck
npm run build
```

Expected:

```text
✓ Compiled successfully
```

- [ ] **Step 3: Run browser verification**

Start the local dev server:

```bash
npm run dev
```

Then verify:

- `/product/deepexi`
- `/fastAgi`
- `/product/fastdata-foil`
- `/product/deepSense`
- `/product/dataSense`
- `/product/deepClaw`
- `/deepexi`
- `/fastagi`

Acceptance criteria:

- all eight routes render without 404
- header now enables DeepexiOS product items
- footer now enables DeepexiOS product items
- homepage product cards now navigate to their product routes
- company, case, investor, activity, report, and news entries remain disabled
- `/deepexi` and `/fastagi` render the same page content as their official routes
- compatibility route metadata exposes canonical + `noindex,follow`
- legacy FastData alias routes remain unsupported

- [ ] **Step 4: Run the UI guideline review for TODO2 files**

Review target:

```text
src/app/deepexi/page.tsx
src/app/fastagi/page.tsx
src/app/fastAgi/page.tsx
src/app/product/**/*.tsx
src/components/pages/product/**/*.tsx
src/components/site/header.tsx
src/components/site/footer.tsx
src/content/products/*.ts
src/content/site-nav.ts
src/content/site-footer.ts
src/content/home.ts
src/types/site.ts
```

Fix any findings required before finalizing TODO2.

- [ ] **Step 5: Commit TODO2**

```bash
git add src/app/deepexi/page.tsx src/app/fastagi/page.tsx src/app/fastAgi/page.tsx src/app/product src/components/pages/product src/content/products src/content/site-nav.ts src/content/site-footer.ts src/content/home.ts src/types/site.ts
git commit -m "feat: implement Deepexi product capability pages"
```

## Self-Review

### Spec Coverage

- six product/capability routes: covered in Tasks 3 through 5
- compatibility routes `/deepexi` and `/fastagi`: covered in Task 6
- compatibility route SEO metadata: covered in Task 6
- selective product-only shell activation: covered in Task 3
- legacy FastData aliases remain unsupported: covered in Task 6 browser verification

### Placeholder Scan

- No `TBD`, `TODO`, or source-URL placeholders remain in the executable steps.
- Product body sections are intentionally allowed to start as empty arrays, because this plan lands the route structure and validated hero layer first; deeper section population still has to come from the captured product reference note during implementation.

### Type Consistency

- `ProductPageContent`, `ProductHeroContent`, and `ProductBodySection` are introduced once in Task 2 and then reused consistently in Tasks 3 through 6.
- `SiteRouteHref` is the single source of truth for routable TODO2 paths.
