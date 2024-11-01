import { addMarker } from "@/apis/addMarker";
import { markerLink } from "@/apis/linkMarker";
import { deleteValue, getValueFor } from "@/utils/storage";
import { router } from "expo-router";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useMarkersContext } from "./MarkersContext";
import { useRouteInfo } from "expo-router/build/hooks";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  toMarker: () => void;
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

  const login = async () => {
    setIsLoggedIn(true);
  };

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

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, toMarker }}>
      {children}
    </AuthContext.Provider>
  );
};
