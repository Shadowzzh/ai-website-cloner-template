"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, type FocusEvent, type KeyboardEvent } from "react";
import {
  getDesktopNavItemClassName,
  isHeaderMenuOpen,
  openHeaderMenu,
  toggleHeaderMenu,
  type HeaderMenu,
} from "@/components/site/header-desktop-nav";
import { LocaleSwitch } from "@/components/site/locale-switch";
import { MobileMenu } from "@/components/site/mobile-menu";
import {
  aboutColumns,
  aboutNewsTeasers,
  deepexiOsColumns,
  deepexiPrimaryNav,
} from "@/content/site-nav";
import type { NavColumn, SiteLinkItem } from "@/types/site";

function renderNavLink(item: SiteLinkItem, className: string) {
  if (item.kind === "route" || item.kind === "anchor") {
    return (
      <Link className={className} href={item.href} prefetch={false}>
        {item.label}
      </Link>
    );
  }

  return (
    <span data-disabled-entry="true" className={className}>
      {item.label}
    </span>
  );
}

function renderMenuColumn(column: NavColumn) {
  return (
    <div key={column.title}>
      <div className="flex items-center gap-1 text-[15px] font-semibold text-[#1f5fff]">
        <span>{column.title}</span>
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
      </div>
      <div className="mt-3 h-px bg-[#c7d7f2]" />
      <ul className="mt-5 space-y-5">
        {column.items.map((item) => (
          <li key={item.label}>
            {renderNavLink(
              item,
              "text-[16px] text-foreground transition-colors hover:text-[#1f5fff]",
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const [openMenu, setOpenMenu] = useState<HeaderMenu | null>(null);

  const aboutOverviewColumn = aboutColumns[0];
  const aboutOverviewItems = aboutOverviewColumn.items.filter(
    (item) => item.label !== aboutOverviewColumn.title,
  );

  function closeIfFocusLeaves(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenMenu(null);
    }
  }

  function handleTriggerKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    menu: HeaderMenu,
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

  function renderDesktopPanel() {
    if (openMenu === "deepexiOs") {
      return (
        <div className="absolute inset-x-0 top-full border-t border-[#e6edf5] bg-[linear-gradient(90deg,#f5f8fb_0%,#fbfdff_58%,#f5f8fb_100%)]">
          <div className="mx-auto grid max-w-[1234px] grid-cols-[292px_292px_minmax(0,1fr)] gap-9 px-6 py-8">
            {deepexiOsColumns.map((column) => renderMenuColumn(column))}
          </div>
        </div>
      );
    }

    if (openMenu === "about") {
      return (
        <div className="absolute inset-x-0 top-full border-t border-[#e6edf5] bg-[linear-gradient(90deg,#f5f8fb_0%,#fbfdff_58%,#f5f8fb_100%)]">
          <div className="mx-auto grid max-w-[1234px] grid-cols-[292px_520px_minmax(0,1fr)] gap-9 px-6 py-8">
            <div>
              <div className="flex items-center gap-1 text-[15px] font-semibold text-[#1f5fff]">
                <span>{aboutOverviewColumn.title}</span>
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </div>
              <div className="mt-3 h-px bg-[#c7d7f2]" />
              <ul className="mt-5 space-y-5">
                {aboutOverviewItems.map((item) => (
                  <li key={item.label}>
                    {renderNavLink(
                      item,
                      "text-[16px] text-foreground transition-colors hover:text-[#1f5fff]",
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 max-w-[540px]">
              <div className="flex items-center gap-1 text-[15px] font-semibold text-[#1f5fff]">
                <span>企业动态</span>
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </div>
              <div className="mt-3 h-px bg-[#c7d7f2]" />
              <ul className="mt-5 space-y-4">
                {aboutNewsTeasers.map((item) => (
                  <li key={item}>
                    <Link
                      className="block truncate text-[15px] text-foreground transition-colors hover:text-[#1f5fff]"
                      href="/news"
                      prefetch={false}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <header
      className="relative sticky top-0 z-[100] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
      onBlurCapture={closeIfFocusLeaves}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex h-[66px] max-w-[1234px] items-center justify-between px-4">
        <div className="flex h-full items-center gap-7">
          <Link aria-label="滴普科技首页" className="block w-[182px]" href="/">
            <Image
              alt="滴普科技"
              className="h-[34px] w-[182px] object-contain"
              height="34"
              src="/images/deepexi/home/logo-zh.png"
              width="182"
            />
          </Link>

          <nav aria-label="主导航" className="hidden h-full md:flex md:items-stretch">
            <ul className="hidden h-full pl-4 text-[16px] md:flex">
              <li className="relative flex h-full cursor-pointer items-center pr-5 pl-10">
                <button
                  type="button"
                  aria-expanded={isHeaderMenuOpen(openMenu, "deepexiOs")}
                  className={getDesktopNavItemClassName(isHeaderMenuOpen(openMenu, "deepexiOs"))}
                  onClick={() => setOpenMenu((value) => toggleHeaderMenu(value, "deepexiOs"))}
                  onKeyDown={(event) => handleTriggerKeyDown(event, "deepexiOs")}
                  onMouseEnter={() => setOpenMenu(openHeaderMenu("deepexiOs"))}
                >
                  DeepexiOS
                </button>
              </li>

              {deepexiPrimaryNav.map((item) => (
                <li key={item.label} className="relative flex h-full cursor-pointer items-center px-5">
                  {renderNavLink(item, getDesktopNavItemClassName(false))}
                </li>
              ))}

              <li className="relative flex h-full cursor-pointer items-center px-5">
                <button
                  type="button"
                  aria-expanded={isHeaderMenuOpen(openMenu, "about")}
                  className={getDesktopNavItemClassName(isHeaderMenuOpen(openMenu, "about"))}
                  onClick={() => setOpenMenu((value) => toggleHeaderMenu(value, "about"))}
                  onKeyDown={(event) => handleTriggerKeyDown(event, "about")}
                  onMouseEnter={() => setOpenMenu(openHeaderMenu("about"))}
                >
                  关于我们
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LocaleSwitch variant="desktop" />
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <LocaleSwitch variant="mobile" />
            <span aria-hidden="true" className="text-sm text-[#cfd7e3]">
              |
            </span>
            <MobileMenu
              primaryItems={deepexiPrimaryNav}
            />
          </div>
        </div>
      </div>
      {renderDesktopPanel()}
    </header>
  );
}
