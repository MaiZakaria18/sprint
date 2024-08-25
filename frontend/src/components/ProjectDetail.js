import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Add success state
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.get(`http://localhost:8000/projects/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
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
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      await axios.delete(`http://localhost:8000/projects/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setSuccess('Project deleted successfully'); // Set success message
      navigate('/projects'); // Navigate back to project list after deletion
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
          </div>
          {success && <p className="success-message">{success}</p>} {/* Display success message */}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
