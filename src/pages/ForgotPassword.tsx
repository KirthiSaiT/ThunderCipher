
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const ForgotPassword = () => {
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const { sendOTP, resetPassword, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOTP = async () => {
    if (formData.email) {
      const success = await sendOTP(formData.email);
      if (success) {
        setStep('reset');
      }
    }
  };

  const handleResetPassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      return;
    }

    if (formData.otp && formData.newPassword) {
      const success = await resetPassword(formData.email, formData.newPassword, formData.otp);
      if (success) {
        // Redirect to login or show success message
      }
    }
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
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="text-cyan-400" size={32} />
              <Mail className="text-cyan-300" size={32} />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              {step === 'email' ? 'Reset Password' : 'Enter New Password'}
            </h1>
            <p className="text-gray-400 font-mono text-sm">
              {step === 'email' 
                ? 'Enter your email to receive a reset code' 
                : 'Enter the code and your new password'
              }
            </p>
          </div>

          {step === 'email' ? (
            /* Email Step */
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 font-mono neon-border"
                  placeholder="Enter your email address"
                />
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={isLoading || !formData.email}
                className="w-full glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                {isLoading ? 'Sending Code...' : 'Send Reset Code'}
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
          ) : (
            /* Reset Step */
            <div className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-mono text-gray-300 mb-2">
                  Verification Code
                </label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 font-mono text-center tracking-widest neon-border"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-mono text-gray-300 mb-2">
                  New Password
                </label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 font-mono neon-border"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-mono text-gray-300 mb-2">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 font-mono neon-border"
                  placeholder="Confirm new password"
                />
                {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1 font-mono">Passwords do not match</p>
                )}
              </div>

              <Button
                onClick={handleResetPassword}
                disabled={isLoading || !formData.otp || !formData.newPassword || formData.newPassword !== formData.confirmPassword}
                className="w-full glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </Button>

              <div className="text-center">
                <button 
                  onClick={() => setStep('email')}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm flex items-center justify-center"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Change Email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
