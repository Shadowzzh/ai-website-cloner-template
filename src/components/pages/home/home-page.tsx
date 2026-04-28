import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import {
  homeCaseStories,
  homeFeatureCards,
  homeHero,
  homeNewsItems,
} from "@/content/home";

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-background">
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
          <div className="relative mx-auto flex min-h-[560px] max-w-[1200px] items-center px-4 py-20 md:min-h-[720px]">
            <div className="max-w-[580px]">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary/80">
                Deepexi
              </p>
              <h1 className="mt-5 max-w-[460px] text-balance text-5xl font-semibold leading-tight text-foreground md:text-7xl">
                {homeHero.title}
              </h1>
              {homeHero.description ? (
                <p className="mt-6 max-w-[520px] text-base leading-8 text-foreground/72 md:text-lg">
                  {homeHero.description}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="home-platform-heading"
          className="border-b border-border/60 bg-white"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
            <div className="max-w-[880px]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">
                Platform
              </p>
              <h2
                id="home-platform-heading"
                className="mt-4 text-balance text-3xl font-semibold text-foreground md:text-4xl"
              >
                AI级企业操作系统 DeepexiOS 平台
              </h2>
              <p className="mt-6 max-w-[760px] text-base leading-8 text-muted-foreground">
                DeepexiOS 作为 AI 级企业操作系统，由 Deepexi 企业大模型与 FastAGI
                企业智能体平台协同构成，连接企业知识、流程与任务执行链路。
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="home-feature-heading"
          className="bg-[linear-gradient(180deg,#ffffff_0%,#f5f9fd_100%)]"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div className="max-w-[760px]">
                <h2
                  id="home-feature-heading"
                  className="text-balance text-3xl font-semibold text-foreground md:text-4xl"
                >
                  关键产品能力
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  首页保留 Deepexi 官网主推能力模块，当前仅展示，不提供跳转。
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {homeFeatureCards.map((card) => (
                <article
                  key={card.title}
                  data-disabled-entry="true"
                  className="overflow-hidden rounded-[32px] border border-border/60 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex h-full flex-col p-8">
                    <div className="min-w-0">
                      <h3 className="max-w-[18ch] text-balance text-2xl font-semibold text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                    <div className="mt-8">
                      <Image
                        alt={card.imageAlt}
                        className="h-auto w-full"
                        height={928}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        src={card.imageSrc}
                        width={1200}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="home-case-heading" className="bg-white">
          <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
            <div className="mb-10 max-w-[720px]">
              <h2
                id="home-case-heading"
                className="text-balance text-3xl font-semibold text-foreground md:text-4xl"
              >
                聆听客户故事
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                典型行业案例展示滴普科技在时尚零售、工业设计与智慧医疗场景中的落地能力。
              </p>
            </div>

            <ul className="grid gap-6 lg:grid-cols-3">
              {homeCaseStories.map((story) => (
                <li
                  key={story.title}
                  className="overflow-hidden rounded-[28px] border border-border/60 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
                >
                  <div className="relative aspect-[19/8] w-full overflow-hidden">
                    <Image
                      alt={story.imageAlt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      src={story.imageSrc}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground">{story.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {story.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="home-news-heading"
          className="border-t border-border/60 bg-[#f6f9fb]"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
            <div className="mb-10 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">
                  News
                </p>
                <h2
                  id="home-news-heading"
                  className="mt-3 text-balance text-3xl font-semibold text-foreground md:text-4xl"
                >
                  最新动态
                </h2>
              </div>
              <span
                data-disabled-entry="true"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                查看更多
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </div>

            <ul className="grid gap-6 lg:grid-cols-3">
              {homeNewsItems.map((item) => (
                <li
                  key={item.title}
                  data-disabled-entry="true"
                  className="overflow-hidden rounded-[24px] border border-border/60 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)]"
                >
                  <Image
                    alt={item.imageAlt}
                    className="h-auto w-full"
                    height={348}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    src={item.imageSrc}
                    width={630}
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
