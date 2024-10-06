"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGlobalContext, ClothingItem } from "../../contexts/globalContexts";

export default function ProductPage() {
  const { addToCart } = useGlobalContext();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const item = data ? JSON.parse(decodeURIComponent(data)) : null;
  const colors = [item.color, "#90BEC0", "#9A90C0", "#874343"];

  const [selectedSize, setSelectedSize] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleTryOnClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <>
      <div className="flex flex-row p-32">
        {/* item image */}
        <div className="relative px-24">
          <div className="relative">
            <img
              className="h-[90%] w-[90%] object-contain"
              src={item.imageSrc}
              alt={item.title}
            />

            {/* try on button */}
            <button
              onClick={handleTryOnClick}
              className="btn-try-on absolute top-0 left-[47%] transform -translate-x-1/2 translate-y-6 rounded-3xl font-medium border border-black px-8 py-1 z-20"
            >
              Try On
            </button>
          </div>
        </div>

        {isModalVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-btn" onClick={handleCloseModal}>
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="modal-content">
                {/* Add your modal content here */}
                <div className="flex flex-row pb-4 px-6">
                  <div className="w-1/2">
                    <img
                      className="object-contain max-w-full max-h-full"
                      src="/test.png"
                      alt="test"
                    />
                  </div>

                  <div className="text-xl pl-8 flex flex-col w-1/2">
                    <span className="font-semibold">{item.title}</span>
                    <span>{item.price}</span>
                  </div>
                </div>

                {/* <div>
                  <img src="/loading.gif" alt="loading" />
                </div> */}
              </div>
            </div>
          </div>
        )}

        {/* item details */}
        <div className="flex flex-col">
          <h2 className="font-semibold text-4xl py-6">{item.title}</h2>
          <p className="text-[#808080] text-xl pb-6">{item.price}</p>
          <div className="flex flex-row space-x-4">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-full relative ${
                  index !== 0
                    ? "grey-overlay diagonal-strike"
                    : "border-2 border-black"
                }`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>

          <style jsx>{`
            .grey-overlay {
              border: 2px solid grey;
              background-color: rgba(128, 128, 128, 0.8);
            }
            .diagonal-strike::before {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              width: 100%;
              height: 2px;
              background-color: grey;
              transform: translate(-50%, -50%) rotate(45deg);
            }
          `}</style>

          {/* size dropdown */}
          <div className="my-24">
            <select
              id="size"
              name="size"
              value={selectedSize}
              onChange={handleSizeChange}
              className="mt-1 block w-full pl-3 py-2 text-base border border-black bg-white rounded-3xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select a size
              </option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">X-Large</option>
            </select>
          </div>

          <div className="flex flex-col items-start space-y-4 pl-2 font-semibold underline">
            <button>
              <a>Details</a>
            </button>

            <button>
              <a>Size & Fit</a>
            </button>

            <button>
              <a>Shipping & Returns</a>
            </button>
          </div>

          <div className="mt-auto mb-8">
            <button
              onClick={() => {
                addToCart({
                  imageSrc: item.imageSrc,
                  title: item.title,
                  price: item.price,
                  color: "#EEDDCC",
                });
                window.location.href = "/shoppingcart";
              }}
              className="bg-primary rounded-3xl px-12 py-3 text-white font-bold"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
