import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Политика конфиденциальности - Молитвы дня',
    description: 'Политика конфиденциальности сайта Молитвы дня. Информация о сборе, использовании и защите персональных данных.',
    keywords: ['политика конфиденциальности', 'защита данных', 'персональные данные', 'молитвы дня'],
    alternates: {
        canonical: '/privacy',
    },
    openGraph: {
        title: 'Политика конфиденциальности - Молитвы дня',
        description: 'Политика конфиденциальности сайта Молитвы дня. Информация о сборе, использовании и защите персональных данных.',
        url: '/privacy',
        type: 'website',
    },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
                        Политика конфиденциальности
                    </h1>

                    <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Общие положения</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Настоящая Политика конфиденциальности определяет порядок обработки персональных данных
                                пользователей сайта «Молитвы дня» (далее — Сайт). Использование Сайта означает согласие
                                пользователя с настоящей Политикой конфиденциальности.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Сбор персональных данных</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Мы собираем следующие типы информации:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Техническая информация (IP-адрес, тип браузера, операционная система)</li>
                                <li>Информация о посещениях страниц и времени на сайте</li>
                                <li>Данные, предоставленные пользователем добровольно</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Использование персональных данных</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Персональные данные используются для:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Предоставления доступа к контенту сайта</li>
                                <li>Анализа посещаемости и улучшения функциональности</li>
                                <li>Обеспечения безопасности сайта</li>
                                <li>Соблюдения требований законодательства</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Защита персональных данных</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Мы принимаем все необходимые меры для защиты персональных данных от несанкционированного
                                доступа, изменения, раскрытия или уничтожения. Используются современные методы шифрования
                                и защиты информации.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Передача данных третьим лицам</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных
                                законодательством или с явного согласия пользователя.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Сайт использует файлы cookies для улучшения пользовательского опыта и анализа посещаемости.
                                Пользователь может отключить cookies в настройках браузера.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Изменения в Политике конфиденциальности</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности.
                                Актуальная версия всегда доступна на данной странице.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Контактная информация</h2>
                            <p className="text-gray-700 leading-relaxed">
                                По вопросам, связанным с обработкой персональных данных, вы можете обратиться к нам
                                через контактную информацию, указанную на сайте.
                            </p>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
