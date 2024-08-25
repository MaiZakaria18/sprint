import React, { useState } from 'react';
import ProjectCreate from './ProjectCreate'; // Import the ProjectCreate component
import './styles/components/Dashboard.css';

const Dashboard = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  return (
    <div className="dashboard-container">
      <ProjectCreate />
    </div>
  );
};

export default Dashboard;
