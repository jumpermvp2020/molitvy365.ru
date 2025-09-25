'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, BookOpen, Clock, ArrowRight } from 'lucide-react';
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

            {/* Полезные ссылки */}
            <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Полезные разделы
                            </h2>
                            <p className="text-xl text-gray-600">
                                Расширьте свою молитвенную практику
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Ссылка на утренние молитвы */}
                            <a
                                href="/molitvy/utrennie/"
                                className="group bg-white rounded-3xl p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col"
                            >
                                <div className="text-center flex flex-col h-full">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-200">
                                        <Clock className="w-12 h-12 text-white" />
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 mb-6">
                                        Утренние молитвы
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md mx-auto flex-grow">
                                        Полный свод основных утренних молитв православного христианина с подробными объяснениями и краткими версиями для начинающих.
                                    </p>
                                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-4 rounded-xl border border-blue-100 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-200">
                                        <span className="text-lg font-semibold text-indigo-600 group-hover:text-indigo-700">
                                            Изучить молитвы
                                        </span>
                                        <ArrowRight className="w-6 h-6 text-indigo-600 group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </div>
                            </a>

                            {/* Ссылка на избранные молитвы */}
                            <a
                                href="/favorites/"
                                className="group bg-white rounded-3xl p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col"
                            >
                                <div className="text-center flex flex-col h-full">
                                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-200">
                                        <Heart className="w-12 h-12 text-white" />
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 mb-6">
                                        Избранные молитвы
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md mx-auto flex-grow">
                                        Сохраните понравившиеся молитвы для быстрого доступа. Создайте свою личную коллекцию молитв для ежедневного чтения.
                                    </p>
                                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-rose-50 px-8 py-4 rounded-xl border border-red-100 group-hover:from-red-100 group-hover:to-rose-100 transition-all duration-200">
                                        <span className="text-lg font-semibold text-red-600 group-hover:text-red-700">
                                            Мои молитвы
                                        </span>
                                        <ArrowRight className="w-6 h-6 text-red-600 group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Дополнительные ссылки */}
                        <div className="mt-16 text-center">
                            <div className="inline-flex flex-wrap gap-6 justify-center">
                                <a
                                    href="/catalog/"
                                    className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Каталог молитв
                                </a>
                                <a
                                    href="/weekly-prayers/"
                                    className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105"
                                >
                                    <Clock className="w-5 h-5" />
                                    Еженедельные молитвы
                                </a>
                                <a
                                    href="/faq/"
                                    className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    FAQ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Футер */}
            <Footer />
        </div>
    );
}
