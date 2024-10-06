"use client";
// src/components/VirtualTryOn.tsx
import React, { useEffect, useState } from "react";

interface VirtualTryOnProps {
  personImageUrl: string;
  productImageUrl: string;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({
  personImageUrl,
  productImageUrl,
}) => {
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performVirtualTryOn = async () => {
    setLoading(true);
    setError(null);

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
      listenForResult(data.eventId);
    } catch (error) {
      setError(`Could not perform virtual try-on: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const listenForResult = async (eventId: string) => {
    try {
      const response = await fetch(`/api/tryon/${eventId}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      if (!reader) throw new Error("Reader not available");

      const processText = async ({
        done,
        value,
      }: {
        done: boolean;
        value?: Uint8Array;
      }) => {
        if (done) return;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");

        for (let i = 0; i < lines.length - 1; i++) {
          if (lines[i].startsWith("event:")) {
            const event = lines[i].split("event: ")[1];
            const data = JSON.parse(lines[i + 1].split("data: ")[1]);
            if (event === "complete") {
              if (data && data[0]) {
                setResultUrl(data[0].url);
              } else {
                setError("No result URL found.");
              }
            } else if (event === "error") {
              setError("Error during processing.");
            }
          }
        }

        buffer = lines[lines.length - 1];
        const { done: doneReading } = await reader.read();
        processText({ done: doneReading, value });
      };

      reader.read().then(processText);
    } catch (error) {
      setError(`Error fetching result: ${error}`);
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
