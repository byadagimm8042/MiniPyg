import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003';

function Portfolio({ user }) {
  const [portfolio, setPortfolio] = useState(null);
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [buyForm, setBuyForm] = useState({ symbol: '', name: '', shares: '', price: '' });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/api/portfolio`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPortfolio(data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/portfolio/buy`, buyForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBuyForm({ symbol: '', name: '', shares: '', price: '' });
      setShowBuyForm(false);
      fetchPortfolio();
    } catch (error) {
      alert('Error buying stock');
    }
  };

  const chartData = portfolio?.stocks?.map(stock => ({
    name: stock.symbol,
    value: stock.shares * stock.currentPrice
  })) || [];

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <h1>📊 My Portfolio</h1>
        <button onClick={() => setShowBuyForm(true)} className="buy-btn">
          💰 Buy Stock
        </button>
      </div>

      {portfolio?.stocks?.length > 0 ? (
        <div className="portfolio-content">
          <div className="portfolio-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: $${value}`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="stocks-list">
            <h3>Your Stocks</h3>
            {portfolio.stocks.map((stock, index) => (
              <div key={index} className="stock-item">
                <div>
                  <strong>{stock.symbol}</strong> - {stock.name}
                </div>
                <div>
                  {stock.shares} shares @ ${stock.purchasePrice}
                </div>
                <div className="stock-value">
                  Value: ${(stock.shares * stock.currentPrice).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-portfolio">
          <p>You don't have any stocks yet!</p>
          <p>Start by buying your first stock 🚀</p>
        </div>
      )}

      {showBuyForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Buy Stock</h3>
            <form onSubmit={handleBuy}>
              <input
                type="text"
                placeholder="Stock Symbol (e.g., AAPL)"
                value={buyForm.symbol}
                onChange={(e) => setBuyForm({...buyForm, symbol: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Company Name"
                value={buyForm.name}
                onChange={(e) => setBuyForm({...buyForm, name: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Number of Shares"
                value={buyForm.shares}
                onChange={(e) => setBuyForm({...buyForm, shares: e.target.value})}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price per Share"
                value={buyForm.price}
                onChange={(e) => setBuyForm({...buyForm, price: e.target.value})}
                required
              />
              <div className="modal-buttons">
                <button type="submit">Buy Stock</button>
                <button type="button" onClick={() => setShowBuyForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;