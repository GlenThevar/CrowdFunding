import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import CampaignComponent from "../components/pageComponents/HomeComponents/CampaignComponent";
import { AppContext } from "../context/AppContext";
import interestingFacts from "../data/interestingInfo";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [tagcampaign, setTagCampaign] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadCount, setLoadCount] = useState(0);

  const { searchingByTags, tagsToSearch } = useContext(AppContext);

  useEffect(() => {
    console.log(searchingByTags);
    console.log(tagsToSearch);
  }, [searchingByTags, tagsToSearch]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      setError(null);

      const baseurl =
        import.meta.env.MODE === "development"
          ? "http://localhost:3000/campaigns/"
          : "/campaigns";

      try {
        const response = await axios.get(baseurl);
        setCampaigns(response.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns.");
        toast.error("Failed to load campaigns.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!searchingByTags) {
      fetchCampaigns();
    }
  }, [searchingByTags]);

  useEffect(() => {
    if (searchingByTags && tagsToSearch.trim()) {
      const fetchCampaigns = async () => {
        setIsLoading(true);
        setError(null);

        const baseurl =
          import.meta.env.MODE === "development"
            ? `http://localhost:3000/campaigns/tag/${tagsToSearch}`
            : `/campaigns/tag/${tagsToSearch}`;

        try {
          const response = await axios.get(baseurl);
          console.log(response);
          setTagCampaign(response.data);
        } catch (err) {
          console.error("Error fetching campaigns:", err);
          setError("Failed to load campaigns.");
          toast.error("Failed to load campaigns.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchCampaigns();
    } else {
      setTagCampaign([]);
    }
  }, [searchingByTags, tagsToSearch]);

  useEffect(() => {
    let intervalId;
    if (isLoading) {
      intervalId = setInterval(() => {
        setLoadCount((prev) => (prev >= 49 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [isLoading]);

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
            Error Occurred, Try refreshing?
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toaster />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center align-items-center">
        {" "}
        {searchingByTags ? (
          tagcampaign.length > 0 ? (
            tagcampaign.map((campaign) => (
              <div key={campaign._id}>
                <CampaignComponent campaign={campaign} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center font-heading text-xs">
              <p>No campaigns found for these tags.</p>
            </div>
          )
        ) : campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign._id}>
              <CampaignComponent campaign={campaign} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center font-heading text-xs">
            <p>Why not be the first one to create a campaign?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
