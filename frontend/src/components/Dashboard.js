import React, { useState } from 'react';
import ProjectList from './Project';
import TaskList from './Task';
import './styles/components/Dashboard.css';

const Dashboard = () => {
	const [selectedProjectId, setSelectedProjectId] = useState(null);

	return (
		<div className="dashboard-container">
			<h1>Dashboard</h1>
			<ProjectList setSelectedProjectId={setSelectedProjectId} />
			{selectedProjectId && <TaskList projectId={selectedProjectId} />}
		</div>
	);
};

export default Dashboard;
