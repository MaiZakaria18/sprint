import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectUpdate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Extract project ID from URL

  useEffect(() => {
    // Fetch the current project details
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the access token

        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(`http://localhost:8000/projects/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        const project = response.data;
        setName(project.name);
        setDescription(project.description);
        setStartDate(project.start_date);
        setEndDate(project.end_date);
      } catch (error) {
        console.error('Error fetching project:', error);

        if (error.response) {
          if (error.response.status === 404) {
            setError('Project not found');
          } else if (error.response.status === 401) {
            setError('Unauthorized. Please log in again.');
          } else {
            setError('Failed to load project');
          }
        } else {
          setError('Network error. Please try again later.');
        }
      }
    };

    fetchProject();
  }, [id]); // Ensure `id` is included in the dependency array

  const handleUpdateProject = async (projectData) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the access token

      const response = await axios.put(`http://localhost:8000/projects/${id}/`, projectData, {
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
            refresh: localStorage.getItem('refreshToken'), // Get the refresh token directly here
          });
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem('token', newAccessToken); // Store the new access token

          // Retry the original request with the new access token
          const retryResponse = await axios.put(`http://localhost:8000/projects/${id}/`, projectData, {
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
        console.error('Error updating project:', error);
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
      await handleUpdateProject(projectData);
      navigate('/projects'); // Navigate to ProjectList after successful update
    } catch (err) {
      setError('Failed to update project');
    }
  };

  return (
    <div>
      <h1>Update Project</h1>
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
        <button type="submit">Update Project</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ProjectUpdate;
