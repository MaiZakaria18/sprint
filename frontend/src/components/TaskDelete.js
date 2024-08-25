import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TaskDelete = () => {
  const { id, pk } = useParams(); // id is projectId and pk is taskId
  const navigate = useNavigate();

  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem('token');

      // Ensure the URL matches the pattern in Django urls.py
      await axios.delete(`http://localhost:8000/projects/${id}/tasks/${pk}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/projects/${id}/tasks`);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  return (
    <div>
      <h1>Delete Task</h1>
      <p>Are you sure you want to delete this task?</p>
      <button onClick={handleDeleteTask}>Delete</button>
      <button onClick={() => navigate(`/projects/${id}/tasks`)}>Cancel</button>
    </div>
  );
};

export default TaskDelete;
