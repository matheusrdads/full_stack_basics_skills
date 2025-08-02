// src/context/SearchContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Filters {
  id: string;
  title: string;
  body: string;
}

interface SearchContextType {
  filters: Filters;
  handleSearch: (newFilters: Filters) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    id: '',
    title: '',
    body: '',
  });

  const handleSearch = (newFilters: Filters) => {
    setFilters(newFilters);
  };
  
  const value = {
    filters,
    handleSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};