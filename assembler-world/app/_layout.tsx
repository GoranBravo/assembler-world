import { Stack } from "expo-router";
import Layout from "../components/Layout";

export default function RootLayout() {
  return (
    <Layout>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: "Bienvenido a AssemblerWorld" }} />
        <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Task" options={{ headerShown: false }} />
        <Stack.Screen name="task/[taskId]" options={{ headerShown: false }} />
      </Stack>
    </Layout>
  );
}
