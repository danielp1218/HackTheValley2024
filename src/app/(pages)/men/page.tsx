"use client";
import { useState, useEffect } from "react";

const Men: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const personImageUrl =
    "https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On/resolve/main/assets/human/005.png"; // Replace with your actual person image URL
  const productImageUrl =
    "https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On/resolve/main/assets/cloth/09_upper.png"; // Replace with your actual product image URL

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
  if (error) return <p>{error}</p>;

  return resultUrl ? <img src={resultUrl} alt="Virtual Try-On Result" /> : null;
};

export default Men;
