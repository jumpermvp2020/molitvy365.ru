import { Suspense } from 'react';
import fs from 'fs';
import path from 'path';
import { Prayer, PrayerIndex } from '@/types/prayer';
import { generateWebsiteStructuredData } from '@/lib/structured-data';
import HomeClient from './HomeClient';

// Получаем данные на сервере для статической генерации
async function getData(): Promise<{ prayer: Prayer; prayerIndex: PrayerIndex }> {
  try {
    // Загружаем индекс молитв
    const indexPath = path.join(process.cwd(), 'data', 'prayers-index.json');
    const indexContents = fs.readFileSync(indexPath, 'utf8');
    const prayerIndex: PrayerIndex = JSON.parse(indexContents);

    // Выбираем случайную молитву при каждом заходе
    const randomIndex = Math.floor(Math.random() * prayerIndex.totalPrayers);
    const prayerUrl = prayerIndex.prayers[randomIndex]?.url;

    if (!prayerUrl) {
      throw new Error('Не удалось получить URL молитвы');
    }

    // Загружаем молитву
    const prayerPath = path.join(process.cwd(), 'data', 'prayers', `${prayerUrl}.json`);
    const prayerContents = fs.readFileSync(prayerPath, 'utf8');
    const prayer: Prayer = JSON.parse(prayerContents);

    return { prayer, prayerIndex };
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
    throw error;
  }
}

export default async function Home() {
  const { prayer, prayerIndex } = await getData();

  // Структурированные данные для главной страницы
  const websiteStructuredData = generateWebsiteStructuredData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Структурированные данные */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData)
        }}
      />

      {/* Клиентский компонент с интерактивностью */}
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка...</p>
          </div>
        </div>
      }>
        <HomeClient initialPrayer={prayer} prayerIndex={prayerIndex} />
      </Suspense>
    </div>
  );
}