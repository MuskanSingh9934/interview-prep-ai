import React from 'react';
import { motion } from 'framer-motion';
import { ListPlus, MessageSquare, Bot, TrendingUp, Award, ArrowRight, ArrowDown } from 'lucide-react';
import '../styles/interviewFlow.css';

const steps = [
  { 
    id: 1, 
    icon: ListPlus, 
    title: 'Choose Topic', 
    desc: 'Select React, JavaScript, DSA, Frontend, Backend, or HR topics.',
    color: '#3b82f6'
  },
  { 
    id: 2, 
    icon: MessageSquare, 
    title: 'Answer Questions', 
    desc: 'Practice MCQs, coding, and technical interview questions interactively.',
    color: '#8b5cf6'
  },
  { 
    id: 3, 
    icon: Bot, 
    title: 'Get AI Feedback', 
    desc: 'Receive instant AI-powered performance analysis and suggestions.',
    color: '#ec4899'
  },
  { 
    id: 4, 
    icon: TrendingUp, 
    title: 'Track Performance', 
    desc: 'View charts, analytics, scores, and progress reports.',
    color: '#10b981'
  },
  { 
    id: 5, 
    icon: Award, 
    title: 'Improve Skills', 
    desc: 'Identify weak areas and improve interview confidence step by step.',
    color: '#f59e0b'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

const InterviewFlow = () => {
  return (
    <section id="how-it-works" className="flow-section">
      <div className="section-header">
        <h2>How It <span className="text-gradient">Works</span></h2>
        <p>A proven, five-step pathway to mastering your next interview.</p>
      </div>

      <motion.div 
        className="flow-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={step.id}>
              <motion.div className="flow-card glass-panel" variants={itemVariants} whileHover={{ y: -10 }}>
                <div className="flow-step-number">{step.id}</div>
                <div className="flow-icon" style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`, color: step.color }}>
                  <Icon size={32} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>

              {!isLast && (
                <motion.div className="flow-connector" variants={itemVariants}>
                  <div className="connector-line"></div>
                  <ArrowRight size={24} className="arrow-right hidden-mobile" color="#64748b" />
                  <ArrowDown size={24} className="arrow-down visible-mobile" color="#64748b" />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </section>
  );
};

export default InterviewFlow;
