"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context state
interface GlobalContextProps {
  clothes: ClothingItem[];
  setClothes: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
}

// Create the context with a default value
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export interface ClothingItem {
  imageSrc: string;
  title: string;
  price: string;
  color: string;
}

// Create a provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [clothes, setClothes] = useState<ClothingItem[]>([
    {
      imageSrc: "/eg1.png",
      title: "Peace T-shirt",
      price: "$15",
      color: "#DAB1AC",
    },
    {
      imageSrc: "/eg2.png",
      title: "Sports Jacket",
      price: "$55",
      color: "#C090A2",
    },
    {
      imageSrc: "/eg3.png",
      title: "Smart Blazer",
      price: "$60",
      color: "#CACBC5",
    },
    {
      imageSrc: "/eg1.png",
      title: "Peace T-shirt",
      price: "$15",
      color: "#DAB1AC",
    },
  ]);

  return (
    <GlobalContext.Provider value={{ clothes, setClothes }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
