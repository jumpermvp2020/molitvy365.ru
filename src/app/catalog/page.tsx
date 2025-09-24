'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Home, BookOpen, Heart, Shield, Users, Clock, Sparkles, X } from 'lucide-react';
import prayersData from '../../../data/prayers-index.json';

// Пресеты для быстрого поиска
const searchPresets = [
    { name: 'О здравии', tags: ['о здравии', 'при болезни', 'о здоровье'], icon: Heart },
    { name: 'О детях', tags: ['о детях', 'для родителей', 'молитвы о детях'], icon: Users },
    { name: 'Семейные', tags: ['семейная молитва', 'для семьи', 'о семейном благополучии'], icon: Heart },
    { name: 'О работе', tags: ['труд', 'карьера', 'дело', 'о работе', 'о труде', 'о благословении труда'], icon: Clock },
    { name: 'Защитные', tags: ['о защите', 'от врагов', 'от искушений'], icon: Shield },
    { name: 'Благодарственные', tags: ['благодарение', 'в радости', 'благодарность Богу'], icon: Sparkles },
    { name: 'Покаянные', tags: ['покаяние', 'о прощении грехов', 'о спасении души'], icon: BookOpen },
    { name: 'Путешествия', tags: ['в путешествии', 'в дороге', 'о благополучном пути'], icon: Clock }
];

// Получаем уникальные категории
const categories = Array.from(new Set(prayersData.prayers.map(prayer => prayer.category))).sort();

// Компонент каталога с использованием useSearchParams
function CatalogContent() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    // Инициализация из URL параметров
    useEffect(() => {
        const q = searchParams.get('q');
        const preset = searchParams.get('preset');

        if (q) {
            setSearchQuery(q);
        }
        if (preset) {
            setSelectedPreset(preset);
        }
    }, [searchParams]);

    // Фильтрация молитв
    const filteredPrayers = useMemo(() => {
        let filtered = prayersData.prayers;

        // Поиск по названию
        if (searchQuery) {
            filtered = filtered.filter(prayer =>
                prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prayer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Фильтр по категории
        if (selectedCategory) {
            filtered = filtered.filter(prayer => prayer.category === selectedCategory);
        }

        // Фильтр по пресету
        if (selectedPreset) {
            const preset = searchPresets.find(p => p.name === selectedPreset);
            if (preset) {
                filtered = filtered.filter(prayer =>
                    preset.tags.some(tag => prayer.tags.some(prayerTag =>
                        prayerTag.toLowerCase().includes(tag.toLowerCase())
                    ))
                );
            }
        }

        return filtered;
    }, [searchQuery, selectedCategory, selectedPreset]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedPreset(null);
    };

    const handlePresetClick = (presetName: string) => {
        if (selectedPreset === presetName) {
            setSelectedPreset(null);
        } else {
            setSelectedPreset(presetName);
            setSelectedCategory(''); // Очищаем категорию при выборе пресета
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] to-[#FDFBFB]">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Навигация */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#4B5563] hover:text-[#111111] transition-colors duration-200"
                    >
                        <Home className="w-4 h-4" />
                        На главную
                    </Link>
                </div>

                {/* Заголовок */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-3 bg-white/60 rounded-2xl">
                            <BookOpen className="w-8 h-8 text-[#4B5563]" />
                        </div>
                        <h1 className="text-4xl font-bold text-[#1A1A1A]">
                            Каталог молитв
                        </h1>
                    </div>
                    <p className="text-xl text-[#4B5563] leading-relaxed max-w-3xl mx-auto">
                        Найдите нужную молитву среди {prayersData.totalPrayers} молитв.
                        Используйте поиск, фильтры или быстрые пресеты для удобной навигации.
                    </p>
                </div>

                {/* Поиск и фильтры */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-[#E5E7EB] shadow-sm">
                    {/* Поисковая строка */}
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                        <input
                            type="text"
                            placeholder="Поиск по названию молитвы или тегам..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 text-lg border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-[#111111]"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Кнопка фильтров для мобильных */}
                    <div className="flex justify-between items-center mb-4 md:hidden">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#F3F4F6] rounded-lg text-[#4B5563] hover:bg-[#E5E7EB] transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            Фильтры
                        </button>
                        {(selectedCategory || selectedPreset) && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-[#9CA3AF] hover:text-[#111111]"
                            >
                                Очистить
                            </button>
                        )}
                    </div>

                    {/* Фильтры */}
                    <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Фильтр по категории */}
                            <div>
                                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                                    Категория
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        setSelectedPreset(null); // Очищаем пресет при выборе категории
                                    }}
                                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent"
                                >
                                    <option value="">Все категории</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Активные фильтры */}
                            <div className="flex flex-col justify-end">
                                {(selectedCategory || selectedPreset) && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCategory && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#F3F4F6] text-[#4B5563] rounded-full text-sm">
                                                {selectedCategory}
                                                <button
                                                    onClick={() => setSelectedCategory('')}
                                                    className="ml-1 hover:text-[#111111]"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        )}
                                        {selectedPreset && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#F3F4F6] text-[#4B5563] rounded-full text-sm">
                                                {selectedPreset}
                                                <button
                                                    onClick={() => setSelectedPreset(null)}
                                                    className="ml-1 hover:text-[#111111]"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Быстрые пресеты */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                        Быстрый поиск
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                        {searchPresets.map((preset) => {
                            const IconComponent = preset.icon;
                            const isSelected = selectedPreset === preset.name;
                            return (
                                <button
                                    key={preset.name}
                                    onClick={() => handlePresetClick(preset.name)}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${isSelected
                                        ? 'bg-[#111111] text-white border-[#111111]'
                                        : 'bg-white/80 text-[#4B5563] border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB]'
                                        }`}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span className="text-sm font-medium text-center">
                                        {preset.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Результаты */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-[#1A1A1A]">
                            Найдено молитв: {filteredPrayers.length}
                        </h2>
                        {filteredPrayers.length !== prayersData.totalPrayers && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-[#9CA3AF] hover:text-[#111111]"
                            >
                                Показать все
                            </button>
                        )}
                    </div>

                    {/* Сетка молитв */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPrayers.map((prayer) => (
                            <Link
                                key={prayer.id}
                                href={`/prayer/${prayer.url}`}
                                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                            >
                                <h3 className="font-semibold text-[#1A1A1A] mb-3 line-clamp-2 group-hover:text-[#111111]">
                                    {prayer.title}
                                </h3>
                                <div className="text-sm text-[#6B7280] mb-4">
                                    {prayer.category}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {prayer.tags.slice(0, 4).map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-xs bg-[#F3F4F6] text-[#4B5563] px-2 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {prayer.tags.length > 4 && (
                                        <span className="text-xs text-[#9CA3AF] px-2 py-1">
                                            +{prayer.tags.length - 4}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Сообщение, если ничего не найдено */}
                    {filteredPrayers.length === 0 && (
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-[#4B5563] mb-2">
                                Молитвы не найдены
                            </h3>
                            <p className="text-[#6B7280] mb-4">
                                Попробуйте изменить поисковый запрос или фильтры
                            </p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 bg-[#111111] text-white rounded-lg hover:bg-[#333333] transition-colors"
                            >
                                Очистить фильтры
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Основной компонент страницы с Suspense
export default function CatalogPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-[#FDFBFB] to-[#EBEDEE]">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
                            <div className="h-12 bg-gray-200 rounded w-full mb-6"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }>
            <CatalogContent />
        </Suspense>
    );
}
