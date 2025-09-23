import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Часто задаваемые вопросы - Молитвы дня',
    description: 'Ответы на часто задаваемые вопросы о сайте Молитвы дня. Как пользоваться сайтом, найти нужные молитвы и получить помощь.',
    keywords: ['FAQ', 'часто задаваемые вопросы', 'помощь', 'молитвы дня', 'как пользоваться'],
    alternates: {
        canonical: '/faq',
    },
    openGraph: {
        title: 'Часто задаваемые вопросы - Молитвы дня',
        description: 'Ответы на часто задаваемые вопросы о сайте Молитвы дня. Как пользоваться сайтом, найти нужные молитвы и получить помощь.',
        url: '/faq',
        type: 'website',
    },
};

export default function FAQPage() {
    const faqs = [
        {
            question: "Как найти нужную молитву?",
            answer: "Вы можете использовать поиск в верхней части сайта или просматривать молитвы по категориям. Также доступна страница со всеми молитвами, где можно найти нужный текст."
        },
        {
            question: "Обновляется ли молитва дня?",
            answer: "Да, молитва дня обновляется ежедневно. Каждый день на главной странице появляется новая молитва для духовного размышления."
        },
        {
            question: "Можно ли сохранить молитвы в избранное?",
            answer: "Да, вы можете добавлять понравившиеся молитвы в избранное. Для этого нажмите на кнопку 'Добавить в избранное' на странице молитвы."
        },
        {
            question: "Бесплатно ли использование сайта?",
            answer: "Да, весь контент сайта полностью бесплатен. Регистрация не требуется для доступа к молитвам."
        },
        {
            question: "Можно ли поделиться молитвой с друзьями?",
            answer: "Конечно! На каждой странице молитвы есть кнопки для поделиться в социальных сетях или скопировать ссылку."
        },
        {
            question: "Работает ли сайт на мобильных устройствах?",
            answer: "Да, сайт полностью адаптирован для мобильных устройств. Вы можете комфортно читать молитвы на любом устройстве."
        },
        {
            question: "Как добавить сайт в закладки?",
            answer: "Нажмите на кнопку 'Добавить в закладки' на главной странице или странице молитвы. Система покажет инструкции для вашего браузера."
        },
        {
            question: "Откуда берутся тексты молитв?",
            answer: "Все молитвы взяты из канонических источников и проверены на соответствие православным традициям. Мы стремимся к максимальной точности текстов."
        },
        {
            question: "Можно ли использовать молитвы для печати?",
            answer: "Да, вы можете копировать тексты молитв и использовать их для личных нужд, включая печать."
        },
        {
            question: "Что делать, если нашел ошибку в тексте?",
            answer: "Если вы заметили ошибку в тексте молитвы, пожалуйста, свяжитесь с нами через контактную информацию. Мы исправим ошибку как можно скорее."
        },
        {
            question: "Есть ли молитвы на старославянском языке?",
            answer: "Да, в коллекции есть молитвы как на современном русском, так и на старославянском языке. Вы можете выбрать удобный для вас вариант."
        },
        {
            question: "Как часто обновляется коллекция молитв?",
            answer: "Коллекция молитв регулярно пополняется новыми текстами. Мы стремимся сделать доступными как можно больше православных молитв."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
                        Часто задаваемые вопросы
                    </h1>

                    <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                        {faq.question}
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 bg-blue-50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Не нашли ответ на свой вопрос?
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Если у вас есть другие вопросы или предложения, мы будем рады помочь.
                            Свяжитесь с нами, и мы постараемся ответить как можно скорее.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="/about"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                О проекте
                            </a>
                            <a
                                href="/privacy"
                                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Политика конфиденциальности
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
