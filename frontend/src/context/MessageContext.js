import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

    export const MessageContext = createContext(null);

    export const useMessage = () => useContext(MessageContext);

    export const MessageProvider = ({ children }) => {
      const [message, setMessageState] = useState('');
      const [loading, setLoadingState] = useState(false);

      const setMessage = useCallback((msg) => {
        setMessageState(msg);
      }, []);

      const setLoading = useCallback((isLoading) => {
        setLoadingState(isLoading);
      }, []);

      useEffect(() => {
        if (message) {
          const timer = setTimeout(() => {
            setMessageState('');
          }, 5000); // Message disappears after 5 seconds
          return () => clearTimeout(timer);
        }
      }, [message]);

      const value = { message, loading, setMessage, setLoading };

      return (
        <MessageContext.Provider value={value}>
          {children}
        </MessageContext.Provider>
      );
    };