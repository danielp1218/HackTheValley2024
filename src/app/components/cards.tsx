import React from "react";

interface CardsProps {
  imageSrc: string;
  title: string;
  price: string;
  clickHandler: () => void;
}

export default function Cards({
  imageSrc,
  title,
  price,
  clickHandler,
}: CardsProps) {
  return (
    <div className="p-4">
      <img src={imageSrc} alt="Clothing image" className="object-contain" />

      <div className="flex justify-between items-center py-4">
        <span>
          {title}
          <br />
          {price}
        </span>

        {/* try on button */}
        <button
          className="rounded-3xl px-6 py-1 border border-black font-semibold"
          onClick={clickHandler}
        >
          Try-on
        </button>
      </div>
    </div>
  );
}
