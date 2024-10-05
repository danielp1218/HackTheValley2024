"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the context state
interface GlobalContextProps {
  clothes: ClothingItem[];
  cart: ClothingItem[];
  setClothes: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
  addToCart: (item: ClothingItem) => void;
  removeFromCart: (item: ClothingItem) => void;
}

// Create the context with a default value
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export interface ClothingItem {
  imageSrc: string;
  title: string;
  price: string;
  color: string;
}

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = (): ClothingItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

// Create a provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Initialize default state for clothes
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

  // Set mounted to false initially, to avoid SSR issues
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<ClothingItem[]>([]);

  // Load cart from localStorage after component mounts (only on the client side)
  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    setCart(savedCart);

    // Indicate that the component is now mounted
    setMounted(true);
  }, []);

  // Sync localStorage whenever the cart changes (after mounting)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  // Add to cart and update localStorage
  const addToCart = (item: ClothingItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove from cart and update localStorage
  const removeFromCart = (item: ClothingItem) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.title !== item.title)
    );
  };

  // Wait until the component is mounted to render the cart
  if (!mounted) {
    return null; // Or a loading spinner if you want to show a loading state
  }

  return (
    <GlobalContext.Provider
      value={{ clothes, cart, setClothes, addToCart, removeFromCart }}
    >
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
