
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const { verifyOTP, sendOTP, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (otp.length === 6 && email) {
      const success = await verifyOTP(email, otp);
      if (success) {
        navigate('/dashboard');
      }
    }
  };

  const handleResendOTP = async () => {
    if (email) {
      await sendOTP(email);
    }
  };

  if (!email) {
    navigate('/signup');
    return null;
  }

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
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="text-cyan-400" size={32} />
              <Mail className="text-cyan-300" size={32} />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Verify Your Email</h1>
            <p className="text-gray-400 font-mono text-sm">
              We've sent a 6-digit code to<br/>
              <span className="text-cyan-400">{email}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-mono text-gray-300 mb-2">
                Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 font-mono text-center text-2xl tracking-widest neon-border"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <Button
              onClick={handleVerify}
              disabled={isLoading || otp.length !== 6}
              className="w-full glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </Button>

            <div className="text-center">
              <p className="text-gray-400 font-mono text-sm mb-2">
                Didn't receive the code?
              </p>
              <Button
                onClick={handleResendOTP}
                variant="outline"
                disabled={isLoading}
                className="glass-button border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-mono"
              >
                Resend Code
              </Button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 glass-card border border-cyan-500/30">
            <p className="text-cyan-400 font-mono text-xs text-center">
              🔒 This verification ensures the security of your ThunderCipher account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
