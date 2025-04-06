const Recommendation = require('../models/recommendation.model');
const MarketDataService = require('../services/market-data.service');


/**
 * Get all recommendations for a user
 */
exports.getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(recommendations);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

/**
 * Generate new recommendation with real-time market data
 */
exports.createRecommendation = async (req, res) => {
    try {
      // Get user's risk tolerance
      const riskLevel = req.body.riskLevel || req.user.riskTolerance;
      
      // Base assets by risk level
      let baseAssets = [];
      
      switch (riskLevel) {
        case 'low':
          baseAssets = [
            { type: 'ETF', ticker: 'AAPL', targetAllocation: 60 },  // ← temporary replacement
            { type: 'ETF', ticker: 'MSFT', targetAllocation: 30 },
            { type: 'ETF', ticker: 'IBM', targetAllocation: 10 }
          ];
          break;
        case 'medium':
          baseAssets = [
            { type: 'ETF', ticker: 'AAPL', targetAllocation: 60 },  // ← temporary replacement
            { type: 'ETF', ticker: 'MSFT', targetAllocation: 20 },
            { type: 'ETF', ticker: 'IBM', targetAllocation: 20 }
          ];
          break;
        case 'high':
          baseAssets = [
            { type: 'ETF', ticker: 'VTI', targetAllocation: 50 },
            { type: 'ETF', ticker: 'VGT', targetAllocation: 20 },
            { type: 'ETF', ticker: 'VXUS', targetAllocation: 20 },
            { type: 'ETF', ticker: 'BND', targetAllocation: 10 }
          ];
          break;
      }
      
      // Enhance with market data
      const assets = await Promise.all(baseAssets.map(async (asset) => {
        try {
          // Get stock quote data
          const quoteData = await MarketDataService.getStockQuote(asset.ticker);
          
          // Get company overview
          let companyData = null;

          try {
            companyData = await MarketDataService.getCompanyOverview(asset.ticker);
          } catch (err) {
            console.warn(`Company overview not found for ${asset.ticker}`);
          }
          
          // Determine reason for recommendation
          let reasonForRecommendation = '';
          
          switch (asset.ticker) {
            case 'BND':
              reasonForRecommendation = 'Bond exposure for stability and income';
              break;
            case 'VTI':
              reasonForRecommendation = 'Broad U.S. market exposure for long-term growth';
              break;
            case 'VTIP':
              reasonForRecommendation = 'Inflation protection through Treasury Inflation-Protected Securities';
              break;
            case 'VXUS':
              reasonForRecommendation = 'International diversification to reduce home-country bias';
              break;
            case 'VGT':
              reasonForRecommendation = 'Technology sector exposure for growth potential';
              break;
            default:
              reasonForRecommendation = 'Diversification component for balanced portfolio';
          }
          
          // Enhanced with market data
          if (companyData && companyData.Name) {
            reasonForRecommendation += `. ${companyData.Name} with current dividend yield of ${companyData.DividendYield || '0'}%.`;
          }
          
          return {
            type: asset.type,
            ticker: asset.ticker,
            allocationPercentage: asset.targetAllocation,
            reasonForRecommendation,
            currentPrice: quoteData ? quoteData['05. price'] : 'Unknown',
            priceChange: quoteData ? quoteData['09. change'] : 'Unknown',
            changePercent: quoteData ? quoteData['10. change percent'] : 'Unknown'
          };
        } catch (error) {
          console.error(`Error fetching data for ${asset.ticker}:`, error);
          // Return basic asset info if API request fails
          return {
            type: asset.type,
            ticker: asset.ticker,
            allocationPercentage: asset.targetAllocation,
            reasonForRecommendation: `${asset.ticker} allocation based on risk profile`
          };
        }
      }));
      
      // Get sector performance for additional context
      let marketInsights = {};
      try {
        const sectorData = await MarketDataService.getSectorPerformance();
        console.log("Raw sector data:", sectorData);
        const sectorPerf = sectorData?.['Rank A: Real-Time Performance'];

        if (sectorPerf) {
          const sortedSectors = Object.entries(sectorPerf)
            .sort((a, b) => parseFloat(b[1].replace('%', '')) - parseFloat(a[1].replace('%', '')));
  
          marketInsights = {
            topSector: {
              sector: sortedSectors[0][0],
              performance: sortedSectors[0][1]
            },
            date: sectorData['Meta Data']['Last Refreshed']
          };
        } else {
          console.warn("No sector performance data available");
        }
      } catch (err) {
        console.error("Error fetching sector data:", err.message);
      }
      
      const recommendation = new Recommendation({
        userId: req.user._id,
        riskLevel,
        assets,
        marketInsights
      });
      
      await recommendation.save();
      res.status(201).json(recommendation);
    } catch (error) {
      console.error('Create recommendation error:', error);
      res.status(500).json({ error: 'Server error', message: error.message });
    }
  };

/**
 * Delete a recommendation
 */
exports.deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findOne({ 
      _id: req.params.id,
      userId: req.user._id 
    });
    
    if (!recommendation) {
      return res.status(404).json({ error: 'Recommendation not found' });
    }
    
    await recommendation.deleteOne();
    res.json({ message: 'Recommendation deleted' });
  } catch (error) {
    console.error('Delete recommendation error:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};
