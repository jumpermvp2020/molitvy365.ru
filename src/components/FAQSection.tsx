interface FAQItem {
    q: string;
    a: string;
}

interface FAQSectionProps {
    faq: FAQItem[];
}

export function FAQSection({ faq }: FAQSectionProps) {
    return (
        <div className="card-responsive">
            <h2 className="heading-text text-gray-900 text-center mb-8">
                Часто задаваемые вопросы
            </h2>
            <div className="space-y-6">
                {faq.map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                        <h3 className="body-text font-medium text-gray-800 mb-3">
                            {item.q}
                        </h3>
                        <p className="body-text text-gray-600 leading-relaxed">
                            {item.a}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
