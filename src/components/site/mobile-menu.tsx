"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { SiteLinkItem } from "@/types/site";

interface MobileMenuProps {
  primaryItems: SiteLinkItem[];
}

export function MobileMenu({ primaryItems }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function renderPrimaryItem(item: SiteLinkItem) {
    if (item.kind === "route" || item.kind === "anchor") {
      return (
        <Link
          className="block py-4 text-[16px] font-medium text-foreground"
          href={item.href}
          onClick={() => setOpen(false)}
          prefetch={false}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <button
        type="button"
        className="block py-4 text-[16px] font-medium text-foreground"
        onClick={() => setOpen(false)}
      >
        {item.label}
      </button>
    );
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="打开菜单"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-transparent transition-colors hover:bg-[#f4f7fc]"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-0 bottom-0 top-20 z-[95] border-t border-[#e6edf5] bg-white"
        >
          <div className="h-full w-[116px] bg-[#f1f4f8] px-3 pt-6">
            <button
              type="button"
              className="block py-4 text-[16px] font-medium text-foreground"
              onClick={() => setOpen(false)}
            >
              DeepexiOS
            </button>

            <ul>
            {primaryItems.map((item) => (
              <li key={item.label}>{renderPrimaryItem(item)}</li>
            ))}
            </ul>

            <button
              type="button"
              className="block py-4 text-[16px] font-medium text-foreground"
              onClick={() => setOpen(false)}
            >
              关于我们
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
