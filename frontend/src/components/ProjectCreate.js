// ProjectCreate.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/components/ProjectCreate.css'; // Import your CSS file

const ProjectCreate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateProject = async (projectData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/projects/create/', projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.code === 'token_not_valid') {
        try {
          const refreshResponse = await axios.post('http://localhost:8000/login/refresh/', {
            refresh: localStorage.getItem('refreshToken'),
          });
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem('token', newAccessToken);

          const retryResponse = await axios.post('http://localhost:8000/projects/create/', projectData, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          return retryResponse.data;
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          throw refreshError;
        }
      } else if (error.response && error.response.data) {
        throw new Error(error.response.data.detail || 'Failed to create project');
      } else {
        throw new Error('Network error or server not responding');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const projectData = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      await handleCreateProject(projectData);
      navigate('/projects/'); // Navigate to project list on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="project-create-container">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError(null);
            }}
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setError(null);
            }}
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setError(null);
            }}
          />
        </div>
        <button type="submit">Create Project</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ProjectCreate;