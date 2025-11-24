-- TEMPORARY: Enable public read access for development/testing
-- WARNING: In production, you should require authentication

-- Allow anyone to view approved products (already exists, but ensuring it's there)
-- Products table already has this policy, so no changes needed there

-- Allow public to view all profiles (already done in previous migration)
-- No changes needed

-- Allow public to view their own purchases when they have a session
-- Keep purchases restricted - only authenticated users can see their own
-- This is already secured by existing RLS

-- For development: Temporarily allow viewing all products regardless of status
-- Comment out or remove this in production!
DROP POLICY IF EXISTS "Anyone can view all products (DEV ONLY)" ON public.products;
CREATE POLICY "Anyone can view all products (DEV ONLY)"
ON public.products
FOR SELECT
USING (true);

-- Note: This overwrites the "Anyone can view approved products" policy
-- In production, you should remove this policy and keep only approved products visible