import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    if (newPassword !== confirmPassword) return;
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setIsLoading(false);
    if (!error) {
      setSuccess(true);
      setTimeout(() => navigate('/signin'), 2000);
    }
    // Optionally show a toast for error
  };

  if (success) {
    return <div>Password reset! Redirecting to sign in...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8">
        <h1 className="text-2xl font-bold mb-4">Set a New Password</h1>
        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="mb-2"
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="mb-4"
        />
        <Button
          onClick={handleReset}
          disabled={isLoading || !newPassword || newPassword !== confirmPassword}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword; 