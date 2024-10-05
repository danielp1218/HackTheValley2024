import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 p-8 bg-beige z-50 text-primary">
      <div className="flex flex-row w-full">
        <div className="flex">
          <a href="/" className="font-bold text-xl">
            BuyBye
          </a>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 font-semibold text-base">
          <a href="/men">MEN</a>
          <a href="/women">WOMEN</a>
          <a href="/kids">KIDS</a>
          <a href="/collections">COLLECTIONS</a>
          <a href="/new">NEW</a>
        </div>

        <div className="flex ml-auto items-center space-x-4">
          <a href="/shoppingcart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </a>
          <a
            className="rounded-3xl font-bold border border-black px-8 py-1"
            href="/login"
          >
            Login
          </a>
        </div>
      </div>
    </header>
  );
}
