-- Enable Row Level Security on website_content table
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- Update the website content policy to use improved syntax
DROP POLICY IF EXISTS "Only admins can update website content" ON public.website_content;

CREATE POLICY "Admins can update content"
  ON public.website_content
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.user_id = auth.uid()
    )
  ); 