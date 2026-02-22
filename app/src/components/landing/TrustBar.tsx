import React from 'react';
import { useRevealOnScroll } from '../../hooks/useLandingEffects';
import { ShieldIcon, CheckboxIcon, ClockIcon, CreditCardIcon } from './Icons';

const TRUST_ITEMS = [
  { icon: <ShieldIcon size={24} />, label: 'State-Verified Licenses', delay: '0s' },
  { icon: <CheckboxIcon />, label: 'Background Checked', delay: '0.1s' },
  { icon: <ClockIcon />, label: 'Response Under 15 Min', delay: '0.2s' },
  { icon: <CreditCardIcon />, label: 'Transparent Payments', delay: '0.3s' },
];

const TrustBar: React.FC = () => {
  const revealRef = useRevealOnScroll();

  return (
    <div className="trust-bar" ref={revealRef}>
      <div className="container">
        <div className="trust-items">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={i}
              className="trust-item reveal visible"
              style={{ transitionDelay: item.delay }}
            >
              <div className="trust-icon">{item.icon}</div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
