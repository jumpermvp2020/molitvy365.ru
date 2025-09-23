import React from 'react';

interface StructuredDataProps {
    type: 'FAQPage' | 'Article' | 'BreadcrumbList';
    data: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
    const getStructuredData = () => {
        switch (type) {
            case 'FAQPage':
                return {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": data.faq?.map((item: any) => ({
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
                    "keywords": data.keywords?.join(', '),
                    "articleSection": data.category,
                    "wordCount": data.wordCount,
                    "timeRequired": data.timeRequired
                };

            case 'BreadcrumbList':
                return {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": data.breadcrumbs?.map((item: any, index: number) => ({
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
    data: any;
}> = ({ pageType, data }) => {
    const breadcrumbs = [
        { name: "Главная", url: "/" },
        { name: "Молитвы", url: "/molitvy/" }
    ];

    // Добавляем специфичные breadcrumbs в зависимости от типа страницы
    switch (pageType) {
        case 'pillar':
            breadcrumbs.push({ name: data.name, url: data.canonicalUrl });
            break;
        case 'read':
        case 'text-full':
        case 'russian':
            breadcrumbs.push(
                { name: data.category, url: data.parentUrl },
                { name: getPageTypeName(pageType), url: data.canonicalUrl }
            );
            break;
        case 'situational':
            breadcrumbs.push({ name: data.title, url: data.canonicalUrl });
            break;
        case 'saint':
            breadcrumbs.push(
                { name: "Святые", url: "/svyatye/" },
                { name: data.name, url: data.canonicalUrl }
            );
            break;
    }

    return (
        <>
            <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />

            {pageType === 'pillar' && data.faq && (
                <FAQStructuredData faq={data.faq} />
            )}

            {(pageType === 'read' || pageType === 'text-full' || pageType === 'russian') && (
                <ArticleStructuredData
                    title={data.title}
                    description={data.description}
                    url={data.canonicalUrl}
                    category={data.category}
                    keywords={data.keywords}
                    wordCount={data.content?.length}
                    timeRequired={`PT${Math.ceil((data.content?.split(/\s+/).length || 0) / 200)}M`}
                />
            )}

            {pageType === 'situational' && data.faq && (
                <FAQStructuredData faq={data.faq} />
            )}

            {pageType === 'saint' && (
                <ArticleStructuredData
                    title={data.title}
                    description={data.description}
                    url={data.canonicalUrl}
                    category="Святые"
                    keywords={[data.name, "молитвы", "святой", "помощь"]}
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
