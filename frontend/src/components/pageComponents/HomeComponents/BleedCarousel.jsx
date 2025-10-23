import React, { useEffect, useState } from "react";
import { useContext } from "react";

import { AppContext } from "../../../context/AppContext";
import campaignImages from "../../../data/campaignImages";

const BleedCarousel = ({ height }) => {
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`carousel carousel-cente space-x-4 p-4 ${
        theme == "black" ? "bg-white" : "bg-neutral"
      }  `}
    >
      {campaignImages.map((campaign) => (
        <div key={campaign.id} className="carousel-item">
          <img src={campaign.src} className={`rounded-box ${height}`} />
        </div>
      ))}
    </div>
  );
};

export default BleedCarousel;
