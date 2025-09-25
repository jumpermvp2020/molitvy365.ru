import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Молитва мытаря — текст и объяснение',
    description: 'Краткая покаянная молитва из притчи о мытаре',
};

export default function PrayerPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Молитва мытаря
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                    Краткая покаянная молитва из притчи о мытаре (Лк 18:13): «Боже, милостив будь мне, грешному». Сильная «стрела‑молитва» на каждый день.
                </p>

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
