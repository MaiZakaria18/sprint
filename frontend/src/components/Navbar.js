import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './styles/components/Navbar.css';


/**
 * A functional component that renders the navigation bar for the application.
 * It conditionally renders links based on the user's authentication status.
 *
 * @return {JSX.Element} The JSX element representing the navigation bar
 */
const Navbar = () => {
  const { isAuthenticated } = useAuth();

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
