import { useState, useEffect } from 'react';
import { useProfile } from './useProfile';
import { useAuth } from './useAuth';

interface UserData {
  studentNumber: string;
  points: number;
  level: number;
  completedChallenges: string[];
  activeChallenges: string[];
  streakCount: number;
  totalCO2Saved: number;
  totalWaterSaved: number;
  totalEnergySaved: number;
  badges: string[];
}

const DEFAULT_USER_DATA: UserData = {
  studentNumber: '',
  points: 0,
  level: 1,
  completedChallenges: [],
  activeChallenges: [],
  streakCount: 0,
  totalCO2Saved: 0,
  totalWaterSaved: 0,
  totalEnergySaved: 0,
  badges: []
};

export const useUserData = () => {
  const { isAuthenticated } = useAuth();
  const { profile, loading: profileLoading, addPoints: profileAddPoints, addImpact } = useProfile();
  const [userData, setUserData] = useState<UserData>(DEFAULT_USER_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && profile) {
      // Use profile data when authenticated
      const savedLocalData = localStorage.getItem('ecoquest-user-data');
      let localData = {};
      if (savedLocalData) {
        try {
          localData = JSON.parse(savedLocalData);
        } catch (error) {
          console.error('Error parsing local data:', error);
        }
      }

      setUserData({
        studentNumber: profile.student_number,
        points: profile.points,
        level: profile.level,
        streakCount: profile.streak_count,
        totalCO2Saved: profile.total_co2_saved,
        totalWaterSaved: profile.total_water_saved,
        totalEnergySaved: profile.total_energy_saved,
        // Keep local-only data for now
        completedChallenges: (localData as any)?.completedChallenges || [],
        activeChallenges: (localData as any)?.activeChallenges || [],
        badges: (localData as any)?.badges || []
      });
      setIsLoading(false);
    } else if (!isAuthenticated) {
      // Use localStorage for non-authenticated users
      const savedData = localStorage.getItem('ecoquest-user-data');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setUserData({ ...DEFAULT_USER_DATA, ...parsed });
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUserData(DEFAULT_USER_DATA);
        }
      }
      setIsLoading(false);
    }
  }, [isAuthenticated, profile]);

  const updateUserData = (updates: Partial<UserData>) => {
    const newData = { ...userData, ...updates };
    setUserData(newData);
    localStorage.setItem('ecoquest-user-data', JSON.stringify(newData));
  };

  const addPoints = async (points: number) => {
    if (isAuthenticated && profile) {
      // Update in database for authenticated users
      try {
        await profileAddPoints(points);
      } catch (error) {
        console.error('Error adding points to profile:', error);
      }
    } else {
      // Update localStorage for non-authenticated users
      const newPoints = userData.points + points;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      updateUserData({ 
        points: newPoints, 
        level: newLevel 
      });
    }
  };

  const completeChallenge = async (challengeId: string, points: number, impactData?: {
    co2Saved?: number;
    waterSaved?: number;
    energySaved?: number;
  }) => {
    const updates: Partial<UserData> = {
      completedChallenges: [...userData.completedChallenges, challengeId],
      activeChallenges: userData.activeChallenges.filter(id => id !== challengeId)
    };

    updateUserData(updates);

    if (isAuthenticated && profile) {
      // Update database for authenticated users
      try {
        await profileAddPoints(points);
        if (impactData) {
          await addImpact(impactData);
        }
      } catch (error) {
        console.error('Error updating profile after challenge completion:', error);
      }
    } else {
      // Update localStorage for non-authenticated users
      updates.points = userData.points + points;
      updates.level = Math.floor((userData.points + points) / 1000) + 1;
      
      if (impactData) {
        if (impactData.co2Saved) updates.totalCO2Saved = userData.totalCO2Saved + impactData.co2Saved;
        if (impactData.waterSaved) updates.totalWaterSaved = userData.totalWaterSaved + impactData.waterSaved;
        if (impactData.energySaved) updates.totalEnergySaved = userData.totalEnergySaved + impactData.energySaved;
      }
      
      updateUserData(updates);
    }
  };

  const startChallenge = (challengeId: string) => {
    if (!userData.activeChallenges.includes(challengeId)) {
      updateUserData({
        activeChallenges: [...userData.activeChallenges, challengeId]
      });
    }
  };

  const addBadge = (badgeId: string) => {
    if (!userData.badges.includes(badgeId)) {
      updateUserData({
        badges: [...userData.badges, badgeId]
      });
    }
  };

  const resetUserData = () => {
    setUserData(DEFAULT_USER_DATA);
    localStorage.removeItem('ecoquest-user-data');
  };

  return {
    userData,
    isLoading: isLoading || profileLoading,
    updateUserData,
    addPoints,
    completeChallenge,
    startChallenge,
    addBadge,
    resetUserData
  };
};