import { useState, useEffect } from 'react';

export type LanguagePreference = 'church-slavonic' | 'modern-russian';

const LANGUAGE_PREFERENCE_KEY = 'prayer-language-preference';

/**
 * Хук для управления предпочтениями языка пользователя
 */
export const useLanguagePreference = () => {
    const [languagePreference, setLanguagePreference] = useState<LanguagePreference>('church-slavonic');
    const [isLoaded, setIsLoaded] = useState(false);

    // Загружаем предпочтение из localStorage при монтировании
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
                if (saved && (saved === 'church-slavonic' || saved === 'modern-russian')) {
                    setLanguagePreference(saved as LanguagePreference);
                }
            } catch (error) {
                console.warn('Не удалось загрузить предпочтения языка:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Сохраняем предпочтение в localStorage при изменении
    const updateLanguagePreference = (preference: LanguagePreference) => {
        setLanguagePreference(preference);
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(LANGUAGE_PREFERENCE_KEY, preference);
            } catch (error) {
                console.warn('Не удалось сохранить предпочтения языка:', error);
            }
        }
    };

    return {
        languagePreference,
        updateLanguagePreference,
        isLoaded
    };
};
