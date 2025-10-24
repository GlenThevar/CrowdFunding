import React, { useContext, useState } from "react";

import { AppContext } from "../../../context/AppContext";

const BleedCarousel = ({ height, imageUrls }) => {
  const { theme } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div
        className={`flex items-center justify-center w-full ${
          height || "h-[150px]"
        }`}
      >
        <span className="text-sm font-heading">Could not fetch images</span>
      </div>
    );
  }

  return (
    <div
      className={`carousel carousel-center space-x-4 p-4  ${
        theme == "black" ? "bg-white" : "bg-neutral"
      } ${loading && "skeleton h-[150px] w-full"}`}
    >
      {imageUrls.map((url, index) => (
        <div key={index} className="carousel-item">
          {" "}
          <img
            src={url}
            alt={`Campaign image ${index + 1}`}
            className={`h-[150px] ${loading && "hidden"}`}
            onLoad={() => setLoading(false)}
          />
        </div>
      ))}
    </div>
  );
};

export default BleedCarousel;
