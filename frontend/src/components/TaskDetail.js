import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/components/TaskDetails.css'; // Import your CSS file

const TaskDetail = () => {
  const { id, pk } = useParams(); // Extract project ID and task ID from URL params
  const navigate = useNavigate(); // Hook for navigation
  const [task, setTask] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch project details
        const projectResponse = await axios.get(`http://localhost:8000/projects/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjectName(projectResponse.data.name);

        // Fetch task details
        const taskResponse = await axios.get(`http://localhost:8000/projects/${id}/tasks/${pk}/detail/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(taskResponse.data);
      } catch (err) {
        console.error('Error fetching details:', err);
        setError('Failed to fetch task or project details.');
      }
    };

    fetchDetails();
  }, [id, pk]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {task ? (
        <div>
          <h1>Task Detail</h1>
          <p><strong>Project:</strong> {projectName}</p>
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p>
            <strong>Assigned To: </strong>
            {task.assigned_to_display && task.assigned_to_display.length > 0
              ? task.assigned_to_display.join(', ')
              : 'None'}
          </p>
          <p><strong>Start Date:</strong> {task.start_date}</p>
          <p><strong>Due Date:</strong> {task.due_date}</p>
          <button onClick={() => navigate(`/projects/${id}/tasklist`)}>Back to Task List</button>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};

export default TaskDetail;
