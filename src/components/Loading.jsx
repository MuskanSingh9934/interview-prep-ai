import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      color: '#AAB3C5',
      gap: '12px'
    }}>
      <Loader2 
        style={{
          animation: 'spin 1s linear infinite',
          color: '#8B5CF6'
        }} 
        size={36} 
      />
      <p style={{ fontSize: '15px', fontWeight: 500 }}>{message}</p>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
