import { addMarker } from "@/apis/addMarker";
import { markerLink } from "@/apis/linkMarker";
import { deleteValue, getValueFor, save } from "@/utils/storage";
import { router } from "expo-router";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { useMarkersContext } from "./MarkersContext";
import { useRouteInfo } from "expo-router/build/hooks";
import { loginCheck } from "@/apis/login";
import { deleteUser } from "@/apis/deleteUser";
import { getUser } from "@/apis/getUser";

interface AuthContextType {
  isLoggedIn: boolean;
  logout: () => Promise<void>;
  toMarker: () => Promise<void>;
  loginProve: (email: string, password: string) => Promise<void>;
  handleDeleteAcc: () => Promise<void>;
  getUserData: () => Promise<{ nombre: string; email: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { refreshMarkers } = useMarkersContext();
  const route = useRouteInfo();

  const logout = async () => {
    try {
      const deslog = await deleteValue("token");
      if (deslog) {
        setIsLoggedIn(false);
        refreshMarkers();
        router.replace("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toMarker = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        const data = await addMarker(route.pathname, route.pathname, token);
        await markerLink(data.markerId, token);
        refreshMarkers();
      } else {
        console.error("No match for token");
      }
    } catch (error) {
      console.error("Error adding marker:", error);
    }
  };

  const loginProve = async (email: string, password: string) => {
    const Data = await loginCheck(email, password);
    if (Data.success) {
      if (Data.token) {
        const result = await save("token", Data.token);
        if (result) {
          setIsLoggedIn(true);
          router.replace("/");
        } else {
          throw new Error("Token Save Error.");
        }
      } else {
        throw new Error("Token Unaviable");
      }
    } else {
      throw new Error("Error: " + Data.message);
    }
  };

  const handleDeleteAcc = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        const deleted = await deleteUser(token);
        if (deleted.success) {
          logout();
        }
      }
    } catch (error) {
      console.error("Error deleting user:" + error);
    }
  };

  const getUserData = async () => {
    const token = await getValueFor("token");
    if (token) {
      const data = await getUser(token);
      if (data.nombre && data.mail) {
        return { nombre: data.nombre, email: data.mail };
      }
      throw new Error("Error:" + data.message);
    }
    throw new Error("Error fetching user token");
  };

  const memoValue = useMemo(
    () => ({
      isLoggedIn,
      logout,
      toMarker,
      loginProve,
      handleDeleteAcc,
      getUserData,
    }),
    [isLoggedIn, logout]
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};
