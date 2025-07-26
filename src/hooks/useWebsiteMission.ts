import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWebsiteMission = () => {
  const [missionData, setMissionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMissionData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_name', 'mission')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Failed to fetch mission data:', error);
        setError(error.message);
      } else {
        setMissionData(data);
        setError(null);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateMissionData = async (newData: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setError('Authentication required');
        return { success: false, error: 'Authentication required' };
      }

      const { data, error } = await supabase
        .from('website_content')
        .upsert({
          section_name: 'mission',
          content: newData,
        }, {
          onConflict: 'section_name'
        });

      if (error) {
        console.error('Error updating mission data:', error);
        setError(error.message);
        return { success: false, error: error.message };
      }

      setMissionData({ section_name: 'mission', content: newData });
      setError(null);
      return { success: true, data };
    } catch (err) {
      console.error('Unexpected error during update:', err);
      setError('Failed to update mission data');
      return { success: false, error: 'Failed to update mission data' };
    }
  };

  useEffect(() => {
    fetchMissionData();
  }, []);

  return { 
    missionData, 
    loading, 
    error, 
    updateMissionData, 
    refetch: fetchMissionData 
  };
};