'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import PrayerBlock from '@/components/PrayerBlock';
import ProjectsBlock from '@/components/ProjectsBlock';
import DaysNavigation from '@/components/DaysNavigation';
import Footer from '@/components/Footer';
import QuickSearch from '@/components/QuickSearch';
import SiteInfo from '@/components/SiteInfo';
import { Prayer, PrayerIndex } from '@/types/prayer';
import { useFavorites } from '@/hooks/useFavorites';

interface HomeClientProps {
    initialPrayer: Prayer;
    prayerIndex: PrayerIndex;
}

export default function HomeClient({ initialPrayer, prayerIndex }: HomeClientProps) {
    const router = useRouter();
    const [currentPrayer, setCurrentPrayer] = useState<Prayer>(initialPrayer);
    const [isLoading, setIsLoading] = useState(false);
    const [shownPrayerIds, setShownPrayerIds] = useState<Set<string>>(new Set([initialPrayer.id.toString()]));
    const { favorites } = useFavorites();

    const getRandomPrayer = async (): Promise<Prayer> => {
        // Получаем молитвы, которые еще не показывались
        const availablePrayers = prayerIndex.prayers.filter(prayer => !shownPrayerIds.has(prayer.id.toString()));

        // Если все молитвы уже показаны, сбрасываем список показанных
        if (availablePrayers.length === 0) {
            setShownPrayerIds(new Set());
            const randomIndex = Math.floor(Math.random() * prayerIndex.totalPrayers);
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
        setIsLoading(true);
        try {
            const randomPrayer = await getRandomPrayer();
            setCurrentPrayer(randomPrayer);

            // Добавляем ID молитвы в список показанных
            if (randomPrayer.id) {
                setShownPrayerIds(prev => new Set([...prev, randomPrayer.id.toString()]));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Главный контент */}
            <main className="pt-16 pb-8">
                <div className="container mx-auto px-4">
                    {/* Случайная молитва */}
                    <PrayerBlock
                        prayer={currentPrayer}
                        onRefresh={handleRefresh}
                    />

                    {/* Быстрый поиск */}
                    <QuickSearch prayerIndex={prayerIndex} />

                    {/* Навигация по дням недели */}
                    <DaysNavigation compact={true} />
                </div>
            </main>

            {/* Блок с другими молитвами */}
            <ProjectsBlock prayerIndex={prayerIndex} />

            {/* Информация о сайте */}
            <SiteInfo />

            {/* Футер */}
            <Footer />
        </div>
    );
}
