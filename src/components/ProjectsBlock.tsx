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
        <div className="bg-gray-50 py-12 border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4">
                {/* Заголовок */}
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">
                    Другие молитвы
                </h2>

                {/* Сетка молитв */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {displayedPrayers.map((prayer) => (
                        <a
                            key={prayer.id}
                            href={`/prayer/${prayer.url}`}
                            className="
                bg-white rounded-2xl border border-gray-200 p-5 text-center
                hover:shadow-lg hover:scale-105 transition-all duration-200
                hover:border-gray-300
              "
                        >
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                                {prayer.title}
                            </h3>
                        </a>
                    ))}
                </div>

                {/* Кнопка показать больше */}
                {!showAllPrayers && prayerIndex.prayers.length > 6 && (
                    <div className="text-center mb-8">
                        <button
                            onClick={() => setShowAllPrayers(true)}
                            className="
                px-6 py-3 bg-white border border-gray-300 rounded-xl
                hover:bg-gray-50 hover:border-gray-400 transition-colors
                text-gray-700 font-medium
              "
                        >
                            Показать все молитвы ({prayerIndex.totalCount})
                        </button>
                    </div>
                )}


                {/* Ссылка на hotelqr.com */}
                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Сделано с любовью на некоммерческой основе командой{' '}
                        <a
                            href="https://hotelqr.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-800 underline inline-flex items-center gap-1"
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
