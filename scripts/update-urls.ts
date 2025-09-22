import fs from 'fs';
import path from 'path';

// Утилита для транслитерации русских текстов в латиницу для URL
const transliterationMap: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
    'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
};

/**
 * Транслитерирует русский текст в латиницу
 */
function transliterate(text: string): string {
    return text
        .split('')
        .map(char => transliterationMap[char] || char)
        .join('');
}

/**
 * Создает читаемый URL из названия молитвы
 */
function createReadableUrl(title: string): string {
    return transliterate(title)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Удаляем все кроме букв, цифр, пробелов и дефисов
        .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
        .replace(/-+/g, '-') // Убираем множественные дефисы
        .replace(/^-|-$/g, ''); // Убираем дефисы в начале и конце
}

/**
 * Проверяет уникальность URL в списке существующих
 */
function ensureUniqueUrl(url: string, existingUrls: string[]): string {
    if (!existingUrls.includes(url)) {
        return url;
    }

    let counter = 1;
    let uniqueUrl = `${url}-${counter}`;

    while (existingUrls.includes(uniqueUrl)) {
        counter++;
        uniqueUrl = `${url}-${counter}`;
    }

    return uniqueUrl;
}

interface PrayerIndex {
    totalCount: number;
    lastUpdated: string;
    prayers: {
        id: number;
        title: string;
        url: string;
    }[];
}

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
 * Обновляет URL в prayers-index.json
 */
function updatePrayerIndexUrls() {
    const indexPath = path.join(process.cwd(), 'data', 'prayers-index.json');
    const indexData: PrayerIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

    const existingUrls: string[] = [];
    const updatedPrayers = indexData.prayers.map(prayer => {
        const newUrl = createReadableUrl(prayer.title);
        const uniqueUrl = ensureUniqueUrl(newUrl, existingUrls);
        existingUrls.push(uniqueUrl);

        console.log(`${prayer.id}: "${prayer.title}" -> "${uniqueUrl}"`);

        return {
            ...prayer,
            url: uniqueUrl
        };
    });

    const updatedIndex: PrayerIndex = {
        ...indexData,
        prayers: updatedPrayers,
        lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(indexPath, JSON.stringify(updatedIndex, null, 2));
    console.log(`\nОбновлен prayers-index.json с ${updatedPrayers.length} молитвами`);
}

/**
 * Обновляет randomUrl в файлах молитв
 */
function updatePrayerFilesUrls() {
    const prayersDir = path.join(process.cwd(), 'data', 'prayers');
    const files = fs.readdirSync(prayersDir);

    let updatedCount = 0;

    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(prayersDir, file);
            const prayer: Prayer = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            const newUrl = createReadableUrl(prayer.title);

            if (prayer.url !== newUrl) {
                const updatedPrayer: Prayer = {
                    ...prayer,
                    url: newUrl,
                    updatedAt: new Date().toISOString()
                };

                fs.writeFileSync(filePath, JSON.stringify(updatedPrayer, null, 2));
                console.log(`Обновлен файл ${file}: "${prayer.url}" -> "${newUrl}"`);
                updatedCount++;
            }
        }
    });

    console.log(`\nОбновлено ${updatedCount} файлов молитв`);
}

/**
 * Переименовывает файлы молитв согласно новым URL
 */
function renamePrayerFiles() {
    const prayersDir = path.join(process.cwd(), 'data', 'prayers');
    const files = fs.readdirSync(prayersDir);

    let renamedCount = 0;

    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(prayersDir, file);
            const prayer: Prayer = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            const newFileName = `${prayer.url}.json`;
            const newFilePath = path.join(prayersDir, newFileName);

            if (file !== newFileName) {
                fs.renameSync(filePath, newFilePath);
                console.log(`Переименован файл: ${file} -> ${newFileName}`);
                renamedCount++;
            }
        }
    });

    console.log(`\nПереименовано ${renamedCount} файлов`);
}

/**
 * Основная функция обновления
 */
function main() {
    console.log('Начинаем обновление URL молитв...\n');

    try {
        // 1. Обновляем URL в prayers-index.json
        console.log('1. Обновляем URL в prayers-index.json:');
        updatePrayerIndexUrls();

        // 2. Обновляем randomUrl в файлах молитв
        console.log('\n2. Обновляем randomUrl в файлах молитв:');
        updatePrayerFilesUrls();

        // 3. Переименовываем файлы согласно новым URL
        console.log('\n3. Переименовываем файлы молитв:');
        renamePrayerFiles();

        console.log('\n✅ Обновление завершено успешно!');

    } catch (error) {
        console.error('❌ Ошибка при обновлении:', error);
        process.exit(1);
    }
}

// Запускаем только если файл выполняется напрямую
if (require.main === module) {
    main();
}

export { updatePrayerIndexUrls, updatePrayerFilesUrls, renamePrayerFiles };
