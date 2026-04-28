import { footerGroups } from "@/content/site-footer";

export function Footer() {
  return (
    <footer className="mt-16 bg-[#f6f9fb]">
      <div className="mx-auto max-w-[1200px] px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-foreground">{group.title}</p>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
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

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>滴普科技股份有限公司</p>
          <p className="mt-2">北京 · 深圳 · 广州 · 香港 · 杭州 · 苏州 · 成都 · 西安 · 重庆 · 南宁 · 南京</p>
          <p className="mt-4">Copyright © 2026 滴普科技版权所有</p>
        </div>
      </div>
    </footer>
  );
}
