"use client";

import React from "react";
import Cards from "../../components/cards";
import { useGlobalContext, ClothingItem } from "../../contexts/globalContexts";

export default function New() {
  const { clothes, setClothes } = useGlobalContext();

  function tryOn(item: ClothingItem, index: number) {
    console.log("try on clicked");
    const query = encodeURIComponent(JSON.stringify(item));
    window.location.href = `/product/${index}?data=${query}`;
  }

  return (
    <div className="flex flex-col text-primary">
      <div className="flex w-full justify-center pt-16 pb-12">
        <span className="text-4xl font-bold">OUR PRODUCTS</span>
      </div>

      {/* clothing cards */}
      <div className="flex space-x-12 px-24 py-8">
        {clothes.map((item, index) => (
          <Cards
            key={index} // Add a unique key for each item
            imageSrc={item.imageSrc}
            title={item.title}
            price={item.price}
            color={item.color}
            clickHandler={() => tryOn(item, index)} // Pass a function reference
          />
        ))}
      </div>
    </div>
  );
}
