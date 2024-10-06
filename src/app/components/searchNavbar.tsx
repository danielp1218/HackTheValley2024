'use client';
import React, {useState} from "react";

export default function SearchNavbar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   onSearch(searchTerm);  // Call the parent component's search handler
  // };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log("ENTERED");
      // onSearch(searchTerm);  // Calls the parent component's search handler
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
