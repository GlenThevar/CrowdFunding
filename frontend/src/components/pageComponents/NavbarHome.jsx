import React, { useContext } from "react";
import { Origami, Menu } from "lucide-react";

import Avatar from "./Avatar";
import ThemeController from "./ThemeController";
import SearchNav from "./SearchNav";
import Slider from "./Slider";
import { AppContext } from "../../context/AppContext";

const NavbarHome = () => {
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`${
        theme == "black" ? "border-b-2" : "border-b-1"
      } border-base-300`}
    >
      <div className="flex flex-wrap justify-between py-3 px-3">
        <div className="flex justify-center items-center gap-2 order-1">
          <Origami strokeWidth={1} className="w-9 h-9 sm:w-12 sm:h-12" />
          <p className="font-sofia text-2xl sm:text-3xl font-black">FUND IT</p>
        </div>
        <div className="w-full md:w-[40vw] lg:w-[50vw] mt-5 md:mt-0 order-3 md:order-2">
          <SearchNav />
        </div>
        <div className="flex justify-center items-center gap-4 order-2 md:order-3">
          <ThemeController />
          <Menu className="w-6 h-6 sm:h-7 sm:w-7" />
          <Avatar />
        </div>
      </div>
      <div className="mt-3">
        <Slider />
      </div>
    </div>
  );
};

export default NavbarHome;
