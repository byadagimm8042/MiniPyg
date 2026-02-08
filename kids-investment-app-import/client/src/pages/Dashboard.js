import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003';

function Dashboard({ user }) {
  const [portfolio, setPortfolio] = useState(null);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [portfolioRes] = await Promise.all([
        axios.get(`${API_URL}/api/portfolio`, { headers })
      ]);
      
      setPortfolio(portfolioRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome back, {user.name}! 🎉</h1>
      
      <div className="dashboard-grid">
        <div className="card">
          <h3>💰 Your Balance</h3>
          <p className="balance">${user.balance || 0}</p>
        </div>
        
        <div className="card">
          <h3>📈 Portfolio Value</h3>
          <p className="portfolio-value">${portfolio?.totalValue || 0}</p>
        </div>
        
        <div className="card">
          <h3>🎯 Active Goals</h3>
          <p>{goals.filter(g => !g.completed).length}</p>
        </div>
      </div>

      <div className="quick-actions">
        <h3>What would you like to do?</h3>
        <div className="action-buttons">
          <Link to="/portfolio" className="action-btn">
            📊 View Portfolio
          </Link>
          <Link to="/education" className="action-btn">
            🎓 Learn About Money
          </Link>
          {user.role === 'parent' && (
            <Link to="/parent" className="action-btn">
              👨‍👩‍👧‍👦 Parent Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;