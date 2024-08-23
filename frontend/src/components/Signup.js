import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/components/Signup.css';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [role, setRole] = useState('employee');
	const [error, setError] = useState('');

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:8000/user/signup/', {
				username,
				email,
				password,
				confirm_password: confirmPassword,
				role,
			});
			console.log(response.data);
			window.location.href = '/login';
		} catch (err) {
			setError(err.response?.data?.error || 'Signup failed');
		}
	};

	return (
		<div className="signup-container">
			<h2>Signup</h2>
			<form onSubmit={handleSignup}>
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
				<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
				<select value={role} onChange={(e) => setRole(e.target.value)} required>
					<option value="admin">Admin</option>
					<option value="manager">Manager</option>
					<option value="junior">Junior</option>
					<option value="senior">Senior</option>
				</select>
				<button type="submit">Signup</button>
				{error && <p className="error">{error}</p>}
			</form>
			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</div>
	);
};

export default Signup;
