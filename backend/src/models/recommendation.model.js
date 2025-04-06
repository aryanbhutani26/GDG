const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
  assets: [{
    type: { type: String, required: true }, // e.g., stock, bond, ETF
    ticker: { type: String, required: true },
    allocationPercentage: { type: Number, required: true },
    reasonForRecommendation: { type: String }
  }],
  marketInsights: {
    topSector: {
      sector: { type: String },
      performance: { type: String }
    },
    date: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);