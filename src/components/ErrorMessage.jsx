import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div style={{
      background: 'rgba(239, 68, 68, 0.12)',
      border: '1px solid rgba(239, 68, 68, 0.25)',
      borderRadius: '12px',
      padding: '16px 20px',
      margin: '20px',
      color: '#FCA5A5',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <AlertCircle size={18} style={{ color: '#EF4444' }} />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '6px',
            color: '#FFF',
            padding: '6px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
        >
          <RefreshCw size={12} /> Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
