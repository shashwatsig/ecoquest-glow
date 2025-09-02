import { useState, useEffect } from 'react';

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
  const [userData, setUserData] = useState<UserData>(DEFAULT_USER_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
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
  }, []);

  const updateUserData = (updates: Partial<UserData>) => {
    const newData = { ...userData, ...updates };
    setUserData(newData);
    localStorage.setItem('ecoquest-user-data', JSON.stringify(newData));
  };

  const addPoints = (points: number) => {
    const newPoints = userData.points + points;
    const newLevel = Math.floor(newPoints / 1000) + 1; // Level up every 1000 points
    updateUserData({ 
      points: newPoints, 
      level: newLevel 
    });
  };

  const completeChallenge = (challengeId: string, points: number, impactData?: {
    co2Saved?: number;
    waterSaved?: number;
    energySaved?: number;
  }) => {
    const updates: Partial<UserData> = {
      completedChallenges: [...userData.completedChallenges, challengeId],
      activeChallenges: userData.activeChallenges.filter(id => id !== challengeId),
      points: userData.points + points,
      level: Math.floor((userData.points + points) / 1000) + 1
    };

    if (impactData) {
      if (impactData.co2Saved) updates.totalCO2Saved = userData.totalCO2Saved + impactData.co2Saved;
      if (impactData.waterSaved) updates.totalWaterSaved = userData.totalWaterSaved + impactData.waterSaved;
      if (impactData.energySaved) updates.totalEnergySaved = userData.totalEnergySaved + impactData.energySaved;
    }

    updateUserData(updates);
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
    isLoading,
    updateUserData,
    addPoints,
    completeChallenge,
    startChallenge,
    addBadge,
    resetUserData
  };
};