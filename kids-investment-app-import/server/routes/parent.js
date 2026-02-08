const express = require('express');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', auth, async (req, res) => {
  try {
    const children = await User.find({ familyId: req.user.familyId, role: 'kid' });
    const childrenData = await Promise.all(children.map(async (child) => {
      const portfolio = await Portfolio.findOne({ userId: child._id });
      return {
        id: child._id,
        name: child.name,
        age: child.age,
        balance: child.balance,
        portfolioValue: portfolio?.totalValue || 0
      };
    }));
    res.json(childrenData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/allowance', auth, async (req, res) => {
  try {
    const { childId, amount } = req.body;
    await User.findByIdAndUpdate(childId, { $inc: { balance: amount } });
    res.json({ message: 'Allowance added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;