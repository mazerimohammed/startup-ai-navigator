
export type CompanyType = 
  | 'tech_startup'
  | 'ecommerce'
  | 'fintech'
  | 'saas'
  | 'healthcare'
  | 'edtech'
  | 'marketplaceApp'
  | 'media'
  | 'manufacturing'
  | 'other';

export type RoleCategory = 
  | 'tech'
  | 'marketing'
  | 'finance'
  | 'operations'
  | 'hr'
  | 'leadership';

export interface Role {
  id: string;
  title: string;
  description: string;
  category: RoleCategory;
  responsibilities: string[];
  icon: string;
}

export interface Company {
  name: string;
  type: CompanyType;
  description?: string;
}
