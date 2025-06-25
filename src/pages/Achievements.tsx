
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Target, Zap, Shield, Clock, Star, Award, Medal } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AchievementCard from '@/components/AchievementCard';

const Achievements = () => {
  const { user } = useAuth();

  const achievements = [
    {
      id: '1',
      title: 'First Blood',
      description: 'Solve your first challenge',
      icon: 'target',
      unlocked: true
    },
    {
      id: '2',
      title: 'Speed Demon',
      description: 'Solve 5 challenges in under 1 hour',
      icon: 'zap',
      unlocked: true
    },
    {
      id: '3',
      title: 'Web Warrior',
      description: 'Complete all web exploitation challenges',
      icon: 'shield',
      unlocked: true,
      progress: 8,
      maxProgress: 10
    },
    {
      id: '4',
      title: 'Crypto Master',
      description: 'Solve 25 cryptography challenges',
      icon: 'star',
      unlocked: false,
      progress: 15,
      maxProgress: 25
    },
    {
      id: '5',
      title: 'Night Owl',
      description: 'Submit solutions between 12 AM - 6 AM',
      icon: 'clock',
      unlocked: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: '6',
      title: 'Champion',
      description: 'Reach top 10 on the leaderboard',
      icon: 'trophy',
      unlocked: false,
      progress: 15,
      maxProgress: 10
    }
  ];

  const categories = [
    { name: 'Progress', count: achievements.filter(a => a.unlocked).length, total: achievements.length },
    { name: 'Points Earned', count: user?.points || 0, total: null },
    { name: 'Current Streak', count: user?.streak || 0, total: null },
    { name: 'Rank', count: user?.rank || 0, total: null }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-20">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-teal-400 rounded-full animate-pulse animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="text-cyan-400" size={40} />
            <h1 className="text-4xl font-bold gradient-text">Achievements</h1>
          </div>
          <p className="text-gray-400 font-mono">Track your progress and unlock rewards</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {categories.map((category, index) => (
            <Card key={index} className="glass-card p-6 text-center hover-lift">
              <div className="text-2xl font-bold text-cyan-400 mb-2">
                {category.count}{category.total ? `/${category.total}` : ''}
              </div>
              <div className="text-gray-400 font-mono text-sm">{category.name}</div>
            </Card>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>

        {/* Achievement Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="mr-3 text-cyan-400" />
            Achievement Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card p-6">
              <Medal className="text-yellow-400 mb-3" size={32} />
              <h3 className="text-lg font-bold text-white mb-2">Challenge Master</h3>
              <p className="text-gray-400 text-sm font-mono">
                Achievements for solving different types of challenges
              </p>
            </Card>
            <Card className="glass-card p-6">
              <Zap className="text-purple-400 mb-3" size={32} />
              <h3 className="text-lg font-bold text-white mb-2">Speed Runner</h3>
              <p className="text-gray-400 text-sm font-mono">
                Time-based achievements for quick solvers
              </p>
            </Card>
            <Card className="glass-card p-6">
              <Star className="text-green-400 mb-3" size={32} />
              <h3 className="text-lg font-bold text-white mb-2">Community</h3>
              <p className="text-gray-400 text-sm font-mono">
                Social achievements for community participation
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
