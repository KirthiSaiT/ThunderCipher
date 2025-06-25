
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-green-500/20 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="text-green-500" size={32} />
              <span className="text-2xl font-bold">ThunderCipher</span>
            </div>
            <p className="text-gray-400 font-mono text-sm">
              Master ethical hacking through immersive cybersecurity challenges and real-world simulations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-400">Platform</h3>
            <div className="space-y-2">
              <Link to="/challenges" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 font-mono text-sm">
                Challenges
              </Link>
              <Link to="/leaderboard" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 font-mono text-sm">
                Leaderboard
              </Link>
              <Link to="/guide" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 font-mono text-sm">
                Platform Guide
              </Link>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-400">Community</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 font-mono text-sm">
                Discord Server
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 font-mono text-sm">
                Forums
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 font-mono text-sm">
                Blog
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-400">Legal</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 font-mono text-sm">
                About
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 font-mono text-sm">
                Contact
              </Link>
              <Link to="/terms" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 font-mono text-sm">
                Terms of Service
              </Link>
              <Link to="/privacy" className="block text-gray-400 hover:text-green-400 transition-colors duration-300 font-mono text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 font-mono text-sm">
            © 2024 ThunderCipher. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
