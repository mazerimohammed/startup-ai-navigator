
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Rocket, Users, Brain } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/setup");
  };

  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center py-10 md:py-16">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            Your AI-Powered <span className="ai-gradient-text">Startup Team</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Get strategic guidance and expertise from AI-powered team members
            tailored to your startup's unique needs
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-6">
          <Button onClick={handleGetStarted} size="lg">
            Build Your AI Team
          </Button>
          <p className="text-sm text-muted-foreground">
            No sign-up required. Free to use.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          <div className="ai-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">AI-Powered Expertise</h3>
            <p className="text-muted-foreground">
              Get strategic advice and domain expertise from AI that simulates
              different startup roles
            </p>
          </div>
          <div className="ai-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Custom Team Building</h3>
            <p className="text-muted-foreground">
              Get recommended team roles based on your company type and industry
              requirements
            </p>
          </div>
          <div className="ai-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-4">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Accelerate Growth</h3>
            <p className="text-muted-foreground">
              Make better decisions faster with instant access to strategic
              insights and guidance
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
