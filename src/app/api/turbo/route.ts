import { NextRequest, NextResponse } from 'next/server';
import { getAllPrayers } from '@/lib/prayers';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    const prayers = await getAllPrayers();

    const turboContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:yandex="http://news.yandex.ru" xmlns:media="http://search.yahoo.com/mrss/" xmlns:turbo="http://turbo.yandex.ru">
  <channel>
    <title>Молитвы дня - Православные молитвы</title>
    <link>https://molitvy365.ru</link>
    <description>Коллекция православных молитв для ежедневного духовного чтения</description>
    <language>ru</language>
    
    ${prayers.slice(0, 50).map(prayer => `
    <item turbo="true">
      <link>https://molitvy365.ru/prayer/${prayer.url}</link>
      <turbo:content>
        <![CDATA[
          <header>
            <h1>${prayer.title}</h1>
            <div>
              <p>${prayer.summary?.text || 'Православная молитва для духовного чтения'}</p>
            </div>
          </header>
          
          <div>
            <h2>Текст молитвы</h2>
            <div style="white-space: pre-line; line-height: 1.6; font-size: 16px;">
              ${prayer.content.replace(/\n/g, '<br>')}
            </div>
            
            ${prayer.contentModern ? `
            <h2>Современный перевод</h2>
            <div style="white-space: pre-line; line-height: 1.6; font-size: 16px; color: #666;">
              ${prayer.contentModern.replace(/\n/g, '<br>')}
            </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
              <h3>Описание молитвы</h3>
              <p>${prayer.summary?.text || 'Православная молитва для духовного чтения и молитвенной практики.'}</p>
              
              ${prayer.summary?.tags ? `
              <div style="margin-top: 15px;">
                <strong>Теги:</strong>
                <div style="margin-top: 5px;">
                  ${prayer.summary.tags.map(tag => `<span style="display: inline-block; background: #e9ecef; padding: 4px 8px; margin: 2px; border-radius: 4px; font-size: 12px;">${tag}</span>`).join('')}
                </div>
              </div>
              ` : ''}
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <a href="https://molitvy-dnya.ru" style="display: inline-block; background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Больше молитв на сайте
              </a>
            </div>
          </div>
        ]]>
      </turbo:content>
    </item>
    `).join('')}
    
  </channel>
</rss>`;

    return new NextResponse(turboContent, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Кешируем на час
      },
    });
  } catch (error) {
    console.error('Ошибка генерации турбо-страниц:', error);
    return new NextResponse('Ошибка генерации', { status: 500 });
  }
}
