import React from 'react';
import { Card } from "@/components/ui/card";
import type { Insight } from '../types/UserData';

interface AiInsightsProps {
  insights: Insight[];
}

const AiInsights: React.FC<AiInsightsProps> = ({ insights }) => {
  const formatMessage = (message: string) => {
    return message.replace(/\$(\d+)/g, '₹$1');
  };

  return (
    <Card className="p-6 bg-gray-900/50 border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">AI Insights</h3>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg ${
              insight.type === 'tip' ? 'bg-[#00D395]/10' :
              insight.type === 'warning' ? 'bg-yellow-500/10' :
              'bg-blue-500/10'
            }`}
          >
            <p className="text-white">{formatMessage(insight.message)}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(insight.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AiInsights;