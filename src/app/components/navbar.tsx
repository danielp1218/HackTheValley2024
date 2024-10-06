import React from "react";
import SearchNavbar from "./searchNavbar";

export default function Navbar() {
  return (
    <header className="sticky top-0 p-8 bg-beige z-50 text-primary">
      <div className="flex flex-row w-full">
        <div className="flex">
          <a href="/" className="font-bold text-xl">
            BuyBye
          </a>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 font-semibold text-base w-1/2">
          {/* <a href="/men">MEN</a>
          <a href="/women">WOMEN</a>
          <a href="/kids">KIDS</a>
          <a href="/collections">COLLECTIONS</a>
          <a href="/new">NEW</a> */}
          <SearchNavbar />
        </div>

        <div className="flex ml-auto items-center space-x-4">
          <a href="/shoppingcart">
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
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
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
