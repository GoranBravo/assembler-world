import React, { createContext, useState, ReactNode, useMemo } from "react";

interface UserPreferencesContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const UserPreferencesContext = createContext<UserPreferencesContextType>(
  {
    theme: "dark",
    setTheme: () => {},
  }
);

export const UserPreferencesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const memoValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <UserPreferencesContext.Provider value={memoValue}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
