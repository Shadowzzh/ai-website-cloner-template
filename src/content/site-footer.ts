import type { FooterGroup } from "@/types/site";

export const footerGroups: FooterGroup[] = [
  {
    title: "DeepexiOS",
    items: [
      { label: "Deepexi 企业大模型", kind: "route", href: "/deepexi" },
      { label: "FastAGI 企业智能体平台", kind: "route", href: "/fastAgi" },
    ],
  },
  {
    title: "投资者关系",
    items: [{ label: "投资者关系", kind: "route", href: "/investor-relations" }],
  },
  {
    title: "关于我们",
    items: [
      { label: "关于滴普", kind: "route", href: "/company" },
      { label: "企业动态", kind: "route", href: "/news" },
    ],
  },
];

export const footerQrcode = {
  title: "关注我们",
  imageSrc: "/images/deepexi/home/footer-wechat.png",
  imageAlt: "滴普科技微信公众号二维码",
};

export const footerBrand = {
  logoSrc: "/images/deepexi/home/footer-logo.png",
  logoAlt: "滴普科技底部标识",
};
