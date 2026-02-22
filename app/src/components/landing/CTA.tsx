import React from 'react';
import { useRevealOnScroll } from '../../hooks/useLandingEffects';
import { UserIcon, ShieldIcon } from './Icons';

const CTA: React.FC = () => {
  const sectionRef = useRevealOnScroll();

  return (
    <section className="section cta-section dark-section reveal" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="reveal visible">
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="line" /> Get Started
          </div>
          <h2 className="section-title">Direct Access to Licensed Protection.</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
            Structured for control, transparency, and speed. Whether you need coverage in 15 minutes or 15 months — Fortivix delivers.
          </p>
        </div>
        <div className="cta-buttons reveal visible" style={{ transitionDelay: '0.2s' }}>
          <a href="onboarding.html" className="btn-primary">
            <UserIcon /> Join as a Guard
          </a>
          <a href="#" className="btn-secondary">
            <ShieldIcon /> Request Security as a Client
          </a>
        </div>
        <p
          className="reveal visible"
          style={{ color: 'var(--slate-500)', fontSize: '0.85rem', marginTop: '28px', textAlign: 'center' }}
        >
          Contact us at{' '}
          <a
            href="mailto:fortivixbusiness@gmail.com"
            style={{ color: 'var(--purple-400)', textDecoration: 'none', fontWeight: 500 }}
          >
            fortivixbusiness@gmail.com
          </a>
        </p>
        <p
          className="reveal visible"
          style={{ color: 'var(--slate-500)', fontSize: '0.85rem', marginTop: '8px', textAlign: 'center' }}
        >
          <a
            href="https://www.linkedin.com/in/rajhni-hopwood-213ab1204"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--purple-400)', textDecoration: 'none', fontWeight: 500 }}
          >
            LinkedIn — Rajhni Hopwood
          </a>
        </p>
      </div>
    </section>
  );
};

export default CTA;
