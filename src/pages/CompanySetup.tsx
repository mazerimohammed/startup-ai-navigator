
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "@/context/CompanyContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { Role } from "@/types";
import { nanoid } from "@/lib/utils";

// Simple i18n utility
const TRANSLATIONS = {
  en: {
    title: "Tell us about your startup",
    description: "Describe your company, product, industry, main activity, or goals.",
    promptLabel: "Startup Description",
    promptPlaceholder: "Example: We are building a platform to connect logistics companies and shippers in the Middle East...",
    submitButton: "Analyze & Build My AI Team",
    descError: "Please provide a brief description of your startup.",
    suggestedRolesTitle: "Suggested AI Team Members (Based on your description)",
    buildTeamButton: "Create My Team",
    retry: "Try Again",
  },
  ar: {
    title: "حدثنا عن شركتك الناشئة",
    description: "صف شركتك أو منتجك أو مجال العمل أو الأهداف باختصار.",
    promptLabel: "وصف الشركة الناشئة",
    promptPlaceholder: "مثال: نحن نبني منصة لربط شركات الخدمات اللوجستية بالشاحنين في الشرق الأوسط...",
    submitButton: "حلل وابن فريق الذكاء الاصطناعي الخاص بي",
    descError: "يرجى تقديم وصف موجز لشركتك.",
    suggestedRolesTitle: "أعضاء الفريق المقترحون (استنادًا إلى وصفك)",
    buildTeamButton: "إنشاء فريقي",
    retry: "إعادة المحاولة",
  },
};

type LangType = "en" | "ar";

// We'll grab <html lang> for now
function useLang(): LangType {
  if (typeof document !== "undefined") {
    const l = document.documentElement.lang as LangType;
    if (l === "ar") return "ar";
  }
  return "en";
}

// Map role names to categories and icons
const getCategoryAndIcon = (roleName: string): { category: string, icon: string } => {
  const lowerRole = roleName.toLowerCase();
  
  if (lowerRole.includes('cto') || lowerRole.includes('tech') || lowerRole.includes('developer') || lowerRole.includes('engineer') || lowerRole.includes('architect')) {
    return { category: 'tech', icon: 'code' };
  }
  
  if (lowerRole.includes('cmo') || lowerRole.includes('market') || lowerRole.includes('sales') || lowerRole.includes('growth')) {
    return { category: 'marketing', icon: 'brain' };
  }
  
  if (lowerRole.includes('cfo') || lowerRole.includes('financ') || lowerRole.includes('account')) {
    return { category: 'finance', icon: 'chart-bar' };
  }
  
  if (lowerRole.includes('coo') || lowerRole.includes('operat') || lowerRole.includes('logistics')) {
    return { category: 'operations', icon: 'settings' };
  }
  
  if (lowerRole.includes('hr') || lowerRole.includes('people') || lowerRole.includes('talent')) {
    return { category: 'hr', icon: 'users' };
  }
  
  if (lowerRole.includes('ceo') || lowerRole.includes('lead') || lowerRole.includes('founder') || lowerRole.includes('director')) {
    return { category: 'leadership', icon: 'trophy' };
  }
  
  // Default
  return { category: 'tech', icon: 'layout-grid' };
};

const CompanySetup = () => {
  const [desc, setDesc] = useState("");
  const [descError, setDescError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedRoles, setSuggestedRoles] = useState<string[]>([]);
  const navigate = useNavigate();
  const { setCompany, setRoles } = useCompany();
  const lang = useLang();
  const t = TRANSLATIONS[lang];

  // Simulated AI analysis: Replace this with a real API/integration as needed
  const analyzeDescription = async (desc: string, lang: LangType) => {
    setIsAnalyzing(true);
    setDescError("");
    setSuggestedRoles([]);
    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 1300));
    // Very basic mock logic (returns different roles based on common keywords, with localization)
    const lower = desc.toLowerCase();
    if (lang === "ar") {
      if (lower.includes("لوجستية") || lower.includes("نقل")) {
        return [
          "الرئيس التنفيذي (CEO)",
          "كبير الخبراء التقنيين (CTO)",
          "مسؤول العمليات (COO)",
          "خبير في الخدمات اللوجستية",
          "خبير مالي"
        ];
      }
      if (lower.includes("منصة") || lower.includes("تطبيق")) {
        return [
          "الرئيس التنفيذي (CEO)",
          "قائد هندسة البرمجيات",
          "مدير المنتج",
          "خبير تسويق",
          "خبير مالي"
        ];
      }
      return [
        "الرئيس التنفيذي (CEO)",
        "خبير تقني",
        "خبير تسويق",
        "مسؤول مالي"
      ];
    } else {
      if (lower.includes("logistics") || lower.includes("shipping")) {
        return [
          "CEO",
          "CTO",
          "COO",
          "Logistics Specialist",
          "Financial Expert"
        ];
      }
      if (lower.includes("app") || lower.includes("platform")) {
        return [
          "CEO",
          "Lead Software Engineer",
          "Product Manager",
          "Marketing Expert",
          "Finance Specialist"
        ];
      }
      return [
        "CEO",
        "Technical Expert",
        "Marketing Expert",
        "Finance Specialist"
      ];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) {
      setDescError(t.descError);
      return;
    }
    setIsAnalyzing(true);
    const roles = await analyzeDescription(desc, lang);
    setSuggestedRoles(roles || []);
    setIsAnalyzing(false);
  };

  const handleCreateTeam = () => {
    // Convert string roles to Role objects
    const teamRoles: Role[] = suggestedRoles.map(role => {
      const { category, icon } = getCategoryAndIcon(role);
      return {
        id: nanoid(),
        title: role,
        description: `AI assistant specialized in ${role} responsibilities`,
        category: category as any,
        responsibilities: [
          `Provide expertise in ${role} areas`,
          `Assist with strategy and execution`,
          `Answer questions related to ${role} responsibilities`,
          `Help optimize ${role} operations`
        ],
        icon: icon
      };
    });

    // Save the company and roles to context
    setCompany({
      name: "AI Startup Team",
      type: "tech_startup",
      description: desc
    });
    
    // Set the roles directly in the context
    setRoles(teamRoles);
    
    // Navigate to the team dashboard
    navigate("/team");
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{t.description}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="startupDesc">{t.promptLabel}</Label>
            <Textarea
              id="startupDesc"
              placeholder={t.promptPlaceholder}
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className={descError ? "border-destructive" : ""}
              dir={lang === "ar" ? "rtl" : "ltr"}
              style={{ fontFamily: lang === "ar" ? "Tahoma, Arial, 'Noto Sans Arabic', sans-serif" : undefined }}
              rows={5}
              maxLength={600}
            />
            {descError && (
              <p className="text-sm text-destructive">{descError}</p>
            )}
          </div>
          <div className="flex justify-center pt-4">
            <Button type="submit" size="lg" disabled={isAnalyzing || !desc.trim()}>
              {isAnalyzing ? (
                <span className="animate-pulse opacity-70">{t.submitButton}...</span>
              ) : t.submitButton}
            </Button>
          </div>
        </form>
        {suggestedRoles.length > 0 && (
          <div className="mt-12 p-6 border rounded bg-muted-foreground/2">
            <h2 className="mb-4 text-xl font-semibold">{t.suggestedRolesTitle}</h2>
            <ul className="list-disc ml-6 text-lg space-y-1">
              {suggestedRoles.map(role => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <div className="flex justify-between mt-6">
              <Button variant="outline" size="sm" onClick={()=>setSuggestedRoles([])}>
                {t.retry}
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleCreateTeam}
              >
                {t.buildTeamButton}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompanySetup;
