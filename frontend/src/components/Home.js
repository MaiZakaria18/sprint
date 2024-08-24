import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './styles/components/Home.css';

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
						<h3>Welcome, User!</h3> {/* Display user information when authenticated */}
						<Link to="/Project" className="cta-button">
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

			<section className="about" id="about">
				<div className="container">
					<h2>Our Mission</h2>
					<div className="about-content">
						<p>
							We were inspired to create Sprint Master as a revolution in project management. Our passionate team is driven by efficiency, collaboration, and innovation.
						</p>
					</div>
				</div>
			</section>
			<footer className="footer">
				<p>© 2024 Sprint Master. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default Home;
