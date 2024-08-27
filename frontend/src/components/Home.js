import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './styles/components/Home.css';


/**
 * A functional component representing the Home page of the application.
 * It renders the hero section, features section, GitHub source code section, and the footer.
 * The component uses the useAuth hook to check if the user is authenticated and conditionally renders the welcome message or the get started button.
 *
 * @return {JSX.Element} The JSX element representing the Home page.
 */
const Home = () => {
	const { isAuthenticated } = useAuth();

	return (
		<div className="home-container">
			<header className="hero">
				<h1 className="hero-title">
					Sprint <span className="highlight">Master</span>
				</h1>
				<p className="hero-subtitle">
					Your Project Management <br /> Powerhouse ⚡
				</p>
				{isAuthenticated ? (
					<div className="user-actions">
						<h3>Welcome</h3>
						<Link to="/projects/create" className="cta-button">
							Create Project
						</Link>
					</div>
				) : (
					<Link to="/login" className="cta-button">
						Get Started
					</Link>
				)}
			</header>

			<section className="features" id="features">
				<div className="container">
					<h2>Unleash Your Project Potential</h2>
					<div className="feature-grid">
						<div className="feature-card">
							<h3>Collaboration</h3>
							<p>Enhance teamwork with real-time updates and communication.</p>
						</div>
						<div className="feature-card">
							<h3>Tracking</h3>
							<p>Monitor progress with intuitive dashboards and reports.</p>
						</div>
						<div className="feature-card">
							<h3>Integration</h3>
							<p>Seamlessly connect with your favorite tools and apps.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="github" id="github">
				<div className="container">
					<h2>GitHub Source Code</h2>
					<p>
						You can find the source code for this project on GitHub.
						<Link to="https://github.com/yourusername/sprint-master" className="cta-button" target="_blank" rel="noopener noreferrer">
							View on GitHub
						</Link>
					</p>
				</div>
			</section>

			<footer className="footer">
				<p>© 2024 Sprint Master. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default Home;
