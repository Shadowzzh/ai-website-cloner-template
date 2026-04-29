# Deepexi 页面流转总览图

文档角色：
- 当前文件为详细版和事实源，记录完整页面节点、导航上下文节点、关键跳转边和完整 Mermaid
- 摘要版见 [deepexi-page-flow-overview.md](./deepexi-page-flow-overview.md)
- 最后一次 Playwright 线上校验：2026-04-28

适用范围：
- 当前产品按本仓库上下文解释为 Deepexi 公共网站
- 本文件关注“整个网站的页面集合”和“页面之间的主要跳转关系”
- 本文件不展开单个用户任务路径，而是描述站点级页面网络
- `/company#intro`、`/company#trust` 这类锚点视为同一页面内定位，不单独算页面
- 站外直播页和 PDF 报告不计入 Deepexi 站内页面总数，但会作为流转终点标记

## 1. 页面清单

```text
页面总数
- 规范页面：13
- 新闻详情页实例：118
- 兼容入口页：2
- 站内页面节点总数：133

建模补充
- 导航上下文节点：3
  - header_deepexios_menu
  - header_about_menu
  - footer_shared_links
- company 页内锚点入口：4
  - /company#intro
  - /company#process
  - /company#trust
  - /company#contact
- 外部终点节点：2
  - external_live_page
  - external_report_pdf

模块：门户入口
- home
  - URL: /
  - 标题: 首页

模块：产品与能力
- product_deepexi
  - URL: /product/deepexi
  - 标题: Deepexi 企业大模型
- product_fastagi
  - URL: /fastAgi
  - 标题: FastAGI 企业智能体平台
- product_fastdata_foil
  - URL: /product/fastdata-foil
  - 标题: FastData Foil AI-Ready 企业数据融合平台
- product_deepsense
  - URL: /product/deepSense
  - 标题: DeepSense 工业智能体
- product_datasense
  - URL: /product/dataSense
  - 标题: DataSense 运营智能体
- product_deepclaw
  - URL: /product/deepClaw
  - 标题: DeepClaw 企业基础智能体
"~/Documents/code/crawler/docs/deepexi-page-flow-map.md" 324L, 14035B