
"use client";

import React, { useState } from "react";
import Cards from "./components/cards";

export default function Home() {
  const clothes = [
    { imageSrc: "/eg1.png", title: "Peace T-shirt", price: "$15" },
    { imageSrc: "/eg2.png", title: "Sports Jacket", price: "$55" },
    { imageSrc: "/eg3.png", title: "Smart Blazer", price: "$60" },
    { imageSrc: "/eg1.png", title: "Peace T-shirt", price: "$15" },
  ];

  function tryOn() {
    console.log("try on clicked");
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
            <button className="inline-block text-white rounded-3xl px-8 py-3 bg-primary font-bold text-lg">
              SHOP NOW
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
          {clothes.map((item) => (
            <Cards
              imageSrc={item.imageSrc}
              title={item.title}
              price={item.price}
              clickHandler={tryOn}
            />
          ))}
        </div>

        {/* see all button */}
        <div className="w-full flex justify-center py-20">
          <button className="inline-block text-white rounded-3xl px-6 py-3 bg-primary font-bold text-lg">
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
