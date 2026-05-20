import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, ChevronLeft, Send, CheckCircle2, AlertCircle, Brain, Target, BarChart2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/interview.css';

const dummyQuestions = [
  { id: 1, text: "What is the difference between useState and useEffect in React?", category: "React", difficulty: "Medium", timeLimit: 120 },
  { id: 2, text: "Explain the concept of closures in JavaScript with an example.", category: "JavaScript", difficulty: "Hard", timeLimit: 180 },
  { id: 3, text: "How do you optimize the performance of a React application?", category: "React", difficulty: "Hard", timeLimit: 180 },
  { id: 4, text: "Describe a time when you had to resolve a conflict within your team.", category: "Behavioral", difficulty: "Easy", timeLimit: 120 },
  { id: 5, text: "What are CSS variables and how do they differ from preprocessor variables like SASS?", category: "CSS", difficulty: "Medium", timeLimit: 90 },
];

const Interview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(dummyQuestions[0].timeLimit);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = dummyQuestions[currentIndex];
  const totalQuestions = dummyQuestions.length;
  const progressPercentage = ((currentIndex) / totalQuestions) * 100;
  const completedCount = Object.keys(answers).filter(k => answers[k]?.trim().length > 0).length;

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isSubmitted]);

  // Reset timer on question change (optional behavior, implemented here to simulate per-question time)
  useEffect(() => {
    setTimeLeft(currentQuestion.timeLimit);
  }, [currentIndex, currentQuestion.timeLimit]);

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentIndex]: e.target.value
    });
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Submit logic goes here (e.g. redirect to Results)
    setTimeout(() => {
      window.location.href = '/results';
    }, 2000);
  };

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isLowTime = timeLeft <= 30;

  return (
    <div className="interview-page">
      <Navbar />
      
      {isSubmitted ? (
        <div className="submit-overlay">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="submit-success glass-panel"
          >
            <CheckCircle2 size={64} color="#10b981" />
            <h2>Interview Submitted!</h2>
            <p>Analyzing your responses with AI...</p>
          </motion.div>
        </div>
      ) : (
        <main className="interview-layout">
          
          {/* Main Content Area */}
          <div className="interview-main">
            
            {/* Progress Bar */}
            <div className="interview-progress-section">
              <div className="progress-header">
                <span className="progress-text">Interview Progress</span>
                <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="progress-bar-bg">
                <motion.div 
                  className="progress-bar-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="question-card glass-panel"
              >
                <div className="qc-header">
                  <span className="q-number">Question {currentIndex + 1} of {totalQuestions}</span>
                  <div className="q-badges">
                    <span className={`badge diff-${currentQuestion.difficulty.toLowerCase()}`}>
                      {currentQuestion.difficulty}
                    </span>
                    <span className="badge category">
                      {currentQuestion.category}
                    </span>
                  </div>
                </div>
                <h2 className="q-text">{currentQuestion.text}</h2>
              </motion.div>
            </AnimatePresence>

            {/* Answer Input Area */}
            <div className="answer-section">
              <motion.textarea 
                className="answer-input glass-panel"
                placeholder="Type your detailed answer here..."
                value={answers[currentIndex] || ''}
                onChange={handleAnswerChange}
                whileFocus={{ scale: 1.01, borderColor: '#8b5cf6', boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Navigation Controls */}
            <div className="interview-controls">
              <button 
                className="btn-outline-nav" 
                onClick={handlePrev} 
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={20} /> Previous
              </button>
              
              {currentIndex === totalQuestions - 1 ? (
                <motion.button 
                  className="btn-submit-glow"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Interview <Send size={18} />
                </motion.button>
              ) : (
                <button 
                  className="btn-primary-nav" 
                  onClick={handleNext}
                >
                  Next Question <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="interview-sidebar">
            
            {/* Timer Card */}
            <motion.div 
              className={`timer-card glass-panel ${isLowTime ? 'time-low' : ''}`}
              animate={isLowTime ? { scale: [1, 1.02, 1], boxShadow: ["0 0 10px rgba(239, 68, 68, 0.2)", "0 0 30px rgba(239, 68, 68, 0.6)", "0 0 10px rgba(239, 68, 68, 0.2)"] } : {}}
              transition={isLowTime ? { repeat: Infinity, duration: 1 } : {}}
            >
              <div className="timer-icon-bg">
                <Clock size={24} color={isLowTime ? '#ef4444' : '#6366f1'} />
              </div>
              <div className="timer-info">
                <span className="timer-label">Time Left</span>
                <span className="timer-value">{formatTime(timeLeft)}</span>
              </div>
            </motion.div>

            {/* Info Panel */}
            <div className="info-panel glass-panel">
              <h3 className="panel-title">Session Info</h3>
              
              <div className="info-item">
                <div className="info-icon bg-blue"><Brain size={18} /></div>
                <div className="info-text">
                  <span className="info-label">Current Topic</span>
                  <span className="info-val">Frontend Dev</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon bg-purple"><CheckCircle2 size={18} /></div>
                <div className="info-text">
                  <span className="info-label">Answered</span>
                  <span className="info-val">{completedCount} / {totalQuestions}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon bg-green"><Target size={18} /></div>
                <div className="info-text">
                  <span className="info-label">Expected Score</span>
                  <span className="info-val">Analyzing...</span>
                </div>
              </div>
              
            </div>

            {/* AI Assistant Tip */}
            <div className="ai-tip-card glass-panel">
              <div className="ai-tip-header">
                <Brain size={18} color="#a855f7" />
                <span>AI Assistant Tip</span>
              </div>
              <p>For technical questions, always start with a brief summary before diving into implementation details. It shows clear communication.</p>
            </div>

          </div>

        </main>
      )}
    </div>
  );
};

export default Interview;
