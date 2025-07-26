import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, RefreshCw } from "lucide-react";
import { useWebsiteHero } from "@/hooks/useWebsiteHero";
import { useWebsiteMission } from "@/hooks/useWebsiteMission";
import { useWebsiteStats } from "@/hooks/useWebsiteStats";
import { useWebsiteContact } from "@/hooks/useWebsiteContact";

const ContentManager = () => {
  const { heroData, loading: heroLoading, updateHeroData, refetch: refetchHero } = useWebsiteHero();
  const { missionData, loading: missionLoading, updateMissionData, refetch: refetchMission } = useWebsiteMission();
  const { statsData, loading: statsLoading, updateStatsData, refetch: refetchStats } = useWebsiteStats();
  const { contactData, loading: contactLoading, updateContactData, refetch: refetchContact } = useWebsiteContact();

  const isLoading = heroLoading || missionLoading || statsLoading || contactLoading;

  const handleRefresh = () => {
    refetchHero();
    refetchMission();
    refetchStats();
    refetchContact();
  };

  const handleHeroSave = async () => {
    const result = await updateHeroData({
      title: heroData?.content?.title || '',
      subtitle: heroData?.content?.subtitle || '',
      cta_primary: heroData?.content?.cta_primary || '',
      cta_secondary: heroData?.content?.cta_secondary || ''
    });
    
    if (result.success) {
      toast.success('Hero section updated successfully');
    } else {
      toast.error('Failed to update hero section');
    }
  };

  const handleMissionSave = async () => {
    const result = await updateMissionData({
      mission_text: missionData?.content?.mission_text || '',
      vision: missionData?.content?.vision || '',
      philosophy: missionData?.content?.philosophy || ''
    });
    
    if (result.success) {
      toast.success('Mission section updated successfully');
    } else {
      toast.error('Failed to update mission section');
    }
  };

  const handleStatsSave = async () => {
    const result = await updateStatsData({
      villages: statsData?.content?.villages || 0,
      women_skilled: statsData?.content?.women_skilled || 0,
      temples_revived: statsData?.content?.temples_revived || 0,
      programs_active: statsData?.content?.programs_active || 0
    });
    
    if (result.success) {
      toast.success('Statistics updated successfully');
    } else {
      toast.error('Failed to update statistics');
    }
  };

  const handleContactSave = async () => {
    const result = await updateContactData({
      email: contactData?.content?.email || '',
      phone: contactData?.content?.phone || '',
      address: contactData?.content?.address || '',
      office_hours: contactData?.content?.office_hours || ''
    });
    
    if (result.success) {
      toast.success('Contact information updated successfully');
    } else {
      toast.error('Failed to update contact information');
    }
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
        <Button onClick={handleRefresh} variant="outline" className="gap-2">
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
              value={heroData?.content?.title || ''}
              onChange={(e) => updateHeroData({ ...heroData, content: { ...heroData?.content, title: e.target.value } })}
              placeholder="Main hero title"
            />
          </div>
          <div>
            <Label htmlFor="hero_subtitle">Subtitle</Label>
            <Textarea
              id="hero_subtitle"
              value={heroData?.content?.subtitle || ''}
              onChange={(e) => updateHeroData({ ...heroData, content: { ...heroData?.content, subtitle: e.target.value } })}
              placeholder="Hero subtitle"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hero_cta_primary">Primary CTA Text</Label>
              <Input
                id="hero_cta_primary"
                value={heroData?.content?.cta_primary || ''}
                onChange={(e) => updateHeroData({ ...heroData, content: { ...heroData?.content, cta_primary: e.target.value } })}
                placeholder="Primary button text"
              />
            </div>
            <div>
              <Label htmlFor="hero_cta_secondary">Secondary CTA Text</Label>
              <Input
                id="hero_cta_secondary"
                value={heroData?.content?.cta_secondary || ''}
                onChange={(e) => updateHeroData({ ...heroData, content: { ...heroData?.content, cta_secondary: e.target.value } })}
                placeholder="Secondary button text"
              />
            </div>
          </div>
          <Button onClick={handleHeroSave} disabled={heroLoading}>
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
              value={missionData?.content?.mission_text || ''}
              onChange={(e) => updateMissionData({ ...missionData, content: { ...missionData?.content, mission_text: e.target.value } })}
              placeholder="Organization mission"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="vision">Vision</Label>
            <Textarea
              id="vision"
              value={missionData?.content?.vision || ''}
              onChange={(e) => updateMissionData({ ...missionData, content: { ...missionData?.content, vision: e.target.value } })}
              placeholder="Organization vision"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="philosophy">Philosophy</Label>
            <Textarea
              id="philosophy"
              value={missionData?.content?.philosophy || ''}
              onChange={(e) => updateMissionData({ ...missionData, content: { ...missionData?.content, philosophy: e.target.value } })}
              placeholder="Organization philosophy"
              rows={3}
            />
          </div>
          <Button onClick={handleMissionSave} disabled={missionLoading}>
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
                value={statsData?.content?.villages || 0}
                onChange={(e) => updateStatsData({ ...statsData, content: { ...statsData?.content, villages: parseInt(e.target.value) || 0 } })}
              />
            </div>
            <div>
              <Label htmlFor="women_skilled">Women Skilled</Label>
              <Input
                id="women_skilled"
                type="number"
                value={statsData?.content?.women_skilled || 0}
                onChange={(e) => updateStatsData({ ...statsData, content: { ...statsData?.content, women_skilled: parseInt(e.target.value) || 0 } })}
              />
            </div>
            <div>
              <Label htmlFor="temples_revived">Temples Revived</Label>
              <Input
                id="temples_revived"
                type="number"
                value={statsData?.content?.temples_revived || 0}
                onChange={(e) => updateStatsData({ ...statsData, content: { ...statsData?.content, temples_revived: parseInt(e.target.value) || 0 } })}
              />
            </div>
            <div>
              <Label htmlFor="programs_active">Active Programs</Label>
              <Input
                id="programs_active"
                type="number"
                value={statsData?.content?.programs_active || 0}
                onChange={(e) => updateStatsData({ ...statsData, content: { ...statsData?.content, programs_active: parseInt(e.target.value) || 0 } })}
              />
            </div>
          </div>
          <Button onClick={handleStatsSave} disabled={statsLoading}>
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
                value={contactData?.content?.email || ''}
                onChange={(e) => updateContactData({ ...contactData, content: { ...contactData?.content, email: e.target.value } })}
                placeholder="hello@garudadhruvam.org"
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">Phone</Label>
              <Input
                id="contact_phone"
                value={contactData?.content?.phone || ''}
                onChange={(e) => updateContactData({ ...contactData, content: { ...contactData?.content, phone: e.target.value } })}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="contact_address">Address</Label>
            <Textarea
              id="contact_address"
              value={contactData?.content?.address || ''}
              onChange={(e) => updateContactData({ ...contactData, content: { ...contactData?.content, address: e.target.value } })}
              placeholder="Organization address"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="office_hours">Office Hours</Label>
            <Input
              id="office_hours"
              value={contactData?.content?.office_hours || ''}
              onChange={(e) => updateContactData({ ...contactData, content: { ...contactData?.content, office_hours: e.target.value } })}
              placeholder="Mon-Fri 9:00 AM - 5:00 PM"
            />
          </div>
          <Button onClick={handleContactSave} disabled={contactLoading}>
            <Save className="w-4 h-4 mr-2" />
            Save Contact Info
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManager;