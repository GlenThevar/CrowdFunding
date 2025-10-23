import React, { useEffect, useState } from "react";
import { Origami, Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { Google } from "../../../data/icons/google";

const LoginAuth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailDeselected, setEmailDeselected] = useState(false);

  const navigate = useNavigate();

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const googleOAuth = async () => {
    try {
      window.location.href = "http://localhost:3000/auth/google";
    } catch (err) {
      console.log(err);
    }
  };

  const submitForm = async () => {
    if (!isEmail(email)) {
      toast.error("Hmm... somethings wrong on your end");
    }

    try {
      const response = await axios
        .post("http://localhost:3000/auth/login/", {
          email,
          password,
        })
        .catch((response) => {
          if (response.status == 404) toast.error("Email does not exist");
          if (response.status == 401)
            toast.error("Email verification not done");
          if (response.status == 409) toast.error("Password not correct");
        });

      if (response) {
        localStorage.setItem("token", response.data.accessToken);
        toast.success("Combination correct");
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);

      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-[75vh] justify-center items-center">
      <Toaster />

      <div className="w-[300px] sm:w-[400px] md:w-[500px] h-fit bg-base-200 border-2 border-base-300 flex flex-col p-5 gap-6 ">
        <div className="flex flex-col w-full items-center gap-4">
          <div className="w-full flex justify-center">
            <Origami strokeWidth={0.5} className="w-15 h-15" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-heading font-semibold text-2xl">Welcome Back</p>
            <p className="font-heading font-light text-xs">
              Dont have an account yet ?{" "}
              <Link to="/auth/signup">
                <span className="font-semibold hover:border-b-1 cursor-pointer">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-4">
          <div
            className={`flex bg-base-300 items-center rounded-md p-3 gap-3 w-full ${
              emailDeselected
                ? isEmail(email)
                  ? ""
                  : "border-1 border-error"
                : ""
            }`}
          >
            <Mail strokeWidth={1} />
            <input
              type="email"
              placeholder="email adress"
              className="w-full focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none bg-base-300  font-subheading text-sm rounded-sm"
              value={email}
              onChange={emailChange}
              onBlur={() => setEmailDeselected(true)}
            />
          </div>
          <div className="flex flex-col gap-3 w-full ">
            <div
              className={`flex bg-base-300 items-center rounded-md p-3 gap-3 w-full 
                 `}
            >
              <Lock strokeWidth={1} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="w-full focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none bg-base-300  font-subheading text-sm rounded-sm "
                value={password}
                onChange={passwordChange}
              />
              {showPassword ? (
                <EyeOff strokeWidth={1} onClick={toggleShowPassword} />
              ) : (
                <Eye strokeWidth={1} onClick={toggleShowPassword} />
              )}
            </div>
          </div>

          <button
            className="btn btn-outline btn-primary font-heading bg-base-300  text-white rounded-md hover:text-black hover:bg-white font-light text-xs w-full"
            onClick={submitForm}
          >
            {loading ? (
              <span className="loading loading-infinity loading-xl"></span>
            ) : (
              <p>LOG IN</p>
            )}
          </button>
        </div>
        <div className="flex w-full">
          <div className="border-t-[1px] border-gray-500 h-0 mt-[7px] flex-1"></div>
          <div className="font-heading text-xs mx-2">OR</div>
          <div className="border-t-[1px] border-gray-500 h-0 mt-[7px] flex-1"></div>
        </div>
        <div>
          <button
            className="btn btn-outline btn-primary font-heading bg-base-300  text-white rounded-md hover:text-black hover:bg-white font-light text-xs w-full"
            onClick={googleOAuth}
          >
            <Google className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAuth;
