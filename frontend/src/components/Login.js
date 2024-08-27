import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './styles/components/user/Login.css';


/**
 * A functional component that handles user login.
 * It renders a login form, handles form submission, and redirects to the home page upon successful login.
 * It also displays error messages for invalid credentials or network errors.
 *
 * @return {JSX.Element} The JSX element representing the login form and related components.
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();


  /**
 * Handles the login form submission, sends a POST request to the server to authenticate the user,
 * and redirects to the home page upon successful login. It also displays error messages for
 * invalid credentials or network errors.
 *
 * @param {Event} e - The form submission event.
 * @return {Promise<void>} A promise that resolves when the login process is complete.
 */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login/', { email, password });
      console.log(response.data);
      localStorage.setItem('token', response.data.access); // Store the access token
      localStorage.setItem('refreshToken', response.data.refresh); // Store the refresh token
      login(); // Call login function
      navigate('/'); // Redirect to home page
    } catch (err) {
      // Provide more specific error messages
      if (err.response) {
        if (err.response.status === 401) {
          // Unauthorized error
          setError('Incorrect email or password. Please try again.');
        } else if (err.response.status === 404) {
          // Not found error
          setError('No account found with this email. Please check your email or sign up.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
