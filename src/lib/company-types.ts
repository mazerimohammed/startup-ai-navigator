
import { CompanyType } from '@/types';

export interface CompanyTypeOption {
  id: CompanyType;
  name: string;
  description: string;
  icon: string;
}

export const companyTypes: CompanyTypeOption[] = [
  {
    id: 'tech_startup',
    name: 'Technology Startup',
    description: 'Building innovative software or hardware solutions',
    icon: '💻'
  },
  {
    id: 'saas',
    name: 'SaaS Company',
    description: 'Providing software as a service solutions',
    icon: '☁️'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Online retail and product sales',
    icon: '🛒'
  },
  {
    id: 'fintech',
    name: 'FinTech',
    description: 'Financial technology and services',
    icon: '💳'
  },
  {
    id: 'healthcare',
    name: 'Healthcare / MedTech',
    description: 'Health services or medical technology',
    icon: '🏥'
  },
  {
    id: 'edtech',
    name: 'EdTech',
    description: 'Educational technology and services',
    icon: '🎓'
  },
  {
    id: 'marketplaceApp',
    name: 'Marketplace App',
    description: 'Platform connecting buyers and sellers',
    icon: '🤝'
  },
  {
    id: 'media',
    name: 'Media & Entertainment',
    description: 'Content, publishing, and entertainment',
    icon: '🎬'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Production and manufacturing services',
    icon: '🏭'
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Your company type is not listed above',
    icon: '🚀'
  }
];
