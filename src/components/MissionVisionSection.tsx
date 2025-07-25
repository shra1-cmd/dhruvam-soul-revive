import React, { useState } from 'react';
import { Target, Eye, Heart } from 'lucide-react';

const MissionVisionSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 'mission',
      title: 'Mission',
      icon: Target,
      content: {
        heading: 'Our Mission',
        text: 'To empower India through its roots — culture, women, sustainability. We believe in enabling rural transformation by honoring ancient wisdom while building pathways to modern prosperity.'
      }
    },
    {
      id: 'vision',
      title: 'Vision',
      icon: Eye,
      content: {
        heading: 'Our Vision',
        text: 'A self-reliant Bharat where ancient wisdom uplifts modern life — one village, one temple, one woman at a time. Where cultural heritage becomes the foundation for sustainable development.'
      }
    },
    {
      id: 'philosophy',
      title: 'Philosophy of Change',
      icon: Heart,
      content: {
        heading: 'Philosophy of Change',
        text: 'We believe transformation begins from within villages, not from the top down. Local wisdom, collective action, and cultural roots form the foundation of inclusive and lasting change.'
      }
    }
  ];

  return (
    <section id="vision" className="py-24 px-6 lg:px-20 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl font-semibold text-primary mb-12">
          Our Foundation
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tab Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {tabs.map((tab, index) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left px-5 py-4 rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      activeTab === index
                        ? 'bg-white border-l-4 border-accent text-accent shadow-md'
                        : 'bg-white/50 border-l-4 border-transparent hover:border-accent/50 text-primary hover:bg-white/80'
                    }`}
                    role="tab"
                    aria-selected={activeTab === index}
                    aria-controls={`panel-${tab.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5" />
                      <span className="text-lg font-medium">{tab.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Panel */}
          <div className="lg:col-span-3">
            <div 
              className="card-soft p-8 min-h-[300px] transition-all duration-500"
              role="tabpanel"
              id={`panel-${tabs[activeTab].id}`}
              aria-labelledby={tabs[activeTab].id}
            >
              <div className="animate-fade-in-up">
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  {tabs[activeTab].content.heading}
                </h3>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {tabs[activeTab].content.text}
                </p>

                {/* Visual Element */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center">
                    {React.createElement(tabs[activeTab].icon, { 
                      className: "w-6 h-6 text-white" 
                    })}
                  </div>
                  <div className="flex-1 h-2 bg-gradient-warm rounded-full opacity-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;