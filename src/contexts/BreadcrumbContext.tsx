import React, { createContext, useContext, useState } from 'react';

interface BreadcrumbContextType {
  fields: BreadcrumbItemProps[];
  setBreadcrumb: (bc: BreadcrumbItemProps[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemProps[]>([]);

  return <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>{children}</BreadcrumbContext.Provider>;
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within BreadcrumbProvider');
  }

  return context;
};
