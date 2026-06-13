import Hero from '../components/Hero';
import FreeLocalAI from '../components/FreeLocalAI';
import Features from '../components/Features';
import Screenshots from '../components/Screenshots';
import FAQ from '../components/FAQ';
import HonestNote from '../components/HonestNote';
import StructuredData from '../components/StructuredData';
import { faqData } from '../lib/faqData';

export default function HomePage() {
  return (
    <>
      <StructuredData faqItems={faqData} />
      <Hero />
      <FreeLocalAI />
      <Features />
      <Screenshots />
      <FAQ />
      <HonestNote />
    </>
  );
}