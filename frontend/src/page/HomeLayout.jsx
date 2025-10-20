import React from "react";
import { Outlet } from "react-router-dom";

import NavbarHome from "../components/pageComponents/HomeComponents/NavbarHome";
import Footer from "../components/pageComponents/HomeComponents/Footer";

const HomeLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="z-10 flex-shrink-0">
        <NavbarHome />
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8">
        <Outlet />
      </div>

      <div className="z-10 flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
