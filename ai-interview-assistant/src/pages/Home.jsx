import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, BrainCircuit, Target, Zap, CheckCircle, 
  ArrowRight, Shield, BarChart3, Users, Star
} from 'lucide-react';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="home-container">
      <div className="glow-bg"></div>
      <div className="glow-bg-right"></div>

      <div className="section-wrapper">
        {/* Navbar */}
        <nav className="home-nav">
          <div className="logo">
            <Bot size={28} color="#a855f7" />
            <span>InterviewAI</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#pricing">Pricing</a>
            <button className="btn nav-btn" onClick={() => navigate('/login')}>Sign In</button>
          </div>
        </nav>

        {/* Hero Section */}
        <motion.section 
          className="hero-section"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <Zap size={16} />
            <span>V2.0 Now Live - Smarter AI Models</span>
          </motion.div>
          
          <motion.h1 className="hero-title" variants={itemVariants}>
            Master Your Next Interview <br />
            With <span>AI Intelligence</span>
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Practice with our advanced AI interviewer. Get real-time feedback, personalized questions, and comprehensive analytics to land your dream job.
          </motion.p>
          
          <motion.div className="hero-cta" variants={itemVariants}>
            <button className="btn-primary" onClick={() => navigate('/interview')}>
              Start Free Practice <ArrowRight size={20} />
            </button>
            <button className="btn-outline" onClick={() => navigate('/dashboard')}>
              View Demo Dashboard
            </button>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="section-header">
            <h2 className="section-title">Why Choose InterviewAI?</h2>
            <p className="section-subtitle">Powerful features designed to accelerate your career growth.</p>
          </div>
          
          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon"><BrainCircuit size={28} /></div>
              <h3 className="feature-title">Smart Question Generation</h3>
              <p className="feature-desc">Our AI adapts to your resume and target role, generating highly relevant and challenging technical questions.</p>
            </motion.div>
            
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon"><Target size={28} /></div>
              <h3 className="feature-title">Real-time Feedback</h3>
              <p className="feature-desc">Get instant, actionable feedback on your answers, highlighting strengths and specific areas for improvement.</p>
            </motion.div>
            
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon"><BarChart3 size={28} /></div>
              <h3 className="feature-title">Deep Analytics</h3>
              <p className="feature-desc">Track your progress over time with comprehensive dashboards, performance scores, and skill matrices.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="testimonials-section">
          <div className="section-header">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">Join thousands of developers who landed their dream roles.</p>
          </div>

          <motion.div 
            className="testimonials-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div className="testimonial-card" variants={itemVariants}>
              <span className="quote-icon">"</span>
              <p className="testimonial-text">"The AI feedback was incredibly accurate. It pointed out flaws in my system design explanations that I never noticed. I landed a Senior Role at a FAANG company just two weeks later."</p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div className="author-info">
                  <h4>Sarah Jenkins</h4>
                  <p>Senior Frontend Engineer</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <span className="quote-icon">"</span>
              <p className="testimonial-text">"I used to get massive anxiety before technical interviews. Practicing with InterviewAI built my confidence immensely. The real-time scoring is a game changer."</p>
              <div className="testimonial-author">
                <div className="author-avatar">D</div>
                <div className="author-info">
                  <h4>David Chen</h4>
                  <p>Full Stack Developer</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <span className="quote-icon">"</span>
              <p className="testimonial-text">"The analytics dashboard showed me exactly which React topics I was weak in. I focused my study time efficiently and passed my next technical screen with flying colors."</p>
              <div className="testimonial-author">
                <div className="author-avatar">M</div>
                <div className="author-info">
                  <h4>Michael Rodriguez</h4>
                  <p>React Engineer</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="pricing-section">
          <div className="section-header">
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">Invest in your career with our flexible plans.</p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3 className="plan-name">Basic</h3>
              <div className="plan-price">$0<span>/mo</span></div>
              <ul className="plan-features">
                <li><CheckCircle size={18} /> 5 Mock Interviews / month</li>
                <li><CheckCircle size={18} /> Basic AI Feedback</li>
                <li><CheckCircle size={18} /> Standard Question Bank</li>
              </ul>
              <button className="pricing-btn pricing-btn-outline" onClick={() => navigate('/login')}>Get Started</button>
            </div>

            <div className="pricing-card popular">
              <div className="popular-badge">MOST POPULAR</div>
              <h3 className="plan-name">Pro</h3>
              <div className="plan-price">$29<span>/mo</span></div>
              <ul className="plan-features">
                <li><CheckCircle size={18} /> Unlimited Mock Interviews</li>
                <li><CheckCircle size={18} /> Advanced AI Analytics</li>
                <li><CheckCircle size={18} /> Custom Resume Tailoring</li>
                <li><CheckCircle size={18} /> Premium Support</li>
              </ul>
              <button className="btn-primary pricing-btn" onClick={() => navigate('/login')}>Upgrade to Pro</button>
            </div>

            <div className="pricing-card">
              <h3 className="plan-name">Enterprise</h3>
              <div className="plan-price">$99<span>/mo</span></div>
              <ul className="plan-features">
                <li><CheckCircle size={18} /> Everything in Pro</li>
                <li><CheckCircle size={18} /> Team Dashboard</li>
                <li><CheckCircle size={18} /> Custom Question Sets</li>
                <li><CheckCircle size={18} /> API Access</li>
              </ul>
              <button className="pricing-btn pricing-btn-outline" onClick={() => navigate('/login')}>Contact Sales</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-col">
              <div className="logo" style={{ marginBottom: '16px' }}>
                <Bot size={24} color="#a855f7" />
                <span>InterviewAI</span>
              </div>
              <p>Empowering developers to ace their interviews with next-generation AI technology.</p>
            </div>
            <div className="footer-col">
              <h3>Product</h3>
              <ul className="footer-links">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Testimonials</a></li>
                <li><a href="#">Changelog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Resources</h3>
              <ul className="footer-links">
                <li><a href="#">Blog</a></li>
                <li><a href="#">Interview Guides</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Help Center</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Legal</h3>
              <ul className="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Shield size={20} />
              <Users size={20} />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
