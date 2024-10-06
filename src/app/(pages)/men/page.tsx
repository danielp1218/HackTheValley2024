// src/pages/index.tsx
import React from "react";
import VirtualTryOn from "../../components/virtualtryon";

const Men: React.FC = () => {
  const personImageUrl =
    "https://kwai-kolors-kolors-virtual-try-on.hf.space/file=/tmp/gradio/4468e2870e21a158a02e26fa6e5340beb80bd55814b01781c25a3677af1a7f00/000.png"; // replace with actual URL
  const productImageUrl =
    "https://kwai-kolors-kolors-virtual-try-on.hf.space/file=/tmp/gradio/70a2d901a24558b29461fef556a7c9bb2d34aa232d70bb05b6f7d39af0f0b4eb/00_upper.jpg"; // replace with actual URL

  return (
    <div>
      <h1>Virtual Try-On</h1>
      <VirtualTryOn
        personImageUrl={personImageUrl}
        productImageUrl={productImageUrl}
      />
    </div>
  );
};

export default Men;
