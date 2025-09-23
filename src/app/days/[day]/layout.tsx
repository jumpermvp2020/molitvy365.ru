import { Metadata } from 'next';
import daysData from '../../../data/prayers-by-days-complete.json';

interface DayLayoutProps {
    params: Promise<{
        day: string;
    }>;
    children: React.ReactNode;
}

export async function generateStaticParams() {
    const days = Object.keys(daysData.weekDays);
    return days.map((day) => ({
        day: day,
    }));
}

export async function generateMetadata({ params }: DayLayoutProps): Promise<Metadata> {
    const resolvedParams = await params;
    const dayData = daysData.weekDays[resolvedParams.day as keyof typeof daysData.weekDays];

    if (!dayData) {
        return {
            title: 'День не найден',
        };
    }

    // Создаем расширенные ключевые слова для дней недели
    const dayKeywords = [
        `молитва ${dayData.nameGenitive}`,
        `молитвы ${dayData.nameGenitive}`,
        `архангел ${dayData.archangel.toLowerCase()}`,
        `${dayData.theme.toLowerCase()}`,
        'православные молитвы',
        'молитвы по дням недели',
        'духовные практики',
        'молитвенник',
        'православие',
        'духовность'
    ];

    // Добавляем специфичные ключевые слова для каждого дня
    if (resolvedParams.day === 'monday') {
        dayKeywords.push('молитвы понедельник', 'архангел михаил', 'начало недели', 'защита от зла');
    } else if (resolvedParams.day === 'tuesday') {
        dayKeywords.push('молитвы вторник', 'архангел гавриил', 'благовестие', 'радостные вести');
    } else if (resolvedParams.day === 'wednesday') {
        dayKeywords.push('молитвы среда', 'архангел рафаил', 'исцеление', 'помощь в болезнях');
    } else if (resolvedParams.day === 'thursday') {
        dayKeywords.push('молитвы четверг', 'архангел уриил', 'мудрость', 'просвещение');
    } else if (resolvedParams.day === 'friday') {
        dayKeywords.push('молитвы пятница', 'архангел селафиил', 'молитва', 'духовное общение');
    } else if (resolvedParams.day === 'saturday') {
        dayKeywords.push('молитвы суббота', 'архангел иегудииил', 'покой', 'поминовение усопших');
    } else if (resolvedParams.day === 'sunday') {
        dayKeywords.push('молитвы воскресенье', 'архангел варахиил', 'воскресение', 'прославление бога');
    }

    return {
        title: `Молитвы на ${dayData.nameGenitive} - ${dayData.theme} | Молитва дня`,
        description: `${dayData.description}. ${dayData.prayers.filter(p => !p.isUniversal).length} молитв для духовной практики в ${dayData.nameGenitive}. Архангел ${dayData.archangel} - покровитель ${dayData.nameGenitive}. Читайте православные молитвы по дням недели.`,
        keywords: dayKeywords.join(', '),
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
            canonical: `/days/${resolvedParams.day}`,
        },
        openGraph: {
            title: `Молитвы на ${dayData.nameGenitive} - ${dayData.theme}`,
            description: `${dayData.description}. ${dayData.prayers.filter(p => !p.isUniversal).length} молитв для духовной практики в ${dayData.nameGenitive}.`,
            type: 'website',
            locale: 'ru_RU',
            url: `/days/${resolvedParams.day}`,
            siteName: 'Молитва дня',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: `Молитвы на ${dayData.nameGenitive} - ${dayData.theme}`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Молитвы на ${dayData.nameGenitive} - ${dayData.theme}`,
            description: `${dayData.description}. ${dayData.prayers.filter(p => !p.isUniversal).length} молитв для духовной практики.`,
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
}

export default function DayLayout({ children }: DayLayoutProps) {
    return <>{children}</>;
}
