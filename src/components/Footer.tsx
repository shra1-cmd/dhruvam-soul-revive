import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Award } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEmail('');
    setIsSubmitting(false);
    
    // Show success message (you can replace with toast)
    alert('Thank you for subscribing to our newsletter!');
  };

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#stories' },
    { label: 'Contact', href: '#contact' },
    { label: 'Volunteer', href: '#volunteer' },
    { label: 'Donate', href: '#donate' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'Follow us on LinkedIn' },
    { icon: Instagram, href: '#', label: 'Follow us on Instagram' },
    { icon: Youtube, href: '#', label: 'Follow us on YouTube' }
  ];

  return (
    <footer className="bg-ivory border-t border-sandalwood">
      <div className="py-16 px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          
          {/* Column 1: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1 py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <Mail className="w-4 h-4 text-accent" />
                <a 
                  href="mailto:hello@garudadhruvam.org"
                  className="hover:text-accent transition-colors"
                >
                  hello@garudadhruvam.org
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <Phone className="w-4 h-4 text-accent" />
                <a 
                  href="tel:+919876543210"
                  className="hover:text-accent transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-foreground/80">
                <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span>Kurnool, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Get updates from the ground
            </h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-2 rounded-xl border border-sandalwood text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground px-5 py-2 rounded-xl hover:bg-accent/90 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-4 mt-12 mb-8">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-sandalwood text-muted-foreground hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <IconComponent className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        {/* Certification Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-sandalwood rounded-full">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">
              Regd. No: GD/NGO/2025/001
            </span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-sandalwood/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Garuda Dhruvam Foundation. All rights reserved. 
            <span className="mx-2">•</span>
            Building tomorrow with the wisdom of yesterday.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;