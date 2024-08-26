import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './styles/components/Navbar.css';

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();

	const handleLogout = () => {
		logout();
		window.location.href = '/'; // Redirect to home after logout
	};

	return (
		<nav className="navbar">
			<h1 className="navbar-brand">Sprint Master</h1>
			<div className="nav-links">
				<Link to="/">Home</Link>
				{isAuthenticated ? (
					<>
						<Link to="/projects">Projects</Link>
						<button onClick={handleLogout} className="logout-button">Logout</button>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
