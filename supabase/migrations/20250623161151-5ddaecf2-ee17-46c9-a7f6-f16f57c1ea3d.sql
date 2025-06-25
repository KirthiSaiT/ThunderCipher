
-- Create a profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile when user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create labs table
CREATE TABLE public.labs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  category TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  content TEXT,
  hints TEXT[],
  solution TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample labs data
INSERT INTO public.labs (title, description, difficulty, category, points, content, hints) VALUES
('SQL Injection Fundamentals', 'Learn the basics of SQL injection attacks and how to exploit vulnerable web applications.', 'Easy', 'Web Security', 100, 'This lab teaches you how to identify and exploit SQL injection vulnerabilities...', ARRAY['Look for input fields that interact with databases', 'Try using single quotes to break the query']),
('Buffer Overflow Exploitation', 'Master the art of buffer overflow attacks in C applications.', 'Hard', 'Binary Exploitation', 300, 'In this advanced lab, you will learn to exploit buffer overflows...', ARRAY['Understand stack layout', 'Use a debugger to analyze the crash']),
('Cross-Site Scripting (XSS)', 'Discover and exploit XSS vulnerabilities in web applications.', 'Medium', 'Web Security', 200, 'Learn to find and exploit XSS vulnerabilities...', ARRAY['Look for user input reflection', 'Try basic XSS payloads']),
('Cryptographic Weaknesses', 'Analyze and break weak cryptographic implementations.', 'Hard', 'Cryptography', 350, 'This lab focuses on identifying weak crypto...', ARRAY['Analyze the encryption algorithm', 'Look for patterns in the ciphertext']);

-- Create user_lab_progress table to track completion
CREATE TABLE public.user_lab_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_id UUID NOT NULL REFERENCES public.labs(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, lab_id)
);

-- Enable RLS on labs and progress tables
ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lab_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for labs (public read access)
CREATE POLICY "Anyone can view labs" 
  ON public.labs 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Create policies for user progress
CREATE POLICY "Users can view their own progress" 
  ON public.user_lab_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
  ON public.user_lab_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
  ON public.user_lab_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);
