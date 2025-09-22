import fs from 'fs';
import path from 'path';

interface Prayer {
    id: number;
    title: string;
    content: string;
    originalUrl: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Удаляет поле randomUrl из файлов молитв
 */
function removeRandomUrlFromFiles() {
    const prayersDir = path.join(process.cwd(), 'data', 'prayers');
    const files = fs.readdirSync(prayersDir);

    let updatedCount = 0;

    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(prayersDir, file);
            const prayer: any = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            if (prayer.randomUrl !== undefined) {
                const { randomUrl, ...updatedPrayer } = prayer;
                updatedPrayer.updatedAt = new Date().toISOString();

                fs.writeFileSync(filePath, JSON.stringify(updatedPrayer, null, 2));
                console.log(`Удален randomUrl из файла: ${file}`);
                updatedCount++;
            }
        }
    });

    console.log(`\nОбновлено ${updatedCount} файлов`);
}

console.log('Начинаем удаление поля randomUrl...\n');

removeRandomUrlFromFiles();

console.log('\n✅ Удаление завершено успешно!');
