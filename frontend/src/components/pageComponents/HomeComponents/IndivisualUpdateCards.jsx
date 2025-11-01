import React, { useContext, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import { AppContext } from "../../../context/AppContext";
import placeholderPhoto from "../../../data/images/placeholderPhoto.jpg";

const IndividualUpdateCards = ({
  heading,
  discription,
  name,
  profilePicture,
  likeCount,
  profile_id,
  date,
  isUser,
}) => {
  const { theme } = useContext(AppContext);
  const [heart, setHeart] = useState(false);

  const ClickHeart = () => {
    setHeart((heart) => !heart);
  };

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={`${
        theme == "black"
          ? "border-2 border-base-300"
          : "border-1 border-base-200"
      } flex flex-col gap-5 w-full md:w-[70vw] p-5 shadow-lg rounded-md`}
    >
      <div className="flex justify-start font-bold text-base sm:text-lg font-heading">
        {heading}
      </div>
      <div className="flex gap-3 items-center">
        <div
          className={`rounded-full ${
            theme == "black"
              ? "hover:border-1 border-white"
              : "hover:border-1 border-black"
          }`}
        >
          <Link to={`/profile/${profile_id}`}>
            <img
              src={profilePicture || placeholderPhoto}
              className={`rounded-full w-10 sm:w-15 hover:cursor-pointer `}
              alt="profile picture"
            />
          </Link>
        </div>
        <div className="flex-col">
          <p className="font-heading text-xs sm:text-sm">{name}</p>
          <p className="font-heading text-xs sm:text-sm">{formattedDate}</p>
        </div>
      </div>
      <div className="w-full border-b-2 border-base-200"></div>
      <div className="text-xs sm:text-sm font-subheading">
        <p>{discription}</p>
      </div>
      <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between">
        <div className="flex cursor-pointer gap-2 items-center">
          <Heart
            onClick={ClickHeart}
            fill={heart ? (theme === "black" ? "white" : "black") : "none"}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <p className="font-light font-heading text-sm">{likeCount}</p>
        </div>
        {isUser && (
          <div className="flex gap-2 w-full sm:w-fit">
            <button
              className={`btn btn-outline btn-primary rounded-sm   ${
                theme == "black"
                  ? "text-white hover:text-black hover:bg-white"
                  : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
              } shadow-sm flex-1 sm:flex-none`}
            >
              <p className="font-heading text-xs lg:text-sm font-light">Edit</p>
            </button>
            <button
              className={`btn btn-outline btn-primary rounded-sm   ${
                theme == "black"
                  ? "text-white hover:text-black hover:bg-white"
                  : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
              } shadow-sm flex-1 sm:flex-none`}
            >
              <p className="font-heading text-xs lg:text-sm font-light">
                Delete
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualUpdateCards;
