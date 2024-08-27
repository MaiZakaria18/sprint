import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/components/user/Signup.css';


/**
 * Renders a signup form that allows users to register.
 *
 * @return {JSX.Element} The signup form component.
 */
const Signup = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [role, setRole] = useState('junior');
	const [error, setError] = useState('');

	/**
 * Handles the signup process by sending a POST request to the server with the provided credentials.
 * If the request is successful, it redirects the user to the login page.
 * If the request fails, it sets an error message in the component state.
 *
 * @param {SyntheticEvent} e - The event object triggered by the form submission.
 * @return {void}
 */
	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:8000/users/register/', {
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
					<option value="super_admin">Admin</option>
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
