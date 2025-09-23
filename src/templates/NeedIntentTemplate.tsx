import React from 'react';

interface NeedIntentTemplateProps {
    intent: {
        id: string;
        title: string;
        description: string;
        prayers: Array<{
            id: string;
            title: string;
            content: string;
            contentModern?: string;
        }>;
        context: string;
        whenToRead: string[];
        howToRead: string[];
    };
    canonicalUrl: string;
}

export const NeedIntentTemplate: React.FC<NeedIntentTemplateProps> = ({
    intent,
    canonicalUrl
}) => {
    const title = `${intent.title} — молитвы для этой ситуации`;
    const description = `Молитвы ${intent.title.toLowerCase()}. ${intent.description}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Когда читать молитвы ${intent.title.toLowerCase()}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": intent.whenToRead.join(' ')
                }
            },
            {
                "@type": "Question",
                "name": `Как читать молитвы ${intent.title.toLowerCase()}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": intent.howToRead.join(' ')
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
                "name": intent.title,
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

            <div className="need-intent-page">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Навигация">
                    <ol>
                        <li><a href="/">Главная</a></li>
                        <li><a href="/molitvy/">Молитвы</a></li>
                        <li aria-current="page">{intent.title}</li>
                    </ol>
                </nav>

                {/* Main Content */}
                <main>
                    <header className="page-header">
                        <h1>{intent.title}</h1>
                        <p className="lead">{intent.description}</p>
                    </header>

                    {/* Context */}
                    <section className="context-section">
                        <h2>О ситуации</h2>
                        <div className="context-content">
                            <p>{intent.context}</p>
                        </div>
                    </section>

                    {/* When to Read */}
                    <section className="when-to-read">
                        <h2>Когда читать эти молитвы</h2>
                        <ul className="when-list">
                            {intent.whenToRead.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Prayers */}
                    <section className="prayers-section">
                        <h2>Молитвы для этой ситуации</h2>
                        <div className="prayers-grid">
                            {intent.prayers.map((prayer) => (
                                <div key={prayer.id} className="prayer-card">
                                    <h3>{prayer.title}</h3>
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

                    {/* How to Read */}
                    <section className="how-to-read">
                        <h2>Как читать эти молитвы</h2>
                        <div className="instructions">
                            {intent.howToRead.map((instruction, index) => (
                                <div key={index} className="instruction-item">
                                    <p>{instruction}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quick Prayer */}
                    <section className="quick-prayer">
                        <h2>Краткая молитва</h2>
                        <div className="quick-prayer-content">
                            <p>Если у вас мало времени, можете прочитать краткую молитву:</p>
                            <div className="short-prayer">
                                <p>"Господи, помилуй!"</p>
                                <p>Повторите 3 раза, сосредоточившись на просьбе о помощи.</p>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="faq-section">
                        <h2>Часто задаваемые вопросы</h2>
                        <div className="faq-list">
                            <details className="faq-item">
                                <summary>Когда читать молитвы {intent.title.toLowerCase()}?</summary>
                                <p>{intent.whenToRead.join(' ')}</p>
                            </details>
                            <details className="faq-item">
                                <summary>Как читать молитвы {intent.title.toLowerCase()}?</summary>
                                <p>{intent.howToRead.join(' ')}</p>
                            </details>
                            <details className="faq-item">
                                <summary>Сколько раз нужно читать молитву?</summary>
                                <p>Читайте столько раз, сколько чувствуете необходимость. Главное - искренность и сосредоточенность.</p>
                            </details>
                            <details className="faq-item">
                                <summary>Можно ли читать молитвы своими словами?</summary>
                                <p>Да, можно. Главное - обращаться к Богу с искренним сердцем и верой.</p>
                            </details>
                        </div>
                    </section>

                    {/* Related Situations */}
                    <section className="related-situations">
                        <h2>Похожие ситуации</h2>
                        <div className="related-grid">
                            <a href="/molitvy/o-zdravii/" className="related-card">
                                <h3>Молитвы о здравии</h3>
                                <p>Для здоровья и исцеления</p>
                            </a>
                            <a href="/molitvy/o-detyah/" className="related-card">
                                <h3>Молитвы о детях</h3>
                                <p>Для защиты и благополучия детей</p>
                            </a>
                            <a href="/molitvy/v-puteshestvii/" className="related-card">
                                <h3>Молитвы в путешествии</h3>
                                <p>Для безопасной дороги</p>
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};
