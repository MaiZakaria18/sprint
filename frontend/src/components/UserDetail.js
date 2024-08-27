import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/components/UserDetail.css'; // Import your CSS file

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
