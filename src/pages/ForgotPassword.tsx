import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendReset = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    setIsLoading(false);
    if (!error) setSent(true);
    // Optionally show a toast for error
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white flex items-center justify-center relative overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-teal-400 rounded-full animate-pulse animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-card p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="text-cyan-400" size={32} />
              <Mail className="text-cyan-300" size={32} />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Reset Password
            </h1>
            <p className="text-gray-400 font-mono text-sm">
              {sent
                ? 'Check your email for a password reset link.'
                : 'Enter your email to receive a reset link'}
            </p>
          </div>
          {!sent ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 font-mono neon-border"
                  placeholder="Enter your email address"
                />
              </div>
              <Button
                onClick={handleSendReset}
                disabled={isLoading || !email}
                className="w-full glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
              <div className="text-center">
                <Link 
                  to="/signin" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm flex items-center justify-center"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
