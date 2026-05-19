import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mail, ArrowUpRight } from 'lucide-react';
import '../styles/Footer.css';

// Inline SVG Icon components for GitHub and LinkedIn to prevent brand-icon dependency errors in lucide-react
const GithubIcon = ({ size = 20, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glow-bg"></div>
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Left Column: Brand & Tagline */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <Bot size={28} className="logo-icon" />
              <span>InterviewAI</span>
            </Link>
            <p className="footer-tagline">
              Prepare smarter. Perform better. Powered by AI.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/dashboard">
                  Dashboard <ArrowUpRight size={14} className="hover-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/topics">
                  Topics <ArrowUpRight size={14} className="hover-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/interview">
                  Interview <ArrowUpRight size={14} className="hover-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/results">
                  Results <ArrowUpRight size={14} className="hover-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  Settings <ArrowUpRight size={14} className="hover-arrow" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li>
                <a href="#blog">
                  Blog <ArrowUpRight size={14} className="hover-arrow" />
                </a>
              </li>
              <li>
                <a href="#help">
                  Help Center <ArrowUpRight size={14} className="hover-arrow" />
                </a>
              </li>
              <li>
                <a href="#docs">
                  Documentation <ArrowUpRight size={14} className="hover-arrow" />
                </a>
              </li>
              <li>
                <a href="#community">
                  Community <ArrowUpRight size={14} className="hover-arrow" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links contact-links">
              <li>
                <a href="mailto:support@interviewai.com" className="contact-link">
                  <Mail size={16} />
                  <span>support@interviewai.com</span>
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; 2026 InterviewAI &mdash; Built with React + Vite
          </p>
          <div className="footer-social-icons">
            <a href="mailto:support@interviewai.com" title="Email Us">
              <Mail size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
