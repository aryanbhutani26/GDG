const express = require('express');
const cors = require('cors');
require('dotenv').config();
const marketDataRoutes = require('./routes/market-data.routes');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth.routes');
const progressRoutes = require('./routes/progress.routes');
const recommendationRoutes = require('./routes/recommendation.routes');
const userRoutes = require("./routes/user.routes");
const savingGoalsRoutes= require("./routes/saving-goals.routes")

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/market', marketDataRoutes);
app.use('/api/user', userRoutes);
app.use('/api/goals', savingGoalsRoutes)

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error', message: err.message });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
