
import { useCompany } from "@/context/CompanyContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { company, clearCompany } = useCompany();
  const navigate = useNavigate();
  
  const handleReset = () => {
    clearCompany();
    navigate('/');
  };
  
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold ai-gradient-text">Startup AI Navigator</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {company && (
            <>
              <span className="text-sm text-muted-foreground">
                {company.name || "Your Company"}
              </span>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                New Company
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
