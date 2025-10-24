import React, { useContext } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";

import allTags from "../../../data/allCampaignTags";
import { AppContext } from "../../../context/AppContext";

const Slider = () => {
  const { SetSearchingByTags, setTagsToSearch } = useContext(AppContext);

  function cl(e) {
    SetSearchingByTags(true);
    setTagsToSearch(e.trim());
  }

  return (
    <div>
      <Splide
        hasTrack={false}
        className="mb-3"
        options={{
          type: "loop",
          drag: "free",
          focus: "center",
          perPage: window.innerWidth > 640 ? 5 : 3,
          pagination: false,
          autoScroll: {
            speed: 1,
          },
          arrows: false,
        }}
        extensions={{ AutoScroll }}
      >
        <SplideTrack>
          {allTags.map((data) => (
            <SplideSlide key={data}>
              <p
                className="font-heading font-bold text-sm cursor-pointer hover:underline"
                onClick={() => cl(data)}
              >
                {data}
              </p>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  );
};

export default Slider;
