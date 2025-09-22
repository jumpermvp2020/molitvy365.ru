import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
    const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://molitvy365.ru/sitemap.xml

# AMP Sitemap
Sitemap: https://molitvy365.ru/amp-sitemap.xml

# Yandex Turbo
Sitemap: https://molitvy365.ru/api/turbo

# Crawl-delay для Яндекса
User-agent: YandexBot
Crawl-delay: 1

# Crawl-delay для Google
User-agent: Googlebot
Crawl-delay: 1

# AMP Bot
User-agent: Googlebot-News
Allow: /amp/

# Запрещаем индексацию служебных страниц
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Разрешаем все остальное
Allow: /prayer/
Allow: /amp/prayer/
Allow: /favorites
Allow: /data/`;

    return new NextResponse(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400',
        },
    });
}
