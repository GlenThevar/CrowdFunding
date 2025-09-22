import React from "react";
import { Origami, Menu } from "lucide-react";

import Avatar from "./Avatar";
import ThemeController from "./ThemeController";

const NavbarHome = () => {
  return (
    <div className="border-b-2 border-base-300">
      <div className="flex justify-between py-3 px-3">
        <div className="flex justify-center items-center gap-2">
          <Origami strokeWidth={1} className="w-9 h-9 sm:w-12 sm:h-12" />
          <p className="font-sofia text-2xl sm:text-3xl font-black">FUND IT</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <ThemeController />
          <Menu className="w-6 h-6 sm:h-7 sm:w-7" />
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default NavbarHome;
