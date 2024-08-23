import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth
import './styles/components/Login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { login } = useAuth(); // Get login function from context
	const navigate = useNavigate(); // For navigation after login

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:8000/users/login/', { email, password });
			console.log(response.data);
			login(); // Call login function
			navigate('/dashboard'); // Redirect to dashboard
		} catch (err) {
			setError(err.response.data.error || 'Login failed');
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