// src/components/AppProviders.tsx
'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/context/ThemeContext';
import MainNavbar from './MainNavbar';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainNavbar />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
