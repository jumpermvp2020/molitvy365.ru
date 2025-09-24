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

        const params = [];

        // Добавляем оригинальные URL
        for (const prayer of prayerIndex.prayers) {
            params.push({ slug: prayer.url });

            // Добавляем альтернативные URL с префиксом "molitva-" для определенных молитв
            const needsPrefix = [
                'pered-nachalom-vsyakogo-dela',
                'pered-vkusheniem-pischi',
                'po-okonchanii-dela',
                'posle-vkusheniya-pischi'
            ];

            if (needsPrefix.includes(prayer.url)) {
                params.push({ slug: `molitva-${prayer.url}` });
            }

            // Добавляем альтернативные URL для икон Богородицы
            if (prayer.url.includes('pred-ikonoyu-')) {
                const alternativeUrl = prayer.url
                    .replace('pred-ikonoyu-', 'presvyatoy-bogoroditse-pered-ee-ikonoy-')
                    .replace(/-\d+-\w+.*$/, ''); // убираем даты из названий
                params.push({ slug: alternativeUrl });
            }
        }

        return params;
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
    const baseKeywords = prayer.summary?.tags?.join(', ') || 'молитва, православие, духовность, молитвенник';

    // Добавляем популярные ключевые слова на основе заголовка молитвы
    const titleLower = prayer.title.toLowerCase();
    const additionalKeywords = [];

    if (titleLower.includes('утренн') || titleLower.includes('утро')) {
        additionalKeywords.push('утренние молитвы', 'молитвы утренние', 'утренняя молитва', 'молитва утренняя');
    }
    if (titleLower.includes('вечерн') || titleLower.includes('вечер') || titleLower.includes('сон грядущий')) {
        additionalKeywords.push('вечерние молитвы', 'молитвы вечерние', 'вечерняя молитва', 'молитва вечерняя', 'молитвы на сон грядущий');
    }
    if (titleLower.includes('отче наш') || titleLower.includes('отче')) {
        additionalKeywords.push('отче наш молитва', 'молитва отче наш', 'отче наш молитва на русском', 'молитва господня');
    }
    if (titleLower.includes('николай') || titleLower.includes('чудотворец')) {
        additionalKeywords.push('молитва николаю чудотворцу', 'молитвы николаю чудотворцу', 'молитва николаю чудотворцу о помощи');
    }
    if (titleLower.includes('спиридон')) {
        additionalKeywords.push('молитва спиридону тримифунтскому', 'молитвы спиридону тримифунтскому', 'спиридон тримифунтский молитва');
    }
    if (titleLower.includes('оптинск') || titleLower.includes('старц')) {
        additionalKeywords.push('молитва оптинских старцев', 'молитва оптинских старцев на каждый день');
    }
    if (titleLower.includes('ангел') || titleLower.includes('хранитель')) {
        additionalKeywords.push('молитва ангелу хранителю', 'молитва архангелу михаилу', 'молитва михаилу архангелу');
    }
    if (titleLower.includes('богородиц') || titleLower.includes('пресвят')) {
        additionalKeywords.push('молитва богородице', 'молитва пресвятой богородице', 'богородица дева радуйся молитва');
    }
    if (titleLower.includes('символ веры') || titleLower.includes('верую')) {
        additionalKeywords.push('символ веры молитва', 'молитва символ веры', 'символ веры молитва текст', 'верую молитва', 'молитва верую');
    }
    if (titleLower.includes('дет') || titleLower.includes('сын') || titleLower.includes('дочь')) {
        additionalKeywords.push('молитва о детях', 'молитвы о детях', 'молитва за детей', 'молитва за сына', 'молитва о сыне', 'молитва матери о сыне');
    }
    if (titleLower.includes('здрав') || titleLower.includes('болезн')) {
        additionalKeywords.push('молитва о здравии', 'молитва пантелеймону целителю');
    }
    if (titleLower.includes('путешеств') || titleLower.includes('дорог')) {
        additionalKeywords.push('молитва о путешествующих', 'молитва водителя');
    }
    if (titleLower.includes('рожден') || titleLower.includes('день рождения')) {
        additionalKeywords.push('молитва в день рождения');
    }
    if (titleLower.includes('экзамен') || titleLower.includes('учен')) {
        additionalKeywords.push('молитва на сдачу экзамена');
    }
    if (titleLower.includes('удач') || titleLower.includes('успех')) {
        additionalKeywords.push('молитва на удачу');
    }
    if (titleLower.includes('причащ') || titleLower.includes('причастие')) {
        additionalKeywords.push('молитвы ко святому причащению', 'молитвы перед причастием', 'благодарственные молитвы по святом причащении');
    }
    if (titleLower.includes('благодарств')) {
        additionalKeywords.push('благодарственные молитвы');
    }
    if (titleLower.includes('соглашен')) {
        additionalKeywords.push('молитва по соглашению');
    }
    if (titleLower.includes('иисусов')) {
        additionalKeywords.push('иисусова молитва');
    }
    if (titleLower.includes('живые помощи') || titleLower.includes('живые помощи')) {
        additionalKeywords.push('живые помощи молитва', 'молитва живые помощи');
    }
    if (titleLower.includes('воскреснет') || titleLower.includes('воскреснет бог')) {
        additionalKeywords.push('да воскреснет бог молитва', 'молитва да воскреснет бог');
    }
    if (titleLower.includes('задержан')) {
        additionalKeywords.push('молитва задержания');
    }
    if (titleLower.includes('матрон')) {
        additionalKeywords.push('молитва матроне московской', 'молитва матроне');
    }
    if (titleLower.includes('ксени')) {
        additionalKeywords.push('молитва ксении петербургской');
    }
    if (titleLower.includes('лук')) {
        additionalKeywords.push('молитва луке крымскому');
    }
    if (titleLower.includes('георги')) {
        additionalKeywords.push('молитва георгию победоносцу');
    }
    if (titleLower.includes('серги') || titleLower.includes('радонежск')) {
        additionalKeywords.push('молитва сергию радонежскому');
    }
    if (titleLower.includes('серафим') || titleLower.includes('саровск')) {
        additionalKeywords.push('молитва серафиму саровскому');
    }
    if (titleLower.includes('ефрем') || titleLower.includes('сирин')) {
        additionalKeywords.push('молитва ефрема сирина');
    }
    if (titleLower.includes('всецариц')) {
        additionalKeywords.push('молитва всецарице');
    }
    if (titleLower.includes('казанск')) {
        additionalKeywords.push('молитва казанской божьей матери');
    }
    if (titleLower.includes('усопш') || titleLower.includes('покойн')) {
        additionalKeywords.push('молитва об усопших');
    }
    if (titleLower.includes('операц')) {
        additionalKeywords.push('молитва перед операцией');
    }

    const keywords = [baseKeywords, ...additionalKeywords].join(', ');

    return {
        title: `${prayer.title} - Православная молитва | Молитва дня`,
        description: description,
        keywords: keywords,
        authors: [{ name: 'Молитва дня' }],
        creator: 'Молитва дня',
        publisher: 'Молитва дня',
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
            siteName: 'Молитва дня',
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
            'language': 'ru',
            'geo.region': 'RU',
            'geo.placename': 'Россия',
            'distribution': 'global',
            'rating': 'general',
            'revisit-after': '1 days',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': 'Молитва дня',
            'HandheldFriendly': 'true',
            'MobileOptimized': '320',
            'content-type': 'text/html; charset=UTF-8',
            'content-language': 'ru',
            'audience': 'all',
            'target': 'all',
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
        // Если не нашли, попробуем без префикса "molitva-"
        if (slug.startsWith('molitva-')) {
            const shortSlug = slug.replace('molitva-', '');
            try {
                const filePath = path.join(process.cwd(), 'data', 'prayers', `${shortSlug}.json`);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const prayer = JSON.parse(fileContents);

                // Проверяем, что url совпадает с коротким slug
                if (prayer.url === shortSlug) {
                    return prayer;
                }
            } catch (shortError) {
                // Продолжаем поиск
            }
        }

        // Попробуем найти по альтернативному названию для икон Богородицы
        if (slug.includes('presvyatoy-bogoroditse-pered-ee-ikonoy-')) {
            const iconName = slug.replace('presvyatoy-bogoroditse-pered-ee-ikonoy-', '');
            const alternativeSlug = `pred-ikonoyu-${iconName}`;

            try {
                // Ищем файлы, которые начинаются с альтернативного slug
                const files = fs.readdirSync(path.join(process.cwd(), 'data', 'prayers'));
                for (const file of files) {
                    if (file.startsWith(alternativeSlug) && file.endsWith('.json')) {
                        const filePath = path.join(process.cwd(), 'data', 'prayers', file);
                        const fileContents = fs.readFileSync(filePath, 'utf8');
                        const prayer = JSON.parse(fileContents);
                        return prayer;
                    }
                }
            } catch (altError) {
                // Продолжаем поиск
            }
        }
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
        { name: 'Молитвы', url: '/catalog' },
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
                <div className="container-responsive mx-auto px-4">
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
