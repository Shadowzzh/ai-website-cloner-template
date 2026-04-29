import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");

const assetMap = [
  [
    "https://www.deepexi.com/images/logo-zh.png",
    "public/images/deepexi/home/logo-zh.png",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/AI_2x_fc25bd31a2.jpg",
    "public/images/deepexi/home/hero-desktop.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/H5_banner_e0d41088fe.jpg",
    "public/images/deepexi/home/hero-mobile.jpg",
  ],
  [
    "https://www.deepexi.com/images/index-pc-bg.png",
    "public/images/deepexi/home/platform-bg-desktop.png",
  ],
  [
    "https://www.deepexi.com/images/index-h5-bg.png",
    "public/images/deepexi/home/platform-bg-mobile.png",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/Deepexi_OS_5ee62d2557.png",
    "public/images/deepexi/home/platform-visual.png",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/Fast_AGI_2x_341deee87f.png",
    "public/images/deepexi/home/feature-fastagi.png",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/Deepexi_2x_7a70299006.png",
    "public/images/deepexi/home/feature-deepexi.png",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/2x_5a75727354.jpg",
    "public/images/deepexi/home/case-belle.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/2x_8a3f87334e.jpg",
    "public/images/deepexi/home/case-shipyard.jpg",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/hk_2x_d70cdff979.png",
    "public/images/deepexi/home/case-hkha.png",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/2026_0417_deepclaw_99fe8ea4fb.png",
    "public/images/deepexi/home/news-1.png",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/0326_0c1411e409.png",
    "public/images/deepexi/home/news-2.png",
  ],
  [
    "https://fastdata-cms-prd-obs.deepexi.com/20260326_086178a2b7.png",
    "public/images/deepexi/home/news-3.png",
  ],
];

async function downloadAsset(sourceUrl, targetPath) {
  const targetFile = resolve(repoRoot, targetPath);
  await mkdir(dirname(targetFile), { recursive: true });

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${sourceUrl}: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await writeFile(targetFile, Buffer.from(arrayBuffer));
  console.log(`Downloaded ${targetPath}`);
}

for (const [sourceUrl, targetPath] of assetMap) {
  await downloadAsset(sourceUrl, targetPath);
}
