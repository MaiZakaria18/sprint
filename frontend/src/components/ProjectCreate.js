// ProjectCreate.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectCreate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateProject = async (projectData) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the access token

      let response = await axios.post('http://localhost:8000/projects/', projectData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.code === 'token_not_valid') {
        try {
          // If the access token is invalid or expired, attempt to refresh it
          const refreshResponse = await axios.post('http://localhost:8000/login/refresh/', {
            refresh: localStorage.getItem('refreshToken'), // Correct refresh token URL
          });
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem('token', newAccessToken); // Store the new access token

          // Retry the original request with the new access token
          const retryResponse = await axios.post('http://localhost:8000/projects/', projectData, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          return retryResponse.data;
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          throw refreshError;
        }
      } else {
        console.error('Error creating project:', error);
        throw error;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const projectData = {
        name,
        description,
        start_date: startDate,
        end_date: endDate,
      };
      await handleCreateProject(projectData);
      navigate('/projects'); // Navigate to ProjectList after successful creation
    } catch (err) {
      setError('Failed to create project');
    }
  };

  return (
    <div>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button type="submit">Create Project</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ProjectCreate;
