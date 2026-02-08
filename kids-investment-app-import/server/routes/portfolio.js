const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId }) || new Portfolio({ userId: req.userId });
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/buy', auth, async (req, res) => {
  try {
    const { symbol, name, shares, price } = req.body;
    let portfolio = await Portfolio.findOne({ userId: req.userId });
    
    if (!portfolio) {
      portfolio = new Portfolio({ userId: req.userId });
    }
    
    portfolio.stocks.push({
      symbol,
      name,
      shares,
      purchasePrice: price,
      currentPrice: price
    });
    
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;