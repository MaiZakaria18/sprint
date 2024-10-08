import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/components/project/ProjectDetail.css';


/**
 * A functional component that displays the details of a project.
 *
 * @return {JSX.Element} The JSX element representing the project details.
 */
const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    /**
 * Fetches the project details from the server and updates the state.
 * 
 * @return {Promise<void>} A promise that resolves when the project details are fetched.
 */
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/projects/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject(response.data);
      } catch (err) {
        setError('Failed to fetch project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  /**
 * Deletes a project from the server.
 *
 * @async
 * @return {Promise<void>} A promise that resolves when the project is deleted.
 */
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/projects/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess('Project deleted successfully');
        navigate('/projects');
      } catch (err) {
        setError('Failed to delete project. Please try again later.');
      }
    }
  };

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="project-detail-container">
      <h1>Project Details</h1>
      {project && (
        <div className="project-detail">
          <h2>{project.name}</h2>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}</p>



          <div className="project-actions">
            <Link to={`/projects/${id}/update`}>
              <button className="btn">Update Project</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>Delete Project</button>
            <Link to={`/projects/${id}/tasklist`}>
              <button className="btn">View All Tasks</button>
            </Link>
            <Link to={`/projects/${id}/tasks/create`}>
              <button className="btn">Create New Task</button>
            </Link>
          </div>
          {success && <p className="success-message">{success}</p>}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
