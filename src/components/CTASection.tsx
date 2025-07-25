import React from 'react';
import { Heart, Users } from 'lucide-react';
import ctaBg from '@/assets/cta-bg.jpg';

const CTASection = () => {
  return (
    <section 
      className="relative py-24 px-6 lg:px-20 text-center text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(59, 60, 130, 0.4)), url(${ctaBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Quote */}
        <blockquote className="text-3xl md:text-4xl font-semibold leading-snug mb-8 animate-fade-in-up">
          "You don't have to change the world. 
          <br />
          <span className="text-turmeric">Just help us change one life.</span>"
        </blockquote>

        <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Every donation, every volunteering hour, every share creates ripples of change 
          that transform communities across rural India.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button className="group bg-turmeric text-primary font-semibold px-8 py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-glow flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turmeric focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Donate Now
          </button>
          
          <button className="group bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Volunteer
          </button>
        </div>

        {/* Impact Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-2xl font-bold text-turmeric mb-2">₹500</div>
            <div className="text-sm text-white/80">Can skill one woman for a month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-turmeric mb-2">₹2000</div>
            <div className="text-sm text-white/80">Can restore temple artwork</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-turmeric mb-2">₹5000</div>
            <div className="text-sm text-white/80">Can support child home for a week</div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 text-turmeric opacity-20 text-3xl animate-float">
        🕉️
      </div>
      <div className="absolute bottom-10 right-10 text-turmeric opacity-20 text-3xl animate-float" style={{ animationDelay: '3s' }}>
        🌸
      </div>
    </section>
  );
};

export default CTASection;