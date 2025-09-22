import { NextRequest, NextResponse } from 'next/server';
import { getAllPrayers } from '@/lib/prayers';

export async function GET(request: NextRequest) {
    try {
        const prayers = await getAllPrayers();
        const baseUrl = 'https://molitvy-dnya.ru';

        // Сортируем молитвы по популярности (можно настроить логику)
        const sortedPrayers = prayers.sort((a, b) => {
            // Приоритет для популярных молитв
            const popularTitles = [
                'Отче наш',
                'Иисусова молитва',
                'Богородице Дево',
                'Символ веры',
                'Ангелу-хранителю'
            ];

            const aIsPopular = popularTitles.some(title => a.title.includes(title));
            const bIsPopular = popularTitles.some(title => b.title.includes(title));

            if (aIsPopular && !bIsPopular) return -1;
            if (!aIsPopular && bIsPopular) return 1;

            return 0;
        });

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Главная страница -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Страница избранного -->
  <url>
    <loc>${baseUrl}/favorites</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Страницы молитв -->
  ${sortedPrayers.map(prayer => {
            const priority = prayer.title.includes('Отче наш') ||
                prayer.title.includes('Иисусова молитва') ||
                prayer.title.includes('Богородице Дево') ? '0.9' : '0.7';

            return `
  <url>
    <loc>${baseUrl}/prayer/${prayer.randomUrl}</loc>
    <lastmod>${prayer.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
        }).join('')}
  
</urlset>`;

        return new NextResponse(sitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=86400', // Кешируем на сутки
            },
        });
    } catch (error) {
        console.error('Ошибка генерации sitemap:', error);
        return new NextResponse('Ошибка генерации sitemap', { status: 500 });
    }
}
