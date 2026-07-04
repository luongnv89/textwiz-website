import { MessageCircle } from 'lucide-react';
import { getFeaturedTestimonials } from '../lib/testimonialsData';

export default function Testimonials() {
  const featured = getFeaturedTestimonials();

  return (
    <section
      id="first-users"
      className="py-24 px-6 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            First users, in their own words
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            We ask every early user one question: &ldquo;What did TextWiz replace for you?&rdquo; Real answers
            land here, with their names and their permission.
          </p>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((t) => (
              <figure
                key={t.author}
                className="p-6 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900"
              >
                <blockquote className="text-gray-800 dark:text-slate-200 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-gray-900 dark:text-slate-100">
                  {t.author}
                  <span className="block font-normal text-gray-500 dark:text-slate-400">{t.context}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/60 p-8 text-center">
            <p className="text-gray-700 dark:text-slate-200 font-medium">
              We&rsquo;re collecting first-user stories right now — no quotes yet, and nothing fabricated to
              fill the gap.
            </p>
            <p className="mt-2 text-gray-600 dark:text-slate-300">
              Already used TextWiz? Tell us what it replaced for you and we&rsquo;ll add your words here, with
              your name and your permission.
            </p>
            <a
              href="/feedback"
              className="mt-5 inline-flex items-center gap-2 py-2 text-sm font-semibold text-primary-800 dark:text-primary-300 underline underline-offset-4 decoration-primary-300 dark:decoration-primary-700 hover:text-primary-900 dark:hover:text-primary-200 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Share what TextWiz replaced for you
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
