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
export function transliterate(text: string): string {
    return text
        .split('')
        .map(char => transliterationMap[char] || char)
        .join('');
}

/**
 * Создает читаемый URL из названия молитвы
 */
export function createReadableUrl(title: string): string {
    return transliterate(title)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Удаляем все кроме букв, цифр, пробелов и дефисов
        .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
        .replace(/-+/g, '-') // Убираем множественные дефисы
        .replace(/^-|-$/g, ''); // Убираем дефисы в начале и конце
}

/**
 * Создает короткий URL для длинных названий
 */
export function createShortUrl(title: string, maxLength: number = 50): string {
    const url = createReadableUrl(title);

    if (url.length <= maxLength) {
        return url;
    }

    // Обрезаем до последнего дефиса перед maxLength
    const truncated = url.substring(0, maxLength);
    const lastDashIndex = truncated.lastIndexOf('-');

    if (lastDashIndex > 0) {
        return truncated.substring(0, lastDashIndex);
    }

    return truncated;
}

/**
 * Проверяет уникальность URL в списке существующих
 */
export function ensureUniqueUrl(url: string, existingUrls: string[]): string {
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
