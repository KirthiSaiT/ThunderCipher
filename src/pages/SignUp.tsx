import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (getPasswordStrength(formData.password) < 3) {
      setError('Password is too weak.');
      return;
    }
    if (formData.username && formData.email && formData.password) {
      const success = await signup(formData.username, formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  const isFormValid =
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white flex flex-col items-center justify-center">
      {/* Cyber grid background */}
      <div className="fixed inset-0 cyber-grid opacity-30 -z-10"></div>
      {/* Floating elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-teal-400 rounded-full animate-pulse animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center w-full mt-16" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="glass-card p-8 animate-fade-in-up">
            {/* Error */}
            {error && <div className="mb-4 text-red-400 text-center font-mono text-sm animate-pulse">{error}</div>}
            {/* Form */}
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-mono text-gray-300 mb-2">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 font-mono neon-border transition-all duration-200"
                  placeholder="Choose a unique username"
                  autoComplete="username"
                />
              </div>
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
                  className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 font-mono neon-border transition-all duration-200"
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-mono text-gray-300 mb-2 flex items-center gap-1">
                  Password
                  <span className="ml-1" title="Password must be at least 8 characters, include uppercase, lowercase, number, and symbol."><Info size={16} className="text-cyan-400" /></span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 font-mono pr-12 neon-border transition-all duration-200"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {/* Password strength meter */}
                {formData.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className={`h-2 w-24 rounded-full ${strengthColors[passwordStrength - 1] || 'bg-gray-700'}`}></div>
                    <span className="text-xs font-mono text-gray-400">{strengthLabels[passwordStrength - 1] || 'Too Short'}</span>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-mono text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 font-mono pr-12 neon-border transition-all duration-200"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1 font-mono">Passwords do not match</p>
                )}
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !isFormValid}
                className="w-full glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center"
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 font-mono text-sm">
                Already have an account?{' '}
                <Link to="/signin" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
