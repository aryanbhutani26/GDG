import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";

interface DashboardHeaderProps {
  name: string;
  balance: number;
}

const tips = [
  "Automate your expense tracking with Python and pandas!",
  "Use AI tools to summarize your monthly reports.",
  "Set financial goals and let AI track your progress.",
  "Leverage chatbots to remind you of bill payments.",
  "Use ML to predict future expenses based on history."
];

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ name, balance }) => {
  // Random tip (only picked once per load)
  const randomTip = useMemo(() => {
    return tips[Math.floor(Math.random() * tips.length)];
  }, []);

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome back, {name}</h2>
            <p className="text-gray-400">Here's your financial overview</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">Total Balance</p>
            <div className="text-4xl font-bold text-[#00D395]">
              ₹{balance.toLocaleString()}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-r from-[#1e293b] to-[#0f172a] border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-1">🤖 AI Tip of the Day</h3>
        <p className="text-gray-300">{randomTip}</p>
      </Card>
    </div>
  );
};

export default DashboardHeader;