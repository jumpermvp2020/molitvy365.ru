import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

interface PrayerData {
    title: string;
    overview: string;
    when_to_read: string;
    how_to_read: string[];
    why: string;
    use_cases: string[];
    duration_estimate_min: number;
    suitable_for: string[];
    short_version_hint?: string;
    pitfalls: string[];
    suggested_habits: string[];
    seo_faq: Array<{ q: string; a: string }>;
    slug: string;
}

interface PageProps {
    params: {
        slug: string;
    };
}

// Получаем данные молитвы
async function getPrayerData(slug: string): Promise<any | null> {
    try {
        // Загружаем данные молитвы из папки json
        const prayerPath = path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', 'json', `${slug}.json`);
        const prayerContents = fs.readFileSync(prayerPath, 'utf8');
        const prayerData = JSON.parse(prayerContents);

        // Загружаем дополнительные данные из guide_rich
        try {
            const indexPath = path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', '_index.json');
            const indexContents = fs.readFileSync(indexPath, 'utf8');
            const prayerIndex = JSON.parse(indexContents);

            const prayerItem = prayerIndex.items.find((item: any) => item.slug === slug);
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
        const indexPath = path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', '_index.json');
        const indexContents = fs.readFileSync(indexPath, 'utf8');
        const prayerIndex = JSON.parse(indexContents);

        return prayerIndex.items.map((item: { slug: string }) => ({
            slug: item.slug,
        }));
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

    if (!prayer) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
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
                        {prayer.modern_ru && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">На современном русском языке</h3>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                                        {prayer.modern_ru}
                                    </p>
                                </div>
                            </div>
                        )}
                        {prayer.original_text && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Оригинальный текст</h3>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {prayer.original_text}
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
            </div>
        </div>
    );
}