export interface Prayer {
    id: number;
    title: string;
    content: string;
    contentModern?: string; // Современный русский перевод
    originalUrl: string;
    randomUrl: string;
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
    randomUrl: string;
    filename: string;
}

export interface PrayerIndex {
    totalCount: number;
    lastUpdated: string;
    prayers: {
        id: number;
        title: string;
        url: string;
    }[];
}
