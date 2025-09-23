import React from 'react';

interface StructuredDataProps {
    type: 'FAQPage' | 'Article' | 'BreadcrumbList';
    data: Record<string, unknown>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
    const getStructuredData = () => {
        switch (type) {
            case 'FAQPage':
                return {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": (data.faq as Array<{ question: string; answer: string }>)?.map((item) => ({
                        "@type": "Question",
                        "name": item.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.answer
                        }
                    })) || []
                };

            case 'Article':
                return {
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": data.title,
                    "description": data.description,
                    "author": {
                        "@type": "Organization",
                        "name": "Православный молитвослов"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Православный молитвослов",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "/logo.png"
                        }
                    },
                    "datePublished": data.datePublished || new Date().toISOString(),
                    "dateModified": data.dateModified || new Date().toISOString(),
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": data.url
                    },
                    "image": data.image ? {
                        "@type": "ImageObject",
                        "url": data.image
                    } : undefined,
                    "keywords": (data.keywords as string[])?.join(', '),
                    "articleSection": data.category,
                    "wordCount": data.wordCount,
                    "timeRequired": data.timeRequired
                };

            case 'BreadcrumbList':
                return {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": (data.breadcrumbs as Array<{ name: string; url: string }>)?.map((item, index: number) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": item.name,
                        "item": item.url
                    })) || []
                };

            default:
                return {};
        }
    };

    const structuredData = getStructuredData();

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

// Специализированные компоненты для разных типов страниц
export const FAQStructuredData: React.FC<{ faq: Array<{ question: string; answer: string }> }> = ({ faq }) => (
    <StructuredData
        type="FAQPage"
        data={{ faq }}
    />
);

export const ArticleStructuredData: React.FC<{
    title: string;
    description: string;
    url: string;
    category?: string;
    keywords?: string[];
    image?: string;
    wordCount?: number;
    timeRequired?: string;
}> = (props) => (
    <StructuredData
        type="Article"
        data={props}
    />
);

export const BreadcrumbStructuredData: React.FC<{
    breadcrumbs: Array<{ name: string; url: string }>;
}> = ({ breadcrumbs }) => (
    <StructuredData
        type="BreadcrumbList"
        data={{ breadcrumbs }}
    />
);

// Компонент для генерации всех структурированных данных страницы
export const PageStructuredData: React.FC<{
    pageType: 'pillar' | 'read' | 'text-full' | 'russian' | 'situational' | 'saint';
    data: Record<string, unknown>;
}> = ({ pageType, data }) => {
    const breadcrumbs = [
        { name: "Главная", url: "/" },
        { name: "Молитвы", url: "/molitvy/" }
    ];

    // Добавляем специфичные breadcrumbs в зависимости от типа страницы
    switch (pageType) {
        case 'pillar':
            breadcrumbs.push({ name: data.name as string, url: data.canonicalUrl as string });
            break;
        case 'read':
        case 'text-full':
        case 'russian':
            breadcrumbs.push(
                { name: data.category as string, url: data.parentUrl as string },
                { name: getPageTypeName(pageType), url: data.canonicalUrl as string }
            );
            break;
        case 'situational':
            breadcrumbs.push({ name: data.title as string, url: data.canonicalUrl as string });
            break;
        case 'saint':
            breadcrumbs.push(
                { name: "Святые", url: "/svyatye/" },
                { name: data.name as string, url: data.canonicalUrl as string }
            );
            break;
    }

    return (
        <>
            <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />

            {pageType === 'pillar' && data.faq && (
                <FAQStructuredData faq={data.faq as Array<{ question: string; answer: string }>} />
            )}

            {(pageType === 'read' || pageType === 'text-full' || pageType === 'russian') && (
                <ArticleStructuredData
                    title={data.title as string}
                    description={data.description as string}
                    url={data.canonicalUrl as string}
                    category={data.category as string}
                    keywords={data.keywords as string[]}
                    wordCount={(data.content as string)?.length}
                    timeRequired={`PT${Math.ceil(((data.content as string)?.split(/\s+/).length || 0) / 200)}M`}
                />
            )}

            {pageType === 'situational' && data.faq && (
                <FAQStructuredData faq={data.faq as Array<{ question: string; answer: string }>} />
            )}

            {pageType === 'saint' && (
                <ArticleStructuredData
                    title={data.title as string}
                    description={data.description as string}
                    url={data.canonicalUrl as string}
                    category="Святые"
                    keywords={[data.name as string, "молитвы", "святой", "помощь"]}
                />
            )}
        </>
    );
};

function getPageTypeName(pageType: string): string {
    const names = {
        'read': 'Читать',
        'text-full': 'Текст полностью',
        'russian': 'На русском'
    };
    return names[pageType as keyof typeof names] || '';
}
