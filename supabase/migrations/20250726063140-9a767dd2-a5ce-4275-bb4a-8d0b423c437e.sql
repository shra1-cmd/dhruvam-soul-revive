-- Insert a default admin user for the hardcoded login
INSERT INTO admin_users (
  id,
  email, 
  full_name, 
  role, 
  password_hash, 
  is_active,
  user_id
) VALUES (
  'admin-001',
  'admin@garudadhruvam.org',
  'Admin User',
  'admin',
  'admin123',
  true,
  'admin-001'
) ON CONFLICT (email) DO UPDATE SET
  password_hash = 'admin123',
  is_active = true,
  user_id = 'admin-001';