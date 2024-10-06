import React, { useState} from "react";
import TryOn from "./tryon";

export default function TryOnButton(){
    const [isTryOnVisible, setIsTryOnVisible] = useState(false); // State to manage visibility

    const handleButtonClick = () => {
      setIsTryOnVisible(!isTryOnVisible); // Toggle visibility when button is clicked
    };

    return(
        <>
            <button onClick={handleButtonClick} className="p-3 hover:bg-violet-600 bg-black text-white rounded-full w-48">Try On!</button>
            {isTryOnVisible && <TryOn title="HU" price="$15"/>}
        </>
    );
}
