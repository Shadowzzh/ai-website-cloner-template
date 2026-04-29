export type HeaderMenu = "deepexiOs" | "about";

const desktopNavItemBaseClassName =
  "flex h-full flex-col justify-center whitespace-nowrap border-b-[5px] text-[16px] transition-all duration-500";

export function getDesktopNavItemClassName(isActive: boolean) {
  if (isActive) {
    return `${desktopNavItemBaseClassName} border-[#0047bb] text-[#0047bb] font-medium`;
  }

  return `${desktopNavItemBaseClassName} border-transparent text-[#212121] font-normal hover:border-[#0047bb] hover:text-[#0047bb] hover:font-medium`;
}

export function isHeaderMenuOpen(openMenu: HeaderMenu | null, menu: HeaderMenu) {
  return openMenu === menu;
}

export function toggleHeaderMenu(openMenu: HeaderMenu | null, menu: HeaderMenu) {
  if (openMenu === menu) {
    return null;
  }

  return menu;
}

export function openHeaderMenu(menu: HeaderMenu) {
  return menu;
}
