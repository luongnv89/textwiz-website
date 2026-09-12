import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Wizards from '../components/Wizards';
import Privacy from '../components/Privacy';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import StructuredData from '../components/StructuredData';
import { faqData } from '../lib/faqData';

export default function HomePage() {
  return (
    <>
      <StructuredData faqItems={faqData} />
      <Hero />
      <HowItWorks />
      <Wizards />
      <Privacy />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
