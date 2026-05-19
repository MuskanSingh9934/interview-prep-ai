import React from 'react';
import '../styles/global.css';

const InterviewCard = ({ role, date, score, status }) => {
  return (
    <div className="interview-card">
      <div className="interview-header">
        <h4>{role}</h4>
        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
      </div>
      <div className="interview-details">
        <p>Date: {date}</p>
        <p>Score: {score}/100</p>
      </div>
      <button className="btn-secondary">View Details</button>
    </div>
  );
};

export default InterviewCard;
