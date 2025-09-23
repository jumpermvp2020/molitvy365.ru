import React from 'react';

interface TextFullTemplateProps {
    prayer: {
        id: string;
        title: string;
        content: string;
        category: string;
    };
    canonicalUrl: string;
    parentUrl: string;
}

export const TextFullTemplate: React.FC<TextFullTemplateProps> = ({
    prayer,
    canonicalUrl,
    parentUrl
}) => {
    const title = `${prayer.title} — текст полностью`;
    const description = `Полный текст молитвы "${prayer.title}" для копирования и печати. Чистый текст без отвлечений.`;

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
                "name": "Текст полностью",
                "item": canonicalUrl
            }
        ]
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText(prayer.content);
        // Можно добавить уведомление об успешном копировании
    };

    const handlePrint = () => {
        window.print();
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

            <div className="text-full-page">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Навигация">
                    <ol>
                        <li><a href="/">Главная</a></li>
                        <li><a href="/molitvy/">Молитвы</a></li>
                        <li><a href={parentUrl}>{prayer.category}</a></li>
                        <li aria-current="page">Текст полностью</li>
                    </ol>
                </nav>

                {/* Main Content */}
                <main>
                    <header className="page-header">
                        <h1>{prayer.title}</h1>
                        <p className="lead">Полный текст для копирования и печати</p>
                    </header>

                    {/* Navigation between versions */}
                    <nav className="version-nav">
                        <div className="version-tabs">
                            <a href={`${parentUrl}chitat/`} className="tab">Читать</a>
                            <a href={`${parentUrl}slushat/`} className="tab">Слушать</a>
                            <a href={canonicalUrl} className="tab active">Текст полностью</a>
                            <a href={`${parentUrl}na-russkom/`} className="tab">На русском</a>
                        </div>
                    </nav>

                    {/* Quick Actions */}
                    <section className="quick-actions">
                        <div className="action-buttons">
                            <button
                                className="btn btn-primary"
                                onClick={handleCopyText}
                            >
                                📋 Копировать текст
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={handlePrint}
                            >
                                🖨️ Распечатать
                            </button>
                            <button className="btn btn-outline" disabled>
                                📄 Скачать PDF
                            </button>
                        </div>
                    </section>

                    {/* Full Text */}
                    <section className="full-text-section">
                        <div className="text-container">
                            <div className="prayer-text-full">
                                {prayer.content.split('\n').map((paragraph, index) => (
                                    <p key={index} className="text-paragraph">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Text Info */}
                    <section className="text-info">
                        <h2>О тексте</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <h3>Количество символов</h3>
                                <p>{prayer.content.length}</p>
                            </div>
                            <div className="info-item">
                                <h3>Количество слов</h3>
                                <p>{prayer.content.split(/\s+/).length}</p>
                            </div>
                            <div className="info-item">
                                <h3>Время чтения</h3>
                                <p>~{Math.ceil(prayer.content.split(/\s+/).length / 200)} мин</p>
                            </div>
                        </div>
                    </section>

                    {/* Usage Tips */}
                    <section className="usage-tips">
                        <h2>Как использовать этот текст</h2>
                        <div className="tips-grid">
                            <div className="tip-item">
                                <h3>📱 На телефоне</h3>
                                <p>Скопируйте текст и сохраните в заметках для чтения в любое время</p>
                            </div>
                            <div className="tip-item">
                                <h3>🖨️ Для печати</h3>
                                <p>Распечатайте текст для чтения без экрана, особенно перед сном</p>
                            </div>
                            <div className="tip-item">
                                <h3>📚 В молитвослове</h3>
                                <p>Добавьте в личный молитвослов или поделитесь с близкими</p>
                            </div>
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
                            <a href={`${parentUrl}chitat/`} className="related-card">
                                <h3>Читать с разметкой</h3>
                                <p>Удобная версия для чтения</p>
                            </a>
                            <a href="/molitvy/otche-nash/tekst-polnostyu/" className="related-card">
                                <h3>Отче наш — текст</h3>
                                <p>Полный текст главной молитвы</p>
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};
