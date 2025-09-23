import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import YandexMetrika from '@/components/YandexMetrika';

export const metadata: Metadata = {
  title: {
    default: 'Молитва дня - Случайная православная молитва каждый день',
    template: '%s | Молитва дня'
  },
  description: 'Молитва дня - каждый день новая случайная православная молитва для духовного чтения. Утренние молитвы, вечерние молитвы, отче наш, молитвы святым. Читайте и слушайте молитвы на русском языке с современными переводами.',
  keywords: [
    'молитва дня',
    'случайная молитва',
    'молитва дня каждый день',
    'новая молитва каждый день',
    'молитвы',
    'православные молитвы',
    'духовное чтение',
    'православие',
    'молитвенник',
    'духовность',
    'религия',
    'утренние молитвы',
    'вечерние молитвы',
    'отче наш молитва',
    'молитвы утренние',
    'молитвы вечерние',
    'молитва отче наш',
    'молитвы слушать',
    'молитвы читать',
    'молитва николаю чудотворцу',
    'молитва спиридону тримифунтскому',
    'молитва оптинских старцев',
    'молитва о детях',
    'молитва ангелу хранителю',
    'благодарственные молитвы',
    'молитвы на сон грядущий',
    'символ веры молитва',
    'молитва богородице',
    'молитва архангелу михаилу',
    'молитва задержания',
    'молитва по соглашению',
    'иисусова молитва',
    'живые помощи молитва',
    'богородица дева радуйся молитва',
    'да воскреснет бог молитва',
    'молитва о здравии',
    'молитва о путешествующих',
    'молитва водителя',
    'молитва в день рождения',
    'молитвы ко святому причащению',
    'молитвы перед причастием',
    'молитва всецарице',
    'молитва казанской божьей матери',
    'молитва на сдачу экзамена',
    'молитва на удачу',
    'молитва на ночь',
    'молитва пресвятой богородице',
    'молитва серафиму саровскому',
    'молитва ефрема сирина',
    'молитва луке крымскому',
    'молитва георгию победоносцу',
    'молитва сергию радонежскому',
    'молитва михаилу архангелу',
    'молитва спиридону',
    'молитвы николаю чудотворцу',
    'молитва матери о сыне',
    'молитва за сына',
    'молитва о сыне',
    'молитва о детях материнская',
    'молитва за детей',
    'молитвы о детях',
    'молитва об усопших',
    'молитва матроне московской',
    'молитва ксении петербургской',
    'молитва пантелеймону целителю',
    'молитва матроне',
    'молитва перед операцией',
    'молитва спиридону тримифунтскому о помощи',
    'молитва николаю чудотворцу о помощи',
    'молитва николаю чудотворцу о помощи во всем самая сильная',
    'спиридон тримифунтский молитва',
    'молитвы спиридону тримифунтскому',
    'отче наш молитва на русском',
    'отче наш молитва на русском текст',
    'отче наш молитва на русском языке полностью',
    'отче наш молитва на русском текст полностью',
    'отче наш молитва текст',
    'молитва отче наш на русском',
    'молитва отче наш на русском языке полностью',
    'молитва верую',
    'верую молитва',
    'символ веры молитва текст',
    'молитва символ веры',
    'утренние молитвы читать',
    'утренние молитвы читать на русском',
    'утренние молитвы читать на русском языке',
    'утренние молитвы слушать',
    'утренние молитвы слушать бесплатно',
    'утренние молитвы слушать оптина пустынь',
    'утренние молитвы слушать оптина',
    'слушать утренние молитвы',
    'молитвы утренние слушать',
    'молитвы утренние читать',
    'утренняя молитва',
    'утренняя молитва слушать',
    'молитва утренняя',
    'вечерние молитвы читать',
    'вечерние молитвы читать на русском',
    'вечерние молитвы слушать',
    'вечерние молитвы слушать бесплатно',
    'вечерние молитвы слушать оптина',
    'вечерние молитвы слушать оптина пустынь',
    'слушать вечерние молитвы',
    'молитвы вечерние слушать',
    'молитвы вечерние читать',
    'вечерняя молитва',
    'молитва вечерняя',
    'молитва на сон грядущий',
    'молитвы на сон грядущий',
    'молитва на ночь',
    'молитва да воскреснет бог',
    'благодарственные молитвы по святом причащении',
    'молитвы ко святому причащению',
    'молитвы перед причастием',
    'молитва оптинских старцев на каждый день',
    'молитва ефрема сирина',
    'молитва задержания',
    'молитва по соглашению',
    'молитва богородице',
    'молитва за детей',
    'молитва о здравии',
    'молитва о путешествующих',
    'молитва водителя',
    'молитва в день рождения',
    'молитва всецарице',
    'молитва казанской божьей матери',
    'молитва на сдачу экзамена',
    'молитва на удачу',
    'молитва на ночь',
    'молитва пресвятой богородице',
    'молитва серафиму саровскому',
    'молитва ефрема сирина',
    'молитва луке крымскому',
    'молитва георгию победоносцу',
    'молитва сергию радонежскому',
    'молитва михаилу архангелу',
    'молитва спиридону',
    'молитвы николаю чудотворцу',
    'молитва матери о сыне',
    'молитва за сына',
    'молитва о сыне',
    'молитва о детях материнская',
    'молитва за детей',
    'молитвы о детях',
    'молитва об усопших',
    'молитва матроне московской',
    'молитва ксении петербургской',
    'молитва пантелеймону целителю',
    'молитва матроне',
    'молитва перед операцией',
    'молитва спиридону тримифунтскому о помощи',
    'молитва николаю чудотворцу о помощи',
    'молитва николаю чудотворцу о помощи во всем самая сильная',
    'спиридон тримифунтский молитва',
    'молитвы спиридону тримифунтскому'
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
    title: 'Молитва дня - Случайная православная молитва каждый день',
    description: 'Молитва дня - каждый день новая случайная православная молитва для духовного чтения. Утренние молитвы, вечерние молитвы, отче наш, молитвы святым.',
    siteName: 'Молитва дня',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Молитва дня - Случайная православная молитва каждый день',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Молитва дня - Случайная православная молитва каждый день',
    description: 'Молитва дня - каждый день новая случайная православная молитва для духовного чтения.',
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
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/favicon.svg',
        color: '#8B5CF6',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" sizes="180x180" />
        <link rel="mask-icon" href="/favicon/favicon.svg" color="#8B5CF6" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Preload только критических шрифтов */}
        <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Preconnect для внешних ресурсов */}
        <link rel="preconnect" href="https://mc.yandex.ru" />

        {/* Дополнительные SEO мета-теги */}
        <meta name="language" content="ru" />
        <meta name="geo.region" content="RU" />
        <meta name="geo.placename" content="Россия" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Мета-теги для мобильных устройств */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Молитва дня" />

        {/* Дополнительные Open Graph теги */}
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Молитва дня" />
        <meta property="article:publisher" content="https://molitvy365.ru" />

        {/* Twitter дополнительные теги */}
        <meta name="twitter:site" content="@molitvy365" />
        <meta name="twitter:creator" content="@molitvy365" />

        {/* Дополнительные мета-теги для поисковых систем */}
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="yandex" content="index, follow" />

        {/* Мета-теги для социальных сетей */}
        <meta property="fb:app_id" content="your-facebook-app-id" />
        <meta name="vk:app_id" content="your-vk-app-id" />

        {/* Мета-теги для контента */}
        <meta name="content-type" content="text/html; charset=UTF-8" />
        <meta name="content-language" content="ru" />
        <meta name="audience" content="all" />
        <meta name="target" content="all" />

        {/* Мета-теги для кэширования */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
        <meta httpEquiv="Expires" content="31536000" />

        {/* Мета-теги для безопасности */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Мета-теги для производительности */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="320" />
      </head>
      <body className="font-sans">
        <GoogleAnalytics />
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}