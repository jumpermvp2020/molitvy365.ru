'use client';

import { useState } from 'react';
import { RefreshCw, Share2, ChevronDown, ChevronUp, Heart, Bookmark } from 'lucide-react';
import { Prayer } from '@/types/prayer';
import { useFavorites } from '@/hooks/useFavorites';
import { showBookmarkInstructions, copyUrlToClipboard } from '@/utils/bookmark';

interface PrayerBlockProps {
    prayer: Prayer;
    onRefresh?: () => void;
}

export default function PrayerBlock({ prayer, onRefresh }: PrayerBlockProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModernLanguage, setIsModernLanguage] = useState(false);
    const [bookmarkMessage, setBookmarkMessage] = useState<string | null>(null);
    const { isFavorite, toggleFavorite } = useFavorites();

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

    const handleRefresh = () => {
        if (!onRefresh) return;

        setIsAnimating(true);
        setTimeout(() => {
            onRefresh();
            setIsAnimating(false);
        }, 200);
    };

    const handleShare = async () => {
        // На главной странице делимся ссылкой на главную
        const url = window.location.origin;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Православный молитвослов - Молитва дня',
                    text: 'Ежедневные православные молитвы и молитвослов онлайн',
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
        // На главной странице добавляем в закладки главную страницу
        const url = window.location.origin;

        // Показываем инструкции и копируем URL
        const instructions = showBookmarkInstructions();
        const copyResult = await copyUrlToClipboard(url);
        setBookmarkMessage(`${instructions}. ${copyResult}`);

        // Убираем сообщение через 5 секунд
        setTimeout(() => setBookmarkMessage(null), 5000);
    };

    return (
        <div className="container-responsive">
            <div
                className={`
          card-responsive fade-in
          ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
        `}
            >
                {/* Заголовок */}
                <h1 className="caption-text uppercase tracking-wider text-gray-600 mb-8 sm:mb-12 text-center">
                    Православный молитвослов - Молитва дня
                </h1>

                {/* Переключатель языков */}
                {hasModernTranslation && (
                    <div className="flex justify-center mb-6">
                        <div className="bg-gray-100 rounded-lg p-1 inline-flex flex-wrap gap-1">
                            <button
                                onClick={() => setIsModernLanguage(false)}
                                className={`button-responsive text-sm font-medium transition-all duration-200 focus-visible ${!isModernLanguage
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <span className="hidden sm:inline">Церковнославянский</span>
                                <span className="sm:hidden">Церковный</span>
                            </button>
                            <button
                                onClick={() => setIsModernLanguage(true)}
                                className={`button-responsive text-sm font-medium transition-all duration-200 focus-visible ${isModernLanguage
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <span className="hidden sm:inline">Современный русский</span>
                                <span className="sm:hidden">Современный</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Текст молитвы */}
                <div className="relative">
                    <div
                        className="body-text text-gray-900 text-center mb-6 max-w-none transition-all duration-300 ease-in-out whitespace-pre-line text-overflow-protection"
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
                        <div className="text-center mt-6 mb-6">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="
                                    button-responsive inline-flex items-center gap-2 
                                    text-gray-600 hover:text-gray-800 
                                    bg-gray-50 hover:bg-gray-100 
                                    border border-gray-200 
                                    transition-all duration-200
                                    hover:shadow-sm text-sm focus-visible
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

                {/* Источник */}
                <div className="caption-text text-gray-500 text-right mb-6 sm:mb-8 text-overflow-protection">
                    {prayer.title}
                </div>

                {/* Summary информация */}
                {prayer.summary && (
                    <div className="mb-6 mt-6 p-4 sm:p-6 bg-gradient-to-br from-[#FCE7D7] to-[#F9F5FF] rounded-xl border border-[#E5E7EB]">
                        <h3 className="caption-text font-medium text-[#4B5563] mb-3 uppercase tracking-wider">Описание молитвы</h3>
                        <p className="body-text text-[#1A1A1A] mb-4 leading-relaxed text-overflow-protection">{prayer.summary.text}</p>
                        {prayer.summary.tags && prayer.summary.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {prayer.summary.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-block px-2 sm:px-3 py-1 text-xs font-medium text-[#1A1A1A] bg-white/60 rounded-full border border-white/40 text-overflow-protection"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Кнопки действий */}
                <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
                    {onRefresh && (
                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={handleRefresh}
                                className="
                                    w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 hover:bg-gray-200 
                                    flex items-center justify-center transition-all duration-200
                                    hover:scale-105 hover:shadow-md focus-visible
                                "
                                title="Новая молитва"
                            >
                                <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                            </button>
                            <span className="caption-text text-gray-500">Новая</span>
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={() => toggleFavorite(prayer)}
                            className={`
                                w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200
                                flex items-center justify-center
                                hover:scale-105 hover:shadow-md focus-visible
                                ${isFavorite(prayer.id)
                                    ? 'bg-red-100 hover:bg-red-200'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }
                            `}
                            title={isFavorite(prayer.id) ? "Удалить из избранного" : "Добавить в избранное"}
                        >
                            <Heart
                                className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${isFavorite(prayer.id)
                                    ? 'text-red-500 fill-red-500'
                                    : 'text-gray-600'
                                    }`}
                            />
                        </button>
                        <span className="caption-text text-gray-500">
                            {isFavorite(prayer.id) ? "В избранном" : "Избранное"}
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={handleBookmark}
                            className="
                                w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 hover:bg-blue-200 
                                flex items-center justify-center transition-all duration-200
                                hover:scale-105 hover:shadow-md focus-visible
                            "
                            title="Добавить в закладки браузера"
                        >
                            <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </button>
                        <span className="caption-text text-gray-500">Закладки</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={handleShare}
                            className="
                                w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 hover:bg-gray-200 
                                flex items-center justify-center transition-all duration-200
                                hover:scale-105 hover:shadow-md focus-visible
                            "
                            title="Поделиться"
                        >
                            <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                        </button>
                        <span className="caption-text text-gray-500">Поделиться</span>
                    </div>
                </div>

                {/* Сообщение о закладках */}
                {bookmarkMessage && (
                    <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="caption-text text-blue-800 text-center text-overflow-protection">{bookmarkMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
