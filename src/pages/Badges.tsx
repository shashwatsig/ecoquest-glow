import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  Star, 
  Crown, 
  Shield, 
  Zap, 
  Droplets, 
  Recycle, 
  TreePine,
  Lock,
  CheckCircle
} from 'lucide-react';

const Badges = () => {
  const earnedBadges = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Complete your first environmental challenge',
      category: 'starter',
      icon: Star,
      color: 'accent',
      rarity: 'Common',
      earnedDate: '2024-01-15',
      progress: 100
    },
    {
      id: 2,
      name: 'Water Guardian',
      description: 'Save 1000 liters of water through conservation',
      category: 'water',
      icon: Droplets,
      color: 'secondary',
      rarity: 'Rare',
      earnedDate: '2024-02-03',
      progress: 100
    },
    {
      id: 3,
      name: 'Recycling Hero',
      description: 'Successfully recycle 50 items',
      category: 'waste',
      icon: Recycle,
      color: 'primary',
      rarity: 'Uncommon',
      earnedDate: '2024-02-20',
      progress: 100
    },
    {
      id: 4,
      name: 'Energy Saver',
      description: 'Reduce energy consumption by 25% for a month',
      category: 'energy',
      icon: Zap,
      color: 'accent',
      rarity: 'Rare',
      earnedDate: '2024-03-01',
      progress: 100
    }
  ];

  const inProgressBadges = [
    {
      id: 5,
      name: 'Tree Lover',
      description: 'Plant or sponsor 10 trees',
      category: 'biodiversity',
      icon: TreePine,
      color: 'primary',
      rarity: 'Epic',
      progress: 70,
      currentCount: 7,
      targetCount: 10
    },
    {
      id: 6,
      name: 'Eco Warrior',
      description: 'Complete 25 environmental challenges',
      category: 'achievement',
      icon: Shield,
      color: 'secondary',
      rarity: 'Epic',
      progress: 88,
      currentCount: 22,
      targetCount: 25
    }
  ];

  const lockedBadges = [
    {
      id: 7,
      name: 'Climate Champion',
      description: 'Reduce carbon footprint by 50% over 6 months',
      category: 'climate',
      icon: Crown,
      color: 'accent',
      rarity: 'Legendary',
      requirement: 'Reach Level 20',
      progress: 0
    },
    {
      id: 8,
      name: 'Planet Protector',
      description: 'Lead 10 community environmental initiatives',
      category: 'leadership',
      icon: Award,
      color: 'primary',
      rarity: 'Legendary',
      requirement: 'Complete 50 challenges',
      progress: 0
    }
  ];

  const categories = [
    { id: 'all', name: 'All Badges', icon: Award, count: earnedBadges.length + inProgressBadges.length + lockedBadges.length },
    { id: 'earned', name: 'Earned', icon: CheckCircle, count: earnedBadges.length },
    { id: 'progress', name: 'In Progress', icon: Star, count: inProgressBadges.length },
    { id: 'locked', name: 'Locked', icon: Lock, count: lockedBadges.length }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-muted-foreground border-muted-foreground/30';
      case 'Uncommon': return 'text-accent border-accent/30';
      case 'Rare': return 'text-secondary border-secondary/30';
      case 'Epic': return 'text-primary border-primary/30';
      case 'Legendary': return 'text-accent border-accent/30 bg-accent/10';
      default: return 'text-muted-foreground border-muted-foreground/30';
    }
  };

  const renderBadgeCard = (badge: any, isEarned = false, isLocked = false) => {
    const Icon = badge.icon;
    return (
      <Card key={badge.id} className={`glass-card hover:scale-[1.02] transition-all duration-300 ${
        isEarned ? `hover:glow-${badge.color}` : isLocked ? 'opacity-60' : ''
      }`}>
        <CardContent className="p-6 text-center">
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center relative ${
            isLocked ? 'bg-muted/20 border border-muted/30' : 
            `bg-${badge.color}/20 backdrop-blur-lg border border-${badge.color}/30`
          }`}>
            {isLocked ? (
              <Lock className="w-8 h-8 text-muted-foreground" />
            ) : (
              <>
                <Icon className={`w-8 h-8 text-${badge.color}`} />
                {isEarned && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-accent-foreground" />
                  </div>
                )}
              </>
            )}
          </div>

          <h3 className="font-semibold text-lg mb-2 text-foreground">{badge.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {badge.description}
          </p>

          <div className="space-y-3">
            <Badge className={`${getRarityColor(badge.rarity)} text-xs`}>
              {badge.rarity}
            </Badge>

            {badge.progress !== undefined && badge.progress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{badge.progress}%</span>
                </div>
                <Progress value={badge.progress} className="h-2" />
                {badge.currentCount && badge.targetCount && (
                  <div className="text-xs text-muted-foreground">
                    {badge.currentCount} / {badge.targetCount}
                  </div>
                )}
              </div>
            )}

            {badge.earnedDate && (
              <div className="text-xs text-muted-foreground">
                Earned: {new Date(badge.earnedDate).toLocaleDateString()}
              </div>
            )}

            {badge.requirement && (
              <div className="text-xs text-muted-foreground">
                Requirement: {badge.requirement}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="glass-card p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Badge Collection</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your environmental achievements and unlock new badges
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="glass-card hover:glow-primary transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold gradient-text">{category.count}</div>
                  <div className="text-sm text-muted-foreground">{category.name}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Badge Categories */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="glass-card p-4">
            <TabsList className="grid w-full grid-cols-4 bg-transparent">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="glass-button data-[state=active]:glow-primary flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="space-y-8">
              {/* Earned Badges */}
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  Earned Badges
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {earnedBadges.map(badge => renderBadgeCard(badge, true, false))}
                </div>
              </div>

              {/* In Progress */}
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-secondary" />
                  In Progress
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {inProgressBadges.map(badge => renderBadgeCard(badge, false, false))}
                </div>
              </div>

              {/* Locked Badges */}
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                  Locked Badges
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {lockedBadges.map(badge => renderBadgeCard(badge, false, true))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="earned">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {earnedBadges.map(badge => renderBadgeCard(badge, true, false))}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {inProgressBadges.map(badge => renderBadgeCard(badge, false, false))}
            </div>
          </TabsContent>

          <TabsContent value="locked">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {lockedBadges.map(badge => renderBadgeCard(badge, false, true))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Badges;