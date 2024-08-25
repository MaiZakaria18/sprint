import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TaskUpdate = () => {
  const { id, pk } = useParams(); // Get project_id and task_id from URL params
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    assigned_to: [],
    start_date: '',
    due_date: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/projects/${id}/tasks/${pk}/`, {
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
  }, [id, pk]);

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(`http://localhost:8000/projects/${id}/tasks/${pk}/update/`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/projects/${id}/tasks`);
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleUpdateTask();
  };

  return (
    <div>
      <h1>Update Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          />
        </label>
        {/* Add other input fields similar to the ones in TaskCreate.js */}
        <button type="submit">Update Task</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default TaskUpdate;
