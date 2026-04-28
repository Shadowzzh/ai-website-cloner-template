"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LocaleSwitch } from "@/components/site/locale-switch";
import type { NavColumn, SiteLinkItem } from "@/types/site";

interface MobileMenuProps {
  primaryItems: SiteLinkItem[];
  deepexiOsColumns: NavColumn[];
  aboutColumns: NavColumn[];
}

export function MobileMenu({
  primaryItems,
  deepexiOsColumns,
  aboutColumns,
}: MobileMenuProps) {
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
        {open ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full space-y-6 border-t border-border bg-white p-4 shadow-md"
        >
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">DeepexiOS</p>
            <div className="space-y-4">
              {deepexiOsColumns.map((column) => (
                <div key={column.title} className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">{column.title}</p>
                  <ul className="space-y-3">
                    {column.items.map((item) => (
                      <li key={item.label}>
                        <span data-disabled-entry="true" className="block text-base font-medium">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <ul className="space-y-4">
            {primaryItems.map((item) => (
              <li key={item.label}>
                <span data-disabled-entry="true" className="block text-base font-medium">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">关于我们</p>
            <div className="space-y-4">
              {aboutColumns.map((column) => (
                <div key={column.title} className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">{column.title}</p>
                  <ul className="space-y-3">
                    {column.items.map((item) => (
                      <li key={item.label}>
                        <span data-disabled-entry="true" className="block text-base font-medium">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <LocaleSwitch />
          </div>
        </div>
      ) : null}
    </div>
  );
}
