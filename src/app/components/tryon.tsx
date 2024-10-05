import React from "react";
import PoseVideo from "./PoseVideo";
import { Pose } from "@mediapipe/pose";

interface TryOnProps {
  title: string;
  price: string;
}

export default function TryOn({ title, price }: TryOnProps) {
  return (
    <div className="">
      <div>
        <PoseVideo />
      </div>

      <div>
        <span>{title}</span>
        <span>{price}</span>
      </div>
    </div>
  );
}
