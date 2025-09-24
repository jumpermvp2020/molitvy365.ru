'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Heart, Shield, Users, Clock, Sparkles, BookOpen, X } from 'lucide-react';
import { PrayerIndex } from '@/types/prayer';

interface QuickSearchProps {
    prayerIndex: PrayerIndex;
}

// Пресеты для быстрого поиска на главной (меньше, чем в каталоге)
const quickSearchPresets = [
    { name: 'О здравии', tags: ['о здравии', 'при болезни', 'о здоровье'], icon: Heart },
    { name: 'О детях', tags: ['о детях', 'для родителей', 'молитвы о детях'], icon: Users },
    { name: 'Семейные', tags: ['семейная молитва', 'для семьи', 'о семейном благополучии'], icon: Heart },
    { name: 'Защитные', tags: ['о защите', 'от врагов', 'от искушений'], icon: Shield },
    { name: 'Благодарственные', tags: ['благодарение', 'в радости', 'благодарность Богу'], icon: Sparkles },
    { name: 'О работе', tags: ['труд', 'карьера', 'дело', 'о работе', 'о труде', 'о благословении труда'], icon: Clock }
];

export default function QuickSearch({ prayerIndex }: QuickSearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

    // Фильтрация молитв
    const { allFilteredPrayers, displayedPrayers } = useMemo(() => {
        let filtered = prayerIndex.prayers;

        // Поиск по названию
        if (searchQuery) {
            filtered = filtered.filter(prayer =>
                prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prayer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Фильтр по пресету
        if (selectedPreset) {
            const preset = quickSearchPresets.find(p => p.name === selectedPreset);
            if (preset) {
                filtered = filtered.filter(prayer =>
                    preset.tags.some(tag => prayer.tags.some(prayerTag =>
                        prayerTag.toLowerCase().includes(tag.toLowerCase())
                    ))
                );
            }
        }

        return {
            allFilteredPrayers: filtered, // Все найденные молитвы для подсчета
            displayedPrayers: filtered.slice(0, 6) // Первые 6 для отображения
        };
    }, [searchQuery, selectedPreset, prayerIndex.prayers]);

    const handlePresetClick = (presetName: string) => {
        if (selectedPreset === presetName) {
            setSelectedPreset(null);
        } else {
            setSelectedPreset(presetName);
            setSearchQuery(''); // Очищаем поиск при выборе пресета
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSelectedPreset(null);
    };

    return (
        <div className="mb-8 mt-12 sm:mb-12">
            <div className="container-responsive" >


                {/* Заголовок */}
                <div className="text-center mb-6">
                    <h2 className="heading-text text-gray-900 mb-2">
                        Найдите нужную молитву
                    </h2>
                    <p className="caption-text text-gray-600">
                        Быстрый поиск среди {prayerIndex.totalPrayers} молитв
                    </p>
                </div>

                {/* Поисковая строка */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Поиск по названию молитвы или тегам..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setSelectedPreset(null); // Очищаем пресет при поиске
                        }}
                        className="w-full pl-12 pr-12 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                    />
                    {(searchQuery || selectedPreset) && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Быстрые пресеты */}
                <div className="mb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {quickSearchPresets.map((preset) => {
                            const IconComponent = preset.icon;
                            const isSelected = selectedPreset === preset.name;
                            return (
                                <button
                                    key={preset.name}
                                    onClick={() => handlePresetClick(preset.name)}
                                    className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border transition-all duration-200 ${isSelected
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-xs sm:text-sm font-medium text-center">
                                        {preset.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Результаты поиска */}
                {(searchQuery || selectedPreset) && (
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="caption-text font-medium text-gray-900">
                                Найдено: {allFilteredPrayers.length}
                            </h3>
                            <Link
                                href="/catalog"
                                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                            >
                                <BookOpen className="w-4 h-4" />
                                Полный каталог
                            </Link>
                        </div>

                        {displayedPrayers.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {displayedPrayers.map((prayer) => (
                                    <Link
                                        key={prayer.id}
                                        href={`/prayer/${prayer.url}`}
                                        className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <h4 className="caption-text font-medium text-gray-900 line-clamp-2 mb-1">
                                            {prayer.title}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {prayer.category}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                <p className="caption-text text-gray-500">
                                    Молитвы не найдены. Попробуйте другой запрос.
                                </p>
                            </div>
                        )}

                        {/* Информация о количестве показанных результатов */}
                        {allFilteredPrayers.length > 6 && (
                            <div className="mt-4 text-center">
                                <p className="caption-text text-gray-500 mb-2">
                                    Показано 6 из {allFilteredPrayers.length} результатов
                                </p>
                                <Link
                                    href={`/catalog?${new URLSearchParams({
                                        ...(searchQuery && { q: searchQuery }),
                                        ...(selectedPreset && { preset: selectedPreset })
                                    }).toString()}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Показать все результаты
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Ссылка на полный каталог */}
                {!searchQuery && !selectedPreset && (
                    <div className="text-center">
                        <Link
                            href="/catalog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
                        >
                            <BookOpen className="w-5 h-5" />
                            Открыть полный каталог молитв
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
