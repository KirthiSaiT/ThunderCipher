
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Trophy, MapPin, ExternalLink } from 'lucide-react';
import CTFTimer from '@/components/CTFTimer';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participants: number;
  maxParticipants?: number;
  prize: string;
  status: 'upcoming' | 'live' | 'ended';
  location: 'online' | 'hybrid' | string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

const Events = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'live' | 'ended'>('all');

  const events: Event[] = [
    {
      id: '1',
      title: 'ThunderCipher Weekly CTF',
      description: 'Weekly capture the flag competition featuring web exploitation, cryptography, and reverse engineering challenges.',
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      participants: 156,
      maxParticipants: 500,
      prize: '$500 + Certificates',
      status: 'upcoming',
      location: 'online',
      difficulty: 'Intermediate',
      tags: ['Web', 'Crypto', 'Reverse Engineering']
    },
    {
      id: '2',
      title: 'Beginner Bootcamp',
      description: 'Learn the fundamentals of ethical hacking with guided challenges and mentorship.',
      startDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 23 * 60 * 60 * 1000),
      participants: 89,
      maxParticipants: 100,
      prize: 'Certificates + Badge',
      status: 'live',
      location: 'online',
      difficulty: 'Beginner',
      tags: ['Learning', 'Guided', 'Fundamentals']
    },
    {
      id: '3',
      title: 'Advanced Penetration Testing',
      description: 'Advanced red team simulation with realistic corporate network scenarios.',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      participants: 45,
      prize: '$1000 + Job Interviews',
      status: 'ended',
      location: 'hybrid',
      difficulty: 'Advanced',
      tags: ['Pentesting', 'Red Team', 'Corporate']
    }
  ];

  const filteredEvents = filter === 'all' ? events : events.filter(event => event.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'upcoming':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'ended':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400';
      case 'Intermediate':
        return 'text-yellow-400';
      case 'Advanced':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-20">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calendar className="text-cyan-400" size={40} />
            <h1 className="text-4xl font-bold gradient-text">Events & Competitions</h1>
          </div>
          <p className="text-gray-400 font-mono">Join exciting cybersecurity competitions and learning events</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'upcoming', 'live', 'ended'].map((filterOption) => (
                <Button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as any)}
                  variant={filter === filterOption ? 'default' : 'outline'}
                  className={`glass-button font-mono capitalize ${
                    filter === filterOption 
                      ? 'bg-cyan-500 text-black' 
                      : 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  {filterOption}
                </Button>
              ))}
            </div>

            {/* Events List */}
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="glass-card p-6 hover-lift">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-mono border ${getStatusColor(event.status)}`}>
                          {event.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 mb-4 font-mono text-sm leading-relaxed">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="text-cyan-400" size={16} />
                          <span className="text-gray-300 font-mono">
                            {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="text-cyan-400" size={16} />
                          <span className="text-gray-300 font-mono">
                            {event.participants}{event.maxParticipants && `/${event.maxParticipants}`} participants
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Trophy className="text-cyan-400" size={16} />
                          <span className="text-gray-300 font-mono">{event.prize}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="text-cyan-400" size={16} />
                          <span className="text-gray-300 font-mono capitalize">{event.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className={`text-sm font-mono ${getDifficultyColor(event.difficulty)}`}>
                            {event.difficulty}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {event.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-32">
                      <Button 
                        className="glass-button bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold"
                        disabled={event.status === 'ended'}
                      >
                        {event.status === 'live' ? 'Join Now' : event.status === 'upcoming' ? 'Register' : 'View Results'}
                        <ExternalLink className="ml-2" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Clock className="mr-2 text-cyan-400" />
                Live Timers
              </h3>
              <CTFTimer />
            </Card>

            <Card className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Event Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-mono">Total Events</span>
                  <span className="text-cyan-400 font-bold">{events.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-mono">Live Now</span>
                  <span className="text-red-400 font-bold">
                    {events.filter(e => e.status === 'live').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-mono">Upcoming</span>
                  <span className="text-yellow-400 font-bold">
                    {events.filter(e => e.status === 'upcoming').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-mono">Total Participants</span>
                  <span className="text-cyan-400 font-bold">
                    {events.reduce((sum, event) => sum + event.participants, 0)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
