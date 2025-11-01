import React, { useEffect, useState, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

import NavbarHome from "../components/pageComponents/HomeComponents/NavbarHome";
import Footer from "../components/pageComponents/HomeComponents/Footer";

const HomeLayout = () => {
  const { setUserId } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const checkToken = async () => {
        const baseurl =
          import.meta.env.MODE === "development"
            ? "http://localhost:3000/auth/verifytoken"
            : "/auth/verifytoken";
        try {
          const result = await axios.post(baseurl, {
            token,
          });
          setUserId(result.data.data.id);

          if (result.status == 200) {
            setUser(true);
          } else {
            setUser(false);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      checkToken();
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
    }
  }, [token]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {" "}
        <span className="loading loading-ring w-15 h-15"></span>
        <p className="font-heading">Be patient, were loading</p>
      </div>
    );

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="h-screen flex flex-col">
      <Toaster />
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
