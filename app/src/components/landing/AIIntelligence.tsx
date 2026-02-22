import React from 'react';
import { useRevealOnScroll } from '../../hooks/useLandingEffects';

const AI_TAGS = [
  'AI Guard Matching',
  'Predictive Dispatch Routing',
  'Live Risk Signals',
];

const AIIntelligence: React.FC = () => {
  const sectionRef = useRevealOnScroll();

  return (
    <section className="section how-section reveal" data-reveal="section" ref={sectionRef}>
      <div className="container">
        <div className="reveal visible">
          <div className="section-label"><span className="line" /> AI Intelligence</div>
          <h2 className="section-title">AI-Powered Security Intelligence Layer</h2>
          <p className="section-subtitle">
            Fortivix uses real-time AI matching and dispatch optimization to connect clients
            with licensed professionals faster — with smarter coverage decisions built into every request.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
          {AI_TAGS.map((tag) => (
            <span
              key={tag}
              className="price-tag"
              style={{
                background: 'rgba(147, 51, 234, 0.08)',
                color: 'var(--purple-600)',
                padding: '6px 16px',
                borderRadius: '100px',
                fontSize: '0.7rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIIntelligence;
