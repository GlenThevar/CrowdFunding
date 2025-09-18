import React from "react";
import { Origami, Send, Plus } from "lucide-react";

import ButtonAuth from "./ButtonAuth";

const NavbarAuth = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-3 justify-center items-center mt-2">
          <Origami strokeWidth={1} size={40} className="ml-5 m-0" />
          <p className="text-white font-sofia text-3xl font-black ">FUND IT</p>
        </div>
        <div className="flex gap-2 mt-6">
          <button className="btn btn-outline btn-primary font-sofia text-base font-light bg-base-300 text-white rounded-md hover:text-black hover:bg-white ">
            <p>SIGN UP</p> <Plus size={20} strokeWidth={0.75} />
          </button>
          <button className="btn btn-outline btn-primary font-sofia text-base font-light bg-base-300  text-white rounded-md mr-8 hover:text-black hover:bg-white">
            <p>LOG IN</p>
            <Send size={20} strokeWidth={0.75} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarAuth;
