import React from 'react';

interface InternalLinkingProps {
    currentPage: {
        type: 'pillar' | 'read' | 'text-full' | 'russian' | 'situational' | 'saint';
        url: string;
        category?: string;
        parentUrl?: string;
    };
    relatedPages?: Array<{
        title: string;
        url: string;
        description: string;
        type?: 'related' | 'sister' | 'parent' | 'child';
    }>;
}

export const InternalLinking: React.FC<InternalLinkingProps> = ({
    currentPage,
    relatedPages = []
}) => {
    const getSisterLinks = () => {
        if (!currentPage.parentUrl) return [];

        const sisterLinks = [];

        switch (currentPage.type) {
            case 'read':
                sisterLinks.push(
                    { title: 'Текст полностью', url: `${currentPage.parentUrl}tekst-polnostyu/`, description: 'Чистый текст для копирования' },
                    { title: 'На русском', url: `${currentPage.parentUrl}na-russkom/`, description: 'Современный перевод' }
                );
                break;
            case 'text-full':
                sisterLinks.push(
                    { title: 'Читать', url: `${currentPage.parentUrl}chitat/`, description: 'Удобная версия для чтения' },
                    { title: 'На русском', url: `${currentPage.parentUrl}na-russkom/`, description: 'Современный перевод' }
                );
                break;
            case 'russian':
                sisterLinks.push(
                    { title: 'Читать', url: `${currentPage.parentUrl}chitat/`, description: 'Удобная версия для чтения' },
                    { title: 'Текст полностью', url: `${currentPage.parentUrl}tekst-polnostyu/`, description: 'Чистый текст для копирования' }
                );
                break;
        }

        return sisterLinks;
    };

    const getParentLink = () => {
        if (currentPage.type === 'pillar') return null;

        return {
            title: currentPage.category || 'Все молитвы',
            url: currentPage.parentUrl || '/molitvy/',
            description: 'Вернуться к списку молитв'
        };
    };

    const getDefaultRelatedPages = () => {
        const defaultRelated = [
            { title: 'Отче наш', url: '/molitvy/otche-nash/', description: 'Главная молитва христиан' },
            { title: 'Символ веры', url: '/molitvy/simvol-very/', description: 'Исповедание православной веры' }
        ];

        // Добавляем специфичные связанные страницы в зависимости от категории
        if (currentPage.category === 'Утренние молитвы') {
            defaultRelated.unshift(
                { title: 'Вечерние молитвы', url: '/molitvy/vechernie/', description: 'Молитвы перед сном' }
            );
        } else if (currentPage.category === 'Вечерние молитвы') {
            defaultRelated.unshift(
                { title: 'Утренние молитвы', url: '/molitvy/utrennie/', description: 'Молитвы для начала дня' }
            );
        }

        return defaultRelated;
    };

    const sisterLinks = getSisterLinks();
    const parentLink = getParentLink();
    const defaultRelated = getDefaultRelatedPages();
    const allRelatedPages = [...relatedPages, ...defaultRelated];

    return (
        <div className="internal-linking">
            {/* Sister Links - ссылки на другие версии той же молитвы */}
            {sisterLinks.length > 0 && (
                <section className="sister-links">
                    <h2>Другие версии</h2>
                    <div className="sister-links-grid">
                        {sisterLinks.map((link, index) => (
                            <a key={index} href={link.url} className="sister-link-card">
                                <h3>{link.title}</h3>
                                <p>{link.description}</p>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* Parent Link - ссылка на родительскую страницу */}
            {parentLink && (
                <section className="parent-link">
                    <h2>Вернуться</h2>
                    <a href={parentLink.url} className="parent-link-card">
                        <h3>← {parentLink.title}</h3>
                        <p>{parentLink.description}</p>
                    </a>
                </section>
            )}

            {/* Related Pages - связанные молитвы */}
            {allRelatedPages.length > 0 && (
                <section className="related-pages">
                    <h2>Связанные молитвы</h2>
                    <div className="related-pages-grid">
                        {allRelatedPages.slice(0, 6).map((page, index) => (
                            <a key={index} href={page.url} className="related-page-card">
                                <h3>{page.title}</h3>
                                <p>{page.description}</p>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* Contextual Links - контекстные ссылки в зависимости от типа страницы */}
            {currentPage.type === 'situational' && (
                <section className="contextual-links">
                    <h2>Похожие ситуации</h2>
                    <div className="contextual-links-grid">
                        <a href="/molitvy/o-zdravii/" className="contextual-link-card">
                            <h3>Молитвы о здравии</h3>
                            <p>Для здоровья и исцеления</p>
                        </a>
                        <a href="/molitvy/o-detyah/" className="contextual-link-card">
                            <h3>Молитвы о детях</h3>
                            <p>Для защиты и благополучия детей</p>
                        </a>
                        <a href="/molitvy/v-puteshestvii/" className="contextual-link-card">
                            <h3>Молитвы в путешествии</h3>
                            <p>Для безопасной дороги</p>
                        </a>
                    </div>
                </section>
            )}

            {currentPage.type === 'saint' && (
                <section className="contextual-links">
                    <h2>Другие святые</h2>
                    <div className="contextual-links-grid">
                        <a href="/svyatye/nikolaj-chudotvorets/molitvy/" className="contextual-link-card">
                            <h3>Николай Чудотворец</h3>
                            <p>Помощник в любых нуждах</p>
                        </a>
                        <a href="/svyatye/matrona-moskovskaya/molitvy/" className="contextual-link-card">
                            <h3>Матрона Московская</h3>
                            <p>Заступница за больных и страждущих</p>
                        </a>
                        <a href="/svyatye/arhangel-mihail/molitvy/" className="contextual-link-card">
                            <h3>Архангел Михаил</h3>
                            <p>Защитник от зла и нечистых духов</p>
                        </a>
                    </div>
                </section>
            )}
        </div>
    );
};

// Компонент для навигации между версиями (табы)
export const VersionNavigation: React.FC<{
    currentType: 'read' | 'text-full' | 'russian';
    parentUrl: string;
}> = ({ currentType, parentUrl }) => {
    const tabs = [
        { type: 'read', title: 'Читать', url: `${parentUrl}chitat/` },
        { type: 'text-full', title: 'Текст полностью', url: `${parentUrl}tekst-polnostyu/` },
        { type: 'russian', title: 'На русском', url: `${parentUrl}na-russkom/` }
    ];

    return (
        <nav className="version-navigation" aria-label="Навигация между версиями">
            <div className="version-tabs">
                {tabs.map((tab) => (
                    <a
                        key={tab.type}
                        href={tab.url}
                        className={`version-tab ${currentType === tab.type ? 'active' : ''}`}
                        aria-current={currentType === tab.type ? 'page' : undefined}
                    >
                        {tab.title}
                    </a>
                ))}
            </div>
        </nav>
    );
};

// Компонент для хлебных крошек
export const Breadcrumbs: React.FC<{
    items: Array<{ name: string; url?: string }>;
}> = ({ items }) => {
    return (
        <nav className="breadcrumbs" aria-label="Навигация">
            <ol>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.url && index < items.length - 1 ? (
                            <a href={item.url}>{item.name}</a>
                        ) : (
                            <span aria-current="page">{item.name}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
