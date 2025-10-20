import React, { useContext } from "react";
import { SendHorizonal } from "lucide-react";

import IndivisualBackerComment from "./IndivisualBackerComment";
import { AppContext } from "../../../context/AppContext";

const IndivisualComments = () => {
  const { theme } = useContext(AppContext);
  return (
    <div className="flex justify-center">
      <div className="w-full md:w-[70vw] flex flex-col gap-5">
        <div className="mx-0 lg:mx-30">
          <div
            className={`flex flex-col gap-5 border-1 border-base-300 p-5 rounded-lg ${
              theme == "black" ? "bg-base-300" : "bg-base-200"
            } `}
          >
            <textarea
              type="search "
              className={`focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full md:w-[40vw] lg:w-[50vw] text-xs sm:text-sm font-subheading resize-none`}
              placeholder="Comment..."
            />
            <div className="flex justify-end">
              <button
                className={`btn btn-outline btn-primary rounded-sm ${
                  theme == "black"
                    ? "text-white hover:text-black hover:bg-white"
                    : "text-black bg-base-100 hover:bg-base-200"
                } shadow-sm flex gap-2 items-center justify-center w-fit`}
              >
                <SendHorizonal
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  strokeWidth={1}
                />
              </button>
            </div>
          </div>
          {/* <div className="flex justify-end">
              <button
                className={`btn btn-outline btn-primary rounded-sm  ${
                  theme == "black"
                    ? "text-white hover:text-black hover:bg-white"
                    : "text-black  bg-base-100 border-base-300 hover:bg-base-200"
                } shadow-sm flex gap-2 items-center justify-center w-fit`}
              >
                <p className="font-heading">Message</p>
              </button>
            </div> */}
        </div>

        <div className="flex flex-col gap-8">
          <IndivisualBackerComment />
          <IndivisualBackerComment />
        </div>
      </div>
    </div>
  );
};

export default IndivisualComments;
