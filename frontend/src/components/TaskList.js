import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './styles/components/TaskList.css'; // Import the CSS file for styling

const TaskList = () => {
  const { id } = useParams(); // Get projectId from URL parameters
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get(`http://localhost:8000/projects/${id}/tasks/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        });
        console.log(response.data); // Check the structure of the fetched tasks
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [id]);

  return (
    <div className="task-list-container">
      <h1>Tasks for Project {id}</h1>
      {error && <p className="error-message">{error}</p>}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <Link to={`/projects/${id}/tasks/${task.id}`} className="task-link">
              {task.title}
            </Link>
            <div className="task-actions">
              <Link to={`/projects/${id}/tasks/${task.id}/update`} className="action-link">
                Update
              </Link>
              <Link to={`/projects/${id}/tasks/${task.id}/delete`} className="action-link">
                Delete
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Link to={`/projects/${id}/tasks/create`} className="create-task-link">Create New Task</Link>
    </div>
  );
};

export default TaskList;
