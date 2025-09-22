import { NextRequest, NextResponse } from 'next/server';
import { getAllPrayers } from '@/lib/prayers';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
    try {
        const prayers = await getAllPrayers();
        const baseUrl = 'https://molitvy365.ru';

        const ampSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/amp-sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;

        return new NextResponse(ampSitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=86400',
            },
        });
    } catch (error) {
        console.error('Ошибка генерации AMP sitemap:', error);
        return new NextResponse('Ошибка генерации', { status: 500 });
    }
}
