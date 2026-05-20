import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Settings as SettingsIcon, LogOut, Video } from 'lucide-react';
import '../styles/dashboard.css';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="dash-sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon-bg">
          <Video size={20} className="logo-icon" />
        </div>
        <span className="logo-text">AI Interviewer</span>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <p className="nav-section-title">MAIN MENU</p>
          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/interview" className={`nav-item ${isActive('/interview')}`}>
            <Users size={20} />
            <span>Interviews</span>
          </Link>
          <Link to="/results" className={`nav-item ${isActive('/results')}`}>
            <BarChart3 size={20} />
            <span>Analytics</span>
          </Link>
        </div>

        <div className="nav-section mt-auto">
          <p className="nav-section-title">SYSTEM</p>
          <Link to="/settings" className={`nav-item ${isActive('/settings')}`}>
            <SettingsIcon size={20} />
            <span>Settings</span>
          </Link>
          <Link to="/login" className="nav-item logout">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
