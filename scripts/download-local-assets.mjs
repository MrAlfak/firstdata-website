import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const ASSETS = [
  // CloudFront & Spline
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4',
    dest: 'public/media/hero-mainframe.mp4',
  },
  {
    url: 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode',
    dest: 'public/media/scene.splinecode',
  },

  // Efferd Logos
  {
    url: 'https://storage.efferd.com/logo/nvidia-wordmark.svg',
    dest: 'public/images/logos/nvidia-wordmark.svg',
  },
  {
    url: 'https://storage.efferd.com/logo/supabase-wordmark.svg',
    dest: 'public/images/logos/supabase-wordmark.svg',
  },
  {
    url: 'https://storage.efferd.com/logo/openai-wordmark.svg',
    dest: 'public/images/logos/openai-wordmark.svg',
  },
  {
    url: 'https://storage.efferd.com/logo/turso-wordmark.svg',
    dest: 'public/images/logos/turso-wordmark.svg',
  },
  {
    url: 'https://storage.efferd.com/logo/vercel-wordmark.svg',
    dest: 'public/images/logos/vercel-wordmark.svg',
  },
  {
    url: 'https://storage.efferd.com/logo/github-wordmark.svg',
    dest: 'public/images/logos/github-wordmark.svg',
  },
  {
    url: 'https://storage.efferd.com/logo/claude-wordmark.svg',
    dest: 'public/images/logos/claude-wordmark.svg',
  },
  {
    url: 'https://storage.efferd.com/logo/clerk-wordmark.svg',
    dest: 'public/images/logos/clerk-wordmark.svg',
  },

  // Shadcn Space - Bento Grid
  {
    url: 'https://images.shadcnspace.com/assets/bento-grid/bento-grid-img-1.png',
    dest: 'public/images/shadcnspace/bento-grid/bento-grid-img-1.png',
  },
  {
    url: 'https://images.shadcnspace.com/assets/bento-grid/bento-grid-darkimg-1.png',
    dest: 'public/images/shadcnspace/bento-grid/bento-grid-darkimg-1.png',
  },
  {
    url: 'https://images.shadcnspace.com/assets/bento-grid/bento-grid-img-2.png',
    dest: 'public/images/shadcnspace/bento-grid/bento-grid-img-2.png',
  },
  {
    url: 'https://images.shadcnspace.com/assets/bento-grid/bento-grid-darkimg-2.png',
    dest: 'public/images/shadcnspace/bento-grid/bento-grid-darkimg-2.png',
  },
  {
    url: 'https://images.shadcnspace.com/assets/bento-grid/bento-grid-img-3.png',
    dest: 'public/images/shadcnspace/bento-grid/bento-grid-img-3.png',
  },

  // Shadcn Space - Logos & SVGs
  {
    url: 'https://images.shadcnspace.com/assets/logo/shadcn-logo.png',
    dest: 'public/images/shadcnspace/logo/shadcn-logo.png',
  },
  {
    url: 'https://images.shadcnspace.com/assets/logo/theme-logo.svg',
    dest: 'public/images/shadcnspace/logo/theme-logo.svg',
  },
  {
    url: 'https://images.shadcnspace.com/assets/logo/logo-icon-black.svg',
    dest: 'public/images/shadcnspace/logo/logo-icon-black.svg',
  },
  {
    url: 'https://images.shadcnspace.com/assets/logo/logo-icon-white.svg',
    dest: 'public/images/shadcnspace/logo/logo-icon-white.svg',
  },
  {
    url: 'https://images.shadcnspace.com/assets/svgs/icon-google.svg',
    dest: 'public/images/shadcnspace/svgs/icon-google.svg',
  },
  {
    url: 'https://images.shadcnspace.com/assets/svgs/icon-github.svg',
    dest: 'public/images/shadcnspace/svgs/icon-github.svg',
  },
  {
    url: 'https://images.shadcnspace.com/assets/svgs/icon-github-white.svg',
    dest: 'public/images/shadcnspace/svgs/icon-github-white.svg',
  },

  // Shadcn Space - Profiles
  {
    url: 'https://images.shadcnspace.com/assets/profiles/rough.webp',
    dest: 'public/images/shadcnspace/profiles/rough.webp',
  },
  {
    url: 'https://images.shadcnspace.com/assets/profiles/albert.webp',
    dest: 'public/images/shadcnspace/profiles/albert.webp',
  },
  {
    url: 'https://images.shadcnspace.com/assets/profiles/linda.webp',
    dest: 'public/images/shadcnspace/profiles/linda.webp',
  },
  {
    url: 'https://images.shadcnspace.com/assets/profiles/jessica.webp',
    dest: 'public/images/shadcnspace/profiles/jessica.webp',
  },
  {
    url: 'https://images.shadcnspace.com/assets/profiles/jenny.webp',
    dest: 'public/images/shadcnspace/profiles/jenny.webp',
  },
  {
    url: 'https://images.shadcnspace.com/assets/profiles/user-11.jpg',
    dest: 'public/images/shadcnspace/profiles/user-11.jpg',
  },
  {
    url: 'https://images.shadcnspace.com/assets/profiles/user-8.jpg',
    dest: 'public/images/shadcnspace/profiles/user-8.jpg',
  },
  {
    url: 'https://images.shadcnspace.com/assets/profiles/user-3.jpg',
    dest: 'public/images/shadcnspace/profiles/user-3.jpg',
  },
  {
    url: 'https://images.shadcnspace.com/assets/profiles/user-4.jpg',
    dest: 'public/images/shadcnspace/profiles/user-4.jpg',
  },
  {
    url: 'https://images.shadcnspace.com/assets/profiles/user-5.jpg',
    dest: 'public/images/shadcnspace/profiles/user-5.jpg',
  },

  // Shadcn Space - Ecommerce Drawer
  {
    url: 'https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-02-2.webp',
    dest: 'public/images/shadcnspace/ecommerce/product-category-02-2.webp',
  },
  {
    url: 'https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-1.webp',
    dest: 'public/images/shadcnspace/ecommerce/product-category-03-1.webp',
  },
  {
    url: 'https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-4.webp',
    dest: 'public/images/shadcnspace/ecommerce/product-category-03-4.webp',
  },
  {
    url: 'https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-3.webp',
    dest: 'public/images/shadcnspace/ecommerce/product-category-03-3.webp',
  },
  {
    url: 'https://images.shadcnspace.com/assets/ecommerce/product-overview/product-overview-02-img-1.webp',
    dest: 'public/images/shadcnspace/ecommerce/product-overview-02-img-1.webp',
  },

  // Plausible JS
  {
    url: 'https://plausible.io/js/script.js',
    dest: 'public/js/plausible.js',
  },
];

async function downloadAsset({ url, dest }) {
  const target = path.join(root, dest);
  if (fs.existsSync(target) && fs.statSync(target).size > 0) {
    console.log(`[skip] ${dest} already exists (${fs.statSync(target).size} bytes)`);
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  console.log(`[downloading] ${url} -> ${dest}`);
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok || !res.body) {
    throw new Error(`Failed to download ${url}: HTTP ${res.status} ${res.statusText}`);
  }
  const tmp = `${target}.tmp`;
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(tmp));
  fs.renameSync(tmp, target);
  console.log(`[done] ${dest} (${fs.statSync(target).size} bytes)`);
}

async function main() {
  for (const item of ASSETS) {
    try {
      await downloadAsset(item);
    } catch (err) {
      console.error(`[error] ${item.url}:`, err.message);
    }
  }
}

main();
