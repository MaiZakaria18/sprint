import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/components/project/ProjectList.css'; // Import the new styles


/**
 * Renders a list of projects.
 *
 * @return {JSX.Element} The JSX element representing the project list.
 */
const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    /**
 * Fetches a list of projects from the server using an authorization token.
 *
 * @return {Promise<void>} - Returns a promise that resolves when the projects are successfully fetched.
 * @throws {Error} - Throws an error if the fetch request fails or if there is no authorization token.
 */
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/projects/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /**
 * Deletes a project by its ID.
 *
 * @param {number} projectId - The ID of the project to delete.
 * @return {Promise<void>} - Returns a promise that resolves when the project is successfully deleted.
 */
  const handleDelete = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/projects/${projectId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(projects.filter(project => project.id !== projectId));
      setSuccess('Project deleted successfully');
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project');
    }
  };

  const handleUpdate = (projectId) => {
    navigate(`/projects/${projectId}/update`);
  };

  const handleDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="project-list-container">
      <h1>Projects</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {success && (
            <div className="success-message">
              <p>{success}</p>
            </div>
          )}
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          <table className="project-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td style={{ width: '70%' }}>{project.name}</td>
                  <td style={{ width: '30%' }}>
                    <button
                      className="cta-button"
                      onClick={() => handleDetails(project.id)}
                      style={{ marginRight: 10 }}
                    >
                      View Details
                    </button>
                    <button
                      className="cta-button"
                      onClick={() => handleUpdate(project.id)}
                      style={{ marginRight: 10 }}
                    >
                      Update
                    </button>
                    <button
                      className="cta-button"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
