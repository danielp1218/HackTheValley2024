"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the context state
export interface ClothingItem {
  imageSrc: string;
  title: string;
  price: string;
  color: string;
}

interface GlobalContextProps {
  clothes: ClothingItem[];
  cart: ClothingItem[];
  setClothes: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
  addToCart: (item: ClothingItem) => void;
  removeFromCart: (index: number) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [clothes, setClothes] = useState<ClothingItem[]>([
    {
      imageSrc:
        "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/465185/sub/goods_465185_sub14.jpg?width=750",
      title: "AIRism COTTON OVERSIZED CREW NECK",
      price: "$24.90",
      color: "#DAB1AC",
    },
    {
      imageSrc:
        "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/465193/sub/goods_465193_sub14.jpg?width=750",
      title: "AIRism COTTON CREW NECK T-SHIRT",
      price: "$29.90",
      color: "#C090A2",
    },
    {
      imageSrc:
        "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/476119/sub/goods_476119_sub14.jpg?width=750",
      title: "KAWS + WARHOL SWEATSHIRT",
      price: "$49.90",
      color: "#CACBC5",
    },
  ]);

  const [cart, setCart] = useState<ClothingItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      setMounted(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = (item: ClothingItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
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
