import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Education from './pages/Education';
import ParentDashboard from './pages/ParentDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <Router>
      <div className="App">
        {user && (
          <nav className="navbar">
            <h1>💰 Kids Investment App</h1>
            <div>
              <span>Hi, {user.name}!</span>
              <button onClick={logout}>Logout</button>
            </div>
          </nav>
        )}
        
        <Routes>
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/portfolio" element={user ? <Portfolio user={user} /> : <Navigate to="/login" />} />
          <Route path="/education" element={user ? <Education user={user} /> : <Navigate to="/login" />} />
          <Route path="/parent" element={user?.role === 'parent' ? <ParentDashboard user={user} /> : <Navigate to="/dashboard" />} />
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;