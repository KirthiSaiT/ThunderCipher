
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Target, Zap, Shield, Clock, Star } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const iconMap = {
  trophy: Trophy,
  target: Target,
  zap: Zap,
  shield: Shield,
  clock: Clock,
  star: Star,
};

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Trophy;
  const progressPercentage = achievement.progress && achievement.maxProgress 
    ? (achievement.progress / achievement.maxProgress) * 100 
    : 0;

  return (
    <Card className={`glass-card p-4 hover-lift transition-all duration-300 ${
      achievement.unlocked ? 'border-cyan-500/50' : 'border-gray-600/30'
    }`}>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          achievement.unlocked 
            ? 'bg-cyan-500/20 text-cyan-400' 
            : 'bg-gray-700/50 text-gray-500'
        }`}>
          <IconComponent size={24} />
        </div>
        <div className="flex-1">
          <h3 className={`font-bold ${
            achievement.unlocked ? 'text-cyan-400' : 'text-gray-400'
          }`}>
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-500 font-mono">
            {achievement.description}
          </p>
          {achievement.progress !== undefined && achievement.maxProgress && (
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 font-mono">
                {achievement.progress}/{achievement.maxProgress}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AchievementCard;
