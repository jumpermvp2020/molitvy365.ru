export interface Prayer {
    id: number;
    title: string;
    content: string;
    contentModern?: string; // Современный русский перевод
    originalUrl: string;
    url: string; // Изменили с randomUrl на url
    createdAt: string;
    updatedAt: string;
    summary?: {
        text: string;
        tags: string[];
    };
}

export interface PrayerMetadata {
    id: number;
    title: string;
    url: string; // Изменили с randomUrl на url
    filename: string;
}

export interface PrayerIndex {
    totalPrayers: number;
    lastUpdated: string;
    prayers: {
        id: number;
        title: string;
        url: string;
        category: string;
        tags: string[];
    }[];
}
