import React, { useState, useEffect } from 'react';
import { Shield, Clock, Trophy, ChevronRight, Search, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  points: number;
  content: string | null;
  hints: string[] | null;
  solution: string | null;
  created_at: string;
  updated_at: string;
}

const labAuthors = [
  {
    name: 'Alex Chen',
    role: 'Lab Creator',
    image: '/placeholder.svg',
    bio: 'Specializes in web security and CTF challenges.',
    details: 'Alex has contributed 10+ labs focusing on real-world web vulnerabilities.'
  },
  {
    name: 'Sarah Johnson',
    role: 'Cryptography Expert',
    image: '/placeholder.svg',
    bio: 'Expert in cryptography and reverse engineering.',
    details: 'Sarah authored several cryptography labs and guides.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Binary Exploitation',
    image: '/placeholder.svg',
    bio: 'Focuses on binary exploitation and forensics.',
    details: 'Marcus created advanced binary and forensics labs.'
  }
];

const Labs = () => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = ['All', 'Web Security', 'Binary Exploitation', 'Cryptography', 'Forensics', 'Reverse Engineering'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching labs:', error);
      } else {
        // Type assertion to ensure proper typing
        const typedLabs = (data || []).map(lab => ({
          ...lab,
          difficulty: lab.difficulty as 'Easy' | 'Medium' | 'Hard'
        }));
        setLabs(typedLabs);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || lab.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || lab.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400 border-green-500/30 bg-green-900/30';
      case 'Medium':
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-900/30';
      case 'Hard':
        return 'text-red-400 border-red-500/30 bg-red-900/30';
      default:
        return 'text-gray-400 border-gray-500/30 bg-gray-900/30';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Access Denied</h1>
          <p className="text-gray-400 font-mono">Please sign in to access the labs.</p>
        </div>
      </div>
    );
  }

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
        <div className="mb-8 animate-fade-in-up flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Security Labs</h1>
            <p className="text-gray-400 font-mono">Hands-on cybersecurity challenges to sharpen your skills</p>
          </div>
          <Dialog>
            <Button
              className="glass-button bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold mt-4 md:mt-0 md:ml-4"
              onClick={() => navigate('/contributions')}
            >
              Contributions
            </Button>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search labs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-input border-cyan-500/30 bg-black/30 text-white placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <Filter className="text-cyan-400" size={16} />
              <span className="text-gray-400 font-mono text-sm">Category:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                className={`font-mono ${
                  selectedCategory === category 
                    ? 'glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black' 
                    : 'glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 font-mono text-sm">Difficulty:</span>
            </div>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                size="sm"
                className={`font-mono ${
                  selectedDifficulty === difficulty 
                    ? 'glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black' 
                    : 'glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Labs Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            <p className="mt-4 text-gray-400 font-mono">Loading labs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLabs.map((lab, index) => (
              <Card key={lab.id} className="glass-card p-6 hover-lift animate-fade-in-up" style={{animationDelay: `${0.1 * index}s`}}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{lab.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{lab.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-mono border ${getDifficultyColor(lab.difficulty)}`}>
                        {lab.difficulty}
                      </span>
                      <span className="text-gray-400 font-mono text-sm">{lab.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="text-yellow-400" size={16} />
                      <span className="text-cyan-400 font-mono text-sm">{lab.points}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold group"
                    onClick={() => {
                      const categorySlug = lab.category.toLowerCase().replace(/\s+/g, '-');
                      navigate(`/labs/${categorySlug}/${lab.id}`);
                    }}
                  >
                    Start Lab
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredLabs.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Shield className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-400 font-mono">No labs found matching your criteria.</p>
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <Card className="glass-card p-6 text-center">
            <Shield className="mx-auto text-cyan-400 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white">{labs.length}</h3>
            <p className="text-gray-400 font-mono text-sm">Total Labs</p>
          </Card>
          
          <Card className="glass-card p-6 text-center">
            <Trophy className="mx-auto text-yellow-400 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white">0</h3>
            <p className="text-gray-400 font-mono text-sm">Completed</p>
          </Card>
          
          <Card className="glass-card p-6 text-center">
            <Clock className="mx-auto text-purple-400 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white">0%</h3>
            <p className="text-gray-400 font-mono text-sm">Progress</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Labs;
