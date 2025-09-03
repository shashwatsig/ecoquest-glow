-- Drop the problematic view
DROP VIEW IF EXISTS public.leaderboard;

-- Create a secure function instead of a view to avoid SECURITY DEFINER issues
CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE (
  rank bigint,
  points integer,
  level integer,
  total_co2_saved numeric,
  total_water_saved numeric,
  total_energy_saved numeric,
  streak_count integer,
  display_name text,
  created_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY INVOKER
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
    -- Generate anonymous display name based on rank to avoid identification
    CONCAT('User #', ROW_NUMBER() OVER (ORDER BY p.points DESC, p.level DESC, p.created_at ASC)) as display_name,
    p.created_at
  FROM public.profiles p
  WHERE p.points > 0 OR p.level > 1
  ORDER BY p.points DESC, p.level DESC, p.created_at ASC;
$$;

-- Grant execute permission to all users
GRANT EXECUTE ON FUNCTION public.get_leaderboard() TO anon, authenticated;