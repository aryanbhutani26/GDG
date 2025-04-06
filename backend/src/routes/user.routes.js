const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware'); // If you have auth middleware

// GET /api/user/data - Protected route to return user profile info
router.get('/data', authenticate, async (req, res) => {
  try {
    // Assuming req.user is set by your auth middleware
    const user = req.user;

    // Build mock user data for now
    const userData = {
      name: user.username, // Or user.name
      balance: 12500.00,
      savingsGoals: [
        {
          id: "1",
          name: "Emergency Fund",
          targetAmount: 10000,
          currentAmount: 5000,
          deadline: new Date("2024-12-31")
        }
      ],
      recentTransactions: [
        {
          id: "1",
          type: "expense",
          amount: 50.00,
          category: "Food",
          date: new Date(),
          description: "Grocery shopping"
        }
      ],
      insights: [
        {
          id: "1",
          type: "tip",
          message: "You could save $200 monthly by optimizing your subscriptions",
          date: new Date()
        }
      ],
      achievements: [
        {
          id: "1",
          name: "First Investment",
          description: "Made your first investment",
          earned: true,
          progress: 100
        }
      ]
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Server error fetching user data" });
  }
});

module.exports = router;
