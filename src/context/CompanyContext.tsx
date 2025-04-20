
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Company, CompanyType, Role } from '@/types';
import { generateTeamRoles } from '@/lib/ai-helpers';

interface CompanyContextType {
  company: Company | null;
  roles: Role[];
  isLoading: boolean;
  setCompany: (company: Company) => void;
  generateRoles: () => void;
  clearCompany: () => void;
}

const defaultContext: CompanyContextType = {
  company: null,
  roles: [],
  isLoading: false,
  setCompany: () => {},
  generateRoles: () => {},
  clearCompany: () => {},
};

const CompanyContext = createContext<CompanyContextType>(defaultContext);

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [company, setCompanyState] = useState<Company | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const setCompany = (newCompany: Company) => {
    setCompanyState(newCompany);
  };

  const clearCompany = () => {
    setCompanyState(null);
    setRoles([]);
  };

  const generateRoles = async () => {
    if (!company) return;
    
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to an AI service
      const generatedRoles = await generateTeamRoles(company.type);
      setRoles(generatedRoles);
    } catch (error) {
      console.error('Error generating roles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        company,
        roles,
        isLoading,
        setCompany,
        generateRoles,
        clearCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
