import React from 'react';
import { PrayerCategory } from '@/types/prayer';

interface PillarTemplateProps {
    category: PrayerCategory;
    canonicalUrl: string;
    h1Variations: string[];
    seoDescription: string;
    detailedDescription: any;
}

export const PillarTemplate: React.FC<PillarTemplateProps> = ({
    category,
    canonicalUrl,
    h1Variations,
    seoDescription,
    detailedDescription
}) => {
    const h1 = h1Variations[0]; // Основной H1
    const title = `${h1} — читать, слушать, текст полностью (на русском)`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Как читать ${category.name.toLowerCase()}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": detailedDescription.sections[0]?.items[0] || "Читайте молитвы в спокойной обстановке, сосредоточившись на словах."
                }
            },
            {
                "@type": "Question",
                "name": `Когда читать ${category.name.toLowerCase()}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": detailedDescription.sections[0]?.items[1] || "Молитвы читаются в соответствии с церковным уставом и личными потребностями."
                }
            },
            {
                "@type": "Question",
                "name": `Есть ли современный русский перевод?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Да, доступны как оригинальные тексты, так и адаптированные для современного понимания версии."
                }
            }
        ]
    };

    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Главная",
                "item": "/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Молитвы",
                "item": "/molitvy/"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": category.name,
                "item": canonicalUrl
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <div className="pillar-page">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Навигация">
                    <ol>
                        <li><a href="/">Главная</a></li>
                        <li><a href="/molitvy/">Молитвы</a></li>
                        <li aria-current="page">{category.name}</li>
                    </ol>
                </nav>

                {/* Main Content */}
                <main>
                    <header className="page-header">
                        <h1>{h1}</h1>
                        <p className="lead">{seoDescription}</p>
                    </header>

                    {/* Quick Actions */}
                    <section className="quick-actions">
                        <h2>Как читать {category.name.toLowerCase()}</h2>
                        <div className="action-grid">
                            <a href={`${canonicalUrl}chitat/`} className="action-card">
                                <h3>Читать</h3>
                                <p>Полный текст с удобной разметкой</p>
                            </a>
                            <a href={`${canonicalUrl}slushat/`} className="action-card">
                                <h3>Слушать</h3>
                                <p>Аудио версии и плейлисты</p>
                            </a>
                            <a href={`${canonicalUrl}tekst-polnostyu/`} className="action-card">
                                <h3>Текст полностью</h3>
                                <p>Чистый текст для копирования</p>
                            </a>
                            <a href={`${canonicalUrl}na-russkom/`} className="action-card">
                                <h3>На русском</h3>
                                <p>Современный адаптированный текст</p>
                            </a>
                        </div>
                    </section>

                    {/* When to Read */}
                    <section className="when-to-read">
                        <h2>Когда читать {category.name.toLowerCase()}</h2>
                        {detailedDescription.sections.map((section: any, index: number) => (
                            <div key={index} className="section-block">
                                <h3>{section.title}</h3>
                                <ul>
                                    {section.items.map((item: string, itemIndex: number) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>

                    {/* Related Prayers */}
                    <section className="related-prayers">
                        <h2>Связанные молитвы</h2>
                        <div className="related-grid">
                            <a href="/molitvy/otche-nash/" className="related-card">
                                <h3>Отче наш</h3>
                                <p>Главная молитва христиан</p>
                            </a>
                            <a href="/molitvy/simvol-very/" className="related-card">
                                <h3>Символ веры</h3>
                                <p>Исповедание православной веры</p>
                            </a>
                            <a href="/molitvy/vechernie/" className="related-card">
                                <h3>Вечерние молитвы</h3>
                                <p>Молитвы перед сном</p>
                            </a>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="faq-section">
                        <h2>Часто задаваемые вопросы</h2>
                        <div className="faq-list">
                            <details className="faq-item">
                                <summary>Как читать {category.name.toLowerCase()}?</summary>
                                <p>{detailedDescription.sections[0]?.items[0] || "Читайте молитвы в спокойной обстановке, сосредоточившись на словах."}</p>
                            </details>
                            <details className="faq-item">
                                <summary>Когда читать {category.name.toLowerCase()}?</summary>
                                <p>{detailedDescription.sections[0]?.items[1] || "Молитвы читаются в соответствии с церковным уставом и личными потребностями."}</p>
                            </details>
                            <details className="faq-item">
                                <summary>Есть ли современный русский перевод?</summary>
                                <p>Да, доступны как оригинальные тексты, так и адаптированные для современного понимания версии.</p>
                            </details>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};
