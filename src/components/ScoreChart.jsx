import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/dashboard.css';

const data = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 68 },
  { name: 'Week 4', score: 85 },
  { name: 'Week 5', score: 82 },
  { name: 'Week 6', score: 90 },
  { name: 'Week 7', score: 95 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">Score: <span>{payload[0].value}%</span></p>
      </div>
    );
  }
  return null;
};

const ScoreChart = () => {
  return (
    <div className="chart-wrapper glass-panel">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Score Progress</h3>
          <p className="chart-subtitle">Overall performance over time</p>
        </div>
      </div>
      <div className="chart-container-inner" style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#8b5cf6" 
              strokeWidth={4} 
              dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#1e1b4b' }} 
              activeDot={{ r: 6, fill: '#fff', stroke: '#8b5cf6' }} 
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreChart;
