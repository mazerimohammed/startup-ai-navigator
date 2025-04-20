
import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const LANGS = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" }
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const langConfig = LANGS.find(l => l.code === lang)!;

  return (
    <div
      className="flex min-h-screen flex-col transition-all"
      lang={langConfig.code}
      dir={langConfig.dir}
      style={{ fontFamily: lang === "ar" ? "Tahoma, Arial, 'Noto Sans Arabic', sans-serif" : undefined }}
    >
      <Navbar />
      <div className="flex justify-end px-4 pt-4">
        <select
          value={lang}
          onChange={e => setLang(e.target.value as "en" | "ar")}
          className="border rounded p-1 text-sm"
        >
          {LANGS.map(l => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
      </div>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
