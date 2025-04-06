export interface Chapter {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  progress: number;
  chapters: Chapter[];
}

export const courses: Course[] = [
  {
    id: "course1",
    title: "Cryptocurrency Basics",
    description: "Learn the fundamentals of blockchain and cryptocurrency trading.",
    image: "💰",
    level: "Beginner",
    duration: "2 hours",
    progress: 60,
    chapters: [
      { id: "ch1", title: "Introduction to Blockchain", duration: "10 min", videoUrl: "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing", completed: true },
      { id: "ch2", title: "Bitcoin Fundamentals", duration: "15 min", videoUrl: "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing", completed: true },
      { id: "ch3", title: "Ethereum and Smart Contracts", duration: "20 min", videoUrl: "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing", completed: false },
      { id: "ch4", title: "Wallets and Security", duration: "25 min", videoUrl: "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing", completed: false },
      { id: "ch5", title: "Making Your First Trade", duration: "30 min", videoUrl: "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing", completed: false },
    ]
  },
  {
    id: "course2",
    title: "Technical Analysis",
    description: "Master chart patterns and technical indicators for trading.",
    image: "📈",
    level: "Intermediate",
    duration: "3 hours",
    progress: 30,
    chapters: [
      { id: "ch1", title: "Chart Basics", duration: "15 min", videoUrl: "https://example.com/ta-video1", completed: true },
      { id: "ch2", title: "Support and Resistance", duration: "20 min", videoUrl: "https://example.com/ta-video2", completed: true },
      { id: "ch3", title: "Moving Averages", duration: "25 min", videoUrl: "https://example.com/ta-video3", completed: false },
      { id: "ch4", title: "RSI and MACD", duration: "30 min", videoUrl: "https://example.com/ta-video4", completed: false },
      { id: "ch5", title: "Advanced Patterns", duration: "35 min", videoUrl: "https://example.com/ta-video5", completed: false },
    ]
  },
  {
    id: "course3",
    title: "DeFi Fundamentals",
    description: "Understand decentralized finance protocols and yield farming strategies.",
    image: "🏦",
    level: "Advanced",
    duration: "4 hours",
    progress: 0,
    chapters: [
      { id: "ch1", title: "What is DeFi?", duration: "15 min", videoUrl: "https://example.com/defi-video1", completed: false },
      { id: "ch2", title: "Lending and Borrowing", duration: "25 min", videoUrl: "https://example.com/defi-video2", completed: false },
      { id: "ch3", title: "Liquidity Pools", duration: "30 min", videoUrl: "https://example.com/defi-video3", completed: false },
      { id: "ch4", title: "Yield Farming Strategies", duration: "35 min", videoUrl: "https://example.com/defi-video4", completed: false },
      { id: "ch5", title: "Risk Management", duration: "30 min", videoUrl: "https://example.com/defi-video5", completed: false },
    ]
  },
  {
    id: "course4",
    title: "NFT Marketplace",
    description: "Learn how to create, buy, sell, and trade NFTs across platforms.",
    image: "🖼️",
    level: "Intermediate",
    duration: "2.5 hours",
    progress: 10,
    chapters: [
      { id: "ch1", title: "NFT Fundamentals", duration: "20 min", videoUrl: "https://example.com/nft-video1", completed: true },
      { id: "ch2", title: "Creating Your First NFT", duration: "25 min", videoUrl: "https://example.com/nft-video2", completed: false },
      { id: "ch3", title: "Popular NFT Marketplaces", duration: "20 min", videoUrl: "https://example.com/nft-video3", completed: false },
      { id: "ch4", title: "Trading Strategies", duration: "30 min", videoUrl: "https://example.com/nft-video4", completed: false },
      { id: "ch5", title: "Future of NFTs", duration: "25 min", videoUrl: "https://example.com/nft-video5", completed: false },
    ]
  },
  {
    id: "course5",
    title: "Crypto Tax Planning",
    description: "Understanding cryptocurrency taxation and optimization strategies.",
    image: "📊",
    level: "Intermediate",
    duration: "3 hours",
    progress: 0,
    chapters: [
      { id: "ch1", title: "Tax Basics for Crypto", duration: "25 min", videoUrl: "https://example.com/tax-video1", completed: false },
      { id: "ch2", title: "Recording Transactions", duration: "20 min", videoUrl: "https://example.com/tax-video2", completed: false },
      { id: "ch3", title: "Mining and Staking Taxes", duration: "30 min", videoUrl: "https://example.com/tax-video3", completed: false },
      { id: "ch4", title: "DeFi Tax Implications", duration: "35 min", videoUrl: "https://example.com/tax-video4", completed: false },
      { id: "ch5", title: "Tax Planning Strategies", duration: "30 min", videoUrl: "https://example.com/tax-video5", completed: false },
    ]
  },
  {
    id: "course6",
    title: "Blockchain Security",
    description: "Learn how to secure your crypto assets and avoid common scams.",
    image: "🔒",
    level: "Beginner",
    duration: "2 hours",
    progress: 0,
    chapters: [
      { id: "ch1", title: "Security Fundamentals", duration: "15 min", videoUrl: "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing", completed: false },
      { id: "ch2", title: "Wallet Security", duration: "25 min", videoUrl: "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing", completed: false },
      { id: "ch3", title: "Common Scams", duration: "20 min", videoUrl: "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing", completed: false },
      { id: "ch4", title: "Safe Trading Practices", duration: "25 min", videoUrl: "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing", completed: false },
      { id: "ch5", title: "Recovery Strategies", duration: "20 min", videoUrl: "https://drive.google.com/file/d/17Ylf9SEA0JrdPNjH1S_mP6hDAUoK341y/view?usp=sharing", completed: false },
    ]
  }
];