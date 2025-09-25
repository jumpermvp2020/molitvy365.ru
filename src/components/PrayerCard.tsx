'use client';

import { useState } from 'react';
import { Clock, Users, Heart, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { ShareButton } from '@/components/ShareButton';

interface PrayerCardProps {
    prayer: {
        title: string;
        overview: string;
        modernText?: string;
        originalText?: string;
        duration_estimate_min?: number;
        suitable_for?: string[];
        why?: string;
        slug: string;
    };
    index: number;
}

export function PrayerCard({ prayer, index }: PrayerCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            {/* Header - всегда видимый */}
            <div className="flex items-start gap-3 sm:gap-6 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-lg sm:text-xl">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                        {prayer.title}
                    </h3>
                    <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
                        {prayer.overview}
                    </p>
                </div>
            </div>

            {/* Quick Info - всегда видимый */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">
                        {prayer.duration_estimate_min || 2} мин
                    </p>
                </div>
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 capitalize">
                        {prayer.suitable_for?.[0] || 'Все'}
                    </p>
                </div>
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">
                        Зачем
                    </p>
                </div>
            </div>

            {/* Expand/Collapse Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 mb-4 sm:mb-6"
            >
                {isExpanded ? (
                    <>
                        <ChevronUp className="w-4 h-4" />
                        <span className="text-sm sm:text-base">Скрыть текст молитвы</span>
                    </>
                ) : (
                    <>
                        <ChevronDown className="w-4 h-4" />
                        <span className="text-sm sm:text-base">Показать текст молитвы</span>
                    </>
                )}
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="space-y-4 sm:space-y-6 animate-slide-in-up">
                    {/* Prayer Texts */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Modern Text */}
                        {prayer.modernText && (
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <h4 className="text-sm sm:text-lg font-semibold text-green-800">Современный перевод</h4>
                                </div>
                                <div className="prose prose-sm sm:prose-lg max-w-none">
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                        {prayer.modernText}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Original Text */}
                        {prayer.originalText && (
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <h4 className="text-sm sm:text-lg font-semibold text-blue-800">Церковнославянский текст</h4>
                                </div>
                                <div className="prose prose-sm sm:prose-lg max-w-none">
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                        {prayer.originalText}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Why Section */}
                    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <h4 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Зачем читать эту молитву</h4>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            {prayer.why || 'Эта молитва помогает обрести душевный покой и умиротворение.'}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <a
                            href={`/molitvy/${prayer.slug}/`}
                            className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 text-xs sm:text-sm"
                        >
                            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                            Подробнее
                        </a>
                        <ShareButton prayer={prayer} />
                    </div>
                </div>
            )}
        </div>
    );
}