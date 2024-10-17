import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MarkersProvider } from "@/context/MarkersContext";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UserPreferencesProvider>
      <MarkersProvider>
        <NavBar />
        <View style={styles.container}>{children}</View>
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
