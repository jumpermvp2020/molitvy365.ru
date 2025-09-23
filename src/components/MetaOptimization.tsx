import React from 'react';
import Head from 'next/head';

interface MetaOptimizationProps {
    pageType: 'pillar' | 'read' | 'text-full' | 'russian' | 'situational' | 'saint';
    data: {
        title: string;
        description: string;
        h1: string;
        canonicalUrl: string;
        keywords?: string[];
        category?: string;
        image?: string;
        noindex?: boolean;
    };
}

export const MetaOptimization: React.FC<MetaOptimizationProps> = ({
    pageType,
    data
}) => {
    const {
        title,
        description,
        h1,
        canonicalUrl,
        keywords = [],
        category,
        image,
        noindex = false
    } = data;

    // Генерируем дополнительные мета-теги в зависимости от типа страницы
    const getAdditionalMeta = () => {
        const additional = [];

        // Open Graph теги
        additional.push(
            <meta key="og:title" property="og:title" content={title} />,
            <meta key="og:description" property="og:description" content={description} />,
            <meta key="og:url" property="og:url" content={canonicalUrl} />,
            <meta key="og:type" property="og:type" content="article" />,
            <meta key="og:site_name" property="og:site_name" content="Православный молитвослов" />
        );

        if (image) {
            additional.push(
                <meta key="og:image" property="og:image" content={image} />,
                <meta key="og:image:width" property="og:image:width" content="1200" />,
                <meta key="og:image:height" property="og:image:height" content="630" />
            );
        }

        // Twitter Card теги
        additional.push(
            <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
            <meta key="twitter:title" name="twitter:title" content={title} />,
            <meta key="twitter:description" name="twitter:description" content={description} />
        );

        if (image) {
            additional.push(
                <meta key="twitter:image" name="twitter:image" content={image} />
            );
        }

        // Дополнительные мета-теги для SEO
        if (keywords.length > 0) {
            additional.push(
                <meta key="keywords" name="keywords" content={keywords.join(', ')} />
            );
        }

        if (category) {
            additional.push(
                <meta key="article:section" property="article:section" content={category} />
            );
        }

        // Мета-теги для мобильных устройств
        additional.push(
            <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />,
            <meta key="theme-color" name="theme-color" content="#8B4513" />
        );

        // Мета-теги для поисковых систем
        if (noindex) {
            additional.push(
                <meta key="robots" name="robots" content="noindex, nofollow" />
            );
        } else {
            additional.push(
                <meta key="robots" name="robots" content="index, follow" />,
                <meta key="googlebot" name="googlebot" content="index, follow" />
            );
        }

        // Мета-теги для социальных сетей
        additional.push(
            <meta key="author" name="author" content="Православный молитвослов" />,
            <meta key="publisher" name="publisher" content="Православный молитвослов" />
        );

        return additional;
    };

    // Генерируем JSON-LD для дополнительной информации
    const getAdditionalStructuredData = () => {
        const baseData = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "isPartOf": {
                "@type": "WebSite",
                "name": "Православный молитвослов",
                "url": "https://molitvoslov.ru"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Православный молитвослов",
                "url": "https://molitvoslov.ru"
            }
        };

        // Добавляем специфичные данные в зависимости от типа страницы
        switch (pageType) {
            case 'pillar':
                return {
                    ...baseData,
                    "@type": "CollectionPage",
                    "mainEntity": {
                        "@type": "ItemList",
                        "name": h1,
                        "description": description
                    }
                };

            case 'read':
            case 'text-full':
            case 'russian':
                return {
                    ...baseData,
                    "@type": "Article",
                    "headline": h1,
                    "articleSection": category,
                    "keywords": keywords.join(', ')
                };

            case 'situational':
                return {
                    ...baseData,
                    "@type": "HowTo",
                    "name": h1,
                    "description": description
                };

            case 'saint':
                return {
                    ...baseData,
                    "@type": "Person",
                    "name": h1,
                    "description": description,
                    "jobTitle": "Святой"
                };

            default:
                return baseData;
        }
    };

    return (
        <Head>
            {/* Основные мета-теги */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* H1 для страницы */}
            <meta name="h1" content={h1} />

            {/* Дополнительные мета-теги */}
            {getAdditionalMeta()}

            {/* Дополнительные структурированные данные */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(getAdditionalStructuredData())
                }}
            />
        </Head>
    );
};

// Специализированные компоненты для разных типов страниц
export const PillarMeta: React.FC<{
    name: string;
    description: string;
    canonicalUrl: string;
    keywords: string[];
}> = (props) => (
    <MetaOptimization
        pageType="pillar"
        data={{
            title: `${props.name} — читать, слушать, текст полностью (на русском)`,
            description: props.description,
            h1: props.name,
            canonicalUrl: props.canonicalUrl,
            keywords: props.keywords
        }}
    />
);

export const ReadMeta: React.FC<{
    title: string;
    description: string;
    canonicalUrl: string;
    category: string;
    keywords: string[];
}> = (props) => (
    <MetaOptimization
        pageType="read"
        data={{
            title: `${props.title} — читать онлайн`,
            description: props.description,
            h1: props.title,
            canonicalUrl: props.canonicalUrl,
            category: props.category,
            keywords: props.keywords
        }}
    />
);

export const TextFullMeta: React.FC<{
    title: string;
    description: string;
    canonicalUrl: string;
    category: string;
    keywords: string[];
}> = (props) => (
    <MetaOptimization
        pageType="text-full"
        data={{
            title: `${props.title} — текст полностью`,
            description: props.description,
            h1: props.title,
            canonicalUrl: props.canonicalUrl,
            category: props.category,
            keywords: props.keywords
        }}
    />
);

export const RussianMeta: React.FC<{
    title: string;
    description: string;
    canonicalUrl: string;
    category: string;
    keywords: string[];
}> = (props) => (
    <MetaOptimization
        pageType="russian"
        data={{
            title: `${props.title} — на русском языке`,
            description: props.description,
            h1: props.title,
            canonicalUrl: props.canonicalUrl,
            category: props.category,
            keywords: props.keywords
        }}
    />
);

export const SituationalMeta: React.FC<{
    title: string;
    description: string;
    canonicalUrl: string;
    keywords: string[];
}> = (props) => (
    <MetaOptimization
        pageType="situational"
        data={{
            title: `${props.title} — молитвы для этой ситуации`,
            description: props.description,
            h1: props.title,
            canonicalUrl: props.canonicalUrl,
            keywords: props.keywords
        }}
    />
);

export const SaintMeta: React.FC<{
    name: string;
    description: string;
    canonicalUrl: string;
    keywords: string[];
}> = (props) => (
    <MetaOptimization
        pageType="saint"
        data={{
            title: `Молитвы к ${props.name}`,
            description: props.description,
            h1: `Молитвы к ${props.name}`,
            canonicalUrl: props.canonicalUrl,
            keywords: props.keywords
        }}
    />
);
