import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'О нас - Молитвы дня',
    description: 'Узнайте больше о проекте Молитвы дня. Наша миссия - предоставить доступ к православным молитвам для ежедневного духовного чтения.',
    keywords: ['о нас', 'молитвы дня', 'православные молитвы', 'духовное чтение', 'миссия'],
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'О нас - Молитвы дня',
        description: 'Узнайте больше о проекте Молитвы дня. Наша миссия - предоставить доступ к православным молитвам для ежедневного духовного чтения.',
        url: '/about',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
                        О проекте «Молитвы дня»
                    </h1>

                    <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Наша миссия</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Проект «Молитвы дня» создан с целью предоставить каждому человеку легкий доступ
                                к православным молитвам для ежедневного духовного чтения. Мы верим, что молитва
                                является основой духовной жизни и должна быть доступна каждому.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Что мы предлагаем</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">📖 Коллекция молитв</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Более 400 православных молитв, включая основные молитвы, молитвы святым,
                                        молитвы на разные случаи жизни.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">🔄 Молитва дня</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Ежедневно новая молитва для духовного размышления и молитвенной практики.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">📱 Удобный доступ</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Адаптивный дизайн для всех устройств, быстрая загрузка, удобная навигация.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">🔍 Поиск и категории</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Удобный поиск по названию и категориям молитв для быстрого нахождения нужного текста.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Наши принципы</h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 text-sm font-medium">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Точность текстов</h3>
                                        <p className="text-gray-700">Все молитвы проверены и соответствуют каноническим текстам</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 text-sm font-medium">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Доступность</h3>
                                        <p className="text-gray-700">Бесплатный доступ ко всем материалам без регистрации</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 text-sm font-medium">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Уважение к традициям</h3>
                                        <p className="text-gray-700">Соблюдение православных традиций и канонов</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 text-sm font-medium">4</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Постоянное развитие</h3>
                                        <p className="text-gray-700">Регулярное обновление и расширение коллекции молитв</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Статистика проекта</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">442</div>
                                    <div className="text-sm text-gray-600">Молитв</div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">15+</div>
                                    <div className="text-sm text-gray-600">Категорий</div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">100%</div>
                                    <div className="text-sm text-gray-600">Бесплатно</div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                                    <div className="text-sm text-gray-600">Доступ</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Как использовать сайт</h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 text-sm font-medium">✓</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Читайте молитву дня</h3>
                                        <p className="text-gray-700">На главной странице ежедневно обновляется молитва для духовного размышления</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 text-sm font-medium">✓</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Ищите нужные молитвы</h3>
                                        <p className="text-gray-700">Используйте поиск или просматривайте молитвы по категориям</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 text-sm font-medium">✓</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Сохраняйте в избранное</h3>
                                        <p className="text-gray-700">Добавляйте понравившиеся молитвы в избранное для быстрого доступа</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 text-sm font-medium">✓</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Делитесь с близкими</h3>
                                        <p className="text-gray-700">Используйте кнопки для поделиться молитвами в социальных сетях</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Контакты</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Если у вас есть вопросы, предложения или вы заметили ошибку в тексте молитвы,
                                пожалуйста, свяжитесь с нами. Мы ценим вашу обратную связь и стремимся сделать
                                проект лучше.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
