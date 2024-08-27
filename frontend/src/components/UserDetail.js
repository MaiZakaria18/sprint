import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/components/user/UserDetail.css';


/**
 * A functional component that fetches and displays the details of the current user.
 * 
 * @return {JSX.Element} The JSX element representing the user details page.
 */
const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
 * Fetches the details of the current user from the server and updates the state with the response data.
 * It retrieves the token from localStorage and includes it in the request headers for authorization.
 *
 * @return {Promise<void>} A promise that resolves when the user details are successfully fetched and the state is updated.
 */
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://localhost:8000/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to fetch user details.');
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="user-detail-container">
      <h1>User Details</h1>
      {error && <p className="error-message">{error}</p>}
      {user ? (
        <div className="user-details">
          <p><strong>ID:</strong> {user.id}</p> {/* Display user ID */}
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p> {/* Adjust according to your user model */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetail;
