import React from "react";
import { Outlet } from "react-router-dom";

import NavbarHome from "../components/pageComponents/HomeComponents/NavbarHome";
import Footer from "../components/pageComponents/HomeComponents/Footer";

const Layout = () => {
  return (
    <div>
      <NavbarHome />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
