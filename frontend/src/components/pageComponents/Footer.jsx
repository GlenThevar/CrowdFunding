import React, { useContext } from "react";
import { Origami } from "lucide-react";

import logo from "../../data/logo/kickstarter-green.png";
import { AppContext } from "../../context/AppContext";

const Footer = () => {
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`${
        theme == "black" ? "border-t-2" : "border-t-1"
      } border-base-300 mt-10`}
    >
      <div className="flex justify-between mx-5 h-20">
        <div className="flex justify-center items-center gap-2">
          <Origami className="w-8 h-8" />
          <p className="text-sm font-ma md:text-lg ">
            Bringing a creative project to life
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="font-ma text-sm">Taken inspiration from </span>{" "}
          <a href="https://www.kickstarter.com/" target="_blank">
            <img src={logo} className="w-5 h-5" />{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
