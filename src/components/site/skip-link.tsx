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
