import React, { createContext, useState, useContext, ReactNode } from "react";

interface Marker {
  link: string;
  id: number;
  nombre: string;
}

interface MarkersContextType {
  markers: Marker[];
  setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>;
  refreshMarkers: () => void;
  trigger: boolean;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MarkersContext = createContext<MarkersContextType | undefined>(undefined);

export const useMarkersContext = () => {
  const context = useContext(MarkersContext);
  if (!context) {
    throw new Error("useMarkersContext must be used within a MarkersProvider");
  }
  return context;
};

export const MarkersProvider = ({ children }: { children: ReactNode }) => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const refreshMarkers = () => {
    setTrigger((prev) => !prev);
  };

  return (
    <MarkersContext.Provider
      value={{
        markers,
        setMarkers,
        refreshMarkers,
        trigger,
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </MarkersContext.Provider>
  );
};
