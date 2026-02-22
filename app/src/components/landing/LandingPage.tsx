import React, { useEffect } from 'react';
import { useAiGlow, useHapticFeedback } from '../../hooks/useLandingEffects';
import Navbar from './Navbar';
import Hero from './Hero';
import TrustBar from './TrustBar';
import HowItWorks from './HowItWorks';
import AIIntelligence from './AIIntelligence';
import ForClients from './ForClients';
import ForGuards from './ForGuards';
import Pricing from './Pricing';
import CTA from './CTA';
import Footer from './Footer';
import '../../landing.css';

const LandingPage: React.FC = () => {
  useAiGlow();
  useHapticFeedback();

  useEffect(() => {
    console.log('Fortivix landing build loaded: v=20260215');
    console.log('Fortivix animations loaded (reveal + typing)');
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <AIIntelligence />
      <ForClients />
      <ForGuards />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
};

export default LandingPage;
