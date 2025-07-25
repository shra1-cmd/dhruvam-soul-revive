import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { 
  Target, 
  FileText, 
  Camera, 
  Calendar, 
  DollarSign, 
  Users 
} from "lucide-react";

interface Stats {
  programs: number;
  stories: number;
  gallery: number;
  events: number;
  donations: number;
  volunteers: number;
}

const DashboardStats = () => {
  const [stats, setStats] = useState<Stats>({
    programs: 0,
    stories: 0,
    gallery: 0,
    events: 0,
    donations: 0,
    volunteers: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: programsCount },
          { count: storiesCount },
          { count: galleryCount },
          { count: eventsCount },
          { count: donationsCount },
          { count: volunteersCount }
        ] = await Promise.all([
          supabase.from('programs').select('*', { count: 'exact', head: true }),
          supabase.from('stories').select('*', { count: 'exact', head: true }),
          supabase.from('gallery').select('*', { count: 'exact', head: true }),
          supabase.from('events').select('*', { count: 'exact', head: true }),
          supabase.from('donations').select('*', { count: 'exact', head: true }),
          supabase.from('volunteers').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          programs: programsCount || 0,
          stories: storiesCount || 0,
          gallery: galleryCount || 0,
          events: eventsCount || 0,
          donations: donationsCount || 0,
          volunteers: volunteersCount || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Programs', value: stats.programs, icon: Target, color: 'text-primary' },
    { title: 'Stories', value: stats.stories, icon: FileText, color: 'text-accent' },
    { title: 'Gallery Images', value: stats.gallery, icon: Camera, color: 'text-turmeric' },
    { title: 'Events', value: stats.events, icon: Calendar, color: 'text-indigo' },
    { title: 'Donations', value: stats.donations, icon: DollarSign, color: 'text-green-600' },
    { title: 'Volunteers', value: stats.volunteers, icon: Users, color: 'text-blue-600' }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <p className="text-muted-foreground">Manage your NGO content and track engagement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total {stat.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Add New Program</span>
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Create Story</span>
                <FileText className="w-4 h-4 text-accent" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Upload Images</span>
                <Camera className="w-4 h-4 text-turmeric" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                System setup completed successfully
              </div>
              <div className="text-sm text-muted-foreground">
                Database tables created
              </div>
              <div className="text-sm text-muted-foreground">
                Admin access configured
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;