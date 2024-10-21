import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import { View } from "react-native";
import { MarkersProvider } from "@/context/MarkersContext";
import { AuthProvider } from "@/context/AuthContext";
import css from "@/styles/css";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const styles = css()
  return (
    <UserPreferencesProvider>
      <MarkersProvider>
        <AuthProvider>
          <NavBar />
          <View style={styles.flex}>{children}</View>
        </AuthProvider>
      </MarkersProvider>
    </UserPreferencesProvider>
  );
};

export default Layout;
