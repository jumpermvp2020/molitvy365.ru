import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Молитва Господня — текст и объяснение',
    description: 'Отче наш — главная молитва христиан',
};

export default function PrayerPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Молитва Господня
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                    Эта молитва входит в состав утреннего молитвенного правила православного христианина.
                </p>

                {/* Текст молитвы */}
                <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Текст молитвы</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">На современном русском языке</h3>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                                    Отче наш, Иже еси на небесех! пусть святится имя Твое, пусть приидет Царствие Твое, пусть будет воля Твоя, ибо на небеси и на земли. Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим; и не введи нас во искушение, но избавь нас от лукаваго.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Оригинальный текст</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли. Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим; и не введи нас во искушение, но избави нас от лукаваго.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Зачем читать эту молитву</h2>
                    <p className="text-gray-600">
                        Укрепляет внутренний мир, выстраивает приоритеты дня, помогает избегать суеты и принимать решения в свете Евангелия.
                    </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Когда читать</h2>
                    <p className="text-gray-600">
                        Каждое утро, сразу после пробуждения и умывания. Если времени мало, допустимо прочитать краткую часть.
                    </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Как правильно читать</h2>
                    <ol className="space-y-2">
                        <li className="flex items-start gap-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                1
                            </span>
                            <span className="text-gray-600">Найдите тихое место, поставьте телефон в режим «Не беспокоить».</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                2
                            </span>
                            <span className="text-gray-600">Встаньте к иконе (если есть), осените себя крестным знамением.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                3
                            </span>
                            <span className="text-gray-600">Читайте размеренно, вслух или вполголоса; внимание держите на смысле слов.</span>
                        </li>
                    </ol>
                </div>

                <div className="mt-8 text-center">
                    <a
                        href="/molitvy/utrennie/"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
                    >
                        ← Вернуться к утренним молитвам
                    </a>
                </div>
            </div>
        </div>
    );
}
