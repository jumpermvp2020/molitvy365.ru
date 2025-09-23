import { Metadata } from 'next';
import { PillarTemplate } from '@/templates/PillarTemplate';
import { PillarMeta } from '@/components/MetaOptimization';
import { SEONavigation } from '@/components/SEONavigation';
import Footer from '@/components/Footer';

// Загружаем данные из сгенерированного контента
import generatedContent from '../../../seo-generated-content.json';

export const metadata: Metadata = {
    title: 'Утренние молитвы — читать, слушать, текст полностью (на русском)',
    description: 'Утренние молитвы для духовного роста. Читайте утренние молитвы онлайн, слушайте аудио версии, изучайте полный текст на русском языке. Молитвы для начала дня.',
    keywords: [
        'утренние молитвы',
        'молитвы утренние',
        'утренняя молитва',
        'утренние молитвы читать',
        'утренние молитвы слушать',
        'утренние молитвы на русском',
        'утренние молитвы текст',
        'молитвы для начала дня',
        'утреннее правило',
        'православные молитвы'
    ],
    openGraph: {
        title: 'Утренние молитвы — читать, слушать, текст полностью',
        description: 'Утренние молитвы для духовного роста. Читайте утренние молитвы онлайн, слушайте аудио версии, изучайте полный текст на русском языке.',
        url: 'https://molitvy365.ru/molitvy/utrennie/',
        type: 'website',
    },
    alternates: {
        canonical: '/molitvy/utrennie/',
    },
};

export default function UtrennieMolitvyPage() {
    // Получаем данные для утренних молитв
    const categoryData = generatedContent.categories.daily;

    if (!categoryData) {
        return <div>Страница не найдена</div>;
    }

    const pageData = {
        name: categoryData.name,
        description: categoryData.description,
        canonicalUrl: '/molitvy/utrennie/',
        h1Variations: categoryData.h1Variations,
        seoDescription: categoryData.seoDescription,
        detailedDescription: categoryData.detailedDescription,
        faq: categoryData.faq,
        relatedPrayers: categoryData.relatedPrayers,
        keywords: categoryData.keywords
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Мета-теги */}
            <PillarMeta {...pageData} />

            {/* Основной контент */}
            <main>
                <PillarTemplate {...pageData} />
            </main>

            {/* Навигация по другим молитвам */}
            <SEONavigation />

            {/* Футер */}
            <Footer />
        </div>
    );
}
