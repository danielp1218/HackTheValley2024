"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGlobalContext } from "../../contexts/globalContexts";
import { div } from "framer-motion/client";

const Men: React.FC = () => {
  const { addToCart, personURL } = useGlobalContext();
  const searchParams = useSearchParams();
  const personImageUrl = decodeURIComponent(searchParams.get("person") || "");
  const productImageUrl = decodeURIComponent(searchParams.get("product") || "");
  const data = searchParams.get("data");
  const item = data ? JSON.parse(decodeURIComponent(data)) : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const performVirtualTryOn = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/tryon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ personImageUrl, productImageUrl }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      // Handle the final result directly
      handleResult(data);
    } catch (error) {
      setError(`Could not perform virtual try-on: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const handleResult = (data: any) => {
    // Handle the final result here
    if (data.status === "success" && data.output) {
      setResultUrl(data.output); // Directly assign data.output since it's a string
    } else {
      setError("Failed to get the virtual try-on result.");
    }
  };
  useEffect(() => {
    if (personImageUrl && productImageUrl) {
      performVirtualTryOn();
    }
  }, [personImageUrl, productImageUrl]);
  if (loading) return <p>Loading...</p>;

  return resultUrl ? (
    <div className="flex flex-row">
      <img className="" src={resultUrl} alt="Virtual Try-On Result" />

      <button
        className=""
        onClick={() => {
          addToCart({
            imageSrc: item.imageSrc,
            title: item.title,
            price: item.price,
            color: "#EEDDCC",
          });
        }}
      >
        Add to bag
      </button>
    </div>
  ) : null;
};

export default Men;
