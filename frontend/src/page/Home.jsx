import React from "react";

import CampaignComponent from "../components/pageComponents/CampaignComponent";

const Home = () => {
  return (
    <div className="mt-10 mx-8">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center align-items-center gap-y-6">
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
