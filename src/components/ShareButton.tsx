'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
    prayer: {
        title: string;
        modernText?: string;
        originalText?: string;
        slug: string;
    };
}

export function ShareButton({ prayer }: ShareButtonProps) {
    const handleShare = async () => {
        const shareText = `${prayer.title}\n\n${prayer.modernText || prayer.originalText}\n\nЧитать на сайте: ${window.location.origin}/molitvy/${prayer.slug}/`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: prayer.title,
                    text: prayer.modernText || prayer.originalText,
                    url: `${window.location.origin}/molitvy/${prayer.slug}/`
                });
            } else {
                await navigator.clipboard.writeText(shareText);
            }
        } catch (error) {
            console.error('Ошибка шаринга:', error);
            // Fallback: копируем в буфер обмена
            try {
                await navigator.clipboard.writeText(shareText);
            } catch (clipboardError) {
                console.error('Ошибка копирования:', clipboardError);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-3 bg-white text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105"
        >
            <Share2 className="w-5 h-5" />
            Поделиться
        </button>
    );
}
