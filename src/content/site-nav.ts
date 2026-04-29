import type { NavColumn, SiteLinkItem } from "@/types/site";

export const deepexiPrimaryNav: SiteLinkItem[] = [
  { label: "行业实践", kind: "route", href: "/case" },
  { label: "投资者关系", kind: "route", href: "/investor-relations" },
];

export const deepexiOsColumns: NavColumn[] = [
  {
    title: "基础设施",
    items: [
      { label: "Deepexi 企业大模型", kind: "route", href: "/deepexi" },
      { label: "FastAGI 企业智能体平台", kind: "route", href: "/fastAgi" },
    ],
  },
  {
    title: "智能体",
    items: [
      { label: "DeepSense 工业智能体", kind: "route", href: "/product/deepSense" },
      { label: "DataSense 运营智能体", kind: "route", href: "/product/dataSense" },
      { label: "DeepClaw 企业基础智能体", kind: "route", href: "/product/deepClaw" },
    ],
  },
];

export const aboutColumns: NavColumn[] = [
  {
    title: "关于滴普",
    items: [
      { label: "关于滴普", kind: "route", href: "/company" },
      { label: "企业简介", kind: "anchor", href: "/company#intro" },
      { label: "发展历程", kind: "anchor", href: "/company#process" },
      { label: "客户信赖", kind: "anchor", href: "/company#trust" },
      { label: "联系我们", kind: "anchor", href: "/company#contact" },
    ],
  },
  {
    title: "企业动态",
    items: [{ label: "企业动态", kind: "route", href: "/news" }],
  },
];

export const aboutNewsTeasers = [
  "滴普科技X中关村丰台园｜全国首个政务服务大模型应用标杆项目落地",
  "首批通过｜滴普科技的DeepClaw通过中国信通院可信AI智能助手基准测试",
  "滴普科技企业级智能体和多个AI员工亮相2026中关村论坛年会",
  "滴普科技 X 联想｜构建AI数据分析师员工体系，助推制造产业数智跃升",
  "滴普科技 X 中集来福士｜共建智能基座AI应用，推进工业智能升级",
] as const;
