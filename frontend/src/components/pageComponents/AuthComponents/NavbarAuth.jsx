import React from "react";
import { Origami, Send, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import ButtonAuth from "../HomeComponents/ButtonAuth";

const NavbarAuth = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b-2 border-base-300">
        <Link to="/auth">
          <div className="flex gap-2 sm:gap-3 justify-center items-center">
            <Origami strokeWidth={0.5} className="w-7 h-7 sm:w-12 sm:h-12" />
            <p className="text-white font-logo text-xl font-black sm:text-2xl md:text-3xl lg:text-4xl ">
              FUND IT
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <Link to="/auth/signup">
            <button className="btn btn-outline btn-primary font-heading bg-base-300  text-white rounded-md hover:text-black hover:bg-white font-light px-2 py-3 sm:px-3 sm:py-4  md:px-4 md:py-5 text-xs">
              <p>SIGN UP</p>{" "}
              <Plus strokeWidth={0.75} className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </Link>

          <Link to="/auth/login">
            <button className="btn btn-outline btn-primary font-heading bg-base-300  text-white rounded-md hover:text-black hover:bg-white font-light px-2 py-3 sm:px-3 sm:py-4  md:px-4 md:py-5 text-xs">
              <p>LOG IN</p>
              <Send strokeWidth={0.75} className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarAuth;
