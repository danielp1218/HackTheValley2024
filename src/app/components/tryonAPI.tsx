"use client";
import React, { useState, useEffect } from "react";

interface TryOnAPIProps {
  person: string;
  product: string;
}

export default function TryOnAPI({ person, product }: TryOnAPIProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const personImageUrl = { person };
  const productImageUrl = { product };

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

  return resultUrl ? (
    <img src={resultUrl} alt="Virtual Try-On Result" />
  ) : (
    <img src="/loading.gif" alt="Loading" />
  );
}
