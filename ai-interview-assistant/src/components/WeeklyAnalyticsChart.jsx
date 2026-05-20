import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/dashboard.css';

const data = [
  { name: 'Week 1', Technical: 65, Communication: 78, ProblemSolving: 70 },
  { name: 'Week 2', Technical: 70, Communication: 82, ProblemSolving: 76 },
  { name: 'Week 3', Technical: 82, Communication: 85, ProblemSolving: 80 },
  { name: 'Week 4', Technical: 90, Communication: 88, ProblemSolving: 85 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-value" style={{ color: entry.color, margin: '4px 0' }}>
            {entry.name}: <span>{entry.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const WeeklyAnalyticsChart = () => {
  return (
    <div className="chart-wrapper glass-panel">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Skill Progression</h3>
          <p className="chart-subtitle">Multi-dimensional weekly analytics</p>
        </div>
      </div>
      <div className="chart-container-inner" style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
            <Bar dataKey="Technical" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={1500} />
            <Bar dataKey="Communication" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={1500} />
            <Bar dataKey="ProblemSolving" fill="#8b5cf6" radius={[4, 4, 0, 0]} animationDuration={1500} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyAnalyticsChart;
