import React, { useState } from 'react';
import { BookOpen, ChevronRight, Terminal, Shield, Target, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Guide = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: BookOpen },
    { id: 'attack-boxes', title: 'Attack Boxes', icon: Terminal },
    { id: 'challenges', title: 'CTF Challenges', icon: Target },
    { id: 'security', title: 'Security Guidelines', icon: Shield },
    { id: 'community', title: 'Community', icon: Users },
  ];

  const content = {
    'getting-started': {
      title: 'Getting Started with ThunderCipher',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Welcome to ThunderCipher</h3>
            <p className="text-gray-300 mb-4">
              ThunderCipher is your gateway to mastering ethical hacking and cybersecurity. Our platform offers 
              hands-on experience with real-world scenarios through CTF challenges and virtual attack boxes.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-sm">
            <h4 className="text-lg font-bold text-white mb-4">Quick Start Steps:</h4>
            <ol className="list-decimal list-inside space-y-3 text-gray-300 text-sm">
              <li>Create your account and verify your email</li>
              <li>Complete your profile and choose your learning path</li>
              <li>Start with Easy difficulty challenges to build fundamentals</li>
              <li>Join our Discord community for help and discussions</li>
              <li>Track your progress on the leaderboard</li>
            </ol>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Learning Paths</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-colors">
                <h5 className="font-bold text-blue-400 mb-2">Web Application Security</h5>
                <p className="text-gray-400 text-sm">Focus on web vulnerabilities like XSS, SQL injection, and CSRF</p>
              </div>
              <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-colors">
                <h5 className="font-bold text-red-400 mb-2">Binary Exploitation</h5>
                <p className="text-gray-400 text-sm">Learn buffer overflows, reverse engineering, and binary analysis</p>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-colors">
                <h5 className="font-bold text-purple-400 mb-2">Cryptography</h5>
                <p className="text-gray-400 text-sm">Master encryption, hashing, and cryptographic attacks</p>
              </div>
              <div className="bg-yellow-900/20 p-4 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-colors">
                <h5 className="font-bold text-yellow-400 mb-2">Digital Forensics</h5>
                <p className="text-gray-400 text-sm">Analyze evidence and investigate security incidents</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'attack-boxes': {
      title: 'Using Attack Boxes',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-3">What are Attack Boxes?</h3>
            <p className="text-gray-300 mb-4">
              Attack boxes are virtual machines that provide isolated environments for practicing penetration testing 
              and ethical hacking techniques safely and legally.
            </p>
          </div>

          <div className="bg-black/80 border border-cyan-500/30 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="bg-slate-800 px-4 py-3 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-4 font-mono">attack@box:~$</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-cyan-400 mb-2"># Example: Basic network reconnaissance</div>
              <div className="text-white mb-1">$ nmap -sS -sV target.local</div>
              <div className="text-gray-400 mb-3">
                Starting Nmap 7.91 ( https://nmap.org )<br/>
                PORT     STATE SERVICE    VERSION<br/>
                22/tcp   open  ssh        OpenSSH 8.2p1<br/>
                80/tcp   open  http       Apache httpd 2.4.41<br/>
              </div>
              <div className="text-cyan-400 mb-2"># Exploit discovered vulnerability</div>
              <div className="text-white">$ exploit -p payload/reverse_shell</div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-3">Available Tools</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h5 className="font-bold text-green-400 mb-2">Network Tools</h5>
                <ul className="text-gray-400 text-sm space-y-1 font-mono">
                  <li>• nmap</li>
                  <li>• netcat</li>
                  <li>• wireshark</li>
                  <li>• masscan</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h5 className="font-bold text-green-400 mb-2">Web Tools</h5>
                <ul className="text-gray-400 text-sm space-y-1 font-mono">
                  <li>• burp suite</li>
                  <li>• sqlmap</li>
                  <li>• dirb</li>
                  <li>• gobuster</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h5 className="font-bold text-green-400 mb-2">Binary Tools</h5>
                <ul className="text-gray-400 text-sm space-y-1 font-mono">
                  <li>• gdb</li>
                  <li>• radare2</li>
                  <li>• strings</li>
                  <li>• objdump</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'challenges': {
      title: 'CTF Challenge Guide',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Challenge Categories</h3>
            <p className="text-gray-300 mb-4">
              Our CTF challenges are organized into different categories, each testing specific cybersecurity skills.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-colors">
              <h4 className="font-bold text-blue-400 mb-2">Web Exploitation</h4>
              <p className="text-gray-400 text-sm mb-3">
                Find and exploit vulnerabilities in web applications including SQL injection, XSS, CSRF, and more.
              </p>
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                <div className="text-cyan-400">Example Flag Format:</div>
                <div className="text-white">ThunderCipher{`{sql_1nj3ct10n_m4st3r}`}</div>
              </div>
            </div>

            <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-colors">
              <h4 className="font-bold text-red-400 mb-2">Binary Exploitation</h4>
              <p className="text-gray-400 text-sm mb-3">
                Analyze binaries, find buffer overflows, and exploit memory corruption vulnerabilities.
              </p>
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                <div className="text-cyan-400">Common Tools:</div>
                <div className="text-white">gdb, checksec, pwntools, radare2</div>
              </div>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-colors">
              <h4 className="font-bold text-purple-400 mb-2">Cryptography</h4>
              <p className="text-gray-400 text-sm mb-3">
                Solve puzzles involving encryption, decryption, and cryptographic protocol analysis.
              </p>
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                <div className="text-cyan-400">Topics Covered:</div>
                <div className="text-white">RSA, AES, Hash Functions, Digital Signatures</div>
              </div>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-colors">
              <h4 className="font-bold text-yellow-400 mb-2">Digital Forensics</h4>
              <p className="text-gray-400 text-sm mb-3">
                Investigate digital evidence, analyze memory dumps, and recover hidden information.
              </p>
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                <div className="text-cyan-400">File Types:</div>
                <div className="text-white">PCAP, Memory dumps, Disk images, Log files</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-cyan-500/20">
            <h4 className="text-lg font-bold text-white mb-3">Scoring System</h4>
            <ul className="space-y-2 text-gray-300">
              <li><span className="text-green-400 font-mono">Easy:</span> 25-75 points</li>
              <li><span className="text-yellow-400 font-mono">Medium:</span> 75-150 points</li>
              <li><span className="text-red-400 font-mono">Hard:</span> 150-300 points</li>
            </ul>
          </div>
        </div>
      )
    },
    'security': {
      title: 'Security Guidelines',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Code of Conduct</h3>
            <p className="text-gray-300 mb-4">
              ThunderCipher is committed to providing a safe and ethical learning environment for cybersecurity education.
            </p>
          </div>

          <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
            <h4 className="text-lg font-bold text-red-400 mb-3">⚠️ Strictly Prohibited</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Using learned techniques against systems without explicit permission</li>
              <li>• Attacking other users or the platform infrastructure</li>
              <li>• Sharing solutions or flags publicly</li>
              <li>• Creating multiple accounts to gain unfair advantages</li>
              <li>• Any form of harassment or malicious behavior</li>
            </ul>
          </div>

          <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
            <h4 className="text-lg font-bold text-green-400 mb-3">✅ Encouraged Practices</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Practice on designated lab environments only</li>
              <li>• Help other learners without giving direct answers</li>
              <li>• Report bugs or issues to improve the platform</li>
              <li>• Participate in community discussions</li>
              <li>• Pursue ethical hacking certifications</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-3">Legal Considerations</h4>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-500/30">
              <p className="text-gray-300 text-sm mb-3">
                All activities on ThunderCipher are for educational purposes only. By using this platform, you agree to:
              </p>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>• Use skills learned here only for legitimate security testing with proper authorization</li>
                <li>• Comply with all applicable laws and regulations in your jurisdiction</li>
                <li>• Respect the intellectual property rights of others</li>
                <li>• Maintain confidentiality of any sensitive information encountered</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
            <h4 className="text-lg font-bold text-blue-400 mb-3">Responsible Disclosure</h4>
            <p className="text-gray-300 text-sm">
              If you discover vulnerabilities in real-world systems during your learning, follow responsible 
              disclosure practices by reporting them to the appropriate organizations through proper channels.
            </p>
          </div>
        </div>
      )
    },
    'community': {
      title: 'Community & Support',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Join Our Community</h3>
            <p className="text-gray-300 mb-4">
              Connect with fellow ethical hackers, share knowledge, and get help with challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-discord-blue/20 border-discord-blue/30 p-6">
              <h4 className="text-lg font-bold text-white mb-3">Discord Server</h4>
              <p className="text-gray-300 text-sm mb-4">
                Join our active Discord community for real-time discussions, help, and networking.
              </p>
              <Button className="bg-discord-blue hover:bg-discord-blue/80 text-white">
                Join Discord
              </Button>
            </Card>

            <Card className="bg-gray-900/50 border-green-500/20 p-6">
              <h4 className="text-lg font-bold text-white mb-3">Forums</h4>
              <p className="text-gray-300 text-sm mb-4">
                Browse our forums for detailed discussions, writeups, and technical help.
              </p>
              <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                Visit Forums
              </Button>
            </Card>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-3">Getting Help</h4>
            <div className="space-y-3">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h5 className="font-bold text-green-400 mb-2">Challenge Hints</h5>
                <p className="text-gray-400 text-sm">
                  Use the hint system built into each challenge. Hints are progressive and won't spoil the solution.
                </p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h5 className="font-bold text-green-400 mb-2">Community Help</h5>
                <p className="text-gray-400 text-sm">
                  Ask for guidance in our Discord or forums. Remember to ask specific questions without sharing flags.
                </p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h5 className="font-bold text-green-400 mb-2">Official Support</h5>
                <p className="text-gray-400 text-sm">
                  Contact our support team for technical issues, account problems, or platform feedback.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-lg border border-green-500/20">
            <h4 className="text-lg font-bold text-white mb-3">Community Guidelines</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li>• Be respectful and helpful to other members</li>
              <li>• Don't share flags or complete solutions</li>
              <li>• Stay on topic in discussions</li>
              <li>• No spam or self-promotion without permission</li>
              <li>• Report inappropriate behavior to moderators</li>
            </ul>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <Card className="bg-slate-800/50 border-cyan-500/20 p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Platform Guide</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-cyan-600 text-black font-bold shadow-lg shadow-cyan-500/25'
                        : 'text-gray-300 hover:bg-slate-700/50 hover:text-cyan-400'
                    }`}
                  >
                    <section.icon size={20} />
                    <span className="font-mono">{section.title}</span>
                    {activeSection === section.id && <ChevronRight size={16} />}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <Card className="bg-slate-800/50 border-cyan-500/20 p-8 backdrop-blur-sm">
              <h1 className="text-3xl font-bold text-cyan-400 mb-6">
                {content[activeSection as keyof typeof content].title}
              </h1>
              {content[activeSection as keyof typeof content].content}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
