# Deepexi TODO1 Home & Global Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the template placeholder homepage with the Deepexi Chinese homepage foundation, including the global site shell, zh-CN metadata, locale dropdown alert behavior, and visually preserved but non-interactive news entry points.

**Architecture:** Implement the shared site shell in `src/components/site/*`, typed static content in `src/content/*`, and the homepage route through `src/components/pages/home/*` plus `src/app/page.tsx`. Use the existing `/clone-website` workflow only to generate reference artifacts for the homepage and shell, then hand-build TODO 1 against those artifacts in the current codebase.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, existing shadcn baseline, browser MCP / `/clone-website` workflow for extraction, ESLint, TypeScript compiler, Next.js production build.

---

## Scope Split

The approved spec covers multiple route groups. This plan intentionally covers **TODO 1 only**:

- homepage
- global shell
- zh-CN document metadata
- locale dropdown + locale-item alert
- disabled home/header/footer news affordances
- foundational color/type/layout tokens

Follow-up plans should handle TODO 2 through TODO 6 after this slice lands cleanly.

## File Map

**Create**

- `docs/research/deepexi/home-reference.md`
- `src/types/site.ts`
- `src/content/site-nav.ts`
- `src/content/site-footer.ts`
- `src/content/home.ts`
- `src/components/site/unavailable-alert.tsx`
- `src/components/site/locale-switch.tsx`
- `src/components/site/mobile-menu.tsx`
- `src/components/site/header.tsx`
- `src/components/site/footer.tsx`
- `src/components/pages/home/home-page.tsx`

**Modify**

- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`

**Verification**

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- browser verification on `http://localhost:3000`

### Task 1: Capture Homepage Reference Artifacts

**Files:**
- Create: `docs/research/deepexi/home-reference.md`
- Test: `docs/design-references/deepexi-home-desktop.png`
- Test: `docs/design-references/deepexi-home-mobile.png`

- [ ] **Step 1: Run homepage extraction with the existing cloning workflow**

Command:

```text
/clone-website https://www.deepexi.com/
```

Expected:
- desktop and mobile homepage screenshots appear under `docs/design-references/`
- extraction notes and component research appear under `docs/research/`
- no in-scope product/company/activity/report routes are implemented yet in this TODO

- [ ] **Step 2: Write the local reference note used by the rest of TODO 1**

Create `docs/research/deepexi/home-reference.md` with this exact initial content:

```md
# Deepexi Home Reference

Date: 2026-04-28
Source URL: https://www.deepexi.com/

## Homepage Sections

1. Header
2. Hero banner
3. DeepexiOS platform overview
4. Product spotlight cards
5. Case/story section
6. Latest news strip
7. Footer

## Home News Rules

- Keep the visual section
- Keep all labels and cards visible
- Do not allow click interaction
- Keep items out of the tab order

## Locale Rules

- Keep trigger + dropdown panel structure
- Clicking locale items shows `alert("暂无功能")`

## Asset Paths Used In TODO 1

- https://www.deepexi.com/images/logo-zh.png
- https://fastdata-cms-prd-obs.deepexi.com/AI_2x_fc25bd31a2.jpg
- https://fastdata-cms-prd-obs.deepexi.com/H5_banner_e0d41088fe.jpg
- https://www.deepexi.com/images/index-pc-bg.png
- https://www.deepexi.com/images/index-h5-bg.png
- https://fastdata-cms-prd-obs.deepexi.com/Deepexi_OS_5ee62d2557.png
- https://fastdata-cms-prd-obs.deepexi.com/2026_0417_deepclaw_99fe8ea4fb.png
- https://fastdata-cms-prd-obs.deepexi.com/0326_0c1411e409.png
- https://fastdata-cms-prd-obs.deepexi.com/20260326_086178a2b7.png
```

- [ ] **Step 3: Verify the reference note is complete before touching app code**

Run:

```bash
test -f docs/research/deepexi/home-reference.md && rg -n "Homepage Sections|Home News Rules|Locale Rules|Asset Paths Used In TODO 1" docs/research/deepexi/home-reference.md
```

Expected:

```text
docs/research/deepexi/home-reference.md:6:## Homepage Sections
docs/research/deepexi/home-reference.md:15:## Home News Rules
docs/research/deepexi/home-reference.md:21:## Locale Rules
docs/research/deepexi/home-reference.md:26:## Asset Paths Used In TODO 1
```

- [ ] **Step 4: Commit the reference artifacts**

```bash
git add docs/research/deepexi/home-reference.md docs/design-references
git commit -m "docs: capture Deepexi homepage reference artifacts"
```

### Task 2: Define Typed Site Content Contracts

**Files:**
- Create: `src/types/site.ts`
- Create: `src/content/site-nav.ts`
- Create: `src/content/site-footer.ts`
- Create: `src/content/home.ts`
- Test: `npm run typecheck`

- [ ] **Step 1: Create the site content types**

Create `src/types/site.ts`:

```ts
export type SiteLinkKind = "route" | "anchor" | "unavailable";

export interface SiteLinkItem {
  label: string;
  href?: string;
  kind: SiteLinkKind;
  alertMessage?: string;
  children?: SiteLinkItem[];
}

export interface NavColumn {
  title: string;
  items: SiteLinkItem[];
}

export interface NewsTeaserItem {
  title: string;
  dateLabel: string;
  imageSrc: string;
  imageAlt: string;
}

export interface FooterGroup {
  title: string;
  items: SiteLinkItem[];
}

export interface HomeHeroContent {
  title: string;
  description: string;
  desktopImageSrc: string;
  mobileImageSrc: string;
}

export interface HomeFeatureCard {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export interface HomeCaseStory {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}
```

- [ ] **Step 2: Create header navigation content with disabled news entries**

Create `src/content/site-nav.ts`:

```ts
import type { NavColumn, NewsTeaserItem, SiteLinkItem } from "@/types/site";

export const deepexiPrimaryNav: SiteLinkItem[] = [
  { label: "行业实践", href: "/case", kind: "route" },
  { label: "投资者关系", href: "/investor-relations", kind: "route" },
];

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

export const aboutColumns: NavColumn[] = [
  {
    title: "关于滴普",
    items: [
      { label: "关于滴普", href: "/company", kind: "route" },
      { label: "企业简介", href: "/company#intro", kind: "anchor" },
      { label: "发展历程", href: "/company#process", kind: "anchor" },
      { label: "客户信赖", href: "/company#trust", kind: "anchor" },
      { label: "联系我们", href: "/company#contact", kind: "anchor" },
    ],
  },
  {
    title: "企业动态",
    items: [{ label: "企业动态", kind: "unavailable" }],
  },
];

export const aboutNewsTeasers: NewsTeaserItem[] = [
  {
    title: "首批通过｜滴普科技的DeepClaw通过中国信通院可信AI智能助手（Claw）基准测试",
    dateLabel: "11 天前",
    imageSrc: "/images/deepexi/home/news-1.png",
    imageAlt: "DeepClaw 新闻配图",
  },
  {
    title: "滴普科技企业级智能体和多个AI员工亮相2026中关村论坛年会",
    dateLabel: "1 个月前",
    imageSrc: "/images/deepexi/home/news-2.png",
    imageAlt: "中关村论坛新闻配图",
  },
  {
    title: "滴普科技 X 联想｜构建AI数据分析师员工体系，助推制造产业数智跃升",
    dateLabel: "1 个月前",
    imageSrc: "/images/deepexi/home/news-3.png",
    imageAlt: "联想合作新闻配图",
  },
];
```

- [ ] **Step 3: Create footer and homepage content files**

Create `src/content/site-footer.ts`:

```ts
import type { FooterGroup } from "@/types/site";

export const footerGroups: FooterGroup[] = [
  {
    title: "DeepexiOS",
    items: [
      { label: "Deepexi 企业大模型", href: "/product/deepexi", kind: "route" },
      { label: "FastAGI 企业智能体平台", href: "/fastAgi", kind: "route" },
    ],
  },
  {
    title: "投资者关系",
    items: [{ label: "投资者关系", href: "/investor-relations", kind: "route" }],
  },
  {
    title: "关于我们",
    items: [
      { label: "关于滴普", href: "/company", kind: "route" },
      { label: "企业动态", kind: "unavailable" },
    ],
  },
];
```

Create `src/content/home.ts`:

```ts
import type {
  HomeCaseStory,
  HomeFeatureCard,
  HomeHeroContent,
  NewsTeaserItem,
} from "@/types/site";

export const homeHero: HomeHeroContent = {
  title: "AI创造无限可能",
  description: "",
  desktopImageSrc: "/images/deepexi/home/hero-desktop.jpg",
  mobileImageSrc: "/images/deepexi/home/hero-mobile.jpg",
};

export const homeFeatureCards: HomeFeatureCard[] = [
  {
    title: "FastAGI 企业级人工智能解决方案",
    description:
      "FastAGI是基于自有企业级多模态大模型技术栈构建的Agentic人工智能解决方案。",
    imageSrc: "/images/deepexi/home/feature-fastagi.png",
    imageAlt: "FastAGI 产品展示图",
    href: "/fastAgi",
  },
  {
    title: "Deepexi企业大模型",
    description:
      "Deepexi 企业大模型通过学习企业内部业务逻辑、专有名词与历史数据，形成企业专属认知。",
    imageSrc: "/images/deepexi/home/feature-deepexi.png",
    imageAlt: "Deepexi 企业大模型展示图",
    href: "/product/deepexi",
  },
];

export const homeCaseStories: HomeCaseStory[] = [
  {
    title: "百丽时尚",
    description: "数据基座+智能产品双轮穿透，构建时尚品牌敏捷决策范式。",
    imageSrc: "/images/deepexi/home/case-belle.png",
    imageAlt: "百丽时尚案例图",
  },
  {
    title: "上海船舶研究设计院",
    description: "构建船舶设计标准AI辅助系统，推动智能化高地建设。",
    imageSrc: "/images/deepexi/home/case-shipyard.png",
    imageAlt: "上海船舶研究设计院案例图",
  },
  {
    title: "香港医院管理局（HKHA）",
    description: "构建智能医疗战略价值链，驱动AI融合诊疗创新与资源效能跃升。",
    imageSrc: "/images/deepexi/home/case-hkha.png",
    imageAlt: "香港医院管理局案例图",
  },
];

export const homeNewsItems: NewsTeaserItem[] = [
  {
    title: "首批通过｜滴普科技的DeepClaw通过中国信通院可信AI智能助手（Claw）基准测试",
    dateLabel: "11 天前",
    imageSrc: "/images/deepexi/home/news-1.png",
    imageAlt: "DeepClaw 新闻配图",
  },
  {
    title: "滴普科技企业级智能体和多个AI员工亮相2026中关村论坛年会",
    dateLabel: "1 个月前",
    imageSrc: "/images/deepexi/home/news-2.png",
    imageAlt: "中关村论坛新闻配图",
  },
  {
    title: "滴普科技 X 联想｜构建AI数据分析师员工体系，助推制造产业数智跃升",
    dateLabel: "1 个月前",
    imageSrc: "/images/deepexi/home/news-3.png",
    imageAlt: "联想合作新闻配图",
  },
];
```

- [ ] **Step 4: Run typecheck to prove the content contracts compile**

Run:

```bash
npm run typecheck
```

Expected:

```text
> ai-website-clone-template@0.3.1 typecheck
> tsc --noEmit
```

- [ ] **Step 5: Commit the content contracts**

```bash
git add src/types/site.ts src/content/site-nav.ts src/content/site-footer.ts src/content/home.ts
git commit -m "feat: add Deepexi shell content contracts"
```

### Task 3: Update Root Layout, Metadata, and Global Tokens

**Files:**
- Create: `src/components/site/skip-link.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Test: `npm run lint`
- Test: `npm run typecheck`

- [ ] **Step 1: Create the skip link primitive before wiring it into layout**

Create `src/components/site/skip-link.tsx`:

```tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only left-4 top-4 z-[200] rounded-md bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm focus:not-sr-only focus:absolute"
    >
      跳到主要内容
    </a>
  );
}
```

- [ ] **Step 2: Replace the default layout metadata and document language**

Update `src/app/layout.tsx` to:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SkipLink } from "@/components/site/skip-link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "滴普科技 - AI创造无限可能",
    template: "%s - 滴普科技",
  },
  description:
    "滴普科技成立于2018年，是企业级大模型头部企业，以建设 AI 时代企业数字员工基础平台为战略。",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SkipLink />
        <div className="min-h-full">{children}</div>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Replace the generic global tokens with Deepexi-oriented base styles**

Update `src/app/globals.css` so the base layer includes:

```css
@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.21 0.01 260);
    --primary: oklch(0.52 0.18 255);
    --primary-foreground: oklch(0.99 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.52 0.02 255);
    --border: oklch(0.91 0.01 255);
    --ring: oklch(0.52 0.18 255);
  }

  * {
    @apply border-border;
  }

  html {
    @apply scroll-smooth font-sans;
    color-scheme: light;
  }

  body {
    @apply bg-background text-foreground;
  }

  a,
  button {
    @apply touch-manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  :focus-visible {
    @apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-white;
  }

  [data-disabled-entry="true"] {
    @apply cursor-default opacity-100;
  }

  [data-disabled-entry="true"]:focus-visible {
    @apply ring-0;
  }
}
```

Do not reintroduce `transition-all`. Use explicit transition utilities only in component files.

- [ ] **Step 4: Verify the shell baseline compiles cleanly**

Run:

```bash
npx eslint src/app/layout.tsx
npm run typecheck
```

Expected:

```text
0 problems
```

- [ ] **Step 5: Commit the layout and token baseline**

```bash
git add src/components/site/skip-link.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat: add Deepexi zh-CN layout baseline"
```

### Task 4: Build Shared Unavailable Interaction and Locale Primitives

**Files:**
- Create: `src/components/site/unavailable-alert.tsx`
- Create: `src/components/site/locale-switch.tsx`
- Create: `src/components/site/mobile-menu.tsx`
- Test: `npm run lint`
- Test: `npm run typecheck`

- [ ] **Step 1: Create the unavailable alert helper**

Create `src/components/site/unavailable-alert.tsx`:

```tsx
"use client";

export function showUnavailableAlert(message = "暂无功能") {
  window.alert(message);
}
```

- [ ] **Step 2: Create the locale dropdown preserving the source interaction hierarchy**

Create `src/components/site/locale-switch.tsx`:

```tsx
"use client";

import { useState } from "react";
import { showUnavailableAlert } from "@/components/site/unavailable-alert";

export function LocaleSwitch() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="语言切换"
        className="inline-flex items-center gap-1 text-base transition-colors hover:text-primary focus-visible:ring-2"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true"></span>
        <span>简体中文</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-32 rounded-md bg-white p-2 shadow-md"
        >
          <button
            type="button"
            role="menuitem"
            className="block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
            onClick={() => showUnavailableAlert()}
          >
            简体中文
          </button>
          <button
            type="button"
            role="menuitem"
            className="block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
            onClick={() => showUnavailableAlert()}
          >
            English
          </button>
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Create the mobile menu scaffold**

Create `src/components/site/mobile-menu.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import type { SiteLinkItem } from "@/types/site";

interface MobileMenuProps {
  items: SiteLinkItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="打开菜单"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-transparent transition-colors hover:bg-muted"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true"></span>
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full border-t border-border bg-white p-4 shadow-md"
        >
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link className="block text-base font-medium" href={item.href}>
                    {item.label}
                  </Link>
                ) : (
                  <span data-disabled-entry="true" className="block text-base font-medium">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 4: Verify the client primitives compile**

Run:

```bash
npx eslint src/components/site/skip-link.tsx src/components/site/unavailable-alert.tsx src/components/site/locale-switch.tsx src/components/site/mobile-menu.tsx
npm run typecheck
```

Expected:

```text
0 problems
```

- [ ] **Step 5: Commit the shared primitives**

```bash
git add src/components/site/skip-link.tsx src/components/site/unavailable-alert.tsx src/components/site/locale-switch.tsx src/components/site/mobile-menu.tsx
git commit -m "feat: add Deepexi shell interaction primitives"
```

### Task 5: Implement the Shared Header and Footer

**Files:**
- Create: `src/components/site/header.tsx`
- Create: `src/components/site/footer.tsx`
- Test: `npm run lint`
- Test: `npm run typecheck`

- [ ] **Step 1: Create the header with disabled news affordances**

Create `src/components/site/header.tsx`:

```tsx
import Link from "next/link";
import { LocaleSwitch } from "@/components/site/locale-switch";
import { MobileMenu } from "@/components/site/mobile-menu";
import { aboutColumns, aboutNewsTeasers, deepexiOsColumns, deepexiPrimaryNav } from "@/content/site-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-[100] border-b border-black/5 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link aria-label="滴普科技首页" className="block w-[172px]" href="/">
            <img
              alt="滴普科技"
              className="h-9 w-[172px] object-contain"
              height="36"
              src="/images/deepexi/logo-zh.png"
              width="172"
            />
          </Link>

          <nav aria-label="主导航" className="hidden md:flex md:items-center md:gap-8">
            <div className="group relative">
              <button type="button" className="text-base font-medium hover:text-primary">
                DeepexiOS
              </button>
              <div className="invisible absolute left-0 top-full mt-4 grid min-w-[520px] grid-cols-2 gap-8 rounded-2xl bg-white p-8 opacity-0 shadow-xl transition-opacity group-hover:visible group-hover:opacity-100">
                {deepexiOsColumns.map((column) => (
                  <div key={column.title}>
                    <p className="mb-3 text-sm font-semibold text-foreground">{column.title}</p>
                    <ul className="space-y-3">
                      {column.items.map((item) => (
                        <li key={item.label}>
                          <Link className="text-sm text-muted-foreground hover:text-primary" href={item.href!}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {deepexiPrimaryNav.map((item) => (
              <Link key={item.label} className="text-base font-medium hover:text-primary" href={item.href!}>
                {item.label}
              </Link>
            ))}

            <div className="group relative">
              <button type="button" className="text-base font-medium hover:text-primary">
                关于我们
              </button>
              <div className="invisible absolute left-0 top-full mt-4 grid min-w-[720px] grid-cols-[1fr_1fr] gap-10 rounded-2xl bg-white p-8 opacity-0 shadow-xl transition-opacity group-hover:visible group-hover:opacity-100">
                <div className="space-y-6">
                  {aboutColumns.map((column) => (
                    <div key={column.title}>
                      <p className="mb-3 text-sm font-semibold text-foreground">{column.title}</p>
                      <ul className="space-y-3">
                        {column.items.map((item) => (
                          <li key={item.label}>
                            {item.href ? (
                              <Link className="text-sm text-muted-foreground hover:text-primary" href={item.href}>
                                {item.label}
                              </Link>
                            ) : (
                              <span data-disabled-entry="true" className="text-sm text-muted-foreground">
                                {item.label}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <ul className="space-y-4">
                  {aboutNewsTeasers.map((item) => (
                    <li key={item.title} data-disabled-entry="true" className="flex gap-3">
                      <img alt={item.imageAlt} className="h-16 w-24 rounded-md object-cover" height="64" src={item.imageSrc} width="96" />
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-medium text-foreground">{item.title}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{item.dateLabel}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LocaleSwitch />
          </div>
          <MobileMenu items={deepexiPrimaryNav} />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create the footer with a disabled 企业动态 item**

Create `src/components/site/footer.tsx`:

```tsx
import Link from "next/link";
import { footerGroups } from "@/content/site-footer";

export function Footer() {
  return (
    <footer className="mt-16 bg-[#f6f9fb]">
      <div className="mx-auto max-w-[1200px] px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-foreground">{group.title}</p>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link className="text-sm text-muted-foreground hover:text-primary" href={item.href}>
                        {item.label}
                      </Link>
                    ) : (
                      <span data-disabled-entry="true" className="text-sm text-muted-foreground">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>滴普科技股份有限公司</p>
          <p className="mt-2">北京 · 深圳 · 广州 · 香港 · 杭州 · 苏州 · 成都 · 西安 · 重庆 · 南宁 · 南京</p>
          <p className="mt-4">Copyright © 2026 滴普科技版权所有</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify the shell components compile**

Run:

```bash
npx eslint src/components/site/header.tsx src/components/site/footer.tsx
npm run typecheck
```

Expected:

```text
0 problems
```

- [ ] **Step 4: Commit the shared shell**

```bash
git add src/components/site/header.tsx src/components/site/footer.tsx
git commit -m "feat: add Deepexi shared header and footer"
```

### Task 6: Implement the Homepage Route and Verify TODO 1

**Files:**
- Create: `src/components/pages/home/home-page.tsx`
- Modify: `src/app/page.tsx`
- Test: `npm run lint`
- Test: `npm run typecheck`
- Test: `npm run build`

- [ ] **Step 1: Create the homepage module with a non-interactive latest news strip**

Create `src/components/pages/home/home-page.tsx`:

```tsx
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import {
  homeCaseStories,
  homeFeatureCards,
  homeHero,
  homeNewsItems,
} from "@/content/home";

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        <section className="relative min-h-[720px] bg-cover bg-center" style={{ backgroundImage: `url(${homeHero.desktopImageSrc})` }}>
          <div className="mx-auto flex min-h-[720px] max-w-[1200px] items-center px-4">
            <div className="max-w-[620px]">
              <h1 className="text-balance text-5xl font-semibold leading-tight text-foreground md:text-6xl">
                {homeHero.title}
              </h1>
              {homeHero.description ? (
                <p className="mt-6 max-w-[560px] text-lg leading-8 text-muted-foreground">{homeHero.description}</p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-16">
          <div className="max-w-[900px]">
            <h2 className="text-balance text-4xl font-semibold text-foreground">AI级企业操作系统 DeepexiOS 平台</h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              DeepexiOS 作为 AI 级企业操作系统是以 Deepexi 企业大模型与 FastAGI 企业智能体平台协同而成。
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-8 px-4 pb-16 md:grid-cols-2">
          {homeFeatureCards.map((card) => (
            <Link
              key={card.title}
              className="rounded-3xl border border-border bg-white p-8 transition-shadow hover:shadow-lg"
              href={card.href}
            >
              <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
                <div className="min-w-0">
                  <h2 className="text-balance text-2xl font-semibold text-foreground">{card.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{card.description}</p>
                </div>
                <img
                  alt={card.imageAlt}
                  className="h-auto w-full object-contain"
                  height="240"
                  src={card.imageSrc}
                  width="320"
                />
              </div>
            </Link>
          ))}
        </section>

        <section className="mx-auto max-w-[1200px] px-4 pb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-foreground">聆听客户故事</h2>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {homeCaseStories.map((story) => (
              <li key={story.title} className="overflow-hidden rounded-3xl border border-border bg-white">
                <img alt={story.imageAlt} className="h-56 w-full object-cover" height="224" src={story.imageSrc} width="384" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground">{story.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{story.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="home-news-heading" className="mx-auto max-w-[1200px] px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 id="home-news-heading" className="text-3xl font-semibold text-foreground">
              最新动态
            </h2>
            <span data-disabled-entry="true" className="inline-flex items-center gap-2 text-sm text-foreground">
              查看更多
              <span aria-hidden="true"></span>
            </span>
          </div>

          <ul className="grid gap-6 md:grid-cols-3">
            {homeNewsItems.map((item) => (
              <li key={item.title} data-disabled-entry="true" className="overflow-hidden rounded-2xl border border-border bg-white">
                <img alt={item.imageAlt} className="h-56 w-full object-cover" height="224" src={item.imageSrc} width="384" />
                <div className="p-5">
                  <p className="line-clamp-2 text-base font-medium text-foreground">{item.title}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{item.dateLabel}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Replace the placeholder root route with the homepage module**

Update `src/app/page.tsx`:

```tsx
import { HomePage } from "@/components/pages/home/home-page";

export default function Page() {
  return <HomePage />;
}
```

- [ ] **Step 3: Run build-time verification**

Run:

```bash
npx eslint src/app/page.tsx src/components/pages/home/home-page.tsx
npm run typecheck
npm run build
```

Expected:

```text
✓ Compiled successfully
```

- [ ] **Step 4: Run browser verification for the TODO 1 acceptance criteria**

Run:

```bash
npm run dev
```

Then verify in the browser:

- `/` loads with zh-CN metadata
- header is visible
- footer is visible
- locale trigger opens a dropdown
- clicking `简体中文` or `English` shows `alert("暂无功能")`
- latest news cards are visible but do not navigate
- `查看更多` is visible but not interactive
- footer `企业动态` is visible but not interactive

- [ ] **Step 5: Run the UI guideline review against all TODO 1 UI files**

Review target:

```text
src/app/layout.tsx
src/app/page.tsx
src/app/globals.css
src/components/site/*.tsx
src/components/pages/home/home-page.tsx
```

Expected:
- fix any focus, semantics, icon-label, image-dimension, or transition violations before finalizing TODO 1

- [ ] **Step 6: Commit TODO 1**

```bash
git add src/app/layout.tsx src/app/globals.css src/app/page.tsx src/components/site src/components/pages/home src/content src/types
git commit -m "feat: implement Deepexi homepage and global shell"
```

## Self-Review

### Spec Coverage

- zh-CN metadata: covered in Task 3
- homepage + shell: covered in Tasks 5 and 6
- locale dropdown + item alert: covered in Task 4
- disabled news affordances: covered in Tasks 2, 5, and 6
- compatibility-route SEO: intentionally excluded from this plan; belongs to TODO 2

### Placeholder Scan

- No `TBD`, `TODO`, or fill-later markers remain inside the executable steps
- The only deferred work is explicitly scoped to later route groups, not left ambiguous inside this plan

### Type Consistency

- `SiteLinkItem`, `NavColumn`, `FooterGroup`, and `NewsTeaserItem` are defined once in `src/types/site.ts`
- Header, footer, and homepage content all consume the same typed contracts
