import fs from 'fs';
import path from 'path';

export interface PrayerTextData {
    id: number;
    category: string;
    title: string;
    slug: string;
    original_text: string;
    modern_ru: string;
    notes: string;
    order_hint: number;
}

export function getPrayerTextData(slug: string): PrayerTextData | null {
    try {
        const prayerPath = path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', 'json', `${slug}.json`);

        if (!fs.existsSync(prayerPath)) {
            return null;
        }

        const prayerContents = fs.readFileSync(prayerPath, 'utf8');
        return JSON.parse(prayerContents);
    } catch (error) {
        console.error('Error loading prayer text data:', error);
        return null;
    }
}

export function getAllPrayerTextData(): PrayerTextData[] {
    try {
        const jsonDir = path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', 'json');

        if (!fs.existsSync(jsonDir)) {
            return [];
        }

        const files = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));
        const prayers: PrayerTextData[] = [];

        for (const file of files) {
            try {
                const filePath = path.join(jsonDir, file);
                const contents = fs.readFileSync(filePath, 'utf8');
                const prayer = JSON.parse(contents);
                prayers.push(prayer);
            } catch (error) {
                console.error(`Error loading prayer file ${file}:`, error);
            }
        }

        return prayers.sort((a, b) => a.order_hint - b.order_hint);
    } catch (error) {
        console.error('Error loading all prayer text data:', error);
        return [];
    }
}
