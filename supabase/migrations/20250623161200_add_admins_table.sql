-- Create admins table to store admin email addresses
CREATE TABLE public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Insert the default admin
INSERT INTO public.admins (email) VALUES ('kirthisai251@gmail.com');

-- Enable RLS on admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create policies for admins table
-- Only admins can view the admins list
CREATE POLICY "Admins can view admins list" 
  ON public.admins 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Only admins can add new admins
CREATE POLICY "Admins can add new admins" 
  ON public.admins 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Only admins can delete admins (except themselves)
CREATE POLICY "Admins can delete other admins" 
  ON public.admins 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE email = auth.jwt() ->> 'email'
    ) AND email != auth.jwt() ->> 'email'
  );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = user_email
  );
END;
$$; 