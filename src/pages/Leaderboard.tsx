import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Trophy, Medal, Star, TrendingUp, Calendar, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  points: number;
  level: number;
  total_co2_saved: number;
  total_water_saved: number;
  total_energy_saved: number;
  streak_count: number;
  display_name: string;
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Fetching leaderboard data...');
        const { data, error } = await supabase
          .rpc('get_leaderboard');
        console.log('Leaderboard response:', { data, error });
        if (error) throw error;
        setLeaderboardData(data || []);
        console.log('Set leaderboard data:', data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Generate avatars and badges based on user stats
  const getAvatar = (rank: number) => {
    const avatars = ['🌱', '🌊', '🌳', '☀️', '🌍', '💨', '🐋', '⚡', '🌿', '🔥'];
    return avatars[rank % avatars.length];
  };

  const getBadge = (entry: LeaderboardEntry) => {
    if (entry.total_co2_saved > 100) return 'CO₂ Hero';
    if (entry.total_water_saved > 500) return 'Water Guardian';
    if (entry.total_energy_saved > 200) return 'Energy Master';
    if (entry.streak_count > 10) return 'Streak Champion';
    if (entry.level > 15) return 'Eco Master';
    return 'Eco Warrior';
  };

  // For demo purposes, we'll use the same data for all tabs
  // In a real app, you'd filter by time periods
  const formatLeaderboardData = (data: LeaderboardEntry[]) => {
    return data.map(entry => ({
      rank: entry.rank,
      name: entry.display_name,
      points: entry.points,
      avatar: getAvatar(entry.rank),
      level: entry.level,
      badge: getBadge(entry),
      change: '0' // Would need historical data for real changes
    }));
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-accent" />;
      case 2: return <Trophy className="w-5 h-5 text-secondary" />;
      case 3: return <Medal className="w-5 h-5 text-primary" />;
      default: return <span className="text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'border-accent/30 bg-accent/10 glow-accent';
      case 2: return 'border-secondary/30 bg-secondary/10 glow-secondary';
      case 3: return 'border-primary/30 bg-primary/10 glow-primary';
      default: return 'border-glass-border/30';
    }
  };

  const getChangeIcon = (change: string) => {
    if (change.includes('+')) return <TrendingUp className="w-4 h-4 text-accent" />;
    if (change.includes('-')) return <TrendingUp className="w-4 h-4 text-destructive rotate-180" />;
    return <span className="w-4 h-4 flex items-center justify-center text-muted-foreground">—</span>;
  };

  const currentLeaderboard = formatLeaderboardData(leaderboardData);

  const renderLeaderboard = () => {
    if (loading) {
      return (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 animate-pulse">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div className="w-12 h-12 bg-muted rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="w-8 h-4 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (currentLeaderboard.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No leaderboard data available yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Start completing challenges to see rankings!</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {currentLeaderboard.map((leader) => (
          <Card key={leader.rank} className={`glass-card hover:scale-[1.01] transition-all duration-300 ${getRankColor(leader.rank)}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="flex items-center justify-center w-10 h-10">
                  {getRankIcon(leader.rank)}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-2xl">
                  {leader.avatar}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{leader.name}</h3>
                    <Badge variant="secondary" className="glass-button text-xs">
                      Level {leader.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="glass-button text-xs border-primary/30 bg-primary/10">
                      {leader.badge}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {leader.points.toLocaleString()} pts
                    </span>
                  </div>
                </div>

                {/* Change Indicator */}
                <div className="flex items-center gap-1">
                  {getChangeIcon(leader.change)}
                  <span className={`text-sm font-medium ${
                    leader.change.includes('+') ? 'text-accent' :
                    leader.change.includes('-') ? 'text-destructive' :
                    'text-muted-foreground'
                  }`}>
                    {leader.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="glass-card p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Eco Champions Leaderboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              See how you rank among the world's environmental heroes
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card hover:glow-primary transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">This Week</div>
              <div className="text-sm text-muted-foreground">Current Period</div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glow-secondary transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary">8,247</div>
              <div className="text-sm text-muted-foreground">Active Players</div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glow-accent transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">156</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="weekly" className="space-y-6">
          <div className="glass-card p-4">
            <TabsList className="grid w-full grid-cols-3 bg-transparent">
              <TabsTrigger 
                value="weekly" 
                className="glass-button data-[state=active]:glow-primary flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Weekly
              </TabsTrigger>
              <TabsTrigger 
                value="monthly" 
                className="glass-button data-[state=active]:glow-secondary flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                Monthly
              </TabsTrigger>
              <TabsTrigger 
                value="alltime" 
                className="glass-button data-[state=active]:glow-accent flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                All Time
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="weekly">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Weekly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderLeaderboard()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-secondary" />
                  Monthly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderLeaderboard()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alltime">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  All-Time Champions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderLeaderboard()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User's Position */}
        <div className="mt-8">
          <Card className="glass-card border-primary/30 bg-primary/10 glow-primary">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Your Current Position</h3>
                <div className="flex items-center justify-center gap-8">
                  <div>
                    <div className="text-2xl font-bold gradient-text">#42</div>
                    <div className="text-sm text-muted-foreground">Weekly Rank</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">847</div>
                    <div className="text-sm text-muted-foreground">Points This Week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">+5</div>
                    <div className="text-sm text-muted-foreground">Positions Gained</div>
                  </div>
                </div>
                <Button className="glass-button glow-primary mt-4">
                  View Full Rankings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;