import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
    import { useMessage } from './MessageContext'; // Will be created next
    import { authApi } from '../api/api'; // Will be created next

    export const AuthContext = createContext(null);

    export const useAuth = () => useContext(AuthContext);

    export const AuthProvider = ({ children }) => {
      const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        try {
          return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
          console.error("AuthContext: Failed to parse currentUser from localStorage:", e);
          localStorage.removeItem('currentUser');
          return null;
        }
      });

      const { setMessage, setLoading } = useMessage();

      useEffect(() => {
        if (currentUser) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
          localStorage.removeItem('currentUser');
        }
      }, [currentUser]);

      const login = useCallback((userData) => {
        setCurrentUser(userData);
        setMessage('Login successful!');
      }, [setMessage]);

      const logout = useCallback(async () => {
        setLoading(true);
        setMessage('');
        try {
          if (currentUser && currentUser.username) {
            await authApi.logout(currentUser.username);
          }
          setCurrentUser(null);
          setMessage('Logout successful!');
        } catch (error) {
          setMessage('Logout failed: ' + error.message);
          console.error("Logout error:", error);
        } finally {
          setLoading(false);
        }
      }, [currentUser, setMessage, setLoading]);

      const value = { currentUser, login, logout };

      return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      );
    };