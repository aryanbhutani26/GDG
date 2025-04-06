const express = require('express');
const router = express.Router();
const marketDataController = require('../controllers/market-data.controller');
const auth = require('../middleware/auth.middleware');

// Protect all routes with authentication
router.use(auth);

// Stock data routes
router.get('/quote/:symbol', marketDataController.getStockQuote);
router.get('/timeseries/:symbol', marketDataController.getTimeSeries);
router.get('/search', marketDataController.searchStocks);
router.get('/company/:symbol', marketDataController.getCompanyOverview);
router.get('/sectors', marketDataController.getSectorPerformance);

module.exports = router;