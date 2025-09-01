import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Trophy, 
  Award, 
  Zap, 
  Droplets, 
  Recycle, 
  TreePine, 
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react';

const Dashboard = () => {
  const userStats = {
    level: 15,
    xp: 2340,
    nextLevelXp: 3000,
    totalChallenges: 47,
    weeklyStreak: 12,
    co2Saved: 234.5
  };

  const recentChallenges = [
    {
      id: 1,
      title: 'Water Conservation Hero',
      description: 'Reduce water usage by 20% this week',
      progress: 85,
      points: 150,
      icon: Droplets,
      color: 'secondary'
    },
    {
      id: 2,
      title: 'Recycling Champion',
      description: 'Properly sort and recycle for 7 days',
      progress: 100,
      points: 200,
      icon: Recycle,
      color: 'primary'
    },
    {
      id: 3,
      title: 'Green Commuter',
      description: 'Use eco-friendly transport for a week',
      progress: 60,
      points: 180,
      icon: TreePine,
      color: 'accent'
    }
  ];

  const achievements = [
    { name: 'First Steps', earned: true },
    { name: 'Water Saver', earned: true },
    { name: 'Eco Warrior', earned: true },
    { name: 'Climate Hero', earned: false },
    { name: 'Planet Guardian', earned: false }
  ];

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="glass-card p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome back, <span className="gradient-text">Eco Champion!</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to make a difference today? Let's continue your environmental journey.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover:glow-primary transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">Level {userStats.level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glow-secondary transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary">{userStats.totalChallenges}</div>
              <div className="text-sm text-muted-foreground">Challenges Done</div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glow-accent transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">{userStats.weeklyStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glow-primary transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{userStats.co2Saved}kg</div>
              <div className="text-sm text-muted-foreground">CO₂ Saved</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Level {userStats.level}</span>
                  <span className="text-sm text-muted-foreground">Level {userStats.level + 1}</span>
                </div>
                <Progress value={(userStats.xp / userStats.nextLevelXp) * 100} className="h-3" />
                <div className="text-center text-sm text-muted-foreground">
                  {userStats.xp} / {userStats.nextLevelXp} XP
                </div>
              </CardContent>
            </Card>

            {/* Active Challenges */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentChallenges.map((challenge) => {
                  const Icon = challenge.icon;
                  return (
                    <div key={challenge.id} className="glass-card p-4 hover:scale-[1.02] transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-${challenge.color}/20 backdrop-blur-lg border border-${challenge.color}/30 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${challenge.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                            <Badge variant="secondary" className="glass-button">
                              {challenge.points} pts
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {challenge.description}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{challenge.progress}%</span>
                            </div>
                            <Progress value={challenge.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full glass-button glow-primary">
                  <Target className="w-4 h-4 mr-2" />
                  Browse Challenges
                </Button>
                <Button variant="outline" className="w-full glass-button border-secondary/30 text-secondary hover:glow-secondary">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Leaderboard
                </Button>
                <Button variant="outline" className="w-full glass-button border-accent/30 text-accent hover:glow-accent">
                  <Award className="w-4 h-4 mr-2" />
                  My Badges
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${achievement.earned ? 'glass-card' : 'opacity-50'}`}>
                    <div className={`w-8 h-8 rounded-lg ${achievement.earned ? 'bg-accent/20 border border-accent/30' : 'bg-muted/20 border border-muted/30'} flex items-center justify-center`}>
                      <Award className={`w-4 h-4 ${achievement.earned ? 'text-accent' : 'text-muted-foreground'}`} />
                    </div>
                    <span className={`text-sm ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {achievement.name}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;