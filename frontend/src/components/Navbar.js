import React from 'react';
import { Link } from 'react-router-dom';
import './styles/components/Navbar.css';

const Navbar = () => {
	return (
		<nav className="navbar">
			<h1 className="navbar-brand">Sprint Master</h1>
			<div className="nav-links">
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/signup">Signup</Link>
				<Link to="/dashboard">Dashboard</Link>
			</div>
		</nav>
	);
};

export default Navbar;
