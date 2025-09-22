import React from "react";

import NavbarHome from "../components/pageComponents/NavbarHome";
import SidebarHome from "../components/pageComponents/SidebarHome";

const Layout = ({ children }) => {
  return (
    <div>
      <NavbarHome />
      {children}
    </div>
  );
};
export default Layout;
