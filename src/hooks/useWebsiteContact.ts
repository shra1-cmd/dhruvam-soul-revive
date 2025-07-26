import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWebsiteContact = () => {
  const [contactData, setContactData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_name', 'contact')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Failed to fetch contact data:', error);
        setError(error.message);
      } else {
        setContactData(data);
        setError(null);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateContactData = async (newData: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setError('Authentication required');
        return { success: false, error: 'Authentication required' };
      }

      const { data, error } = await supabase
        .from('website_content')
        .upsert({
          section_name: 'contact',
          content: newData,
        }, {
          onConflict: 'section_name'
        });

      if (error) {
        console.error('Error updating contact data:', error);
        setError(error.message);
        return { success: false, error: error.message };
      }

      setContactData({ section_name: 'contact', content: newData });
      setError(null);
      return { success: true, data };
    } catch (err) {
      console.error('Unexpected error during update:', err);
      setError('Failed to update contact data');
      return { success: false, error: 'Failed to update contact data' };
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return { 
    contactData, 
    loading, 
    error, 
    updateContactData, 
    refetch: fetchContactData 
  };
};