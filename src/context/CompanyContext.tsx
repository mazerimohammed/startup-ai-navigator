
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Company, CompanyType, Role } from '@/types';
import { generateTeamRoles } from '@/lib/ai-helpers';

interface CompanyContextType {
  company: Company | null;
  roles: Role[];
  isLoading: boolean;
  setCompany: (company: Company) => void;
  generateRoles: () => void;
  addCustomRole: (role: Role) => void;
  clearCompany: () => void;
  setRoles: (roles: Role[]) => void;
}

const defaultContext: CompanyContextType = {
  company: null,
  roles: [],
  isLoading: false,
  setCompany: () => {},
  generateRoles: () => {},
  addCustomRole: () => {},
  clearCompany: () => {},
  setRoles: () => {},
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
      // استدعاء دالة توليد الأدوار المتخصصة
      const generatedRoles = await generateTeamRoles(company.type);
      setRoles(generatedRoles);
    } catch (error) {
      console.error('Error generating roles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCustomRole = (newRole: Role) => {
    setRoles(prevRoles => [...prevRoles, newRole]);
  };

  return (
    <CompanyContext.Provider
      value={{
        company,
        roles,
        isLoading,
        setCompany,
        generateRoles,
        addCustomRole,
        clearCompany,
        setRoles,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
