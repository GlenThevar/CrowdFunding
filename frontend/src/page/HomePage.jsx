import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import CampaignComponent from "../components/pageComponents/HomeComponents/CampaignComponent";
import { AppContext } from "../context/AppContext";
import interestingFacts from "../data/interestingInfo";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/campaigns/");
        setCampaigns(response.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns.");
        toast.error("Failed to load campaigns.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (loadCount == 49) setLoadCount(0);
        else setLoadCount((prev) => prev + 1);
      }, 5000);
    }
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
            Error Occoured, Try refreshing ?{" "}
          </p>
        </div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <div>
          <p className="font-heading text-xs ">
            why not be the first one to create a campaign ?
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
        {campaigns.map((campaign) => (
          <div key={campaign._id}>
            <CampaignComponent campaign={campaign} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
