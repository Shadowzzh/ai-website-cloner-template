import test from "node:test";
import assert from "node:assert/strict";

const desktopNavModulePromise = import(new URL("./header-desktop-nav.ts", import.meta.url).href);

test("desktop nav items are closed by default", async () => {
  const { isHeaderMenuOpen } = await desktopNavModulePromise;

  assert.equal(isHeaderMenuOpen(null, "deepexiOs"), false);
  assert.equal(isHeaderMenuOpen(null, "about"), false);
});

test("desktop nav inactive class uses the deepexi hover treatment", async () => {
  const { getDesktopNavItemClassName } = await desktopNavModulePromise;
  const className = getDesktopNavItemClassName(false);

  assert.match(className, /\bflex\b/);
  assert.match(className, /flex-col/);
  assert.match(className, /justify-center/);
  assert.match(className, /border-b-\[5px\]/);
  assert.match(className, /border-transparent/);
  assert.match(className, /hover:text-\[#0047bb\]/);
  assert.match(className, /hover:border-\[#0047bb\]/);
  assert.match(className, /duration-500/);
  assert.doesNotMatch(className, /leading-none/);
});

test("desktop nav active class uses the deepexi active treatment", async () => {
  const { getDesktopNavItemClassName } = await desktopNavModulePromise;
  const className = getDesktopNavItemClassName(true);

  assert.match(className, /border-b-\[5px\]/);
  assert.match(className, /border-\[#0047bb\]/);
  assert.match(className, /text-\[#0047bb\]/);
  assert.match(className, /font-medium/);
});

test("click toggles desktop menu state", async () => {
  const { toggleHeaderMenu } = await desktopNavModulePromise;

  assert.equal(toggleHeaderMenu(null, "deepexiOs"), "deepexiOs");
  assert.equal(toggleHeaderMenu("deepexiOs", "deepexiOs"), null);
  assert.equal(toggleHeaderMenu("deepexiOs", "about"), "about");
});

test("hover opens the requested desktop menu immediately", async () => {
  const { openHeaderMenu } = await desktopNavModulePromise;

  assert.equal(openHeaderMenu("deepexiOs"), "deepexiOs");
  assert.equal(openHeaderMenu("about"), "about");
});
