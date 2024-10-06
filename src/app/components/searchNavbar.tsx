'use client';
import React, {useState} from "react";
import handler from "@/pages/api/scrapeWebsite";

export default function SearchNavbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   onSearch(searchTerm);  // Call the parent component's search handler
  // };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     console.log("ENTERED");
  //     // onSearch(searchTerm);  // Calls the parent component's search handler
  //     // a
  //   }
  // };

  const handleKeyDown = async (e) => {
    // console.log(searchTerm);
    if (e.key === 'Enter') {
      e.preventDefault();
      try {
        const response = await fetch(`/api/scrapeWebsite?url=${searchTerm}`);
        if (response.ok) {
          const data = await response.json();
          console.log("RAWRRRRRRRRRRRRRRRRRRR", data);
          setResult(data);  
          setSearchTerm('');  // maybe add some loading aimatio or some shit here later idk
        } else {
          console.error("Error fetching data from the scraper");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  return (
    <div className="flex justify-center w-full">
      <input
        type="text"
        placeholder="Link to item..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}  // ENTER TO SEARCGSFH
        
        className="border border-black w-5/6 rounded-full p-2 px-5 focus:outline-none"
      />
    </div>
  );
}
