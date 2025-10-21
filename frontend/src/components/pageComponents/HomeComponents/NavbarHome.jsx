import React, { useContext } from "react";
import { Origami, Menu, CirclePlus, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import ThemeController from "./ThemeController";
import SearchNav from "./SearchNav";
import Slider from "./Slider";
import { AppContext } from "../../../context/AppContext";

const NavbarHome = () => {
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`${
        theme == "black" ? "border-b-2" : "border-b-1"
      } border-base-300 shadow-sm`}
    >
      <div className="flex flex-wrap justify-between py-3 px-3">
        <Link to="/">
          <div className="flex justify-center items-center gap-2 order-1">
            <Origami strokeWidth={1} className="w-9 h-9 sm:w-12 sm:h-12" />
            <p className="font-logo text-2xl sm:text-3xl font-black">FUND IT</p>
          </div>
        </Link>

        <div className="w-full md:w-[40vw] lg:w-[50vw] mt-5 md:mt-0 order-3 md:order-2">
          <SearchNav />
        </div>
        <div className="flex justify-center gap-4 order-2 md:order-3 items-center">
          <ThemeController />
          <div className="cursor-pointer dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0}>
              <Menu className="w-9 h-9 sm:w-12 sm:h-12" />
            </div>
            <ul
              tabIndex={0}
              className={`dropdown-content menu rounded-lg z-1 mt-2 w-40 lg:w-52 p-2 shadow-sm ${
                theme == "black" ? "bg-base-300" : "bg-base-100"
              }`}
            >
              <li>
                <Link to="/create">
                  <div className="flex justify-start gap-2 items-center rounded-lg">
                    <CirclePlus />
                    <p className="font-heading">Create</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/chat">
                  <div className="flex justify-start gap-2 items-center rounded-lg">
                    <MessageCircle />
                    <p className="font-heading">Chat</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-9 sm:w-12 rounded-full hover:border-2 cursor-pointer">
            <img
              src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Slider />
      </div>
    </div>
  );
};

export default NavbarHome;
