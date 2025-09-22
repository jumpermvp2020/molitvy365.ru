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
 * Определяет платформу и браузер пользователя
 */
function detectPlatform(): { platform: string; browser: string; isMobile: boolean } {
    const userAgent = navigator.userAgent.toLowerCase();

    // Определяем платформу
    let platform = 'desktop';
    let isMobile = false;

    if (userAgent.includes('android')) {
        platform = 'android';
        isMobile = true;
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
        platform = 'ios';
        isMobile = true;
    } else if (userAgent.includes('windows')) {
        platform = 'windows';
    } else if (userAgent.includes('macintosh') || userAgent.includes('mac os x')) {
        platform = 'macos';
    } else if (userAgent.includes('linux')) {
        platform = 'linux';
    }

    // Определяем браузер
    let browser = 'unknown';
    if (userAgent.includes('crios')) {
        browser = 'chrome'; // iOS Chrome
    } else if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
        browser = 'chrome';
    } else if (userAgent.includes('firefox')) {
        browser = 'firefox';
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        browser = 'safari';
    } else if (userAgent.includes('edg')) {
        browser = 'edge';
    } else if (userAgent.includes('opera') || userAgent.includes('opr')) {
        browser = 'opera';
    }

    return { platform, browser, isMobile };
}

/**
 * Показывает инструкцию пользователю о том, как добавить страницу в закладки
 */
export function showBookmarkInstructions(): string {
    const { platform, browser, isMobile } = detectPlatform();

    // Мобильные устройства
    if (isMobile) {
        if (platform === 'ios') {
            if (browser === 'safari') {
                return 'Нажмите кнопку "Поделиться" (квадрат со стрелкой) и выберите "Добавить на главный экран"';
            } else {
                return 'Нажмите кнопку "Поделиться" и выберите "Добавить в закладки"';
            }
        } else if (platform === 'android') {
            if (browser === 'chrome') {
                return 'Нажмите меню (три точки) и выберите "Добавить в закладки" или "Добавить на главный экран"';
            } else {
                return 'Нажмите меню браузера и выберите "Добавить в закладки"';
            }
        }
    }

    // Десктопные браузеры
    if (platform === 'macos') {
        switch (browser) {
            case 'safari':
                return 'Нажмите Cmd+D для добавления в закладки';
            case 'chrome':
            case 'firefox':
            case 'edge':
            case 'opera':
                return 'Нажмите Cmd+D для добавления в закладки';
            default:
                return 'Нажмите Cmd+D для добавления в закладки';
        }
    } else {
        // Windows, Linux и другие
        switch (browser) {
            case 'chrome':
            case 'firefox':
            case 'edge':
            case 'opera':
                return 'Нажмите Ctrl+D для добавления в закладки';
            case 'safari':
                return 'Нажмите Ctrl+D для добавления в закладки';
            default:
                return 'Нажмите Ctrl+D для добавления в закладки';
        }
    }
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
