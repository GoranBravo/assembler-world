import React, { createContext, useState, ReactNode } from 'react';

interface UserPreferencesContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const UserPreferencesContext = createContext<UserPreferencesContextType>({
  theme: 'dark',
  setTheme: () => {},
});

export const UserPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <UserPreferencesContext.Provider value={{ theme, setTheme }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
