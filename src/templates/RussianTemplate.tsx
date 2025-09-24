import Link from 'next/link';

interface RussianTemplateProps {
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

export const RussianTemplate: React.FC<RussianTemplateProps> = ({
    prayer,
    canonicalUrl,
    parentUrl
}) => {
    const title = `${prayer.title} — на русском языке`;
    const description = `Молитва "${prayer.title}" на современном русском языке. Адаптированный текст для лучшего понимания.`;

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
                "name": "На русском",
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

            <div className="russian-page">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Навигация">
                    <ol>
                        <li><Link href="/">Главная</Link></li>
                        <li><a href="/molitvy/">Молитвы</a></li>
                        <li><a href={parentUrl}>{prayer.category}</a></li>
                        <li aria-current="page">На русском</li>
                    </ol>
                </nav>

                {/* Main Content */}
                <main>
                    <header className="page-header">
                        <h1>{prayer.title}</h1>
                        <p className="lead">На современном русском языке</p>
                    </header>

                    {/* Navigation between versions */}
                    <nav className="version-nav">
                        <div className="version-tabs">
                            <a href={`${parentUrl}chitat/`} className="tab">Читать</a>
                            <a href={`${parentUrl}tekst-polnostyu/`} className="tab">Текст полностью</a>
                            <a href={canonicalUrl} className="tab active">На русском</a>
                        </div>
                    </nav>

                    {/* Modern Russian Text */}
                    <section className="modern-text-section">
                        <h2>Современный русский текст</h2>
                        <div className="text-explanation">
                            <p>Этот текст адаптирован для современного понимания, сохраняя духовный смысл оригинальной молитвы.</p>
                        </div>

                        {prayer.contentModern ? (
                            <div className="modern-text">
                                {prayer.contentModern.split('\n').map((paragraph, index) => (
                                    <p key={index} className="modern-paragraph">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <div className="modern-text">
                                <p className="no-modern-text">
                                    Современный русский перевод пока недоступен.
                                    <a href={`${parentUrl}chitat/`}>Читайте оригинальный текст</a>.
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Original Text for Comparison */}
                    <section className="original-comparison">
                        <h2>Оригинальный текст</h2>
                        <details className="original-details">
                            <summary>Показать оригинальный текст для сравнения</summary>
                            <div className="original-text">
                                {prayer.content.split('\n').map((paragraph, index) => (
                                    <p key={index} className="original-paragraph">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </details>
                    </section>

                    {/* Word Explanations */}
                    <section className="word-explanations">
                        <h2>Пояснения к словам</h2>
                        <div className="explanations-grid">
                            <div className="explanation-item">
                                <h3>Церковнославянские слова</h3>
                                <p>В оригинальном тексте используются слова церковнославянского языка, которые могут быть непонятны современному читателю.</p>
                            </div>
                            <div className="explanation-item">
                                <h3>Современный перевод</h3>
                                <p>Адаптированный текст передает тот же духовный смысл, но использует понятные современному человеку слова.</p>
                            </div>
                        </div>
                    </section>

                    {/* How to Use */}
                    <section className="how-to-use">
                        <h2>Как использовать этот текст</h2>
                        <div className="usage-instructions">
                            <div className="instruction-item">
                                <h3>Для начинающих</h3>
                                <p>Начните с современного текста для понимания смысла, затем переходите к оригиналу.</p>
                            </div>
                            <div className="instruction-item">
                                <h3>Для изучения</h3>
                                <p>Сравнивайте оба текста, чтобы лучше понять церковную традицию.</p>
                            </div>
                            <div className="instruction-item">
                                <h3>Для молитвы</h3>
                                <p>Выбирайте тот вариант, который помогает вам лучше сосредоточиться на молитве.</p>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <section className="text-actions">
                        <h2>Действия</h2>
                        <div className="action-buttons">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigator.clipboard.writeText(prayer.contentModern || prayer.content)}
                            >
                                📋 Копировать текст
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => window.print()}
                            >
                                🖨️ Распечатать
                            </button>
                            <a href={`${parentUrl}chitat/`} className="btn btn-outline">
                                Читать с разметкой
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
                            <a href={`${parentUrl}chitat/`} className="related-card">
                                <h3>Читать с разметкой</h3>
                                <p>Удобная версия для чтения</p>
                            </a>
                            <a href="/molitvy/otche-nash/na-russkom/" className="related-card">
                                <h3>Отче наш — на русском</h3>
                                <p>Современный перевод главной молитвы</p>
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};
