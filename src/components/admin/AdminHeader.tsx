import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Settings } from "lucide-react";

type AdminUser = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  loginTime: string;
};

interface AdminHeaderProps {
  adminUser: AdminUser;
  onLogout: () => void;
}

const AdminHeader = ({ adminUser, onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-white border-b border-border px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary">
            Garuda Dhruvam Foundation
          </h1>
          <p className="text-sm text-muted-foreground">Admin Dashboard</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium">{adminUser.full_name}</p>
            <p className="text-xs text-muted-foreground">{adminUser.role}</p>
          </div>
          
          <Avatar>
            <AvatarFallback className="bg-primary text-white">
              {adminUser.full_name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;