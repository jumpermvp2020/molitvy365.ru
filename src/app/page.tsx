'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import PrayerBlock from '@/components/PrayerBlock';
import ProjectsBlock from '@/components/ProjectsBlock';
import Footer from '@/components/Footer';
import { Prayer, PrayerIndex } from '@/types/prayer';
import { useFavorites } from '@/hooks/useFavorites';

export default function Home() {
  const router = useRouter();
  const [currentPrayer, setCurrentPrayer] = useState<Prayer | null>(null);
  const [prayerIndex, setPrayerIndex] = useState<PrayerIndex | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shownPrayerIds, setShownPrayerIds] = useState<Set<string>>(new Set());
  const { favorites } = useFavorites();

  useEffect(() => {
    // Загружаем данные
    const loadData = async () => {
      try {
        // Загружаем индекс молитв
        const indexResponse = await fetch('/data/prayers-index.json');
        const index = await indexResponse.json();
        setPrayerIndex(index);

        // Получаем случайную молитву для показа
        const randomPrayer = await getRandomPrayerForDay(index);
        setCurrentPrayer(randomPrayer);

        // Добавляем ID молитвы в список показанных
        if (randomPrayer.id) {
          setShownPrayerIds(prev => new Set([...prev, randomPrayer.id.toString()]));
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getRandomPrayerForDay = async (index: PrayerIndex): Promise<Prayer> => {
    // Выбираем случайную молитву из всех доступных
    const randomIndex = Math.floor(Math.random() * index.totalCount);
    const prayerUrl = index.prayers[randomIndex].url;

    const response = await fetch(`/data/prayers/${prayerUrl}.json`);
    return await response.json();
  };

  const getRandomPrayer = async (): Promise<Prayer> => {
    if (!prayerIndex) return currentPrayer!;

    // Получаем молитвы, которые еще не показывались
    const availablePrayers = prayerIndex.prayers.filter(prayer => !shownPrayerIds.has(prayer.id.toString()));

    // Если все молитвы уже показаны, сбрасываем список показанных
    if (availablePrayers.length === 0) {
      setShownPrayerIds(new Set());
      const randomIndex = Math.floor(Math.random() * prayerIndex.totalCount);
      const prayerUrl = prayerIndex.prayers[randomIndex].url;
      const response = await fetch(`/data/prayers/${prayerUrl}.json`);
      return await response.json();
    }

    // Выбираем случайную молитву из доступных
    const randomIndex = Math.floor(Math.random() * availablePrayers.length);
    const prayerUrl = availablePrayers[randomIndex].url;

    const response = await fetch(`/data/prayers/${prayerUrl}.json`);
    return await response.json();
  };

  const handleRefresh = async () => {
    const randomPrayer = await getRandomPrayer();
    setCurrentPrayer(randomPrayer);

    // Добавляем ID молитвы в список показанных
    if (randomPrayer.id) {
      setShownPrayerIds(prev => new Set([...prev, randomPrayer.id.toString()]));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка молитвы...</p>
        </div>
      </div>
    );
  }

  if (!currentPrayer || !prayerIndex) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Ошибка загрузки данных</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Главный контент */}
      <main className="pt-16 pb-8">
        <PrayerBlock
          prayer={currentPrayer}
          onRefresh={handleRefresh}
        />
      </main>

      {/* Блок с другими молитвами */}
      <ProjectsBlock prayerIndex={prayerIndex} />

      {/* Футер */}
      <Footer />
    </div>
  );
}