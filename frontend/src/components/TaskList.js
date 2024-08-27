import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './styles/components/task/TaskList.css'; // Import your CSS file


/**
 * Renders a list of tasks for a specific project.
 *
 * @return {JSX.Element} The JSX element representing the task list.
 */
const TaskList = () => {
  const { id } = useParams(); // Get project_id from URL params
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState(''); // State to store project name
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
 * Fetches project details and tasks for a specific project.
 *
 * @return {Promise<void>} - Returns a promise that resolves when the project details and tasks are successfully fetched.
 */
    const fetchProjectAndTasks = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage

        // Fetch the project details to get the project name
        const projectResponse = await axios.get(`http://localhost:8000/projects/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjectName(projectResponse.data.name); // Set the project name

        // Fetch the tasks for the project
        const tasksResponse = await axios.get(`http://localhost:8000/projects/${id}/tasklist/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(tasksResponse.data);
      } catch (err) {
        console.error('Error fetching project or tasks:', err);
        setError('Failed to fetch tasks or project details.');
      }
    };

    fetchProjectAndTasks();
  }, [id]);

  return (
    <div className="task-list-container">
      <h1>Tasks for Project: {projectName}</h1>
      {error && <p className="error-message">{error}</p>}
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks available.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
              {task.title}
              {task.status === 'completed' && <span className="checkmark">✔️</span>}
              <div className="task-actions">
                <Link to={`/projects/${id}/tasks/${task.id}/update`} className="action-link task">
                  Update
                </Link>
                <Link to={`/projects/${id}/tasks/${task.id}/delete`} className="action-link task">
                  Delete
                </Link>
                <Link to={`/projects/${id}/tasks/${task.id}/detail`} className="action-link task">
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to={`/projects/${id}/tasks/create`} className="create-task-link">Create New Task</Link>
    </div>
  );
};

export default TaskList;
