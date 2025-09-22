'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container-responsive">
        <div className="card-responsive text-center">
          <div className="mb-8">
            <h1 className="display-text text-gray-900 mb-4">404</h1>
            <h2 className="heading-text text-gray-700 mb-6">Страница не найдена</h2>
            <p className="body-text text-gray-600 mb-8">
              К сожалению, запрашиваемая страница не существует или была перемещена.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="button-responsive bg-purple-600 text-white hover:bg-purple-700 focus-visible inline-flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              На главную
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="button-responsive bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="caption-text text-gray-500">
              Если вы считаете, что это ошибка, пожалуйста, сообщите нам об этом.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}