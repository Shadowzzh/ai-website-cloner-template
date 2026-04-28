import { homeNewsItems } from "@/content/home";
import type { NavColumn, SiteLinkItem } from "@/types/site";

export const deepexiPrimaryNav: SiteLinkItem[] = [
  { label: "行业实践", kind: "unavailable" },
  { label: "投资者关系", kind: "unavailable" },
];

export const deepexiOsColumns: NavColumn[] = [
  {
    title: "基础设施",
    items: [
      { label: "Deepexi 企业大模型", kind: "unavailable" },
      { label: "FastAGI 企业智能体平台", kind: "unavailable" },
    ],
  },
  {
    title: "智能体",
    items: [
      { label: "DeepSense 工业智能体", kind: "unavailable" },
      { label: "DataSense 运营智能体", kind: "unavailable" },
      { label: "DeepClaw 企业基础智能体", kind: "unavailable" },
    ],
  },
];

export const aboutColumns: NavColumn[] = [
  {
    title: "关于滴普",
    items: [
      { label: "关于滴普", kind: "unavailable" },
      { label: "企业简介", kind: "unavailable" },
      { label: "发展历程", kind: "unavailable" },
      { label: "客户信赖", kind: "unavailable" },
      { label: "联系我们", kind: "unavailable" },
    ],
  },
  {
    title: "企业动态",
    items: [{ label: "企业动态", kind: "unavailable" }],
  },
];

export const aboutNewsTeasers = homeNewsItems;
