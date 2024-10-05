"use client";
import React from "react";
import { useGlobalContext, ClothingItem } from "../../contexts/globalContexts";

export default function Shoppingcart() {
  const { cart, addToCart, removeFromCart } = useGlobalContext();

  return (
    <div className="flex flex-col w-screen h-screen px-24 py-16 text-primary">
      <p className="font-bold text-3xl pb-14">Shopping Cart</p>
      {cart.length === 0 ? (
        <div className="flex w-full h-full">
          <span className="text-2xl font-medium text-gray-600">
            No items in cart
          </span>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          {/* cart item iteration */}
          {cart.map((item, index) => (
            <div key={index} className="flex w-full h-40 mb-8">
              <img
                src={item.imageSrc}
                alt="Clothing image"
                className="object-contain h-full w-1/4"
              />

              <div className="flex flex-col w-3/4 ">
                <span className="font-semibold text-lg">{item.title}</span>
                <span className="font-medium text-md">{item.price}</span>
              </div>

              <div>
                <button onClick={() => removeFromCart(index)}>
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* checkout overview */}
          <div className="flex flex-col pt-6 space-y-2">
            <span className="font-semibold">Subtotal: </span>
            <span className="font-semibold">Delivery Fee: </span>
            <span className="font-bold text-lg">Total: </span>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          console.log(cart);
        }}
      >
        test
      </button>

      <button
        onClick={() => {
          addToCart({
            imageSrc: "/eg1.png",
            title: "Peace T-shirt",
            price: "$15",
            color: "#DAB1AC",
          });
        }}
      >
        add
      </button>
    </div>
  );
}
