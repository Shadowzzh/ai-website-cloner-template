import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { footerBrand, footerGroups, footerQrcode } from "@/content/site-footer";

export function Footer() {
  return (
    <footer className="bg-[#f7fbff]">
      <div className="mx-auto max-w-[1234px] px-4 pt-10 pb-9 md:pt-12">
        <div className="grid gap-8 border-b border-[#dfe8f3] pb-9 md:grid-cols-[repeat(3,minmax(0,1fr))_148px]">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-[15px] font-semibold text-foreground">{group.title}</p>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <li key={item.label}>
                    {item.kind === "route" || item.kind === "anchor" ? (
                      <Link
                        className="text-[15px] text-muted-foreground transition-colors hover:text-primary"
                        href={item.href}
                        prefetch={false}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span data-disabled-entry="true" className="text-[15px] text-muted-foreground">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="justify-self-start md:justify-self-end">
            <p className="text-[15px] font-semibold text-foreground">{footerQrcode.title}</p>
            <div className="mt-5 rounded-[6px] bg-white p-2 shadow-[0_8px_24px_rgba(69,108,180,0.12)]">
              <Image
                alt={footerQrcode.imageAlt}
                className="h-[72px] w-[72px]"
                height={72}
                loading="eager"
                src={footerQrcode.imageSrc}
                unoptimized
                width={72}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 text-sm text-muted-foreground md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Image
              alt={footerBrand.logoAlt}
              className="h-9 w-auto"
              height={36}
              loading="eager"
              src={footerBrand.logoSrc}
              unoptimized
              width={96}
            />
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[14px]">
              <p>滴普科技股份有限公司</p>
              <span aria-hidden="true">|</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                北京 · 深圳 · 广州 · 香港 · 杭州 · 苏州 · 成都 · 西安 · 重庆 · 南宁 · 南京
              </span>
            </div>
            <Link
              className="block text-[14px] transition-colors hover:text-primary"
              href="https://beian.miit.gov.cn"
              prefetch={false}
              target="_blank"
            >
              京ICP备18035375号-1
            </Link>
            <p className="text-[14px]">Copyright © 2026 滴普科技版权所有</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
