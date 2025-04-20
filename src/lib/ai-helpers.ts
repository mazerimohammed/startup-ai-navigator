
import { CompanyType, Role, RoleCategory } from '@/types';

// This is a mock implementation that would be replaced with actual AI calls
// in a production app, most likely using OpenAI or a similar service
export const generateTeamRoles = async (companyType: CompanyType): Promise<Role[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return predefined roles based on company type
  return getRolesByCompanyType(companyType);
};

export const generateAIResponse = async (
  role: Role, 
  query: string
): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if the query contains code request and role is technical
  if (role.category === 'tech' && (query.toLowerCase().includes('كود') || 
      query.toLowerCase().includes('code') || 
      query.toLowerCase().includes('برمجة'))) {
    return getSpecializedTechResponse(role.title, query);
  } 
  
  // Check if the query is about financial analysis
  else if (role.category === 'finance' && (query.toLowerCase().includes('تحليل') || 
           query.toLowerCase().includes('دراسة') ||
           query.toLowerCase().includes('سوق') || 
           query.toLowerCase().includes('market'))) {
    return getSpecializedFinanceResponse(role.title, query);
  }
  
  // Check if the query is about marketing strategy
  else if (role.category === 'marketing' && (query.toLowerCase().includes('تسويق') || 
           query.toLowerCase().includes('استراتيجية') ||
           query.toLowerCase().includes('عملاء') || 
           query.toLowerCase().includes('marketing'))) {
    return getSpecializedMarketingResponse(role.title, query);
  }
  
  // Check if the query is about operations or HR
  else if ((role.category === 'operations' || role.category === 'hr') && 
           (query.toLowerCase().includes('عمليات') || 
            query.toLowerCase().includes('موظفين') ||
            query.toLowerCase().includes('تنظيم') || 
            query.toLowerCase().includes('operations') ||
            query.toLowerCase().includes('employees'))) {
    return getSpecializedOperationsResponse(role.title, query, role.category);
  }
  
  // Use default response for general or leadership questions
  else {
    return `بصفتي ${role.title}، أنصحك بما يلي: ${getAIMockResponse(role.category, query)}`;
  }
};

// Specialized response generators
function getSpecializedTechResponse(roleTitle: string, query: string): string {
  // Technical roles like CTO, Product Manager, etc.
  const techResponses = [
    {
      // Response for code-related queries
      query: 'code application',
      response: `بصفتي ${roleTitle}، إليك كود تطبيق بسيط يمكنك البدء به:
      
\`\`\`javascript
// بنية تطبيق ويب بسيط
import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // محاكاة جلب البيانات من API
    setTimeout(() => {
      setData([
        { id: 1, name: 'منتج أ', price: 100 },
        { id: 2, name: 'منتج ب', price: 200 },
        { id: 3, name: 'منتج ج', price: 300 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">تطبيقك الجديد</h1>
      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <ul className="space-y-2">
          {data.map((item) => (
            <li key={item.id} className="p-2 border rounded">
              {item.name} - {item.price} ريال
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
\`\`\`

يمكن تخصيص هذا الكود حسب احتياجات مشروعك المحدد. هل تريد تفاصيل أكثر حول أي جزء معين؟`
    },
    {
      // Response for architecture-related queries
      query: 'architecture',
      response: `بصفتي ${roleTitle}، إليك هيكلة مقترحة لبنية مشروعك:
      
\`\`\`
project-root/
├── src/
│   ├── components/         # مكونات واجهة المستخدم
│   │   ├── common/         # مكونات مشتركة (أزرار، حقول إدخال، الخ)
│   │   ├── layout/         # مكونات التخطيط (header, footer, etc)
│   │   └── features/       # مكونات خاصة بميزات معينة
│   ├── hooks/              # React hooks مخصصة
│   ├── context/            # React context providers
│   ├── services/           # خدمات API والاتصال بالخادم
│   ├── utils/              # وظائف مساعدة
│   ├── types/              # تعريفات TypeScript
│   ├── assets/             # الصور والملفات الثابتة
│   ├── styles/             # ملفات التنسيق
│   ├── pages/              # صفحات التطبيق
│   ├── App.tsx             # مكون التطبيق الرئيسي
│   └── main.tsx            # نقطة الدخول للتطبيق
├── public/                 # ملفات عامة
├── package.json            # تبعيات المشروع
└── README.md               # وثائق المشروع
\`\`\`

هذه البنية تتبع أفضل الممارسات وتسهل صيانة التطبيق وتوسيعه مستقبلاً. هل ترغب في معرفة المزيد عن أي قسم محدد؟`
    },
    {
      // Database schema
      query: 'database',
      response: `بصفتي ${roleTitle}، إليك مخطط قاعدة بيانات مقترح لمشروعك:
      
\`\`\`sql
-- جدول المستخدمين
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المنتجات
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الطلبات
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول تفاصيل الطلبات
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL
);
\`\`\`

هذا المخطط البسيط يمكن تخصيصه وتوسيعه حسب متطلبات مشروعك المحددة. هل ترغب في إضافة جداول أخرى أو حقول معينة؟`
    }
  ];
  
  // Choose the most relevant response based on query keywords
  if (query.toLowerCase().includes('كود') || query.toLowerCase().includes('code') || query.toLowerCase().includes('تطبيق')) {
    return techResponses[0].response;
  } else if (query.toLowerCase().includes('هيكل') || query.toLowerCase().includes('بنية') || query.toLowerCase().includes('architecture')) {
    return techResponses[1].response;
  } else if (query.toLowerCase().includes('قاعدة بيانات') || query.toLowerCase().includes('database') || query.toLowerCase().includes('داتا')) {
    return techResponses[2].response;
  }
  
  // Default tech response
  return `بصفتي ${roleTitle}، إليك تحليلي التقني:
  
يمكنني اقتراح استخدام React مع TypeScript لتطوير واجهة المستخدم الأمامية لمشروعك، مع Node.js وExpress للخلفية. للبيانات، أوصي باستخدام قاعدة بيانات PostgreSQL.

الخطوات التقنية المقترحة:
1. البدء بتصميم واجهة المستخدم وهيكل البيانات
2. إعداد بيئة التطوير والمكتبات اللازمة
3. بناء نماذج أولية للميزات الأساسية
4. اختبار وتحسين الأداء

هل تريد تفاصيل أكثر عن أي جانب تقني محدد؟`;
}

function getSpecializedFinanceResponse(roleTitle: string, query: string): string {
  // Financial analysis based on query
  return `بصفتي ${roleTitle}، إليك تحليلي المالي المتخصص:
  
### دراسة السوق والتحليل المالي

**حجم السوق المستهدف:**
- قيمة السوق الإجمالية المقدرة: 2.5 مليار دولار
- معدل النمو السنوي المتوقع: 12-15%
- حصة السوق المستهدفة خلال السنة الأولى: 0.5-1%

**تحليل التكاليف المتوقعة:**
1. تكاليف التأسيس: $50,000 - $100,000
   - تطوير المنتج: 60%
   - التسويق المبدئي: 25%
   - المصاريف القانونية والإدارية: 15%

2. التكاليف التشغيلية الشهرية: $15,000 - $25,000
   - رواتب الفريق: 65%
   - استضافة وبنية تحتية تقنية: 10%
   - تسويق مستمر: 20%
   - نفقات متنوعة: 5%

**توقعات الإيرادات:**
- السنة الأولى: $120,000 - $200,000
- السنة الثانية: $350,000 - $500,000
- السنة الثالثة: $800,000 - $1,200,000

**نقطة التعادل المالي:**
- متوقعة بعد 18-24 شهر من الإطلاق

**معدل العائد الداخلي المتوقع (IRR):**
- 30-35% على مدى 5 سنوات

**توصيات لضمان النجاح المالي:**
1. البدء بنموذج Minimum Viable Product (MVP) لتقليل التكاليف المبدئية
2. التركيز على اكتساب العملاء بتكلفة منخفضة في المراحل الأولى
3. إعادة استثمار 70% من الإيرادات المبكرة في النمو
4. تخصيص 10-15% من الميزانية للطوارئ والفرص غير المتوقعة
5. السعي للحصول على تمويل خارجي بعد إثبات نجاح النموذج

هل ترغب في تحليل أعمق لأي جانب مالي محدد للمشروع؟`;
}

function getSpecializedMarketingResponse(roleTitle: string, query: string): string {
  // Marketing strategy based on query
  return `بصفتي ${roleTitle}، إليك استراتيجية التسويق المقترحة:
  
### خطة التسويق الشاملة

**تحليل الجمهور المستهدف:**
- الفئة العمرية الرئيسية: 25-45 سنة
- اهتمامات: التكنولوجيا، الابتكار، حلول توفير الوقت
- نقاط الألم: الحاجة إلى حلول فعالة وسهلة الاستخدام

**قنوات التسويق الموصى بها:**
1. **التسويق الرقمي (50% من ميزانية التسويق)**
   - إعلانات مستهدفة على وسائل التواصل الاجتماعي
   - حملات البحث مدفوعة الأجر (SEM)
   - تحسين محركات البحث (SEO)
   - تسويق المحتوى (مدونات، مقالات متخصصة)

2. **التسويق بالشراكة (25%)**
   - برنامج الإحالة والمكافآت
   - شراكات مع مؤثرين في المجال
   - تعاون مع شركات متكاملة

3. **العلاقات العامة والفعاليات (15%)**
   - المشاركة في المؤتمرات والمعارض المتخصصة
   - ندوات ومحاضرات عبر الإنترنت (Webinars)
   - قصص نجاح العملاء ودراسات الحالة

4. **التسويق المباشر (10%)**
   - حملات البريد الإلكتروني المستهدفة
   - اجتماعات عروض تقديمية مع العملاء المحتملين
   - مكالمات متابعة للعملاء المحتملين ذوي الأولوية

**استراتيجية المحتوى:**
- إنشاء محتوى تعليمي يوضح قيمة الخدمة/المنتج
- نشر دراسات حالة ومقارنات تنافسية
- فيديوهات توضيحية قصيرة عن ميزات المنتج
- محتوى تفاعلي (اختبارات، حاسبات، أدوات مجانية)

**مؤشرات الأداء الرئيسية (KPIs):**
- تكلفة اكتساب العميل (CAC): أقل من $50
- معدل تحويل الزائرين: 2-5%
- معدل الاحتفاظ بالعملاء: <85% بعد 12 شهر
- قيمة العميل على مدى الحياة (LTV): <$300

هل ترغب في التعمق أكثر في أي جانب من جوانب هذه الاستراتيجية التسويقية؟`;
}

function getSpecializedOperationsResponse(roleTitle: string, query: string, category: RoleCategory): string {
  // Operations or HR response based on query and role category
  if (category === 'hr') {
    return `بصفتي ${roleTitle}، إليك خطة الموارد البشرية والتوظيف:
    
### استراتيجية إدارة الموارد البشرية

**هيكل الفريق المقترح للسنة الأولى:**
1. **الفريق الأساسي (الأولوية):**
   - مؤسس/مدير تنفيذي (أنت)
   - مطور رئيسي (Full-stack)
   - مسؤول تسويق ومبيعات
   - مصمم واجهات مستخدم/تجربة مستخدم (بدوام جزئي)

2. **التوسع المرحلة الثانية (بعد 6-9 أشهر):**
   - مطور إضافي (واجهة أمامية أو خلفية)
   - مدير علاقات العملاء
   - متخصص تسويق رقمي/محتوى
   - مساعد إداري

**سياسة التوظيف والرواتب:**
- مزيج من التوظيف المباشر والتعاقد الخارجي للأدوار المتخصصة
- هيكل تعويضات تنافسي: 70% راتب ثابت، 30% حوافز مرتبطة بالأداء
- خيارات أسهم للموظفين الأساسيين (1-5%)

**استراتيجية العمل عن بعد:**
- نموذج هجين: 2-3 أيام في المكتب، 2-3 أيام عن بعد
- أدوات تعاون رقمية: Slack للتواصل، Asana لإدارة المشاريع، Notion للتوثيق
- اجتماعات أسبوعية للفريق وجلسات تخطيط ربع سنوية

**برامج التطوير والتدريب:**
- ميزانية تعليمية سنوية لكل موظف: $1,000
- تدريب داخلي أسبوعي (ساعة واحدة): مشاركة المعرفة والمهارات
- تقييم أداء ربع سنوي مع خطط تطوير فردية

**ثقافة الشركة وقيمها:**
- الابتكار والتحسين المستمر
- التوازن بين العمل والحياة
- العمل الجماعي والشفافية
- التركيز على خدمة العملاء

هل ترغب في تفاصيل أكثر حول أي جانب من استراتيجية الموارد البشرية؟`;
  }
  
  // For operations role
  return `بصفتي ${roleTitle}، إليك خطة العمليات المقترحة:
  
### إطار العمليات التشغيلية

**عمليات تطوير المنتج:**
1. **منهجية العمل:** Agile Scrum مع دورات إنتاج (sprints) مدتها أسبوعين
2. **مراحل التطوير:**
   - التخطيط والتصميم: 20% من الوقت
   - التطوير: 50% من الوقت
   - الاختبار والتحسين: 20% من الوقت
   - النشر والتوثيق: 10% من الوقت
3. **أدوات إدارة المشاريع:** JIRA للتتبع، GitHub للكود، Figma للتصميم

**سير العمليات التشغيلية:**
- **إدارة المنتج:** تحديد أولويات الميزات بناءً على قيمة العملاء وجهد التنفيذ
- **تطوير البرمجيات:** عمليات CI/CD لضمان النشر السريع والآمن
- **دعم العملاء:** نظام متعدد المستويات (دعم ذاتي، دعم بالدردشة، دعم مخصص)
- **مراقبة الجودة:** اختبارات آلية، مراجعات دورية، وتحليل بيانات استخدام المنتج

**مؤشرات الأداء الرئيسية للعمليات:**
- معدل إصدار ميزات جديدة: 2-4 ميزات شهريًا
- متوسط وقت حل المشكلات: <24 ساعة
- توافر النظام: 99.9%
- معدل الأخطاء البرمجية: <5 لكل 1000 سطر من الكود

**الموارد والبنية التحتية:**
- خدمات سحابية: AWS أو Google Cloud
- خدمات الطرف الثالث الأساسية: معالجة المدفوعات، التحليلات، البريد الإلكتروني
- خدمات النسخ الاحتياطي والتعافي من الكوارث

**خطة توسيع نطاق العمليات:**
- المرحلة الأولى (0-6 أشهر): التركيز على MVP وتحسين المنتج الأساسي
- المرحلة الثانية (6-12 شهر): أتمتة العمليات وتحسين تجربة المستخدم
- المرحلة الثالثة (12-24 شهر): توسيع نطاق البنية التحتية وإضافة ميزات متقدمة

هل ترغب في تفاصيل أكثر حول أي جانب من استراتيجية العمليات التشغيلية؟`;
}

// Mock data - in a real app this would come from an AI service
function getRolesByCompanyType(companyType: CompanyType): Role[] {
  const baseRoles: Role[] = [
    {
      id: 'ceo',
      title: 'CEO & Strategic Advisor',
      description: 'Provides strategic direction and leadership for your business',
      category: 'leadership',
      responsibilities: [
        'Strategic planning',
        'Company vision and mission',
        'Leadership guidance',
        'Decision making frameworks'
      ],
      icon: 'trophy'
    },
  ];

  const techRoles: Role[] = [
    {
      id: 'cto',
      title: 'CTO & Technical Advisor',
      description: 'Guides technology decisions and development strategy',
      category: 'tech',
      responsibilities: [
        'Technical architecture',
        'Technology selection',
        'Development processes',
        'Technical team structure'
      ],
      icon: 'code'
    },
    {
      id: 'product_manager',
      title: 'Product Manager',
      description: 'Determines product features and roadmap based on user needs',
      category: 'tech',
      responsibilities: [
        'Product roadmap',
        'Feature prioritization',
        'User research',
        'Product market fit'
      ],
      icon: 'layout-grid'
    }
  ];

  const marketingRoles: Role[] = [
    {
      id: 'cmo',
      title: 'CMO & Marketing Strategist',
      description: 'Creates and executes marketing strategies to drive growth',
      category: 'marketing',
      responsibilities: [
        'Marketing strategy',
        'Brand development',
        'Growth campaigns',
        'Customer acquisition'
      ],
      icon: 'brain'
    }
  ];

  const financeRoles: Role[] = [
    {
      id: 'cfo',
      title: 'CFO & Financial Advisor',
      description: 'Manages financial planning, fundraising and cash management',
      category: 'finance',
      responsibilities: [
        'Financial planning',
        'Fundraising strategy',
        'Cash flow management',
        'Financial reporting'
      ],
      icon: 'chart-bar'
    }
  ];

  const operationsRoles: Role[] = [
    {
      id: 'coo',
      title: 'COO & Operations Advisor',
      description: 'Optimizes business operations and processes',
      category: 'operations',
      responsibilities: [
        'Operational efficiency',
        'Process optimization',
        'Supply chain management',
        'Vendor relations'
      ],
      icon: 'settings'
    }
  ];

  const hrRoles: Role[] = [
    {
      id: 'chro',
      title: 'CHRO & People Advisor',
      description: 'Develops HR strategy and manages people operations',
      category: 'hr',
      responsibilities: [
        'Hiring strategy',
        'Team culture',
        'Compensation planning',
        'Performance management'
      ],
      icon: 'users'
    }
  ];

  // Return different role combinations based on company type
  switch (companyType) {
    case 'tech_startup':
      return [...baseRoles, ...techRoles, marketingRoles[0], financeRoles[0], hrRoles[0]];
    case 'saas':
      return [...baseRoles, ...techRoles, marketingRoles[0], financeRoles[0], operationsRoles[0]];
    case 'ecommerce':
      return [...baseRoles, techRoles[0], marketingRoles[0], operationsRoles[0], financeRoles[0]];
    case 'fintech':
      return [...baseRoles, ...techRoles, financeRoles[0], operationsRoles[0], hrRoles[0]];
    case 'healthcare':
      return [...baseRoles, techRoles[0], operationsRoles[0], financeRoles[0], hrRoles[0]];
    case 'edtech':
      return [...baseRoles, ...techRoles, marketingRoles[0], financeRoles[0]];
    case 'marketplaceApp':
      return [...baseRoles, ...techRoles, marketingRoles[0], operationsRoles[0]];
    case 'media':
      return [...baseRoles, techRoles[0], marketingRoles[0], financeRoles[0]];
    case 'manufacturing':
      return [...baseRoles, techRoles[0], operationsRoles[0], financeRoles[0], hrRoles[0]];
    case 'other':
    default:
      return [...baseRoles, techRoles[0], marketingRoles[0], financeRoles[0]];
  }
}

function getAIMockResponse(roleCategory: RoleCategory, query: string): string {
  // These are mock responses - in a real app, these would come from an AI service
  const responses = {
    tech: [
      "أوصي باعتماد هيكل microservices لتحسين قابلية التوسع.",
      "فكر في تنفيذ أنابيب CI/CD لتبسيط عملية التطوير الخاصة بك.",
      "بناءً على متطلباتك، سيكون React مع TypeScript هو الاختيار الأمثل للواجهة الأمامية.",
      "أقترح تنفيذ التحقق من صحة البيانات على مستويي العميل والخادم لأمان قوي."
    ],
    marketing: [
      "ركز على تسويق المحتوى لترسيخ علامتك التجارية كرائد فكر في هذا المجال.",
      "نفذ استراتيجية وسائط اجتماعية تستهدف LinkedIn وTwitter للتواصل بين الشركات.",
      "أنشئ برنامج إحالة للاستفادة من قاعدة عملائك الحالية للنمو.",
      "طور دراسات حالة تسلط الضوء على قصص نجاح العملاء لبناء المصداقية."
    ],
    finance: [
      "حافظ على مدة تشغيل نقدية لمدة 12 شهرًا خلال المراحل المبكرة لضمان الاستقرار التشغيلي.",
      "فكر في نموذج تسعير هجين يشمل كلاً من مكونات الاشتراك والاستخدام.",
      "خصص 15-20٪ من ميزانيتك للبحث والتطوير للحفاظ على الميزة التنافسية.",
      "قم بإعداد التوقعات المالية لثلاثة سيناريوهات: محافظ، متوقع، ومتفائل."
    ],
    operations: [
      "قم بتنفيذ منهجيات Agile عبر الإدارات لتحسين التعاون بين الوظائف.",
      "اعتمد OKRs (الأهداف والنتائج الرئيسية) لتحديد الأهداف وتتبع الأداء.",
      "قم بتبسيط عملية تأهيل العملاء لتقليل الوقت اللازم للحصول على القيمة.",
      "فكر في الاستعانة بمصادر خارجية للوظائف غير الأساسية لتحسين تخصيص الموارد."
    ],
    hr: [
      "قم بتنفيذ نهج التوظيف القائم على المهارات بدلاً من التركيز فقط على الخبرة.",
      "طور ثقافة تعتمد على العمل عن بعد أولاً مع بروتوكولات الاتصال المنظمة.",
      "أنشئ هيكل تعويض شفاف لضمان الإنصاف والعدالة.",
      "قم بتنفيذ جلسات ردود فعل 360 درجة منتظمة لتعزيز التحسين المستمر."
    ],
    leadership: [
      "ركز على بناء ثقافة شركة قوية في وقت مبكر - فمن الصعب تغييرها لاحقًا.",
      "طور رؤية واضحة وتأكد من توصيلها بشكل متسق عبر المؤسسة.",
      "حافظ على التوافق بين المؤسس والسوق من خلال البقاء على اتصال بمشاكل العملاء.",
      "التوازن بين التفكير الاستراتيجي والتنفيذ - كلاهما ضروري في المراحل المبكرة."
    ]
  };

  // Select a random response from the appropriate category
  const categoryResponses = responses[roleCategory];
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}
