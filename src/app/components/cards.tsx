import React, { CSSProperties } from "react";

interface CardsProps {
  imageSrc: string;
  title: string;
  price: string;
  color: string;
  clickHandler: () => void;
}

export default function Cards({
  imageSrc,
  title,
  price,
  color,
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
          className="try-on-button rounded-3xl px-6 py-1 border border-black font-semibold relative overflow-hidden"
          onClick={clickHandler}
          style={{ "--button-bg-color": color } as CSSProperties} // Pass the color as a CSS variable
        >
          <span className="relative z-10">Try-on</span>
        </button>
      </div>

      <style jsx>{`
        .try-on-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--button-bg-color); // Use the CSS variable
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease; /* Reduced duration */
          z-index: 0;
        }

        .try-on-button:hover::before {
          transform: scaleX(1);
        }

        .try-on-button span {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
