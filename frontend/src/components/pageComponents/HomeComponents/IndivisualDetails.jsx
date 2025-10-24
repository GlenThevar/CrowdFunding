import React, { useEffect, useState } from "react";

import interestingFacts from "../../../data/interestingInfo";

const IndivisualDetails = ({ campaign }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    if (campaign) {
      setIsLoading(false);
    }
  }, [campaign]);

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
      <div className="flex flex-col gap-2 justify-center items-center ">
        <span className="loading loading-ring loading-lg"></span>
        <div className="flex flex-col gap-1 items-center">
          <p className="font-heading font-semibold text-xs">DID YOU KNOW ?</p>
          <p className="font-heading text-xs">{interestingFacts[loadCount]} </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 font-subheading text-xs sm:text-sm">
      <div dangerouslySetInnerHTML={{ __html: campaign.content }} />
    </div>
  );
};

export default IndivisualDetails;
