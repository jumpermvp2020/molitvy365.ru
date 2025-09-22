import { Prayer } from '@/types/prayer';

export function generatePrayerStructuredData(prayer: Prayer) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": prayer.title,
        "description": prayer.summary?.text || "Православная молитва для духовного чтения",
        "author": {
            "@type": "Organization",
            "name": "Молитвы дня",
            "url": "https://molitvy-dnya.ru"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Молитвы дня",
            "url": "https://molitvy-dnya.ru",
            "logo": {
                "@type": "ImageObject",
                "url": "https://molitvy-dnya.ru/icon-192.png"
            }
        },
        "datePublished": prayer.createdAt,
        "dateModified": prayer.updatedAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://molitvy-dnya.ru/prayer/${prayer.randomUrl}`
        },
        "url": `https://molitvy-dnya.ru/prayer/${prayer.randomUrl}`,
        "articleBody": prayer.content,
        "keywords": prayer.summary?.tags || ["молитва", "православие", "духовность"],
        "articleSection": "Православные молитвы",
        "inLanguage": "ru",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Молитвы дня",
            "url": "https://molitvy-dnya.ru"
        },
        "about": {
            "@type": "Thing",
            "name": "Православные молитвы",
            "description": "Коллекция православных молитв для духовного чтения"
        }
    };

    return structuredData;
}

export function generateWebsiteStructuredData() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Молитвы дня",
        "description": "Коллекция православных молитв для ежедневного духовного чтения",
        "url": "https://molitvy-dnya.ru",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://molitvy-dnya.ru/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Молитвы дня",
            "url": "https://molitvy-dnya.ru",
            "logo": {
                "@type": "ImageObject",
                "url": "https://molitvy-dnya.ru/icon-192.png"
            }
        },
        "inLanguage": "ru"
    };
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string, url: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}
