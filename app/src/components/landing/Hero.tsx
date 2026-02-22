import React from 'react';
import { useTypewriter, usePhoneParallax, useParallax } from '../../hooks/useLandingEffects';
import { useRevealOnScroll } from '../../hooks/useLandingEffects';
import { UserIcon, ShieldIcon, ShieldIconWhite } from './Icons';

const TYPEWRITER_PHRASES = [
  'Instant Marketplace',
  'Instantly',
  'Hourly Coverage',
  '15–30 Minute Coverage',
  'Full Contract Control',
  'Contract Security',
];

const GUARDS = [
  { name: 'M. Reynolds', meta: 'Licensed · Unarmed · 4.9 ★', status: 'Available', statusClass: 'status-available' },
  { name: 'K. Torres', meta: 'Licensed · Armed · 4.8 ★', status: '0.3 mi', statusClass: 'status-nearby' },
  { name: 'D. Carter', meta: 'Licensed · Armed · 4.7 ★', status: '0.6 mi', statusClass: 'status-nearby' },
  { name: 'A. Johnson', meta: 'Licensed · Unarmed · 4.9 ★', status: 'Available', statusClass: 'status-available' },
  { name: 'L. Kim', meta: 'Licensed · Armed · 4.8 ★', status: '0.9 mi', statusClass: 'status-nearby' },
  { name: 'S. Patel', meta: 'Licensed · Unarmed · 4.6 ★', status: '1.2 mi', statusClass: 'status-nearby' },
];

const PhoneCard: React.FC<{ guard: typeof GUARDS[0] }> = ({ guard }) => (
  <div className="phone-card">
    <div className="phone-card-avatar">
      <ShieldIconWhite />
    </div>
    <div className="phone-card-info">
      <div className="phone-card-name">{guard.name}</div>
      <div className="phone-card-meta">{guard.meta}</div>
    </div>
    <div className={`phone-card-status ${guard.statusClass}`}>{guard.status}</div>
  </div>
);

const Hero: React.FC = () => {
  const typewriterRef = useTypewriter(TYPEWRITER_PHRASES);
  const revealRef = useRevealOnScroll();
  usePhoneParallax();
  useParallax('.hero-grid-bg');

  // Duplicate guards for seamless loop
  const allGuards = [...GUARDS, ...GUARDS];

  return (
    <section className="hero reveal" id="home" ref={revealRef}>
      <div className="hero-grid-bg" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge anim-fade-up anim-d1">
              <span className="dot" />
              Platform Active • AI Dispatch
            </div>
            <h1 className="anim-fade-up anim-d2">
              On-Demand Licensed Security.<br />
              <span className="type-lock"><span className="gradient-text" ref={typewriterRef}></span></span>
            </h1>
            <p className="hero-sub anim-fade-up anim-d3">
              Fortivix is a dual-sided hybrid security platform built for both immediate
              protection and structured long-term coverage. Direct access to licensed
              professionals — no middlemen, no overhead.
            </p>
            <p className="hero-trust" style={{ fontSize: '0.85rem', color: 'var(--slate-400)', marginTop: '-24px', marginBottom: 0 }}>
              State-licensed professionals. Verification-first platform.
            </p>
            <div className="hero-buttons anim-fade-up anim-d4">
              <a href="onboarding.html" className="btn-primary">
                <UserIcon /> Join as a Guard
              </a>
              <a href="#" className="btn-secondary">
                <ShieldIcon /> Request Security
              </a>
            </div>
          </div>
          <div className="hero-visual anim-fade-up anim-d3">
            <div className="hero-glow" />
            <div className="hero-phone">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="phone-header-label">Live Feed</div>
                  <div className="phone-header-title">Nearby Guards</div>
                </div>
                <div className="phone-map">
                  <div className="map-grid" />
                  <div className="map-dot user" />
                  <div className="map-dot guard1" />
                  <div className="map-dot guard2" />
                  <div className="map-dot guard3" />
                </div>
                <div className="phone-cards">
                  <div className="phone-cards-loop">
                    {allGuards.map((guard, i) => (
                      <PhoneCard key={i} guard={guard} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
