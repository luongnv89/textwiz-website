import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../lib/faqData';


const FaqItem = ({ q, a, isOpen, onClick }) => (
  <div className="border-b border-gray-200 dark:border-slate-700 py-6">
    <dt>
      <button
        onClick={onClick}
        className="w-full flex justify-between items-start text-left text-gray-900 dark:text-slate-100"
      >
        <span className="text-lg font-medium">{q}</span>
        <span className="ml-6 h-7 flex items-center">
          <ChevronDown
            className={`w-6 h-6 transform transition-transform text-gray-400 dark:text-slate-400 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
          />
        </span>
      </button>
    </dt>
    {isOpen && (
      <dd className="mt-4 pr-12">
        <p className="text-base text-gray-600 dark:text-slate-300">{a}</p>
      </dd>
    )}
  </div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-100">Frequently Asked Questions</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-slate-300">
            Have questions? We've got answers.
          </p>
        </div>
        <dl className="space-y-4">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              q={item.q}
              a={item.a}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}
