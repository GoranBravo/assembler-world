import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import { View, StyleSheet } from "react-native";
import { MarkersProvider } from "@/context/MarkersContext";
import { AuthProvider } from "@/context/AuthContext";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UserPreferencesProvider>
      <MarkersProvider>
        <AuthProvider>
          <NavBar />
          <View style={styles.container}>{children}</View>
        </AuthProvider>
      </MarkersProvider>
    </UserPreferencesProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
