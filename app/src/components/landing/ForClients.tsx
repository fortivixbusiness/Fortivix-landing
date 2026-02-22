import React from 'react';
import { useRevealOnScroll, useStaggerReveal } from '../../hooks/useLandingEffects';
import {
  ShieldCheckIcon,
  ClockIcon,
  CreditCardIcon,
  PeopleIcon,
  DocumentLinesIcon,
  LayersIcon,
} from './Icons';

const FEATURES = [
  {
    icon: <ShieldCheckIcon />,
    title: 'Know Your Guard Before Arrival',
    desc: 'Know your guard before arrival — verified profile, credentials, and rating.',
    delay: '0s',
  },
  {
    icon: <ClockIcon />,
    title: 'Direct-to-Guard Connection',
    desc: 'Direct-to-guard connection — no layered overhead, no middleman contracts.',
    delay: '0.1s',
  },
  {
    icon: <CreditCardIcon />,
    title: 'Full Control In-App',
    desc: 'Full control in-app — choose, track, message, and manage everything in one place.',
    delay: '0.2s',
  },
  {
    icon: <PeopleIcon />,
    title: 'Short-Term or Long-Term Coverage',
    desc: 'Short-term peace of mind for everyday Americans, or long-term coverage for small businesses — weekly, monthly, or ongoing contracts.',
    delay: '0.3s',
  },
  {
    icon: <DocumentLinesIcon />,
    title: 'Clear Pricing Upfront',
    desc: 'Clear pricing upfront — no surprises, no guesswork.',
    delay: '0.4s',
  },
  {
    icon: <LayersIcon />,
    title: 'Dual-Mode Platform',
    desc: 'One platform, two modes. Marketplace for speed when you need instant coverage. Contracts for stability when you need structured protection.',
    delay: '0.5s',
  },
];

const ForClients: React.FC = () => {
  const sectionRef = useRevealOnScroll();
  const gridRef = useStaggerReveal();

  return (
    <section className="section features-section dark-section reveal" id="clients" data-reveal="section" ref={sectionRef}>
      <div className="container">
        <div className="reveal visible" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="line" /> For Clients
          </div>
          <h2 className="section-title">
            Security for everyday Americans and small businesses — not just elites.
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Fortivix gives everyday Americans and small businesses direct access to licensed protection — with full transparency, no middlemen, and total control.
          </p>
        </div>
        <div className="features-grid" data-stagger="container" ref={gridRef}>
          {FEATURES.map((feat, i) => (
            <div
              key={i}
              className="feature-card reveal visible"
              data-reveal="item"
              data-stagger="item"
              style={{ transitionDelay: feat.delay }}
            >
              <div className="feature-icon">{feat.icon}</div>
              <h4>{feat.title}</h4>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForClients;
