import React from 'react';
import { useRevealOnScroll } from '../../hooks/useLandingEffects';
import {
  BriefcaseIcon,
  ClockIcon,
  StarIcon,
  ShieldCheckIcon,
  CreditCardIcon,
} from './Icons';

const BENEFITS = [
  { icon: <BriefcaseIcon />, title: 'Be Your Own Boss', desc: 'Be your own boss — accept jobs on your terms.', delay: '0.1s' },
  { icon: <ClockIcon />, title: 'No Favoritism', desc: 'No favoritism — opportunity is performance-based and transparent.', delay: '0.2s' },
  { icon: <StarIcon />, title: 'No Micromanagement', desc: 'No micromanagement — you manage your work, your pace, and your earnings.', delay: '0.3s' },
  { icon: <ClockIcon />, title: 'Instant Opportunities', desc: 'Instant opportunities — live job feed based on proximity and availability.', delay: '0.4s' },
  { icon: <ShieldCheckIcon />, title: 'Verified Clients & Clear Job Details', desc: 'Verified clients & clear job details — know the scope before you accept.', delay: '0.5s' },
  { icon: <CreditCardIcon />, title: 'Transparent Payouts', desc: 'Transparent payouts — see estimated earnings before confirming.', delay: '0.6s' },
  { icon: <StarIcon />, title: 'Build Your Reputation', desc: 'Build your reputation — ratings and performance unlock better jobs.', delay: '0.7s' },
];

const STATS = [
  { value: '$4,200+', label: 'Average Monthly Earnings', sublabel: 'Projected based on market rates', colorClass: 'purple' },
  { value: 'Zero', label: 'Hidden Fees or Middlemen', sublabel: 'Direct pay, transparent structure', colorClass: 'indigo' },
];

const ForGuards: React.FC = () => {
  const sectionRef = useRevealOnScroll();

  return (
    <section className="section guards-section reveal" id="guards" data-reveal="section" ref={sectionRef}>
      <div className="container">
        <div className="guards-grid">
          <div>
            <div className="reveal visible">
              <div className="section-label"><span className="line" /> For Security Professionals</div>
              <h2 className="section-title">Your License. Your Schedule.<br />Your Earnings.</h2>
              <p className="section-subtitle" style={{ marginBottom: '24px' }}>
                Join a performance-based marketplace that values your credentials. Choose jobs that match your availability and keep more of what you earn.
              </p>
              <p className="section-subtitle" style={{ marginBottom: '40px' }}>
                Fortivix is built for professionals who want independence. You control your schedule, choose your jobs, and build your reputation — without favoritism, micromanagement, or management politics.
              </p>
            </div>
            <div className="guards-benefits">
              {BENEFITS.map((ben, i) => (
                <div key={i} className="benefit-item reveal visible" style={{ transitionDelay: ben.delay }}>
                  <div className="benefit-icon">{ben.icon}</div>
                  <div className="benefit-text">
                    <h4>{ben.title}</h4>
                    <p>{ben.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="guards-visual reveal-right visible">
            <div className="portal-toggle reveal" aria-label="Guard Portal">
              <span className="portal-toggle__label">PORTAL</span>
              <span className="portal-toggle__pill is-guard">
                <span className="portal-toggle__dot" />
                <span className="portal-toggle__text">GUARD</span>
              </span>
            </div>
            <div className="stat-card-group">
              {STATS.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className={`stat-value ${stat.colorClass}`}>{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-sublabel">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForGuards;
