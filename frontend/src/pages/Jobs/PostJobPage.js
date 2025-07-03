import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PersonFill } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';
import { useMessage } from '../../context/MessageContext';
import { jobApi } from '../../api/api';
import '../../styles/PostPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function PostJobPage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { setMessage, setLoading } = useMessage();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    experience: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const jobData = {
      title: formData.title,
      description: formData.description,
      skills: formData.skills.split(',').map((s) => s.trim()).filter((s) => s !== ''),
      experience: formData.experience,
      location: formData.location,
      posterUsername: currentUser?.username,
    };

    try {
      const result = await jobApi.postJob(jobData);
      setMessage(result.message || 'Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        skills: '',
        experience: '',
        location: '',
      });
    } catch (error) {
      setMessage('Failed to post job: ' + error.message);
      console.error('Job post error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="postpage-wrapper">
      <div className="background"></div>

      {/* Re-added the hire.in logo at the top-left */}
      <div className="logo">
        <i className="bi bi-briefcase-fill logo-icon"></i>
        <span className="logo-text">hire.in</span>
      </div>

      {/* Removed the entire <nav> element */}

      <div className="form-wrapper">
        <h2 className="form-title">Post New Job</h2>
        <form className="job-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="text"
            name="skills"
            placeholder="Required Skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g., 2 years)"
            value={formData.experience}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <button type="submit" className="post-job-btn"> {/* Added class for specific styling */}
            Post Job
          </button>
          {/* Moved the logout button here, within the form wrapper */}
          <button onClick={handleLogout} className="logout-btn-form">
            Logout <PersonFill size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJobPage;