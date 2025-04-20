
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "@/context/CompanyContext";
import { Role } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout/Layout";
import AddTeamMember from "@/components/AddTeamMember";
import { Brain, Users, ChartBar, Settings, Trophy, Layout as LayoutIcon, Code } from "lucide-react";

const TeamDashboard = () => {
  const { company, roles, isLoading, generateRoles } = useCompany();
  const navigate = useNavigate();

  useEffect(() => {
    // If no company is set, redirect to setup
    if (!company) {
      navigate("/");
      return;
    }

    // Generate roles if we don't have any
    if (roles.length === 0 && !isLoading) {
      generateRoles();
    }
  }, [company, generateRoles, isLoading, navigate, roles.length]);

  const getRoleIcon = (icon: string) => {
    switch (icon) {
      case "brain":
        return <Brain className="h-6 w-6" />;
      case "users":
        return <Users className="h-6 w-6" />;
      case "chart-bar":
        return <ChartBar className="h-6 w-6" />;
      case "settings":
        return <Settings className="h-6 w-6" />;
      case "trophy":
        return <Trophy className="h-6 w-6" />;
      case "code":
        return <Code className="h-6 w-6" />;
      case "layout-grid":
      default:
        return <LayoutIcon className="h-6 w-6" />;
    }
  };

  const getRoleCardClass = (category: string) => {
    switch (category) {
      case "tech":
        return "ai-role-card ai-role-card-tech";
      case "marketing":
        return "ai-role-card ai-role-card-marketing";
      case "finance":
        return "ai-role-card ai-role-card-finance";
      case "operations":
        return "ai-role-card ai-role-card-operations";
      case "hr":
        return "ai-role-card ai-role-card-hr";
      case "leadership":
        return "ai-role-card ai-role-card-leadership";
      default:
        return "ai-role-card";
    }
  };

  const handleRoleSelect = (role: Role) => {
    navigate(`/role/${role.id}`);
  };

  return (
    <Layout>
      <div className="container max-w-6xl py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Your AI Team
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Your team of AI assistants to help manage your business
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="pt-2">
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={getRoleCardClass(role.category)}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background border">
                        {getRoleIcon(role.icon)}
                      </div>
                      <h3 className="font-semibold">{role.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {role.description}
                    </p>
                    <ul className="text-sm space-y-1 mb-4">
                      {role.responsibilities.slice(0, 2).map((resp, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-2">
                      <Button 
                        className="w-full" 
                        onClick={() => handleRoleSelect(role)}
                      >
                        Consult with {role.title.split('&')[0].trim()}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 max-w-md mx-auto">
              <AddTeamMember />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default TeamDashboard;
