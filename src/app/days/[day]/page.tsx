'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Shield, MessageCircle, Heart, BookOpen, Sun, Moon, Home } from 'lucide-react';
import { useState, use } from 'react';
import daysData from '../../../data/prayers-by-days-complete.json';

interface DayPageProps {
    params: Promise<{
        day: string;
    }>;
}

// generateStaticParams удален - не работает в клиентском компоненте

const dayIcons = {
    monday: Shield,
    tuesday: MessageCircle,
    wednesday: Heart,
    thursday: BookOpen,
    friday: Clock,
    saturday: Moon,
    sunday: Sun
};

// generateMetadata удален - не работает в клиентском компоненте

export default function DayPage({ params }: DayPageProps) {
    const resolvedParams = use(params);
    const dayData = daysData.weekDays[resolvedParams.day as keyof typeof daysData.weekDays];

    if (!dayData) {
        notFound();
    }

    const IconComponent = dayIcons[resolvedParams.day as keyof typeof dayIcons] || Calendar;

    // Разделяем молитвы на универсальные и специфичные для дня
    const universalPrayers = dayData.prayers.filter(prayer => prayer.isUniversal);
    const specificPrayers = dayData.prayers.filter(prayer => !prayer.isUniversal);

    // Состояние для управления показом всех молитв
    const [showAllSpecific, setShowAllSpecific] = useState(false);
    const [showAllUniversal, setShowAllUniversal] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDFBFB] to-[#EBEDEE]">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Навигация */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#4B5563] hover:text-[#111111] transition-colors duration-200"
                    >
                        <Home className="w-4 h-4" />
                        На главную
                    </Link>
                    <Link
                        href="/weekly-prayers"
                        className="inline-flex items-center gap-2 text-[#4B5563] hover:text-[#111111] transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Назад к дням недели
                    </Link>
                </div>

                {/* Заголовок дня */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-[#E5E7EB] shadow-sm">
                    <div className="flex items-start gap-6">
                        <div className="p-4 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-2xl">
                            <IconComponent className="w-8 h-8 text-[#4B5563]" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3">
                                Молитвы на {dayData.nameGenitive}
                            </h1>
                            <div className="text-lg text-[#4B5563] mb-4">
                                Архангел {dayData.archangel}
                            </div>
                            <div className="text-xl text-[#6B7280] mb-4">
                                {dayData.theme}
                            </div>
                            <p className="text-[#4B5563] leading-relaxed max-w-3xl">
                                {dayData.description}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-[#111111] mb-2">
                                {specificPrayers.length}
                            </div>
                            <div className="text-sm text-[#6B7280]">
                                молитв
                            </div>
                        </div>
                    </div>
                </div>

                {/* Специфичные молитвы дня */}
                {specificPrayers.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                            Молитвы для {dayData.nameGenitive}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(showAllSpecific ? specificPrayers : specificPrayers.slice(0, 12)).map((prayer) => (
                                <Link
                                    key={prayer.id}
                                    href={`/prayer/${prayer.url}`}
                                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                                >
                                    <h3 className="font-semibold text-[#1A1A1A] mb-2 line-clamp-2">
                                        {prayer.title}
                                    </h3>
                                    <div className="text-sm text-[#6B7280] mb-3">
                                        {prayer.category}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {prayer.tags.slice(0, 3).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-[#F3F4F6] text-[#4B5563] px-2 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {specificPrayers.length > 12 && (
                            <div className="text-center mt-6">
                                <button
                                    onClick={() => setShowAllSpecific(!showAllSpecific)}
                                    className="text-[#111111] hover:text-[#4B5563] font-medium px-6 py-3 bg-white/80 rounded-full border border-[#D1D5DB] hover:shadow-sm transition-all duration-200"
                                >
                                    {showAllSpecific ? 'Скрыть' : `Показать все ${specificPrayers.length} молитв`}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Универсальные молитвы */}
                {universalPrayers.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                            Универсальные молитвы
                        </h2>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB]">
                            <p className="text-[#4B5563] mb-4">
                                Эти молитвы можно читать в любой день недели для духовной практики
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(showAllUniversal ? universalPrayers : universalPrayers.slice(0, 9)).map((prayer) => (
                                    <Link
                                        key={prayer.id}
                                        href={`/prayer/${prayer.url}`}
                                        className="flex items-center gap-3 p-4 rounded-xl border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors duration-200"
                                    >
                                        <div className="w-2 h-2 bg-[#10B981] rounded-full flex-shrink-0"></div>
                                        <span className="text-[#1A1A1A] font-medium line-clamp-1">
                                            {prayer.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                            {universalPrayers.length > 9 && (
                                <div className="text-center mt-4">
                                    <button
                                        onClick={() => setShowAllUniversal(!showAllUniversal)}
                                        className="text-[#10B981] hover:text-[#059669] font-medium px-4 py-2 bg-[#F0FDF4] rounded-full border border-[#BBF7D0] hover:shadow-sm transition-all duration-200"
                                    >
                                        {showAllUniversal ? 'Скрыть' : `Показать все ${universalPrayers.length} универсальных молитв`}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Навигация к другим дням */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB]">
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                        Другие дни недели
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(daysData.weekDays).map(([key, day]) => {
                            if (key === resolvedParams.day) return null;
                            const DayIcon = dayIcons[key as keyof typeof dayIcons] || Calendar;
                            return (
                                <Link
                                    key={key}
                                    href={`/days/${key}`}
                                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors duration-200"
                                >
                                    <DayIcon className="w-5 h-5 text-[#4B5563]" />
                                    <span className="text-sm font-medium text-[#1A1A1A] text-center">
                                        {day.name}
                                    </span>
                                    <span className="text-xs text-[#6B7280]">
                                        {day.totalPrayers} молитв
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}