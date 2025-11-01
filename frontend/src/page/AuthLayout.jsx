import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import NavbarAuth from "../components/pageComponents/AuthComponents/NavbarAuth";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setTimeout(() => {
        document.getElementById("autologin_modal").showModal();
      }, 1000);

      const checkToken = async () => {
        const baseurl =
          import.meta.env.MODE === "development"
            ? "http://localhost:3000/auth/verifytoken"
            : "/auth/verifytoken";

        try {
          const result = await axios.post(baseurl, {
            token,
          });

          if (result.status == 200) {
            setTimeout(() => {
              navigate("/", { replace: true });
            }, 5000);
          }
        } catch (err) {
          console.log(err);
          toast.error("Auto log in failed");
        } finally {
          document.getElementById("autologin_modal").close();
        }
      };
      checkToken();
    }
  }, []);
  return (
    <div className="h-screen overflow-hidden relative" data-theme="black">
      <Toaster />
      <NavbarAuth />

      <div className="relative z-10">
        <dialog id="autologin_modal" className="modal">
          <div className="modal-box bg-base-300 flex flex-col items-center w-fit">
            <span className="loading loading-ring loading-xl"></span>
            <h3 className="font-semibold text-sm font-heading">
              Be patient while we log you in
            </h3>
          </div>
        </dialog>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
