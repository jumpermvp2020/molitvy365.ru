'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav
            className="flex items-center space-x-1 sm:space-x-2 text-sm text-gray-600 mb-4 sm:mb-6 overflow-x-auto scrollbar-hide"
            aria-label="Хлебные крошки"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <Link
                href="/"
                className="flex items-center hover:text-purple-600 transition-colors focus-visible flex-shrink-0"
                aria-label="Главная страница"
            >
                <Home className="w-4 h-4" />
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    {index === items.length - 1 ? (
                        <span className="text-gray-900 font-medium text-overflow-protection whitespace-nowrap" aria-current="page">
                            {item.name}
                        </span>
                    ) : (
                        <Link
                            href={item.url}
                            className="hover:text-purple-600 transition-colors focus-visible text-overflow-protection whitespace-nowrap"
                        >
                            {item.name}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
