'use client';

export default function SiteInfo() {
    return (
        <section className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-12 sm:py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-gray-900 mb-6">
                        О нашем сайте
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <p className="mb-6">
                            Наш сайт создан для того, чтобы вы могли без лишних поисков сразу открыть нужную молитву.
                            Здесь есть всё самое важное: утренние и вечерние молитвы, молитва «Отче наш», Символ веры,
                            а также обращения к святым и молитвы по жизненным ситуациям — о детях, о здравии, перед дорогой
                            или на сон грядущий.
                        </p>
                        <p className="text-gray-600">
                            Мы собрали тексты вместе, чтобы упростить главное: найти молитву и в тишине сердца обратиться к Богу.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
