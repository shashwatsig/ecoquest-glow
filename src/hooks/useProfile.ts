import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface UserProfile {
  id: string;
  student_number: string;
  points: number;
  level: number;
  streak_count: number;
  total_co2_saved: number;
  total_water_saved: number;
  total_energy_saved: number;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          await createProfile();
        } else {
          throw error;
        }
      } else {
        setProfile(data);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          student_number: user.email || '',
          points: 0,
          level: 1,
          streak_count: 0,
          total_co2_saved: 0,
          total_water_saved: 0,
          total_energy_saved: 0
        })
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error creating profile:', error);
      toast({
        title: "Error creating profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const addPoints = async (points: number) => {
    if (!profile) return;

    const newPoints = profile.points + points;
    const newLevel = Math.floor(newPoints / 1000) + 1;
    
    return await updateProfile({
      points: newPoints,
      level: newLevel
    });
  };

  const addImpact = async (impactData: {
    co2Saved?: number;
    waterSaved?: number;
    energySaved?: number;
  }) => {
    if (!profile) return;

    const updates: Partial<UserProfile> = {};
    
    if (impactData.co2Saved) {
      updates.total_co2_saved = profile.total_co2_saved + impactData.co2Saved;
    }
    if (impactData.waterSaved) {
      updates.total_water_saved = profile.total_water_saved + impactData.waterSaved;
    }
    if (impactData.energySaved) {
      updates.total_energy_saved = profile.total_energy_saved + impactData.energySaved;
    }

    return await updateProfile(updates);
  };

  const incrementStreak = async () => {
    if (!profile) return;
    
    return await updateProfile({
      streak_count: profile.streak_count + 1
    });
  };

  return {
    profile,
    loading,
    updateProfile,
    addPoints,
    addImpact,
    incrementStreak,
    refetch: fetchProfile
  };
};