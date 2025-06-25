
import React, { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState('all-time');
  const { user } = useAuth();

  const leaderboardData = [
    { rank: 1, username: 'CyberNinja', points: 3250, challengesCompleted: 45, country: '🇺🇸', isCurrentUser: false },
    { rank: 2, username: 'H4ck3rM4st3r', points: 3100, challengesCompleted: 42, country: '🇩🇪', isCurrentUser: false },
    { rank: 3, username: 'QuantumBreaker', points: 2950, challengesCompleted: 38, country: '🇯🇵', isCurrentUser: false },
    { rank: 4, username: 'BinaryGhost', points: 2800, challengesCompleted: 35, country: '🇬🇧', isCurrentUser: false },
    { rank: 5, username: 'CryptoSolver', points: 2650, challengesCompleted: 33, country: '🇨🇦', isCurrentUser: false },
    { rank: 6, username: 'WebExplorer', points: 2500, challengesCompleted: 31, country: '🇦🇺', isCurrentUser: false },
    { rank: 7, username: 'ForensicHunter', points: 2350, challengesCompleted: 28, country: '🇸🇪', isCurrentUser: false },
    { rank: 8, username: 'ReverseEngineer', points: 2200, challengesCompleted: 26, country: '🇳🇱', isCurrentUser: false },
    { rank: 9, username: 'PwnMachine', points: 2050, challengesCompleted: 24, country: '🇫🇷', isCurrentUser: false },
    { rank: 10, username: 'BufferKing', points: 1900, challengesCompleted: 22, country: '🇰🇷', isCurrentUser: false },
    // Add current user
    ...(user ? [{ rank: user.rank, username: user.username, points: user.points, challengesCompleted: user.completedChallenges, country: '🇺🇸', isCurrentUser: true }] : []),
  ];

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
          {leaderboardData.slice(0, 3).map((player, index) => (
            <Card key={player.rank} className={`p-6 text-center hover-lift animate-fade-in-up ${getRowStyle(player.rank, player.isCurrentUser)}`} style={{animationDelay: `${0.1 * index}s`}}>
              <div className="mb-4">
                {getRankIcon(player.rank)}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{player.username}</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">{player.country}</span>
                </div>
                <div className="text-2xl font-bold text-cyan-400">{player.points}</div>
                <div className="text-gray-400 font-mono text-sm">{player.challengesCompleted} challenges</div>
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
                  <th className="p-4 font-mono text-cyan-400">Country</th>
                  <th className="p-4 font-mono text-cyan-400">Points</th>
                  <th className="p-4 font-mono text-cyan-400">Challenges</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((player, index) => (
                  <tr 
                    key={`${player.rank}-${player.username}`}
                    className={`border-b border-cyan-500/10 transition-all duration-300 ${
                      player.isCurrentUser ? 'bg-cyan-900/20' : 'hover:bg-gray-800/30'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        {getRankIcon(player.rank)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold ${player.isCurrentUser ? 'text-cyan-400' : 'text-white'}`}>
                          {player.username}
                        </span>
                        {player.isCurrentUser && (
                          <span className="px-2 py-1 bg-cyan-600 text-black text-xs rounded font-mono">YOU</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-2xl">{player.country}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-cyan-400 font-mono">{player.points}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400 font-mono">{player.challengesCompleted}</span>
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
