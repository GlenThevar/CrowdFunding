import React, { useEffect, useState } from "react";
import IndividualUpdateCards from "./IndivisualUpdateCards";
import { data } from "react-router-dom";

const IndividualUpdates = ({ campaign, isUser }) => {
  const [Updates, setUpdates] = useState([]);
  const [updatesAvailable, SetUpdatesAvailable] = useState(false);

  console.log(isUser);

  useEffect(() => {
    if (campaign.Updates.length > 0) {
      SetUpdatesAvailable(true);
      setUpdates(campaign.Updates);
      console.log(campaign);
    } else {
      SetUpdatesAvailable(false);
    }
  }, [campaign]);

  if (!updatesAvailable) {
    return (
      <div className="font-heading text-xs italic text-gray-500">
        No Updates by the creator
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {Updates.map((data) => (
        <IndividualUpdateCards
          key={data._id}
          heading={data.Title}
          discription={data.Discription}
          likeCount={data.Likes}
          date={data.CreatedAt}
          profilePicture={campaign.userid.profileUrl}
          name={campaign.userid.username}
          profile_id={campaign.userid._id}
          isUser={isUser}
        />
      ))}
    </div>
  );
};

export default IndividualUpdates;
