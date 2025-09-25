import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';
import { ModernPrayerCard } from '@/components/ModernPrayerCard';
import { BookOpen, Clock, Users, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { getPrayerTextData } from '@/lib/prayerTextData';
import fs from 'fs';
import path from 'path';

// Загружаем данные страницы
const utrennieData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/utrennie_page.json'), 'utf8'));

// Загружаем данные молитв
const prayersDir = path.join(process.cwd(), 'data/utrennie_molitvy_archive/guide_rich');

// Функция для загрузки молитвы
function loadPrayer(slug: string) {
    try {
        const filePath = path.join(prayersDir, `${slug}.json`);
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Ошибка загрузки молитвы ${slug}:`, error);
        return null;
    }
}

// Загружаем основные молитвы для утреннего правила
const mainPrayers = [
    'molitva-gospodnya', // Отче наш
    'simvol-very', // Символ веры
    'psalom-50', // Псалом 50
    'molitva-ko-presvyatoj-troice', // Молитва ко Пресвятой Троице
    'molitva-vosmaya-ko-gospodu-nashemu-iisusu-hristu', // Молитва Господу Иисусу Христу
    'molitva-sedmaya-ko-presvyatoj-bogorodice', // Богородице
    'molitva-devyataya-k-angelu-hranitelyu', // Ангелу хранителю
];

const prayers = mainPrayers.map(slug => {
    const prayerData = loadPrayer(slug);
    const textData = getPrayerTextData(slug);

    if (prayerData && textData) {
        return {
            ...prayerData,
            prayerText: textData.modern_ru || textData.original_text || '',
            originalText: textData.original_text || '',
            modernText: textData.modern_ru || ''
        };
    }
    return prayerData;
}).filter(Boolean);

export const metadata: Metadata = {
    title: 'Утренние молитвы — современный православный молитвослов',
    description: 'Православные утренние молитвы: полные и краткие тексты, порядок чтения, объяснение для начинающих. Современный подход к древней традиции молитвы.',
    keywords: [
        'утренние молитвы',
        'молитвы утренние',
        'утренняя молитва',
        'утренние молитвы читать',
        'утренние молитвы на русском',
        'православные молитвы',
        'краткие утренние молитвы',
        'утренние молитвы для начинающих',
        'молитвослов',
        'утреннее правило'
    ],
    openGraph: {
        title: 'Утренние молитвы — современный православный молитвослов',
        description: 'Православные утренние молитвы: полные и краткие тексты, порядок чтения, объяснение для начинающих.',
        url: 'https://molitvy365.ru/molitvy/utrennie/',
        type: 'website',
    },
    alternates: {
        canonical: '/molitvy/utrennie/',
    },
};

// Структурированные данные для SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Утренние молитвы",
    "description": "Православные утренние молитвы: полные и краткие тексты, порядок чтения, объяснение для начинающих",
    "url": "https://molitvy365.ru/molitvy/utrennie/",
};

export default function UtrennieMolitvyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Структурированные данные */}
            <StructuredData data={structuredData} type="FAQPage" />

            {/* Hero Section - в стиле Medusa */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative container mx-auto px-6 py-20 lg:py-32">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Православный молитвослов
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Утренние молитвы
                        </h1>
                        <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                            Современный подход к древней традиции. Читайте, изучайте и начинайте день с молитвы.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#prayers"
                                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg"
                            >
                                <BookOpen className="w-5 h-5" />
                                Читать молитвы
                            </a>
                            <a
                                href="#guide"
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
                            >
                                Руководство для начинающих
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Хлебные крошки */}
            <div className="container mx-auto px-6 pt-6">
                <Breadcrumbs
                    items={[
                        { name: 'Главная', url: '/' },
                        { name: 'Молитвы', url: '/molitvy/' },
                        { name: 'Утренние молитвы', url: '/molitvy/utrennie/' }
                    ]}
                />
            </div>

            {/* Features Grid - в стиле Medusa */}
            <div className="container mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Почему выбирают наш молитвослов
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Современные технологии для древних традиций
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Полные тексты
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Все основные утренние молитвы с подробными объяснениями и контекстом для понимания.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Краткие версии
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Адаптированные варианты для тех, кто только начинает свой путь в православии.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Для всех уровней
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            От новичков до опытных православных христиан — найдется подходящий формат.
                        </p>
                    </div>
                </div>
            </div>



            {/* Prayers Section */}
            <div id="prayers" className="container mx-auto px-6 pb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Тексты утренних молитв
                    </h2>
                    <p className="text-xl text-gray-600">
                        Полный свод основных утренних молитв православного христианина
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {prayers.map((prayer, index) => (
                        <ModernPrayerCard
                            key={prayer.slug}
                            prayer={prayer}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Guide Section */}
            <div id="guide" className="container mx-auto px-6 pb-16">
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                Руководство для начинающих
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Утреннее правило помогает начать день с обращения к Богу. Можно читать полностью
                                или кратко — важнее регулярность и искреннее внимание.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-semibold text-sm">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Начало обычное</h3>
                                        <p className="text-gray-600">Крестное знамение и начальные молитвы</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-semibold text-sm">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Основные молитвы</h3>
                                        <p className="text-gray-600">«Отче наш», «Символ веры», Псалом 50</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-semibold text-sm">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Личные молитвы</h3>
                                        <p className="text-gray-600">Ко Христу, Богородице, Ангелу хранителю</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:pl-8">
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    💡 Совет для начинающих
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Если времени мало, начните с трёх основных молитв: «Отче наш»,
                                    «Символ веры» и краткую молитву Ангелу хранителю. Постепенно
                                    добавляйте остальные.
                                </p>
                                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                                    <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
                                        <Clock className="w-4 h-4" />
                                        Время чтения: 3-5 минут
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container mx-auto px-6 pb-16">
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Часто задаваемые вопросы
                        </h2>
                        <p className="text-xl text-gray-600">
                            Ответы на популярные вопросы о утренних молитвах
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {utrennieData.faq.map((item: { q: string; a: string }, index: number) => (
                            <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {item.q}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Related Pages */}
            <div className="container mx-auto px-6 pb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Продолжите изучение
                    </h2>
                    <p className="text-xl text-gray-600">
                        Расширьте свою молитвенную практику с помощью других разделов
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {utrennieData.related.map((item: { label: string; url: string }, index: number) => {
                        // Определяем иконку и описание для каждой ссылки
                        const getCardInfo = (label: string) => {
                            switch (label) {
                                case 'Каталог молитв':
                                    return {
                                        icon: <BookOpen className="w-6 h-6 text-white" />,
                                        description: 'Все молитвы проекта в удобном каталоге',
                                        color: 'from-blue-500 to-indigo-600'
                                    };
                                case 'Еженедельные молитвы':
                                    return {
                                        icon: <Clock className="w-6 h-6 text-white" />,
                                        description: 'Молитвы на каждый день недели',
                                        color: 'from-purple-500 to-pink-600'
                                    };
                                case 'Избранные молитвы':
                                    return {
                                        icon: <Heart className="w-6 h-6 text-white" />,
                                        description: 'Сохраните любимые молитвы',
                                        color: 'from-red-500 to-rose-600'
                                    };
                                case 'Часто задаваемые вопросы':
                                    return {
                                        icon: <Users className="w-6 h-6 text-white" />,
                                        description: 'Ответы на популярные вопросы',
                                        color: 'from-green-500 to-emerald-600'
                                    };
                                case 'О проекте':
                                    return {
                                        icon: <Sparkles className="w-6 h-6 text-white" />,
                                        description: 'Узнайте больше о нашей миссии',
                                        color: 'from-amber-500 to-orange-600'
                                    };
                                case 'Конфиденциальность':
                                    return {
                                        icon: <Heart className="w-6 h-6 text-white" />,
                                        description: 'Политика обработки данных',
                                        color: 'from-gray-500 to-slate-600'
                                    };
                                default:
                                    return {
                                        icon: <Heart className="w-6 h-6 text-white" />,
                                        description: 'Дополнительная информация',
                                        color: 'from-indigo-500 to-purple-600'
                                    };
                            }
                        };

                        const cardInfo = getCardInfo(item.label);

                        return (
                            <a
                                key={index}
                                href={item.url}
                                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br ${cardInfo.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                                    {cardInfo.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 mb-2">
                                    {item.label}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    {cardInfo.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-indigo-600 font-medium group-hover:text-indigo-700">
                                        Перейти
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}