import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Zap, Clock, TrendingUp, BookOpen, Users, Flag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import LiveFeed from '@/components/LiveFeed';
import CTFTimer from '@/components/CTFTimer';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);
  const [progressLoading, setProgressLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setProgressLoading(true);
    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id);
      if (!error) setProgress(data || []);
      setProgressLoading(false);
    };
    fetchProgress();

    // Real-time subscription
    const channel = supabase
      .channel('public:progress')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'progress', filter: `user_id=eq.${user.id}` },
        () => {
          fetchProgress();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold gradient-text mb-4">Please sign in to access your dashboard</h1>
          <Link to="/signin">
            <Button className="glass-button bg-gradient-to-r from-cyan-500 to-teal-500 text-black">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate live stats from progress
  const totalPoints = progress.reduce((sum, item) => sum + (item.progress || 0), 0);
  const challengesSolved = progress.length;
  // Placeholder: In a real app, rank and streak would be calculated globally
  const currentRank = 'Live';
  const currentStreak = 'Live';

  const quickStats = [
    { label: 'Points', value: totalPoints, icon: Trophy, color: 'text-yellow-400' },
    { label: 'Challenges Solved', value: challengesSolved, icon: Target, color: 'text-green-400' },
    { label: 'Current Rank', value: currentRank, icon: TrendingUp, color: 'text-cyan-400' },
    { label: 'Current Streak', value: currentStreak, icon: Zap, color: 'text-purple-400' }
  ];

  const recentChallenges = [
    { name: 'SQL Injection Basics', category: 'Web', points: 100, solved: true, time: '2 hours ago' },
    { name: 'Buffer Overflow', category: 'Binary', points: 250, solved: true, time: '1 day ago' },
    { name: 'Caesar Cipher', category: 'Crypto', points: 50, solved: true, time: '2 days ago' },
    { name: 'XSS Challenge', category: 'Web', points: 150, solved: false, time: 'In Progress' }
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
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome back, {user.username}! 
          </h1>
          <p className="text-gray-400 font-mono">Ready to hack some challenges?</p>
          <div className="flex items-center space-x-4 mt-4">
            <div className="px-3 py-1 bg-cyan-500/20 rounded-full">
              <span className="text-cyan-400 font-mono text-sm">Level: {user.level}</span>
            </div>
            <div className="flex items-center space-x-2">
              {user.achievements.map((achievement, index) => (
                <div key={index} className="px-2 py-1 bg-yellow-500/20 rounded text-yellow-400 text-xs font-mono">
                  {achievement}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="glass-card p-6 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-mono text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.icon className={`${stat.color}`} size={32} />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* User Progress Section */}
            <Card className="glass-card p-6 mb-6">
              <h2 className="text-xl font-bold text-white flex items-center mb-4">
                <TrendingUp className="mr-2 text-cyan-400" />
                Your Real-Time Progress
              </h2>
              {progressLoading ? (
                <div className="text-cyan-400 font-mono">Loading progress...</div>
              ) : progress.length === 0 ? (
                <div className="text-gray-400 font-mono">No progress yet. Start solving challenges!</div>
              ) : (
                <ul className="space-y-2">
                  {progress.map((item) => (
                    <li key={item.id} className="flex items-center justify-between p-2 rounded bg-slate-800/60">
                      <span className="font-mono text-cyan-300">Challenge: {item.challenge_id || 'N/A'}</span>
                      <span className="font-mono text-green-400">Progress: {item.progress}</span>
                      <span className="font-mono text-xs text-gray-400">{new Date(item.updated_at).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
            {/* Recent Activity */}
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Clock className="mr-2 text-cyan-400" />
                  Recent Challenges
                </h2>
                <Link to="/labs">
                  <Button variant="outline" className="glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentChallenges.map((challenge, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${challenge.solved ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                      <div>
                        <h3 className="font-bold text-white">{challenge.name}</h3>
                        <p className="text-sm text-gray-400 font-mono">{challenge.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold">{challenge.points} pts</p>
                      <p className="text-xs text-gray-500 font-mono">{challenge.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Zap className="mr-2 text-cyan-400" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/labs">
                  <Button className="w-full glass-button bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400">
                    <BookOpen className="mr-2" size={16} />
                    Browse Labs
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button className="w-full glass-button bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400">
                    <Users className="mr-2" size={16} />
                    Leaderboard
                  </Button>
                </Link>
                <Link to="/events">
                  <Button className="w-full glass-button bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-400 hover:to-teal-400">
                    <Flag className="mr-2" size={16} />
                    Join Event
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Activity Feed */}
            <LiveFeed />
            
            {/* Event Timers */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Clock className="mr-2 text-cyan-400" />
                Active Events
              </h3>
              <CTFTimer />
            </Card>

            {/* Achievement Progress */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Trophy className="mr-2 text-cyan-400" />
                Next Achievement
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-mono">Crypto Master</span>
                    <span className="text-cyan-400 font-mono">15/25</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 font-mono">Solve 25 cryptography challenges</p>
                </div>
                <Link to="/achievements">
                  <Button variant="outline" className="w-full glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                    View All Achievements
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
