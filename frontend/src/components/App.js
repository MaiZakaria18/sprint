import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Logout from './Logout';
import Navbar from './Navbar';
import ProjectList from './ProjectList'; // Import ProjectList component
import ProjectDetail from './ProjectDetail'; // Import ProjectDetail component
import ProjectUpdate from './ProjectUpdate'; // Import ProjectUpdate component
import ProjectCreate from './ProjectCreate'; // Import ProjectCreate component
import TaskCreate from './TaskCreate'; // Import TaskCreate component
import TaskUpdate from './TaskUpdate'; // Import TaskUpdate component
import TaskDelete from './TaskDelete'; // Import TaskDelete component
import TaskList from './TaskList'; 
import './styles/components/App.css';
import PrivateRoute from './PrivateRoute';
import UserAutocomplete from './UserAutocomplete';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/projects" element={<PrivateRoute component={ProjectList} />} />
            <Route path="/projects/create" element={<PrivateRoute component={ProjectCreate} />} />
            <Route path="/projects/:id" element={<PrivateRoute component={ProjectDetail} />} />
            <Route path="/projects/:id/update" element={<PrivateRoute component={ProjectUpdate} />} />
            <Route path="/projects/:id/tasks" element={<PrivateRoute component={TaskList} />} />
            <Route path="/projects/:id/tasks/create" element={<PrivateRoute component={TaskCreate} />} />
            <Route path="/projects/:id/tasks/:pk/update" element={<PrivateRoute component={TaskUpdate} />} />
            <Route path="/projects/:id/tasks/:pk/delete" element={<PrivateRoute component={TaskDelete} />} />
            <Route path="/users/autocomplete" element={<PrivateRoute component={UserAutocomplete} />} /> 

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;