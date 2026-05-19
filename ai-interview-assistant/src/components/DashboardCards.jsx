import React from 'react';
import '../styles/dashboard.css';

const DashboardCards = ({ title, value, icon: Icon, trend, trendValue, colorClass }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className="stat-card glass-panel">
      <div className="stat-card-header">
        <div className={`stat-icon-wrapper ${colorClass}`}>
          <Icon size={24} />
        </div>
        <div className={`stat-trend ${isPositive ? 'trend-up' : 'trend-down'}`}>
          {isPositive ? '+' : '-'}{trendValue}%
        </div>
      </div>
      <div className="stat-card-body">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );
};

export default DashboardCards;
