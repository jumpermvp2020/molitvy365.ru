'use client';

import { useRouter } from 'next/navigation';
import { Calendar, Clock, Shield, MessageCircle, Heart, BookOpen, Sun, Moon, Sparkles } from 'lucide-react';
import daysData from '../data/prayers-by-days-complete.json';

interface DayData {
    key: string;
    name: string;
    nameGenitive: string;
    archangel: string;
    theme: string;
    color: string;
    icon: React.ReactNode;
    totalPrayers: number;
    description: string;
}

// Создаем массив дней с данными из JSON
const weekDays: DayData[] = Object.entries(daysData.weekDays).map(([key, dayData]) => ({
    key,
    name: dayData.name,
    nameGenitive: dayData.nameGenitive,
    archangel: dayData.archangel,
    theme: dayData.theme,
    color: getIconBgClass(key),
    icon: getIcon(key),
    totalPrayers: dayData.totalPrayers,
    description: dayData.description
}));

function getIconBgClass(dayKey: string): string {
    const colors = {
        monday: 'bg-[#FCE7D7]',
        tuesday: 'bg-[#F9F5FF]',
        wednesday: 'bg-[#FFF8E1]',
        thursday: 'bg-[#FCE7D7]',
        friday: 'bg-[#F9F5FF]',
        saturday: 'bg-[#FFF8E1]',
        sunday: 'bg-[#FCE7D7]'
    };
    return colors[dayKey as keyof typeof colors] || 'bg-[#F9F5FF]';
}

function getIcon(dayKey: string): React.ReactNode {
    const icons = {
        monday: <Shield className="w-5 h-5 text-[#4B5563]" />,
        tuesday: <MessageCircle className="w-5 h-5 text-[#4B5563]" />,
        wednesday: <Heart className="w-5 h-5 text-[#4B5563]" />,
        thursday: <BookOpen className="w-5 h-5 text-[#4B5563]" />,
        friday: <Clock className="w-5 h-5 text-[#4B5563]" />,
        saturday: <Moon className="w-5 h-5 text-[#4B5563]" />,
        sunday: <Sun className="w-5 h-5 text-[#4B5563]" />
    };
    return icons[dayKey as keyof typeof icons] || <Calendar className="w-5 h-5 text-[#4B5563]" />;
}

interface DaysNavigationProps {
    compact?: boolean;
}

export default function DaysNavigation({ compact = false }: DaysNavigationProps) {
    const router = useRouter();

    const getCurrentDay = () => {
        const today = new Date().getDay();
        // Преобразуем воскресенье (0) в 7 для соответствия нашему массиву
        return today === 0 ? 6 : today - 1;
    };

    const handleDayClick = (dayKey: string) => {
        router.push(`/days/${dayKey}`);
    };

    return (
        <div className={`bg-gradient-to-br from-[#FDFBFB] to-[#EBEDEE] rounded-3xl shadow-sm border border-[#E5E7EB] ${compact ? 'p-6' : 'p-8'} mt-12 mb-8 max-w-6xl mx-auto`}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/60 rounded-2xl">
                    <Sparkles className="w-6 h-6 text-[#4B5563]" />
                </div>
                <h2 className={`font-semibold text-[#1A1A1A] tracking-tight ${compact ? 'text-2xl' : 'text-3xl'}`}>
                    Молитвы по дням недели
                </h2>
                {compact && (
                    <button
                        onClick={() => router.push('/weekly-prayers')}
                        className="ml-auto text-sm text-[#111111] hover:text-[#4B5563] hover:bg-white/80 px-3 py-1 rounded-full border border-[#D1D5DB] transition-all duration-200 hover:shadow-sm"
                    >
                        Все дни →
                    </button>
                )}
            </div>

            {!compact && (
                <p className="text-[#4B5563] text-lg leading-relaxed mb-8 max-w-2xl">
                    Каждый день недели посвящен определенному архангелу. Выберите день, чтобы увидеть специальные молитвы для духовной практики.
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {weekDays.map((day, index) => {
                    const isCurrentDay = index === getCurrentDay();

                    return (
                        <div
                            key={day.key}
                            className={`cursor-pointer transition-all duration-400ms ease-out ${isCurrentDay
                                ? 'ring-2 ring-[#111111] ring-offset-2'
                                : 'hover:scale-1.03 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]'
                                }`}
                            onClick={() => handleDayClick(day.key)}
                        >
                            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-[0_6px_16px_rgba(0,0,0,0.06)] p-6 h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 ${day.color} rounded-lg flex-shrink-0`}>
                                        {day.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-[#1A1A1A] text-lg leading-tight">
                                            {day.name}
                                        </h3>
                                        {isCurrentDay && (
                                            <span className="text-xs bg-[#111111] text-white px-2 py-1 rounded-full mt-1 inline-block">
                                                Сегодня
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="text-sm text-[#4B5563] mb-2 font-medium">
                                    Архангел {day.archangel}
                                </div>

                                <div className="text-sm text-[#9CA3AF] leading-relaxed flex-1 mb-4">
                                    {day.theme}
                                </div>

                                <div className="text-sm text-[#6B7280] font-medium">
                                    {day.totalPrayers} молитв
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-10 p-7 bg-white/60 rounded-2xl border border-[#E5E7EB]">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-white/60 rounded-xl">
                        <Calendar className="w-4 h-4 text-[#4B5563]" />
                    </div>
                    <span className="text-sm font-semibold text-[#1A1A1A]">Универсальные молитвы</span>
                </div>
                <p className="text-sm text-[#4B5563] mb-5 leading-relaxed">
                    Эти молитвы можно читать в любой день недели для духовной практики
                </p>
                <div className="flex flex-wrap gap-4">
                    {['iisusova-molitva', 'molitva-gospodnya-otche-nash', 'simvol-very'].map((prayerSlug) => (
                        <button
                            key={prayerSlug}
                            onClick={() => router.push(`/prayer/${prayerSlug}`)}
                            className="text-sm text-[#111111] hover:text-[#4B5563] hover:bg-white/80 px-5 py-3 rounded-full border border-[#D1D5DB] transition-all duration-200 hover:shadow-sm"
                        >
                            {prayerSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
