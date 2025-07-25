import React from 'react';
import { ExternalLink, Camera } from 'lucide-react';

const ShowcaseSection = () => {
  const stories = [
    {
      title: "From Ruins to Reverence: Kurnool Temple Revival",
      snippet: "How a forgotten 400-year-old temple became the heart of community life again...",
      readTime: "5 min read"
    },
    {
      title: "Weaving Dreams: Women Artisans of Anantapur",
      snippet: "Traditional handloom skills create modern livelihoods for 200+ women...",
      readTime: "3 min read"
    },
    {
      title: "Goshala Chronicles: Caring for Sacred Cows",
      snippet: "Sustainable cow care practices that benefit both animals and farmers...",
      readTime: "4 min read"
    }
  ];

  const images = [
    {
      src: "/api/placeholder/400/300",
      alt: "Temple restoration before and after",
      caption: "Kurnool Temple Revival"
    },
    {
      src: "/api/placeholder/400/300", 
      alt: "Women weaving traditional textiles",
      caption: "Artisan Training Program"
    },
    {
      src: "/api/placeholder/400/300",
      alt: "Children learning in temple courtyard",
      caption: "Cultural Education"
    },
    {
      src: "/api/placeholder/400/300",
      alt: "Artisans painting traditional motifs",
      caption: "Heritage Art Revival"
    }
  ];

  return (
    <section id="stories" className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-semibold text-primary mb-16">
        Stories from the Ground
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Column - Stories & Blogs */}
        <div>
          <h3 className="text-xl font-semibold text-accent mb-6">
            Voices of Change
          </h3>
          
          <div className="space-y-6">
            {stories.map((story, index) => (
              <article
                key={index}
                className="bg-white border-l-4 border-sandalwood p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-medium text-primary mb-2 leading-snug">
                  {story.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {story.snippet}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {story.readTime}
                  </span>
                  <button className="story-link text-sm text-accent hover:text-accent/80 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column - Visual Grid */}
        <div>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-sandalwood/20 to-accent/10 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-accent/40" />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <ExternalLink className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <button className="btn-primary">
              See Our Stories
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-8 px-8 py-4 bg-ivory border border-sandalwood rounded-2xl">
          <div>
            <div className="text-2xl font-bold text-accent">50+</div>
            <div className="text-sm text-muted-foreground">Impact Stories</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div>
            <div className="text-2xl font-bold text-accent">1000+</div>
            <div className="text-sm text-muted-foreground">Photos & Videos</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div>
            <div className="text-2xl font-bold text-accent">24/7</div>
            <div className="text-sm text-muted-foreground">Community Updates</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;