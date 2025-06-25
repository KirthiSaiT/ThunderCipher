
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Zap, Trophy, Terminal, Users, BookOpen, ArrowRight, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Terminal,
      title: "Attack Boxes",
      description: "Practice with real-world virtual machines and hacking environments",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Labs",
      description: "Master offensive security through hands-on practical labs",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      description: "Compete with other hackers and climb the global rankings",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: BookOpen,
      title: "Guided Learning",
      description: "Comprehensive guides and tutorials for all skill levels",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "500+", label: "Active Hackers", icon: Users },
    { number: "150+", label: "Security Labs", icon: Target },
    { number: "24/7", label: "Lab Access", icon: Clock }
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white relative overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-teal-400 rounded-full animate-pulse animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-teal-500 rounded-full animate-pulse animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
              ThunderCipher
            </h1>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-20"></div>
              <Zap className="text-cyan-400 animate-pulse" size={32} />
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-20"></div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Your gateway to mastering offensive security. Access real-world labs, track your progress, and elevate your cybersecurity journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={handleGetStarted}
              className="glass-button bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold px-8 py-4 text-lg hover:from-cyan-400 hover:to-teal-400 group"
            >
              {user ? 'Go to Dashboard' : 'Start Your Journey'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Link to="/labs">
              <Button variant="outline" className="glass-button border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 text-lg">
                Explore Labs
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card p-8 text-center hover-lift group">
              <div className="text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card p-6 hover-lift group cursor-pointer">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Terminal Preview */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 flex items-center space-x-2 border-b border-cyan-500/20">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-4 font-mono">thunder@cipher:~$</span>
            </div>
            <div className="p-8 font-mono text-sm bg-black/50">
              <div className="text-cyan-400 mb-2">
                <span className="text-gray-500">$</span> nmap -sS -sV target.thundercipher.com
              </div>
              <div className="text-gray-300 mt-4 space-y-1">
                <div>Starting Nmap scan...</div>
                <div>PORT     STATE SERVICE    VERSION</div>
                <div>22/tcp   open  ssh        OpenSSH 8.2p1</div>
                <div>80/tcp   open  http       Apache httpd 2.4.41</div>
                <div>443/tcp  open  https      Apache httpd 2.4.41</div>
              </div>
              <div className="text-cyan-400 mt-6 flex items-center">
                <span className="text-gray-500">$</span> 
                <span className="ml-2 terminal-cursor"></span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
