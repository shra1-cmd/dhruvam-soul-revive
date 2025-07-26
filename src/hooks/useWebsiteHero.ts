import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWebsiteHero = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_name', 'hero')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Failed to fetch hero data:', error);
        setError(error.message);
      } else {
        setHeroData(data);
        setError(null);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateHeroData = async (newData: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setError('Authentication required');
        return { success: false, error: 'Authentication required' };
      }

      const { data, error } = await supabase
        .from('website_content')
        .upsert({
          section_name: 'hero',
          content: newData,
        }, {
          onConflict: 'section_name'
        });

      if (error) {
        console.error('Error updating hero data:', error);
        setError(error.message);
        return { success: false, error: error.message };
      }

      setHeroData({ section_name: 'hero', content: newData });
      setError(null);
      return { success: true, data };
    } catch (err) {
      console.error('Unexpected error during update:', err);
      setError('Failed to update hero data');
      return { success: false, error: 'Failed to update hero data' };
    }
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  return { 
    heroData, 
    loading, 
    error, 
    updateHeroData, 
    refetch: fetchHeroData 
  };
};