// src/pages/index.tsx
import React from "react";
import VirtualTryOn from "../../components/virtualtryon";

const Men: React.FC = () => {
  const personImageUrl =
    "https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On/resolve/main/assets/human/011.png"; // replace with actual URL
  const productImageUrl =
    "https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On/resolve/main/assets/cloth/02_upper.png"; // replace with actual URL

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
