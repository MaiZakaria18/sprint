import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth to manage authentication state
import './styles/components/Logout.css';

const Logout = () => {
  const { logout } = useAuth(); // Get logout function from context
  const navigate = useNavigate(); // For navigation after logout

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/users/logout/');
      logout(); // Call logout function to update auth state
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="logout-container">
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <p>
        <Link to="/dashboard">Go back to dashboard</Link>
      </p>
    </div>
  );
};

export default Logout;
