import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DailyTask from "@/screens/DailyTask";

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={DailyTask}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;