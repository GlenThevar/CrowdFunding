import React from "react";
import NavbarAuth from "../components/pageComponents/NavbarAuth";
import HomeAuth from "../components/pageComponents/HomeAuth";

const LandingPage = () => {
  return (
    <div className=" w-[100vw] h-[100vh] overflow-hidden" data-theme="black">
      <NavbarAuth />
      <HomeAuth />
    </div>
  );
};

export default LandingPage;
