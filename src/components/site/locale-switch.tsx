"use client";

import { useState, type FocusEvent } from "react";
import { Globe } from "lucide-react";

const localeOptions = ["简体中文", "English"] as const;

interface LocaleSwitchProps {
  variant?: "desktop" | "mobile";
}

export function LocaleSwitch({ variant = "desktop" }: LocaleSwitchProps) {
  const [open, setOpen] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<(typeof localeOptions)[number]>(
    "简体中文",
  );

  const buttonClassName =
    variant === "desktop"
      ? "inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground transition-colors hover:text-[#1f5fff]"
      : "inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground transition-colors hover:text-[#1f5fff]";

  function handleLocaleSelect(locale: (typeof localeOptions)[number]) {
    setSelectedLocale(locale);
    setOpen(false);
  }

  function closeIfFocusLeaves(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }

  return (
    <div className="relative" onBlurCapture={closeIfFocusLeaves}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="语言切换"
        className={buttonClassName}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe aria-hidden="true" className="h-4 w-4" />
        <span>{selectedLocale}</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-2 w-[124px] rounded-[14px] bg-white p-2 shadow-[0_16px_32px_rgba(25,43,78,0.16)]"
        >
          {localeOptions.map((locale) => (
            <button
              key={locale}
              type="button"
              role="menuitem"
              className={`block w-full rounded-[10px] px-4 py-[11px] text-left text-[14px] transition-colors hover:bg-[#f4f7fc] ${
                locale === selectedLocale ? "bg-[#f3f7ff] text-[#1f5fff]" : "text-foreground"
              }`}
              onClick={() => handleLocaleSelect(locale)}
            >
              {locale}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
