import React, { createContext, useState, useContext, ReactNode } from "react";

interface MarkersContextType {
  markers: { link: string; id: number; nombre: string }[];
  setMarkers: React.Dispatch<React.SetStateAction<{ link: string; id: number; nombre: string }[]>>;
  refreshMarkers: () => void; 
  trigger: boolean;
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
  const [markers, setMarkers] = useState<{ link: string; id: number; nombre: string }[]>([]);
  const [trigger, setTrigger] = useState(false); 
  
  const refreshMarkers = () => {
    setTrigger(prev => !prev);
  };
  
  return (
    <MarkersContext.Provider value={{ markers, setMarkers, refreshMarkers, trigger }}>
      {children}
    </MarkersContext.Provider>
  );
};
