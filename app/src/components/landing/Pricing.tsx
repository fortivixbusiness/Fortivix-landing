import React from 'react';
import { useRevealOnScroll, useStaggerReveal } from '../../hooks/useLandingEffects';
import { CheckIcon } from './Icons';

interface PriceCardData {
  tag: string;
  title: string;
  desc: string;
  price: string;
  per: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
  armed?: boolean;
  delay: string;
}

const PRICE_CARDS: PriceCardData[] = [
  {
    tag: 'Quick Coverage',
    title: 'Short Jobs',
    desc: '15–30 minute peace-of-mind escorts or temporary security presence.',
    price: '$15',
    per: 'starting per short job',
    features: [
      '15–30 minute coverage',
      'Licensed & verified guard',
      'Escort & temporary presence',
      'Real-time tracking',
    ],
    cta: 'Get Started',
    ctaHref: '#',
    delay: '0s',
  },
  {
    tag: 'Most Popular',
    title: 'Hourly Protection (Unarmed)',
    desc: 'On-demand hourly coverage for events, storefronts, or personal security.',
    price: '$30',
    per: 'starting per hour',
    features: [
      'Flexible hourly booking',
      'Unarmed protection',
      'Verified guard profiles',
      'Under 15-min response',
    ],
    cta: 'Get Started',
    ctaHref: '#',
    featured: true,
    delay: '0.15s',
  },
  {
    tag: 'Long-Term',
    title: 'Contract Coverage',
    desc: 'Weekly, monthly, or ongoing structured security — fully managed in-app.',
    price: 'Custom',
    per: 'based on scope & duration',
    features: [
      'Recurring scheduled coverage',
      'Choose your guard',
      'Scale or cancel anytime',
      'No lock-in contracts',
    ],
    cta: 'Contact Us',
    ctaHref: '#',
    delay: '0.3s',
  },
  {
    tag: 'ARMED',
    title: 'Armed Protection',
    desc: 'On-demand hourly coverage for events, storefronts, or personal security.',
    price: '$50',
    per: 'starting per hour',
    features: [
      'Flexible hourly booking',
      'Armed guards (where permitted)',
      'Verified guard profiles',
      'Under 15-min response',
    ],
    cta: 'Get Started',
    ctaHref: '#',
    armed: true,
    delay: '0.45s',
  },
];

const PriceCard: React.FC<{ card: PriceCardData }> = ({ card }) => {
  const classNames = [
    'price-card',
    card.featured ? 'featured reveal-scale visible' : 'reveal visible',
    card.armed ? 'armed' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      {...(!card.featured ? { 'data-reveal': 'item', 'data-stagger': 'item' } : {})}
      style={{ transitionDelay: card.delay }}
    >
      <div className="price-tag">{card.tag}</div>
      <h3>{card.title}</h3>
      <p className="price-desc">{card.desc}</p>
      <div className="price-amount">{card.price}</div>
      <div className="price-per">{card.per}</div>
      <ul className="price-features">
        {card.features.map((feat, i) => (
          <li key={i}>
            <span className="price-check"><CheckIcon /></span>{' '}
            {feat}
          </li>
        ))}
      </ul>
      <a href={card.ctaHref} className="price-btn">{card.cta}</a>
    </div>
  );
};

const Pricing: React.FC = () => {
  const sectionRef = useRevealOnScroll();
  const gridRef = useStaggerReveal();

  return (
    <section className="section pricing-section reveal" id="pricing" data-reveal="section" ref={sectionRef}>
      <div className="container">
        <div className="reveal visible" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="line" /> Pricing
          </div>
          <h2 className="section-title">Simple. Transparent.<br />No Surprises.</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Clear pricing displayed upfront. No red tape. No hidden administrative charges.
          </p>
        </div>
        <div className="pricing-grid" data-stagger="container" ref={gridRef}>
          {PRICE_CARDS.map((card, i) => (
            <PriceCard key={i} card={card} />
          ))}
        </div>
        <p className="pricing-note">
          Final price varies by location, licensing level, and duration.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
