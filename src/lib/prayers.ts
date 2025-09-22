import { Prayer, PrayerIndex } from '@/types/prayer';
import fs from 'fs';
import path from 'path';

// Загружаем данные молитв
export function loadPrayerIndex(): PrayerIndex {
    const filePath = path.join(process.cwd(), 'data', 'prayers-index.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export function loadPrayer(randomUrl: string): Prayer | null {
    try {
        const filePath = path.join(process.cwd(), 'data', 'prayers', `${randomUrl}.json`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        return null;
    }
}

export function getAllPrayers(): Prayer[] {
    const prayersDir = path.join(process.cwd(), 'data', 'prayers');
    const files = fs.readdirSync(prayersDir);

    return files
        .filter(file => file.endsWith('.json'))
        .map(file => {
            const filePath = path.join(prayersDir, file);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileContents);
        });
}

// Функция для получения молитвы дня
export function getPrayerOfTheDay(): Prayer {
    const prayers = getAllPrayers();
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

    // Используем день года как seed для получения стабильной молитвы дня
    const prayerIndex = dayOfYear % prayers.length;
    return prayers[prayerIndex];
}

// Функция для получения случайной молитвы
export function getRandomPrayer(): Prayer {
    const prayers = getAllPrayers();
    const randomIndex = Math.floor(Math.random() * prayers.length);
    return prayers[randomIndex];
}
