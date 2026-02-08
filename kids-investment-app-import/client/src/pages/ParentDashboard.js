import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003';

function ParentDashboard({ user }) {
  const [children, setChildren] = useState([]);
  const [allowanceForm, setAllowanceForm] = useState({ childId: '', amount: '' });

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/api/parent/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChildren(data);
    } catch (error) {
      console.error('Error fetching children data:', error);
    }
  };

  const giveAllowance = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/parent/allowance`, allowanceForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllowanceForm({ childId: '', amount: '' });
      fetchChildren();
      alert('Allowance added successfully!');
    } catch (error) {
      alert('Error adding allowance');
    }
  };

  return (
    <div className="parent-dashboard">
      <h1>👨👩👧👦 Parent Dashboard</h1>
      
      <div className="children-overview">
        <h2>Your Children's Progress</h2>
        <div className="children-grid">
          {children.map(child => (
            <div key={child.id} className="child-card">
              <h3>{child.name}</h3>
              <div className="child-stats">
                <div className="stat">
                  <span>Age:</span> {child.age}
                </div>
                <div className="stat">
                  <span>Balance:</span> ${child.balance}
                </div>
                <div className="stat">
                  <span>Portfolio:</span> ${child.portfolioValue}
                </div>
                <div className="stat">
                  <span>Total:</span> ${child.balance + child.portfolioValue}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="allowance-section">
        <h2>💰 Give Allowance</h2>
        <form onSubmit={giveAllowance} className="allowance-form">
          <select
            value={allowanceForm.childId}
            onChange={(e) => setAllowanceForm({...allowanceForm, childId: e.target.value})}
            required
          >
            <option value="">Select Child</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>{child.name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount ($)"
            value={allowanceForm.amount}
            onChange={(e) => setAllowanceForm({...allowanceForm, amount: e.target.value})}
            required
          />
          <button type="submit">Give Allowance</button>
        </form>
      </div>

      <div className="parent-tips">
        <h2>💡 Parenting Tips</h2>
        <div className="tips-grid">
          <div className="tip">
            <h4>Start Early</h4>
            <p>Teaching financial literacy early builds lifelong habits</p>
          </div>
          <div className="tip">
            <h4>Make it Fun</h4>
            <p>Use games and rewards to make learning about money enjoyable</p>
          </div>
          <div className="tip">
            <h4>Set Goals</h4>
            <p>Help your child set and achieve savings goals</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;