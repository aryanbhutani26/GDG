const MarketDataService = require('../services/market-data.service');

/**
 * Get stock quote
 */
exports.getStockQuote = async (req, res) => {
  try {
    const { symbol } = req.params;
    
    if (!symbol) {
      return res.status(400).json({ error: 'Stock symbol is required' });
    }
    
    const quoteData = await MarketDataService.getStockQuote(symbol);
    res.json(quoteData);
  } catch (error) {
    console.error('Stock quote error:', error);
    res.status(500).json({ error: 'Failed to fetch stock quote', message: error.message });
  }
};

/**
 * Get time series data
 */
exports.getTimeSeries = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { interval = 'daily' } = req.query;
    
    if (!symbol) {
      return res.status(400).json({ error: 'Stock symbol is required' });
    }
    
    const timeSeriesData = await MarketDataService.getTimeSeries(symbol, interval);
    res.json(timeSeriesData);
  } catch (error) {
    console.error('Time series error:', error);
    res.status(500).json({ error: 'Failed to fetch time series data', message: error.message });
  }
};

/**
 * Search stocks
 */
exports.searchStocks = async (req, res) => {
  try {
    const { query: keywords } = req.query;

    if (!keywords) {
      return res.status(400).json({ error: 'Search keywords are required' });
    }
    
    const searchResults = await MarketDataService.searchStocks(keywords);
    res.json(searchResults);
  } catch (error) {
    console.error('Stock search error:', error);
    res.status(500).json({ error: 'Failed to search stocks', message: error.message });
  }
};

/**
 * Get company overview
 */
exports.getCompanyOverview = async (req, res) => {
  try {
    const { symbol } = req.params;
    
    if (!symbol) {
      return res.status(400).json({ error: 'Stock symbol is required' });
    }
    
    const companyData = await MarketDataService.getCompanyOverview(symbol);
    res.json(companyData);
  } catch (error) {
    console.error('Company overview error:', error);
    res.status(500).json({ error: 'Failed to fetch company overview', message: error.message });
  }
};

/**
 * Get sector performance
 */
exports.getSectorPerformance = async (req, res) => {
  try {
    const sectorData = await MarketDataService.getSectorPerformance();
    res.json(sectorData);
  } catch (error) {
    console.error('Sector performance error:', error);
    res.status(500).json({ error: 'Failed to fetch sector performance', message: error.message });
  }
};
