import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw } from "lucide-react";

interface WebsiteContent {
  section_name: string;
  content: any;
}

const ContentManager = () => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*');

      if (error) throw error;
      
      const contentMap: Record<string, any> = {};
      data?.forEach((item: WebsiteContent) => {
        contentMap[item.section_name] = item.content;
      });
      
      setContent(contentMap);
    } catch (error) {
      toast.error('Failed to fetch website content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (sectionName: string) => {
    setIsSaving(true);

    try {
      const adminSession = localStorage.getItem('admin_session');
      const adminUser = adminSession ? JSON.parse(adminSession) : null;

      const { error } = await supabase
        .from('website_content')
        .upsert({
          section_name: sectionName,
          content: content[sectionName],
          last_updated_by: adminUser?.id
        });

      if (error) throw error;
      toast.success(`${sectionName} section updated successfully`);
    } catch (error) {
      toast.error('Failed to update content');
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (section: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateStats = (field: string, value: number) => {
    setContent(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [field]: value
      }
    }));
  };

  if (isLoading) {
    return <div>Loading website content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Website Content Management</h2>
          <p className="text-muted-foreground">Update website sections and content</p>
        </div>
        <Button onClick={fetchContent} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero_title">Main Title</Label>
            <Input
              id="hero_title"
              value={content.hero?.title || ''}
              onChange={(e) => updateContent('hero', 'title', e.target.value)}
              placeholder="Main hero title"
            />
          </div>
          <div>
            <Label htmlFor="hero_subtitle">Subtitle</Label>
            <Textarea
              id="hero_subtitle"
              value={content.hero?.subtitle || ''}
              onChange={(e) => updateContent('hero', 'subtitle', e.target.value)}
              placeholder="Hero subtitle"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hero_cta_primary">Primary CTA Text</Label>
              <Input
                id="hero_cta_primary"
                value={content.hero?.cta_primary || ''}
                onChange={(e) => updateContent('hero', 'cta_primary', e.target.value)}
                placeholder="Primary button text"
              />
            </div>
            <div>
              <Label htmlFor="hero_cta_secondary">Secondary CTA Text</Label>
              <Input
                id="hero_cta_secondary"
                value={content.hero?.cta_secondary || ''}
                onChange={(e) => updateContent('hero', 'cta_secondary', e.target.value)}
                placeholder="Secondary button text"
              />
            </div>
          </div>
          <Button onClick={() => handleSave('hero')} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save Hero Section
          </Button>
        </CardContent>
      </Card>

      {/* Mission, Vision, Philosophy */}
      <Card>
        <CardHeader>
          <CardTitle>Mission, Vision & Philosophy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="mission">Mission</Label>
            <Textarea
              id="mission"
              value={content.mission?.mission || ''}
              onChange={(e) => updateContent('mission', 'mission', e.target.value)}
              placeholder="Organization mission"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="vision">Vision</Label>
            <Textarea
              id="vision"
              value={content.mission?.vision || ''}
              onChange={(e) => updateContent('mission', 'vision', e.target.value)}
              placeholder="Organization vision"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="philosophy">Philosophy</Label>
            <Textarea
              id="philosophy"
              value={content.mission?.philosophy || ''}
              onChange={(e) => updateContent('mission', 'philosophy', e.target.value)}
              placeholder="Organization philosophy"
              rows={3}
            />
          </div>
          <Button onClick={() => handleSave('mission')} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save Mission Section
          </Button>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Impact Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="villages">Villages Reached</Label>
              <Input
                id="villages"
                type="number"
                value={content.stats?.villages || 0}
                onChange={(e) => updateStats('villages', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="women_skilled">Women Skilled</Label>
              <Input
                id="women_skilled"
                type="number"
                value={content.stats?.women_skilled || 0}
                onChange={(e) => updateStats('women_skilled', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="temples_revived">Temples Revived</Label>
              <Input
                id="temples_revived"
                type="number"
                value={content.stats?.temples_revived || 0}
                onChange={(e) => updateStats('temples_revived', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="programs_active">Active Programs</Label>
              <Input
                id="programs_active"
                type="number"
                value={content.stats?.programs_active || 0}
                onChange={(e) => updateStats('programs_active', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
          <Button onClick={() => handleSave('stats')} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save Statistics
          </Button>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_email">Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={content.contact?.email || ''}
                onChange={(e) => updateContent('contact', 'email', e.target.value)}
                placeholder="hello@garudadhruvam.org"
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">Phone</Label>
              <Input
                id="contact_phone"
                value={content.contact?.phone || ''}
                onChange={(e) => updateContent('contact', 'phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="contact_address">Address</Label>
            <Textarea
              id="contact_address"
              value={content.contact?.address || ''}
              onChange={(e) => updateContent('contact', 'address', e.target.value)}
              placeholder="Organization address"
              rows={2}
            />
          </div>
          <Button onClick={() => handleSave('contact')} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save Contact Info
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManager;