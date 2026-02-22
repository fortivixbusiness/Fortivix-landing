import React from 'react';
import { ShieldLogo } from './Icons';

const FOOTER_LINKS = {
  Platform: [
    { label: 'How It Works', href: '#about' },
    { label: 'For Guards', href: '#guards' },
    { label: 'For Clients', href: '#clients' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
    { label: 'Press', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Compliance', href: '#' },
    { label: 'Licensing', href: '#' },
  ],
};

const Footer: React.FC = () => (
  <footer className="footer reveal">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#" className="nav-logo" style={{ marginBottom: '4px' }}>
            <ShieldLogo size={30} gradientId="shieldGrad2" />
            <span>Fortivix</span>
          </a>
          <p>
            Security infrastructure reimagined for the AI revolution. Licensed professionals, transparent pricing,
            complete control.
          </p>
        </div>
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h5>{title}</h5>
            <ul className="footer-links">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Fortivix Inc. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
