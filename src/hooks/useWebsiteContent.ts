import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWebsiteContent = (sectionName: string) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_content')
        .select('content')
        .eq('section_name', sectionName)
        .single();

      if (error) {
        console.error(`Failed to fetch ${sectionName}:`, error);
        setError(error.message);
      } else {
        setContent(data?.content);
        setError(null);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (newContent: any) => {
    try {
      console.log('Updating content for section:', sectionName);
      console.log('New content:', newContent);

      // Get admin session from localStorage (not Supabase auth)
      const adminSession = localStorage.getItem('admin_session');
      if (!adminSession) {
        console.error('No admin session found');
        setError('Admin authentication required');
        return { success: false, error: 'Admin authentication required' };
      }

      const adminUser = JSON.parse(adminSession);

      // Update website content directly since we have admin access
      const { data, error } = await supabase
        .from('website_content')
        .upsert({
          section_name: sectionName,
          content: newContent,
          last_updated_by: adminUser.id
        }, {
          onConflict: 'section_name'
        });

      if (error) {
        console.error('Error updating content:', error);
        setError(error.message);
        return { success: false, error: error.message };
      }

      console.log('Content updated successfully:', data);
      setContent(newContent);
      setError(null);
      return { success: true, data };
    } catch (err) {
      console.error('Unexpected error during update:', err);
      setError('Failed to update content');
      return { success: false, error: 'Failed to update content' };
    }
  };

  useEffect(() => {
    fetchContent();
  }, [sectionName]);

  return { 
    content, 
    loading, 
    error, 
    updateContent, 
    refetch: fetchContent 
  };
};
