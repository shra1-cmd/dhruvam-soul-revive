-- Update the admin user to have the same user_id as auth.uid() when using anonymous auth
-- First, let's modify the RLS policy to check admin_users table properly
DROP POLICY IF EXISTS "Only admins can update website content" ON website_content;

-- Create a new policy that allows updates when there's a valid admin session
CREATE POLICY "Admin can update website content" 
ON website_content 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = 'admin@garudadhruvam.org' 
    AND admin_users.is_active = true
  )
);

-- Also allow INSERT for admin
CREATE POLICY "Admin can insert website content" 
ON website_content 
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = 'admin@garudadhruvam.org' 
    AND admin_users.is_active = true
  )
);