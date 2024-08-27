import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/components/task/TaskUpdate.css'; // Import your CSS file


/**
 * A React functional component for updating a task.
 * 
 * Fetches task data from the server, displays a form for editing the task,
 * and handles form submission to update the task.
 * 
 * @return {JSX.Element} The JSX element representing the task update form.
 */
const TaskUpdate = () => {
  const { id: projectId, pk: taskId } = useParams();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    start_date: '',
    due_date: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    /**
 * Fetches task data from the server and updates the task data state.
 *
 * @async
 * @return {Promise<void>}
 */
    const fetchTaskData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/projects/${projectId}/tasks/${taskId}/detail/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTaskData(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
        setError(error.response?.data?.detail || 'Failed to fetch task');
      }
    };

    fetchTaskData();
  }, [projectId, taskId]);

  /**
 * Handles the task update process by sending a PUT request to the server with the updated task data.
 * If the request is successful, it redirects the user to the task detail page.
 * If the request fails, it sets an error message in the component state.
 *
 * @return {void}
 */
  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const { assigned_to, ...updatedTaskData } = taskData;

      await axios.put(`http://localhost:8000/projects/${projectId}/tasks/${taskId}/update/`, updatedTaskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/projects/${projectId}/tasks/${taskId}/detail`);
    } catch (error) {
      console.error('Error updating task:', error);
      setError(error.response?.data?.detail || 'Failed to update task');
    }
  };
  /**
 * Handles the task update form submission by preventing the default form submission behavior and triggering the task update process.
 *
 * @param {object} event - The form submission event.
 * @return {void}
 */
  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateTask();
  };

  return (
    <div className={`task-update-container ${taskData.status === 'completed' ? 'completed-task' : ''}`}>
      <form onSubmit={handleSubmit}>
        <h1>Update Task</h1>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            value={taskData.status}
            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
          >
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select
            value={taskData.priority}
            onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={taskData.start_date}
            onChange={(e) => setTaskData({ ...taskData, start_date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={taskData.due_date}
            onChange={(e) => setTaskData({ ...taskData, due_date: e.target.value })}
          />
        </div>
        <button type="submit">Update Task</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default TaskUpdate;
