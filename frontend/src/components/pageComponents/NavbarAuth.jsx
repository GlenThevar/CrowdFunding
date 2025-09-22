import React from "react";
import { Origami, Send, Plus } from "lucide-react";

import ButtonAuth from "./ButtonAuth";

const NavbarAuth = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 sm:gap-3 justify-center items-center mt-4">
          <Origami
            strokeWidth={1}
            className="ml-3 sm:ml-5 m-0 w-7 h-7 sm:w-12 sm:h-12"
          />
          <p className="text-white font-sofia text-2xl font-black sm:text-4xl ">
            FUND IT
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button className="btn btn-outline btn-primary font-sofia font-light bg-base-300 text-white rounded-md  hover:text-black hover:bg-white w-18 h-8 p-1 sm:w-25 sm:h-12 sm:text-lg">
            <p>SIGN UP</p>{" "}
            <Plus strokeWidth={0.75} className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          <button className="btn btn-outline btn-primary font-sofia font-light bg-base-300  text-white rounded-md hover:text-black hover:bg-white w-18 h-8 p-1 mr-3 sm:mr-5 sm:w-25 sm:h-12 sm:text-lg">
            <p>LOG IN</p>
            <Send strokeWidth={0.75} className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarAuth;
