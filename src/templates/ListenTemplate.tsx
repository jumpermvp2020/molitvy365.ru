import React from 'react';

interface ListenTemplateProps {
    prayer: {
        id: string;
        title: string;
        content: string;
        category: string;
    };
    canonicalUrl: string;
    parentUrl: string;
}

export const ListenTemplate: React.FC<ListenTemplateProps> = ({
    prayer,
    canonicalUrl,
    parentUrl
}) => {
    const title = `${prayer.title} — слушать онлайн`;
    const description = `Слушать молитву "${prayer.title}" онлайн. Аудио версии и плейлисты для духовного прослушивания.`;

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
                "name": "Слушать",
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

            <div className="listen-page">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Навигация">
                    <ol>
                        <li><a href="/">Главная</a></li>
                        <li><a href="/molitvy/">Молитвы</a></li>
                        <li><a href={parentUrl}>{prayer.category}</a></li>
                        <li aria-current="page">Слушать</li>
                    </ol>
                </nav>

                {/* Main Content */}
                <main>
                    <header className="page-header">
                        <h1>{prayer.title}</h1>
                        <p className="lead">Слушать молитву онлайн</p>
                    </header>

                    {/* Navigation between versions */}
                    <nav className="version-nav">
                        <div className="version-tabs">
                            <a href={`${parentUrl}chitat/`} className="tab">Читать</a>
                            <a href={canonicalUrl} className="tab active">Слушать</a>
                            <a href={`${parentUrl}tekst-polnostyu/`} className="tab">Текст полностью</a>
                            <a href={`${parentUrl}na-russkom/`} className="tab">На русском</a>
                        </div>
                    </nav>

                    {/* Audio Player Section */}
                    <section className="audio-section">
                        <h2>Аудио версии</h2>

                        {/* Placeholder for audio player */}
                        <div className="audio-player-placeholder">
                            <div className="player-info">
                                <h3>Аудио плеер</h3>
                                <p>Здесь будет размещен аудио плеер для прослушивания молитвы</p>
                                <div className="player-controls">
                                    <button className="btn btn-primary" disabled>
                                        ▶️ Воспроизвести
                                    </button>
                                    <span className="duration">--:--</span>
                                </div>
                            </div>
                        </div>

                        {/* Audio Playlist */}
                        <div className="audio-playlist">
                            <h3>Доступные версии</h3>
                            <ul className="playlist">
                                <li className="playlist-item">
                                    <span className="track-title">Классическое исполнение</span>
                                    <span className="track-duration">--:--</span>
                                    <button className="btn btn-sm" disabled>▶️</button>
                                </li>
                                <li className="playlist-item">
                                    <span className="track-title">Оптина пустынь</span>
                                    <span className="track-duration">--:--</span>
                                    <button className="btn btn-sm" disabled>▶️</button>
                                </li>
                                <li className="playlist-item">
                                    <span className="track-title">Мужской хор</span>
                                    <span className="track-duration">--:--</span>
                                    <button className="btn btn-sm" disabled>▶️</button>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Text Transcript */}
                    <section className="transcript-section">
                        <h2>Текст молитвы</h2>
                        <div className="transcript-text">
                            {prayer.content.split('\n').map((paragraph, index) => (
                                <p key={index} className="transcript-paragraph">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </section>

                    {/* How to Listen */}
                    <section className="how-to-listen">
                        <h2>Как слушать молитвы</h2>
                        <div className="instructions">
                            <div className="instruction-item">
                                <h3>Сосредоточенность</h3>
                                <p>Найдите тихое место, где вас не будут отвлекать. Закройте глаза и сосредоточьтесь на словах.</p>
                            </div>
                            <div className="instruction-item">
                                <h3>Повторное прослушивание</h3>
                                <p>Слушайте молитву несколько раз, чтобы лучше понять и запомнить слова.</p>
                            </div>
                            <div className="instruction-item">
                                <h3>Совместная молитва</h3>
                                <p>Можете повторять слова молитвы вместе с аудио для лучшего запоминания.</p>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <section className="audio-actions">
                        <h2>Действия</h2>
                        <div className="action-buttons">
                            <button className="btn btn-primary" disabled>
                                📱 Скачать на телефон
                            </button>
                            <button className="btn btn-secondary" disabled>
                                💾 Скачать MP3
                            </button>
                            <a href={`${parentUrl}chitat/`} className="btn btn-outline">
                                Читать текст
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
                            <a href="/molitvy/otche-nash/slushat/" className="related-card">
                                <h3>Отче наш — слушать</h3>
                                <p>Аудио версия главной молитвы</p>
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};
