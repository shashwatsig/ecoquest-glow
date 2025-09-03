-- Remove the problematic public read policy from profiles table
DROP POLICY IF EXISTS "Users can view leaderboard data" ON public.profiles;

-- Create a secure leaderboard view that only exposes non-identifying data
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
  ROW_NUMBER() OVER (ORDER BY points DESC, level DESC, created_at ASC) as rank,
  points,
  level,
  total_co2_saved,
  total_water_saved,
  total_energy_saved,
  streak_count,
  -- Generate anonymous display name based on rank to avoid identification
  CONCAT('User #', ROW_NUMBER() OVER (ORDER BY points DESC, level DESC, created_at ASC)) as display_name,
  created_at
FROM public.profiles
WHERE points > 0 OR level > 1
ORDER BY points DESC, level DESC, created_at ASC;

-- Grant access to the leaderboard view
GRANT SELECT ON public.leaderboard TO anon, authenticated;