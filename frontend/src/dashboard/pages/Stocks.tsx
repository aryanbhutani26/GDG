import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import axios from 'axios';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
}

const sampleStocks: StockData[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 177.97, change: -0.7, volume: '37.2M' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 399.12, change: +2.1, volume: '25.6M' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 134.32, change: -0.3, volume: '18.4M' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 156.55, change: +1.4, volume: '32.0M' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 192.88, change: +3.6, volume: '38.9M' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 892.32, change: -4.2, volume: '22.7M' },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 456.34, change: +0.9, volume: '19.3M' },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 609.13, change: -2.1, volume: '11.2M' }
];


const dummyChartData = [
  { time: '09:30', open: 177.5, high: 178.1, low: 177.2, close: 178.0 },
  { time: '10:00', open: 178.0, high: 178.5, low: 177.8, close: 178.3 },
  { time: '10:30', open: 178.3, high: 178.9, low: 178.0, close: 178.6 },
  { time: '11:00', open: 178.6, high: 179.2, low: 178.4, close: 179.0 },
  { time: '11:30', open: 179.0, high: 179.3, low: 178.7, close: 179.1 },
  { time: '12:00', open: 179.1, high: 179.5, low: 178.8, close: 179.2 },
];


const Stocks: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks, setStocks] = useState<StockData[]>(sampleStocks);
  const [viewType, setViewType] = useState<'intraday' | 'daily' | null>(null);
  const [selectedTicker, setSelectedTicker] = useState('');
  const [chartData, setChartData] = useState<any[]>([]);
  

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token'); // Make sure your login flow stores it
  
      const res = await axios.get(`https://gdg-dcdk.onrender.com/api/market/quote/${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setStocks([res.data]); // Wrap in array if it's a single stock
    } catch (err) {
      console.error("Error fetching search results", err);
    }
  };

  const handleView = (type: 'intraday' | 'daily') => {
    setViewType(type);
    if (selectedTicker) {
      setChartData(dummyChartData);
    }
  };

  const handleTickerFetch = async () => {
    if (!selectedTicker) return;

    try {
      const token = localStorage.getItem('token'); // Get your JWT token

      const res = await axios.get(`https://gdg-dcdk.onrender.com/api/market/timeseries/${selectedTicker}`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token here
        }
      });

      const timeSeries = res.data.timeSeries;

      const transformed = Object.entries(timeSeries).map(([time, values]: any) => ({
        time,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
      }));

      const sorted = transformed.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

      setChartData(sorted);
    } catch (err) {
      console.error("Error fetching timeseries data", err);
    }
  };
  

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">📈 Stock Market</h1>
          <Button
            variant="outline"
            className="border-[#00D395] text-[#00D395] hover:bg-[#00D395] hover:text-white"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Left Box */}
          <div className="w-[30%] bg-gray-900 p-4 rounded-lg border border-gray-800 space-y-4">
            <Input
              placeholder="Enter Stock Name (e.g., RELIANCE)"
              value={selectedTicker}
              onChange={(e) => setSelectedTicker(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button className="w-full bg-[#00D395]" onClick={handleTickerFetch}>
              Fetch Stock
            </Button>

            <div className="flex gap-2 justify-between">
              <Button
                className={`flex-1 text-sm ${viewType === 'intraday'
                  ? 'bg-[#00D395] text-white'
                  : 'border border-[#00D395] text-[#00D395]'
                  }`}
                onClick={() => handleView('intraday')}
              >
                Intraday
              </Button>

              <Button
                className={`flex-1 text-sm ${viewType === 'daily'
                  ? 'bg-[#00D395] text-white'
                  : 'border border-[#00D395] text-[#00D395]'
                  }`}
                onClick={() => handleView('daily')}
              >
                Daily
              </Button>
            </div>
          </div>

          {/* Right Box */}
          <div className="w-[70%] h-[400px] bg-gray-900 p-4 rounded-lg border border-gray-800">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  {chartData.map((entry, index) => {
                    const color = entry.open > entry.close ? "#EF4444" : "#00D395";
                    const x = index * 80 + 40;
                    const candleY = 400 - Math.max(entry.open, entry.close);
                    const candleHeight = Math.abs(entry.open - entry.close);
                    const wickHeight = Math.abs(entry.high - entry.low);
                    return (
                      <g key={index}>
                        {/* Wick */}
                        <rect x={x + 4} y={400 - entry.high} width={2} height={wickHeight} fill={color} />
                        {/* Candle */}
                        <rect x={x} y={candleY} width={10} height={candleHeight} fill={color} />
                      </g>
                    );
                  })}
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400">No stock selected</p>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4 items-center mt-6">
          <Input
            placeholder="Search stocks (e.g., RELIANCE)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            className="bg-[#00D395] hover:bg-[#00D395]/90"
            onClick={handleSearch}
          >
            🔍 Search
          </Button>
        </div>

        {/* Stock Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stocks.map((stock) => (
            <Card
              key={stock.symbol}
              className="p-6 bg-gray-900/50 border-gray-800 hover:border-[#00D395] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{stock.symbol}</h3>
                    <p className="text-gray-400 text-sm">{stock.name}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${stock.change >= 0
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                    }`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#00D395] text-2xl font-bold">₹{stock.price}</p>
                    <p className="text-gray-400 text-sm">Volume: {stock.volume}</p>
                  </div>
                  <Button className="bg-[#00D395] hover:bg-[#00D395]/90 text-white">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stocks;