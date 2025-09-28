import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const getInitialToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token') || null;
  };
  const [token, setToken] = useState(getInitialToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (email, password, rememberAccount = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status === 200 && data.token) {
        setUser(data.data);
        setToken(data.token);
        if (rememberAccount) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        setLoading(false);
        return { success: true };
      } else {
        let alertMsg = data.message || 'Login failed';
        if (data.errors && Array.isArray(data.errors)) {
          alertMsg += '\n' + data.errors.map(e => `${e.field}: ${e.errors.join(', ')}`).join('\n');
        }
        window.alert(alertMsg);
        setError(data.message || 'Login failed');
        setLoading(false);
        return { success: false, message: alertMsg };
      }
    } catch (err) {
      window.alert('Network error');
      setError('Network error');
      setLoading(false);
      return { success: false, message: 'Network error' };
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  // Auto-logout helpers:
  // - listen to storage events (other tabs)
  // - poll storage periodically to catch removals in the same tab
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem('token') || sessionStorage.getItem('token') || null;
      if (!stored) {
        // token removed elsewhere
        setUser(null);
        setToken(null);
      } else if (stored !== token) {
        // token changed (signed in/out in another tab)
        setToken(stored);
      }
    };

    window.addEventListener('storage', handleStorage);

    const interval = setInterval(() => {
      const stored = localStorage.getItem('token') || sessionStorage.getItem('token') || null;
      if (!stored && token) {
        // token removed in this tab (or expired and cleared) -> sign out
        setUser(null);
        setToken(null);
      }
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
