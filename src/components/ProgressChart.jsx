import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import '../styles/dashboard.css';

const data = [
  { topic: 'React', score: 92 },
  { topic: 'System Design', score: 65 },
  { topic: 'Algorithms', score: 78 },
  { topic: 'CSS', score: 88 },
  { topic: 'Behavioral', score: 95 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">Proficiency: <span>{payload[0].value}%</span></p>
      </div>
    );
  }
  return null;
};

const ProgressChart = () => {
  return (
    <div className="chart-wrapper glass-panel">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Topic Analytics</h3>
          <p className="chart-subtitle">Strengths & Weaknesses</p>
        </div>
      </div>
      <div className="chart-container-inner" style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis dataKey="topic" type="category" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} width={100} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.score > 80 ? '#10b981' : entry.score > 70 ? '#3b82f6' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
