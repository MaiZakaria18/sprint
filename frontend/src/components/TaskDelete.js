import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/components/task/TaskDelete.css';

/**
 * A React component for deleting a task.
 * 
 * It uses the `useParams` hook to get the project ID and task ID from the URL,
 * and the `useNavigate` hook to navigate to the task list after deletion.
 * 
 * The component renders a confirmation dialog with a delete button.
 * When the button is clicked, it sends a DELETE request to the server to delete the task.
 * 
 * @return {JSX.Element} The JSX element representing the delete task dialog.
 */
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

      navigate(`/projects/${id}/tasklist`);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  return (
    <div className='delete-task'>
      <h1>Delete Task</h1>
      <p>Are you sure you want to delete this task?</p>
      <button onClick={handleDeleteTask}>Delete</button>
      <button onClick={() => navigate(`/projects/${id}/tasklist`)}>Cancel</button>
    </div>
  );
};

export default TaskDelete;
