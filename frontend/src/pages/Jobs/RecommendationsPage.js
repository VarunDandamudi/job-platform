import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMessage } from '../../context/MessageContext';
import { jobApi } from '../../api/api';
import '../../styles/RecommendationsPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function RecommendationsPage() {
  const { currentUser, logout } = useAuth(); // Added logout
  const { setMessage, setLoading } = useMessage();
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const response = await jobApi.getAllJobs();
      setRecommendedJobs(response);
    } catch (error) {
      setMessage('Failed to fetch jobs: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const openJobDetails = (job) => setSelectedJob(job);
  const closeJobDetails = () => setSelectedJob(null);

  // Close radial menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="recommendations-wrapper">
      <div className="header">
        <h2 className="header-text">All Available Job Listings</h2>
      </div>

      <div className="recommendation-grid">
        {recommendedJobs.length > 0 ? (
          recommendedJobs.map((job, index) => (
            <div key={index} className="job-card" onClick={() => openJobDetails(job)}>
              <h3>{job.title || 'Untitled Job'}</h3>
              <p><strong>Location:</strong> {job.location || 'Not specified'}</p>
              {job.matchScore !== undefined && (
                <p className="match-score">Match: {(job.matchScore * 100).toFixed(0)}%</p>
              )}
            </div>
          ))
        ) : (
          <p className="no-jobs-message">No jobs found. Please refresh or try again later.</p>
        )}
      </div>

      {selectedJob && (
        <div className="job-detail-overlay" onClick={closeJobDetails}>
          <div className="job-detail-card" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedJob.title || 'Untitled Job'}</h2>
            <p><strong>Description:</strong> {selectedJob.description || 'N/A'}</p>
            <p><strong>Skills:</strong> {selectedJob.skills?.length ? selectedJob.skills.join(', ') : 'N/A'}</p>
            <p><strong>Experience:</strong> {selectedJob.experience || 'N/A'}</p>
            <p><strong>Location:</strong> {selectedJob.location || 'N/A'}</p>
            <p>
              Posted by: <span className="poster-username">{selectedJob?.posterUsername || 'Unknown'}</span>
              {' '}on {selectedJob?.postedDate ? new Date(selectedJob.postedDate).toLocaleDateString() : 'Unknown Date'}
            </p>
            <button onClick={closeJobDetails}>Close</button>
          </div>
        </div>
      )}

      <div className="radialMenuWrapper">
  <button className="radialMenuBtn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
    {isMenuOpen ? '×' : '+'}
  </button>

  {isMenuOpen && (
    <div className="menuItems menuItemsActive" ref={menuRef}>
      <button className="menuIcon" title="Refresh Jobs" onClick={fetchAllJobs}>
        <i className="bi bi-arrow-clockwise"></i>
      </button>
      <button className="menuIcon" title="Home" onClick={() => window.location.href = '/home'}>
        <i className="bi bi-house"></i>
      </button>
      <button className="menuIcon" title="Logout" onClick={logout}>
        <i className="bi bi-box-arrow-right"></i>
      </button>
    </div>
  )}
</div>
    

    </div>
  );
}

export default RecommendationsPage;
