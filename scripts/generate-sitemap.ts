import { defineConfig } from 'vite';

const SITE_URL = 'https://tretrawear.lovable.app';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'tretra-wear-urban-conversion-jxjl8.myshopify.com';
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STOREFRONT_TOKEN = '1c77b98b1468d12ecd63bd4ac6f1e67f';

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/shop', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/shipping', priority: '0.5', changefreq: 'monthly' },
  { path: '/returns', priority: '0.5', changefreq: 'monthly' },
  { path: '/faq', priority: '0.5', changefreq: 'monthly' },
  { path: '/size-guide', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

async function fetchProductHandles(): Promise<string[]> {
  const handles: string[] = [];
  let cursor: string | null = null;
  const url = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  while (true) {
    const query = `{
      products(first: 50${cursor ? `, after: "${cursor}"` : ''}) {
        edges {
          node { handle }
          cursor
        }
        pageInfo { hasNextPage }
      }
    }`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json() as any;
    const edges = json?.data?.products?.edges || [];
    edges.forEach((e: any) => handles.push(e.node.handle));

    if (!json?.data?.products?.pageInfo?.hasNextPage) break;
    cursor = edges[edges.length - 1]?.cursor;
  }

  return handles;
}

function buildSitemap(productHandles: string[]): string {
  const today = new Date().toISOString().split('T')[0];

  const staticEntries = staticPages.map(p => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

  const productEntries = productHandles.map(handle => `  <url>
    <loc>${SITE_URL}/product/${handle}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${productEntries}
</urlset>`;
}

export function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    async closeBundle() {
      const fs = await import('fs');
      const path = await import('path');
      try {
        const handles = await fetchProductHandles();
        const sitemap = buildSitemap(handles);
        const outPath = path.resolve('dist', 'sitemap.xml');
        fs.writeFileSync(outPath, sitemap, 'utf-8');
        console.log(`✅ Sitemap generated with ${staticPages.length + handles.length} URLs`);
      } catch (err) {
        console.error('⚠️ Sitemap generation failed:', err);
      }
    },
  };
}
