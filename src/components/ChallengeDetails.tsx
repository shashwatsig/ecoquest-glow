import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, 
  Star, 
  CheckCircle, 
  Lock, 
  Camera, 
  Upload,
  Timer,
  Target,
  Award,
  TrendingUp,
  X
} from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  instructions: string;
  proofType: 'photo' | 'data' | 'text' | 'none';
  points: number;
  educationalTip: string;
  completed: boolean;
  locked: boolean;
  dayNumber: number;
}

interface ChallengeDetailProps {
  challengeId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CHALLENGE_TASKS: { [key: string]: Task[] } = {
  'water-conservation': [
    {
      id: 'tooth-brushing',
      title: 'Tooth Brushing Timer',
      description: 'Turn off tap while brushing teeth',
      instructions: 'Brush your teeth with the tap turned off. Turn on only to rinse. Time yourself and track water saved!',
      proofType: 'photo',
      points: 30,
      educationalTip: 'Leaving the tap running while brushing can waste up to 8 liters of water per session!',
      completed: false,
      locked: false,
      dayNumber: 1
    },
    {
      id: 'bowl-washing',
      title: 'Bowl Fruit Washing',
      description: 'Wash fruits in a bowl instead of running tap',
      instructions: 'Fill a bowl with water to wash your fruits and vegetables instead of letting the tap run.',
      proofType: 'photo',
      points: 30,
      educationalTip: 'Using a bowl can save up to 6 liters of water compared to running the tap continuously.',
      completed: false,
      locked: true,
      dayNumber: 2
    },
    {
      id: 'shower-challenge',
      title: 'Shower Challenge',
      description: '5-minute showers with music timer',
      instructions: 'Take a 5-minute shower. Play your favorite song as a timer - most songs are 3-5 minutes!',
      proofType: 'data',
      points: 30,
      educationalTip: 'A 5-minute shower uses about 40 liters of water, while a 10-minute shower uses 80 liters.',
      completed: false,
      locked: true,
      dayNumber: 3
    },
    {
      id: 'laundry-tracking',
      title: 'Laundry Tracking',
      description: 'Wait for full loads before washing',
      instructions: 'Only run your washing machine when you have a full load. Track how many days you wait.',
      proofType: 'data',
      points: 30,
      educationalTip: 'Running full loads can save up to 1,600 liters of water per month!',
      completed: false,
      locked: true,
      dayNumber: 4
    },
    {
      id: 'dishwashing-method',
      title: 'Dishwashing Method',
      description: 'Fill sink vs running water',
      instructions: 'Fill your sink with soapy water for washing dishes instead of running water continuously.',
      proofType: 'photo',
      points: 30,
      educationalTip: 'Washing dishes in a filled sink uses 50% less water than running the tap continuously.',
      completed: false,
      locked: true,
      dayNumber: 5
    },
    {
      id: 'share-tip',
      title: 'Share Your Tip',
      description: 'Share a creative water-saving idea',
      instructions: 'Come up with and share your own creative water-saving tip that others can use!',
      proofType: 'text',
      points: 30,
      educationalTip: 'Sharing knowledge multiplies impact - one great tip can save thousands of liters across many households!',
      completed: false,
      locked: true,
      dayNumber: 6
    }
  ],
  'zero-waste': [
    {
      id: 'refuse-plastic',
      title: 'Refuse Single-Use Plastics',
      description: 'Avoid all single-use plastic items today',
      instructions: 'Say no to plastic bags, straws, utensils, and containers. Document your alternatives!',
      proofType: 'photo',
      points: 43,
      educationalTip: 'The average person uses 200 single-use plastic items per week.',
      completed: false,
      locked: false,
      dayNumber: 1
    },
    {
      id: 'start-composting',
      title: 'Start Composting',
      description: 'Begin composting food scraps',
      instructions: 'Set up a simple composting system for your food waste. Even a small container works!',
      proofType: 'photo',
      points: 43,
      educationalTip: 'Composting can reduce household waste by up to 30%.',
      completed: false,
      locked: true,
      dayNumber: 2
    },
    {
      id: 'trash-audit',
      title: 'Conduct Trash Audit',
      description: 'Weigh and categorize your waste',
      instructions: 'Weigh your trash before disposal and categorize it by type. Record the weights.',
      proofType: 'data',
      points: 43,
      educationalTip: 'The average person produces 4.5 pounds of waste per day.',
      completed: false,
      locked: true,
      dayNumber: 3
    },
    {
      id: 'upcycling-project',
      title: 'DIY Upcycling Project',
      description: 'Transform waste into something useful',
      instructions: 'Create something useful from items you would normally throw away. Show before and after!',
      proofType: 'photo',
      points: 43,
      educationalTip: 'Upcycling keeps materials in use and reduces the need for new resources.',
      completed: false,
      locked: true,
      dayNumber: 4
    },
    {
      id: 'buy-nothing',
      title: 'Buy Nothing New Day',
      description: 'Avoid purchasing any new items',
      instructions: 'For one full day, buy nothing new. Use what you have or borrow if needed.',
      proofType: 'text',
      points: 43,
      educationalTip: 'Manufacturing new products often uses 10x more energy than repairing or reusing existing ones.',
      completed: false,
      locked: true,
      dayNumber: 5
    },
    {
      id: 'clothing-swap',
      title: 'Organize Clothing Swap',
      description: 'Trade clothes with friends/family',
      instructions: 'Organize a clothing swap with friends or family. Give away items you don\'t wear.',
      proofType: 'photo',
      points: 43,
      educationalTip: 'The fashion industry produces 20% of global wastewater and 10% of carbon emissions.',
      completed: false,
      locked: true,
      dayNumber: 6
    },
    {
      id: 'zero-waste-kit',
      title: 'Create Zero Waste Kit',
      description: 'Assemble portable zero waste supplies',
      instructions: 'Create a kit with reusable utensils, bags, and containers for when you\'re out.',
      proofType: 'photo',
      points: 43,
      educationalTip: 'Being prepared prevents 90% of single-use plastic consumption when away from home.',
      completed: false,
      locked: true,
      dayNumber: 7
    }
  ]
};

export const ChallengeDetails = ({ challengeId, isOpen, onClose }: ChallengeDetailProps) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [proofData, setProofData] = useState('');
  const [waterSaved, setWaterSaved] = useState(0);
  const { userData, completeChallenge, startChallenge, addBadge } = useUserData();
  const { toast } = useToast();

  useEffect(() => {
    if (challengeId && CHALLENGE_TASKS[challengeId]) {
      const challengeTasks = CHALLENGE_TASKS[challengeId];
      const savedProgress = localStorage.getItem(`challenge-${challengeId}-progress`);
      
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setTasks(parsed.tasks || challengeTasks);
        setCurrentDay(parsed.currentDay || 1);
        setWaterSaved(parsed.waterSaved || 0);
      } else {
        setTasks(challengeTasks);
        setCurrentDay(1);
        setWaterSaved(0);
      }
    }
  }, [challengeId]);

  const saveProgress = (updatedTasks: Task[], day: number, water: number = waterSaved) => {
    localStorage.setItem(`challenge-${challengeId}-progress`, JSON.stringify({
      tasks: updatedTasks,
      currentDay: day,
      waterSaved: water
    }));
  };

  const unlockNextTask = () => {
    const nextDay = currentDay + 1;
    const updatedTasks = tasks.map(task => 
      task.dayNumber === nextDay ? { ...task, locked: false } : task
    );
    setTasks(updatedTasks);
    setCurrentDay(nextDay);
    saveProgress(updatedTasks, nextDay);
  };

  const completeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, completed: true } : t
    );
    setTasks(updatedTasks);

    let newWaterSaved = waterSaved;
    if (challengeId === 'water-conservation') {
      newWaterSaved += Math.floor(Math.random() * 10) + 5; // 5-15 liters saved per task
      setWaterSaved(newWaterSaved);
    }

    saveProgress(updatedTasks, currentDay, newWaterSaved);

    // Add points
    const { addPoints } = useUserData();
    addPoints(task.points);

    toast({
      title: "Task Completed!",
      description: `You earned ${task.points} points! ${challengeId === 'water-conservation' ? `Water saved: ${newWaterSaved}L` : ''}`
    });

    // Check if challenge is complete
    const allCompleted = updatedTasks.every(t => t.completed);
    if (allCompleted) {
      const totalPoints = updatedTasks.reduce((sum, t) => sum + t.points, 0);
      completeChallenge(challengeId, 0, { // Points already added individually
        co2Saved: challengeId === 'zero-waste' ? 25 : challengeId === 'water-conservation' ? 5 : 0,
        waterSaved: newWaterSaved,
        energySaved: 0
      });
      addBadge(`${challengeId}-complete`);
      toast({
        title: "Challenge Complete!",
        description: `Congratulations! You've completed the entire challenge!`
      });
    } else {
      // Unlock next task after 24 hours (for demo, unlock immediately)
      setTimeout(unlockNextTask, 1000);
    }

    setShowProofDialog(false);
    setSelectedTask(null);
    setProofData('');
  };

  const handleTaskClick = (task: Task) => {
    if (task.locked) {
      toast({
        title: "Task Locked",
        description: "Complete the previous task to unlock this one!"
      });
      return;
    }

    if (task.completed) {
      toast({
        title: "Already Completed",
        description: "You've already completed this task!"
      });
      return;
    }

    if (task.proofType === 'none') {
      completeTask(task.id);
    } else {
      setSelectedTask(task);
      setShowProofDialog(true);
    }
  };

  const submitProof = () => {
    if (!selectedTask) return;

    if (selectedTask.proofType === 'data' && !proofData) {
      toast({
        title: "Data Required",
        description: "Please enter the required data to complete this task."
      });
      return;
    }

    completeTask(selectedTask.id);
  };

  const getProgressPercentage = () => {
    const completedTasks = tasks.filter(t => t.completed).length;
    return (completedTasks / tasks.length) * 100;
  };

  const getChallengeInfo = () => {
    switch (challengeId) {
      case 'water-conservation':
        return {
          title: 'Water Conservation Master',
          duration: '6 days',
          difficulty: 'Special',
          totalPoints: 180,
          description: '6-day challenge with daily unlocking tasks to master water conservation',
          icon: '💧'
        };
      case 'zero-waste':
        return {
          title: 'Zero Waste Week',
          duration: '7 days',
          difficulty: 'Hard',
          totalPoints: 300,
          description: '7-day challenge to achieve zero waste through mindful consumption',
          icon: '♻️'
        };
      default:
        return {
          title: 'Challenge',
          duration: 'Unknown',
          difficulty: 'Medium',
          totalPoints: 0,
          description: 'Complete this challenge to earn points!',
          icon: '🏆'
        };
    }
  };

  const challengeInfo = getChallengeInfo();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text flex items-center gap-2">
            <span className="text-3xl">{challengeInfo.icon}</span>
            {challengeInfo.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Challenge Overview */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-semibold">{challengeInfo.duration}</div>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                  <div className="font-semibold">{challengeInfo.difficulty}</div>
                </div>
                <div className="text-center">
                  <Target className="w-6 h-6 text-accent mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Total Points</div>
                  <div className="font-semibold">{challengeInfo.totalPoints}</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Progress</div>
                  <div className="font-semibold">{Math.round(getProgressPercentage())}%</div>
                </div>
              </div>

              <Progress value={getProgressPercentage()} className="h-3 mb-4" />

              {challengeId === 'water-conservation' && (
                <div className="text-center p-4 glass-card">
                  <div className="text-2xl font-bold text-primary">{waterSaved}L</div>
                  <div className="text-sm text-muted-foreground">Water Saved So Far</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tasks List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Daily Tasks
            </h3>
            
            {tasks.map((task) => (
              <Card 
                key={task.id} 
                className={`glass-card cursor-pointer transition-all duration-300 ${
                  task.completed ? 'bg-accent/10 border-accent/30' :
                  task.locked ? 'bg-muted/10 border-muted/30 opacity-60' :
                  'hover:scale-[1.02] hover:glow-primary'
                }`}
                onClick={() => handleTaskClick(task)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      task.completed ? 'bg-accent/20 border border-accent/30' :
                      task.locked ? 'bg-muted/20 border border-muted/30' :
                      'bg-primary/20 border border-primary/30'
                    }`}>
                      {task.completed ? (
                        <CheckCircle className="w-6 h-6 text-accent" />
                      ) : task.locked ? (
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        <Timer className="w-6 h-6 text-primary" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            Day {task.dayNumber}: {task.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                        <Badge variant="secondary" className="glass-button">
                          {task.points} pts
                        </Badge>
                      </div>

                      <div className="text-xs text-accent bg-accent/10 rounded-lg p-2 mb-2">
                        💡 {task.educationalTip}
                      </div>

                      {!task.locked && !task.completed && (
                        <div className="text-sm text-muted-foreground">
                          {task.instructions}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Proof Submission Dialog */}
        <Dialog open={showProofDialog} onOpenChange={setShowProofDialog}>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Submit Proof - {selectedTask?.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {selectedTask?.instructions}
              </div>

              {selectedTask?.proofType === 'photo' && (
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Take a photo to prove task completion
                  </p>
                  <Button className="glass-button glow-primary">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              )}

              {selectedTask?.proofType === 'data' && (
                <div className="space-y-4">
                  <label className="text-sm font-medium">Enter Data:</label>
                  <Input
                    placeholder="Enter measurement or count..."
                    value={proofData}
                    onChange={(e) => setProofData(e.target.value)}
                    className="glass-input"
                  />
                </div>
              )}

              {selectedTask?.proofType === 'text' && (
                <div className="space-y-4">
                  <label className="text-sm font-medium">Describe your action:</label>
                  <Textarea
                    placeholder="Tell us what you did..."
                    value={proofData}
                    onChange={(e) => setProofData(e.target.value)}
                    className="glass-input"
                    rows={4}
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={submitProof}
                  className="flex-1 glass-button glow-primary"
                >
                  Complete Task ({selectedTask?.points} pts)
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowProofDialog(false)}
                  className="glass-button border-muted/30"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};