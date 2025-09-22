'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md mx-auto text-center px-4">
                <div className="bg-white rounded-3xl shadow-lg p-8">
                    {/* Иконка 404 */}
                    <div className="text-6xl font-bold text-gray-300 mb-4">404</div>

                    {/* Заголовок */}
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                        Страница не найдена
                    </h1>

                    {/* Описание */}
                    <p className="text-gray-600 mb-8">
                        К сожалению, запрашиваемая страница не существует или была перемещена.
                    </p>

                    {/* Кнопки навигации */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/"
                            className="
                inline-flex items-center gap-2 px-4 py-2 
                text-white bg-gray-900 hover:bg-gray-800 
                rounded-lg transition-all duration-200
                hover:shadow-md
              "
                        >
                            <Home className="w-4 h-4" />
                            На главную
                        </Link>

                        <button
                            onClick={handleBack}
                            className="
                inline-flex items-center gap-2 px-4 py-2 
                text-gray-600 hover:text-gray-800 
                bg-white hover:bg-gray-50 
                rounded-lg border border-gray-200 
                transition-all duration-200
                hover:shadow-sm
              "
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Назад
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
