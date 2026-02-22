import React from 'react';
import { useRevealOnScroll, useStaggerReveal } from '../../hooks/useLandingEffects';
import { TargetIcon, DocumentCheckIcon } from './Icons';

const MARKETPLACE_STEPS = [
  { num: '01', text: 'Open the app and broadcast your need — unarmed, armed, escort, event, or patrol.' },
  { num: '02', text: 'Licensed guards nearby receive your request instantly on their live feed.' },
  { num: '03', text: 'A guard accepts — you see their verified profile, credentials, and rating.' },
  { num: '04', text: 'Protection arrives, often in under 15 minutes. Job tracked from start to finish.' },
];

const CONTRACT_STEPS = [
  { num: '01', text: 'Define your coverage — duration, schedule, and security requirements.' },
  { num: '02', text: 'Choose your guard based on verified profile, credentials, and performance history.' },
  { num: '03', text: 'Manage everything inside the app — extend, scale, or end coverage on your terms.' },
  { num: '04', text: 'No hidden fees. No layered overhead. No locked-in legacy contracts.' },
];

const HowItWorks: React.FC = () => {
  const sectionRef = useRevealOnScroll();
  const marketplaceStaggerRef = useStaggerReveal();
  const contractStaggerRef = useStaggerReveal();

  return (
    <section className="section how-section reveal" id="about" data-reveal="section" ref={sectionRef}>
      <div className="container">
        <div className="reveal visible">
          <div className="section-label"><span className="line" /> How It Works</div>
          <h2 className="section-title">Two Modes. One Platform.<br />Complete Control.</h2>
          <p className="section-subtitle">
            Fortivix operates in two structured modes — built for both speed and stability.
            Choose your mode based on what the moment demands.
          </p>
        </div>
        <div className="how-grid">
          {/* Marketplace Mode */}
          <div className="how-mode marketplace reveal-left visible">
            <div className="mode-ai-label">AI DISPATCH</div>
            <div className="mode-icon"><TargetIcon /></div>
            <h3>Marketplace Mode</h3>
            <p className="mode-desc">
              For immediate protection. Broadcast a request and get connected with a licensed guard in minutes.
            </p>
            <div className="how-steps" data-stagger="container" ref={marketplaceStaggerRef}>
              {MARKETPLACE_STEPS.map((step, i) => (
                <div className="how-step" data-reveal="item" data-stagger="item" key={i}>
                  <div className="step-num">{step.num}</div>
                  <div className="step-text">{step.text}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Contract Mode */}
          <div className="how-mode contract reveal-right visible">
            <div className="mode-ai-label">AI SCHEDULING</div>
            <div className="mode-icon"><DocumentCheckIcon /></div>
            <h3>Contract Mode</h3>
            <p className="mode-desc">
              For structured, recurring coverage. Book licensed guards on your terms — weekly, monthly, or ongoing.
            </p>
            <div className="how-steps" data-stagger="container" ref={contractStaggerRef}>
              {CONTRACT_STEPS.map((step, i) => (
                <div className="how-step" data-reveal="item" data-stagger="item" key={i}>
                  <div className="step-num">{step.num}</div>
                  <div className="step-text">{step.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
