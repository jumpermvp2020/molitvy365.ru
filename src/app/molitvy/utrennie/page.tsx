import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { Clock, Users, BookOpen, Heart, ArrowRight, ChevronRight, Star, Shield, Zap } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';
import { ShareButton } from '@/components/ShareButton';
import { PrayerCard } from '@/components/PrayerCard';
import { getPrayerTextData } from '@/lib/prayerTextData';

// Загружаем данные страницы
const utrennieDataPath = path.join(process.cwd(), 'data', 'utrennie_page.json');
const utrennieData = JSON.parse(fs.readFileSync(utrennieDataPath, 'utf8'));

// Функция для загрузки молитвы
function loadPrayer(slug: string) {
    try {
        const filePath = path.join(process.cwd(), 'data', 'utrennie_molitvy_archive', 'guide_rich', `${slug}.json`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error(`Error loading prayer ${slug}:`, error);
        return null;
    }
}

// Загружаем основные молитвы для утреннего правила
const mainPrayers = [
    'molitva-pervaya-svyatogo-makariya-velikogo', // Молитва первая, святого Макария Великого
    'molitva-prednachinatelnaya', // Предначинательная
    'molitva-svyatomu-duhu', // Святому Духу
    'trisvyatoe', // Трисвятое
    'tropari-troichnye', // Тропари Троичные
    'molitva-gospodnya', // Отче наш
    'simvol-very', // Символ веры
    'psalom-50', // Псалом 50
    'molitva-ko-presvyatoj-troice', // Молитва ко Пресвятой Троице
    'molitva-vosmaya-ko-gospodu-nashemu-iisusu-hristu', // Молитва Господу Иисусу Христу
    'molitva-sedmaya-ko-presvyatoj-bogorodice', // Богородице
    'molitva-devyataya-k-angelu-hranitelyu', // Ангелу хранителю
    'molitva-mytarya', // Молитва мытаря (перенесена в конец)
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

export default function UtrenniePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-6 pt-8">
                <Breadcrumbs
                    items={[
                        { name: 'Главная', url: '/' },
                        { name: 'Молитвы', url: '/molitvy/' },
                        { name: 'Утренние молитвы', url: '/molitvy/utrennie/' }
                    ]}
                />
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-16 lg:py-24">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                        <Star className="w-4 h-4" />
                        Православные молитвы
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        {utrennieData.title}
                    </h1>

                    <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                        {utrennieData.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#prayers"
                            className="inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <BookOpen className="w-5 h-5" />
                            Читать молитвы
                        </a>
                        <a
                            href="#guide"
                            className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105"
                        >
                            <Users className="w-5 h-5" />
                            Как читать
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Быстрое чтение</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Краткие версии молитв для тех, кто спешит. Основные молитвы за 5-10 минут.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Полное правило</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Все утренние молитвы в правильном порядке. Для глубокого духовного погружения.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Для начинающих</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Подробные объяснения и современные переводы. Легко начать молитвенную практику.
                        </p>
                    </div>
                </div>
            </section>

            {/* Prayers Section */}
            <section id="prayers" className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
                <div className="text-center mb-8 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                        Тексты утренних молитв
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Читайте молитвы в правильном порядке. Каждая молитва имеет современный перевод и церковнославянский текст.
                    </p>
                </div>

                <div className="space-y-4 sm:space-y-8">
                    {prayers.map((prayer, index) => (
                        <PrayerCard key={prayer.slug} prayer={prayer} index={index} />
                    ))}
                </div>
            </section>

            {/* Guide Section */}
            <section id="guide" className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Как читать утренние молитвы
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Простое руководство для начинающих и опытных верующих
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div>
                            <div className="space-y-6 sm:space-y-8">
                                <div className="flex items-start gap-4 sm:gap-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm sm:text-lg">1</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Начало обычное</h3>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            Крестное знамение и начальные молитвы. Настройтесь на молитву, отложите все дела.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 sm:gap-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm sm:text-lg">2</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Основные молитвы</h3>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            «Отче наш», «Символ веры», Псалом 50. Читайте внимательно, вникая в смысл.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 sm:gap-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm sm:text-lg">3</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Личные прошения</h3>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            Молитвы о близких, благодарность Богу. Добавьте свои личные прошения.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Полезные советы</h3>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-start gap-3">
                                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-1 flex-shrink-0" />
                                    <p className="text-sm sm:text-base text-gray-700">Начинайте с краткого правила, постепенно увеличивайте</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-1 flex-shrink-0" />
                                    <p className="text-sm sm:text-base text-gray-700">Лучше читать регулярно понемногу, чем редко и много</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-1 flex-shrink-0" />
                                    <p className="text-sm sm:text-base text-gray-700">Важна искренность, а не количество прочитанного</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Часто задаваемые вопросы
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ответы на популярные вопросы об утренних молитвах
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {utrennieData.faq.map((item: { q: string; a: string }, index: number) => (
                            <div key={index} className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {item.q}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Pages */}
            <section className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Продолжите изучение
                    </h2>
                    <p className="text-xl text-gray-600">
                        Расширьте свою молитвенную практику
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {utrennieData.related.map((item: { label: string; url: string }, index: number) => {
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
                                default:
                                    return {
                                        icon: <BookOpen className="w-6 h-6 text-white" />,
                                        description: 'Дополнительные молитвы и материалы',
                                        color: 'from-gray-500 to-slate-600'
                                    };
                            }
                        };

                        const cardInfo = getCardInfo(item.label);

                        return (
                            <a
                                key={index}
                                href={item.url}
                                className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="text-center">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${cardInfo.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}>
                                        {cardInfo.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 mb-3">
                                        {item.label}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        {cardInfo.description}
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all duration-200">
                                        <span>Подробнее</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </section>

            {/* Footer */}
            <Footer />

            {/* Structured Data */}
            <StructuredData
                type="FAQPage"
                data={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "name": utrennieData.title,
                    "description": utrennieData.description,
                    "url": "https://molitvy365.ru/molitvy/utrennie/",
                    "mainEntity": {
                        "@type": "ItemList",
                        "itemListElement": utrennieData.faq.map((item: { q: string; a: string }, index: number) => ({
                            "@type": "Question",
                            "position": index + 1,
                            "item": {
                                "@type": "Answer",
                                "name": item.q,
                                "description": item.a
                            }
                        }))
                    },
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Главная",
                                "item": "https://molitvy365.ru/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Молитвы",
                                "item": "https://molitvy365.ru/molitvy/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "Утренние молитвы",
                                "item": "https://molitvy365.ru/molitvy/utrennie/"
                            }
                        ]
                    }
                }}
            />
        </div>
    );
}