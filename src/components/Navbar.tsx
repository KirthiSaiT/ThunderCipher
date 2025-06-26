import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, User, LogOut, Settings, Terminal, Info, Trophy, Target, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const ADMIN_EMAIL = 'kirthisai251@gmail.com';

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Labs', path: '/labs' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Guide', path: '/guide' },
    { name: 'AttackerBox', path: '/attackerbox' },
    { name: 'Settings', path: '/settings' },
  ];

  const userMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: User },
    { name: 'Achievements', path: '/achievements', icon: Target },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'AttackerBox', path: '/attackerbox', icon: Terminal },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-cyan-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={32} />
            <span className="text-2xl font-bold gradient-text">ThunderCipher</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            {user && user.email === ADMIN_EMAIL && (
              <Link
                to="/admin"
                className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors font-mono text-sm relative group"
              >
                Admin Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <Button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-mono flex items-center space-x-2"
                >
                  <User size={16} />
                  <span>{user.username}</span>
                </Button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 glass-card border border-cyan-500/20 rounded-lg py-2 shadow-xl">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-sm"
                      >
                        <item.icon className="mr-3" size={16} />
                        {item.name}
                      </Link>
                    ))}
                    {user.email === ADMIN_EMAIL && (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors font-mono text-sm font-bold"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-2 border-cyan-500/20" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors font-mono text-sm"
                    >
                      <LogOut className="mr-3" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin">
                  <Button variant="outline" className="glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden glass-button border-cyan-500 text-cyan-400"
            variant="outline"
            size="sm"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-cyan-500/20 py-4 animate-fade-in-up">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-sm rounded"
                >
                  {item.name}
                </Link>
              ))}
              {user && user.email === ADMIN_EMAIL && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-cyan-400 font-bold hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors font-mono text-sm rounded"
                >
                  Admin Dashboard
                </Link>
              )}
              {user ? (
                <>
                  <hr className="my-2 border-cyan-500/20" />
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-sm rounded"
                    >
                      <item.icon className="mr-3" size={16} />
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors font-mono text-sm rounded"
                  >
                    <LogOut className="mr-3" size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <hr className="my-2 border-cyan-500/20" />
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-sm rounded"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-sm rounded"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
