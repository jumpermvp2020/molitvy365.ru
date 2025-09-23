import { Heart, BookOpen, Users } from 'lucide-react';
import CurrentYear from './CurrentYear';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-8 sm:py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="grid-responsive mb-6 sm:mb-8">
                    {/* О сайте */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                            <BookOpen className="w-5 h-5 text-purple-600" />
                            <h3 className="body-text font-semibold text-gray-900 text-overflow-protection">О сайте</h3>
                        </div>
                        <p className="caption-text text-gray-600 leading-relaxed text-overflow-protection">
                            Молитвы дня — это коллекция православных молитв для ежедневного духовного чтения.
                            Каждый день вы найдете здесь новую молитву для размышления и молитвенной практики.
                        </p>
                    </div>

                    {/* Возможности */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                            <Heart className="w-5 h-5 text-purple-600" />
                            <h3 className="body-text font-semibold text-gray-900 text-overflow-protection">Возможности</h3>
                        </div>
                        <ul className="caption-text text-gray-600 space-y-1">
                            <li>• Молитва дня (стабильная)</li>
                            <li>• Случайные молитвы</li>
                            <li>• Поделиться ссылкой</li>
                            <li>• 467 православных молитв</li>
                            <li>• Минималистичный дизайн</li>
                        </ul>
                    </div>

                    {/* О команде */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                            <Users className="w-5 h-5 text-purple-600" />
                            <h3 className="body-text font-semibold text-gray-900 text-overflow-protection">О команде</h3>
                        </div>
                        <p className="caption-text text-gray-600 leading-relaxed text-overflow-protection">
                            Проект создан командой{' '}
                            <a
                                href="https://hotelqr.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-800 underline focus-visible"
                            >
                                hotelqr.com
                            </a>{' '}
                            с любовью и заботой о духовном развитии людей.
                        </p>
                    </div>
                </div>

                {/* Ссылки на страницы */}
                <div className="border-t border-gray-200 pt-4 sm:pt-6">
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
                        <a
                            href="/about"
                            className="caption-text text-gray-600 hover:text-purple-600 transition-colors focus-visible"
                        >
                            О нас
                        </a>
                        <a
                            href="/faq"
                            className="caption-text text-gray-600 hover:text-purple-600 transition-colors focus-visible"
                        >
                            FAQ
                        </a>
                        <a
                            href="/privacy"
                            className="caption-text text-gray-600 hover:text-purple-600 transition-colors focus-visible"
                        >
                            Политика конфиденциальности
                        </a>
                    </div>
                </div>

                {/* Разделитель */}
                <div className="border-t border-gray-200 pt-4 sm:pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                        <p className="caption-text text-gray-500 text-center md:text-left text-overflow-protection">
                            © <CurrentYear fallbackYear={2025} /> Молитвы дня. Все молитвы взяты из публичного домена.
                        </p>
                        <p className="caption-text text-gray-500 text-center md:text-right text-overflow-protection">
                            Сделано с любовью на некоммерческой основе командой{' '}
                            <a
                                href="https://hotelqr.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-800 underline focus-visible"
                            >
                                hotelqr.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
