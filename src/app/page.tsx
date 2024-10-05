"use client";

import React from "react";
import Cards from "./components/cards";

interface ClothingItem {
  imageSrc: string;
  title: string;
  price: string;
  color: string;
}

export default function Home() {
  const clothes: ClothingItem[] = [
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
  ];

  function tryOn(item: ClothingItem, index: number) {
    console.log("try on clicked");
    const query = encodeURIComponent(JSON.stringify(item));
    window.location.href = `/product/${index}?data=${query}`;
  }

  return (
    <div className="flex flex-col text-primary">
      {/* first screen */}
      <div className="h-screen flex justify-between bg-beige">
        <div className="flex flex-col w-3/5 pl-[17%] pr-[10%]">
          {/* title text */}
          <div className="flex flex-col space-y-4 font-bold text-[64px] pt-[10%]">
            <h1>Your Virtual</h1>
            <h1>Fitting Room</h1>
            <h1>Awaits</h1>
          </div>

          {/* secondary text */}
          <p className="font-bold text-lg pt-[5%] leading-10">
            Where fashion meets technology. Say goodbye to the guesswork of
            online shopping and hello to a personalized experience designed just
            for you.
          </p>

          {/* shop now button */}
          <div className="flex justify-start pt-[13%]">
            <button className="hover-drop-shadow inline-block text-white rounded-3xl px-8 py-3 bg-primary font-bold text-lg">
              <a href="/new">SHOP NOW</a>
            </button>
          </div>
        </div>

        {/* image */}
        <div className="flex w-2/5 pt-8">
          <img
            className="object-contain h-3/4 w-3/4"
            src="/home1.png"
            alt="home1"
          />
        </div>
      </div>

      {/* second screen */}
      <div className="h-screen flex flex-col bg-white">
        {/* title div */}
        <div className="flex justify-center pt-24 pb-12">
          <span className="text-5xl font-bold">FEATURED</span>
        </div>

        {/* clothing cards */}
        <div className="flex space-x-12 px-24">
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

        {/* see all button */}
        <div className="w-full flex justify-center py-20">
          <button
            className="
hover-drop-shadow inline-block text-white rounded-3xl px-6 py-3 bg-primary font-bold text-lg"
            onClick={() => (window.location.href = "/new")}
          >
            <span className="flex flex-row space-x-4 items-center">
              <span className="font-semibold">SEE ALL</span>

              {/* right arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
