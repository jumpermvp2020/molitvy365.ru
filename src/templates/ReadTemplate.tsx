import React from 'react';

interface ReadTemplateProps {
    prayer: {
        id: string;
        title: string;
        content: string;
        contentModern?: string;
        category: string;
    };
    canonicalUrl: string;
    parentUrl: string;
}

export const ReadTemplate: React.FC<ReadTemplateProps> = ({
    prayer,
    canonicalUrl,
    parentUrl
}) => {
    const title = `${prayer.title} — читать онлайн`;
    const description = `Читать молитву "${prayer.title}" онлайн. Оригинальный текст и современный русский перевод.`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": prayer.title,
        "description": description,
        "author": {
            "@type": "Organization",
            "name": "Православный молитвослов"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Православный молитвослов"
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
        }
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
                "name": prayer.category,
                "item": parentUrl
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Читать",
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

            <div className="read-page">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Навигация">
                    <ol>
                        <li><a href="/">Главная</a></li>
                        <li><a href="/molitvy/">Молитвы</a></li>
                        <li><a href={parentUrl}>{prayer.category}</a></li>
                        <li aria-current="page">Читать</li>
                    </ol>
                </nav>

                {/* Main Content */}
                <main>
                    <header className="page-header">
                        <h1>{prayer.title}</h1>
                        <p className="lead">Читать молитву онлайн с удобной разметкой</p>
                    </header>

                    {/* Navigation between versions */}
                    <nav className="version-nav">
                        <div className="version-tabs">
                            <a href={canonicalUrl} className="tab active">Читать</a>
                            <a href={`${parentUrl}slushat/`} className="tab">Слушать</a>
                            <a href={`${parentUrl}tekst-polnostyu/`} className="tab">Текст полностью</a>
                            <a href={`${parentUrl}na-russkom/`} className="tab">На русском</a>
                        </div>
                    </nav>

                    {/* Prayer Content */}
                    <section className="prayer-content">
                        {prayer.contentModern && (
                            <div className="prayer-version modern">
                                <h2>Современный русский текст</h2>
                                <div className="prayer-text modern-text">
                                    {prayer.contentModern.split('\n').map((paragraph, index) => (
                                        <p key={index} className="prayer-paragraph">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="prayer-version original">
                            <h2>Оригинальный текст</h2>
                            <div className="prayer-text original-text">
                                {prayer.content.split('\n').map((paragraph, index) => (
                                    <p key={index} className="prayer-paragraph">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* How to Read */}
                    <section className="how-to-read">
                        <h2>Как читать эту молитву</h2>
                        <div className="instructions">
                            <div className="instruction-item">
                                <h3>Время чтения</h3>
                                <p>Читайте в спокойной обстановке, когда можете сосредоточиться на словах молитвы.</p>
                            </div>
                            <div className="instruction-item">
                                <h3>Порядок</h3>
                                <p>Сначала прочитайте современный текст для понимания, затем оригинальный для духовного погружения.</p>
                            </div>
                            <div className="instruction-item">
                                <h3>Сосредоточенность</h3>
                                <p>Читайте не спеша, вникая в смысл каждого слова и фразы.</p>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <section className="prayer-actions">
                        <h2>Действия</h2>
                        <div className="action-buttons">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigator.clipboard.writeText(prayer.content)}
                            >
                                Копировать текст
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => window.print()}
                            >
                                Распечатать
                            </button>
                            <a href={`${parentUrl}tekst-polnostyu/`} className="btn btn-outline">
                                Полный текст
                            </a>
                        </div>
                    </section>

                    {/* Related */}
                    <section className="related-prayers">
                        <h2>Связанные молитвы</h2>
                        <div className="related-grid">
                            <a href={parentUrl} className="related-card">
                                <h3>Все молитвы категории</h3>
                                <p>Вернуться к списку молитв</p>
                            </a>
                            <a href="/molitvy/otche-nash/" className="related-card">
                                <h3>Отче наш</h3>
                                <p>Главная молитва христиан</p>
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};
