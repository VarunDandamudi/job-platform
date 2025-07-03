import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PersonFill } from 'react-bootstrap-icons'; // Assuming react-bootstrap-icons is installed
import { useAuth } from '../../context/AuthContext';   // Import AuthContext
import { useMessage } from '../../context/MessageContext'; // Import MessageContext
import { resumeApi } from '../../api/api';             // Import your API utility
import '../../styles/ApplyPage.css';                       // Import its specific CSS
import 'bootstrap-icons/font/bootstrap-icons.css';     // Ensure icons are available

function ApplyPage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { setMessage, setLoading } = useMessage();

  const [file, setFile] = useState(null);
  const [extractedSkills, setExtractedSkills] = useState('');
  const [resumeSummary, setResumeSummary] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async () => {
    setMessage('');
    setLoading(true);

    if (!file) {
      setMessage('Please select a PDF file to upload.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('username', currentUser?.username);
    formData.append('file', file);
    formData.append('extractedSkills', extractedSkills);
    formData.append('resumeSummary', resumeSummary);

    try {
      const result = await resumeApi.uploadResume(formData);
      setMessage(result.message || 'Resume uploaded successfully!');
      setFile(null);
      setExtractedSkills('');
      setResumeSummary('');
    } catch (error) {
      setMessage('Failed to upload resume: ' + error.message);
      console.error('Resume upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewRecommendations = () => {
    navigate('/recommendations');
  };

  return (
    <div className="applypage-wrapper">
      <div className="background"></div> {/* Uses global background styling */}

      {/* Re-added the hire.in logo at the top-left */}
      <div className="logo">
        <i className="bi bi-briefcase-fill logo-icon"></i>
        <span className="logo-text">hire.in</span>
      </div>

      <div className="resume-content">
        <h2>Upload Your Resume</h2>
        <p className="upload-instruction"><i className="bi bi-cloud-arrow-up"></i> Boost your career – Upload your resume now!</p><br />

        <div className="upload-form-box">
          <label htmlFor="resume-file-input" className="custom-file-upload">
            <i className="bi bi-file-earmark-arrow-up"></i> {file ? file.name : 'Choose PDF File'}
          </label>
          <input
            id="resume-file-input"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <input
            type="text"
            placeholder="Key Skills (comma-separated)"
            value={extractedSkills}
            onChange={(e) => setExtractedSkills(e.target.value)}
          />
          <textarea
            placeholder="Resume Summary/Keywords"
            value={resumeSummary}
            onChange={(e) => setResumeSummary(e.target.value)}
            rows="4"
          ></textarea>

          <button onClick={handleSubmit} className="submit-btn">
            Submit Resume
          </button>

          <button onClick={handleViewRecommendations} className="view-recommendations-btn">
            View Recommendations
          </button>

          <button onClick={handleLogout} className="logout-btn-form">
            Logout <PersonFill size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ApplyPage;