import React, { useState } from "react";

import RotatingText from "../../reactBits/RotatingText/RotatingText";

const HomeAuth = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full h-full items-center font-heading font-black text-5xl mt-30  sm:text-7xl  sm:mt-25 md:text-8xl  md:mt-25 lg:text-[140px] lg:leading-35 lg:mt-20 xl:mt-10 xl:text-[190px] xl:leading-45">
        <div>
          <p>JOIN THE</p>
        </div>
        <div>
          <p>NEW ERA OF</p>
        </div>
        <div>
          <RotatingText
            texts={["FUNDING", "BACKING", "SPONSORING", "SUPPORTING"]}
            mainClassName="px-2 sm:px-2 md:px-3 bg-green-500 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3500}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeAuth;
