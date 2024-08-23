import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './styles/components/Task.css';

const Task = ({ project_id }) => {
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('Pending');
	const [priority, setPriority] = useState('Medium');
	const [startDate, setStartDate] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [editingTaskId, setEditingTaskId] = useState(null);

	const fetchTasks = useCallback(async () => {
		try {
			const response = await axios.get(`http://localhost:8000/task/${project_id}/tasks/`);
			setTasks(response.data);
		} catch (error) {
			console.error('Error fetching tasks:', error);
		}
	}, [project_id]); // Memoize fetchTasks with project_id as a dependency

	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]); // Use fetchTasks in the dependency array

	const handleEdit = (task) => {
		setEditingTaskId(task.id);
		setTitle(task.title);
		setDescription(task.description);
		setStatus(task.status);
		setPriority(task.priority);
		setStartDate(task.start_date);
		setDueDate(task.due_date);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const taskData = { title, description, status, priority, start_date: startDate, due_date: dueDate };

		if (editingTaskId) {
			// Update existing task
			try {
				await axios.put(`http://localhost:8000/task/${project_id}/update/${editingTaskId}/`, taskData);
				setEditingTaskId(null);
			} catch (error) {
				console.error('Error updating task:', error);
			}
		} else {
			// Create new task
			try {
				await axios.post(`http://localhost:8000/task/${project_id}/create/`, taskData);
			} catch (error) {
				console.error('Error creating task:', error);
			}
		}

		// Reset form fields
		setTitle('');
		setDescription('');
		setStatus('Pending');
		setPriority('Medium');
		setStartDate('');
		setDueDate('');
		fetchTasks(); // Refresh the task list
	};

	const handleDelete = async (taskId) => {
		try {
			await axios.delete(`http://localhost:8000/task/${project_id}/delete/`);
			fetchTasks(); // Refresh the task list
		} catch (error) {
			console.error('Error deleting task:', error);
		}
	};

	return (
		<div className="task-container">
			<h2>Task Management</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
				<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
				<input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
				<input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
				<select value={status} onChange={(e) => setStatus(e.target.value)}>
					<option value="Pending">Pending</option>
					<option value="In Progress">In Progress</option>
					<option value="Completed">Completed</option>
				</select>
				<select value={priority} onChange={(e) => setPriority(e.target.value)}>
					<option value="Low">Low</option>
					<option value="Medium">Medium</option>
					<option value="High">High</option>
				</select>
				<button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
			</form>
			<ul>
				{tasks.map((task) => (
					<li key={task.id}>
						{task.title} - {task.status} - {task.priority}
						<button onClick={() => handleEdit(task)}>Edit</button>
						<button onClick={() => handleDelete(task.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Task;
