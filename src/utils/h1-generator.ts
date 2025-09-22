import { prayerCategories } from '@/data/prayer-categories';

/**
 * Детерминированно выбирает заголовок H1 для молитвы на основе её ID
 * Это гарантирует, что одна и та же молитва всегда будет иметь один и тот же заголовок
 * @param prayerId - ID молитвы
 * @returns выбранный заголовок H1 или пустую строку
 */
export function getDeterministicH1(prayerId: number): string {
    // Получаем категорию молитвы
    const categoryKey = prayerCategories.prayerMappings[prayerId.toString()];
    if (!categoryKey) return '';

    const category = prayerCategories.categories[categoryKey];
    if (!category || !category.h1Variations) return '';

    // Используем ID молитвы как seed для детерминированного выбора
    // Это гарантирует, что одна и та же молитва всегда получит один и тот же заголовок
    const index = prayerId % category.h1Variations.length;
    return category.h1Variations[index];
}

/**
 * Получает категорию молитвы по её ID
 * @param prayerId - ID молитвы
 * @returns объект категории или null
 */
export function getPrayerCategory(prayerId: number) {
    const categoryKey = prayerCategories.prayerMappings[prayerId.toString()];
    if (!categoryKey) return null;
    return prayerCategories.categories[categoryKey] || null;
}
