import React from "react";
import IndividualUpdateCards from "./IndivisualUpdateCards";

const IndividualUpdates = () => {
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <IndividualUpdateCards />
      <IndividualUpdateCards />
    </div>
  );
};

export default IndividualUpdates;
