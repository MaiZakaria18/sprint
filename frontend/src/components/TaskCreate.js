import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import UserAutocomplete from './UserAutocomplete'; // Import the autocomplete component
import './styles/components/TaskCreate.css'; // Import the new styles

const TaskCreate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define status and priority choices
  const STATUS_CHOICES = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const PRIORITY_CHOICES = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const handleCreateTask = async (taskData) => {
    try {
      const token = localStorage.getItem('token');

      let response = await axios.post(`http://localhost:8000/projects/${id}/tasks/create/`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.code === 'token_not_valid') {
        try {
          const refreshResponse = await axios.post('http://localhost:8000/login/refresh/', {
            refresh: localStorage.getItem('refreshToken'),
          });
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem('token', newAccessToken);

          const retryResponse = await axios.post(`http://localhost:8000/projects/${id}/tasks/create/`, taskData, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          return retryResponse.data;
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          throw refreshError;
        }
      } else {
        console.error('Error creating task:', error);
        throw error;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const taskData = {
        title,
        description,
        status,
        priority,
        assigned_to: assignedTo.map(user => user.id), // Send array of user IDs
        start_date: startDate,
        due_date: dueDate,
      };
      await handleCreateTask(taskData);
      navigate(`/projects/${id}/tasks/`); // Navigate to TaskList on success
    } catch (err) {
      setError('Failed to create task');
    }
  };
  return (
    <div className="task-create-container">
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select status</option>
            {STATUS_CHOICES.map(choice => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select priority</option>
            {PRIORITY_CHOICES.map(choice => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Assign To:</label>
          <div className="assigned-users-container">
            <UserAutocomplete
              onUserSelect={(user) => {
                if (!assignedTo.some(u => u.id === user.id)) {
                  setAssignedTo([...assignedTo, user]);
                }
              }}
              assignedUsers={assignedTo}
            />
            {/* Display selected users with remove button */}
            <div className="assigned-users">
              {assignedTo.map(user => (
                <span key={user.id} className="assigned-user">
                  {user.username} {/* Adjust based on your user object structure */}
                  <button type="button" onClick={() => setAssignedTo(assignedTo.filter(u => u.id !== user.id))}>
                    Remove
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <button type="submit">Create Task</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default TaskCreate;
