'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

            {/* Полезные разделы в стиле Medusa */}
            <section className="bg-white py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Заголовок в стиле Medusa */}
                        <div className="text-center mb-20">
                            <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                                Расширьте свою
                                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    молитвенную практику
                                </span>
                            </h2>
                            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                                Получите доступ к полной коллекции православных молитв, организованных по темам и ситуациям
                            </p>
                        </div>

                        {/* Асимметричная компоновка в стиле Medusa */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
                            {/* Большой центральный блок - Молитвы для успокоения */}
                            <div className="lg:col-span-7 group">
                                <Link href="/molitvy/uspokoenie/" className="block h-full">
                                    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-16 h-full border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                                        {/* Декоративные элементы */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-200/20 to-teal-200/20 rounded-full translate-y-12 -translate-x-12"></div>

                                        <div className="relative z-10">
                                            <div className="flex items-start gap-6 mb-8">
                                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                                                    <Heart className="w-10 h-10 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-3xl lg:text-5xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 mb-3">
                                                        Молитвы для успокоения
                                                    </h3>
                                                    <p className="text-green-600 font-semibold text-lg">Найдите покой в молитве</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 text-xl leading-relaxed mb-8 max-w-2xl">
                                                Православные молитвы для успокоения души, снятия тревоги и обретения внутреннего покоя в трудные моменты жизни. Специально подобранная коллекция молитв для душевного равновесия.
                                            </p>
                                            <div className="flex items-center text-green-600 font-semibold text-lg group-hover:text-green-700 transition-colors duration-200">
                                                <span>Найти покой</span>
                                                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-200" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Боковые блоки */}
                            <div className="lg:col-span-5 space-y-8">
                                {/* Утренние молитвы */}
                                <div className="group">
                                    <Link href="/molitvy/utrennie/" className="block">
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 lg:p-8 h-full border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <Clock className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                                        Утренние молитвы
                                                    </h3>
                                                    <p className="text-blue-600 font-medium">Начните день с молитвы</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                Полный свод основных утренних молитв православного христианина.
                                            </p>
                                            <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-200">
                                                <span>Изучить</span>
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/* Избранные молитвы */}
                                <div className="group">
                                    <Link href="/favorites/" className="block">
                                        <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-3xl p-6 lg:p-8 h-full border border-red-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <Heart className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                                                        Избранные молитвы
                                                    </h3>
                                                    <p className="text-red-600 font-medium">Ваша коллекция</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                Сохраните понравившиеся молитвы для быстрого доступа.
                                            </p>
                                            <div className="flex items-center text-red-600 font-semibold group-hover:text-red-700 transition-colors duration-200">
                                                <span>Мои молитвы</span>
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Дополнительные ссылки в стиле Medusa */}
                        <div className="text-center">
                            <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <a
                                    href="/catalog/"
                                    className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Каталог молитв
                                </Link>
                                <Link
                                    href="/weekly-prayers/"
                                    className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105"
                                >
                                    <Clock className="w-5 h-5" />
                                    Еженедельные молитвы
                                </Link>
                                <Link
                                    href="/faq/"
                                    className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    FAQ
                                </Link>
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
