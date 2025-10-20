import React, { useContext } from "react";
import { Reply } from "lucide-react";

import { AppContext } from "../../../context/AppContext";
import IndivisualAuthorComment from "./IndivisualAuthorComment";

const IndivisualBackerComment = () => {
  const { theme } = useContext(AppContext);

  return (
    <div className="flex flex-col gap-2 mx-0 lg:mx-30">
      <div
        className={`flex flex-col border-1  p-5 gap-8 shadow-md ${
          theme == "black"
            ? "border-2 border-base-300"
            : "border-1 border-base-200"
        }`}
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
            Hi Olive, The shipping rates for anything I have to handle myself
            are all based on Royal Mail's rates for shipping from the UK. I try
            hard to do what I can to make things affordable but shipping rates
            do fluctuate and are on the rise generally sadly. If you look at the
            tiers which aren't signed/anything I have to handle myself they can
            generally be shipped from somewhere closer to you if you aren't UK
            based so may have cheaper shipping options!
          </p>
        </div>
        <div>
          <button
            className={`btn btn-outline btn-primary rounded-sm   ${
              theme == "black"
                ? "text-white hover:text-black hover:bg-white"
                : "text-black  bg-base-100 border-base-300 hover:bg-base-200"
            } shadow-sm flex gap-2 items-center justify-center text-sm font-light`}
          >
            <Reply strokeWidth={1} className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className="font-heading text-xs sm:text-sm">Reply</p>
          </button>
        </div>
      </div>
      <div>
        <IndivisualAuthorComment />
      </div>
    </div>
  );
};

export default IndivisualBackerComment;
