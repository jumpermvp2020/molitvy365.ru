const fs = require('fs');
const path = require('path');

// Читаем данные молитв
const prayersIndexPath = path.join(__dirname, '../data/prayers-index.json');
const prayersIndex = JSON.parse(fs.readFileSync(prayersIndexPath, 'utf8'));

const baseUrl = 'https://molitvy365.ru';

// Сортируем молитвы по популярности
const sortedPrayers = prayersIndex.prayers.sort((a, b) => {
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

// Генерируем sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
  
  <!-- Информационные страницы -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/faq</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Страницы молитв -->
  ${sortedPrayers.map(prayer => {
        const priority = prayer.title.includes('Отче наш') ||
            prayer.title.includes('Иисусова молитва') ||
            prayer.title.includes('Богородице Дево') ? '0.9' : '0.7';

        return `
  <url>
    <loc>${baseUrl}/prayer/${prayer.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('')}
  
</urlset>`;

// Записываем sitemap в public
const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(publicSitemapPath, sitemap);

console.log(`✅ Sitemap сгенерирован: ${sortedPrayers.length} молитв`);
console.log(`📁 Файл: ${publicSitemapPath}`);
