-- Create admin users table for separate admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create programs table for managing NGO programs
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  detailed_description TEXT,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('temple_restoration', 'goshala', 'women_empowerment', 'skill_development', 'child_homes', 'ayurveda')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
  start_date DATE,
  end_date DATE,
  location TEXT,
  beneficiaries_count INTEGER DEFAULT 0,
  budget_allocated DECIMAL(12,2),
  budget_spent DECIMAL(12,2) DEFAULT 0,
  created_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stories table for impact stories and blogs
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('impact_story', 'blog', 'news', 'testimonial')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_name TEXT,
  author_role TEXT,
  read_time_minutes INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery table for photo management
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('temple', 'goshala', 'women', 'children', 'events', 'training', 'general')),
  location TEXT,
  date_taken DATE,
  photographer TEXT,
  is_featured BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table for managing events and activities
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  detailed_description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT NOT NULL,
  image_url TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('fundraising', 'awareness', 'training', 'celebration', 'volunteer', 'other')),
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  max_participants INTEGER,
  registered_participants INTEGER DEFAULT 0,
  registration_fee DECIMAL(10,2) DEFAULT 0,
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donations table for tracking donations
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  donor_phone TEXT,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  donation_type TEXT NOT NULL CHECK (donation_type IN ('one_time', 'monthly', 'yearly')),
  purpose TEXT CHECK (purpose IN ('general', 'temple_restoration', 'goshala', 'women_empowerment', 'child_homes', 'emergency')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT CHECK (payment_method IN ('online', 'bank_transfer', 'cash', 'cheque')),
  transaction_id TEXT,
  notes TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  receipt_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteers table for volunteer management
CREATE TABLE public.volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  skills TEXT[],
  interests TEXT[],
  availability TEXT,
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'experienced')),
  background_check_status TEXT DEFAULT 'pending' CHECK (background_check_status IN ('pending', 'approved', 'rejected')),
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
  joined_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create website_content table for dynamic content management
CREATE TABLE public.website_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  last_updated_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin users can manage all admin_users" ON public.admin_users
FOR ALL USING (true);

CREATE POLICY "Admin users can manage all programs" ON public.programs
FOR ALL USING (true);

CREATE POLICY "Admin users can manage all stories" ON public.stories
FOR ALL USING (true);

CREATE POLICY "Admin users can manage all gallery" ON public.gallery
FOR ALL USING (true);

CREATE POLICY "Admin users can manage all events" ON public.events
FOR ALL USING (true);

CREATE POLICY "Admin users can manage all donations" ON public.donations
FOR ALL USING (true);

CREATE POLICY "Admin users can manage all volunteers" ON public.volunteers
FOR ALL USING (true);

CREATE POLICY "Admin users can manage website content" ON public.website_content
FOR ALL USING (true);

-- Public read access for frontend
CREATE POLICY "Public can read published programs" ON public.programs
FOR SELECT USING (status = 'active');

CREATE POLICY "Public can read published stories" ON public.stories
FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read gallery" ON public.gallery
FOR SELECT USING (true);

CREATE POLICY "Public can read events" ON public.events
FOR SELECT USING (true);

CREATE POLICY "Public can read website content" ON public.website_content
FOR SELECT USING (true);

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
('program-images', 'program-images', true),
('story-images', 'story-images', true),
('gallery-images', 'gallery-images', true),
('event-images', 'event-images', true),
('documents', 'documents', true);

-- Create storage policies
CREATE POLICY "Admin can upload program images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'program-images');

CREATE POLICY "Admin can upload story images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'story-images');

CREATE POLICY "Admin can upload gallery images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Admin can upload event images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "Admin can upload documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Public can view all uploaded files" ON storage.objects
FOR SELECT USING (bucket_id IN ('program-images', 'story-images', 'gallery-images', 'event-images', 'documents'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON public.stories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON public.donations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_volunteers_updated_at BEFORE UPDATE ON public.volunteers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_website_content_updated_at BEFORE UPDATE ON public.website_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash, full_name, role)
VALUES ('admin@garudadhruvam.org', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'super_admin');

-- Insert sample website content
INSERT INTO public.website_content (section_name, content) VALUES
('hero', '{"title": "Reviving the Soul of Bharat", "subtitle": "Empowering communities through cultural heritage, women empowerment, and sustainable development", "cta_primary": "Join the Movement", "cta_secondary": "Explore Our Work"}'),
('mission', '{"mission": "To empower India through its roots — culture, women, sustainability. We believe in enabling rural transformation by honoring ancient wisdom.", "vision": "A self-reliant Bharat where ancient wisdom uplifts modern life — one village, one temple, one woman at a time.", "philosophy": "We believe transformation begins from within villages, not from the top down. Local wisdom, collective action, and cultural roots form the foundation of inclusive change."}'),
('stats', '{"villages": 100, "women_skilled": 2000, "temples_revived": 20, "programs_active": 15}');