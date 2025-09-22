import { notFound } from 'next/navigation';
import { Prayer } from '@/types/prayer';
import fs from 'fs';
import path from 'path';

// Генерируем статические параметры для всех молитв
export async function generateStaticParams() {
    try {
        const files = fs.readdirSync(path.join(process.cwd(), 'data', 'prayers'));
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        return jsonFiles.map(file => ({
            slug: file.replace('.json', '')
        }));
    } catch (error) {
        console.error('Ошибка генерации статических параметров:', error);
        return [];
    }
}

// Получаем молитву по URL
async function getPrayer(slug: string): Promise<Prayer | null> {
    try {
        const filePath = path.join(process.cwd(), 'data', 'prayers', `${slug}.json`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const prayer = JSON.parse(fileContents);

        if (prayer.url === slug) {
            return prayer;
        }

        return null;
    } catch (error) {
        try {
            const files = fs.readdirSync(path.join(process.cwd(), 'data', 'prayers'));
            for (const file of files) {
                if (file.endsWith('.json')) {
                    const filePath = path.join(process.cwd(), 'data', 'prayers', file);
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const prayer = JSON.parse(fileContents);

                    if (prayer.url === slug) {
                        return prayer;
                    }
                }
            }
        } catch (searchError) {
            console.error('Error searching for prayer:', searchError);
        }

        return null;
    }
}

export default async function AMPPrayerPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const prayer = await getPrayer(slug);

    if (!prayer) {
        notFound();
    }

    const description = prayer.summary?.text || prayer.content.substring(0, 160) + '...';

    return (
        <html amp="" lang="ru">
            <head>
                <meta charSet="utf-8" />
                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <title>{prayer.title} - Православная молитва | Молитвы дня</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
                <link rel="canonical" href={`https://molitvy365.ru/prayer/${prayer.url}`} />

                {/* AMP Boilerplate */}
                <style amp-boilerplate>
                    {`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}
                </style>
                <noscript>
                    <style amp-boilerplate>
                        {`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}
                    </style>
                </noscript>

                {/* Custom Styles */}
                <style amp-custom>
                    {`
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            margin: 0;
                            padding: 20px;
                            background: #f8f9fa;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background: white;
                            padding: 30px;
                            border-radius: 8px;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        h1 {
                            color: #8B5CF6;
                            margin-bottom: 20px;
                            font-size: 24px;
                        }
                        .prayer-content {
                            white-space: pre-line;
                            font-size: 16px;
                            line-height: 1.8;
                            margin-bottom: 30px;
                        }
                        .modern-content {
                            white-space: pre-line;
                            font-size: 16px;
                            line-height: 1.8;
                            color: #666;
                            margin-bottom: 30px;
                            padding: 20px;
                            background: #f8f9fa;
                            border-radius: 6px;
                        }
                        .summary {
                            background: #e9ecef;
                            padding: 20px;
                            border-radius: 6px;
                            margin-bottom: 20px;
                        }
                        .tags {
                            margin-top: 15px;
                        }
                        .tag {
                            display: inline-block;
                            background: #8B5CF6;
                            color: white;
                            padding: 4px 8px;
                            margin: 2px;
                            border-radius: 4px;
                            font-size: 12px;
                        }
                        .back-link {
                            display: inline-block;
                            background: #8B5CF6;
                            color: white;
                            padding: 12px 24px;
                            text-decoration: none;
                            border-radius: 6px;
                            margin-top: 20px;
                        }
                    `}
                </style>
            </head>
            <body>
                <div className="container">
                    <h1>{prayer.title}</h1>

                    <div className="prayer-content">
                        {prayer.content}
                    </div>

                    {prayer.contentModern && (
                        <div>
                            <h2>Современный перевод</h2>
                            <div className="modern-content">
                                {prayer.contentModern}
                            </div>
                        </div>
                    )}

                    <div className="summary">
                        <h3>Описание молитвы</h3>
                        <p>{prayer.summary?.text || 'Православная молитва для духовного чтения и молитвенной практики.'}</p>

                        {prayer.summary?.tags && (
                            <div className="tags">
                                {prayer.summary.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    <a href="https://molitvy365.ru" className="back-link">
                        Больше молитв на сайте
                    </a>
                </div>
            </body>
        </html>
    );
}
