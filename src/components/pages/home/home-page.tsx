import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import {
  homeAgentCards,
  homeFeatureCards,
  homeHero,
  homeNewsHref,
  homeNewsItems,
} from "@/content/home";

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-[#f7fbff]">
        <section className="relative overflow-hidden bg-[#eef4fb]">
          <picture className="absolute inset-0 block h-full w-full">
            <source media="(max-width: 767px)" srcSet={homeHero.mobileImageSrc} />
            <img
              alt=""
              className="h-full w-full object-cover object-center"
              height="960"
              src={homeHero.desktopImageSrc}
              width="5120"
            />
          </picture>
          <div className="relative mx-auto flex min-h-[388px] max-w-[1200px] items-start justify-center px-4 pt-10 pb-6 text-center md:min-h-[540px] md:pt-12">
            <h1 className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)]">
              {homeHero.title}
            </h1>
          </div>
        </section>

        <section
          aria-labelledby="home-platform-heading"
          className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef6ff_100%)]"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-12 md:py-14">
            <div className="mx-auto max-w-[1320px] text-center">
              <h2
                id="home-platform-heading"
                className="text-balance text-3xl font-semibold text-foreground md:text-4xl"
              >
                AI级企业操作系统 DeepexiOS 平台
              </h2>
              <p className="mx-auto mt-6 max-w-[1160px] text-sm leading-7 text-muted-foreground md:text-base">
                DeepexiOS 作为 AI 级企业操作系统是以 Deepexi 企业大模型与 FastAGI
                企业智能体平台协同而成。可面向客户构建企业级 Skill 能力单元；通过多类企业级 Skills
                组合形成 AI 员工，再由多名 AI 员工协同组建不同领域的行业智能体。目前已落地三大核心智能体，分别为工业智能体
                DeepSense、运营智能体 DataSense 及企业基础智能体 DeepClaw，以智能体模式，持续稳定地为行业客户交付业务价值。
              </p>
            </div>

            <div className="mt-8">
              <Image
                alt="DeepexiOS 平台总览图"
                className="h-auto w-full"
                height={1352}
                priority
                sizes="100vw"
                src="/images/deepexi/home/platform-visual.png"
                width={2400}
              />
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {homeAgentCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[20px] bg-white px-7 py-8 text-center shadow-[0_18px_48px_rgba(126,156,213,0.14)]"
                >
                  <Image
                    alt={card.imageAlt}
                    className="mx-auto h-20 w-20"
                    height={80}
                    src={card.imageSrc}
                    width={80}
                  />
                  <h3 className="mt-6 text-[18px] font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-4 text-left text-sm leading-7 text-muted-foreground">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#eef6ff_0%,#f7fbff_100%)]">
          <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
            <div className="space-y-16 md:space-y-20">
              {homeFeatureCards.map((card) => {
                let action: ReactNode = null;

                if (card.kind === "route" || card.kind === "anchor") {
                  action = (
                    <Link
                      className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#2d67f6] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2055d9]"
                      href={card.href}
                      prefetch={false}
                    >
                      查看详情
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  );
                }

                return (
                  <article
                    key={card.title}
                    className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_600px]"
                  >
                    <div className="max-w-[520px]">
                      <h2 className="text-[18px] font-semibold text-foreground md:text-[20px]">
                        {card.title}
                      </h2>
                      <p className="mt-5 text-sm leading-8 text-muted-foreground">
                        {card.description}
                      </p>
                      {action}
                    </div>

                    <div className="justify-self-end">
                      <Image
                        alt={card.imageAlt}
                        className="h-auto w-full max-w-[600px]"
                        height={928}
                        loading="eager"
                        sizes="(min-width: 768px) 600px, 100vw"
                        src={card.imageSrc}
                        width={1200}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="home-news-heading"
          className="bg-[#f7fbff]"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
            <div className="mb-10 text-center">
              <h2
                id="home-news-heading"
                className="text-balance text-3xl font-semibold text-foreground md:text-4xl"
              >
                最新动态
              </h2>
            </div>

            <ul className="grid gap-6 lg:grid-cols-3">
              {homeNewsItems.map((item) => (
                <li
                  key={item.title}
                  className="overflow-hidden rounded-[4px] bg-white shadow-[0_12px_32px_rgba(95,126,189,0.12)]"
                >
                  <Image
                    alt={item.imageAlt}
                    className="h-auto w-full"
                    height={332}
                    loading="eager"
                    unoptimized
                    src={item.imageSrc}
                    width={772}
                  />
                  <div className="p-5">
                    <p className="line-clamp-2 text-base font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">{item.dateLabel}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex justify-center">
              <Link
                className="inline-flex items-center gap-2 rounded-sm bg-[#2d67f6] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2055d9]"
                href={homeNewsHref}
                prefetch={false}
              >
                查看更多
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
