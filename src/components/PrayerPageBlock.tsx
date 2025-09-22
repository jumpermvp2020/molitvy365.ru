'use client';

import { Share2, ArrowLeft, ChevronDown, ChevronUp, Heart, Bookmark } from 'lucide-react';
import { Prayer } from '@/types/prayer';
import { PrayerCategory, PrayerCategorySection } from '@/types/prayer-categories';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { prayerCategories } from '@/data/prayer-categories';
import { useFavorites } from '@/hooks/useFavorites';
import { showBookmarkInstructions, copyUrlToClipboard } from '@/utils/bookmark';

interface PrayerPageBlockProps {
    prayer: Prayer;
    h1Title?: string; // Предвыбранный заголовок H1 для категории
}

export default function PrayerPageBlock({ prayer, h1Title }: PrayerPageBlockProps) {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModernLanguage, setIsModernLanguage] = useState(false);
    const [bookmarkMessage, setBookmarkMessage] = useState<string | null>(null);
    const { isFavorite, toggleFavorite } = useFavorites();

    // Получаем категорию молитвы
    const getPrayerCategory = (prayerId: number): PrayerCategory | null => {
        const categoryKey = prayerCategories.prayerMappings[prayerId.toString()];
        if (!categoryKey) return null;
        return prayerCategories.categories[categoryKey] || null;
    };

    const category = getPrayerCategory(prayer.id);

    // Определяем текст для отображения
    const displayContent = isModernLanguage && prayer.contentModern ? prayer.contentModern : prayer.content;
    const hasModernTranslation = !!prayer.contentModern;

    // Функция для обработки переносов строк в тексте
    const formatTextWithLineBreaks = (text: string) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                {index < text.split('\n').length - 1 && <br />}
            </span>
        ));
    };

    // Определяем, нужно ли показывать кнопку развернуть/свернуть
    const shouldShowExpandButton = displayContent.length > 500;
    const maxHeight = '200px'; // Максимальная высота в свернутом состоянии

    const handleBack = () => {
        router.back();
    };

    const handleShare = async () => {
        const url = `${window.location.origin}/prayer/${prayer.randomUrl}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: prayer.title,
                    text: prayer.content.substring(0, 100) + '...',
                    url: url,
                });
            } catch (error) {
                console.log('Поделиться отменено');
            }
        } else {
            // Fallback для браузеров без Web Share API
            await navigator.clipboard.writeText(url);
            alert('Ссылка скопирована в буфер обмена!');
        }
    };

    const handleBookmark = async () => {
        const url = `${window.location.origin}/prayer/${prayer.randomUrl}`;

        // Показываем инструкции и копируем URL
        const instructions = showBookmarkInstructions();
        const copyResult = await copyUrlToClipboard(url);
        setBookmarkMessage(`${instructions}. ${copyResult}`);

        // Убираем сообщение через 5 секунд
        setTimeout(() => setBookmarkMessage(null), 5000);
    };

    return (
        <div className="max-w-2xl mx-auto px-4">
            {/* Кнопка "Назад" и H1 заголовок */}
            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="
                        inline-flex items-center gap-2 px-4 py-2 
                        text-gray-600 hover:text-gray-800 
                        bg-white hover:bg-gray-50 
                        rounded-lg border border-gray-200 
                        transition-all duration-200
                        hover:shadow-sm
                    "
                    title="Вернуться назад"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Назад
                </button>

                {/* H1 заголовок с категорией молитвы */}
                {h1Title && (
                    <h1 className="text-lg font-medium text-gray-700 text-right max-w-md">
                        {h1Title}
                    </h1>
                )}
            </div>

            <div
                className="bg-white rounded-3xl shadow-lg p-8"
                style={{
                    boxShadow: '0 6px 16px rgba(0,0,0,0.06)'
                }}
            >
                {/* H1 заголовок с названием молитвы */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                    {prayer.title}
                </h2>

                {/* Переключатель языков */}
                {hasModernTranslation && (
                    <div className="flex justify-center mb-6">
                        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                            <button
                                onClick={() => setIsModernLanguage(false)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${!isModernLanguage
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Церковнославянский
                            </button>
                            <button
                                onClick={() => setIsModernLanguage(true)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isModernLanguage
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Современный русский
                            </button>
                        </div>
                    </div>
                )}

                {/* Текст молитвы */}
                <div className="relative">
                    <div
                        className="text-lg leading-relaxed text-gray-900 text-center mb-6 max-w-none transition-all duration-300 ease-in-out whitespace-pre-line"
                        style={{
                            maxWidth: '60ch',
                            maxHeight: shouldShowExpandButton && !isExpanded ? maxHeight : 'none',
                            overflow: shouldShowExpandButton && !isExpanded ? 'hidden' : 'visible'
                        }}
                    >
                        {displayContent}
                    </div>


                    {/* Кнопка развернуть/свернуть */}
                    {shouldShowExpandButton && (
                        <div className="text-center mt-12 mb-6">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="
                                    inline-flex items-center gap-2 px-4 py-2 
                                    text-gray-600 hover:text-gray-800 
                                    bg-gray-50 hover:bg-gray-100 
                                    rounded-lg border border-gray-200 
                                    transition-all duration-200
                                    hover:shadow-sm text-sm
                                "
                            >
                                {isExpanded ? (
                                    <>
                                        <ChevronUp className="w-4 h-4" />
                                        Свернуть
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4" />
                                        Развернуть
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Summary информация */}
                {prayer.summary && (
                    <div className="mb-6 mt-6 p-6 bg-gradient-to-br from-[#FCE7D7] to-[#F9F5FF] rounded-xl border border-[#E5E7EB]">
                        <h3 className="text-sm font-medium text-[#4B5563] mb-3 uppercase tracking-wider">Описание молитвы</h3>
                        <p className="text-[#1A1A1A] mb-4 leading-relaxed">{prayer.summary.text}</p>
                        {prayer.summary.tags && prayer.summary.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {prayer.summary.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-block px-3 py-1 text-xs font-medium text-[#1A1A1A] bg-white/60 rounded-full border border-white/40"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Кнопки действий */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={() => toggleFavorite(prayer)}
                                className={`
                                    w-12 h-12 rounded-full transition-all duration-200
                                    flex items-center justify-center
                                    hover:scale-105 hover:shadow-md
                                    ${isFavorite(prayer.id)
                                        ? 'bg-red-100 hover:bg-red-200'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                    }
                                `}
                                title={isFavorite(prayer.id) ? "Удалить из избранного" : "Добавить в избранное"}
                            >
                                <Heart
                                    className={`w-5 h-5 transition-colors duration-200 ${isFavorite(prayer.id)
                                        ? 'text-red-500 fill-red-500'
                                        : 'text-gray-600'
                                        }`}
                                />
                            </button>
                            <span className="text-xs text-gray-500">
                                {isFavorite(prayer.id) ? "В избранном" : "Избранное"}
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={handleBookmark}
                                className="
                                    w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 
                                    flex items-center justify-center transition-all duration-200
                                    hover:scale-105 hover:shadow-md
                                "
                                title="Добавить в закладки браузера"
                            >
                                <Bookmark className="w-5 h-5 text-blue-600" />
                            </button>
                            <span className="text-xs text-gray-500">Закладки</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={handleShare}
                                className="
                                    w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 
                                    flex items-center justify-center transition-all duration-200
                                    hover:scale-105 hover:shadow-md
                                "
                                title="Поделиться"
                            >
                                <Share2 className="w-5 h-5 text-gray-600" />
                            </button>
                            <span className="text-xs text-gray-500">Поделиться</span>
                        </div>
                    </div>
                </div>

                {/* Сообщение о закладках */}
                {bookmarkMessage && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800 text-center">{bookmarkMessage}</p>
                    </div>
                )}
            </div>

            {/* Расширенный блок с описанием категории */}
            {category && category.detailedDescription && (
                <div className="mt-8 bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {category.detailedDescription.title}
                    </h3>

                    <div className="space-y-4">
                        {category.detailedDescription.sections.map((section: PrayerCategorySection, index: number) => (
                            <div key={index}>
                                <h4 className="text-lg font-medium text-gray-800 mb-2">
                                    {section.title}
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    {section.items.map((item: string, itemIndex: number) => (
                                        <li key={itemIndex} className="text-sm">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* SEO описание */}
                    <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-blue-200">
                        <p className="text-sm text-gray-600 italic">
                            {category.seoDescription}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
