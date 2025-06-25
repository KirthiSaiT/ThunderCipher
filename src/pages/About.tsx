
import React from 'react';
import { Shield, Users, Target, Award, Github, Twitter, Linkedin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      image: '/placeholder.svg',
      bio: 'Former CISO with 15+ years in cybersecurity',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Security Research',
      image: '/placeholder.svg',
      bio: 'Penetration testing expert and CVE researcher',
      social: { twitter: '#', github: '#' }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Lead Developer',
      image: '/placeholder.svg',
      bio: 'Full-stack developer with security focus',
      social: { github: '#', linkedin: '#' }
    }
  ];

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
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold gradient-text mb-4">About ThunderCipher</h1>
          <p className="text-xl text-gray-400 font-mono max-w-3xl mx-auto">
            Empowering the next generation of cybersecurity professionals through hands-on learning and practical experience.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="glass-card p-8 animate-fade-in-up">
            <div className="text-center mb-8">
              <Shield className="mx-auto text-cyan-400 mb-4" size={64} />
              <h2 className="text-3xl font-bold gradient-text mb-4">Our Mission</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Target className="mx-auto text-teal-400 mb-4" size={48} />
                <h3 className="text-xl font-bold text-white mb-2">Practical Learning</h3>
                <p className="text-gray-400 font-mono">Real-world scenarios and hands-on labs that prepare you for actual cybersecurity challenges.</p>
              </div>
              <div className="text-center">
                <Users className="mx-auto text-cyan-400 mb-4" size={48} />
                <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
                <p className="text-gray-400 font-mono">A supportive community of learners and experts sharing knowledge and experiences.</p>
              </div>
              <div className="text-center">
                <Award className="mx-auto text-purple-400 mb-4" size={48} />
                <h3 className="text-xl font-bold text-white mb-2">Industry Recognition</h3>
                <p className="text-gray-400 font-mono">Skills and certifications that are recognized and valued by top cybersecurity employers.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="glass-card p-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-3xl font-bold gradient-text mb-6">Our Story</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  ThunderCipher was born from a simple observation: traditional cybersecurity education often lacks the practical, hands-on experience that professionals need in the real world.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Founded in 2023 by a team of security researchers and educators, we set out to create a platform that bridges the gap between theory and practice, providing learners with realistic scenarios and cutting-edge tools.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Today, ThunderCipher serves thousands of students, professionals, and organizations worldwide, helping them develop the skills needed to defend against modern cyber threats.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-8 glass-card rounded-lg">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">10,000+</div>
                  <div className="text-gray-400 font-mono">Active Learners</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="glass-card p-4 rounded-lg">
                    <div className="text-2xl font-bold text-teal-400">150+</div>
                    <div className="text-gray-400 font-mono text-sm">Labs</div>
                  </div>
                  <div className="glass-card p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">95%</div>
                    <div className="text-gray-400 font-mono text-sm">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-4">Meet Our Team</h2>
            <p className="text-gray-400 font-mono">The experts behind ThunderCipher's success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={member.name} className="glass-card p-6 text-center hover-lift animate-fade-in-up" style={{animationDelay: `${0.1 * index}s`}}>
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400 font-mono text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  {member.social.twitter && (
                    <Button size="sm" variant="outline" className="glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                      <Twitter size={16} />
                    </Button>
                  )}
                  {member.social.github && (
                    <Button size="sm" variant="outline" className="glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                      <Github size={16} />
                    </Button>
                  )}
                  {member.social.linkedin && (
                    <Button size="sm" variant="outline" className="glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                      <Linkedin size={16} />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <Card className="glass-card p-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Security First</h3>
              <p className="text-gray-400 font-mono text-sm">Every decision we make prioritizes the security and privacy of our users.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-teal-400" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Inclusivity</h3>
              <p className="text-gray-400 font-mono text-sm">Cybersecurity should be accessible to everyone, regardless of background.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-purple-400" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Excellence</h3>
              <p className="text-gray-400 font-mono text-sm">We strive for the highest quality in everything we create and deliver.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-yellow-400" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Innovation</h3>
              <p className="text-gray-400 font-mono text-sm">Constantly evolving our platform to meet emerging security challenges.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
