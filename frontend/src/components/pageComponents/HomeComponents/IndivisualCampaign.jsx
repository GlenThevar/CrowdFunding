import React, { useContext, useState, useEffect } from "react";
import { MapPin, Calendar, PiggyBank, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { AppContext } from "../../../context/AppContext";

import IndivisualDetails from "./IndivisualDetails";
import IndivisualFAQ from "./IndivisualFAQ";
import IndividualUpdates from "./IndividualUpdates";
import IndivisualCreator from "./IndivisualCreator";
import IndivisualComments from "./IndivisualComments";
import interestingFacts from "../../../data/interestingInfo";

const getYoutubeEmbedUrl = (url) => {
  try {
    const urlObj = new URL(url);

    if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.searchParams.has("v")
    ) {
      const videoId = urlObj.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (urlObj.hostname.includes("youtu.be")) {
      const videoId = urlObj.pathname.substring(1);
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  } catch (e) {
    console.error("Invalid YouTube URL:", url, e);
    return "";
  }
};

const ViewCampaign = () => {
  const { theme, userId } = useContext(AppContext);
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadCount, setLoadCount] = useState(0);
  const [error, setError] = useState(null);
  const [option, setOption] = useState(1);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (loadCount == 49) setLoadCount(0);
        else setLoadCount((prev) => prev + 1);
      }, 5000);
    }
  }, [isLoading]);

  useEffect(() => {
    const fetchCampaign = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/campaigns/${id}`
        );
        setCampaign(response.data);
      } catch (err) {
        console.error("Error fetching campaign:", err);
        setError("Failed to load campaign data.");
        toast.error("Failed to load campaign data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCampaign();
    }
  }, [id]);

  function change(val) {
    setOption(val);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
        <div className="flex flex-col gap-1 items-center">
          <p className="font-heading font-semibold text-xs">DID YOU KNOW ?</p>
          <p className="font-heading text-xs">{interestingFacts[loadCount]} </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
        <div>
          <p className="font-heading text-xs ">
            Error Occoured, Try refreshing ?{" "}
          </p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
        <div>
          <p className="font-heading text-xs ">
            Campaign not found, Try refreshing ?
          </p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(campaign.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const embedUrl = getYoutubeEmbedUrl(campaign.youtubeUrl);

  return (
    <div className="flex flex-col gap-2">
      <Toaster />
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
              src={embedUrl}
              allowFullScreen
              title={campaign.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <div className="flex mt-1 gap-2 font-heading font-light">
                {campaign.tags &&
                  campaign.tags.length > 0 &&
                  campaign.tags.map((tag) => (
                    <button
                      key={tag}
                      className={`btn rounded-md hover:border-1 hover:border-base-300 font-heading text-xs sm:text-sm hover:cursor-text ${
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

            <div className="flex justify-center gap-1">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <p className="font-heading text-xs sm:text-sm">
                {campaign.userid?.basedLocation || "Location N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="font-heading text-lg sm:text-2xl font-bold">
            {campaign.title}
          </p>
          <p className="font-subheading text-sm sm:text-base font-light">
            {campaign.discription}
          </p>
          <div className="flex gap-2 items-center mt-4">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1} />
            <p className="font-heading text-xs sm:text-sm hover:border-b-1">
              {formattedDate}
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
                <div className="stat-value">{campaign.goalAmount} ₹</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Funds Received</div>
                <div className="stat-value">{campaign.currentAmount} ₹</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Backers</div>
                <div className="stat-value">{campaign.totalBackers}</div>
              </div>
            </div>
          </div>
          {campaign?.userid._id != userId && (
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 mt-5">
              <button
                className={`btn btn-outline btn-primary py-2 px-3 sm:py-6 sm:px-6 rounded-sm   ${
                  theme == "black"
                    ? "text-white hover:text-black hover:bg-white"
                    : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                } shadow-sm flex gap-2 items-center justify-center`}
              >
                <MessageCircle
                  strokeWidth={1}
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
                <p className="font-heading text-xs sm:text-sm font-light">
                  Message Creator
                </p>
              </button>
              <button
                className={`btn btn-outline btn-primary py-2 px-3 sm:py-6 sm:px-10 rounded-sm   ${
                  theme == "black"
                    ? "text-white hover:text-black hover:bg-white"
                    : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
                } shadow-sm flex gap-2 items-center justify-center`}
              >
                <PiggyBank strokeWidth={1} className="w-4 h-4 sm:w-6 sm:h-6" />
                <p className="font-heading text-xs sm:text-sm font-light">
                  Back this project
                </p>
              </button>
            </div>
          )}
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
          {option == 1 && <IndivisualDetails campaign={campaign} />}
          {option == 2 && <IndivisualFAQ campaign={campaign} />}
          {option == 3 && <IndividualUpdates campaign={campaign} />}
          {option == 4 && <IndivisualCreator campaign={campaign} />}
          {option == 5 && <IndivisualComments campaign={campaign} />}
        </div>
      </div>
    </div>
  );
};

export default ViewCampaign;
