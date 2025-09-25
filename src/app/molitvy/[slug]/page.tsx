import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Home, BookOpen } from 'lucide-react';

interface PrayerData {
    title: string;
    overview: string;
    when_to_read?: string;
    how_to_read?: string[];
    why?: string;
    use_cases?: string[];
    duration_estimate_min?: number;
    suitable_for?: string[];
    short_version_hint?: string;
    pitfalls?: string[];
    suggested_habits?: string[];
    seo_faq?: Array<{ q: string; a: string }>;
    slug: string;
    // Дополнительные свойства для разных источников данных
    content?: string;
    contentModern?: string;
    modern_ru?: string;
    original_text?: string;
    text?: string;
    url?: string;
    id?: number;
    originalUrl?: string;
    createdAt?: string;
    updatedAt?: string;
    tags?: string[];
    explanation?: string;
}

interface PrayerItem {
    slug: string;
    title?: string;
}

interface PrayerIndex {
    items: PrayerItem[];
}

interface PageProps {
    params: {
        slug: string;
    };
}

// Определяем категорию молитвы и получаем связанные молитвы
async function getPrayerContext(slug: string) {
    // Определяем категорию на основе slug
    let category = 'Молитвы';
    let categoryUrl = '/catalog/';

    // Список молитв для успокоения
    const uspokoeniePrayers = [
        'molitva-na-son',
        'molitva-ot-trevogi',
        'molitva-dlya-dushevnogo-pokoya',
        'molitva-ot-stressa',
        'molitva-dlya-uspokoeniya-nervov',
        'molitva-dlya-spokojnogo-sna'
    ];

    // Список утренних молитв (примеры)
    const utrenniePrayers = [
        'molitva-utrennyaya',
        'molitva-pervaya',
        'molitva-vtoraya'
    ];

    if (uspokoeniePrayers.includes(slug)) {
        category = 'Молитвы для успокоения';
        categoryUrl = '/molitvy/uspokoenie/';
    } else if (utrenniePrayers.includes(slug) || slug.includes('utrennie')) {
        category = 'Утренние молитвы';
        categoryUrl = '/molitvy/utrennie/';
    }

    // Получаем список молитв из той же категории
    let relatedPrayers = [];
    try {
        if (category === 'Молитвы для успокоения') {
            relatedPrayers = uspokoeniePrayers.map(slug => ({
                slug,
                title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
            }));
        } else if (category === 'Утренние молитвы') {
            // Загружаем утренние молитвы из архива
            try {
                const indexPath = path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', '_index.json');
                const indexContents = fs.readFileSync(indexPath, 'utf8');
                const prayerIndex = JSON.parse(indexContents);

                relatedPrayers = prayerIndex.items.map((item: PrayerItem) => ({
                    slug: item.slug,
                    title: item.title || item.slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
                }));
            } catch (error) {
                console.log('Could not load utrennie prayers');
            }
        }
    } catch (error) {
        console.log('Could not load related prayers');
    }

    return { category, categoryUrl, relatedPrayers };
}

// Получаем данные молитвы
async function getPrayerData(slug: string): Promise<PrayerData | null> {
    try {
        // Список папок для поиска молитв
        const searchPaths = [
            path.join(process.cwd(), 'data', 'prayers', `${slug}.json`),
            path.join(process.cwd(), 'data', 'uspokoenie_molitvy_archive', 'json', `${slug}.json`),
            path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', 'json', `${slug}.json`),
        ];

        let prayerData = null;
        let prayerPath = '';

        // Ищем молитву в разных папках
        for (const searchPath of searchPaths) {
            if (fs.existsSync(searchPath)) {
                prayerPath = searchPath;
                const prayerContents = fs.readFileSync(searchPath, 'utf8');
                prayerData = JSON.parse(prayerContents);
                break;
            }
        }

        if (!prayerData) {
            console.log(`Prayer ${slug} not found in any path`);
            return null;
        }

        // Загружаем дополнительные данные из guide_rich
        try {
            const indexPath = path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', '_index.json');
            const indexContents = fs.readFileSync(indexPath, 'utf8');
            const prayerIndex = JSON.parse(indexContents);

            const prayerItem = prayerIndex.items.find((item: PrayerItem) => item.slug === slug);
            if (prayerItem) {
                const guidePath = path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', prayerItem.guide_path);
                const guideContents = fs.readFileSync(guidePath, 'utf8');
                const guideData = JSON.parse(guideContents);

                // Объединяем данные
                return {
                    ...prayerData,
                    ...guideData,
                    slug: slug
                };
            }
        } catch (guideError) {
            console.log('Guide data not found, using basic prayer data');
        }

        // Добавляем slug к данным
        prayerData.slug = slug;

        return prayerData;
    } catch (error) {
        console.error('Ошибка загрузки данных молитвы:', error);
        return null;
    }
}

// Генерируем статические параметры для всех молитв
export async function generateStaticParams() {
    try {
        const params: { slug: string }[] = [];

        // Добавляем молитвы из папки prayers
        try {
            const prayersDir = path.join(process.cwd(), 'data', 'prayers');
            const prayerFiles = fs.readdirSync(prayersDir).filter(file => file.endsWith('.json'));

            prayerFiles.forEach(file => {
                const slug = file.replace('.json', '');
                params.push({ slug });
            });
        } catch (error) {
            console.log('Could not read prayers directory');
        }

        // Добавляем молитвы из архива успокоения
        try {
            const uspokoenieDir = path.join(process.cwd(), 'data', 'uspokoenie_molitvy_archive', 'json');
            const uspokoenieFiles = fs.readdirSync(uspokoenieDir).filter(file => file.endsWith('.json'));

            uspokoenieFiles.forEach(file => {
                const slug = file.replace('.json', '');
                // Проверяем, что не дублируем молитвы
                if (!params.some(p => p.slug === slug)) {
                    params.push({ slug });
                }
            });
        } catch (error) {
            console.log('Could not read uspokoenie archive directory');
        }

        // Добавляем молитвы из архива утренних молитв
        try {
            const indexPath = path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', '_index.json');
            const indexContents = fs.readFileSync(indexPath, 'utf8');
            const prayerIndex = JSON.parse(indexContents);

            prayerIndex.items.forEach((item: PrayerItem) => {
                // Проверяем, что не дублируем молитвы
                if (!params.some(p => p.slug === item.slug)) {
                    params.push({ slug: item.slug });
                }
            });
        } catch (error) {
            console.log('Could not read utrennie archive index');
        }

        return params;
    } catch (error) {
        console.error('Ошибка генерации статических параметров:', error);
        return [];
    }
}

// Генерируем метаданные
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const prayer = await getPrayerData(params.slug);

    if (!prayer) {
        return {
            title: 'Молитва не найдена',
            description: 'Запрашиваемая молитва не найдена на сайте.'
        };
    }

    return {
        title: `${prayer.title} — текст и объяснение`,
        description: prayer.overview,
    };
}

export default async function PrayerPage({ params }: PageProps) {
    const prayer = await getPrayerData(params.slug);
    const context = await getPrayerContext(params.slug);

    if (!prayer) {
        notFound();
    }

    // Находим текущую молитву в списке связанных
    const currentIndex = context.relatedPrayers.findIndex((p: PrayerItem) => p.slug === params.slug);
    const prevPrayer = currentIndex > 0 ? context.relatedPrayers[currentIndex - 1] : null;
    const nextPrayer = currentIndex < context.relatedPrayers.length - 1 ? context.relatedPrayers[currentIndex + 1] : null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Навигация */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href={context.categoryUrl}
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="text-sm font-medium">Назад к {context.category}</span>
                            </Link>
                            <div className="text-gray-300">|</div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                <Home className="w-4 h-4" />
                                <span className="text-sm font-medium">Главная</span>
                            </Link>
                        </div>
                        <Link
                            href="/catalog/"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm font-medium">Каталог</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Основной контент */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    {prayer.title}
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                    {prayer.overview}
                </p>

                {/* Текст молитвы */}
                <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Текст молитвы</h2>
                    <div className="space-y-4">
                        {(prayer.modern_ru || prayer.contentModern) && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">На современном русском языке</h3>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <p className="text-gray-700 leading-relaxed text-lg font-medium whitespace-pre-line">
                                        {prayer.modern_ru || prayer.contentModern}
                                    </p>
                                </div>
                            </div>
                        )}
                        {(prayer.original_text || prayer.content) && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Оригинальный текст</h3>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                                        {prayer.original_text || prayer.content}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {prayer.why && (
                    <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Зачем читать эту молитву</h2>
                        <p className="text-gray-600">{prayer.why}</p>
                    </div>
                )}

                {prayer.when_to_read && (
                    <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Когда читать</h2>
                        <p className="text-gray-600">{prayer.when_to_read}</p>
                    </div>
                )}

                {prayer.how_to_read && prayer.how_to_read.length > 0 && (
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Как правильно читать</h2>
                        <ol className="space-y-2">
                            {prayer.how_to_read.map((step: string, index: number) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-600">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Навигация между молитвами */}
                {(prevPrayer || nextPrayer) && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            {prevPrayer ? (
                                <Link
                                    href={`/molitvy/${prevPrayer.slug}/`}
                                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                                >
                                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                                    <div className="text-left">
                                        <div className="text-sm text-gray-500">Предыдущая</div>
                                        <div className="font-medium">{prevPrayer.title}</div>
                                    </div>
                                </Link>
                            ) : (
                                <div></div>
                            )}

                            {nextPrayer ? (
                                <Link
                                    href={`/molitvy/${nextPrayer.slug}/`}
                                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                                >
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Следующая</div>
                                        <div className="font-medium">{nextPrayer.title}</div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                </Link>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                )}

                {/* Дополнительные ссылки */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href={context.categoryUrl}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                        >
                            <BookOpen className="w-4 h-4" />
                            Все молитвы категории
                        </Link>
                        <Link
                            href="/catalog/"
                            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                        >
                            <BookOpen className="w-4 h-4" />
                            Полный каталог
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}