"use client";

import { useState } from "react";
import { ChevronDown, Languages } from "lucide-react";
import { showUnavailableAlert } from "@/components/site/unavailable-alert";

export function LocaleSwitch() {
  const [open, setOpen] = useState(false);

  function handleLocaleSelect() {
    setOpen(false);
    showUnavailableAlert();
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="语言切换"
        className="inline-flex items-center gap-1 text-base transition-colors hover:text-primary"
        onClick={() => setOpen((value) => !value)}
      >
        <Languages aria-hidden="true" className="h-4 w-4" />
        <span>简体中文</span>
        <ChevronDown aria-hidden="true" className="h-4 w-4" />
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
            onClick={handleLocaleSelect}
          >
            简体中文
          </button>
          <button
            type="button"
            role="menuitem"
            className="block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
            onClick={handleLocaleSelect}
          >
            English
          </button>
        </div>
      ) : null}
    </div>
  );
}
