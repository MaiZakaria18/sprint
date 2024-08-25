import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
        setError('Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
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
      setError('Failed to delete project');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Project Details</h1>
      {project && (
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>Start Date: {project.start_date}</p>
          <p>End Date: {project.end_date}</p>
          {/* Add more project details here if necessary */}

          <div className="project-actions">
            <Link to={`/projects/${id}/update`}>
              <button>Update Project</button>
            </Link>
            <button onClick={handleDelete}>Delete Project</button>
            <Link to={`/projects/${id}/tasks`}>
              <button>View All Tasks</button>
            </Link>
            <Link to={`/projects/${id}/tasks/create`}>
              <button>Create New Task</button>
            </Link>
          </div>
          {success && <p className="success-message">{success}</p>}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
