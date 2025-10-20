import React, { useState } from "react";
import { Origami, Mail, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

import { Google } from "../../../data/icons/google";

const LoginAuth = () => {
  const [signIn, toggle] = useState(true);

  

  return (
    <div className="flex w-full h-full justify-center">
      <div className="w-[300px] sm:w-[400px] md:w-[500px] h-fit bg-base-200 my-10 border-2 border-base-300 flex flex-col p-5 gap-6 ">
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
          <div className="flex bg-base-300 items-center rounded-md p-3 gap-3 w-full">
            <User strokeWidth={1} />
            <input
              type="text"
              placeholder="username"
              className="w-full focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none bg-base-300  font-subheading text-sm rounded-sm"
            />
          </div>
          <div className="flex bg-base-300 items-center rounded-md p-3 gap-3 w-full">
            <Mail strokeWidth={1} />
            <input
              type="email"
              placeholder="email adress"
              className="w-full focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none bg-base-300  font-subheading text-sm rounded-sm"
            />
          </div>
          <div className="flex bg-base-300 items-center rounded-md p-3 gap-3 w-full">
            <Lock strokeWidth={1} />
            <input
              type="password"
              placeholder="password"
              className="w-full focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none bg-base-300  font-subheading text-sm rounded-sm"
            />
          </div>

          <button className="btn btn-outline btn-primary font-heading bg-base-300  text-white rounded-md hover:text-black hover:bg-white font-light text-xs w-full">
            <p>LOG IN</p>
          </button>
        </div>
        <div className="flex w-full">
          <div className="border-t-[1px] border-gray-500 h-0 mt-[7px] flex-1"></div>
          <div className="font-heading text-xs mx-2">OR</div>
          <div className="border-t-[1px] border-gray-500 h-0 mt-[7px] flex-1"></div>
        </div>
        <div>
          <button className="btn btn-outline btn-primary font-heading bg-base-300  text-white rounded-md hover:text-black hover:bg-white font-light text-xs w-full">
            <Google className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAuth;
