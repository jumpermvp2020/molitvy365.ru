import Link from 'next/link';

interface SaintEntityTemplateProps {
    saint: {
        id: string;
        name: string;
        description: string;
        prayers: Array<{
            id: string;
            title: string;
            content: string;
            contentModern?: string;
            intent?: string;
        }>;
        lifeStory: string;
        miracles: string[];
        whenToPray: string[];
    };
    canonicalUrl: string;
}

export const SaintEntityTemplate: React.FC<SaintEntityTemplateProps> = ({
    saint,
    canonicalUrl
}) => {
    const title = `Молитвы к ${saint.name}`;
    const description = `Молитвы к святому ${saint.name}. ${saint.description}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
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
                "name": "Святые",
                "item": "/svyatye/"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": saint.name,
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

            <div className="saint-entity-page">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Навигация">
                    <ol>
                        <li><Link href="/">Главная</Link></li>
                        <li><a href="/svyatye/">Святые</a></li>
                        <li aria-current="page">{saint.name}</li>
                    </ol>
                </nav>

                {/* Main Content */}
                <main>
                    <header className="page-header">
                        <h1>Молитвы к {saint.name}</h1>
                        <p className="lead">{saint.description}</p>
                    </header>

                    {/* Saint Info */}
                    <section className="saint-info">
                        <h2>О святом {saint.name}</h2>
                        <div className="saint-story">
                            <p>{saint.lifeStory}</p>
                        </div>
                    </section>

                    {/* When to Pray */}
                    <section className="when-to-pray">
                        <h2>Когда молиться святому {saint.name}</h2>
                        <ul className="when-list">
                            {saint.whenToPray.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Prayers by Intent */}
                    <section className="prayers-by-intent">
                        <h2>Молитвы к святому {saint.name}</h2>
                        <div className="intent-tabs">
                            <button className="tab active" data-intent="all">Все молитвы</button>
                            {saint.prayers
                                .filter(prayer => prayer.intent)
                                .map((prayer, index) => (
                                    <button key={index} className="tab" data-intent={prayer.intent}>
                                        {prayer.intent}
                                    </button>
                                ))}
                        </div>

                        <div className="prayers-grid">
                            {saint.prayers.map((prayer) => (
                                <div key={prayer.id} className="prayer-card" data-intent={prayer.intent || 'all'}>
                                    <h3>{prayer.title}</h3>
                                    {prayer.intent && (
                                        <span className="prayer-intent">{prayer.intent}</span>
                                    )}
                                    <div className="prayer-preview">
                                        {prayer.content.split('\n').slice(0, 3).map((paragraph, index) => (
                                            <p key={index} className="preview-paragraph">
                                                {paragraph}
                                            </p>
                                        ))}
                                        {prayer.content.split('\n').length > 3 && (
                                            <p className="more-text">...</p>
                                        )}
                                    </div>
                                    <div className="prayer-actions">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                // Здесь можно добавить модальное окно с полным текстом
                                                console.log('Show full prayer:', prayer.id);
                                            }}
                                        >
                                            Читать полностью
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => navigator.clipboard.writeText(prayer.content)}
                                        >
                                            Копировать
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Miracles */}
                    <section className="miracles-section">
                        <h2>Чудеса святого {saint.name}</h2>
                        <div className="miracles-list">
                            {saint.miracles.map((miracle, index) => (
                                <div key={index} className="miracle-item">
                                    <p>{miracle}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* How to Pray */}
                    <section className="how-to-pray">
                        <h2>Как молиться святому {saint.name}</h2>
                        <div className="prayer-instructions">
                            <div className="instruction-item">
                                <h3>Подготовка</h3>
                                <p>Найдите тихое место, зажгите свечу перед иконой святого, если она есть.</p>
                            </div>
                            <div className="instruction-item">
                                <h3>Сосредоточенность</h3>
                                <p>Сосредоточьтесь на просьбе, которую хотите передать святому.</p>
                            </div>
                            <div className="instruction-item">
                                <h3>Искренность</h3>
                                <p>Молитесь от всего сердца, веря в помощь святого.</p>
                            </div>
                            <div className="instruction-item">
                                <h3>Благодарность</h3>
                                <p>Не забывайте благодарить святого за помощь и заступничество.</p>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="faq-section">
                        <h2>Часто задаваемые вопросы</h2>
                        <div className="faq-list">
                            <details className="faq-item">
                                <summary>Когда молиться святому {saint.name}?</summary>
                                <p>{saint.whenToPray.join(' ')}</p>
                            </details>
                            <details className="faq-item">
                                <summary>Как молиться святому {saint.name}?</summary>
                                <p>Молитесь искренне, с верой в помощь святого. Можно читать готовые молитвы или обращаться своими словами.</p>
                            </details>
                            <details className="faq-item">
                                <summary>Помогает ли святой {saint.name}?</summary>
                                <p>Святые помогают тем, кто обращается к ним с верой и искренностью. Многие верующие получают помощь по молитвам к этому святому.</p>
                            </details>
                            <details className="faq-item">
                                <summary>Нужна ли икона святого для молитвы?</summary>
                                <p>Икона помогает сосредоточиться, но не обязательна. Главное - искренняя молитва и вера.</p>
                            </details>
                        </div>
                    </section>

                    {/* Related Saints */}
                    <section className="related-saints">
                        <h2>Другие святые</h2>
                        <div className="related-grid">
                            <a href="/svyatye/nikolaj-chudotvorets/molitvy/" className="related-card">
                                <h3>Николай Чудотворец</h3>
                                <p>Помощник в любых нуждах</p>
                            </a>
                            <a href="/svyatye/matrona-moskovskaya/molitvy/" className="related-card">
                                <h3>Матрона Московская</h3>
                                <p>Заступница за больных и страждущих</p>
                            </a>
                            <a href="/svyatye/arhangel-mihail/molitvy/" className="related-card">
                                <h3>Архангел Михаил</h3>
                                <p>Защитник от зла и нечистых духов</p>
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};
