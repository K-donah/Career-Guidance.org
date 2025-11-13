import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="page-header">
        <h1>Welcome, {user?.name}! 👋</h1>
        <p>You are logged in as a {user?.role}</p>
      </div>
      
      <div className="card">
        <h2>Dashboard</h2>
        <p>This is your dashboard. More features will be available based on your role.</p>
        
        <div className="grid grid-4 mt-6">
          <div className="dashboard-card">
            <div className="card-icon">📚</div>
            <h3>Courses</h3>
            <p>Browse and apply to courses</p>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">🏫</div>
            <h3>Institutions</h3>
            <p>View available institutions</p>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">💼</div>
            <h3>Jobs</h3>
            <p>Find employment opportunities</p>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>Profile</h3>
            <p>Manage your account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;