'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface PrayerCardProps {
    prayer: {
        title: string;
        overview: string;
        when_to_read: string;
        how_to_read: string[];
        why: string;
        use_cases: string[];
        duration_estimate_min: number;
        suitable_for: string[];
        short_version_hint?: string;
        pitfalls: string[];
        suggested_habits: string[];
        seo_faq: Array<{ q: string; a: string }>;
        seasonal_variations?: Array<{ period: string; note: string }>;
        slug: string;
    };
    index: number;
}

export function PrayerCard({ prayer, index }: PrayerCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prayer.title);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Ошибка копирования:', error);
        }
    };

    return (
        <div className="card-responsive">
            {/* Заголовок молитвы */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="caption-text font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {index}
                        </span>
                        <h3 className="heading-text text-gray-900">
                            {prayer.title}
                        </h3>
                    </div>
                    <p className="body-text text-gray-600 leading-relaxed">
                        {prayer.overview}
                    </p>
                </div>
                <button
                    onClick={handleCopy}
                    className="ml-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex-shrink-0"
                    title="Копировать название"
                >
                    {isCopied ? (
                        <Check className="w-5 h-5 text-green-600" />
                    ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>

            {/* Основная информация */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Когда читать */}
                <div className="bg-gradient-to-br from-[#FCE7D7] to-[#F9F5FF] rounded-xl p-4 border border-[#E5E7EB]">
                    <h4 className="caption-text font-medium text-gray-700 mb-2 uppercase tracking-wider">
                        Когда читать
                    </h4>
                    <p className="body-text text-gray-600">
                        {prayer.when_to_read}
                    </p>
                </div>

                {/* Продолжительность */}
                <div className="bg-gradient-to-br from-[#FFF8E1] to-[#FCE7D7] rounded-xl p-4 border border-[#E5E7EB]">
                    <h4 className="caption-text font-medium text-gray-700 mb-2 uppercase tracking-wider">
                        Продолжительность
                    </h4>
                    <p className="body-text text-gray-600">
                        {prayer.duration_estimate_min} минут
                    </p>
                </div>
            </div>

            {/* Зачем читать */}
            <div className="mb-6">
                <h4 className="caption-text font-medium text-gray-700 mb-3 uppercase tracking-wider">
                    Зачем читать
                </h4>
                <p className="body-text text-gray-600 leading-relaxed">
                    {prayer.why}
                </p>
            </div>

            {/* Случаи использования */}
            <div className="mb-6">
                <h4 className="caption-text font-medium text-gray-700 mb-3 uppercase tracking-wider">
                    Когда использовать
                </h4>
                <div className="flex flex-wrap gap-2">
                    {prayer.use_cases.map((useCase, index) => (
                        <span
                            key={index}
                            className="inline-block px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full border border-gray-200"
                        >
                            {useCase}
                        </span>
                    ))}
                </div>
            </div>

            {/* Подходит для */}
            <div className="mb-6">
                <h4 className="caption-text font-medium text-gray-700 mb-3 uppercase tracking-wider">
                    Подходит для
                </h4>
                <div className="flex flex-wrap gap-2">
                    {prayer.suitable_for.map((suitable, index) => (
                        <span
                            key={index}
                            className="inline-block px-3 py-1 text-sm text-gray-600 bg-blue-50 rounded-full border border-blue-200"
                        >
                            {suitable}
                        </span>
                    ))}
                </div>
            </div>

            {/* Краткая версия */}
            {prayer.short_version_hint && (
                <div className="mb-6">
                    <h4 className="caption-text font-medium text-gray-700 mb-3 uppercase tracking-wider">
                        Краткая версия
                    </h4>
                    <div className="bg-gradient-to-br from-[#F9F5FF] to-[#FFF8E1] rounded-xl p-4 border border-[#E5E7EB]">
                        <p className="body-text text-gray-600 leading-relaxed">
                            {prayer.short_version_hint}
                        </p>
                    </div>
                </div>
            )}

            {/* Кнопка развернуть/свернуть */}
            <div className="text-center">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="button-responsive inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-200 hover:shadow-sm text-sm focus-visible"
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp className="w-4 h-4" />
                            Свернуть подробности
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4" />
                            Показать подробности
                        </>
                    )}
                </button>
            </div>

            {/* Развернутая информация */}
            {isExpanded && (
                <div className="mt-6 space-y-6 pt-6 border-t border-gray-200">
                    {/* Как читать */}
                    <div>
                        <h4 className="caption-text font-medium text-gray-700 mb-3 uppercase tracking-wider">
                            Как читать
                        </h4>
                        <ol className="space-y-2">
                            {prayer.how_to_read.map((step, index) => (
                                <li key={index} className="body-text text-gray-600 flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                                        {index + 1}
                                    </span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Частые ошибки */}
                    <div>
                        <h4 className="caption-text font-medium text-gray-700 mb-3 uppercase tracking-wider">
                            Частые ошибки
                        </h4>
                        <ul className="space-y-2">
                            {prayer.pitfalls.map((pitfall, index) => (
                                <li key={index} className="body-text text-gray-600 flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                                    <span>{pitfall}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Рекомендуемые привычки */}
                    <div>
                        <h4 className="caption-text font-medium text-gray-700 mb-3 uppercase tracking-wider">
                            Рекомендуемые привычки
                        </h4>
                        <ul className="space-y-2">
                            {prayer.suggested_habits.map((habit, index) => (
                                <li key={index} className="body-text text-gray-600 flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                                    <span>{habit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Сезонные изменения */}
                    {prayer.seasonal_variations && prayer.seasonal_variations.length > 0 && (
                        <div>
                            <h4 className="caption-text font-medium text-gray-700 mb-3 uppercase tracking-wider">
                                Сезонные изменения
                            </h4>
                            <div className="space-y-3">
                                {prayer.seasonal_variations.map((variation, index) => (
                                    <div key={index} className="bg-gradient-to-br from-[#F9F5FF] to-[#FFF8E1] rounded-xl p-4 border border-[#E5E7EB]">
                                        <h5 className="body-text font-medium text-gray-800 mb-2">
                                            {variation.period}
                                        </h5>
                                        <p className="body-text text-gray-600">
                                            {variation.note}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQ */}
                    {prayer.seo_faq && prayer.seo_faq.length > 0 && (
                        <div>
                            <h4 className="caption-text font-medium text-gray-700 mb-3 uppercase tracking-wider">
                                Часто задаваемые вопросы
                            </h4>
                            <div className="space-y-3">
                                {prayer.seo_faq.map((faq, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                        <h5 className="body-text font-medium text-gray-800 mb-2">
                                            {faq.q}
                                        </h5>
                                        <p className="body-text text-gray-600">
                                            {faq.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
