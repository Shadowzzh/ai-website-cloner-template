import type {
  HomeAgentCard,
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

export const homeAgentCards: HomeAgentCard[] = [
  {
    title: "DeepSense 工业智能体",
    description:
      "覆盖了工程与产品设计、BOM 分析、工艺优化、故障维修、NC 研发等岗位的 Skills，聚焦工业业务场景，具备稳定可靠的执行能力与长期记忆特性。",
    imageSrc: "/images/deepexi/home/agent-deepsense.png",
    imageAlt: "DeepSense 工业智能体图标",
  },
  {
    title: "DataSense 运营智能体",
    description:
      "覆盖了运营决策、商品企划、货品管理、财税筹划等岗位的 Skills，融合指标平台与大模型推理，实现从数据查询到业务执行的闭环。",
    imageSrc: "/images/deepexi/home/agent-datasense.png",
    imageAlt: "DataSense 运营智能体图标",
  },
  {
    title: "DeepClaw 企业基础智能体",
    description:
      "覆盖了数据治理运维、代码开发、产业政策服务等基础岗位的 Skills。融合企业背景知识与行为规范，提供可控、可审计的执行过程。",
    imageSrc: "/images/deepexi/home/agent-deepclaw.png",
    imageAlt: "DeepClaw 企业基础智能体图标",
  },
];

export const homeFeatureCards: HomeFeatureCard[] = [
  {
    title: "FastAGI 企业级人工智能解决方案",
    description:
      "FastAGI是基于自有企业级多模态大模型技术栈构建的Agentic人工智能解决方案，旨在无缝集成及加速跨业务职能实施AI解决方案。FastAGI解决方案通过提供深度运营决策支持及生产力增强工具，直接解决核心业务挑战。",
    imageSrc: "/images/deepexi/home/feature-fastagi.png",
    imageAlt: "FastAGI 产品展示图",
    kind: "route",
    href: "/fastAgi",
  },
  {
    title: "Deepexi企业大模型",
    description:
      "Deepexi 企业大模型并非仅依托互联网公开数据的通用 AI，其通过学习企业内部业务逻辑、专有名词与历史数据，形成企业“独一家”的认知，具备企业内部的沟通语境。",
    imageSrc: "/images/deepexi/home/feature-deepexi.png",
    imageAlt: "Deepexi 企业大模型展示图",
    kind: "route",
    href: "/deepexi",
  },
];

export const homeNewsHref = "/news" as const;

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
