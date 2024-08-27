import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth to manage authentication state
import './styles/components/user/profile.css';


/**
 * A functional component representing a user's profile.
 * It renders links to user details and update profile, along with a logout button.
 * 
 * @return {JSX.Element} The JSX element representing the profile component.
 */
const Profile = () => {
  const { logout } = useAuth(); // Get logout function from context
  const navigate = useNavigate(); // For navigation after logout

  /**
 * Handles the logout functionality by calling the logout function and redirecting to the home page.
 *
 * @return {void} No return value, performs a side effect of redirecting to the home page.
 */
  const handleLogout = () => {
    logout();
    // Redirect to home after logout
    navigate('/');
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
