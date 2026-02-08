const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stocks: [{
    symbol: String,
    name: String,
    shares: Number,
    purchasePrice: Number,
    currentPrice: Number,
    purchaseDate: { type: Date, default: Date.now }
  }],
  totalValue: { type: Number, default: 0 },
  totalGainLoss: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);