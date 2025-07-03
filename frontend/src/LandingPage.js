
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Particles from '@tsparticles/react';
import { loadAll } from '@tsparticles/all';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/LandingPage.css';

function LandingPage() {
  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  const navigate = useNavigate();

  const textContainerRef = useRef(null);
  const toggleMenuRef = useRef(null);
  const menuItemsRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const textContainer = textContainerRef.current;

    const handleMouseMove = (e) => {
      if (textContainer) {
        const rect = textContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        textContainer.style.setProperty('--x', `${x}px`);
        textContainer.style.setProperty('--y', `${y}px`);
      }
    };

    if (textContainer) {
      textContainer.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (textContainer) {
        textContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 25 },
      color: { value: '#00ffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.6, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        outMode: 'bounce',
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        resize: true,
      },
      modes: {
        repulse: { distance: 80 },
      },
    },
    detectRetina: true,
  };

  return (
    <>
      <div id="particles-container-landing">
        <Particles init={particlesInit} options={particlesOptions} />
      </div>

      <div className="background"></div>

      <div className="logo">
        <i className="bi bi-briefcase-fill"></i>
        <span>hire.in</span>
      </div>

      <section className="hero">
        <div className="text-container" ref={textContainerRef}>
          <div className="text">hire.in</div>
        </div>
      </section>

      <div className="radial-menu">
        <button className="menu-button" ref={toggleMenuRef} onClick={handleToggleMenu}>
          <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-plus'}`}></i>
        </button>

        <div className={`menu-items ${isMenuOpen ? 'active' : ''}`} ref={menuItemsRef}>
          <Link to="/login" className="menu-item" title="Login">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="tooltip">Login</span>
          </Link>
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
    </>
  );
}

export default LandingPage;