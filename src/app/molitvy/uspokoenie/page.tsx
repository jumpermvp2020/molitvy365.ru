import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { Heart, Shield, Zap, Clock, Users, BookOpen, ArrowRight, ChevronRight, Star, Shield as ShieldIcon, Zap as ZapIcon } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';
import { PrayerCard } from '@/components/PrayerCard';
import { getPrayerTextData } from '@/lib/prayerTextData';

interface PrayerData {
    title?: string;
    content?: string;
    contentModern?: string;
    slug?: string;
    url?: string;
    category?: string;
    overview?: string;
    text?: string;
    duration_estimate_min?: number;
    suitable_for?: string[];
    why?: string;
}

interface TextData {
    title?: string;
    modern_ru?: string;
    original_text?: string;
    category?: string;
    overview?: string;
    duration_estimate_min?: number;
    suitable_for?: string[];
    why?: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

interface RelatedCard {
    title: string;
    url: string;
    description: string;
}

// Загружаем данные страницы
const uspokoenieDataPath = path.join(process.cwd(), 'data', 'uspokoenie_page.json');
const uspokoenieData = JSON.parse(fs.readFileSync(uspokoenieDataPath, 'utf8'));

// Функция для загрузки молитвы
function loadPrayer(slug: string) {
    try {
        // Список папок для поиска молитв
        const searchPaths = [
            path.join(process.cwd(), 'data', 'prayers', `${slug}.json`),
            path.join(process.cwd(), 'data', 'uspokoenie_molitvy_archive', 'json', `${slug}.json`),
        ];

        console.log(`Searching for prayer ${slug} in paths:`, searchPaths);

        for (const prayerPath of searchPaths) {
            console.log(`Checking path: ${prayerPath}, exists: ${fs.existsSync(prayerPath)}`);
            if (fs.existsSync(prayerPath)) {
                const data = JSON.parse(fs.readFileSync(prayerPath, 'utf8'));
                console.log(`Found prayer ${slug}:`, data.title);
                return data;
            }
        }

        console.log(`Prayer ${slug} not found in any path`);
        return null;
    } catch (error) {
        console.error(`Error loading prayer ${slug}:`, error);
        return null;
    }
}

// Загружаем основные молитвы для успокоения
const calmPrayers = [
    'molitva-na-son', // Молитва на сон для успокоения
    'molitva-ot-trevogi', // Молитва от тревоги
    'molitva-dlya-dushevnogo-pokoya', // Молитва для душевного покоя
    'molitva-ot-stressa', // Молитва от стресса
    'molitva-dlya-uspokoeniya-nervov', // Молитва для успокоения нервов
    'molitva-dlya-spokojnogo-sna', // Молитва для спокойного сна
];

const prayers = calmPrayers.map(slug => {
    const prayerData = loadPrayer(slug);
    const textData = getPrayerTextData(slug);

    console.log(`Loading prayer ${slug}:`, { prayerData: !!prayerData, textData: !!textData });

    // Используем данные из любого доступного источника
    if (prayerData || textData) {
        const prayer = prayerData || {} as PrayerData;
        const text = textData || {} as TextData;

        return {
            ...prayer,
            prayerText: text.modern_ru || text.original_text || prayer.contentModern || prayer.content || '',
            originalText: text.original_text || prayer.content || '',
            modernText: text.modern_ru || prayer.contentModern || '',
            title: prayer.title || text.title || slug,
            slug: prayer.slug || prayer.url || slug,
            category: prayer.category || text.category || 'Молитвы для успокоения',
            overview: prayer.overview || (text as any).overview || prayer.text || 'Православная молитва для успокоения души и обретения внутреннего покоя.',
            duration_estimate_min: prayer.duration_estimate_min || (text as any).duration_estimate_min || 2,
            suitable_for: prayer.suitable_for || (text as any).suitable_for || ['все'],
            why: prayer.why || (text as any).why || 'Эта молитва помогает обрести душевный покой и умиротворение.'
        };
    }
    return null;
}).filter(Boolean);

console.log('Loaded prayers:', prayers.length);

// Хлебные крошки
const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Молитвы', url: '/catalog/' },
    { name: 'Молитвы для успокоения', url: '/molitvy/uspokoenie/' }
];

// Метаданные для SEO
export const metadata: Metadata = {
    title: uspokoenieData.title,
    description: uspokoenieData.description,
    keywords: uspokoenieData.search_intents.join(', '),
    openGraph: {
        title: uspokoenieData.title,
        description: uspokoenieData.description,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: uspokoenieData.title,
        description: uspokoenieData.description,
    },
};

// Структурированные данные для FAQ
const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": uspokoenieData.faq.map((item: FAQItem) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
        }
    }))
};

export default function UspokoeniePage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 pt-4">
                <Breadcrumbs items={breadcrumbs} />
            </div>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 sm:py-32 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 60 60">
                        <defs>
                            <pattern id="pattern-uspokoenie" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="30" cy="30" r="2" fill="white" fillOpacity="0.05" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#pattern-uspokoenie)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                            <Heart className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-medium">Молитвы для успокоения</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                            Мир и покой
                            <span className="block bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                для души
                            </span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-slate-300 mb-8 leading-relaxed max-w-4xl mx-auto">
                            {uspokoenieData.sections.intro.content}
                        </p>

                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
                            <p className="text-lg text-slate-200 leading-relaxed">
                                Найдите умиротворение в словах, проверенных веками. Эти молитвы помогут вам обрести душевный покой в любой жизненной ситуации.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <a
                                href="#prayers"
                                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <Heart className="w-5 h-5" />
                                Читать молитвы
                            </a>
                            <a
                                href="#guide"
                                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                            >
                                <BookOpen className="w-5 h-5" />
                                Как молиться
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">6</div>
                                <div className="text-sm text-slate-400">Молитв для успокоения</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">2</div>
                                <div className="text-sm text-slate-400">Варианта текста</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">1-4</div>
                                <div className="text-sm text-slate-400">Минут чтения</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2">24/7</div>
                                <div className="text-sm text-slate-400">Доступность</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Душевный покой</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Молитвы помогают обрести внутреннее спокойствие и умиротворение в трудные моменты жизни.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Защита от тревог</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Православные молитвы создают духовную защиту от страхов, тревог и душевных переживаний.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Быстрое успокоение</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Короткие молитвы можно читать в любой момент для быстрого успокоения и снятия напряжения.
                        </p>
                    </div>
                </div>
            </section>

            {/* Prayers Section */}
            <section id="prayers" className="bg-white py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-6">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium">Молитвы для успокоения</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Найдите покой
                            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                в молитве
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Читайте эти молитвы в моменты тревоги и беспокойства. Они помогут обрести душевный покой и внутреннее умиротворение.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {prayers.length > 0 ? (
                            prayers.map((prayer, index) => (
                                <PrayerCard key={prayer.slug} prayer={prayer} index={index} />
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">Молитвы загружаются...</p>
                                <p className="text-gray-400 text-sm mt-2">Найдено молитв: {prayers.length}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Guide Section */}
            <section id="guide" className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-6">
                                <BookOpen className="w-4 h-4" />
                                <span className="text-sm font-medium">Как молиться</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Простые советы
                                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    для молитвы
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
                                {uspokoenieData.sections.howto.title}
                            </p>
                            <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
                                Простые советы для эффективной молитвы в моменты тревоги и беспокойства
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="space-y-8">
                                    {uspokoenieData.sections.howto.steps.map((step: string, index: number) => (
                                        <div key={index} className="flex items-start gap-6">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-lg">{index + 1}</span>
                                            </div>
                                            <div>
                                                <p className="text-lg text-gray-700 leading-relaxed">
                                                    {step}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Полезные советы</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Heart className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Начинайте с глубокого вдоха и выдоха</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Читайте медленно, вникая в смысл слов</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Повторяйте молитву до успокоения</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Note Section */}
            <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-3xl p-12 shadow-2xl border border-amber-100">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-2 mb-6">
                                <Heart className="w-4 h-4" />
                                <span className="text-sm font-medium">Важно помнить</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                {uspokoenieData.sections.note.title}
                            </h2>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
                                <p className="text-lg text-gray-700 leading-relaxed text-center">
                                    {uspokoenieData.sections.note.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 mb-6">
                            <Star className="w-4 h-4" />
                            <span className="text-sm font-medium">Часто задаваемые вопросы</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Ответы на вопросы
                            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                о молитвах
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Ответы на популярные вопросы о молитвах для успокоения души и нервов
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {uspokoenieData.faq.map((item: FAQItem, index: number) => (
                                <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        {item.question}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Pages */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-6">
                            <ArrowRight className="w-4 h-4" />
                            <span className="text-sm font-medium">Связанные молитвы</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Продолжите изучение
                            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                православных молитв
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Откройте для себя другие разделы молитв для различных жизненных ситуаций
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {uspokoenieData.related.map((card: RelatedCard, index: number) => {
                            const gradients = [
                                'from-blue-500 to-indigo-600',
                                'from-green-500 to-emerald-600',
                                'from-purple-500 to-pink-600',
                                'from-orange-500 to-red-600'
                            ];
                            const gradient = gradients[index % gradients.length];

                            return (
                                <a
                                    key={index}
                                    href={card.url}
                                    className={`group relative bg-gradient-to-br ${gradient} rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors duration-300">
                                            <BookOpen className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-white/90 transition-colors duration-300">
                                            {card.title}
                                        </h3>
                                        <p className="text-white/80 leading-relaxed text-sm group-hover:text-white/70 transition-colors duration-300">
                                            {card.description}
                                        </p>
                                        <div className="mt-6 flex items-center text-white/60 group-hover:text-white/80 transition-colors duration-300">
                                            <span className="text-sm font-medium">Узнать больше</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
            <StructuredData data={structuredData} type="FAQPage" />
        </div>
    );
}
