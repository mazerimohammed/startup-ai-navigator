
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CompanyProvider } from "@/context/CompanyContext";
import Index from "./pages/Index";
import CompanySetup from "./pages/CompanySetup";
import TeamDashboard from "./pages/TeamDashboard";
import RoleConsultation from "./pages/RoleConsultation";
import NotFound from "./pages/NotFound";
import "./lib/utils.css"; // إضافة ملف CSS الجديد

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CompanyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/setup" element={<CompanySetup />} />
            <Route path="/team" element={<TeamDashboard />} />
            <Route path="/role/:roleId" element={<RoleConsultation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CompanyProvider>
  </QueryClientProvider>
);

export default App;
