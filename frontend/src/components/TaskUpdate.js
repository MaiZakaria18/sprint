import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/components/TaskUpdate.css'; // Import your CSS file

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
        setError('Failed to fetch task');
      }
    };

    fetchTaskData();
  }, [projectId, taskId]);

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
      setError('Failed to update task');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateTask();
  };

  return (
    <div className="task-update-container">
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
