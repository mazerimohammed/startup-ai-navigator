
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCompany } from "@/context/CompanyContext";
import { Role } from "@/types";
import { generateAIResponse } from "@/lib/ai-helpers";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout/Layout";
import { Brain, Users, ChartBar, Settings, Trophy, Layout as LayoutIcon, ArrowLeft, Send, Code } from "lucide-react";

const RoleConsultation = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const { roles } = useCompany();
  const [role, setRole] = useState<Role | null>(null);
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Find the role from the context
    const foundRole = roles.find((r) => r.id === roleId);
    if (foundRole) {
      setRole(foundRole);
    } else if (roles.length > 0) {
      // If role not found but we have roles, redirect to team dashboard
      navigate("/team");
    } else {
      // If no roles at all, redirect to setup
      navigate("/");
    }
  }, [navigate, roleId, roles]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim() || !role) return;
    
    setIsLoading(true);
    try {
      const response = await generateAIResponse(role, query);
      setResponses([...responses, response]);
      setQuery("");
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getExampleQueries = (category: string): string[] => {
    switch (category) {
      case "tech":
        return [
          "What tech stack should we use for our MVP?",
          "How should we approach scaling our architecture?",
          "What's the best way to structure our development team?"
        ];
      case "marketing":
        return [
          "What marketing channels should we focus on first?",
          "How can we optimize our customer acquisition cost?",
          "What content strategy would work best for our industry?"
        ];
      case "finance":
        return [
          "How should we price our product?",
          "What financial metrics should we be tracking?",
          "How much runway should we aim for before seeking funding?"
        ];
      case "operations":
        return [
          "How can we optimize our operational efficiency?",
          "What project management methodology should we use?",
          "How should we structure our customer support process?"
        ];
      case "hr":
        return [
          "How should we structure our hiring process?",
          "What's the best compensation strategy for early employees?",
          "How can we build a strong company culture remotely?"
        ];
      case "leadership":
        return [
          "What should be our top priorities in the first year?",
          "How should we approach fundraising?",
          "What leadership style works best for early-stage startups?"
        ];
      default:
        return [
          "What should our priorities be?",
          "How can we improve our processes?",
          "What strategies should we consider?"
        ];
    }
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-8 md:py-12">
        <Button
          variant="ghost"
          className="mb-6 -ml-4 flex items-center gap-1"
          onClick={() => navigate("/team")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Team
        </Button>

        {role ? (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-background border">
                  {getRoleIcon(role.icon)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {role.title}
                  </h1>
                  <p className="text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {responses.length === 0 ? (
                <div className="rounded-lg border p-6">
                  <h2 className="font-semibold mb-3">
                    Ask your {role.title.split('&')[0].trim()} anything
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get strategic advice and insights based on industry best practices
                  </p>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {getExampleQueries(role.category).map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto py-3 px-4 text-left"
                        onClick={() => setQuery(example)}
                      >
                        {example}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {responses.map((response, index) => (
                    <Card key={index} className="p-4 shadow-sm">
                      <p>{response}</p>
                    </Card>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <Textarea
                  placeholder={`Ask your ${role.title.split('&')[0].trim()} a question...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading || !query.trim()}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full animate-pulse" />
                        Thinking...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RoleConsultation;
