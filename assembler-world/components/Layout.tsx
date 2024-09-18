import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

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
    flex: 1,
  },
});

export default Layout;
