import React, { useContext, useState, useEffect } from "react";
import { MapPin, Calendar, PiggyBank } from "lucide-react";

import { AppContext } from "../../../context/AppContext";

import IndivisualDetails from "./IndivisualDetails";
import IndivisualFAQ from "./IndivisualFAQ";
import IndividualUpdates from "./IndividualUpdates";
import IndivisualCreator from "./IndivisualCreator";
import IndivisualComments from "./IndivisualComments";
import Campaigntags from "../../../data/campaignTags";

const ViewCampaign = () => {
  const { theme } = useContext(AppContext);

  const [option, setOption] = useState(1);

  // note - the layout( for the slider ) will look weird if the discription is beyond a certain number of words so add that limit in the frontend

  function change(val) {
    setOption(val);
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex flex-col md:flex-row gap-10 border-base-300 ${
          theme == "black" ? "border-2" : "border-1"
        } p-5 mx-10 shadow-lg`}
      >
        <div className="flex-1 flex flex-col gap-2">
          <div>
            <iframe
              width="100%"
              height="100%"
              className="h-40 sm:h-55 md:h-65 lg:h-80 xl:h-100"
              src="https://www.youtube.com/embed/SEqrnm77xko"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <div className="flex mt-1 gap-2 font-heading font-light">
                {Campaigntags.map((data) => (
                  <button
                    key={data}
                    className={`btn rounded-md hover:border-1 hover:border-base-300 font-heading text-xs sm:text-sm${
                      theme == "black" ? "bg-base-300" : "bg-base-200"
                    }`}
                  >
                    {data}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-1">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <p className="font-heading text-xs sm:text-sm">
                Meerbusch, Germany
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="font-heading text-lg sm:text-2xl font-bold">
            The Art of Derek Domnic Dsouza
          </p>
          <p className="font-subheading text-sm sm:text-base font-light">
            Take a behind-the-scenes look at this artist's favorite pieces,
            creative journey, plus exclusive industry insights.
          </p>
          <div className="flex gap-2 items-center mt-4">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1} />
            <p className="font-heading text-xs sm:text-sm hover:border-b-1">
              10 July 2025
            </p>
          </div>

          <div className="flex mt-4">
            <div
              className={`stats ${
                theme == "black"
                  ? "border-2 border-base-300 rounded-xl"
                  : "border-1 border-base-200"
              } shadow-sm md:w-[40vw]`}
            >
              <div className="stat place-items-center">
                <div className="stat-title">Funds Required</div>
                <div className="stat-value">10,000 ₹</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Funds Received</div>
                <div className="stat-value">4,200 ₹</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Backers</div>
                <div className="stat-value">20</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-start gap-3 mt-5">
            <button
              className={`btn btn-outline btn-primary py-2 px-3 sm:py-6 sm:px-10 rounded-sm   ${
                theme == "black"
                  ? "text-white hover:text-black hover:bg-white"
                  : "text-black  bg-base-100 border-base-300 hover:bg-base-200"
              } shadow-sm flex gap-2 items-center justify-center`}
            >
              <PiggyBank strokeWidth={1} className="w-4 h-4 sm:w-6 sm:h-6" />
              <p className="font-heading text-xs sm:text-sm font-light">
                Back this project
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-5">
        <div
          className={`flex justify-center items-center gap-2 sm:gap-10 ${
            theme == "black"
              ? "border-x-2 border-t-2 border-base-300"
              : "border-x-1 border-t-1 border-base-300"
          } mx-10 h-10 font-heading font-semibold text-xs sm:text-sm shadow-sm`}
        >
          <div className="hover:border-b-1">
            <p
              className={`hover:cursor-pointer ${
                option == 1 ? "border-b-1" : ""
              } `}
              onClick={() => change(1)}
            >
              Details
            </p>
          </div>
          <div className="hover:border-b-1">
            <p
              className={`hover:cursor-pointer ${
                option == 2 ? "border-b-1" : ""
              } `}
              onClick={() => change(2)}
            >
              FAQ
            </p>
          </div>
          <div className="hover:border-b-1">
            <p
              className={`hover:cursor-pointer ${
                option == 3 ? "border-b-1" : ""
              } `}
              onClick={() => change(3)}
            >
              Updates
            </p>
          </div>
          <div className="hover:border-b-1">
            <p
              className={`hover:cursor-pointer ${
                option == 4 ? "border-b-1" : ""
              } `}
              onClick={() => change(4)}
            >
              Creator
            </p>
          </div>
          <div className="hover:border-b-1">
            <p
              className={`hover:cursor-pointer ${
                option == 5 ? "border-b-1" : ""
              } `}
              onClick={() => change(5)}
            >
              Comments
            </p>
          </div>
        </div>
        <div
          className={`mx-10 ${
            theme == "black"
              ? "border-2 border-base-300"
              : "border-1 border-base-300"
          } p-5 shadow-lg  `}
        >
          {option == 1 && <IndivisualDetails />}
          {option == 2 && <IndivisualFAQ />}
          {option == 3 && <IndividualUpdates />}
          {option == 4 && <IndivisualCreator />}
          {option == 5 && <IndivisualComments />}
        </div>
      </div>
    </div>
  );
};

export default ViewCampaign;
