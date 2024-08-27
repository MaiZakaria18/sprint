import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import useAuth to manage authentication state
import './styles/components/profile.css'; // Ensure the path is correct

const Profile = () => {
  const { logout } = useAuth(); // Get logout function from context
  const navigate = useNavigate(); // For navigation after logout

  const handleLogout = () => {
		logout();
		window.location.href = '/'; // Redirect to home after logout
	};
  return (
    <div className="profile">
      <Link to={`/users/details`}>User Details</Link>
      <Link to={`/users/update`}>Update Profile</Link>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Profile; // Ensure this is the default export
