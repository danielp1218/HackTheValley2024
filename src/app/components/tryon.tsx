import React from "react";
import PoseVideo from "./PoseVideo";
import TryOnButton from "./tryonButton";

interface TryOnProps {
  title: string;
  price: string;
}

// not done yet might be a WIP forever since we changed ideas

export default function TryOn({ title, price }: TryOnProps) {
  return (
    <div className="flex flex-row justify-between border-red-300 border-2 w-5/6 p-5 bg-white-600">
      <div>
        <PoseVideo />
      </div>

      <div className="flex flex-col border-green-300 border-2 w-3/5 font-semibold justify-between">
        <div className="flex flex-col border-green-300 border-2 w-3/5 font-semibold">
            <span className="px-20 pt-20 text-4xl">{title}</span>
            <span className="px-20 pt-10 text-2xl">{price}</span>
        </div>
        <div className="p-20">
            <TryOnButton/>
        </div>
      </div>
    </div>
  );
}
