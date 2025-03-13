import AsyncStorage from "@react-native-async-storage/async-storage";

export const save = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getValueFor = async (key: string): Promise<string | null> => {
  try {
    const result = await AsyncStorage.getItem(key);
    return result ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteValue = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
