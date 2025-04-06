import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SavingsGoals from '../components/SavingsGoals';
import AiInsights from '../components/AiInsights';
import Gamification from '../components/Gamification';
import { fetchUserData } from '../api/userData';
import type { UserData } from '../types/UserData';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };
    loadUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleUpdateGoal = (updatedGoal: { id: string; name: string; targetAmount: number; currentAmount: number; deadline: Date }) => {
    if (userData) {
      const updatedGoals = userData.savingsGoals.map(goal => 
        goal.id === updatedGoal.id ? updatedGoal : goal
      );
      setUserData({
        ...userData,
        savingsGoals: updatedGoals
      });
      // Here you would typically also make an API call to update the goal in the backend
    }
  };

  const handleAddGoal = (newGoal: Omit<{ id: string; name: string; targetAmount: number; currentAmount: number; deadline: Date }, 'id'>) => {
    if (userData) {
      const newGoalWithId = {
        ...newGoal,
        id: `goal-${Date.now()}`, // Generate a unique ID
      };
      setUserData({
        ...userData,
        savingsGoals: [...userData.savingsGoals, {
          id: newGoalWithId.id,
          name: newGoalWithId.name,
          targetAmount: newGoalWithId.targetAmount,
          currentAmount: newGoalWithId.currentAmount,
          deadline: newGoalWithId.deadline
        }]
      });
      // Here you would typically also make an API call to save the new goal
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <DashboardHeader name={userData.name} balance={userData.balance} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SavingsGoals 
            goals={userData.savingsGoals} 
            onUpdateGoal={handleUpdateGoal}
            onAddGoal={handleAddGoal}
          />
          <AiInsights insights={userData.insights} />
        </div>
        
        <Gamification achievements={userData.achievements} />

        <div className="flex flex-col items-center gap-4">
          <Button 
            className="!rounded-button text-lg px-8 py-6 bg-[#00D395] hover:bg-[#00D395]/90 transition-colors cursor-pointer"
            onClick={() => navigate('/dashboard/learning')}
          >
            <i className="fas fa-graduation-cap mr-2"></i>
            Continue Your Learning Journey
          </Button>

          <Button 
            className="!rounded-button text-lg px-8 py-6 bg-[#00D395] hover:bg-[#00D395]/90 transition-colors cursor-pointer"
            onClick={() => navigate('/dashboard/stocks')}
          >
            <i className="fas fa-chart-line mr-2"></i>
            Check the Stock Market
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;