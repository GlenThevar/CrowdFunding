import React from "react";
import { Plus } from "lucide-react";

import CampaignComponent from "../components/pageComponents/CampaignComponent";

const Home = () => {
  return (
    <div className="mt-10 mx-8 min-h-[calc(100vh-178px-80px-16px-84px)] md:min-h-[calc(100vh-124px-80px-84px)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center align-items-center ">
        <div>
          <CampaignComponent />
        </div>
        <div>
          <CampaignComponent />
        </div>
        <div>
          <CampaignComponent />
        </div>
        <div>
          <CampaignComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
