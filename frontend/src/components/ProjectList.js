import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Add state for success messages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/projects/', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
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

  const handleDelete = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/projects/${projectId}/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setProjects(projects.filter(project => project.id !== projectId)); // Update the project list after deletion
      setSuccess('Project deleted successfully'); // Set success message
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project'); // Set error message
    }
  };

  const handleUpdate = (projectId) => {
    navigate(`/projects/${projectId}/update`); // Navigate to update page
  };

  const handleDetails = (projectId) => {
    navigate(`/projects/${projectId}`); // Navigate to details page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Projects</h1>
      {success && <p className="success-message">{success}</p>} {/* Display success message */}
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.name}
            <button onClick={() => handleDetails(project.id)}>View Details</button>
            <button onClick={() => handleUpdate(project.id)}>Update</button>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
