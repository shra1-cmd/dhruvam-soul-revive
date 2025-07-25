import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import FileUpload from './FileUpload';

interface Program {
  id: string;
  title: string;
  description: string;
  detailed_description: string;
  image_url: string;
  category: string;
  status: string;
  start_date: string;
  end_date: string;
  location: string;
  beneficiaries_count: number;
  budget_allocated: number;
  budget_spent: number;
  created_at: string;
}

const ProgramsManager = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailed_description: '',
    image_url: '',
    category: '',
    status: 'active',
    start_date: '',
    end_date: '',
    location: '',
    beneficiaries_count: 0,
    budget_allocated: 0,
    budget_spent: 0
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      toast.error('Failed to fetch programs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const adminSession = localStorage.getItem('admin_session');
      const adminUser = adminSession ? JSON.parse(adminSession) : null;

      if (editingProgram) {
        const { error } = await supabase
          .from('programs')
          .update(formData)
          .eq('id', editingProgram.id);

        if (error) throw error;
        toast.success('Program updated successfully');
      } else {
        const { error } = await supabase
          .from('programs')
          .insert([{ ...formData, created_by: adminUser?.id }]);

        if (error) throw error;
        toast.success('Program created successfully');
      }

      setShowForm(false);
      setEditingProgram(null);
      resetForm();
      fetchPrograms();
    } catch (error) {
      toast.error('Failed to save program');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Program deleted successfully');
      fetchPrograms();
    } catch (error) {
      toast.error('Failed to delete program');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      detailed_description: '',
      image_url: '',
      category: '',
      status: 'active',
      start_date: '',
      end_date: '',
      location: '',
      beneficiaries_count: 0,
      budget_allocated: 0,
      budget_spent: 0
    });
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      description: program.description || '',
      detailed_description: program.detailed_description || '',
      image_url: program.image_url || '',
      category: program.category,
      status: program.status,
      start_date: program.start_date || '',
      end_date: program.end_date || '',
      location: program.location || '',
      beneficiaries_count: program.beneficiaries_count || 0,
      budget_allocated: program.budget_allocated || 0,
      budget_spent: program.budget_spent || 0
    });
    setShowForm(true);
  };

  const categories = [
    { value: 'temple_restoration', label: 'Temple Restoration' },
    { value: 'goshala', label: 'Goshala Management' },
    { value: 'women_empowerment', label: 'Women Empowerment' },
    { value: 'skill_development', label: 'Skill Development' },
    { value: 'child_homes', label: 'Child Homes' },
    { value: 'ayurveda', label: 'Ayurveda R&D' }
  ];

  if (isLoading && programs.length === 0) {
    return <div>Loading programs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Programs Management</h2>
          <p className="text-muted-foreground">Manage your NGO programs and initiatives</p>
        </div>
        <Button 
          onClick={() => {
            setShowForm(true);
            setEditingProgram(null);
            resetForm();
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Program
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProgram ? 'Edit Program' : 'Add New Program'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Program Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the program"
                />
              </div>

              <div>
                <Label htmlFor="detailed_description">Detailed Description</Label>
                <Textarea
                  id="detailed_description"
                  value={formData.detailed_description}
                  onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
                  placeholder="Detailed description of the program"
                  rows={4}
                />
              </div>

              <div>
                <Label>Program Image</Label>
                <FileUpload
                  bucket="program-images"
                  onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
                  currentUrl={formData.image_url}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Program location"
                  />
                </div>
                <div>
                  <Label htmlFor="beneficiaries_count">Beneficiaries Count</Label>
                  <Input
                    id="beneficiaries_count"
                    type="number"
                    value={formData.beneficiaries_count}
                    onChange={(e) => setFormData({ ...formData, beneficiaries_count: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="budget_allocated">Budget Allocated (₹)</Label>
                  <Input
                    id="budget_allocated"
                    type="number"
                    value={formData.budget_allocated}
                    onChange={(e) => setFormData({ ...formData, budget_allocated: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : (editingProgram ? 'Update' : 'Create')} Program
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingProgram(null);
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
        {programs.map((program) => (
          <Card key={program.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{program.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      program.status === 'active' ? 'bg-green-100 text-green-800' :
                      program.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {program.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">{program.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Category:</span> {categories.find(c => c.value === program.category)?.label}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {program.location || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Beneficiaries:</span> {program.beneficiaries_count || 0}
                    </div>
                    <div>
                      <span className="font-medium">Budget:</span> ₹{program.budget_allocated || 0}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(program)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(program.id)}>
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

export default ProgramsManager;