import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Leaf, Target, Trophy, Award, ArrowRight, Zap, Globe, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const LandingPage = () => {
  const features = [
    {
      icon: Target,
      title: 'Environmental Challenges',
      description: 'Complete daily eco-friendly tasks and build sustainable habits',
      color: 'primary'
    },
    {
      icon: Trophy,
      title: 'Compete & Collaborate',
      description: 'Join a community of eco-warriors and climb the leaderboards',
      color: 'secondary'
    },
    {
      icon: Award,
      title: 'Earn Badges',
      description: 'Unlock achievements as you make a real impact on the planet',
      color: 'accent'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: Globe },
    { number: '50K+', label: 'Challenges Completed', icon: Zap },
    { number: '2.5M', label: 'CO₂ Saved (kg)', icon: Heart }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass-card p-8 md:p-12 float-animation">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl glass-button flex items-center justify-center glow-primary">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Transform Your Impact</span>
              <br />
              <span className="text-white drop-shadow-lg">Save Our Planet</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
              Join the gamified environmental movement. Complete challenges, 
              earn badges, and make a real difference for our planet's future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glass-button glow-primary group px-8 py-6 text-lg text-white hover:text-white">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" className="glass-button border-white/30 text-white hover:bg-white/20 hover:glow-secondary px-8 py-6 text-lg backdrop-blur-md">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Your Environmental Adventure Awaits
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Discover how EcoQuest makes environmental action fun, engaging, and rewarding
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass-card p-8 hover:scale-105 transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}/20 backdrop-blur-lg border border-${feature.color}/30 flex items-center justify-center mb-6 group-hover:glow-${feature.color} transition-all`}>
                    <Icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-glass/30 backdrop-blur-xl">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Making Real Impact</span>
            </h2>
            <p className="text-xl text-foreground/80">
              Together, we're building a sustainable future
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="glass-card p-8 pulse-glow">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <div className="text-4xl md:text-5xl font-bold mb-2 gradient-text">
                      {stat.number}
                    </div>
                    <div className="text-foreground/70 text-lg">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="gradient-text">Change the World?</span>
            </h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Every small action counts. Start your environmental journey today and 
              become part of a community that's making a real difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glass-button glow-primary px-12 py-6 text-lg text-white hover:text-white">
                Join EcoQuest Now
              </Button>
              <Button variant="outline" size="lg" className="glass-button border-white/30 text-foreground hover:bg-white/10 px-12 py-6 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;