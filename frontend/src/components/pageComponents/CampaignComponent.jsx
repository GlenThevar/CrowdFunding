import React from "react";
import { useContext } from "react";

import BleedCarousel from "./BleedCarousel";
import Avatar from "./Avatar";
import { Clock } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import Campaigntags from "../../data/campaignTags";

const CampaignComponent = () => {
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`card border-base-300 bg-base-100 w-auto shadow-sm rounded-sm ${
        theme == "black" ? "border-2" : "border-1"
      }`}
    >
      <figure className="p-3">
        <BleedCarousel />
      </figure>
      <div className="card-body">
        <div>
          <div className="flex justify-center items-start gap-5 ">
            <Avatar />

            <div className="flex flex-col gap-2 ">
              <p className="text-2xl font-ma font-bold">
                The Art of Derek Domnic Dsouza
              </p>
              <div className="flex gap-2 font-ma">
                <Clock />
                <p className="font-medium">
                  {" "}
                  <span>8 Days Left</span>
                  <span className="mx-3">|</span>
                  <span>150% Funded</span>
                </p>
              </div>
              <p className="font-m">
                Take a behind-the-scenes look at this artist's favorite pieces,
                creative journey, plus exclusive industry insights.
              </p>
              <div className="flex mt-1 gap-2">
                {Campaigntags.map((data) => (
                  <button
                    key={data}
                    className={`btn rounded-md hover:border-1 hover:border-base-300 font-m ${
                      theme == "black" ? "bg-base-300" : "bg-base-200"
                    }`}
                  >
                    {data}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignComponent;
