
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../context/MessageContext'; // Import useMessage for global messages/loading
import { authApi } from '../../api/api'; // Import your API utility for auth calls
import '../../styles/SignupPage.css'; // Import the specific CSS for this page
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap Icons are available

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    section: '',
  });

  const navigate = useNavigate();
  const { setMessage, setLoading } = useMessage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const data = await authApi.signup(
        formData.username,
        formData.password,
        formData.section
      );

      setMessage(data.message || 'Signup successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      setMessage('Signup failed: ' + error.message);
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="background"></div>

      <form className="signup-box" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <select
          name="section"
          value={formData.section}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="Post">Post Jobs</option>
          <option value="Apply">Apply for Jobs</option>
        </select>
        <button type="submit">Signup</button>
        {/* Navigate back to login page */}
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default SignupPage;