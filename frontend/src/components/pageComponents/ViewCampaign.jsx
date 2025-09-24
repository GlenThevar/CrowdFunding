import React, { useContext } from "react";
import { IndianRupee, Plus, Handshake } from "lucide-react";

import CampaginCarousel from "./CampaginCarousel";
import { AppContext } from "../../context/AppContext";

const ViewCampaign = () => {
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`flex flex-col md:flex-row gap-10 border-base-300 ${
        theme == "black" ? "border-2" : "border-1"
      } px-2 pt-2 pb-1 w-fit`}
    >
      <div>
        <CampaginCarousel />
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <p className="font-ma text-4xl font-bold">
            The Art of Derek Domnic Dsouza
          </p>
          <p className="font-m text-lg font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            laboriosam assumenda ipsum nihil, veniam magni obcaecati doloribus,
            amet voluptate ab ipsa odit non repellat!
          </p>
          <div className="flex mt-3 gap-10">
            <div className="flex-col">
              <div className="flex items-center justify-centera">
                <IndianRupee className="w-8 h-8" />
                <p className="text-4xl font-ma font-extrabold">1,000</p>
              </div>
              <div className="flex items-center justify-center text-gray-500">
                <p className="font-ma">funded out of</p>
                <IndianRupee className="w-4 h-4" />
                <p className="font-ma">50,000 goal</p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text font-ma text-4xl font-extrabold">300</p>
              <p className="font-ma text-gray-500">Total backers</p>
            </div>
          </div>
          <div>
            <button
              className={`btn bg-base-300 font-ma ${
                theme == "black" ? "hover:bg-white hover:text-black" : ""
              } `}
            >
              <div className="flex justify-center items-center gap-2">
                <p>Fund</p> <Handshake />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCampaign;
