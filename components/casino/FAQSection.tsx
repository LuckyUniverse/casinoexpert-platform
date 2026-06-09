interface FAQ {
  question: string;
  answer: string;
}

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <details
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition"
        >
          <summary className="px-6 py-5 font-semibold text-lg text-gray-900 cursor-pointer hover:text-blue-600 transition text-left list-item">
            {faq.question}
          </summary>
          <div className="px-6 pb-6 pt-2">
            <p className="text-base text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
