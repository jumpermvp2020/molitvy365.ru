import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PrayerPageBlock from '@/components/PrayerPageBlock';
import ProjectsBlock from '@/components/ProjectsBlock';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Prayer, PrayerIndex } from '@/types/prayer';
import { getDeterministicH1 } from '@/utils/h1-generator';
import { generatePrayerStructuredData, generateBreadcrumbStructuredData } from '@/lib/structured-data';
import fs from 'fs';
import path from 'path';

// Генерируем статические параметры для всех молитв
export async function generateStaticParams() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'prayers-index.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const prayerIndex: PrayerIndex = JSON.parse(fileContents);

        return prayerIndex.prayers.map((prayer) => ({
            slug: prayer.url,
        }));
    } catch (err) {
        console.error('Error generating static params:', err);
        return [];
    }
}

// Отключаем динамические параметры для статического экспорта
export const dynamicParams = false;
export const dynamic = 'force-static';

// Генерируем метаданные для SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const prayer = await getPrayer(slug);

    if (!prayer) {
        return {
            title: 'Молитва не найдена - Молитвы дня',
            description: 'Запрашиваемая молитва не найдена на сайте Молитвы дня.',
        };
    }

    const description = prayer.summary?.text || prayer.content.substring(0, 160) + '...';
    const keywords = prayer.summary?.tags?.join(', ') || 'молитва, православие, духовность, молитвенник';

    return {
        title: `${prayer.title} - Православная молитва | Молитвы дня`,
        description: description,
        keywords: keywords,
        authors: [{ name: 'Молитвы дня' }],
        creator: 'Молитвы дня',
        publisher: 'Молитвы дня',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        metadataBase: new URL('https://molitvy365.ru'),
        alternates: {
            canonical: `/prayer/${prayer.url}`,
        },
        openGraph: {
            type: 'article',
            locale: 'ru_RU',
            url: `/prayer/${prayer.url}`,
            title: `${prayer.title} - Православная молитва`,
            description: description,
            siteName: 'Молитвы дня',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: `${prayer.title} - Православная молитва`,
                },
            ],
            publishedTime: prayer.createdAt,
            modifiedTime: prayer.updatedAt,
            section: 'Православные молитвы',
            tags: prayer.summary?.tags || ['молитва', 'православие'],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${prayer.title} - Православная молитва`,
            description: description,
            images: ['/og-image.jpg'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        other: {
            'yandex-verification': 'your-yandex-verification-code', // Замените на ваш код
            'google-site-verification': 'your-google-verification-code', // Замените на ваш код
        },
    };
}

// Получаем молитву по URL
async function getPrayer(slug: string): Promise<Prayer | null> {
    try {
        // Сначала попробуем найти файл по новому URL
        const filePath = path.join(process.cwd(), 'data', 'prayers', `${slug}.json`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const prayer = JSON.parse(fileContents);

        // Проверяем, что url совпадает с запрошенным slug
        if (prayer.url === slug) {
            return prayer;
        }

        return null;
    } catch (error) {
        // Если не нашли по url, попробуем найти по имени файла
        try {
            const files = fs.readdirSync(path.join(process.cwd(), 'data', 'prayers'));
            for (const file of files) {
                if (file.endsWith('.json')) {
                    const filePath = path.join(process.cwd(), 'data', 'prayers', file);
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const prayer = JSON.parse(fileContents);

                    if (prayer.url === slug) {
                        return prayer;
                    }
                }
            }
        } catch (searchError) {
            console.error('Error searching for prayer:', searchError);
        }

        return null;
    }
}

// Получаем индекс молитв
async function getPrayerIndex(): Promise<PrayerIndex> {
    const filePath = path.join(process.cwd(), 'data', 'prayers-index.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function PrayerPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const prayer = await getPrayer(slug);
    const prayerIndex = await getPrayerIndex();

    if (!prayer) {
        notFound();
    }

    // Генерируем детерминированный заголовок H1 на этапе статической генерации
    const h1Title = getDeterministicH1(prayer.id);

    // Структурированные данные
    const structuredData = generatePrayerStructuredData(prayer);

    // Breadcrumbs
    const breadcrumbs = [
        { name: 'Молитвы', url: '/' },
        { name: prayer.title, url: `/prayer/${prayer.url}` }
    ];
    const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbs);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Структурированные данные */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbStructuredData)
                }}
            />

            {/* Главный контент */}
            <main className="pt-16 pb-8">
                <div className="max-w-2xl mx-auto px-4">
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                <PrayerPageBlock prayer={prayer} h1Title={h1Title} />
            </main>

            {/* Блок с другими молитвами */}
            <ProjectsBlock prayerIndex={prayerIndex} />

            {/* Футер */}
            <Footer />
        </div>
    );
}
