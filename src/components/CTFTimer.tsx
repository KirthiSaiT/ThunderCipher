
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';

interface CTFEvent {
  name: string;
  startTime: Date;
  endTime: Date;
  status: 'upcoming' | 'live' | 'ended';
}

const CTFTimer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Mock CTF events
  const events: CTFEvent[] = [
    {
      name: "ThunderCipher Weekly Challenge",
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      status: 'upcoming'
    },
    {
      name: "Crypto Master Series",
      startTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      endTime: new Date(Date.now() + 23 * 60 * 60 * 1000), // 23 hours from now
      status: 'live'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeRemaining = (targetTime: Date) => {
    const diff = targetTime.getTime() - currentTime.getTime();
    if (diff <= 0) return "00:00:00";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <Card key={index} className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                event.status === 'live' 
                  ? 'bg-red-500/20 text-red-400' 
                  : event.status === 'upcoming'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {event.status === 'live' ? (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <Clock size={16} />
                  </div>
                ) : (
                  <Calendar size={16} />
                )}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{event.name}</h4>
                <p className="text-xs text-gray-400 font-mono capitalize">
                  {event.status === 'live' ? 'Live Now' : event.status}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-lg font-mono font-bold ${
                event.status === 'live' ? 'text-red-400' : 'text-cyan-400'
              }`}>
                {formatTimeRemaining(event.status === 'live' ? event.endTime : event.startTime)}
              </div>
              <p className="text-xs text-gray-400 font-mono">
                {event.status === 'live' ? 'Time Left' : 'Starts In'}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CTFTimer;
