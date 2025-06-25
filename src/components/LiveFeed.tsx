
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Activity, User, Trophy, Target } from 'lucide-react';

interface FeedItem {
  id: string;
  type: 'solve' | 'register' | 'achievement' | 'flag';
  user: string;
  content: string;
  timestamp: Date;
  points?: number;
}

const LiveFeed: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  // Mock live feed data
  useEffect(() => {
    const mockFeed: FeedItem[] = [
      {
        id: '1',
        type: 'solve',
        user: 'CyberNinja',
        content: 'solved "Web Exploitation 101"',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        points: 100
      },
      {
        id: '2',
        type: 'achievement',
        user: 'H4ck3rKing',
        content: 'unlocked "Speed Demon" achievement',
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '3',
        type: 'flag',
        user: 'ByteBuster',
        content: 'captured flag in "Crypto Challenge"',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        points: 250
      },
      {
        id: '4',
        type: 'register',
        user: 'NewHacker21',
        content: 'joined the platform',
        timestamp: new Date(Date.now() - 12 * 60 * 1000)
      }
    ];
    setFeedItems(mockFeed);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'solve':
        return <Target className="text-green-400" size={16} />;
      case 'achievement':
        return <Trophy className="text-yellow-400" size={16} />;
      case 'flag':
        return <Activity className="text-cyan-400" size={16} />;
      case 'register':
        return <User className="text-blue-400" size={16} />;
      default:
        return <Activity className="text-gray-400" size={16} />;
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="text-cyan-400" size={20} />
        <h3 className="text-lg font-bold text-white">Live Activity Feed</h3>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {feedItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 p-2 rounded hover:bg-cyan-500/5 transition-colors">
            {getIcon(item.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 font-mono">
                <span className="text-cyan-400 font-bold">{item.user}</span>
                {' '}{item.content}
                {item.points && (
                  <span className="text-green-400 ml-2">+{item.points} pts</span>
                )}
              </p>
              <p className="text-xs text-gray-500 font-mono">
                {formatTime(item.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LiveFeed;
