import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import { SafeAreaView, View, StyleSheet, Platform } from "react-native";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserPreferencesProvider>
        <NavBar />
        <View style={styles.container}>{children}</View>
      </UserPreferencesProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    flex: 1,
  },
});

export default Layout;
