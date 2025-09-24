import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Обрабатывает навигацию "Назад" с fallback на главную страницу
 * @param router - Next.js router instance
 * @param fallbackPath - Путь для fallback (по умолчанию '/')
 */
export const handleBackNavigation = (
    router: AppRouterInstance,
    fallbackPath: string = '/'
) => {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') {
        router.push(fallbackPath);
        return;
    }

    // Проверяем, есть ли история для возврата
    // Если пользователь пришел по прямой ссылке, всегда идем на главную
    const hasReferrer = document.referrer &&
        document.referrer !== window.location.href &&
        document.referrer.includes(window.location.origin);

    if (hasReferrer && window.history.length > 1) {
        // Если есть история и пользователь пришел с нашего сайта, используем router.back()
        router.back();
    } else {
        // Если нет истории или пользователь пришел по прямой ссылке, 
        // переходим на fallback страницу (главную)
        router.push(fallbackPath);
    }
};

/**
 * Получает текст для tooltip кнопки "Назад"
 * @returns Строка с текстом tooltip
 */
export const getBackButtonTooltip = (): string => {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') {
        return "На главную страницу";
    }

    const hasReferrer = document.referrer &&
        document.referrer !== window.location.href &&
        document.referrer.includes(window.location.origin);

    return hasReferrer ? "Вернуться назад" : "На главную страницу";
};
