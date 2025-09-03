-- Remove the problematic public read policy from profiles table
DROP POLICY IF EXISTS "Users can view leaderboard data" ON public.profiles;

-- Create a function to get leaderboard data safely (no personal info)
CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE (
  rank bigint,
  points integer,
  level integer,
  total_co2_saved numeric,
  total_water_saved numeric,
  total_energy_saved numeric,
  streak_count integer,
  display_name text
) 
LANGUAGE sql 
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    ROW_NUMBER() OVER (ORDER BY p.points DESC, p.level DESC, p.created_at ASC) as rank,
    p.points,
    p.level,
    p.total_co2_saved,
    p.total_water_saved,
    p.total_energy_saved,
    p.streak_count,
    CONCAT('User #', ROW_NUMBER() OVER (ORDER BY p.points DESC, p.level DESC, p.created_at ASC)) as display_name
  FROM public.profiles p
  WHERE p.points > 0 OR p.level > 1
  ORDER BY p.points DESC, p.level DESC, p.created_at ASC;
$$;