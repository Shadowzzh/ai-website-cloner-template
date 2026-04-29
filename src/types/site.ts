export type SiteLinkKind = "route" | "anchor" | "unavailable";
export type SiteRouteHref =
  | "/case"
  | "/company"
  | "/deepexi"
  | "/fastAgi"
  | "/investor-relations"
  | "/news"
  | "/product/dataSense"
  | "/product/deepClaw"
  | "/product/deepSense"
  | "/product/deepexi";
export type SiteAnchorHref =
  | "/company#contact"
  | "/company#intro"
  | "/company#process"
  | "/company#trust";

interface SiteLinkItemBase {
  label: string;
  alertMessage?: string;
  children?: SiteLinkItem[];
}

export type SiteLinkItem =
  | (SiteLinkItemBase & {
      kind: "route";
      href: SiteRouteHref;
    })
  | (SiteLinkItemBase & {
      kind: "anchor";
      href: SiteAnchorHref;
    })
  | (SiteLinkItemBase & {
      kind: "unavailable";
      href?: never;
    });

export interface NavColumn {
  title: string;
  items: SiteLinkItem[];
}

export interface NewsTeaserItem {
  readonly title: string;
  readonly dateLabel: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

export interface FooterGroup {
  title: string;
  items: SiteLinkItem[];
}

export interface HomeHeroContent {
  title: string;
  description: string;
  desktopImageSrc: string;
  mobileImageSrc: string;
}

interface HomeFeatureCardBase {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface HomeAgentCard {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export type HomeFeatureCard =
  | (HomeFeatureCardBase & {
      kind: "route";
      href: SiteRouteHref;
    })
  | (HomeFeatureCardBase & {
      kind: "anchor";
      href: SiteAnchorHref;
    })
  | (HomeFeatureCardBase & {
      kind: "unavailable";
      href?: never;
    });
