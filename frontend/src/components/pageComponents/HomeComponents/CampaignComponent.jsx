import React, { useEffect } from "react";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import BleedCarousel from "./BleedCarousel";
import Avatar from "./Avatar";
import { Clock } from "lucide-react";
import { AppContext } from "../../../context/AppContext";
import placeholderPhoto from "../../../data/images/placeholderPhoto.jpg";

const CampaignComponent = ({ campaign, ht }) => {
  const { theme } = useContext(AppContext);

  if (!campaign) {
    return null;
  }

  const percentageFunded =
    campaign.goalAmount > 0
      ? Math.round((campaign.currentAmount / campaign.goalAmount) * 100)
      : 0;

  const formattedDate = new Date(campaign.createdAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <Link to={`/campaign/${campaign._id}`}>
      <div
        className={`card border-base-300 bg-base-100 w-auto shadow-lg rounded-sm ${
          theme == "black" ? "border-2" : "border-1"
        }`}
      >
        <figure className="p-3">
          <BleedCarousel
            imageUrls={campaign.imageUrls}
            height={!ht && "h-[150px]"}
          />
        </figure>
        <div className="card-body">
          {" "}
          <div>
            <div className="flex items-start gap-3 ">
              {" "}
              <div className="rounded-full ">
                <img
                  src={campaign.userid.profileUrl || placeholderPhoto}
                  className="rounded-full w-15 h-15 "
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <p className="text-base lg:text-lg font-heading font-extrabold">
                  {" "}
                  {campaign.title}
                </p>
                <div className="flex gap-2 items-center">
                  <Clock strokeWidth={1} className="w-4 h-4 lg:w-5 lg:h-5" />{" "}
                  <p className="font-heading font-light text-xs">
                    <span>{formattedDate}</span>
                    <span className="mx-2">|</span>
                    <span>{percentageFunded}% Funded</span>
                  </p>
                </div>
                <p className="font-subheading text-sm font-light line-clamp-3 mt-1">
                  {" "}
                  {campaign.discription}
                </p>
                <div className="flex mt-2 gap-2 font-heading font-light flex-wrap">
                  {" "}
                  {campaign.tags &&
                    campaign.tags.length > 0 &&
                    campaign.tags.map((tag) => (
                      <button
                        key={tag}
                        className={`btn btn-xs rounded-md hover:border-1 hover:border-base-300 font-heading ${
                          theme == "black"
                            ? "bg-base-300"
                            : "bg-green-900 text-white"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignComponent;
