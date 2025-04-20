
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
  
  // Mock response based on role
  return `As your ${role.title}, I recommend: ${getAIMockResponse(role.category, query)}`;
};

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
      "I recommend adopting a microservices architecture to improve scalability.",
      "Consider implementing CI/CD pipelines to streamline your development process.",
      "Based on your requirements, React with TypeScript would be the optimal frontend choice.",
      "I suggest implementing data validation at both client and server levels for robust security."
    ],
    marketing: [
      "Focus on content marketing to establish your brand as a thought leader in the space.",
      "Implement a social media strategy targeting LinkedIn and Twitter for B2B engagement.",
      "Create a referral program to leverage your existing customer base for growth.",
      "Develop case studies highlighting customer success stories to build credibility."
    ],
    finance: [
      "Maintain a 12-month cash runway during your early stages to ensure operational stability.",
      "Consider a hybrid pricing model with both subscription and usage-based components.",
      "Allocate 15-20% of your budget to R&D to maintain competitive advantage.",
      "Prepare financial projections for three scenarios: conservative, expected, and optimistic."
    ],
    operations: [
      "Implement Agile methodologies across departments to improve cross-functional collaboration.",
      "Adopt OKRs (Objectives and Key Results) for goal-setting and performance tracking.",
      "Streamline your customer onboarding process to reduce time-to-value.",
      "Consider outsourcing non-core functions to optimize resource allocation."
    ],
    hr: [
      "Implement a skills-based hiring approach rather than focusing solely on experience.",
      "Develop a remote-first culture with structured communication protocols.",
      "Create a transparent compensation structure to ensure equity and fairness.",
      "Implement regular 360° feedback sessions to foster continuous improvement."
    ],
    leadership: [
      "Focus on building a strong company culture early - it's harder to change later.",
      "Develop a clear vision and make sure it's communicated consistently across the organization.",
      "Maintain founder-market fit by staying connected to customer problems.",
      "Balance between strategic thinking and execution - both are critical in early stages."
    ]
  };

  // Select a random response from the appropriate category
  const categoryResponses = responses[roleCategory];
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}
