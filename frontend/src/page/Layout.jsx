import React from "react";
import { Outlet } from "react-router-dom";

import NavbarHome from "../components/pageComponents/NavbarHome";
import Footer from "../components/pageComponents/Footer";

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
