import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Trophy, Medal, Star, TrendingUp, Calendar, Globe } from 'lucide-react';

const Leaderboard = () => {
  const weeklyLeaders = [
    { rank: 1, name: 'Emma Green', points: 1250, avatar: '🌱', level: 18, badge: 'Eco Master', change: '+2' },
    { rank: 2, name: 'Alex Rivers', points: 1180, avatar: '🌊', level: 16, badge: 'Water Guardian', change: '0' },
    { rank: 3, name: 'Maya Forest', points: 1120, avatar: '🌳', level: 17, badge: 'Tree Lover', change: '-1' },
    { rank: 4, name: 'Sam Solar', points: 1080, avatar: '☀️', level: 15, badge: 'Energy Saver', change: '+3' },
    { rank: 5, name: 'Luna Earth', points: 1050, avatar: '🌍', level: 16, badge: 'Planet Protector', change: '+1' },
    { rank: 6, name: 'Rio Wind', points: 1020, avatar: '💨', level: 14, badge: 'Air Champion', change: '-2' },
    { rank: 7, name: 'Sage Ocean', points: 980, avatar: '🐋', level: 15, badge: 'Sea Defender', change: '+1' },
    { rank: 8, name: 'Ivy Storm', points: 950, avatar: '⚡', level: 13, badge: 'Storm Rider', change: '0' }
  ];

  const monthlyLeaders = [
    { rank: 1, name: 'Maya Forest', points: 4850, avatar: '🌳', level: 17, badge: 'Tree Lover', change: '+1' },
    { rank: 2, name: 'Emma Green', points: 4720, avatar: '🌱', level: 18, badge: 'Eco Master', change: '0' },
    { rank: 3, name: 'Alex Rivers', points: 4650, avatar: '🌊', level: 16, badge: 'Water Guardian', change: '+2' },
    { rank: 4, name: 'Sam Solar', points: 4580, avatar: '☀️', level: 15, badge: 'Energy Saver', change: '-1' },
    { rank: 5, name: 'Luna Earth', points: 4520, avatar: '🌍', level: 16, badge: 'Planet Protector', change: '+3' },
    { rank: 6, name: 'Rio Wind', points: 4480, avatar: '💨', level: 14, badge: 'Air Champion', change: '-2' },
    { rank: 7, name: 'Sage Ocean', points: 4420, avatar: '🐋', level: 15, badge: 'Sea Defender', change: '0' },
    { rank: 8, name: 'Ivy Storm', points: 4380, avatar: '⚡', level: 13, badge: 'Storm Rider', change: '+1' }
  ];

  const allTimeLeaders = [
    { rank: 1, name: 'Emma Green', points: 12450, avatar: '🌱', level: 18, badge: 'Eco Master', change: '0' },
    { rank: 2, name: 'Maya Forest', points: 11820, avatar: '🌳', level: 17, badge: 'Tree Lover', change: '0' },
    { rank: 3, name: 'Alex Rivers', points: 11650, avatar: '🌊', level: 16, badge: 'Water Guardian', change: '0' },
    { rank: 4, name: 'Luna Earth', points: 11580, avatar: '🌍', level: 16, badge: 'Planet Protector', change: '0' },
    { rank: 5, name: 'Sam Solar', points: 11420, avatar: '☀️', level: 15, badge: 'Energy Saver', change: '0' },
    { rank: 6, name: 'Rio Wind', points: 11380, avatar: '💨', level: 14, badge: 'Air Champion', change: '0' },
    { rank: 7, name: 'Sage Ocean', points: 11280, avatar: '🐋', level: 15, badge: 'Sea Defender', change: '0' },
    { rank: 8, name: 'Ivy Storm', points: 11180, avatar: '⚡', level: 13, badge: 'Storm Rider', change: '0' }
  ];

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

  const renderLeaderboard = (leaders: typeof weeklyLeaders) => (
    <div className="space-y-3">
      {leaders.map((leader, index) => (
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
                {renderLeaderboard(weeklyLeaders)}
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
                {renderLeaderboard(monthlyLeaders)}
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
                {renderLeaderboard(allTimeLeaders)}
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