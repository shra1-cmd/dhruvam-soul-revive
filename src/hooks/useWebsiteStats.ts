import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWebsiteStats = () => {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatsData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_stats')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Failed to fetch stats data:', error);
        setError(error.message);
      } else {
        setStatsData(data);
        setError(null);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateStatsData = async (newData: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setError('Authentication required');
        return { success: false, error: 'Authentication required' };
      }

      const { data, error } = await supabase
        .from('website_stats')
        .upsert({
          ...newData,
          section_name: 'stats',
        }, {
          onConflict: 'section_name'
        });

      if (error) {
        console.error('Error updating stats data:', error);
        setError(error.message);
        return { success: false, error: error.message };
      }

      setStatsData({ ...newData, section_name: 'stats' });
      setError(null);
      return { success: true, data };
    } catch (err) {
      console.error('Unexpected error during update:', err);
      setError('Failed to update stats data');
      return { success: false, error: 'Failed to update stats data' };
    }
  };

  useEffect(() => {
    fetchStatsData();
  }, []);

  return { 
    statsData, 
    loading, 
    error, 
    updateStatsData, 
    refetch: fetchStatsData 
  };
};