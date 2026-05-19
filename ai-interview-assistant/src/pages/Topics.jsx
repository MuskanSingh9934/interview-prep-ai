import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Code2, Server, Database, 
  Users, BrainCircuit, Play,
  Clock, BarChart
} from 'lucide-react';
import '../styles/topics.css';

const FigmaIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke={color}
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path>
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z"></path>
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>
    <path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5a3.5 3.5 0 1 1-7 0z"></path>
  </svg>
);

const topicsData = [
  {
    id: 'react',
    title: 'React',
    icon: <Code2 size={32} color="#61DAFB" />,
    difficulty: 'Intermediate',
    duration: '30 mins',
    description: 'Hooks, components, state management, and React performance.'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    icon: <Database size={32} color="#F7DF1E" />,
    difficulty: 'Intermediate',
    duration: '45 mins',
    description: 'Closures, promises, event loop, and ES6+ features.'
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: <Code2 size={32} color="#E34F26" />,
    difficulty: 'Beginner',
    duration: '30 mins',
    description: 'HTML5, CSS3, accessibility, and responsive design basics.'
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: <Server size={32} color="#4DB33D" />,
    difficulty: 'Hard',
    duration: '60 mins',
    description: 'APIs, databases, system design, and server architecture.'
  },
  {
    id: 'hr',
    title: 'HR',
    icon: <Users size={32} color="#8B5CF6" />,
    difficulty: 'Beginner',
    duration: '20 mins',
    description: 'Behavioral questions, teamwork, and cultural fit.'
  },
  {
    id: 'dsa',
    title: 'DSA',
    icon: <BrainCircuit size={32} color="#EF4444" />,
    difficulty: 'Hard',
    duration: '60 mins',
    description: 'Data structures, algorithms, and complex problem-solving.'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX',
    icon: <FigmaIcon size={32} color="#F24E1E" />,
    difficulty: 'Intermediate',
    duration: '30 mins',
    description: 'Design principles, wireframing, and user research.'
  }
];

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredTopics = topicsData.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="topics-container">
      <div className="topics-header">
        <motion.h1 
          className="topics-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Select an Interview Topic
        </motion.h1>
        <motion.p 
          className="topics-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Choose a specific area to focus your practice. Our AI will tailor the questions to your selected topic and difficulty.
        </motion.p>
      </div>

      <motion.div 
        className="search-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search topics, skills, or roles..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <motion.div 
        className="topics-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredTopics.map((topic) => (
          <motion.div key={topic.id} className="topic-card" variants={itemVariants}>
            <div className="topic-header">
              <div className="topic-icon-wrapper">
                {topic.icon}
              </div>
              <h2 className="topic-title">{topic.title}</h2>
            </div>
            
            <p style={{ color: '#AAB3C5', marginBottom: '20px', lineHeight: '1.5' }}>
              {topic.description}
            </p>

            <div className="topic-stats">
              <span className={`stat-badge difficulty-${topic.difficulty.toLowerCase()}`}>
                <BarChart size={14} />
                {topic.difficulty}
              </span>
              <span className="stat-badge">
                <Clock size={14} />
                {topic.duration}
              </span>
            </div>

            <button 
              className="topic-btn"
              onClick={() => navigate(`/interview?topic=${topic.id}`)}
            >
              <Play size={18} fill="currentColor" />
              Start Interview
            </button>
          </motion.div>
        ))}
        {filteredTopics.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#AAB3C5' }}>
            No topics found matching "{searchTerm}". Try a different search term.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Topics;
