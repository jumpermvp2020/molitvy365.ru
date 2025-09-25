'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Users, ChevronDown, ChevronUp, Share2, Check } from 'lucide-react';
import { getPrayerTextData } from '@/lib/prayerTextData';

interface PrayerData {
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
    slug: string;
    prayerText?: string;
    originalText?: string;
    modernText?: string;
}

interface ModernPrayerCardProps {
    prayer: PrayerData;
    index: number;
}

export function ModernPrayerCard({ prayer, index }: ModernPrayerCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isShared, setIsShared] = useState(false);
    const [showAllUseCases, setShowAllUseCases] = useState(false);
    const router = useRouter();

    const handleShare = async () => {
        // Получаем реальный текст молитвы из переданных данных
        const prayerText = prayer.prayerText || prayer.modernText || prayer.originalText || prayer.overview;

        const shareText = `${prayer.title}\n\n${prayerText}\n\nЧитать на сайте: ${window.location.origin}/molitvy/${prayer.slug}/`;

        try {
            // Проверяем поддержку Web Share API
            if (navigator.share) {
                await navigator.share({
                    title: prayer.title,
                    text: prayerText,
                    url: `${window.location.origin}/molitvy/${prayer.slug}/`
                });
            } else {
                // Fallback: копируем в буфер обмена
                await navigator.clipboard.writeText(shareText);
                setIsShared(true);
                setTimeout(() => setIsShared(false), 3000);
            }
        } catch (error) {
            console.error('Ошибка шаринга:', error);
            // Fallback: копируем в буфер обмена
            try {
                await navigator.clipboard.writeText(shareText);
                setIsShared(true);
                setTimeout(() => setIsShared(false), 3000);
            } catch (clipboardError) {
                console.error('Ошибка копирования:', clipboardError);
            }
        }
    };

    const handleReadPrayer = () => {
        // Переходим к странице молитвы по slug
        router.push(`/molitvy/${prayer.slug}/`);
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover-lift animate-slide-in-up">
            {/* Заголовок молитвы */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 mb-2">
                            {prayer.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {prayer.overview}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleShare}
                    className="ml-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex-shrink-0"
                    title="Поделиться молитвой"
                >
                    {isShared ? (
                        <Check className="w-5 h-5 text-green-600" />
                    ) : (
                        <Share2 className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>

            {/* Информационные карточки */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Время</span>
                    </div>
                    <p className="text-blue-800 font-semibold">
                        {prayer.duration_estimate_min} мин
                    </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Уровень</span>
                    </div>
                    <p className="text-purple-800 font-semibold capitalize">
                        {prayer.suitable_for[0] || 'Все'}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Формат</span>
                    </div>
                    <p className="text-green-800 font-semibold">
                        {prayer.short_version_hint ? 'Полный + краткий' : 'Полный'}
                    </p>
                </div>
            </div>

            {/* Зачем читать */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                    Зачем читать эту молитву
                </h4>
                <p className="text-gray-600 leading-relaxed">
                    {prayer.why}
                </p>
            </div>

            {/* Случаи использования */}
            {prayer.use_cases.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                        Когда использовать
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {(showAllUseCases ? prayer.use_cases : prayer.use_cases.slice(0, 3)).map((useCase: string, useIndex: number) => (
                            <span
                                key={useIndex}
                                className="inline-flex items-center px-3 py-1 text-sm text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200"
                            >
                                {useCase}
                            </span>
                        ))}
                        {prayer.use_cases.length > 3 && !showAllUseCases && (
                            <button
                                onClick={() => setShowAllUseCases(true)}
                                className="inline-flex items-center px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-full border border-indigo-200 hover:bg-indigo-200 hover:text-indigo-700 transition-colors duration-200 cursor-pointer"
                            >
                                +{prayer.use_cases.length - 3} ещё
                            </button>
                        )}
                        {showAllUseCases && prayer.use_cases.length > 3 && (
                            <button
                                onClick={() => setShowAllUseCases(false)}
                                className="inline-flex items-center px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                            >
                                Скрыть
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Краткая версия */}
            {prayer.short_version_hint && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100 mb-6">
                    <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                        ⚡ Краткая версия
                    </h4>
                    <p className="text-amber-700 leading-relaxed text-sm">
                        {prayer.short_version_hint}
                    </p>
                </div>
            )}

            {/* Кнопка развернуть/свернуть */}
            <div className="flex gap-3">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp className="w-4 h-4" />
                            Скрыть подробности
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4" />
                            Показать подробности
                        </>
                    )}
                </button>

                <button
                    onClick={handleReadPrayer}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                    <BookOpen className="w-4 h-4" />
                    Читать
                </button>
            </div>

            {/* Развернутая информация */}
            {isExpanded && (
                <div className="mt-6 space-y-6 pt-6 border-t border-gray-200 animate-slide-in-up">
                    {/* Как читать */}
                    {prayer.how_to_read.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                                Как правильно читать
                            </h4>
                            <ol className="space-y-3">
                                {prayer.how_to_read.map((step: string, index: number) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-600 leading-relaxed">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}

                    {/* Рекомендации */}
                    {prayer.suggested_habits.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                                💡 Полезные привычки
                            </h4>
                            <ul className="space-y-2">
                                {prayer.suggested_habits.map((habit: string, index: number) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                                        <span className="text-gray-600 leading-relaxed">{habit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Частые ошибки */}
                    {prayer.pitfalls.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                                ⚠️ Чего следует избегать
                            </h4>
                            <ul className="space-y-2">
                                {prayer.pitfalls.map((pitfall: string, index: number) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                                        <span className="text-gray-600 leading-relaxed">{pitfall}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* FAQ */}
                    {prayer.seo_faq.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                                ❓ Часто задаваемые вопросы
                            </h4>
                            <div className="space-y-3">
                                {prayer.seo_faq.slice(0, 2).map((faq, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                        <h5 className="font-medium text-gray-800 mb-2">
                                            {faq.q}
                                        </h5>
                                        <p className="text-gray-600 text-sm">
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
