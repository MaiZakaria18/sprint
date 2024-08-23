import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './styles/components/Project.css';

const Project = () => {
	const [projects, setProjects] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [status, setStatus] = useState('Planned');
	const [editingProjectId, setEditingProjectId] = useState(null);

	const fetchProjects = useCallback(async () => {
		try {
			const response = await axios.get('http://localhost:8000/project/');
			setProjects(response.data);
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	}, []); // No dependencies, will run once on mount

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const projectData = { name, description, start_date: startDate, end_date: endDate, status };

		if (editingProjectId) {
			// Update existing project
			try {
				await axios.put(`http://localhost:8000/project/update/${editingProjectId}/`, projectData);
				setEditingProjectId(null);
			} catch (error) {
				console.error('Error updating project:', error);
			}
		} else {
			// Create new project
			try {
				await axios.post('http://localhost:8000/project/create', projectData);
			} catch (error) {
				console.error('Error creating project:', error);
			}
		}

		// Reset form fields
		setName('');
		setDescription('');
		setStartDate('');
		setEndDate('');
		setStatus('Planned');
		fetchProjects(); // Refresh the project list
	};

	const handleEdit = (project) => {
		setEditingProjectId(project.id);
		setName(project.name);
		setDescription(project.description);
		setStartDate(project.start_date);
		setEndDate(project.end_date);
		setStatus(project.status);
	};

	const handleDelete = async (projectId) => {
		try {
			await axios.delete(`http://localhost:8000/project/delete/${projectId}/`);
			fetchProjects(); // Refresh the project list
		} catch (error) {
			console.error('Error deleting project:', error);
		}
	};

	return (
		<div className="project-container">
			<h1>Project Management</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Project Name"
					required
				/>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description"
					required
				/>
				<input
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
				<input
					type="date"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>
				<select value={status} onChange={(e) => setStatus(e.target.value)}>
					<option value="Planned">Planned</option>
					<option value="In Progress">In Progress</option>
					<option value="Completed">Completed</option>
				</select>
				<button type="submit">{editingProjectId ? 'Update Project' : 'Add Project'}</button>
			</form>
			<ul>
				{projects.map((project) => (
					<li key={project.id}>
						{project.name} - {project.status}
						<button onClick={() => handleEdit(project)}>Edit</button>
						<button onClick={() => handleDelete(project.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Project;
