const axios = require('axios');
const { ALPHA_VANTAGE_API_KEY, ALPHA_VANTAGE_BASE_URL } = require('../config/api.config');

/**
 * Service for fetching market data from Alpha Vantage API
 */
class MarketDataService {
  /**
   * Get stock quote for a specific symbol
   * @param {string} symbol - Stock symbol (e.g., AAPL, MSFT)
   * @returns {Promise<Object>} Quote data
   */
  async getStockQuote(symbol) {
    console.log(ALPHA_VANTAGE_API_KEY)
    //GLOBAL_QUOTE
    try {
      const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: ALPHA_VANTAGE_API_KEY
        }
      });
      console.log("Raw Alpha Vantage response:", response.data)

      if (response.data['Note']) {
        // API rate limit exceeded
        throw new Error('Alpha Vantage rate limit exceeded. Please try again in 1 minute.');
      }
      
      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }

      const globalQuote = response.data['Global Quote'];

      if (!globalQuote || Object.keys(globalQuote).length === 0) {
        throw new Error('No data found for the provided symbol.');
      }
      
      return {
        symbol: globalQuote['01. symbol'],
        price: parseFloat(globalQuote['05. price']),
        change: parseFloat(globalQuote['09. change']),
        changePercent: globalQuote['10. change percent'],
        volume: globalQuote['06. volume']
      };
    } catch (error) {
      console.error(`Error fetching stock quote for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get time series data for a specific symbol
   * @param {string} symbol - Stock symbol (e.g., AAPL, MSFT)
   * @param {string} interval - Time interval (e.g., daily, weekly, monthly)
   * @returns {Promise<Object>} Time series data
   */
  async getTimeSeries(symbol, interval = 'daily') {
    try {
      const function_name = `TIME_SERIES_${interval.toUpperCase()}`;
      
      const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
        params: {
          function: function_name,
          symbol,
          outputsize: 'compact',
          apikey: ALPHA_VANTAGE_API_KEY
        }
      });
      
      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }
      
      // Different time series have different response keys
      const timeSeriesKey = Object.keys(response.data).find(key => key.includes('Time Series'));
      
      return {
        metadata: response.data['Meta Data'],
        timeSeries: response.data[timeSeriesKey]
      };
    } catch (error) {
      console.error(`Error fetching time series for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Search for stocks by keywords
   * @param {string} keywords - Search keywords
   * @returns {Promise<Array>} Matching stocks
   */
  async searchStocks(keywords) {
    try {
      const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords,
          apikey: ALPHA_VANTAGE_API_KEY
        }
      });
      
      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }
      
      return response.data.bestMatches || [];
    } catch (error) {
      console.error(`Error searching stocks for "${keywords}":`, error);
      throw error;
    }
  }

  /**
   * Get company overview
   * @param {string} symbol - Stock symbol
   * @returns {Promise<Object>} Company information
   */
  async getCompanyOverview(symbol) {
    try {
      const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
        params: {
          function: 'OVERVIEW',
          symbol,
          apikey: ALPHA_VANTAGE_API_KEY
        }
      });
      
      if (response.data['Error Message'] || Object.keys(response.data).length === 0) {
        throw new Error(`No data found for symbol ${symbol}`);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching company overview for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get sector performance data
   * @returns {Promise<Object>} Sector performance data
   */
  async getSectorPerformance() {
    try {
      const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
        params: {
          function: 'SECTOR',
          apikey: ALPHA_VANTAGE_API_KEY
        }
      });
      
      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching sector performance:', error);
      throw error;
    }
  }
}

module.exports = new MarketDataService();



// try {
//   const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
//     params: {
//       function: 'TIME_SERIES_INTRADAY',
//       symbol,
//       interval: '5min',
//       apikey: ALPHA_VANTAGE_API_KEY
//     }
//   });
//   console.log("Raw Alpha Vantage response:", response.data)

//   if (response.data['Note']) {
//     // API rate limit exceeded
//     throw new Error('Alpha Vantage rate limit exceeded. Please try again in 1 minute.');
//   }
  
//   if (response.data['Error Message']) {
//     throw new Error(response.data['Error Message']);
//   }

//   const timeSeries = response.data['Time Series (5min)'];
//   if (!timeSeries || Object.keys(timeSeries).length === 0) {
//     throw new Error(`No intraday data found for symbol: ${symbol}`);
//   }

//   // Get the most recent timestamp
//   const latestTimestamp = Object.keys(timeSeries)[0];
//   const latestData = timeSeries[latestTimestamp];
  
//   return {
//     symbol,
//     timestamp: latestTimestamp,
//     open: latestData['1. open'],
//     high: latestData['2. high'],
//     low: latestData['3. low'],
//     close: latestData['4. close'],
//     volume: latestData['5. volume'],
//   };
// } catch (error) {
//   console.error(`Error fetching stock quote for ${symbol}:`, error);
//   throw error;
// }