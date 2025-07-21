"use client"
import { createContext, useContext, useState, ReactNode } from "react";

// Define types
type HoverContextType = {
  isHovering: boolean;
  setIsHovering: (hovering: boolean) => void;
};

// Create context
const HoverContext = createContext<HoverContextType | undefined>(undefined);

// Provider component
export const HoverProvider = ({ children }: { children: ReactNode }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <HoverContext.Provider value={{ isHovering, setIsHovering }}>
      {children}
    </HoverContext.Provider>
  );
};

// Custom hook
export const useHover = () => {
  const context = useContext(HoverContext);
  if (!context) {
    throw new Error("useHover must be used within a HoverProvider");
  }
  return context;
};
