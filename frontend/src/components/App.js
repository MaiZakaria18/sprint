// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import Navbar from './Navbar';
import ProjectList from './ProjectList'; // Import ProjectList component
import ProjectDetail from './ProjectDetail'; // Import ProjectDetail component
import ProjectUpdate from './ProjectUpdate'; // Import ProjectUpdate component
import ProjectCreate from './ProjectCreate'; // Import ProjectCreate component
import TaskCreate from './TaskCreate'; // Import TaskCreate component
import TaskUpdate from './TaskUpdate'; // Import TaskUpdate component
import TaskDelete from './TaskDelete'; // Import TaskDelete component
import TaskDetail from './TaskDetail'; // Import TaskDetail component
import TaskList from './TaskList';
import UserUpdate from './UserUpdate'; // Import UserUpdate component
import UserDetail from './UserDetail';
import UserAutocomplete from './UserAutocomplete';
import Profile from './profile'; // Import Profile component
import './styles/components/App.css';
import PrivateRoute from './PrivateRoute';

/**
 * The main application component that renders the entire app.
 * It wraps the app in the AuthProvider and Router components.
 * It defines all the routes for the app, including routes for projects, tasks, users, and profile.
 *
 * @return {JSX.Element} The JSX element representing the app.
 */

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
            <Route path="/logout" element={<Logout />} />
            <Route path="/projects" element={<PrivateRoute component={ProjectList} />} />
            <Route path="/projects/create" element={<PrivateRoute component={ProjectCreate} />} />
            <Route path="/projects/:id" element={<PrivateRoute component={ProjectDetail} />} />
            <Route path="/projects/:id/update" element={<PrivateRoute component={ProjectUpdate} />} />
            <Route path="/projects/:id/tasklist" element={<PrivateRoute component={TaskList} />} />
            <Route path="/projects/:id/tasks/create" element={<PrivateRoute component={TaskCreate} />} />
            <Route path="/projects/:id/tasks/:pk/update" element={<PrivateRoute component={TaskUpdate} />} />
            <Route path="/projects/:id/tasks/:pk/delete" element={<PrivateRoute component={TaskDelete} />} />
            <Route path="/projects/:id/tasks/:pk/detail" element={<PrivateRoute component={TaskDetail} />} />
            <Route path="/users/update" element={<PrivateRoute component={UserUpdate} />} />
            <Route path="/users/details" element={<PrivateRoute component={UserDetail} />} />
            <Route path="/users/autocomplete" element={<PrivateRoute component={UserAutocomplete} />} />
            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
