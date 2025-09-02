-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  student_number TEXT,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  total_co2_saved DECIMAL DEFAULT 0,
  total_water_saved DECIMAL DEFAULT 0,
  total_energy_saved DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenges table
CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  duration_days INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  icon TEXT,
  color_theme TEXT,
  impact_co2 DECIMAL DEFAULT 0,
  impact_water DECIMAL DEFAULT 0,
  impact_energy DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_tasks table
CREATE TABLE public.challenge_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  day_number INTEGER NOT NULL,
  points INTEGER NOT NULL,
  requires_proof BOOLEAN DEFAULT FALSE,
  proof_type TEXT CHECK (proof_type IN ('photo', 'data', 'text')),
  instructions TEXT,
  education_tip TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_challenges table to track user participation
CREATE TABLE public.user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('active', 'completed', 'paused')) DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  current_day INTEGER DEFAULT 1,
  points_earned INTEGER DEFAULT 0,
  streak_count INTEGER DEFAULT 0,
  UNIQUE(user_id, challenge_id)
);

-- Create user_challenge_tasks table to track task completion
CREATE TABLE public.user_challenge_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_challenge_id UUID REFERENCES public.user_challenges(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.challenge_tasks(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE,
  proof_data JSONB,
  points_earned INTEGER DEFAULT 0,
  UNIQUE(user_challenge_id, task_id)
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  criteria JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_badges table
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for challenges (public read)
CREATE POLICY "Anyone can view challenges" ON public.challenges
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view challenge tasks" ON public.challenge_tasks
  FOR SELECT USING (true);

-- Create RLS policies for user_challenges
CREATE POLICY "Users can view their own challenges" ON public.user_challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenges" ON public.user_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenges" ON public.user_challenges
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for user_challenge_tasks
CREATE POLICY "Users can view their own challenge tasks" ON public.user_challenge_tasks
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.user_challenges WHERE id = user_challenge_id));

CREATE POLICY "Users can insert their own challenge tasks" ON public.user_challenge_tasks
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM public.user_challenges WHERE id = user_challenge_id));

CREATE POLICY "Users can update their own challenge tasks" ON public.user_challenge_tasks
  FOR UPDATE USING (auth.uid() = (SELECT user_id FROM public.user_challenges WHERE id = user_challenge_id));

-- Create RLS policies for badges (public read)
CREATE POLICY "Anyone can view badges" ON public.badges
  FOR SELECT USING (true);

-- Create RLS policies for user_badges
CREATE POLICY "Users can view their own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own badges" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- For leaderboard, allow users to see other users' public stats
CREATE POLICY "Users can view leaderboard data" ON public.profiles
  FOR SELECT USING (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, student_number)
  VALUES (NEW.id, '');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample challenges
INSERT INTO public.challenges (title, description, difficulty, duration_days, total_points, icon, color_theme, impact_co2, impact_water, impact_energy) VALUES
('Water Conservation Master', '6-day challenge with daily water-saving tasks', 'hard', 6, 180, 'Droplets', 'blue', 15, 500, 0),
('Zero Waste Week', '7-day challenge to eliminate waste', 'hard', 7, 300, 'Recycle', 'green', 25, 0, 0),
('Urban Tree Planter', '30-day tree planting challenge', 'easy', 30, 200, 'TreePine', 'emerald', 50, 0, 0),
('Energy Efficiency Hero', '21-day energy saving challenge', 'medium', 21, 275, 'Zap', 'yellow', 30, 0, 100),
('Sustainable Commuter', '7-day eco-friendly transport challenge', 'easy', 7, 150, 'Car', 'purple', 20, 0, 0),
('Green Home Makeover', '30-day home sustainability challenge', 'medium', 30, 320, 'Home', 'teal', 40, 200, 150);

-- Insert sample badges
INSERT INTO public.badges (name, description, icon, criteria) VALUES
('First Challenge', 'Complete your first challenge', '🏆', '{"challenges_completed": 1}'),
('Water Saver', 'Save 100 liters of water', '💧', '{"water_saved": 100}'),
('Energy Hero', 'Save 50 kWh of energy', '⚡', '{"energy_saved": 50}'),
('Carbon Fighter', 'Prevent 10kg of CO2 emissions', '🌱', '{"co2_saved": 10}'),
('Streak Master', 'Maintain a 7-day streak', '🔥', '{"streak_days": 7}'),
('Point Collector', 'Earn 1000 points', '⭐', '{"points_earned": 1000}');