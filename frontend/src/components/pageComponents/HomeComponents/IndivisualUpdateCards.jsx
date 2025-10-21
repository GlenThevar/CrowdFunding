import React, { useContext, useEffect, useState } from "react";
import { Heart } from "lucide-react";

import { AppContext } from "../../../context/AppContext";

const IndividualUpdateCards = () => {
  const { theme } = useContext(AppContext);
  const [heart, setHeart] = useState(false);

  const ClickHeart = () => {
    setHeart((heart) => !heart);
  };

  return (
    <div
      className={`${
        theme == "black"
          ? "border-2 border-base-300"
          : "border-1 border-base-200"
      } flex flex-col gap-5 w-full md:w-[70vw] p-5 shadow-lg rounded-md`}
    >
      <div className="flex justify-start font-bold text-base sm:text-lg font-heading">
        <p>Funded in just 64 minutes</p>
      </div>
      <div className="flex gap-3 items-center">
        <div
          className={`rounded-full ${
            theme == "black"
              ? "hover:border-1 border-white"
              : "hover:border-1 border-black"
          }`}
        >
          <img
            src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
            className={`rounded-full w-10 sm:w-15 hover:cursor-pointer `}
            alt=""
          />
        </div>
        <div className="flex-col">
          <p className="font-heading text-xs sm:text-sm">William Moore</p>
          <p className="font-heading text-xs sm:text-sm">October 10, 2025</p>
        </div>
      </div>
      <div className="w-full border-b-2 border-base-200"></div>
      <div className="text-xs sm:text-sm font-subheading">
        <p>
          I can hardly believe it - The Book of Bitter Ends was fully funded in
          just 64 minutes. That’s absolutely incredible and has completely
          exceeded my wildest expectations.
        </p>
        <br />
        <p>
          {" "}
          I’m honestly blown away by the support you’ve all shown today - thank
          you so much to everyone who’s backed, shared, or commented already.
        </p>
        <br />
        <p>
          We’ve got some really exciting stretch goals and surprises planned
          over the next few weeks, so stay tuned - and from the bottom of my
          heart, thank you for making The Book of Bitter Ends a reality so
          quickly.
        </p>
        <br />
      </div>
      <div className="flex cursor-pointer gap-2 items-center">
        <Heart
          onClick={ClickHeart}
          fill={heart ? (theme === "black" ? "white" : "black") : "none"}
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
        <p className="font-light font-heading text-sm">12</p>
      </div>
    </div>
  );
};

export default IndividualUpdateCards;
