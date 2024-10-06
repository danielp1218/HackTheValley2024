"use client";
import React, { useState } from "react";

export default function SearchNavbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await onSearch(searchTerm);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await onSearch(searchTerm);
    }
  };

  async function onSearch(searchTerm) {
    try {
      const response = await fetch("/api/scrapeWebsite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: searchTerm }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Scrape result:", data); // Log the response data
      const query = encodeURIComponent(
        JSON.stringify({
          imageSrc: data.imageUrl,
          title: data.name,
          price: data.price,
          color: "#DAB1AC",
        })
      );
      window.location.href = `/product/0?data=${query}`;
      // You can update the state or call a parent handler with the data here
    } catch (error) {
      console.error("Error during scraping:", error); // Log the error
    }
  }

  return (
    <div className="flex justify-center w-full">
      <input
        type="text"
        placeholder="Link to item..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // ENTER TO SEARCGSFH
        className="border border-black w-5/6 rounded-full p-2 px-5 focus:outline-none"
      />
    </div>
  );
}
