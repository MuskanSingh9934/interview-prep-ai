import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Bell, Shield, Globe, Sun, Moon, 
  Lock, Mail, Save, RefreshCw, KeyRound, AlertTriangle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/settings.css';
import '../styles/dashboard.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');
  const [profile, setProfile] = useState({
    name: 'Muskan',
    email: 'muskan@example.com',
    role: 'Frontend Developer',
    experience: '2 Years'
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    interviewReminders: true,
    weeklyInsights: false,
    aiSuggestions: true
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30'
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSecurityToggle = (key) => {
    setSecurity(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSettings = () => {
    alert('Settings saved successfully!');
  };

  const tabVariants = {
    hidden: { opacity: 0, x: 15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -15, transition: { duration: 0.2 } }
  };

  return (
    <div className="dashboard-app-container">
      <Sidebar />
      <div className="dashboard-main-content">
        <Navbar />
        <main className="dashboard-scrollable" style={{ padding: '40px' }}>
          <div className="settings-header">
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">Manage your account preferences, notifications, and security settings.</p>
          </div>

          <div className="settings-layout">
            {/* Navigation Sidebar */}
            <div className="settings-nav">
              <button 
                className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} />
                Profile Settings
              </button>
              <button 
                className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18} />
                Notifications
              </button>
              <button 
                className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Shield size={18} />
                Security & Access
              </button>
              <button 
                className={`settings-nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                <Globe size={18} />
                Preferences
              </button>
            </div>

            {/* Dynamic Content Panel */}
            <div className="settings-content">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div 
                    key="profile"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={tabVariants}
                  >
                    <h2 className="settings-section-title">Profile Settings</h2>
                    <div className="settings-group">
                      <label className="settings-label">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="settings-input" 
                      />
                    </div>
                    <div className="settings-group">
                      <label className="settings-label">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="settings-input" 
                      />
                    </div>
                    <div className="settings-group">
                      <label className="settings-label">Target Role</label>
                      <input 
                        type="text" 
                        name="role"
                        value={profile.role}
                        onChange={handleProfileChange}
                        className="settings-input" 
                      />
                    </div>
                    <div className="settings-group">
                      <label className="settings-label">Experience Level</label>
                      <select 
                        name="experience"
                        value={profile.experience} 
                        onChange={handleProfileChange}
                        className="settings-select"
                      >
                        <option value="Entry Level">Entry Level</option>
                        <option value="2 Years">2 Years</option>
                        <option value="Mid Level">Mid Level (3-5 Years)</option>
                        <option value="Senior Level">Senior Level (5+ Years)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div 
                    key="notifications"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={tabVariants}
                  >
                    <h2 className="settings-section-title">Notification Settings</h2>
                    
                    <div className="settings-row">
                      <div className="settings-row-info">
                        <span className="settings-row-title">Email Notifications</span>
                        <span className="settings-row-desc">Receive summaries and system updates via email.</span>
                      </div>
                      <label className="settings-switch">
                        <input 
                          type="checkbox" 
                          checked={notifications.emailAlerts}
                          onChange={() => handleNotificationToggle('emailAlerts')}
                        />
                        <span className="settings-slider"></span>
                      </label>
                    </div>

                    <div className="settings-row">
                      <div className="settings-row-info">
                        <span className="settings-row-title">Interview Reminders</span>
                        <span className="settings-row-desc">Get notified before your scheduled practice sessions.</span>
                      </div>
                      <label className="settings-switch">
                        <input 
                          type="checkbox" 
                          checked={notifications.interviewReminders}
                          onChange={() => handleNotificationToggle('interviewReminders')}
                        />
                        <span className="settings-slider"></span>
                      </label>
                    </div>

                    <div className="settings-row">
                      <div className="settings-row-info">
                        <span className="settings-row-title">Weekly Performance Insights</span>
                        <span className="settings-row-desc">Detailed analytics and progress trends sent to you weekly.</span>
                      </div>
                      <label className="settings-switch">
                        <input 
                          type="checkbox" 
                          checked={notifications.weeklyInsights}
                          onChange={() => handleNotificationToggle('weeklyInsights')}
                        />
                        <span className="settings-slider"></span>
                      </label>
                    </div>

                    <div className="settings-row">
                      <div className="settings-row-info">
                        <span className="settings-row-title">AI Recommendations</span>
                        <span className="settings-row-desc">Tailored feedback and topics suggestions based on your weak areas.</span>
                      </div>
                      <label className="settings-switch">
                        <input 
                          type="checkbox" 
                          checked={notifications.aiSuggestions}
                          onChange={() => handleNotificationToggle('aiSuggestions')}
                        />
                        <span className="settings-slider"></span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div 
                    key="security"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={tabVariants}
                  >
                    <h2 className="settings-section-title">Security & Access</h2>

                    <div className="settings-group">
                      <label className="settings-label">Current Password</label>
                      <div style={{ position: 'relative' }}>
                        <input type="password" placeholder="••••••••" className="settings-input" />
                        <KeyRound size={18} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                      </div>
                    </div>

                    <div className="settings-group">
                      <label className="settings-label">New Password</label>
                      <input type="password" placeholder="••••••••" className="settings-input" />
                    </div>

                    <div className="settings-row">
                      <div className="settings-row-info">
                        <span className="settings-row-title">Two-Factor Authentication</span>
                        <span className="settings-row-desc">Secure your account using an authenticator app.</span>
                      </div>
                      <label className="settings-switch">
                        <input 
                          type="checkbox" 
                          checked={security.twoFactor}
                          onChange={() => handleSecurityToggle('twoFactor')}
                        />
                        <span className="settings-slider"></span>
                      </label>
                    </div>

                    <div className="settings-group" style={{ marginTop: '24px' }}>
                      <label className="settings-label">Automatic Session Timeout</label>
                      <select 
                        value={security.sessionTimeout}
                        onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                        className="settings-select"
                      >
                        <option value="15">15 Minutes</option>
                        <option value="30">30 Minutes</option>
                        <option value="60">1 Hour</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'preferences' && (
                  <motion.div 
                    key="preferences"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={tabVariants}
                  >
                    <h2 className="settings-section-title">Preferences</h2>

                    <div className="settings-row">
                      <div className="settings-row-info">
                        <span className="settings-row-title">Appearance Theme</span>
                        <span className="settings-row-desc">Switch between dark premium mode and light mode.</span>
                      </div>
                      <div 
                        onClick={() => setDarkMode(!darkMode)}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          cursor: 'pointer',
                          padding: '10px 16px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {darkMode ? (
                          <>
                            <Moon size={18} color="#8B5CF6" />
                            <span style={{ fontSize: '0.9rem' }}>Dark Mode</span>
                          </>
                        ) : (
                          <>
                            <Sun size={18} color="#f59e0b" />
                            <span style={{ fontSize: '0.9rem' }}>Light Mode</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="settings-group" style={{ marginTop: '24px' }}>
                      <label className="settings-label">Language Selector</label>
                      <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="settings-select"
                      >
                        <option value="en">English (US)</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="hi">हिन्दी</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Save/Cancel actions */}
              <div className="settings-actions">
                <button className="btn-cancel">Cancel</button>
                <button className="btn-save" onClick={saveSettings}>
                  <Save size={16} style={{ marginRight: '6px' }} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
