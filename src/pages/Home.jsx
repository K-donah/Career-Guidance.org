import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // ✅ Import the styles

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>🎓 Career Guidance Platform Lesotho</h1>
          <p className="hero-subtitle">
            Your comprehensive platform for education and career advancement in Lesotho. 
            Connect with institutions, discover courses, and launch your career.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started →
            </Link>
            <Link to="/login" className="btn btn-outline btn-large">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Discover Courses</h3>
              <p>Explore courses from various higher learning institutions across Lesotho</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✍️</div>
              <h3>Apply Online</h3>
              <p>Submit applications to multiple institutions with ease</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Career Placement</h3>
              <p>Connect with employers after completing your studies</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
