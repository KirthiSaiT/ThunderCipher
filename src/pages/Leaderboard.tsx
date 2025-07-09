
import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState('all-time');
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data } = await supabase
        .from('profiles')
        .select('id, username, points')
        .order('points', { ascending: false }); // Removed .limit(10)
      setLeaders(data || []);
    }
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Medal className="text-amber-600" size={24} />;
      default:
        return <span className="text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getRowStyle = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return 'glass-card border-cyan-500/50 hover:border-cyan-500/70';
    }
    if (rank <= 3) {
      return 'glass-card border-yellow-500/30 hover:border-yellow-500/50';
    }
    return 'glass-card hover:border-cyan-500/40';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-20 pb-12 relative overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-teal-400 rounded-full animate-pulse animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold gradient-text mb-2">Global Leaderboard</h1>
          <p className="text-gray-400 font-mono">See how you rank against other hackers worldwide</p>
        </div>

        {/* Time Filter */}
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          {['all-time', 'monthly', 'weekly'].map((filter) => (
            <Button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              variant={timeFilter === filter ? 'default' : 'outline'}
              className={`font-mono ${
                timeFilter === filter 
                  ? 'glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black' 
                  : 'glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
            </Button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaders.slice(0, 3).map((player, index) => (
            <Card key={player.id} className={`p-6 text-center hover-lift animate-fade-in-up ${getRowStyle(index + 1, player.id === user?.id)}`} style={{animationDelay: `${0.1 * index}s`}}>
              <div className="mb-4">
                {getRankIcon(index + 1)}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{player.username}</h3>
                <div className="text-2xl font-bold text-cyan-400">{player.points}</div>
              </div>
            </Card>
          ))}
        </div>
        {/* Full Leaderboard Table */}
        <Card className="glass-card overflow-hidden animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="p-6 border-b border-cyan-500/20">
            <h2 className="text-2xl font-bold gradient-text flex items-center">
              <TrendingUp className="mr-2" />
              Full Rankings
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr className="text-left">
                  <th className="p-4 font-mono text-cyan-400">Rank</th>
                  <th className="p-4 font-mono text-cyan-400">Player</th>
                  <th className="p-4 font-mono text-cyan-400">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((player, index) => (
                  <tr 
                    key={player.id}
                    className={`border-b border-cyan-500/10 transition-all duration-300 ${player.id === user?.id ? 'bg-cyan-900/20' : 'hover:bg-gray-800/30'}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        {getRankIcon(index + 1)}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`font-bold ${player.id === user?.id ? 'text-cyan-400' : 'text-white'}`}>{player.username}</span>
                      {player.id === user?.id && (
                        <span className="px-2 py-1 bg-cyan-600 text-black text-xs rounded font-mono ml-2">YOU</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-cyan-400 font-mono">{player.points}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* User Rank Card (if logged in and not in top 10) */}
        {user && user.rank > 10 && (
          <Card className="mt-6 glass-card border-cyan-500/50 p-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-cyan-400 font-bold">#{user.rank}</span>
                <span className="font-bold text-cyan-400">{user.username}</span>
                <span className="text-2xl">🇺🇸</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="font-bold text-cyan-400 font-mono">{user.points}</div>
                  <div className="text-gray-400 font-mono text-sm">points</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 font-mono">{user.completedChallenges}</div>
                  <div className="text-gray-400 font-mono text-sm">challenges</div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
