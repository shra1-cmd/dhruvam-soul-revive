import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import OurStorySection from '@/components/OurStorySection';
import MissionVisionSection from '@/components/MissionVisionSection';
import AreaOfWorkSection from '@/components/AreaOfWorkSection';
import TrustSection from '@/components/TrustSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <OurStorySection />
        <MissionVisionSection />
        <AreaOfWorkSection />
        <TrustSection />
        <ShowcaseSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
