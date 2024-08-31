import { Stack } from "expo-router";
import Layout from "./Layout";

export default function RootLayout() {
  return (
    <Layout>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="DailyTask" options={{ headerShown: false }} />
        <Stack.Screen name="Slider" options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" options={{headerShown: false}} />
      </Stack>
    </Layout>
  );
}
