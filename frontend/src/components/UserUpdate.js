import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/components/user/UserUpdate.css'; // Import your CSS file


/**
 * A React functional component for updating a user's profile information.
 * 
 * Fetches the user's current data from the server, displays a form for editing the user's information,
 * and handles form submission to update the user's profile.
 * 
 * @return {JSX.Element} The JSX element representing the user update form.
 */
const UpdateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    /**
 * Fetches the currently logged-in user's data from the server.
 * 
 * @return {Promise<void>} A promise that resolves when the user data is fetched and updated in the component state.
 */
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setFetchError('Failed to fetch user details.');
      }
    };

    fetchUserData();
  }, []);

  /**
 * Handles changes to the form data by updating the corresponding state variable.
 *
 * @param {Event} e - The event object containing information about the change.
 * @return {void} No return value.
 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
 * Handles the submission of the user update form by sending a PUT request to the server to update the user's data.
 *
 * @param {Event} e - The event object containing information about the form submission.
 * @return {Promise<void>} A promise that resolves when the form submission is complete.
 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8000/users/update/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/profile');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="update-container">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        {fetchError && <p className="error-message">{fetchError}</p>}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="junior">Junior</option>
            <option value="manager">Manager</option>
            <option value="senior">Senior</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
        <button type="submit">Update</button>
        {errors.general && <p className="error-message">{errors.general}</p>}
      </form>
    </div>
  );
};

export default UpdateUser;
