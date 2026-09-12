import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Wizards from '../components/Wizards';
import Privacy from '../components/Privacy';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';

export default function HomePage() {
  return (
    <>
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
