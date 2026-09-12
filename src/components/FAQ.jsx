import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../lib/faqData';


const FaqItem = ({ q, a, isOpen, onClick, id }) => (
  <div className="border-b border-gray-200 dark:border-slate-800 py-6">
    <dt>
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={id}
        className="w-full flex justify-between items-start text-left text-gray-900 dark:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <span className="text-lg font-medium">{q}</span>
        <span className="ml-6 h-7 flex items-center">
          <ChevronDown
            className={`w-6 h-6 transform transition-transform text-gray-400 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
          />
        </span>
      </button>
    </dt>
    {isOpen && (
      <dd id={id} className="mt-4 pr-12">
        <p className="text-base text-gray-600 dark:text-slate-400">{a}</p>
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
    <section
      id="faq"
      className="scroll-mt-20 border-t border-gray-200 dark:border-slate-800 py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700 dark:text-primary-400 mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-950 dark:text-white">
            Questions, answered.
          </h2>
        </div>
        <dl className="max-w-3xl">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              id={`faq-answer-${index}`}
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
