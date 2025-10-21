import React from "react";
import { Outlet } from "react-router-dom";

import NavbarAuth from "../components/pageComponents/AuthComponents/NavbarAuth";

const AuthLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <NavbarAuth />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
