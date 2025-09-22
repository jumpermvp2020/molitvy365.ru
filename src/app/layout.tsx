import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import YandexMetrika from '@/components/YandexMetrika';

export const metadata: Metadata = {
  title: {
    default: 'Молитвы дня - Православные молитвы для ежедневного чтения',
    template: '%s | Молитвы дня'
  },
  description: 'Коллекция православных молитв для ежедневного духовного чтения. Молитва дня, случайные молитвы и полная библиотека из 467 молитв.',
  keywords: [
    'молитвы',
    'православные молитвы',
    'молитва дня',
    'духовное чтение',
    'православие',
    'молитвенник',
    'духовность',
    'религия'
  ],
  authors: [{ name: 'Команда hotelqr.com' }],
  creator: 'hotelqr.com',
  publisher: 'hotelqr.com',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://molitvy365.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://molitvy365.ru',
    title: 'Молитвы дня - Православные молитвы для ежедневного чтения',
    description: 'Коллекция православных молитв для ежедневного духовного чтения. Молитва дня, случайные молитвы и полная библиотека из 467 молитв.',
    siteName: 'Молитвы дня',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Молитвы дня - Православные молитвы',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Молитвы дня - Православные молитвы для ежедневного чтения',
    description: 'Коллекция православных молитв для ежедневного духовного чтения.',
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Preload только критических шрифтов */}
        <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Preconnect для внешних ресурсов */}
        <link rel="preconnect" href="https://mc.yandex.ru" />
      </head>
      <body className="font-sans">
        <GoogleAnalytics />
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}