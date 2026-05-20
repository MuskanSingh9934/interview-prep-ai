import React from 'react';
import '../styles/global.css';

const QuestionCard = ({ question, feedback, score }) => {
  return (
    <div className="question-card">
      <div className="question-header">
        <h5>{question}</h5>
        <span className="question-score">{score}/10</span>
      </div>
      <div className="question-feedback">
        <p><strong>AI Feedback:</strong> {feedback}</p>
      </div>
    </div>
  );
};

export default QuestionCard;
