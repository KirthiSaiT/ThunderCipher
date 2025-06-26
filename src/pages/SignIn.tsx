import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async () => {
    if (formData.email && formData.password) {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    }
  };

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
      <div className="flex-1 flex flex-col justify-center items-center w-full" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="glass-card p-8 animate-fade-in-up">
            {/* Error */}
            {error && <div className="mb-4 text-red-400 text-center font-mono text-sm animate-pulse">{error}</div>}
            {/* Form */}
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-gray-300 mb-2">
                  Email or Username
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 font-mono neon-border transition-all duration-200"
                  placeholder="Enter your email or username"
                  autoComplete="username"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-mono text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 font-mono pr-12 neon-border transition-all duration-200"
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
              </div>
              <div className="flex items-center justify-between">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !formData.email || !formData.password}
                className="w-full glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center"
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 font-mono text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;