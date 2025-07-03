import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useMessage } from './context/MessageContext';

import LandingPage from './LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import PostJobPage from './pages/Jobs/PostJobPage';
import UploadResumePage from './pages/Jobs/ApplyPage';
import RecommendationsPage from './pages/Jobs/RecommendationsPage';
import FeedbackPage from './pages/info/FeedbackPage';

// Optional: Create DevelopersPage.js or remove this link below
// import DevelopersPage from './pages/info/DevelopersPage'; // UNDEFINED - comment or create

// Global Message Display
const MessageDisplay = () => {
    const { message, loading } = useMessage();
    if (!message && !loading) return null;

    return (
        <div style={{
            position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 1000, padding: '10px 20px', borderRadius: '8px',
            backgroundColor: loading ? '#4a90e2' : (message.includes('successful') ? '#4CAF50' : '#F44336'),
            color: 'white', fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            textAlign: 'center', minWidth: '250px'
        }}>
            {loading ? 'Loading...' : message}
        </div>
    );
};

const App = () => {
    const { currentUser, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header/Navbar - REMOVED */}
            {/*
            <header style={{
                padding: '15px 30px', backgroundColor: '#282c34', color: 'white',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
                <Link to="/" style={{ color: 'cyan', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' }}>
                    Job Nexus
                </Link>
                <nav style={{ display: 'flex', gap: '20px' }}>
                    {currentUser ? (
                        <>
                            <span style={{ color: '#a0a0a0' }}>Welcome, {currentUser.username}</span>
                            <button onClick={logout} style={{
                                backgroundColor: '#e74c3c', color: 'white', border: 'none',
                                padding: '8px 15px', borderRadius: '5px', cursor: 'pointer'
                            }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" style={{
                            color: 'white', textDecoration: 'none', padding: '8px 15px',
                            border: '1px solid white', borderRadius: '5px'
                        }}>
                            Login / Signup
                        </Link>
                    )}
                    <Link to="/feedback" style={{ color: 'white', textDecoration: 'none' }}>Feedback</Link>
                    {/* Optional link - only works if DevelopersPage is created }
                    {/* <Link to="/developers" style={{ color: 'white', textDecoration: 'none' }}>Developers</Link> }
                </nav>
            </header>
            */}

            {/* Global Message Display */}
            <MessageDisplay />

            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center p-6" style={{ backgroundColor: '#1a1a2e' }}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* Authenticated Home Route */}
                    <Route
                        path="/home"
                        element={currentUser ? <LandingPage /> : <Navigate to="/login" replace />}
                    />

                    {/* Protected Routes */}
                    {currentUser ? (
                        <>
                            {currentUser.section === 'Post' && (
                                <Route path="/post-job" element={<PostJobPage />} />
                            )}
                            {currentUser.section === 'Apply' && (
                                <>
                                    <Route path="/upload-resume" element={<UploadResumePage />} />
                                    <Route path="/recommendations" element={<RecommendationsPage />} />
                                </>
                            )}

                            {/* Prevent wrong section access */}
                            {currentUser.section !== 'Post' && (
                                <Route path="/post-job" element={<Navigate to="/home" />} />
                            )}
                            {currentUser.section !== 'Apply' && (
                                <>
                                    <Route path="/upload-resume" element={<Navigate to="/home" />} />
                                    <Route path="/recommendations" element={<Navigate to="/home" />} />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Route path="/post-job" element={<Navigate to="/login" replace />} />
                            <Route path="/upload-resume" element={<Navigate to="/login" replace />} />
                            <Route path="/recommendations" element={<Navigate to="/login" replace />} />
                        </>
                    )}

                    {/* Always Accessible Info Pages */}
                    <Route path="/feedback" element={<FeedbackPage />} />
                    {/* <Route path="/developers" element={<DevelopersPage />} /> */}

                    {/* Fallback Route */}
                    <Route path="*" element={currentUser ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
                </Routes>
            </main>

            {/* Footer */}
            <footer style={{
                padding: '15px', backgroundColor: '#282c34', color: '#a0a0a0',
                textAlign: 'center', boxShadow: '0 -2px 4px rgba(0,0,0,0.2)'
            }}>
                <p>&copy; 2025 hire.in All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;