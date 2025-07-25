import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Users, CheckCircle, XCircle } from "lucide-react";

interface Volunteer {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  skills: string[];
  interests: string[];
  availability: string;
  experience_level: string;
  background_check_status: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  status: string;
  joined_date: string;
  created_at: string;
}

const VolunteersManager = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    skills: [] as string[],
    interests: [] as string[],
    availability: '',
    experience_level: 'beginner',
    background_check_status: 'pending',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    status: 'active'
  });

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVolunteers(data || []);
    } catch (error) {
      toast.error('Failed to fetch volunteers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingVolunteer) {
        const { error } = await supabase
          .from('volunteers')
          .update(formData)
          .eq('id', editingVolunteer.id);

        if (error) throw error;
        toast.success('Volunteer updated successfully');
      } else {
        const { error } = await supabase
          .from('volunteers')
          .insert([formData]);

        if (error) throw error;
        toast.success('Volunteer added successfully');
      }

      setShowForm(false);
      setEditingVolunteer(null);
      resetForm();
      fetchVolunteers();
    } catch (error) {
      toast.error('Failed to save volunteer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this volunteer?')) return;

    try {
      const { error } = await supabase
        .from('volunteers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Volunteer deleted successfully');
      fetchVolunteers();
    } catch (error) {
      toast.error('Failed to delete volunteer');
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      address: '',
      skills: [],
      interests: [],
      availability: '',
      experience_level: 'beginner',
      background_check_status: 'pending',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      status: 'active'
    });
  };

  const handleEdit = (volunteer: Volunteer) => {
    setEditingVolunteer(volunteer);
    setFormData({
      full_name: volunteer.full_name,
      email: volunteer.email,
      phone: volunteer.phone || '',
      address: volunteer.address || '',
      skills: volunteer.skills || [],
      interests: volunteer.interests || [],
      availability: volunteer.availability || '',
      experience_level: volunteer.experience_level || 'beginner',
      background_check_status: volunteer.background_check_status,
      emergency_contact_name: volunteer.emergency_contact_name || '',
      emergency_contact_phone: volunteer.emergency_contact_phone || '',
      status: volunteer.status
    });
    setShowForm(true);
  };

  const handleSkillsChange = (value: string) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData({ ...formData, skills });
  };

  const handleInterestsChange = (value: string) => {
    const interests = value.split(',').map(interest => interest.trim()).filter(interest => interest);
    setFormData({ ...formData, interests });
  };

  const activeVolunteers = volunteers.filter(v => v.status === 'active').length;
  const approvedVolunteers = volunteers.filter(v => v.background_check_status === 'approved').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Volunteers Management</h2>
          <p className="text-muted-foreground">Manage volunteer registrations and information</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-xl font-bold text-green-600">{activeVolunteers}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Approved</p>
            <p className="text-xl font-bold text-blue-600">{approvedVolunteers}</p>
          </div>
          <Button 
            onClick={() => {
              setShowForm(true);
              setEditingVolunteer(null);
              resetForm();
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Volunteer
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingVolunteer ? 'Edit Volunteer' : 'Add New Volunteer'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="experience_level">Experience Level</Label>
                  <Select value={formData.experience_level} onValueChange={(value) => setFormData({ ...formData, experience_level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="experienced">Experienced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Full address"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills.join(', ')}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    placeholder="Teaching, Cooking, Computer Skills, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="interests">Interests (comma-separated)</Label>
                  <Input
                    id="interests"
                    value={formData.interests.join(', ')}
                    onChange={(e) => handleInterestsChange(e.target.value)}
                    placeholder="Children, Education, Environment, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <Textarea
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  placeholder="Days and hours available for volunteering"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                  <Input
                    id="emergency_contact_name"
                    value={formData.emergency_contact_name}
                    onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                  <Input
                    id="emergency_contact_phone"
                    value={formData.emergency_contact_phone}
                    onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="background_check_status">Background Check Status</Label>
                  <Select value={formData.background_check_status} onValueChange={(value) => setFormData({ ...formData, background_check_status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : (editingVolunteer ? 'Update' : 'Add')} Volunteer
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingVolunteer(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {volunteers.map((volunteer) => (
          <Card key={volunteer.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-semibold">{volunteer.full_name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      volunteer.status === 'active' ? 'bg-green-100 text-green-800' :
                      volunteer.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {volunteer.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      volunteer.background_check_status === 'approved' ? 'bg-green-100 text-green-800' :
                      volunteer.background_check_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {volunteer.background_check_status === 'approved' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {volunteer.background_check_status === 'rejected' && <XCircle className="w-3 h-3 inline mr-1" />}
                      {volunteer.background_check_status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="font-medium">Email:</span> {volunteer.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {volunteer.phone || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Experience:</span> {volunteer.experience_level}
                    </div>
                    <div>
                      <span className="font-medium">Joined:</span> {new Date(volunteer.joined_date).toLocaleDateString()}
                    </div>
                  </div>

                  {volunteer.skills && volunteer.skills.length > 0 && (
                    <div className="mb-2">
                      <span className="text-sm font-medium">Skills: </span>
                      <div className="inline-flex flex-wrap gap-1">
                        {volunteer.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {volunteer.interests && volunteer.interests.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Interests: </span>
                      <div className="inline-flex flex-wrap gap-1">
                        {volunteer.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(volunteer)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(volunteer.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VolunteersManager;