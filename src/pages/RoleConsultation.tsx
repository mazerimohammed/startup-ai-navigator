
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
  const [responses, setResponses] = useState<{text: string, time: Date}[]>([]);
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
      setResponses([...responses, {text: response, time: new Date()}]);
      setQuery("");
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to render responses with proper formatting
  const renderResponseContent = (content: string) => {
    // Check if the content contains code blocks
    if (content.includes("```")) {
      const parts = content.split(/```(?:[\w]*\n)?/);
      return (
        <>
          {parts.map((part, index) => {
            // Even indices are normal text, odd indices are code blocks
            if (index % 2 === 0) {
              return <p key={index} className="mb-2 whitespace-pre-line">{part}</p>;
            } else {
              return (
                <pre key={index} className="bg-gray-100 p-3 rounded-md my-2 overflow-x-auto rtl:text-left direction-ltr">
                  <code>{part}</code>
                </pre>
              );
            }
          })}
        </>
      );
    }
    
    // If no code blocks, render with line breaks preserved
    return <p className="whitespace-pre-line">{content}</p>;
  };

  const getExampleQueries = (category: string): string[] => {
    switch (category) {
      case "tech":
        return [
          "ما هي التقنيات المناسبة لمشروعي؟",
          "اكتب لي كود لتطبيق ويب بسيط",
          "اقترح هيكلة لقاعدة البيانات المناسبة"
        ];
      case "marketing":
        return [
          "اقترح استراتيجية تسويق لشركة ناشئة",
          "كيف يمكنني الوصول للعملاء المستهدفين؟", 
          "ما هي قنوات التسويق الأكثر فعالية؟"
        ];
      case "finance":
        return [
          "قدم لي دراسة جدوى مبسطة للمشروع",
          "ما هي التكاليف المتوقعة للسنة الأولى؟",
          "كيف يمكنني تخطيط ميزانية الشركة الناشئة؟"
        ];
      case "operations":
        return [
          "كيف يمكنني تنظيم العمليات في الشركة؟",
          "اقترح هيكلية إدارية للفريق",
          "ما هي أفضل الممارسات لإدارة المشاريع؟"
        ];
      case "hr":
        return [
          "كيف أبني فريق عمل متكامل للشركة الناشئة؟",
          "اقترح سياسة توظيف وأجور للموظفين",
          "كيف أبني ثقافة شركة إيجابية؟"
        ];
      case "leadership":
        return [
          "ما هي أولويات الشركة في السنة الأولى؟",
          "كيف يمكنني تطوير مهاراتي القيادية؟",
          "ما هي استراتيجيات النمو المناسبة؟"
        ];
      default:
        return [
          "ما هي أولوياتنا الحالية؟",
          "كيف يمكننا تحسين العمليات؟",
          "ما هي الاستراتيجيات المناسبة لنا؟"
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
          العودة للفريق
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
                    اسأل {role.title.split('&')[0].trim()} أي سؤال
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    احصل على نصائح واستشارات متخصصة بناءً على أفضل الممارسات في المجال
                  </p>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {getExampleQueries(role.category).map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto py-3 px-4 text-right"
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
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{new Date(response.time).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        {renderResponseContent(response.text)}
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <Textarea
                  placeholder={`اسأل ${role.title.split('&')[0].trim()} سؤالاً...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={3}
                  className="resize-none"
                  dir="rtl"
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading || !query.trim()}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full animate-pulse" />
                        جاري التفكير...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        إرسال
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
