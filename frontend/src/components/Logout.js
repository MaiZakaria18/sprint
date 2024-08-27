import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth to manage authentication state
import './styles/components/user/Logout.css';


/**
 * A functional component that handles user logout.
 * 
 * It uses the useAuth hook to get the logout function and the useNavigate hook for navigation.
 * When the logout button is clicked, it sends a POST request to the logout endpoint, updates the auth state, and redirects to the login page.
 * 
 * @return {JSX.Element} The JSX element representing the logout page.
 */
const Logout = () => {
  const { logout } = useAuth(); // Get logout function from context
  const navigate = useNavigate(); // For navigation after logout


  /**
   * Handles the user logout process by sending a POST request to the logout endpoint,
   * updating the authentication state, and redirecting to the login page.
   *
   * @return {Promise<void>} A promise that resolves when the logout process is complete.
   */
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
