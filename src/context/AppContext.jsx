import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import { UserProvider } from './UserContext';
import { NavigationProvider } from './NavigationContext';
import { ToastProvider } from '../hooks/useToast'; // We will create this hook/provider later

/**
 * AppProvider
 * Wraps the application with all necessary global context providers.
 * Order matters: Theme usually comes first or is independent.
 * User often depends on Language or Theme.
 */
export const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <NavigationProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </NavigationProvider>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
