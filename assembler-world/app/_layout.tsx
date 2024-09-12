import { Stack } from "expo-router";
import Layout from "../components/Layout";

export default function RootLayout() {
  return (
    <Layout>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
      </Stack>
    </Layout>
  );
}
