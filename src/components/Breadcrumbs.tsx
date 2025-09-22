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
            className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
            aria-label="Хлебные крошки"
        >
            <Link
                href="/"
                className="flex items-center hover:text-purple-600 transition-colors"
                aria-label="Главная страница"
            >
                <Home className="w-4 h-4" />
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    {index === items.length - 1 ? (
                        <span className="text-gray-900 font-medium" aria-current="page">
                            {item.name}
                        </span>
                    ) : (
                        <Link
                            href={item.url}
                            className="hover:text-purple-600 transition-colors"
                        >
                            {item.name}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
