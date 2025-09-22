import fs from 'fs';
import path from 'path';

interface PrayerCategory {
    name: string;
    description: string;
    h1: string;
    seoDescription: string;
    detailedDescription: {
        title: string;
        sections: Array<{
            title: string;
            items: string[];
        }>;
    };
}

interface PrayerCategories {
    categories: Record<string, PrayerCategory>;
    prayerMappings: Record<string, string>;
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

class PrayerCategoryValidator {
    private categories: PrayerCategories;
    private prayers: Prayer[] = [];

    constructor() {
        // Загружаем категории
        const categoriesPath = path.join(process.cwd(), 'data', 'prayer-categories.json');
        this.categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

        // Загружаем все молитвы
        this.loadPrayers();
    }

    private loadPrayers() {
        const prayersDir = path.join(process.cwd(), 'data', 'prayers');
        const files = fs.readdirSync(prayersDir);

        for (const file of files) {
            if (file.endsWith('.json')) {
                const filePath = path.join(prayersDir, file);
                const prayer: Prayer = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                this.prayers.push(prayer);
            }
        }
    }

    /**
     * Проверяет, что все молитвы имеют назначенную категорию
     */
    validateAllPrayersHaveCategories(): { valid: boolean; missing: number[] } {
        const missing: number[] = [];

        for (const prayer of this.prayers) {
            if (!this.categories.prayerMappings[prayer.id.toString()]) {
                missing.push(prayer.id);
            }
        }

        return {
            valid: missing.length === 0,
            missing
        };
    }

    /**
     * Проверяет, что все назначенные категории существуют
     */
    validateAllCategoriesExist(): { valid: boolean; invalid: string[] } {
        const invalid: string[] = [];

        for (const [prayerId, categoryKey] of Object.entries(this.categories.prayerMappings)) {
            if (!this.categories.categories[categoryKey]) {
                invalid.push(`Prayer ${prayerId} -> Category ${categoryKey}`);
            }
        }

        return {
            valid: invalid.length === 0,
            invalid
        };
    }

    /**
     * Получает категорию для молитвы
     */
    getPrayerCategory(prayerId: number): PrayerCategory | null {
        const categoryKey = this.categories.prayerMappings[prayerId.toString()];
        if (!categoryKey) {
            return null;
        }

        return this.categories.categories[categoryKey] || null;
    }

    /**
     * Получает все молитвы определенной категории
     */
    getPrayersByCategory(categoryKey: string): Prayer[] {
        return this.prayers.filter(prayer =>
            this.categories.prayerMappings[prayer.id.toString()] === categoryKey
        );
    }

    /**
     * Получает статистику по категориям
     */
    getCategoryStats(): Record<string, number> {
        const stats: Record<string, number> = {};

        for (const [prayerId, categoryKey] of Object.entries(this.categories.prayerMappings)) {
            stats[categoryKey] = (stats[categoryKey] || 0) + 1;
        }

        return stats;
    }

    /**
     * Проверяет соответствие названия молитвы её категории
     */
    validatePrayerTitleMatchesCategory(prayerId: number): { valid: boolean; suggestion?: string } {
        const prayer = this.prayers.find(p => p.id === prayerId);
        const category = this.getPrayerCategory(prayerId);

        if (!prayer || !category) {
            return { valid: false };
        }

        const title = prayer.title.toLowerCase();
        const categoryName = category.name.toLowerCase();

        // Простая проверка на соответствие ключевых слов
        const keywords = {
            'universal': ['молитва', 'господня', 'иисусова'],
            'daily': ['утренние', 'вечерние', 'сон', 'дневные'],
            'health': ['болезни', 'здоровье', 'исцеление', 'болящий'],
            'family': ['семья', 'семей', 'дети', 'супруг', 'родители'],
            'travel': ['путешествующих', 'дороге', 'водителя', 'пути'],
            'education': ['учение', 'учению', 'учения', 'экзамен', 'учебе'],
            'work': ['дело', 'дела', 'труде', 'работе', 'трудовой'],
            'marriage': ['замужество', 'супружество', 'брак', 'женитьба'],
            'saints': ['святому', 'святому', 'преподобному', 'святителю'],
            'icons': ['иконе', 'иконой', 'богородице', 'божией матери']
        };

        const categoryKeywords = keywords[category.name.toLowerCase() as keyof typeof keywords] || [];

        const hasMatchingKeyword = categoryKeywords.some(keyword =>
            title.includes(keyword)
        );

        if (!hasMatchingKeyword) {
            return {
                valid: false,
                suggestion: `Возможно, молитва "${prayer.title}" должна быть в категории "${categoryName}"`
            };
        }

        return { valid: true };
    }

    /**
     * Запускает все проверки
     */
    runAllValidations(): {
        allPrayersHaveCategories: { valid: boolean; missing: number[] };
        allCategoriesExist: { valid: boolean; invalid: string[] };
        categoryStats: Record<string, number>;
        titleMismatches: Array<{ prayerId: number; suggestion: string }>;
    } {
        const allPrayersHaveCategories = this.validateAllPrayersHaveCategories();
        const allCategoriesExist = this.validateAllCategoriesExist();
        const categoryStats = this.getCategoryStats();

        const titleMismatches: Array<{ prayerId: number; suggestion: string }> = [];

        for (const prayer of this.prayers) {
            const validation = this.validatePrayerTitleMatchesCategory(prayer.id);
            if (!validation.valid && validation.suggestion) {
                titleMismatches.push({
                    prayerId: prayer.id,
                    suggestion: validation.suggestion
                });
            }
        }

        return {
            allPrayersHaveCategories,
            allCategoriesExist,
            categoryStats,
            titleMismatches
        };
    }
}

// Экспортируем для использования в других файлах
export { PrayerCategoryValidator };
export type { PrayerCategory, PrayerCategories, Prayer };

// Если файл запускается напрямую, выполняем валидацию
if (require.main === module) {
    const validator = new PrayerCategoryValidator();
    const results = validator.runAllValidations();

    console.log('=== Результаты валидации категорий молитв ===\n');

    console.log('1. Все молитвы имеют категории:', results.allPrayersHaveCategories.valid ? '✅' : '❌');
    if (!results.allPrayersHaveCategories.valid) {
        console.log('   Отсутствуют категории для молитв:', results.allPrayersHaveCategories.missing.join(', '));
    }

    console.log('\n2. Все категории существуют:', results.allCategoriesExist.valid ? '✅' : '❌');
    if (!results.allCategoriesExist.valid) {
        console.log('   Неверные категории:', results.allCategoriesExist.invalid.join(', '));
    }

    console.log('\n3. Статистика по категориям:');
    for (const [category, count] of Object.entries(results.categoryStats)) {
        console.log(`   ${category}: ${count} молитв`);
    }

    console.log('\n4. Возможные несоответствия названий и категорий:');
    if (results.titleMismatches.length === 0) {
        console.log('   ✅ Все названия соответствуют категориям');
    } else {
        results.titleMismatches.forEach(mismatch => {
            console.log(`   ⚠️  Молитва ${mismatch.prayerId}: ${mismatch.suggestion}`);
        });
    }
}
