import React from "react";

import image from "../../../data/campaignImages";

const CampaginCarousel = () => {
  return (
    <div className="carousel w-[45vw] h-[40vh] ">
      {image.map((data) => (
        <div key={data} className="carousel-item">
          <img src={data} />
        </div>
      ))}
    </div>
  );
};

export default CampaginCarousel;
