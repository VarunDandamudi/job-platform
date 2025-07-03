import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Particles from '@tsparticles/react';
import { loadAll } from '@tsparticles/all';
import { useAuth } from '../../context/AuthContext';
import { useMessage } from '../../context/MessageContext';
import { authApi } from '../../api/api';
import '../../styles/TestPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function LoginPage() {
  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();
  const { setMessage, setLoading } = useMessage();

  const loginBoxRef = useRef(null);
  const passwordInputRef = useRef(null);
  const togglePasswordRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTogglePassword = () => {
    if (passwordInputRef.current && togglePasswordRef.current) {
      const isVisible = passwordInputRef.current.type === 'text';
      passwordInputRef.current.type = isVisible ? 'password' : 'text';
      togglePasswordRef.current.className = isVisible ? 'bi bi-eye' : 'bi bi-eye-slash';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    setMessage('');
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const data = await authApi.login(username, password);
      login(data);

      if (data.section === 'Post') {
        navigate('/post-job');
      } else if (data.section === 'Apply') {
        navigate('/upload-resume');
      } else {
        navigate('/home');
      }
    } catch (error) {
      setMessage('Login failed: ' + error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleMouseEnterLoginBox = () => {
    if (loginBoxRef.current) {
      loginBoxRef.current.classList.remove('rotate');
      loginBoxRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  };

  const handleMouseLeaveLoginBox = () => {
    if (loginBoxRef.current) {
      loginBoxRef.current.classList.add('rotate');
      loginBoxRef.current.style.transform = '';
    }
  };

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 60 },
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
      <div id="particles-container-login">
        <Particles init={particlesInit} options={particlesOptions} />
      </div>

      <div className="background"></div>

      {/* The logo can be part of the header or positioned independently,
          depending on overall app layout. For this page, it looks
          like it's a standalone element. */}
      <div className="logo">
        <i className="bi bi-briefcase-fill"></i>
        <span>hire.in</span>
      </div>

      <section className="loginSection">
        <div
          className="loginBox rotate"
          ref={loginBoxRef}
          onMouseEnter={handleMouseEnterLoginBox}
          onMouseLeave={handleMouseLeaveLoginBox}
        >
          <h2>Enter the Mystic Realm</h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            required
            className="input-field"
          />

          <div className="passwordWrapper">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              required
              ref={passwordInputRef}
              className="input-field" 
            />
            <i className="bi bi-eye" ref={togglePasswordRef} onClick={handleTogglePassword}></i>
          </div>

          {/* Applied the new class to the Login button */}
          <button onClick={handleLogin} className="login-submit-btn">Login</button>
          <Link to="/signup" className="signupButton">Signup</Link>
        </div>
      </section>

      <div className="radialMenu">
        <button className="menuButton" ref={toggleRef} onClick={handleToggleMenu}>
          <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-plus'}`}></i>
        </button>
        <div className={`menuItems ${isMenuOpen ? 'menuItemsActive' : ''}`} ref={menuRef}>
          <Link to="/" className="menuItem" title="Home">
            <i className="bi bi-house"></i>
            <span className="tooltip">Home</span>
          </Link>
          <Link to="/recommendations" className="menuItem" title="Jobs">
            <i className="bi bi-briefcase"></i>
            <span className="tooltip">Jobs</span>
          </Link>
          <Link to="/upload-resume" className="menuItem" title="Upload CV">
            <i className="bi bi-upload"></i>
            <span className="tooltip">Upload</span>
          </Link>
          <Link to="/feedback" className="menuItem" title="Contact">
            <i className="bi bi-envelope"></i>
            <span className="tooltip">Contact</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;