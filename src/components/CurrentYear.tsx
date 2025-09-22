'use client';

import { useState, useEffect } from 'react';

interface CurrentYearProps {
    fallbackYear?: number;
}

export default function CurrentYear({ fallbackYear = 2025 }: CurrentYearProps) {
    const [year, setYear] = useState(fallbackYear);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentYear = async () => {
            try {
                // Пробуем получить текущий год через WorldClockAPI
                const response = await fetch('https://worldclockapi.com/api/json/utc/now', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    // Таймаут 3 секунды
                    signal: AbortSignal.timeout(3000)
                });

                if (response.ok) {
                    const data = await response.json();
                    const currentYear = new Date(data.currentDateTime).getFullYear();
                    setYear(currentYear);
                } else {
                    // Если API недоступен, используем локальное время
                    setYear(new Date().getFullYear());
                }
            } catch (error) {
                // В случае ошибки используем локальное время браузера
                console.warn('Не удалось получить год через API, используем локальное время:', error);
                setYear(new Date().getFullYear());
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentYear();
    }, []);

    if (isLoading) {
        return <span>{fallbackYear}</span>;
    }

    return <span>{year}</span>;
}
