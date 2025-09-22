'use client';

import { useState, useEffect } from 'react';
import { Prayer } from '@/types/prayer';

const FAVORITES_KEY = 'prayer-favorites';

export interface FavoritePrayer {
    id: number;
    title: string;
    randomUrl: string;
    addedAt: string;
}

export function useFavorites() {
    const [favorites, setFavorites] = useState<FavoritePrayer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Загружаем избранные из localStorage при инициализации
    useEffect(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_KEY);
            if (stored) {
                const parsedFavorites = JSON.parse(stored);
                setFavorites(parsedFavorites);
            }
        } catch (error) {
            console.error('Ошибка загрузки избранных:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Сохраняем избранные в localStorage при изменении
    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
            } catch (error) {
                console.error('Ошибка сохранения избранных:', error);
            }
        }
    }, [favorites, isLoading]);

    const addToFavorites = (prayer: Prayer) => {
        const favoritePrayer: FavoritePrayer = {
            id: prayer.id,
            title: prayer.title,
            randomUrl: prayer.randomUrl,
            addedAt: new Date().toISOString(),
        };

        setFavorites(prev => {
            // Проверяем, не добавлена ли уже эта молитва
            const exists = prev.some(fav => fav.id === prayer.id);
            if (exists) {
                return prev;
            }
            return [...prev, favoritePrayer];
        });
    };

    const removeFromFavorites = (prayerId: number) => {
        setFavorites(prev => prev.filter(fav => fav.id !== prayerId));
    };

    const isFavorite = (prayerId: number): boolean => {
        return favorites.some(fav => fav.id === prayerId);
    };

    const toggleFavorite = (prayer: Prayer) => {
        if (isFavorite(prayer.id)) {
            removeFromFavorites(prayer.id);
        } else {
            addToFavorites(prayer);
        }
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    return {
        favorites,
        isLoading,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        clearFavorites,
    };
}
