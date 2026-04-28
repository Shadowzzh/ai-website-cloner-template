"use client";

import Image from "next/image";
import { useState, type FocusEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { LocaleSwitch } from "@/components/site/locale-switch";
import { MobileMenu } from "@/components/site/mobile-menu";
import {
  aboutColumns,
  aboutNewsTeasers,
  deepexiOsColumns,
  deepexiPrimaryNav,
} from "@/content/site-nav";

export function Header() {
  const [openMenu, setOpenMenu] = useState<"deepexiOs" | "about" | null>(null);

  function closeIfFocusLeaves(
    event: FocusEvent<HTMLDivElement>,
    menu: "deepexiOs" | "about",
  ) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenMenu((value) => (value === menu ? null : value));
    }
  }

  function handleTriggerKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    menu: "deepexiOs" | "about",
  ) {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      setOpenMenu(menu);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpenMenu(null);
    }
  }

  return (
    <header className="sticky top-0 z-[100] border-b border-black/5 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link aria-label="滴普科技首页" className="block w-[172px]" href="/">
            <Image
              alt="滴普科技"
              className="h-9 w-[172px] object-contain"
              height="36"
              src="/images/deepexi/home/logo-zh.png"
              width="172"
            />
          </Link>

          <nav aria-label="主导航" className="hidden md:flex md:items-center md:gap-8">
            <div
              className="relative"
              onBlurCapture={(event) => closeIfFocusLeaves(event, "deepexiOs")}
              onMouseEnter={() => setOpenMenu("deepexiOs")}
              onMouseLeave={() => setOpenMenu((value) => (value === "deepexiOs" ? null : value))}
            >
              <button
                type="button"
                aria-expanded={openMenu === "deepexiOs"}
                className="inline-flex items-center gap-1 text-base font-medium hover:text-primary"
                onClick={() =>
                  setOpenMenu((value) => (value === "deepexiOs" ? null : "deepexiOs"))
                }
                onKeyDown={(event) => handleTriggerKeyDown(event, "deepexiOs")}
              >
                DeepexiOS
                <ChevronDown aria-hidden="true" className="h-4 w-4" />
              </button>
              <div
                className={`absolute left-0 top-full mt-4 grid min-w-[520px] grid-cols-2 gap-8 rounded-2xl bg-white p-8 shadow-xl transition-opacity ${
                  openMenu === "deepexiOs" ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                {deepexiOsColumns.map((column) => (
                  <div key={column.title}>
                    <p className="mb-3 text-sm font-semibold text-foreground">{column.title}</p>
                    <ul className="space-y-3">
                      {column.items.map((item) => (
                        <li key={item.label}>
                          <span data-disabled-entry="true" className="text-sm text-muted-foreground">
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {deepexiPrimaryNav.map((item) => (
              <span
                key={item.label}
                data-disabled-entry="true"
                className="text-base font-medium text-foreground"
              >
                {item.label}
              </span>
            ))}

            <div
              className="relative"
              onBlurCapture={(event) => closeIfFocusLeaves(event, "about")}
              onMouseEnter={() => setOpenMenu("about")}
              onMouseLeave={() => setOpenMenu((value) => (value === "about" ? null : value))}
            >
              <button
                type="button"
                aria-expanded={openMenu === "about"}
                className="inline-flex items-center gap-1 text-base font-medium hover:text-primary"
                onClick={() => setOpenMenu((value) => (value === "about" ? null : "about"))}
                onKeyDown={(event) => handleTriggerKeyDown(event, "about")}
              >
                关于我们
                <ChevronDown aria-hidden="true" className="h-4 w-4" />
              </button>
              <div
                className={`absolute left-0 top-full mt-4 grid min-w-[720px] grid-cols-[1fr_1fr] gap-10 rounded-2xl bg-white p-8 shadow-xl transition-opacity ${
                  openMenu === "about" ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <div className="space-y-6">
                  {aboutColumns.map((column) => (
                    <div key={column.title}>
                      <p className="mb-3 text-sm font-semibold text-foreground">{column.title}</p>
                      <ul className="space-y-3">
                        {column.items.map((item) => (
                          <li key={item.label}>
                            <span data-disabled-entry="true" className="text-sm text-muted-foreground">
                              {item.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <ul className="space-y-4">
                  {aboutNewsTeasers.map((item) => (
                    <li key={item.title} data-disabled-entry="true" className="flex gap-3">
                      <Image
                        alt={item.imageAlt}
                        className="h-16 w-24 rounded-md object-cover"
                        height="64"
                        src={item.imageSrc}
                        width="96"
                      />
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-medium text-foreground">
                          {item.title}
                        </p>
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
          <MobileMenu
            aboutColumns={aboutColumns}
            deepexiOsColumns={deepexiOsColumns}
            primaryItems={deepexiPrimaryNav}
          />
        </div>
      </div>
    </header>
  );
}
