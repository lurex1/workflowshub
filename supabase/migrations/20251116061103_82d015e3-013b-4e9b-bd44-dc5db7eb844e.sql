-- Create role enum
CREATE TYPE public.app_role AS ENUM ('customer', 'developer', 'admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Add new columns to products table
ALTER TABLE public.products
  ADD COLUMN creator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  ADD COLUMN category TEXT NOT NULL DEFAULT 'other',
  ADD COLUMN tags TEXT[] DEFAULT '{}',
  ADD COLUMN status TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN sales_count INTEGER DEFAULT 0,
  ADD COLUMN rating NUMERIC(3,2) DEFAULT 0.00,
  ADD COLUMN preview_image_url TEXT;

-- Create index for better performance
CREATE INDEX idx_products_creator ON public.products(creator_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_category ON public.products(category);

-- Update RLS policies for products
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;

CREATE POLICY "Anyone can view approved products"
  ON public.products
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Developers can view own products"
  ON public.products
  FOR SELECT
  USING (
    public.has_role(auth.uid(), 'developer') 
    AND creator_id = auth.uid()
  );

CREATE POLICY "Developers can create products"
  ON public.products
  FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'developer')
    AND creator_id = auth.uid()
  );

CREATE POLICY "Developers can update own products"
  ON public.products
  FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'developer')
    AND creator_id = auth.uid()
  );

CREATE POLICY "Admins can manage all products"
  ON public.products
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for automation files
INSERT INTO storage.buckets (id, name, public)
VALUES ('automation-files', 'automation-files', false);

-- Storage policies for automation files
CREATE POLICY "Developers can upload files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'automation-files'
    AND public.has_role(auth.uid(), 'developer')
  );

CREATE POLICY "Developers can view own files"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'automation-files'
    AND public.has_role(auth.uid(), 'developer')
  );

CREATE POLICY "Customers can download purchased files"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'automation-files'
    AND EXISTS (
      SELECT 1
      FROM public.purchases p
      JOIN public.products pr ON p.product_id = pr.id
      WHERE p.user_id = auth.uid()
        AND p.status = 'completed'
        AND name LIKE pr.id::text || '/%'
    )
  );

-- Update purchases table to link properly
ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;

-- Function to increment sales count
CREATE OR REPLACE FUNCTION public.increment_product_sales()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE public.products
    SET sales_count = sales_count + 1
    WHERE id = NEW.product_id;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to auto-increment sales
CREATE TRIGGER on_purchase_completed
  AFTER UPDATE ON public.purchases
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_product_sales();