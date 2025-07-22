"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define types
type HoverContextType = {
  isHovering: { hover: string; videoNum: number };
  setIsHovering: (hovering: { hover: string; videoNum: number }) => void;
};

// Create context
const HoverContext = createContext<HoverContextType | undefined>(undefined);

// Provider component
export const HoverProvider = ({ children }: { children: ReactNode }) => {
  const [isHovering, setIsHovering] = useState({
    hover: "none",
    videoNum: 0,
  });

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
