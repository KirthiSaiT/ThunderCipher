import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Trophy, 
  Calendar, 
  Megaphone, 
  BarChart3, 
  Settings, 
  FileText, 
  Zap, 
  Globe,
  Activity,
  UserCheck,
  Flag,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Edit3,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Bell,
  Moon,
  Sun,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ADMIN_EMAIL = 'kirthisai251@gmail.com';

// Mock data for demonstration
const mockStats = {
  totalUsers: 12847,
  activeLabs: 156,
  runningChallenges: 43,
  upcomingEvents: 8,
  totalSubmissions: 98234,
  averageScore: 78.5,
  newUsersToday: 127,
  systemUptime: 99.9
};

const mockRecentActivity = [
  { id: 1, user: 'john_hacker', action: 'Completed Lab: Buffer Overflow Basics', time: '2 mins ago', type: 'success' },
  { id: 2, user: 'cyber_ninja', action: 'Solved Challenge: Web Exploitation #12', time: '5 mins ago', type: 'success' },
  { id: 3, user: 'admin', action: 'Published new announcement', time: '15 mins ago', type: 'info' },
  { id: 4, user: 'red_team_alpha', action: 'Failed attempt on Challenge: Cryptography Master', time: '23 mins ago', type: 'error' },
  { id: 5, user: 'blue_defender', action: 'Registered for Event: CTF Championship', time: '1 hour ago', type: 'info' }
];

const Admin = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState(mockStats);
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity);

  // Mock user object - replace with actual useAuth hook
  const user = { email: ADMIN_EMAIL };

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-slate-900 via-slate-800 to-red-900">
        <div className="glass-card p-12 rounded-2xl border border-red-500/20">
          <Shield className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-400 text-lg">Unauthorized access attempt detected.</p>
          <p className="text-gray-500 text-sm mt-2">This incident has been logged.</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, change, changeType }) => (
    <div className="glass-card p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-cyan-500/20">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        {change && (
          <div className={`flex items-center text-sm ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
  );

  const QuickActionCard = ({ icon: Icon, title, description, onClick, color = 'cyan' }) => (
    <div 
      onClick={onClick}
      className={`glass-card p-6 rounded-xl border border-${color}-500/20 hover:border-${color}-400/40 cursor-pointer transition-all duration-300 hover:scale-105 group`}
    >
      <div className={`p-4 rounded-lg bg-${color}-500/20 w-fit mb-4 group-hover:bg-${color}-500/30 transition-colors`}>
        <Icon className={`w-8 h-8 text-${color}-400`} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = (type) => {
      switch(type) {
        case 'success': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
        case 'error': return <XCircle className="w-4 h-4 text-red-400" />;
        default: return <Activity className="w-4 h-4 text-blue-400" />;
      }
    };

    return (
      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
        {getIcon(activity.type)}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white font-medium">{activity.user}</p>
          <p className="text-xs text-gray-400 truncate">{activity.action}</p>
        </div>
        <span className="text-xs text-gray-500">{activity.time}</span>
      </div>
    );
  };

  const DashboardContent = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Total Users" value={stats.totalUsers.toLocaleString()} change="+12%" changeType="positive" />
        <StatCard icon={Shield} title="Active Labs" value={stats.activeLabs} change="+5%" changeType="positive" />
        <StatCard icon={Flag} title="Running Challenges" value={stats.runningChallenges} change="+8%" changeType="positive" />
        <StatCard icon={Calendar} title="Upcoming Events" value={stats.upcomingEvents} change="+2%" changeType="positive" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <QuickActionCard 
          icon={Plus} 
          title="Create Lab" 
          description="Add new hands-on lab environment"
          onClick={() => setActiveSection('labs')}
          color="green"
        />
        <QuickActionCard 
          icon={Trophy} 
          title="New Challenge" 
          description="Create CTF challenge"
          onClick={() => setActiveSection('challenges')}
          color="yellow"
        />
        <QuickActionCard 
          icon={Calendar} 
          title="Schedule Event" 
          description="Plan upcoming competitions"
          onClick={() => setActiveSection('events')}
          color="purple"
        />
        <QuickActionCard 
          icon={Megaphone} 
          title="Announcement" 
          description="Broadcast to all users"
          onClick={() => setActiveSection('announcements')}
          color="blue"
        />
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass-card p-6 rounded-xl border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-cyan-400" />
              Recent Activity
            </h3>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm">View All</button>
          </div>
          <div className="space-y-2">
            {recentActivity.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="glass-card p-6 rounded-xl border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white flex items-center mb-6">
            <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Server Uptime</span>
              <span className="text-green-400 font-semibold">{stats.systemUptime}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">New Users Today</span>
              <span className="text-cyan-400 font-semibold">{stats.newUsersToday}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Average Score</span>
              <span className="text-purple-400 font-semibold">{stats.averageScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Submissions</span>
              <span className="text-yellow-400 font-semibold">{stats.totalSubmissions.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ManagementSection = ({ title, icon: Icon, children }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <Icon className="w-8 h-8 mr-3 text-cyan-400" />
          {title}
        </h2>
        <div className="flex space-x-3">
          <button className="glass-card px-4 py-2 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center">
            <Search className="w-4 h-4 mr-2" />
            Search
          </button>
          <button className="glass-card px-4 py-2 rounded-lg border border-green-500/20 text-green-400 hover:bg-green-500/10 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </button>
        </div>
      </div>
      {children}
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'labs':
        return (
          <ManagementSection title="Labs Management" icon={Shield}>
            <div className="glass-card p-6 rounded-xl border border-slate-700/50">
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Labs Management</h3>
                <p className="text-gray-400 mb-6">Create and manage hands-on cybersecurity labs</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <button className="glass-card p-4 rounded-lg border border-green-500/20 text-green-400 hover:bg-green-500/10 transition-colors">
                    <Plus className="w-6 h-6 mx-auto mb-2" />
                    Create Lab
                  </button>
                  <button className="glass-card p-4 rounded-lg border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10 transition-colors">
                    <Edit3 className="w-6 h-6 mx-auto mb-2" />
                    Edit Existing
                  </button>
                  <button className="glass-card p-4 rounded-lg border border-blue-500/20 text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <Eye className="w-6 h-6 mx-auto mb-2" />
                    View All
                  </button>
                </div>
              </div>
            </div>
          </ManagementSection>
        );
      
      case 'challenges':
        return (
          <ManagementSection title="Challenge Management" icon={Trophy}>
            <div className="glass-card p-6 rounded-xl border border-slate-700/50">
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">CTF Challenges</h3>
                <p className="text-gray-400 mb-6">Design and deploy capture-the-flag challenges</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  <button className="glass-card p-4 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors">
                    <Flag className="w-6 h-6 mx-auto mb-2" />
                    Web Exploits
                  </button>
                  <button className="glass-card p-4 rounded-lg border border-purple-500/20 text-purple-400 hover:bg-purple-500/10 transition-colors">
                    <Shield className="w-6 h-6 mx-auto mb-2" />
                    Cryptography
                  </button>
                  <button className="glass-card p-4 rounded-lg border border-blue-500/20 text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <Zap className="w-6 h-6 mx-auto mb-2" />
                    Reverse Eng
                  </button>
                  <button className="glass-card p-4 rounded-lg border border-green-500/20 text-green-400 hover:bg-green-500/10 transition-colors">
                    <Globe className="w-6 h-6 mx-auto mb-2" />
                    Forensics
                  </button>
                </div>
              </div>
            </div>
          </ManagementSection>
        );

      case 'events':
        return (
          <ManagementSection title="Events Management" icon={Calendar}>
            <div className="glass-card p-6 rounded-xl border border-slate-700/50">
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Event Planning</h3>
                <p className="text-gray-400 mb-6">Schedule competitions and manage registrations</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <button className="glass-card p-4 rounded-lg border border-purple-500/20 text-purple-400 hover:bg-purple-500/10 transition-colors">
                    <Calendar className="w-6 h-6 mx-auto mb-2" />
                    Schedule Event
                  </button>
                  <button className="glass-card p-4 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                    <Users className="w-6 h-6 mx-auto mb-2" />
                    Registrations
                  </button>
                  <button className="glass-card p-4 rounded-lg border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10 transition-colors">
                    <Trophy className="w-6 h-6 mx-auto mb-2" />
                    Leaderboards
                  </button>
                </div>
              </div>
            </div>
          </ManagementSection>
        );

      case 'announcements':
        return (
          <ManagementSection title="Announcements" icon={Megaphone}>
            <div className="glass-card p-6 rounded-xl border border-slate-700/50">
              <div className="space-y-6">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Create New Announcement</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Announcement title..."
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    />
                    <textarea 
                      placeholder="Write your announcement here..."
                      rows={4}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-sm border border-red-500/30">Critical</button>
                        <button className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-400 text-sm border border-yellow-500/30">Important</button>
                        <button className="px-3 py-1 rounded bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">Info</button>
                      </div>
                      <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ManagementSection>
        );

      case 'users':
        return (
          <ManagementSection title="User Management" icon={Users}>
            <div className="glass-card p-6 rounded-xl border border-slate-700/50">
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">User Administration</h3>
                <p className="text-gray-400 mb-6">Manage user accounts and permissions</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  <button className="glass-card p-4 rounded-lg border border-blue-500/20 text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <Users className="w-6 h-6 mx-auto mb-2" />
                    All Users
                  </button>
                  <button className="glass-card p-4 rounded-lg border border-green-500/20 text-green-400 hover:bg-green-500/10 transition-colors">
                    <UserCheck className="w-6 h-6 mx-auto mb-2" />
                    Active Users
                  </button>
                  <button className="glass-card p-4 rounded-lg border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10 transition-colors">
                    <Settings className="w-6 h-6 mx-auto mb-2" />
                    Permissions
                  </button>
                  <button className="glass-card p-4 rounded-lg border border-purple-500/20 text-purple-400 hover:bg-purple-500/10 transition-colors">
                    <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                    Analytics
                  </button>
                </div>
              </div>
            </div>
          </ManagementSection>
        );

      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100'} transition-colors duration-300`}>
      {/* Header */}
      <header className="glass-card border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CyberAdmin</h1>
                <p className="text-sm text-gray-400">Administrative Control Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg glass-card border border-slate-700/50 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg glass-card border border-slate-700/50 text-gray-400 hover:text-white transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="flex items-center space-x-2 glass-card px-3 py-2 rounded-lg border border-slate-700/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                  A
                </div>
                <span className="text-white font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 glass-card border-r border-slate-700/50 h-screen sticky top-[73px]">
          <nav className="p-6">
            <div className="space-y-2">
              <Link
                to="/"
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-400 hover:text-white hover:bg-slate-800/50 font-medium"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              {[
                { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
                { id: 'labs', icon: Shield, label: 'Labs' },
                { id: 'challenges', icon: Trophy, label: 'Challenges' },
                { id: 'events', icon: Calendar, label: 'Events' },
                { id: 'announcements', icon: Megaphone, label: 'Announcements' },
                { id: 'users', icon: Users, label: 'Users' },
                { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
                { id: 'settings', icon: Settings, label: 'Settings' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                  aria-label={item.label}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Custom Styles */}
      <style>{`
        .glass-card {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

export default Admin;