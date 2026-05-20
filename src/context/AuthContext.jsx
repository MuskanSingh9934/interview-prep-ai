import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, googleLogin } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for existing login on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const data = await loginUser(email, password);
      if (data.success) {
        const loggedUser = { email, name: email.split('@')[0] };
        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        return loggedUser;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await googleLogin();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
      } else {
        throw new Error('Google sign-in failed');
      }
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('lastEvaluation');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
