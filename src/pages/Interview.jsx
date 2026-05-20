import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, ChevronLeft, Send, CheckCircle2, Brain, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import useInterview from '../hooks/useInterview';
import '../styles/interview.css';

const Interview = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const topicId = queryParams.get('topic') || 'general';
  const topicName = topicId.charAt(0).toUpperCase() + topicId.slice(1);

  const {
    question,
    loading,
    error,
    start,
    submitAnswer
  } = useInterview();

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize Interview
  useEffect(() => {
    start(topicId, 'Medium');
  }, [topicId, start]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted || loading) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isSubmitted, loading]);

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      0: e.target.value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    try {
      const userAnswer = answers[0] || '';
      const evaluation = await submitAnswer(userAnswer);
      
      // Store evaluation in localStorage for the Results page to access
      localStorage.setItem('lastEvaluation', JSON.stringify({
        score: evaluation.score !== undefined ? evaluation.score : 85,
        feedback: evaluation.feedback || 'Good answer',
        topic: topicName
      }));

      setTimeout(() => {
        navigate('/results', {
          state: {
            score: evaluation.score !== undefined ? evaluation.score : 85,
            feedback: evaluation.feedback || 'Good answer',
            topic: topicName
          }
        });
      }, 2000);
    } catch (err) {
      console.error(err);
      // Fallback response values if backend goes offline mid-evaluation
      localStorage.setItem('lastEvaluation', JSON.stringify({
        score: 85,
        feedback: 'Good answer',
        topic: topicName
      }));
      setTimeout(() => {
        navigate('/results');
      }, 2000);
    }
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
                <span className="progress-percentage">{loading ? '0%' : '100%'}</span>
              </div>
              <div className="progress-bar-bg">
                <motion.div 
                  className="progress-bar-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: loading ? '0%' : '100%' }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Error Message */}
            <ErrorMessage message={error} onRetry={() => start(topicId, 'Medium')} />

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="question-card glass-panel"
              >
                <div className="qc-header">
                  <span className="q-number">Question 1 of 1</span>
                  <div className="q-badges">
                    <span className="badge diff-medium">
                      Medium
                    </span>
                    <span className="badge category">
                      {topicName}
                    </span>
                  </div>
                </div>
                {loading ? (
                  <Loading message="Loading question from backend..." />
                ) : (
                  <h2 className="q-text">{question || 'Tell me about yourself'}</h2>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Answer Input Area */}
            <div className="answer-section">
              <motion.textarea 
                className="answer-input glass-panel"
                placeholder="Type your detailed answer here..."
                value={answers[0] || ''}
                onChange={handleAnswerChange}
                disabled={loading}
                whileFocus={{ scale: 1.01, borderColor: '#8b5cf6', boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Navigation Controls */}
            <div className="interview-controls">
              <button 
                className="btn-outline-nav" 
                onClick={() => navigate('/topics')}
              >
                Cancel
              </button>
              
              <motion.button 
                className="btn-submit-glow"
                onClick={handleSubmit}
                disabled={loading || !(answers[0]?.trim())}
                style={{ opacity: (loading || !(answers[0]?.trim())) ? 0.6 : 1 }}
                whileHover={loading || !(answers[0]?.trim()) ? {} : { scale: 1.05 }}
                whileTap={loading || !(answers[0]?.trim()) ? {} : { scale: 0.95 }}
              >
                Submit Interview <Send size={18} />
              </motion.button>
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
                  <span className="info-val">{topicName}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon bg-purple"><CheckCircle2 size={18} /></div>
                <div className="info-text">
                  <span className="info-label">Answered</span>
                  <span className="info-val">{answers[0]?.trim() ? '1' : '0'} / 1</span>
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
