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

// Генерируем URL для молитв (включая альтернативные)
function generatePrayerUrls(prayers) {
    const urls = [];
    
    for (const prayer of prayers) {
        const priority = prayer.title.includes('Отче наш') ||
            prayer.title.includes('Иисусова молитва') ||
            prayer.title.includes('Богородице Дево') ? '0.9' : '0.7';

        // Добавляем основной URL
        urls.push(`
  <url>
    <loc>${baseUrl}/prayer/${prayer.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`);

        // Добавляем альтернативные URL с префиксом "molitva-" для определенных молитв
        const needsPrefix = [
            'pered-nachalom-vsyakogo-dela',
            'pered-vkusheniem-pischi', 
            'po-okonchanii-dela',
            'posle-vkusheniya-pischi'
        ];
        
        if (needsPrefix.includes(prayer.url)) {
            urls.push(`
  <url>
    <loc>${baseUrl}/prayer/molitva-${prayer.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`);
        }
        
        // Добавляем альтернативные URL для икон Богородицы
        if (prayer.url.includes('pred-ikonoyu-')) {
            const alternativeUrl = prayer.url
                .replace('pred-ikonoyu-', 'presvyatoy-bogoroditse-pered-ee-ikonoy-')
                .replace(/-\d+-\w+.*$/, ''); // убираем даты из названий
            
            urls.push(`
  <url>
    <loc>${baseUrl}/prayer/${alternativeUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`);
        }
    }
    
    return urls.join('');
}

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
  
  <!-- Страница каталога молитв -->
  <url>
    <loc>${baseUrl}/catalog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Страница молитв по дням недели -->
  <url>
    <loc>${baseUrl}/weekly-prayers</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Страницы конкретных дней недели -->
  <url>
    <loc>${baseUrl}/days/monday</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/days/tuesday</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/days/wednesday</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/days/thursday</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/days/friday</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/days/saturday</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/days/sunday</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
  ${generatePrayerUrls(sortedPrayers)}
  
</urlset>`;

// Записываем sitemap в public
const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(publicSitemapPath, sitemap);

console.log(`✅ Sitemap сгенерирован: ${sortedPrayers.length} молитв`);
console.log(`📁 Файл: ${publicSitemapPath}`);
