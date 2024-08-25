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
import './styles/components/App.css';
import PrivateRoute from './PrivateRoute';

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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
