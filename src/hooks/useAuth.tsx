import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
}

interface ExtendedUser {
  id: string;
  email: string;
  username: string;
  points: number;
  completedChallenges: number;
  rank: number;
  level: string;
  streak: number;
  achievements: string[];
}

interface AuthContextType {
  user: ExtendedUser | null;
  profile: Profile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  sendOTP: (email: string) => Promise<boolean>;
  resetPassword: (email: string, newPassword: string, otp: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createExtendedUser = (authUser: User, profileData: Profile | null): ExtendedUser => {
    return {
      id: authUser.id,
      email: authUser.email || '',
      username: profileData?.username || authUser.user_metadata?.username || authUser.email?.split('@')[0] || 'User',
      points: 850,
      completedChallenges: 12,
      rank: 15,
      level: 'Intermediate',
      streak: 5,
      achievements: ['First Blood', 'Speed Demon', 'Web Warrior']
    };
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          setTimeout(async () => {
            try {
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
                setProfile(null);
              } else {
                setProfile(profileData);
              }
              
              const extendedUser = createExtendedUser(session.user, profileData);
              setUser(extendedUser);
            } catch (error) {
              console.error('Error in profile fetch:', error);
              const extendedUser = createExtendedUser(session.user, null);
              setUser(extendedUser);
            }
          }, 100);
        } else {
          setProfile(null);
          setUser(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session);
        const extendedUser = createExtendedUser(session.user, null);
        setUser(extendedUser);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Login Successful",
        description: "Welcome back to ThunderCipher!",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Login Failed",  
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: `${username} created`,
        description: "Account created successfully! Redirecting to dashboard...",
      });

      // Optionally, insert into profiles table if you use it
      // await supabase.from('profiles').insert({
      //   id: data.user.id,
      //   email,
      //   username,
      //   created_at: new Date().toISOString()
      // });

      // Redirect to dashboard
      window.location.href = "/dashboard";
      return true;
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      });

      if (error) {
        toast({
          title: "Verification Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Email Verified Successfully!",
        description: "Welcome to ThunderCipher! Your account is now active.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });

      if (error) {
        toast({
          title: "Failed to Send OTP",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Verification Code Sent",
        description: `New verification code sent to ${email}`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Failed to Send OTP",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, newPassword: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'recovery'
      });

      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        toast({
          title: "Reset Failed",
          description: updateError.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Password Reset",
        description: "Your password has been successfully reset.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "See you next time, hacker!",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      login,
      signup,
      logout,
      verifyOTP,
      sendOTP,
      resetPassword,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
