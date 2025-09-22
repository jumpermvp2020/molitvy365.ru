export interface PrayerCategorySection {
    title: string;
    items: string[];
}

export interface PrayerCategory {
    name: string;
    description: string;
    h1Variations: string[];
    seoDescription: string;
    detailedDescription: {
        title: string;
        sections: PrayerCategorySection[];
    };
}

export interface PrayerCategories {
    categories: Record<string, PrayerCategory>;
    prayerMappings: Record<string, string>;
}
