'use client';

import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { PrayerIndex } from '@/types/prayer';

interface ProjectsBlockProps {
    prayerIndex: PrayerIndex;
}

export default function ProjectsBlock({ prayerIndex }: ProjectsBlockProps) {
    const [showAllPrayers, setShowAllPrayers] = useState(false);
    const [shuffledPrayers, setShuffledPrayers] = useState(prayerIndex.prayers.slice(0, 6));

    // Функция для перемешивания массива (алгоритм Фишера-Йетса)
    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Перемешиваем молитвы только на клиенте после монтирования
    useEffect(() => {
        setShuffledPrayers(shuffleArray(prayerIndex.prayers).slice(0, 6));
    }, [prayerIndex.prayers]);

    // Показываем случайные 6 молитв или все молитвы
    const displayedPrayers = showAllPrayers
        ? prayerIndex.prayers
        : shuffledPrayers;

    return (
        <div className="bg-gray-50 py-8 sm:py-12 border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Заголовок */}
                <h2 className="heading-text text-center text-gray-900 mb-6 sm:mb-8 text-overflow-protection">
                    Другие молитвы
                </h2>

                {/* Сетка молитв */}
                <div className="grid-responsive mb-6 sm:mb-8">
                    {displayedPrayers.map((prayer) => (
                        <a
                            key={prayer.id}
                            href={`/prayer/${prayer.url}`}
                            className="
                bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 text-center
                hover:shadow-lg hover:scale-105 transition-all duration-200
                hover:border-gray-300 focus-visible
              "
                        >
                            <h3 className="caption-text font-medium text-gray-900 line-clamp-2 text-overflow-protection">
                                {prayer.title}
                            </h3>
                        </a>
                    ))}
                </div>

                {/* Кнопка показать больше */}
                {!showAllPrayers && prayerIndex.prayers.length > 6 && (
                    <div className="text-center mb-6 sm:mb-8">
                        <button
                            onClick={() => setShowAllPrayers(true)}
                            className="
                button-responsive bg-white border border-gray-300 rounded-xl
                hover:bg-gray-50 hover:border-gray-400 transition-colors
                text-gray-700 font-medium focus-visible
              "
                        >
                            <span className="hidden sm:inline">Показать все молитвы ({prayerIndex.totalPrayers})</span>
                            <span className="sm:hidden">Все молитвы ({prayerIndex.totalPrayers})</span>
                        </button>
                    </div>
                )}


                {/* Ссылка на hotelqr.com */}
                <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <p className="caption-text text-gray-500 text-overflow-protection">
                        Сделано с любовью на некоммерческой основе командой{' '}
                        <a
                            href="https://hotelqr.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-800 underline inline-flex items-center gap-1 focus-visible"
                        >
                            hotelqr.com
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
