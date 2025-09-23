import React from 'react';
import Link from 'next/link';

export const SEONavigation: React.FC = () => {
    const seoLinks = [
        {
            title: 'Утренние молитвы',
            description: 'Читать, слушать, текст',
            url: '/molitvy/utrennie/',
            icon: '🌅'
        },
        {
            title: 'Вечерние молитвы',
            description: 'Перед сном',
            url: '/molitvy/vechernie/',
            icon: '🌙'
        },
        {
            title: 'Отче наш',
            description: 'Главная молитва',
            url: '/molitvy/otche-nash/',
            icon: '✝️'
        },
        {
            title: 'Символ веры',
            description: 'Исповедание веры',
            url: '/molitvy/simvol-very/',
            icon: '📖'
        },
        {
            title: 'Николай Чудотворец',
            description: 'Помощник в нуждах',
            url: '/svyatye/nikolaj-chudotvorets/molitvy/',
            icon: '👼'
        },
        {
            title: 'Молитвы о детях',
            description: 'Для родителей',
            url: '/molitvy/o-detyah/',
            icon: '👶'
        },
        {
            title: 'Молитвы о здравии',
            description: 'Для больных',
            url: '/molitvy/o-zdravii/',
            icon: '🏥'
        },
        {
            title: 'Молитвы в путешествии',
            description: 'Для дороги',
            url: '/molitvy/v-puteshestvii/',
            icon: '✈️'
        }
    ];

    return (
        <section className="seo-navigation py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Популярные молитвы
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Выберите нужную молитву для чтения, изучения или молитвенной практики
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {seoLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
                        >
                            <div className="text-center">
                                <div className="text-2xl mb-2">{link.icon}</div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {link.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {link.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/molitvy/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Все молитвы
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};
