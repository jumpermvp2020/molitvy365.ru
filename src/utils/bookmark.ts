/**
 * Утилиты для работы с закладками браузера
 */

export interface BookmarkData {
    title: string;
    url: string;
    description?: string;
}

/**
 * Генерирует удобное название для закладки молитвы
 */
export function generateBookmarkTitle(prayerTitle: string): string {
    // Очищаем название от лишних символов и ограничиваем длину
    const cleanTitle = prayerTitle
        .replace(/[^\w\s\-а-яё]/gi, '') // Убираем специальные символы
        .replace(/\s+/g, ' ') // Заменяем множественные пробелы на одинарные
        .trim()
        .substring(0, 50); // Ограничиваем длину

    return `Молитва: ${cleanTitle}`;
}

/**
 * Генерирует описание для закладки
 */
export function generateBookmarkDescription(content: string): string {
    // Берем первые 100 символов текста молитвы
    const description = content
        .replace(/\n/g, ' ') // Заменяем переносы строк на пробелы
        .replace(/\s+/g, ' ') // Заменяем множественные пробелы на одинарные
        .trim()
        .substring(0, 100);

    return description + (content.length > 100 ? '...' : '');
}

/**
 * Показывает инструкцию пользователю о том, как добавить страницу в закладки
 */
export function showBookmarkInstructions(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    let instructions = '';
    
    if (userAgent.includes('chrome')) {
        instructions = 'Нажмите Ctrl+D (или Cmd+D на Mac) для добавления в закладки';
    } else if (userAgent.includes('firefox')) {
        instructions = 'Нажмите Ctrl+D (или Cmd+D на Mac) для добавления в закладки';
    } else if (userAgent.includes('safari')) {
        instructions = 'Нажмите Cmd+D для добавления в закладки';
    } else if (userAgent.includes('edge')) {
        instructions = 'Нажмите Ctrl+D для добавления в закладки';
    } else {
        instructions = 'Используйте Ctrl+D (или Cmd+D на Mac) для добавления в закладки';
    }
    
    return instructions;
}

/**
 * Копирует URL в буфер обмена для ручного добавления в закладки
 */
export async function copyUrlToClipboard(url: string): Promise<string> {
    try {
        await navigator.clipboard.writeText(url);
        return 'Ссылка скопирована в буфер обмена!';
    } catch (error) {
        console.error('Ошибка копирования в буфер обмена:', error);
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            return 'Ссылка скопирована в буфер обмена!';
        } catch (fallbackError) {
            console.error('Fallback копирование не удалось:', fallbackError);
            return 'Не удалось скопировать ссылку. Попробуйте скопировать URL из адресной строки браузера.';
        } finally {
            document.body.removeChild(textArea);
        }
    }
}
