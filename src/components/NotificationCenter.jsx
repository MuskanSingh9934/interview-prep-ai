import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Calendar, Trophy, Zap, Clock, 
  CheckCircle2, Flame, Inbox, Trash2 
} from 'lucide-react';
import '../styles/notificationCenter.css';

const initialNotifications = [
  {
    id: 1,
    type: 'reminder',
    title: 'Upcoming Mock Interview',
    desc: 'Your scheduled System Design practice is starting in 15 minutes.',
    time: '15m ago',
    unread: true,
  },
  {
    id: 2,
    type: 'score',
    title: 'New Score Analytics Ready',
    desc: 'You scored 85% on your React Hook Interview. View your skill gap analysis.',
    time: '2h ago',
    unread: true,
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Achievement Unlocked: React Guru 👑',
    desc: 'Unlocked by scoring over 90% in 3 consecutive React technical interviews.',
    time: '1d ago',
    unread: false,
  },
  {
    id: 4,
    type: 'activity',
    title: '7-Day Streak Maintained',
    desc: 'Keep up the momentum! Ace your daily coding challenges to maintain the streak.',
    time: '2d ago',
    unread: false,
  }
];

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => n.unread).length;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case 'reminder':
        return <div className="notification-icon-wrapper icon-reminder"><Calendar size={18} /></div>;
      case 'score':
        return <div className="notification-icon-wrapper icon-score"><Zap size={18} /></div>;
      case 'achievement':
        return <div className="notification-icon-wrapper icon-achievement"><Trophy size={18} /></div>;
      case 'activity':
        return <div className="notification-icon-wrapper icon-activity"><Flame size={18} /></div>;
      default:
        return <div className="notification-icon-wrapper icon-activity"><Inbox size={18} /></div>;
    }
  };

  return (
    <div className="notification-center-container">
      {/* Bell Trigger */}
      <button className="nav-icon-btn" onClick={toggleDropdown} style={{ position: 'relative' }}>
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="notification-dropdown"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="notification-header">
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <button className="mark-read-btn" onClick={markAllAsRead}>
                  Mark all as read
                </button>
              )}
            </div>

            <div className="notification-list">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`notification-item ${n.unread ? 'unread' : ''}`}
                    onClick={() => markAsRead(n.id)}
                  >
                    {getIcon(n.type)}
                    <div className="notification-content">
                      <span className="notification-title">{n.title}</span>
                      <span className="notification-desc">{n.desc}</span>
                      <span className="notification-time">{n.time}</span>
                    </div>
                    <button 
                      style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: '#64748B', 
                        cursor: 'pointer',
                        marginLeft: 'auto',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onClick={(e) => deleteNotification(n.id, e)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="notification-empty">
                  <CheckCircle2 size={36} color="#64748B" />
                  <span>All caught up! No notifications.</span>
                </div>
              )}
            </div>

            <div className="notification-footer">
              <button className="view-all-btn">View All Alerts</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
