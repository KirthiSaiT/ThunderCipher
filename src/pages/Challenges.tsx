
import React, { useState } from 'react';
import { Search, Filter, Play, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Challenges = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const challenges = [
    { id: 1, name: 'SQL Injection Basics', category: 'Web Exploitation', difficulty: 'Easy', description: 'Learn the fundamentals of SQL injection attacks', completed: true, locked: false },
    { id: 2, name: 'Buffer Overflow 101', category: 'Binary Exploitation', difficulty: 'Medium', description: 'Exploit a simple buffer overflow vulnerability', completed: true, locked: false },
    { id: 3, name: 'XSS Challenge', category: 'Web Exploitation', difficulty: 'Easy', description: 'Find and exploit cross-site scripting vulnerabilities', completed: false, locked: false },
    { id: 4, name: 'RSA Encryption', category: 'Cryptography', difficulty: 'Hard', description: 'Break weak RSA encryption implementation', completed: false, locked: false },
    { id: 5, name: 'Reverse Engineering', category: 'Binary Exploitation', difficulty: 'Medium', description: 'Reverse engineer a binary to find the flag', completed: false, locked: false },
    { id: 6, name: 'Network Forensics', category: 'Forensics', difficulty: 'Medium', description: 'Analyze network traffic to find malicious activity', completed: false, locked: false },
    { id: 7, name: 'Advanced Crypto', category: 'Cryptography', difficulty: 'Hard', description: 'Solve complex cryptographic puzzles', completed: false, locked: true },
    { id: 8, name: 'Privilege Escalation', category: 'Binary Exploitation', difficulty: 'Hard', description: 'Escalate privileges on a Linux system', completed: false, locked: false },
    { id: 9, name: 'Web Shell Upload', category: 'Web Exploitation', difficulty: 'Medium', description: 'Upload and execute a web shell', completed: false, locked: false },
    { id: 10, name: 'Memory Forensics', category: 'Forensics', difficulty: 'Hard', description: 'Analyze memory dumps for evidence', completed: false, locked: false },
  ];

  const categories = ['Web Exploitation', 'Binary Exploitation', 'Cryptography', 'Forensics'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  // Helper to get points based on difficulty
  const getPoints = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 100;
      case 'Medium': return 200;
      case 'Hard': return 500;
      default: return 0;
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || challenge.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || challenge.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-900/50 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-900/50 text-red-400 border-red-500/30';
      default: return 'bg-gray-900/50 text-gray-400 border-gray-500/30';
    }
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
          <h1 className="text-4xl font-bold gradient-text mb-2">CTF Challenges</h1>
          <p className="text-gray-400 font-mono">Test your skills with real-world cybersecurity challenges</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 font-mono neon-border"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="md:w-48 glass-card border-cyan-500/30 text-white font-mono">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="glass-card border-cyan-500/30 bg-slate-900">
              <SelectItem value="all" className="text-white">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category} className="text-white">{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="md:w-48 glass-card border-cyan-500/30 text-white font-mono">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="glass-card border-cyan-500/30 bg-slate-900">
              <SelectItem value="all" className="text-white">All Difficulties</SelectItem>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty} className="text-white">{difficulty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge, index) => (
            <Card key={challenge.id} className="glass-card p-6 hover-lift animate-fade-in-up" style={{animationDelay: `${0.1 * index}s`}}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-white">{challenge.name}</h3>
                  {challenge.completed && (
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs">✓</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-400 font-mono text-sm">{challenge.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-mono border border-blue-500/30">
                    {challenge.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-mono border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-cyan-900/50 text-cyan-400 rounded text-xs font-mono border border-cyan-500/30">
                    {getPoints(challenge.difficulty)} pts
                  </span>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {challenge.locked ? (
                    <Button disabled className="w-full glass-button bg-gray-700/50 text-gray-400 cursor-not-allowed">
                      <Lock className="mr-2" size={16} />
                      Locked
                    </Button>
                  ) : (
                    <Button className="w-full glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
                      <Play className="mr-2" size={16} />
                      {challenge.completed ? 'Retry Challenge' : 'Start Challenge'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <div className="text-gray-400 font-mono">
              <Filter size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl mb-2">No challenges found</p>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;
