"use client";

import React, { useState, useEffect } from "react";
import { useGlobalContext, ClothingItem } from "../../contexts/globalContexts";
import Webcam from "react-webcam";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TryOnAPI from "../../components/tryonAPI";

async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/dyb0vicck/image/upload`;

  // Create a FormData object and append the file and other required fields
  const formData = new FormData();
  formData.append("file", file); // File to upload
  formData.append("upload_preset", "ClothImages"); // Upload preset name

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData as never,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    console.log("Upload successful:", data);
    return data; // Return the upload data (e.g., public URL)
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

function CountDown() {
  const [count, setCount] = useState<number | null>(3);

  useEffect(() => {
    if (count === null) return;

    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => setCount(null), 1000);
      return () => clearTimeout(finishTimer);
    }
  }, [count]);

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center h-full bg-black bg-opacity-5 z-20">
      <AnimatePresence mode="wait">
        {count !== null && (
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="text-white text-9xl font-bold"
          >
            {count === 0 ? "Cheese!" : count}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const videoConstraints = {
  width: 900,
  height: 720,
  facingMode: "user",
};

const WebcamCapture = ({ setModalRef }) => {
  const { setPersonURL } = useGlobalContext();
  const webcamRef = React.useRef(null);
  const [countingDown, setCountingDown] = useState(false);
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const item = data ? JSON.parse(decodeURIComponent(data)) : null;
  const capture = React.useCallback(() => {
    // wait 3 seconds
    setCountingDown(true);
    setTimeout(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      uploadToCloudinary(imageSrc).then((r) => {
        const personParam = encodeURIComponent(r.secure_url);
        const productParam = encodeURIComponent(item.imageSrc);
        console.log(personParam);
        console.log(productParam);
        window.location.href = `/men?person=${personParam}&product=${productParam}&data=${data}`;
      });
      setModalRef(1);
      setCountingDown(false);
    }, 4000);
  }, [webcamRef]);
  return (
    <>
      <div className="flex">
        <div className="">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            height={videoConstraints.height}
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
            className="rounded-md"
          />
          {countingDown ? <CountDown /> : <></>}
          <button onClick={capture} className="absolute bottom-32 left-[30%]">
            <img
              src="/photo-icon.svg"
              alt="photo"
              className="rounded-[9999px] h-14 w-14 bg-white p-1"
            />
          </button>
          <form className="absolute bottom-32 right-[50%]">
            <label htmlFor="fileUpload">
              <img
                src="/img-icon.svg"
                alt="photo"
                className="rounded-[9999px] h-14 w-14 bg-white p-1"
                style={{ cursor: "pointer" }}
              />
            </label>
            <input
              hidden
              id="fileUpload"
              type="file"
              accept="image/*"
              className="hidden size-0"
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default function ProductPage() {
  const { addToCart, personURL } = useGlobalContext();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const item = data ? JSON.parse(decodeURIComponent(data)) : null;
  const colors = [item.color, "#90BEC0", "#9A90C0", "#874343"];

  const [selectedSize, setSelectedSize] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resultURL, setResultURL] = useState("");

  const [modalState, setModalState] = useState(0);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleTryOnClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddToCart = () => {
    // Simulate the addToCart operation and navigation
    addToCart({
      imageSrc: item.imageSrc,
      title: item.title,
      price: item.price,
      color: "#EEDDCC",
    });

    // Simulate a small delay before redirecting (you can remove this if not needed)
    setTimeout(() => {
      window.location.href = "/shoppingcart";
    }, 1000);
  };

  if (!item) {
    return <div>Item not found</div>;
  }

  // useEffect(() => {
  //   if (modalState === 1) {
  //     console.log(personURL)
  //     console.log(item.imageSrc)
  //     const personParam = encodeURIComponent(personURL);
  //     const productParam = encodeURIComponent(item.imageSrc);
  //     console.log(personParam);
  //     console.log(productParam);
  //     window.location.href = `/men?person=${personParam}&product=${productParam}`;
  //   }
  // }, [modalState]);

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
                {modalState === 0 ? (
                  <WebcamCapture setModalRef={setModalState} />
                ) : (
                  <></>
                )}
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
            <button className="bg-primary rounded-3xl px-12 py-3 text-white font-bold">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
