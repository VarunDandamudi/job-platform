import React, { useEffect } from 'react';
import { useMessage } from '../context/MessageContext';
import '../styles/LoadingScreen.css'; // Import the new loading screen styles

const MessageDisplay = () => {
    const { message, loading } = useMessage();

    // Render the loading screen if 'loading' is true
    if (loading) {
        return (
            <div className="loading-screen-overlay"> {/* This is the root for the loading screen */}
                <div className="stars"></div>
                <div className="aura"></div>
                <div className="container">
                    <div className="loader"></div>
                    <h1>Loading...</h1>
                    <div className="text-glow">Summoning your experience...</div>
                </div>
            </div>
        );
    }

    // If not loading, but there's a message, display the message box
    if (message) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10000, // Very high z-index to ensure it's on top
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: message.includes('successful') ? '#4CAF50' : '#F44336', // Green for success, Red for error
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    textAlign: 'center',
                    minWidth: '250px',
                }}
                className="neon-border-animation" // Apply the neon border animation
            >
                {message}
            </div>
        );
    }

    return null; // Don't render anything if no message and not loading
};

export default MessageDisplay;