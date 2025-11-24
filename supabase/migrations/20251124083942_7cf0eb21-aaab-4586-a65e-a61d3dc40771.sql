-- Add public read access to developer profiles for marketplace visibility
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles
FOR SELECT
USING (true);

-- Add INSERT policy for purchases table (will be used by edge function with service role)
-- Note: This comment is for documentation - actual inserts will be done via edge function with service role key