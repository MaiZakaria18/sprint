import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

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
    <div>
      <h1>Tasks for Project {id}</h1>
      {error && <p>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link to={`/projects/${id}/tasks/${task.id}`}>{task.title}</Link>
            <Link to={`/projects/${id}/tasks/${task.id}/update`} style={{ marginLeft: '10px' }}>
              Update
            </Link>
            <Link to={`/projects/${id}/tasks/${task.id}/delete`} style={{ marginLeft: '10px' }}>
              Delete
            </Link>
          </li>
        ))}
      </ul>
      <Link to={`/projects/${id}/tasks/create`}>Create New Task</Link>
    </div>
  );
};

export default TaskList;
