import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import { View, StyleSheet, Platform } from "react-native";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UserPreferencesProvider>
      <NavBar />
      <View style={styles.container}>{children}</View>
    </UserPreferencesProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    flex: 1,
  },
});

export default Layout;
