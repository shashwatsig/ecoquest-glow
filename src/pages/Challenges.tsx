import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Droplets, 
  Recycle, 
  TreePine, 
  Zap, 
  Car, 
  Home, 
  ShoppingCart,
  Clock,
  Star,
  CheckCircle
} from 'lucide-react';

const Challenges = () => {
  const [activeTab, setActiveTab] = useState('all');

  const challenges = [
    {
      id: 1,
      title: 'Water Conservation Master',
      description: 'Reduce your water usage by 25% over the next 2 weeks through mindful conservation practices.',
      category: 'water',
      difficulty: 'Medium',
      duration: '14 days',
      points: 250,
      participants: 1240,
      icon: Droplets,
      color: 'secondary',
      status: 'available'
    },
    {
      id: 2,
      title: 'Zero Waste Week',
      description: 'Challenge yourself to produce zero waste for an entire week. Reduce, reuse, and recycle everything!',
      category: 'waste',
      difficulty: 'Hard',
      duration: '7 days',
      points: 300,
      participants: 890,
      icon: Recycle,
      color: 'primary',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Urban Tree Planter',
      description: 'Plant or sponsor the planting of 5 trees in your local community this month.',
      category: 'biodiversity',
      difficulty: 'Easy',
      duration: '30 days',
      points: 200,
      participants: 2100,
      icon: TreePine,
      color: 'accent',
      status: 'available'
    },
    {
      id: 4,
      title: 'Energy Efficiency Hero',
      description: 'Reduce your home energy consumption by 20% using smart practices and monitoring.',
      category: 'energy',
      difficulty: 'Medium',
      duration: '21 days',
      points: 275,
      participants: 1560,
      icon: Zap,
      color: 'primary',
      status: 'completed'
    },
    {
      id: 5,
      title: 'Sustainable Commuter',
      description: 'Use eco-friendly transportation (bike, walk, public transport) for all trips this week.',
      category: 'transport',
      difficulty: 'Easy',
      duration: '7 days',
      points: 150,
      participants: 3200,
      icon: Car,
      color: 'secondary',
      status: 'available'
    },
    {
      id: 6,
      title: 'Green Home Makeover',
      description: 'Implement 10 sustainable practices in your home environment over the next month.',
      category: 'lifestyle',
      difficulty: 'Medium',
      duration: '30 days',
      points: 320,
      participants: 780,
      icon: Home,
      color: 'accent',
      status: 'available'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Challenges', icon: Star },
    { id: 'water', name: 'Water Conservation', icon: Droplets },
    { id: 'waste', name: 'Waste Reduction', icon: Recycle },
    { id: 'energy', name: 'Energy Efficiency', icon: Zap },
    { id: 'transport', name: 'Green Transport', icon: Car },
    { id: 'lifestyle', name: 'Sustainable Living', icon: Home },
  ];

  const filteredChallenges = activeTab === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === activeTab);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-accent';
      case 'Medium': return 'text-secondary';
      case 'Hard': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'border-primary/30 bg-primary/10';
      case 'in-progress': return 'border-secondary/30 bg-secondary/10';
      case 'completed': return 'border-accent/30 bg-accent/10';
      default: return 'border-muted/30 bg-muted/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Join Challenge';
      case 'in-progress': return 'Continue';
      case 'completed': return 'Completed';
      default: return 'Join';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="glass-card p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Environmental Challenges</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Take on exciting challenges and make a real impact on our planet
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="glass-card p-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-2 bg-transparent">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="glass-button flex items-center gap-2 data-[state=active]:glow-primary"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </Tabs>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => {
            const Icon = challenge.icon;
            return (
              <Card key={challenge.id} className="glass-card hover:scale-[1.02] transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${challenge.color}/20 backdrop-blur-lg border border-${challenge.color}/30 flex items-center justify-center group-hover:glow-${challenge.color} transition-all`}>
                      <Icon className={`w-6 h-6 text-${challenge.color}`} />
                    </div>
                    <Badge className={`${getStatusColor(challenge.status)} border`}>
                      {challenge.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1).replace('-', ' ')}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{challenge.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {challenge.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{challenge.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      <span className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-glass-border/20">
                    <div className="text-sm text-muted-foreground">
                      {challenge.participants.toLocaleString()} participants
                    </div>
                    <div className="text-lg font-bold gradient-text">
                      {challenge.points} pts
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full glass-button ${
                      challenge.status === 'available' ? 'glow-primary' :
                      challenge.status === 'in-progress' ? 'glow-secondary' : 
                      'glow-accent'
                    }`}
                    disabled={challenge.status === 'completed'}
                  >
                    {getStatusText(challenge.status)}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" className="glass-button border-primary/30 text-primary hover:glow-primary px-8">
            Load More Challenges
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Challenges;