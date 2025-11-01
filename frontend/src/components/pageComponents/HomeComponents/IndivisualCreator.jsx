import React, { useContext, useEffect, useState } from "react";
import { Link2, Mail, UserPlus, UserRoundCheck } from "lucide-react";
import PlaceholderPhoto from "../../../data/images/placeholderPhoto.jpg";
import { Link } from "react-router-dom";

import { AppContext } from "../../../context/AppContext";

const IndivisualCreator = ({ campaign }) => {
  const { theme, userId } = useContext(AppContext);

  const creator = campaign?.userid;

  const formatUserDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  const formatLastLogin = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  if (!creator) {
    return (
      <div className="font-heading text-xs italic text-gray-500">
        Creator information not available.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="font-heading text-base sm:text-2xl font-medium">
        About the creator
      </div>
      <div className="flex items-center gap-4">
        <Link to={`/profile/${creator._id}`}>
          <div
            className={`rounded-full ${
              theme == "black"
                ? "hover:border-1 border-white"
                : "hover:border-1 border-black"
            }`}
          >
            <img
              src={creator.profileUrl || PlaceholderPhoto}
              className={`rounded-full w-20 h-20 object-cover hover:cursor-pointer `}
              alt={`${creator.username}'s profile picture`}
            />
          </div>
        </Link>

        <div>
          <p className="font-heading text-sm sm:text-base">
            {creator.username}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {" "}
        <div className="flex-col justify-start">
          <p className="font-heading text-base sm:text-lg">
            {creator.createdProjects ?? 0} created project
            {creator.createdProjects !== 1 ? "s" : ""}
          </p>
          <p className="font-heading text-xs sm:text-sm">
            {creator.backedProjects ?? 0} backed project
            {creator.backedProjects !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex-col justify-start">
          <p className="font-heading text-base sm:text-lg">
            {formatLastLogin(creator.lastLogin)}
          </p>
          <p className="font-heading text-xs sm:text-sm">Last Login</p>
        </div>
        <div className="flex-col">
          <p className="font-heading text-base sm:text-lg">
            {formatUserDate(creator.accountCreated)}
          </p>
          <p className="font-heading text-xs sm:text-sm">Account Created</p>
        </div>
      </div>
      <div className="w-full border-b-1 border-base-300"></div>
      <div className="font-subheading text-xs sm:text-sm space-y-4">
        {" "}
        {creator.longDiscription ? (
          <p>{creator.longDiscription}</p>
        ) : (
          <p className="italic text-gray-500">No description provided.</p>
        )}
      </div>
      {creator._id != userId && (
        <div className="flex flex-wrap gap-5">
          {" "}
          <button
            className={`btn btn-outline btn-primary py-2 px-3 sm:py-6 sm:px-10 rounded-sm   ${
              theme == "black"
                ? "text-white hover:text-black hover:bg-white"
                : "text-black  bg-base-100 border-base-300 hover:bg-green-900 hover:text-white"
            } shadow-sm flex gap-2 items-center justify-center`}
          >
            <Mail strokeWidth={1} className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className="font-heading text-xs sm:text-sm font-light">
              Message
            </p>
          </button>
        </div>
      )}
    </div>
  );
};

export default IndivisualCreator;
