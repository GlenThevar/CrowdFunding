import React, { useContext } from "react";

import { AppContext } from "../../../context/AppContext";

const BleedCarousel = ({ height, imageUrls }) => {
  const { theme } = useContext(AppContext);

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
      className={`carousel carousel-center space-x-4 p-4 ${
        theme == "black" ? "bg-white" : "bg-neutral"
      } `}
    >
      {imageUrls.map((url, index) => (
        <div key={index} className="carousel-item">
          {" "}
          <img
            src={url}
            alt={`Campaign image ${index + 1}`}
            className={`${height || "h-[150px]"}`}
          />
        </div>
      ))}
    </div>
  );
};

export default BleedCarousel;
