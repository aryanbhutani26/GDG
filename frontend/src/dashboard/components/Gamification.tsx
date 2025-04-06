import React from 'react';
import { Card } from "@/components/ui/card";
// import { Progress } from "@radix-ui/react-progress";
import type { Achievement } from '../types/UserData';

interface GamificationProps {
  achievements: Achievement[];
}

const Gamification: React.FC<GamificationProps> = ({ achievements }) => {
  return (
    <Card className="p-6 bg-gray-900/50 border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div key={achievement._id} className="space-y-2">
            <div className="flex items-center gap-4">
              <div className={`text-2xl ${achievement.earned ? 'text-[#00D395]' : 'text-gray-500'}`}>
                🏆
              </div>
              <div>
                <h4 className="font-semibold text-white">{achievement.name}</h4>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </div>
            </div>
            {/* <Progress value={achievement.progress} /> */}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Gamification;