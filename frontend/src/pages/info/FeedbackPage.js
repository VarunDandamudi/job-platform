import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BriefcaseFill, Instagram, Linkedin, Github } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';
import { useMessage } from '../../context/MessageContext';
import '../../styles/FeedbackPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function FeedbackPage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { setMessage } = useMessage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const toggleMenuRef = useRef(null);
  const menuItemsRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Thank you for your feedback! We appreciate your input.');

    console.log('Feedback Data:', formData);

    const subject = encodeURIComponent('Feedback from hire.in User');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    const mailtoLink = `mailto:varundandamudi@gmail.com?subject=${subject}&body=${body}`;

    window.open(mailtoLink, '_blank');

    setFormData({ name: '', email: '', message: '' });
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setMessage('Logged out successfully.');
    navigate('/login');
  };

  return (
    <div className="feedback-page-wrapper">
      <div className="background"></div>

      {/* Re-added the hire.in logo at the top-left */}
      <div className="logo">
        <i className="bi bi-briefcase-fill logo-icon"></i> {/* Added logo-icon class for global styling */}
        <span className="logo-text">hire.in</span> {/* Added logo-text class for global styling */}
      </div>

      {/* Radial Menu Integration */}
      <div className="radial-menu">
        <button className="menu-button" ref={toggleMenuRef} onClick={handleToggleMenu}>
          <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-plus'}`}></i>
        </button>

        <div className={`menu-items ${isMenuOpen ? 'active' : ''}`} ref={menuItemsRef}>
          {currentUser ? (
            <button onClick={handleLogout} className="menu-item" title="Logout">
              <i className="bi bi-box-arrow-right"></i>
              <span className="tooltip">Logout</span>
            </button>
          ) : (
            <Link to="/login" className="menu-item" title="Login">
              <i className="bi bi-box-arrow-in-right"></i>
              <span className="tooltip">Login</span>
            </Link>
          )}
          <Link to="/" className="menu-item" title="Home">
            <i className="bi bi-house"></i>
            <span className="tooltip">Home</span>
          </Link>
          <Link to="/recommendations" className="menu-item" title="Jobs">
            <i className="bi bi-briefcase"></i>
            <span className="tooltip">Jobs</span>
          </Link>
          <Link to="/upload-resume" className="menu-item" title="Upload CV">
            <i className="bi bi-upload"></i>
            <span className="tooltip">Upload</span>
          </Link>
          <Link to="/feedback" className="menu-item" title="Contact">
            <i className="bi bi-envelope"></i>
            <span className="tooltip">Contact</span>
          </Link>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="feedback-form-container">
        <h2 className="feedback-title">Share Your Glow: Feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
          <textarea
            name="message"
            placeholder="Your Feedback"
            value={formData.message}
            onChange={handleChange}
            className="textarea-field"
            required
          />
          <button type="submit" className="submit-feedback-btn">
            <i className="bi bi-send-fill mr-2"></i> Send Feedback
          </button>
        </form>
      </div>

      {/* Social Icons */}
      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={28} /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin size={28} /></a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"><Github size={28} /></a>
      </div>

      {/* Footer */}
      <div className="footer-line">
        © 2025 hire.in — All Rights Reserved
      </div>
    </div>
  );
}

export default FeedbackPage;