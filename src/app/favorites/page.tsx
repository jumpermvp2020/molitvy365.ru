'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, ArrowLeft, Trash2, ExternalLink } from 'lucide-react';
import { useFavorites, FavoritePrayer } from '@/hooks/useFavorites';
import { Prayer } from '@/types/prayer';
import { handleBackNavigation } from '@/utils/navigation';

export default function FavoritesPage() {
    const router = useRouter();
    const { favorites, isLoading, removeFromFavorites, clearFavorites } = useFavorites();
    const [prayerDetails, setPrayerDetails] = useState<Record<number, Prayer>>({});
    const [backButtonTooltip, setBackButtonTooltip] = useState<string>("На главную страницу");

    // Обновляем tooltip после гидратации
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hasReferrer = document.referrer &&
                document.referrer !== window.location.href &&
                document.referrer.includes(window.location.origin);
            setBackButtonTooltip(hasReferrer ? "Вернуться назад" : "На главную страницу");
        }
    }, []);
    const [loadingDetails, setLoadingDetails] = useState<Set<number>>(new Set());

    // Загружаем детали молитв
    useEffect(() => {
        const loadPrayerDetails = async () => {
            for (const favorite of favorites) {
                if (!prayerDetails[favorite.id]) {
                    setLoadingDetails(prev => new Set([...prev, favorite.id]));
                    try {
                        const response = await fetch(`/data/prayers/${favorite.url}.json`);
                        const prayer: Prayer = await response.json();
                        setPrayerDetails(prev => ({
                            ...prev,
                            [favorite.id]: prayer
                        }));
                    } catch (error) {
                        console.error(`Ошибка загрузки молитвы ${favorite.id}:`, error);
                    } finally {
                        setLoadingDetails(prev => {
                            const newSet = new Set(prev);
                            newSet.delete(favorite.id);
                            return newSet;
                        });
                    }
                }
            }
        };

        if (favorites.length > 0) {
            loadPrayerDetails();
        }
    }, [favorites, prayerDetails]);

    const handleRemoveFavorite = (prayerId: number) => {
        removeFromFavorites(prayerId);
        setPrayerDetails(prev => {
            const newDetails = { ...prev };
            delete newDetails[prayerId];
            return newDetails;
        });
    };

    const handleViewPrayer = (url: string) => {
        router.push(`/prayer/${url}`);
    };

    const handleBack = () => {
        handleBackNavigation(router);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Загрузка избранных...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Заголовок */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="
                                    inline-flex items-center gap-2 px-4 py-2 
                                    text-gray-600 hover:text-gray-800 
                                    bg-gray-100 hover:bg-gray-200 
                                    rounded-lg border border-gray-200 
                                    transition-all duration-200
                                    hover:shadow-sm
                                "
                                title={backButtonTooltip}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Назад
                            </button>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                                    Избранные молитвы
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {favorites.length} {favorites.length === 1 ? 'молитва' : 'молитв'} в избранном
                                </p>
                            </div>
                        </div>

                        {favorites.length > 0 && (
                            <button
                                onClick={clearFavorites}
                                className="
                                    inline-flex items-center gap-2 px-4 py-2 
                                    text-red-600 hover:text-red-800 
                                    bg-red-50 hover:bg-red-100 
                                    rounded-lg border border-red-200 
                                    transition-all duration-200
                                    hover:shadow-sm
                                "
                                title="Очистить все избранное"
                            >
                                <Trash2 className="w-4 h-4" />
                                Очистить все
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Основной контент */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                {favorites.length === 0 ? (
                    <div className="text-center py-16">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-medium text-gray-900 mb-2">
                            Избранных молитв пока нет
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Добавляйте молитвы в избранное, нажимая на сердечко
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="
                                inline-flex items-center gap-2 px-6 py-3 
                                text-white bg-blue-600 hover:bg-blue-700 
                                rounded-lg transition-all duration-200
                                hover:shadow-md
                            "
                        >
                            Перейти к молитвам
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {favorites.map((favorite) => {
                            const prayer = prayerDetails[favorite.id];
                            const isLoading = loadingDetails.has(favorite.id);

                            return (
                                <div
                                    key={favorite.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {isLoading ? 'Загрузка...' : prayer?.title || favorite.title}
                                                </h3>
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                    {new Date(favorite.addedAt).toLocaleDateString('ru-RU')}
                                                </span>
                                            </div>

                                            {prayer && (
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {prayer.content.substring(0, 200)}...
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 ml-4">
                                            {prayer && (
                                                <button
                                                    onClick={() => handleViewPrayer(favorite.url)}
                                                    className="
                                                        inline-flex items-center gap-2 px-3 py-2 
                                                        text-blue-600 hover:text-blue-800 
                                                        bg-blue-50 hover:bg-blue-100 
                                                        rounded-lg border border-blue-200 
                                                        transition-all duration-200
                                                        hover:shadow-sm text-sm
                                                    "
                                                    title="Открыть молитву"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Открыть
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleRemoveFavorite(favorite.id)}
                                                className="
                                                    w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 
                                                    flex items-center justify-center transition-all duration-200
                                                    hover:scale-105 hover:shadow-sm
                                                "
                                                title="Удалить из избранного"
                                            >
                                                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
