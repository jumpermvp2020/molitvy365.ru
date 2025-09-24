import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, Shield, MessageCircle, Heart, BookOpen, Sun, Moon, Sparkles, Home } from 'lucide-react';
import daysData from '../../data/prayers-by-days-complete.json';

export const metadata: Metadata = {
    title: 'Молитвы по дням недели - Ежедневные духовные практики | Молитва дня',
    description: 'Полное руководство по молитвам для каждого дня недели. Каждый день посвящен определенному архангелу и имеет свои особые молитвы для духовной практики. Православная традиция молитв по дням недели.',
    keywords: [
        'молитвы по дням недели',
        'ежедневные молитвы',
        'архангелы',
        'духовные практики',
        'православные молитвы',
        'молитвы понедельник',
        'молитвы вторник',
        'молитвы среда',
        'молитвы четверг',
        'молитвы пятница',
        'молитвы суббота',
        'молитвы воскресенье',
        'архангел михаил',
        'архангел гавриил',
        'архангел рафаил',
        'архангел уриил',
        'архангел селафиил',
        'архангел иегудииил',
        'архангел варахиил',
        'православная традиция',
        'духовное развитие',
        'молитвенник',
        'православие',
        'духовность'
    ].join(', '),
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
        canonical: '/weekly-prayers',
    },
    openGraph: {
        title: 'Молитвы по дням недели - Ежедневные духовные практики',
        description: 'Полное руководство по молитвам для каждого дня недели согласно православной традиции. Каждый день посвящен определенному архангелу.',
        type: 'website',
        locale: 'ru_RU',
        url: '/weekly-prayers',
        siteName: 'Молитва дня',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Молитвы по дням недели - Ежедневные духовные практики',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Молитвы по дням недели - Ежедневные духовные практики',
        description: 'Полное руководство по молитвам для каждого дня недели согласно православной традиции.',
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

const dayIcons = {
    monday: Shield,
    tuesday: MessageCircle,
    wednesday: Heart,
    thursday: BookOpen,
    friday: Clock,
    saturday: Moon,
    sunday: Sun
};

const dayColors = {
    monday: 'from-[#FCE7D7] to-[#FFF8E1] border-[#E5E7EB]',
    tuesday: 'from-[#F9F5FF] to-[#FCE7D7] border-[#E5E7EB]',
    wednesday: 'from-[#FFF8E1] to-[#F9F5FF] border-[#E5E7EB]',
    thursday: 'from-[#FCE7D7] to-[#FFF8E1] border-[#E5E7EB]',
    friday: 'from-[#F9F5FF] to-[#FCE7D7] border-[#E5E7EB]',
    saturday: 'from-[#FFF8E1] to-[#F9F5FF] border-[#E5E7EB]',
    sunday: 'from-[#FCE7D7] to-[#FFF8E1] border-[#E5E7EB]'
};

export default function WeeklyPrayersPage() {
    const getCurrentDay = () => {
        const today = new Date().getDay();
        return today === 0 ? 6 : today - 1;
    };

    const currentDayIndex = getCurrentDay();
    const weekDaysArray = Object.entries(daysData.weekDays);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] to-[#FDFBFB]">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Навигация */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#4B5563] hover:text-[#111111] transition-colors duration-200"
                    >
                        <Home className="w-4 h-4" />
                        На главную
                    </Link>
                    <Link
                        href="/catalog"
                        className="inline-flex items-center gap-2 text-[#4B5563] hover:text-[#111111] transition-colors duration-200"
                    >
                        <BookOpen className="w-4 h-4" />
                        Каталог молитв
                    </Link>
                </div>

                {/* Заголовок */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-3 bg-white/60 rounded-2xl">
                            <Sparkles className="w-8 h-8 text-[#4B5563]" />
                        </div>
                        <h1 className="text-4xl font-bold text-[#1A1A1A]">
                            Молитвы по дням недели
                        </h1>
                    </div>
                    <p className="text-xl text-[#4B5563] leading-relaxed max-w-3xl mx-auto">
                        Каждый день недели посвящен определенному архангелу согласно православной традиции.
                        Выберите день, чтобы увидеть специальные молитвы для духовной практики.
                    </p>
                </div>

                {/* Статистика */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-[#E5E7EB] shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#111111] mb-2">
                                {daysData.statistics.totalPrayers}
                            </div>
                            <div className="text-[#9CA3AF]">
                                Всего молитв
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#111111] mb-2">
                                {daysData.statistics.averagePrayersPerDay}
                            </div>
                            <div className="text-[#9CA3AF]">
                                Среднее на день
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#111111] mb-2">
                                7
                            </div>
                            <div className="text-[#9CA3AF]">
                                Дней недели
                            </div>
                        </div>
                    </div>
                </div>

                {/* Дни недели */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                    {weekDaysArray.map(([key, dayData], index) => {
                        const IconComponent = dayIcons[key as keyof typeof dayIcons] || Calendar;
                        const colorClass = dayColors[key as keyof typeof dayColors] || 'from-gray-50 to-gray-100 border-gray-100';
                        const isCurrentDay = index === currentDayIndex;

                        return (
                            <Link
                                key={key}
                                href={`/days/${key}`}
                                className={`group transition-all duration-300 ease-out ${isCurrentDay
                                    ? 'ring-2 ring-[#111111] ring-offset-4 ring-offset-white/80'
                                    : 'hover:scale-105 hover:shadow-lg'
                                    }`}
                            >
                                <div className={`${isCurrentDay ? 'shadow-lg' : 'shadow-sm'} bg-gradient-to-br ${colorClass} border rounded-2xl p-8 h-full min-h-[280px] flex flex-col`}>
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="p-3 bg-white/40 rounded-2xl flex-shrink-0">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="font-bold text-[#1A1A1A] text-xl mb-2">
                                                {dayData.name}
                                            </h2>
                                            {isCurrentDay && (
                                                <span className="text-sm bg-[#111111] text-white px-3 py-1 rounded-full">
                                                    Сегодня
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-lg text-[#4B5563] mb-3 font-semibold">
                                        Архангел {dayData.archangel}
                                    </div>

                                    <div className="text-[#9CA3AF] mb-4 flex-1">
                                        {dayData.theme}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-[#1A1A1A]">
                                            {dayData.prayers.filter(prayer => !prayer.isUniversal).length}
                                        </div>
                                        <div className="text-sm text-[#9CA3AF]">
                                            молитв
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Описание традиции */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#E5E7EB] shadow-sm">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                        Православная традиция молитв по дням недели
                    </h2>
                    <div className="prose prose-lg max-w-none text-[#4B5563]">
                        <p className="mb-6">
                            В православной традиции каждый день недели посвящен определенному архангелу,
                            который является покровителем этого дня и помогает в духовной практике.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
                                    Как использовать молитвы по дням
                                </h3>
                                <ul className="space-y-2 text-[#4B5563]">
                                    <li>• Читайте молитвы утром для благословения дня</li>
                                    <li>• Обращайтесь к архангелу-покровителю дня</li>
                                    <li>• Используйте универсальные молитвы в любое время</li>
                                    <li>• Сочетайте с ежедневным молитвенным правилом</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
                                    Польза ежедневной практики
                                </h3>
                                <ul className="space-y-2 text-[#4B5563]">
                                    <li>• Духовное развитие и укрепление веры</li>
                                    <li>• Защита от искушений и зла</li>
                                    <li>• Помощь в жизненных ситуациях</li>
                                    <li>• Связь с небесными покровителями</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}