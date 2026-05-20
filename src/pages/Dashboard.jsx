import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardCards from '../components/DashboardCards';
import ScoreChart from '../components/ScoreChart';
import TopicPerformanceChart from '../components/TopicPerformanceChart';
import WeeklyAnalyticsChart from '../components/WeeklyAnalyticsChart';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getResults } from '../services/api';
import { Target, TrendingUp, Award, AlertTriangle, Calendar, ChevronRight, Video } from 'lucide-react';
import '../styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState(null);

  const recentInterviews = [
    { id: 1, role: 'Senior Frontend Developer', company: 'TechCorp', date: 'Today, 10:00 AM', score: 92, status: 'Completed' },
    { id: 2, role: 'Full Stack Engineer', company: 'StartupX', date: 'Yesterday', score: 85, status: 'Completed' },
    { id: 3, role: 'React Native Dev', company: 'MobileApp Inc', date: 'Oct 15, 2026', score: 0, status: 'Upcoming' },
  ];

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getResults();
      setBackendStatus(data);
    } catch (err) {
      setError('Could not connect to backend server. Make sure it is running on http://localhost:5000');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-app-container">
      <Sidebar />
      <div className="dashboard-main-content">
        <Navbar />
        <main className="dashboard-scrollable">
          
          <ErrorMessage message={error} onRetry={fetchDashboardData} />

          <div className="dashboard-header-section">
            <div>
              <h1 className="dashboard-greeting">Your AI Interview Journey Starts Here 🚀</h1>
              <p className="dashboard-subgreeting">Elevate your skills, master complex topics, and land your dream role.</p>
            </div>
            <button className="new-interview-btn" onClick={() => navigate('/topics')}>
              <Video size={18} />
              Start Mock Interview
            </button>
          </div>

          {loading ? (
            <Loading message="Fetching metrics from backend..." />
          ) : (
            <>
              {backendStatus && (
                <div style={{
                  margin: '0 20px 20px 20px',
                  padding: '8px 16px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#86EFAC',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }}></span>
                  Connected to Backend. API Status: Active
                </div>
              )}

              <div className="stats-grid">
                <DashboardCards title="Total Interviews" value="24" icon={Target} trend="up" trendValue="12" colorClass="icon-blue" />
                <DashboardCards title="Average Score" value="86%" icon={TrendingUp} trend="up" trendValue="5" colorClass="icon-green" />
                <DashboardCards title="Completion Rate" value="95%" icon={Award} trend="up" trendValue="2" colorClass="icon-purple" />
                <DashboardCards title="Weakest Topic" value="System Design" icon={AlertTriangle} trend="down" trendValue="8" colorClass="icon-red" />
              </div>

              <div className="charts-grid-main">
                <ScoreChart />
                <TopicPerformanceChart />
              </div>
              
              <div className="charts-grid-full">
                 <WeeklyAnalyticsChart />
              </div>

              <div className="recent-section glass-panel">
                <div className="recent-header">
                  <h3>Recent Interviews</h3>
                  <a href="/results" className="view-all-link">View All <ChevronRight size={16} /></a>
                </div>
                <div className="interview-list-modern">
                  {recentInterviews.map((interview) => (
                    <div key={interview.id} className="interview-row">
                      <div className="interview-info-col">
                        <div className="interview-icon-sm">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h4 className="interview-role">{interview.role}</h4>
                          <p className="interview-company">{interview.company}</p>
                        </div>
                      </div>
                      <div className="interview-date-col">
                        {interview.date}
                      </div>
                      <div className="interview-score-col">
                        {interview.status === 'Completed' ? (
                          <span className={`score-badge ${interview.score >= 90 ? 'score-excellent' : 'score-good'}`}>
                            {interview.score}%
                          </span>
                        ) : (
                          <span className="status-badge-upcoming">Upcoming</span>
                        )}
                      </div>
                      <div className="interview-action-col">
                        <button className="btn-outline-sm" onClick={() => navigate('/results')}>Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
