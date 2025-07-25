import React from 'react';

const AreaOfWorkSection = () => {
  const workAreas = [
    {
      id: 'temples',
      icon: '🛕',
      title: 'Temple Restoration',
      description: 'Reviving sacred spaces',
      quote: 'Where sacred stone meets living spirit.'
    },
    {
      id: 'goshala',
      icon: '🐄',
      title: 'Goshala Management',
      description: 'Protecting divine creatures',
      quote: 'Protecting those who protect our land.'
    },
    {
      id: 'women',
      icon: '👩🏽‍🌾',
      title: 'Women Empowerment',
      description: 'Skills for independence',
      quote: 'Freedom begins with dignity and skill.'
    },
    {
      id: 'skills',
      icon: '🛠️',
      title: 'Skill Development',
      description: 'Traditional crafts revival',
      quote: 'Crafting futures with every tool.'
    },
    {
      id: 'children',
      icon: '🏠',
      title: 'Child Homes',
      description: 'Nurturing future leaders',
      quote: 'Every child deserves a sacred start.'
    },
    {
      id: 'ayurveda',
      icon: '🌿',
      title: 'R&D Ayurveda (Dhanvantri)',
      description: 'Ancient healing wisdom',
      quote: 'Ancient science for future healing.'
    }
  ];

  return (
    <section id="work" className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-semibold text-primary mb-12">
        Our Work in Action
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {workAreas.map((area) => (
          <div
            key={area.id}
            className="group relative bg-ivory border border-sandalwood rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            {/* Front Face */}
            <div className="p-8 text-center transition-transform duration-500 group-hover:rotate-y-180 backface-hidden">
              <div className="text-5xl mb-4">{area.icon}</div>
              <h3 className="text-xl font-medium text-primary mb-2">
                {area.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {area.description}
              </p>
            </div>

            {/* Back Face */}
            <div className="absolute inset-0 p-8 bg-sandalwood/10 text-primary rounded-2xl flex flex-col justify-between h-full transform rotate-y-180 backface-hidden transition-transform duration-500 group-hover:rotate-y-0">
              <div>
                <blockquote className="text-sm italic leading-snug text-center">
                  "{area.quote}"
                </blockquote>
              </div>
              <button className="mt-6 inline-block text-sm font-semibold text-accent hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1">
                Learn More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <p className="text-lg text-muted-foreground mb-6">
          Each initiative is rooted in community needs and cultural preservation
        </p>
        <button className="btn-secondary">
          Explore All Programs
        </button>
      </div>
    </section>
  );
};

export default AreaOfWorkSection;