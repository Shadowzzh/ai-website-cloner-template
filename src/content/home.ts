import type {
  HomeCaseStory,
  HomeFeatureCard,
  HomeHeroContent,
  NewsTeaserItem,
} from "@/types/site";

export const homeHero: HomeHeroContent = {
  title: "AI创造无限可能",
  description: "",
  desktopImageSrc: "/images/deepexi/home/hero-desktop.jpg",
  mobileImageSrc: "/images/deepexi/home/hero-mobile.jpg",
};

export const homeFeatureCards: HomeFeatureCard[] = [
  {
    title: "FastAGI 企业级人工智能解决方案",
    description:
      "FastAGI是基于自有企业级多模态大模型技术栈构建的Agentic人工智能解决方案。",
    imageSrc: "/images/deepexi/home/feature-fastagi.png",
    imageAlt: "FastAGI 产品展示图",
    kind: "unavailable",
  },
  {
    title: "Deepexi企业大模型",
    description:
      "Deepexi 企业大模型通过学习企业内部业务逻辑、专有名词与历史数据，形成企业专属认知。",
    imageSrc: "/images/deepexi/home/feature-deepexi.png",
    imageAlt: "Deepexi 企业大模型展示图",
    kind: "unavailable",
  },
];

export const homeCaseStories: HomeCaseStory[] = [
  {
    title: "百丽时尚",
    description: "数据基座+智能产品双轮穿透，构建时尚品牌敏捷决策范式。",
    imageSrc: "/images/deepexi/home/case-belle.jpg",
    imageAlt: "百丽时尚案例图",
  },
  {
    title: "上海船舶研究设计院",
    description: "构建船舶设计标准AI辅助系统，推动智能化高地建设。",
    imageSrc: "/images/deepexi/home/case-shipyard.jpg",
    imageAlt: "上海船舶研究设计院案例图",
  },
  {
    title: "香港医院管理局（HKHA）",
    description: "构建智能医疗战略价值链，驱动AI融合诊疗创新与资源效能跃升。",
    imageSrc: "/images/deepexi/home/case-hkha.png",
    imageAlt: "香港医院管理局案例图",
  },
];

export const homeNewsItems = [
  {
    title: "首批通过｜滴普科技的DeepClaw通过中国信通院可信AI智能助手（Claw）基准测试",
    dateLabel: "11 天前",
    imageSrc: "/images/deepexi/home/news-1.png",
    imageAlt: "DeepClaw 新闻配图",
  },
  {
    title: "滴普科技企业级智能体和多个AI员工亮相2026中关村论坛年会",
    dateLabel: "1 个月前",
    imageSrc: "/images/deepexi/home/news-2.png",
    imageAlt: "中关村论坛新闻配图",
  },
  {
    title: "滴普科技 X 联想｜构建AI数据分析师员工体系，助推制造产业数智跃升",
    dateLabel: "1 个月前",
    imageSrc: "/images/deepexi/home/news-3.png",
    imageAlt: "联想合作新闻配图",
  },
] as const satisfies readonly NewsTeaserItem[];
