import { useContext } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { UserPreferencesContext } from "@/context/UserPreferencesContext";

interface ThemeProps {
  light?: string;
  dark?: string;
}

export function useThemeColor(
  props: ThemeProps,
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const systemTheme = useColorScheme();
  const { theme: userTheme } = useContext(UserPreferencesContext);

  const theme =
    userTheme === "dark" || userTheme === "light"
      ? userTheme
      : systemTheme === "dark" || systemTheme === "light"
        ? systemTheme
        : "light";

  const colorFromProps = props[theme];

  return colorFromProps || Colors[theme][colorName];
}
