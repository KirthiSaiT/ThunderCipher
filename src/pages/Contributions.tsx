import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Code, Lock, Binary, Award, Github, Linkedin, Mail } from 'lucide-react';

const labAuthors = [
  {
    name: 'Alex Chen',
    role: 'Lab Creator & Web Security Expert',
    image: '/placeholder.svg',
    bio: 'Specializes in web security and CTF challenges with 8+ years of experience.',
    details: 'Alex has contributed 15+ labs focusing on real-world web vulnerabilities including XSS, SQLi, and CSRF attacks.',
    icon: <Shield className="w-5 h-5" />,
    specialties: ['Web Security', 'CTF Design', 'Penetration Testing'],
    labCount: 15,
    github: 'alexchen-dev',
    linkedin: 'alex-chen-security'
  },
  {
    name: 'Sarah Johnson',
    role: 'Cryptography Expert',
    image: '/placeholder.svg',
    bio: 'Expert in cryptography and reverse engineering with PhD in Applied Cryptography.',
    details: 'Sarah authored 12+ cryptography labs covering classical ciphers, modern encryption, and cryptanalysis techniques.',
    icon: <Lock className="w-5 h-5" />,
    specialties: ['Cryptography', 'Reverse Engineering', 'Mathematical Analysis'],
    labCount: 12,
    github: 'sarah-crypto',
    linkedin: 'sarah-johnson-crypto'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Binary Exploitation Specialist',
    image: '/placeholder.svg',
    bio: 'Focuses on binary exploitation, forensics, and low-level system security.',
    details: 'Marcus created 10+ advanced binary exploitation and digital forensics labs for intermediate to expert levels.',
    icon: <Binary className="w-5 h-5" />,
    specialties: ['Binary Exploitation', 'Digital Forensics', 'System Security'],
    labCount: 10,
    github: 'marcus-binexp',
    linkedin: 'marcus-rodriguez-security'
  },
  {
    name: 'Emily Zhang',
    role: 'Network Security Architect',
    image: '/placeholder.svg',
    bio: 'Network security specialist with focus on protocol analysis and network forensics.',
    details: 'Emily developed 8+ network security labs covering packet analysis, network protocols, and traffic investigation.',
    icon: <Code className="w-5 h-5" />,
    specialties: ['Network Security', 'Protocol Analysis', 'Network Forensics'],
    labCount: 8,
    github: 'emily-netsec',
    linkedin: 'emily-zhang-network'
  }
];

const Contributions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 px-4 py-2 rounded-full border border-cyan-500/30 mb-6">
            <Award className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-sm">Lab Contributors</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Meet Our Security Experts
          </h1>
          <p className="text-gray-400 font-mono text-lg max-w-2xl mx-auto">
            The brilliant minds behind our cybersecurity labs and training materials
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {labAuthors.map((author, index) => (
            <Card key={author.name} className="group relative overflow-hidden bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative p-6">
                {/* Header with Avatar and Basic Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 border-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors">
                      <AvatarImage src={author.image} alt={author.name} />
                      <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-teal-500 text-black font-bold">
                        {author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-teal-500 p-1 rounded-full">
                      {author.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{author.name}</h3>
                    <p className="text-cyan-400 font-mono text-sm mb-2">{author.role}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 px-3 py-1 rounded-full border border-cyan-500/30">
                        <span className="text-cyan-400 font-mono text-xs">{author.labCount} Labs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio and Details */}
                <div className="mb-4">
                  <p className="text-gray-300 text-sm mb-2">{author.bio}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{author.details}</p>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-cyan-400 font-mono text-xs uppercase tracking-wide mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {author.specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-slate-700/50 text-gray-300 px-2 py-1 rounded text-xs font-mono border border-slate-600/50">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 p-2">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 p-2">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 p-2">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/60 border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">45+</div>
            <div className="text-gray-400 font-mono text-sm">Total Labs Created</div>
          </Card>
          <Card className="bg-slate-800/60 border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-teal-400 mb-2">4</div>
            <div className="text-gray-400 font-mono text-sm">Expert Contributors</div>
          </Card>
          <Card className="bg-slate-800/60 border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">20+</div>
            <div className="text-gray-400 font-mono text-sm">Security Domains</div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-slate-700/50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Want to Contribute?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Join our team of security experts and help create the next generation of cybersecurity training materials.
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold px-8 py-2 hover:from-cyan-600 hover:to-teal-600 transition-all duration-300">
              Get Involved
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contributions;