import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './styles/components/Navbar.css';

const Navbar = () => {
const { isAuthenticated, profile } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="navbar-brand">Sprint Master</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/projects">Projects</Link>
            <Link to="/profile">Profile</Link> {/* Add Profile link here */}
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
