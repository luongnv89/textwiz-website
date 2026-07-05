import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import FreeLocalAI from '../components/FreeLocalAI';
import Features from '../components/Features';
import Comparison from '../components/Comparison';
import Wizards from '../components/Wizards';
import Screenshots from '../components/Screenshots';
import InteractiveSample from '../components/InteractiveSample';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import HonestNote from '../components/HonestNote';
import FinalCTA from '../components/FinalCTA';
import StructuredData from '../components/StructuredData';
import { faqData } from '../lib/faqData';

export default function HomePage() {
  return (
    <>
      <StructuredData faqItems={faqData} />
      <Hero />
      <Pricing />
      <FreeLocalAI />
      <Features />
      <Comparison />
      <Wizards />
      <Screenshots />
      <InteractiveSample />
      <FAQ />
      <Testimonials />
      <HonestNote />
      <FinalCTA />
    </>
  );
}