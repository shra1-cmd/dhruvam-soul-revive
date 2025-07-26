-- Insert a default admin user with proper UUID
INSERT INTO admin_users (
  id,
  email, 
  full_name, 
  role, 
  password_hash, 
  is_active,
  user_id
) VALUES (
  gen_random_uuid(),
  'admin@garudadhruvam.org',
  'Admin User',
  'admin',
  'admin123',
  true,
  gen_random_uuid()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = 'admin123',
  is_active = true;