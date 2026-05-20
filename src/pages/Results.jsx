import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { 
  CheckCircle, XCircle, AlertCircle, 
  RotateCcw, LayoutDashboard, PlayCircle,
  TrendingUp, Award, Target, Zap
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/results.css';

const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="tooltip-item">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve evaluation details passed from navigation state or localStorage fallback
  const lastEval = location.state || JSON.parse(localStorage.getItem('lastEvaluation')) || {
    score: 85,
    feedback: "Good answer",
    topic: "React"
  };

  const finalScore = lastEval.score !== undefined ? lastEval.score : 85;
  const feedbackText = lastEval.feedback || "Good answer";
  const topicName = lastEval.topic || "React";

  const dummyScoreData = {
    finalScore: finalScore,
    accuracy: finalScore,
    totalQuestions: 1,
    correctAnswers: finalScore >= 50 ? 1 : 0,
    wrongAnswers: finalScore < 50 ? 1 : 0,
    skipped: 0,
  };

  const dummyPieData = [
    { name: 'Correct', value: finalScore >= 50 ? 1 : 0, color: '#22C55E' },
    { name: 'Wrong', value: finalScore < 50 ? 1 : 0, color: '#EF4444' },
    { name: 'Skipped', value: 0, color: '#6366F1' }
  ];

  const dummyTopicData = [
    { topic: topicName, score: finalScore },
    { topic: 'JavaScript', score: 75 },
    { topic: 'CSS', score: 85 },
    { topic: 'HTML', score: 95 },
  ];

  const dummyGrowthData = [
    { name: 'Int 1', score: 65 },
    { name: 'Int 2', score: 72 },
    { name: 'Int 3', score: 78 },
    { name: 'Int 4', score: finalScore },
  ];

  const feedback = {
    strengths: [
      `Demonstrated key theoretical knowledge in ${topicName}.`,
      "Structured formatting and clear logical explanations.",
      "Identified main principles correctly."
    ],
    improvements: [
      feedbackText,
      "Expand on edge cases and concrete performance tuning strategies.",
      "Work on depth and conciseness during explanations."
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  return (
    <motion.div 
      className="results-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="results-header" variants={itemVariants}>
        <h1 className="results-title">Outstanding Work ✨</h1>
        <p className="results-subtitle">Your AI performance analysis and interview insights are ready.</p>
      </motion.div>

      {/* SECTION 1 - SCORE SUMMARY */}
      <motion.div className="score-hero-section" variants={itemVariants}>
        <div className="score-card score-card-final">
          <div className="score-icon">
            <Award size={28} color="#8B5CF6" />
          </div>
          <div className="score-label">Final Score</div>
          <div className="score-value highlight-final">
            <CountUp end={dummyScoreData.finalScore} /><span>/ 100</span>
          </div>
        </div>
        
        <div className="score-card score-card-accuracy">
          <div className="score-icon">
            <Target size={28} color="#06B6D4" />
          </div>
          <div className="score-label">Accuracy</div>
          <div className="score-value highlight-accuracy">
            <CountUp end={dummyScoreData.accuracy} /><span>%</span>
          </div>
        </div>
        
        <div className="score-card score-card-correct">
          <div className="score-icon">
            <CheckCircle size={28} color="#22C55E" />
          </div>
          <div className="score-label">Correct Answers</div>
          <div className="score-value highlight-correct">
            <CountUp end={dummyScoreData.correctAnswers} /><span>/ {dummyScoreData.totalQuestions}</span>
          </div>
        </div>
        
        <div className="score-card score-card-wrong">
          <div className="score-icon">
            <XCircle size={28} color="#EF4444" />
          </div>
          <div className="score-label">Wrong Answers</div>
          <div className="score-value highlight-wrong">
            <CountUp end={dummyScoreData.wrongAnswers} /><span>/ {dummyScoreData.totalQuestions}</span>
          </div>
        </div>
      </motion.div>

      {/* SECTION 2 - PERFORMANCE ANALYTICS */}
      <motion.div className="analytics-grid" variants={itemVariants}>
        <div className="chart-card">
          <h2 className="chart-title"><Zap size={22} color="#8B5CF6" /> Answer Breakdown</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dummyPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                  stroke="none"
                >
                  {dummyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h2 className="chart-title"><TrendingUp size={22} color="#06B6D4" /> Score Growth</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyGrowthData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#AAB3C5" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#AAB3C5" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8B5CF6" 
                  strokeWidth={4}
                  dot={{ r: 5, fill: '#8B5CF6', strokeWidth: 3, stroke: '#12192F' }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#6366F1' }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card full-width">
          <h2 className="chart-title"><LayoutDashboard size={22} color="#22C55E" /> Topic Proficiency</h2>
          <div className="chart-container" style={{height: '280px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyTopicData} margin={{ top: 10, right: 0, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" vertical={false} />
                <XAxis dataKey="topic" stroke="#AAB3C5" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#AAB3C5" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255, 255, 255, 0.05)'}} />
                <Bar 
                  dataKey="score" 
                  fill="url(#colorScore2)" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1500}
                />
                <defs>
                  <linearGradient id="colorScore2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* SECTION 3 - TRACK PROGRESS */}
      <motion.div className="progress-section" variants={itemVariants}>
        <div className="chart-card full-width">
          <h2 className="chart-title">Topic Mastery</h2>
          <div style={{marginTop: '20px'}}>
            {dummyTopicData.map((item, index) => (
              <div key={index} className="topic-progress-item">
                <div className="topic-header">
                  <span className="topic-name">{item.topic}</span>
                  <span className="topic-score">{item.score}%</span>
                </div>
                <div className="progress-bar-bg">
                  <motion.div 
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 1.5, delay: 0.3 + index * 0.15 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 4 - AI FEEDBACK */}
      <motion.div className="feedback-section" variants={itemVariants}>
        <div className="feedback-card">
          <h2 className="feedback-title title-strengths">
            <CheckCircle size={24} /> Key Strengths
          </h2>
          <ul className="feedback-list">
            {feedback.strengths.map((str, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >{str}</motion.li>
            ))}
          </ul>
        </div>
        <div className="feedback-card">
          <h2 className="feedback-title title-improvements">
            <AlertCircle size={24} /> Areas for Improvement
          </h2>
          <ul className="feedback-list">
            {feedback.improvements.map((imp, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >{imp}</motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* SECTION 5 - NEXT ACTIONS */}
      <motion.div className="action-buttons" variants={itemVariants}>
        <button className="btn btn-secondary" onClick={() => navigate(`/interview?topic=${topicName.toLowerCase()}`)}>
          <RotateCcw size={20} /> Retry Interview
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          <LayoutDashboard size={20} /> View Dashboard
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/topics')}>
          <PlayCircle size={20} /> Start New Interview
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Results;
