"use client";
import { useState, useEffect } from "react";

interface VirtualTryOnProps {
  personImageUrl: string;
  productImageUrl: string;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({
  personImageUrl,
  productImageUrl,
}) => {
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

      if (data.status === "processing") {
        await listenForResult(data.fetch_result, data.eta);
      } else {
        // Handle the final result directly if not processing
        handleResult(data);
      }
    } catch (error) {
      setError(`Could not perform virtual try-on: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const listenForResult = async (fetchResultUrl: string, eta: number) => {
    try {
      // Wait for the estimated time before fetching the result
      await new Promise((resolve) => setTimeout(resolve, eta * 1000));

      const response = await fetch(fetchResultUrl, {
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
      handleResult(data);
    } catch (error) {
      setError(`Could not fetch result: ${error}`);
    }
  };

  const handleResult = (data: any) => {
    // Handle the final result here
    if (data.status === "success" && data.output.length > 0) {
      setResultUrl(data.output[0]);
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

export default VirtualTryOn;
