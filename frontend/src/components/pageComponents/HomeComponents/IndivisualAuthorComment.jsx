import React, { useContext } from "react";

import { AppContext } from "../../../context/AppContext";

const IndivisualAuthorComment = () => {
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`flex flex-col border-1  p-5 gap-8 ${
        theme == "black"
          ? "border-2 border-base-300"
          : "border-1 border-base-200"
      } ml-10 border-l-4 border-l-green-600 shadow-md`}
    >
      <div className="flex gap-4 items-center">
        <div
          className={`rounded-full ${
            theme == "black"
              ? "hover:border-1 border-white"
              : "hover:border-1 border-black"
          }`}
        >
          <img
            src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
            className={`rounded-full w-10 hover:cursor-pointer `}
            alt=""
          />
        </div>
        <div className="flex flex-col font-heading">
          <p className="text-sm sm:text-base">Erin</p>
          <p className="font-extralight text-xs">about 21 hours ago</p>
        </div>
      </div>
      <div>
        <p className="font-subheading text-xs sm:text-sm font-extralight">
          Hi Olive, The shipping rates for anything I have to handle myself are
          all based on Royal Mail's rates for shipping from the UK. I try hard
          to do what I can to make things affordable but shipping rates do
          fluctuate and are on the rise generally sadly. If you look at the
          tiers which aren't signed/anything I have to handle myself they can
          generally be shipped from somewhere closer to you if you aren't UK
          based so may have cheaper shipping options!
        </p>
      </div>
    </div>
  );
};

export default IndivisualAuthorComment;
