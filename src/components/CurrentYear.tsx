'use client';

interface CurrentYearProps {
    fallbackYear?: number;
}

export default function CurrentYear({ fallbackYear = 2025 }: CurrentYearProps) {
    // Получаем текущий год локально
    const currentYear = new Date().getFullYear();

    // Если локальный год меньше fallback, используем fallback
    const year = currentYear < fallbackYear ? fallbackYear : currentYear;

    return <span>{year}</span>;
}
