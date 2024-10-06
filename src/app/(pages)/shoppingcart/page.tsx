"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext, ClothingItem } from "../../contexts/globalContexts";

export default function Shoppingcart() {
  const { cart, addToCart, removeFromCart } = useGlobalContext();
  const [total, setTotal] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(10);

  // calculate total price, parse string and remove $
  function calculateTotal() {
    let sum = 0;
    cart.forEach((item) => {
      sum += parseFloat(item.price.replace("$", ""));
    });
    const roundedTotal = (sum + deliveryFee).toFixed(2);
    setTotal(parseFloat(roundedTotal));
  }

  // update the total price when cart changes
  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <div className="flex flex-col w-screen h-screen px-24 py-16 text-primary">
      <p className="font-bold text-3xl pb-14">My Bag</p>
      {cart.length === 0 ? (
        <div className="flex w-full h-full">
          <span className="text-2xl font-medium text-gray-600">
            No items in cart
          </span>
        </div>
      ) : (
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            {/* cart item iteration */}
            {cart.map((item, index) => (
              <div key={index} className="flex h-40 mb-8">
                <img
                  src={item.imageSrc}
                  alt="Clothing image"
                  className="object-contain h-full w-1/4"
                />

                <div className="flex flex-col w-3/4 ">
                  <span className="font-semibold text-lg">{item.title}</span>
                  <span className="font-medium text-md">{item.price}</span>
                  <button
                    className="my-auto"
                    onClick={() => removeFromCart(index)}
                  >
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
          </div>
          {/* checkout overview */}
          <div className="flex justify-center w-1/2">
            <div className="flex flex-col space-y-8 pt-6 space-y-2 p-10 border-2 bg-[#F1F1F1] w-3/4">
              <div className="flex flex-row w-full pt-8">
                <span className="font-extrabold">Subtotal</span>
                <span className="ml-auto">${(total - 10).toFixed(2)}</span>
              </div>

              <div className="flex flex-row w-full">
                <span className="font-semibold">Delivery Fee</span>
                <span className="ml-auto">FREE</span>
              </div>

              <div className="flex flex-row w-full">
                <span className="font-semibold">Estimated taxes and fees</span>
                <span className="ml-auto">$10</span>
              </div>

              <div className="flex flex-row w-full">
                <span className="font-semibold">Total</span>
                <span className="ml-auto">${total.toFixed(2)}</span>
              </div>

              <div>
                <button className="bg-[#508722] text-white rounded-full w-full py-3 font-bold text-lg">
                  CONTINUE TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <button
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
      </button> */}
    </div>
  );
}
