-- Drop the admin_users table since we'll use Supabase Auth directly
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Drop ALL existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Admin users can manage all programs" ON public.programs;
DROP POLICY IF EXISTS "Admin users can manage all stories" ON public.stories;
DROP POLICY IF EXISTS "Admin users can manage all gallery" ON public.gallery;
DROP POLICY IF EXISTS "Admin users can manage all events" ON public.events;
DROP POLICY IF EXISTS "Admin users can manage all donations" ON public.donations;
DROP POLICY IF EXISTS "Admin users can manage all volunteers" ON public.volunteers;
DROP POLICY IF EXISTS "Admin can update website content" ON public.website_content;
DROP POLICY IF EXISTS "Admin can insert website content" ON public.website_content;
DROP POLICY IF EXISTS "PARSA SAI SHRAVAN" ON public.website_content;
DROP POLICY IF EXISTS "Public can read programs" ON public.programs;
DROP POLICY IF EXISTS "Public can read stories" ON public.stories;
DROP POLICY IF EXISTS "Public can read gallery" ON public.gallery;
DROP POLICY IF EXISTS "Public can read events" ON public.events;
DROP POLICY IF EXISTS "Public can read website content" ON public.website_content;
DROP POLICY IF EXISTS "Public can read published programs" ON public.programs;
DROP POLICY IF EXISTS "Public can read published stories" ON public.stories;

-- Simplify RLS policies - allow all authenticated users full access
-- This is perfect for small teams where all logged-in users are trusted

-- Programs table
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users have full access" ON public.programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public can read programs" ON public.programs FOR SELECT USING (true);

-- Stories table  
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users have full access" ON public.stories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public can read stories" ON public.stories FOR SELECT USING (true);

-- Gallery table
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users have full access" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public can read gallery" ON public.gallery FOR SELECT USING (true);

-- Events table
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users have full access" ON public.events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public can read events" ON public.events FOR SELECT USING (true);

-- Donations table
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users have full access" ON public.donations FOR ALL USING (auth.role() = 'authenticated');

-- Volunteers table
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users have full access" ON public.volunteers FOR ALL USING (auth.role() = 'authenticated');

-- Website content table
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users have full access" ON public.website_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public can read website content" ON public.website_content FOR SELECT USING (true);