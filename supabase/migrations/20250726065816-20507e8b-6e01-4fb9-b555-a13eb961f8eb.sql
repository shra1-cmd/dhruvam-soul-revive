-- Drop the admin_users table since we'll use Supabase Auth directly
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Simplify RLS policies - allow all authenticated users full access
-- This is perfect for small teams where all logged-in users are trusted

-- List of tables to update with simplified policies
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT unnest(ARRAY[
      'programs', 
      'stories', 
      'gallery', 
      'events', 
      'donations', 
      'volunteers', 
      'website_content'
    ])
  LOOP
    -- Enable RLS
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', table_name);
    
    -- Drop existing complex policies
    EXECUTE format('DROP POLICY IF EXISTS "Admin users can manage all %s" ON public.%I;', table_name, table_name);
    EXECUTE format('DROP POLICY IF EXISTS "Admin can update website content" ON public.%I;', table_name);
    EXECUTE format('DROP POLICY IF EXISTS "Admin can insert website content" ON public.%I;', table_name);
    EXECUTE format('DROP POLICY IF EXISTS "PARSA SAI SHRAVAN" ON public.%I;', table_name);
    
    -- Create simple policy: authenticated users can do everything
    EXECUTE format('
      CREATE POLICY "Authenticated users have full access"
      ON public.%I
      FOR ALL
      USING (auth.role() = ''authenticated'');
    ', table_name);
  END LOOP;
END $$;

-- Keep public read access for frontend
CREATE POLICY "Public can read programs" 
ON public.programs 
FOR SELECT 
USING (true);

CREATE POLICY "Public can read stories" 
ON public.stories 
FOR SELECT 
USING (true);

CREATE POLICY "Public can read gallery" 
ON public.gallery 
FOR SELECT 
USING (true);

CREATE POLICY "Public can read events" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Public can read website content" 
ON public.website_content 
FOR SELECT 
USING (true);