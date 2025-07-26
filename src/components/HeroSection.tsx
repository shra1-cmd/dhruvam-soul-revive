import React from 'react';
import { ArrowDown, Play } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroSectionProps {
  content?: {
    title?: string;
    subtitle?: string;
    cta_primary?: string;
    cta_secondary?: string;
  };
  stats?: {
    villages?: number;
    women_skilled?: number;
    temples_revived?: number;
    programs_active?: number;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ content, stats }) => {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-10 text-6xl animate-bounce">☸️</div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {content?.title || 'Reviving the Soul of'}{' '}
          <span className="text-orange-400">Bharat</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          {content?.subtitle || "Restoring India's spiritual heritage, empowering villages through culture and self-sufficiency. True transformation begins within our roots."}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            {content?.cta_primary || 'Join the Movement'}
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
            <Play size={20} />
            {content?.cta_secondary || 'Explore Our Work'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">{stats?.villages ?? '100+'}</div>
            <div className="text-sm text-gray-300">Villages Reached</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">{stats?.women_skilled ?? '2000+'}</div>
            <div className="text-sm text-gray-300">Women Skilled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">{stats?.temples_revived ?? '20+'}</div>
            <div className="text-sm text-gray-300">Temples Revived</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">{stats?.programs_active ?? '15+'}</div>
            <div className="text-sm text-gray-300">Programs Active</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white" size={24} />
      </div>
    </div>
  );
};

export default HeroSection;
