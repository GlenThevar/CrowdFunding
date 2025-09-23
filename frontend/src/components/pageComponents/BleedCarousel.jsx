import React from "react";
import { useContext } from "react";

import { AppContext } from "../../context/AppContext";
import image from "../../data/campaignImages";

const BleedCarousel = () => {
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`carousel carousel-cente space-x-4 p-4 ${
        theme == "black" ? "bg-white" : "bg-neutral"
      }  `}
    >
      {image.map((data) => (
        <div key={data} className="carousel-item">
          <img src={data} className="rounded-box h-50" />
        </div>
      ))}
    </div>
  );
};

export default BleedCarousel;
