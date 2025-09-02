import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChallengeDetails } from '@/components/ChallengeDetails';
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
  CheckCircle,
  Users
} from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

const Challenges = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const { userData, startChallenge } = useUserData();

  const challenges = [
    {
      id: 'water-conservation',
      title: 'Water Conservation Master',
      description: '6-day challenge with daily unlocking tasks to master water conservation practices.',
      category: 'water',
      difficulty: 'Special',
      duration: '6 days',
      points: 180,
      participants: 1240,
      icon: Droplets,
      color: 'secondary',
      status: userData.activeChallenges.includes('water-conservation') ? 'in-progress' : 
              userData.completedChallenges.includes('water-conservation') ? 'completed' : 'available',
      tasks: 6,
      impact: { waterSaved: '50L+', co2Saved: '5kg' }
    },
    {
      id: 'zero-waste',
      title: 'Zero Waste Week',
      description: '7-day challenge to achieve zero waste through mindful consumption and creative solutions.',
      category: 'waste',
      difficulty: 'Hard',
      duration: '7 days',
      points: 300,
      participants: 890,
      icon: Recycle,
      color: 'primary',
      status: userData.activeChallenges.includes('zero-waste') ? 'in-progress' : 
              userData.completedChallenges.includes('zero-waste') ? 'completed' : 'available',
      tasks: 7,
      impact: { co2Saved: '25kg', wasteSaved: '5kg' }
    },
    {
      id: 'tree-planter',
      title: 'Urban Tree Planter',
      description: '30-day challenge to research, plant, and care for trees in your community.',
      category: 'biodiversity',
      difficulty: 'Easy',
      duration: '30 days',
      points: 200,
      participants: 2100,
      icon: TreePine,
      color: 'accent',
      status: userData.activeChallenges.includes('tree-planter') ? 'in-progress' : 
              userData.completedChallenges.includes('tree-planter') ? 'completed' : 'available',
      tasks: 6,
      impact: { co2Saved: '50kg', treesPlanted: '1+' }
    },
    {
      id: 'energy-hero',
      title: 'Energy Efficiency Hero',
      description: '21-day challenge to optimize energy usage through smart practices and monitoring.',
      category: 'energy',
      difficulty: 'Medium',
      duration: '21 days',
      points: 275,
      participants: 1560,
      icon: Zap,
      color: 'primary',
      status: userData.activeChallenges.includes('energy-hero') ? 'in-progress' : 
              userData.completedChallenges.includes('energy-hero') ? 'completed' : 'available',
      tasks: 7,
      impact: { co2Saved: '30kg', energySaved: '100kWh' }
    },
    {
      id: 'sustainable-commuter',
      title: 'Sustainable Commuter',
      description: '7-day challenge to use eco-friendly transportation and reduce carbon footprint.',
      category: 'transport',
      difficulty: 'Easy',
      duration: '7 days',
      points: 150,
      participants: 3200,
      icon: Car,
      color: 'secondary',
      status: userData.activeChallenges.includes('sustainable-commuter') ? 'in-progress' : 
              userData.completedChallenges.includes('sustainable-commuter') ? 'completed' : 'available',
      tasks: 7,
      impact: { co2Saved: '20kg' }
    },
    {
      id: 'green-home',
      title: 'Green Home Makeover',
      description: '30-day challenge to implement sustainable practices throughout your home.',
      category: 'lifestyle',
      difficulty: 'Medium',
      duration: '30 days',
      points: 320,
      participants: 780,
      icon: Home,
      color: 'accent',
      status: userData.activeChallenges.includes('green-home') ? 'in-progress' : 
              userData.completedChallenges.includes('green-home') ? 'completed' : 'available',
      tasks: 7,
      impact: { co2Saved: '40kg', energySaved: '150kWh', waterSaved: '200L' }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Challenges', icon: Star },
    { id: 'water', name: 'Water Conservation', icon: Droplets },
    { id: 'waste', name: 'Waste Reduction', icon: Recycle },
    { id: 'energy', name: 'Energy Efficiency', icon: Zap },
    { id: 'transport', name: 'Green Transport', icon: Car },
    { id: 'lifestyle', name: 'Sustainable Living', icon: Home },
    { id: 'biodiversity', name: 'Biodiversity', icon: TreePine },
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
      case 'available': return 'Start Challenge';
      case 'in-progress': return 'Continue';
      case 'completed': return 'Completed';
      default: return 'Start';
    }
  };

  const handleChallengeAction = (challenge: any) => {
    if (challenge.status === 'available') {
      startChallenge(challenge.id);
      setSelectedChallenge(challenge.id);
    } else if (challenge.status === 'in-progress') {
      setSelectedChallenge(challenge.id);
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
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
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

                  {/* Tasks and Impact Info */}
                  <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-muted-foreground" />
                      <span>{challenge.tasks} tasks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span>{challenge.participants.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="text-xs text-accent bg-accent/10 rounded-lg p-2 mb-3">
                    🌍 Impact: {Object.entries(challenge.impact).map(([key, value]) => 
                      `${value} ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`
                    ).join(', ')}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-glass-border/20">
                    <div className="text-lg font-bold gradient-text">
                      {challenge.points} pts
                    </div>
                    <Badge 
                      variant={challenge.status === 'completed' ? 'default' : 'secondary'}
                      className={`${getStatusColor(challenge.status)}`}
                    >
                      {challenge.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1).replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <Button 
                    onClick={() => handleChallengeAction(challenge)}
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

        {/* Challenge Details Modal */}
        {selectedChallenge && (
          <ChallengeDetails
            challengeId={selectedChallenge}
            isOpen={!!selectedChallenge}
            onClose={() => setSelectedChallenge(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Challenges;