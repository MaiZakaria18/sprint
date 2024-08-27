import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/components/project/ProjectUpdate.css';


/**
 * A React functional component for updating a project.
 * It fetches the project data from the server, displays it in a form,
 * and allows the user to update the project details.
 * After a successful update, it navigates to the project list page.
 *
 * @return {JSX.Element} The JSX element representing the project update form.
 */
const ProjectUpdate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Extract project ID from URL

  useEffect(() => {
    /**
 * Fetches a project from the server using the provided ID.
 * It retrieves the access token from local storage, includes it in the request headers,
 * and updates the component state with the project data.
 * If an error occurs, it sets an error message in the component state.
 *
 * @return {void}
 */
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
  }, [id]);
  /**
 * Updates a project with the given data.
 *
 * @param {Object} projectData - The data to update the project with.
 * @return {Promise<Object>} A Promise that resolves to the updated project data.
 * @throws {Error} If there is an error updating the project.
 */
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
          const refreshResponse = await axios.post('http://localhost:8000/login/refresh/', {
            refresh: localStorage.getItem('refreshToken'),
          });
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem('token', newAccessToken);

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
  /**
 * Handles the form submission event asynchronously.
 *
 * @param {Event} event - The form submission event.
 * @return {Promise<void>} A promise that resolves when the project is successfully updated and the user is navigated to the ProjectList page. If an error occurs, an error message is set.
 */
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
    <div className="project-update-container">
      <h1>Update Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <button type="submit">Update Project</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ProjectUpdate;
