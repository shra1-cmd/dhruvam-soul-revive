import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const getTableName = (sectionName: string) => {
  switch (sectionName) {
    case 'hero':
      return 'website_hero';
    case 'stats':
      return 'website_stats';
    case 'mission':
      return 'website_mission';
    case 'contact':
      return 'website_contact';
    case 'cta':
      return 'website_hero'; // CTA is stored in hero table
    default:
      return 'website_hero';
  }
};

export const useWebsiteContent = (sectionName: string) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const tableName = getTableName(sectionName);
      const { data, error } = await supabase
        .from(tableName as any)
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error(`Failed to fetch ${sectionName}:`, error);
        setError(error.message);
      } else {
        setContent(data);
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

      // Check if user is authenticated with Supabase
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.error('No authenticated user found');
        setError('Authentication required');
        return { success: false, error: 'Authentication required' };
      }

      const tableName = getTableName(sectionName);
      const { data, error } = await supabase
        .from(tableName as any)
        .upsert({
          ...newContent,
          section_name: sectionName,
        }, {
          onConflict: 'section_name'
        });

      if (error) {
        console.error('Error updating content:', error);
        setError(error.message);
        return { success: false, error: error.message };
      }

      console.log('Content updated successfully:', data);
      setContent({ ...newContent, section_name: sectionName });
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
