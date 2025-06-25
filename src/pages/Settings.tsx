
import React, { useState } from 'react';
import { Shield, Download, Server, Key, User, Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';

const Settings = () => {
  const [vpnStatus, setVpnStatus] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const { user } = useAuth();

  const generateVPN = () => {
    // Mock VPN generation
    alert('VPN configuration generated! Check your downloads.');
  };

  const downloadVPN = () => {
    // Mock VPN download
    const element = document.createElement('a');
    const file = new Blob(['# ThunderCipher VPN Configuration\n# Generated for: ' + user?.username], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'thundercipher-vpn.ovpn';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Access Denied</h1>
          <p className="text-gray-400 font-mono">Please sign in to access settings.</p>
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
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold gradient-text mb-2">Settings</h1>
          <p className="text-gray-400 font-mono">Manage your account and VPN configuration</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <Card className="glass-card p-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center">
              <User className="mr-2" />
              Profile Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-mono text-sm mb-2">Username</label>
                <Input
                  defaultValue={user.username}
                  className="glass-input border-cyan-500/30 bg-black/30 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-mono text-sm mb-2">Email</label>
                <Input
                  defaultValue={user.email}
                  disabled
                  className="glass-input border-gray-500/30 bg-gray-800/30 text-gray-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-mono">Email Notifications</span>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <Button className="w-full glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold">
                Update Profile
              </Button>
            </div>
          </Card>

          {/* VPN Management */}
          <Card className="glass-card p-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center">
              <Shield className="mr-2" />
              VPN Management
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-cyan-500/20">
                <div>
                  <h3 className="font-bold text-white">VPN Status</h3>
                  <p className="text-gray-400 font-mono text-sm">
                    {vpnStatus ? 'Connected' : 'Disconnected'}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${vpnStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  onClick={generateVPN}
                  className="glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold flex items-center justify-center"
                >
                  <Key className="mr-2" size={16} />
                  Generate VPN Config
                </Button>
                
                <Button 
                  onClick={downloadVPN}
                  className="glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 flex items-center justify-center"
                  variant="outline"
                >
                  <Download className="mr-2" size={16} />
                  Download VPN Config
                </Button>
              </div>
              
              <div className="p-4 bg-teal-900/30 rounded-lg border border-teal-500/30">
                <h4 className="font-bold text-teal-400 mb-2">VPN Information</h4>
                <div className="space-y-1 text-sm font-mono text-gray-300">
                  <p>Server: vpn.thundercipher.com</p>
                  <p>Protocol: OpenVPN</p>
                  <p>Port: 1194 (UDP)</p>
                  <p>Encryption: AES-256</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="glass-card p-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center">
              <Shield className="mr-2" />
              Security
            </h2>
            <div className="space-y-4">
              <Button className="w-full glass-button border-yellow-500 text-yellow-400 hover:bg-yellow-500/10" variant="outline">
                Change Password
              </Button>
              <Button className="w-full glass-button border-purple-500 text-purple-400 hover:bg-purple-500/10" variant="outline">
                Enable 2FA
              </Button>
              <Button className="w-full glass-button border-red-500 text-red-400 hover:bg-red-500/10" variant="outline">
                Delete Account
              </Button>
            </div>
          </Card>

          {/* System Preferences */}
          <Card className="glass-card p-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center">
              <Server className="mr-2" />
              Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-mono">Dark Mode</span>
                <Switch checked={true} disabled />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-mono">Sound Effects</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-mono">Auto-save Progress</span>
                <Switch defaultChecked />
              </div>
              <div>
                <label className="block text-gray-300 font-mono text-sm mb-2">Terminal Theme</label>
                <select className="w-full glass-input border-cyan-500/30 bg-black/30 text-white">
                  <option>Matrix Green</option>
                  <option>Cyber Blue</option>
                  <option>Hacker Red</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
