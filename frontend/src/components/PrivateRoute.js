import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


/**
 * A private route component that conditionally renders the provided component based on the user's authentication status.
 *
 * @param {React.Component} component - The component to render if the user is authenticated.
 * @return {React.ReactNode} The rendered component if authenticated, otherwise a redirect to the login page.
 */
const PrivateRoute = ({ component: Component }) => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
