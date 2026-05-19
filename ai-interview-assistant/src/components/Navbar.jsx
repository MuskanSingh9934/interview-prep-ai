import React from 'react';
import { Search, User } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import '../styles/dashboard.css';

const Navbar = () => {
  return (
    <header className="dash-navbar">
      <div className="navbar-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search interviews, topics..." className="search-input" />
      </div>
      
      <div className="navbar-actions">
        <NotificationCenter />
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">Muskan Singh</span>
            <span className="user-role">AI Engineer / Frontend Developer</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
