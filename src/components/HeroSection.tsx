import React from 'react';
import { ArrowDown, Play } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  return (
    <section 
      id="hero"
      className="relative min-h-screen grid grid-cols-12 items-center gap-4 px-6 lg:px-20 pt-20"
      style={{
        backgroundImage: `linear-gradient(rgba(59, 60, 130, 0.1), rgba(162, 78, 61, 0.05)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Floating Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-8 h-8 text-turmeric opacity-30 animate-float">
          🌸
        </div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 text-sandalwood opacity-40 animate-float" style={{ animationDelay: '2s' }}>
          🍃
        </div>
        <div className="absolute bottom-1/3 left-1/5 w-10 h-10 text-accent opacity-20 animate-float" style={{ animationDelay: '4s' }}>
          ☸️
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-12 lg:col-span-8 z-10 text-center lg:text-left">
        <div className="max-w-[75ch] mx-auto lg:mx-0">
          <h1 className="text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-primary mb-6 animate-fade-in-up">
            Reviving the Soul of{' '}
            <span className="text-gradient bg-gradient-to-r from-accent to-turmeric bg-clip-text text-transparent">
              Bharat
            </span>
          </h1>
          
          <p className="text-xl text-foreground/80 mt-4 mb-8 max-w-[60ch] mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Restoring India's spiritual heritage, empowering villages through culture and self-sufficiency. 
            True transformation begins within our roots.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              className="btn-primary group"
              role="button" 
              aria-label="Join the Movement"
            >
              Join the Movement
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
            
            <button 
              className="btn-secondary group flex items-center gap-2"
              role="link"
            >
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              Explore Our Work
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-accent">100+</div>
              <div className="text-sm text-muted-foreground">Villages Reached</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-accent">2000+</div>
              <div className="text-sm text-muted-foreground">Women Skilled</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-accent">20+</div>
              <div className="text-sm text-muted-foreground">Temples Revived</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-accent opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
      </div>
    </section>
  );
};

export default HeroSection;