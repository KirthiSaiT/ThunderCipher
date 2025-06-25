
import React, { useState } from 'react';
import { Terminal, Play, Square, Monitor, Cpu, HardDrive, Wifi } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const AttackerBox = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const { user } = useAuth();

  const startAttackerBox = () => {
    setIsRunning(true);
    setConnectionStatus('Starting...');
    
    // Simulate startup process
    setTimeout(() => {
      setConnectionStatus('Connected');
    }, 3000);
  };

  const stopAttackerBox = () => {
    setIsRunning(false);
    setConnectionStatus('Stopping...');
    
    // Simulate shutdown process
    setTimeout(() => {
      setConnectionStatus('Disconnected');
    }, 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Access Denied</h1>
          <p className="text-gray-400 font-mono">Please sign in to access AttackerBox.</p>
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
          <h1 className="text-4xl font-bold gradient-text mb-2">AttackerBox</h1>
          <p className="text-gray-400 font-mono">Your personal penetration testing environment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center">
                <Terminal className="mr-2" />
                Control Panel
              </h2>
              
              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-cyan-500/20">
                  <div>
                    <h3 className="font-bold text-white">Status</h3>
                    <p className="text-gray-400 font-mono text-sm">{connectionStatus}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full ${
                    connectionStatus === 'Connected' ? 'bg-green-500' : 
                    connectionStatus === 'Disconnected' ? 'bg-red-500' : 
                    'bg-yellow-500'
                  }`}></div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={startAttackerBox}
                    disabled={isRunning}
                    className="glass-button bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold flex items-center justify-center disabled:opacity-50"
                  >
                    <Play className="mr-2" size={16} />
                    Start
                  </Button>
                  
                  <Button 
                    onClick={stopAttackerBox}
                    disabled={!isRunning}
                    className="glass-button bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white font-bold flex items-center justify-center disabled:opacity-50"
                  >
                    <Square className="mr-2" size={16} />
                    Stop
                  </Button>
                </div>

                {/* Connection Info */}
                {isRunning && connectionStatus === 'Connected' && (
                  <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/30 animate-fade-in-up">
                    <h4 className="font-bold text-green-400 mb-3">Connection Details</h4>
                    <div className="space-y-2 text-sm font-mono text-gray-300">
                      <p><span className="text-green-400">IP Address:</span> 192.168.100.{Math.floor(Math.random() * 254) + 1}</p>
                      <p><span className="text-green-400">SSH Port:</span> 22</p>
                      <p><span className="text-green-400">VNC Port:</span> 5901</p>
                      <p><span className="text-green-400">Username:</span> kali</p>
                      <p><span className="text-green-400">Password:</span> kali</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button className="w-full glass-button border-green-500 text-green-400 hover:bg-green-500/10" variant="outline">
                        Open Web Terminal
                      </Button>
                      <Button className="w-full glass-button border-blue-500 text-blue-400 hover:bg-blue-500/10" variant="outline">
                        Open VNC Viewer
                      </Button>
                    </div>
                  </div>
                )}

                {/* Terminal Preview */}
                <div className="bg-black rounded-lg p-4 border border-cyan-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 font-mono text-sm ml-2">kali@attackerbox:~$</span>
                  </div>
                  <div className="font-mono text-green-400 text-sm space-y-1">
                    {isRunning && connectionStatus === 'Connected' ? (
                      <>
                        <p>┌──(kali㉿attackerbox)-[~]</p>
                        <p>└─$ nmap --version</p>
                        <p className="text-cyan-400">Nmap version 7.94</p>
                        <p>┌──(kali㉿attackerbox)-[~]</p>
                        <p>└─$ _</p>
                      </>
                    ) : (
                      <p className="text-gray-500">AttackerBox is offline. Start the instance to begin.</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* System Info */}
          <div className="space-y-6">
            <Card className="glass-card p-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <h3 className="text-xl font-bold gradient-text mb-4 flex items-center">
                <Monitor className="mr-2" />
                System Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-mono text-sm">OS</span>
                  <span className="text-white font-mono text-sm">Kali Linux</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-mono text-sm">Kernel</span>
                  <span className="text-white font-mono text-sm">6.1.0-kali5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-mono text-sm">Architecture</span>
                  <span className="text-white font-mono text-sm">x86_64</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-xl font-bold gradient-text mb-4 flex items-center">
                <Cpu className="mr-2" />
                Resources
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 font-mono text-sm">CPU</span>
                    <span className="text-cyan-400 font-mono text-sm">45%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 font-mono text-sm">Memory</span>
                    <span className="text-cyan-400 font-mono text-sm">2.1/4.0 GB</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{width: '52%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 font-mono text-sm">Storage</span>
                    <span className="text-cyan-400 font-mono text-sm">15/50 GB</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h3 className="text-xl font-bold gradient-text mb-4 flex items-center">
                <HardDrive className="mr-2" />
                Pre-installed Tools
              </h3>
              <div className="space-y-2 text-sm font-mono text-gray-300">
                <p>• Nmap - Network discovery</p>
                <p>• Metasploit - Exploitation framework</p>
                <p>• Burp Suite - Web app security</p>
                <p>• Wireshark - Network analysis</p>
                <p>• John the Ripper - Password cracking</p>
                <p>• Hashcat - Advanced password recovery</p>
                <p>• Aircrack-ng - WiFi security auditing</p>
                <p>• SQLmap - SQL injection testing</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttackerBox;
