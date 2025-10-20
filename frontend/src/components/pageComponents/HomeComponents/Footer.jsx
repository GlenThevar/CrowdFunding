import React, { useContext } from "react";
import { Origami } from "lucide-react";

import { KickstarterIcon } from "../../../data/icons/kickstarter";
import { AppContext } from "../../../context/AppContext";

const Footer = () => {
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`${
        theme == "black" ? "border-t-2" : "border-t-1"
      } border-base-300 shadow-sm`}
    >
      <div className="flex justify-between mx-5 h-20">
        <div className="flex justify-center items-center gap-2">
          <Origami className="w-5 h-5" />
          <p className="font-heading text-sm">
            Bringing creative projects to life
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="font-heading text-sm">Taken inspiration from </span>{" "}
          <a href="https://www.kickstarter.com/" target="_blank">
            <KickstarterIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
